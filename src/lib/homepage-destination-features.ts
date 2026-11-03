import { photoLibrary, photoCredits, type PhotoCredit } from "@/lib/photo-library";

export type HomeLocale = "fi" | "en" | "es";

export const homepageDestinationFeatures = {
  "salo-mathildedal": {
    image: photoLibrary.sarkisalo,
    eyebrow: {
      fi: "Särkisalo · Teijo · Salon kylät",
      en: "Särkisalo · Teijo · Salo villages",
      es: "Särkisalo · Teijo · pueblos de Salo",
    },
    imageAlt: {
      fi: "Ulkoluodon silta ja merellinen saaristomaisema Särkisalossa",
      en: "Ulkoluoto Bridge and the coastal archipelago scenery in Särkisalo",
      es: "El puente de Ulkoluoto y el paisaje del archipiélago en Särkisalo",
    },
    description: {
      fi: "Tutustu Salon monipuoliseen seutuun: saaristokyliin, metsäisiin luontopolkuihin, paikallisiin makuihin ja historiallisiin miljöihin. Löydä rauhallisia retkikohteita, merellisiä elämyksiä ja paikallista elämänmenoa.",
      en: "Discover the wider Salo area, from coastal villages and forest trails to local flavours and historic settings. Find peaceful places to explore, seaside experiences and the character of local life.",
      es: "Descubre los alrededores de Salo: pueblos costeros, senderos entre bosques, sabores locales y entornos históricos. Encuentra lugares tranquilos, experiencias junto al mar y la vida auténtica de la zona.",
    },
  },
  naantali: {
    image: photoLibrary.naantaliOldTown,
    eyebrow: {
      fi: "Naantali · Saaristomeri",
      en: "Naantali · Archipelago Sea",
      es: "Naantali · Mar del Archipiélago",
    },
    imageAlt: {
      fi: "Naantalin vanhankaupungin historialliset puutalot",
      en: "Historic wooden houses in Naantali Old Town",
      es: "Casas históricas de madera en el casco antiguo de Naantali",
    },
    description: {
      fi: "Kulje vanhankaupungin puutalokujilla, nauti sataman tunnelmasta ja suuntaa saaristoon. Naantalissa yhdistyvät merellinen kaupunkielämä, kulttuuri ja koko perheelle sopivat elämykset.",
      en: "Wander the wooden streets of the Old Town, enjoy the harbour atmosphere and head out into the archipelago. Naantali brings together seaside town life, culture and experiences for the whole family.",
      es: "Pasea por las calles de madera del casco antiguo, disfruta del ambiente del puerto y descubre el archipiélago. Naantali combina vida junto al mar, cultura y experiencias para toda la familia.",
    },
  },
  turku: {
    image: photoLibrary.turkuAura,
    eyebrow: {
      fi: "Turku · Aurajoki",
      en: "Turku · Aura River",
      es: "Turku · Río Aura",
    },
    imageAlt: {
      fi: "Aurajoki ja Turun kaupunkimaisema",
      en: "The Aura River and cityscape of Turku",
      es: "El río Aura y el paisaje urbano de Turku",
    },
    description: {
      fi: "Aurajoen rantareitit, Turun linna, museot ja ravintolat tekevät kaupungista kiinnostavan pysähdyksen. Täältä on helppo jatkaa merelle ja Turun saariston kyliin.",
      en: "Riverside paths, Turku Castle, museums and restaurants make the city a rewarding stop. From here, it is easy to continue towards the sea and the villages of the Turku Archipelago.",
      es: "Los paseos junto al río Aura, el castillo de Turku, los museos y los restaurantes hacen de la ciudad una parada llena de interés. Desde aquí es fácil continuar hacia el mar y los pueblos del archipiélago de Turku.",
    },
  },
  hanko: {
    image: photoLibrary.hankoRegattaBeach,
    eyebrow: {
      fi: "Hanko · Suomen etelärannikko",
      en: "Hanko · Southern coast of Finland",
      es: "Hanko · Costa sur de Finlandia",
    },
    imageAlt: {
      fi: "Regattanrannan hiekkaranta Hangossa",
      en: "Regatta Beach in Hanko",
      es: "La playa de Regatta en Hanko",
    },
    description: {
      fi: "Hiekkarannat, avomeren läheisyys, historialliset huvilat ja vierassatama luovat Hangolle oman merellisen tunnelman. Tutustu rantareitteihin, luontoon ja paikallisiin ruokapaikkoihin.",
      en: "Sandy beaches, the open sea, historic villas and the guest harbour give Hanko its distinctive coastal character. Discover the waterfront paths, nature and local places to eat.",
      es: "Las playas de arena, el mar abierto, las villas históricas y el puerto deportivo dan a Hanko su carácter costero. Descubre los paseos junto al mar, la naturaleza y la gastronomía local.",
    },
  },
  aland: {
    image: photoLibrary.aland,
    eyebrow: {
      fi: "Ahvenanmaa · Saaristo",
      en: "Åland · Archipelago",
      es: "Åland · Archipiélago",
    },
    imageAlt: {
      fi: "Kastelholman historiallinen ympäristö Ahvenanmaalla",
      en: "The historic Kastelholm area in Åland",
      es: "El entorno histórico de Kastelholm en Åland",
    },
    description: {
      fi: "Punaiset graniittikalliot, pienet satamat, pyöräilyreitit ja Kastelholman historiallinen ympäristö tekevät Ahvenanmaasta omanlaisensa saaristokohteen. Löydä paikallisia makuja ja reittejä saarelta toiselle.",
      en: "Red granite cliffs, small harbours, cycling routes and the historic Kastelholm area give Åland a character all of its own. Discover local flavours and routes from one island to the next.",
      es: "Los acantilados de granito rojo, los pequeños puertos, las rutas ciclistas y el entorno histórico de Kastelholm dan a Åland un carácter único. Descubre sabores locales y rutas entre las islas.",
    },
  },
} satisfies Record<
  "salo-mathildedal" | "naantali" | "turku" | "hanko" | "aland",
  {
    image: string;
    eyebrow: Record<HomeLocale, string>;
    imageAlt: Record<HomeLocale, string>;
    description: Record<HomeLocale, string>;
  }
>;

export function getHomepagePhotoCredit(image: string) {
  return photoCredits.find((photo) => photo.url === image);
}

export function getHomepageDestinationHref(slug: string, locale: string) {
  if (slug === "salo-mathildedal") return `/${locale}/salo`;
  const anchor = slug === "aland" ? "aland" : slug === "turku" ? "turku-archipelago" : slug;
  return `/${locale}/coastal-finland#${anchor}`;
}

export function getHomepagePhotoUsageNote(photo: PhotoCredit | undefined, locale: HomeLocale): string {
  if (!photo) return "";
  if (photo.license.startsWith("CC BY") || photo.license === "Public domain") return photo.license;
  return locale === "fi" ? "Palveluntarjoajan kuva" : locale === "es" ? "Imagen del proveedor" : "Provider image";
}
