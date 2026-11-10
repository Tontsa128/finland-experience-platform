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
const homepageDestinationFeaturesSource = await readFile(path.resolve("src/lib/homepage-destination-features.ts"), "utf8");
const homepageCopyHasNoMathildedal = !homepageDestinationFeaturesSource.includes("Mathildedal");

const homepageHasAllCoastalDestinations = [
  '"salo-mathildedal"',
  "naantali:",
  "turku:",
  "hanko:",
  "aland:",
].every((slug) => homepageDestinationFeaturesSource.includes(slug));
const homepageUsesPhotoAttribution = homepageSource.includes("getHomepagePhotoCredit")
  && homepageSource.includes("getHomepagePhotoUsageNote")
  && homepageSource.includes("photo.sourcePage")
  && homepageSource.includes("imageSourceLabel")
  && homepageDestinationFeaturesSource.includes("photo.license");
const homepageAssistantIsBeforePopularDestinations = homepageSource.indexOf("<TravelAdvisor")
  < homepageSource.indexOf('<section className="container-narrow pb-8 sm:pb-10">');
const homepageCategoriesUseUnifiedSearch = [
  'search?type=accommodation',
  'search?type=experience&category=food',
  'search?type=experience',
  'search?type=destination',
].every((route) => homepageSource.includes(route));
const homepageCityCopyIsLocalized = ["fi:", "en:", "es:"].every((localeKey) => {
  return homepageDestinationFeaturesSource.includes(localeKey);
});
if (!homepageHasAllCoastalDestinations || !homepageUsesPhotoAttribution || !homepageCityCopyIsLocalized || !homepageCopyHasNoMathildedal || !homepageAssistantIsBeforePopularDestinations || !homepageCategoriesUseUnifiedSearch) {
  failed = true;
  console.error("Homepage discovery/attribution check failed:", {
    homepageHasAllCoastalDestinations,
    homepageUsesPhotoAttribution,
    homepageCityCopyIsLocalized,
    homepageCopyHasNoMathildedal,
    homepageAssistantIsBeforePopularDestinations,
    homepageCategoriesUseUnifiedSearch,
  });
}
const unifiedSearchSource = await readFile(path.resolve("src/app/[locale]/search/page.tsx"), "utf8");
const homepageDataSource = await readFile(path.resolve("src/lib/data.ts"), "utf8");
const unifiedSearchIncludesVerifiedLocalProviders = unifiedSearchSource.includes('from "@/lib/salo"')
  && unifiedSearchSource.includes('from "@/lib/luxury-directory"')
  && unifiedSearchSource.includes('from "@/lib/kimitoon-providers"')
  && unifiedSearchSource.includes("saloProviders") && unifiedSearchSource.includes("saloProviderResults")
  && unifiedSearchSource.includes("luxuryDirectory")
  && unifiedSearchSource.includes("kimitoonProviders")
  && unifiedSearchSource.includes("areaProviderIds")
  && unifiedSearchSource.includes("matchesAreaText")
  && unifiedSearchSource.includes("areaAliases")
  && unifiedSearchSource.includes("providerDedupeKey")
  && unifiedSearchSource.includes('href: `/${locale}/providers/salo-${provider.id}`')
  && unifiedSearchSource.includes('href: `/${locale}/providers/directory-${provider.id}`')
  && unifiedSearchSource.includes('href: `/${locale}/providers/kimitoon-${provider.id}`');
