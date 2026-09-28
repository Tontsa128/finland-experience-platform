import type { Locale } from "@/types";

export type NaantaliProvider = {
  id: string;
  category: "tourism" | "sight" | "stay" | "experience" | "nature" | "food";
  name: string;
  description: Record<Locale, string>;
  url: string;
  image?: string;
  imageCredit?: string;
  price?: string;
};

export type NaantaliEvent = {
  id: string;
  start: string;
  end?: string;
  title: Record<Locale, string>;
  location: string;
  description: Record<Locale, string>;
  url: string;
  category: "autumn" | "christmas" | "culture";
};

const imageBase = "https://visitnaantali.com/wp-content/uploads/2026/01/";
const image = (file: string) => imageBase + file;

export const naantaliProviders: NaantaliProvider[] = [
  {
    id: "visit-naantali",
    category: "tourism",
    name: "Visit Naantali",
    description: {
      fi: "Naantalin virallinen matkailusivusto: nähtävyydet, tapahtumat, majoitus, saaristo ja aktiviteetit.",
      es: "Sitio oficial de turismo de Naantali: lugares, eventos, alojamiento, archipiélago y actividades.",
      en: "Naantali's official tourism site for sights, events, accommodation, archipelago and activities."
    },
    url: "https://visitnaantali.com"
  },
  {
    id: "muumimaailma",
    category: "sight",
    name: "Muumimaailma",
    description: {
      fi: "Kailon saaren koko perheen elämyspuisto Naantalin vanhankaupungin kupeessa.",
      es: "Parque temático familiar en la isla de Kailo, junto al casco antiguo de Naantali.",
      en: "A family experience park on Kailo Island beside Naantali Old Town."
    },
    url: "https://www.muumimaailma.fi"
  },
  {
    id: "naantali-spa",
    category: "stay",
    name: "Naantalin Kylpylä",
    description: {
      fi: "Kylpylähotelli meren äärellä: allasosastot, saunamaailma, hoidot ja ravintolat.",
      es: "Spa-hotel junto al mar con piscinas, saunas, tratamientos y restaurantes.",
      en: "Seaside spa hotel with pools, sauna world, treatments and restaurants."
    },
    url: "https://www.naantalispa.fi",
    image: image("naantalispa-aerial-2021-1-1800x750-1-870x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "hotel-amandis",
    category: "stay",
    name: "Hotel Amandis",
    description: {
      fi: "Pieni majoituskohde Naantalin vanhankaupungin ja sataman yhteydessä.",
      es: "Alojamiento boutique cerca del casco antiguo y el puerto de Naantali.",
      en: "Small accommodation near Naantali Old Town and harbour."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("Amandis_majoitus_huone_1600px-1-870x580.webp"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "hotel-bridget-inn",
    category: "stay",
    name: "Hotel Bridget Inn",
    description: {
      fi: "Vanhankaupungin tunnelmallinen majoituskohde Naantalissa.",
      es: "Alojamiento con encanto en el casco antiguo de Naantali.",
      en: "Charming accommodation in Naantali Old Town."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("62b99e929414533d0f36ee4c_Hotel-bridget-inn-Naantali-osoite-800-e1767965329895-510x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "herrankukkaro",
    category: "experience",
    name: "Herrankukkaro",
    description: {
      fi: "Saaristokohde, savusaunat, kokous- ja juhlapalvelut sekä retki- ja elämysohjelmat.",
      es: "Destino del archipiélago con saunas de humo, eventos y experiencias.",
      en: "Archipelago destination with smoke saunas, events and experience programmes."
    },
    url: "https://www.herrankukkaro.fi",
    image: image("IMG_0650__verkko-870x580.png"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "hotel-kaivo",
    category: "stay",
    name: "Hotel Kaivo",
    description: {
      fi: "Naantalin sataman ja vanhankaupungin lähellä sijaitseva majoituskohde.",
      es: "Alojamiento cerca del puerto y el casco antiguo de Naantali.",
      en: "Accommodation near Naantali harbour and Old Town."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("hotelli-e1769076588935.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "kultaranta-resort",
    category: "stay",
    name: "Kultaranta Resort",
    description: {
      fi: "Resort, golf, majoitus ja matkailuneuvonta Luonnonmaalla.",
      es: "Resort con golf, alojamiento e información turística en Luonnonmaa.",
      en: "Resort with golf, accommodation and tourist information on Luonnonmaa."
    },
    url: "https://kultarantaresort.fi",
    image: image("naantali-kultaranta-resort-golf-kenttaesittely-870x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "naantali-city-apartments",
    category: "stay",
    name: "Naantali City Apartments",
    description: {
      fi: "Huoneistoja Naantalin keskustan ja vanhankaupungin läheisyydessä.",
      es: "Apartamentos cerca del centro y el casco antiguo de Naantali.",
      en: "Apartments close to Naantali centre and Old Town."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("naantali-city-apartments-rooms-3-1030x687-1-870x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "hotel-palo",
    category: "stay",
    name: "Hotel Palo",
    description: {
      fi: "Viihtyisä majoituskohde Naantalin vanhankaupungin tuntumassa.",
      es: "Alojamiento acogedor cerca del casco antiguo de Naantali.",
      en: "Cosy accommodation near Naantali Old Town."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("101553401-576x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "hotel-sininen-talo",
    category: "stay",
    name: "Hotel Sininen Talo",
    description: {
      fi: "Pieni ja persoonallinen majoituskohde Naantalin keskustassa.",
      es: "Alojamiento pequeño y con personalidad en Naantali.",
      en: "Small, characterful accommodation in Naantali."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("Untitled-design-4-870x580.png"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "tammiston-bb",
    category: "stay",
    name: "Tammiston B&B",
    description: {
      fi: "Bed & breakfast -majoitus Naantalin seudulla.",
      es: "Alojamiento bed & breakfast en la zona de Naantali.",
      en: "Bed & breakfast accommodation in the Naantali area."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("Tammiston-870x580.webp"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "uusi-haveri",
    category: "stay",
    name: "Uusi Haveri",
    description: {
      fi: "Majoituskohde Naantalin seudulla; ajantasainen hinta ja saatavuus palveluntarjoajalta.",
      es: "Alojamiento en la zona de Naantali; consulta precio y disponibilidad actuales al proveedor.",
      en: "Accommodation in the Naantali area; check current price and availability with the provider."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: image("Pihatalo_kokokuva-e1769076493614-870x580.webp"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "vaihela",
    category: "stay",
    name: "Saaristohotelli Vaihela",
    description: {
      fi: "Saaristohotelli Velkualla. Sopii saaristopäivään, ruokailuun ja yöpymiseen.",
      es: "Hotel del archipiélago en Velkua, ideal para una estancia junto al mar.",
      en: "Archipelago hotel in Velkua, ideal for a seaside stay."
    },
    url: "https://www.vaihela.fi",
    image: image("0c68a788f8e5828e55e100e617d43be722b45da7-870x580.jpg"),
    imageCredit: "Visit Naantali"
  },
  {
    id: "lomahyppays",
    category: "stay",
    name: "Lomahyppäys",
    description: {
      fi: "Mökkimajoitusta saariston rengastien varrella.",
      es: "Alojamiento en cabañas en la zona del archipiélago.",
      en: "Cottage accommodation in the archipelago area."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/02/01BCF9550E2F70A7A59B7DEAA606E3D9-2048x1152-1-870x580.jpg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "paratiisisaari",
    category: "experience",
    name: "Paratiisisaari",
    description: {
      fi: "Saaristokohde, jossa yhdistyvät mökkiloma, savusauna ja merellinen luonto.",
      es: "Destino insular que combina cabaña, sauna de humo y naturaleza marina.",
      en: "Island destination combining cottages, smoke sauna and coastal nature."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/Savusaunan-paljut-Paratiisisaari-2825-of-53-29-7f64ba61-432w.webp",
    imageCredit: "Visit Naantali"
  },
  {
    id: "maisaari",
    category: "nature",
    name: "Maisaari",
    description: {
      fi: "Saaristokohde ja retkipaikka Rymättylän suunnalla.",
      es: "Destino y lugar de excursión en el archipiélago de Rymättylä.",
      en: "Island destination and excursion spot in the Rymättylä archipelago."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/luontopolku7_Retari_1200px-870x580.jpg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "villa-sofiel",
    category: "stay",
    name: "Villa SoFiel",
    description: {
      fi: "Huvilamajoitusta saaristomaisemassa. Ajantasaiset hinnat tarkistetaan palveluntarjoajalta.",
      es: "Villa en el archipiélago. Consulta directamente las tarifas actuales.",
      en: "Villa accommodation in the archipelago. Check current rates with the provider."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/villasofiel-1-1198x800-1-870x580.jpg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "naantali-camping",
    category: "stay",
    name: "Naantali Camping",
    description: {
      fi: "Leirintäalue Naantalissa.",
      es: "Camping en Naantali.",
      en: "Camping in Naantali."
    },
    url: "https://www.naantalicamping.fi",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/Untitled-design-5-401x580.png",
    imageCredit: "Visit Naantali"
  },
  {
    id: "livonsaari-caravan",
    category: "stay",
    name: "Livonsaari Caravan",
    description: {
      fi: "Matkailuajoneuvomajoitusta saariston rauhassa.",
      es: "Camping para autocaravanas en el archipiélago.",
      en: "Caravan camping in the archipelago."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/1920.jpg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "sf-c-naantali-saloranta",
    category: "stay",
    name: "SF-C Naantali Saloranta",
    description: {
      fi: "Leirintä- ja matkailuajoneuvokohde meren läheisyydessä.",
      es: "Camping y área para vehículos recreativos cerca del mar.",
      en: "Camping and motorhome site near the sea."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/IMG_2811-2000x1200-1-870x580.jpeg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "villa-naantali",
    category: "stay",
    name: "Villa Naantali",
    description: {
      fi: "Majoitusvaihtoehto Naantalin seudulla.",
      es: "Opción de alojamiento en la zona de Naantali.",
      en: "Accommodation option in the Naantali area."
    },
    url: "https://visitnaantali.com/majoitu-ja-nauti/majoitukset-naantalissa/",
    image: "https://visitnaantali.com/wp-content/uploads/2026/01/IMG_5562-5-870x580.jpeg",
    imageCredit: "Visit Naantali"
  },
  {
    id: "vk-marina",
    category: "experience",
    name: "VK Marina",
    description: {
      fi: "Veneilyä ja saaristopalveluja Naantalin saaristossa.",
      es: "Navegación y servicios de archipiélago en Naantali.",
      en: "Boating and archipelago services in Naantali."
    },
    url: "https://visitnaantali.com/nae-ja-koe/aktiviteetit/"
  },
  {
    id: "jani-ollikainen",
    category: "experience",
    name: "Kalastusopas Jani Ollikainen",
    description: {
      fi: "Ohjattuja kalastusretkiä Naantalin saaristossa.",
      es: "Excursiones de pesca guiadas en el archipiélago de Naantali.",
      en: "Guided fishing trips in the Naantali archipelago."
    },
    url: "https://visitnaantali.com/nae-ja-koe/aktiviteetit/"
  },
  {
    id: "aurinko-golf",
    category: "experience",
    name: "Aurinko Golf",
    description: {
      fi: "Golf-elämys Naantalin seudulla.",
      es: "Experiencia de golf en la zona de Naantali.",
      en: "Golf experience in the Naantali area."
    },
    url: "https://www.aurinkogolf.fi"
  },
  {
    id: "kultaranta-golf",
    category: "experience",
    name: "Kultaranta Resort Golf",
    description: {
      fi: "Golfia Kultaranta Resortin merellisessä ympäristössä.",
      es: "Golf en el entorno costero de Kultaranta Resort.",
      en: "Golf in the coastal setting of Kultaranta Resort."
    },
    url: "https://kultarantaresort.fi"
  },
  {
    id: "archipelago-ring-road",
    category: "nature",
    name: "Saariston Rengastie",
    description: {
      fi: "Saaristomatka, jossa Naantali toimii yhtenä luonnollisena lähtöpisteenä.",
      es: "Ruta por el archipiélago con Naantali como uno de sus puntos de partida.",
      en: "Archipelago route with Naantali as a natural starting point."
    },
    url: "https://visitnaantali.com/nae-ja-koe/saaristo/saariston-rengastiet/"
  },
  {
    id: "love-trail",
    category: "nature",
    name: "Rakkaudenpolku",
    description: {
      fi: "Maisemallinen kävelyreitti Naantalin saaristomaisemissa.",
      es: "Sendero paisajístico entre los paisajes del archipiélago de Naantali.",
      en: "Scenic walking route through Naantali's archipelago landscapes."
    },
    url: "https://visitnaantali.com"
  }
];

export const naantaliEvents: NaantaliEvent[] = [
  {
    id: "ruf-design-auction",
    start: "2026-10-03",
    title: { fi: "RUF Design -huutokauppa", es: "Subasta RUF Design", en: "RUF Design Auction" },
    location: "Naantalin Taidehuone",
    description: {
      fi: "Design-huutokauppa Naantalin Taidehuoneella.",
      es: "Subasta de diseño en la galería de arte de Naantali.",
      en: "Design auction at Naantali Art Room."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "raati-henki",
    start: "2026-10-07",
    end: "2026-10-25",
    title: { fi: "Raatihuoneen henki -näyttely", es: "Exposición El espíritu del Ayuntamiento", en: "Spirit of the Town Hall exhibition" },
    location: "Naantalin Raatihuone",
    description: {
      fi: "Naantalin Raatihuoneen historiaan ja tunnelmaan liittyvä näyttely.",
      es: "Exposición sobre la historia y el ambiente del antiguo ayuntamiento de Naantali.",
      en: "Exhibition about the history and atmosphere of Naantali Town Hall."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "saints-pilgrimages",
    start: "2026-10-07",
    title: { fi: "Pyhimyksiä ja pyhiinvaelluksia – historian havinaa Naantalin luostarikirkossa", es: "Santos y peregrinaciones – historia en la iglesia del convento", en: "Saints and pilgrimages – history at Naantali Abbey Church" },
    location: "Naantalin kirkko",
    description: {
      fi: "Historiallinen ilta Naantalin kirkossa.",
      es: "Una velada histórica en la iglesia de Naantali.",
      en: "A historical evening at Naantali Church."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "heli-laaksonen",
    start: "2026-10-15",
    title: { fi: "Heli Laaksosen sukke­la runoilta – ilon­hilaaja", es: "Noche de poesía de Heli Laaksonen", en: "Heli Laaksonen poetry evening" },
    location: "Kristoffer-sali",
    description: {
      fi: "Heli Laaksosen runoilta Naantalissa.",
      es: "Una noche de poesía de Heli Laaksonen en Naantali.",
      en: "A poetry evening by Heli Laaksonen in Naantali."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "reissubroidit",
    start: "2026-10-15",
    title: { fi: "Reissubroidit", es: "Reissubroidit", en: "Reissubroidit" },
    location: "Naantalin Kylpylän Paviljonki",
    description: {
      fi: "Reissubroidit Naantalin Kylpylässä.",
      es: "Reissubroidit en Naantali Spa.",
      en: "Reissubroidit at Naantali Spa."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "lux-gratiae-naantali",
    start: "2026-10-22",
    end: "2026-10-25",
    title: { fi: "Lux Gratiae 2026", es: "Lux Gratiae 2026", en: "Lux Gratiae 2026" },
    location: "Naantali",
    description: {
      fi: "Naantalin syksyn valaiseva kulttuuritapahtuma, jossa on ohjelmaa eri puolilla kaupunkia.",
      es: "Festival cultural de otoño que ilumina Naantali con actividades por toda la ciudad.",
      en: "Naantali's autumn light and culture festival with programme across the city."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/lux-gratiae-2026/",
    category: "culture"
  },
  {
    id: "music-festival-oct",
    start: "2026-10-24",
    title: { fi: "Naantalin Musiikkijuhlat: Ajan toinen nimi on muutos", es: "Festival de Música de Naantali: El otro nombre del tiempo es cambio", en: "Naantali Music Festival: Another Name for Time Is Change" },
    location: "Naantalin kirkko",
    description: {
      fi: "Naantalin Musiikkijuhlien konsertti Naantalin kirkossa.",
      es: "Concierto del Festival de Música de Naantali.",
      en: "Naantali Music Festival concert."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "neon-2",
    start: "2026-11-20",
    title: { fi: "Neon 2 Naantalin Kylpylässä", es: "Neon 2 en Naantali Spa", en: "Neon 2 at Naantali Spa" },
    location: "Naantalin Kylpylä",
    description: {
      fi: "K-18-konsertti Naantalin Kylpylässä.",
      es: "Concierto para mayores de 18 años en Naantali Spa.",
      en: "18+ concert at Naantali Spa."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "culture"
  },
  {
    id: "naantali-christmas",
    start: "2026-11-26",
    end: "2026-11-29",
    title: { fi: "Naantalin Joulu", es: "Navidad de Naantali", en: "Naantali Christmas" },
    location: "Naantalin keskusta ja vanhakaupunki",
    description: {
      fi: "Naantalin joulunavaus, markkinat, myyjäiset ja ohjelmaa eri puolilla keskustaa.",
      es: "Apertura de la Navidad de Naantali con mercados, actividades y ambiente festivo.",
      en: "Naantali Christmas opening with markets, activities and festive atmosphere."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/naantalin-joulu-2026/",
    category: "christmas"
  },
  {
    id: "four-roses",
    start: "2026-11-27",
    title: { fi: "Neljä Ruusua Naantalin Kylpylässä", es: "Neljä Ruusua en Naantali Spa", en: "Neljä Ruusua at Naantali Spa" },
    location: "Naantalin Kylpylä",
    description: {
      fi: "K-18-konsertti Naantalin Kylpylässä.",
      es: "Concierto para mayores de 18 años en Naantali Spa.",
      en: "18+ concert at Naantali Spa."
    },
    url: "https://visitnaantali.com/tapahtumakalenteri/",
    category: "christmas"
  }
];
