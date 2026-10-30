import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Compass, ShoppingBag, TreePine, Utensils, CalendarDays } from "lucide-react";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import { RuukkikylaGuide } from "@/components/salo/RuukkikylaGuide";

const copy: Record<Locale, {
  title: string; lead: string; eyebrow: string; introTitle: string; intro: string;
  categories: string; providers: string; providerIntro: string; sources: string;
  teijo: string; teijoText: string; discover: string;
}> = {
  fi: {
    title: "Mathildedal – merellinen ruukkikylä",
    lead: "Historiallinen ruukkimiljöö, pienet puodit, paikalliset maut ja meri kohtaavat Mathildedalissa.",
    eyebrow: "SALON RUUKKIKYLÄT · VARSINAIS-SUOMI",
    introTitle: "Kylä, jossa historia elää tänään",
    intro: "Mathildedal on historiallinen ruukkikylä Salon eteläosassa. Vanhoihin teollisuusrakennuksiin on syntynyt majoitusta, ravintoloita, kahviloita, käsityöpuoteja ja kulttuuripalveluja. Kylän merellinen sijainti ja läheinen Teijon kansallispuisto tekevät siitä luontevan tukikohdan useamman päivän vierailulle.",
    categories: "Tutustu Mathildedalin palveluihin",
    providers: "Paikalliset palveluntarjoajat",
    providerIntro: "Tutustu majoitukseen, ruokaan, puoteihin ja elämyksiin. Aukioloajat, hinnat ja saatavuus tarkistetaan aina suoraan palveluntarjoajalta.",
    sources: "Lähteet ja lisätiedot",
    teijo: "Jatka Teijon ruukkikylään",
    teijoText: "Mathildedal on osa Teijon alueen ruukkikyliä. Tutustu myös Teijon kylään, historialliseen Masuuniin ja kansallispuiston palveluihin.",
    discover: "Tutustu",
  },
  en: {
    title: "Mathildedal – an ironworks village by the sea",
    lead: "Historic industrial heritage, independent shops, local flavours and the sea come together in Mathildedal.",
    eyebrow: "SALO IRONWORKS VILLAGES · SOUTHWEST FINLAND",
    introTitle: "A village where history is part of everyday life",
    intro: "Mathildedal is a historic ironworks village in southern Salo. Its former industrial buildings now accommodate places to stay, restaurants, cafés, craft shops and cultural services. The coastal setting and nearby Teijo National Park make the village a natural base for a longer visit.",
    categories: "Explore Mathildedal services",
    providers: "Local providers",
    providerIntro: "Explore accommodation, food, independent shops and experiences. Always confirm opening times, prices and availability directly with each provider.",
    sources: "Sources and further information",
    teijo: "Continue to Teijo Ironworks Village",
    teijoText: "Mathildedal is part of the Teijo area's ironworks villages. Discover Teijo village, the historic Masuuni and services in the national park too.",
    discover: "Explore",
  },
  es: {
    title: "Mathildedal – pueblo siderúrgico junto al mar",
    lead: "Patrimonio industrial, pequeñas tiendas, sabores locales y el mar se encuentran en Mathildedal.",
    eyebrow: "PUEBLOS SIDERÚRGICOS DE SALO · SUROESTE DE FINLANDIA",
    introTitle: "Un pueblo donde la historia sigue viva",
    intro: "Mathildedal es un pueblo siderúrgico histórico en el sur de Salo. Sus antiguos edificios industriales albergan hoy alojamientos, restaurantes, cafeterías, tiendas de artesanía y servicios culturales. Su ubicación junto al mar y la cercanía del Parque Nacional de Teijo lo convierten en una buena base para una estancia de varios días.",
    categories: "Descubre los servicios de Mathildedal",
    providers: "Proveedores locales",
    providerIntro: "Descubre alojamientos, gastronomía, tiendas independientes y experiencias. Confirma siempre los horarios, precios y disponibilidad directamente con cada proveedor.",
    sources: "Fuentes e información adicional",
    teijo: "Continúa al pueblo siderúrgico de Teijo",
    teijoText: "Mathildedal forma parte de los pueblos siderúrgicos de la zona de Teijo. Descubre también el pueblo de Teijo, el histórico Masuuni y los servicios del parque nacional.",
    discover: "Descubrir",
  },
};