if (!unifiedSearchIncludesVerifiedLocalProviders) {
  failed = true;
  console.error("Unified search check failed: include verified local providers with their canonical provider pages and locality mapping.");
}
// Production catalogue regression guard: curated demo fallbacks are opt-in only.
// A listing must never publish fallback links when its detail route rejects those records.
const homepageFallbackSource = homepageSource;
const searchFallbackSource = unifiedSearchSource;
const accommodationListingSource = await readFile(path.resolve("src/app/[locale]/accommodations/page.tsx"), "utf8");
const destinationListingSource = await readFile(path.resolve("src/app/[locale]/destinations/page.tsx"), "utf8");
const destinationDetailSource = await readFile(path.resolve("src/app/[locale]/destinations/[slug]/page.tsx"), "utf8");
const demoFallbacksAreOptIn = homepageFallbackSource.includes("allowDemoFallback ? destinations : []")
  && homepageFallbackSource.includes("allowDemoFallback ? cabins : []")
  && homepageFallbackSource.includes("allowDemoFallback ? experiences : []")
  && searchFallbackSource.includes("allowDemoFallback ? destinations : []")
  && searchFallbackSource.includes("allowDemoFallback ? cabins : []")
  && searchFallbackSource.includes("allowDemoFallback ? experiences : []")
  && accommodationListingSource.includes("allowDemoFallback ? fallbackCabins : []")
  && destinationListingSource.includes("allowDemoFallback ? fallbackDestinations : []")
  && destinationDetailSource.includes("allowDemoFallback ? fallbackDestinations : []");
if (!demoFallbacksAreOptIn) {
  failed = true;
  console.error("Demo fallback consistency check failed: production listings must not publish records whose detail routes are disabled.");
}

const kimitoonGuideSource = await readFile(path.resolve("src/components/salo/KimitoonGuide.tsx"), "utf8");
const homepageHeroUsesExistingDestinationRoutes = [
  'href: "/turku"',
  'href: "/hanko"',
  'href: "/naantali"',
  'href: "/aland"',
  'href: "/porvoo"',
].every((href) => homepageHeroSource.includes(href));
const rosalaCardUsesPublishedProviderRoute = kimitoonGuideSource.includes('url: "/providers/kimitoon-rosala-viking-centre"')
  && !kimitoonGuideSource.includes('url: "/destinations/rosala"');
const homepageHasKansakouluCard = homepageSource.includes("KansakouluSpotlight")
  || homepageSource.includes("kansakoulu");
const guideKeepsCategoryCards = kimitoonGuideSource.includes("KimitoonKansakouluCategoryCard")
  && /<KimitoonKansakouluCategoryCard\s+locale=/.test(kimitoonGuideSource);
if (!homepageHeroUsesExistingDestinationRoutes || !rosalaCardUsesPublishedProviderRoute || homepageHasKansakouluCard || !guideKeepsCategoryCards) {
  failed = true;
  console.error("Kansakoulu placement check failed: keep the homepage free of the Kansakoulu promotional card and retain the accommodation/food cards on the Kimitoön guide.");
}

const homepageReservesHeroPhotos = homepageSource.includes("const builtInHeroImages = [")
  && homepageSource.includes("photoLibrary.mathildedalVillage")
  && homepageSource.includes("homepage?.homepageSlides")
  && homepageSource.includes("[...builtInHeroImages, ...configuredHeroImages].map(imageKey)");
const homepageNoDuplicateFallback = homepageSource.includes('return "";')
  && homepageSource.includes("If a record has no distinct");
const homepageNaantaliUsesDistinctPhotos = homepageDataSource.includes("images: [photoLibrary.naantaliOldTown, photoLibrary.naantaliHarbour]");
const homepageTurkuUsesDistinctPhotos = homepageDataSource.includes("images: [photoLibrary.turkuAura, photoLibrary.turkuArchipelagoHouse]");
if (!homepageReservesHeroPhotos || !homepageNoDuplicateFallback || !homepageNaantaliUsesDistinctPhotos || !homepageTurkuUsesDistinctPhotos) {
  failed = true;
  console.error("Homepage duplicate-image guard failed:", {
    homepageReservesHeroPhotos,
    homepageNoDuplicateFallback,
    homepageNaantaliUsesDistinctPhotos,
    homepageTurkuUsesDistinctPhotos,
  });
}

