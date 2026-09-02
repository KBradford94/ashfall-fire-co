// Extracts the REAL debounce block from src/game.js and exercises it.
const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync(require('path').join(__dirname,'..','src','game.js'), 'utf8');

const start = src.indexOf('  let _settingsTimer = null;');
const end   = src.indexOf('  async function initSettingsAndCredits()');
if (start < 0 || end < 0) { console.error('could not locate the debounce block'); process.exit(1); }
const block = src.slice(start, end);
console.log(`extracted ${block.split('\n').length} lines of real source\n`);

let writes = [];
let listeners = {};
const sandbox = {
  console,
  setTimeout, clearTimeout, Promise,
  Sound: { getVolume: () => sandbox._vol, isMuted: () => sandbox._muted },
  Toast: { show: (t, b, k) => writes.push({ toast: t, kind: k }) },
  window: {
    electronAPI: { saveSettings: (s) => { writes.push({ write: s }); return Promise.resolve(sandbox._result); } },
    addEventListener: (ev, fn) => { listeners[ev] = fn; },
  },
  document: { addEventListener: (ev, fn) => { listeners[ev] = fn; }, visibilityState: 'visible' },
  _vol: 70, _muted: false, _result: { success: true },
};
vm.createContext(sandbox);
vm.runInContext(block + '\n; this.persistAppSettings = persistAppSettings; this.flushAppSettings = flushAppSettings;', sandbox);

const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const check = (n, c, d) => c ? (console.log(`  PASS  ${n}`), pass++) : (console.log(`  FAIL  ${n}  -> ${JSON.stringify(d)}`), fail++);

(async () => {
  console.log('--- 1. dragging the slider collapses to ONE write ---');
  writes = [];
  for (let v = 70; v <= 100; v++) { sandbox._vol = v; sandbox.persistAppSettings(); }
  check('nothing written yet (still within debounce)', writes.length === 0, writes);
  await sleep(450);
  check('exactly one write after settling', writes.filter(w => w.write).length === 1, writes);
  check('write carries the FINAL value, not an early one',
        writes[0] && writes[0].write.volume === 100, writes[0]);
  console.log(`     (31 slider events -> ${writes.filter(w=>w.write).length} disk write)`);

  console.log('\n--- 2. discrete change (mute) writes immediately ---');
  writes = []; sandbox._muted = true;
  sandbox.persistAppSettings({ immediate: true });
  check('written synchronously, no wait', writes.filter(w => w.write).length === 1, writes);
  check('carries muted:true', writes[0] && writes[0].write.muted === true, writes[0]);

  console.log('\n--- 3. immediate cancels a pending debounced write ---');
  writes = []; sandbox._vol = 55;
  sandbox.persistAppSettings();            // schedule
  sandbox._vol = 60;
  sandbox.persistAppSettings({ immediate: true });  // should cancel + write once
  await sleep(450);
  check('only one write total, not two', writes.filter(w => w.write).length === 1, writes);
  check('has the newer value', writes[0] && writes[0].write.volume === 60, writes[0]);

  console.log('\n--- 4. pending write is flushed when the window goes away ---');
  writes = []; sandbox._vol = 33;
  sandbox.persistAppSettings();
  check('not yet written', writes.length === 0, writes);
  listeners['beforeunload']();
  check('beforeunload flushed it', writes.filter(w => w.write).length === 1, writes);
  check('flushed the right value', writes[0] && writes[0].write.volume === 33, writes[0]);
  await sleep(450);
  check('no duplicate write fires afterwards', writes.filter(w => w.write).length === 1, writes);

  console.log('\n--- 5. visibilitychange also flushes ---');
  writes = []; sandbox._vol = 12;
  sandbox.persistAppSettings();
  sandbox.document.visibilityState = 'hidden';
  listeners['visibilitychange']();
  check('flushed on hide', writes.filter(w => w.write).length === 1, writes);
  sandbox.document.visibilityState = 'visible';

  console.log('\n--- 6. flush with nothing pending is a no-op ---');
  writes = [];
  sandbox.flushAppSettings();
  check('no spurious write', writes.length === 0, writes);

  console.log('\n--- 7. a failed settings write warns the player ---');
  writes = []; sandbox._result = { success: false, error: 'the disk is full' };
  sandbox.persistAppSettings({ immediate: true });
  await sleep(50);
  const toast = writes.find(w => w.toast);
  check('toast raised', !!toast, writes);
  check('warning severity, not danger', toast && toast.kind === 'warning', toast);
  sandbox._result = { success: true };

  console.log(`\n═══ ${pass} passed, ${fail} failed ═══`);
  process.exit(fail ? 1 : 0);
})();
