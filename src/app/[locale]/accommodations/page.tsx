import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cabins as fallbackCabins } from "@/lib/data";
import { getPublishedProperties } from "@/lib/public-content";
import { CabinCard } from "@/components/ui/CabinCard";
import type { Locale } from "@/types";
import { allowDemoFallback } from "@/lib/utils";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const copy = {
  fi: {
    title: "Majoitukset Suomessa | Mökit, saaristo ja sauna",
    description: "Löydä tarkistetut majoitukset Suomessa ja siirry varaamaan suoraan palveluntarjoajalta.",
    eyebrow: "Stay in Finland",
    heading: "Löydä paikka, jossa Suomi tuntuu oikealta",
    intro: "Mökkejä, saaristokoteja ja muita majoituksia rauhallisiin suomalaisiin päiviin.",
    cta: "Katso majoitukset",
    idea: "Majoitus on osa matkan tunnelmaa",
    ideaText: "Valitse ensin paikka, joka sopii omaan tapaan matkustaa. Hinnat ovat suuntaa-antavia ja vahvistetaan aina suoraan palveluntarjoajalta.",
    providerNote: "Varaaminen ja sopimus tapahtuvat suoraan palveluntarjoajan omassa palvelussa.",
    more: "Selaa majoituksia",
    empty: "Tarkistettuja majoituksia ei ole tällä hetkellä julkaistu.",
  },
  es: {
    title: "Alojamientos en Finlandia | Cabañas, islas y sauna",
    description: "Descubre alojamientos verificados en Finlandia y reserva directamente con el proveedor.",
    eyebrow: "Alojarse en Finlandia",
    heading: "Encuentra un lugar donde Finlandia se sienta de verdad",
    intro: "Cabañas, casas del archipiélago y otros alojamientos para vivir Finlandia con calma.",
    cta: "Ver alojamientos",
    idea: "El alojamiento forma parte de la experiencia",
    ideaText: "Empieza por el lugar que encaje con tu forma de viajar. Los precios son orientativos y siempre se confirman directamente con el proveedor.",
    providerNote: "La reserva y el contrato se realizan directamente en el servicio del proveedor.",
    more: "Explorar alojamientos",
    empty: "No hay alojamientos verificados publicados en este momento.",
  },
  en: {
    title: "Places to Stay in Finland | Cabins, islands and sauna",
    description: "Discover verified places to stay in Finland and book directly with the provider.",
    eyebrow: "Stay in Finland",
    heading: "Find a place where Finland feels real",
    intro: "Cabins, archipelago homes and other stays for slow Finnish days.",
    cta: "Explore places to stay",
    idea: "Where you stay shapes the experience",
    ideaText: "Start with the place that fits the way you want to travel. Prices are indicative and always confirmed directly with the provider.",
    providerNote: "Booking and the final contract take place directly with the provider.",
    more: "Explore all stays",
    empty: "No verified stays are currently published.",
  },
} as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const c = copy[locale] || copy.en;
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "accommodations" });
}

export default async function AccommodationsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = copy[locale] || copy.en;
  const cmsCabins = await getPublishedProperties();
  const cabins = cmsCabins.length || !allowDemoFallback ? cmsCabins : fallbackCabins;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.title,
    url: siteUrl + "/" + locale + "/accommodations",
    itemListElement: cabins.map((cabin, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cabin.name[locale] || cabin.name.en,
      url: siteUrl + "/" + locale + "/accommodations/" + cabin.slug,
    })),
  };

  return (
    <div className="bg-white">
      <section className="relative min-h-[58vh] overflow-hidden bg-brand-950 text-white">
        <Image
          src={photoLibrary.turkuArchipelagoHouse}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/50 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[58vh] items-end py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{c.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{c.heading}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{c.intro}</p>
            <Link href="#stays" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">
              {c.cta}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="stays" className="container-narrow scroll-mt-24 py-14 sm:py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">
              {cabins.length} {locale === "fi" ? "julkaistua vaihtoehtoa" : locale === "es" ? "opciones publicadas" : "published options"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{c.idea}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">{c.providerNote}</p>
        </div>

        {cabins.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cabins.map((cabin, i) => <CabinCard key={cabin.id} cabin={cabin} index={i} />)}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-8 text-center text-slate-600">
            {c.empty}
          </div>
        )}
      </section>

      <section className="bg-slate-50">
        <div className="container-narrow py-14 sm:py-20">
          <div className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-10">
            <Sparkles className="h-7 w-7 text-amber-500" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{c.idea}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{c.ideaText}</p>
            <Link href="#stays" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
              {c.more}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
