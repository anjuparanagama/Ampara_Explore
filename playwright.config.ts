import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Test Configuration for Ampara Explore Tourism Platform
 * Configured with Senior QA best practices:
 * - Resilient timeouts for full-stack Next.js dev server execution
 * - Chromium desktop and Pixel 5 mobile viewport testing
 * - Trace and failure capture artifacts
 */
export default defineConfig({
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 45 * 1000,
  expect: {
    /* Maximum time expect() should wait for conditions */
    timeout: 10 * 1000,
  },
  /* Run tests across files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Controlled workers to avoid choking Next.js dev server compiler on Windows */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use */
  reporter: [
    ["html", { open: "never" }],
    ["list"],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* Dev server integration */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
