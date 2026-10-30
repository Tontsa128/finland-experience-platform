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

type Params = { locale: string; slug: string };

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
      name: item.nameByLocale?.[locale] || item.name,
      description: item.description[locale],
      category,
      image: item.image,
      imageCredit: item.imageCredit,
      location: "Salo · Mathildedal · Teijo",
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
  return null;
}

type LocalPhoto = { src: string; alt: Record<Locale, string>; credit: string; source: string };
const mathildedalAreaPhotos: LocalPhoto[] = [
  { src: photoLibrary.mathildedalHarbour, alt: { fi: "Mathildedalin satama auringonlaskussa", en: "Mathildedal harbour at sunset", es: "Puerto de Mathildedal al atardecer" }, credit: "Kotivalo", source: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg" },
  { src: photoLibrary.mathildedalVillage, alt: { fi: "Mathildedalin historialliset työväenasunnot", en: "Historic workers’ houses in Mathildedal", es: "Antiguas viviendas de trabajadores en Mathildedal" }, credit: "Kotivalo", source: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg" },
];

const providerPhotoGalleries: Record<string, LocalPhoto[]> = {
  "salo-ravintola-terho": [
    { src: "https://static.wixstatic.com/media/684b51_9e9c0f2aaa0e47b98c7fac7ec58c40df~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_9e9c0f2aaa0e47b98c7fac7ec58c40df~mv2.jpg", alt: { fi: "Asiakkaita nauttimassa Terhon takapihan keikkaillasta", en: "Guests enjoying a live-music evening in Terho's backyard", es: "Clientes disfrutando de una noche de música en directo en el patio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_ef3379734b144d43bfadcd454368a546~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_ef3379734b144d43bfadcd454368a546~mv2.jpg", alt: { fi: "Terhon ikkuna ja köynnöskasvit ravintolan ulkoseinällä", en: "The window and climbing vines on Terho's restaurant exterior", es: "Ventana y plantas trepadoras en la fachada del restaurante Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_27bfee4101a34500a147cff0d225341a~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_27bfee4101a34500a147cff0d225341a~mv2.jpg", alt: { fi: "Yleisö seuraamassa keikkaa Terhon takapihalla", en: "Audience watching a live performance in Terho's backyard", es: "Público viendo una actuación en directo en el patio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/684b51_8848b144df924991a269607232bb92ac~mv2.jpg/v1/fit/w_674%2Ch_450%2Cq_90%2Cenc_avif%2Cquality_auto/684b51_8848b144df924991a269607232bb92ac~mv2.jpg", alt: { fi: "Terhon takapihan terassi täynnä asiakkaita", en: "Terho's backyard terrace filled with guests", es: "Terraza del patio de Terho llena de clientes" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/5e5929_c36ae105fdc743b998042f60cb1d4d69~mv2.jpg/v1/fill/w_702%2Ch_496%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/_DSC0416.jpg", alt: { fi: "Terhon oman paahtimon kahvi", en: "Coffee from Terho's own roastery", es: "Café del tostador propio de Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" },
    { src: "https://static.wixstatic.com/media/43c9db_106f9b1e0bf94dc5ba9f699b8a55f4d6~mv2.jpg/v1/fill/w_871%2Ch_553%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/terho-web-71_edited.jpg", alt: { fi: "Terhon pizza ja paikallinen juoma", en: "Pizza and a local drink at Terho", es: "Pizza y bebida local en Terho" }, credit: "Ravintola Terho", source: "https://www.ravintolaterho.fi/" }
  ]
};

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

export default async function ProviderDetailPage({ params }: { params: Promise<Params> }) {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const provider = resolveProvider(slug, locale);
  if (!provider) notFound();
  const c = copy[locale];

  return (
    <main className="min-w-0 overflow-hidden bg-white text-brand-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: provider.name,
        description: provider.description,
        url: provider.website,
        image: provider.image ? [provider.image] : undefined,
        address: { "@type": "PostalAddress", addressLocality: provider.location, addressCountry: "FI" },
      }).replace(/</g, "\\u003c") }} />
      <section className="relative isolate min-h-[42svh] overflow-hidden bg-brand-950 text-white sm:min-h-[54svh]">
        {provider.image ? <Image src={provider.image} alt={provider.name} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[42svh] min-w-0 items-end py-8 sm:min-h-[54svh] sm:py-14">
          <div className="max-w-4xl">
            <Link href={`/${locale}/destinations`} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-sm font-semibold text-white hover:bg-black/40">
              <ArrowLeft className="h-4 w-4" />{c.back}
            </Link>
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
            const guide = mathildedalGuides[slug]?.[locale];
            if (!guide) return null;
            const galleryPhotos: LocalPhoto[] = [...(provider.image ? [{ src: provider.image, alt: { fi: provider.name, en: provider.name, es: provider.name }, credit: provider.imageCredit || provider.name, source: provider.website }] : []), ...(providerPhotoGalleries[slug] || []), ...mathildedalAreaPhotos];
            return (
              <div className="mt-10 space-y-8">
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
                <section className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
                  <h3 className="font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-700">{guide.intro}</p>
                </section>
                <section>
                  <h3 className="font-display text-2xl font-bold text-brand-950">{guide.highlightsTitle}</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {guide.highlights.map((highlight) => <li key={highlight} className="rounded-2xl border border-slate-200 p-4 text-sm leading-7 text-slate-700"><span className="mr-2 font-bold text-brand-700">✓</span>{highlight}</li>)}
                  </ul>
                </section>
                <section className="rounded-3xl border border-slate-200 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-brand-950">{guide.planningTitle}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{guide.planning}</p>
                </section>
                <section>
                  <h3 className="font-display text-2xl font-bold text-brand-950">{guide.nearbyTitle}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {mathildedalRelated.filter((place) => place.slug !== slug).map((place) => <Link key={place.slug} href={`/${locale}/providers/${place.slug}`} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-4 font-semibold text-brand-950 transition hover:border-brand-400 hover:bg-brand-50"><span>{place.name[locale]}</span><ArrowUpRight className="h-4 w-4 shrink-0" /></Link>)}
                  </div>
                </section>
              </div>
            );
          })()}
        </article>

        <aside className="h-fit min-w-0 rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:p-7 lg:sticky lg:top-24">
          {provider.price ? <div className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-brand-600">{c.price}</p><p className="mt-2 break-words font-semibold text-brand-950">{provider.price}</p></div> : null}
          <p className="text-sm leading-6 text-slate-700">{c.direct}</p>
          <a href={provider.website} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-950 px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-brand-800">
            {c.visit}<ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
          <p className="mt-3 break-all text-xs text-slate-500">{provider.website}</p>
        </aside>
      </section>
    </main>
  );
}
