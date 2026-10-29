import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FeaturedSaunas } from "@/components/sauna/FeaturedSaunas";
import { SaunaCarousel } from "@/components/sauna/SaunaCarousel";
import { photoLibrary } from "@/lib/photo-library";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";

const copy: Record<Locale, {
  title: string; description: string; eyebrow: string; heading: string; intro: string;
  listTitle: string; listIntro: string; note: string; explore: string; galleryTitle: string;
}> = {
  fi: {
    title: "Vuokrattavat saunat Suomessa | FINNEXPRIENCE",
    description: "Tutustu vuokrattaviin rantasaunoihin, savusaunoihin ja yksityisiin saunatiloihin. Varmista hinta ja saatavuus suoraan saunan tarjoajalta.",
    eyebrow: "VUOKRATTAVAT SAUNAT · SUOMI",
    heading: "Löydä sauna, jonka voit varata omaan hetkeesi",
    intro: "Järven rannalla, saaristossa tai metsän keskellä. Tutustu saunoihin, joista voit tiedustella yleisiä vuoroja, yksityisvarausta tai ryhmäkäyttöä suoraan palveluntarjoajalta.",
    listTitle: "Tutustu vuokrattaviin saunoihin",
    listIntro: "Saunojen varaustavat, aukioloajat, hinnat ja kapasiteetti vaihtelevat. Tarkista ajantasaiset tiedot ja tee varaus suoraan saunan tarjoajalta.",
    note: "FINNEXPRIENCE esittelee saunakohteita ja ohjaa suoraan palveluntarjoajalle. Varaus, maksu ja sopimus tehdään palveluntarjoajan kanssa.",
    explore: "Katso kaikki elämykset",
    galleryTitle: "Suomalainen saunakulttuuri",
  },
  en: {
    title: "Saunas for Rent in Finland | FINNEXPRIENCE",
    description: "Discover lakeside saunas, traditional smoke saunas and private sauna venues. Confirm prices and availability directly with each provider.",
    eyebrow: "SAUNAS FOR RENT · FINLAND",
    heading: "Find a sauna to book for your own moment",
    intro: "By a lake, in the archipelago or deep in the forest. Explore saunas offering public sessions, private bookings or group use, and contact each provider directly.",
    listTitle: "Explore saunas for rent",
    listIntro: "Booking options, opening hours, prices and capacity vary by venue. Check current details and book directly with the sauna provider.",
    note: "FINNEXPRIENCE showcases sauna destinations and directs visitors to providers. Booking, payment and contracts are handled by the provider.",
    explore: "Explore all experiences",
    galleryTitle: "Finnish sauna culture",
  },
  es: {
    title: "Saunas de alquiler en Finlandia | FINNEXPRIENCE",
    description: "Descubre saunas junto al lago, saunas de humo tradicionales y espacios privados. Confirma los precios y la disponibilidad directamente con cada proveedor.",
    eyebrow: "SAUNAS DE ALQUILER · FINLANDIA",
    heading: "Encuentra una sauna para reservar tu propio momento",
    intro: "Junto a un lago, en el archipiélago o en pleno bosque. Descubre saunas con sesiones públicas, reservas privadas o uso para grupos y contacta directamente con cada proveedor.",
    listTitle: "Descubre saunas de alquiler",
    listIntro: "Las opciones de reserva, los horarios, los precios y la capacidad varían según el lugar. Consulta los datos actuales y reserva directamente con el proveedor.",
    note: "FINNEXPRIENCE presenta destinos de sauna y dirige a los visitantes al proveedor. La reserva, el pago y el contrato se gestionan directamente con él.",
    explore: "Descubrir todas las experiencias",
    galleryTitle: "La cultura finlandesa de la sauna",
  },
};

function normalizeLocale(value: string): Locale {
  return locales.includes(value as Locale) ? value as Locale : "en";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "sauna", image: photoLibrary.saunaCottage });
}

const carouselItems = [
  { image: photoLibrary.herrankukkaroSauna, title: { fi: "Sauna saaristossa", en: "Sauna in the archipelago", es: "Sauna en el archipiélago" }, text: { fi: "Sauna, meri ja saariston tunnelma.", en: "Sauna, sea and archipelago atmosphere.", es: "Sauna, mar y ambiente del archipiélago." }, credit: "Herrankukkaro", source: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt" },
  { image: photoLibrary.storfinnhova, title: { fi: "Maanalainen savusauna", en: "Underground smoke sauna", es: "Sauna de humo subterránea" }, text: { fi: "Graniittinen savusauna metsäpuron varrella.", en: "A granite smoke sauna beside a forest stream.", es: "Una sauna de humo de granito junto a un arroyo forestal." }, credit: "Storfinnhova Gård", source: "https://www.storfinnhova.com/savusauna/" },
  { image: photoLibrary.saunaBoat, title: { fi: "Sauna veden äärellä", en: "Sauna by the water", es: "Sauna junto al agua" }, text: { fi: "Saunomista veden äärellä.", en: "A sauna experience by the water.", es: "Una experiencia de sauna junto al agua." }, credit: "Santeri Viinamäki", source: "https://commons.wikimedia.org/wiki/File:Sauna_boat_20180802.jpg" },
];

export default async function SaunaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[65svh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saunaCottage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/50 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[65svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">{c.heading}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{c.intro}</p>
            <Link href="#sauna-rentals" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-gold-200">
              {c.listTitle}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="sauna-rentals" className="container-narrow scroll-mt-24 py-14 sm:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">FINNEXPRIENCE</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{c.listTitle}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{c.listIntro}</p>
        </div>
        <FeaturedSaunas locale={locale} />
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{c.galleryTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{c.note}</p>
            <Link href={`/${locale}/experiences`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
              {c.explore}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="min-w-0"><SaunaCarousel items={carouselItems} locale={locale} imageLabel={locale === "fi" ? "Kuva" : locale === "es" ? "Imagen" : "Image"} /></div>
        </div>
      </section>
    </main>
  );
}
