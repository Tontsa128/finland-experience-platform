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
import { photoLibrary } from "@/lib/photo-library";
import { getKimitoonProvider, getKimitoonProviders, type KimitoonCategory } from "@/lib/kimitoon-providers";

type Params = { locale: string; slug: string };

const saloProviderLocations: Record<string, Record<Locale, string>> = {
  "visit-salo": { fi: "Salo", en: "Salo", es: "Salo" },
  "visit-mathildedal": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "hotel-mathildedal": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "mathildan-marina": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "matilda-villas": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "matri-house": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "majoitus-mathildedal": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "kattohuone-mathildedal": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "ravintola-terho": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "mathildedal-brewery": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
  "teijon-masuuni": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "teijo-action-park": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "teijo-national-park": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "meri-teijo-golf": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "matildanjarven-kampat": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "teijo-tentsile": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "teijon-kammari": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "saaristomokit-sarkisalo": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "aava-adventures": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "finnholm-strandbo": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "forby-marina": { fi: "Förby · Särkisalo · Salo", en: "Förby · Särkisalo · Salo", es: "Förby · Särkisalo · Salo" },
  "cafe-vinssi": { fi: "Förby · Särkisalo · Salo", en: "Förby · Särkisalo · Salo", es: "Förby · Särkisalo · Salo" },
  "saaristoravintola-nixor": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "villa-meri-sarkisalo": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "krailan-sabrina": { fi: "Särkisalo · Perniö · Salo", en: "Särkisalo · Perniö · Salo", es: "Särkisalo · Perniö · Salo" },
  "tiiranta": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "niksaaren-sauna": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "sarkisalo-fishing": { fi: "Särkisalo · Salo", en: "Särkisalo · Salo", es: "Särkisalo · Salo" },
  "forby-rantajooga": { fi: "Förby · Särkisalo · Salo", en: "Förby · Särkisalo · Salo", es: "Förby · Särkisalo · Salo" },
  "leipyolin-tila": { fi: "Perniö · Salo", en: "Perniö · Salo", es: "Perniö · Salo" },
  "villa-nennebo": { fi: "Perniö · Salo", en: "Perniö · Salo", es: "Perniö · Salo" },
  "alaspaan-maatila": { fi: "Perniö · Salo", en: "Perniö · Salo", es: "Perniö · Salo" },
  "topilan-tupa": { fi: "Halikko · Salo", en: "Halikko · Salo", es: "Halikko · Salo" },
  "salon-oppaat": { fi: "Salo", en: "Salo", es: "Salo" },
  "vuohensaari-camping": { fi: "Salo", en: "Salo", es: "Salo" },
};

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
      kind: "provider" as const,
      name: item.nameByLocale?.[locale] || item.name,
      description: item.description[locale],
      category,
      image: item.image,
      imageCredit: item.imageCredit,
      location: saloProviderLocations[item.id]?.[locale] || (locale === "fi" ? "Salon seutu" : locale === "es" ? "Región de Salo" : "Salo region"),
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
      kind: "provider" as const,
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
  if (slug.startsWith("kimitoon-")) {
    const item = getKimitoonProvider(slug.slice("kimitoon-".length));
    if (!item) return null;
    const categoryKey: KimitoonCategory = item.categories[0];
    const category = {
      majoitus: { fi: "Majoitus", en: "Accommodation", es: "Alojamiento" },
      ruoka: { fi: "Ruoka ja juoma", en: "Food and drink", es: "Gastronomía" },
      aktiviteetit: { fi: "Aktiviteetit ja elämykset", en: "Activities and experiences", es: "Actividades y experiencias" },
      saaristo: { fi: "Saaristo ja satamat", en: "Archipelago and harbours", es: "Archipiélago y puertos" },
      luonto: { fi: "Luonto ja ulkoilu", en: "Nature and outdoors", es: "Naturaleza y aire libre" },
      kulttuuri: { fi: "Kulttuuri ja nähtävyydet", en: "Culture and sights", es: "Cultura y lugares de interés" },
      hyvinvointi: { fi: "Hyvinvointi", en: "Wellbeing", es: "Bienestar" },
      kuljetukset: { fi: "Kuljetukset", en: "Transport", es: "Transporte" },
      ostokset: { fi: "Ostokset", en: "Shopping", es: "Compras" },
      talviaktiviteetit: { fi: "Talviaktiviteetit", en: "Winter activities", es: "Actividades de invierno" },
      tapahtumapaikat: { fi: "Tapahtumapaikat", en: "Event venues", es: "Espacios para eventos" },
      "muut-palvelut": { fi: "Matkailupalvelut", en: "Visitor services", es: "Servicios para visitantes" },
      tapahtumat: { fi: "Tapahtumat", en: "Events", es: "Eventos" },
    }[categoryKey][locale];
    return {
      kind: item.kind ?? "provider",
      name: item.name[locale],
      description: item.description[locale],
      category,
      image: item.image,
      imageCredit: item.imageCredit,
      imageSource: item.imageSource,
      contact: item.contact,
      location: item.location[locale],
      website: item.websiteUrl,
      websiteLabel: item.kind === "resource"
        ? (locale === "fi" ? "Avaa virallinen kartta tai tietolähde" : locale === "es" ? "Abrir mapa o fuente oficial" : "Open official map or resource")
        : item.kind === "place"
          ? (locale === "fi" ? "Avaa kohteen viralliset tiedot" : locale === "es" ? "Abrir información oficial del lugar" : "Open official place information")
        : item.websiteUrl === "https://ksg.fi/fi/"
        ? (locale === "fi" ? "Avaa Kemiönsaaren yrityshakemisto" : locale === "es" ? "Abrir el directorio empresarial local" : "Open the local business directory")
        : item.websiteUrl.includes("ksg.fi")
          ? (locale === "fi" ? "Avaa palveluntarjoajan tiedot palveluoppaassa" : locale === "es" ? "Abrir ficha del proveedor" : "Open provider listing")
        : item.websiteUrl.includes("visitkimitoon.fi")
          ? (locale === "fi" ? "Avaa virallinen kohdekortti" : locale === "es" ? "Abrir ficha oficial del destino" : "Open official destination listing")
          : (locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit the provider"),
      tags: item.tags,
    };
  }
  return null;
}

