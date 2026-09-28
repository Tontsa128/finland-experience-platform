"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";

const fallbackImage = "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1800";

function localized(values: Record<string, string>, locale: string, fallback: string) {
  return values[locale] || values.en || values.fi || fallback;
}

function localizedHref(value: string, locale: string, fallback: string) {
  if (!value) return `/${locale}${fallback}`;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return value.startsWith(`/${locale}/`) ? value : `/${locale}${value.startsWith("/") ? value : `/${value}`}`;
}

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const image = settings?.heroImageUrl || fallbackImage;
  const eyebrow = settings ? localized(settings.heroEyebrow, locale, t("eyebrow")) : t("eyebrow");
  const title = settings ? localized(settings.heroTitle, locale, t("title")) : t("title");
  const description = settings ? localized(settings.heroDescription, locale, t("description")) : t("description");
  const cta = settings ? localized(settings.heroCtaLabel, locale, t("cta")) : t("cta");
  const secondary = settings ? localized(settings.heroSecondaryLabel, locale, t("explore")) : t("explore");
  const ctaHref = localizedHref(settings?.heroCtaUrl || "", locale, "/accommodations");
  const secondaryHref = localizedHref(settings?.heroSecondaryUrl || "", locale, "/destinations");

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden sm:min-h-[620px]">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/60 to-transparent" />
      <div className="container-narrow relative z-10 w-full py-14 text-white sm:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-gold-400 sm:text-sm sm:tracking-[.2em]">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg">{description}</p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={ctaHref} className="btn-gold inline-flex w-full items-center justify-center gap-2 sm:w-auto">{cta}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={secondaryHref} className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-brand-900 sm:w-auto">{secondary}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
