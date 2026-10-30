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

// Regression guard: the server-rendered document language must follow
// next-intl's active locale instead of being hardcoded to one language.
const rootLayout = await readFile(path.resolve("src/app/layout.tsx"), "utf8");
const hasServerLocale = /import\s*\{\s*getLocale\s*\}\s*from\s*["']next-intl\/server["']/.test(rootLayout);
const hasDynamicHtmlLanguage = /<html\s+lang=\{locale\}/.test(rootLayout);
if (!hasServerLocale || !hasDynamicHtmlLanguage) {
  failed = true;
  console.error("Document language check failed: src/app/layout.tsx must set <html lang={locale}> using getLocale() from next-intl/server.");
}

// Kansakoulu placement regression guard: the user requested that its
// promotional card not appear on the homepage. Keep the dedicated stay and
// restaurant cards on the Kimitoön destination guide instead.
const homepageSource = await readFile(path.resolve("src/app/[locale]/page.tsx"), "utf8");
const kimitoonGuideSource = await readFile(path.resolve("src/components/salo/KimitoonGuide.tsx"), "utf8");
const homepageHasKansakouluCard = homepageSource.includes("KansakouluSpotlight")
  || homepageSource.includes("kansakoulu");
const guideKeepsCategoryCards = kimitoonGuideSource.includes("KimitoonKansakouluCategoryCard")
  && /<KimitoonKansakouluCategoryCard\s+locale=/.test(kimitoonGuideSource);
if (homepageHasKansakouluCard || !guideKeepsCategoryCards) {
  failed = true;
  console.error("Kansakoulu placement check failed: keep the homepage free of the Kansakoulu promotional card and retain the accommodation/food cards on the Kimitoön guide.");
}

// Sitemap regression guards: do not advertise redirected Mathildedal
// aliases as indexable pages or fabricate last-modified timestamps.
const sitemapSource = await readFile(path.resolve("src/app/sitemap.ts"), "utf8");
if (/lastModified:\s*new Date\(\)/.test(sitemapSource)) {
  failed = true;
  console.error("Sitemap check failed: lastModified must come from real content timestamps, never the current build/request time.");
}
if (/["']mathildedal(?:\/|["'])/.test(sitemapSource)) {
  failed = true;
  console.error("Sitemap check failed: legacy Mathildedal aliases redirect to the canonical destination and must not be listed.");
}

if (failed) process.exit(1);
console.log(`i18n/SEO checks passed: ${locales.join(", ")} have identical key sets, locale-aware document language and safe sitemap timestamps/routes.`);
