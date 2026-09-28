import type { Locale } from "@/types";

export type SaloProvider = {
  id: string;
  category: "tourism" | "stay" | "experience" | "nature" | "food";
  name: string;
  description: Record<Locale, string>;
  url: string;
  price?: string;
  image?: string;
  imageCredit?: string;
};

export type SaloEvent = {
  id: string;
  start: string;
  end?: string;
  title: Record<Locale, string>;
  location: string;
  description: Record<Locale, string>;
  url: string;
  category: "autumn" | "christmas" | "new-year" | "culture";
};

const cdn = "https://cdn-datahub.visitfinland.com/images/";
const providerImages = {
  marina: `${cdn}e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280`,
  villas: `${cdn}2c7e7830-f614-11f0-ad78-29bd5b45e175.jpeg?s=1280`,
  hotel: `${cdn}67490c50-bc54-11ef-9fcc-d37cec752366.jpeg?s=1280`,
  matri: `${cdn}532d5770-1b9a-11f1-b3a4-6d11235fc921.jpeg?s=1280`,
  cabins: `${cdn}40f256f0-6b21-11ed-8b5d-750472ef9a58.jpeg?s=1280`,
  sauna: `${cdn}a2446f90-7cba-11ef-a1fa-c33120773bf0.png?s=1280`,
  actionPark: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/P1040591-1-1339x768.jpg",
  brewery: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kyl%C3%A4panimo-laatikko-web.jpg",
};

