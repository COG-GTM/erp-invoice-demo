// Runs both Playwright projects, then writes the report; exits non-zero if either step fails.
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

fs.rmSync(path.join(__dirname, 'report', 'results.json'), { force: true });

const run = args => spawnSync(process.execPath, args, { stdio: 'inherit', cwd: __dirname }).status ?? 1;
const tests = run([require.resolve('@playwright/test/cli'), 'test']);
const report = run(['compose-report.js']);
process.exit(tests || report);
