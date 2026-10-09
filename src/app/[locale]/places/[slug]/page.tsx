import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Coffee, Compass, Flame, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

type Localized = Record<Locale, string>;
type PlaceContent = {
  name: Localized;
  area: Localized;
  description: Localized;
  image: string;
  stay: Localized;
  activities: Localized;
  food: Localized;
  experiences: Localized;
  officialName: Localized;
  officialUrl: string;
  secondaryName?: Localized;
  secondaryUrl?: string;
  mapQuery: string;
};

const places: Record<string, PlaceContent> = {
  "teijo-kirjakkala": {
    name: { fi: "Teijo ja Kirjakkala", es: "Teijo y Kirjakkala", en: "Teijo & Kirjakkala" },
    area: { fi: "Salo · ruukkikylät", es: "Salo · pueblos históricos", en: "Salo · ironworks villages" },
    description: { fi: "Teijon ja Kirjakkalan ruukkikylissä kohtaavat teollinen historia, vanhat rakennukset, paikallinen kulttuuri ja Teijon kansallispuiston luonto. Alue sopii sekä rauhalliseen kyläkävelyyn että aktiiviseen ulkoilupäivään.", es: "Los pueblos históricos de Teijo y Kirjakkala combinan patrimonio industrial, edificios antiguos, cultura local y la naturaleza del Parque Nacional de Teijo.", en: "The historic villages of Teijo and Kirjakkala bring together ironworks heritage, old buildings, local culture and the nature of Teijo National Park." },
    image: photoLibrary.teijoNationalPark,
    stay: { fi: "Alueella on majoitusta ruukkikylissä sekä kansallispuiston lähellä. Esimerkiksi Kirjakkalan Ruukkikylä tarjoaa majoitus- ja saunapalveluja; tarkista ajantasainen saatavuus suoraan toimijalta.", es: "Hay alojamiento en los pueblos históricos y cerca del parque nacional. Kirjakkalan Ruukkikylä ofrece alojamiento y sauna; comprueba la disponibilidad directamente.", en: "Accommodation is available in the villages and near the national park. Kirjakkalan Ruukkikylä offers stays and sauna services; check availability directly." },
    activities: { fi: "Tutustu Teijon kirkkoon, ruukkimiljööseen ja Kirjakkalan vanhoihin rakennuksiin. Lähistöllä voi patikoida, pyöräillä, meloa ja tutustua paikallisiin näyttelyihin.", es: "Visita la iglesia de Teijo, los edificios históricos y Kirjakkala. Cerca hay senderismo, ciclismo, kayak y exposiciones locales.", en: "Explore Teijo Church, historic ironworks buildings and Kirjakkala. Nearby options include hiking, cycling, kayaking and local exhibitions." },
    food: { fi: "Kylien ravintolat, kahvilat ja leipomot ovat osa vierailua. Tarkista aukioloajat ja sesonkitarjonta VisitSalon kohdeoppaasta ennen matkaa.", es: "Los restaurantes, cafés y panaderías forman parte de la visita. Consulta horarios y servicios de temporada en la guía oficial.", en: "Village restaurants, cafés and bakeries are part of the visit. Check current opening times and seasonal services in the official guide." },
    experiences: { fi: "Yhdistä kyläkävely kansallispuiston reittiin, järvimaisemaan tai saunailtaan. Anna päivän rytmin määräytyä sään, auki olevien palveluiden ja omien kiinnostusten mukaan.", es: "Combina un paseo por el pueblo con una ruta del parque, vistas al lago o una sauna. Adapta el día al tiempo y a los servicios disponibles.", en: "Combine a village walk with a national park trail, lake views or a sauna. Plan around the weather and current local services." },
    officialName: { fi: "VisitSalo: Teijon ja Kirjakkalan ruukkikylät", es: "VisitSalo: pueblos históricos de Teijo y Kirjakkala", en: "VisitSalo: Teijo & Kirjakkala ironworks villages" },
    officialUrl: "https://visitsalo.fi/teijon-ja-kirjakkalan-ruukkikylat/",
    secondaryName: { fi: "Kirjakkalan Ruukkikylä", es: "Kirjakkalan Ruukkikylä", en: "Kirjakkalan Ruukkikylä" },
    secondaryUrl: "https://kohteet.visitsalo.fi/kirjakkalan-ruukkikyla-melontakeskus/",
    mapQuery: "Teijo and Kirjakkala, Salo, Finland",
  },
  "teijo": {
    name: { fi: "Teijon kansallispuisto", es: "Parque Nacional de Teijo", en: "Teijo National Park" },
    area: { fi: "Salo · luonto ja retkeily", es: "Salo · naturaleza y senderismo", en: "Salo · nature and hiking" },
    description: { fi: "Teijon kansallispuisto kokoaa järvet, metsät, suot ja rannikon samaan retkeilyalueeseen. Se on luontopäivän ydin Salon seudulla, ja vierailun voi yhdistää Mathildedaliin ja ruukkikyliin.", es: "El Parque Nacional de Teijo reúne lagos, bosques, humedales y costa. Es una excelente base para un día de naturaleza que puede combinarse con Mathildedal y los pueblos históricos.", en: "Teijo National Park brings together lakes, forests, wetlands and coastline. It is a natural centrepiece for a day outdoors and pairs well with Mathildedal and the ironworks villages." },
    image: photoLibrary.teijoNationalPark,
    stay: { fi: "Lähialueella on mökkejä, kylämajoitusta ja retkeilijöille sopivia vaihtoehtoja. Tarkista palveluiden sijainti ja sesonki virallisesta kohdeoppaasta.", es: "En los alrededores hay cabañas, alojamiento en pueblos y opciones para senderistas. Consulta ubicación y temporada en la guía oficial.", en: "Nearby options include cottages, village accommodation and stays suited to hikers. Check locations and season in the official guide." },
    activities: { fi: "Retkeily, järvimaisemat ja luonnon tarkkailu ovat alueen keskeisiä tekemisiä. Kausittain tarjolla voi olla myös melontaa, SUP-lautailua, pyöräilyä ja välinevuokrausta.", es: "El senderismo, los lagos y la observación de la naturaleza son las actividades principales. Según la temporada puede haber kayak, SUP, ciclismo y alquiler de equipo.", en: "Hiking, lake scenery and nature watching are central activities. Depending on the season, kayaking, SUP, cycling and equipment rental may also be available." },
    food: { fi: "Ruokailu ja kahvilapalvelut löytyvät kansallispuiston lähikylistä. Tarkista aukioloajat ja palvelut ennen retkeä sekä ota mukaan riittävästi vettä ja eväitä.", es: "Los pueblos cercanos ofrecen restaurantes y cafés. Comprueba horarios antes de salir y lleva agua y comida suficientes.", en: "Nearby villages offer places to eat and cafés. Check opening hours before setting out and bring enough water and provisions." },
    experiences: { fi: "Valitse reitti oman kuntosi ja päivän olosuhteiden mukaan. Pysy merkityillä reiteillä ja tarkista tulenteko- ja pysäköintiohjeet Metsähallituksen ajantasaisista tiedoista.", es: "Elige una ruta adecuada a tu condición física y a las condiciones del día. Sigue los senderos señalizados y consulta las normas vigentes.", en: "Choose a trail that fits your fitness and the day's conditions. Stay on marked routes and check current fire and parking guidance." },
    officialName: { fi: "VisitSalo: Teijon kansallispuisto", es: "VisitSalo: Parque Nacional de Teijo", en: "VisitSalo: Teijo National Park" },
    officialUrl: "https://visitsalo.fi/teijon-kansallispuisto/",
    mapQuery: "Teijo National Park, Salo, Finland",
  },
  "sarkisalo": {
    name: { fi: "Särkisalo ja meri", es: "Särkisalo y el mar", en: "Särkisalo & the sea" },
    area: { fi: "Salo · saaristo", es: "Salo · archipiélago", en: "Salo · archipelago" },
    description: { fi: "Särkisalo on Salon merellinen saaristoalue, jossa pienet satamat, mökkirannat, kalastus ja avarat merimaisemat määrittävät lomapäivän. Förby ja saariston kylät sopivat kiireettömään pysähtymiseen.", es: "Särkisalo es una zona insular de Salo con pequeños puertos, cabañas junto al mar, pesca y paisajes abiertos. Förby y los pueblos del archipiélago invitan a viajar sin prisas.", en: "Särkisalo is Salo's maritime island area, shaped by small harbours, seaside cottages, fishing and open sea views. Förby and the archipelago villages reward an unhurried visit." },
    image: photoLibrary.sarkisalo,
    stay: { fi: "Alueelta löytyy merenrantamökkejä, lomamajoitusta ja pieniä majoituspaikkoja. Tarkista sijainti, kulkuyhteydet ja palvelut suoraan majoittajalta.", es: "Hay cabañas junto al mar y pequeños alojamientos. Comprueba ubicación, conexiones y servicios directamente con el proveedor.", en: "The area has seaside cottages and small accommodation providers. Check location, transport and facilities directly with each host." },
    activities: { fi: "Veneily, melonta, kalastus, pyöräily ja saaristomaisemista nauttiminen ovat alueen vahvuuksia. Sää ja meriolot vaikuttavat vesillä liikkumiseen.", es: "La navegación, el kayak, la pesca, el ciclismo y los paisajes insulares son los principales atractivos. El tiempo y el estado del mar condicionan las actividades acuáticas.", en: "Boating, kayaking, fishing, cycling and island scenery are key attractions. Weather and sea conditions affect water-based activities." },
    food: { fi: "Satamien ja kylien kesäkauden kahvilat ja ravintolat tuovat paikallisia makuja osaksi vierailua. Aukiolo voi olla kausittaista, joten tarkista tiedot etukäteen.", es: "Los cafés y restaurantes de temporada en puertos y pueblos aportan sabores locales. Comprueba los horarios con antelación.", en: "Seasonal cafés and restaurants around harbours and villages add local flavours. Check opening times in advance." },
    experiences: { fi: "Vietä päivä meren äärellä, varaa paikallinen kalastusretki tai pysähdy auringonlaskuun. Tutustu saariston lauttayhteyksiin ennen kuin suunnittelet reitin.", es: "Pasa el día junto al mar, consulta excursiones de pesca o disfruta del atardecer. Comprueba los ferris antes de planificar la ruta.", en: "Spend a day by the sea, look into local fishing trips or stay for sunset. Check ferry connections before planning your route." },
    officialName: { fi: "VisitSalo: Särkisalo ja meri", es: "VisitSalo: Särkisalo y el mar", en: "VisitSalo: Särkisalo and the sea" },
    officialUrl: "https://visitsalo.fi/sarkisalo-ja-meri/",
    mapQuery: "Särkisalo, Salo, Finland",
  },
  "pernio": {
    name: { fi: "Perniö ja maaseutu", es: "Perniö y el campo", en: "Perniö & the countryside" },
    area: { fi: "Salo · maaseutu", es: "Salo · zona rural", en: "Salo · countryside" },
    description: { fi: "Perniön seudulla jokilaakso, vanhat kylät, maatilat, lähiruoka ja paikallishistoria tuovat Salon lomaan maaseudun rytmiä. Alue sopii rauhallisiin auto- ja pyöräretkiin sekä paikallisiin makuelämyksiin.", es: "La zona de Perniö combina valles, pueblos históricos, granjas, productos locales e historia. Es ideal para excursiones tranquilas en coche o bicicleta.", en: "Perniö brings river valleys, old villages, farms, local food and history into the Salo region. It suits relaxed road trips, cycling and local food stops." },
    image: photoLibrary.saloVeturitalli,
    stay: { fi: "Majoitusta löytyy maaseudun mökeistä, maatiloilta ja Salon laajemmalta alueelta. Tarkista sijainti ja etäisyydet ennen varausta.", es: "Hay cabañas rurales, estancias en granjas y alojamiento en la región de Salo. Comprueba las distancias antes de reservar.", en: "Options include rural cottages, farm stays and accommodation across the wider Salo region. Check distances before booking." },
    activities: { fi: "Tutustu kyläteihin, paikallisiin luontopolkuihin, maatiloihin ja alueen historiallisiin kohteisiin. Reitit ja kohteet kannattaa tarkistaa virallisesta VisitSalo-oppaasta.", es: "Descubre caminos rurales, senderos, granjas y lugares históricos. Consulta las rutas y los lugares en la guía oficial.", en: "Explore country roads, nature trails, farms and historic sites. Use the official VisitSalo guide to check routes and locations." },
    food: { fi: "Lähiruoka, tilapuodit ja kausittaiset kahvilat ovat osa Perniön seudun kokemusta. Tarkista aukioloajat suoraan yrityksiltä.", es: "Los productos locales, tiendas de granja y cafés de temporada forman parte de la experiencia. Comprueba los horarios directamente.", en: "Local food, farm shops and seasonal cafés are part of the experience. Check opening times directly with businesses." },
    experiences: { fi: "Yhdistä maaseutukylät, paikallinen ruoka ja luontokohde yhdeksi omatoimiseksi päiväretkeksi. Varaa kaikki palvelut suoraan niitä tarjoavilta yrityksiltä.", es: "Combina pueblos rurales, gastronomía local y naturaleza en una excursión independiente. Contacta directamente con cada proveedor.", en: "Combine rural villages, local food and a nature stop into a self-planned day trip. Arrange services directly with providers." },
    officialName: { fi: "VisitSalo – virallinen matkailuopas", es: "VisitSalo – guía turística oficial", en: "VisitSalo – official tourism guide" },
    officialUrl: "https://visitsalo.fi/",
    mapQuery: "Perniö, Salo, Finland",
  },
  "halikko-wiurila": {
    name: { fi: "Halikko ja Wiurila", es: "Halikko y Wiurila", en: "Halikko & Wiurila" },
    area: { fi: "Salo · kartanot ja kulttuuri", es: "Salo · mansiones y cultura", en: "Salo · manor houses and culture" },
    description: { fi: "Halikko yhdistää kartanokulttuurin, historian, paikalliset maut ja pienet elämykset. Wiurilan kartano on alueen keskeinen vierailukohde, jossa kulttuuri, ruoka, majoitus ja näyttelyt kohtaavat.", es: "Halikko reúne historia, cultura de mansiones, gastronomía y pequeñas experiencias. Wiurila Manor es uno de los lugares destacados de la zona.", en: "Halikko combines manor-house heritage, history, local food and small-scale experiences. Wiurila Manor is a key place to visit, bringing together culture, food, stays and exhibitions." },
    image: photoLibrary.saloVeturitalli,
    stay: { fi: "Wiurilassa ja Salon alueella on majoitusvaihtoehtoja hotelleista ja kartanomajoituksesta muihin paikallisiin yöpymisiin. Tarkista saatavuus suoraan toimijalta.", es: "Wiurila y la región de Salo ofrecen hoteles, alojamiento en una mansión y otras opciones. Consulta disponibilidad directamente.", en: "Wiurila and the Salo region offer hotels, manor accommodation and other stays. Check availability directly with providers." },
    activities: { fi: "Tutustu Wiurilan museoihin ja näyttelyihin, kartanomiljööseen, golfiin sekä lähialueen historiallisiin ja kulttuurisiin kohteisiin.", es: "Visita los museos y exposiciones de Wiurila, disfruta del entorno de la mansión, el golf y otros lugares históricos y culturales.", en: "Explore Wiurila's museums and exhibitions, the manor setting, golf and other historic and cultural sites nearby." },
    food: { fi: "Alueella on kartanoravintola, kahviloita ja paikallisia ruokaelämyksiä. Aukiolo ja tarjonta vaihtelevat vuodenajan mukaan.", es: "Hay restaurante de la mansión, cafés y experiencias gastronómicas locales. Los horarios varían según la temporada.", en: "The area has a manor restaurant, cafés and local food experiences. Opening times and offerings vary by season." },
    experiences: { fi: "Halikko sopii kulttuuripäivään, kartanovierailuun ja paikallisten makujen tutkimiseen. Tarkista näyttelyiden ja opastusten ajantasaiset tiedot ennen saapumista.", es: "Halikko es ideal para un día de cultura, visitar la mansión y descubrir sabores locales. Consulta exposiciones y visitas guiadas antes de llegar.", en: "Halikko works well for a culture day, manor visit and local food discoveries. Check current exhibitions and guided visits before travelling." },
    officialName: { fi: "VisitSalo: Halikko", es: "VisitSalo: Halikko", en: "VisitSalo: Halikko" },
    officialUrl: "https://visitsalo.fi/halikko/",
    secondaryName: { fi: "Wiurilan kartanon kohdesivu", es: "Guía de Wiurila Manor", en: "Wiurila Manor destination guide" },
    secondaryUrl: "https://kohteet.visitsalo.fi/wiurilan-kartano/",
    mapQuery: "Halikko and Wiurila Manor, Salo, Finland",
  },
  "jarvi-salo": {
    name: { fi: "Järvi-Salo ja lande", es: "Järvi-Salo y el campo", en: "Järvi-Salo & the countryside" },
    area: { fi: "Salo · järvet ja maaseutu", es: "Salo · lagos y campo", en: "Salo · lakes and countryside" },
    description: { fi: "Järvi-Salo on järvien, metsien, maaseutukylien ja hiljaisten luontokohteiden alue. Se sopii matkailijalle, joka haluaa tutustua Salon toiseen puoleen ruukkikylien ja merenrannan lisäksi.", es: "Järvi-Salo es una zona de lagos, bosques, pueblos rurales y naturaleza tranquila. Muestra otra cara de la región, más allá de los pueblos históricos y la costa.", en: "Järvi-Salo is a region of lakes, forests, rural villages and quiet nature spots. It reveals another side of Salo beyond the ironworks villages and coastline." },
    image: photoLibrary.teijoNationalPark,
    stay: { fi: "Alueen majoitus koostuu etenkin mökeistä, maaseutukohteista ja Salon seudun muista vaihtoehdoista. Tarkista etäisyydet ja palvelut ennen varausta.", es: "La oferta incluye sobre todo cabañas y alojamientos rurales, además de otras opciones de Salo. Comprueba distancias y servicios antes de reservar.", en: "Stays are mainly cottages and rural accommodation, alongside other options across Salo. Check distances and facilities before booking." },
    activities: { fi: "Retkeily, luontopolut, järvimaisemat ja paikalliset kyläkohteet ovat luontevia tapoja tutustua alueeseen. Tarkista reitit ja kohteet virallisesta oppaasta.", es: "Senderismo, rutas naturales, paisajes lacustres y pueblos locales son buenas formas de conocer la zona. Consulta las rutas en la guía oficial.", en: "Hiking, nature trails, lake views and local villages are natural ways to explore. Check routes and sites in the official guide." },
    food: { fi: "Paikallista ruokaa ja kahvilapalveluja löytyy kyliltä ja maaseudun yrityksistä; tarjonta on usein kausittaista.", es: "Los pueblos y negocios rurales ofrecen productos locales y cafés, a menudo de temporada.", en: "Local food and cafés can be found in villages and rural businesses; many services are seasonal." },
    experiences: { fi: "Varaa aikaa rauhalliseen maisemien katseluun ja yhdistä retkeen paikallinen maatila tai muu avoinna oleva kohde. Tarkista kausitiedot ennen lähtöä.", es: "Dedica tiempo a disfrutar del paisaje y combina la ruta con una granja u otro lugar abierto. Comprueba la temporada antes de salir.", en: "Take time to enjoy the scenery and combine the outing with a farm or another open attraction. Check seasonal details before setting off." },
    officialName: { fi: "VisitSalo: Järvi-Salo ja lande", es: "VisitSalo: Järvi-Salo y el campo", en: "VisitSalo: Järvi-Salo & countryside" },
    officialUrl: "https://visitsalo.fi/jarvi-salo/",
    mapQuery: "Järvi-Salo, Salo, Finland",
  },
  "salo-center": {
    name: { fi: "Salon keskusta ja tori", es: "Centro y mercado de Salo", en: "Salo centre and market square" },
    area: { fi: "Salo · kaupunkielämä", es: "Salo · vida urbana", en: "Salo · town life" },
    description: { fi: "Salon keskusta kokoaa yhteen torin, kahvilat, ravintolat, museot, ostokset ja tapahtumat. Se on hyvä aloituspiste myös muualle Salon seudulle suuntaaville.", es: "El centro de Salo reúne mercado, cafés, restaurantes, museos, compras y eventos. También es un buen punto de partida para explorar la región.", en: "Salo centre brings together the market square, cafés, restaurants, museums, shopping and events. It is also a useful starting point for exploring the wider region." },
    image: photoLibrary.saloVeturitalli,
    stay: { fi: "Keskustassa on hotelleja ja muita majoitusvaihtoehtoja. Vertaile sijaintia ja palveluita ja tarkista varaus suoraan majoittajalta.", es: "El centro cuenta con hoteles y otras opciones de alojamiento. Compara ubicación y servicios y reserva directamente.", en: "The centre has hotels and other accommodation. Compare location and facilities, then book directly with the provider." },
    activities: { fi: "Käy torilla, tutustu Salon taidemuseo Veturitalliin ja tarkista ajankohtaiset tapahtumat sekä kulttuuritarjonta.", es: "Visita el mercado y el Museo de Arte Veturitalli, y consulta los eventos y la oferta cultural actual.", en: "Visit the market square and Veturitalli Art Museum, and check current events and cultural listings." },
    food: { fi: "Torikahvilat, ravintolat ja paikalliset ruokapaikat tekevät keskustasta helpon pysähdyspaikan. Tarkista tapahtumapäivien ja sesongin aukiolot.", es: "Los cafés del mercado, restaurantes y locales de comida hacen del centro una parada fácil. Comprueba horarios de temporada y eventos.", en: "Market cafés, restaurants and local food spots make the centre an easy stop. Check seasonal and event-day opening hours." },
    experiences: { fi: "Kesäiset iltatorit, kulttuurikävelyt, museot ja keskustan tapahtumat tuovat paikallista elämää vierailuun.", es: "Los mercados nocturnos de verano, paseos culturales, museos y eventos acercan la vida local al visitante.", en: "Summer evening markets, cultural walks, museums and town events bring local life into the visit." },
    officialName: { fi: "VisitSalo: Salon tori ja keskusta", es: "VisitSalo: centro y mercado", en: "VisitSalo: Salo market square and centre" },
    officialUrl: "https://visitsalo.fi/salon-tori-ja-keskusta/",
    mapQuery: "Salo Market Square, Salo, Finland",
  },
};