export const saloProviders: SaloProvider[] = [
  {
    id: "visit-salo",
    category: "tourism",
    name: "Visit Salo",
    description: {
      fi: "Salon virallinen matkailusivusto: kohteet, tapahtumat, lähiruoka, majoitus ja retkeily.",
      es: "Sitio oficial de turismo de Salo: destinos, eventos, gastronomía local, alojamiento y naturaleza.",
      en: "Salo's official tourism site for destinations, events, local food, stays and nature.",
    },
    url: "https://visitsalo.fi",
  },
  {
    id: "visit-mathildedal",
    category: "tourism",
    name: "Visit Mathildedal",
    description: {
      fi: "Mathildedalin ruukkukylän oma matkailu- ja tapahtumainfo.",
      es: "Guía local de turismo y eventos de Mathildedal.",
      en: "Local tourism and events guide for Mathildedal.",
    },
    url: "https://visitmathildedal.fi",
  },
  {
    id: "hotel-mathildedal",
    category: "stay",
    name: "Hotel Mathildedal",
    description: {
      fi: "13 huoneen boutique-hotelli historiallisessa ruukkikylässä Teijon kansallispuiston vieressä.",
      es: "Hotel boutique de 13 habitaciones en el histórico pueblo siderúrgico junto al Parque Nacional de Teijo.",
      en: "A 13-room boutique hotel in the historic ironworks village beside Teijo National Park.",
    },
    url: "https://www.mathildedal.fi",
    image: providerImages.hotel,
    imageCredit: "Visit Salo / Visit Finland DataHub",
  },
  {
    id: "mathildan-marina",
    category: "stay",
    name: "Mathildan Marina",
    description: {
      fi: "Satamahotelli meren äärellä, ravintola, saunaosasto, vierasvenesatama ja matkaparkki.",
      es: "Hotel junto al puerto, restaurante, saunas, puerto de invitados y área para autocaravanas.",
      en: "Harbour hotel with restaurant, sauna area, guest marina and motorhome parking.",
    },
    url: "https://www.mathildanmarina.fi",
    price: "2026: alkaen 149 €/vrk",
    image: providerImages.marina,
    imageCredit: "Visit Salo / Visit Finland DataHub",
  },
  {
    id: "matilda-villas",
    category: "stay",
    name: "Matilda Villas",
    description: {
      fi: "18 mökin kokonaisuus meren tuntumassa, oma ranta ja paljon yhteisiä aktiviteetteja.",
      es: "18 villas junto al mar, playa privada y actividades compartidas.",
      en: "18 seaside villas with a private beach and shared activities.",
    },
    url: "https://www.matildavillas.fi",
    image: providerImages.villas,
    imageCredit: "Visit Salo / Visit Finland DataHub",
  },
  {
    id: "matri-house",
    category: "stay",
    name: "Matri House",
    description: {
      fi: "Vuonna 1840 rakennettu boutique-talo, kuusi yksilöllistä huonetta ja puutarha Mathildedalin sydämessä.",
      es: "Casa boutique de 1840 con seis habitaciones únicas y jardín en el corazón de Mathildedal.",
      en: "A restored 1840 boutique house with six unique rooms and a garden in the heart of Mathildedal.",
    },
    url: "https://matrihouse.fi",
    image: providerImages.matri,
    imageCredit: "Visit Salo / Visit Finland DataHub",
  },
  {
    id: "majoitus-mathildedal",
    category: "stay",
    name: "Majoitus Mathildedal",
    description: {
      fi: "Mökki Mathildedalin kylässä. Ajantasainen hinta ja saatavuus pyydetään suoraan majoittajalta.",
      es: "Casa de vacaciones en Mathildedal. Consulta directamente al anfitrión el precio y la disponibilidad actuales.",
      en: "Holiday cottage in Mathildedal. Ask the provider directly for the current price and availability.",
    },
    url: "https://www.majoitusmathildedal.com",
  },
  {
    id: "teijo-action-park",
    category: "experience",
    name: "Teijo Ski & Action Park",
    description: {
      fi: "Rinneautoilua, pyöräilyä, golfia ja talvikaudella laskettelua Teijolla.",
      es: "Actividades de acción, ciclismo, golf y esquí durante la temporada de nieve.",
      en: "Action activities, cycling, golf and skiing during the snow season in Teijo.",
    },
    url: "https://www.meriteijo.fi",
    price: "Rinneautoilu: 2 kierrosta 16 €, 4 kierrosta 26 €, 5 kierrosta 32 €/hlö",
    image: providerImages.actionPark,
    imageCredit: "Visit Salo",
  },
  {
    id: "chill-out-fishing",
    category: "experience",
    name: "Chill Out Fishing",
    description: {
      fi: "Ohjattuja kalastus-, vene- ja saariretkiä Saaristomerellä. Hinnat ja saatavuus verkkokaupassa tai tarjouspyynnöllä.",
      es: "Pesca guiada, excursiones en barco y visitas a islas en el Mar del Archipiélago.",
      en: "Guided fishing, boat and island trips in the Archipelago Sea.",
    },
    url: "https://www.chilloutfishing.fi",
    price: "Hinta retken ja ryhmän mukaan – tarkista palveluntarjoajalta",
  },
  {
    id: "salon-oppaat",
    category: "experience",
    name: "Salon Oppaat",
    description: {
      fi: "Paikallisia opastuksia ja retkiä Salossa. Hinta riippuu valitusta retkestä.",
      es: "Visitas guiadas y experiencias locales en Salo.",
      en: "Local guided tours and experiences in Salo.",
    },
    url: "https://salonoppaat.johku.com",
  },
  {
    id: "teijo-national-park",
    category: "nature",
    name: "Teijon kansallispuisto",
    description: {
      fi: "Järviä, metsiä, kallioita ja reittejä ympäri vuoden. Kansallispuiston perusluonto on maksuton; vuokrattavista palveluista veloitetaan erikseen.",
      es: "Lagos, bosques, rocas y senderos durante todo el año. El acceso básico al parque es gratuito; los servicios de alquiler se cobran aparte.",
      en: "Lakes, forests, rocks and trails year-round. Basic access to the national park is free; rental services are charged separately.",
    },
    url: "https://www.luontoon.fi/teijo",
    image: providerImages.cabins,
    imageCredit: "Visit Salo / Visit Finland DataHub",
  },
  {
    id: "meri-teijo-golf",
    category: "experience",
    name: "Meri-Teijo Golf",
    description: {
      fi: "Golfia Teijon merellisissä maisemissa. Ajantasainen green fee kannattaa tarkistaa suoraan kentältä.",
      es: "Golf en el paisaje costero de Teijo. Consulta directamente el green fee actual.",
      en: "Golf in the coastal landscape of Teijo. Check the current green fee directly with the club.",
    },
    url: "https://www.meriteijogolf.fi",
  },
  {
    id: "mathildedal-brewery",
    category: "food",
    name: "Mathildedalin Kyläpanimo",
    description: {
      fi: "Kyläläisten perustama pienpanimo Mathildedalin sydämessä. Ryhmille järjestetään panimoesittelyjä.",
      es: "Microcervecería local en el corazón de Mathildedal, con visitas para grupos.",
      en: "A village brewery in the heart of Mathildedal, with brewery introductions for groups.",
    },
    url: "https://kylapanimo.fi",
    image: providerImages.brewery,
    imageCredit: "Visit Salo",
  },
];