type LocalPhoto = { src: string; alt: Record<Locale, string>; credit: string; source: string };
const mathildedalAreaPhotos: LocalPhoto[] = [
  { src: photoLibrary.mathildedalHarbour, alt: { fi: "Mathildedalin satama auringonlaskussa", en: "Mathildedal harbour at sunset", es: "Puerto de Mathildedal al atardecer" }, credit: "Kotivalo", source: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg" },
  { src: photoLibrary.mathildedalVillage, alt: { fi: "Mathildedalin historialliset työväenasunnot", en: "Historic workers’ houses in Mathildedal", es: "Antiguas viviendas de trabajadores en Mathildedal" }, credit: "Kotivalo", source: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg" },
];

const providerPhotoGalleries: Record<string, LocalPhoto[]> = {
  "salo-teijon-kammari": [
    { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/thumbnail_IMG_3168-1.jpg", alt: { fi: "Teijon Kammarin mökki", en: "Teijon Kammari cottage", es: "Cabaña Teijon Kammari" }, credit: "Salon Kohteet / Visit Salo", source: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/" },
    { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/thumbnail_IMG_3171.jpg", alt: { fi: "Teijon Kammarin merelle avautuva parveke", en: "Teijon Kammari balcony facing the sea", es: "Balcón de Teijon Kammari con vistas al mar" }, credit: "Salon Kohteet / Visit Salo", source: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/" },
    { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/IMG_0927-1152x768.jpg", alt: { fi: "Teijon Kammarin puulämmitteinen sauna", en: "Wood-fired sauna at Teijon Kammari", es: "Sauna de leña de Teijon Kammari" }, credit: "Salon Kohteet / Visit Salo", source: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/" },
    { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/sisalta-1152x768.jpg", alt: { fi: "Teijon Kammarin oleskelutila", en: "Teijon Kammari sitting room", es: "Sala de estar de Teijon Kammari" }, credit: "Salon Kohteet / Visit Salo", source: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/" },
  ],
  "salo-kruuvan-mokit": [
    { src: "https://www.kruuvanmokit.fi/wp-content/uploads/2022/08/Villa_Kruuva-45-1024x683.webp", alt: { fi: "Villa Kruuvan mökkimiljöö", en: "Villa Kruuva cottage setting", es: "Entorno de la casa rural Villa Kruuva" }, credit: "Kruuvan mökit", source: "https://www.kruuvanmokit.fi/" },
    { src: "https://www.kruuvanmokit.fi/wp-content/uploads/2022/08/Villa_Kruuva-olohuone-01-819x1024.webp", alt: { fi: "Villa Kruuvan olohuone", en: "Villa Kruuva living room", es: "Sala de estar de Villa Kruuva" }, credit: "Kruuvan mökit", source: "https://www.kruuvanmokit.fi/" },
    { src: "https://www.kruuvanmokit.fi/wp-content/uploads/2022/08/Villa_Kruuva-49-683x1024.webp", alt: { fi: "Villa Kruuvan sauna", en: "Villa Kruuva sauna", es: "Sauna de Villa Kruuva" }, credit: "Kruuvan mökit", source: "https://www.kruuvanmokit.fi/" },
    { src: "https://www.kruuvanmokit.fi/wp-content/uploads/2022/08/Villa_Kruuva-laituri-01-1024x683.webp", alt: { fi: "Villa Kruuvan oma ranta ja laituri", en: "Villa Kruuva private shore and pier", es: "Orilla privada y muelle de Villa Kruuva" }, credit: "Kruuvan mökit", source: "https://www.kruuvanmokit.fi/" },
  ],
  "salo-meri-veikko": [
    { src: "https://cdn.prod.website-files.com/6338042ae68560db6a16c66f/640089c860e1402211607476_Clipboard01%20151236%20re1.jpg", alt: { fi: "Meri-Veikon majoituskohteen kuva", en: "Meri-Veikko accommodation photo", es: "Fotografía del alojamiento Meri-Veikko" }, credit: "Saaristotila Lönnviken", source: "https://www.lonnviken.com/fi/meri-veikko" },
    { src: "https://cdn.prod.website-files.com/6338042ae68560db6a16c66f/640089c846690293640ca95c_8513_10x15%20re1.jpg", alt: { fi: "Meri-Veikon majoituskohteen kuva", en: "Meri-Veikko accommodation photo", es: "Fotografía del alojamiento Meri-Veikko" }, credit: "Saaristotila Lönnviken", source: "https://www.lonnviken.com/fi/meri-veikko" },
    { src: "https://cdn.prod.website-files.com/6338042ae68560db6a16c66f/640089c821542327e367b1d4_20220826_145501%20resized%201.jpg", alt: { fi: "Meri-Veikon majoituskohteen kuva", en: "Meri-Veikko accommodation photo", es: "Fotografía del alojamiento Meri-Veikko" }, credit: "Saaristotila Lönnviken", source: "https://www.lonnviken.com/fi/meri-veikko" },
    { src: "https://cdn.prod.website-files.com/6338042ae68560db6a16c66f/640089c89daa1781cc8f665c_20220825_202417%20re%205.jpg", alt: { fi: "Meri-Veikon majoituskohteen kuva", en: "Meri-Veikko accommodation photo", es: "Fotografía del alojamiento Meri-Veikko" }, credit: "Saaristotila Lönnviken", source: "https://www.lonnviken.com/fi/meri-veikko" },
  ],
  "kimitoon-db-hostel": [
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_173606-1024x781.jpg", alt:{fi:"DB Hostellin kahden hengen huone",en:"DB Hostel twin room",es:"Habitación doble de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_174601-1024x768.jpg", alt:{fi:"DB Hostellin neljän hengen huone parvekkeella",en:"DB Hostel four-person room with balcony",es:"Habitación para cuatro personas con balcón de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_173116-1024x768.jpg", alt:{fi:"DB Hostellin yhteinen olohuone",en:"DB Hostel shared living room",es:"Sala de estar compartida de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_172844-1024x768.jpg", alt:{fi:"DB Hostellin yhteiskeittiö",en:"DB Hostel shared kitchen",es:"Cocina compartida de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_172740-1024x768.jpg", alt:{fi:"DB Hostellin ruokailutila",en:"DB Hostel dining area",es:"Comedor de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_170519-1024x768.jpg", alt:{fi:"DB Hostellin wc- ja suihkutila",en:"DB Hostel toilet and shower facilities",es:"Aseo y ducha de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/05/20250524_174830-1024x768.jpg", alt:{fi:"DB Hostellin wc-tila",en:"DB Hostel toilet facilities",es:"Aseo de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" },
    { src:"https://www.dbhostel.fi/wp-content/uploads/2025/06/20250608_123954-1024x768.jpg", alt:{fi:"Näkymä DB Hostellin parvekkeelta",en:"View from DB Hostel balcony",es:"Vista desde el balcón de DB Hostel"}, credit:"DB Hostel", source:"https://www.dbhostel.fi/" }
  ],
  "kimitoon-bb-heedbacka": [
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/c02525b0-cfdf-11ed-8ed8-859d0a6307f5.jpeg-760x507.jpeg", alt:{fi:"Hembackan päärakennus ja pihapiiri",en:"Hembacka main building and courtyard",es:"Edificio principal y patio de Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/f71737e0-ee25-11f0-abc6-f3555c0b7a54.jpeg-760x790.jpeg", alt:{fi:"Hembackan virallisen kuvagallerian kuva",en:"Photo from Hembacka's official destination gallery",es:"Fotografía de la galería oficial de Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/b7ec25c0-ee26-11f0-abc6-f3555c0b7a54.jpeg-760x570.jpeg", alt:{fi:"Hembackan majoitusympäristö",en:"Hembacka accommodation surroundings",es:"Entorno del alojamiento Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/bf3e1450-ee26-11f0-abc6-f3555c0b7a54.jpeg-760x570.jpeg", alt:{fi:"Hembackan virallisen kuvagallerian kuva",en:"Photo from Hembacka's official destination gallery",es:"Fotografía de la galería oficial de Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/cab4a650-ee26-11f0-abc6-f3555c0b7a54.jpeg-760x570.jpeg", alt:{fi:"Hembackan virallisen kuvagallerian kuva",en:"Photo from Hembacka's official destination gallery",es:"Fotografía de la galería oficial de Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/d94c2760-ee26-11f0-abc6-f3555c0b7a54.jpeg-760x428.jpeg", alt:{fi:"Hembackan pihapiiri ja ympäristö",en:"Hembacka grounds and surroundings",es:"Terrenos y alrededores de Hembacka"}, credit:"Visit Kimitoön", source:"https://www.visitkimitoon.fi/en/destinations/b-b-hembacka/" }
  ],
  "kimitoon-ekniemi-holiday-village": [
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/4354f870-4a95-11f0-9fff-ed17829cd958.jpeg-760x1013.jpeg", alt:{fi:"Ekniemen lomakylän virallisen kuvagallerian pystysuuntainen kuva",en:"Portrait photo from Ekniemi Holiday Village's official gallery",es:"Fotografía vertical de la galería oficial de Ekniemi"}, credit:"Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/ekniemen-lomakyla-luonnonrauhaa-majoitusta-ja-elamyksia-meren-aarella/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/43554690-4a95-11f0-9fff-ed17829cd958.jpeg-760x570.jpeg", alt:{fi:"Ekniemen lomakylän ranta- ja vapaa-ajan ympäristö",en:"Beach and leisure surroundings at Ekniemi Holiday Village",es:"Playa y entorno recreativo de Ekniemi"}, credit:"Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/ekniemen-lomakyla-luonnonrauhaa-majoitusta-ja-elamyksia-meren-aarella/" }
  ],
  "kimitoon-merikruunu-hotel": [
    { src:"https://static.wixstatic.com/media/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg/v1/fill/w_382%2Ch_509%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/53869d_6f42583e26fc4ffb920ac44e2fc25ec2~mv2.jpg", alt:{fi:"Hotel Merikruunun ravintolan tapasannos",en:"Tapas served at Hotel Merikruunu's restaurant",es:"Tapas del restaurante Hotel Merikruunu"}, credit:"Hotel Merikruunu", source:"https://www.merikruunu.fi/ravintola" }
  ],
  "kimitoon-labbnas-lomakoti": [
    { src:"https://ksg.fi/wp-content/uploads/2026/01/1-1024x768.jpeg", alt:{fi:"Labbnäsin Lomakodin kuva",en:"Labbnäs Holiday Home photo",es:"Imagen del alojamiento Labbnäs"}, credit:"Labbnäs", source:"https://ksg.fi/fi/foretag/labbnas-semesterhem/" },
    { src:"https://ksg.fi/wp-content/uploads/2026/01/sommar-kalas-i-lidret--1024x683.jpg", alt:{fi:"Labbnäsin juhlatilan kuva",en:"Labbnäs event venue photo",es:"Imagen del espacio para eventos de Labbnäs"}, credit:"Labbnäs", source:"https://ksg.fi/fi/foretag/labbnas-semesterhem/" }
  ],
  "kimitoon-storfinnhova-gard": [
    { src:"https://ksg.fi/wp-content/uploads/2026/01/080925-Kemio-tilakuvat-web-98-1024x683.jpg", alt:{fi:"Storfinnhova Gårdin kuva",en:"Storfinnhova Gård photo",es:"Imagen de Storfinnhova Gård"}, credit:"Storfinnhova Gård", source:"https://ksg.fi/fi/foretag/storfinnhova-gard/" }
  ],
  "kimitoon-ragnar-antonin-lomakyla": [
    { src:"https://ksg.fi/wp-content/uploads/2026/01/FB_IMG_1777478656693.jpg", alt:{fi:"Ragnar Antonin Lomakylän kuva",en:"Ragnar Anton's Holiday Village photo",es:"Imagen del complejo Ragnar Anton"}, credit:"Ragnar Antonin Lomakylä", source:"https://ksg.fi/fi/foretag/ragnar-antons-semesterby/" },
    { src:"https://ksg.fi/wp-content/uploads/2026/01/FB_IMG_1358697435524384743-576x1024.jpg", alt:{fi:"Ragnar Antonin Lomakylän toinen kuva",en:"Another photo of Ragnar Anton's Holiday Village",es:"Otra imagen del complejo Ragnar Anton"}, credit:"Ragnar Antonin Lomakylä", source:"https://ksg.fi/fi/foretag/ragnar-antons-semesterby/" }
  ],
  "kimitoon-oro-linnakesaari-provider": [
    { src:"https://ksg.fi/wp-content/uploads/2026/01/Skagen_vaaka2-1024x765.webp", alt:{fi:"Örön linnakesaaren kuva",en:"Örö Fortress Island photo",es:"Imagen de la isla fortificada de Örö"}, credit:"Örö", source:"https://ksg.fi/fi/foretag/oro-kustfort/" },
    { src:"https://ksg.fi/wp-content/uploads/2026/01/482064530_947449190922927_922543115025975695_n-737x1024.jpg", alt:{fi:"Örön linnakesaaren toinen kuva",en:"Another photo of Örö Fortress Island",es:"Otra imagen de la isla fortificada de Örö"}, credit:"Örö", source:"https://ksg.fi/fi/foretag/oro-kustfort/" }
  ],
  "kimitoon-finlandia-sailing": [
    { src:"https://ksg.fi/wp-content/uploads/2026/01/Istuinkaukalo-kuva-1024x683.jpg", alt:{fi:"Finlandia Sailingin veneen istuinalue",en:"Seating area aboard a Finlandia Sailing boat",es:"Zona de asientos de una embarcación de Finlandia Sailing"}, credit:"Finlandia Sailing", source:"https://ksg.fi/fi/foretag/finlandia-sailing-ab-oy-kasnas/" },
    { src:"https://ksg.fi/wp-content/uploads/2026/01/Finlandia-Sailing-boat-place-numbers-1-11-and-outside-1024x768.jpg", alt:{fi:"Finlandia Sailingin veneen kansi ja paikat",en:"Deck and seating aboard a Finlandia Sailing boat",es:"Cubierta y plazas de una embarcación de Finlandia Sailing"}, credit:"Finlandia Sailing", source:"https://ksg.fi/fi/foretag/finlandia-sailing-ab-oy-kasnas/" }
  ],
  "kimitoon-cafe-dacapo": [
    { src:"https://ksg.fi/wp-content/uploads/2026/02/485747364_1155400309705092_5304925938808327852_n-768x1024.jpg", alt:{fi:"Café DaCapon kuva",en:"Café DaCapo photo",es:"Imagen de Café DaCapo"}, credit:"Café DaCapo", source:"https://ksg.fi/fi/foretag/cafe-dacapo-2/" },
    { src:"https://ksg.fi/wp-content/uploads/2026/02/52156733_791862431190548_4193037186511142912_n.jpg", alt:{fi:"Café DaCapon toinen kuva",en:"Another Café DaCapo photo",es:"Otra imagen de Café DaCapo"}, credit:"Café DaCapo", source:"https://ksg.fi/fi/foretag/cafe-dacapo-2/" }
  ],
  "kimitoon-farmors-cafe": [
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/301a8cd0-49e9-11f1-acb5-5ba5e2fcebfb.jpeg-760x1140.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/301a8cd1-49e9-11f1-acb5-5ba5e2fcebfb.jpeg-760x1140.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/301ab3e0-49e9-11f1-acb5-5ba5e2fcebfb.jpeg-760x1140.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/301ab3e1-49e9-11f1-acb5-5ba5e2fcebfb.jpeg-760x1140.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/1def76a0-55cf-11f1-a99c-e5a59b9f35a4.jpeg-760x507.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" },
    { src:"https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/1def9db0-55cf-11f1-a99c-e5a59b9f35a4.jpeg-760x1140.jpeg", alt:{fi:"Farmors Café – virallisen kuvagallerian kuva",en:"Farmors Café – official gallery image",es:"Farmors Café – imagen de la galería oficial"}, credit:"Farmors Café / Visit Kemiönsaari", source:"https://www.visitkimitoon.fi/fi/kohteet/farmors-cafe-2/" }
  ],
  "kimitoon-villa-mimosa-37": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/7bc353c0-7393-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Mimosa – oleskelutilat ja merellinen huvila", en: "Villa Mimosa – living spaces and seaside villa", es: "Villa Mimosa – espacios interiores y villa junto al mar" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-mimosa-37-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/7bc32cb0-7393-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Mimosa – huvilan sisätilat", en: "Villa Mimosa – villa interior", es: "Villa Mimosa – interior de la villa" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-mimosa-37-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/7bc2b780-7393-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Mimosa – makuutilat", en: "Villa Mimosa – sleeping area", es: "Villa Mimosa – zona de descanso" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-mimosa-37-2/" }
  ],
  "kimitoon-villa-orion-57": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/f2046080-7391-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Orion – sisätilat", en: "Villa Orion – interior", es: "Villa Orion – interior" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-orion-57-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/93173ac0-7391-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Orion – huvila ja oleskelutila", en: "Villa Orion – villa and lounge", es: "Villa Orion – villa y sala de estar" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-orion-57-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/a6d7afe0-7391-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Orion – terassialue", en: "Villa Orion – terrace area", es: "Villa Orion – zona de terraza" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-orion-57-2/" }
  ],
  "kimitoon-villa-pohjantahti-18": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/616e6920-7392-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Pohjantähti – oleskelutila", en: "Villa Pohjantähti – living area", es: "Villa Pohjantähti – sala de estar" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-pohjantahti-18-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/616eb740-7392-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Pohjantähti – makuutila", en: "Villa Pohjantähti – sleeping area", es: "Villa Pohjantähti – zona de descanso" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-pohjantahti-18-2/" },
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/616f0560-7392-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Pohjantähti – sauna ja pesutilat", en: "Villa Pohjantähti – sauna and washroom", es: "Villa Pohjantähti – sauna y baño" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-pohjantahti-18-2/" }
  ],
  "kimitoon-villa-sirius-56": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/1d7ef120-7393-11ef-acbd-2156ce35ca31.jpeg-760x507.jpeg", alt: { fi: "Villa Sirius – huvilan sisätilat", en: "Villa Sirius – villa interior", es: "Villa Sirius – interior de la villa" }, credit: "Visit Kemiönsaari / Merikruunu", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-sirius-56-2/" }
  ],
  "kimitoon-villa-ulrika": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/dd26d0e0-fc17-11ee-95fa-33f7dd2e7fc6.jpeg-760x570.jpeg", alt: { fi: "Villa Ulrika – majoitustilan kuva", en: "Villa Ulrika – accommodation interior", es: "Villa Ulrika – interior del alojamiento" }, credit: "Visit Kemiönsaari", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-ulrika-2/" }
  ],
  "kimitoon-villa-valo-9": [
    { src: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/kemionsaari-datahub/25513420-17f1-11ee-aef2-f342e71dcccc.jpeg-760x760.jpeg", alt: { fi: "Villa Valo – majoituskohteen kuva", en: "Villa Valo – accommodation photo", es: "Villa Valo – imagen del alojamiento" }, credit: "Visit Kemiönsaari", source: "https://www.visitkimitoon.fi/fi/kohteet/villa-valo-9-2/" }
  ],
  "salo-ravintola-terho": [
    { src: "https://static.wixstatic.com/media/684b51_9e9c0f2aaa0e47b98c7fac7ec58c40df~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_9e9c0f2aaa0e47b98c7fac7ec58c40df~mv2.jpg", alt: { fi: "Asiakkaita nauttimassa Terhon takapihan keikkaillasta", en: "Guests enjoying a live-music evening in Terho's backyard", es: "Clientes disfrutando de una noche de música en directo en el patio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_ef3379734b144d43bfadcd454368a546~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_ef3379734b144d43bfadcd454368a546~mv2.jpg", alt: { fi: "Terhon ikkuna ja köynnöskasvit ravintolan ulkoseinällä", en: "The window and climbing vines on Terho's restaurant exterior", es: "Ventana y plantas trepadoras en la fachada del restaurante Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_27bfee4101a34500a147cff0d225341a~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_27bfee4101a34500a147cff0d225341a~mv2.jpg", alt: { fi: "Yleisö seuraamassa keikkaa Terhon takapihalla", en: "Audience watching a live performance in Terho's backyard", es: "Público viendo una actuación en directo en el patio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_8848b144df924991a269607232bb92ac~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_8848b144df924991a269607232bb92ac~mv2.jpg", alt: { fi: "Terhon takapihan terassi täynnä asiakkaita", en: "Terho's backyard terrace filled with guests", es: "Terraza del patio de Terho llena de clientes" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/5e5929_c36ae105fdc743b998042f60cb1d4d69~mv2.jpg/v1/fill/w_702%2Ch_496%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/_DSC0416.jpg", alt: { fi: "Terhon oman paahtimon kahvi", en: "Coffee from Terho's own roastery", es: "Café del tostador propio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/43c9db_106f9b1e0bf94dc5ba9f699b8a55f4d6~mv2.jpg/v1/fill/w_871%2Ch_553%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/terho-web-71_edited.jpg", alt: { fi: "Terhon pizza ja paikallinen juoma", en: "Pizza and a local drink at Terho", es: "Pizza y bebida local en Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" }
  ]
};
const teijoMasuuniPhotos: LocalPhoto[] = [
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/Paviljonki-1024x779.jpg", alt: { fi: "Teijon Masuunin paviljonki historiallisessa ruukkimiljöössä", en: "Teijo Masuuni pavilion in the historic ironworks setting", es: "Pabellón de Teijo Masuuni en el entorno histórico de la ferrería" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" },
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/P6290434-1-1024x844.jpg", alt: { fi: "Teijon Masuunin kahvila ja historiallinen masuunirakenne", en: "Teijo Masuuni café and historic blast-furnace structure", es: "Cafetería de Teijo Masuuni y estructura histórica del alto horno" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" },
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/IMG_5245-1024x731.jpg", alt: { fi: "Teijon Masuunin historiallinen sisätila", en: "Historic interior at Teijo Masuuni", es: "Interior histórico de Teijo Masuuni" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" },
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/16107548_1364868076917824_8770303024311624317_o-1024x991.jpg", alt: { fi: "Teijon Masuunin ruukkimiljöö", en: "The ironworks setting at Teijo Masuuni", es: "Entorno de la antigua ferrería de Teijo Masuuni" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" },
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/IMG_2027-1024x819.jpg", alt: { fi: "Teijon Masuunin näyttely- ja kahvilaympäristö", en: "Exhibition and café setting at Teijo Masuuni", es: "Espacio de exposiciones y cafetería de Teijo Masuuni" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" },
  { src: "https://www.teijonmasuuni.fi/wp-content/uploads/2022/03/focaccia-1-scaled.jpg", alt: { fi: "Masuunin kahvilan focaccia-leipä", en: "Focaccia at the Masuuni café", es: "Focaccia de la cafetería Masuuni" }, credit: "Teijon Masuuni", source: "https://www.teijonmasuuni.fi/kahvila/" }
];

