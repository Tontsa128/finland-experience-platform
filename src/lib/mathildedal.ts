import type { Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";

export type MathildedalCategory = "majoitus" | "ruoka" | "aktiviteetit" | "elamykset";
export type MathildedalItem = {
  name: string;
  description: Record<Locale, string>;
  url: string;
  image: string | null;
  address?: string;
  seasonal?: boolean;
};

export const stays: MathildedalItem[] = [
  { name: "Hotel Mathildedal", description: { fi: "Boutique-hotelli historiallisessa ruukkimiljöössä; aamiainen sisältyy majoitukseen.", es: "Hotel boutique en un entorno histórico; el desayuno está incluido.", en: "Boutique hotel in the historic ironworks setting; breakfast is included." }, url: "https://mathildedal.fi/majoitus/", image: null, address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Mathildan Marina", description: { fi: "Satamahotellin huoneita, matkaparkki sekä sauna- ja ravintolapalveluja.", es: "Habitaciones junto al puerto, área para autocaravanas, sauna y restaurante.", en: "Harbour hotel rooms, motorhome pitches, sauna and restaurant." }, url: "https://mathildanmarina.fi/", image: null, address: "Ruukinrannantie 4, Mathildedal" },
  { name: "Matilda Villas", description: { fi: "Ympärivuotisia hyvin varusteltuja mökkejä, oma sauna ja terassi.", es: "Cabañas equipadas para todo el año, con sauna privada y terraza.", en: "Well-equipped year-round cottages with private sauna and terrace." }, url: "https://matildavillas.fi/", image: null, address: "Karvarinkulma, Mathildedal" },
  { name: "Matri House", description: { fi: "Yksilöllinen boutique-majoitus kylän sydämessä, puutarha ja yhteiset tilat.", es: "Alojamiento boutique en el centro del pueblo, con jardín y espacios comunes.", en: "Individual boutique rooms in the village centre, with a garden and shared spaces." }, url: "https://matrihouse.fi/", image: null, address: "Matildan Puistotie 6, Mathildedal" },
  { name: "Meri-Ruukin lomakylä", description: { fi: "Loma-asuntoja, rantasauna, laituri ja grillialue lähellä kansallispuistoa.", es: "Apartamentos vacacionales, sauna junto al mar, muelle y zona de barbacoa.", en: "Holiday apartments, seaside sauna, pier and barbecue area near the national park." }, url: "https://meri-ruukki.fi/", image: null, address: "Kiikunmäentie 28, Mathildedal" },
  { name: "Majoitus Mathildedal", description: { fi: "Erillinen vuokramökki Mathildedalissa; tarkista varustelu, vapaat päivät ja ehdot majoittajan sivulta.", es: "Casa de alquiler en Mathildedal; consulta equipamiento, fechas disponibles y condiciones en la web del anfitrión.", en: "A privately rented holiday cottage in Mathildedal; check facilities, availability and terms on the host website." }, url: "https://www.majoitusmathildedal.com/", image: null, address: "Mathildedal" },
  { name: "Natura Viva – Teijo", description: { fi: "Luontomajoitusta ja retkeilyyn sopivia yöpymisvaihtoehtoja Teijon alueella.", es: "Alojamiento en la naturaleza y opciones para senderistas en la zona de Teijo.", en: "Nature stays and accommodation options for hikers around Teijo." }, url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: null, address: "Matildajärventie 84, Mathildedal" },
];

export const food: MathildedalItem[] = [
  { name: "Bistro Bruket", description: { fi: "Bistro, à la carte, lounas ja kesäkauden terassi meren tuntumassa.", es: "Bistró, carta, almuerzos y terraza de verano cerca del mar.", en: "Bistro dining, à la carte, lunch and a summer terrace close to the sea." }, url: "https://bistrobruket.fi/", image: null, address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Café Mathildedal", description: { fi: "Tuoreita leivonnaisia, kakkuja, suolaisia herkkuja ja pannukahvia.", es: "Bollería recién hecha, tartas, bocados salados y café de filtro.", en: "Fresh pastries, cakes, savoury treats and pot-brewed coffee." }, url: "https://mathildedal.fi/", image: null, address: "Ruukinrannantie 6, Mathildedal" },
  { name: "Kyläravintola Terho", description: { fi: "Pizzaa, paikallisia makuja, kahvia ja usein myös livemusiikkia.", es: "Pizza, sabores locales, café y música en directo en determinadas fechas.", en: "Pizza, local flavours, coffee and live music on selected dates." }, url: "https://ravintolaterho.fi/", image: null, address: "Matildan Puistotie 4, Mathildedal" },
  { name: "Mathildan Marina", description: { fi: "Satamaravintola ja terassi merimaisemissa; myös tapahtumia ja saunapalveluja.", es: "Restaurante y terraza junto al puerto, con eventos y sauna.", en: "Harbour restaurant and sea-view terrace, plus events and sauna." }, url: "https://mathildanmarina.fi/", image: null, address: "Ruukinrannantie 4, Mathildedal" },
  { name: "Mathildedalin Keskuspuisto", description: { fi: "Kausittainen street food, kahvila, virvokkeet ja jäätelö.", es: "Comida callejera de temporada, cafetería, bebidas y helados.", en: "Seasonal street food, café, refreshments and ice cream." }, url: "https://mathildedalinkeskuspuisto.fi/", image: null, address: "Mathildedal" },
  { name: "Meri-Teijo Golf Café-Pizzeria", description: { fi: "Kahvila ja kausittainen pizzeria golfkentän ja meren maisemissa.", es: "Café y pizzería de temporada con vistas al campo de golf y al mar.", en: "Café and seasonal pizzeria overlooking the golf course and sea." }, url: "https://meriteijogolf.com/", image: null, address: "Länsitalantie 56, Teijo" },
  { name: "Metsäravintola", description: { fi: "Lähiruokaa ja leivonnaisia; ruokaretkiä myös tilauksesta.", es: "Productos locales y repostería; experiencias gastronómicas con reserva.", en: "Local food and baked goods, with food excursions by arrangement." }, url: "https://ravintolateijonarkki.fi/", image: null, address: "Matildajärventie 84, Mathildedal" },
  { name: "Terho Hills", description: { fi: "Rinneravintola ja after ski Teijo Ski & Action Parkissa; kausiluonteinen.", es: "Restaurante de pistas y after-ski en Teijo Ski & Action Park; estacional.", en: "Slope-side food and après-ski at Teijo Ski & Action Park; seasonal." }, url: "https://terhohills.fi/", image: null, address: "Teijontie 345, Teijo", seasonal: true },
];

export const activities: MathildedalItem[] = [
  { name: "Teijon kansallispuisto", description: { fi: "Merkityt reitit, järvet, metsät ja rannikon luonto.", es: "Senderos señalizados, lagos, bosques y naturaleza costera.", en: "Marked trails, lakes, forests and coastal nature." }, url: "https://www.luontoon.fi/teijo", image: photoLibrary.teijoNationalPark, address: "Teijon kansallispuisto" },
  { name: "Natura Viva – välinevuokraus", description: { fi: "Tarkista melonnan, vesillä liikkumisen ja retkeilyn vuokrauspalvelut.", es: "Consulta el alquiler de equipo para kayak, actividades acuáticas y excursiones.", en: "Check equipment rental for kayaking, water activities and outdoor trips." }, url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: null, address: "Matildajärventie 84" },
  { name: "Meri-Teijo Golf", description: { fi: "Golfia ja merellisiä maisemia; tarkista peliajat ja palvelut suoraan kentältä.", es: "Golf y paisajes marinos; consulta horarios y servicios directamente.", en: "Golf and sea views; check tee times and services directly with the course." }, url: "https://meriteijogolf.com/", image: null, address: "Länsitalantie 56, Teijo" },
  { name: "Mathildan Marina", description: { fi: "Satama, tapahtumat ja aktiviteetteja vierailijoille; osa palveluista on kausittaisia.", es: "Puerto, eventos y actividades para visitantes; algunos servicios son estacionales.", en: "Harbour, events and visitor activities; some services are seasonal." }, url: "https://mathildanmarina.fi/", image: photoLibrary.mathildedalHarbour, address: "Ruukinrannantie 4" },
  { name: "Mathildedalin Keskuspuisto", description: { fi: "Kylän ulkoilu- ja pelipaikka sekä kausittainen kahvila.", es: "Espacio de juegos y actividades al aire libre, con cafetería estacional.", en: "Outdoor games and activity space with a seasonal café." }, url: "https://mathildedalinkeskuspuisto.fi/", image: null, address: "Mathildedal" },
];

export const experiences: MathildedalItem[] = [
  { name: "Mathildan Marina – sauna ja satama", description: { fi: "Sauna, poreallas- ja talvikauden palvelut sekä tunnelmallinen satamaympäristö; kysy saatavuus suoraan.", es: "Sauna, servicios de temporada fría y ambiente portuario; consulta disponibilidad.", en: "Sauna, cold-season services and a harbour setting; ask the provider about availability." }, url: "https://mathildanmarina.fi/", image: null, address: "Ruukinrannantie 4" },
  { name: "Mathildedalin ruukkikylä", description: { fi: "Tutustu vanhoihin ruukkirakennuksiin, putiikkeihin, käsityöhön ja kylän historiaan.", es: "Descubre los edificios históricos, tiendas, artesanía e historia del pueblo.", en: "Explore historic ironworks buildings, small shops, crafts and village history." }, url: "https://visitmathildedal.fi/fi", image: photoLibrary.mathildedalVillage, address: "Mathildedalin kylä" },
  { name: "Visit Mathildedal – tapahtumat ja vierailu", description: { fi: "Tarkista ajankohtaiset tapahtumat, vierailuvinkit ja sesonkien palvelut.", es: "Consulta eventos, consejos para la visita y servicios de temporada.", en: "Check current events, visitor tips and seasonal services." }, url: "https://visitmathildedal.fi/fi", image: null, address: "Mathildedal" },
  { name: "Teijon kansallispuisto – luontoelämys", description: { fi: "Yhdistä kyläkäyntiin retki metsään, järven rantaan tai merkitylle reitille.", es: "Combina la visita al pueblo con un paseo por el bosque, el lago o un sendero señalizado.", en: "Combine a village visit with a forest, lakeside or marked-trail walk." }, url: "https://www.luontoon.fi/teijo", image: photoLibrary.teijoNationalPark, address: "Teijon kansallispuisto" },
];

export const mathildedalData: Record<MathildedalCategory, MathildedalItem[]> = { majoitus: stays, ruoka: food, aktiviteetit: activities, elamykset: experiences };

export function slugifyMathildedal(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getMathildedalItem(category: string, slug: string): { category: MathildedalCategory; item: MathildedalItem } | null {
  if (!Object.prototype.hasOwnProperty.call(mathildedalData, category)) return null;
  const typedCategory = category as MathildedalCategory;
  const item = mathildedalData[typedCategory].find((candidate) => slugifyMathildedal(candidate.name) === slug);
  return item ? { category: typedCategory, item } : null;
}
