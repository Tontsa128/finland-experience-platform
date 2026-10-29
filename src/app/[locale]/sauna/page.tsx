import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { CabinCard } from "@/components/ui/CabinCard";
import { FeaturedSaunas } from "@/components/sauna/FeaturedSaunas";
import { SaunaCarousel } from "@/components/sauna/SaunaCarousel";
import { getPublishedProperties } from "@/lib/public-content";
import { photoLibrary } from "@/lib/photo-library";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";

const copy: Record<Locale, {
  title: string; description: string; eyebrow: string; heading: string; intro: string;
  staysTitle: string; staysIntro: string; emptyTitle: string; emptyText: string;
  allStays: string; providerNote: string; verified: string; imageHeading: string;
  imageIntro: string; allExperiences: string;
}> = {
  fi: {
    title: "Saunamökit ja saunalliset majoitukset Suomessa",
    description: "Löydä saunallisia mökkejä, saaristomajoituksia ja suomalaisia saunakohteita. Tarkista saatavuus ja varaa suoraan palveluntarjoajalta.",
    eyebrow: "SAUNA · MÖKIT · SAARISTO",
    heading: "Löydä mökki, jossa sauna kuuluu lomaan",
    intro: "Saunallinen mökki, savusauna luonnon keskellä tai saariston rauha. Tutustu julkaistuihin majoituksiin ja saunakohteisiin – varaus ja maksu hoituvat aina suoraan palveluntarjoajan kanssa.",
    staysTitle: "Saunalliset mökit ja majoitukset",
    staysIntro: "Näytämme tässä vain julkaistut majoitukset, joiden tiedoissa mainitaan sauna. Tarkista palvelun yksityiskohdat ja ajantasainen saatavuus vuokraajalta.",
    emptyTitle: "Saunallisia majoituksia ei ole juuri nyt julkaistu",
    emptyText: "Voit silti tutustua kaikkiin julkaistuihin mökkeihin ja kysyä palveluntarjoajilta saunamahdollisuuksista.",
    allStays: "Katso kaikki mökit ja majoitukset",
    providerNote: "Varmistetut palveluntarjoajat · varaus suoraan vuokraajalta",
    verified: "Palveluntarjoajan tiedot",
    imageHeading: "Sauna on osa suomalaista elämäntapaa",
    imageIntro: "Saaristosaunoista savusaunoihin – löydä oma tapasi kokea suomalainen sauna.",
    allExperiences: "Tutustu elämyksiin",
  },
  en: {
    title: "Sauna Cabins and Sauna Stays in Finland",
    description: "Discover Finnish cabins with saunas, archipelago stays and distinctive sauna destinations. Check availability and book directly with each provider.",
    eyebrow: "SAUNA · CABINS · ARCHIPELAGO",
    heading: "Find a cabin where sauna is part of the stay",
    intro: "A private sauna cabin, a traditional smoke sauna in nature or a quiet archipelago escape. Explore published stays and sauna destinations. Booking and payment are handled directly by each provider.",
    staysTitle: "Cabins and stays with a sauna",
    staysIntro: "This list includes published accommodation whose details mention a sauna. Confirm facilities and current availability directly with the property provider.",
    emptyTitle: "No sauna stays are currently published",
    emptyText: "You can still browse all published accommodation and ask providers about sauna facilities.",
    allStays: "Browse all cabins and accommodation",
    providerNote: "Verified providers · book directly with the host",
    verified: "Provider details",
    imageHeading: "Sauna is part of Finnish life",
    imageIntro: "From archipelago saunas to traditional smoke saunas, discover a sauna experience that suits your trip.",
    allExperiences: "Explore experiences",
  },
  es: {
    title: "Cabañas con sauna y alojamientos en Finlandia",
    description: "Descubre cabañas finlandesas con sauna, alojamientos en el archipiélago y saunas singulares. Consulta la disponibilidad y reserva directamente con cada proveedor.",
    eyebrow: "SAUNA · CABAÑAS · ARCHIPIÉLAGO",
    heading: "Encuentra una cabaña donde la sauna forme parte de la estancia",
    intro: "Una cabaña con sauna privada, una sauna de humo en plena naturaleza o la tranquilidad del archipiélago. Descubre alojamientos publicados y lugares de sauna. La reserva y el pago se realizan directamente con cada proveedor.",
    staysTitle: "Cabañas y alojamientos con sauna",
    staysIntro: "Esta lista incluye alojamientos publicados que mencionan una sauna en sus datos. Confirma las instalaciones y la disponibilidad actual directamente con el proveedor.",
    emptyTitle: "Ahora mismo no hay alojamientos con sauna publicados",
    emptyText: "Puedes consultar todos los alojamientos publicados y preguntar a los proveedores por las instalaciones de sauna.",
    allStays: "Ver todas las cabañas y alojamientos",
    providerNote: "Proveedores verificados · reserva directa con el anfitrión",
    verified: "Información del proveedor",
    imageHeading: "La sauna forma parte de la vida finlandesa",
    imageIntro: "Desde saunas en el archipiélago hasta saunas de humo tradicionales: encuentra una experiencia a tu medida.",
    allExperiences: "Descubrir experiencias",
  },
};

