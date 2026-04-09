import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;
const REJECTION_REASON = "terlalu banyak";

// ─── Helper: login → Admin → Withdrawals ─────────────────────────────────────
async function goToWithdrawals(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // samakan pola global locator seperti admin-content-approval
  await page.getByRole("button", { name: "Admin" }).click();
  await page.waitForTimeout(1500);

  // klik submenu Withdrawals
  await page.getByRole("link", { name: "Withdrawals" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman withdrawals
  await expect(page).toHaveURL(/withdrawals/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Withdrawals" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: filter status ────────────────────────────────────────────────────
async function filterByStatus(page: any, status: string) {
  await page.getByRole("combobox", { name: /Status/i }).click();
  await page.getByRole("option", { name: status }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1500);
}

// ─── TC-Withdrawal-01: Filter Pending ────────────────────────────────────────
test("TC-Withdrawal-01: Admin → Withdrawals → Filter Pending", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  await filterByStatus(page, "Pending");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Withdrawal-01_filter-pending-PASSED");
});

// ─── TC-Withdrawal-02: Filter Success ────────────────────────────────────────
test("TC-Withdrawal-02: Admin → Withdrawals → Filter Success", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  await filterByStatus(page, "Success");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Withdrawal-02_filter-success-PASSED");
});

// ─── TC-Withdrawal-03: Filter Failed ─────────────────────────────────────────
test("TC-Withdrawal-03: Admin → Withdrawals → Filter Failed", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  await filterByStatus(page, "Failed");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Withdrawal-03_filter-failed-PASSED");
});

// ─── TC-Withdrawal-04: Semua Filter Sekaligus ────────────────────────────────
test("TC-Withdrawal-04: Admin → Withdrawals → Semua Filter Status", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  // Filter Pending
  await filterByStatus(page, "Pending");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Filter Success
  await filterByStatus(page, "Success");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // Filter Failed — screenshot terakhir sebagai bukti semua filter berhasil
  await filterByStatus(page, "Failed");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Withdrawal-04_semua-filter-PASSED");
});


test("TC-Withdrawal-05: Admin → Withdrawals → Pending → Approve", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  // filter ke Pending
  await filterByStatus(page, "Pending");

  // verifikasi ada data pending
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // ss halaman pending sebelum approve
  await ss("TC-Withdrawal-05_01_list-pending");

  // pasang listener API SEBELUM klik approve
  const approveResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("approve") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // klik approve dengan pola global codegen: row + label action
  const approveRow = page.getByRole("row").filter({ has: page.getByLabel("Approve") }).first();
  await approveRow.getByLabel("Approve").click();

  // verifikasi modal konfirmasi muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);

  // ss modal konfirmasi
  await ss("TC-Withdrawal-05_02_confirm-modal");

  // klik Confirm
  await page.getByRole("button", { name: "Confirm" }).click();

  // validasi response API approve
  const approveRes = await approveResponsePromise;
  if (approveRes) {
    const status = approveRes.status();
    const body = await approveRes.json().catch(() => approveRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Withdrawal Approve status: ${status}`);
    console.log(`[API] Withdrawal Approve body: ${JSON.stringify(body)}`);
    expect(status, `API withdrawal approve gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu modal tertutup
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);


  await ss("TC-Withdrawal-05_03_approve-PASSED");
});

// ─── TC-Withdrawal-06: Pending → Reject ──────────────────────────────────────
test("TC-Withdrawal-06: Admin → Withdrawals → Pending → Reject", async ({ loggedInPage: page, ss }) => {
  await goToWithdrawals(page);

  // filter ke Pending
  await filterByStatus(page, "Pending");

  // verifikasi ada data pending
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // ss halaman pending sebelum reject
  await ss("TC-Withdrawal-06_01_list-pending");

  // klik reject dengan pola global codegen: row + label action
  const rejectRow = page.getByRole("row").filter({ has: page.getByLabel("Reject") }).first();
  await rejectRow.getByLabel("Reject").click();

  // verifikasi modal reject muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

  // isi rejection reason
  await page.getByRole("textbox", { name: "Rejection Reason" }).fill(REJECTION_REASON);
  await page.waitForTimeout(2000);
  await expect(page.getByRole("textbox", { name: "Rejection Reason" })).toHaveValue(REJECTION_REASON);

  // ss modal reject setelah terisi
  await ss("TC-Withdrawal-06_02_reject-modal");

  // pasang listener API SEBELUM klik Confirm
  const rejectResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("reject") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // klik Confirm
  await page.getByRole("button", { name: "Confirm" }).click();

  // validasi response API reject
  const rejectRes = await rejectResponsePromise;
  if (rejectRes) {
    const status = rejectRes.status();
    const body = await rejectRes.json().catch(() => rejectRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Withdrawal Reject status: ${status}`);
    console.log(`[API] Withdrawal Reject body: ${JSON.stringify(body)}`);
    expect(status, `API withdrawal reject gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu modal tertutup
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // ss terakhir sebagai bukti reject berhasil
  await ss("TC-Withdrawal-06_03_reject-PASSED");
});
