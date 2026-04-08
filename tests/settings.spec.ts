import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;

//Nilai konfigurasi Talents Config
const REGULER_CALL_PRICE           = "1935";
const REGULER_TALENT_EARN          = "718";
const REGULER_CHAT_FEE             = "240";
const REGULER_FRIEND_REQUEST_PRICE = "0";
const REGULER_FRIEND_REQUEST_EARN  = "0";
const VIP_CALL_PRICE               = "1000";
const VIP_TALENT_EARN              = "371";
const VIP_CHAT_FEE                 = "300";
const VIP_FRIEND_PRICE             = "0";
const VIP_FRIEND_EARN              = "0";
const CELEB_CALL_PRICE             = "0";
const CELEB_TALENT_EARN            = "0";
const CELEB_CHAT_FEE               = "300";
const CELEB_FRIEND_PRICE           = "0";
const CELEB_FRIEND_EARN            = "0";

//Nilai konfigurasi General Config
const AGENCY_MIN_WITHDRAWAL_IDR    = "1630000";
const AGENCY_WITHDRAWAL_GEMS_RATE  = "277.1";
const GEMS_TO_IDR_RATE             = "100";
const IDR_TO_GEMS_RATE             = "2.76";
const MIN_WITHDRAWAL_AMOUNT_GEMS   = "100";
const MIN_WITHDRAWAL_AMOUNT_IDR    = "10000";
const NON_AGENCY_INCOME_FEE        = "3.00";
const REFERRAL_MAX_UPLINES         = "2";
const REFERRAL_MAX_USERS           = "20";
const TOP_PRODUCTS                 = "[4,5,6]";
const USD_TO_IDR_RATE              = "16300.00";

async function goToGeneralConfig(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: "Settings" }).click();
  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "General Config" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "General Settings" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-01: Buka General Config → SS halaman ────────────────────────
test("TC-Settings-01: Settings → General Config", async ({ loggedInPage: page, ss }) => {
  await goToGeneralConfig(page);

  await ss("TC-Settings-01_general-config-PASSED");
});

// ─── TC-Settings-02: Isi semua field sesuai nilai config → Save Changes ───────
test("TC-Settings-02: Settings → General Config → Isi Config → Save Changes", async ({ loggedInPage: page, ss }) => {
  await goToGeneralConfig(page);

  // isi semua field dengan nilai yang sesuai
  await page.getByRole("textbox", { name: "Agency Minimum Withdrawal" }).fill(AGENCY_MIN_WITHDRAWAL_IDR);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Agency Withdrawal Gems Rate" }).fill(AGENCY_WITHDRAWAL_GEMS_RATE);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Gems To Idr Rate" }).fill(GEMS_TO_IDR_RATE);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Idr To Gems Rate" }).fill(IDR_TO_GEMS_RATE);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Minimum Withdrawal Amount Gems" }).fill(MIN_WITHDRAWAL_AMOUNT_GEMS);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Minimum Withdrawal Amount Idr", exact: true }).fill(MIN_WITHDRAWAL_AMOUNT_IDR);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Non Agency Income Fee" }).fill(NON_AGENCY_INCOME_FEE);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Referral Max Uplines" }).fill(REFERRAL_MAX_UPLINES);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Referral Max Users" }).fill(REFERRAL_MAX_USERS);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Top Products" }).fill(TOP_PRODUCTS);
  await page.waitForTimeout(300);

  await page.getByRole("textbox", { name: "Usd To Idr Rate" }).fill(USD_TO_IDR_RATE);
  await page.waitForTimeout(300);

  await ss("TC-Settings-02_before-save-PASSED");

  // klik Save Changes
  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-02_save-changes-PASSED");
});


// TALENTS CONFIG — /settings/talents-config



async function goToTalentsConfig(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/settings/talents-config");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings\/talents-config/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Talents Configuration" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-03: Buka Talents Config → SS halaman ────────────────────────
test("TC-Settings-03: Settings → Talents Config", async ({ loggedInPage: page, ss }) => {
  await goToTalentsConfig(page);

  await ss("TC-Settings-03_talents-config-PASSED");
});

// ─── TC-Settings-04: Reguler Talent Settings → Save ──────────────────────────
test("TC-Settings-04: Settings → Talents Config → Reguler → Save", async ({ loggedInPage: page, ss }) => {
  await goToTalentsConfig(page);

  await page.getByRole("spinbutton", { name: "Call Price" }).fill(REGULER_CALL_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Talent EARN" }).fill(REGULER_TALENT_EARN);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Chat Fee" }).fill(REGULER_CHAT_FEE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Friend Request Price" }).fill(REGULER_FRIEND_REQUEST_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Friend Request Earn" }).fill(REGULER_FRIEND_REQUEST_EARN);
  await page.waitForTimeout(300);

  await ss("TC-Settings-04_reguler-before-save-PASSED");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Save Configuration" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-04_reguler-save-PASSED");
});

