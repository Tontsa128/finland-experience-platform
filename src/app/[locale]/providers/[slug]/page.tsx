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
  "villa-nennebo": { fi: "Petun saari · Särkisalo · Salo", en: "Pettu Island · Särkisalo · Salo", es: "Isla de Pettu · Särkisalo · Salo" },
  "alaspaan-maatila": { fi: "Perniö · Salo", en: "Perniö · Salo", es: "Perniö · Salo" },
  "topilan-tupa": { fi: "Halikko · Salo", en: "Halikko · Salo", es: "Halikko · Salo" },
  "salon-oppaat": { fi: "Salo", en: "Salo", es: "Salo" },
  "vuohensaari-camping": { fi: "Salo", en: "Salo", es: "Salo" },
  "vuorovetten-jaatelo": { fi: "Strömma · Mathildedal · Särkisalo · Salo", en: "Strömma · Mathildedal · Särkisalo · Salo", es: "Strömma · Mathildedal · Särkisalo · Salo" },
  "chill-out-fishing": { fi: "Salo · Saaristomeri", en: "Salo · Archipelago Sea", es: "Salo · Mar del Archipiélago" },
  "villa-viktoria": { fi: "Suomusjärvi · Salo", en: "Suomusjärvi · Salo", es: "Suomusjärvi · Salo" },
  "villa-frans": { fi: "Suomusjärvi · Salo", en: "Suomusjärvi · Salo", es: "Suomusjärvi · Salo" },
  "villa-viola": { fi: "Suomusjärvi · Salo", en: "Suomusjärvi · Salo", es: "Suomusjärvi · Salo" },
  "villa-laperla": { fi: "Suomusjärvi · Salo", en: "Suomusjärvi · Salo", es: "Suomusjärvi · Salo" },
  "teijon-kammari": { fi: "Teijo · Salo", en: "Teijo · Salo", es: "Teijo · Salo" },
  "kruuvan-mokit": { fi: "Särkisalo · Perniö · Salo", en: "Särkisalo · Perniö · Salo", es: "Särkisalo · Perniö · Salo" },
  "meri-veikko": { fi: "Petun saari · Särkisalo · Salo", en: "Pettu Island · Särkisalo · Salo", es: "Isla de Pettu · Särkisalo · Salo" },
  "villa-signell": { fi: "Förby · Särkisalo · Salo", en: "Förby · Särkisalo · Salo", es: "Förby · Särkisalo · Salo" },
  "lonnviken": { fi: "Petun saari · Särkisalo · Salo", en: "Pettu Island · Särkisalo · Salo", es: "Isla de Pettu · Särkisalo · Salo" },
  "katiskanmaeki": { fi: "Ylönkylä · Särkisalo · Salo", en: "Ylönkylä · Särkisalo · Salo", es: "Ylönkylä · Särkisalo · Salo" },
  "onnenperan-mokki": { fi: "Vaskio · Salo", en: "Vaskio · Salo", es: "Vaskio · Salo" },
  "meri-ruukin-lomakyla": { fi: "Mathildedal · Salo", en: "Mathildedal · Salo", es: "Mathildedal · Salo" },
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
      imageSource: item.imageSource,
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
  "salo-hotel-mathildedal": [
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-Comfort-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Comfort-huone", en: "Comfort room at Hotel Mathildedal", es: "Habitación Comfort de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-Cosy-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Cosy-huone", en: "Cosy room at Hotel Mathildedal", es: "Habitación Cosy de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-Rooftop-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Rooftop-huone ja maisemaikkuna", en: "Rooftop room and panoramic window at Hotel Mathildedal", es: "Habitación Rooftop y ventanal panorámico de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-retki-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Retki-majoituspaketin kuva", en: "Retki nature stay package at Hotel Mathildedal", es: "Paquete de naturaleza Retki de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-ruukki-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Ruukki-majoituspaketin kuva", en: "Ruukki heritage stay package at Hotel Mathildedal", es: "Paquete de patrimonio Ruukki de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
    { src: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-rento-1024x1024.jpg", alt: { fi: "Hotel Mathildedalin Rento-majoituspaketin kuva", en: "Rento relaxed stay package at Hotel Mathildedal", es: "Paquete de estancia relajada Rento de Hotel Mathildedal" }, credit: "Hotel Mathildedal", source: "https://mathildedal.fi/majoitus/" },
  ],
  "salo-mathildan-marina": [
    { src: "https://cdn-datahub.visitfinland.com/images/0f01a660-c1d3-11ed-8fb6-cd05a147400e.jpeg?s=1200", alt: { fi: "Mathildan Marinan valoisa ravintolasali ja katetut pöydät", en: "Bright restaurant dining room at Mathildan Marina", es: "Comedor luminoso del restaurante Mathildan Marina" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://www.visitfinland.com/en/product/b3346a45-b8f4-4131-a0b1-0524a3e59963/mathildan-marina-restaurant/" },
    { src: "https://cdn-datahub.visitfinland.com/images/8d9a8210-e7a8-11ef-a1a5-c5de292a73ba.jpeg?s=1280", alt: { fi: "Ruokailuhetki Marinan aurinkoisella meriterassilla", en: "Outdoor dining on the Marina's sunny waterfront terrace", es: "Comida al aire libre en la terraza soleada junto al mar" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://kohteet.visitsalo.fi/en/a-local-gourmet-experience-of-mathildan-marina/" },
    { src: "https://cdn-datahub.visitfinland.com/images/b106e060-e7a6-11ef-a1a5-c5de292a73ba.jpeg?s=1280", alt: { fi: "Marinan hotellirakennus ja vierasvenesatama iltavalaistuksessa", en: "Marina hotel building and guest harbour at dusk", es: "Hotel de la Marina y puerto de visitantes al anochecer" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://kohteet.visitsalo.fi/en/hotel-mathilda-marina/" },
    { src: "https://cdn-datahub.visitfinland.com/images/0992ab60-e7a2-11ef-a1a5-c5de292a73ba.jpeg?s=1200", alt: { fi: "Rentoutumishetki Marinan puuverhoillussa saunassa", en: "A relaxing moment in the Marina's wood-panelled sauna", es: "Momento de relax en la sauna revestida de madera de Marina" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://www.visitfinland.com/en/product/c2b280b9-c2bd-4c19-802a-e5528df32946/the-power-of-steam-relax-in-sauna-at-mathildan-marina/" },
    { src: "https://cdn-datahub.visitfinland.com/images/485a8750-c22e-11ed-8fb6-cd05a147400e.jpeg?s=1200", alt: { fi: "Mathildan Marinan vierasvenesatama ja palvelurakennus", en: "Mathildan Marina guest harbour and service building", es: "Puerto deportivo de visitantes y edificio de servicios de Mathildan Marina" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://www.visitfinland.com/en/product/d6c1e8db-d15c-4fab-a175-5fa26b212c56/mathildan-marina-guest-harbour/" },
    { src: "https://cdn-datahub.visitfinland.com/images/f7b640f1-2b2b-11f0-981a-3b9c14904d67.jpeg?s=1280", alt: { fi: "Sähköistetty matkailuajoneuvopaikka aivan sataman rannassa", en: "Powered motorhome pitch beside the harbour", es: "Plaza con electricidad para autocaravana junto al puerto" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://kohteet.visitsalo.fi/en/caravan-park-by-the-sea-at-the-ironworks-village-of-mathildedal/" },
    { src: "https://cdn-datahub.visitfinland.com/images/a87e2a21-2b3f-11f0-981a-3b9c14904d67.jpeg?s=1280", alt: { fi: "Veneet Marinan laiturissa auringonlaskun aikaan", en: "Boats moored at the Marina at sunset", es: "Embarcaciones amarradas en Marina al atardecer" }, credit: "Visit Finland DataHub / Mathildan Marina", source: "https://kohteet.visitsalo.fi/en/mathildan-marina-restaurant/" },
  ],
  "salo-matilda-villas": [
    { src: "https://cdn-datahub.visitfinland.com/images/2c7e7830-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280", alt: { fi: "Matilda Villasin mökkikylän maisema meren läheisyydessä", en: "Matilda Villas holiday village near the sea", es: "Complejo vacacional Matilda Villas cerca del mar" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
    { src: "https://cdn-datahub.visitfinland.com/images/2c7e0300-f614-11f0-ad78-29bd5b45e175.jpeg?s=1200", alt: { fi: "Matilda Villasin majoituskohteen näkymä", en: "A view of the Matilda Villas accommodation", es: "Vista del alojamiento Matilda Villas" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
    { src: "https://cdn-datahub.visitfinland.com/images/2c7eed60-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280", alt: { fi: "Matilda Villasin huvila ja ympäröivä luonto", en: "A Matilda Villas cottage in its natural surroundings", es: "Una casa de Matilda Villas en su entorno natural" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
    { src: "https://cdn-datahub.visitfinland.com/images/2c7f3b80-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280", alt: { fi: "Matilda Villasin mökkikylän rakennuksia", en: "Buildings at Matilda Villas holiday village", es: "Edificios del complejo Matilda Villas" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
    { src: "https://cdn-datahub.visitfinland.com/images/2c7f89a0-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280", alt: { fi: "Matilda Villasin loma-asuntojen ympäristö", en: "Surroundings of the Matilda Villas holiday cottages", es: "Entorno de los alojamientos vacacionales Matilda Villas" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
    { src: "https://cdn-datahub.visitfinland.com/images/2c7fb0b0-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280", alt: { fi: "Matilda Villasin yhteinen ulkoiluympäristö", en: "Shared outdoor area at Matilda Villas", es: "Zona exterior compartida de Matilda Villas" }, credit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet", source: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/" },
  ],
  "salo-matri-house": [
    { src: "https://cdn-datahub.visitfinland.com/images/e144ba40-1b99-11f1-b3a4-6d11235fc921.jpeg?s=1280", alt: { fi: "Matri Housen yhteinen oleskelu- ja ruokailutila", en: "Shared lounge and dining area at Matri House", es: "Salón y comedor compartidos de Matri House" }, credit: "Visit Finland DataHub / Matri House — Salon Kohteet", source: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/" },
    { src: "https://cdn-datahub.visitfinland.com/images/e4a4fc40-1b99-11f1-b3a4-6d11235fc921.jpeg?s=1280", alt: { fi: "Matri Housen yksilöllisesti sisustettu vierashuone", en: "Individually designed guest room at Matri House", es: "Habitación de huéspedes con diseño individual en Matri House" }, credit: "Visit Finland DataHub / Matri House — Salon Kohteet", source: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/" },
    { src: "https://cdn-datahub.visitfinland.com/images/eb8c1b10-1b99-11f1-b3a4-6d11235fc921.jpeg?s=1280", alt: { fi: "Matri Housen valoisa ruokailu- ja yhteistila", en: "Bright dining and shared space at Matri House", es: "Comedor luminoso y espacio común de Matri House" }, credit: "Visit Finland DataHub / Matri House — Salon Kohteet", source: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/" },
    { src: "https://cdn-datahub.visitfinland.com/images/f326f980-1b99-11f1-b3a4-6d11235fc921.jpeg?s=1280", alt: { fi: "Matri Housen rauhallinen makuuhuone", en: "A calm guest bedroom at Matri House", es: "Dormitorio tranquilo de Matri House" }, credit: "Visit Finland DataHub / Matri House — Salon Kohteet", source: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/" },
    { src: "https://cdn-datahub.visitfinland.com/images/0593c580-1b9a-11f1-b3a4-6d11235fc921.jpeg?s=1280", alt: { fi: "Matri Housen sisätiloja", en: "Interior details at Matri House", es: "Detalles interiores de Matri House" }, credit: "Visit Finland DataHub / Matri House — Salon Kohteet", source: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/" },
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
    fi: { intro: "Hotel Mathildedal tarjoaa rauhallista boutique-majoitusta Mathildedalin historiallisessa ruukkimiljöössä. Hotellin 13 huonetta jakautuvat neljään tyyliin: Premium-huoneessa on 180 cm parisänky ja oleskelualue, Comfort-huoneessa loft-henkeä ja sadesuihku, Cosy-huone on kompakti vaihtoehto ja Rooftop-huone sijaitsee ruukkikylän kattojen yllä maisemaikkunalla. Huoneet ovat 15–25 m² ja niihin sisältyy aamiainen. Päivä alkaa hotellin omassa Café Mathildedalissa, jonka vastaanoton kautta myös hotellin asiakkaat asioivat. Ruukkikylän ravintolat, kahvilat, putiikit ja tapahtumat ovat lähellä, ja Teijon kansallispuisto tarjoaa retkikohteita lyhyen matkan päässä.", highlights: ["13 yksilöllistä boutique-huonekokonaisuutta: Premium, Comfort, Cosy ja Rooftop", "Aamiainen sisältyy huonehintaan; vastaanotto Café Mathildedalissa", "Historiallinen ruukkikylä, kylän ravintolat ja putiikit kävelyetäisyydellä", "Teijon kansallispuiston järvi- ja metsämaisemat lähellä", "Hotellin omat ryhmä- ja kokouspalvelut"], planning: "Huoneiden tarkat varustelut, hinnat, sisään- ja uloskirjautumisajat, mahdolliset erityistoiveet sekä saatavuus vaihtelevat. Tarkista ajantasaiset tiedot ja tee varaus suoraan Hotel Mathildedalin omassa varauskanavassa. Vastaanotto sijaitsee Café Mathildedalissa ja palvelee kahvilan aukioloaikojen mukaan tai sopimuksesta. Kahvilan ja muiden kylän palveluiden kausittaiset aukioloajat kannattaa varmistaa ennen matkaa.", highlightsTitle: "Huoneet, tunnelma ja palvelut", planningTitle: "Suunnittele majoitus suoraan hotellin kanssa", nearbyTitle: "Tutustu myös Mathildedalin ruukkikylään" },
    en: { intro: "Hotel Mathildedal offers peaceful boutique accommodation in the historic ironworks village of Mathildedal. Its 13 rooms are arranged in four styles: the Premium room features a 180 cm double bed and sitting area; Comfort has a loft-style feel and a rain shower; Cosy is a compact option; and Rooftop sits above the village with a large panoramic window. Rooms range from 15 to 25 m² and breakfast is included. The day begins at the hotel's own Café Mathildedal, which also serves as the reception. Village restaurants, cafés, independent shops and events are close by, while the lakes and forest trails of Teijo National Park are a short journey away.", highlights: ["13 individually styled boutique rooms: Premium, Comfort, Cosy and Rooftop", "Breakfast included; reception is located at Café Mathildedal", "Historic ironworks village, restaurants and independent shops nearby", "Lakes and forest trails of Teijo National Park within easy reach", "Hotel services for groups and meetings"], planning: "Room facilities, rates, check-in and check-out times, special requests and availability may change. Check the latest details and book directly through Hotel Mathildedal's own booking channel. Reception is located at Café Mathildedal and operates during café opening hours or by appointment. Check seasonal opening times for the café and other village services before travelling.", highlightsTitle: "Rooms, atmosphere and services", planningTitle: "Plan your stay directly with the hotel", nearbyTitle: "Explore the Mathildedal ironworks village" },
    es: { intro: "Hotel Mathildedal ofrece alojamiento boutique y tranquilo en el histórico pueblo siderúrgico de Mathildedal. Sus 13 habitaciones se distribuyen en cuatro estilos: la habitación Premium cuenta con una cama doble de 180 cm y zona de estar; Comfort combina un estilo loft con ducha efecto lluvia; Cosy es una opción compacta; y Rooftop se encuentra sobre los tejados del pueblo y dispone de un gran ventanal panorámico. Las habitaciones tienen entre 15 y 25 m² e incluyen desayuno. El día comienza en el propio Café Mathildedal, que también funciona como recepción. Los restaurantes, cafeterías, tiendas independientes y eventos del pueblo están cerca; los lagos y senderos del Parque Nacional de Teijo se encuentran a poca distancia.", highlights: ["13 habitaciones boutique de cuatro estilos: Premium, Comfort, Cosy y Rooftop", "Desayuno incluido; la recepción está en Café Mathildedal", "Pueblo siderúrgico histórico, restaurantes y tiendas independientes en las inmediaciones", "Lagos y senderos forestales del Parque Nacional de Teijo cerca", "Servicios del hotel para grupos y reuniones"], planning: "El equipamiento de las habitaciones, las tarifas, los horarios de entrada y salida, las solicitudes especiales y la disponibilidad pueden cambiar. Consulta la información actualizada y reserva directamente a través del canal de reservas de Hotel Mathildedal. La recepción se encuentra en Café Mathildedal y atiende durante el horario de la cafetería o con cita previa. Comprueba los horarios estacionales de la cafetería y de los demás servicios del pueblo antes de viajar.", highlightsTitle: "Habitaciones, ambiente y servicios", planningTitle: "Organiza tu estancia directamente con el hotel", nearbyTitle: "Descubre el pueblo siderúrgico de Mathildedal" }
  },
  "salo-mathildan-marina": {
    fi: { intro: "Mathildan Marina on merellinen tukikohta, jossa hotelliyö, vierasvenesatama, ravintola ja yksityiset saunaelämykset täydentävät toisiaan. Kuuden huoneen satamahotellissa on neljä alakerran huonetta sekä kaksi yläkerran parvekkeellista huonetta. Huoneissa on oma wc ja suihku, televisio, minijääkaappi, vedenkeitin ja langaton Wi-Fi. Aamiainen sisältyy huonehintaan. Satamassa on noin 300 venepaikkaa, joista 40 vierasveneille, ja matkaparkissa 12 sähköistettyä paikkaa. Ravintolan kausittain vaihtuva menu painottaa kotimaisia lähituottajia; kesällä meriterassi avautuu sataman suuntaan. Saunaosastolla on 12 hengen iso sauna, 6 hengen pieni sauna, lounge ja katettu terassi. Ulkoporeallas varataan erikseen. Hotellivieraille myönnetään 20 % alennus saunaosaston varauksista.", highlights: ["Kuuden huoneen satamahotelli; aamiainen sisältyy huonehintaan", "Noin 300 venepaikkaa, joista 40 vierasveneille; sähköistetty matkaparkki 12 ajoneuvolle", "Satamaravintola, meriterassi ja sesongin mukaan vaihtuva ruokalista", "Yksityiset 6 ja 12 hengen saunat, lounge, katettu terassi ja erikseen varattava ulkoporeallas", "Maksuton pysäköinti, ulkokuntosali ja rantalentopallokenttä"], planning: "Vuoden 2026 hotellihinnat ovat virallisen hinnaston mukaan 149–269 €/yö huoneen ja henkilömäärän mukaan; aamiainen sisältyy. Sisäänkirjautuminen alkaa klo 15 ja uloskirjautuminen on klo 12. Pidemmän majoituksen huonehinnasta ilmoitetaan 10 % alennus vähintään kahden peräkkäisen yön varauksissa. Saunaosaston hinnat, poreallas, satamapaikat ja ravintolan aukiolo vaihtelevat palvelun ja ajankohdan mukaan. Ravintolan aukioloajat muuttuvat kausittain, joten tarkista ajantasaiset tiedot ja varaa huone, venepaikka tai sauna suoraan Marinan omilta sivuilta. Hotelli ei majoita lemmikkieläimiä; ravintolan terassille lemmikit ovat tervetulleita.", highlightsTitle: "Hotelli, satama ja merelliset palvelut", planningTitle: "Hinnat, varaukset ja hyvä tietää", nearbyTitle: "Tutustu myös Mathildedalin ruukkikylään" },
    en: { intro: "Mathildan Marina is a waterfront base where a hotel stay, guest harbour, restaurant and private sauna experiences come together. The six-room harbour hotel has four ground-floor rooms and two upstairs rooms with balconies. Each room has a private bathroom, TV, mini-fridge, kettle and Wi-Fi, and breakfast is included. The harbour has around 300 berths, including 40 for visiting boats, while the motorhome area has 12 powered pitches. The restaurant's seasonal menu highlights ingredients from Finnish local producers, and its waterfront terrace opens towards the harbour in summer. The sauna facilities include a large sauna for up to 12 people, a smaller sauna for up to six, a lounge and a covered terrace. The outdoor hot tub is booked separately. Hotel guests receive a 20% discount on sauna-facility bookings.", highlights: ["Six-room harbour hotel with breakfast included", "Around 300 berths, including 40 guest berths; 12 powered motorhome pitches", "Waterfront restaurant, sea-view terrace and a seasonal menu", "Private saunas for 6 and 12 people, lounge, covered terrace and separately bookable outdoor hot tub", "Free parking, outdoor gym and beach volleyball court"], planning: "The official 2026 room rates are €149–269 per night depending on room and occupancy, with breakfast included. Check-in starts at 3 pm and check-out is by noon. The hotel advertises a 10% room-rate discount for stays of at least two consecutive nights. Sauna, hot-tub and berth prices, as well as restaurant opening hours, depend on the service and season. Restaurant hours change during the year, so check the latest information and book rooms, berths or sauna sessions directly through the Marina's own website. The hotel does not accommodate pets, although pets are welcome on the restaurant terraces.", highlightsTitle: "Hotel, harbour and waterfront services", planningTitle: "Rates, bookings and practical information", nearbyTitle: "Explore the Mathildedal ironworks village" },
    es: { intro: "Mathildan Marina es un punto de estancia junto al mar que reúne hotel, puerto deportivo para visitantes, restaurante y experiencias privadas de sauna. El hotel portuario tiene seis habitaciones: cuatro en la planta baja y dos en la planta superior con balcón. Todas disponen de baño privado, televisión, mininevera, hervidor y wifi; el desayuno está incluido. El puerto cuenta con unos 300 amarres, 40 para embarcaciones visitantes, y la zona de autocaravanas dispone de 12 plazas con electricidad. El restaurante ofrece un menú de temporada que destaca productos de proveedores locales finlandeses, y en verano su terraza se abre hacia el puerto. La zona de sauna incluye una sauna grande para hasta 12 personas, otra pequeña para seis, un salón y una terraza cubierta. El jacuzzi exterior se reserva por separado. Los huéspedes del hotel reciben un 20 % de descuento en las reservas de la zona de sauna.", highlights: ["Hotel portuario de seis habitaciones con desayuno incluido", "Unos 300 amarres, 40 para visitantes y 12 plazas con electricidad para autocaravanas", "Restaurante junto al puerto, terraza con vistas al mar y menú de temporada", "Saunas privadas para 6 y 12 personas, salón, terraza cubierta y jacuzzi exterior con reserva aparte", "Aparcamiento gratuito, gimnasio al aire libre y pista de vóley-playa"], planning: "Según la tarifa oficial de 2026, las habitaciones cuestan entre 149 y 269 € por noche, según la habitación y la ocupación; el desayuno está incluido. La entrada comienza a las 15:00 y la salida es antes de las 12:00. El hotel anuncia un 10 % de descuento en la habitación para estancias de al menos dos noches consecutivas. Los precios de la sauna, el jacuzzi y los amarres, así como el horario del restaurante, dependen del servicio y de la temporada. Los horarios del restaurante cambian a lo largo del año: consulta la información actualizada y reserva habitaciones, amarres o sauna directamente en la web de Marina. El hotel no admite mascotas, aunque sí se permiten en las terrazas del restaurante.", highlightsTitle: "Hotel, puerto y servicios junto al mar", planningTitle: "Tarifas, reservas e información práctica", nearbyTitle: "Descubre el pueblo siderúrgico de Mathildedal" }
  },
  "salo-matri-house": {
    fi: { intro: "Matri House yhdistää vuoden 1840 puutalon historian, ajattoman pohjoismaisen sisustuksen ja yksilöllisesti suunnitellut huoneet. Kuudessa 25–32 m²:n huoneessa on oma kylpyhuone ja laadukas Matri-vuode. Yhteiset tilat – keittiö, aamiaishuone, veranta, oleskelutila ja yläkerran kirjasto – sekä omenapuutarha ovat majoittujien käytössä. Koko talon voi varata noin 16–18 hengen yksityisiin tilaisuuksiin, ja Edla- sekä Selma-huoneet voi yhdistää perhesviitiksi.", highlights: ["Vuonna 1840 rakennettu ja huolellisesti kunnostettu puutalo", "Kuusi yksilöllistä 25–32 m²:n huonetta, jokaisessa oma kylpyhuone", "Laadukkaat Matri-vuoteet ja huonekohtainen sisustus", "Yhteinen keittiö, aamiaishuone, veranta, oleskelutila ja kirjasto", "Omenapuutarha ja mahdollisuus varata koko talo 16–18 hengelle", "Erillinen puulämmitteinen pihasauna koko talon varauksissa ehtojen mukaan"], planning: "Huoneiden yksittäinen varaaminen on kausittaista; muina ajankohtina tarjolla voi olla koko talon varaus. Tarkista ajantasainen varauskalenteri, huonevalikoima, sisäänkirjautumisen avainkoodikäytäntö, aamiaisen järjestelyt, pihasaunan käyttöehdot ja mahdolliset tapahtumapalvelut suoraan Matri Houselta. Pihassa on kuusi maksutonta pysäköintipaikkaa. FINNEXPRIENCE ohjaa varauksen palveluntarjoajan omalle sivustolle eikä käsittele majoituksen maksua tai sopimusta.", highlightsTitle: "Talon ja huoneiden erityispiirteet", planningTitle: "Varaus, saapuminen ja käytännön tiedot", nearbyTitle: "Kävele Mathildedalin ravintoloihin ja tutustu Teijon kansallispuistoon" },
    en: { intro: "Matri House brings together the history of an 1840 wooden house, timeless Nordic interiors and individually designed guest rooms. Its six rooms measure 25–32 m² and each has a private bathroom and a high-quality Matri bed. Guests can use the shared kitchen, breakfast room, veranda, lounge, upstairs library and apple garden. The entire house can be reserved for private gatherings of approximately 16–18 guests, and the Edla and Selma rooms can be connected to form a family suite.", highlights: ["Carefully restored wooden house dating from 1840", "Six individually designed 25–32 m² rooms, each with a private bathroom", "High-quality Matri beds and distinctive room interiors", "Shared kitchen, breakfast room, veranda, lounge and library", "Apple garden and whole-house stays for approximately 16–18 guests", "Separate wood-fired garden sauna available with whole-house reservations, subject to terms"], planning: "Individual room bookings are seasonal; at other times, the whole house may be offered for private use. Confirm the current booking calendar, available rooms, self-check-in key-code arrangements, breakfast options, garden sauna terms and any event services directly with Matri House. Six free parking spaces are available in the courtyard. FINNEXPRIENCE directs visitors to the provider's own booking channel and does not process accommodation payments or contracts.", highlightsTitle: "The house and its rooms", planningTitle: "Booking, arrival and practical details", nearbyTitle: "Walk to Mathildedal's restaurants and explore Teijo National Park" },
    es: { intro: "Matri House reúne la historia de una casa de madera de 1840, interiores nórdicos atemporales y habitaciones diseñadas individualmente. Sus seis habitaciones miden entre 25 y 32 m² y cada una dispone de baño privado y una cama Matri de alta calidad. Los huéspedes pueden utilizar la cocina compartida, el comedor de desayunos, la veranda, el salón, la biblioteca de la planta superior y el jardín de manzanos. La casa completa se puede reservar para reuniones privadas de aproximadamente 16–18 personas, y las habitaciones Edla y Selma pueden conectarse para formar una suite familiar.", highlights: ["Casa de madera de 1840 restaurada con cuidado", "Seis habitaciones individuales de 25–32 m², cada una con baño privado", "Camas Matri de alta calidad e interiores propios en cada habitación", "Cocina compartida, comedor de desayunos, veranda, salón y biblioteca", "Jardín de manzanos y posibilidad de reservar la casa completa para unas 16–18 personas", "Sauna exterior independiente de leña disponible con la reserva de la casa completa, según condiciones"], planning: "La reserva de habitaciones individuales es estacional; en otras épocas puede ofrecerse la casa completa para uso privado. Confirma directamente con Matri House el calendario de reservas, las habitaciones disponibles, el sistema de llegada autónoma mediante código, las opciones de desayuno, las condiciones de uso de la sauna exterior y los servicios para eventos. Hay seis plazas de aparcamiento gratuitas en el patio. FINNEXPRIENCE dirige al visitante al canal de reserva del proveedor y no gestiona pagos ni contratos de alojamiento.", highlightsTitle: "La casa y sus habitaciones", planningTitle: "Reservas, llegada e información práctica", nearbyTitle: "Ve a pie a los restaurantes de Mathildedal y descubre el Parque Nacional de Teijo" }
  },
  "salo-matilda-villas": {
    fi: { intro: "Matilda Villasin 18 ympärivuotiseen käyttöön tarkoitettua huvilaa muodostavat oman rauhallisen tukikohdan Mathildedalin merellisessä ruukkimiljöössä. Valittavana on kaksi kokoa: kaksikerroksinen Villa Kukka (120 m², kolme makuuhuonetta) ja yhdessä tasossa oleva Villa Taimi (83 m², kaksi makuuhuonetta). Molemmissa on hyvin varusteltu keittiö, oma sauna, takka ja terassi. Yhteisillä alueilla odottavat pieni uimaranta, grillikota, rantatulipaikka ja leikkialue; kesäisin käytössä ovat myös rantapunttis ja vesitrampoliini. Majoittujat voivat lainata maksutta polkupyöriä kylälle kulkemiseen. Kohde sopii perheille, ystäväporukoille, juhliin ja yritysten virkistyspäiviin.", highlights: ["18 ympärivuotista huvilaa kahdessa kokoluokassa", "Villa Kukka 120 m² / 3 makuuhuonetta; Villa Taimi 83 m² / 2 makuuhuonetta", "Oma sauna, takka, keittiö ja terassi", "Uimaranta, grillikota, rantatulipaikka ja leikkialue", "Kesäkaudella rantapunttis ja vesitrampoliini", "Maksuttomat lainapyörät, sähköauton latauspiste ja lemmikit tervetulleita"], planning: "Ranta sijaitsee mäen alla, ja sinne kuljetaan portaita pitkin. Tarkista ennen varausta valitun huvilan henkilömäärä, vuodepaikat, lisävuoteet, liinavaatteiden ja loppusiivouksen ehdot, lemmikkikäytännöt, sähköauton latauksen ehdot sekä ajantasainen hinta ja saatavuus suoraan Matilda Villasista. Palveluntarjoajan omalla sivustolla on varaus- ja yhteydenottokanava. FINNEXPRIENCE ohjaa varauksen palveluntarjoajalle eikä käsittele majoituksen maksua tai sopimusta.", highlightsTitle: "Huvilat ja yhteiset palvelut", planningTitle: "Saapuminen ja varauksen tarkistaminen", nearbyTitle: "Yhdistä vierailuun Mathildedalin ruukkikylä ja Teijon kansallispuisto" },
    en: { intro: "Matilda Villas offers 18 year-round holiday cottages in the coastal setting of Mathildedal's historic ironworks village. Choose between two sizes: the two-storey Villa Kukka (120 m², three bedrooms) and the single-level Villa Taimi (83 m², two bedrooms). Both types include a well-equipped kitchen, private sauna, fireplace and terrace. Shared outdoor facilities include a small beach, barbecue hut, seaside fire pit and children's play area; in summer, guests can also use the beach gym equipment and water trampoline. Complimentary bicycles are available for trips to the village. The cottages suit families, groups of friends, celebrations and company recreation days.", highlights: ["18 year-round cottages in two sizes", "Villa Kukka: 120 m² / 3 bedrooms; Villa Taimi: 83 m² / 2 bedrooms", "Private sauna, fireplace, kitchen and terrace", "Beach, barbecue hut, seaside fire pit and children's play area", "Beach gym equipment and water trampoline in summer", "Complimentary bicycles, EV charging point and pets welcome"], planning: "The beach is below the hillside and accessed by steps. Before booking, confirm the guest capacity, beds and extra beds for your chosen cottage, linen and final-cleaning arrangements, pet policy, EV charging terms, current rates and availability directly with Matilda Villas. Use the provider's own website for enquiries and reservations. FINNEXPRIENCE directs visitors to the provider and does not process accommodation payments or contracts.", highlightsTitle: "Cottages and shared facilities", planningTitle: "Arrival and booking details", nearbyTitle: "Combine your stay with the Mathildedal ironworks village and Teijo National Park" },
    es: { intro: "Matilda Villas ofrece 18 alojamientos vacacionales disponibles todo el año en el entorno costero del histórico pueblo siderúrgico de Mathildedal. Hay dos tamaños: Villa Kukka, de dos plantas, 120 m² y tres dormitorios, y Villa Taimi, de una sola planta, 83 m² y dos dormitorios. Ambas incluyen cocina bien equipada, sauna privada, chimenea y terraza. Las zonas compartidas incluyen una pequeña playa, una kota para barbacoas, una hoguera junto al mar y un área de juegos infantil; en verano también se puede utilizar el equipamiento de ejercicio de la playa y el trampolín acuático. Hay bicicletas gratuitas para desplazarse al pueblo. Los alojamientos son adecuados para familias, grupos de amigos, celebraciones y jornadas de empresa.", highlights: ["18 alojamientos disponibles todo el año en dos tamaños", "Villa Kukka: 120 m² / 3 dormitorios; Villa Taimi: 83 m² / 2 dormitorios", "Sauna privada, chimenea, cocina y terraza", "Playa, kota para barbacoas, hoguera junto al mar y zona infantil", "Equipamiento de ejercicio y trampolín acuático en verano", "Bicicletas gratuitas, punto de carga para vehículos eléctricos y mascotas bienvenidas"], planning: "La playa está al pie de una pendiente y se accede por escaleras. Antes de reservar, confirma directamente con Matilda Villas la capacidad, las camas y camas adicionales, las condiciones de ropa de cama y limpieza final, la política de mascotas, las condiciones de carga de vehículos eléctricos, las tarifas actuales y la disponibilidad. Utiliza la web del proveedor para consultas y reservas. FINNEXPRIENCE dirige al visitante al proveedor y no gestiona pagos ni contratos de alojamiento.", highlightsTitle: "Alojamientos e instalaciones compartidas", planningTitle: "Llegada y detalles de la reserva", nearbyTitle: "Combina la estancia con el pueblo siderúrgico de Mathildedal y el Parque Nacional de Teijo" }
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
            const galleryPhotos: LocalPhoto[] = [...(provider.image ? [{ src: provider.image, alt: { fi: provider.name, en: provider.name, es: provider.name }, credit: provider.imageCredit || provider.name, source: ("imageSource" in provider && provider.imageSource) ? provider.imageSource : provider.website }] : []), ...(providerPhotoGalleries[slug] || []), ...(slug === "salo-teijon-masuuni" ? teijoMasuuniPhotos : []), ...(slug === "salo-visit-mathildedal" ? mathildedalAreaPhotos : [])];
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