const labels = {
  fi: { stay: "Majoitus ja mökit", activities: "Aktiviteetit ja nähtävyydet", food: "Ruoka ja juoma", experiences: "Elämykset ja paikallinen elämä", map: "Sijainti ja kartta", official: "Avaa virallinen VisitSalo-opas", secondary: "Lisätietoa kohteesta", back: "Takaisin Salon alueoppaaseen", direct: "Asioi suoraan palveluntarjoajan kanssa", directText: "Tarkista saatavuus, aukioloajat ja ehdot palveluntarjoajalta. Finnexprience ei ota varausta tai maksua vastaan." },
  es: { stay: "Alojamiento y cabañas", activities: "Actividades y lugares de interés", food: "Gastronomía y bebidas", experiences: "Experiencias y vida local", map: "Ubicación y mapa", official: "Abrir la guía oficial de VisitSalo", secondary: "Más información del lugar", back: "Volver a la guía regional de Salo", direct: "Contacto directo con el proveedor", directText: "Comprueba disponibilidad, horarios y condiciones con el proveedor. Finnexprience no gestiona reservas ni pagos." },
  en: { stay: "Accommodation and cottages", activities: "Activities and sights", food: "Food and drink", experiences: "Experiences and local life", map: "Location and map", official: "Open the official VisitSalo guide", secondary: "More about this place", back: "Back to the Salo regional guide", direct: "Deal directly with the provider", directText: "Check availability, opening hours and terms with the provider. Finnexprience does not take bookings or payments." },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!["fi", "es", "en"].includes(raw)) return {};
  const place = places[slug];
  if (!place) return {};
  const locale = raw as Locale;
  return buildLocalizedMetadata({ locale, title: place.name[locale], description: place.description[locale], path: "places/" + slug, image: place.image });
}