const teijoRelated = [
  { slug: "salo-teijo-action-park", name: { fi: "Teijo Ski & Action Park", en: "Teijo Ski & Action Park", es: "Teijo Ski & Action Park" } },
  { slug: "salo-teijo-national-park", name: { fi: "Teijon kansallispuisto", en: "Teijo National Park", es: "Parque Nacional de Teijo" } },
  { slug: "salo-meri-teijo-golf", name: { fi: "Meri-Teijo Golf", en: "Meri-Teijo Golf", es: "Meri-Teijo Golf" } }
];

type LocalGuide = { intro: string; highlights: string[]; planning: string; highlightsTitle: string; planningTitle: string; nearbyTitle: string };

const mathildedalGuides: Record<string, Record<Locale, LocalGuide>> = {
  "salo-hotel-mathildedal": {
    fi: { intro: "Hotel Mathildedal on pieni boutique-hotelli historiallisessa Mathildedalin ruukkikylässä. Tämä alasivu kokoaa hotellin olennaisen tiedon ja auttaa yhdistämään majoituksen kylän muihin vierailukohteisiin.", highlights: ["Boutique-majoitus historiallisessa ruukkikylässä", "Teijon kansallispuiston läheisyys", "Mahdollisuus tutustua kylän ravintoloihin, putiikkeihin ja paikallisiin elämyksiin"], planning: "Huonetyypit, ajantasaiset hinnat, aamiainen, sisäänkirjautuminen, esteettömyys ja saatavuus on tarkistettava suoraan hotellilta ennen varausta.", highlightsTitle: "Mikä tekee kohteesta kiinnostavan?", planningTitle: "Ennen vierailua", nearbyTitle: "Tutustu myös Mathildedaliin" },
    en: { intro: "Hotel Mathildedal is a small boutique hotel in the historic Mathildedal ironworks village. This page brings together the key information and helps you combine a stay with other places in the village.", highlights: ["Boutique accommodation in a historic ironworks village", "Close to Teijo National Park", "Explore village restaurants, independent shops and local experiences"], planning: "Confirm room types, current rates, breakfast, check-in, accessibility and availability directly with the hotel before booking.", highlightsTitle: "What makes it worth a visit?", planningTitle: "Before you visit", nearbyTitle: "Explore Mathildedal too" },
    es: { intro: "Hotel Mathildedal es un pequeño hotel boutique en el histórico pueblo siderúrgico de Mathildedal. Esta página reúne la información principal y ayuda a combinar la estancia con otros lugares del pueblo.", highlights: ["Alojamiento boutique en un pueblo siderúrgico histórico", "Cerca del Parque Nacional de Teijo", "Descubre restaurantes, tiendas independientes y experiencias locales"], planning: "Confirma directamente con el hotel los tipos de habitación, tarifas actuales, desayuno, entrada, accesibilidad y disponibilidad antes de reservar.", highlightsTitle: "¿Qué lo hace especial?", planningTitle: "Antes de la visita", nearbyTitle: "Descubre también Mathildedal" }
  },
  "salo-mathildan-marina": {
    fi: { intro: "Mathildan Marina yhdistää sataman, majoituksen, ravintolan ja saunat meren äärellä. Kohde sopii matkailijalle, joka haluaa tutustua Mathildedaliin merellisestä lähtöpisteestä.", highlights: ["Satamahotelli ja vierasvenesatama", "Ravintola ja saunaosasto", "Majoitusvaihtoehto veneellä tai maitse saapuvalle"], planning: "Tarkista suoraan Marinalta huoneiden ja saunojen saatavuus, ravintolan aukiolo, satamapaikat, pysäköinti sekä palvelukohtaiset hinnat.", highlightsTitle: "Palvelut ja tunnelma", planningTitle: "Suunnittele vierailu", nearbyTitle: "Lähialueen kohteet" },
    en: { intro: "Mathildan Marina brings together a harbour, accommodation, a restaurant and saunas by the sea. It is a useful starting point for exploring Mathildedal from the waterfront.", highlights: ["Harbour hotel and guest marina", "Restaurant and sauna facilities", "A place to stay whether arriving by boat or by land"], planning: "Check room and sauna availability, restaurant opening times, berths, parking and service-specific prices directly with the Marina.", highlightsTitle: "Facilities and atmosphere", planningTitle: "Plan your visit", nearbyTitle: "Places nearby" },
    es: { intro: "Mathildan Marina reúne puerto, alojamiento, restaurante y saunas junto al mar. Es un buen punto de partida para descubrir Mathildedal desde el paseo marítimo.", highlights: ["Hotel junto al puerto y marina para visitantes", "Restaurante y saunas", "Alojamiento tanto para quienes llegan en barco como por carretera"], planning: "Consulta directamente con Marina la disponibilidad de habitaciones y saunas, los horarios del restaurante, los amarres, el aparcamiento y los precios de cada servicio.", highlightsTitle: "Servicios y ambiente", planningTitle: "Planifica la visita", nearbyTitle: "Lugares cercanos" }
  },
  "salo-matri-house": {
    fi: { intro: "Matri House on historiallinen boutique-majoituskohde Mathildedalin sydämessä. Sen vuonna 1840 rakennettu talo ja yksilölliset huoneet tuovat majoitukseen oman luonteensa.", highlights: ["Vuonna 1840 rakennettu historiallinen talo", "Kuusi yksilöllistä huonetta", "Sijainti Mathildedalin kylämiljöössä"], planning: "Varmista suoraan Matri Houselta huoneiden varustelu, saatavuus, hinnat, sisäänkirjautumisohjeet ja mahdolliset erityistarpeet.", highlightsTitle: "Kohteen erityispiirteet", planningTitle: "Hyvä tietää ennen varausta", nearbyTitle: "Yhdistä vierailuun" },
    en: { intro: "Matri House is a historic boutique stay in the heart of Mathildedal. Its 1840 building and individually designed rooms give the accommodation a distinctive character.", highlights: ["Historic building dating to 1840", "Six individually styled rooms", "Set within Mathildedal village"], planning: "Confirm room facilities, availability, rates, check-in instructions and any special requirements directly with Matri House.", highlightsTitle: "What defines the stay", planningTitle: "Before booking", nearbyTitle: "Combine your visit with" },
    es: { intro: "Matri House es un alojamiento boutique histórico en el corazón de Mathildedal. Su edificio de 1840 y sus habitaciones individuales le dan un carácter propio.", highlights: ["Edificio histórico de 1840", "Seis habitaciones con diseño individual", "Ubicación en el pueblo de Mathildedal"], planning: "Confirma directamente con Matri House el equipamiento de las habitaciones, la disponibilidad, las tarifas, las instrucciones de llegada y cualquier necesidad especial.", highlightsTitle: "Características del alojamiento", planningTitle: "Antes de reservar", nearbyTitle: "Combina la visita con" }
  },
  "salo-matilda-villas": {
    fi: { intro: "Matilda Villas tarjoaa huvila- ja mökkimajoitusta Mathildedalin merellisessä ympäristössä. Kohteen kuvaus ja varausvaihtoehdot kannattaa tarkistaa suoraan majoittajalta, jotta seurueelle sopiva kokonaisuus löytyy.", highlights: ["Mökkimajoitusta meren tuntumassa", "Kohde sopii oman majoitusratkaisun etsivälle seurueelle", "Mathildedal ja Teijon alue ovat tutustuttavissa saman vierailun aikana"], planning: "Tarkista majoitusyksikön koko, vuodepaikat, varustelu, ranta- ja yhteiskäyttöalueiden ehdot, hinnat sekä saatavuus suoraan palveluntarjoajalta.", highlightsTitle: "Majoituksen vahvuudet", planningTitle: "Tarkista ennen varausta", nearbyTitle: "Tutustu myös alueeseen" },
    en: { intro: "Matilda Villas offers villa and cottage accommodation in the coastal surroundings of Mathildedal. Check the provider's current descriptions and booking options directly to find the right fit for your group.", highlights: ["Cottage-style stays close to the sea", "An option for groups seeking their own accommodation", "Mathildedal and the wider Teijo area can be explored on the same visit"], planning: "Confirm the unit size, beds, facilities, terms for beach and shared areas, rates and availability directly with the provider.", highlightsTitle: "Accommodation highlights", planningTitle: "Check before booking", nearbyTitle: "Explore the wider area" },
    es: { intro: "Matilda Villas ofrece alojamiento en villas y cabañas en el entorno costero de Mathildedal. Consulta directamente la descripción actual y las opciones de reserva para elegir la alternativa adecuada para tu grupo.", highlights: ["Alojamiento tipo cabaña cerca del mar", "Una opción para grupos que buscan alojamiento propio", "Mathildedal y la zona de Teijo se pueden explorar en la misma visita"], planning: "Confirma directamente con el proveedor el tamaño de la unidad, las camas, el equipamiento, las condiciones de la playa y las zonas comunes, las tarifas y la disponibilidad.", highlightsTitle: "Ventajas del alojamiento", planningTitle: "Comprueba antes de reservar", nearbyTitle: "Explora también la zona" }
  },
  "salo-majoitus-mathildedal": {
    fi: { intro: "Majoitus Mathildedal on 84 m²:n lomamökki, jossa kuvauksen mukaan on kaksi makuuhuonetta, parvi, olohuone-keittiö, sauna ja terassi. Ilmoitettu majoituskapasiteetti ja lisämajoituksen ehdot tulee vahvistaa majoittajalta.", highlights: ["84 m²:n lomamökki", "Kaksi makuuhuonetta, parvi, sauna ja terassi", "Kuvauksen mukaan ulkoporeammeen käyttö sisältyy vuokraan"], planning: "Varmista ennen varausta henkilömäärä, lisämajoituksen ehdot, poreammeen käyttö, yksityisen rannan käyttöehdot, hinta ja saatavuus suoraan majoittajalta.", highlightsTitle: "Mökin ominaisuudet", planningTitle: "Tärkeää ennen varausta", nearbyTitle: "Lisää tekemistä vierailulle" },
    en: { intro: "Majoitus Mathildedal is an 84 m² holiday cottage described as having two bedrooms, a loft, an open-plan living room and kitchen, a sauna and a terrace. Confirm the stated capacity and any extra accommodation directly with the host.", highlights: ["An 84 m² holiday cottage", "Two bedrooms, a loft, sauna and terrace", "The listing says use of an outdoor hot tub is included"], planning: "Before booking, confirm guest capacity, extra accommodation terms, hot tub use, private beach conditions, rates and availability directly with the host.", highlightsTitle: "Cottage features", planningTitle: "Important before booking", nearbyTitle: "Add more to your visit" },
    es: { intro: "Majoitus Mathildedal es una casa vacacional de 84 m² que, según la descripción, dispone de dos dormitorios, altillo, salón-cocina, sauna y terraza. Confirma con el anfitrión la capacidad indicada y las condiciones del alojamiento adicional.", highlights: ["Casa vacacional de 84 m²", "Dos dormitorios, altillo, sauna y terraza", "El anuncio indica que se incluye el uso de una bañera de hidromasaje exterior"], planning: "Antes de reservar, confirma directamente con el anfitrión la capacidad, las condiciones del alojamiento adicional, el uso del jacuzzi, las condiciones de la playa privada, las tarifas y la disponibilidad.", highlightsTitle: "Características de la casa", planningTitle: "Importante antes de reservar", nearbyTitle: "Completa tu visita" }
  },
  "salo-mathildedal-brewery": {
    fi: { intro: "Mathildedalin Kyläpanimo on kyläläisten perustama pienpanimo ruukkikylän sydämessä. Se tuo paikallisen juomakulttuurin osaksi Mathildedalin kyläelämää.", highlights: ["Paikallinen pienpanimo", "Sijainti historiallisessa ruukkikylässä", "Ryhmille voidaan järjestää panimoesittelyjä palveluntarjoajan ilmoituksen mukaan"], planning: "Tarkista panimolta ajantasaiset aukioloajat, tuotteiden saatavuus, mahdolliset maistelut ja ryhmävierailujen ehdot. Ikärajat ja myyntiehdot määräytyvät palveluntarjoajan mukaan.", highlightsTitle: "Paikallinen makuelämys", planningTitle: "Vierailun käytännöt", nearbyTitle: "Löydä kylän muut palvelut" },
    en: { intro: "Mathildedal Village Brewery is a small brewery founded by local residents in the heart of the ironworks village. It adds local drinks culture to the village experience.", highlights: ["A local small brewery", "Located in the historic ironworks village", "The provider lists brewery introductions for groups"], planning: "Check current opening times, product availability, tastings and group-visit arrangements with the brewery. Age limits and sales terms are set by the provider.", highlightsTitle: "A local taste", planningTitle: "Practical visit details", nearbyTitle: "Discover other village services" },
    es: { intro: "Mathildedal Village Brewery es una pequeña cervecería fundada por vecinos en el corazón del pueblo siderúrgico. Forma parte de la cultura local de bebidas y de la vida del pueblo.", highlights: ["Pequeña cervecería local", "Situada en el histórico pueblo siderúrgico", "El proveedor ofrece presentaciones de la cervecería para grupos"], planning: "Consulta con la cervecería los horarios actuales, la disponibilidad de productos, las degustaciones y las visitas para grupos. Los límites de edad y las condiciones de venta los establece el proveedor.", highlightsTitle: "Sabores locales", planningTitle: "Información práctica", nearbyTitle: "Descubre otros servicios del pueblo" }
  },
  "salo-ravintola-terho": {
    fi: { intro: "Kyläravintola Terho on Mathildedalin rento kohtaamispaikka. Sen omalla sivustolla esitellään kiviarinauunissa paistetut pizzat, kylän pienpanimojuomat, oma kahvipaahtimo sekä takapihan keikat.", highlights: ["Kiviarinauunissa paistetut pizzat", "Oman paahtimon kahvi ja paikallisia juomia", "Livekeikkoja ja tapahtumia kylän yhteisessä olohuoneessa"], planning: "Tarkista ajantasaiset aukioloajat, keittiön palveluajat, ruokalista, tapahtumat ja pöytävaraukset suoraan Terhon omalta verkkosivulta.", highlightsTitle: "Terhon tunnelma ja maut", planningTitle: "Ennen vierailua", nearbyTitle: "Tutustu myös Mathildedaliin" },
    en: { intro: "Restaurant Terho is Mathildedal's relaxed village meeting place. Its own website highlights stone-deck oven pizzas, locally brewed drinks, an in-house coffee roastery and live music in the backyard.", highlights: ["Stone-deck oven pizzas", "Coffee from its own roastery and local drinks", "Live music and events in the village's communal living room"], planning: "Check current opening and kitchen hours, the menu, events and table reservations directly on Terho's own website.", highlightsTitle: "Terho's atmosphere and flavours", planningTitle: "Before you visit", nearbyTitle: "Explore Mathildedal too" },
    es: { intro: "El restaurante Terho es un punto de encuentro relajado en Mathildedal. Su web presenta pizzas al horno de piedra, bebidas elaboradas localmente, su propio tostador de café y música en directo en el patio.", highlights: ["Pizzas horneadas en horno de piedra", "Café de su propio tostador y bebidas locales", "Música en directo y eventos en el punto de encuentro del pueblo"], planning: "Consulta directamente en la web de Terho los horarios actuales, el horario de cocina, la carta, los eventos y las reservas.", highlightsTitle: "Ambiente y sabores de Terho", planningTitle: "Antes de la visita", nearbyTitle: "Descubre también Mathildedal" }
  },
  "directory-bistro-bruket": {
    fi: { intro: "Bistro Bruket on Mathildedalin ruukkikylään liittyvä ravintolakohde. Sen oma verkkosivusto ja ajantasainen palvelutarjonta kannattaa tarkistaa ennen vierailua.", highlights: ["Ravintola Mathildedalin ruukkikylässä", "Kuvauksen mukaan painotus on sesongeissa ja lähiraaka-aineissa", "Helppo yhdistää kylässä kiertelyyn ja muihin paikallisiin kohteisiin"], planning: "Varmista suoraan ravintolalta aukioloajat, ruokalista, pöytävaraukset, erityisruokavaliot ja ajantasaiset hinnat.", highlightsTitle: "Ruokailu kylässä", planningTitle: "Ennen ravintolavierailua", nearbyTitle: "Yhdistä muihin kohteisiin" },
    en: { intro: "Bistro Bruket is a restaurant associated with Mathildedal's ironworks village. Check its own website for current service details before visiting.", highlights: ["A restaurant in Mathildedal's ironworks village", "The listing describes a focus on seasonal and local ingredients", "Easy to combine with a walk around the village and other local places"], planning: "Confirm opening times, menu, table reservations, dietary requirements and current prices directly with the restaurant.", highlightsTitle: "Dining in the village", planningTitle: "Before dining", nearbyTitle: "Combine with other places" },
    es: { intro: "Bistro Bruket es un restaurante vinculado al pueblo siderúrgico de Mathildedal. Consulta su propia web para conocer los servicios actuales antes de visitarlo.", highlights: ["Restaurante en el pueblo siderúrgico de Mathildedal", "La ficha destaca los productos locales y de temporada", "Se puede combinar con un paseo por el pueblo y otros lugares locales"], planning: "Confirma directamente con el restaurante los horarios, el menú, las reservas, las necesidades dietéticas y los precios actuales.", highlightsTitle: "Comer en el pueblo", planningTitle: "Antes de ir al restaurante", nearbyTitle: "Combínalo con otros lugares" }
  }
};

