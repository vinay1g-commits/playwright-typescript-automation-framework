// Import Playwright's configuration and device settings
import { defineConfig, devices } from '@playwright/test';

// Load environment variables from .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// Export Playwright test configuration
export default defineConfig({
  // Folder where test files are located
  testDir: './tests',

  // Max time (in ms) one test can run: 30 * 1000 = 30 seconds
  timeout: 30 * 1000,

  // Allow tests in the same file to run in parallel
  fullyParallel: true,

  // Fail build if test.only is left in code (enabled in CI only) Protects your CI runs from accidentally running just one test.
  forbidOnly: !!process.env.CI,

  // Number of retries for failed tests (2 in CI, 0 locally)
  retries: process.env.CI ? 2 : 0,

  // Limit workers to 1 in CI; use all CPU cores locally
  workers: process.env.CI ? 1 : undefined,

  // Configure test result reporting
  reporter: [
    [
      'html',
      {
        open: 'never', // Don't auto-open the HTML report
        outputFolder: 'playwright-report', // Save report in this folder
      },
    ],
  ],

  // Default settings for all tests
  use: {
    // Base URL for the app under test (from .env or fallback to '')
    baseURL: process.env.BASE_URL || '',

    // Run headless on CI, show browser locally
    headless: process.env.CI ? true : false,

    // Set browser window size
    viewport: { width: 1366, height: 768 },

    // Take screenshot only when test fails
    screenshot: 'only-on-failure',

    // Record video only when test fails
    video: 'retain-on-failure',

    // Retain trace only for failed tests (great for debugging)
    trace: 'retain-on-failure',
  },

  // Define which browsers and devices to run tests on
  projects: [
    {
      name: 'chromium', // Chrome-based browser
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox', // Firefox browser
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit', // Safari (macOS/iOS engine)
      use: { browserName: 'webkit' },
    },
    {
      name: 'Mobile Chrome', // Simulate Chrome on Pixel 5
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Script that runs once before all tests (e.g., login/setup)
  //globalSetup: require.resolve('./utils/globalSetup.ts'),
});
