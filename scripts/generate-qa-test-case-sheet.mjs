/**
 * Generate qa-test-case-tracker.csv from tests/*.spec.ts
 * Run: node scripts/generate-qa-test-case-sheet.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const testsDir = path.join(root, "tests");
const outFile = path.join(root, "qa-test-case-tracker.csv");

function sanitizeFolderName(name) {
  const cleaned = name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.\s]+$/g, "");
  return cleaned.slice(0, 200) || "unnamed-test";
}

function csvEscape(s) {
  if (s == null || s === undefined) return "";
  const str = String(s);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function extractTcId(title) {
  const m = title.match(/^(TC-[^:\s]+)/);
  return m ? m[1] : "";
}

function areaFromFile(basename) {
  return basename.replace(/\.spec\.ts$/i, "").replace(/-/g, " ");
}

function grepCommands(relPath, title) {
  const safe = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return {
    fileOnly: `npx playwright test ${relPath}`,
    grep: `npx playwright test ${relPath} --grep "${safe}"`,
  };
}

function parseSpecFile(absPath, relPath) {
  const text = fs.readFileSync(absPath, "utf8");
  const lines = text.split(/\r?\n/);
  const rows = [];

  const testRe = /^test\s*\(\s*["']([^"']+)["']\s*,/;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(testRe);
    if (!m) continue;
    const title = m[1];
    const ssFiles = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (testRe.test(lines[j])) break;
      const sm = lines[j].match(/await\s+ss\s*\(\s*["']([^"']+)["']\s*\)/);
      if (sm) ssFiles.push(`${sm[1]}.png`);
    }
    const basename = path.basename(absPath);
    const area = areaFromFile(basename);
    const tcId = extractTcId(title);
    const folder = `screenshots/${sanitizeFolderName(title)}/`;
    const cmds = grepCommands(relPath, title);
    const keterangan = title.includes("→")
      ? `Otomatisasi alur UI sesuai judul (menu dengan panah). Screenshot bukti di folder terlampir.`
      : `Skenario otomatisasi Playwright; lihat expect/assert di file spec.`;

    rows.push({
      area,
      file: relPath.replace(/\\/g, "/"),
      tcId,
      title,
      keterangan,
      prasyarat:
        relPath.includes("api-login") || text.includes("loggedInPage")
          ? "BASE_URL, TEST_LOGIN_ID, TEST_PASSWORD (lihat .env)"
          : "BASE_URL, TEST_LOGIN_ID, TEST_PASSWORD",
      perintah: cmds.grep,
      perintahFile: cmds.fileOnly,
      status: "",
      progress: "",
      folderSs: folder,
      daftarSs: ssFiles.join("; "),
      linkEvidence: "",
      tanggal: "",
      catatan: "",
    });
  }
  return rows;
}

const headers = [
  "O_Modul_Area",
  "File_Spec",
  "TC_ID",
  "Judul_Tes_Playwright",
  "Keterangan",
  "Prasyarat_Env",
  "Perintah_Jalankan_TC_ini",
  "Perintah_Jalankan_Semua_File",
  "Status",
  "Progress_pct",
  "Folder_Screenshot",
  "File_Screenshot_Diharapkan",
  "Link_Evidence_GDrive_atau_HTML_Report",
  "Tanggal_Eksekusi_Terakhir",
  "Catatan_Defect_atau_Risiko",
];

const specFiles = fs
  .readdirSync(testsDir)
  .filter((f) => f.endsWith(".spec.ts"))
  .sort();

let allRows = [];
for (const f of specFiles) {
  const abs = path.join(testsDir, f);
  const rel = path.join("tests", f);
  allRows = allRows.concat(parseSpecFile(abs, rel));
}

const bom = "\uFEFF";
const linesOut = [
  headers.map(csvEscape).join(","),
  ...allRows.map((r) =>
    [
      r.area,
      r.file,
      r.tcId,
      r.title,
      r.keterangan,
      r.prasyarat,
      r.perintah,
      r.perintahFile,
      r.status,
      r.progress,
      r.folderSs,
      r.daftarSs,
      r.linkEvidence,
      r.tanggal,
      r.catatan,
    ]
      .map(csvEscape)
      .join(",")
  ),
];

fs.writeFileSync(outFile, bom + linesOut.join("\n"), "utf8");
console.log(`Wrote ${allRows.length} baris ke ${path.relative(root, outFile)}`);
