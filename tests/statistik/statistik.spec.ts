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

// ─── Helper: klik Quick Range (combobox) 
// currentLabel = teks yang sedang tampil di dropdown sebelum diklik
async function setQuickRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-IncomeGrowth-01: Quick Range = 30D (default) 
test("TC-IncomeGrowth-01: Statistik → Income Growth → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-01_30d-default-PASSED");
});

// ─── TC-IncomeGrowth-02: Quick Range = Today ─
test("TC-IncomeGrowth-02: Statistik → Income Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-02_today-PASSED");
});

// ─── TC-IncomeGrowth-03: Quick Range = 7D ────────────────────────────────────
test("TC-IncomeGrowth-03: Statistik → Income Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-03_7d-PASSED");
});

// ─── TC-IncomeGrowth-04: Quick Range = 30D ───────────────────────────────────
test("TC-IncomeGrowth-04: Statistik → Income Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-04_30d-PASSED");
});

// ─── TC-IncomeGrowth-05: Quick Range = 90D 
test("TC-IncomeGrowth-05: Statistik → Income Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-05_90d-PASSED");
});

// ─── TC-IncomeGrowth-06: Semua Quick Range
test("TC-IncomeGrowth-06: Statistik → Income Growth → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToIncomeGrowth(page);

  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 7 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-IncomeGrowth-06_semua-quick-range-PASSED");
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

// ─── TC-UserGrowth-01: Quick Range = 30D (default)
test("TC-UserGrowth-01: Statistik → User Growth → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-01_30d-default-PASSED");
});

// ─── TC-UserGrowth-02: Quick Range = Today
test("TC-UserGrowth-02: Statistik → User Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-02_today-PASSED");
});

// ─── TC-UserGrowth-03: Quick Range = 7D
test("TC-UserGrowth-03: Statistik → User Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-03_7d-PASSED");
});

// ─── TC-UserGrowth-04: Quick Range = 30D
test("TC-UserGrowth-04: Statistik → User Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-04_30d-PASSED");
});

// ─── TC-UserGrowth-05: Quick Range = 90D
test("TC-UserGrowth-05: Statistik → User Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-05_90d-PASSED");
});

// ─── TC-UserGrowth-06: Semua Quick Range
test("TC-UserGrowth-06: Statistik → User Growth → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToUserGrowth(page);

  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 7 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-UserGrowth-06_semua-quick-range-PASSED");
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

// ─── TC-TransactionGrowth-01: Quick Range = 30D (default)
test("TC-TransactionGrowth-01: Statistik → Transaction Growth → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-01_30d-default-PASSED");
});

// ─── TC-TransactionGrowth-02: Quick Range = Today
test("TC-TransactionGrowth-02: Statistik → Transaction Growth → Today", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-02_today-PASSED");
});

// ─── TC-TransactionGrowth-03: Quick Range = 7D
test("TC-TransactionGrowth-03: Statistik → Transaction Growth → 7D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-03_7d-PASSED");
});

// ─── TC-TransactionGrowth-04: Quick Range = 30D
test("TC-TransactionGrowth-04: Statistik → Transaction Growth → 30D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-04_30d-PASSED");
});

// ─── TC-TransactionGrowth-05: Quick Range = 90D
test("TC-TransactionGrowth-05: Statistik → Transaction Growth → 90D", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);
  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-05_90d-PASSED");
});

// ─── TC-TransactionGrowth-06: Semua Quick Range
test("TC-TransactionGrowth-06: Statistik → Transaction Growth → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToTransactionGrowth(page);

  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 7 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TransactionGrowth-06_semua-quick-range-PASSED");
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

// ─── TC-OutcomeCost-01: Quick Range = 30D (default) ──────────────────────────
test("TC-OutcomeCost-01: Statistik → Outcome Cost → 30D (default)", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-01_30d-default-PASSED");
});

// ─── TC-OutcomeCost-02: Quick Range = Today ───────────────────────────────────
test("TC-OutcomeCost-02: Statistik → Outcome Cost → Today", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-02_today-PASSED");
});

// ─── TC-OutcomeCost-03: Quick Range = 7D ─────────────────────────────────────
test("TC-OutcomeCost-03: Statistik → Outcome Cost → 7D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "Last 30 days", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-03_7d-PASSED");
});

// ─── TC-OutcomeCost-04: Quick Range = 30D ────────────────────────────────────
test("TC-OutcomeCost-04: Statistik → Outcome Cost → 30D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "Last 30 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-04_30d-PASSED");
});

// ─── TC-OutcomeCost-05: Quick Range = 90D ────────────────────────────────────
test("TC-OutcomeCost-05: Statistik → Outcome Cost → 90D", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);
  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-05_90d-PASSED");
});

// ─── TC-OutcomeCost-06: Semua Quick Range ────────────────────────────────────
test("TC-OutcomeCost-06: Statistik → Outcome Cost → Semua Quick Range", async ({ loggedInPage: page, ss }) => {
  await goToOutcomeCost(page);

  await setQuickRange(page, "Last 30 days", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Today", "Last 7 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 7 days", "Last 30 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setQuickRange(page, "Last 30 days", "Last 90 days");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-OutcomeCost-06_semua-quick-range-PASSED");
});
