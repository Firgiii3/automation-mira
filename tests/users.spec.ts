import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;
const SEARCH_NAME = "iki@ultrazbola.com";

// ─── Helper: login → Management → Users → Search → View Detail ───────────────
async function goToUserDetail(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Management (toggle accordion)
  await page.getByRole("button", { name: "Management" }).click();
  await page.waitForTimeout(1500);

  // klik Users
  await page.getByRole("link", { name: "Users" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman users
  await expect(page).toHaveURL(/account-management\/users/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // search user (accessible name di UI = "Search", bukan teks placeholder penuh)
  await page.getByRole("textbox", { name: "Search" }).fill(SEARCH_NAME);
  await page.waitForTimeout(1500);
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // klik tombol action (titik tiga) di baris pertama hasil search
  await page.locator("table tbody tr").first().locator("button").last().click();

  // klik View Details
  await page.getByText("View Details").click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi masuk ke halaman detail user (URL: /account-management/users/[id])
  await expect(page).toHaveURL(/account-management\/users\/\d+$/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Users-01: Top-Up History ─────────────────────────────────────────────
test("TC-Users-01: Management → Users → Search → View Detail → Top-Up History", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  await page.getByRole("tab", { name: "Top-Up History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/topup/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-01_topup-history-PASSED");
});

// ─── TC-Users-02: Gift History ───────────────────────────────────────────────
test("TC-Users-02: Management → Users → Search → View Detail → Gift History", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  await page.getByRole("tab", { name: "Gift History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/gift-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-02_gift-history-PASSED");
});

// ─── TC-Users-03: Chats ──────────────────────────────────────────────────────
test("TC-Users-03: Management → Users → Search → View Detail → Chats", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  await page.getByRole("tab", { name: "Chats" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/chats/, { timeout: 10000 });

  const chatSearchById = page.getByRole("textbox", { name: "Search by ID..." });
  await chatSearchById.fill("100");

  await page.getByText("Newest First").click();
  await page.getByRole("option", { name: "Oldest First" }).click();

  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-03_chats-PASSED");
});

// ─── TC-Users-04: Call History ───────────────────────────────────────────────
test("TC-Users-04: Management → Users → Search → View Detail → Call History", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  await page.getByRole("tab", { name: "Call History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/call-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-04_call-history-PASSED");
});

// ─── TC-Users-05: Daily Activity ─────────────────────────────────────────────
test("TC-Users-05: Management → Users → Search → View Detail → Daily Activity", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  await page.getByRole("tab", { name: "Daily Activity" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/daily-activity/, { timeout: 10000 });

 
  await page.getByText("All time", { exact: true }).click();
  const todayOption = page.getByRole("option", { name: "Today" });
  if (await todayOption.count()) {
    await todayOption.click();
  } else {
    await page.getByText("Today", { exact: true }).click();
  }
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);

  await page.getByText("Today", { exact: true }).click();
  const dateRangeOption = page.getByRole("option", { name: "Date range" });
  if (await dateRangeOption.count()) {
    await dateRangeOption.click();
  } else {
    await page.getByText("Date range", { exact: true }).click();
  }
  await page.waitForTimeout(500);

  // samakan pola dengan `setTalentPickDate` di report.spec.ts
  await page.getByRole("group", { name: "Start date" }).getByLabel("Choose date").click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: "1", exact: true }).first().click();
  await page.waitForTimeout(500);

  await page.getByRole("group", { name: "End date" }).getByLabel("Choose date").click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: "7", exact: true }).first().click();
  await page.waitForTimeout(500);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-05_daily-activity-PASSED");
});

// ─── TC-Users-06: Semua Tab Sekaligus ────────────────────────────────────────
test("TC-Users-06: Management → Users → Search → View Detail → Semua Tab", async ({ loggedInPage: page, ss }) => {
  await goToUserDetail(page);

  // Top-Up History
  await page.getByRole("tab", { name: "Top-Up History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/topup/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Gift History
  await page.getByRole("tab", { name: "Gift History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/gift-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Chats
  await page.getByRole("tab", { name: "Chats" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/chats/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Call History
  await page.getByRole("tab", { name: "Call History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/call-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Daily Activity — screenshot terakhir sebagai bukti semua tab berhasil
  await page.getByRole("tab", { name: "Daily Activity" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/daily-activity/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Users-06_semua-tab-PASSED");
});
