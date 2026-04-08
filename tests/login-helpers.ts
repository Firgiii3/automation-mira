import type { Page } from "@playwright/test";

/** Sama dengan pola di `loggedInPage` fixture — input pertama + password + submit */
export function loginFormLocators(page: Page) {
  return {
    emailInput: page.locator("input").nth(0),
    passwordInput: page.locator('input[type="password"]'),
    submitButton: page.locator('button[type="submit"]'),
  };
}

export async function gotoLoginPage(page: Page) {
  await page.goto("/login");
  await page.waitForLoadState("domcontentloaded");
}
