import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Coffee, Compass, MapPin, Palette, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const copy = {
  fi: {
    eyebrow: "PORVOO · ITÄINEN UUSIMAA",
    title: "Vanha Porvoo, jokiranta ja saariston läheisyys",
    intro: "Porvoo yhdistää historiallisen vanhankaupungin, jokimaiseman, ruoan, designin ja luonnon. Tänne kannattaa tulla päiväksi – mutta tunnelma palkitsee, kun jäät pidemmäksi aikaa.",
    official: "Tutustu Visit Porvooseen",
    direct: "Siirry palveluntarjoajalle",
    guide: "Virallinen matkailuopas",
    stay: "Majoitus",
    food: "Ruoka & kahvilat",
    culture: "Kulttuuri & historia",
    nature: "Luonto & saaristo",
    note: "Finland Experience toimii inspiraatio- ja löytöpalveluna. Tarkista aina ajantasaiset hinnat, aukioloajat ja saatavuus palveluntarjoajalta.",
    explore: "Tutustu Porvooseen",
    next: "Jatka rannikon reittiä",
  },
  es: {
    eyebrow: "PORVOO · UUSIMAA ORIENTAL",
    title: "Casco antiguo, río y archipiélago",
    intro: "Porvoo combina un casco histórico, vida junto al río, gastronomía, diseño y naturaleza. Es perfecta para una excursión, pero merece una estancia más larga.",
    official: "Descubre Visit Porvoo",
    direct: "Ir al proveedor",
    guide: "Guía oficial de turismo",
    stay: "Alojamiento",
    food: "Gastronomía y cafés",
    culture: "Cultura e historia",
    nature: "Naturaleza y archipiélago",
    note: "Finland Experience es un servicio de inspiración y descubrimiento. Comprueba siempre precios, horarios y disponibilidad actuales directamente con el proveedor.",
    explore: "Descubre Porvoo",
    next: "Continúa por la costa",
  },
  en: {
    eyebrow: "PORVOO · EASTERN UUSIMAA",
    title: "Old Town, riverside life and the nearby archipelago",
    intro: "Porvoo brings together historic streets, riverside life, food, design and nature. It works as a day trip, but rewards travellers who stay longer.",
    official: "Explore Visit Porvoo",
    direct: "Visit provider",
    guide: "Official tourism guide",
    stay: "Places to stay",
    food: "Food & cafés",
    culture: "Culture & history",
    nature: "Nature & archipelago",
    note: "Finland Experience is an inspiration and discovery service. Always check current prices, opening hours and availability directly with the provider.",
    explore: "Explore Porvoo",
    next: "Continue along the coast",
  },
} satisfies Record<Locale, Record<string, string>>;

type SectionKey = "stay" | "food" | "culture" | "nature";

