import { test, expect } from "./fixtures";
import { gotoLoginPage, loginFormLocators } from "./login-helpers";

// test case 1: login berhasil dengan kredensial valid
test("TC-01: Login Successfully", async ({ page, ss }) => {
  const { emailInput: email, passwordInput: password, submitButton: signIn } =
    loginFormLocators(page);
  const emailValue = process.env.TEST_LOGIN_ID || "";
  const passwordValue = process.env.TEST_PASSWORD || "";

  // Pastikan env tidak kosong
  expect(emailValue, "TEST_LOGIN_ID env ").not.toBe("");
  expect(passwordValue, "TEST_PASSWORD env ").not.toBe("");

  // Pantau response API login
  const loginResponsePromise = page.waitForResponse(
    (res) => res.url().includes("/login") && res.request().method() === "POST",
    { timeout: 15000 }
  );

  await gotoLoginPage(page);

  await email.fill(emailValue);
  await password.fill(passwordValue);
  await signIn.click();

  // Verifikasi response API login berhasil (status 200)
  const loginResponse = await loginResponsePromise.catch(() => null);
  if (loginResponse) {
    const status = loginResponse.status();
    const body = await loginResponse.json().catch(() => loginResponse.text().catch(() => "(gagal baca body)"));
    console.log(`[API] Login status: ${status}`);
    console.log(`[API] Login body: ${JSON.stringify(body)}`);
    expect(status, `API login gagal ${status}: ${JSON.stringify(body)}`).toBe(200);
  }

  // Verifikasi redirect ke dashboard (URL berubah dari /login)
  await expect(page).not.toHaveURL(/.*\/login/, { timeout: 15000 });

  // Verifikasi konten dashboard muncul
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({
    timeout: 15000,
  });

  // Verifikasi sidebar/navigasi muncul
  const sidebar = page.locator("aside, nav, [role='navigation']");
  await expect(sidebar).toBeVisible({ timeout: 15000 });
  await ss("TC-01_04_sidebar-PASSED");

  // Verifikasi session/cookie tersimpan
  const cookies = await page.context().cookies();
  expect(cookies.length, "Tidak ada cookie/session setelah login").toBeGreaterThan(0);
});

//Test Case 2: Login gagal dengan password salah
test("TC-02: Login gagal dengan password salah", async ({ page, ss }) => {
  const { emailInput: email, passwordInput: password, submitButton: signIn } =
    loginFormLocators(page);
  const emailValue = process.env.TEST_LOGIN_ID || "test@example.com";

  await gotoLoginPage(page);
  await ss("TC-02_01_login-page");

  await email.fill(emailValue);
  await password.fill("wrongpassword123!");
  await ss("TC-02_02_wrong-password-filled");

  await signIn.click();

  // Verifikasi TIDAK redirect ke dashboard
  await expect(page).toHaveURL(/.*\/login/, { timeout: 10000 });

  // Verifikasi pesan error muncul
  const errorMsg = page.locator(
    '[role="alert"], .error, .MuiAlert-root, :has-text("Invalid"), :has-text("incorrect"), :has-text("salah")'
  );
  await expect(errorMsg.first()).toBeVisible({ timeout: 10000 });
  await ss("TC-02_03_error-visible-PASSED");
});

//Test Case 3: Login gagal dengan email kosong
test("TC-03: Login gagal dengan field kosong", async ({ page, ss }) => {
  const { emailInput: email, passwordInput: password, submitButton: signIn } =
    loginFormLocators(page);

  await gotoLoginPage(page);
  await ss("TC-03_01_login-page-empty");

  await email.click();
  await password.click();
  await signIn.click();

  // Verifikasi tetap di halaman login
  await expect(page).toHaveURL(/.*\/login/, { timeout: 5000 });

  // Validasi HTML5 native — tooltip browser tidak jadi node di DOM, cek Constraint Validation API
  await expect(email).toHaveJSProperty("validity.valueMissing", true);
  await expect
    .poll(async () => email.evaluate((el: HTMLInputElement) => el.validationMessage.length))
    .toBeGreaterThan(0);
  await ss("TC-03_02_validation-PASSED");
});
