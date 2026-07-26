import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  projects: [
    {
      name: "mobile-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: {width: 390, height: 844},
        deviceScaleFactor: 1
      }
    }
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000/ja",
    reuseExistingServer: true,
    timeout: 120_000
  }
});
