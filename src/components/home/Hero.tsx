"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Play } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";

const fallbackImage = "https://images.unsplash.com/photo-1742639008187-0294cf3fdf93?auto=format&fit=crop&fm=jpg&q=88&w=2400";

function localized(values: Record<string, string>, locale: string, fallback: string) {
  return values[locale] || values.en || values.fi || fallback;
}

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const image = fallbackImage;
  const title = t("title");
  const description = t("description");

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-end overflow-hidden bg-brand-950 text-white sm:min-h-[760px]">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute bottom-4 right-4 rounded-full bg-black/35 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur-sm">Photo: Tomi Blasic / Unsplash</div>

      <div className="container-narrow relative z-10 w-full pb-16 pt-28 sm:pb-24 lg:pb-28">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{t("eyebrow")}</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[.98] sm:text-7xl lg:text-[5.8rem]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-2xl sm:leading-9">{description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${locale}/destinations`} className="btn-gold px-7 py-4">
              {t("cta")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#find-your-finland" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-black/15 px-7 py-4 text-sm font-bold backdrop-blur-md hover:bg-white hover:text-brand-950">
              <Play className="h-4 w-4" /> {t("explore")}
            </Link>
          </div>

          <p className="mt-6 max-w-xl text-sm font-medium text-white/65">{t("microcopy")}</p>
        </div>
      </div>
    </section>
  );
}
