import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,        // Reduced global timeout
  expect: {
    timeout: 5000       // Reduced expect timeout
  },
  workers: 1,           // Run tests sequentially
  retries: 1,          // Reduce retries
  reporter: [
    ['list'],          // Simpler reporter for CI
    ['html']           // Keep HTML report for artifacts
  ],
  use: {
    baseURL: 'https://epicbet.com',
    // Only track essential things in CI
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',      // Disable video to improve performance

    // Faster browser launch
    launchOptions: {
      args: ['--no-sandbox', '--disable-gpu']
    }
  },
  // Only run tests in Chromium for CI
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ]
};

export default config;