const teijoGuides: Record<string, Record<Locale, LocalGuide>> = {
  "salo-teijon-masuuni": {
    fi: { intro: "Teijon Masuuni toimii vuonna 1686 perustetun ruukin historiallisessa miljöössä. Paikalla yhdistyvät vanha masuuni, vaihtuvat taidenäyttelyt, kahvila, taide- ja käsityöputiikki sekä pienyrittäjien työtilat.", highlights: ["Viisi erilaista näyttelytilaa ja vaihtuvia näyttelyitä", "Paikan päällä valmistettuja makeita ja suolaisia leivonnaisia sekä erikoiskahveja", "Taide- ja käsityöputiikki, tapahtumia ja ryhmävierailuja"], planning: "Tarkista ajankohtaiset näyttelyt, kahvilan aukiolo, tapahtumat ja ryhmävierailujen järjestelyt suoraan Teijon Masuunilta. Näyttelyihin on virallisen sivuston mukaan vapaa pääsy.", highlightsTitle: "Taide, kahvila ja ruukkihistoria", planningTitle: "Suunnittele vierailu", nearbyTitle: "Tutustu myös Teijon alueeseen" },
    en: { intro: "Teijo Masuuni is set in the historic ironworks founded in 1686. The site brings together the old blast furnace, changing art exhibitions, a café, an art and craft shop and workspaces for independent makers.", highlights: ["Five exhibition spaces with changing exhibitions", "Sweet and savoury pastries made on site, plus speciality coffee", "An art and craft shop, events and group visits"], planning: "Check current exhibitions, café opening times, events and group-visit arrangements directly with Teijo Masuuni. The official website states that admission to exhibitions is free.", highlightsTitle: "Art, café and ironworks heritage", planningTitle: "Plan your visit", nearbyTitle: "Explore the Teijo area" },
    es: { intro: "Teijo Masuuni se encuentra en el histórico recinto siderúrgico fundado en 1686. Reúne el antiguo alto horno, exposiciones de arte cambiantes, una cafetería, una tienda de arte y artesanía y talleres de creadores independientes.", highlights: ["Cinco espacios expositivos con muestras temporales", "Repostería dulce y salada elaborada allí mismo y café especial", "Tienda de arte y artesanía, eventos y visitas para grupos"], planning: "Consulta directamente con Teijo Masuuni las exposiciones actuales, el horario de la cafetería, los eventos y las visitas para grupos. La web oficial indica que la entrada a las exposiciones es gratuita.", highlightsTitle: "Arte, cafetería y patrimonio industrial", planningTitle: "Planifica la visita", nearbyTitle: "Descubre también la zona de Teijo" }
  }
};

