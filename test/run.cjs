// Runs every suite in test/ and reports a combined result.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const suites = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.test.cjs'))
  .sort();

let failed = 0;
for (const s of suites) {
  try {
    execFileSync(process.execPath, [path.join(__dirname, s)], { stdio: 'inherit' });
  } catch (e) {
    failed++;
  }
}
console.log(`\n${'='.repeat(46)}`);
console.log(failed ? `${failed} of ${suites.length} suite(s) FAILED` : `all ${suites.length} suites passed`);
process.exit(failed ? 1 : 0);
