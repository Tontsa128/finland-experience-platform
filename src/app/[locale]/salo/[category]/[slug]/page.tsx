import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { getSaloProviderArea, getSaloProviderDetailCategory, saloProviders } from "@/lib/salo";

const labels = {
  fi: { region: "Salon seutu · Varsinais-Suomi", back: "Takaisin kategoriaan", provider: "Palveluntarjoajan verkkosivusto", direct: "Varaus, maksu ja sopimus tehdään suoraan palveluntarjoajan kanssa.", location: "Sijainti", locationUnknown: "Tarkka katuosoite ja koordinaatit eivät ole tässä oppaassa vahvistettuja.", price: "Hinta", priceNote: "Hintoja tai saatavuutta ei näytetä ilman ajantasaista vahvistusta." },
  es: { region: "Región de Salo · Finlandia suroccidental", back: "Volver a la categoría", provider: "Sitio web del proveedor", direct: "La reserva, el pago y el contrato se realizan directamente con el proveedor.", location: "Ubicación", locationUnknown: "La dirección exacta y las coordenadas no están verificadas en esta guía.", price: "Precio", priceNote: "No se muestran precios ni disponibilidad sin confirmación actualizada." },
  en: { region: "Salo region · Southwest Finland", back: "Back to category", provider: "Provider website", direct: "Bookings, payments and contracts are handled directly by the provider.", location: "Location", locationUnknown: "A precise street address and coordinates have not been verified for this guide.", price: "Price", priceNote: "Prices and availability are not shown without current verification." }
} as const;
type Category = "majoitus" | "ruoka" | "aktiviteetit" | "elamykset" | "saaristo" | "oppaat";
function providerAreaLabel(areaId: (typeof saloProviders)[number]["areaId"], locale: Locale) {
  if (!areaId) return locale === "fi" ? "Aluekuva" : locale === "es" ? "Imagen regional" : "Regional context image";
  const areaNames = {
    "salo-region": { fi: "Salon seudun aluekuva", es: "Imagen de la región de Salo", en: "Salo region context image" },
    "salo-center": { fi: "Salon keskustan aluekuva", es: "Imagen del centro de Salo", en: "Salo town centre context image" },
    mathildedal: { fi: "Mathildedalin satama Salon seudulla", es: "Puerto de Mathildedal en la región de Salo", en: "Mathildedal harbour in the Salo region" },
    teijo: { fi: "Teijon kansallispuiston maisema", es: "Paisaje del Parque Nacional de Teijo", en: "Teijo National Park landscape" },
    sarkisalo: { fi: "Särkisalon saaristomaisema", es: "Paisaje del archipiélago de Särkisalo", en: "Särkisalo archipelago landscape" },
    pernio: { fi: "Perniön aluekuva", es: "Imagen de la zona de Perniö", en: "Perniö area context image" },
    "halikko-wiurila": { fi: "Halikko-Wiurilan aluekuva", es: "Imagen de la zona de Halikko y Wiurila", en: "Halikko and Wiurila area context image" },
    "jarvi-salo": { fi: "Järvi-Salon aluekuva", es: "Imagen de la zona de Järvi-Salo", en: "Järvi-Salo area context image" },
    kemionsaari: { fi: "Kemiönsaaren aluekuva", es: "Imagen de la zona de Kemiönsaari", en: "Kemiönsaari area context image" },
  } as const;
  return areaNames[areaId][locale];
}

const categoryTitle: Record<Locale, Record<Category, string>> = {
  fi: { majoitus: "Majoitus", ruoka: "Ruoka ja ravintolat", aktiviteetit: "Aktiviteetit", elamykset: "Tekemistä ja elämyksiä", saaristo: "Saaristo ja merenranta", oppaat: "Matkailuoppaat" },
  es: { majoitus: "Alojamiento", ruoka: "Gastronomía y restaurantes", aktiviteetit: "Actividades", elamykset: "Experiencias", saaristo: "Archipiélago y costa", oppaat: "Guías turísticas" },
  en: { majoitus: "Accommodation", ruoka: "Food and restaurants", aktiviteetit: "Activities", elamykset: "Things to do and experiences", saaristo: "Archipelago and coast", oppaat: "Tourism guides" }
};

