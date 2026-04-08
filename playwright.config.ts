import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,

    video: "on",
    screenshot: "on",
    trace: "on-first-retry",
    
    viewport: { width: 1280, height: 720 },
  },

  reporter: [["html", { open: "always" }]],
});