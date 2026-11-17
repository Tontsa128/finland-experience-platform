export type HomepageSlideLocale = "fi" | "es" | "en";

export type HomepageSlideValidationInput = {
  enabled?: boolean;
  imageUrl?: string;
  imageReviewed?: boolean;
  href?: string;
  creditUrl?: string;
  copy?: Partial<Record<HomepageSlideLocale, { title?: string; text?: string; cta?: string }>>;
};

function isHttpsImageUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function isSafeSlideLink(value: string): boolean {
  const candidate = value.trim();
  if (candidate.startsWith("/") && !candidate.startsWith("//")) return true;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function getHomepageSlideValidationErrors(slide: HomepageSlideValidationInput): string[] {
  if (slide.enabled === false) return [];

  const errors: string[] = [];
  if (!isHttpsImageUrl(slide.imageUrl || "")) errors.push("image_https");
  if (slide.imageReviewed !== true) errors.push("image_review");
  if (!isSafeSlideLink(slide.href || "")) errors.push("href");
  if (slide.creditUrl?.trim() && !isSafeSlideLink(slide.creditUrl)) errors.push("credit_url");

  for (const locale of ["fi", "es", "en"] as const) {
    const copy = slide.copy?.[locale];
    if (!copy?.title?.trim() || !copy?.text?.trim() || !copy?.cta?.trim()) {
      errors.push(`copy_${locale}`);
    }
  }

  return errors;
}

export function firstInvalidHomepageSlideIndex(slides: HomepageSlideValidationInput[]): number {
  return slides.findIndex((slide) => getHomepageSlideValidationErrors(slide).length > 0);
}
