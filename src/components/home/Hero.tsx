"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";

const fallbackImage = "https://images.unsplash.com/photo-1742639008187-0294cf3fdf93?auto=format&fit=crop&fm=jpg&q=82&w=2400";

function localized(values: Record<string, string>, locale: string, fallback: string) {
  return values[locale] || values.en || values.fi || fallback;
}

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  // Keep the first screen visually curated: use a real Finnish lake/cottage photo rather than an arbitrary CMS image.
  const image = fallbackImage;
  const eyebrow = settings ? localized(settings.heroEyebrow, locale, t("eyebrow")) : t("eyebrow");
  const title = settings ? localized(settings.heroTitle, locale, t("title")) : t("title");
  const description = settings ? localized(settings.heroDescription, locale, t("description")) : t("description");
  const cta = t("cta");
  const secondary = t("explore");
  const ctaHref = `/${locale}/destinations`;
  const secondaryHref = `/${locale}/accommodations`;

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden sm:min-h-[620px]">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
      <div className="absolute bottom-4 right-4 rounded-full bg-black/35 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur-sm">Photo: Tomi Blasic / Unsplash</div>
      <div className="container-narrow relative z-10 w-full py-14 text-white sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-white/90 backdrop-blur-md sm:text-sm">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:mt-6 sm:text-xl sm:leading-8">{description}</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            <Link href={ctaHref} className="btn-gold inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-sm sm:w-auto">{cta}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={secondaryHref} className="inline-flex w-full items-center justify-center rounded-full border border-white/50 bg-black/15 px-6 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white hover:text-brand-900 sm:w-auto">{secondary}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
