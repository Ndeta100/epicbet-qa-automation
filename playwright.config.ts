import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://epicbet.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    },
    contextOptions: {
      ignoreHTTPSErrors: true,
      bypassCSP: true
    },
    // Add these options to handle redirects and iframes better
    navigationOptions: {
      waitUntil: 'networkidle',
      timeout: 60000
    }
  },
  expect: {
    timeout: 10000,
    toMatchSnapshot: { maxDiffPixelRatio: 0.1 }
  },
  // Add retry for flaky tests in CI
  retries: process.env.CI ? 2 : 0
};

export default config;