import type { PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
  testDir: './tests',

  use: {
    baseURL: 'https://epicbet.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    launchOptions: {
      // Adjust for local environment
      // @ts-ignore
      headless: process.env.CI || process.env.HEADLESS !== 'false',
      args: process.env.CI
          ? [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
          ]
          : [],
    },
    contextOptions: {
      ignoreHTTPSErrors: true,
      bypassCSP: true,
    },
    navigationOptions: {
      waitUntil: 'networkidle',
      timeout: 60000,
    },
  },
  expect: {
    timeout: 10000,
    toMatchSnapshot: { maxDiffPixelRatio: 0.1 },
  },
  retries: process.env.CI ? 2 : 0,
};

export default config;