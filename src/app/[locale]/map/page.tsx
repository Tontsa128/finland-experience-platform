import type { Metadata } from "next";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import FinlandExperienceMap from "@/components/map/FinlandExperienceMap";

const copy: Record<Locale, { eyebrow: string; title: string; intro: string; region: string; context: string; locations: string[] }> = {
  fi: { eyebrow: "Löydä oikea paikka", title: "Missä päin Suomea haluat vierailla?", intro: "Aloita Lounais-Suomesta. Kartta auttaa hahmottamaan, missä Salo, Perniö, Mathildedal ja Teijon kansallispuisto sijaitsevat suhteessa Turkuun ja Helsinkiin.", region: "Aloitamme Lounais-Suomesta", context: "Turku ja Helsinki ovat kartalla vertailukohtia. Kartan pisteet näyttävät alueiden sijainnin, eivät reittiohjeita tai tarkkoja ajoaikoja.", locations: ["Salo", "Perniö", "Mathildedal", "Teijon kansallispuisto"] },
  es: { eyebrow: "Encuentra tu lugar", title: "¿En qué parte de Finlandia quieres viajar?", intro: "Empieza por el suroeste de Finlandia. El mapa te ayuda a situar Salo, Perniö, Mathildedal y el Parque Nacional de Teijo en relación con Turku y Helsinki.", region: "Empezamos en el suroeste de Finlandia", context: "Turku y Helsinki sirven como puntos de referencia. Los marcadores muestran ubicaciones, no rutas ni tiempos exactos de viaje.", locations: ["Salo", "Perniö", "Mathildedal", "Parque Nacional de Teijo"] },
  en: { eyebrow: "Find your place", title: "Where in Finland would you like to explore?", intro: "Start in Southwest Finland. The map helps you locate Salo, Perniö, Mathildedal and Teijo National Park in relation to Turku and Helsinki.", region: "Starting in Southwest Finland", context: "Turku and Helsinki are shown as reference points. Map pins show locations, not routes or exact journey times.", locations: ["Salo", "Perniö", "Mathildedal", "Teijo National Park"] },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "fi") as Locale;
  const meta = {
    fi: { title: "Suomen matkailukartta | Finland Experience", description: "Löydä Salo, Perniö, Mathildedal ja Teijon kansallispuisto Suomen kartalta." },
    es: { title: "Mapa turístico de Finlandia | Finland Experience", description: "Encuentra Salo, Perniö, Mathildedal y el Parque Nacional de Teijo en el mapa de Finlandia." },
    en: { title: "Finland travel map | Finland Experience", description: "Find Salo, Perniö, Mathildedal and Teijo National Park on the map of Finland." },
  }[locale];
  return buildLocalizedMetadata({ locale, title: meta.title, description: meta.description, path: "map" });
}

export default async function MapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "fi") as Locale;
  const text = copy[locale];
  return (
    <div className="bg-white">
      <section className="bg-brand-950 text-white"><div className="container-narrow py-14 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{text.eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-6xl">{text.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{text.intro}</p>
      </div></section>
      <section className="container-narrow py-10 sm:py-16">
        <FinlandExperienceMap locale={locale} />
        <div className="mt-7 grid gap-6 rounded-3xl bg-brand-50 p-6 sm:grid-cols-[1fr_1fr] sm:p-8">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">{text.region}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold text-brand-950">{text.locations.map((location) => <li key={location} className="rounded-xl bg-white px-3 py-3">{location}</li>)}</ul>
          </div>
          <p className="self-end text-sm leading-6 text-slate-600">{text.context}</p>
        </div>
      </section>
    </div>
  );
}
