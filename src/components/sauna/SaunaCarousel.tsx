"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "fi" | "es" | "en";

type SaunaSlide = {
  image: string;
  title: Record<Locale, string>;
  text: Record<Locale, string>;
  credit: string;
  source: string;
};

type Props = {
  items: SaunaSlide[];
  locale: Locale;
  imageLabel: string;
};

export function SaunaCarousel({ items, locale, imageLabel }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  useEffect(() => {
    if (active >= items.length) setActive(0);
  }, [active, items.length]);

  if (!items.length) return null;

  const item = items[active];
  const go = (direction: 1 | -1) => {
    setActive((current) => (current + direction + items.length) % items.length);
  };

  return (
    <div className="mt-10">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-brand-950 shadow-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[4/3] min-h-[380px] sm:aspect-[16/8] sm:min-h-0 lg:aspect-[16/7]">
          <Image
            key={item.image}
            src={item.image}
            alt={item.title[locale]}
            fill
            priority={active === 0}
            sizes="(max-width: 640px) 100vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-white/80 backdrop-blur-sm sm:left-7 sm:top-7">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-9 lg:p-12">
            <div className="max-w-3xl">
              <p className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {item.title[locale]}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                {item.text[locale]}
              </p>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[.14em] text-white/55">
                {imageLabel}: {item.credit}
              </p>
            </div>
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label={locale === "fi" ? "Edellinen kuva" : locale === "es" ? "Imagen anterior" : "Previous image"}
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={locale === "fi" ? "Seuraava kuva" : locale === "es" ? "Siguiente imagen" : "Next image"}
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pb-1" aria-label={locale === "fi" ? "Kuvavalinta" : locale === "es" ? "Selección de imágenes" : "Image selection"}>
            {items.map((slide, index) => (
              <button
                key={slide.source}
                type="button"
                aria-label={`${index + 1}: ${slide.title[locale]}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={`relative h-1.5 shrink-0 rounded-full transition-all ${index === active ? "w-10 bg-brand-950" : "w-5 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={paused ? (locale === "fi" ? "Jatka automaattista vaihtoa" : locale === "es" ? "Reanudar cambio automático" : "Resume automatic rotation") : (locale === "fi" ? "Pysäytä automaattinen vaihto" : locale === "es" ? "Pausar cambio automático" : "Pause automatic rotation")}
            onClick={() => setPaused((value) => !value)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-950 shadow-sm transition hover:bg-brand-50"
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
