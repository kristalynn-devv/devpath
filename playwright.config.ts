import { defineConfig } from "@playwright/test";
const port = process.env.PLAYWRIGHT_PORT ?? "3000";
export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: `http://localhost:${port}`,
    headless: true,
    channel: "chrome",
  },
  webServer: {
    command: `python3 -m http.server ${port} --directory out`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
  },
});
