import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonGuide } from "@/components/salo/KimitoonGuide";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";

const categories = ["majoitus", "ruoka", "luonto", "kulttuuri", "saaristo", "tapahtumat"] as const;
type Category = (typeof categories)[number];

const names: Record<Locale, Record<Category, string>> = {
  fi: { majoitus: "Majoitus Kemiönsaarella", ruoka: "Kahvilat ja paikalliset maut Kemiönsaarella", luonto: "Luonto ja retket Kemiönsaarella", kulttuuri: "Historia ja kulttuuri Kemiönsaarella", saaristo: "Saaristo ja satamat", tapahtumat: "Tapahtumat Kemiönsaarella" },
  en: { majoitus: "Places to stay on Kimitoön", ruoka: "Cafés and local food on Kimitoön", luonto: "Nature and outdoor activities on Kimitoön", kulttuuri: "History and culture on Kimitoön", saaristo: "Islands and harbours on Kimitoön", tapahtumat: "Events on Kimitoön" },
  es: { majoitus: "Alojamiento en Kimitoön", ruoka: "Cafeterías y gastronomía local en Kimitoön", luonto: "Naturaleza y actividades al aire libre en Kimitoön", kulttuuri: "Historia y cultura en Kimitoön", saaristo: "Islas y puertos de Kimitoön", tapahtumat: "Eventos en Kimitoön" }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !categories.includes(rawCategory as Category)) return {};
  const locale = rawLocale as Locale;
  const category = rawCategory as Category;
  return buildLocalizedMetadata({
    locale,
    title: names[locale][category],
    description: names[locale][category],
    path: "destinations/kemionsaari/" + category,
    image: "https://cdn.johku.com/rosala/largefiles/577.jpg"
  });
}

export default async function KimitoonCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !categories.includes(rawCategory as Category)) notFound();
  return <KimitoonGuide locale={rawLocale as Locale} category={rawCategory as Category} />;
}
