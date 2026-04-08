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
async function setDateRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── Helper: set Pick Date dengan mengisi Start Date & End Date (format yyyy-mm-dd) ──
async function setPickDate(page: any, currentLabel: string, startDate: string, endDate: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: "Pick Date" }).click();
  await page.waitForTimeout(1000);

  // isi Start Date (input type="date" pakai format yyyy-mm-dd)
  await page.getByRole("textbox", { name: "Start Date" }).fill(startDate);
  await page.waitForTimeout(500);

  // isi End Date
  await page.getByRole("textbox", { name: "End Date" }).fill(endDate);
  await page.waitForTimeout(500);

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-CallHistory-01: Date Range = All Time ─────────────────────────────────
test("TC-CallHistory-01: Reports → Call History → All Time", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-01_all-time-PASSED");
});

// ─── TC-CallHistory-02: Date Range = Today ────────────────────────────────────
test("TC-CallHistory-02: Reports → Call History → Today", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-02_today-PASSED");
});

// ─── TC-CallHistory-03: Date Range = This Week ───────────────────────────────
test("TC-CallHistory-03: Reports → Call History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "All Time", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-03_this-week-PASSED");
});

// ─── TC-CallHistory-04: Date Range = This Month ──────────────────────────────
test("TC-CallHistory-04: Reports → Call History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setDateRange(page, "All Time", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-04_this-month-PASSED");
});

// ─── TC-CallHistory-05: Date Range = Pick Date ───────────────────────────────
test("TC-CallHistory-05: Reports → Call History → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);
  await setPickDate(page, "All Time", "2025-04-04", "2026-04-04");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-05_pick-date-PASSED");
});

// ─── TC-CallHistory-06: Klik Icon Mata → Call Detail ─────────────────────────
test("TC-CallHistory-06: Reports → Call History → Klik Icon Mata → Call Detail", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);

  // tunggu baris pertama tabel muncul
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // klik icon mata (Actions) di baris pertama
  await page.locator("table tbody tr").first().locator("td").last().locator("a, button").first().click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi URL berubah ke /reports/call-history/{uuid} — UUID apapun tetap terbaca
  await expect(page).toHaveURL(/reports\/call-history\/[0-9a-f-]{36}/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-06_call-detail-PASSED");
});


// CHAT HISTORY 


// ─── Helper: navigasi ke Reports → Chat History ───────────────────────────────
async function goToChatHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/reports/chat-history");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/reports\/chat-history/, { timeout: 10000 });
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-ChatHistory-01: Date Range = All Time ────────────────────────────────
test("TC-ChatHistory-01: Reports → Chat History → All Time", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-01_all-time-PASSED");
});

// ─── TC-ChatHistory-02: Date Range = Today ───────────────────────────────────
test("TC-ChatHistory-02: Reports → Chat History → Today", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-02_today-PASSED");
});

// ─── TC-ChatHistory-03: Date Range = This Week ───────────────────────────────
test("TC-ChatHistory-03: Reports → Chat History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "All Time", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-03_this-week-PASSED");
});

// ─── TC-ChatHistory-04: Date Range = This Month ──────────────────────────────
test("TC-ChatHistory-04: Reports → Chat History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "All Time", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-04_this-month-PASSED");
});

// ─── TC-ChatHistory-05: Semua Date Range (Status = Active) ───────────────────
test("TC-ChatHistory-05: Reports → Chat History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);

  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "Today", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-05_semua-date-PASSED");
});

// ─── TC-ChatHistory-06: Status = Locked, Date Range = All Time ───────────────
test("TC-ChatHistory-06: Reports → Chat History → Locked → All Time", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "Active", "Locked");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-06_locked-all-time-PASSED");
});

// ─── TC-ChatHistory-07: Status = Locked, Date Range = Today ──────────────────
test("TC-ChatHistory-07: Reports → Chat History → Locked → Today", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "Active", "Locked");
  await page.waitForTimeout(1000);
  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-07_locked-today-PASSED");
});

// ─── TC-ChatHistory-08: Status = Locked, Date Range = This Week ──────────────
test("TC-ChatHistory-08: Reports → Chat History → Locked → This Week", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "Active", "Locked");
  await page.waitForTimeout(1000);
  await setDateRange(page, "All Time", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-08_locked-this-week-PASSED");
});

// ─── TC-ChatHistory-09: Status = Locked, Date Range = This Month ─────────────
test("TC-ChatHistory-09: Reports → Chat History → Locked → This Month", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "Active", "Locked");
  await page.waitForTimeout(1000);
  await setDateRange(page, "All Time", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-09_locked-this-month-PASSED");
});

// ─── TC-ChatHistory-10: Status = Locked, Semua Date Range ────────────────────
test("TC-ChatHistory-10: Reports → Chat History → Locked → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToChatHistory(page);
  await setDateRange(page, "Active", "Locked");
  await page.waitForTimeout(1000);

  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "Today", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ChatHistory-10_locked-semua-date-PASSED");
});

// ─── TC-CallHistory-07: Semua Date Range ─────────────────────────────────────
test("TC-CallHistory-07: Reports → Call History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToCallHistory(page);

  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "Today", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setPickDate(page, "This Month", "2025-04-04", "2026-04-04");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-CallHistory-07_semua-date-PASSED");
});

