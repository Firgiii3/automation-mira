import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 3000;

// data test untuk create admin
const ADMIN_EMAIL    = "testadmin123@gmail.com";
const ADMIN_PASSWORD = "123456789";
const ADMIN_FULLNAME = "admin brokenss";
const ADMIN_ROLE     = "Admin";

// ─── Helper: login → Admin → List Admin ──────────────────────────────────────
async function goToListAdmin(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // samakan pola dengan spec admin lain: Admin = button, submenu = link
  await page.getByRole("button", { name: "Admin" }).click();
  await page.waitForTimeout(1000);

  // klik submenu List Admin
  await page.getByRole("link", { name: "List Admin" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman list admin
  await expect(page).toHaveURL(/admin-management\/list-admin/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "List Admin" })).toBeVisible({ timeout: 10000 });
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Admin-04: Create Admin ───────────────────────────────────────────────
test("TC-Admin-01 : Admin → List Admin → Create Admin", async ({ loggedInPage: page, ss }) => {
  await goToListAdmin(page);

  // ss halaman list admin sebelum create
  await ss("TC-Admin-04_01_list-admin");

  // klik Create Admin → navigate ke halaman baru (bukan modal/dialog)
  await page.getByRole("button", { name: "Create Admin" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman create admin terbuka
  await expect(page).toHaveURL(/list-admin\/create/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Create Admin" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // isi form
  await page.getByRole("textbox", { name: "Email" }).fill(ADMIN_EMAIL);
  await page.getByRole("textbox", { name: "Password" }).fill(ADMIN_PASSWORD);
  await page.getByRole("textbox", { name: "Full name" }).fill(ADMIN_FULLNAME);

  // Role default Admin, hanya klik jika berbeda
  if (ADMIN_ROLE !== "Admin") {
    await page.locator('[aria-haspopup="listbox"]').click();
    await page.getByRole("option", { name: ADMIN_ROLE }).click();
  }

  // ss form terisi
  await ss("TC-Admin-04_02_form-filled");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // pasang listener API SEBELUM klik submit
  const createResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("list-admin") && res.request().method() === "POST",
    { timeout: 15000 }
  ).catch(() => null);

  // submit form
  await page.getByRole("button", { name: "Create Admin" }).click();

  // validasi response API
  const createRes = await createResponsePromise;
  if (createRes) {
    const status = createRes.status();
    const body = await createRes.json().catch(() => createRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Create Admin status: ${status}`);
    console.log(`[API] Create Admin body: ${JSON.stringify(body)}`);
    expect(status, `API create admin gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // verifikasi kembali ke list admin setelah berhasil
  await expect(page).toHaveURL(/admin-management\/list-admin/, { timeout: 15000 });
  await page.waitForLoadState("domcontentloaded");
  await expect(page.locator("table tbody tr").first()).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole("heading", { name: "List Admin" })).toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // ss terakhir sebagai bukti create admin berhasil
  await ss("TC-Admin-04_03_create-admin-PASSED");
});

// ─── TC-Admin-04b: Create Admin Password < 8 Karakter ────────────────────────
test("TC-Admin-02: Create Admin Password Kurang Dari 8 Karakter", async ({ loggedInPage: page, ss }) => {
  await goToListAdmin(page);

  // langsung navigate ke form create
  await page.goto("/admin-management/list-admin/create");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/list-admin\/create/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Create Admin" })).toBeVisible({ timeout: 10000 });

  // isi form dengan password 7 karakter
  await page.getByRole("textbox", { name: "Email" }).fill("testadmin@gmail.com");
  await page.getByRole("textbox", { name: "Password" }).fill("1234567");
  await page.getByRole("textbox", { name: "Full name" }).fill("test admin");

  await page.getByRole("button", { name: "Create Admin" }).click();

  // verifikasi URL tetap di create (tidak redirect)
  await expect(page).toHaveURL(/list-admin\/create/, { timeout: 5000 });

  // verifikasi pesan error validasi muncul
  const errorMsg = page.locator(
    '[role="alert"], [aria-invalid="true"], :has-text("minimum"), :has-text("least 8"), :has-text("minimal"), :has-text("karakter")'
  );
  await expect(errorMsg.first()).toBeVisible({ timeout: 5000 });

  await ss("TC-Admin-04b_password-validation-PASSED");
});

// ─── TC-Admin-05: Edit Admin → Ganti Email, Full Name & Password ─────────────
test("TC-Admin-03: Admin → List Admin → Edit Admin → Ganti Email, Full Name & Password", async ({ loggedInPage: page, ss }) => {
  await goToListAdmin(page);

  // ss halaman list admin sebelum edit
  await ss("TC-Admin-05_01_list-admin");

  // klik ikon pensil (edit) di baris pertama
  await page.locator("table tbody tr").first().getByRole("button").click();

  // verifikasi modal Edit Admin muncul
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Edit Admin" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);

  // ss modal edit sebelum diubah
  await ss("TC-Admin-05_02_edit-modal");

  // ganti Email
  await page.getByRole("textbox", { name: "Email" }).click({ clickCount: 3 });
  await page.getByRole("textbox", { name: "Email" }).fill("admintest@gmail.com");

  // ganti Full name
  await page.getByRole("textbox", { name: "Full name" }).click({ clickCount: 3 });
  await page.getByRole("textbox", { name: "Full name" }).fill("admins brokensss");

  // isi password baru
  await page.getByPlaceholder("New password (leave blank to keep current)").fill("admin12345");

  // Role dibiarkan default (Admin)

  // ss form setelah semua field terisi
  await ss("TC-Admin-05_03_form-filled");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // pasang listener API SEBELUM klik Save
  const editResponsePromise = page.waitForResponse(
    (res: any) => res.url().includes("list-admin") && (res.request().method() === "PUT" || res.request().method() === "PATCH"),
    { timeout: 15000 }
  ).catch(() => null);

  // klik Save
  await page.getByRole("button", { name: "Save" }).click();

  // validasi response API
  const editRes = await editResponsePromise;
  if (editRes) {
    const status = editRes.status();
    const body = await editRes.json().catch(() => editRes.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Edit Admin status: ${status}`);
    console.log(`[API] Edit Admin body: ${JSON.stringify(body)}`);
    expect(status, `API edit admin gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // tunggu modal tertutup
  await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 15000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  // ss terakhir sebagai bukti edit berhasil
  await ss("TC-Admin-05_04_edit-PASSED");
});
