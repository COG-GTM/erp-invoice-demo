# Parity suite

The same Playwright specs run against two apps: `baseline` (Angular 17, http://localhost:4000) and `upgraded` (Angular 21, http://localhost:4200). Override the URLs with `BASELINE_URL` / `UPGRADED_URL`.

```bash
# 1. Baseline: Angular 17 from main, plus the build fixes from the "bug(baseline)" commit (main does not build without them)
git worktree add ../erp-invoice-baseline <commit of "bug(baseline): make the v17 app build and test">
(cd ../erp-invoice-baseline && npm ci && npx ng serve --port 4000)

# 2. Upgraded: this branch
npm ci && npx ng serve --port 4200

# 3. Suite: both projects, then the side-by-side report in report/ (exits non-zero if any test failed)
cd parity && npm ci && npx playwright install chromium
npm run parity
```

`npm run test:baseline` and `npm run test:upgraded` are for debugging one app. Each run overwrites `report/results.json`, so run `npm run parity` before regenerating the report.
