import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;

// ─── Helper: login → Transactions → Order History ────────────────────────────
async function goToOrderHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Transactions (toggle accordion)
  await page.getByRole("button", { name: "Transactions" }).click();
  await page.waitForTimeout(1500);

  // klik Order History
  await page.getByRole("link", { name: "Order History" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman order history
  await expect(page).toHaveURL(/transactions\/order-history/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Order History", level: 1 })).toBeVisible({ timeout: 10000 });
  // verifikasi filter combobox muncul (bukti halaman sudah render, meski data kosong)
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: set Status filter ────────────────────────────────────────────────
async function setStatus(page: any, status: string) {
  await page.getByRole("combobox").first().click();
  await page.getByRole("option", { name: status }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Date Range filter (untuk halaman dengan 2 combobox: Status + Date Range) ──
async function setDateRange(page: any, range: string) {
  await page.getByRole("combobox").nth(1).click();
  await page.getByRole("option", { name: range }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Date Range filter (untuk halaman dengan 1 combobox saja) ────
async function setDateRangeOnly(page: any, range: string) {
  await page.getByRole("combobox").first().click();
  await page.getByRole("option", { name: range }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-Transaction-01: Status=Success, Date Range=Today 
test("TC-Transaction-01: Transactions → Order History → Success → Today", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Success");
  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-01_success-today-PASSED");
});

// ─── TC-Transaction-02: Status=Success, Date Range=This Week ─────────────────
test("TC-Transaction-02: Transactions → Order History → Success → This Week", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Success");
  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-02_success-this-week-PASSED");
});

// ─── TC-Transaction-03: Status=Success, Date Range=This Month ────────────────
test("TC-Transaction-03: Transactions → Order History → Success → This Month", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Success");
  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-03_success-this-month-PASSED");
});

// ─── TC-Transaction-04: Status=Success, Semua Date Range ─────────────────────
test("TC-Transaction-04: Transactions → Order History → Success → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Success");

  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-04_success-semua-date-PASSED");
});

// ─── TC-Transaction-05: Status=Pending, Date Range=Today ─────────────────────
test("TC-Transaction-05: Transactions → Order History → Pending → Today", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Pending");
  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-05_pending-today-PASSED");
});

// ─── TC-Transaction-06: Status=Pending, Date Range=This Week ─────────────────
test("TC-Transaction-06: Transactions → Order History → Pending → This Week", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Pending");
  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-06_pending-this-week-PASSED");
});

// ─── TC-Transaction-07: Status=Pending, Date Range=This Month ────────────────
test("TC-Transaction-07: Transactions → Order History → Pending → This Month", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Pending");
  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-07_pending-this-month-PASSED");
});

// ─── TC-Transaction-08: Status=Pending, Semua Date Range ─────────────────────
test("TC-Transaction-08: Transactions → Order History → Pending → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Pending");

  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-08_pending-semua-date-PASSED");
});

// ─── TC-Transaction-09: Status=Failed, Date Range=Today ──────────────────────
test("TC-Transaction-09: Transactions → Order History → Failed → Today", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Failed");
  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-09_failed-today-PASSED");
});

// ─── TC-Transaction-10: Status=Failed, Date Range=This Week ──────────────────
test("TC-Transaction-10: Transactions → Order History → Failed → This Week", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Failed");
  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-10_failed-this-week-PASSED");
});

// ─── TC-Transaction-11: Status=Failed, Date Range=This Month ─────────────────
test("TC-Transaction-11: Transactions → Order History → Failed → This Month", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Failed");
  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-11_failed-this-month-PASSED");
});

test("TC-Transaction-12: Transactions → Order History → Failed → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToOrderHistory(page);
  await setStatus(page, "Failed");

  await setDateRange(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Transaction-12_failed-semua-date-PASSED");
});

// CALL TRANSACTION HISTORY



