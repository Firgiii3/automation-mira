import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;
const BROADCAST_TITLE = "talent menunggu kalian";
const BROADCAST_BODY = "banyak talent2 baru nih menunggu kalian untuk call";
const BROADCAST_PROMO_ID = "123";

// ─── Helper: login → Marketing → Marketing Email ─────────────────────────────
async function goToMarketingEmails(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Marketing (toggle accordion)
  await page.getByRole("button", { name: "Marketing" }).click();
  await page.waitForTimeout(1500);

  // klik Marketing Email
  await page.getByRole("link", { name: "Marketing Email" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman marketing emails
  await expect(page).toHaveURL(/marketing\/emails/, { timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Marketing-01: Marketing Email → Navigasi ke Halaman Terakhir ─────────
test("TC-Marketing-01: Marketing → Marketing Email → Next Page sampai habis", async ({ loggedInPage: page, ss }) => {
  await goToMarketingEmails(page);

  // scroll ke bawah agar pagination kelihatan
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // ss halaman pertama
  await ss("TC-Marketing-01_01_page-1");

  // tombol next page adalah button terakhir di MuiTablePaginationActions
  const nextBtn = page.locator(".MuiTablePaginationActions-root button").last();

  // klik next page terus sampai tombolnya disabled (halaman terakhir)
  let pageNum = 1;
  while (true) {
    const isDisabled = await nextBtn.isDisabled().catch(() => true);

    if (isDisabled) {
      console.log(`[INFO] Sudah di halaman terakhir (page ${pageNum})`);
      break;
    }

    await nextBtn.click();
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // scroll ke bawah lagi setelah pindah halaman agar pagination tetap terlihat
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    pageNum++;
    console.log(`[INFO] Pindah ke halaman ${pageNum}`);
  }

  // ss halaman terakhir sebagai bukti sudah mentok
  await ss("TC-Marketing-01_02_last-page-PASSED");
});

// ─── TC-Marketing-02: Marketing → Broadcast → Submit Broadcast ───────────────
test("TC-Marketing-02: Marketing → Broadcast → Submit Broadcast (Users + Immediate)", async ({ loggedInPage: page, ss }) => {
  // buka menu Marketing lalu masuk ke halaman Broadcast
  await page.getByRole("button", { name: "Marketing" }).click();
  await page.waitForTimeout(1000);
  await page.getByRole("link", { name: "Broadcast" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/marketing\/broadcast/, { timeout: 10000 });

  // Target: Users
  await page.getByText("All", { exact: true }).click();
  await page.getByRole("option", { name: "Users" }).click();

  // Isi form broadcast
  await page.getByRole("textbox", { name: "Title" }).fill(BROADCAST_TITLE);
  await page.getByRole("textbox", { name: "Body" }).fill(BROADCAST_BODY);
  await page.getByRole("textbox", { name: "Promo ID (optional)" }).fill(BROADCAST_PROMO_ID);

  // Send mode: Immediate
  await page.getByText("Immediate (send now)").click();
  await page.getByRole("option", { name: "Immediate (send now)" }).click();

  await ss("TC-Marketing-02_01_broadcast-form-filled");

  // submit broadcast
  await page.getByRole("button", { name: "Submit Broadcast" }).click();
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Marketing-02_02_submit-broadcast-PASSED");
});
