function metaText(info, key) {
  return String(info.extmetadata?.[key]?.value ?? "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").trim();
}
export function isAllowedSlideLicense(info) {
  const value = (metaText(info, "LicenseShortName") + " " + metaText(info, "UsageTerms")).toLowerCase();
  return /cc0|public domain|cc by|cc-by|cc by-sa|cc-by-sa/i.test(value);
}
export function passesSlideImageFilters(info, brief) {
  if (!info || !["image/jpeg", "image/png", "image/webp"].includes(info.mime)) return false;
  if (Number(info.width) < 1600 || Number(info.width) / Math.max(1, Number(info.height)) < 1.4) return false;
  if (!isAllowedSlideLicense(info) || !info.thumburl) return false;
  const text = (String(info.title ?? "") + " " + metaText(info, "ImageDescription") + " " + metaText(info, "Categories")).toLowerCase();
  if (/\b(map|flag|coat of arms|logo|diagram|chart|kartta|lippu|vaakuna)\b/i.test(text)) return false;
  if (brief.season === "summer" && /\b(winter|snow|ice|lumi|jää|vinter|talvi)\b/i.test(text)) return false;
  if ((brief.avoid ?? []).some((word) => text.includes(word.toLowerCase()))) return false;
  const original = metaText(info, "DateTimeOriginal");
  if (brief.season === "summer" && original) {
    const month = Number(original.match(/^(?:\d{4})[:-](\d{2})/)?.[1] ?? 0);
    if (month >= 11 || (month > 0 && month <= 3)) return false;
  }
  return true;
}
