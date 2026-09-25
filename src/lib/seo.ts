import type { Metadata } from "next";
import type { Locale } from "@/types";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.finlandexperience.com").replace(/\/$/, "");

const ogLocales: Record<Locale, string> = { fi: "fi_FI", es: "es_ES", en: "en_GB" };

export function localizedUrl(locale: Locale, path = "") {
  const clean = path.replace(/^\//, "");
  return siteUrl + "/" + locale + (clean ? "/" + clean : "");
}

export function buildLocalizedMetadata(input: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const { locale, title, description, path = "", image, noindex = false } = input;
  const canonical = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fi: localizedUrl("fi", path),
        es: localizedUrl("es", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Finland Experience",
      locale: ogLocales[locale],
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
