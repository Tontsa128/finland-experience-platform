import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonPlaceDetail } from "@/components/salo/KimitoonPlaceDetail";
import { buildLocalizedMetadata } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const copy = {
    fi: { title: "Rosala – viikinkihistoriaa ja saaristoretkiä", description: "Tutustu Rosalan Viikinkikeskukseen, saaristoon, Bengtskär-retkiin ja ajantasaisiin lauttayhteyksiin." },
    en: { title: "Rosala – Viking heritage and archipelago trips", description: "Discover Rosala Viking Centre, island scenery, Bengtskär excursions and current ferry information." },
    es: { title: "Rosala: historia vikinga y excursiones por el archipiélago", description: "Descubre el Centro Vikingo de Rosala, el paisaje insular, las excursiones a Bengtskär y la información actualizada del ferry." },
  } as const;
  return buildLocalizedMetadata({ locale: locale as Locale, title: copy[locale as Locale].title, description: copy[locale as Locale].description, path: "destinations/rosala", image: "https://cdn.johku.com/rosala/largefiles/577.jpg" });
}

export default async function RosalaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <KimitoonPlaceDetail locale={locale as Locale} place="rosala" />;
}
