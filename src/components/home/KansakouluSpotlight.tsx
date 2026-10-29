"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Locale } from "@/types";

const slides = [
  {
    image: "https://www.kansakouluun.fi/wp-content/uploads/2017/05/ravintola.jpg",
    alt: { fi: "Kansakoulun ravintola ja vanhan koulurakennuksen tunnelma", en: "The restaurant and atmosphere of the historic schoolhouse", es: "El restaurante y el ambiente de la antigua escuela" },
    title: { fi: "Makuja ja tarinoita vanhassa kansakoulussa", en: "Flavours and stories in a historic schoolhouse", es: "Sabores e historias en una antigua escuela" },
    text: { fi: "Poikkea syömään, viivy pidempään ja löydä pala paikallista saaristoelämää Västanfjärdissä.", en: "Come for a meal, stay a little longer and discover local archipelago life in Västanfjärd.", es: "Ven a comer, quédate un poco más y descubre la vida local del archipiélago en Västanfjärd." }
  },
  {
    image: "https://www.kansakouluun.fi/wp-content/uploads/2017/05/lahiruoka.jpg",
    alt: { fi: "Kansakoulun lähiruokatuotteita ja paikallisia makuja", en: "Local food products and flavours at Kansakoulu", es: "Productos locales y sabores de Kansakoulu" },
    title: { fi: "Saariston maut lähelle", en: "Local flavours from the archipelago", es: "Sabores locales del archipiélago" },
    text: { fi: "Tutustu lähialueen tuottajien raaka-aineisiin ja tuliaisiin. Ravintolan keittiö hyödyntää Kemiönsaaren lähiruokaa.", en: "Discover ingredients and treats from nearby producers. The restaurant kitchen uses local products from Kemiönsaari.", es: "Descubre ingredientes y productos de productores cercanos. La cocina utiliza productos locales de Kemiönsaari." }
  }
] as const;

const copy = {
  fi: { eyebrow: "Kemiönsaaren persoonallinen löytö", badge: "Majatalo · Ravintola · Lähiruoka", cta: "Tutustu Kansakouluun", direct: "Kohteen omat sivut", previous: "Edellinen kuva", next: "Seuraava kuva", pause: "Pysäytä automaattinen vaihto", play: "Jatka automaattista vaihtoa", credit: "Kuvat: Kansakoulu" },
  en: { eyebrow: "A distinctive find on Kimitoön", badge: "Guesthouse · Restaurant · Local food", cta: "Discover Kansakoulu", direct: "Official website", previous: "Previous image", next: "Next image", pause: "Pause automatic rotation", play: "Resume automatic rotation", credit: "Images: Kansakoulu" },
  es: { eyebrow: "Un lugar especial en Kimitoön", badge: "Alojamiento · Restaurante · Productos locales", cta: "Descubre Kansakoulu", direct: "Web oficial", previous: "Imagen anterior", next: "Imagen siguiente", pause: "Pausar el cambio automático", play: "Reanudar el cambio automático", credit: "Imágenes: Kansakoulu" }
};

export function KansakouluSpotlight({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = copy[locale];
  const slide = slides[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);

  return (
    <section aria-labelledby="kansakoulu-spotlight-title" className="bg-stone-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="mb-7 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-700">{t.eyebrow}</p>
          <h2 id="kansakoulu-spotlight-title" className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-5xl">
            {locale === "fi" ? "Yövy, herkuttele ja koe saariston lämmin tunnelma" : locale === "es" ? "Alójate, disfruta de la gastronomía y siente el archipiélago" : "Stay, savour and experience the warmth of the archipelago"}
          </h2>
        </div>
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative min-h-[300px] bg-brand-950 sm:min-h-[440px]">
            <Image src={slide.image} alt={slide.alt[locale]} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 text-xs font-medium text-white/90">{t.credit} · <a href="https://www.kansakouluun.fi/" target="_blank" rel="noreferrer" className="underline underline-offset-4">kansakouluun.fi</a></div>
            <button type="button" aria-label={t.previous} onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" aria-label={t.next} onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55"><ChevronRight className="h-5 w-5" /></button>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">{t.badge}</p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-950 sm:text-4xl">{slide.title[locale]}</h3>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{slide.text[locale]}</p>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              {locale === "fi" ? "Vanha kansakoulu on saanut uuden elämän persoonallisena majoitus- ja ravintolakohteena. Tarkista palvelut, aukiolo ja varausmahdollisuudet suoraan kohteelta." : locale === "es" ? "La antigua escuela ha renacido como un alojamiento y restaurante con personalidad. Consulta directamente los servicios, horarios y reservas." : "The former school has found a new life as a characterful guesthouse and restaurant. Check services, opening times and booking options directly with the venue."}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href={"/" + locale + "/destinations/kemionsaari/ruoka"} className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-800">{t.cta}<ArrowRight className="h-4 w-4" /></Link>
              <a href="https://www.kansakouluun.fi/" target="_blank" rel="noreferrer" className="text-sm font-bold text-brand-900 underline underline-offset-4">{t.direct} ↗</a>
            </div>
            <div className="mt-7 flex items-center justify-between gap-3">
              <div className="flex gap-2" aria-label={locale === "fi" ? "Kuvavalinta" : locale === "es" ? "Selección de imágenes" : "Image selection"}>
                {slides.map((item, index) => <button key={item.image} type="button" aria-label={item.title[locale]} aria-current={active === index} onClick={() => setActive(index)} className={"h-1.5 rounded-full transition-all " + (active === index ? "w-9 bg-brand-950" : "w-5 bg-slate-300")} />)}
              </div>
              <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? t.play : t.pause} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-brand-950 hover:bg-stone-50">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