const mathildedalRelated = [
  { slug: "salo-hotel-mathildedal", name: { fi: "Hotel Mathildedal", en: "Hotel Mathildedal", es: "Hotel Mathildedal" } },
  { slug: "salo-mathildan-marina", name: { fi: "Mathildan Marina", en: "Mathildan Marina", es: "Mathildan Marina" } },
  { slug: "salo-matri-house", name: { fi: "Matri House", en: "Matri House", es: "Matri House" } },
  { slug: "salo-matilda-villas", name: { fi: "Matilda Villas", en: "Matilda Villas", es: "Matilda Villas" } },
  { slug: "salo-majoitus-mathildedal", name: { fi: "Majoitus Mathildedal", en: "Accommodation in Mathildedal", es: "Alojamiento en Mathildedal" } },
  { slug: "salo-mathildedal-brewery", name: { fi: "Mathildedalin Kyläpanimo", en: "Mathildedal Village Brewery", es: "Cervecería de Mathildedal" } },
  { slug: "salo-ravintola-terho", name: { fi: "Ravintola Terho", en: "Restaurant Terho", es: "Restaurante Terho" } },
  { slug: "directory-bistro-bruket", name: { fi: "Bistro Bruket", en: "Bistro Bruket", es: "Bistro Bruket" } }
];

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

