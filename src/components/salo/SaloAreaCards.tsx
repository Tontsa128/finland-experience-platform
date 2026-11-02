import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import { saloProviders } from "@/lib/salo";
import { photoCredits, photoLibrary } from "@/lib/photo-library";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";

const cardOrder: SaloArea[] = ["salo", "mathildedal", "teijo", "mutainen", "kirjakkala", "sarkisalo", "pernio", "halikko", "vaskio", "suomusjarvi", "kisko", "kuusjoki", "kiikala", "pertteli", "muurla", "marynummi", "hajala", "angelniemi"];
const providerImageIds: Partial<Record<SaloArea, string>> = {
  pernio: "leipyolin-tila",
  halikko: "topilan-tupa",
  vaskio: "onnenperan-mokki",
  suomusjarvi: "villa-frans",
  marynummi: "marynummi-uimaranta",
};

function getAreaPhoto(area: SaloArea) {
  const providerId = providerImageIds[area];
  if (providerId) {
    const provider = saloProviders.find((item) => item.id === providerId);
    if (provider?.image) return { src: provider.image, credit: provider.imageCredit || provider.name, source: provider.imageSource || provider.url };
  }
  const src = area === "mathildedal" ? photoLibrary.mathildedalVillage
    : area === "teijo" ? photoLibrary.teijoNationalPark
    : area === "sarkisalo" ? photoLibrary.sarkisalo
    : area === "kisko" ? photoLibrary.kiskoChurch
    : area === "kuusjoki" ? photoLibrary.kuusjokiHistoricChurch
    : area === "pertteli" ? photoLibrary.pertteliChurch
    : area === "muurla" ? photoLibrary.muurlaChurch
    : area === "kiikala" ? photoLibrary.kiikalaLammenjarvi
    : area === "hajala" ? photoLibrary.hajalaVillage
    : area === "angelniemi" ? photoLibrary.angelniemiChurch
    : area === "kirjakkala" ? photoLibrary.kirjakkalaVillage
    : area === "salo" ? photoLibrary.saloVeturitalli
    : null;
  if (!src) return null;
  const attribution = photoCredits.find((photo) => photo.url === src);
  return { src, credit: attribution ? `${attribution.credit} · ${attribution.license}` : "Visit Salo", source: attribution?.sourcePage || "https://visitsalo.fi/" };
}

export function SaloAreaCards({ locale }: { locale: Locale }) {
  return (
    <section id="salo-areas" className="container-narrow py-16 sm:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Tutustu alueittain" : locale === "es" ? "Explora por zonas" : "Explore by area"}</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Salon seudun kylät ja matkailualueet" : locale === "es" ? "Pueblos y destinos de la región de Salo" : "Villages and destinations across the Salo region"}</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">{locale === "fi" ? "Valitse alue tutustuaksesi sen tarinaan, paikallisiin palveluihin ja matkailukohteisiin. Jokainen alue on jaettu omiin palvelukategorioihinsa." : locale === "es" ? "Elige una zona para descubrir su historia, servicios locales y lugares de interés. Cada zona organiza sus servicios en categorías propias." : "Choose an area to discover its story, local services and places to visit. Every area organises its services into its own categories."}</p>
      </div>
      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cardOrder.map((area) => {
          const copy = areaCopy[area][locale];
          const photo = getAreaPhoto(area);
          return (
            <article key={area} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
              <Link href={`/${locale}/salo/${area}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-100">
                  {photo ? <Image src={photo.src} alt={copy.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-brand-950 px-6 text-center text-gold-300"><span className="font-display text-2xl font-bold">{copy.eyebrow}</span></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-950">{areaProviderIds[area].length > 0 ? `${areaProviderIds[area].length} ${locale === "fi" ? "palvelukohdetta" : locale === "es" ? "proveedores" : "local listings"}` : locale === "fi" ? "Palveluja lisätään" : locale === "es" ? "Servicios en preparación" : "Listings in progress"}</span>
                </div>
                <div className="p-6 pb-3">
                  <h3 className="font-display text-2xl font-bold text-brand-950">{copy.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{copy.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa alueopas" : locale === "es" ? "Abrir guía de la zona" : "Open area guide"}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
              <p className="px-6 pb-5 text-[11px] text-slate-400">
                {photo ? <>{locale === "fi" ? "Kuvan lähde:" : locale === "es" ? "Fuente de imagen:" : "Image source:"}{" "}
                <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-800">{photo.credit}</a></> : null}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
