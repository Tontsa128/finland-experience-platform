import type { Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";

export type SaloProvider = {
  id: string;
  category: "tourism" | "stay" | "experience" | "nature" | "food";
  name: string;
  nameByLocale?: Partial<Record<Locale, string>>;
  description: Record<Locale, string>;
  url: string;
  price?: string;
  priceByLocale?: Partial<Record<Locale, string>>;
  image?: string;
  imageCredit?: string;
  imageSource?: string;
  officialGuide?: boolean;
};

export type SaloEvent = {
  id: string;
  start: string;
  end?: string;
  title: Record<Locale, string>;
  location: string;
  description: Record<Locale, string>;
  url: string;
  image?: string;
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
  ilolanArboretum: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2023/10/rodot-rissa-1157x768.jpg",
  rinteenFarm: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/12/rinteen-tila-768x768.jpg",
  kanginFarm: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/09/2017-07-29-003-1152x768.jpg",
  hyypparaTrail: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/08/Hyypp%C3%A4r%C3%A4n-maisema-768x768.jpg",
  kurjenFarm: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/12/kurjen-tila-1160x768.jpg",
  korpiahoDesign: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/02/Korpiaho-Design_keramiikkastudio_keramiikkakurssi-1152x768.jpg",
  pertteliChurch: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Perttelin-kirkko-ja-kellotapuli-web.jpg",
  muurlaInstitute: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/visitsalo_opisto-1366x768.jpg",
  muurlaStore: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Muurla-1-web.jpg",
  marynummiBeach: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/Uimaranta-M%C3%A4ry_-1366x768.jpg",
  mutainenFishing: "https://lohenrengas.wordpress.com/wp-content/uploads/2015/03/kivijc3a4rvi-e1426164908827.jpg",
  juurevastiTours: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/01/VisitSaloon-JuurevastiJuurista-kohdekortti-1920-x-1080-px-3-1366x768.jpg",
  rymyDogForest: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2025/10/Koirametsa-Rymy-Salo-luonnollinen-maasto-1366x768.jpg",
  ilolanRaspberries: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/ilola7-1153x768.jpeg",
  marynummiFitnessTrail: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/08/IMG_1397-1024x768.jpg",
  halikkoWiurila: "https://wiurila.fi/wp-content/uploads/2026/06/paarakennus_u_16.jpg",
  wiurilaGasthaus: "https://wiurila.fi/wp-content/uploads/2026/04/IMG_8451-scaled-1-2.jpeg",
  wiurilaRestaurant: "https://wiurila.fi/wp-content/uploads/2026/06/ravinteli.png",
  vaskiCider: "https://cdn-datahub.visitfinland.com/images/fc6ca1d0-b181-11ef-b5a0-3d8c42928efa.jpeg?s=1280",
  wanhantuvanAnkkala: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/Ankkala.jpg",
  vaskioBed: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2023/08/Vaskio-Bed-1-1-1024x768.jpg",
  ylivesaFarm: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2023/01/20210616-DSC06887-1151x768.jpg",
  villenVineyard: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/06/IMG_20200802_185343-1024x768.jpg",
  salonArtLoan: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2022/10/311169416_415808624065753_1920076266043848120_n.jpg",
  vuohensaariNature: "https://cdn-datahub.visitfinland.com/images/a8305e60-58e5-11ec-9ba4-0dc52985e5d5-Vuohensaari%20k%C3%A4velyll%C3%A4.jpg?s=1280",
  vuohensaariMinigolf: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/vuohensaari-minigolf-1366x768.jpg",
  rikalaRestaurant: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/11/Rikala-0009-1150x768.jpg",
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
    image: photoLibrary.saloVeturitalli,
    imageCredit: "Motopark / Wikimedia Commons — Veturitalli, Salo (public domain)",
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
    image: photoLibrary.mathildedalHarbour,
    imageCredit: "Visit Mathildedal / Wikimedia Commons licensed harbour photo",
  },
  {
    id: "hotel-mathildedal",
    category: "stay",
    name: "Hotel Mathildedal",
    description: {
      fi: "Hotel Mathildedal on 13 huoneen boutique-hotelli Salon Mathildedalin historiallisessa ruukkikylässä. Hotellissa yhdistyvät vanhan teollisuusmiljöön tunnelma, rauhallinen sisustus ja modernit mukavuudet. Huonetyyppeihin kuuluvat Premium-, Comfort-, Cosy- ja Rooftop-huoneet, ja hotelliaamiainen sisältyy huonehintaan. Vastaanotto palvelee Café Mathildedalin yhteydessä. Lähellä ovat kylän ravintolat, kahvilat ja putiikit sekä Teijon kansallispuiston luontoreitit. Hotelli järjestää myös ryhmä- ja kokouspalveluja. Tarkista ajantasaiset huonekuvaukset, hinnat, palvelut ja saatavuus suoraan hotellilta.",
      en: "Hotel Mathildedal is a 13-room boutique hotel in the historic ironworks village of Mathildedal in Salo. It combines the character of the former industrial setting with calm interiors and modern comforts. Room categories include Premium, Comfort, Cosy and Rooftop, and breakfast is included in the room rate. Reception is located at Café Mathildedal. Restaurants, cafés and independent shops are within the village, while the trails and lakes of Teijo National Park are close by. The hotel also offers services for groups and meetings. Check current room details, rates, services and availability directly with the hotel.",
      es: "Hotel Mathildedal es un hotel boutique de 13 habitaciones situado en el histórico pueblo siderúrgico de Mathildedal, en Salo. Combina el carácter del antiguo entorno industrial con interiores tranquilos y comodidades modernas. Ofrece habitaciones de las categorías Premium, Comfort, Cosy y Rooftop; el desayuno está incluido en el precio de la habitación. La recepción se encuentra en Café Mathildedal. En el pueblo hay restaurantes, cafeterías y pequeñas tiendas, y cerca se encuentran los senderos y lagos del Parque Nacional de Teijo. El hotel también ofrece servicios para grupos y reuniones. Consulta directamente con el hotel los detalles actuales de las habitaciones, tarifas, servicios y disponibilidad.",
    },
    url: "https://mathildedal.fi/",
    image: "https://mathildedal.fi/wp-content/uploads/2026/03/Hotel-Mathildedal-Premium-1024x1024.jpg",
    imageCredit: "Hotel Mathildedal — official provider website",
    imageSource: "https://mathildedal.fi/majoitus/",
  },
  {
    id: "mathildan-marina",
    category: "stay",
    name: "Mathildan Marina",
    description: {
      fi: "Mathildan Marina on Mathildedalin ruukkikylässä toimiva saaristohotelli ja täyden palvelun vierasvenesatama. Kuuden huoneen hotellissa on neljä alakerran huonetta sekä kaksi yläkerran parvekkeellista huonetta, joista toisesta avautuu merinäköala ja toisesta kylänäkymä. Huoneissa on oma wc ja suihku, Wi-Fi, televisio, minijääkaappi ja vedenkeitin; aamiainen sisältyy huonehintaan. Satamassa on noin 300 venepaikkaa, joista 40 vierasveneille, sekä 12 sähköistetyn paikan matkaparkki. Palveluihin kuuluvat satamaravintola ja meriterassi, kaksi yksityistä saunaa, lounge, katettu terassi ja erikseen varattava ulkoporeallas. Alueella on maksuton pysäköinti, ulkokuntosali ja rantalentopallokenttä. Tarkista hinnat, aukioloajat ja saatavuus suoraan Marinasta.",
      en: "Mathildan Marina is an archipelago hotel and full-service guest harbour in the historic ironworks village of Mathildedal. The six-room hotel has four ground-floor rooms and two upstairs rooms with balconies; one overlooks the sea and the other the village. Rooms include a private bathroom, Wi-Fi, TV, mini-fridge and kettle, and breakfast is included. The harbour has around 300 berths, including 40 for visiting boats, and a motorhome area with 12 powered pitches. Facilities include a waterfront restaurant and terrace, two private saunas, a lounge, a covered terrace and an outdoor hot tub available by separate booking. Free parking, an outdoor gym and a beach volleyball court are also available. Confirm current rates, opening hours and availability directly with the Marina.",
      es: "Mathildan Marina es un hotel del archipiélago y un puerto deportivo con servicios completos, situado en el histórico pueblo siderúrgico de Mathildedal. El hotel dispone de seis habitaciones: cuatro en la planta baja y dos en la planta superior con balcón; una ofrece vistas al mar y la otra al pueblo. Las habitaciones cuentan con baño privado, wifi, televisión, mininevera y hervidor; el desayuno está incluido. El puerto tiene unos 300 amarres, 40 de ellos para embarcaciones visitantes, y una zona para autocaravanas con 12 plazas con electricidad. Sus servicios incluyen restaurante y terraza junto al mar, dos saunas privadas, un salón, una terraza cubierta y una bañera de hidromasaje exterior que se reserva por separado. También hay aparcamiento gratuito, gimnasio al aire libre y pista de vóley-playa. Confirma directamente con Marina las tarifas, los horarios y la disponibilidad actuales.",
    },
    url: "https://mathildanmarina.fi/",
    price: "2026: huoneet 149–269 €/vrk huoneen ja henkilömäärän mukaan; aamiainen sisältyy",
    priceByLocale: { fi: "2026: huoneet 149–269 €/vrk huoneen ja henkilömäärän mukaan; aamiainen sisältyy", en: "2026: rooms €149–269/night depending on room and occupancy; breakfast included", es: "2026: habitaciones 149–269 €/noche según habitación y ocupación; desayuno incluido" },
    image: providerImages.marina,
    imageCredit: "Visit Finland DataHub / Visit Salo — Mathildan Marina",
    imageSource: "https://kohteet.visitsalo.fi/mathildan-marinan-hotelli-meren-ja-kansallispuiston-syleilyssa/",
  },
  {
    id: "matilda-villas",
    category: "stay",
    name: "Matilda Villas",
    description: {
      fi: "Matilda Villas on 18 ympärivuotiseen käyttöön tarkoitetun loma-asunnon kokonaisuus Mathildedalin vanhassa ruukkikylässä, meren tuntumassa. Valittavana on kaksi huvilatyyppiä: kaksikerroksinen 120 m²:n Villa Kukka kolmella erillisellä makuuhuoneella sekä yhdessä tasossa oleva 83 m²:n Villa Taimi kahdella makuuhuoneella. Huviloissa on lisämajoitustilaa olohuoneessa, hyvin varusteltu keittiö, oma sauna, takka ja terassi. Isommissa huviloissa on lisäksi patio, parveke ja kaasugrilli. Yhteisiin alueisiin kuuluvat pieni uimaranta, suojaisa grillikota, rantatulipaikka ja leikkialue. Kesäisin rannalla voi käyttää rantapunttista ja vesitrampoliinia. Majoittujille on maksuttomia polkupyöriä kylän palveluille kulkemiseen, ja alueella on sähköauton latauspiste. Lemmikit ovat tervetulleita. Kohde sopii perhelomien lisäksi ryhmille, juhliin, yritysten virkistyspäiviin ja etätyöhön. Rannalle kuljetaan mäen alta portaita pitkin. Tarkista huvilan kapasiteetti, varustelu, hinnat ja saatavuus suoraan Matilda Villasista.",
      en: "Matilda Villas is a collection of 18 year-round holiday cottages in the historic ironworks village of Mathildedal, close to the sea. Choose between two cottage types: the two-storey 120 m² Villa Kukka with three separate bedrooms, or the single-level 83 m² Villa Taimi with two bedrooms. The cottages offer additional sleeping space in the living room, a well-equipped kitchen, private sauna, fireplace and terrace. The larger cottages also have a patio, balcony and gas barbecue. Shared outdoor facilities include a small beach, sheltered barbecue hut, seaside fire pit and children's play area. In summer, guests can use the beach gym equipment and water trampoline. Complimentary bicycles make it easy to reach the village services, and an EV charging point is available on site. Pets are welcome. The setting also suits groups, celebrations, company recreation days and remote work. The beach is below the hillside and reached by steps. Confirm the capacity, facilities, rates and availability of your chosen cottage directly with Matilda Villas.",
      es: "Matilda Villas es un conjunto de 18 alojamientos vacacionales disponibles todo el año, en el histórico pueblo siderúrgico de Mathildedal, cerca del mar. Hay dos tipos de alojamiento: Villa Kukka, de 120 m² y dos plantas con tres dormitorios independientes, y Villa Taimi, de 83 m² en una sola planta con dos dormitorios. Las casas ofrecen plazas adicionales para dormir en el salón, cocina bien equipada, sauna privada, chimenea y terraza. Las casas más grandes también cuentan con patio, balcón y barbacoa de gas. Las zonas compartidas incluyen una pequeña playa, una kota cubierta para barbacoas, una hoguera junto al mar y un área de juegos infantil. En verano se puede utilizar el equipamiento de ejercicio de la playa y el trampolín acuático. Hay bicicletas gratuitas para llegar a los servicios del pueblo y un punto de carga para vehículos eléctricos. Se admiten mascotas. El lugar también es adecuado para grupos, celebraciones, jornadas de empresa y teletrabajo. La playa está al pie de la pendiente y se accede por escaleras. Confirma directamente con Matilda Villas la capacidad, el equipamiento, las tarifas y la disponibilidad del alojamiento elegido.",
    },
    url: "https://www.matildavillas.fi/",
    image: providerImages.villas,
    imageCredit: "Visit Finland DataHub / Matilda Villas — Salon Kohteet",
    imageSource: "https://kohteet.visitsalo.fi/matilda-villas-kaunis-mokkikyla-mathildedalissa-joka-majoittaa-isommankin-seurueen-laadukkaasti/",
  },
  {
    id: "matri-house",
    category: "stay",
    name: "Matri House",
    description: {
      fi: "Matri House on vuonna 1840 rakennettu ja huolellisesti kunnostettu puutalo Mathildedalin historiallisessa ruukkikylässä. Talossa on kuusi yksilöllisesti sisustettua 25–32 m²:n huonetta, joissa jokaisessa on oma kylpyhuone ja laadukas Matri-vuode. Huoneiden lisäksi vieraiden käytössä ovat yhteinen hyvin varusteltu keittiö, valoisa aamiaishuone, veranta, oleskelutila, yläkerran kirjasto ja omenapuiden ympäröimä puutarha. Huoneet sopivat 2–4 yöpyjälle, ja Edla- ja Selma-huoneet voidaan yhdistää väliovella keittiölliseksi perhesviitiksi. Koko talo majoittaa noin 16–18 henkilöä ja on varattavissa yksityisiin juhliin, kokouksiin ja yritystilaisuuksiin. Koko talon varaukseen kuuluu myös mahdollisuus käyttää erillistä puulämmitteistä pihasaunaa palveluntarjoajan ehtojen mukaisesti. Matri House sijaitsee kävelyetäisyydellä kylän ravintoloista, kahviloista ja putiikeista sekä lähellä Teijon kansallispuistoa. Tarkista huoneiden kausittainen saatavuus, hinnat ja varausehdot suoraan Matri Houselta.",
      en: "Matri House is a carefully restored wooden house dating from 1840, located in the historic ironworks village of Mathildedal. It has six individually designed rooms measuring 25–32 m², each with a private bathroom and a high-quality Matri bed. Guests can also use the shared, well-equipped kitchen, bright breakfast room, veranda, lounge, upstairs library and peaceful garden with apple trees. Rooms accommodate 2–4 guests, and the upstairs Edla and Selma rooms can be connected through an adjoining door to create a family suite with a kitchen. The entire house accommodates approximately 16–18 guests and can be reserved for private celebrations, meetings and corporate gatherings. Whole-house reservations also offer access to a separate wood-fired garden sauna, subject to the provider's terms. Matri House is within walking distance of the village's restaurants, cafés and boutiques, and close to Teijo National Park. Check seasonal room availability, rates and booking terms directly with Matri House.",
      es: "Matri House es una casa de madera construida en 1840 y cuidadosamente restaurada, situada en el histórico pueblo siderúrgico de Mathildedal. Cuenta con seis habitaciones decoradas individualmente, de 25–32 m², cada una con baño privado y una cama Matri de alta calidad. Los huéspedes también pueden utilizar la cocina compartida totalmente equipada, el luminoso comedor de desayunos, la veranda, el salón, la biblioteca de la planta superior y el tranquilo jardín con manzanos. Las habitaciones tienen capacidad para 2–4 personas; las habitaciones Edla y Selma, situadas en la planta superior, pueden comunicarse mediante una puerta interior para formar una suite familiar con cocina. La casa completa tiene capacidad aproximada para 16–18 personas y se puede reservar para celebraciones privadas, reuniones y eventos de empresa. Las reservas de la casa completa también permiten utilizar una sauna exterior de leña independiente, según las condiciones del proveedor. Matri House está a poca distancia a pie de los restaurantes, cafeterías y tiendas del pueblo, y cerca del Parque Nacional de Teijo. Consulta directamente con Matri House la disponibilidad estacional, las tarifas y las condiciones de reserva.",
    },
    url: "https://matrihouse.fi/",
    image: providerImages.matri,
    imageCredit: "Visit Finland DataHub / Matri House — Salon Kohteet",
    imageSource: "https://kohteet.visitsalo.fi/en/matri-house-a-boutique-stay-in-the-beautiful-village-of-mathildedal/",
  },
  {
    id: "majoitus-mathildedal",
    category: "stay",
    name: "Majoitus Mathildedal",
    nameByLocale: { fi: "Majoitus Mathildedal", en: "Accommodation in Mathildedal", es: "Alojamiento en Mathildedal" },
    description: {
      fi: "Hyvin varusteltu 84 m²:n lomamökki merenrantakylässä Mathildedalissa. Mökissä on kaksi makuuhuonetta, parvi, olohuone-keittiö, sauna ja terassi. Majoitus sopii kahdeksalle hengelle, ja erillisestä piharakennuksesta voi tiedustella lisämajoitusta kolmelle. Vuokraan kuuluu ulkoporeammeen käyttö ja mökillä on yksityinen hiekkaranta. Tarkista ehdot ja saatavuus suoraan majoittajalta.",
      es: "Casa de vacaciones bien equipada de 84 m² en el pueblo costero de Mathildedal. Dispone de dos dormitorios, un altillo, salón con cocina, sauna y terraza. Tiene capacidad para ocho personas; se puede consultar al anfitrión sobre alojamiento adicional para tres personas en un edificio independiente. El alquiler incluye el uso de una bañera de hidromasaje exterior y hay una playa privada de arena. Consulta directamente con el proveedor las condiciones y la disponibilidad.",
      en: "A well-equipped 84 m² holiday cottage in the coastal village of Mathildedal. It has two bedrooms, a loft, an open-plan living room and kitchen, a sauna and a terrace. The cottage sleeps eight, with additional accommodation for three available by enquiry in a separate garden building. Use of an outdoor hot tub is included, and the property has a private sandy beach. Confirm terms and availability directly with the provider.",
    },
    url: "https://www.majoitusmathildedal.com/mokki/",
    image: "https://d4d4e74ade.clvaw-cdnwnd.com/eabd10f3c41b97fc14c0a19b87f7a10b/200000047-d9a21d9a24/85cc8050-12ed-4a1d-8572-68241e7ab62c.JPG?ph=d4d4e74ade",
    imageCredit: "Majoitus Mathildedal — official provider website",
  },
  {
    id: "teijon-masuuni",
    category: "experience",
    name: "Teijon Masuuni",
    nameByLocale: { fi: "Teijon Masuuni", en: "Teijo Masuuni", es: "Teijo Masuuni" },
    description: {
      fi: "Vuonna 1686 perustetun Teijon ruukin historiallisessa miljöössä toimiva taiteen ja kädentaitojen keskus: vaihtuvia näyttelyitä, kahvila, taide- ja käsityöputiikki sekä tapahtumia.",
      en: "An arts and crafts centre in the historic Teijo ironworks, founded in 1686, with changing exhibitions, a café, an art and craft shop and events.",
      es: "Centro de arte y artesanía en el histórico recinto siderúrgico de Teijo, fundado en 1686, con exposiciones temporales, cafetería, tienda de arte y artesanía y eventos."
    },
    url: "https://www.teijonmasuuni.fi/",
    image: "https://www.teijonmasuuni.fi/wp-content/uploads/2020/01/kahvila_masuuni-1-839x1024.jpg",
    imageCredit: "Teijon Masuuni — official website",
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
    priceByLocale: { fi: "Rinneautoilu: 2 kierrosta 16 €, 4 kierrosta 26 €, 5 kierrosta 32 €/hlö", en: "Mountain carting: 2 rides €16, 4 rides €26, 5 rides €32 per person", es: "Kart de montaña: 2 vueltas 16 €, 4 vueltas 26 €, 5 vueltas 32 € por persona" },
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
    url: "https://chilloutfishing.fi/",
    image: "https://cdn-datahub.visitfinland.com/images/f398fd30-e7a3-11ef-a1a5-c5de292a73ba.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub — Chill Out Fishing boat trip listing",
    imageSource: "https://kohteet.visitsalo.fi/en/chill-grill-boat-trip-excursion/",
    price: "Hinta retken ja ryhmän mukaan – tarkista palveluntarjoajalta",
    priceByLocale: { fi: "Hinta retken ja ryhmän mukaan – tarkista palveluntarjoajalta", en: "Price depends on the trip and group size — check with the provider", es: "El precio depende de la excursión y del tamaño del grupo; consúltalo con el proveedor" },
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/04/VISITSALO-SalonOppaat-paakuva-1920-x-1080-px-1366x768.jpg",
    imageCredit: "Salon Kohteet — Salon Oppaat ry:n opasryhmäkuva",
  },
  {
    id: "teijo-national-park",
    category: "nature",
    name: "Teijon kansallispuisto",
    nameByLocale: { fi: "Teijon kansallispuisto", en: "Teijo National Park", es: "Parque Nacional de Teijo" },
    description: {
      fi: "Järviä, metsiä, kallioita ja reittejä ympäri vuoden. Kansallispuiston perusluonto on maksuton; vuokrattavista palveluista veloitetaan erikseen.",
      es: "Lagos, bosques, rocas y senderos durante todo el año. El acceso básico al parque es gratuito; los servicios de alquiler se cobran aparte.",
      en: "Lakes, forests, rocks and trails year-round. Basic access to the national park is free; rental services are charged separately.",
    },
    url: "https://www.luontoon.fi/teijo",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg",
    imageCredit: "Vnnen · CC BY-SA 4.0 / Wikimedia Commons",
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
    url: "https://meriteijogolf.com",
    image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golf_aktiviteetit.jpg?itok=lpvm1Tl0",
    imageCredit: "Visit Mathildedal — Meri-Teijo Golf course listing; reuse permission to confirm",
  },
  {
    id: "ravintola-terho",
    category: "food",
    name: "Ravintola Terho",
    nameByLocale: { fi: "Ravintola Terho", en: "Restaurant Terho", es: "Restaurante Terho" },
    description: {
      fi: "Mathildedalin kyläravintola tunnetaan kiviarinauunissa paistetuista pizzoista, oman paahtimon kahvista, paikallisista juomista ja takapihan keikoista.",
      en: "A village restaurant in Mathildedal known for stone-deck oven pizzas, coffee from its own roastery, local drinks and live music in the backyard.",
      es: "Restaurante local en Mathildedal, conocido por sus pizzas al horno de piedra, el café de su propio tostador, las bebidas locales y la música en directo en el patio."
    },
    url: "https://www.ravintolaterho.fi/",
    image: "https://static.wixstatic.com/media/5e5929_9e5a4f06a1794080a2b8d42c24e055d2~mv2.jpg/v1/crop/x_0%2Cy_461%2Cw_1365%2Ch_948/fill/w_829%2Ch_542%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/terho-web-85.jpg",
    imageCredit: "Ravintola Terho — official website",
  },
  {
    id: "mathildedal-brewery",
    category: "food",
    name: "Mathildedalin Kyläpanimo",
    nameByLocale: { fi: "Mathildedalin Kyläpanimo", en: "Mathildedal Village Brewery", es: "Cervecería del pueblo de Mathildedal" },
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
    id: "saaristomokit-sarkisalo",
    category: "stay",
    name: "Saaristomökit Särkisalossa",
    nameByLocale: { fi: "Saaristomökit Särkisalossa", en: "Archipelago Cottages in Särkisalo", es: "Cabañas del archipiélago en Särkisalo" },
    description: {
      fi: "Kahdeksan merenrantamökkiä Salon eteläisessä saaristossa. Vaihtoehtoja pienistä mökeistä suurempiin huviloihin, puusauna, laituri ja terassi.",
      es: "Ocho cabañas junto al mar en el archipiélago de Särkisalo, desde pequeñas cabañas hasta villas, con sauna de leña y embarcadero.",
      en: "Eight seaside cottages in the Särkisalo archipelago, from compact cabins to larger villas, with wood-fired sauna and pier.",
    },
    url: "https://www.ylostalo.fi/vuokramokit",
    image: "https://cdn-datahub.visitfinland.com/images/2d04f3d0-d2bb-11ed-8ed8-859d0a6307f5.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "matildanjarven-kampat",
    category: "stay",
    name: "Matildanjärven kämpät",
    nameByLocale: { fi: "Matildanjärven kämpät", en: "Matildanjärvi Rental Cabins", es: "Cabañas de alquiler de Matildanjärvi" },
    description: {
      fi: "Kaksi vuokrattavaa kämppää Teijon kansallispuistossa Luontokeskuksen lähellä. Kummassakin majoittuu enintään kuusi; saunavuoro kuuluu majoitukseen.",
      es: "Dos alojamientos de alquiler cerca del centro de visitantes del Parque Nacional de Teijo, con capacidad para seis personas cada uno y sauna incluida.",
      en: "Two rental cabins near the Teijo National Park visitor centre, each sleeping up to six, with a sauna session included.",
    },
    url: "https://naturaviva.fi/fi_FI/majoituskohteet-etela-suomessa/matildanjarven-kampat",
    image: "https://cdn-datahub.visitfinland.com/images/40f256f0-6b21-11ed-8b5d-750472ef9a58.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "forby-marina",
    category: "nature",
    name: "Förby Marina",
    description: {
      fi: "Suojaisa pienvenesatama Särkisalon Förbyssä. Vierasvenelaituri, veneilypalvelut, kesäkahvila ja uimapaikka.",
      es: "Puerto deportivo protegido en Förby, Särkisalo, con muelle de visitantes, servicios náuticos, café de verano y zona de baño.",
      en: "A sheltered marina in Förby, Särkisalo, with guest berths, boating services, a summer café and a nearby swimming spot.",
    },
    url: "https://www.karlforsstrom.fi/fi/forby-marina/",
    image: "https://cdn-datahub.visitfinland.com/images/bab40950-5e6d-11ec-958a-e368ec3fe4d5-DJI_0586.jpg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "cafe-vinssi",
    category: "food",
    name: "Café Vinssi",
    description: {
      fi: "Merenrantainen kesäkahvila Förby Marinassa, jossa tarjotaan itse tehtyjä suolaisia ja makeita herkkuja, salaatteja ja erikoiskahveja.",
      es: "Café de verano junto al mar en Förby Marina, con repostería y salados caseros, ensaladas y cafés especiales.",
      en: "A seaside summer café at Förby Marina with homemade sweet and savoury treats, salads and speciality coffee.",
    },
    url: "https://www.cafevinssi.fi/",
    image: "https://cdn-datahub.visitfinland.com/images/2ed8ed20-f83c-11f0-ad78-29bd5b45e175.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "saaristoravintola-nixor",
    category: "food",
    name: "Saaristoravintola Nixor",
    nameByLocale: { fi: "Saaristoravintola Nixor", en: "Nixor Archipelago Restaurant", es: "Restaurante del archipiélago Nixor" },
    description: {
      fi: "Rento terassiravintola Särkisalon Niksaaressa. Kesäruokaa, saaristomaisemaa ja ohjelmaa kuten livemusiikkia.",
      es: "Restaurante-terraza relajado en Niksari, Särkisalo, con comida de verano, vistas del archipiélago y música en directo.",
      en: "A relaxed terrace restaurant in Niksari, Särkisalo, with summer food, archipelago views and live music.",
    },
    url: "https://www.ylostalo.fi/nixor",
    image: "https://cdn-datahub.visitfinland.com/images/4c038a70-b547-11ee-895e-65eccdb2f013.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "villa-meri-sarkisalo",
    category: "experience",
    name: "Villa Meri",
    description: {
      fi: "Merellinen juhla- ja kokoushuvila Särkisalossa. Tilat ryhmille, merinäköalasauna ja kaksi majoitushuonetta.",
      es: "Villa junto al mar para eventos y reuniones en Särkisalo, con sauna panorámica y dos habitaciones.",
      en: "A seaside event and meeting villa in Särkisalo with a sea-view sauna and two accommodation rooms.",
    },
    url: "https://www.ylostalo.fi/villameri",
    image: "https://cdn-datahub.visitfinland.com/images/af8f7080-da9c-11ed-b082-c12bd48bf823.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub",
  },
  {
    id: "krailan-sabrina",
    category: "experience",
    name: "Krailan tila – tilausristeilyt",
    nameByLocale: { fi: "Krailan tila – tilausristeilyt", en: "Kraila Farm – Private Cruises", es: "Granja Kraila – Cruceros privados" },
    description: {
      fi: "Tilausristeilyjä m/s Sabrinalla Särkisalon ja lähialueiden vesillä. Ryhmille suunniteltu tapa kokea saariston maisemat mereltä.",
      es: "Cruceros privados en el m/s Sabrina por las aguas de Särkisalo y sus alrededores, pensados para grupos.",
      en: "Private cruises aboard m/s Sabrina around Särkisalo and nearby waters, designed for groups.",
    },
    url: "https://www.krailantila.fi/tilausristeilyt/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2022/04/Ms-Sabrina-Kuva-%C2%A9Ville-Soderman_.jpg",
    imageCredit: "Ville Söderman / Salon Kohteet — Krailan tilan tilausristeilyt",
  },
  {
    id: "tiiranta",
    category: "food",
    name: "Tiiranta",
    description: {
      fi: "Ympäri vuoden avoinna oleva kahvila, ravintola ja elintarvikemyymälä Särkisalon keskustassa sekä vierasvenelaituri.",
      es: "Café, restaurante y tienda de alimentación abierta todo el año en el centro de Särkisalo, además de muelle de visitantes.",
      en: "A year-round café, restaurant and grocery shop in central Särkisalo, with a guest pier.",
    },
    url: "https://tiiranta.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/07/20200610_110048_resized-1-576x768.jpg",
    imageCredit: "Salon Kohteet — Tiirannan terassi ja merimaisema",
  },
  {
    id: "vuorovetten-jaatelo",
    category: "food",
    name: "Vuorovetten Jäätelö",
    description: {
      fi: "Pienissä erissä valmistettua laktoositonta jäätelöä Strömman, Mathildedalin ja Särkisalon kesäkioskeissa.",
      es: "Helado sin lactosa elaborado en pequeños lotes y servido en kioscos de verano de Strömma, Mathildedal y Särkisalo.",
      en: "Small-batch lactose-free ice cream served at summer kiosks in Strömma, Mathildedal and Särkisalo.",
    },
    url: "https://vuorovettenjaatelo.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2025/01/viettelysten-vaunu-1024x768.jpeg",
    imageCredit: "Vuorovetten Jäätelö / Salon Kohteet",
  },
  {
    id: "niksaaren-sauna",
    category: "nature",
    name: "Niksaaren sauna",
    nameByLocale: { fi: "Niksaaren sauna", en: "Niksari Sauna", es: "Sauna de Niksari" },
    description: {
      fi: "Salon kaupungin ylläpitämä pieni merellinen sauna Förbyssä, noin 7–8 henkilölle, suihku- ja pukutiloineen.",
      es: "Pequeña sauna junto al mar en Förby gestionada por la ciudad de Salo, para unas 7–8 personas.",
      en: "A small seaside sauna in Förby managed by the City of Salo, for about 7–8 people.",
    },
    url: "https://www.salo.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/03/Niksaari-2-1024x768.jpg",
    imageCredit: "Salon Kohteet / Salon kaupunki — Niksaaren sauna",
  },
  {
    id: "sarkisalo-fishing",
    category: "experience",
    name: "Ylöstalo – saaristokalastus",
    nameByLocale: { fi: "Ylöstalo – saaristokalastus", en: "Ylöstalo – Archipelago Fishing", es: "Ylöstalo – Pesca en el archipiélago" },
    description: {
      fi: "Saaristokalastuslomia Särkisalossa Ylöstalon mökeissä. Kohteisiin voi yhdistää veneen ja kalastusoppaan.",
      es: "Estancias de pesca en las cabañas de Ylöstalo en Särkisalo, con opciones de barco y guía.",
      en: "Archipelago fishing stays at Ylöstalo cottages in Särkisalo, with boat and guide options.",
    },
    url: "https://www.ylostalo.fi/fi/vuokraveneet",
    image: "https://www.ylostalo.fi/wp-content/uploads/2025/11/30hp-768x576.webp",
    imageCredit: "Ylöstalon matkailutila — 30 hv vuokravene",
  },
  {
    id: "forby-rantajooga",
    category: "experience",
    name: "Lempeä rantajooga – Förby",
    nameByLocale: { fi: "Lempeä rantajooga – Förby", en: "Gentle Beach Yoga – Förby", es: "Yoga suave en la playa – Förby" },
    description: {
      fi: "Rantajoogaa Förbyn rauhallisessa merellisessä ympäristössä, veden ja luonnon äänien keskellä.",
      es: "Yoga suave junto al mar en el tranquilo entorno de Förby, acompañado por los sonidos del agua y la naturaleza.",
      en: "Gentle beach yoga in the calm coastal setting of Förby, surrounded by the sounds of water and nature.",
    },
    url: "https://hoitolakukkuvilla.fi/kesan-joogatunnit/",
    image: photoLibrary.hankoRegattaBeach,
    imageCredit: "Wikimedia Commons, CC BY-SA 4.0",
  },
  {
    id: "vuohensaari-camping",
    category: "stay",
    name: "Vuohensaaren leirintäalue",
    nameByLocale: { fi: "Vuohensaaren leirintäalue", en: "Vuohensaari Camping", es: "Camping Vuohensaari" },
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
    nameByLocale: { fi: "Tentsile-majoitus Teijon kansallispuistossa", en: "Tentsile Tree Tent in Teijo National Park", es: "Alojamiento Tentsile en el Parque Nacional de Teijo" },
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
    nameByLocale: { fi: "Kattohuone – Elämysmajoitus", en: "Rooftop Container Accommodation", es: "Alojamiento en contenedores en la azotea" },
    description: {
      fi: "Mathildedalin vanhan kokoonpanohallin katolle rakennettu merikonttimajoitus. Maisemaikkuna, oma kylpyhuone ja hotellin aamiainen.",
      es: "Alojamiento en contenedores sobre un antiguo edificio industrial de Mathildedal, con gran ventana panorámica, baño privado y desayuno.",
      en: "Container rooms on the roof of a historic industrial building in Mathildedal, with a large view window, private bathroom and breakfast.",
    },
    url: "https://www.mathildedal.fi",
    image: "https://cdn-datahub.visitfinland.com/images/afeb54a0-c30d-11ed-8fb6-cd05a147400e.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub — Kattohuoneen kohdekuva",
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
    image: "https://cdn-datahub.visitfinland.com/images/de37d4a0-d7d9-11ee-ab44-79c504d53bde.jpeg?s=1280",
    imageCredit: "Visit Finland DataHub — Finnholmenin Strandbo-kohdekuva",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2022/06/20220527_125816-2-1366x615.jpg",
    imageCredit: "Salon Kohteet — Aava Adventuresin mökki",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2021/07/IMG_2490-1024x768.jpg",
    imageCredit: "Salon Kohteet — Katiskanmäen caravan-alue",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2021/03/Villa-Lonnviken-933x768.jpg",
    imageCredit: "Salon Kohteet — Villa Lönnviken",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/Meri-Ruukin-Lomakyl%C3%A4-1366x768.jpg",
    imageCredit: "Salon Kohteet — Meri-Ruukin lomakylä",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/Topilan-Tupa-045c6d1ce3a54be1-medium.jpg",
    imageCredit: "Salon Kohteet — Topilan Tupa",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/06/oper%C3%A4.jpg",
    imageCredit: "Salon Kohteet — Onnenperän Mökki",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/P%C3%A4%C3%A4rakennus-2-1366x768.jpg",
    imageCredit: "Salon Kohteet — Leipyölin tilan päärakennus",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Nennebo-web-1366x768.jpg",
    imageCredit: "Salon Kohteet — Villa Nennebon virallinen kohdekuva",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/m%C3%B6kki.jpg",
    imageCredit: "Salon Kohteet — Alaspään maatilan vuokramökki",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Lomalaperla.4-4-1150x768.jpg",
    imageCredit: "Salon Kohteet — Villa Viola",
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
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/IMG_7052-7-1152x768.jpg",
    imageCredit: "Salon Kohteet — Villa Laperlan terassi",
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
    url: "https://www.lomalaperla.com/moumlkki-3.html",
    image: "https://www.lomalaperla.com/uploads/1/0/3/7/103702596/gpjpucpjqtqjss1wxug8dw_1_orig.jpg",
    imageCredit: "Lomalaperla — Villa Viktoria official website",
    imageSource: "https://www.lomalaperla.com/moumlkki-3.html",
  },
  {
    id: "villa-frans",
    category: "stay",
    name: "Villa Frans",
    nameByLocale: { fi: "Villa Frans", en: "Villa Frans", es: "Villa Frans" },
    description: {
      fi: "Lomalaperlan ympärivuotinen huvila Suomusjärvellä. Kolme makuuhuonetta, sähkösauna, suihku, sisä-WC ja terassin poreallas. Vahvista vuodepaikat, ehdot ja hinnat suoraan majoittajalta.",
      en: "A year-round holiday villa in Suomusjärvi by Lomalaperla. Three bedrooms, an electric sauna, shower, indoor toilet and a hot tub on the terrace. Confirm capacity, terms and rates directly with the host.",
      es: "Villa vacacional disponible todo el año en Suomusjärvi, gestionada por Lomalaperla. Tres dormitorios, sauna eléctrica, ducha, aseo interior y jacuzzi en la terraza. Confirma la capacidad, las condiciones y las tarifas directamente con el anfitrión.",
    },
    url: "https://www.lomalaperla.com/moumlkki-4.html",
    image: "https://www.lomalaperla.com/uploads/1/0/3/7/103702596/editor/img-4961-2.jpg?1624728709=",
    imageCredit: "Lomalaperla — Villa Frans official website",
    imageSource: "https://www.lomalaperla.com/moumlkki-4.html",
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
    url: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/panorama-1152x768.jpg",
    imageCredit: "Salon Kohteet / Visit Salo — Teijon Kammari official listing",
    imageSource: "https://kohteet.visitsalo.fi/en/teijon-kammari-rental-cottage/",
  },
  {
    id: "kruuvan-mokit",
    category: "stay",
    name: "Kruuvan mökit",
    nameByLocale: { fi: "Kruuvan mökit", en: "Kruuva Cottages", es: "Cabañas Kruuva" },
    description: {
      fi: "Kahdeksan hengen Villa Kruuva merenlahden äärellä. Varusteltu ympärivuotiseen lomailuun, saunat ja merimaisemat.",
      es: "Villa Kruuva para ocho personas junto a una bahía marina, equipada para estancias durante todo el año y con sauna.",
      en: "Villa Kruuva for eight by a sea bay, equipped for year-round stays and sauna relaxation.",
    },
    url: "https://www.kruuvanmokit.fi",
    image: "https://www.kruuvanmokit.fi/wp-content/uploads/2022/08/Villa_Kruuva-maisema-01-3-819x1024.webp",
    imageCredit: "Kruuvan mökit — official provider website",
    imageSource: "https://www.kruuvanmokit.fi/",
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
    url: "https://www.lonnviken.com/fi/meri-veikko",
    image: "https://cdn.prod.website-files.com/6338042ae68560db6a16c66f/640089c846690215630ca95d_20220826_150455%20re%203.jpg",
    imageCredit: "Saaristotila Lönnviken — Meri-Veikko official website",
    imageSource: "https://www.lonnviken.com/fi/meri-veikko",
  },


  {
    id: "kisko-pohjolan-tila",
    category: "food",
    name: "Pohjolan tila",
    description: {
      fi: "Kiskossa toimiva marjatila ja lähiruokapuoti. Valikoimaan kuuluu tilan omia käsintehtyjä hilloja, mehuja ja muita jalosteita sekä satokauden tuoreita marjoja, vihanneksia ja avomaan leikkokukkia. Tilalla järjestetään myös tapahtumia, iltapäiväteitä, brunssitilaisuuksia ja tastingeja; ryhmät ovat tervetulleita ennakkosopimuksella.",
      en: "A berry farm and local food shop in Kisko. The selection includes the farm's own handmade jams, juices and preserves, as well as seasonal fresh berries, vegetables and outdoor-grown cut flowers. The farm also hosts events, afternoon teas, brunches and tastings, and welcomes groups by arrangement.",
      es: "Granja de frutos rojos y tienda de productos locales en Kisko. Ofrece mermeladas, zumos y conservas artesanales de la propia granja, además de bayas, verduras y flores de temporada. También organiza eventos, meriendas, brunches y degustaciones; los grupos pueden reservar con antelación.",
    },
    url: "https://www.pohjolanmaatila.fi/",
    image: "https://cdn-datahub.visitfinland.com/images/2d63fa30-f5e8-11f0-ad78-29bd5b45e175.jpeg?s=1280",
    imageCredit: "Pohjolan tila / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/pohjolan-tila-2/",
  },
  {
    id: "kisko-metsaketun-kievari",
    category: "experience",
    name: "Metsäketun Kievari",
    description: {
      fi: "Taivasmaan maatilalla toimiva elämyskohde, jossa yhdistyvät käsintehdyt pizzat, maatilan pihapiiri ja luontoaktiviteetit. Kohteessa on pizzerian lisäksi seikkailurata, kesäisiä pihapelejä ja eläimiä sekä kausittain toimiva Kettukahvila ja peltokylpylä saunoineen ja paljuineen. Aukiolot ja palvelut vaihtelevat kauden mukaan; tarkista ajantasaiset tiedot suoraan yrittäjältä.",
      en: "An experience destination at Taivasmaa farm combining handmade pizza, a rural farm setting and outdoor activities. Alongside the pizzeria, the site has an adventure course, seasonal yard games and animals, plus a seasonal café and field spa with saunas and a hot tub. Opening days and services vary by season; check current details directly with the operator.",
      es: "Un espacio de experiencias en la granja Taivasmaa que combina pizza artesanal, ambiente rural y actividades al aire libre. Además de la pizzería, hay un circuito de aventura, juegos de jardín y animales en temporada, así como una cafetería y un spa rural con saunas y jacuzzi. Los horarios y servicios varían según la temporada; confirma los detalles directamente con el operador.",
    },
    url: "https://www.metsaketunpizzeria.com/",
    image: "https://cdn-datahub.visitfinland.com/images/4415f430-366d-11f0-b5fd-d35a38627c06.jpeg?s=1280",
    imageCredit: "Metsäketun Kievari / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/metsaketun-pizzeria/",
  },
  {
    id: "kisko-puutarha-siimes",
    category: "food",
    name: "Puutarha Siimes",
    description: {
      fi: "Kiskossa toimiva perhepuutarha kasvattaa biolämmöllä kirsikkatomaatteja, yrttejä ja taimia sekä pientä valikoimaa muita vihanneksia. Tuotteet kypsyvät tilalla, ja niitä toimitetaan REKO-jakeluihin sekä sopimusasiakkaille. Tilamyymälä toimii itsepalveluperiaatteella.",
      en: "A family-run greenhouse farm in Kisko growing cherry tomatoes with bioenergy, alongside herbs, seedlings and a small selection of other vegetables. Produce ripens on the farm and is supplied through REKO local-food groups and to contract customers. The farm shop operates on a self-service basis.",
      es: "Una granja familiar de invernaderos en Kisko que cultiva tomates cherry con energía de biomasa, además de hierbas, plantones y una pequeña selección de otras verduras. Los productos maduran en la propia granja y se distribuyen mediante grupos REKO y a clientes con acuerdos. La tienda funciona en régimen de autoservicio.",
    },
    url: "https://www.puutarhasiimes.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/Siimes2-1-1152x768.jpg",
    imageCredit: "Puutarha Siimes / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/puutarha-siimes/",
  },
  {
    id: "kisko-kalliolan-tila",
    category: "food",
    name: "Kalliolan Tila",
    description: {
      fi: "Kiskontien varrella toimiva suomenlammastila, jossa kasvatetaan suomenlampaita ja pidetään myös lapinlehmiä. Eläimet laiduntavat tilan ympäristössä kesäkaudella. Tilapuodista voi ostaa karitsan- ja lampaanlihaa, villalankaa ja lampaantaljoja; puodin aukiolo kannattaa tarkistaa ennen vierailua.",
      en: "A Finnsheep farm along Kiskontie, also home to a few Lapland cows. The animals graze in the surrounding fields during the summer season. The farm shop sells lamb and mutton, wool yarn and sheepskins; check opening times before visiting.",
      es: "Una granja de ovejas finlandesas junto a Kiskontie, donde también viven algunas vacas laplandesas. Los animales pastan en los prados de la finca durante el verano. La tienda vende carne de cordero, hilo de lana y pieles; consulta los horarios antes de la visita.",
    },
    url: "https://kohteet.visitsalo.fi/kalliolan-tila/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/kalliolantila1-1024x768.jpeg",
    imageCredit: "Kalliolan Tila / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kalliolan-tila/",
  },
  {
    id: "kisko-purolan-tila",
    category: "food",
    name: "Purolan tila",
    description: {
      fi: "Purolan tila myy tuoreita kananmunia oman tilan viljalla ruokituilta kanoilta. Tilalla on ympäri vuorokauden palveleva itsepalvelukioski, jossa maksutapoina ovat käteinen, kortti ja MobilePay.",
      en: "Purolan farm sells fresh eggs from hens fed with grain grown on the farm. Its self-service farm kiosk is open 24 hours a day and accepts cash, card and MobilePay.",
      es: "La granja Purolan vende huevos frescos de gallinas alimentadas con cereal cultivado en la propia finca. Su quiosco de autoservicio está abierto las 24 horas y acepta efectivo, tarjeta y MobilePay.",
    },
    url: "https://www.purolantila.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2021/06/Purolan-Tila.jpg",
    imageCredit: "Purolan tila / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/purolan-tila/",
  },
  {
    id: "kisko-church",
    category: "experience",
    name: "Kiskon kirkko",
    nameByLocale: { en: "Kisko Church", es: "Iglesia de Kisko" },
    description: {
      fi: "Kiskon puukirkko otettiin käyttöön vuonna 1810. Se on neljäs samalla paikalla sijainnut kirkko, ja sen kivinen sakaristo on säilynyt keskiaikaisesta kirkosta. Kirkko sijaitsee Kiskon kirkonkylässä.",
      en: "Kisko's wooden church was inaugurated in 1810. It is the fourth church on the same site, and its stone sacristy has been preserved from a medieval church. The church stands in the historic village centre of Kisko.",
      es: "La iglesia de madera de Kisko se inauguró en 1810. Es la cuarta iglesia construida en el mismo lugar y conserva una sacristía de piedra procedente de una iglesia medieval. Se encuentra en el centro histórico de Kisko.",
    },
    url: "https://kohteet.visitsalo.fi/en/kisko-church/",
    image: photoLibrary.kiskoChurch,
    imageCredit: "Islander / Wikimedia Commons — CC BY 3.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Kisko.jpg",
  },
  {
    id: "kuusjoki-kivisaaren-piapojauhoi",
    category: "food",
    name: "Kivisaaren Piapojauhoi",
    description: {
      fi: "Kuusjoen Raatalassa valmistetaan perinteisiä piapojauhoja tilan omalla myllyllä. Lähipelloilla kasvatettu kaura kuivataan suvussa kulkeneella reseptillä, ja jauhot pussitetaan perheen voimin. Tuotteita on saatavilla lähialueen kaupoista ja K-ryhmän myymälöistä.",
      en: "Traditional Piapojauhoi flour is made in Raatala, Kuusjoki, using the farm's own mill. Oats grown in nearby fields are dried using a family recipe passed down through generations, and the flour is packed by the family. Products are available in local shops and K-group stores.",
      es: "En Raatala, Kuusjoki, se elaboran harinas tradicionales Piapojauhoi en el molino de la propia finca. La avena cultivada en los campos cercanos se seca siguiendo una receta familiar transmitida durante generaciones y la familia se encarga del envasado. Los productos se venden en tiendas locales y establecimientos del grupo K.",
    },
    url: "https://www.piapo.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2025/01/Piapojauhojen-pakkaus-2.jpg",
    imageCredit: "Kivisaaren Piapojauhoi / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kivisaaren-piapojauhoi/",
  },
  {
    id: "kuusjoki-ohrakasken-tila",
    category: "food",
    name: "Ohrakasken tila",
    description: {
      fi: "Kuusjoen ja Vaskion rajalla Raatalassa sijaitseva lähitila keskittyy pensasmustikan viljelyyn ja emolehmien pitoon. Pensasmustikoita voi poimia itse tai ostaa valmiiksi poimittuna tilapuodista tilauksesta. Satokausi alkaa yleensä heinäkuun lopulla ja jatkuu syyskuulle.",
      en: "A local farm in Raatala, between Kuusjoki and Vaskio, specialising in blueberries and beef cattle. Blueberries can be picked by visitors or ordered ready-picked from the farm shop. The harvest season usually runs from late July into September.",
      es: "Una granja local en Raatala, entre Kuusjoki y Vaskio, especializada en arándanos y ganado vacuno. Los visitantes pueden recoger los arándanos o pedirlos ya recolectados en la tienda de la granja. La temporada suele comenzar a finales de julio y continuar hasta septiembre.",
    },
    url: "https://kohteet.visitsalo.fi/ohrakasken-tila/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/Ohrakaski1-576x768.jpg",
    imageCredit: "Ohrakasken tila / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/ohrakasken-tila/",
  },
  {
    id: "kuusjoki-ellun-kanat",
    category: "food",
    name: "Ellun kanat ja munat",
    description: {
      fi: "Raatalassa toimiva sukutila on toiminut vuodesta 1917. Tilalla kasvatetaan suomalaisia maatiaiskanoja, ja niiden munia myydään suoraan kotitilalta sekä REKO-ringeissä. Aina avoinna olevasta itsepalvelu-Munapuodista löytyy myös muita paikallisia lähiruokatuotteita ja kanojen tarvikkeita.",
      en: "A family farm in Raatala with roots dating back to 1917. It raises Finnish landrace hens and sells their eggs directly from the farm and through REKO local-food groups. The always-open self-service egg shop also offers other local food products and supplies for keeping hens.",
      es: "Una granja familiar en Raatala con una historia que se remonta a 1917. Cría gallinas autóctonas finlandesas y vende sus huevos directamente en la finca y mediante grupos REKO. La tienda de autoservicio de huevos, siempre abierta, también ofrece otros productos locales y artículos para la cría de gallinas.",
    },
    url: "https://www.ellunkanatjamunat.fi/",
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2024/11/Munakenno-10-1152x768.jpg",
    imageCredit: "Ellun kanat ja munat / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/ellun-kanat-ja-munat/",
  },
  {
    id: "kuusjoki-church",
    category: "experience",
    name: "Kuusjoen kirkko",
    nameByLocale: { en: "Kuusjoki Church", es: "Iglesia de Kuusjoki" },
    description: {
      fi: "Kuusjoen puukirkko valmistui vuonna 1823 ja siinä on 350 istumapaikkaa. Kirkko rakennettiin alun perin pitäjäläisten voimin saarnahuoneeksi, ja se kuuluu Kuusjoen historialliseen kylämaisemaan.",
      en: "Kuusjoki's wooden church was completed in 1823 and has seating for 350 people. Originally built by local residents as a preaching house, it forms part of the historic village landscape.",
      es: "La iglesia de madera de Kuusjoki se terminó en 1823 y tiene capacidad para 350 personas. Construida originalmente por los habitantes como casa de predicación, forma parte del paisaje histórico del pueblo.",
    },
    url: "https://kohteet.visitsalo.fi/kuusjoen-kirkko/",
    image: photoLibrary.kuusjokiHistoricChurch,
    imageCredit: "Htm / Wikimedia Commons — CC BY 4.0",
    imageSource: "https://commons.wikimedia.org/wiki/File:Kuusjoki_church_2.jpg",
  },

  {
    id: "hajala-myllytyry",
    category: "experience",
    name: "Myllytyryn uimapaikka ja sauna",
    description: {
      fi: "Hajalan Myllytyry on lähdepohjainen metsälampi, jonka rannalla on kaksi hiekkarantaa, laituri, grillikatos ja puulämmitteinen sauna. Kyläyhdistykseltä voi tiedustella saunan yksityisvuokrausta. Uimapaikka on vapaasti käytettävissä; saunan käyttö ja varaukset tarkistetaan aina Hajalan kyläyhdistykseltä.",
      en: "Myllytyry in Hajala is a spring-fed forest lake with two sandy beaches, a jetty, barbecue shelter and a wood-heated sauna. The village association handles enquiries about private sauna hire. The swimming area is freely accessible; check sauna access and bookings directly with the Hajala village association.",
      es: "Myllytyry, en Hajala, es un lago forestal alimentado por manantiales con dos playas de arena, un muelle, una zona de barbacoa y una sauna de leña. La asociación local gestiona las consultas sobre el alquiler privado de la sauna. El baño es de acceso libre; confirma el uso y las reservas de la sauna directamente con la asociación.",
    },
    url: "https://www.hajala.fi/myllytyry/",
    image: photoLibrary.hajalaMyllytyry,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/myllytyryn-uimapaikka/",
  },
  {
    id: "kirjakkalan-ruukkikyla",
    category: "stay",
    name: "Kirjakkalan Ruukkikylä / Extreme Fun",
    description: {
      fi: "Kirjakkalan historiallisessa ruukkimiljöössä Hamarijärven rannalla toimii majoitus-, kokous- ja saunapalveluja sekä ulkoilu- ja melontakeskus. Ruukkikylän historia ulottuu vuoteen 1686, ja vanhat rakennukset sijaitsevat Teijon kansallispuiston retkeilyreittien äärellä. Tarkista huonevaihtoehdot, palvelut ja varausehdot suoraan yrittäjältä.",
      en: "In the historic ironworks setting of Kirjakkala by Lake Hamarijärvi, the operator offers accommodation, meeting and sauna facilities, as well as an outdoor and paddling centre. The ironworks history dates back to 1686, and the restored buildings stand beside the trails of Teijo National Park. Check room options, services and booking terms directly with the operator.",
      es: "En el entorno histórico de la ferrería de Kirjakkala, junto al lago Hamarijärvi, se ofrecen alojamiento, espacios para reuniones y sauna, además de un centro de actividades al aire libre y piragüismo. La historia de la ferrería se remonta a 1686 y los edificios restaurados están junto a los senderos del Parque Nacional de Teijo. Consulta directamente con el operador las habitaciones, los servicios y las condiciones de reserva.",
    },
    url: "https://www.ruukkikyla.fi/",
    image: photoLibrary.kirjakkalaVillage,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kirjakkalan-ruukkikyla-melontakeskus/",
  },

  {
    id: "hajala-tromperin-kestikievari",
    category: "experience",
    name: "Trömperin kestikievari",
    description: {
      fi: "Hajalan historiallinen kestikievari on suojeltu rakennusperintökohde, jonka vanhin osa on 1700-luvulta. Tunnelmallisessa pihapiirissä toimii museokohde ja kesäkaudella kahvila. Aukioloajat ja opastukset kannattaa tarkistaa Salon historialliselta museolta ennen vierailua.",
      en: "This historic roadside inn in Hajala is a protected heritage building, with its oldest section dating from the 18th century. The atmospheric courtyard houses a museum, with a café operating during the summer season. Check opening times and guided visits with Salo's historical museum before visiting.",
      es: "Esta antigua posada de Hajala es un edificio protegido del patrimonio histórico; su parte más antigua data del siglo XVIII. En el acogedor patio hay un museo y, durante la temporada de verano, una cafetería. Consulta los horarios y las visitas guiadas con el museo histórico de Salo antes de ir.",
    },
    url: "https://salomus.fi/nae-ja-koe/tromperin-kestikievari/",
    image: photoLibrary.hajalaTromperi,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/tromperin-kestikievari/",
  },
  {
    id: "angelniemi-paula-achrenin-puutarha",
    category: "food",
    name: "Paula Achrénin Puutarha",
    description: {
      fi: "Angelniemellä sijaitseva puutarhatila kasvattaa omenoita, raparperia ja pensasmustikoita sekä jalostaa omenoita mehuksi ja siideriksi. Tilalta saa pastöroitua omenamehua ympäri vuoden, ja syksyisin mehuasemalla voi mehustaa omia omenoita ajanvarauksella. Siideripuodissa käynnistä sovitaan etukäteen yrittäjän kanssa.",
      en: "This garden farm in Angelniemi grows apples, rhubarb and blueberries, and processes apples into juice and cider. Pasteurised apple juice is available year-round, while the autumn juice press can process visitors' own apples by appointment. Arrange a visit to the cider shop directly with the operator.",
      es: "Esta finca-jardín de Angelniemi cultiva manzanas, ruibarbo y arándanos, y transforma las manzanas en zumo y sidra. Hay zumo de manzana pasteurizado durante todo el año y, en otoño, la prensa permite procesar manzanas propias con cita previa. Acuerda la visita a la tienda de sidra directamente con la productora.",
    },
    url: "https://www.paulanpuutarha.fi/",
    image: photoLibrary.angelniemiPaulaGarden,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/paula-achrenin-puutarha/",
  },
  {
    id: "angelniemi-kokkila-beach",
    category: "nature",
    name: "Kokkilan uimaranta",
    description: {
      fi: "Kokkilan esteetön hiekkaranta sijaitsee Halikonlahden rannalla lossin vieressä. Ranta-alueella on loivasti syvenevä uimapaikka, grillikota, beach volley -kenttiä ja lasten leikkipaikka. Rannalla ei ole uinninvalvontaa. Tarkista saunan ja muiden palvelujen ajantasainen käyttötilanne Salon liikuntapalveluilta.",
      en: "Kokkila is an accessible sandy beach on Halikko Bay, next to the ferry. The area has a gently shelving swimming beach, a barbecue shelter, beach-volleyball courts and a children's play area. There is no lifeguard service. Check the current status of the sauna and other facilities with Salo Sports Services.",
      es: "Kokkila es una playa de arena accesible situada en la bahía de Halikko, junto al transbordador. La zona cuenta con una playa de poca profundidad, una caseta de barbacoa, pistas de vóley-playa y un parque infantil. No hay servicio de socorrismo. Consulta con los servicios deportivos de Salo el estado actual de la sauna y otras instalaciones.",
    },
    url: "https://kohteet.visitsalo.fi/kokkilan-uimaranta/",
    image: photoLibrary.angelniemiKokkilaBeach,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kokkilan-uimaranta/",
  },
  {
    id: "angelniemi-church",
    category: "experience",
    name: "Angelniemen kirkko",
    description: {
      fi: "Angelniemen puukirkko valmistui vuonna 1772 Kemiönsaaren pohjoispään kauniille niemelle. Kirkossa järjestetään jumalanpalveluksia muutaman kerran kesässä ja suurina kirkollisina juhlapyhinä. Kirkko on avoinna vierailuille vain tilauksesta; sovi käynnistä Salon seurakunnan kanssa.",
      en: "Angelniemi's wooden church was completed in 1772 on a scenic peninsula at the northern end of Kimitoön. Services are held a few times each summer and on major church holidays. The church is open to visitors by arrangement only; contact Salo Parish to plan a visit.",
      es: "La iglesia de madera de Angelniemi se terminó en 1772 en una pintoresca península del extremo norte de Kimitoön. Se celebran servicios algunas veces durante el verano y en las principales festividades religiosas. La iglesia solo abre a visitantes con cita previa; contacta con la parroquia de Salo para organizar la visita.",
    },
    url: "https://www.salonseurakunta.fi/",
    image: photoLibrary.angelniemiChurchVisit,
    imageCredit: "Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/angelniemen-kirkko/",
  },


  {
    id: "kiikala-ilolan-arboretum",
    name: "Ilolan Arboretum",
    category: "nature",
    description: {
      fi: "Kiikalan 20 hehtaarin arboretumissa yhdistyvät puulajipuisto, metsäpuutarha ja maisemapuisto. Hoidettuja alueita on noin 15 hehtaaria, ja polkuverkosto on noin kolme kilometriä. Kevään ja alkukesän alppiruusut sekä syksyn ruska tekevät kohteesta kiinnostavan eri vuodenaikoina. Poluilla on korkeuseroja, joten alue ei ole täysin esteetön. Tarkista kausittaiset aukioloajat ja opastukset viralliselta sivulta.",
      en: "Ilola Arboretum in Kiikala covers 20 hectares and combines a tree collection, woodland garden and landscape park. Around 15 hectares are maintained, with approximately three kilometres of paths. Rhododendrons in spring and early summer foliage in autumn make it worth visiting in different seasons. The paths include slopes and are not fully accessible. Check seasonal opening times and guided visits on the official page.",
      es: "El arboreto de Ilola, en Kiikala, ocupa 20 hectáreas y combina un parque de especies arbóreas, un jardín forestal y un parque paisajístico. Unas 15 hectáreas están cuidadas y hay aproximadamente tres kilómetros de senderos. Los rododendros de primavera y los colores otoñales ofrecen motivos para visitarlo en distintas estaciones. Los caminos tienen desniveles y no son totalmente accesibles. Consulta los horarios estacionales y las visitas guiadas en la página oficial."
    },
    url: "https://kohteet.visitsalo.fi/ilolan-arboretum-ja-taimisto/",
    image: providerImages.ilolanArboretum,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/ilolan-arboretum-ja-taimisto/",
    officialGuide: true
  },
  {
    id: "kiikala-rinteen-luomutila",
    name: "Rinteen luomutila",
    category: "food",
    description: {
      fi: "Kruusilassa toimiva perhetila kasvattaa luomuvihanneksia, kuten tomaatteja, kurkkuja, yrttejä ja juureksia. Tilalla tuotetaan myös vihannesten taimia, kesäkukkia ja amppeleita. Tuotteita myydään suoraan tilalta ja torimyynnissä. Varmista tuotteiden saatavuus ja myyntiajat suoraan tilalta.",
      en: "A family-run organic farm in Kruusila growing vegetables such as tomatoes, cucumbers, herbs and root vegetables. The farm also produces vegetable seedlings, summer flowers and hanging baskets. Products are sold directly from the farm and at market stalls. Check current availability and sales times with the farm.",
      es: "Esta granja familiar ecológica de Kruusila cultiva verduras como tomates, pepinos, hierbas y tubérculos. También produce plantones de hortalizas, flores de verano y cestas colgantes. Los productos se venden directamente en la granja y en mercados. Consulta con la granja la disponibilidad y los horarios de venta."
    },
    url: "https://kohteet.visitsalo.fi/rinteen-luomutila/",
    image: providerImages.rinteenFarm,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/rinteen-luomutila/",
    officialGuide: true
  },
  {
    id: "kiikala-kangin-tila",
    name: "Kängin tila",
    category: "food",
    description: {
      fi: "Kruusilan pieni perhetila kasvattaa lampaita ja ylämaankarjaa. Tilalla painotetaan laidunnusta ja nurmiruokintaa, ja myynnissä on tilan omia lihatuotteita. Tilalle suositellaan ottamaan yhteyttä etukäteen, jotta yrittäjät ovat varmasti paikalla.",
      en: "A small family farm in Kruusila raising sheep and Highland cattle. The farm focuses on grazing and grass-fed production and sells its own meat products. Contact the farm before visiting to make sure someone is available.",
      es: "Pequeña granja familiar en Kruusila que cría ovejas y ganado Highland. La producción se basa en el pastoreo y la alimentación con hierba, y se venden productos cárnicos propios. Se recomienda contactar con la granja antes de la visita para confirmar que haya alguien disponible."
    },
    url: "https://www.kangintila.fi/",
    image: providerImages.kanginFarm,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kangin-tila/"
  },
  {
    id: "kiikala-hyyppara-kultalahde",
    name: "Hyyppärä-Kultalähteen luontopolku",
    category: "nature",
    description: {
      fi: "Kiikalan Hyyppärän harjumaisemissa kulkeva luontopolku tarjoaa kaksi rengasreittivaihtoehtoa, 1,8 km ja 2,3 km. Reitillä on jyrkkiä nousuja ja laskuja, joten se on vaativa eikä sovellu liikuntarajoitteisille. Kohde on käytettävissä sulan maan aikaan, eikä reitillä ole talvikunnossapitoa. Pysy merkityllä polulla: Kultalähteen rannat ovat herkkiä ja kalastus sekä tulenteko ovat kiellettyjä.",
      en: "This nature trail crosses the esker landscape of Hyyppärä in Kiikala. Visitors can choose between two circular routes of 1.8 km and 2.3 km. The trail has steep climbs and descents, is demanding and is not suitable for visitors with reduced mobility. It is intended for the unfrozen season and is not maintained in winter. Stay on marked paths: the shores of Kultalähde Spring are fragile, and fishing and campfires are prohibited.",
      es: "Este sendero natural atraviesa el paisaje de crestas glaciares de Hyyppärä, en Kiikala. Hay dos rutas circulares, de 1,8 km y 2,3 km. El recorrido tiene subidas y bajadas pronunciadas, es exigente y no es adecuado para personas con movilidad reducida. Se utiliza durante la temporada sin hielo y no se mantiene en invierno. Permanece en los senderos señalizados: las orillas del manantial Kultalähde son frágiles y están prohibidas la pesca y las hogueras."
    },
    url: "https://kohteet.visitsalo.fi/hyyppara-kultalahde-luontopolku/",
    image: providerImages.hyypparaTrail,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/hyyppara-kultalahde-luontopolku/",
    officialGuide: true
  },
  {
    id: "pertteli-kurjen-maatila",
    name: "Kurjen maatila",
    category: "food",
    description: {
      fi: "Perttelissä toimiva maatila tunnetaan mansikanviljelystä. Mansikoita myydään suoraan tilalta kuluttajille ja jälleenmyyjille, ja satokaudella tilalla voi myös poimia itse avomaan mansikoita. Tilapuoti palvelee satokauden mukaan; tarkista ajantasaiset aukioloajat ja saatavuus maatilan omilta sivuilta.",
      en: "A farm in Pertteli specialising in strawberries. Berries are sold directly to consumers and retailers, and visitors can pick their own strawberries in the open fields during the season. The farm shop operates seasonally; check current opening times and availability on the farm's own website.",
      es: "Granja de Pertteli especializada en el cultivo de fresas. Las fresas se venden directamente a consumidores y distribuidores, y durante la temporada se pueden recoger en los campos. La tienda de la granja abre según la temporada; consulta los horarios y la disponibilidad en la web oficial."
    },
    url: "https://kurjenmaatila.fi/",
    image: providerImages.kurjenFarm,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/kurjen-maatila/"
  },
  {
    id: "pertteli-korpiaho-design",
    name: "Korpiaho Design",
    category: "experience",
    description: {
      fi: "Perttelin maaseutumiljöössä toimiva keramiikkastudio järjestää keramiikkakursseja yksityisille ja ryhmille. Työpajoja voi tiedustella esimerkiksi juhliin, virkistyspäiviin ja pienille ryhmille. Studiolla on myös tekijän omaa taidekeramiikkaa ja käsintehtyjä käyttöesineitä. Vierailut ja kurssit sovitaan etukäteen.",
      en: "A ceramics studio in the countryside of Pertteli offering pottery workshops for individuals and groups. Sessions can be arranged for celebrations, team days and small groups. The studio also sells the artist's own ceramic art and handmade objects. Visits and workshops are by prior arrangement.",
      es: "Estudio de cerámica situado en el entorno rural de Pertteli que ofrece talleres para particulares y grupos. Se pueden organizar sesiones para celebraciones, jornadas de equipo y grupos pequeños. También vende piezas artísticas y objetos hechos a mano por la artista. Las visitas y los talleres se acuerdan con antelación."
    },
    url: "https://korpiahodesign.fi/",
    image: providerImages.korpiahoDesign,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/keramiikkastudio-korpiaho-design/"
  },
  {
    id: "pertteli-church",
    name: "Perttelin kirkko",
    category: "experience",
    description: {
      fi: "Perttelin keskiaikainen harmaakivikirkko on omistettu Pyhälle Bartholomeukselle. Kirkko on valmistunut arviolta 1500-luvun alussa. Erillisen puisen kellotapulin vanhimmat osat ovat 1720-luvulta. Kohde sijaitsee Uskelanjoen kulttuurimaisemassa; aukiolo ja vierailumahdollisuus kannattaa tarkistaa seurakunnalta.",
      en: "Pertteli's medieval grey-stone church is dedicated to Saint Bartholomew and is believed to have been completed in the early 16th century. The oldest parts of its separate wooden bell tower date from the 1720s. The church stands in the cultural landscape of the Uskelanjoki River; check visiting arrangements with the parish.",
      es: "La iglesia medieval de piedra gris de Pertteli está dedicada a San Bartolomé y se cree que fue terminada a principios del siglo XVI. Las partes más antiguas de su campanario de madera independiente datan de la década de 1720. La iglesia se encuentra en el paisaje cultural del río Uskelanjoki; consulta con la parroquia las condiciones de visita."
    },
    url: "https://www.salonseurakunta.fi/",
    image: providerImages.pertteliChurch,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/perttelin-kirkko/",
    officialGuide: true
  },
  {
    id: "muurla-muurlan-opisto",
    name: "Muurlan Opisto",
    category: "stay",
    description: {
      fi: "Muurlan Opisto sijaitsee Ylisjärven rannalla ja tarjoaa majoitusta yksittäisille matkailijoille sekä ryhmille. Opiston tiloja voi varata myös juhliin, kokouksiin, koulutuksiin ja ryhmäpäiviin. Vierailuun voi yhdistää luontoelämyksiä, frisbeegolfia ja ravintolapalveluja. Lounasravintola on Visit Salon tietojen mukaan palvellut arkisin klo 11–13; varmista nykyinen tarjonta suoraan opistolta.",
      en: "Muurlan Opisto is located by Lake Ylisjärvi and offers accommodation for individual guests and groups. Its facilities can also be booked for celebrations, meetings, courses and group events. A visit can be combined with outdoor activities, disc golf and restaurant services. Visit Salo lists weekday lunch service from 11:00 to 13:00; confirm current availability directly with the institute.",
      es: "Muurlan Opisto está junto al lago Ylisjärvi y ofrece alojamiento para viajeros individuales y grupos. Sus instalaciones también se pueden reservar para celebraciones, reuniones, cursos y jornadas de grupo. La visita se puede combinar con actividades al aire libre, disc golf y servicios de restauración. Visit Salo indica un servicio de almuerzo entre semana de 11:00 a 13:00; confirma la disponibilidad actual directamente con el centro."
    },
    url: "https://www.muurlanopisto.fi/",
    image: providerImages.muurlaInstitute,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/muurlan-opisto/"
  },
  {
    id: "muurla-design",
    name: "Muurla – myymälä ja kahvila-ravintola",
    category: "food",
    description: {
      fi: "Muurlan yli tuhannen neliön myymälässä on Muurlan omia sisustus- ja kattaustuotteita sekä valikoituja tuotemerkkejä. Myymälän yhteydessä toimii kahvila-ravintola, jossa on lounasbuffet, kauden à la carte -annoksia ja oman leipomon tuotteita. Ajantasainen ruokalista löytyy ravintolan omasta kanavasta.",
      en: "Muurla's more than 1,000-square-metre store presents its own home, tableware and design products alongside selected brands. A café-restaurant operates next to the store, serving a lunch buffet, seasonal à la carte dishes and products from its own bakery. Check the restaurant's current menu through its own channel.",
      es: "La tienda de Muurla, de más de 1.000 metros cuadrados, reúne productos propios de decoración y mesa junto con marcas seleccionadas. Junto a la tienda hay una cafetería-restaurante con buffet de almuerzo, platos de temporada a la carta y productos de su propia panadería. Consulta el menú actualizado en el canal del restaurante."
    },
    url: "https://www.muurla.com/",
    image: providerImages.muurlaStore,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/muurla/"
  },
  {
    id: "marynummi-uimaranta",
    name: "Märynummen uimaranta ja uimala",
    category: "nature",
    description: {
      fi: "Märylammella sijaitsevaa uimalaa kiertää loivasti syvenevä hiekkaranta. Alueella on pukuhuoneet, sauna- ja pesutilat sekä lähellä beach volley -kenttiä, tennistä, ulkokuntoilua, kuntorata ja frisbeegolfrata. Rannalla ei ole uinninvalvontaa. Märylammen vedessä on havaittu kiehkuravesiruttoa: se ei ole ihmiselle vaarallinen, mutta uima-asut ja vesilelut on puhdistettava, jotta vieraslaji ei leviä muihin vesistöihin. Tarkista kaupungin ajantasaiset uimavesiohjeet.",
      en: "The swimming area at Lake Märylampi has a gently shelving sandy beach. Facilities include changing rooms, sauna and washing facilities, with beach volleyball, tennis, outdoor fitness equipment, a fitness trail and disc golf nearby. There is no lifeguard on the beach. The invasive aquatic plant Nuttall's waterweed has been observed in the lake; it is not dangerous to people, but swimwear and water toys should be cleaned to prevent spreading it to other waters. Check the city's current bathing-water guidance.",
      es: "La zona de baño del lago Märylampi cuenta con una playa de arena de pendiente suave. Hay vestuarios, sauna y duchas, además de voleibol playa, tenis, equipos de ejercicio al aire libre, un circuito de entrenamiento y disc golf en las inmediaciones. La playa no tiene socorrista. Se ha detectado la planta acuática invasora Elodea nuttallii; no es peligrosa para las personas, pero se deben limpiar los bañadores y juguetes acuáticos para evitar que se propague a otras aguas. Consulta la información municipal actualizada sobre la calidad del agua."
    },
    url: "https://kohteet.visitsalo.fi/marynummen-uimaranta/",
    image: providerImages.marynummiBeach,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/marynummen-uimaranta/",
    officialGuide: true
  },
  {
    id: "marynummi-frisbeegolf",
    name: "Märynummen frisbeegolfrata",
    category: "experience",
    description: {
      fi: "Märynummen kyläyhdistyksen ylläpitämä 18-väyläinen metsärata valmistui vuonna 2017. Tekonurmipintaiset heittopaikat ja vaihtelevat metsäväylät tarjoavat tekemistä sekä aloittelijoille että kokeneemmille pelaajille. Uimaranta, kuntorata, tenniskenttä ja retkeilyreitti sijaitsevat lähellä. Tarkista mahdolliset käyttöohjeet ja olosuhteet kyläyhdistykseltä.",
      en: "An 18-hole forest disc golf course maintained by the Märynummi Village Association and completed in 2017. Artificial-turf tee areas and varied woodland fairways offer a challenge for beginners and experienced players. The swimming beach, fitness trail, tennis court and hiking route are nearby. Check local use guidance and conditions with the village association.",
      es: "Campo de disc golf de bosque con 18 hoyos, mantenido por la asociación vecinal de Märynummi y terminado en 2017. Las zonas de lanzamiento tienen césped artificial y los recorridos ofrecen retos para principiantes y jugadores experimentados. La playa, el circuito de entrenamiento, la pista de tenis y el sendero están cerca. Consulta las condiciones de uso con la asociación vecinal."
    },
    url: "https://marynummi.net/",
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/marynummen-frisbeegolfrata/"
  },
  {
    id: "mutainen-lohenrengas",
    name: "Lohenrengas",
    category: "experience",
    description: {
      fi: "Lohenrengas on yksityinen virkistyskalastuspaikka Teijon alueella. Kohteessa on kolme noin viiden hehtaarin yhteispinta-alan järveä, joissa voi kalastaa muun muassa kirjolohta, siikaa ja taimenta. Kalastusvälineitä voi vuokrata ja ryhmille voidaan sopia omia kokonaisuuksia. Tarkista luvat, hinnat, kalalajit ja ajantasaiset aukioloajat suoraan Lohenrenkaalta ennen matkaa.",
      en: "Lohenrengas is a private recreational fishing venue in the Teijo area. It has three lakes with a combined area of approximately five hectares, where visitors can fish for species including rainbow trout, whitefish and trout. Fishing equipment can be rented and group arrangements can be agreed in advance. Confirm permits, prices, available fish species and current opening times directly with Lohenrengas before travelling.",
      es: "Lohenrengas es un lugar privado de pesca recreativa en la zona de Teijo. Cuenta con tres lagos que suman aproximadamente cinco hectáreas, donde se puede pescar, entre otras especies, trucha arcoíris, corégono y trucha. Se pueden alquilar equipos y organizar visitas para grupos con antelación. Confirma los permisos, precios, especies disponibles y horarios actuales directamente con Lohenrengas antes de viajar."
    },
    url: "https://lohenrengas.wordpress.com/",
    image: providerImages.mutainenFishing,
    imageCredit: "Lohenrengas",
    imageSource: "https://lohenrengas.wordpress.com/galleria/"
  },
  {
    id: "mutainen-kylayhdistys",
    name: "Teijon Alueen Kyläyhdistys – Mutainen",
    category: "tourism",
    description: {
      fi: "Teijon Alueen Kyläyhdistys kokoaa yhteen Mutaisen, Kirjakkalan, Teijon ja Mathildedalin kylät. Mutaisten omalla kyläsivulla esitellään Halikonlahden rannalla sijaitsevan kylän historiaa, maisemia, pyöräilyreittiä ja paikallista yhteisötoimintaa. Käytä sivua alueen taustatietojen ja kyläyhdistyksen ajankohtaisten tietojen lähteenä.",
      en: "The Teijo Area Village Association brings together the villages of Mutainen, Kirjakkala, Teijo and Mathildedal. Its dedicated Mutainen page introduces the village on the shore of Halikonlahti Bay, including its history, landscapes, cycling route and community life. Use the page as the official source for local background and village-association updates.",
      es: "La Asociación Vecinal de la Zona de Teijo reúne los pueblos de Mutainen, Kirjakkala, Teijo y Mathildedal. Su página dedicada a Mutainen presenta la historia, los paisajes, la ruta ciclista y la vida comunitaria del pueblo situado junto a la bahía de Halikonlahti. Utiliza esta página como fuente oficial de información local y novedades de la asociación."
    },
    url: "https://www.teijo.fi/tervetuloakyliin/mutainen/",
    imageSource: "https://www.teijo.fi/tervetuloakyliin/mutainen/",
    officialGuide: true
  },
  {
    id: "mutainen-galleria-tuulitunneli",
    name: "Galleria Tuulitunneli",
    category: "experience",
    description: {
      fi: "Mutaisten kylässä toimiva taidegalleria esittelee grafiikkaa ja keramiikkaa. Taiteilija Aila Salmivaaran työhuoneeseen voi sopia vierailun erikseen. Kohde sopii paikallisen taiteen ja käsityön ystäville; sovi käynti etukäteen.",
      en: "An art gallery in the village of Mutainen presenting graphic art and ceramics. Visits to artist Aila Salmivaara's studio are arranged by appointment. A local stop for visitors interested in art and crafts; arrange your visit in advance.",
      es: "Galería de arte en el pueblo de Mutainen dedicada al grabado y la cerámica. Las visitas al estudio de la artista Aila Salmivaara se organizan con cita previa. Una parada local para quienes se interesan por el arte y la artesanía; acuerda la visita con antelación."
    },
    url: "https://www.teijo.fi/palveluja/erikoisliikkeita-ja-palveluita/",
    imageSource: "https://www.teijo.fi/palveluja/erikoisliikkeita-ja-palveluita/",
    officialGuide: true
  },

  {
    id: "kiikala-juurevasti-juurista",
    name: "Juurevasti juurista – opastetut kierrokset",
    category: "experience",
    description: {
      fi: "Paikallisopas Sari Scimone järjestää tilauksesta teemallisia opastettuja kierroksia Salossa. Erityisteemoja ovat Ilolan Arboretum, puutarhat, kulttuuriympäristöt ja Salon historia. Ryhmille voidaan suunnitella omiin toiveisiin sopiva kierros ympäri vuoden; yleisöopastuksia järjestetään kausittain. Varaa opastus etukäteen.",
      en: "Local guide Sari Scimone offers themed guided tours in Salo by arrangement. Special interests include Ilola Arboretum, gardens, cultural landscapes and local history. Tours for groups can be tailored throughout the year, while public tours are seasonal. Book in advance.",
      es: "La guía local Sari Scimone ofrece visitas temáticas por Salo con reserva previa. Sus especialidades incluyen el arboreto de Ilola, jardines, paisajes culturales e historia local. Las visitas para grupos se pueden adaptar durante todo el año; las visitas abiertas al público son estacionales. Reserva con antelación."
    },
    url: "https://juurevastijuurista.johku.com",
    image: providerImages.juurevastiTours,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/opastetut-kierrokset-salossa-juurevasti-juurista/",
    officialGuide: true
  },
  {
    id: "pertteli-koirametsa-rymy",
    name: "Koirametsä Rymy",
    category: "nature",
    description: {
      fi: "Koirametsä Rymy on noin 1,5 hehtaarin aidattu mäntymetsä, jonka voi vuokrata omaan käyttöön haluamakseen ajaksi. Koirat saavat liikkua vapaana turvallisesti rajatulla alueella. Kohde on avoinna ympäri vuoden, ja omassa teltassa yöpyminen on mahdollista palveluntarjoajan ehtojen mukaan. Tarkista varausajat ja säännöt suoraan Rymyltä.",
      en: "Koirametsä Rymy is an enclosed 1.5-hectare pine forest that can be rented for private use for a chosen time. Dogs can roam freely within the fenced area. The venue is open year-round, and overnight stays in your own tent may be possible under the provider's conditions. Check booking times and rules directly with Rymy.",
      es: "Koirametsä Rymy es un bosque de pinos vallado de aproximadamente 1,5 hectáreas que se puede alquilar para uso privado durante el tiempo elegido. Los perros pueden correr libremente dentro del recinto. El lugar abre todo el año y puede ser posible pasar la noche en una tienda propia según las condiciones del proveedor. Consulta directamente con Rymy los horarios y las normas."
    },
    url: "https://www.rymymetsa.fi/",
    image: providerImages.rymyDogForest,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/koirametsa-rymy/"
  },
  {
    id: "muurla-ilolan-vadelmatila",
    name: "Ilolan vadelmatila",
    category: "food",
    description: {
      fi: "Muurlassa toimiva toisen polven perhetila kasvattaa avomaan vadelmia, joita voi poimia itse tai tilata valmiiksi poimittuna. Tilalta saa myös lähihunajaa, jonka mehiläiset pölyttävät vadelmapensaat. Poiminta ja tilaukset sovitaan aina etukäteen, joten varmista saatavuus ja noutoajat suoraan tilalta.",
      en: "A second-generation family farm in Muurla grows raspberries outdoors. Visitors can pick their own berries or order them ready-picked. The farm also sells local honey from bees that pollinate the raspberry bushes. Picking and orders are by arrangement, so confirm availability and collection times directly with the farm.",
      es: "Granja familiar de segunda generación en Muurla que cultiva frambuesas al aire libre. Se pueden recoger las frutas personalmente o pedirlas ya recolectadas. La granja también vende miel local de abejas que polinizan los arbustos de frambuesa. La recolección y los pedidos se acuerdan previamente; confirma la disponibilidad y la recogida directamente con la granja."
    },
    url: "https://kohteet.visitsalo.fi/ilolan-tila/",
    image: providerImages.ilolanRaspberries,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/ilolan-tila/",
    officialGuide: true
  },
  {
    id: "marynummi-kuntorata",
    name: "Märynummen kuntorata ja ulkoilualue",
    category: "nature",
    description: {
      fi: "Märynummen ulkoilualueella on 3,4 kilometrin valaistu kuntoratalenkki ja 0,8 kilometrin valaisematon lenkki. Talvikaudella reitillä on perinteisen ja luistelutyylin hiihtolatu sekä tykkilumilatu. Läheltä löytyvät 5,5 kilometrin retkeilyreitti, frisbeegolfrata, uimaranta, sauna ja tenniskenttä. Laavu on vapaassa käytössä, mutta omat polttopuut on tuotava mukana. Tarkista latu- ja reittitilanne ennen lähtöä.",
      en: "The Märynummi outdoor area has a 3.4-kilometre illuminated fitness loop and a 0.8-kilometre unlit section. In winter, the route is prepared for both classic and skate skiing, with additional artificial-snow tracks. Nearby are a 5.5-kilometre hiking trail, disc golf course, swimming beach, sauna and tennis court. The lean-to shelter is freely available, but visitors must bring their own firewood. Check trail and ski conditions before setting out.",
      es: "La zona recreativa de Märynummi cuenta con un circuito iluminado de 3,4 kilómetros y otro tramo sin iluminación de 0,8 kilómetros. En invierno se preparan pistas para esquí clásico y patinador, además de una pista de nieve artificial. Cerca hay un sendero de 5,5 kilómetros, campo de disc golf, playa, sauna y pista de tenis. El refugio está disponible gratuitamente, pero cada visitante debe llevar su propia leña. Consulta el estado de los senderos y las pistas antes de salir."
    },
    url: "https://kohteet.visitsalo.fi/halikon-marynummen-kuntorata/",
    image: providerImages.marynummiFitnessTrail,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/halikon-marynummen-kuntorata/",
    officialGuide: true
  },

  {
    id: "halikko-wiurila-kartano",
    name: "Wiurilan kartano",
    category: "experience",
    description: {
      fi: "Wiurila on Halikossa sijaitseva historiallinen kartanomiljöö, jonka Armfeltin suku on omistanut vuodesta 1787. Kartanon alueella voi tutustua koti- ja hevosvaunumuseoihin, opastettuihin museokierroksiin, taidenäyttelyihin ja historialliseen puistoon. Alueella toimivat myös Gasthaus, ravintola, golf, padel ja hevostalli. Päärakennuksen museotiloissa on portaita eikä kohde ole esteetön; tarkista kierrosten ajankohdat ja varaukset suoraan Wiurilasta.",
      en: "Wiurila is a historic manor estate in Halikko, owned by the Armfelt family since 1787. Visitors can explore the home and horse-carriage museums, guided museum tours, art exhibitions and the historic park. The estate also has a guesthouse, restaurant, golf, padel and a stable. The main building's museum rooms involve stairs and are not accessible; check tour dates and bookings directly with Wiurila.",
      es: "Wiurila es una histórica finca señorial de Halikko, propiedad de la familia Armfelt desde 1787. Se pueden visitar los museos de la casa y de carruajes, participar en visitas guiadas, ver exposiciones de arte y pasear por el parque histórico. La finca también cuenta con alojamiento, restaurante, golf, pádel y establos. Las salas del museo en el edificio principal tienen escaleras y no son accesibles; consulta directamente las fechas y reservas."
    },
    url: "https://wiurila.fi/kartano/",
    image: providerImages.halikkoWiurila,
    imageCredit: "Wiurila",
    imageSource: "https://wiurila.fi/kartano/"
  },
  {
    id: "halikko-wiurila-gasthaus",
    name: "Wiurila Gasthaus",
    category: "stay",
    description: {
      fi: "Wiurilan kartanon pihapiirissä sijaitseva pieni majatalo tarjoaa neljä kahden hengen huonetta, joissa jokaisessa on oma kylpyhuone. Majoittujien yhteisessä aulassa voi viettää aikaa, ja aamiaisen voi tilata erikseen. Huoneen tai koko majatalon voi varata suoraan Wiurilan omasta varauskanavasta, sähköpostilla tai puhelimitse. Varmista ajantasainen hinta ja saatavuus ennen matkaa.",
      en: "A small guesthouse in the grounds of Wiurila Manor, with four double rooms, each with a private bathroom. Guests share a lounge, and breakfast can be ordered separately. Rooms or the entire guesthouse can be booked through Wiurila's own booking channel, by email or by phone. Confirm current rates and availability before travelling.",
      es: "Pequeña casa de huéspedes en la finca de Wiurila, con cuatro habitaciones dobles y baño privado en cada una. Los huéspedes comparten una sala de estar y se puede pedir el desayuno por separado. Las habitaciones o toda la casa se pueden reservar directamente en el canal de reservas de Wiurila, por correo electrónico o por teléfono. Confirma los precios y la disponibilidad actuales antes de viajar."
    },
    url: "https://wiurila.fi/majoitus/",
    image: providerImages.wiurilaGasthaus,
    imageCredit: "Wiurila",
    imageSource: "https://wiurila.fi/majoitus/"
  },
  {
    id: "halikko-wiurila-sigrid",
    name: "Ravintola Wiurilan Sigrid",
    category: "food",
    description: {
      fi: "Wiurilan kartanon talousrakennuksessa toimiva ravintola yhdistää historiallisen miljöön ja rennon ruokailun. Tarjolla on lounasta sekä à la carte -annoksia; ruokalista ja palveluajat vaihtelevat kauden mukaan. Ravintolan yhteydessä on terasseja, joilta avautuu näkymä kartanon puistoon ja golfkentälle. Tarkista ajantasainen ruokalista ja aukioloajat ravintolan omalta sivulta.",
      en: "A restaurant in the historic service building of Wiurila Manor, combining an estate setting with relaxed dining. It serves lunch and à la carte dishes; menus and service hours vary by season. The restaurant has terraces overlooking the manor park and golf course. Check the current menu and opening times on the restaurant's own page.",
      es: "Restaurante situado en el histórico edificio de servicio de la finca Wiurila, que combina un entorno señorial con una experiencia gastronómica relajada. Ofrece almuerzos y platos a la carta; el menú y los horarios cambian según la temporada. Sus terrazas tienen vistas al parque y al campo de golf. Consulta el menú y los horarios actualizados en la página del restaurante."
    },
    url: "https://wiurila.fi/ravintola/",
    image: providerImages.wiurilaRestaurant,
    imageCredit: "Wiurila",
    imageSource: "https://wiurila.fi/ravintola/"
  },
  {
    id: "halikko-vaski-cider",
    name: "Vaski Cider & Distillery",
    category: "experience",
    description: {
      fi: "Vaski Cider on Halikossa toimiva käsityöläissiideritalo, jossa siideri yhdistyy taiteeseen ja makumatkailuun. Vierailuun voi sisällyttää opastetun kierroksen, siiderinäyttelyn ja teemallisen tastingin. Ohjelmia räätälöidään myös pienille ryhmille, ja tiloissa toimii lisäksi suklaastudio sekä lounaskahvila. Siideritalo ja näyttely palvelevat tuotannon ollessa paikalla tai ennakkoon sovitusti; varaa vierailu etukäteen.",
      en: "Vaski Cider is a craft cidery in Halikko where cider meets art and culinary travel. A visit can include a guided tour, a small cider exhibition and a themed tasting. Tailored programmes are available for small groups, and the premises also host a chocolate studio and lunch café. The cidery and exhibition operate when production staff are present or by prior arrangement; book your visit in advance.",
      es: "Vaski Cider es una sidrería artesanal en Halikko donde la sidra se une al arte y al turismo gastronómico. La visita puede incluir un recorrido guiado, una pequeña exposición sobre la sidra y una cata temática. También se organizan programas para grupos pequeños y en el recinto hay un estudio de chocolate y una cafetería de almuerzos. La sidrería y la exposición abren cuando el personal de producción está presente o con cita previa; reserva la visita con antelación."
    },
    url: "https://www.vaskicider.fi/",
    image: providerImages.vaskiCider,
    imageCredit: "Vaski Cider & Distillery / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/siideritalo-vaski-cider-distillery-vierailukierrokset-ja-tastingit/",
    officialGuide: true
  },
  {
    id: "vaskio-wanhantuvan-ankkala",
    name: "Wanhantuvan Ankkala",
    category: "food",
    description: {
      fi: "Wanhantuvan Ankkala toimii yli 400 vuotta vanhalla sukutilalla Vaskion Toivilassa. Tilan päätuotantosuunta on ankan kasvatus, ja tuotteet myydään suoramyyntinä tilan omasta myymälästä. Valikoimaan kuuluu ankanlihatuotteita sekä ankan- ja viiriäisenmunia. Tarkista tuotteiden saatavuus ja myymälän palveluajat suoraan tilalta.",
      en: "Wanhantuvan Ankkala is based on a family farm in Toivila, Vaskio, with a farming history of more than 400 years. The farm now specialises in raising ducks and sells its products directly from its own farm shop. The range includes duck meat products, duck eggs and quail eggs. Check product availability and shop hours directly with the farm.",
      es: "Wanhantuvan Ankkala se encuentra en una finca familiar de Toivila, Vaskio, con más de 400 años de historia agrícola. Actualmente la granja se especializa en la cría de patos y vende sus productos directamente en la tienda de la finca. La oferta incluye carne de pato, huevos de pato y huevos de codorniz. Consulta directamente la disponibilidad y los horarios de la tienda."
    },
    url: "https://www.wanhantuvanankkala.fi/",
    image: providerImages.wanhantuvanAnkkala,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/wanhantuvan-ankkala/"
  },
  {
    id: "vaskio-bed",
    name: "Vaskio-Bed",
    category: "stay",
    description: {
      fi: "Vaskio-Bed tarjoaa kodinomaista majoitusta kolmessa huoneistossa. Jokaisessa on oma keittiö, wc ja suihku, ja jääkaapissa on perustarvikkeet aamiaisen valmistamiseen. Sauna on tilattavissa erikseen. Majoitus sopii omatoimiselle matkailijalle, joka arvostaa rauhallista kyläympäristöä. Tarkista huoneiden saatavuus ja varausehdot suoraan majoittajalta.",
      en: "Vaskio-Bed offers homely accommodation in three apartments. Each has its own kitchen, toilet and shower, and the fridge contains basic breakfast supplies. A sauna can be booked separately. It suits independent travellers who appreciate a peaceful village setting. Check room availability and booking terms directly with the host.",
      es: "Vaskio-Bed ofrece alojamiento acogedor en tres apartamentos. Cada uno dispone de cocina, aseo y ducha propios, y la nevera incluye productos básicos para preparar el desayuno. La sauna se puede reservar por separado. Es una opción para viajeros independientes que buscan tranquilidad en un entorno rural. Consulta directamente con el anfitrión la disponibilidad y las condiciones."
    },
    url: "https://vaskio-bed.fi/",
    image: providerImages.vaskioBed,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/vaskio-bed/"
  },
  {
    id: "kiikala-ylivesan-luomutila",
    name: "Ylivesän luomutila",
    category: "food",
    description: {
      fi: "Kruusilassa toimiva luomutila kasvattaa hereford-pihvikarjaa, joka laiduntaa kesäkaudella tilan laitumilla ja perinteisillä hakamailla. Tilalla tuotettu luomupihviliha myydään suoramyyntinä suoraan kuluttajille. Vierailusta ja ostoksista kannattaa sopia etukäteen, sillä kyseessä on toimiva maatila eikä jatkuvasti avoin matkailumyymälä.",
      en: "An organic farm in Kruusila raising Hereford beef cattle, which graze on the farm's pastures and traditional wooded meadows during the summer season. The farm's organic beef is sold directly to consumers. Arrange visits and purchases in advance, as this is a working farm rather than a continuously open visitor shop.",
      es: "Granja ecológica en Kruusila que cría ganado vacuno Hereford para carne y que pasta en los prados y pastizales tradicionales de la finca durante el verano. La carne ecológica se vende directamente al consumidor. Acuerda las visitas y compras con antelación, ya que se trata de una granja en funcionamiento y no de una tienda turística abierta continuamente."
    },
    url: "https://www.ylivesa.fi/",
    image: providerImages.ylivesaFarm,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/ylivesan-luomutila/"
  },
  {
    id: "pertteli-kalevala-retriitti",
    name: "Kalevala-retriitti / InnerFree",
    category: "stay",
    description: {
      fi: "Perttelin maaseudulla järjestettävä yksityinen retriitti on suunniteltu 1–2 henkilölle kerrallaan. Yhden yön vierailuun voi sisältyä sauna, jääkylpy, luontokävely, taidetuokio ja kalevalainen jäsenkorjaus. Majoitus on kodinomaisessa päärakennuksessa omalla sisäänkäynnillä, wc:llä ja keittiöllä. Iltapala ja aamiainen tarjoillaan huoneeseen. Palvelu suunnitellaan etukäteen; pyydä tarjous suoraan InnerFreeltä.",
      en: "A private retreat in the countryside of Pertteli, designed for one or two guests at a time. An overnight stay can include a sauna, ice bath, nature walk, art session and traditional Kalevala bodywork. Accommodation is in a homely main building with a private entrance, toilet and kitchen. A light evening meal and breakfast are served in the room. The experience is arranged in advance; request an offer directly from InnerFree.",
      es: "Retiro privado en el entorno rural de Pertteli, diseñado para una o dos personas. La estancia de una noche puede incluir sauna, baño de hielo, paseo por la naturaleza, actividad artística y terapia corporal tradicional Kalevala. El alojamiento se encuentra en la casa principal, con entrada privada, aseo y cocina. La cena ligera y el desayuno se sirven en la habitación. La experiencia se organiza con antelación; solicita una propuesta directamente a InnerFree."
    },
    url: "https://innerfree.fi/kalevalaretriitti/",
    imageSource: "https://kohteet.visitsalo.fi/kalevala-retriitti/",
    officialGuide: true
  },
  {
    id: "pertteli-villen-viinitarha",
    name: "Villen Viinitarha",
    category: "experience",
    description: {
      fi: "Villen Viinitarha sijaitsee Uskelanjoen rinteillä Perttelissä. Tarhassa kasvatetaan noin 120 avomaan rypälelajiketta ja yhteensä noin 400 viiniköynnöstä. Yrittäjä järjestää viinitarhakierroksia ja opastaa pohjoisen viininviljelyn lajikevalinnoissa ja kasvatusmenetelmissä. Vierailut sovitaan etukäteen.",
      en: "Villen Viinitarha is a vineyard on the slopes of the Uskelanjoki River in Pertteli. It grows around 120 outdoor grape varieties across approximately 400 vines. The owner arranges vineyard tours and explains grape varieties and growing methods suited to northern conditions. Visits are by prior arrangement.",
      es: "Villen Viinitarha es un viñedo situado en las laderas del río Uskelanjoki, en Pertteli. Cultiva unas 120 variedades de uva al aire libre y aproximadamente 400 vides. El propietario organiza visitas guiadas y explica las variedades y técnicas de cultivo adecuadas para el clima nórdico. Las visitas se acuerdan previamente."
    },
    url: "https://villenviinitarha.com/",
    image: providerImages.villenVineyard,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/villen-viinitarha/"
  },
  {
    id: "salo-taidelainaamo",
    name: "Salon taidelainaamo",
    category: "experience",
    description: {
      fi: "Salon Taiteilijaseuran ylläpitämä taidelainaamo esittelee paikallisten ammattitaiteilijoiden teoksia ja vaihtuvia näyttelyitä. Taidetta voi lainata kotiin tai työpaikalle ja lunastaa myöhemmin omaksi; lainaushinta hyvitetään ostossa. Teosvalikoima uusiutuu säännöllisesti. Tarkista ajantasaiset aukioloajat ja näyttelyt taidelainaamon omalta sivulta.",
      en: "Run by the Salo Artists' Association, this art-lending gallery presents works by local professional artists and changing exhibitions. Visitors can borrow artwork for their home or workplace and later purchase it, with rental payments credited towards the purchase price. The selection is regularly renewed. Check current opening times and exhibitions on the gallery's own page.",
      es: "Esta galería de préstamo de arte, gestionada por la Asociación de Artistas de Salo, presenta obras de artistas profesionales locales y exposiciones temporales. Se pueden llevar obras prestadas a casa o al trabajo y comprarlas más adelante; las cuotas de préstamo se descuentan del precio de compra. La selección se renueva periódicamente. Consulta los horarios y exposiciones actuales en la página oficial."
    },
    url: "https://www.salontaiteilijaseura.fi/Lainaamo/",
    image: providerImages.salonArtLoan,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/salon-taidelainaamo/"
  },
  {
    id: "salo-vuohensaari-luontopolku",
    name: "Vuohensaaren luontopolku",
    category: "nature",
    description: {
      fi: "Vuohensaaren 1,2 kilometrin luontopolku kiertää Salonjoen suiston saarta vanhan metsän, rantojen, niittyjen ja teiden kautta. Reitin varrella on 17 luontorastia, jotka kertovat saaren historiasta, kasveista, linnuista ja eläimistä. Polku alkaa pysäköintialueelta ja päättyy uimarannalle. Vuohensaari on osittain esteetön lumettomaan aikaan; tarkista reitin kunto ja palvelut ennen vierailua.",
      en: "The 1.2-kilometre nature trail on Vuohensaari loops around the island at the mouth of the River Salo through old woodland, shores, meadows and paths. Seventeen information points introduce the island's history, plants, birds and wildlife. The route starts at the car park and ends at the swimming beach. Vuohensaari is partly accessible in snow-free conditions; check trail conditions and services before visiting.",
      es: "El sendero natural de 1,2 kilómetros de Vuohensaari recorre la isla situada en la desembocadura del río Salo, atravesando bosque antiguo, orillas, prados y caminos. Hay 17 paneles sobre la historia de la isla, sus plantas, aves y animales. El sendero comienza en el aparcamiento y termina en la playa. Vuohensaari es parcialmente accesible cuando no hay nieve; consulta el estado del recorrido y los servicios antes de visitarlo."
    },
    url: "https://kohteet.visitsalo.fi/vuohensaari/",
    image: providerImages.vuohensaariNature,
    imageCredit: "Visit Finland / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/vuohensaari/",
    officialGuide: true
  },
  {
    id: "salo-vuohensaari-minigolf",
    name: "Vuohensaaren minigolf",
    category: "experience",
    description: {
      fi: "Vuohensaaren saarella sijaitsee 18-reikäinen minigolfrata, jonka Visit Salon kohdesivu kertoo olevan kansainvälisen minigolfliiton hyväksymä. Rata kuuluu saaren kesäkauden aktiviteetteihin yhdessä uimarannan, luontopolun ja leirintäalueen kanssa. Varmista aukiolo ja pelivuorot suoraan Vuohensaaresta ennen vierailua.",
      en: "Vuohensaari has an 18-hole minigolf course which Visit Salo describes as approved by the international minigolf federation. The course is one of the island's seasonal activities, alongside the beach, nature trail and camping area. Confirm opening times and play availability directly with Vuohensaari before visiting.",
      es: "Vuohensaari cuenta con un campo de minigolf de 18 hoyos que Visit Salo describe como homologado por la federación internacional de minigolf. Es una de las actividades de temporada de la isla, junto con la playa, el sendero natural y el camping. Confirma directamente con Vuohensaari los horarios y la disponibilidad antes de la visita."
    },
    url: "https://www.visitvuohensaari.fi/",
    image: providerImages.vuohensaariMinigolf,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/vuohensaaren-uimapaikka/"
  },
  {
    id: "salo-ravintola-rikala",
    name: "Ravintola Rikala",
    category: "food",
    description: {
      fi: "Salon keskustassa Asemakadulla toimiva Ravintola Rikala tarjoaa suomalaiseen ruokaan perustuvia annoksia rennossa mutta tyylikkäässä ympäristössä. Ravintola kertoo valmistavansa annokset omassa keittiössään laadukkaista raaka-aineista. Visit Salon esittelyssä lounas on ollut tarjolla arkisin; tarkista ajantasainen lounaslista, aukioloajat ja pöytävaraukset ravintolan omasta kanavasta.",
      en: "Ravintola Rikala on located on Asemakatu in central Salo and serves Finnish-inspired dishes in a relaxed yet stylish setting. The restaurant says its meals are prepared in its own kitchen using quality ingredients. Visit Salo's listing has described weekday lunch service; check the current lunch menu, opening times and table reservations through the restaurant's own channel.",
      es: "Ravintola Rikala, situado en Asemakatu en el centro de Salo, ofrece platos de inspiración finlandesa en un ambiente relajado y elegante. El restaurante indica que prepara sus platos en su propia cocina con ingredientes de calidad. La ficha de Visit Salo ha indicado servicio de almuerzo entre semana; consulta el menú, los horarios y las reservas actuales en el canal oficial del restaurante."
    },
    url: "https://www.raflaamo.fi/en/restaurant/salo/restaurant-rikala",
    image: providerImages.rikalaRestaurant,
    imageCredit: "Salon Kohteet / Visit Salo",
    imageSource: "https://kohteet.visitsalo.fi/en/restaurant-rikala/"
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
    url: "https://tapahtumat.salo.fi/mathildedalin-joulumarkkinat-5/",
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
    url: "https://tapahtumat.salo.fi/mathildedalin-joulumarkkinat-5/",
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
    url: "https://tapahtumat.salo.fi/teijon-masuunin-joulumarkkinat-5/",
    image: "https://tapahtumat.salo.fi/wp-content/uploads/sites/3/2026/01/617106165_1307670904738166_4463659607939618869_n-2-1170x768.jpg",
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
    url: "https://tapahtumat.salo.fi/rikalanmaen-joulumyyjaiset-2026/",
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
  {
    id: "salon-joulukulkue",
    start: "2026-11-29",
    title: { fi: "Salon joulukulkue ja Hyvänmielentori", es: "Desfile navideño y mercado solidario de Salo", en: "Salo Christmas Parade & Goodwill Market" },
    location: "Salon tori",
    description: {
      fi: "Salon joulukauden avaus torilla. Maksuton ja esteetön Hyvänmielentori on avoinna klo 12–16; järjestäjän ohjelma täydentyy lähempänä tapahtumaa.",
      es: "Apertura de la temporada navideña en la plaza de Salo. El mercado solidario es gratuito y accesible, de 12:00 a 16:00; el programa se actualizará.",
      en: "Salo's Christmas season opening in the market square. The free, accessible Goodwill Market runs 12:00–16:00; the organizer will update the programme."
    },
    url: "https://tapahtumat.salo.fi/salon-joulukulkue-ja-hyvanmielentori/",
    category: "christmas"
  },
  {
    id: "wiurila-avoimet-pikkujoulut",
    start: "2026-12-04",
    title: { fi: "Avoimet pikkujoulut Wiurilassa", es: "Fiesta navideña en Wiurila", en: "Christmas Party at Wiurila" },
    location: "Wiurilan kartano, Salo",
    description: {
      fi: "Wiurilan avoin pikkujoulu-ilta sisältää kolmen ruokalajin illallisen, ohjelmaa ja livemusiikkia. Tarkista varaus- ja hintatiedot järjestäjältä.",
      es: "Velada navideña abierta en Wiurila con cena de tres platos, programa y música en directo. Consulta las reservas y el precio con el organizador.",
      en: "An open Christmas party at Wiurila with a three-course dinner, entertainment and live music. Check booking and pricing details with the organizer."
    },
    url: "https://tapahtumat.salo.fi/avoimet-pikkujoulut-wiurilassa/",
    category: "christmas"
  },
  {
    id: "nauru-pidentaa-iltaa",
    start: "2026-11-28",
    title: { fi: "Nauru pidentää iltaa -revyy", es: "Revista cómica Nauru pidentää iltaa", en: "Nauru pidentää iltaa revue" },
    location: "Astrum Areena, Salo",
    description: {
      fi: "Teatteri PROVinssin revyy yhdistää huumoria, arkisia ilmiöitä ja tarttuvaa musiikkia. Esitys on K-16.",
      es: "Revista de Teatteri PROVinssi que combina humor, situaciones cotidianas y música. Edad mínima 16 años.",
      en: "A Teatteri PROvinssi revue combining humour, everyday situations and lively music. Age restriction 16+."
    },
    url: "https://tapahtumat.salo.fi/nauru-pidentaa-iltaa-revyy-10/",
    category: "culture"
  },
  {
    id: "tanssitaiteen-talvinaytos",
    start: "2026-11-28",
    title: { fi: "Tanssitaiteen talvinäytös", es: "Espectáculo de danza de invierno", en: "Winter Dance Showcase" },
    location: "Kulttuuritila Näkkäri, Salo",
    description: {
      fi: "Salon kansalaisopiston tanssikurssien opiskelijat esiintyvät klo 13 ja 15. Tarkista lippujen saatavuus järjestäjältä.",
      es: "Alumnos de los cursos de danza de la escuela cívica de Salo actúan a las 13:00 y 15:00. Consulta las entradas con el organizador.",
      en: "Students from Salo Adult Education Centre dance courses perform at 13:00 and 15:00. Check ticket availability with the organizer."
    },
    url: "https://tapahtumat.salo.fi/tanssitaiteen-talvinaytos-3/",
    category: "culture"
  },
  {
    id: "kolme-yota-jouluun",
    start: "2026-12-20",
    title: { fi: "Kolme yötä jouluun", es: "Tres noches para Navidad", en: "Three Nights to Christmas" },
    location: "Kulttuuritila Näkkäri, Salo",
    description: {
      fi: "Piazza Brass -puhallinorkesterin joulukonsertti. Liput ostetaan järjestäjän ilmoittamalla tavalla.",
      es: "Concierto navideño de la banda de metales Piazza Brass. Consulta con el organizador cómo adquirir entradas.",
      en: "Christmas concert by the Piazza Brass wind orchestra. Check the organizer's page for ticket details."
    },
    url: "https://tapahtumat.salo.fi/kolme-yota-jouluun/",
    category: "christmas"
  },
];
