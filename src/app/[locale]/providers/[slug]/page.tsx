import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { saloProviders } from "@/lib/salo";
import { luxuryDirectory } from "@/lib/luxury-directory";

type Params = { locale: string; slug: string };

function resolveProvider(slug: string, locale: Locale) {
  if (slug.startsWith("salo-")) {
    const item = saloProviders.find((provider) => provider.id === slug.slice(5));
    if (!item) return null;
    const category = {
      tourism: { fi: "Matkailuinfo", en: "Tourism information", es: "Información turística" },
      stay: { fi: "Majoitus", en: "Accommodation", es: "Alojamiento" },
      experience: { fi: "Elämys", en: "Experience", es: "Experiencia" },
      nature: { fi: "Luonto", en: "Nature", es: "Naturaleza" },
      food: { fi: "Ruoka ja juoma", en: "Food and drink", es: "Gastronomía" },
    }[item.category][locale];
    return {
      name: item.nameByLocale?.[locale] || item.name,
      description: item.description[locale],
      category,
      image: item.image,
      imageCredit: item.imageCredit,
      location: "Salo · Mathildedal · Teijo",
      website: item.url,
      price: item.priceByLocale?.[locale] || (locale === "fi" ? item.price : undefined),
      tags: [] as string[],
    };
  }
  if (slug.startsWith("directory-")) {
    const item = luxuryDirectory.find((provider) => provider.id === slug.slice(10));
    if (!item) return null;
    const category = {
      stay: { fi: "Majoitus", en: "Accommodation", es: "Alojamiento" },
      sauna: { fi: "Sauna ja hyvinvointi", en: "Sauna and wellbeing", es: "Sauna y bienestar" },
      food: { fi: "Ruoka ja juoma", en: "Food and drink", es: "Gastronomía" },
      nature: { fi: "Luonto", en: "Nature", es: "Naturaleza" },
      experience: { fi: "Elämys", en: "Experience", es: "Experiencia" },
    }[item.category][locale];
    return {
      name: item.nameByLocale?.[locale] || item.name,
      description: item.description[locale],
      category,
      image: item.image,
      imageCredit: item.imageCredit,
      location: item.locationByLocale?.[locale] || item.location,
      website: item.url,
      price: item.priceByLocale?.[locale] || (locale === "fi" ? item.price : undefined),
      tags: item.tags,
    };
  }
  return null;
}

const copy = {
  fi: {
    back: "Takaisin kohteisiin", eyebrow: "Paikallinen palveluntarjoaja",
    about: "Tietoa palvelusta", source: "Palveluntarjoajan omat tiedot ja kuvat",
    visit: "Siirry palveluntarjoajan verkkosivuille",
    direct: "FINNEXPRIENCE esittelee palvelun. Varaus, maksaminen, saatavuuden vahvistaminen ja sopimus hoidetaan suoraan palveluntarjoajan kanssa.",
    image: "Kohteen kuva", price: "Hintatieto",
  },
  en: {
    back: "Back to destinations", eyebrow: "Local service provider",
    about: "About this service", source: "Provider website and image credit",
    visit: "Visit the provider’s website",
    direct: "FINNEXPRIENCE introduces the service. Booking, payment, availability confirmation and the contract are handled directly with the provider.",
    image: "Photo of the place", price: "Price information",
  },
  es: {
    back: "Volver a los destinos", eyebrow: "Proveedor local",
    about: "Sobre este servicio", source: "Web del proveedor y crédito de la imagen",
    visit: "Visitar la web del proveedor",
    direct: "FINNEXPRIENCE presenta el servicio. La reserva, el pago, la confirmación de disponibilidad y el contrato se gestionan directamente con el proveedor.",
    image: "Imagen del lugar", price: "Información de precios",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const provider = resolveProvider(slug, locale);
  if (!provider) return {};
  return buildLocalizedMetadata({
    locale,
    title: provider.name,
    description: provider.description,
    path: "providers/" + slug,
    image: provider.image,
  });
}

export default async function ProviderDetailPage({ params }: { params: Promise<Params> }) {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const provider = resolveProvider(slug, locale);
  if (!provider) notFound();
  const c = copy[locale];

  return (
    <main className="min-w-0 overflow-hidden bg-white text-brand-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: provider.name,
        description: provider.description,
        url: provider.website,
        image: provider.image ? [provider.image] : undefined,
        address: { "@type": "PostalAddress", addressLocality: provider.location, addressCountry: "FI" },
      }).replace(/</g, "\\u003c") }} />
      <section className="relative isolate min-h-[42svh] overflow-hidden bg-brand-950 text-white sm:min-h-[54svh]">
        {provider.image ? <Image src={provider.image} alt={provider.name} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[42svh] min-w-0 items-end py-8 sm:min-h-[54svh] sm:py-14">
          <div className="max-w-4xl">
            <Link href={`/${locale}/destinations`} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:bg-black/40">
              <ArrowLeft className="h-4 w-4" />{c.back}
            </Link>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{c.eyebrow} · {provider.category}</p>
            <h1 className="mt-3 break-words font-display text-3xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">{provider.name}</h1>
            <p className="mt-4 flex items-start gap-2 text-sm text-white/85 sm:text-base"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{provider.location}</p>
          </div>
        </div>
      </section>

      <section className="container-narrow grid min-w-0 gap-8 py-8 sm:py-12 lg:grid-cols-[1fr_340px] lg:gap-12">
        <article className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{c.about}</p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-4xl">{provider.name}</h2>
          <p className="mt-4 whitespace-pre-line break-words text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">{provider.description}</p>
          {provider.image ? (
            <figure className="mt-7 overflow-hidden rounded-2xl bg-brand-50">
              <div className="relative aspect-[16/9]">
                <Image src={provider.image} alt={provider.name} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
              </div>
              {provider.imageCredit ? <figcaption className="px-4 py-3 text-xs text-slate-500">{c.source}: {provider.imageCredit}</figcaption> : null}
            </figure>
          ) : null}
          {provider.tags.length > 0 ? <div className="mt-5 flex flex-wrap gap-2">{provider.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800">{tag}</span>)}</div> : null}
        </article>

        <aside className="h-fit min-w-0 rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-7 lg:sticky lg:top-24">
          {provider.price ? <div className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-brand-600">{c.price}</p><p className="mt-2 break-words font-semibold text-brand-950">{provider.price}</p></div> : null}
          <p className="text-sm leading-6 text-slate-700">{c.direct}</p>
          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-brand-800">
            {c.visit}<ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
          <p className="mt-3 break-all text-xs text-slate-500">{provider.website}</p>
        </aside>
      </section>
    </main>
  );
}
