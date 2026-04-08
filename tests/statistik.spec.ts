import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;

// ─── Helper: navigasi ke Statistik → Income Growth ───────────────────────────
async function goToIncomeGrowth(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/statistics/income-growth");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/statistics\/income-growth/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: klik Quick Range (combobox) ─────────────────────────────────────
// currentLabel = teks yang sedang tampil di dropdown sebelum diklik
async function setQuickRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-IncomeGrowth-01: Quick Range = 30D (default) ─────────────────────────
test("TC-IncomeGrowth-01: Statistik → Income Growth → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-01_30d-default-PASSED");
});

// ─── TC-IncomeGrowth-02: Quick Range = Today ─────────────────────────────────
test("TC-IncomeGrowth-02: Statistik → Income Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "30D", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-02_today-PASSED");
});

// ─── TC-IncomeGrowth-03: Quick Range = 7D ────────────────────────────────────
test("TC-IncomeGrowth-03: Statistik → Income Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "30D", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-03_7d-PASSED");
});

// ─── TC-IncomeGrowth-04: Quick Range = 30D ───────────────────────────────────
test("TC-IncomeGrowth-04: Statistik → Income Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "30D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-04_30d-PASSED");
});

// ─── TC-IncomeGrowth-05: Quick Range = 90D ───────────────────────────────────
test("TC-IncomeGrowth-05: Statistik → Income Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-05_90d-PASSED");
});

// ─── TC-IncomeGrowth-06: Semua Quick Range ───────────────────────────────────
test("TC-IncomeGrowth-06: Statistik → Income Growth → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);

  await setQuickRange(page, "30D", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "7D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-06_semua-quick-range-PASSED");
});

// ─── Helper: isi Start date & End date Income Growth (format yyyy-mm-dd) ──────
async function setIncomePickDate(page: any, startDate: string, endDate: string) {
  await page.getByRole("textbox", { name: "Start date" }).fill(startDate);
  await page.waitForTimeout(500);
  await page.getByRole("textbox", { name: "End date" }).fill(endDate);
  await page.waitForTimeout(500);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-IncomeGrowth-07: Pick Date (Start: 4 Apr 2025 → End: 4 Apr 2026) ─────
test("TC-IncomeGrowth-07: Statistik → Income Growth → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setIncomePickDate(page, "2025-04-04", "2026-04-04");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-07_pick-date-PASSED");
});

// USER GROWTH 

// ─── Helper: navigasi ke Statistik → User Growth ─────────────────────────────
async function goToUserGrowth(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/statistics/user-growth");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/statistics\/user-growth/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: isi Start date & End date User Growth via kalender ───────────────
// startDay/endDay = tanggal dalam bulan yang sama (April 2026)
async function setUserPickDate(page: any, startDay: string, endDay: string) {
  // buka kalender Start date lalu pilih hari
  await page.getByRole("group", { name: "Start date" }).getByLabel("Choose date").click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: startDay, exact: true }).first().click();
  await page.waitForTimeout(500);

  // buka kalender End date lalu pilih hari
  await page.getByRole("button", { name: "Choose date", exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: endDay, exact: true }).first().click();
  await page.waitForTimeout(500);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Select date range User Growth ────────────────────────────────
async function setUserDateRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-UserGrowth-01: Default (Select date range = All) ─────────────────────
test("TC-UserGrowth-01: Statistik → User Growth → Default (All)", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-01_default-all-PASSED");
});

// ─── TC-UserGrowth-02: Pick Date (Start: 1 Apr 2026 → End: 7 Apr 2026) ───────
test("TC-UserGrowth-02: Statistik → User Growth → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserPickDate(page, "1", "7");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-02_pick-date-PASSED");
});

// ─── TC-UserGrowth-03: Select date range = All ───────────────────────────────
test("TC-UserGrowth-03: Statistik → User Growth → All", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-03_all-PASSED");
});

// ─── TC-UserGrowth-04: Select date range = Today ─────────────────────────────
test("TC-UserGrowth-04: Statistik → User Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-04_today-PASSED");
});

// ─── TC-UserGrowth-05: Select date range = Yesterday ─────────────────────────
test("TC-UserGrowth-05: Statistik → User Growth → Yesterday", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-05_yesterday-PASSED");
});

// ─── TC-UserGrowth-06: Select date range = 7D ────────────────────────────────
test("TC-UserGrowth-06: Statistik → User Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-06_7d-PASSED");
});

// ─── TC-UserGrowth-07: Select date range = 30D ───────────────────────────────
test("TC-UserGrowth-07: Statistik → User Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-07_30d-PASSED");
});

// ─── TC-UserGrowth-08: Select date range = 90D ───────────────────────────────
test("TC-UserGrowth-08: Statistik → User Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setUserDateRange(page, "All", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-08_90d-PASSED");
});

