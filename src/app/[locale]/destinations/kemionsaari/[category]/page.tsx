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
  const categoryImages: Partial<Record<Category, string>> = {
    saaristo: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
    luonto: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
    kulttuuri: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",
    ruoka: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg"
  };
  return buildLocalizedMetadata({
    locale,
    title: names[locale][category],
    description: names[locale][category],
    path: "destinations/kemionsaari/" + category,
    ...(categoryImages[category] ? { image: categoryImages[category] } : {})
  });
}

export default async function KimitoonCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !categories.includes(rawCategory as Category)) notFound();
  return <KimitoonGuide locale={rawLocale as Locale} category={rawCategory as Category} />;
}
