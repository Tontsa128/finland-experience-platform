import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getMathildedalItem, type MathildedalCategory } from "@/lib/mathildedal";

const categories: Record<Locale, Record<MathildedalCategory, string>> = {
  fi: { majoitus: "Majoitus", ruoka: "Ruoka ja juoma", aktiviteetit: "Aktiviteetit", elamykset: "Elämykset" },
  es: { majoitus: "Alojamiento", ruoka: "Gastronomía", aktiviteetit: "Actividades", elamykset: "Experiencias" },
  en: { majoitus: "Accommodation", ruoka: "Food and drink", aktiviteetit: "Activities", elamykset: "Experiences" },
};

const copy = {
  fi: {
    region: "Mathildedal · Salo · Varsinais-Suomi",
    location: "Sijainti",
    provider: "Palveluntarjoajan virallinen sivu",
    direct: "Lisätiedot, varaus, maksu ja sopimus hoidetaan suoraan palveluntarjoajan kanssa.",
    back: "Takaisin kategoriaan",
    imagePending: "Kohteen oma kuva lisätään, kun kuvan käyttöoikeus on vahvistettu.",
    viewProvider: "Siirry palveluntarjoajalle",
    price: "Hinta ja saatavuus",
    priceNote: "Ajantasainen hinta ja saatavuus tarkistetaan suoraan palveluntarjoajalta.",
  },
  es: {
    region: "Mathildedal · Salo · Finlandia suroccidental",
    location: "Ubicación",
    provider: "Sitio oficial del proveedor",
    direct: "La información adicional, la reserva, el pago y el contrato se gestionan directamente con el proveedor.",
    back: "Volver a la categoría",
    imagePending: "La foto del lugar se añadirá cuando se confirmen los derechos de uso.",
    viewProvider: "Ir al proveedor",
    price: "Precio y disponibilidad",
    priceNote: "Confirma el precio y la disponibilidad actuales directamente con el proveedor.",
  },
  en: {
    region: "Mathildedal · Salo · Southwest Finland",
    location: "Location",
    provider: "Official provider website",
    direct: "Further details, booking, payment and the contract are handled directly with the provider.",
    back: "Back to category",
    imagePending: "A venue-specific image will be added once usage rights are confirmed.",
    viewProvider: "Visit provider",
    price: "Price and availability",
    priceNote: "Confirm current prices and availability directly with the provider.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category, slug } = await params;
  if (!["fi", "es", "en"].includes(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const result = getMathildedalItem(category, slug);
  if (!result) notFound();
  return buildLocalizedMetadata({
    locale,
    title: result.item.name + " | " + categories[locale][result.category] + " – Mathildedal",
    description: result.item.description[locale],
    path: "mathildedal/" + result.category + "/" + slug,
    image: result.item.image || undefined,
  });
}

export default async function MathildedalProviderPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale: rawLocale, category, slug } = await params;
  if (!["fi", "es", "en"].includes(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const result = getMathildedalItem(category, slug);
  if (!result) notFound();
  const { item } = result;
  const t = copy[locale];
  const categoryTitle = categories[locale][result.category];

  return (
    <main className="min-h-screen bg-white text-brand-950">
      <section className="relative isolate min-h-[52svh] overflow-hidden bg-brand-950 text-white">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill priority unoptimized sizes="100vw" className="object-cover opacity-55" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-800 via-brand-950 to-brand-950 px-6 text-center">
            <MapPin className="h-12 w-12 text-gold-300" />
            <p className="mt-4 max-w-md text-sm font-semibold text-white/85">{t.imagePending}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[52svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t.region} · {categoryTitle}</p>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">{item.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{item.description[locale]}</p>
          </div>
        </div>
      </section>

      <section className="container-narrow grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_.7fr]">
        <div>
          <h2 className="font-display text-2xl font-bold">{t.location}</h2>
          <p className="mt-3 flex items-start gap-2 leading-7 text-slate-600"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-700" />{item.address || "Mathildedal, Salo"}</p>
          {item.seasonal ? (
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              {locale === "fi" ? "Kausikohde – varmista aukiolo palveluntarjoajalta." : locale === "es" ? "Lugar estacional: confirma la apertura con el proveedor." : "Seasonal venue — confirm opening with the provider."}
            </p>
          ) : null}
          <h2 className="mt-8 font-display text-xl font-bold">{t.price}</h2>
          <p className="mt-2 leading-7 text-slate-600">{t.priceNote}</p>
          <p className="mt-5 text-sm leading-7 text-slate-600">{t.direct}</p>
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-slate-200 p-6 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{t.provider}</p>
          <h2 className="mt-3 font-display text-2xl font-bold">{item.name}</h2>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-800">
            {t.viewProvider}<ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs leading-5 text-slate-500">{t.direct}</p>
        </aside>
      </section>

      <div className="container-narrow pb-12">
        <Link href={`/${locale}/mathildedal/${result.category}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
          <ArrowLeft className="h-4 w-4" />{t.back}
        </Link>
      </div>
    </main>
  );
}
