import { defineConfig, devices } from '@playwright/test';

// One run id shared by both projects so the same test data (and screenshots) are used on each side.
process.env['PARITY_RUN_ID'] ??= String(Date.now()).slice(-5);

export default defineConfig({
  testDir: './specs',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'report/results.json' }]],
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'baseline', use: { baseURL: process.env['BASELINE_URL'] ?? 'http://localhost:4000' } },
    { name: 'upgraded', use: { baseURL: process.env['UPGRADED_URL'] ?? 'http://localhost:4200' } },
  ],
});
