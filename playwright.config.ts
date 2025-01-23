import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  buyerFirstName: process.env.BUYER_FIRST_NAME!,
  buyerLastName: process.env.BUYER_LAST_NAME!,
  buyerZip: process.env.BUYER_ZIP_CODE!,
  validUsername: process.env.VALID_USERNAME!,
  validPassword: process.env.VALID_PASSWORD!,
  invalidUsername: process.env.INVALID_USERNAME!,
  invalidPassword: process.env.INVALID_PASSWORD!,
  lockedUsername: process.env.LOCKED_USERNAME!,
  baseUrl: process.env.BASE_URL!,
  aboutUrl: process.env.ABOUT_URL!,
};

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