function providerBelongsToCategory(provider: (typeof saloProviders)[number], category: Category) {
  const primary = getSaloProviderDetailCategory(provider);
  return primary === category || (category === "aktiviteetit" && provider.category === "experience");
}
function regionalImage(provider: (typeof saloProviders)[number]): string | null {
  if (provider.areaId === "mathildedal") return photoLibrary.mathildedalHarbour;
  if (provider.areaId === "teijo") return photoLibrary.teijoNationalPark;
  if (provider.areaId === "sarkisalo") return photoLibrary.sarkisalo;
  if (provider.areaId === "salo-center" || provider.areaId === "salo-region") return photoLibrary.saloVeturitalli;
  // Do not reuse a photo from another Salo locality when no suitable licensed image is known.
  return null;
}



export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, category, slug } = await params;
  const provider = saloProviders.find((item) => item.id === slug);
  if (!provider || !["majoitus", "ruoka", "aktiviteetit", "elamykset", "saaristo", "oppaat"].includes(category) || !providerBelongsToCategory(provider, category as Category)) notFound();
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  return buildLocalizedMetadata({ locale, title: provider.name + " | " + categoryTitle[locale][category as Category] + " – Salo", description: provider.description[locale], path: "salo/" + category + "/" + slug, image: regionalImage(provider) || undefined });
}

export default async function SaloProviderPage({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }) {
  const { locale: raw, category, slug } = await params;
  const provider = saloProviders.find((item) => item.id === slug);
  if (!provider || !["majoitus", "ruoka", "aktiviteetit", "elamykset", "saaristo", "oppaat"].includes(category) || !providerBelongsToCategory(provider, category as Category)) notFound();
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  const t = labels[locale];
  const categoryPath = category as Category;
  const image = regionalImage(provider);
  const providerArea = getSaloProviderArea(provider);
  const verifiedArea = providerArea ? providerArea.name[locale] + " · " + providerArea.municipality[locale] : null;
  const mapSearchUrl = providerArea ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(provider.name + ", " + providerArea.mapQuery) : null;
  return (
    <main className="min-h-screen bg-white text-brand-950">
      <section className="relative isolate min-h-[55svh] overflow-hidden bg-brand-950 text-white">
        {image ? <Image src={image} alt={providerAreaLabel(provider.areaId, locale)} fill priority sizes="100vw" unoptimized className="object-cover opacity-50" /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-800 via-brand-950 to-brand-950 px-6 text-center"><MapPin className="h-12 w-12 text-gold-300" /><p className="mt-4 max-w-sm text-sm font-semibold text-white/85">{locale === "fi" ? "Paikallinen kohdekuva lisätään, kun käyttöoikeus on vahvistettu" : locale === "es" ? "Se añadirá una imagen local cuando se confirmen los derechos de uso" : "A local destination image will be added once usage rights are confirmed"}</p></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[55svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t.region} · {categoryTitle[locale][categoryPath]}</p>
            <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">{provider.name}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{provider.description[locale]}</p>
          </div>
        </div>
      </section>
      <section className="container-narrow grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_.7fr]">
        <div>
          <h2 className="font-display text-2xl font-bold">{t.location}</h2>
          <p className="mt-3 leading-7 text-slate-600">{verifiedArea || t.locationUnknown}</p>{mapSearchUrl ? <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Etsi kartalta" : locale === "es" ? "Buscar en el mapa" : "Find on map"}<ArrowUpRight className="h-4 w-4" /></a> : null}
          <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm leading-7 text-slate-700">{t.priceNote}</p>
          <p className="mt-5 text-sm leading-7 text-slate-600">{t.direct}</p>
        </div>
        <aside className="h-fit rounded-[1.75rem] border border-slate-200 p-6 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{t.provider}</p>
          <h2 className="mt-3 font-display text-2xl font-bold">{provider.name}</h2>
          <a href={provider.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
            {t.provider}<ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs leading-5 text-slate-500">{t.direct}</p>
        </aside>
      </section>
      <div className="container-narrow pb-12"><Link href={`/${locale}/salo/${categoryPath}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800"><ArrowLeft className="h-4 w-4" />{t.back}</Link></div>
    </main>
  );
}
