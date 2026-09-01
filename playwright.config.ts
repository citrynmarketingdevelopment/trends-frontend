import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  outputDir: "test-results",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [["html", { open: "never", outputFolder: "playwright-report" }]],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests/e2e",
  timeout: 30_000,
  // The Revuelto scene can consume hundreds of MiB once its embedded textures are decoded.
  // Keep browser contexts serial so local runs match the single-worker CI environment.
  workers: 1,
  use: {
    baseURL,
    launchOptions: {
      args:
        process.platform === "win32"
          ? ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"]
          : [],
    },
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm exec next dev --hostname 127.0.0.1 --port 3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: baseURL,
  },
});
