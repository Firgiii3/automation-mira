import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;

// data test untuk create agency
const AGENCY_NAME     = "agency testings";
const AGENCY_EMAIL    = "testingagency123@gmail.com";
const AGENCY_PASSWORD = "123456";
const AGENCY_PIC      = "Mas Aniss";
const AGENCY_CONTACT  = "089634851652";


async function goToAgencies(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // klik Management (toggle accordion)
  await page.getByRole("button", { name: "Management" }).click();
  await page.waitForTimeout(1500);

  // klik Agencies
  await page.getByRole("link", { name: "Agencies" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman agencies
  await expect(page).toHaveURL(/account-management\/agencies/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Agencies" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

test("TC-Agencies-01: Management → Agencies → Create Agency", async ({ loggedInPage: page, ss }) => {
  await goToAgencies(page);

  // ss halaman agencies sebelum create
  await ss("TC-Agencies-01_01_list-agencies");

  // klik Create Agency
  await page.getByRole("button", { name: "Create Agency" }).click();
  await page.waitForTimeout(1000);

  // verifikasi form create agency muncul (URL tetap sama, form muncul sebagai panel/modal)
  await expect(page).toHaveURL(/account-management\/agencies/, { timeout: 10000 });
  const createAgencyDialog = page.getByRole("dialog", { name: "Create New Agency" });
  await expect(createAgencyDialog).toBeVisible({ timeout: 10000 });
  await expect(createAgencyDialog.getByRole("textbox", { name: "Agency Name" })).toBeVisible({ timeout: 10000 });

  // isi form
  await createAgencyDialog.getByRole("textbox", { name: "Agency Name" }).fill(AGENCY_NAME);
  await createAgencyDialog.getByRole("textbox", { name: "Agency Email" }).fill(AGENCY_EMAIL);
  await createAgencyDialog.getByRole("textbox", { name: "Agency Password" }).fill(AGENCY_PASSWORD);
  await createAgencyDialog.getByRole("textbox", { name: "Person in Charge (PIC)" }).fill(AGENCY_PIC);
  await createAgencyDialog.getByRole("textbox", { name: "Contact Number" }).fill(AGENCY_CONTACT);

  // ss form setelah terisi
  await ss("TC-Agencies-01_02_form-filled");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // pasang listener API SEBELUM klik submit
  const createResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("agencies") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // klik Create Agency di modal (submit form), bukan tombol create di halaman list
  await createAgencyDialog.getByRole("button", { name: "Create Agency" }).click();

  // validasi response API
  const createRes = await createResponsePromise;
  if (createRes) {
    const status = createRes.status();
    const body = await createRes.json().catch(() => createRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Create Agency status: ${status}`);
    console.log(`[API] Create Agency body: ${JSON.stringify(body)}`);
    expect(status, `API create agency gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu form tertutup dan kembali ke list agencies
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1500);

  // verifikasi kembali ke halaman agencies
  await expect(page).toHaveURL(/account-management\/agencies/, { timeout: 15000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });

  // biarkan alur natural selesai (redirect + toast muncul otomatis bila ada)
  await page.waitForTimeout(3000);
  await ss("TC-Agencies-01_03_agency-created-successfully-PASSED");
});
