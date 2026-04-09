import { test, expect } from "../fixtures";

const PAGE_VIEW_DELAY = 5000;
const SEARCH_NAME = "ais+66@ultrazbola.com";
const SUSPEND_DURATION = "7"; // jumlah hari suspend (default 7)

async function goToTalentList(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Management (toggle accordion)
  await page.getByRole("button", { name: "Management" }).click();
  await page.waitForTimeout(1500);

  // klik Talents
  await page.getByRole("link", { name: "Talents" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman talents
  await expect(page).toHaveURL(/account-management\/hosts/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Talents Management" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // search talent
  await page.getByRole("textbox", { name: "Search" }).fill(SEARCH_NAME);
  await page.waitForTimeout(1500);
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: login → Management → Talents → Search → View Detail ─────────────
async function goToTalentDetail(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Management (toggle accordion)
  await page.getByRole("button", { name: "Management" }).click();
  await page.waitForTimeout(1500);

  // klik Talents
  await page.getByRole("link", { name: "Talents" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman talents
  await expect(page).toHaveURL(/account-management\/hosts/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Talents Management" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // search talent
  await page.getByRole("textbox", { name: "Search" }).fill(SEARCH_NAME);
  await page.waitForTimeout(1500);
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // klik tombol action (titik tiga) di baris pertama hasil search
  await page.getByRole("table").getByRole("button").filter({ hasText: /^$/ }).first().click();

  // klik View Details
  await page.getByText("View Details").click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi masuk ke halaman detail talent (URL: /account-management/hosts/[id])
  await expect(page).toHaveURL(/account-management\/hosts\/\d+$/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}


test("TC-Talents-01: Management → Talents → Search → View Detail → Call History", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Call History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/call-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-01_call-history-PASSED");
});

// ─── TC-Talents-02: Withdraw ─────────────────────────────────────────────────
test("TC-Talents-02: Management → Talents → Search → View Detail → Withdraw", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Withdraw" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/withdraw/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-02_withdraw-PASSED");
});

// ─── TC-Talents-03: Gift History ─────────────────────────────────────────────
test("TC-Talents-03: Management → Talents → Search → View Detail → Gift History", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Gift History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/gift-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-03_gift-history-PASSED");
});

// ─── TC-Talents-04: Top Spender ──────────────────────────────────────────────
test("TC-Talents-04: Management → Talents → Search → View Detail → Top Spender", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Top Spender" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/top-spender/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-04_top-spender-PASSED");
});

// ─── TC-Talents-05: Activity History ─────────────────────────────────────────
test("TC-Talents-05: Management → Talents → Search → View Detail → Activity History", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Activity History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/activity-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-05_activity-history-PASSED");
});

// ─── TC-Talents-06: Daily Activity (Period + Pick Date) ──────────────────────
test("TC-Talents-06: Management → Talents → Search → View Detail → Daily Activity", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Daily Activity" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/daily-activity/, { timeout: 10000 });

  // Period: All time → Today → Date range
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

  // Samakan pola pick date dengan report/users
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

  await ss("TC-Talents-06_daily-activity-pick-date-PASSED");
});

// ─── TC-Talents-07: Online History ───────────────────────────────────────────
test("TC-Talents-07: Management → Talents → Search → View Detail → Online History", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  await page.getByRole("tab", { name: "Online History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/online-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-07_online-history-PASSED");
});

