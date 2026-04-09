import { test, expect } from "../fixtures";

const PAGE_VIEW_DELAY = 5000;
const SEARCH_EMAIL = "miftah@ultrazbola.com";
const GEMS_AMOUNT = "100";


async function goToGemsAllocation(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // samakan dengan pola yang sudah benar di admin-content-approval.spec.ts
  await page.getByRole("button", { name: "Admin" }).click();
  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Gems Allocation" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/admin-management\/add-gems/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Gems Allocation" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

//TC-Admin-03: Gems Allocation → Search User → Allocate Gems 
test("TC-Admin-01: Gems Allocation → Search User → Allocate Gems", async ({ loggedInPage: page, ss }) => {
  await goToGemsAllocation(page);

  // search user
  await page.getByRole("textbox", { name: "Search by name or email..." }).fill(SEARCH_EMAIL);
  await page.waitForTimeout(1500);

  // klik Add Gems dan verifikasi dialog muncul
  await page.getByRole("button", { name: "Add Gems" }).click();
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });

  // isi jumlah gems
  await page.getByRole("spinbutton", { name: "Gems" }).fill(GEMS_AMOUNT);

  // pasang listener lalu klik Allocate
  const allocateResponsePromise = page.waitForResponse(
    (res) => res.url().includes("add-gems") || res.url().includes("allocat") || res.url().includes("gems"),
    { timeout: 15000 }
  ).catch(() => null);

  await page.getByRole("button", { name: "Allocate" }).click();

  // validasi response API
  const allocateRes = await allocateResponsePromise;
  if (allocateRes) {
    const status = allocateRes.status();
    const body = await allocateRes.json().catch(() => allocateRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Allocate gems status: ${status}`);
    console.log(`[API] Allocate gems body: ${JSON.stringify(body)}`);
    expect(status, `API allocate gems gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // verifikasi dialog tertutup setelah berhasil
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Admin-03_allocate-gems-PASSED");
});