export default async function ProviderDetailPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<{ from?: string | string[] }> }) {
  const { locale: rawLocale, slug } = await params;
  const { from } = await searchParams;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const provider = resolveProvider(slug, locale);
  if (!provider) notFound();
  const kimitoonProvider = slug.startsWith("kimitoon-") ? getKimitoonProvider(slug.slice("kimitoon-".length)) : null;
  const requestedCategory = Array.isArray(from) ? from[0] : from;
  const returnCategory = kimitoonProvider && requestedCategory && kimitoonProvider.categories.includes(requestedCategory as KimitoonCategory)
    ? requestedCategory as KimitoonCategory
    : kimitoonProvider?.categories[0];
  const relatedKimitoonProviders = kimitoonProvider
    ? getKimitoonProviders(returnCategory).filter((place) => place.id !== kimitoonProvider.id).slice(0, 4)
    : [];
  const c = copy[locale];

  return (
    <main className="min-w-0 overflow-hidden bg-white text-brand-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": provider.kind === "resource" ? "WebPage" : provider.kind === "place" ? "TouristAttraction" : "LocalBusiness",
        name: provider.name,
        description: provider.description,
        url: provider.website,
        image: provider.image ? [provider.image] : undefined,
        ...(provider.kind !== "resource" ? { address: { "@type": "PostalAddress", addressLocality: provider.location, addressCountry: "FI" } } : {}),
      }).replace(/</g, "\\u003c") }} />
      <section className="relative isolate min-h-[42svh] overflow-hidden bg-brand-950 text-white sm:min-h-[54svh]">
        {provider.image ? <Image src={provider.image} alt={provider.name} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[42svh] min-w-0 items-end py-8 sm:min-h-[54svh] sm:py-14">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Link href={slug.startsWith("kimitoon-") ? (returnCategory ? `/${locale}/destinations/kemionsaari/${returnCategory}` : `/${locale}/kimitoon`) : `/${locale}/destinations`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:bg-black/40">
                <ArrowLeft className="h-4 w-4" />{slug.startsWith("kimitoon-") ? (locale === "fi" ? "Takaisin tähän teemaan" : locale === "es" ? "Volver a esta categoría" : "Back to this category") : c.back}
              </Link>
              {slug.startsWith("kimitoon-") ? <Link href={`/${locale}/kimitoon`} className="inline-flex rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:bg-black/40">{locale === "fi" ? "Kemiönsaaren pääopas" : locale === "es" ? "Guía principal de Kimitoön" : "Kimitoön main guide"}</Link> : null}
            </div>
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
          {(() => {
            const isSaloProvider = slug.startsWith("salo-");
            const guide = mathildedalGuides[slug]?.[locale] || teijoGuides[slug]?.[locale] || (isSaloProvider ? {
              intro: provider.description,
              highlightsTitle: locale === "fi" ? "Kohteen palvelut" : locale === "es" ? "Servicios del lugar" : "What the provider offers",
              highlights: [] as string[],
              planningTitle: locale === "fi" ? "Hyvä tietää ennen vierailua" : locale === "es" ? "Antes de la visita" : "Before your visit",
              planning: locale === "fi" ? "Palvelusisältö, varustelu, aukioloajat, hinnat ja saatavuus voivat muuttua. Varmista ajantasaiset tiedot suoraan palveluntarjoajalta ennen vierailua tai varausta." : locale === "es" ? "Los servicios, las instalaciones, los horarios, los precios y la disponibilidad pueden cambiar. Confirma la información actual directamente con el proveedor antes de visitar o reservar." : "Services, facilities, opening times, prices and availability may change. Confirm current details directly with the provider before visiting or booking.",
              nearbyTitle: locale === "fi" ? "Muita Salon seudun kohteita" : locale === "es" ? "Otros lugares de la región de Salo" : "More places in the Salo region",
            } : (slug.startsWith("kimitoon-") ? {
              intro: provider.description,
              highlightsTitle: locale === "fi" ? "Kohteen palvelut ja ominaisuudet" : locale === "es" ? "Servicios y características" : "Services and features",
              highlights: provider.tags,
              planningTitle: locale === "fi" ? "Tarkista ennen vierailua tai varausta" : locale === "es" ? "Antes de visitar o reservar" : "Before visiting or booking",
              planning: locale === "fi" ? "Aukioloajat, kausittainen saatavuus, hinnat, palvelusisältö ja varausehdot voivat muuttua. Tarkista tiedot suoraan palveluntarjoajan omasta kanavasta ennen matkaa." : locale === "es" ? "Los horarios, la disponibilidad por temporada, los precios, los servicios y las condiciones pueden cambiar. Confirma los datos directamente con el proveedor antes de viajar." : "Opening hours, seasonal availability, prices, service details and booking terms can change. Confirm them directly with the provider before travelling.",
              nearbyTitle: locale === "fi" ? "Tutustu muihin Kemiönsaaren kohteisiin" : locale === "es" ? "Descubre otros lugares de Kimitoön" : "Explore more places on Kimitoön",
            } : null));
            if (!guide) return null;
            const showRelated = Boolean(mathildedalGuides[slug] || teijoGuides[slug] || slug.startsWith("kimitoon-"));
            const galleryPhotos: LocalPhoto[] = [...(provider.image ? [{ src: provider.image, alt: { fi: provider.name, en: provider.name, es: provider.name }, credit: provider.imageCredit || provider.name, source: ("imageSource" in provider && provider.imageSource) ? provider.imageSource : provider.website }] : []), ...(providerPhotoGalleries[slug] || []), ...(slug === "salo-teijon-masuuni" ? teijoMasuuniPhotos : []), ...(new Set(["salo-visit-mathildedal", "salo-hotel-mathildedal", "salo-mathildan-marina", "salo-matilda-villas", "salo-matri-house", "salo-majoitus-mathildedal", "salo-mathildedal-brewery", "salo-ravintola-terho"]).has(slug) ? mathildedalAreaPhotos : [])];
            return (
              <div className="mt-10 space-y-8">
                {galleryPhotos.length > 0 ? (
                <section aria-label={locale === "fi" ? "Kuvagalleria" : locale === "es" ? "Galería de imágenes" : "Photo gallery"}>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryPhotos.map((photo, index) => (
                      <figure key={photo.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <Image src={photo.src} alt={index === 0 ? (locale === "fi" ? `${provider.name} – kohdekuva` : locale === "es" ? `${provider.name} – imagen del lugar` : `${provider.name} – place photo`) : photo.alt[locale]} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-300 hover:scale-[1.02]" />
                        </div>
                        <figcaption className="space-y-1 px-3 py-2 text-xs text-slate-600">
                          <p>{index === 0 ? (locale === "fi" ? "Palveluntarjoajan kohdekuva" : locale === "es" ? "Imagen del proveedor" : "Provider photo") : photo.alt[locale]}</p>
                          <p>{locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:"} {photo.credit} · <a href={photo.source} target="_blank" rel="noreferrer" className="underline underline-offset-2">{locale === "fi" ? "lähde" : locale === "es" ? "fuente" : "source"}</a></p>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
                ) : null}
                <section className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">{guide.intro}</p>
                </section>
                {guide.highlights.length > 0 ? (
                <section>
                  <h3 className="font-display text-2xl font-bold text-brand-950">{guide.highlightsTitle}</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {guide.highlights.map((highlight) => <li key={highlight} className="rounded-2xl border border-slate-200 p-4 text-sm leading-7 text-slate-700"><span className="mr-2 font-bold text-brand-700">✓</span>{highlight}</li>)}
                  </ul>
                </section>
                ) : null}
                <section className="rounded-3xl border border-slate-200 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-brand-950">{guide.planningTitle}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{guide.planning}</p>
                </section>
                {showRelated ? (
                <section>
                  <h3 className="font-display text-2xl font-bold text-brand-950">{guide.nearbyTitle}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {slug.startsWith("kimitoon-")
                      ? relatedKimitoonProviders.map((place) => <Link key={place.id} href={`/${locale}/providers/kimitoon-${place.id}?from=${returnCategory || place.categories[0]}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-4 font-semibold text-brand-950 transition hover:border-brand-400 hover:bg-brand-50"><span>{place.name[locale]}</span><ArrowUpRight className="h-4 w-4 shrink-0" /></Link>)
                      : (teijoGuides[slug] ? teijoRelated : mathildedalRelated).filter((place) => place.slug !== slug).map((place) => <Link key={place.slug} href={`/${locale}/providers/${place.slug}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-4 font-semibold text-brand-950 transition hover:border-brand-400 hover:bg-brand-50"><span>{place.name[locale]}</span><ArrowUpRight className="h-4 w-4 shrink-0" /></Link>)}
                  </div>
                </section>
                ) : null}
              </div>
            );
          })()}
        </article>

        <aside className="h-fit min-w-0 rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-7 lg:sticky lg:top-24">
          {provider.price ? <div className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-brand-600">{c.price}</p><p className="mt-2 break-words font-semibold text-brand-950">{provider.price}</p></div> : null}
          {"contact" in provider && provider.contact ? (
            <div className="mb-5 rounded-2xl border border-brand-100 bg-white p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-700">{locale === "fi" ? "Yhteystiedot" : locale === "es" ? "Contacto" : "Contact"}</h2>
              {provider.contact.phone ? <p className="mt-3 text-sm"><span className="font-semibold">{locale === "fi" ? "Puhelin" : locale === "es" ? "Teléfono" : "Phone"}:</span> <a href={`tel:${provider.contact.phone.replace(/[^+0-9]/g, "")}`} className="underline underline-offset-2">{provider.contact.phone}</a></p> : null}
              {"email" in provider.contact && provider.contact.email ? <p className="mt-2 break-all text-sm"><span className="font-semibold">{locale === "fi" ? "Sähköposti" : locale === "es" ? "Correo electrónico" : "Email"}:</span> <a href={`mailto:${provider.contact.email}`} className="underline underline-offset-2">{provider.contact.email}</a></p> : null}
              {provider.contact.address ? <p className="mt-2 text-sm leading-6"><span className="font-semibold">{locale === "fi" ? "Osoite" : locale === "es" ? "Dirección" : "Address"}:</span> {provider.contact.address}</p> : null}
            </div>
          ) : null}
          <p className="text-sm leading-6 text-slate-700">{c.direct}</p>
          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-brand-800">
            {"websiteLabel" in provider && provider.websiteLabel ? provider.websiteLabel : c.visit}<ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
          <p className="mt-3 break-all text-xs text-slate-500">{provider.website}</p>
        </aside>
      </section>
    </main>
  );
}
