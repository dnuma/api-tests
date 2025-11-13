import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "./playwright-report" }],
    ["allure-playwright", { outputFolder: "./allure-results" }],
  ],
  use: {
    baseURL: 'https://practice.expandtesting.com/notes/api', 
    trace: 'on-first-retry',
  },
  timeout: 30_000,
  expect: {
    timeout: 20_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      }
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], 
      },
    }
  ]
});
