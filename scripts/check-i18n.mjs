import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("src/i18n/locales");
const locales = ["fi", "es", "en"];

function flatten(value, prefix = "", out = new Set()) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
  } else {
    out.add(prefix);
  }
  return out;
}

const messages = Object.fromEntries(
  await Promise.all(
    locales.map(async (locale) => [
      locale,
      JSON.parse(await readFile(path.join(root, `${locale}.json`), "utf8")),
    ]),
  ),
);

const keys = Object.fromEntries(locales.map((locale) => [locale, flatten(messages[locale])]));
let failed = false;

for (const locale of locales) {
  for (const other of locales) {
    if (locale === other) continue;
    const missing = [...keys[other]].filter((key) => !keys[locale].has(key));
    const extra = [...keys[locale]].filter((key) => !keys[other].has(key));
    if (missing.length || extra.length) {
      failed = true;
      if (missing.length) console.error(`[${locale}] missing keys: ${missing.join(", ")}`);
      if (extra.length) console.error(`[${locale}] extra keys: ${extra.join(", ")}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`i18n check passed: ${locales.join(", ")} have identical key sets.`);