async function goToCallTransactionHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Transactions (toggle accordion)
  await page.getByRole("button", { name: "Transactions" }).click();
  await page.waitForTimeout(1500);

  // klik Call Transaction History
  await page.getByRole("link", { name: "Call Transaction History" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman
  await expect(page).toHaveURL(/transactions\/call-transaction-history/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Call Transaction History", level: 1 })).toBeVisible({ timeout: 10000 });
  // verifikasi filter Date Range muncul (satu-satunya filter di halaman ini)
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

test("TC-Call-01: Transactions → Call Transaction History → Today", async ({ loggedInPage: page, ss }) => {
  await goToCallTransactionHistory(page);
  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Call-01_today-PASSED");
});

test("TC-Call-02: Transactions → Call Transaction History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToCallTransactionHistory(page);
  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Call-02_this-week-PASSED");
});

test("TC-Call-03: Transactions → Call Transaction History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToCallTransactionHistory(page);
  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Call-03_this-month-PASSED");
});

test("TC-Call-04: Transactions → Call Transaction History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToCallTransactionHistory(page);

  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Call-04_semua-date-PASSED");
});

// CHAT TRANSACTION HISTORY



async function goToChatTransactionHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Transactions (toggle accordion)
  await page.getByRole("button", { name: "Transactions" }).click();
  await page.waitForTimeout(1500);

  // klik Chat Transaction History
  await page.getByRole("link", { name: "Chat Transaction History" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman
  await expect(page).toHaveURL(/transactions\/chat-transaction-history/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Chat Transaction History", level: 1 })).toBeVisible({ timeout: 10000 });
  // verifikasi filter Date Range muncul (satu-satunya filter di halaman ini)
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Chat-01: Date Range=Today ────────────────────────────────────────────
test("TC-Chat-01: Transactions → Chat Transaction History → Today", async ({ loggedInPage: page, ss }) => {
  await goToChatTransactionHistory(page);
  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Chat-01_today-PASSED");
});

// ─── TC-Chat-02: Date Range=This Week ────────────────────────────────────────
test("TC-Chat-02: Transactions → Chat Transaction History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToChatTransactionHistory(page);
  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Chat-02_this-week-PASSED");
});

// ─── TC-Chat-03: Date Range=This Month ───────────────────────────────────────
test("TC-Chat-03: Transactions → Chat Transaction History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToChatTransactionHistory(page);
  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Chat-03_this-month-PASSED");
});

// ─── TC-Chat-04: Semua Date Range ────────────────────────────────────────────
test("TC-Chat-04: Transactions → Chat Transaction History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToChatTransactionHistory(page);

  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Chat-04_semua-date-PASSED");
});

// GIFTS PURCHASED HISTORY


async function goToGiftsPurchasedHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Transactions (toggle accordion)
  await page.getByRole("button", { name: "Transactions" }).click();
  await page.waitForTimeout(1500);

  // klik Gifts Purchased History
  await page.getByRole("link", { name: "Gifts Purchased History" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman
  await expect(page).toHaveURL(/transactions\/gifts-purchased-history/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Gifts Purchased History", level: 1 })).toBeVisible({ timeout: 10000 });
  // verifikasi filter Date Range muncul (satu-satunya filter di halaman ini)
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Gifts-01: Date Range=All Time ────────────────────────────────────────
test("TC-Gifts-01: Transactions → Gifts Purchased History → All Time", async ({ loggedInPage: page, ss }) => {
  await goToGiftsPurchasedHistory(page);
  await setDateRangeOnly(page, "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Gifts-01_all-time-PASSED");
});

// ─── TC-Gifts-02: Date Range=Today ───────────────────────────────────────────
test("TC-Gifts-02: Transactions → Gifts Purchased History → Today", async ({ loggedInPage: page, ss }) => {
  await goToGiftsPurchasedHistory(page);
  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Gifts-02_today-PASSED");
});

// ─── TC-Gifts-03: Date Range=This Week 
test("TC-Gifts-03: Transactions → Gifts Purchased History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToGiftsPurchasedHistory(page);
  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Gifts-03_this-week-PASSED");
});

// ─── TC-Gifts-04: Date Range=This Month 
test("TC-Gifts-04: Transactions → Gifts Purchased History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToGiftsPurchasedHistory(page);
  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Gifts-04_this-month-PASSED");
});

// ─── TC-Gifts-05: Semua Date Range ───────────────────────────────────────────
test("TC-Gifts-05: Transactions → Gifts Purchased History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToGiftsPurchasedHistory(page);

  await setDateRangeOnly(page, "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRangeOnly(page, "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Gifts-05_semua-date-PASSED");
});
