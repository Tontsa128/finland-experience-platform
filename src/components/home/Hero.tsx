"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";

type SlideCopy = { eyebrow: string; title: string; text: string; cta: string };
function normalizeHomepageHref(href: string): string {
  // Keep CMS and built-in homepage links on the canonical public routes.
  // External provider URLs must never be rewritten.
  const value = href.trim();
  const lower = value.toLowerCase();
  if (!value || lower.startsWith("http://") || lower.startsWith("https://") || value.startsWith("//")) return value;

  const suffixIndex = value.search(/[?#]/);
  const pathname = suffixIndex >= 0 ? value.slice(0, suffixIndex) : value;
  const suffix = suffixIndex >= 0 ? value.slice(suffixIndex) : "";
  const withoutLocale = pathname.replace(/^\/(fi|es|en)(?=\/|$)/, "") || "/";
  const path = withoutLocale.replace(/\/$/, "") || "/";

  if (path === "/salo" || path === "/salo/kylat") {
    return `/salo/kylat${suffix}`;
  }
  if (
    path === "/salo/mathildedal" ||
    path.startsWith("/salo/mathildedal/") ||
    path === "/mathildedal" ||
    path.startsWith("/mathildedal/")
  ) {
    return `/destinations/salo-mathildedal${suffix}`;
  }
  return `${path}${suffix}`;
}

type Slide = {
  key: string;
  image: string;
  durationMs?: number;
  credit: string;
  creditUrl?: string;
  href: string;
  external?: boolean;
  copy: SlideCopy;
};

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const cmsSlides = useMemo(() => (settings?.homepageSlides ?? [])
    .filter((item) => {
      const localized = item.copy?.[locale];
      const finnishCopy = item.copy?.fi;
      const hasLocalizedCopy =
        typeof localized?.title === "string" &&
        localized.title.trim().length > 0 &&
        typeof localized?.text === "string" &&
        localized.text.trim().length > 0;
      const normalize = (value?: string) =>
        (value ?? "").normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
      const sameAsFinnishTitle =
        Boolean(normalize(localized?.title)) &&
        normalize(localized?.title) === normalize(finnishCopy?.title);
      const sameAsFinnishText =
        Boolean(normalize(localized?.text)) &&
        normalize(localized?.text) === normalize(finnishCopy?.text);
      // A copied description is strong evidence that the CMS language fields are
      // misconfigured. For titles, only reject longer phrases: short place names
      // such as "Nauvo" can legitimately be identical across languages.
      const isUntranslatedCopy =
        locale !== "fi" &&
        hasLocalizedCopy &&
        (sameAsFinnishText || (sameAsFinnishTitle && normalize(localized?.title).split(" ").length >= 3));
      return (
        item.enabled !== false &&
        typeof item.imageUrl === "string" &&
        item.imageUrl.trim().length > 0 &&
        hasLocalizedCopy &&
        !isUntranslatedCopy
      );
    })
    .sort((a, b) => a.sortOrder - b.sortOrder), [settings?.homepageSlides, locale]);

  const activeSlides = useMemo<Slide[]>(
    () => {
      // CMS slide image and localized copy are one inseparable pair.
      // If an image fails, skip that slide; never substitute a different photo.
      const usableCmsSlides = cmsSlides.filter((item) => !failedImages[item.id]);
      if (usableCmsSlides.length) {
        return usableCmsSlides.map((item) => ({
          key: item.id,
          image: item.imageUrl,
          durationMs: Number.isFinite(item.durationMs) && (item.durationMs ?? 0) >= 5000 ? item.durationMs : 5500,
          credit: item.credit || "",
          creditUrl: item.creditUrl,
          href: normalizeHomepageHref(item.href || "/destinations"),
          external: item.external ?? (String(item.href || "").startsWith("https://") || String(item.href || "").startsWith("http://")),
          copy: item.copy[locale],
        }));
      }

      // Do not fall back to unrelated stock/Commons slides. The configured
      // homepage image and its localized copy are a single CMS-managed pair.
      // If no matching hero image is configured, render no image carousel.
      const configuredImage = settings?.heroImageUrl?.trim();
      if (!configuredImage || failedImages["configured-homepage"]) return [];

      return [{
        key: "configured-homepage",
        image: configuredImage,
        durationMs: 5500,
        credit: "",
        href: normalizeHomepageHref(settings?.heroCtaUrl || "/destinations"),
        copy: {
          eyebrow: settings?.heroEyebrow?.[locale] || "",
          title: settings?.heroTitle?.[locale] || "",
          text: settings?.heroDescription?.[locale] || "",
          cta: settings?.heroCtaLabel?.[locale] || "",
        },
      }];
    },
    [cmsSlides, locale, failedImages, settings?.heroImageUrl, settings?.heroCtaUrl, settings?.heroEyebrow, settings?.heroTitle, settings?.heroDescription, settings?.heroCtaLabel],
  );

  const slideCount = activeSlides.length;

  useEffect(() => {
    setActive((current) => (slideCount ? current % slideCount : 0));
  }, [slideCount]);

  useEffect(() => {
    if (slideCount < 2) return;
    const duration = activeSlides[active]?.durationMs ?? 5500;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slideCount);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [active, activeSlides, slideCount]);

  if (!slideCount) {
    return (
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#173d35] via-[#24594b] to-[#b18a55] text-white">
        <div className="container-narrow flex min-h-[300px] items-end py-10 sm:min-h-[360px] sm:py-14">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#fff3d8]">FINLAND EXPERIENCE</p>
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.1rem,7vw,4.6rem)] font-bold leading-[1.02] tracking-[-.035em]">
              {locale === "fi" ? "Löydä Suomen salaiset helmet" : locale === "es" ? "Descubre los tesoros ocultos de Finlandia" : "Discover Finland’s hidden gems"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">
              {locale === "fi" ? "Paikkoja, elämyksiä ja tarinoita, jotka tekevät Suomesta unohtumattoman." : locale === "es" ? "Lugares, experiencias e historias para descubrir una Finlandia inolvidable." : "Places, experiences and stories that make Finland unforgettable."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const slide = activeSlides[active] ?? activeSlides[0];
  const text = slide.copy;
  const href = slide.external ? slide.href : `/${locale}${slide.href}`;

  // Keep the displayed photo bound to its own CMS slide record.
  // Failed images are removed from activeSlides; no fallback photo is substituted.
  const getImage = (item: Slide) => item.image;

  const markImageFailed = (key: string) => {
    setFailedImages((current) => (current[key] ? current : { ...current, [key]: true }));
  };

  const ui = {
    fi: { previous: "Edellinen dia", next: "Seuraava dia", goToSlide: (n: number) => `Siirry diaan ${n}`, imageCredit: "Kuva:" },
    es: { previous: "Diapositiva anterior", next: "Diapositiva siguiente", goToSlide: (n: number) => `Ir a la diapositiva ${n}`, imageCredit: "Foto:" },
    en: { previous: "Previous slide", next: "Next slide", goToSlide: (n: number) => `Go to slide ${n}`, imageCredit: "Photo:" },
  }[locale];

  return (
    <section className="relative isolate z-0 overflow-hidden bg-[#dfe8df] text-white">
      <div className="absolute inset-0">
        {activeSlides.map((item, index) => (
          <div
            key={item.key}
            className={`absolute inset-0 bg-brand-950 transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={index !== active}
          >
            <Image
              src={getImage(item)}
              alt={item.copy.title}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={100}
              unoptimized
              onError={() => markImageFailed(item.key)}
              className="object-cover object-[50%_60%] brightness-[1.08] contrast-[1.02] saturate-[1.08]"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17261a]/82 via-[#17261a]/42 to-[#17261a]/12" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#17261a]/48 via-[#17261a]/18 to-transparent" />

      <div className="relative z-10 flex min-h-[390px] items-end pb-7 pt-28 sm:min-h-[450px] sm:pb-9 sm:pt-28 lg:min-h-[500px] lg:pb-12 lg:pt-28">
        <div className="container-narrow w-full">
          <div key={slide.key} className="max-w-4xl">
            <h1 className="max-w-4xl font-display text-[clamp(2.1rem,7vw,4.6rem)] font-bold leading-[1.02] tracking-[-.035em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">{locale === "fi" ? "Löydä Suomen salaiset helmet" : locale === "es" ? "Descubre los tesoros ocultos de Finlandia" : "Discover Finland’s hidden gems"}</h1>
            <p className="mb-2 mt-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#fff3d8] drop-shadow-sm sm:mb-4 sm:text-xs sm:tracking-[.24em]">{text.eyebrow}</p>
            <h2 className="max-w-3xl font-display text-xl font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-2xl lg:text-3xl">{text.title}</h2>
            <p className="mt-2 max-w-[48ch] text-sm leading-6 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:mt-3 sm:max-w-2xl sm:text-base sm:leading-7 lg:text-lg lg:leading-8">{text.text}</p>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/15 bg-[#fbf8f1] text-brand-950 shadow-[0_-10px_30px_rgba(47,65,49,0.10)]">
        <div className="container-narrow flex min-h-[76px] flex-row items-center justify-between gap-2 py-3 sm:min-h-[104px] sm:gap-4 sm:py-5">
          {href ? (
            slide.external ? (
              <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 min-w-0 max-w-[min(68%,18rem)] items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-brand-900 px-3 py-3 text-xs font-bold text-white transition hover:bg-brand-800 sm:max-w-none sm:px-7 sm:text-base">
                {text.cta}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link href={href} className="inline-flex min-h-11 min-w-0 max-w-[min(68%,18rem)] items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-gold-400 px-3 py-3 text-xs font-bold text-brand-950 transition hover:bg-gold-300 sm:max-w-none sm:px-7 sm:text-base">
                {text.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          ) : null}

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
            <button type="button" aria-label={ui.previous} onClick={() => setActive((current) => (current - 1 + slideCount) % slideCount)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9e2d7] bg-white transition hover:bg-[#edf3ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex max-w-[120px] items-center justify-center gap-1 overflow-hidden sm:max-w-none sm:gap-2">
              {activeSlides.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={ui.goToSlide(index + 1)}
                  aria-current={index === active ? "true" : undefined}
                  onClick={() => setActive(index)}
                  className={`h-2 min-w-2 rounded-full transition-all sm:h-2.5 sm:min-w-2.5 ${index === active ? "w-5 bg-brand-700 sm:w-8" : "w-2 bg-[#d6dfd4] hover:bg-brand-300 sm:w-2.5"}`}
                />
              ))}
            </div>
            
            <button type="button" aria-label={ui.next} onClick={() => setActive((current) => (current + 1) % slideCount)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {slide.credit ? (
        <div className="relative z-20 flex justify-end border-t border-[#e9e4d8] bg-[#fbf8f1] px-4 py-2 text-[10px] leading-4 text-slate-600 sm:px-6">
          <span className="max-w-full text-right">
            {slide.creditUrl ? (
              <a href={slide.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-slate-400 underline-offset-2 hover:text-brand-900">{ui.imageCredit} {slide.credit}</a>
            ) : (
              <>{ui.imageCredit} {slide.credit}</>
            )}
          </span>
        </div>
      ) : null}
    </section>
  );
}