const sections = {
  fi: [
    ["stay", "Majoitukseen kuuluu pieniä hotelleja, B&B-kohteita ja persoonallisia majoituksia. Vanhan Porvoon tunnelma toimii parhaiten, kun kaupungille antaa aikaa.", "https://www.visitporvoo.fi/fi/"],
    ["food", "Porvoo tunnetaan ravintoloista, kahviloista ja suklaasta. Jokikatu ja Välikatu sekä jokirannan ympäristö tarjoavat runsaasti pysähdyspaikkoja.", "https://www.visitporvoo.fi/fi/"],
    ["culture", "Vanha Porvoo, tuomiokirkko, museot ja Runebergin koti kertovat kaupungin pitkästä historiasta. Porvoo on Turun jälkeen Suomen toiseksi vanhin kaupunki.", "https://www.visitporvoo.fi/fi/nahtavyydet/"],
    ["nature", "Porvoon kansallinen kaupunkipuisto, jokilaakso ja saaristo tuovat historiallisen keskustan rinnalle luontoa. Merelle voi lähteä myös risteilylle tai melomaan.", "https://www.visitporvoo.fi/fi/aktiviteetit-ja-elamykset/"],
  ],
  es: [
    ["stay", "La oferta incluye hoteles pequeños, B&B y alojamientos con carácter. Quedarse más tiempo permite disfrutar del ambiente del casco antiguo sin prisas.", "https://www.visitporvoo.fi/en/"],
    ["food", "Porvoo es conocida por sus restaurantes, cafés y chocolaterías. Las calles Jokikatu y Välikatu y la ribera ofrecen muchas paradas gastronómicas.", "https://www.visitporvoo.fi/en/"],
    ["culture", "El casco antiguo, la catedral, los museos y la casa de Runeberg cuentan la larga historia de la ciudad. Porvoo es la segunda ciudad más antigua de Finlandia.", "https://www.visitporvoo.fi/en/sights/"],
    ["nature", "El Parque Nacional Urbano de Porvoo, el valle del río y el archipiélago añaden naturaleza al centro histórico. También puedes salir al mar en crucero o kayak.", "https://www.visitporvoo.fi/en/activities-and-experiences/"],
  ],
  en: [
    ["stay", "Choose from small hotels, B&Bs and characterful stays. Giving Porvoo more than a few hours lets you enjoy Old Town at a slower pace.", "https://www.visitporvoo.fi/en/"],
    ["food", "Porvoo is known for restaurants, cafés and chocolateries. Jokikatu, Välikatu and the riverside offer plenty of places to pause and eat.", "https://www.visitporvoo.fi/en/"],
    ["culture", "Old Town, the cathedral, museums and Runeberg's Home tell the story of the city. Porvoo is Finland's second-oldest town after Turku.", "https://www.visitporvoo.fi/en/sights/"],
    ["nature", "The National Urban Park, river valley and archipelago bring nature close to the historic centre. Cruises and kayaking offer another way to reach the sea.", "https://www.visitporvoo.fi/en/activities-and-experiences/"],
  ],
} satisfies Record<Locale, Array<[string, string, string]>>;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const c = copy[locale] ?? copy.en;
  return buildLocalizedMetadata({ locale, title: c.title + " | Finland Experience", description: c.intro, path: "porvoo" });
}

export default function PorvooPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = copy[locale] ?? copy.en;
  const cards = sections[locale] ?? sections.en;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "Porvoo",
    description: c.intro,
    touristType: locale === "es" ? "Spanish travellers" : "International travellers",
    sameAs: "https://www.visitporvoo.fi/en/",
  };

  const icons = [BedDouble, Coffee, Palette, Waves];

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image
          src={photoLibrary.porvoo}
          alt={locale === "fi" ? "Porvoon vanhakaupunki ja jokiranta" : locale === "es" ? "Casco antiguo y río de Porvoo" : "Old Porvoo and the riverside"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.96] sm:text-7xl lg:text-8xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.visitporvoo.fi/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
              {c.official}<ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href={`/${locale}/destinations/porvoo`} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur">
              {c.explore}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([key, text, url], index) => {
            const Icon = icons[index];
            const title = c[key as SectionKey];
            return (
              <article key={key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <Icon className="h-6 w-6 text-brand-700" />
                <h2 className="mt-4 font-display text-2xl font-bold text-brand-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">
                  {c.direct}<ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">{c.guide}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{c.explore}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{c.note}</p>
            <a href="https://www.visitporvoo.fi/en/sights/old-porvoo/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white">
              {c.official}<ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card">
            <Image src={photoLibrary.porvoo} alt={locale === "fi" ? "Vanha Porvoo" : locale === "es" ? "Casco antiguo de Porvoo" : "Old Porvoo"} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-narrow flex flex-col gap-6 rounded-[2rem] bg-brand-950 p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{c.next}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Salo · Turku · Naantali · Hanko · Åland</h2>
          </div>
          <Link href={`/${locale}/coastal-finland`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {c.next}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