// Homepage image regression guard: Mathildedal cards use verified, distinct provider imagery;
// the retired dusk harbour and mismatched cottage/coffee hero must never return.
const homepageHeroSource = await readFile(path.resolve("src/components/home/Hero.tsx"), "utf8");
const photoLibrarySource = await readFile(path.resolve("src/lib/photo-library.ts"), "utf8");
const homepageMathildedalUsesNonHeroCardImage = homepageSource.includes('"salo-mathildedal": [photoLibrary.mathildedalHarbour, photoLibrary.mathildedalVillage]');
const homepageMathildedalOverrides = [
  '"salo-mathildedal"',
  '"matilda-villas"',
  '"matri-house"',
  '"mathildan-marina"',
  '"local-food-mathildedal"',
].every((slug) => homepageSource.includes(slug));
const homepageMathildedalProviderPhotos = [
  "matildaVillasBedroom",
  "matildaVillasLivingRoom",
  "matriHouseLounge",
  "mathildanMarinaTerrace",
  "cafeMathildedal",
].every((image) => photoLibrarySource.includes(image));
const homepageMathildedalPhotoCredits = [
  "Matilda Villas — Salon Kohteet",
  "Matri House — Salon Kohteet",
  "Mathildan Marina",
  "Visit Mathildedal",
].every((credit) => photoLibrarySource.includes(credit));
const homepageHeroHasMatchedCafeCopy = [
  'key: "mathildedalCafe"',
  "Kahvihetki ja tuoreet leivonnaiset",
  "Café y repostería recién hecha",
  "Coffee and freshly baked pastries",
  "isLegacyCoffeeSlide",
  "hasLegacyCoffeeSlide",
].every((value) => homepageHeroSource.includes(value));
const homepageHasNoLegacyDuskOrCoffeeImage = !photoLibrarySource.includes("Mathildedal_harbour_sunset.jpg")
  && !homepageHeroSource.includes('title: "Morning coffee by the water"')
  && !homepageHeroSource.includes('title: "Aamukahvi veden äärellä"')
  // The old CMS image URL is intentionally recognised so it can be replaced at runtime.
  && homepageHeroSource.includes("Finnish_summer_cottage_and_a_lake_in_Keuruu.jpg")
  && homepageHeroSource.includes("legacyCoffeeCaptions");
const homepageMathildedalDataUsesSpecificPhotos = homepageDataSource.includes("images: [photoLibrary.matildaVillasBedroom, photoLibrary.matildaVillasLivingRoom]")
  && homepageDataSource.includes("images: [photoLibrary.matriHouseLounge, photoLibrary.matriHouseBedroom]")
  && homepageDataSource.includes("images: [photoLibrary.mathildanMarinaTerrace, photoLibrary.mathildedalHarbour]");
const naantaliHarbourLicenseIsCorrect = photoLibrarySource.includes('credit: "Pöllö", license: "CC BY 3.0"');
const homepageMidsummerCardMatchesBonfire = homepageDataSource.includes("images:[photoLibrary.midsummerBonfire]")
  && photoLibrarySource.includes("Janne Karaste")
  && photoLibrarySource.includes("CC BY-SA 2.0");
if (!homepageMathildedalUsesNonHeroCardImage || !homepageMathildedalOverrides || !homepageMathildedalProviderPhotos || !homepageMathildedalPhotoCredits || !homepageHeroHasMatchedCafeCopy || !homepageHasNoLegacyDuskOrCoffeeImage || !homepageMathildedalDataUsesSpecificPhotos || !homepageMidsummerCardMatchesBonfire) {
  failed = true;
  console.error("Homepage Mathildedal photo check failed:", {
    homepageMathildedalUsesNonHeroCardImage,
    naantaliHarbourLicenseIsCorrect,
    homepageMathildedalOverrides,
    homepageMathildedalProviderPhotos,
    homepageMathildedalPhotoCredits,
    homepageHeroHasMatchedCafeCopy,
    homepageHasNoLegacyDuskOrCoffeeImage,
    homepageMathildedalDataUsesSpecificPhotos,
    homepageMidsummerCardMatchesBonfire,
  });
}

