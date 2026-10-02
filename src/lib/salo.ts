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
  {
    id: "vuohensaari-camping",
    category: "stay",
    name: "Vuohensaaren leirintäalue",
    description: {
      fi: "Meren ympäröimä majoituskohde lähellä Salon keskustaa. Leirintämökkejä ja -huoneita, sauna, uimaranta sekä kesäkauden ravintola ja aktiviteetteja.",
      es: "Alojamiento junto al mar cerca del centro de Salo, con cabañas y habitaciones, sauna, playa y actividades de verano.",
      en: "Seaside accommodation close to Salo centre, with camping cabins and rooms, sauna, beach and summer activities.",
    },
    url: "https://www.visitvuohensaari.fi",
    image: "https://cdn-datahub.visitfinland.com/images/0eed73e0-0120-11f1-ad78-29bd5b45e175.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "teijo-tentsile",
    category: "stay",
    name: "Tentsile-majoitus Teijon kansallispuistossa",
    description: {
      fi: "Kolmen hengen Tentsile-puumajoite Matildanjärven lähellä. Majoitukseen kuuluu Luontokeskuksen peseytymistilojen käyttö ja saunavuoroalennus.",
      es: "Alojamiento Tentsile para hasta tres personas junto al lago Matildanjärvi, cerca del Parque Nacional de Teijo.",
      en: "A Tentsile tree tent for up to three guests beside Lake Matildanjärvi, near Teijo National Park.",
    },
    url: "https://naturaviva.fi/fi_FI/tutustu-palveluihin/majoitus/tentsile-majoitus-teijon-luontokeskuksessa",
    image: "https://cdn-datahub.visitfinland.com/images/7dc2c5b0-053b-11ee-8a3c-a9c9986204a3.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "kattohuone-mathildedal",
    category: "stay",
    name: "Kattohuone – Elämysmajoitus",
    description: {
      fi: "Mathildedalin vanhan kokoonpanohallin katolle rakennettu merikonttimajoitus. Maisemaikkuna, oma kylpyhuone ja hotellin aamiainen.",
      es: "Alojamiento en contenedores sobre un antiguo edificio industrial de Mathildedal, con gran ventana panorámica, baño privado y desayuno.",
      en: "Container rooms on the roof of a historic industrial building in Mathildedal, with a large view window, private bathroom and breakfast.",
    },
    url: "https://www.mathildedal.fi",
  },
  {
    id: "villa-signell",
    category: "stay",
    name: "Villa Signell",
    description: {
      fi: "1950-luvun kaksikerroksinen huvila Särkisalon Förbyssä. Neljä makuuhuonetta, merinäköala ja tilavat yhteiset tilat jopa seitsemälle.",
      es: "Villa de dos plantas de los años 50 en Förby, Särkisalo. Cuatro dormitorios, vistas al mar y espacio para hasta siete huéspedes.",
      en: "A two-storey 1950s villa in Förby, Särkisalo, with four bedrooms, sea views and space for up to seven guests.",
    },
    url: "https://www.karlforsstrom.fi/fi/villasignell/",
    image: "https://cdn-datahub.visitfinland.com/images/ff433090-0627-11f0-87ff-4128062e9bec.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "finnholm-strandbo",
    category: "stay",
    name: "Finnholm – Strandbo",
    description: {
      fi: "Ympärivuotinen 1–6 hengen merenrantahuvila Ulkoluodolla. Oma laituri, poiju, soutuvene ja länteen avautuva ranta.",
      es: "Villa junto al mar para 1–6 personas durante todo el año en Ulkoluoto, con embarcadero, bote de remos y costa orientada al oeste.",
      en: "Year-round seaside villa for 1–6 guests on Ulkoluoto, with a private pier, rowing boat and west-facing shore.",
    },
    url: "https://www.finnholm.net",
  },
  {
    id: "aava-adventures",
    category: "stay",
    name: "Aava Adventures",
    description: {
      fi: "Saunallinen mökkimajoitus Särkisalon Förbyssä. Samalta palveluntarjoajalta löytyy kajakkivuokrausta ja opastettuja saaristoretkiä.",
      es: "Cabaña con sauna en Förby, Särkisalo. El mismo proveedor ofrece alquiler de kayaks y excursiones guiadas por el archipiélago.",
      en: "A sauna cottage in Förby, Särkisalo. The provider also offers kayak rental and guided archipelago trips.",
    },
    url: "https://www.aavaadventures.fi",
  },
  {
    id: "katiskanmaeki",
    category: "stay",
    name: "Katiskanmäki",
    description: {
      fi: "Rauhallisia rantamökkejä järven ja pienen metsälammen äärellä, lisäksi aittamajoitusta, leirintää ja savusauna.",
      es: "Cabañas junto al agua, alojamiento en granero, camping y sauna de humo en un entorno rural de Särkisalo.",
      en: "Waterfront cottages, barn accommodation, camping and a smoke sauna in a quiet rural setting near Särkisalo.",
    },
    url: "https://www.katiskanmaki.com",
  },
  {
    id: "lonnviken",
    category: "stay",
    name: "Lönnviken – Villa Lönnviken & Lilla Lönnviken",
    description: {
      fi: "Petun saaren saaristomajoitusta. Villa Lönnvikenissä on vuoteet kahdeksalle ja rantasauna, Lilla Lönnvikenissä neljä vuodepaikkaa, sisäsauna ja oma laituri.",
      es: "Alojamiento en la isla de Pettu. Villa Lönnviken tiene capacidad para ocho y sauna junto a la playa; Lilla Lönnviken para cuatro, con sauna interior y embarcadero.",
      en: "Archipelago stays on Pettu island. Villa Lönnviken sleeps eight with a beach sauna; Lilla Lönnviken sleeps four with an indoor sauna and private pier.",
    },
    url: "https://www.lonnviken.com",
  },
  {
    id: "meri-ruukin-lomakyla",
    category: "stay",
    name: "Meri-Ruukin lomakylä",
    description: {
      fi: "Kuuden hengen mökkejä meren äärellä Mathildedalin lähellä. Mökeissä on oma sauna ja takka; rannalla on laituri ja soutuveneitä.",
      es: "Cabañas para seis personas junto al mar cerca de Mathildedal, con sauna y chimenea privadas, embarcadero y botes de remos.",
      en: "Six-person seaside cottages near Mathildedal, with private sauna and fireplace, plus a pier and rowing boats.",
    },
    url: "https://meri-ruukki.fi/",
  },
  {
    id: "topilan-tupa",
    category: "stay",
    name: "Topilan Tupa",
    description: {
      fi: "Tunnelmallinen viiden hengen saunamökki Halikon maaseudulla. Puusauna, takka, terassi ja rauhallinen metsäsijainti.",
      es: "Cabaña con sauna para cinco personas en la campiña de Halikko, con sauna de leña, chimenea y terraza.",
      en: "A cosy five-person sauna cottage in the Halikko countryside, with wood-fired sauna, fireplace and terrace.",
    },
    url: "https://toivontila.fi/",
  },
  {
    id: "onnenperan-mokki",
    category: "stay",
    name: "Onnenperän Mökki",
    description: {
      fi: "Ympärivuotinen seitsemän vuodepaikan mökki Vaskiossa. Kesällä käytössä on lisäksi nukkuma-aitta, metsälampi ja savusauna.",
      es: "Cabaña para siete personas durante todo el año en Vaskio; en verano también hay un dormitorio independiente, estanque y sauna de humo.",
      en: "Year-round cottage for seven in Vaskio; in summer there is also a separate sleeping hut, forest pond and smoke sauna.",
    },
    url: "https://toivontila.fi/",
  },
  {
    id: "leipyolin-tila",
    category: "stay",
    name: "Leipyölin tila",
    description: {
      fi: "Maatilamajoitusta Perniön Kiskonjokilaaksossa. Valikoimaan kuuluu aamiaismajoitusta ja mökkivuokrausta sekä tilan muita palveluja.",
      es: "Alojamiento rural en el valle de Kiskonjoki, con bed & breakfast y alquiler de cabañas, además de servicios de la granja.",
      en: "Farm accommodation in the Kiskonjoki valley, including bed & breakfast and cottage rental.",
    },
    url: "https://www.leipyoli.com",
  },
  {
    id: "villa-nennebo",
    category: "stay",
    name: "Villa Nennebo",
    description: {
      fi: "Kaksi huvilaa Petun saaressa: Villa Nennebo ja Lilla Nennebo. Saaristomaisemat, oma ranta ja perinteinen saaristotunnelma.",
      es: "Dos villas en la isla de Pettu: Villa Nennebo y Lilla Nennebo, con costa privada y ambiente tradicional del archipiélago.",
      en: "Two villas on Pettu island, with private shore, sea views and a traditional archipelago atmosphere.",
    },
    url: "https://www.villanennebo.fi/",
  },
  {
    id: "alaspaan-maatila",
    category: "stay",
    name: "Alaspään maatila – Muonamiehen mökki",
    description: {
      fi: "Pieni luomutila Kiskonjoen varrella Perniössä. Kesäisin vuokrattava vaatimaton Muonamiehen mökki yhdistyy maaseutu- ja luontoelämyksiin.",
      es: "Pequeña granja ecológica junto al río Kiskonjoki. En verano se alquila la sencilla cabaña Muonamiehen mökki.",
      en: "A small organic farm by the Kiskonjoki river. The simple Muonamiehen cottage is available for summer rental.",
    },
    url: "https://alaspaanmaatila.fi",
  },
  {
    id: "villa-viola",
    category: "stay",
    name: "Villa Viola",
    description: {
      fi: "Huvilatasoinen kesämökki Suomusjärvellä. Sisä-WC, keittiö, Wi-Fi, sähkösauna ja terassi paljulla.",
      es: "Villa de verano de nivel superior en Suomusjärvi, con baño interior, cocina, wifi, sauna eléctrica y terraza con jacuzzi.",
      en: "Villa-style summer cottage in Suomusjärvi with indoor bathroom, kitchen, Wi-Fi, electric sauna and a hot-tub terrace.",
    },
    url: "https://www.lomalaperla.com",
  },
  {
    id: "villa-laperla",
    category: "stay",
    name: "Villa Laperla",
    description: {
      fi: "Perinteinen suomalainen kesämökki Suomusjärvellä. Puusauna, palju ja suuri terassi.",
      es: "Cabaña de verano finlandesa tradicional en Suomusjärvi, con sauna de leña, jacuzzi y amplia terraza.",
      en: "Traditional Finnish summer cottage in Suomusjärvi with wood-fired sauna, hot tub and a large terrace.",
    },
    url: "https://www.lomalaperla.com",
  },
  {
    id: "villa-viktoria",
    category: "stay",
    name: "Villa Viktoria",
    description: {
      fi: "Luksushuvilatasoinen kesämökki Suomusjärvellä. Sähkösauna, takka, hyvin varusteltu keittiö ja terassi porealtaalla.",
      es: "Villa de verano de nivel lujo en Suomusjärvi, con sauna eléctrica, chimenea, cocina equipada y terraza con jacuzzi.",
      en: "Luxury villa-style summer cottage in Suomusjärvi with electric sauna, fireplace, equipped kitchen and hot-tub terrace.",
    },
    url: "https://www.lomalaperla.com",
  },
  {
    id: "teijon-kammari",
    category: "stay",
    name: "Teijon Kammari",
    description: {
      fi: "Meren rannalla Teijolla sijaitseva pieni mökki, jossa on puulämmitteinen sauna, minikeittiö ja merelle avautuva parveke.",
      es: "Pequeña cabaña junto al mar en Teijo, con sauna de leña, minikocina y balcón frente al mar.",
      en: "A small seaside cottage in Teijo with a wood-fired sauna, kitchenette and balcony facing the sea.",
    },
    url: "https://kohteet.visitsalo.fi/teijon-kammari/",
  },
  {
    id: "kruuvan-mokit",
    category: "stay",
    name: "Kruuvan mökit",
    description: {
      fi: "Kahdeksan hengen Villa Kruuva merenlahden äärellä. Varusteltu ympärivuotiseen lomailuun, saunat ja merimaisemat.",
      es: "Villa Kruuva para ocho personas junto a una bahía marina, equipada para estancias durante todo el año y con sauna.",
      en: "Villa Kruuva for eight by a sea bay, equipped for year-round stays and sauna relaxation.",
    },
    url: "https://www.kruuvanmokit.fi",
  },
  {
    id: "meri-veikko",
    category: "stay",
    name: "Meri-Veikko",
    description: {
      fi: "Pieni 1–2 hengen merenrantamökki Petun saaressa. Sisäsauna, takka, soutuvene ja ympärivuotinen tieyhteys.",
      es: "Pequeña cabaña junto al mar para 1–2 personas en Pettu, con sauna interior, chimenea y bote de remos.",
      en: "Small 1–2 person seaside cottage on Pettu island, with indoor sauna, fireplace and rowing boat.",
    },
    url: "https://www.nettimokki.com",
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
    id: "ghost-museum-november",
    start: "2026-10-31",
    end: "2026-11-01",
    title: { fi: "Kummitusmuseo Mathildedalissa", es: "Museo de fantasmas en Mathildedal", en: "Ghost Museum in Mathildedal" },
    location: "Mathildedalin Ruukkitehtaat",
    description: {
      fi: "Kummitusmuseon toinen syksyn viikonloppu Mathildedalin Ruukkitehtailla. Tarkista ajantasaiset aukioloajat järjestäjältä.",
      es: "Segundo fin de semana del Museo de fantasmas en Mathildedal. Comprueba los horarios actuales con el organizador.",
      en: "The second autumn weekend of the Ghost Museum at Mathildedal ironworks. Check current opening hours with the organizer.",
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
