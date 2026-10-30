import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonAttractionDetail, type KimitoonAttraction } from "@/components/salo/KimitoonAttractionDetail";
import { buildLocalizedMetadata } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";

const places = ["taalintehdas", "kasnas", "soderlangvik", "sagalund", "oro"] as const;
type Place = (typeof places)[number];

const metadataCopy: Record<Locale, Record<Place, { title: string; description: string }>> = {
  fi: {
    taalintehdas: { title: "Taalintehdas – ruukkikylä ja satama", description: "Tutustu Taalintehtaan ruukkihistoriaan, vierasvenesatamaan, ravintoloihin ja merelliseen kyläelämään." },
    kasnas: { title: "Kasnäs – portti ulkosaaristoon", description: "Tutustu Kasnäsiin, Spa Hotel Kasnäsiin, vierasvenesatamaan ja Örön meriyhteyksiin." },
    soderlangvik: { title: "Söderlångvikin kartano – museo ja luonto", description: "Tutustu Amos Andersonin kartanoon, taidenäyttelyihin, omenatarhoihin, Amos Krogiin ja luontopolkuihin." },
    sagalund: { title: "Sagalund – museo ja puutarha Kemiössä", description: "Tutustu Sagalundin ulkomuseoon, historiallisiin rakennuksiin, puutarhaan ja lasten kulttuurikeskukseen." },
    oro: { title: "Örön linnakesaari – historia ja saaristoluonto", description: "Suunnittele vierailu Örön linnakesaarelle, tutustu historiaan, luontopolkuihin, majoitukseen ja meriyhteyksiin." }
  },
  en: {
    taalintehdas: { title: "Dalsbruk – ironworks village and harbour", description: "Explore Dalsbruk’s ironworks heritage, guest harbour, restaurants and maritime village life." },
    kasnas: { title: "Kasnäs – gateway to the outer archipelago", description: "Discover Kasnäs, Spa Hotel Kasnäs, the guest harbour and boat connections to Örö." },
    soderlangvik: { title: "Söderlångvik Manor – museum and nature", description: "Explore Amos Anderson’s manor, art exhibitions, apple orchards, Amos Krog and nature trails." },
    sagalund: { title: "Sagalund – museum and garden in Kimito", description: "Discover the Sagalund open-air museum, historic buildings, garden and children’s culture centre." },
    oro: { title: "Örö Fortress Island – history and archipelago nature", description: "Plan a visit to Örö Fortress Island and explore its history, nature trails, accommodation and boat connections." }
  },
  es: {
    taalintehdas: { title: "Dalsbruk: pueblo siderúrgico y puerto", description: "Descubre el patrimonio industrial de Dalsbruk, su puerto deportivo, restaurantes y vida marítima." },
    kasnas: { title: "Kasnäs: puerta al archipiélago exterior", description: "Descubre Kasnäs, Spa Hotel Kasnäs, el puerto deportivo y las conexiones marítimas con Örö." },
    soderlangvik: { title: "Mansión Söderlångvik: museo y naturaleza", description: "Descubre la mansión de Amos Anderson, las exposiciones, los huertos, Amos Krog y los senderos." },
    sagalund: { title: "Sagalund: museo y jardín en Kimito", description: "Descubre el museo al aire libre Sagalund, sus edificios históricos, jardín y centro cultural infantil." },
    oro: { title: "Isla fortificada de Örö: historia y naturaleza", description: "Planifica una visita a Örö y descubre su historia, senderos, alojamiento y conexiones en barco." }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; place: string }> }): Promise<Metadata> {
  const { locale: rawLocale, place: rawPlace } = await params;
  if (!locales.includes(rawLocale as Locale) || !places.includes(rawPlace as Place)) return {};
  const locale = rawLocale as Locale;
  const place = rawPlace as Place;
  return buildLocalizedMetadata({
    locale,
    title: metadataCopy[locale][place].title,
    description: metadataCopy[locale][place].description,
    path: `destinations/kemionsaari/kohde/${place}`,
    image: place === "taalintehdas"
      ? "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg"
      : place === "kasnas"
        ? "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg"
        : place === "soderlangvik"
          ? "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/03/sloderlangvik-museum2-760x507.jpg"
          : place === "sagalund"
            ? "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg"
            : "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg"
  });
}

export default async function KimitoonAttractionPage({ params }: { params: Promise<{ locale: string; place: string }> }) {
  const { locale: rawLocale, place: rawPlace } = await params;
  if (!locales.includes(rawLocale as Locale) || !places.includes(rawPlace as Place)) notFound();
  return <KimitoonAttractionDetail locale={rawLocale as Locale} place={rawPlace as KimitoonAttraction} />;
}