export default async function SaloPlacePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!["fi", "es", "en"].includes(raw)) notFound();
  const place = places[slug];
  if (!place) notFound();
  const locale = raw as Locale;
  const l = labels[locale];
  const cards = [
    { title: l.stay, text: place.stay[locale], icon: BedDouble, image: photoLibrary.mathildedalVillage },
    { title: l.activities, text: place.activities[locale], icon: Compass, image: place.image },
    { title: l.food, text: place.food[locale], icon: Coffee, image: photoLibrary.mathildedalHarbour },
    { title: l.experiences, text: place.experiences[locale], icon: Flame, image: photoLibrary.sauna },
  ];
  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[65svh] overflow-hidden bg-brand-950 text-white">
        <Image src={place.image} alt={place.name[locale]} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="container-narrow relative z-10 flex min-h-[65svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{place.area[locale]}</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[.96] sm:text-7xl lg:text-8xl">{place.name[locale]}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-2xl">{place.description[locale]}</p>
          </div>
        </div>
      </section>
      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map(({ title, text, icon: Icon, image }) => (
            <article key={title} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
              <div className="relative aspect-[16/9]"><Image src={image} alt={title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" /></div>
              <div className="p-6 sm:p-8"><Icon className="h-7 w-7 text-brand-700" /><h2 className="mt-4 font-display text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card"><Image src={place.image} alt={l.map} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{l.map}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{place.name[locale]}</h2><p className="mt-4 leading-7 text-slate-600">{place.area[locale]}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-bold text-brand-950"><MapPin className="h-4 w-4" />{locale === "fi" ? "Avaa Google Mapsissa" : locale === "es" ? "Abrir en Google Maps" : "Open in Google Maps"}<ArrowUpRight className="h-4 w-4" /></a>
            <div className="mt-5 flex flex-wrap gap-3"><a href={place.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white">{l.official}<ArrowUpRight className="h-4 w-4" /></a>{place.secondaryUrl && place.secondaryName ? <a href={place.secondaryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-bold text-brand-950">{place.secondaryName[locale]}<ArrowUpRight className="h-4 w-4" /></a> : null}</div>
          </div>
        </div>
      </section>
      <section className="bg-brand-950 py-14 text-white"><div className="container-narrow flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-3xl"><h2 className="font-display text-3xl font-bold">{l.direct}</h2><p className="mt-3 leading-7 text-white/75">{l.directText}</p></div><Link href={`/${locale}/salo`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{l.back}<ArrowRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
