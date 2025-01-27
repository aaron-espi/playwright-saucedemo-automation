import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: 'html',
  use: {
    headless: true,
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
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Desktop 4K',
      use: { viewport: { width: 3840, height: 2160 } },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad (gen 7)'] },
    },
    {
      name: 'Desktop Chrome Dark Mode',
      use: { ...devices['Desktop Chrome'], colorScheme: 'dark' },
    },
    {
      name: 'Desktop Chrome Light Mode',
      use: { ...devices['Desktop Chrome'], colorScheme: 'light' },
    },
    {
      name: 'edge',
      use: { channel: 'msedge' },
    },
    {
      name: 'chromium incognito',
      use: { ...devices['Desktop Chrome'], storageState: undefined },
    },
  ],
});