export const saloEvents: SaloEvent[] = [
  {
    id: "improv-30-9",
    start: "2026-09-30",
    title: { fi: "Iloton-improklubi", es: "Club de improvisación Iloton", en: "Iloton Improv Club" },
    location: "Salo",
    description: {
      fi: "Syksyn kulttuuri-ilta Salon tapahtumakalenterissa.",
      es: "Una noche de cultura y teatro de improvisación en Salo.",
      en: "An evening of culture and improv theatre in Salo.",
    },
    url: "https://tapahtumat.salo.fi",
    category: "culture",
  },
  {
    id: "autumn-market",
    start: "2026-10-01",
    end: "2026-10-03",
    title: { fi: "Salon syysmarkkinat", es: "Mercado de otoño de Salo", en: "Salo Autumn Market" },
    location: "Salon tori",
    description: {
      fi: "Salon perinteiset syysmarkkinat täyttävät torin syksyn tunnelmalla, herkuilla ja markkinahumulla.",
      es: "El tradicional mercado de otoño de Salo llena la plaza de ambiente, sabores y puestos.",
      en: "Salo's traditional autumn market fills the square with seasonal atmosphere, food and stalls.",
    },
    url: "https://tapahtumat.salo.fi/location/salon_tori/",
    category: "autumn",
  },
  {
    id: "visit-valo",
    start: "2026-10-03",
    end: "2027-01-03",
    title: { fi: "Visit valo – valotaiteen näyttely", es: "Visit valo – exposición de arte de la luz", en: "Visit valo – light art exhibition" },
    location: "Salon taidemuseo Veturitalli",
    description: {
      fi: "Valotaiteen näyttely 3.10.2026–3.1.2027. Pääsymaksu 10 € / 7 €, Museokortti käy.",
      es: "Exposición de arte de la luz del 3.10.2026 al 3.1.2027. Entrada 10 € / 7 €.",
      en: "Light art exhibition from 3 Oct 2026 to 3 Jan 2027. Admission €10 / €7; Museum Card accepted.",
    },
    url: "https://tapahtumat.salo.fi/salon-taidemuseo-veturitalli-visit-valo/",
    category: "culture",
  },
  {
    id: "ghost-museum",
    start: "2026-10-09",
    end: "2026-10-25",
    title: { fi: "Kummitusmuseo Mathildedalissa", es: "Museo de fantasmas en Mathildedal", en: "Ghost Museum in Mathildedal" },
    location: "Mathildedalin Ruukkitehtaat",
    description: {
      fi: "Syksyn tunnelmallinen kummitusmuseo. Tarkista järjestäjän aukioloajat ennen matkaa.",
      es: "Museo de fantasmas de otoño. Comprueba los horarios del organizador antes de viajar.",
      en: "A seasonal ghost museum. Check the organizer's opening hours before travelling.",
    },
    url: "https://visitmathildedal.fi/fi/tapahtumat",
    category: "autumn",
  },
  {
    id: "ghost-trail",
    start: "2026-10-09",
    end: "2026-10-18",
    title: { fi: "Kummituspolku & aavemainen rantailta", es: "Sendero de fantasmas y noche junto al mar", en: "Ghost Trail & eerie seaside evening" },
    location: "Matilda Villas, Mathildedal",
    description: {
      fi: "Kurpitsoita, kummituksia ja syyslomaviikon tunnelmaa Mathildedalissa.",
      es: "Calabazas, fantasmas y ambiente de vacaciones de otoño en Mathildedal.",
      en: "Pumpkins, ghosts and autumn-holiday atmosphere in Mathildedal.",
    },
    url: "https://visitmathildedal.fi/fi/tapahtumat",
    category: "autumn",
  },
  {
    id: "kekri",
    start: "2026-10-10",
    end: "2026-10-18",
    title: { fi: "Rikalanmäen Kekrimarkkinat", es: "Mercado de Kekri en Rikalanmäki", en: "Rikalanmäki Kekri Market" },
    location: "Rikalanmäki",
    description: {
      fi: "Syksyn ja sadonkorjuun tunnelmaa Rikalanmäellä.",
      es: "Ambiente de otoño y cosecha en Rikalanmäki.",
      en: "Autumn and harvest atmosphere at Rikalanmäki.",
    },
    url: "https://visitsalo.fi/vuoden-tapahtumakooste/",
    category: "autumn",
  },
  {
    id: "pumpkin",
    start: "2026-10-10",
    title: { fi: "Salon suurin kurpitsa", es: "La calabaza más grande de Salo", en: "Salo's Biggest Pumpkin" },
    location: "Salon tori",
    description: {
      fi: "Salon kurpitsakuninkuuden ratkaiseva jättikurpitsakilpailu.",
      es: "Concurso de la calabaza gigante que decide al campeón de Salo.",
      en: "The giant-pumpkin competition deciding Salo's pumpkin champion.",
    },
    url: "https://tapahtumat.salo.fi/location/salon_tori/",
    category: "autumn",
  },
  {
    id: "father-day-marina",
    start: "2026-11-08",
    title: { fi: "Sataman isänpäivä Mathildan Marinassa", es: "Día del Padre en Mathildan Marina", en: "Father's Day at Mathildan Marina" },
    location: "Mathildan Marina",
    description: {
      fi: "Juhlava saaristolaisbuffet ja kakku satamassa.",
      es: "Buffet festivo del archipiélago y tarta en el puerto.",
      en: "Festive archipelago buffet and cake at the harbour.",
    },
    url: "https://mathildanmarina.fi/tulevat-tapahtumat/",
    category: "autumn",
  },
  {
    id: "mathildedal-christmas-1",
    start: "2026-11-21",
    title: { fi: "Mathildedalin joulumarkkinat", es: "Mercado de Navidad de Mathildedal", en: "Mathildedal Christmas Market" },
    location: "Mathildedalin Ruukkitehtaat",
    description: {
      fi: "Joulutunnelmaa, käsityöläisiä, lähituottajia ja kylän putiikkeja.",
      es: "Ambiente navideño, artesanos, productores locales y tiendas del pueblo.",
      en: "Christmas atmosphere, local makers, producers and village shops.",
    },
    url: "https://visitsalo.fi/joulusalo/",
    category: "christmas",
  },
  {
    id: "mathildedal-christmas-2",
    start: "2026-11-28",
    title: { fi: "Mathildedalin joulumarkkinat", es: "Mercado de Navidad de Mathildedal", en: "Mathildedal Christmas Market" },
    location: "Mathildedalin Ruukkitehtaat",
    description: {
      fi: "Toinen joulumarkkinapäivä Mathildedalin ruukkikylässä.",
      es: "Segunda jornada del mercado navideño en Mathildedal.",
      en: "Second Christmas Market day in Mathildedal.",
    },
    url: "https://visitsalo.fi/joulusalo/",
    category: "christmas",
  },
  {
    id: "teijo-christmas",
    start: "2026-11-28",
    end: "2026-11-29",
    title: { fi: "Teijon Masuunin joulumarkkinat", es: "Mercado de Navidad de Teijon Masuuni", en: "Teijon Masuuni Christmas Market" },
    location: "Teijon Masuuni",
    description: {
      fi: "Joulumarkkinat Teijon Masuunilla lauantaina ja sunnuntaina.",
      es: "Mercado navideño de fin de semana en Teijon Masuuni.",
      en: "A weekend Christmas market at Teijon Masuuni.",
    },
    url: "https://visitsalo.fi/joulusalo/",
    category: "christmas",
  },
  {
    id: "wiurila-christmas",
    start: "2026-11-28",
    end: "2026-11-29",
    title: { fi: "Wiurilan perinteiset joulumyyjäiset", es: "Mercado navideño tradicional de Wiurila", en: "Wiurila Traditional Christmas Market" },
    location: "Wiurilan kartano",
    description: {
      fi: "Perinteiset joulumyyjäiset Wiurilan kartanolla.",
      es: "Mercado navideño tradicional en la mansión de Wiurila.",
      en: "Traditional Christmas market at Wiurila Manor.",
    },
    url: "https://visitsalo.fi/joulusalo/",
    category: "christmas",
  },
  {
    id: "rikalanmaki-christmas",
    start: "2026-12-05",
    end: "2026-12-06",
    title: { fi: "Rikalanmäen joulumyyjäiset", es: "Mercado navideño de Rikalanmäki", en: "Rikalanmäki Christmas Market" },
    location: "Rikalanmäki",
    description: {
      fi: "Tunnelmalliset joulumyyjäiset Rikalanmäellä.",
      es: "Mercado navideño con ambiente tradicional en Rikalanmäki.",
      en: "A cosy traditional Christmas market at Rikalanmäki.",
    },
    url: "https://visitsalo.fi/joulusalo/",
    category: "christmas",
  },
  {
    id: "mathildedal-reflection",
    start: "2026-12-23",
    title: { fi: "Jouluun hiljentyminen", es: "Un momento de reflexión navideña", en: "A Moment of Christmas Reflection" },
    location: "Mathildedalin Ruukkitehtaat",
    description: {
      fi: "Rauhallinen hetki ennen joulua Mathildedalin ruukkikylässä.",
      es: "Un momento de calma antes de Navidad en Mathildedal.",
      en: "A quiet moment before Christmas in Mathildedal.",
    },
    url: "https://visitmathildedal.fi/fi/tapahtumat",
    category: "christmas",
  },
  {
    id: "new-year",
    start: "2026-12-31",
    title: { fi: "Uuden vuoden karnevaalit Mathildedalissa", es: "Carnaval de Año Nuevo en Mathildedal", en: "New Year's Carnival in Mathildedal" },
    location: "Mathildedal",
    description: {
      fi: "Vuoden vaihtumisen juhla Mathildedalin kylässä.",
      es: "Celebración de Año Nuevo en el pueblo de Mathildedal.",
      en: "New Year's celebration in Mathildedal village.",
    },
    url: "https://visitmathildedal.fi/fi/tapahtumat",
    category: "new-year",
  },
  {
    id: "marina-new-year",
    start: "2026-12-31",
    title: { fi: "Sataman uusi vuosi", es: "Año Nuevo en el puerto", en: "New Year's Eve at the Harbour" },
    location: "Mathildan Marina",
    description: {
      fi: "Ruokaa, juomaa ja uudenvuoden tunnelmaa Mathildan Marinassa.",
      es: "Comida, bebidas y ambiente de Año Nuevo en Mathildan Marina.",
      en: "Food, drinks and New Year's atmosphere at Mathildan Marina.",
    },
    url: "https://mathildanmarina.fi/tulevat-tapahtumat/",
    category: "new-year",
  },
];