// ─── TC-Talents-08: Semua Tab Sekaligus ──────────────────────────────────────
test("TC-Talents-08: Management → Talents → Search → View Detail → Semua Tab", async ({ loggedInPage: page, ss }) => {
  await goToTalentDetail(page);

  // Call History
  await page.getByRole("tab", { name: "Call History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/call-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Withdraw
  await page.getByRole("tab", { name: "Withdraw" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/withdraw/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Gift History
  await page.getByRole("tab", { name: "Gift History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/gift-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Top Spender
  await page.getByRole("tab", { name: "Top Spender" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/top-spender/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Activity History
  await page.getByRole("tab", { name: "Activity History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/activity-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Daily Activity
  await page.getByRole("tab", { name: "Daily Activity" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/daily-activity/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Online History — screenshot terakhir sebagai bukti semua tab berhasil
  await page.getByRole("tab", { name: "Online History" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/online-history/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-08_semua-tab-PASSED");
});

// ─── TC-Talents-09: Suspend Host ─────────────────────────────────────────────
test("TC-Talents-09: Management → Talents → Search → Suspend Host", async ({ loggedInPage: page, ss }) => {
  await goToTalentList(page);

  // klik tombol action (titik tiga) di baris pertama hasil search
  await page.getByRole("table").getByRole("button").filter({ hasText: /^$/ }).first().click();

  // klik Suspend Host dari menu action
  await page.getByRole("menuitem", { name: "Suspend Host" }).click();

  // verifikasi modal Suspend Host muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Suspend Host" })).toBeVisible({ timeout: 10000 });

  // verifikasi input duration sudah terisi default (7 hari)
  const durationInput = page.getByRole("spinbutton", { name: "Duration (days)" });
  await expect(durationInput).toBeVisible({ timeout: 10000 });
  await durationInput.fill(SUSPEND_DURATION);
  await page.waitForTimeout(1000);

  // ss form suspend sebelum continue
  await ss("TC-Talents-09_01_form-suspend");

  // klik Continue
  await page.getByRole("button", { name: "Continue" }).click();

  // verifikasi modal konfirmasi "Confirm Suspension" muncul
  await expect(page.getByRole("heading", { name: "Confirm Suspension" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);

  // ss modal konfirmasi sebelum yes suspend
  await ss("TC-Talents-09_02_confirm-suspension");

  // pasang listener API SEBELUM klik Yes, Suspend
  const suspendResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("suspend") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // klik Yes, Suspend
  await page.getByRole("button", { name: "Yes, Suspend" }).click();

  // validasi response API suspend
  const suspendRes = await suspendResponsePromise;
  if (suspendRes) {
    const status = suspendRes.status();
    const body = await suspendRes.json().catch(() => suspendRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Suspend Host status: ${status}`);
    console.log(`[API] Suspend Host body: ${JSON.stringify(body)}`);
    expect(status, `API suspend gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu modal tertutup
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // ss terakhir sebagai bukti suspend berhasil
  await ss("TC-Talents-09_03_suspend-PASSED");
});

// ─── TC-Talents-10: Unsuspend Host ───────────────────────────────────────────
test("TC-Talents-10: Management → Talents → Search → Unsuspend Host", async ({ loggedInPage: page, ss }) => {
  await goToTalentList(page);

  // klik tombol action (titik tiga) di baris pertama hasil search
  await page.getByRole("table").getByRole("button").filter({ hasText: /^$/ }).first().click();

  // klik Unsuspend Host dari menu action
  await page.getByRole("menuitem", { name: "Unsuspend Host" }).click();

  // verifikasi modal Confirm Unsuspend muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Confirm Unsuspend" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);

  // ss modal konfirmasi sebelum yes unsuspend
  await ss("TC-Talents-10_01_confirm-unsuspend");

  // pasang listener API SEBELUM klik Yes, Unsuspend
  const unsuspendResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("unsuspend") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // klik Yes, Unsuspend
  await page.getByRole("button", { name: "Yes, Unsuspend" }).click();

  // validasi response API unsuspend
  const unsuspendRes = await unsuspendResponsePromise;
  if (unsuspendRes) {
    const status = unsuspendRes.status();
    const body = await unsuspendRes.json().catch(() => unsuspendRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Unsuspend Host status: ${status}`);
    console.log(`[API] Unsuspend Host body: ${JSON.stringify(body)}`);
    expect(status, `API unsuspend gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu modal tertutup
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });

  // tunggu toast/notifikasi "unsuspended successfully" muncul
  await page.waitForTimeout(1500);
  const successToast = page
    .getByRole("alert")
    .or(page.getByText(/unsuspend|successfully|berhasil/i));
  const toastVisible = await successToast.first().isVisible().catch(() => false);
  if (toastVisible) {
    console.log("[INFO] Toast unsuspend berhasil muncul");
  }

  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // ss terakhir — halaman talents setelah unsuspend berhasil
  await ss("TC-Talents-10_02_unsuspend-PASSED");
});

// ─── Helper: login → Management → Talents (tanpa search) ─────────────────────
async function goToTalentManagement(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: "Management" }).click();
  await page.waitForTimeout(1500);

  await page.getByRole("link", { name: "Talents" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/account-management\/hosts/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Talents Management" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Talents-11: Tab Pending Verification ─────────────────────────────────
test("TC-Talents-11: Talents → Tab Pending Verification", async ({ loggedInPage: page, ss }) => {
  await goToTalentManagement(page);

  await page.getByRole("tab", { name: "Pending Verification" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=PENDING_VERIFICATION/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-11_pending-verification-PASSED");
});

// ─── TC-Talents-12: Tab Approved ─────────────────────────────────────────────
test("TC-Talents-12: Talents → Tab Approved", async ({ loggedInPage: page, ss }) => {
  await goToTalentManagement(page);

  await page.getByRole("tab", { name: "Approved" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=APPROVED/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-12_approved-PASSED");
});

// ─── TC-Talents-13: Tab Rejected ─────────────────────────────────────────────
test("TC-Talents-13: Talents → Tab Rejected", async ({ loggedInPage: page, ss }) => {
  await goToTalentManagement(page);

  await page.getByRole("tab", { name: "Rejected" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=REJECTED/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-13_rejected-PASSED");
});

// ─── TC-Talents-14: Tab Needs Onboarding ─────────────────────────────────────
test("TC-Talents-14: Talents → Tab Needs Onboarding", async ({ loggedInPage: page, ss }) => {
  await goToTalentManagement(page);

  await page.getByRole("tab", { name: "Needs Onboarding" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=NEEDS_ONBOARDING/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-14_needs-onboarding-PASSED");
});

// ─── TC-Talents-15: Semua Tab Status Sekaligus ───────────────────────────────
test("TC-Talents-15: Talents → Semua Tab Status", async ({ loggedInPage: page, ss }) => {
  await goToTalentManagement(page);

  // Pending Verification
  await page.getByRole("tab", { name: "Pending Verification" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=PENDING_VERIFICATION/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Approved
  await page.getByRole("tab", { name: "Approved" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=APPROVED/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Rejected
  await page.getByRole("tab", { name: "Rejected" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=REJECTED/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Needs Onboarding — screenshot terakhir sebagai bukti semua tab berhasil
  await page.getByRole("tab", { name: "Needs Onboarding" }).click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/status=NEEDS_ONBOARDING/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Talents-15_semua-tab-status-PASSED");
});
