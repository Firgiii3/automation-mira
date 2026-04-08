import { test as base, expect, type Page } from "@playwright/test";
import path from "path";
import fs from "fs";
import { gotoLoginPage, loginFormLocators } from "./login-helpers";

/** Nama folder aman untuk Windows / macOS / Linux */
function sanitizeFolderName(name: string): string {
  const cleaned = name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.\s]+$/g, "");
  return cleaned.slice(0, 200) || "unnamed-test";
}

type SsFn = (name: string) => Promise<void>;

type AuthFixtures = {
  loggedInPage: Page;
  ss: SsFn;
};

export const test = base.extend<AuthFixtures>({
  // Satu folder per test
  ss: async ({ page }, use, testInfo) => {
    const folderName = sanitizeFolderName(testInfo.title);
    const testDir = path.join(process.cwd(), "screenshots", folderName);
    fs.mkdirSync(testDir, { recursive: true });

    const takeSs = async (name: string) => {
      const filename = `${name}.png`;
      const filePath = path.join(testDir, filename);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`[SS] Tersimpan: screenshots/${folderName}/${filename}`);
    };

    await use(takeSs);
  },

  loggedInPage: async ({ page }, use) => {
    const emailValue = process.env.TEST_LOGIN_ID || "";
    const passwordValue = process.env.TEST_PASSWORD || "";

    // validasi env tidak kosong
    if (!emailValue || !passwordValue) {
      throw new Error(
        "TEST_LOGIN_ID dan TEST_PASSWORD"
      );
    }

    // login (locator sama dengan login.spec lewat login-helpers)
    await gotoLoginPage(page);
    const { emailInput, passwordInput, submitButton } = loginFormLocators(page);
    await emailInput.fill(emailValue);
    await passwordInput.fill(passwordValue);
    await submitButton.click();

    // tunggu sampai dashboard muncul
    await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({
      timeout: 15000,
    });


    await use(page);
  },
});

export { expect };
