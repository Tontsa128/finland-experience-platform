import Link from "next/link";
import type { Locale } from "@/types";

type Village = "mathildedal" | "teijo";

type Photo = { src: string; alt: Record<Locale, string>; credit: string; source: string };
type Place = { name: string; type: Record<Locale, string>; description: Record<Locale, string>; url: string; image?: Photo["src"]; imageCredit?: string; imageSource?: string };
type EventItem = { title: string; date: string; description: Record<Locale, string>; url: string; image?: Photo["src"]; imageCredit?: string; imageSource?: string };

const mathildedalPhotos: Photo[] = [
  { src: "https://visitmathildedal.fi/sites/default/files/bannerikuvat/kahvi-ravintolat-banneri.jpg", alt: { fi: "Mathildedalin kahvilan valoisa sisätila", en: "Bright café interior in Mathildedal", es: "Interior luminoso de una cafetería en Mathildedal" }, credit: "Visit Mathildedal", source: "https://visitmathildedal.fi/en/restaurants-and-cafes" },
  { src: "https://www.visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/kesakauppa.png?itok=5_Dxm8dm", alt: { fi: "Matildan kesäkaupan käsityö- ja sisustustuotteita", en: "Handmade and homeware products at Matilda Summer Shop", es: "Artesanía y decoración en la tienda de verano Matilda" }, credit: "Visit Mathildedal", source: "https://www.visitmathildedal.fi/fi/ostokset/matildan-kesakauppa" },
  { src: "https://static.wixstatic.com/media/684b51_32aaf4dc53874640808e65b45874f1a3~mv2.png/v1/fill/w_900,h_760,al_c,q_85/Matildan%20Tammipuisto%2C%20Ravintola%20Terho.png", alt: { fi: "Ravintola Terhon vehreä terassi", en: "The leafy terrace at Restaurant Terho", es: "Terraza arbolada del restaurante Terho" }, credit: "Matildan Tammipuisto", source: "https://www.matildantammipuisto.fi/mathildedal" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg", alt: { fi: "Mathildedalin historialliset työväenasunnot", en: "Historic workers' houses in Mathildedal", es: "Antiguas viviendas obreras de Mathildedal" }, credit: "Kotivalo · CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mathildedal_harbour_sunset.jpg", alt: { fi: "Mathildedalin satama ilta-auringossa", en: "Mathildedal harbour in the evening light", es: "Puerto de Mathildedal con luz del atardecer" }, credit: "Kotivalo · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg" },
  { src: "https://visitmathildedal.fi/sites/default/files/galleriakuvat/2026/valimo.jpg", alt: { fi: "Mathildedalin Ruukkitehtaiden Valimo", en: "The Foundry at Mathildedal Ironworks", es: "La antigua fundición de Mathildedal" }, credit: "Visit Mathildedal", source: "https://visitmathildedal.fi/fi/valimo" },
  { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kyl%C3%A4panimo-laatikko-web.jpg", alt: { fi: "Mathildedalin Kyläpanimon paikallistuotteita", en: "Local products from Mathildedal Village Brewery", es: "Productos locales de la cervecería de Mathildedal" }, credit: "Visit Salo", source: "https://kylapanimo.fi" },
];

const teijoPhotos: Photo[] = [
  { src: "https://www.erih.net/fileadmin/Mediendatenbank/Photos/2_I_WANT_TO_GO_THERE/Members/Finland/Teijo/Hochofen.jpg", alt: { fi: "Teijon Masuunin historiallinen rakennus ja kahvilaterassi", en: "Historic Teijo blast furnace building and café terrace", es: "Edificio histórico del alto horno de Teijo y terraza de la cafetería" }, credit: "European Route of Industrial Heritage (ERIH)", source: "https://www.erih.net/i-want-to-go-there/site/teijo-ironworks" },
  { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Teijon_kirkko_ja_kartano_vanha.jpg", alt: { fi: "Teijon kirkko ja kartano historiallisessa ruukkikylässä", en: "Teijo Church and Manor in the historic ironworks village", es: "Iglesia y mansión de Teijo en el pueblo siderúrgico histórico" }, credit: "Motopark · Public domain", source: "https://commons.wikimedia.org/wiki/File:Teijon_kirkko_ja_kartano_vanha.jpg" },
  { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg", alt: { fi: "Teijon alueen luonto ja suomaisema", en: "Nature and wetland scenery in the Teijo area", es: "Naturaleza y paisaje de humedal en la zona de Teijo" }, credit: "Vnnen · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Punassuo2.jpg" },
  { src: "https://cdn.johku.com/naturaviva/largefiles/676/webp/teijo-national-park-rental-shop.webp", alt: { fi: "Teijon kansallispuiston retkeilypalvelu", en: "Outdoor services in Teijo National Park", es: "Servicios de actividades al aire libre en el Parque Nacional de Teijo" }, credit: "Natura Viva", source: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop" },
];

const places: Record<Village, Place[]> = {
  mathildedal: [
    { name: "Hotel & Café Mathildedal", type: { fi: "Kahvila ja majoitus", en: "Café and accommodation", es: "Cafetería y alojamiento" }, description: { fi: "Historiallisen ruukkimiljöön kahvila tunnetaan pannukahvista ja itse tehdyistä leivonnaisista. Aukiolo vaihtelee sesongin mukaan.", en: "A café in the historic ironworks setting, known for traditional coffee and homemade pastries. Opening times vary by season.", es: "Cafetería en el entorno histórico de la ferrería, conocida por su café tradicional y repostería casera. El horario varía según la temporada." }, url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/bannerikuvat/kahvi-ravintolat-banneri.jpg", imageCredit: "Visit Mathildedal", imageSource: "https://visitmathildedal.fi/en/restaurants-and-cafes" },
    { name: "Matildan kesäkauppa", type: { fi: "Käsityö- ja sisustuspuoti", en: "Craft and homeware shop", es: "Tienda de artesanía y decoración" }, description: { fi: "Sesonkiluonteinen puoti kokoaa paikallisten tekijöiden käsitöitä, tekstiilejä ja kodin tuotteita. Tarkista aukiolo ennen vierailua.", en: "A seasonal shop bringing together local crafts, textiles and homeware. Check opening times before visiting.", es: "Tienda de temporada con artesanía local, textiles y artículos para el hogar. Consulta el horario antes de ir." }, url: "https://www.visitmathildedal.fi/fi/ostokset/matildan-kesakauppa", image: "https://www.visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/kesakauppa.png?itok=5_Dxm8dm", imageCredit: "Visit Mathildedal", imageSource: "https://www.visitmathildedal.fi/fi/ostokset/matildan-kesakauppa" },
    { name: "Matildankartano / Kyläleipuri", type: { fi: "Leipomo, myymälä ja ravintola", en: "Bakery, shop and restaurant", es: "Panadería, tienda y restaurante" }, description: { fi: "Vanhan ruukinkartanon yhteydessä toimiva leipomo- ja myymäläkokonaisuus. Tarkista tuotevalikoima ja aukiolo suoraan yritykseltä.", en: "A bakery and shop in a historic ironworks manor setting. Check current products and opening times with the business.", es: "Panadería y tienda en una antigua casa solariega de la ferrería. Consulta los productos y horarios directamente con el establecimiento." }, url: "https://www.matildankartano.fi/" },
    { name: "Mathildedalin Kyläpanimo", type: { fi: "Pienpanimo ja paikallistuotteet", en: "Microbrewery and local products", es: "Pequeña cervecería y productos locales" }, description: { fi: "Kylän oma pienpanimo ja paikallisia oluita. Myymälän ja maistelujen saatavuus kannattaa varmistaa etukäteen.", en: "The village's own small brewery and local beers. Check shop and tasting availability in advance.", es: "Pequeña cervecería local y cervezas del pueblo. Conviene confirmar previamente la apertura de la tienda y las degustaciones." }, url: "https://kylapanimo.fi/", image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kyl%C3%A4panimo-laatikko-web.jpg", imageCredit: "Visit Salo", imageSource: "https://kylapanimo.fi/" },
    { name: "Café / Bistro Bruket", type: { fi: "Ravintola", en: "Restaurant", es: "Restaurante" }, description: { fi: "Ruukkitehtaiden alueen ravintola, jossa voi nauttia sesongin mauista. Menu ja palveluajat voivat muuttua kauden mukaan.", en: "A restaurant in the ironworks area serving seasonal flavours. Menus and service times may change by season.", es: "Restaurante en el recinto de la ferrería con sabores de temporada. El menú y el horario pueden variar según la época." }, url: "https://www.bistrobruket.fi/" },
    { name: "Mathildan Marina", type: { fi: "Satama, ravintola ja sauna", en: "Harbour, restaurant and sauna", es: "Puerto, restaurante y sauna" }, description: { fi: "Merellinen kohtaamispaikka, jossa on satamapalveluja, ravintola ja saunoja. Tarkista palvelukohtaiset aukioloajat ja varaukset suoraan Marinalta.", en: "A waterfront stop with marina services, a restaurant and saunas. Check opening times and reservations for each service directly.", es: "Punto de encuentro junto al mar con servicios portuarios, restaurante y saunas. Consulta horarios y reservas directamente." }, url: "https://mathildanmarina.fi/" },
    { name: "Ravintola Terho", type: { fi: "Kyläravintola, pizza ja livemusiikki", en: "Village restaurant, pizza and live music", es: "Restaurante local, pizza y música en directo" }, description: { fi: "Mathildedalin kyläravintola tunnetaan kiviarinauunissa paistetuista pizzoista, oman paahtimon kahvista, paikallisista juomista ja takapihan keikoista. Tarkista ajantasaiset palvelut ja aukiolo suoraan ravintolalta.", en: "Mathildedal’s village restaurant is known for stone-deck oven pizzas, coffee from its own roastery, local drinks and live music in the backyard. Check current services and opening times directly with the restaurant.", es: "El restaurante local de Mathildedal es conocido por sus pizzas al horno de piedra, el café de su propio tostador, las bebidas locales y la música en directo en el patio. Consulta directamente los servicios y horarios actuales." }, url: "https://www.ravintolaterho.fi/", image: "https://static.wixstatic.com/media/5e5929_9e5a4f06a1794080a2b8d42c24e055d2~mv2.jpg/v1/crop/x_0%2Cy_461%2Cw_1365%2Ch_948/fill/w_829%2Ch_542%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/terho-web-85.jpg", imageCredit: "Ravintola Terho", imageSource: "https://www.ravintolaterho.fi/" },
  ],
  teijo: [
    { name: "Teijon Masuuni", type: { fi: "Kahvila, taidegalleria ja käsityöpuodit", en: "Café, art gallery and craft shops", es: "Cafetería, galería de arte y tiendas de artesanía" }, description: { fi: "Historiallinen masuunimiljöö tarjoaa kulttuuria, näyttelyitä, kahvittelua ja tapahtumia. Tarkista ohjelma ja aukiolo järjestäjän sivulta.", en: "A historic blast-furnace setting for culture, exhibitions, café visits and events. Check current programme and opening times with the organiser.", es: "Un antiguo alto horno con cultura, exposiciones, cafetería y eventos. Consulta el programa y horario actual con la organización." }, url: "https://www.teijonmasuuni.fi/", image: teijoPhotos[0].src, imageCredit: teijoPhotos[0].credit, imageSource: teijoPhotos[0].source },
    { name: "Teijo Café & Bakery / Ravintola Teijon Arkki", type: { fi: "Kahvila, leipomomyymälä ja lounas", en: "Café, bakery shop and lunch", es: "Cafetería, panadería y almuerzo" }, description: { fi: "Teijon Arkin yhteydessä toimivasta pienestä leipomomyymälästä on saatavilla leipomotuotteita ja erikoiskahveja; Arkki on myös lounaspaikka. Varmista ajantasaiset palvelut.", en: "The small bakery shop associated with Teijon Arkki offers baked goods and speciality coffee; the venue also serves lunch. Confirm current services.", es: "La pequeña tienda-panadería junto a Teijon Arkki ofrece productos horneados y café especial; el local también sirve almuerzos. Confirma los servicios actuales." }, url: "https://www.teijo.fi/palveluja/kahvilat-ja-ravintolat/" },
    { name: "Meri-Teijo Golf", type: { fi: "18-reikäinen golfkenttä, klubiravintola ja sauna", en: "18-hole golf course, clubhouse restaurant and sauna", es: "Campo de golf de 18 hoyos, restaurante del club y sauna" }, description: { fi: "Meren ja Teijon kansallispuiston reunustama 18-reikäinen kenttä. Klubilla on ravintola, ProShop ja pukuhuoneiden yhteydessä saunatilat. Tarkista peliajat ja palvelujen kausitiedot suoraan kentältä.", en: "An 18-hole course bordered by the sea and Teijo National Park. The clubhouse has a restaurant, Pro Shop and sauna facilities in the changing rooms. Check tee times and seasonal services directly with the club.", es: "Campo de 18 hoyos junto al mar y al Parque Nacional de Teijo. El club cuenta con restaurante, tienda Pro Shop y saunas en los vestuarios. Consulta directamente los horarios de juego y los servicios de temporada." }, url: "https://meriteijogolf.com/", image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golf_aktiviteetit.jpg?itok=lpvm1Tl0", imageCredit: "Visit Mathildedal", imageSource: "https://www.visitmathildedal.fi/en/activities" },
    { name: "Teijon kirkko ja kartanomiljöö", type: { fi: "Kulttuuri ja historia", en: "Culture and history", es: "Cultura e historia" }, description: { fi: "Kylän historiallisia maamerkkejä ovat kirkko ja Teijon kartanon ympäristö. Tarkista kirkon vierailuajat ja mahdolliset tapahtumat etukäteen.", en: "The church and Teijo Manor surroundings are historic landmarks. Check visitor access and any events in advance.", es: "La iglesia y el entorno de la mansión de Teijo son lugares históricos. Comprueba con antelación los horarios de visita y eventos." }, url: "https://www.teijo.fi/tervetuloakyliin/teijo/", image: teijoPhotos[1].src, imageCredit: teijoPhotos[1].credit, imageSource: teijoPhotos[1].source },
  ],
};

const events: Record<Village, EventItem[]> = {
  mathildedal: [
    { title: "Mathildedalin Joulumarkkinat", date: "21.11. ja 28.11.2026", description: { fi: "Ruukkitehtaiden joulumarkkinoilla korostuvat paikalliset herkut, käsityöt ja historiallisen kylän joulutunnelma. Tarkista tapahtuman järjestäjän sivulta mahdolliset muutokset.", en: "Christmas markets at the ironworks feature local treats, crafts and the historic village atmosphere. Check the organiser's page for updates.", es: "Los mercados navideños reúnen productos locales, artesanía y el ambiente histórico del pueblo. Consulta posibles cambios en la página oficial." }, url: "https://mathildedal.fi/2026/04/27/mathildedalin-joulumarkkinat-21-11-28-11-2026/", image: "https://mathildedal.fi/wp-content/uploads/2026/04/38SV_VPL6961-pieni-scaled-e1777271867275.jpg", imageCredit: "Hotel Mathildedal", imageSource: "https://mathildedal.fi/2026/04/27/mathildedalin-joulumarkkinat-21-11-28-11-2026/" },
    { title: "Jouluun Hiljentyminen", date: "23.12.2026", description: { fi: "Perinteinen aatonaaton tapahtuma Mathildedalin Ruukkitehtailla.", en: "A long-running Christmas-eve-eve gathering at Mathildedal Ironworks.", es: "Encuentro tradicional de víspera de Nochebuena en la antigua ferrería de Mathildedal." }, url: "https://mathildedal.fi/tapahtumat/" },
    { title: "Tapahtumakalenteri", date: "Päivittyvä ohjelma", description: { fi: "Kylällä järjestetään vuoden mittaan markkinoita, kulttuuriohjelmaa, musiikkia ja sesonkitapahtumia. Tarkista aina päivämäärä järjestäjältä.", en: "Markets, cultural events, music and seasonal activities take place throughout the year. Always confirm dates with the organiser.", es: "Durante el año hay mercados, cultura, música y actividades de temporada. Confirma siempre las fechas con la organización." }, url: "https://visitmathildedal.fi/fi/tapahtumat" },
  ],
  teijo: [
    { title: "Teijon Ruukkikylien Marraskalenteri", date: "1.–30.11.2026", description: { fi: "Kyläyhteisöjen maksuttomia tapahtumia eri teemoista, kuten luonnosta, musiikista, historiasta, liikunnasta ja kädentaidoista. Osaan tarvitaan ennakkoilmoittautuminen.", en: "Free community events on nature, music, history, exercise and crafts. Some activities require advance registration.", es: "Eventos comunitarios gratuitos sobre naturaleza, música, historia, actividad física y artesanía. Algunas actividades requieren inscripción previa." }, url: "https://www.teijo.fi/taky-marraskalenteri-2026/" },
    { title: "Teijon Masuunin joulumarkkinat", date: "28.–29.11.2026", description: { fi: "Teijon Masuunin joulumarkkinat ovat Visit Salon tapahtumatiedoissa ilmoitettu tuleva tapahtuma. Tarkista ohjelma ja aukiolo järjestäjältä.", en: "Teijo Masuuni's Christmas market is listed as an upcoming event in Salo's tourism calendar. Confirm the programme with the organiser.", es: "El mercado navideño de Teijo Masuuni figura como próximo evento en el calendario turístico de Salo. Confirma el programa con la organización." }, url: "https://www.teijonmasuuni.fi/tapahtumat/" },
    { title: "Kylän ajankohtaiset tapahtumat", date: "Päivittyvä ohjelma", description: { fi: "Kyläyhdistys julkaisee tapahtumia, markkinoita, luentoja ja yhteisöllistä ohjelmaa. Tarkista ajantasaiset tiedot ennen matkaa.", en: "The village association publishes events, markets, talks and community activities. Check the latest details before travelling.", es: "La asociación del pueblo publica eventos, mercados, charlas y actividades comunitarias. Consulta la información actual antes del viaje." }, url: "https://www.teijo.fi/" },
  ],
};

const copy = {
  fi: { title: "Tutustu ruukkikylään", intro: "Historiaa, paikallisia makuja, pieniä puoteja ja tapahtumia. Tarkista palveluiden aukiolo ja tapahtumien tiedot aina järjestäjiltä.", gallery: "Kylän kuvagalleria", places: "Kahvilat, ravintolat ja paikalliset palvelut", events: "Tapahtumat ja kylän ohjelma", source: "Kuva ja lähdetiedot", visit: "Avaa virallinen sivu", eventDate: "Ajankohta", otherVillage: "Tutustu myös Teijon ruukkikylään" },
  en: { title: "Explore the ironworks village", intro: "History, local flavours, independent shops and community events. Always confirm opening times and event details with the organisers.", gallery: "Village photo gallery", places: "Cafés, restaurants and local places", events: "Events and village programme", source: "Photo and source details", visit: "Visit official website", eventDate: "Date", otherVillage: "Explore Teijo Ironworks Village too" },
  es: { title: "Descubre el pueblo siderúrgico", intro: "Historia, sabores locales, pequeñas tiendas y eventos comunitarios. Confirma siempre los horarios y detalles con los organizadores.", gallery: "Galería fotográfica del pueblo", places: "Cafeterías, restaurantes y comercios locales", events: "Eventos y actividades", source: "Datos de la foto y fuente", visit: "Abrir web oficial", eventDate: "Fecha", otherVillage: "Descubre también el pueblo siderúrgico de Teijo" },
} satisfies Record<Locale, Record<string, string>>;

export function RuukkikylaGuide({ village, locale }: { village: Village; locale: Locale }) {
  const t = copy[locale];
  const photos = village === "mathildedal" ? mathildedalPhotos : teijoPhotos;
  const villageName = village === "mathildedal" ? "Mathildedal" : "Teijo";
  return (
    <section className="bg-stone-50 py-14 sm:py-20">
      <div className="container-narrow">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{villageName} · {locale === "fi" ? "paikallinen opas" : locale === "es" ? "guía local" : "local guide"}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-5xl">{t.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">{t.intro}</p>
        </div>

        <div className="mt-10">
          <h3 className="mb-5 font-display text-2xl font-bold text-brand-950">{t.gallery}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <a href={photo.source} target="_blank" rel="noreferrer" aria-label={t.source}>
                  <img src={photo.src} alt={photo.alt[locale]} loading="lazy" className="h-56 w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
                </a>
                <figcaption className="p-3 text-xs leading-5 text-slate-600">
                  <span className="block font-semibold text-slate-800">{photo.alt[locale]}</span>
                  <span>{photo.credit}</span>
                  <a className="ml-1 underline underline-offset-2" href={photo.source} target="_blank" rel="noreferrer">{t.source}</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-display text-2xl font-bold text-brand-950">{t.places}</h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {places[village].map((place) => (
              <article key={place.name} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                {place.image ? <figure><img src={place.image} alt={place.name} loading="lazy" className="h-48 w-full object-cover" />{place.imageCredit && place.imageSource ? <figcaption className="px-5 pt-2 text-xs text-slate-500">{t.source}: {place.imageCredit} · <a href={place.imageSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{t.visit}</a></figcaption> : null}</figure> : null}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{place.type[locale]}</p>
                  <h4 className="mt-2 font-display text-xl font-bold text-brand-950">{place.name}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{place.description[locale]}</p>
                  <a href={place.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-brand-800 underline underline-offset-4">{t.visit} ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-5 font-display text-2xl font-bold text-brand-950">{t.events}</h3>
          <div className="grid gap-5 lg:grid-cols-3">
            {events[village].map((event) => (
              <article key={event.title} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                {event.image ? <figure><img src={event.image} alt={event.title} loading="lazy" className="h-48 w-full object-cover" />{event.imageCredit && event.imageSource ? <figcaption className="px-5 pt-2 text-xs text-slate-500">{t.source}: {event.imageCredit} · <a href={event.imageSource} target="_blank" rel="noreferrer" className="underline underline-offset-2">{t.visit}</a></figcaption> : null}</figure> : null}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">{t.eventDate}: {event.date}</p>
                  <h4 className="mt-2 font-display text-xl font-bold text-brand-950">{event.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{event.description[locale]}</p>
                  <a href={event.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-brand-800 underline underline-offset-4">{t.visit} ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-stone-200 pt-8">
          <Link href={village === "mathildedal" ? "/" + locale + "/destinations/teijon-ruukkikyla" : "/" + locale + "/destinations/salo-mathildedal"} className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-brand-950 transition hover:bg-stone-100">
            {village === "mathildedal" ? t.otherVillage : (locale === "fi" ? "Tutustu myös Mathildedalin ruukkikylään" : locale === "es" ? "Descubre también Mathildedal" : "Explore Mathildedal Ironworks Village too")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