// ─── TC-Settings-05: VIP Talent Settings → Save ───────────────────────────────
test("TC-Settings-05: Settings → Talents Config → VIP → Save", async ({ loggedInPage: page, ss }) => {
  await goToTalentsConfig(page);

  await page.getByRole("spinbutton", { name: "VIP Call Price" }).fill(VIP_CALL_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "VIP Talent EARN" }).fill(VIP_TALENT_EARN);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "VIP Chat Fee" }).fill(VIP_CHAT_FEE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "VIP Friend Price" }).fill(VIP_FRIEND_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "VIP Friend Earn" }).fill(VIP_FRIEND_EARN);
  await page.waitForTimeout(300);

  await ss("TC-Settings-05_vip-before-save-PASSED");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Save Configuration" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-05_vip-save-PASSED");
});

// ─── TC-Settings-06: Celeb Talent Settings → Save ────────────────────────────
test("TC-Settings-06: Settings → Talents Config → Celeb → Save", async ({ loggedInPage: page, ss }) => {
  await goToTalentsConfig(page);

  await page.getByRole("spinbutton", { name: "Celeb Call Price" }).fill(CELEB_CALL_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Celeb Talent EARN" }).fill(CELEB_TALENT_EARN);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Celeb Chat Fee" }).fill(CELEB_CHAT_FEE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Celeb Friend Price" }).fill(CELEB_FRIEND_PRICE);
  await page.waitForTimeout(300);
  await page.getByRole("spinbutton", { name: "Celeb Friend Earn" }).fill(CELEB_FRIEND_EARN);
  await page.waitForTimeout(300);

  await ss("TC-Settings-06_celeb-before-save-PASSED");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Save Configuration" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-06_celeb-save-PASSED");
});

// USER ROLES — /settings/roles


const USER_ROLES_SEARCH_EMAIL = "iki@ultrazbola.com";