const categories = [
  { slug: "majoitus", category: "stay", icon: BedDouble, title: { fi: "Majoitus", en: "Accommodation", es: "Alojamiento" }, description: { fi: "Boutique-hotellit, huoneistot, mökit ja satamamajoitus.", en: "Boutique hotels, apartments, cottages and harbour stays.", es: "Hoteles boutique, apartamentos, cabañas y alojamientos en el puerto." } },
  { slug: "ruoka", category: "food", icon: Utensils, title: { fi: "Ruoka ja kahvilat", en: "Food and cafés", es: "Gastronomía y cafeterías" }, description: { fi: "Ravintolat, kahvilat, leipomo ja paikalliset juomat.", en: "Restaurants, cafés, bakery and local drinks.", es: "Restaurantes, cafeterías, panadería y bebidas locales." } },
  { slug: "ostokset", category: "shopping", icon: ShoppingBag, title: { fi: "Ostokset ja käsityö", en: "Shopping and crafts", es: "Compras y artesanía" }, description: { fi: "Puodit, design, käsityö ja paikalliset tuotteet.", en: "Independent shops, design, crafts and local products.", es: "Tiendas independientes, diseño, artesanía y productos locales." } },
  { slug: "aktiviteetit", category: "experience", icon: Compass, title: { fi: "Aktiviteetit", en: "Activities", es: "Actividades" }, description: { fi: "Veneilyä, opastuksia, pyöräilyä ja muita elämyksiä.", en: "Boating, guided activities, cycling and experiences.", es: "Navegación, actividades guiadas, ciclismo y experiencias." } },
  { slug: "luonto", category: "nature", icon: TreePine, title: { fi: "Meri ja luonto", en: "Sea and nature", es: "Mar y naturaleza" }, description: { fi: "Rantamaisemat, uimapaikat ja Teijon kansallispuisto.", en: "Coastal scenery, swimming spots and Teijo National Park.", es: "Paisajes costeros, zonas de baño y Parque Nacional de Teijo." } },
  { slug: "tapahtumat", category: null, icon: CalendarDays, title: { fi: "Tapahtumat", en: "Events", es: "Eventos" }, description: { fi: "Kylän tapahtumat ja sesonkiohjelma järjestäjien sivuilta.", en: "Village events and seasonal programme from the organisers.", es: "Eventos del pueblo y programa de temporada de los organizadores." } },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const t = copy[locale];
  return buildLocalizedMetadata({ locale, title: t.title, description: t.lead, path: "mathildedal", image: photoLibrary.mathildedalHarbour });
}

export default async function MathildedalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = copy[locale];

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt={locale === "fi" ? "Mathildedalin historiallinen satama" : locale === "es" ? "Puerto histórico de Mathildedal" : "Historic harbour in Mathildedal"} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="container-narrow relative flex min-h-[62vh] items-end py-16 sm:min-h-[72vh] sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{t.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[.98] sm:text-7xl">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#mathildedal-categories" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{t.discover} <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/fi/salo" className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/15 px-6 py-3.5 text-sm font-bold text-white">{locale === "fi" ? "Salon alueopas" : locale === "es" ? "Guía de Salo" : "Salo regional guide"} <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_.8fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Ruukkiperintö" : locale === "es" ? "Patrimonio industrial" : "Ironworks heritage"}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.introTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{t.intro}</p>
        </div>
        <div className="rounded-[1.75rem] bg-brand-50 p-7 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-brand-700">{locale === "fi" ? "Suunnittele vierailu" : locale === "es" ? "Planifica tu visita" : "Plan your visit"}</p>
          <p className="mt-3 text-sm leading-7 text-slate-700">{locale === "fi" ? "Yhdistä kyläkävely, paikalliset puodit, ruokailu ja merellinen maisema. Tarkista sesonkiaikaiset aukiolot sekä tapahtumat aina niiden järjestäjiltä." : locale === "es" ? "Combina un paseo por el pueblo, tiendas locales, gastronomía y paisajes marinos. Consulta los horarios de temporada y eventos directamente con sus organizadores." : "Combine a village walk, independent shops, local food and coastal scenery. Check seasonal opening times and event details directly with the organisers."}</p>
          <a href="https://www.visitmathildedal.fi/fi/aukioloajat" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 underline underline-offset-4">{locale === "fi" ? "Tarkista aukioloajat" : locale === "es" ? "Consultar horarios" : "Check opening times"} <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section id="mathildedal-categories" className="bg-stone-50 py-14 sm:py-20">
        <div className="container-narrow">
          <div className="mb-8 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.categories}</h2>
            <p className="mt-3 leading-7 text-slate-600">{t.providerIntro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => {
              const Icon = item.icon;
              const image = item.category ? saloProviders.find((provider) => provider.category === item.category && provider.image && ["hotel-mathildedal", "ravintola-terho", "kaarnalaiva", "teijo-action-park", "teijo-national-park"].includes(provider.id))?.image : photoLibrary.mathildedalHarbour;
              const href = item.slug === "tapahtumat" ? "#mathildedal-events" : `/${locale}/mathildedal/${item.slug}`;
              return (
                <Link key={item.slug} href={href} className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
                    <Image src={image || photoLibrary.mathildedalVillage} alt={item.title[locale]} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <Icon className="absolute bottom-4 left-4 h-7 w-7 text-white drop-shadow" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-brand-950">{item.title[locale]}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description[locale]}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{t.discover} <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SaloDirectory locale={locale} area="mathildedal" />
      <div id="mathildedal-events"><RuukkikylaGuide village="mathildedal" locale={locale} /></div>

      <section className="bg-brand-950 py-14 text-white sm:py-20">
        <div className="container-narrow grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.teijo}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-white/75">{t.teijoText}</p>
          </div>
          <Link href={`/${locale}/destinations/teijon-ruukkikyla`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{locale === "fi" ? "Tutustu Teijoon" : locale === "es" ? "Descubrir Teijo" : "Explore Teijo"} <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="container-narrow py-10">
        <p className="text-xs leading-6 text-slate-500">
          {t.sources}: <a href="https://www.visitmathildedal.fi/" target="_blank" rel="noopener noreferrer" className="underline">Visit Mathildedal</a> · <a href="https://www.teijo.fi/tervetuloakyliin/teijon-alueen-ruukkikylat/" target="_blank" rel="noopener noreferrer" className="underline">Teijon Ruukkikylät</a> · <a href="https://visitsalo.fi/mathildedalin-ruukkikyla/" target="_blank" rel="noopener noreferrer" className="underline">Visit Salo</a>
        </p>
      </section>
    </main>
  );
}