// GIFT HISTORY — /reports/gift-history

// ─── Helper: navigasi ke Reports → Gift History ───────────────────────────────
async function goToGiftHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/reports/gift-history");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/reports\/gift-history/, { timeout: 10000 });
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-GiftHistory-01: Date Range = All Time ────────────────────────────────
test("TC-GiftHistory-01: Reports → Gift History → All Time", async ({ loggedInPage: page, ss }) => {
  await goToGiftHistory(page);
  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-GiftHistory-01_all-time-PASSED");
});

// ─── TC-GiftHistory-02: Date Range = Today ───────────────────────────────────
test("TC-GiftHistory-02: Reports → Gift History → Today", async ({ loggedInPage: page, ss }) => {
  await goToGiftHistory(page);
  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-GiftHistory-02_today-PASSED");
});

// ─── TC-GiftHistory-03: Date Range = This Week ───────────────────────────────
test("TC-GiftHistory-03: Reports → Gift History → This Week", async ({ loggedInPage: page, ss }) => {
  await goToGiftHistory(page);
  await setDateRange(page, "All Time", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-GiftHistory-03_this-week-PASSED");
});

// ─── TC-GiftHistory-04: Date Range = This Month ──────────────────────────────
test("TC-GiftHistory-04: Reports → Gift History → This Month", async ({ loggedInPage: page, ss }) => {
  await goToGiftHistory(page);
  await setDateRange(page, "All Time", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-GiftHistory-04_this-month-PASSED");
});

// ─── TC-GiftHistory-05: Semua Date Range ─────────────────────────────────────
test("TC-GiftHistory-05: Reports → Gift History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToGiftHistory(page);

  await setDateRange(page, "All Time", "All Time");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "All Time", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "Today", "This Week");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setDateRange(page, "This Week", "This Month");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-GiftHistory-05_semua-date-PASSED");
});

// TALENT ONLINE HISTORY — /reports/talent-online-history


const TALENT_SEARCH_EMAIL = "ais+66@ultrazbola.com";

// ─── Helper: navigasi ke Reports → Talent Online History ──────────────────────
async function goToTalentOnlineHistory(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/reports/talent-online-history");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/reports\/talent-online-history/, { timeout: 10000 });
  await expect(page.getByPlaceholder("Search")).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: search talent ────────────────────────────────────────────────────
async function searchTalent(page: any, keyword: string) {
  await page.getByPlaceholder("Search").fill(keyword);
  await page.waitForTimeout(2000);
}

// ─── Helper: isi Start date & End date via kalender (bulan yang sama) ────────
async function setTalentPickDate(page: any, startDay: string, endDay: string) {
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

// ─── TC-TalentOnline-01: Search by email ─────────────────────────────────────
test("TC-TalentOnline-01: Reports → Talent Online History → Search", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await searchTalent(page, TALENT_SEARCH_EMAIL);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-01_search-PASSED");
});

// ─── TC-TalentOnline-02: Pick Date (Start: 1 Apr 2026, End: 7 Apr 2026) ──────
test("TC-TalentOnline-02: Reports → Talent Online History → Pick Date", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentPickDate(page, "1", "7");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-02_pick-date-PASSED");
});

// ─── Helper: set Select date range dropdown ───────────────────────────────────
async function setTalentDateRange(page: any, currentLabel: string, range: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: range, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-TalentOnline-03: Select date range = All ──────────────────────────────
test("TC-TalentOnline-03: Reports → Talent Online History → All", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-03_all-PASSED");
});

// ─── TC-TalentOnline-04: Select date range = Today ───────────────────────────
test("TC-TalentOnline-04: Reports → Talent Online History → Today", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-04_today-PASSED");
});

// ─── TC-TalentOnline-05: Select date range = Yesterday ───────────────────────
test("TC-TalentOnline-05: Reports → Talent Online History → Yesterday", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-05_yesterday-PASSED");
});

// ─── TC-TalentOnline-06: Select date range = 7D ──────────────────────────────
test("TC-TalentOnline-06: Reports → Talent Online History → 7D", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-06_7d-PASSED");
});

// ─── TC-TalentOnline-07: Select date range = 30D ─────────────────────────────
test("TC-TalentOnline-07: Reports → Talent Online History → 30D", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-07_30d-PASSED");
});

// ─── TC-TalentOnline-08: Select date range = 90D ─────────────────────────────
test("TC-TalentOnline-08: Reports → Talent Online History → 90D", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);
  await setTalentDateRange(page, "All", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-08_90d-PASSED");
});

// ─── TC-TalentOnline-09: Semua Select date range ─────────────────────────────
test("TC-TalentOnline-09: Reports → Talent Online History → Semua Date Range", async ({ loggedInPage: page, ss }) => {
  await goToTalentOnlineHistory(page);

  await setTalentDateRange(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTalentDateRange(page, "All", "Today");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTalentDateRange(page, "Today", "Yesterday");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTalentDateRange(page, "Yesterday", "7D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTalentDateRange(page, "7D", "30D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setTalentDateRange(page, "30D", "90D");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-TalentOnline-09_semua-date-range-PASSED");
});