// ─── Helper: navigasi ke Settings → User Roles ───────────────────────────────
async function goToUserRoles(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/settings/roles");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings\/roles/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "User Roles" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-07: Buka User Roles ─────────────────────────────────────────
test("TC-Settings-07: Settings → User Roles", async ({ loggedInPage: page, ss }) => {
  await goToUserRoles(page);

  await ss("TC-Settings-07_user-roles-PASSED");
});

// ─── TC-Settings-08: User Roles → Search by email ────────────────────────────
test("TC-Settings-08: Settings → User Roles → Search Email", async ({ loggedInPage: page, ss }) => {
  await goToUserRoles(page);

  await page.getByPlaceholder(/search by name or email/i).fill(USER_ROLES_SEARCH_EMAIL);
  await page.waitForTimeout(2000);

  await ss("TC-Settings-08_search-email-PASSED");
});

// GIFTS — /settings/gifts

const GIFT_SEARCH_NAME = "Tes Pink Car";

// ─── Helper: navigasi ke Settings → Gifts ────────────────────────────────────
async function goToGifts(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/settings/gifts");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings\/gifts/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Gifts Management" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-09: Buka Gifts Management ───────────────────────────────────
test("TC-Settings-09: Settings → Gifts", async ({ loggedInPage: page, ss }) => {
  await goToGifts(page);

  await ss("TC-Settings-09_gifts-PASSED");
});

// ─── TC-Settings-10: Gifts → Search "Tes Pink Car" ───────────────────────────
test("TC-Settings-10: Settings → Gifts → Search", async ({ loggedInPage: page, ss }) => {
  await goToGifts(page);

  await page.getByRole("textbox").fill(GIFT_SEARCH_NAME);
  await page.waitForTimeout(2000);

  await ss("TC-Settings-10_search-gift-PASSED");
});

// PAYMENT METHODS 


const PM_NAME     = "BANK JAGO";
const PM_CODE     = "BANK JAGO";
const PM_TYPE     = "E-Wallet";
const PM_LOGO_URL = "https://static.vecteezy.com/system/resources/thumbnails/067/565/533/small_2x/bank-jago-square-rounded-logo-transparent-without-background-free-png.png";

// ─── Helper: navigasi ke Settings → Payment Methods ──────────────────────────
async function goToPaymentMethods(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/settings/payment-methods");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings\/payment-methods/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Payment Methods" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-11: Buka Payment Methods ────────────────────────────────────
test("TC-Settings-11: Settings → Payment Methods", async ({ loggedInPage: page, ss }) => {
  await goToPaymentMethods(page);

  await ss("TC-Settings-11_payment-methods-PASSED");
});

// ─── TC-Settings-12: Create Payment Method ───────────────────────────────────
test("TC-Settings-12: Settings → Payment Methods → Create Payment Method", async ({ loggedInPage: page, ss }) => {
  await goToPaymentMethods(page);

  // klik tombol Create Payment Method
  await page.getByRole("button", { name: "Create Payment Method" }).click();
  await page.waitForTimeout(1000);

  // verifikasi modal terbuka (scope ke dialog)
  await expect(page.locator('[role="dialog"]').getByRole("heading", { name: "Create Payment Method" })).toBeVisible({ timeout: 10000 });

  // isi Name
  await page.locator('[role="dialog"]').getByRole("textbox", { name: "Name" }).fill(PM_NAME);
  await page.waitForTimeout(300);

  // isi Code
  await page.locator('[role="dialog"]').getByRole("textbox", { name: "Code" }).fill(PM_CODE);
  await page.waitForTimeout(300);

  // pilih Type = E-Wallet (buka dropdown lalu pilih opsi)
  await page.locator('[role="dialog"]').getByRole("combobox").click();
  await page.getByRole("option", { name: PM_TYPE, exact: true }).click();
  await page.waitForTimeout(300);

  // isi Logo URL
  await page.locator('[role="dialog"]').getByRole("textbox", { name: /logo/i }).fill(PM_LOGO_URL);
  await page.waitForTimeout(300);

  await ss("TC-Settings-12_before-create-PASSED");

  // submit
  await page.locator('[role="dialog"]').getByRole("button", { name: "Create Payment Method" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-12_create-payment-method-PASSED");
});


// TOPUP PRODUCTS


const PRODUCT_TYPE         = "Gems";
const PRODUCT_AMOUNT       = "10000";
const PRODUCT_PRICE_IDR    = "250000";
const PRODUCT_BONUS_AMOUNT = "1000";


async function goToTopupProducts(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/settings/products");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/settings\/products/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-Settings-13: Buka Topup Products (default = All) ─────────────────────
test("TC-Settings-13: Settings → Topup Products → All", async ({ loggedInPage: page, ss }) => {
  await goToTopupProducts(page);

  await ss("TC-Settings-13_topup-all-PASSED");
});

// ─── TC-Settings-14b: Filter Gems ────────────────────────────────────────────
test("TC-Settings-14b: Settings → Topup Products → Gems", async ({ loggedInPage: page, ss }) => {
  await goToTopupProducts(page);

  await page.getByRole("tab", { name: "Gems" }).click();
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Settings-14b_topup-gems-PASSED");
});

// ─── TC-Settings-15: Filter Beans ────────────────────────────────────────────
test("TC-Settings-15: Settings → Topup Products → Beans", async ({ loggedInPage: page, ss }) => {
  await goToTopupProducts(page);

  await page.getByRole("tab", { name: "Beans" }).click();
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Settings-15_topup-beans-PASSED");
});

// ─── TC-Settings-16: Semua Filter berurutan (All → Gems → Beans) ─────────────
test("TC-Settings-16: Settings → Topup Products → Semua Filter", async ({ loggedInPage: page, ss }) => {
  await goToTopupProducts(page);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await page.getByRole("tab", { name: "Gems" }).click();
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await page.getByRole("tab", { name: "Beans" }).click();
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-Settings-16_topup-semua-filter-PASSED");
});

// ─── TC-Settings-14: Create Product (Gems, Amount 10000, Price 250000, Bonus 1000) ─
test("TC-Settings-14: Settings → Topup Products → Create Product", async ({ loggedInPage: page, ss }) => {
  await goToTopupProducts(page);

  // navigasi ke halaman Create Product
  await page.goto("/settings/products/create");
  await page.waitForLoadState("domcontentloaded");

  await expect(page.getByRole("heading", { name: "Create Product" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);

  // pilih Product Type = Gems
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: PRODUCT_TYPE }).click();
  await page.waitForTimeout(300);

  // isi Amount (exact: true agar tidak bentrok dengan "Bonus Amount")
  await page.getByRole("spinbutton", { name: "Amount", exact: true }).fill(PRODUCT_AMOUNT);
  await page.waitForTimeout(300);

  // isi Price (IDR)
  await page.getByRole("spinbutton", { name: "Price (IDR)" }).fill(PRODUCT_PRICE_IDR);
  await page.waitForTimeout(300);

  // isi Bonus Amount
  await page.getByRole("spinbutton", { name: "Bonus Amount" }).fill(PRODUCT_BONUS_AMOUNT);
  await page.waitForTimeout(300);

  await ss("TC-Settings-14_before-create-PASSED");

  // klik Create Product
  await page.getByRole("button", { name: "Create Product" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-Settings-14_create-product-PASSED");
});