const carouselItems = [
  {
    image: photoLibrary.herrankukkaroSauna,
    title: { fi: "Sauna saaristossa", es: "Sauna en el archipiélago", en: "Sauna in the archipelago" },
    text: { fi: "Herrankukkaron saaristoympäristössä sauna, meri ja paikallinen tunnelma kohtaavat.", es: "En Herrankukkaro, sauna, mar y archipiélago forman una experiencia.", en: "At Herrankukkaro, sauna, sea and archipelago come together." },
    credit: "Herrankukkaro",
    source: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt",
  },
  {
    image: photoLibrary.storfinnhova,
    title: { fi: "Maanalainen savusauna", es: "Sauna de humo subterránea", en: "Underground smoke sauna" },
    text: { fi: "Storfinnhova Gårdin graniittinen savusauna sijaitsee metsäpuron varrella.", es: "La sauna de humo de granito de Storfinnhova está junto a un arroyo forestal.", en: "Storfinnhova Gård's granite smoke sauna sits beside a forest stream." },
    credit: "Storfinnhova Gård",
    source: "https://www.storfinnhova.com/",
  },
  {
    image: photoLibrary.saunaBoat,
    title: { fi: "Sauna veden äärellä", es: "Sauna junto al agua", en: "Sauna by the water" },
    text: { fi: "Sauna ja vesi kohtaavat kelluvassa saunassa.", es: "La sauna y el agua se encuentran en una sauna flotante.", en: "Sauna and water meet in a floating sauna." },
    credit: "Santeri Viinamäki",
    source: "https://commons.wikimedia.org/wiki/File:Sauna_boat_20180802.jpg",
  },
  {
    image: photoLibrary.saunaTraditionalSmoke,
    title: { fi: "Perinteinen savusauna", es: "Sauna de humo tradicional", en: "Traditional smoke sauna" },
    text: { fi: "Savusauna on suomalaisen saunaperinteen vanha ja tunnistettava muoto.", es: "La sauna de humo es una forma antigua y reconocible de la tradición finlandesa.", en: "The smoke sauna is an old and distinctive form of Finnish sauna tradition." },
    credit: "JP Korpi-Vartiainen",
    source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg",
  },
];

function normalizeLocale(value: string): Locale {
  return locales.includes(value as Locale) ? value as Locale : "en";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];
  return buildLocalizedMetadata({
    locale,
    title: c.title,
    description: c.description,
    path: "sauna",
    image: photoLibrary.saunaCottage,
  });
}

export default async function SaunaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];
  const publishedStays = await getPublishedProperties();

  // Only show real, published properties whose own content explicitly mentions a sauna.
  // Do not mix generic fallback/demo cabins into a production directory.
  const saunaStays = publishedStays.filter((stay) => {
    const searchable = [
      ...stay.features,
      ...Object.values(stay.name),
      ...Object.values(stay.description),
    ].join(" ").normalize("NFKC").toLocaleLowerCase();
    return /\bsauna\b|savusauna|saunallinen|saunall|saunasta|löyly|saunalla/.test(searchable);
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.title,
    description: c.description,
    url: siteUrl + "/" + locale + "/sauna",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: saunaStays.map((stay, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: stay.name[locale] || stay.name.en,
        url: siteUrl + "/" + locale + "/accommodations/" + stay.slug,
      })),
    },
  };

  return (
    <main className="bg-white text-brand-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="relative isolate min-h-[68svh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saunaCottage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[68svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">{c.heading}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{c.intro}</p>
            <Link href="#sauna-stays" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3.5 text-sm font-bold text-brand-950 transition hover:bg-gold-200">
              {c.staysTitle}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="sauna-stays" className="container-narrow scroll-mt-24 py-14 sm:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{c.providerNote}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{c.staysTitle}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{c.staysIntro}</p>
          </div>
          <Link href={`/${locale}/accommodations`} className="inline-flex shrink-0 items-center gap-2 font-bold text-brand-900 underline underline-offset-4">
            {c.allStays}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {saunaStays.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {saunaStays.map((stay, index) => <CabinCard key={stay.id} cabin={stay} index={index} />)}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-brand-100 bg-brand-50 p-8 sm:p-10">
            <ShieldCheck className="h-8 w-8 text-brand-700" />
            <h3 className="mt-4 font-display text-2xl font-bold">{c.emptyTitle}</h3>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">{c.emptyText}</p>
            <Link href={`/${locale}/accommodations`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800">
              {c.allStays}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{c.imageHeading}</p>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{c.imageHeading}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{c.imageIntro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/${locale}/experiences`} className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
                  {c.allExperiences}<ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`/${locale}/accommodations`} className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">
                  {c.allStays}<ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[460px]">
              <Image src={photoLibrary.herrankukkaroSauna} alt={c.imageHeading} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <FeaturedSaunas locale={locale} />

      <section className="container-narrow py-12 sm:py-16" aria-labelledby="sauna-carousel-title">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">SAUNA · {locale === "fi" ? "KUVAT" : locale === "es" ? "IMÁGENES" : "IMAGES"}</p>
          <h2 id="sauna-carousel-title" className="mt-3 font-display text-4xl font-bold sm:text-5xl">{locale === "fi" ? "Saunaelämys alkaa kuvasta" : locale === "es" ? "La experiencia de sauna empieza con una imagen" : "The sauna experience starts with a picture"}</h2>
          <SaunaCarousel items={carouselItems} locale={locale} imageLabel={locale === "fi" ? "Kuva" : locale === "es" ? "Imagen" : "Image"} />
        </div>
      </section>
      <section className="container-narrow pb-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 sm:p-8">
          <p className="flex items-center gap-2 font-semibold text-brand-900"><MapPin className="h-4 w-4" />{c.verified}</p>
          <p className="mt-2">{c.providerNote}. {c.allStays}.</p>
          <p className="mt-3"><Link href={`/${locale}/accommodations`} className="font-bold text-brand-800 underline underline-offset-4">{c.allStays}</Link></p>
        </div>
      </section>
    </main>
  );
}