// ─── TC-UserGrowth-09: Semua Select date range ───────────────────────────────
test("TC-UserGrowth-09: Statistik → User Growth → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);

  await setUserDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setUserDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setUserDateRange(page, "Today", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setUserDateRange(page, "Yesterday", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setUserDateRange(page, "7D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setUserDateRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-09_semua-date-range-PASSED");
});

// TRANSACTION GROWTH 

// ─── Helper: navigasi ke Statistik → Transaction Growth ──────────────────────
async function goToTransactionGrowth(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/statistics/transaction-growth");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/statistics\/transaction-growth/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: isi Start date & End date Transaction Growth via kalender ────────
async function setTransactionPickDate(page: any, startDay: string, endDay: string) {
  await page.getByRole("group", { name: "Start date" }).getByLabel("Choose date").click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: startDay, exact: true }).first().click();
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: "Choose date", exact: true }).click();
  await page.waitForTimeout(500);
  await page.getByRole("gridcell", { name: endDay, exact: true }).first().click();
  await page.waitForTimeout(500);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Select date range Transaction Growth ─────────────────────────
async function setTransactionDateRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-TransactionGrowth-01: Default (Select date range = All) ───────────────
test("TC-TransactionGrowth-01: Statistik → Transaction Growth → Default (All)", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-01_default-all-PASSED");
});

// ─── TC-TransactionGrowth-02: Pick Date (Start: 1 Apr 2026 → End: 7 Apr 2026) ─
test("TC-TransactionGrowth-02: Statistik → Transaction Growth → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionPickDate(page, "1", "7");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-02_pick-date-PASSED");
});

// ─── TC-TransactionGrowth-03: Select date range = All ────────────────────────
test("TC-TransactionGrowth-03: Statistik → Transaction Growth → All", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-03_all-PASSED");
});

// ─── TC-TransactionGrowth-04: Select date range = Today ──────────────────────
test("TC-TransactionGrowth-04: Statistik → Transaction Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-04_today-PASSED");
});

// ─── TC-TransactionGrowth-05: Select date range = Yesterday ──────────────────
test("TC-TransactionGrowth-05: Statistik → Transaction Growth → Yesterday", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-05_yesterday-PASSED");
});

// ─── TC-TransactionGrowth-06: Select date range = 7D ─────────────────────────
test("TC-TransactionGrowth-06: Statistik → Transaction Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-06_7d-PASSED");
});

// ─── TC-TransactionGrowth-07: Select date range = 30D ────────────────────────
test("TC-TransactionGrowth-07: Statistik → Transaction Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-07_30d-PASSED");
});

// ─── TC-TransactionGrowth-08: Select date range = 90D ────────────────────────
test("TC-TransactionGrowth-08: Statistik → Transaction Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setTransactionDateRange(page, "All", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-08_90d-PASSED");
});

// ─── TC-TransactionGrowth-09: Semua Select date range ────────────────────────
test("TC-TransactionGrowth-09: Statistik → Transaction Growth → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);

  await setTransactionDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTransactionDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTransactionDateRange(page, "Today", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTransactionDateRange(page, "Yesterday", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTransactionDateRange(page, "7D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTransactionDateRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-09_semua-date-range-PASSED");
});


// OUTCOME / COST 


// ─── Helper: navigasi ke Statistik → Outcome / Cost ──────────────────────────
async function goToOutcomeCost(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/statistics/outcome-cost");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/statistics\/outcome-cost/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: isi Start date & End date Outcome Cost (format yyyy-mm-dd) ───────
async function setOutcomePickDate(page: any, startDate: string, endDate: string) {
  await page.getByRole("textbox", { name: "Start date" }).fill(startDate);
  await page.waitForTimeout(500);
  await page.getByRole("textbox", { name: "End date" }).fill(endDate);
  await page.waitForTimeout(500);
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-OutcomeCost-01: Quick Range = 30D (default) ──────────────────────────
test("TC-OutcomeCost-01: Statistik → Outcome Cost → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-01_30d-default-PASSED");
});

// ─── TC-OutcomeCost-02: Quick Range = Today ───────────────────────────────────
test("TC-OutcomeCost-02: Statistik → Outcome Cost → Today", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "30D", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-02_today-PASSED");
});

// ─── TC-OutcomeCost-03: Quick Range = 7D ─────────────────────────────────────
test("TC-OutcomeCost-03: Statistik → Outcome Cost → 7D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "30D", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-03_7d-PASSED");
});

// ─── TC-OutcomeCost-04: Quick Range = 30D ────────────────────────────────────
test("TC-OutcomeCost-04: Statistik → Outcome Cost → 30D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "30D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-04_30d-PASSED");
});

// ─── TC-OutcomeCost-05: Quick Range = 90D ────────────────────────────────────
test("TC-OutcomeCost-05: Statistik → Outcome Cost → 90D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-05_90d-PASSED");
});

// ─── TC-OutcomeCost-06: Pick Date (Start: 4 Apr 2025 → End: 4 Apr 2026) ──────
test("TC-OutcomeCost-06: Statistik → Outcome Cost → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setOutcomePickDate(page, "2025-04-04", "2026-04-04");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-06_pick-date-PASSED");
});

// ─── TC-OutcomeCost-07: Semua Quick Range ────────────────────────────────────
test("TC-OutcomeCost-07: Statistik → Outcome Cost → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);

  await setQuickRange(page, "30D", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "7D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-07_semua-quick-range-PASSED");
});