// Sitemap regression guards: do not advertise redirected Mathildedal
// aliases as indexable pages or fabricate last-modified timestamps.
const sitemapSource = await readFile(path.resolve("src/app/sitemap.ts"), "utf8");
if (/lastModified:\s*new Date\(\)/.test(sitemapSource)) {
  failed = true;
  console.error("Sitemap check failed: lastModified must come from real content timestamps, never the current build/request time.");
}
const sitemapBasePaths = sitemapSource.match(/const basePaths = \[([\s\S]*?)\];/)?.[1] ?? "";
if (/(?:^|\n)\s*["']mathildedal(?:\/[^"']*)?["']\s*,?/m.test(sitemapBasePaths)) {
  failed = true;
  console.error("Sitemap check failed: legacy Mathildedal aliases redirect to the canonical village and must not be listed.");
}

// Navigation regression guard: public Salo links skip the retired intro page,
// and Mathildedal URLs resolve to the canonical village and category routes.
const coastalGuideSource = await readFile(path.resolve("src/app/[locale]/coastal-finland/page.tsx"), "utf8");
const mathildedalLegacySource = await readFile(path.resolve("src/app/[locale]/mathildedal/page.tsx"), "utf8");
const mathildedalCategoryLegacySource = await readFile(path.resolve("src/app/[locale]/mathildedal/[category]/page.tsx"), "utf8");
const mathildedalMiddlewareSource = await readFile(path.resolve("middleware.ts"), "utf8");
const ruukkikylaGuideSource = await readFile(path.resolve("src/components/salo/RuukkikylaGuide.tsx"), "utf8");
const teijoDestinationSource = await readFile(path.resolve("src/app/[locale]/destinations/teijon-ruukkikyla/page.tsx"), "utf8");

const saloGuideLinksDirectly = coastalGuideSource.includes('href={\u0060/\u0024{locale}/salo/kylat\u0060}');
const legacyMathildedalLinksDirectly = [mathildedalLegacySource, mathildedalCategoryLegacySource, mathildedalMiddlewareSource]
  .every((source) => source.includes('/salo/mathildedal') && !source.includes('/destinations/salo-mathildedal'));
const legacyDestinationCanonicalizes = destinationDetailSource.includes('slug === "salo-mathildedal"')
  && destinationDetailSource.includes('/salo/mathildedal');
const relatedMathildedalLinksDirectly = ruukkikylaGuideSource.includes('/destinations/salo-mathildedal')
  && teijoDestinationSource.includes('/destinations/salo-mathildedal')
  && legacyDestinationCanonicalizes;
if (!saloGuideLinksDirectly || !legacyMathildedalLinksDirectly || !relatedMathildedalLinksDirectly) {
  failed = true;
  console.error("Direct destination navigation check failed:", {
    saloGuideLinksDirectly,
    legacyMathildedalLinksDirectly,
    relatedMathildedalLinksDirectly,
    legacyDestinationCanonicalizes,
  });
}

// Salo regional guide regression guard: providers belong to one area unless
// they explicitly serve multiple locations; category routes must be generated and indexed.
const saloDataSource = await readFile(path.resolve("src/lib/salo.ts"), "utf8");
const saloAreaDataSource = await readFile(path.resolve("src/lib/salo-areas.ts"), "utf8");
const saloDirectorySource = await readFile(path.resolve("src/components/salo/SaloDirectory.tsx"), "utf8");
const saloPageSource = await readFile(path.resolve("src/app/[locale]/salo/page.tsx"), "utf8");
const saloVillageIndexSource = await readFile(path.resolve("src/app/[locale]/salo/kylat/page.tsx"), "utf8");
const saloAreaGridSource = await readFile(path.resolve("src/components/salo/SaloAreaGrid.tsx"), "utf8");
const saloEditorialCardSource = await readFile(path.resolve("src/components/salo/SaloEditorialCard.tsx"), "utf8");
const saloAreaPageSource = await readFile(path.resolve("src/app/[locale]/salo/[area]/page.tsx"), "utf8");
const saloCategoryPageSource = await readFile(path.resolve("src/app/[locale]/salo/[area]/[category]/page.tsx"), "utf8");
const providerArrayStart = saloDataSource.indexOf("export const saloProviders: SaloProvider[] = [");
const providerArrayEnd = saloDataSource.indexOf("\n];", providerArrayStart);
const providerIds = providerArrayStart >= 0 && providerArrayEnd > providerArrayStart
  ? [...saloDataSource.slice(providerArrayStart, providerArrayEnd).matchAll(/\bid:\s*"([^"]+)"/g)].map((match) => match[1])
  : [];
