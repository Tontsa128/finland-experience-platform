import type { Metadata } from "next";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { KimitoonGuide } from "@/components/salo/KimitoonGuide";

const metadataCopy: Record<Locale, { title: string; description: string }> = {
  fi: {
    title: "Kemiö ja Kemiönsaari – saariston kohteet ja palvelut",
    description: "Tutustu Kemiöön ja Kemiönsaareen, saaristokyliin, majoitukseen, ruokaan, luontoon, kulttuuriin ja merellisiin elämyksiin."
  },
  en: {
    title: "Kimito and Kimitoön – archipelago destinations and local providers",
    description: "Explore Kimito and Kimitoön, island villages, accommodation, food, nature, culture and maritime experiences."
  },
  es: {
    title: "Kimito y Kimitoön – destinos y servicios del archipiélago",
    description: "Descubre Kimito y Kimitoön, pueblos isleños, alojamiento, gastronomía, naturaleza, cultura y experiencias marítimas."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  return buildLocalizedMetadata({
    locale,
    title: metadataCopy[locale].title,
    description: metadataCopy[locale].description,
    path: "kimitoon",
    image: photoLibrary.rosalaVikingCentre
  });
}

export default async function KimitoonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return null;
  return <KimitoonGuide locale={rawLocale as Locale} />;
}
