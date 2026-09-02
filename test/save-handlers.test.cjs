// Drives the REAL ipc handlers in main.js with a stubbed electron module, so the
// save/load/delete failure paths are exercised as shipped rather than as a copy.
// Run with: npm test
const Module = require('module');
const path = require('path');
const fs = require('fs');
const os = require('os');

const USERDATA = fs.mkdtempSync(path.join(os.tmpdir(), 'ashfall-test-'));
const handlers = {};

const electronStub = {
  app: {
    getPath: () => USERDATA,
    getVersion: () => '1.0.0',
    requestSingleInstanceLock: () => true,
    whenReady: () => new Promise(() => {}), // never resolves: no window is created
    on: () => {},
    quit: () => {},
  },
  BrowserWindow: class { static getAllWindows(){return[];} static getFocusedWindow(){return null;} },
  ipcMain: { handle: (ch, fn) => { handlers[ch] = fn; }, on: () => {} },
  dialog: {},
};

const origResolve = Module._resolveFilename;
Module._resolveFilename = function (req, ...rest) {
  if (req === 'electron') return 'electron-stub';
  return origResolve.call(this, req, ...rest);
};
require.cache['electron-stub'] = {
  id: 'electron-stub', filename: 'electron-stub', loaded: true, exports: electronStub,
};

require(path.join(__dirname, '..', 'main.js'));

const SAVES = path.join(USERDATA, 'saves');
const CAREER = path.join(SAVES, 'career.json');
let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { console.log(`  PASS  ${name}`); pass++; }
  else { console.log(`  FAIL  ${name}${detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''}`); fail++; }
}

(async () => {
  console.log('\n=== main.js save handlers ===');

  console.log('\n--- happy path ---');
  let r = await handlers['save-game'](null, { name: 'Probie', shiftNumber: 1 });
  check('save-game succeeds', r.success === true, r);
  check('career.json written', fs.existsSync(CAREER));
  check('no .tmp left behind', !fs.existsSync(CAREER + '.tmp'));
  r = await handlers['load-game']();
  check('round-trips', r && r.name === 'Probie', r);

  console.log('\n--- career.json is read-only (EPERM) ---');
  fs.chmodSync(CAREER, 0o444);
  r = await handlers['save-game'](null, { name: 'Locked' });
  check('returns a failure instead of throwing', r && r.success === false, r);
  check('explains why in plain english', typeof r.error === 'string' && r.error.length > 0, r);
  fs.chmodSync(CAREER, 0o666);
  const afterLocked = await handlers['load-game']();
  check('previous save survived the failed write', afterLocked && afterLocked.name === 'Probie', afterLocked);

  console.log('\n--- unserialisable save data (circular reference) ---');
  const circ = { name: 'Loop' }; circ.self = circ;
  r = await handlers['save-game'](null, circ);
  check('returns failure, does not throw', r.success === false, r);
  check('gives a reason', typeof r.error === 'string' && r.error.length > 0, r);
  check('previous save still on disk', fs.existsSync(CAREER));

  console.log('\n--- manual slots ---');
  r = await handlers['save-slot'](null, { slot: 1, data: { name: 'Slot' } });
  check('save-slot succeeds', r.success === true, r);
  r = await handlers['list-slots']();
  check('list-slots returns 3 slots', Array.isArray(r) && r.length === 3, r && r.length);
  check('slot 1 carries meta', r[0].meta && r[0].meta.name === 'Slot', r[0]);
  check('empty slots report null meta', r[1].meta === null, r[1]);

  console.log('\n--- corrupt save quarantines (regression: 2026-08-14 fix) ---');
  fs.writeFileSync(CAREER, '{ this is not json');
  r = await handlers['load-game']();
  check('load returns null, no throw', r === null, r);
  const quarantined = fs.readdirSync(SAVES).filter(f => f.includes('.corrupt-'));
  check('corrupt file quarantined, not destroyed', quarantined.length === 1, quarantined);

  console.log('\n--- delete ---');
  await handlers['save-game'](null, { name: 'ToDelete' });
  r = await handlers['delete-save']();
  check('delete succeeds', r.success === true, r);
  check('file gone', !fs.existsSync(CAREER));
  r = await handlers['delete-save']();
  check('deleting a missing save is not an error', r.success === true, r);

  console.log('\n--- settings ---');
  r = await handlers['save-settings'](null, { volume: 42, muted: true });
  check('settings save succeeds', r.success === true, r);
  r = await handlers['load-settings']();
  check('settings round-trip', r.volume === 42 && r.muted === true, r);
  fs.writeFileSync(path.join(USERDATA, 'settings.json'), 'not json');
  r = await handlers['load-settings']();
  check('corrupt settings fall back to defaults', r.volume === 70 && r.muted === false, r);

  console.log(`\n=== save handlers: ${pass} passed, ${fail} failed ===`);
  try { fs.rmSync(USERDATA, { recursive: true, force: true }); } catch (e) {}
  process.exit(fail ? 1 : 0);
})();
