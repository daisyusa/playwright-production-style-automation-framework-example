// playwright.config.ts
import path from 'node:path';
import { config } from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

config({ path: path.resolve(__dirname, '.env') });
config({ path: path.resolve(__dirname, '.dotenv/config/.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: { headless: true, screenshot: 'only-on-failure', video: 'retain-on-failure' },
  // comment globalSetup out if you don't have the file:
  // globalSetup: './global-setup.ts',
  projects: [
    {
      name: 'ui',
      testIgnore: ['tests/api/**'],
      use: {
        ...devices['Desktop Chrome'],
        //channel: 'chrome',
        baseURL: 'https://the-internet.herokuapp.com/',
      },
    },
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
        storageState: undefined,
      },
    },
  ],
});
