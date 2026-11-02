import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types";
import { photoCredits, photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";

const areaSlugs = Object.keys(areaProviderIds) as SaloArea[];

const areaNames: Record<SaloArea, Record<Locale, string>> = {
  mathildedal: { fi: "Mathildedal", en: "Mathildedal", es: "Mathildedal" },
  teijo: { fi: "Teijo", en: "Teijo", es: "Teijo" },
  sarkisalo: { fi: "Särkisalo & Förby", en: "Särkisalo & Förby", es: "Särkisalo y Förby" },
  pernio: { fi: "Perniö", en: "Perniö", es: "Perniö" },
  halikko: { fi: "Halikko", en: "Halikko", es: "Halikko" },
  vaskio: { fi: "Vaskio", en: "Vaskio", es: "Vaskio" },
  suomusjarvi: { fi: "Suomusjärvi", en: "Suomusjärvi", es: "Suomusjärvi" },
  salo: { fi: "Salo & lähialueet", en: "Salo & nearby areas", es: "Salo y alrededores" },
};

function getAreaImage(area: SaloArea) {
  const providerImageIds: Partial<Record<SaloArea, string>> = {
    pernio: "leipyolin-tila",
    halikko: "topilan-tupa",
    vaskio: "onnenperan-mokki",
    suomusjarvi: "villa-frans",
  };
  const provider = providerImageIds[area]
    ? saloProviders.find((item) => item.id === providerImageIds[area])
    : undefined;
  if (provider?.image) {
    return {
      src: provider.image,
      credit: provider.imageCredit || provider.name,
      source: provider.imageSource || provider.url,
    };
  }

  const src = area === "mathildedal"
    ? photoLibrary.mathildedalHarbour
    : area === "teijo"
      ? photoLibrary.teijoNationalPark
      : area === "sarkisalo"
        ? photoLibrary.sarkisalo
        : photoLibrary.saloVeturitalli;
  const attribution = photoCredits.find((photo) => photo.url === src);
  return attribution
    ? { src, credit: `${attribution.credit} · ${attribution.license}`, source: attribution.sourcePage }
    : null;
}

export function SaloAreaGrid({ locale }: { locale: Locale }) {
  const labels = {
    eyebrow: locale === "fi" ? "Salon kylät ja alueet" : locale === "es" ? "Pueblos y zonas de Salo" : "Salo villages and areas",
    title: locale === "fi" ? "Valitse kylä, johon haluat tutustua" : locale === "es" ? "Elige el pueblo que quieres descubrir" : "Choose a village to explore",
    description: locale === "fi"
      ? "Avaa kylän oma esittely ja löydä sen majoitus, ruoka, luonto ja paikalliset elämykset."
      : locale === "es"
        ? "Abre la guía del pueblo para descubrir alojamiento, gastronomía, naturaleza y experiencias locales."
        : "Open a village guide to find its accommodation, food, nature and local experiences.",
    open: locale === "fi" ? "Tutustu kylään" : locale === "es" ? "Explorar el pueblo" : "Explore village",
    photo: locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la foto" : "Photo source",
  };

  return (
    <section id="salo-areas" className="bg-brand-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{labels.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{labels.title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{labels.description}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaSlugs.map((area) => {
            const title = areaNames[area][locale];
            const image = getAreaImage(area);
            return (
              <article key={area} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <Link href={`/${locale}/salo/${area}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                    {image ? (
                      <>
                        <Image src={image.src} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent" />
                      </>
                    ) : null}
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-2xl font-bold text-brand-950 group-hover:text-brand-700">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{areaCopy[area][locale].intro}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-brand-700">
                      {labels.open}<ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
                {image?.source ? (
                  <div className="px-5 pb-4 sm:px-6">
                    <a href={image.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-slate-400 underline underline-offset-2 hover:text-brand-700">
                      {labels.photo}: {image.credit}<ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
