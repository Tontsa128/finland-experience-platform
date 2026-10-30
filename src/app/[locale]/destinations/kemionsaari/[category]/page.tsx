import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonGuide } from "@/components/salo/KimitoonGuide";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";

const categories = ["majoitus", "ruoka", "aktiviteetit", "saaristo", "luonto", "kulttuuri", "hyvinvointi", "kuljetukset", "ostokset", "talviaktiviteetit", "tapahtumat", "tapahtumapaikat", "muut-palvelut"] as const;
type Category = (typeof categories)[number];

const names: Record<Locale, Record<Category, string>> = {
  fi: { majoitus:"Majoitus Kemiönsaarella",ruoka:"Ravintolat, kahvilat ja lähiruoka Kemiönsaarella",aktiviteetit:"Aktiviteetit ja elämykset Kemiönsaarella",saaristo:"Saaristo, saaret ja satamat",luonto:"Luonto ja ulkoilu Kemiönsaarella",kulttuuri:"Kulttuuri, museot ja nähtävyydet",hyvinvointi:"Hyvinvointi ja terveys Kemiönsaarella",kuljetukset:"Kuljetukset ja yhteydet Kemiönsaarella",ostokset:"Ostokset ja paikalliset puodit",talviaktiviteetit:"Talviaktiviteetit Kemiönsaarella",tapahtumat:"Tapahtumat ja festivaalit Kemiönsaarella",tapahtumapaikat:"Tapahtuma- ja juhlatilat Kemiönsaarella","muut-palvelut":"Muut matkailupalvelut Kemiönsaarella" },
  en: { majoitus:"Accommodation on Kimitoön",ruoka:"Restaurants, cafés and local food on Kimitoön",aktiviteetit:"Activities and experiences on Kimitoön",saaristo:"Archipelago, islands and harbours",luonto:"Nature and outdoors on Kimitoön",kulttuuri:"Culture, museums and sights on Kimitoön",hyvinvointi:"Wellbeing and health on Kimitoön",kuljetukset:"Transport and connections on Kimitoön",ostokset:"Shopping and local shops",talviaktiviteetit:"Winter activities on Kimitoön",tapahtumat:"Events and festivals on Kimitoön",tapahtumapaikat:"Event and celebration venues on Kimitoön","muut-palvelut":"Other visitor services on Kimitoön" },
  es: { majoitus:"Alojamiento en Kimitoön",ruoka:"Restaurantes, cafeterías y gastronomía local",aktiviteetit:"Actividades y experiencias en Kimitoön",saaristo:"Archipiélago, islas y puertos",luonto:"Naturaleza y aire libre en Kimitoön",kulttuuri:"Cultura, museos y lugares de interés",hyvinvointi:"Bienestar y salud en Kimitoön",kuljetukset:"Transporte y conexiones en Kimitoön",ostokset:"Compras y tiendas locales",talviaktiviteetit:"Actividades de invierno en Kimitoön",tapahtumat:"Eventos y festivales en Kimitoön",tapahtumapaikat:"Espacios para eventos y celebraciones","muut-palvelut":"Otros servicios para visitantes" }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !categories.includes(rawCategory as Category)) return {};
  const locale = rawLocale as Locale;
  const category = rawCategory as Category;
  const categoryImages: Partial<Record<Category, string>> = {
    saaristo: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
    luonto: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
    aktiviteetit: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
    hyvinvointi: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg",
    kuljetukset: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
    ostokset: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg",
    talviaktiviteetit: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg",
    tapahtumapaikat: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg",
    "muut-palvelut": "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg",
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
