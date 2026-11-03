import { photoCredits, photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";
import type { Locale } from "@/types";
import { SaloEditorialCard } from "@/components/salo/SaloEditorialCard";

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
    open: locale === "fi" ? "Tutustu alueeseen" : locale === "es" ? "Explorar la zona" : "Explore the area",
  };

  return (
    <section id="salo-areas" className="bg-brand-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="mb-9 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{labels.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{labels.title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{labels.description}</p>
        </div>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areaSlugs.map((area) => {
            const title = areaNames[area][locale];
            const image = getAreaImage(area);
            return (
              <SaloEditorialCard
                key={area}
                href={`/${locale}/salo/${area}`}
                image={image?.src}
                imageAlt={title}
                eyebrow={areaCopy[area][locale].eyebrow}
                title={title}
                description={areaCopy[area][locale].intro}
                actionLabel={labels.open}
                imageCredit={image ? `Kuvan lähde: ${image.credit}` : undefined}
                imageSource={image?.source}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
