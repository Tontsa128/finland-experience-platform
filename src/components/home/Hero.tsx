"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ChevronDown, Sun, Waves, Bike, Flame } from "lucide-react";
import type { HomepageSettings } from "@/lib/public-content";
import { IMG } from "@/lib/images";
import { tr } from "@/lib/l";

function localized(values: Record<string, string>, locale: string, fallback: string) {
  return values[locale] || values.en || values.fi || fallback;
}

export function Hero({ settings }: { settings?: HomepageSettings | null }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const eyebrow = settings ? localized(settings.heroEyebrow, locale, t("eyebrow")) : t("eyebrow");
  const title = settings ? localized(settings.heroTitle, locale, t("title")) : t("title");
  const description = settings ? localized(settings.heroDescription, locale, t("description")) : t("description");

  const chips = [
    { icon: Waves, href: `/${locale}/destinations/naantali`, label: { fi: "Naantali", en: "Naantali", es: "Naantali" } },
    { icon: Bike, href: `/${locale}/destinations/aland`, label: { fi: "Ahvenanmaa", en: "Åland", es: "Åland" } },
    { icon: Flame, href: `/${locale}/experiences`, label: { fi: "Savusauna & uinti", en: "Smoke sauna & swim", es: "Sauna y baño" } },
    { icon: Sun, href: `/${locale}/accommodations`, label: { fi: "Mökit & huvilat", en: "Cottages & villas", es: "Cabañas y villas" } },
  ];

  const fade = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden sm:min-h-[680px]">
      {/* slow cinematic zoom on the photo */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <Image src={IMG.hero} alt={title} fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* warm golden-hour grade + readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,190,90,.35),transparent_55%)] mix-blend-soft-light" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="container-narrow relative z-10 w-full py-14 text-white sm:py-28">
        <div className="max-w-3xl">
          <motion.p
            {...fade(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-white/95 backdrop-blur-md sm:text-sm"
          >
            <Sun className="h-4 w-4 text-gold-400" /> {eyebrow}
          </motion.p>

          <motion.h1 {...fade(1)} className="font-display text-4xl font-bold leading-[1.05] drop-shadow-lg sm:text-6xl lg:text-7xl">
            {title}
          </motion.h1>

          <motion.p {...fade(2)} className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-xl sm:leading-8">
            {description}
          </motion.p>

          <motion.div {...fade(3)} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={`/${locale}/destinations`}
              className="btn-gold group inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base shadow-[0_10px_40px_-8px_rgba(245,183,72,.8)] transition hover:scale-[1.03] sm:w-auto"
            >
              {t("cta")}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/accommodations`}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/50 bg-white/10 px-7 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white hover:text-brand-900 sm:w-auto"
            >
              {t("explore")}
            </Link>
          </motion.div>

          {/* quick-pick chips: shortest path from landing to a booking decision */}
          <motion.div {...fade(4)} className="mt-8 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md ring-1 ring-white/25 transition hover:bg-white/30"
              >
                <Icon className="h-4 w-4 text-gold-400" />
                {tr(locale, label)}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/80 sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.div>

      <div className="absolute bottom-4 right-4 rounded-full bg-black/35 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur-sm">
        Photo: Tomi Blasic / Unsplash
      </div>
    </section>
  );
}
