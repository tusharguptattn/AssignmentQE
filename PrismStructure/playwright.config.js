// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    headless: true,
    actionTimeout: 15000,
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  timeout: 90000,
  expect: { timeout: 12000 },
});
