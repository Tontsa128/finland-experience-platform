import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BedDouble, Coffee, Compass, Heart, Landmark, ShoppingBag } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  fi: {
    title: "Suunnittele Mathildedalin päivä tai viikonloppu",
    description: "Löydä Mathildedalista majoitus, ruoka, luonto, elämykset, kulttuuri ja ostokset ja rakenna oma vierailusi.",
    eyebrow: "MATHILDEDAL · SALO",
    heading: "Yksi kylä. Monta tapaa viettää päivä.",
    intro: "Mathildedal toimii yhtä hyvin rauhalliseen viikonloppuun kuin aktiiviseen päiväretkeen. Poimi alta valmis idea tai rakenna oma yhdistelmäsi.",
    direct: "Tutustu palveluntarjoajiin",
    note: "Finland Experience ohjaa sinut suoraan palveluntarjoajan sivulle. Tarkista hinnat, aukioloajat ja saatavuus aina toimijalta.",
    plans: [
      ["Rauhallinen viikonloppu", "Majoitu kylässä, nauti aamukahvi, kävele ruukkimiljöössä ja päätä päivä illalliseen.", "Majoitus + ruoka + kulttuuri", "/fi/mathildedal/majoitus", "Majoitus", BedDouble],
      ["Luonto ja meri", "Aloita metsästä, jatka järvelle tai merelle ja päätä päivä saunaan.", "Luonto + tekeminen + sauna", "/fi/mathildedal/tekemista", "Tekemistä", Compass],
      ["Ruoka ja kyläpäivä", "Kahvi ja leivonnainen, putiikit, paikalliset maut ja illalla kylän tunnelmaa.", "Ruoka + ostokset + kulttuuri", "/fi/mathildedal/ruoka", "Ruoka", Coffee],
      ["Kulttuuria ja designia", "Tutustu historialliseen ruukkikylään, paikallisiin tekijöihin ja putiikkeihin.", "Kulttuuri + ostokset", "/fi/mathildedal/ostokset", "Ostokset", ShoppingBag],
    ],
  },
  en: {
    title: "Plan your day or weekend in Mathildedal",
    description: "Discover accommodation, food, nature, activities, culture and independent shops in Mathildedal and build your own visit.",
    eyebrow: "MATHILDEDAL · SALO",
    heading: "One village. Many ways to spend a day.",
    intro: "Mathildedal works equally well for a slow weekend and an active day trip. Choose an idea below or build your own combination.",
    direct: "Explore local providers",
    note: "Finland Experience sends you directly to the provider. Always confirm prices, opening hours and availability with the operator.",
    plans: [
      ["A slow weekend", "Stay in the village, enjoy coffee, wander the ironworks setting and finish the day with dinner.", "Stay + food + culture", "/en/mathildedal/majoitus", "Accommodation", BedDouble],
      ["Nature and the sea", "Start in the forest, continue to the lake or coast and finish with a sauna.", "Nature + activities + sauna", "/en/mathildedal/tekemista", "Activities", Compass],
      ["Food and village life", "Coffee and pastries, independent shops, local flavours and an evening in the village.", "Food + shopping + culture", "/en/mathildedal/ruoka", "Food", Coffee],
      ["Culture and design", "Explore the historic ironworks village, local makers and independent shops.", "Culture + shopping", "/en/mathildedal/ostokset", "Shopping", ShoppingBag],
    ],
  },
  es: {
    title: "Planifica tu día o fin de semana en Mathildedal",
    description: "Descubre alojamiento, gastronomía, naturaleza, actividades, cultura y tiendas independientes en Mathildedal.",
    eyebrow: "MATHILDEDAL · SALO",
    heading: "Un pueblo. Muchas formas de disfrutarlo.",
    intro: "Mathildedal es perfecto tanto para un fin de semana tranquilo como para una excursión activa. Elige una idea o combina varias.",
    direct: "Descubrir proveedores locales",
    note: "Finland Experience te dirige directamente al proveedor. Confirma siempre precios, horarios y disponibilidad con el establecimiento.",
    plans: [
      ["Un fin de semana tranquilo", "Alójate en el pueblo, disfruta de un café, pasea por la antigua ferrería y termina con una cena.", "Alojamiento + gastronomía + cultura", "/es/mathildedal/majoitus", "Alojamiento", BedDouble],
      ["Naturaleza y mar", "Empieza en el bosque, continúa junto al lago o la costa y termina con una sauna.", "Naturaleza + actividades + sauna", "/es/mathildedal/tekemista", "Actividades", Compass],
      ["Gastronomía y vida local", "Café y repostería, tiendas independientes, sabores locales y ambiente de pueblo.", "Gastronomía + compras + cultura", "/es/mathildedal/ruoka", "Gastronomía", Coffee],
      ["Cultura y diseño", "Descubre la antigua ferrería, los creadores locales y las pequeñas tiendas.", "Cultura + compras", "/es/mathildedal/ostokset", "Compras", ShoppingBag],
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" || rawLocale === "es" ? rawLocale : "fi";
  return buildLocalizedMetadata({ locale, title: copy[locale].title, description: copy[locale].description, path: "/mathildedal/suunnittele" });
}

export default async function MathildedalPlanner({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" || rawLocale === "es" ? rawLocale : "fi";
  const c = copy[locale];

  return (
    <main className="bg-snow py-12 sm:py-20">
      <div className="container-narrow">
        <Link href={`/${locale}/mathildedal`} className="text-sm font-semibold text-brand-700 hover:text-brand-950">← Mathildedal</Link>
        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{c.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-brand-950 sm:text-6xl">{c.heading}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{c.intro}</p>
        </header>

        <section className="mt-12 grid gap-5 sm:grid-cols-2" aria-label={c.heading}>
          {c.plans.map(([title, text, tags, href, label, Icon]) => (
            <article key={title} className="group rounded-3xl border border-brand-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon size={24} aria-hidden="true" /></div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{label}</span>
              </div>
              <h2 className="mt-7 font-display text-2xl font-bold text-brand-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
              <p className="mt-5 text-sm font-semibold text-brand-600">{tags}</p>
              <Link href={href} className="mt-7 inline-flex items-center gap-2 font-bold text-brand-800 group-hover:gap-3">
                {c.direct} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>

        <aside className="mt-10 rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <div className="flex gap-4">
            <Heart className="mt-1 shrink-0 text-brand-700" aria-hidden="true" />
            <p className="leading-7 text-brand-950">{c.note}</p>
          </div>
        </aside>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${locale}/mathildedal/majoitus`} className="rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white">{c.direct}</Link>
          <Link href={`/${locale}/mathildedal/kulttuuri`} className="rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-bold text-brand-900">{locale === "fi" ? "Kulttuuri" : locale === "es" ? "Cultura" : "Culture"}</Link>
        </div>
      </div>
    </main>
  );
}
