import { test, expect } from "./fixtures";

const PAGE_VIEW_DELAY = 5000;
const HOST_SEARCH_EMAIL = "ais+66@ultrazbola.com";
const HOST_TIER = "VIP";
const CONFIG_MILESTONE = "20";
const CONFIG_AMOUNT = "750000";

// ─── Helper: navigasi ke Referral → Host Settings ────────────────────────────
async function goToHostSettings(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  // buka accordion Referral
  await page.getByRole("button", { name: "Referral" }).click();
  await page.waitForTimeout(1000);

  // klik Host Settings
  await page.getByRole("link", { name: "Host Settings" }).click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi halaman
  await expect(page).toHaveURL(/referral\/host-settings/, { timeout: 10000 });
  await expect(page.getByRole("heading", { name: "Referral Host" })).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: search host by email ────────────────────────────────────────────
async function searchHost(page: any, keyword: string) {
  await page.getByPlaceholder(/search hosts/i).fill(keyword);
  await page.waitForTimeout(2000);
}

// ─── TC-ReferralHost-01: Buka Host Settings ──────────────────────────────────
test("TC-ReferralHost-01: Referral → Host Settings", async ({ loggedInPage: page, ss }) => {
  await goToHostSettings(page);

  await ss("TC-ReferralHost-01_host-settings-PASSED");
});

// ─── TC-ReferralHost-02: Search email ais+66@ultrazbola.com ──────────────────
test("TC-ReferralHost-02: Referral → Host Settings → Search Email", async ({ loggedInPage: page, ss }) => {
  await goToHostSettings(page);
  await searchHost(page, HOST_SEARCH_EMAIL);
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ReferralHost-02_search-email-PASSED");
});

// ─── TC-ReferralHost-03: Edit Settings → Enable Referral → Tier VIP → Save ───
test("TC-ReferralHost-03: Referral → Host Settings → Edit Settings → Enable → VIP → Save", async ({ loggedInPage: page, ss }) => {
  await goToHostSettings(page);
  await searchHost(page, HOST_SEARCH_EMAIL);

  // klik ikon actions (titik tiga) pada baris pertama hasil search
  await page.locator("table tbody tr").first().getByLabel("actions").click();
  await page.waitForTimeout(500);

  // klik Edit Settings
  await page.getByText("Edit Settings").click();
  await page.waitForTimeout(1000);

  // verifikasi modal terbuka
  await expect(page.getByText("Edit Referral Settings")).toBeVisible({ timeout: 10000 });

  // pilih Enable Referral
  await page.getByRole("radio", { name: "Enable Referral" }).check();
  await page.waitForTimeout(500);

  // buka dropdown Tier lalu pilih sesuai HOST_TIER
  await page.getByText(HOST_TIER, { exact: true }).click();
  await page.getByRole("option", { name: HOST_TIER }).click();
  await page.waitForTimeout(500);

  await ss("TC-ReferralHost-03_before-save-PASSED");

  // klik Save Changes
  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-ReferralHost-03_save-changes-PASSED");
});

// ─── TC-ReferralHost-04: Search → Show Details ───────────────────────────────
test("TC-ReferralHost-04: Referral → Host Settings → Search → Show Details", async ({ loggedInPage: page, ss }) => {
  await goToHostSettings(page);
  await searchHost(page, HOST_SEARCH_EMAIL);

  // klik ikon actions (titik tiga) pada baris pertama hasil search
  await page.locator("table tbody tr").first().getByLabel("actions").click();
  await page.waitForTimeout(500);

  // klik Show Details
  await page.getByText("Show Details").click();
  await page.waitForTimeout(1000);

  // verifikasi modal Host Referral Detail terbuka
  await expect(page.getByText("Host Referral Detail")).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ReferralHost-04_show-details-PASSED");
});

// ─── TC-ReferralHost-05: 
test("TC-ReferralHost-05: Referral → Host Settings → Show Dashboard → Referral Tab", async ({ loggedInPage: page, ss }) => {
  await goToHostSettings(page);
  await searchHost(page, HOST_SEARCH_EMAIL);

  // klik ikon actions (titik tiga) pada baris pertama hasil search
  await page.locator("table tbody tr").first().getByLabel("actions").click();
  await page.waitForTimeout(500);

  // klik Show Dashboard
  await page.getByText("Show Dashboard").click();
  await page.waitForLoadState("domcontentloaded");

  // verifikasi URL masuk ke /referral/host-settings/{id} — ID dinamis
  await expect(page).toHaveURL(/referral\/host-settings\/\d+$/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ReferralHost-05_dashboard-PASSED");

  // klik tab Referral
  await page.getByRole("tab", { name: "Referral" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/referral\/host-settings\/\d+\/referral/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-ReferralHost-05_referral-tab-PASSED");
});


// REFERRAL CONFIGS 


// ─── Helper: navigasi ke Referral → Referral Configs ─────────────────────────
async function goToReferralConfigs(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.getByRole("button", { name: "Referral" }).click();
  await page.waitForTimeout(1000);

  await page.getByRole("link", { name: "Referral Configs" }).click();
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/referral\/configs/, { timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── TC-ReferralConfigs-01: Buka Referral Configs ────────────────────────────
test("TC-ReferralConfigs-01: Referral → Referral Configs", async ({ loggedInPage: page, ss }) => {
  await goToReferralConfigs(page);

  await ss("TC-ReferralConfigs-01_referral-configs-PASSED");
});

// ─── TC-ReferralConfigs-02: Create Config Talent (Milestone: 20, Amount: 750000) ─
test("TC-ReferralConfigs-02: Referral → Referral Configs → Create Config Talent", async ({ loggedInPage: page, ss }) => {
  await goToReferralConfigs(page);

  // klik tombol Create Config Talent
  await page.getByRole("button", { name: "Create Config Talent" }).click();
  await page.waitForTimeout(1000);

  // isi Milestone
  await page.getByRole("spinbutton", { name: "Milestone" }).fill(CONFIG_MILESTONE);
  await page.waitForTimeout(500);

  // isi Amount
  await page.getByRole("spinbutton", { name: "Amount" }).fill(CONFIG_AMOUNT);
  await page.waitForTimeout(500);

  await ss("TC-ReferralConfigs-02_before-create-PASSED");

  // klik Create Config
  await page.getByRole("button", { name: "Create Config" }).click();
  await page.waitForTimeout(2000);

  await ss("TC-ReferralConfigs-02_create-config-PASSED");
});


// NON-AGENCY 

async function goToNonAgency(page: any) {
  await expect(page.getByText("Miracall Admin Dashboard")).toBeVisible({ timeout: 15000 });

  await page.goto("/referral/non-agency");
  await page.waitForLoadState("domcontentloaded");

  await expect(page).toHaveURL(/referral\/non-agency/, { timeout: 10000 });
  await expect(page.getByRole("combobox").first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(PAGE_VIEW_DELAY);
}

// ─── Helper: set Type filter ──────────────────────────────────────────────────
async function setNonAgencyType(page: any, currentLabel: string, type: string) {
  await page.getByText(currentLabel, { exact: true }).click();
  await page.getByRole("option", { name: type, exact: true }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1000);
}

// ─── TC-NonAgency-01: Default (Type = All) ───────────────────────────────────
test("TC-NonAgency-01: Referral → Non-Agency → Default (All)", async ({ loggedInPage: page, ss }) => {
  await goToNonAgency(page);

  await ss("TC-NonAgency-01_default-all-PASSED");
});

// ─── TC-NonAgency-02: Type = Active ──────────────────────────────────────────
test("TC-NonAgency-02: Referral → Non-Agency → Active", async ({ loggedInPage: page, ss }) => {
  await goToNonAgency(page);
  await setNonAgencyType(page, "All", "Active");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-NonAgency-02_active-PASSED");
});

// ─── TC-NonAgency-03: Type = Inactive ────────────────────────────────────────
test("TC-NonAgency-03: Referral → Non-Agency → Inactive", async ({ loggedInPage: page, ss }) => {
  await goToNonAgency(page);
  await setNonAgencyType(page, "All", "Inactive");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-NonAgency-03_inactive-PASSED");
});

// ─── TC-NonAgency-04: Semua Type berurutan ───────────────────────────────────
test("TC-NonAgency-04: Referral → Non-Agency → Semua Type", async ({ loggedInPage: page, ss }) => {
  await goToNonAgency(page);

  await setNonAgencyType(page, "All", "All");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setNonAgencyType(page, "All", "Active");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await setNonAgencyType(page, "Active", "Inactive");
  await page.waitForTimeout(PAGE_VIEW_DELAY);

  await ss("TC-NonAgency-04_semua-type-PASSED");
});
