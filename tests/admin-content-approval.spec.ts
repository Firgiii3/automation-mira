import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 3000;
const REJECTION_REASON = "content negatif";
const CONTENT_SEARCH_NAME = "kiki delapan enam";

// ─── Helper: navigasi ke Admin → Content Approval ────────────────────────────
async function goToContentApproval(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // sesuai locator global hasil codegen: Admin adalah button (accordion), Content Approval adalah link
  await page.getByRole("button", { name: "Admin" }).click();
  await page.waitForTimeout(1500);

  await page.getByRole("link", { name: "Content Approval" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/content\/approval/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Content Approval" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

//TC-Admin-02: Content Approval → Pending → Approve 
test("TC-Admin-02: Admin → Content Approval → Pending → Approve", async ({ loggedInPage: page, ss }) => {
  await goToContentApproval(page);

  // klik tab pending
  await page.getByRole("tab", { name: "Pending" }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1500);

  // search nama konten/talent dulu sebelum approve
  await page.getByRole("textbox", { name: "Search" }).fill(CONTENT_SEARCH_NAME);
  await page.waitForTimeout(1200);

  // verifikasi ada konten di tab pending
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // pasang listener lalu klik Approve
  const approveResponsePromise = page.waitForResponse(
    (res) => res.url().includes("approve") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  await page.getByRole("button", { name: "Approve" }).first().click();

  // verifikasi response API approve berhasil
  const approveRes = await approveResponsePromise;
  if (approveRes) {
    const status = approveRes.status();
    const body = await approveRes.json().catch(() => approveRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Content Approval status: ${status}`);
    console.log(`[API] Content Approval body: ${JSON.stringify(body)}`);
    expect(status, `API approve gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Admin-02_approve-PASSED");
});

// ─── TC-Admin-03: Content Approval → Pending → Reject ────────────────────────
test("TC-Admin-03: Admin → Content Approval → Pending → Reject", async ({ loggedInPage: page, ss }) => {
  await goToContentApproval(page);

  // klik tab pending
  await page.getByRole("tab", { name: "Pending" }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1500);

  // search nama konten/talent dulu sebelum reject
  await page.getByRole("textbox", { name: "Search" }).fill(CONTENT_SEARCH_NAME);
  await page.waitForTimeout(1200);

  // verifikasi ada konten di tab pending
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // klik Reject pertama
  await page.getByRole("button", { name: "Reject" }).first().click();

  // verifikasi modal reject muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

  // isi alasan penolakan
  await page.getByRole("textbox", { name: "Rejection reason" }).fill(REJECTION_REASON);
  await page.waitForTimeout(2000);
  await expect(page.getByRole("textbox", { name: "Rejection reason" })).toHaveValue(REJECTION_REASON);

  // pasang listener lalu klik Reject content
  const rejectResponsePromise = page.waitForResponse(
    (res) => res.url().includes("reject") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  await page.getByRole("button", { name: "Reject content" }).click();

  // verifikasi response API reject berhasil
  const rejectRes = await rejectResponsePromise;
  if (rejectRes) {
    const status = rejectRes.status();
    const body = await rejectRes.json().catch(() => rejectRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Content Reject status: ${status}`);
    console.log(`[API] Content Reject body: ${JSON.stringify(body)}`);
    expect(status, `API reject gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Admin-03_reject-PASSED");
});

test("TC-Admin-04: Admin → Content Approval → Approved → Search → Delete", async ({ loggedInPage: page, ss }) => {
  await goToContentApproval(page);

  await page.getByRole("tab", { name: "Approved" }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1200);

  const approvedSearch = page.getByRole("textbox", { name: "Search by title, content, or" });
  await approvedSearch.click();
  await approvedSearch.fill(CONTENT_SEARCH_NAME);
  await page.waitForTimeout(1200);

  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // klik icon delete di row hasil search
  await page.getByRole("button", { name: "Delete" }).first().click();
  // konfirmasi delete di modal
  await page.getByRole("button", { name: "Delete" }).last().click();

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Admin-04_approved-delete-PASSED");
});

test("TC-Admin-05: Admin → Content Approval → Rejected → Search → Delete", async ({ loggedInPage: page, ss }) => {
  await goToContentApproval(page);

  await page.getByRole("tab", { name: "Rejected" }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1200);
  await expect(page).toHaveURL(/status=REJECTED/i, { timeout: 10000 });

  const rejectedSearch = page.getByRole("textbox", { name: "Search by title, content, or" });
  await rejectedSearch.click();
  await rejectedSearch.fill(CONTENT_SEARCH_NAME);
  await page.waitForTimeout(1200);

  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // klik delete di row hasil search, lalu konfirmasi delete
  await page.getByRole("button", { name: "Delete" }).first().click();
  await page.getByRole("button", { name: "Delete" }).last().click();

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Admin-05_rejected-delete-PASSED");
});
