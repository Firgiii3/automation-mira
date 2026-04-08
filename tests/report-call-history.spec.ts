import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;

// ─── Helper: navigasi ke Reports → Call History ───────────────────────────────
async function goToCallHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/reports/call-history");
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman
  await expect(page).toHaveURL(/reports\/call-history/, { timeout: 10000 });

  // verifikasi Date Range combobox muncul
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: set Date Range filter ───────────────────────────────────────────
async function setDateRange(page: any, range: string) {
  await page.getByRole("combobox").first().click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Pick Date dengan mengisi Start Date & End Date (format dd/mm/yyyy) ──
async function setPickDate(page: any, startDate: string, endDate: string) {
  await page.getByRole("combobox").first().click();
  await page.getByRole("option", { name: "Pick Date", exact: true }).click();
  await page.waitForTimeout(1000);

  // klik Start Date input lalu ketik tanggal
  const startInput = page.getByLabel("Start Date");
  await startInput.click();
  await startInput.fill(startDate);
  await page.keyboard.press("Escape"); // tutup calendar jika terbuka
  await page.waitForTimeout(500);

  // klik End Date input lalu ketik tanggal
  const endInput = page.getByLabel("End Date");
  await endInput.click();
  await endInput.fill(endDate);
  await page.keyboard.press("Escape"); // tutup calendar
  await page.waitForTimeout(500);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-CallHistory-01: Date Range = All Time ─────────────────────────────────
test("TC-CallHistory-01: Reports → Call History → All Time", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-01_all-time-PASSED");
});

// ─── TC-CallHistory-02: Date Range = Today ────────────────────────────────────
test("TC-CallHistory-02: Reports → Call History → Today", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-02_today-PASSED");
});

// ─── TC-CallHistory-03: Date Range = This Week ───────────────────────────────
test("TC-CallHistory-03: Reports → Call History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-03_this-week-PASSED");
});

// ─── TC-CallHistory-04: Date Range = This Month ──────────────────────────────
test("TC-CallHistory-04: Reports → Call History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-04_this-month-PASSED");
});

// ─── TC-CallHistory-05: Date Range = Pick Date ───────────────────────────────
test("TC-CallHistory-05: Reports → Call History → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setPickDate(page, "04/04/2025", "04/04/2026");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-05_pick-date-PASSED");
});

// ─── TC-CallHistory-06: Semua Date Range ─────────────────────────────────────
test("TC-CallHistory-06: Reports → Call History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);

  await setDateRange(page, "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setPickDate(page, "04/04/2025", "04/04/2026");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-06_semua-date-PASSED");
});