const providerArraySource = providerArrayStart >= 0 && providerArrayEnd > providerArrayStart
  ? saloDataSource.slice(providerArrayStart, providerArrayEnd)
  : "";
const providerBlocks = [...providerArraySource.matchAll(/^\s{2}\{\s*id:\s*"([^"]+)"([\s\S]*?)^\s{2}\},/gm)];
const providerImageCount = [...providerArraySource.matchAll(/^\s+image:\s*/gm)].length;
const providerCreditCount = [...providerArraySource.matchAll(/^\s+imageCredit:\s*/gm)].length;
// An image may be omitted intentionally while its reuse rights are being confirmed.
// Keep this allow-list exact so other accidental image removals still fail CI.
const approvedNoImageProviderIds = new Set(["meri-teijo-golf"]);
const missingImageProviderIds = providerBlocks
  .filter((match) => !/^\s+image:\s*/m.test(match[2]))
  .map((match) => match[1]);
const unapprovedMissingImageIds = missingImageProviderIds.filter((id) => !approvedNoImageProviderIds.has(id));
const staleNoImageApprovals = [...approvedNoImageProviderIds].filter((id) => !missingImageProviderIds.includes(id));
const imageWithoutCreditIds = providerBlocks
  .filter((match) => /^\s+image:\s*/m.test(match[2]) && !/^\s+imageCredit:\s*/m.test(match[2]))
  .map((match) => match[1]);
const areaMapStart = saloAreaDataSource.indexOf("export const areaProviderIds:");
const areaMapEnd = saloAreaDataSource.indexOf("\n};", areaMapStart);
const areaMap = areaMapStart >= 0 && areaMapEnd > areaMapStart ? saloAreaDataSource.slice(areaMapStart, areaMapEnd) : "";
const assignedProviderIds = [...areaMap.matchAll(/^\s+[a-z]+:\s*\[([^\]]*)\]/gm)]
  .flatMap((match) => [...match[1].matchAll(/"([^"]+)"/g)].map((idMatch) => idMatch[1]));
const duplicateAreaIds = [...new Set(assignedProviderIds.filter((id, index) => assignedProviderIds.indexOf(id) !== index))];
const multiLocationMatch = saloAreaDataSource.match(/export const multiLocationProviderIds:\s*string\[\]\s*=\s*\[([\s\S]*?)\];/);
const multiLocationProviderIds = multiLocationMatch
  ? [...multiLocationMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
  : [];
const unapprovedDuplicateAreaIds = duplicateAreaIds.filter((id) => !multiLocationProviderIds.includes(id));
const invalidMultiLocationIds = multiLocationProviderIds.filter((id) =>
  !providerIds.includes(id) || assignedProviderIds.filter((assignedId) => assignedId === id).length < 2,
);
const missingAreaIds = providerIds.filter((id) => !assignedProviderIds.includes(id));
const unknownAreaIds = assignedProviderIds.filter((id) => !providerIds.includes(id));
const renderedAreas = [...areaMap.matchAll(/^\s+([a-z]+):\s*\[/gm)].map((match) => match[1]);
const areaPageHasCategoryLinks = saloAreaPageSource.includes("getSaloAreaCategories(area)")
  && saloAreaPageSource.includes("saloCategorySlugs[category]");
const categoryRouteUsesDirectory = /<SaloDirectory\s+locale=\{locale\}\s+area=\{area\}\s+category=\{category\}/.test(saloCategoryPageSource);
const areaRouteGeneratesAllSlugs = saloAreaPageSource.includes("const areaSlugs = Object.keys(areaProviderIds) as SaloArea[];")
  && saloAreaPageSource.includes("return areaSlugs.map((area) => ({ area }));");
const saloLandingLinksToVillageIndex = saloPageSource.includes("redirect(`/${locale}/salo/kylat`)");
const villageIndexUsesAreaGrid = saloVillageIndexSource.includes("<SaloAreaGrid locale={locale} />");
const saloLandingDoesNotRenderVillageGrid = !saloPageSource.includes("<SaloAreaGrid");
const areaCardsLinkToRoutes = /href=\{\x60\/\$\{locale\}\/salo\/\$\{area\}\x60\}/.test(saloAreaGridSource);
const areaCardsIncludeImages = saloAreaGridSource.includes("<SaloEditorialCard")
  && saloAreaPageSource.includes("<SaloEditorialCard")
  && saloEditorialCardSource.includes("<Image");
const sitemapIncludesAreaRoutes = sitemapSource.includes("...saloAreaPaths");
const sitemapIncludesVillageIndex = sitemapSource.includes('"salo/kylat"');
const sitemapIncludesCategoryRoutes = sitemapSource.includes("...saloCategoryPaths")
  && sitemapSource.includes("getSaloAreaCategories(area");
const photoSourceLinkIsSafe = saloDirectorySource.includes(String.raw`provider.imageSource && /^https?:\/\//i.test(provider.imageSource)`);
const photoSourceLabelIsLocalized = [
  'photoSource: "Kuvan lähde"',
  'photoSource: "Fuente de la foto"',
  'photoSource: "Photo source"',
].every((label) => saloDirectorySource.includes(label));
if (providerIds.length !== 48 || providerBlocks.length !== providerIds.length || providerImageCount + missingImageProviderIds.length !== providerIds.length || providerCreditCount !== providerImageCount || unapprovedMissingImageIds.length || staleNoImageApprovals.length || imageWithoutCreditIds.length || unapprovedDuplicateAreaIds.length || invalidMultiLocationIds.length || missingAreaIds.length || unknownAreaIds.length || !areaPageHasCategoryLinks || !categoryRouteUsesDirectory || !areaRouteGeneratesAllSlugs || !saloLandingLinksToVillageIndex || !villageIndexUsesAreaGrid || !saloLandingDoesNotRenderVillageGrid || !areaCardsLinkToRoutes || !areaCardsIncludeImages || !sitemapIncludesAreaRoutes || !sitemapIncludesVillageIndex || !sitemapIncludesCategoryRoutes || !photoSourceLinkIsSafe || !photoSourceLabelIsLocalized || renderedAreas.length !== 8) {
  failed = true;
  console.error("Salo area directory check failed:", {
    providerCount: providerIds.length,
    providerImageCount,
    providerCreditCount,
    missingImageProviderIds,
    unapprovedMissingImageIds,
    staleNoImageApprovals,
    imageWithoutCreditIds,
    duplicateAreaIds,
    multiLocationProviderIds,
    unapprovedDuplicateAreaIds,
    invalidMultiLocationIds,
    missingAreaIds,
    unknownAreaIds,
    renderedAreas,
    areaPageHasCategoryLinks,
    categoryRouteUsesDirectory,
    areaRouteGeneratesAllSlugs,
    saloLandingLinksToVillageIndex,
    villageIndexUsesAreaGrid,
    saloLandingDoesNotRenderVillageGrid,
    areaCardsLinkToRoutes,
    areaCardsIncludeImages,
    sitemapIncludesAreaRoutes,
    sitemapIncludesVillageIndex,
    sitemapIncludesCategoryRoutes,
    photoSourceLinkIsSafe,
    photoSourceLabelIsLocalized,
  });
}

if (failed) process.exit(1);
console.log(`i18n/SEO/Salo checks passed: ${locales.join(", ")} have identical key sets, locale-aware document language, safe sitemap routes and complete village/category guides.`);
