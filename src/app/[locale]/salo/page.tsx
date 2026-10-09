import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Camera, Compass, Flame, Map, Mountain, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import SaloRegionMap from "@/components/salo/SaloRegionMap";

const copy = {
  fi: {
    title: "Salon seudun matkailu",
    desc: "Salo-opas: Mathildedal, Teijo, Särkisalo, Perniö, Wiurila, keskusta, kulttuuri, reitit, majoitus, ruoka ja elämykset.",
    eyebrow: "SALON SEUTU · LOUNAIS-SUOMI",
    intro: "Salo on poikkeuksellisen laaja matkailualue: samaan kokonaisuuteen kuuluvat kaupunkikeskus, historialliset kylät, Teijon kansallispuisto, Mathildedal, merellinen Särkisalo ja Perniön maaseutumaisemat.",
    market: "Salon tori ja keskusta",
    marketText: "Kesäisin keskusta elää torin ympärillä. Tori toimii paikallisena olohuoneena, ja torstain iltamarkkinoilla yhdistyvät suomalainen kesämusiikki, myyntikojut, lettukahvilat, kirpputorit ja paikallinen elämä.",
    culture: "Kulttuuri ja historia",
    cultureText: "Salo tarjoaa museoita, taidetta, historiallisia miljöitä ja kulttuuritapahtumia ympäri vuoden. Veturitalli, Wiurilan kartano, Perniön museo ja Mathildedalin ruukkimuseo muodostavat jo yksin kiinnostavan kulttuuriverkoston.",
    nature: "Teijo ja luonto",
    natureText: "Teijon kansallispuisto yhdistää meri-, järvi- ja suomaisemia. Alueella voi patikoida, meloa, SUP-lautailla, pyöräillä ja kalastaa sekä yhdistää luontopäivän kylä- tai saunailtaan.",
    sea: "Särkisalo ja meri",
    seaText: "Särkisalossa merellinen elämä näkyy satamissa, kesäkahviloissa, saaristomökeissä, melonnassa, kalastuksessa ja rantasaunoissa. Förby on yksi alueen luontevimmista meren äärelle pysähtymisen paikoista.",
    countryside: "Perniö, Halikko ja Wiurila",
    countrysideText: "Salon maaseutu antaa matkalle toisen rytmin: kartanot, kylät, paikallishistoria, museot, lähiruoka ja pienet yritykset sopivat hyvin auto-, pyörä- ja päiväretkiin.",
    routes: "Reitit – tee Salosta oma matkasi",
    routesText: "Saloa voi rakentaa päiväretkestä usean yön lomaan. Valmiita reittien ideoita ovat rannikkoreitti, kulttuurireitti, ruukkikylien pyöräilyreitti, lähiruokakierros, melottava saaristokierros ja Salo–Lehmijärvi–Teijo-retkeilyreitti.",
    providers: "Salon paikalliset palveluntarjoajat",
    providersText: "Alta löydät majoituksia, elämyksiä, ruokapaikkoja ja luontokohteita. Lopullinen varaus ja sopimus tehdään aina suoraan palveluntarjoajan kanssa.",
    browse: "Tutustu Salon seudun paikkoihin",
    coastal: "Rannikon Suomi",
    coastalText: "Salo toimii myös porttina rannikon viiteen pääkohteeseen.",
  },
  es: {
    title: "Turismo en la región de Salo",
    desc: "Guía de Salo: Mathildedal, Teijo, Särkisalo, Perniö, Wiurila, centro, cultura, rutas, alojamiento, gastronomía y experiencias.",
    eyebrow: "REGIÓN DE SALO · SUROESTE DE FINLANDIA",
    intro: "Salo reúne una sorprendente variedad de paisajes y estilos de viaje: centro urbano, pueblos históricos, Parque Nacional de Teijo, Mathildedal, Särkisalo y el campo de Perniö.",
    market: "El mercado y el centro de Salo",
    marketText: "En verano el centro cobra vida alrededor del mercado. Es un auténtico punto de encuentro local, y los mercados nocturnos de los jueves combinan música, puestos, cafés de crepes, mercadillos y ambiente finlandés.",
    culture: "Cultura e historia",
    cultureText: "Salo ofrece museos, arte, patrimonio y eventos durante todo el año. El Museo de Arte Veturitalli, Wiurila Manor, el Museo de Perniö y el museo de la ferrería de Mathildedal forman una red cultural muy completa.",
    nature: "Teijo y naturaleza",
    natureText: "El Parque Nacional de Teijo reúne mar, lagos, bosques y zonas pantanosas. Puedes caminar, hacer kayak o SUP, montar en bicicleta y pescar, y combinar la naturaleza con un pueblo o una sauna.",
    sea: "Särkisalo y el mar",
    seaText: "En Särkisalo, la vida marítima se descubre en puertos, cafés de verano, cabañas, kayak, pesca y saunas junto al agua. Förby es uno de los lugares más naturales para detenerse junto al mar.",
    countryside: "Perniö, Halikko y Wiurila",
    countrysideText: "El paisaje rural de Salo ofrece otro ritmo: mansiones, pueblos, historia local, museos, productos locales y pequeñas empresas encajan perfectamente en excursiones en coche o bicicleta.",
    routes: "Rutas – crea tu propio Salo",
    routesText: "Puedes convertir Salo en una excursión de un día o en unas vacaciones de varios días. Hay rutas de costa, cultura, pueblos siderúrgicos en bicicleta, gastronomía local, kayak por el archipiélago y senderismo hacia Teijo.",
    providers: "Proveedores locales de Salo",
    providersText: "Aquí encontrarás alojamiento, experiencias, gastronomía y naturaleza. Las reservas y los contratos se realizan siempre directamente con cada proveedor.",
    browse: "Explorar los lugares de Salo",
    coastal: "Finlandia costera",
    coastalText: "Salo también es una puerta de entrada a los cinco destinos costeros principales.",
  },
  en: {
    title: "Explore the Salo region",
    desc: "Salo guide: Mathildedal, Teijo, Särkisalo, Perniö, Wiurila, the town centre, culture, routes, stays, food and experiences.",
    eyebrow: "SALO REGION · SOUTHWEST FINLAND",
    intro: "Salo brings together an unusually broad range of landscapes and travel styles: a lively town centre, historic villages, Teijo National Park, Mathildedal, maritime Särkisalo and the countryside of Perniö.",
    market: "Salo Market Square & centre",
    marketText: "In summer, the town centre comes alive around the market square. It is a genuine local meeting place, and Thursday evening markets combine Finnish music, market stalls, crepe cafés, flea-market finds and everyday local life.",
    culture: "Culture & history",
    cultureText: "Salo offers museums, art, heritage sites and cultural events year-round. Veturitalli Art Museum, Wiurila Manor, Perniö Museum and the Mathildedal Ironworks Museum form a strong cultural network.",
    nature: "Teijo & nature",
    natureText: "Teijo National Park brings together sea, lakes, forests and wetlands. Walk, kayak, SUP, cycle or fish, then combine the outdoors with a village visit or sauna.",
    sea: "Särkisalo & the sea",
    seaText: "Särkisalo is all about maritime life: guest harbours, summer cafés, archipelago cottages, kayaking, fishing and seaside saunas. Förby is one of the area's most natural places to stop by the water.",
    countryside: "Perniö, Halikko & Wiurila",
    countrysideText: "Salo's countryside offers a different pace: manor houses, villages, local history, museums, local produce and small businesses are made for road trips and cycling days.",
    routes: "Routes – make Salo your own",
    routesText: "Salo works as a day trip or a multi-night stay. Ideas include the Coastal Route, Cultural Route, cycling between ironworks villages, a local-food tour, an archipelago kayaking tour and the hiking route towards Teijo.",
    providers: "Local providers in Salo",
    providersText: "Find accommodation, experiences, food and nature services below. Final bookings and contracts are always handled directly with the provider.",
    browse: "Explore places around Salo",
    coastal: "Coastal Finland",
    coastalText: "Salo is also a gateway to the five main coastal destinations.",
  },
} as const;

const routeIdeas = [
  { icon: Waves, title: { fi: "Rannikkoreitti", es: "Ruta costera", en: "Coastal Route" }, text: { fi: "Keskustasta kohti ruukkikyliä ja meren saaristoa.", es: "Del centro hacia pueblos históricos y el archipiélago.", en: "From the town centre towards the ironworks villages and coast." }, url: "https://visitsalo.fi/reitit/" },
  { icon: Camera, title: { fi: "Kulttuurireitti", es: "Ruta cultural", en: "Cultural Route" }, text: { fi: "Veturitalli, Wiurila, Rikalanmäki, Halikko ja Design Hill.", es: "Veturitalli, Wiurila, Rikalanmäki, Halikko y Design Hill.", en: "Veturitalli, Wiurila, Rikalanmäki, Halikko and Design Hill." }, url: "https://kohteet.visitsalo.fi/en/koe-salon-kulttuurin-helmia-kulttuurireitti/" },
  { icon: Mountain, title: { fi: "Salo–Lehmijärvi–Teijo", es: "Salo–Lehmijärvi–Teijo", en: "Salo–Lehmijärvi–Teijo" }, text: { fi: "Retkeilyreitti keskustasta kansallispuiston maisemiin.", es: "Ruta de senderismo desde el centro hacia el parque nacional.", en: "A hiking route from the centre towards the national park." }, url: "https://visitsalo.fi/teijon-kansallispuisto/" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const c = copy[locale] || copy.en;
  return buildLocalizedMetadata({ locale, title: c.title, description: c.desc, path: "salo", image: photoLibrary.mathildedalHarbour });
}

export default async function SaloPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = copy[locale] || copy.en;

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt={locale === "fi" ? "Mathildedalin satama Salon seudulla" : locale === "es" ? "Puerto de Mathildedal en la región de Salo" : "Mathildedal harbour in the Salo region"} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/15" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#salo-places" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{c.browse}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={`/${locale}/coastal-finland#sarkisalo`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white">{c.coastal}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="salo-categories-title" className="bg-white py-14 sm:py-20">
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Suunnittele oma vierailusi" : locale === "es" ? "Diseña tu visita" : "Plan your visit"}</p>
          <h2 id="salo-categories-title" className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Tutustu Salon seutuun omalla tavallasi" : locale === "es" ? "Descubre la región de Salo a tu manera" : "Explore the Salo region your way"}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{locale === "fi" ? "Aloita Salon kaupungista ja jatka majoituksiin, ruokapaikkoihin, aktiviteetteihin ja saariston kohteisiin. Kohdekorteista pääset ensin oman aiheen oppaaseen ja sieltä yksittäisten palveluntarjoajien tietoihin." : locale === "es" ? "Empieza por la ciudad de Salo y continúa hacia alojamientos, restaurantes, actividades y lugares del archipiélago. Cada tarjeta abre una guía temática con enlaces a proveedores individuales." : "Start with the town of Salo, then explore accommodation, food, activities and archipelago services. Each card opens its own topic guide with links to individual providers."}</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { slug: "salo", title: { fi: "Salo – kaupunkiin tutustuminen", es: "Salo – descubre la ciudad", en: "Salo – explore the town" }, text: { fi: "Tori, kaupunkikulttuuri, museot ja paikalliset palvelut.", es: "Mercado, cultura urbana, museos y servicios locales.", en: "Market square, town culture, museums and local services." }, image: photoLibrary.saloVeturitalli, alt: { fi: "Veturitalli Salossa", es: "Veturitalli en Salo", en: "Veturitalli in Salo" }, href: `/${locale}/places/salo-center` },
              { slug: "majoitus", title: { fi: "Majoitus", es: "Alojamiento", en: "Accommodation" }, text: { fi: "Hotellit, mökit, huvilat ja maaseutumajoitus.", es: "Hoteles, cabañas, villas y alojamientos rurales.", en: "Hotels, cottages, villas and rural stays." }, image: photoLibrary.mathildedalVillage, alt: { fi: "Majoitus Salon seudulla", es: "Alojamiento en la región de Salo", en: "Accommodation in the Salo region" }, href: `/${locale}/salo/majoitus` },
              { slug: "ruoka", title: { fi: "Ruoka ja ravintolat", es: "Gastronomía y restaurantes", en: "Food and restaurants" }, text: { fi: "Ravintolat, kahvilat ja paikalliset maut.", es: "Restaurantes, cafés y sabores locales.", en: "Restaurants, cafés and local flavours." }, image: photoLibrary.mathildedalHarbour, alt: { fi: "Paikallinen ruokapaikka Salon seudulla", es: "Gastronomía local en la región de Salo", en: "Local food in the Salo region" }, href: `/${locale}/salo/ruoka` },
              { slug: "aktiviteetit", title: { fi: "Aktiviteetit", es: "Actividades", en: "Activities" }, text: { fi: "Luonto, retket, ulkoilu ja veneily.", es: "Naturaleza, excursiones, aire libre y navegación.", en: "Nature, excursions, outdoor activities and boating." }, image: photoLibrary.teijoNationalPark, alt: { fi: "Teijon kansallispuiston luontoa", es: "Naturaleza del Parque Nacional de Teijo", en: "Nature in Teijo National Park" }, href: `/${locale}/salo/aktiviteetit` },
              { slug: "elamykset", title: { fi: "Tekemistä ja elämyksiä", es: "Qué hacer y experiencias", en: "Things to do and experiences" }, text: { fi: "Opastukset, kulttuuri ja paikalliset kokemukset.", es: "Visitas guiadas, cultura y experiencias locales.", en: "Guided tours, culture and local experiences." }, image: photoLibrary.teijoNationalPark, alt: { fi: "Aktiviteetteja Teijon alueella", es: "Actividades en la zona de Teijo", en: "Activities in the Teijo area" }, href: `/${locale}/salo/elamykset` },
              { slug: "saaristo", title: { fi: "Saaristo ja merenranta", es: "Archipiélago y costa", en: "Archipelago and coast" }, text: { fi: "Särkisalo, satamat ja meren äärellä toimivat palvelut.", es: "Särkisalo, puertos y servicios junto al mar.", en: "Särkisalo, harbours and services by the sea." }, image: photoLibrary.sarkisalo, alt: { fi: "Särkisalon saaristomaisema", es: "Paisaje del archipiélago de Särkisalo", en: "Särkisalo archipelago landscape" }, href: `/${locale}/salo/saaristo` },
              { slug: "kylat", title: { fi: "Kylät ja maaseutu", es: "Pueblos y campo", en: "Villages and countryside" }, text: { fi: "Perniö, Halikko, Teijo, Mathildedal ja rauhalliset maaseutukohteet.", es: "Perniö, Halikko, Teijo, Mathildedal y rincones rurales tranquilos.", en: "Perniö, Halikko, Teijo, Mathildedal and peaceful rural places." }, image: photoLibrary.mathildedalVillage, alt: { fi: "Mathildedalin ruukkikylä", es: "Pueblo histórico de Mathildedal", en: "Mathildedal ironworks village" }, href: `/${locale}/salo/kylat` },
              { slug: "events", title: { fi: "Tapahtumat ja sesongit", es: "Eventos y temporadas", en: "Events and seasons" }, text: { fi: "Ajankohtaiset tapahtumat vain järjestäjien vahvistamilla tiedoilla.", es: "Eventos actuales solo con información confirmada por los organizadores.", en: "Current events shown only when confirmed by organisers." }, image: null, alt: { fi: "Tapahtumakuva lisätään vahvistuksen jälkeen", es: "Imagen del evento pendiente de confirmación", en: "Event image pending confirmation" }, href: `/${locale}/events` },
            ].map((item) => (
              <Link key={item.slug} href={item.href} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
                  {item.image ? <><Image src={item.image} alt={item.alt[locale]} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent" /></> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-50 px-6 text-center text-brand-700"><CalendarDays className="h-8 w-8" /><p className="mt-3 text-xs font-semibold">{item.alt[locale]}</p></div>}
                </div>
                <div className="p-6"><h3 className="font-display text-2xl font-bold text-brand-950">{item.title[locale]}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.text[locale]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Tutustu kategoriaan" : locale === "es" ? "Explorar categoría" : "Explore category"}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="salo-map-title" className="bg-white py-14 sm:py-20">
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Sijainnit ja alueet" : locale === "es" ? "Ubicación y zonas" : "Locations and areas"}</p>
          <h2 id="salo-map-title" className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Salon seutu kartalla" : locale === "es" ? "La región de Salo en el mapa" : "The Salo region on the map"}</h2>
          <p className="mt-4 mb-8 max-w-3xl text-lg leading-8 text-slate-600">{locale === "fi" ? "Tutustu Salon keskustan reittien lähtöpisteeseen, Mathildedalin ruukkikylään, Teijon luontokeskukseen ja Särkisalon saaristoon. Merkit näyttävät alueen maamerkkejä – eivät palveluntarjoajien tarkkoja osoitteita." : locale === "es" ? "Explora el punto de salida de rutas en Salo, el pueblo histórico de Mathildedal, el centro de naturaleza de Teijo y el archipiélago de Särkisalo. Los marcadores muestran puntos de referencia regionales, no las direcciones exactas de los proveedores." : "Explore a trail start in Salo, Mathildedal ironworks village, Teijo Nature Centre and the Särkisalo archipelago. Pins show regional landmarks, not exact provider addresses."}</p>
          <SaloRegionMap locale={locale} />
        </div>
      </section>

      <section id="salo-places" className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Tutustu Salon seutuun" : locale === "es" ? "Explora la región de Salo" : "Explore the Salo region"}</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Yksi alue, monta erilaista paikkaa" : locale === "es" ? "Una región, muchos lugares diferentes" : "One region, many different places"}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{locale === "fi" ? "Aloita Salon alueoppaasta ja valitse sen jälkeen oma kylä, saaristo tai nähtävyys. Jokainen linkki vie kyseistä paikkaa käsittelevälle sivulle tai sen viralliseen matkailuoppaaseen." : locale === "es" ? "Empieza con la guía regional de Salo y después elige un pueblo, una zona costera o un lugar de interés. Cada enlace conduce a una guía específica o a la web turística oficial del lugar." : "Start with the Salo regional guide, then choose a village, coastal area or attraction. Each link leads to a dedicated guide or the place's official tourism website."}</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Mathildedal", place: "Mathildedal · ruukkikylä", image: photoLibrary.mathildedalHarbour, text: locale === "fi" ? "Ruukkikylä, majoitus, kahvilat, ravintolat, meri ja paikalliset elämykset." : locale === "es" ? "Pueblo histórico, alojamiento, cafés, restaurantes, mar y experiencias locales." : "Historic village, accommodation, cafés, restaurants, sea and local experiences.", href: `/${locale}/mathildedal`, internal: true },
              { name: "Teijo & kansallispuisto", place: "Teijo · luonto", image: photoLibrary.teijoNationalPark, text: locale === "fi" ? "Retkeilyreitit, järvet, metsät, melonta ja luontokeskuksen palvelut." : locale === "es" ? "Senderos, lagos, bosques, kayak y servicios del centro de naturaleza." : "Trails, lakes, forests, kayaking and nature-centre services.", href: `/${locale}/places/teijo`, internal: true },
              { name: "Särkisalo & meri", place: "Särkisalo · saaristo", image: photoLibrary.sarkisalo, text: locale === "fi" ? "Merenrantamökit, satamat, kalastus, veneily ja saariston rauha." : locale === "es" ? "Cabañas junto al mar, puertos, pesca, navegación y tranquilidad insular." : "Seaside cottages, harbours, fishing, boating and island calm.", href: `/${locale}/places/sarkisalo`, internal: true },
              { name: "Perniö", place: "Perniö · maaseutu", image: null, text: locale === "fi" ? "Maaseutumaisemat, historia, lähiruoka ja pienet paikalliset yritykset." : locale === "es" ? "Paisajes rurales, historia, productos locales y pequeños negocios." : "Rural landscapes, history, local food and small businesses.", href: `/${locale}/places/pernio`, internal: true },
              { name: "Halikko & Wiurila", place: "Halikko · kartanot ja kulttuuri", image: null, text: locale === "fi" ? "Wiurilan kartano, näyttelyt, kulttuurihistoria, ruoka ja elämykset." : locale === "es" ? "La mansión Wiurila, exposiciones, patrimonio, gastronomía y experiencias." : "Wiurila Manor, exhibitions, heritage, food and experiences.", href: `/${locale}/places/halikko-wiurila`, internal: true },
              { name: "Salon keskusta", place: "Salo · tori ja kaupunkielämä", image: photoLibrary.saloVeturitalli, text: locale === "fi" ? "Tori, iltatorit, museot, kahvilat, ravintolat ja kaupungin palvelut." : locale === "es" ? "Mercado, eventos, museos, cafés, restaurantes y servicios urbanos." : "Market square, evening markets, museums, cafés, restaurants and town services.", href: `/${locale}/places/salo-center`, internal: true },
              { name: "Teijo & Kirjakkala", place: "Ruukkikylät · historia ja luonto", image: photoLibrary.teijoNationalPark, text: locale === "fi" ? "Ruukkihistoriaa, vanhoja rakennuksia, taidetta, retkeilyä ja paikallisia palveluja." : locale === "es" ? "Historia industrial, edificios antiguos, arte, senderismo y servicios locales." : "Ironworks history, old buildings, art, hiking and local services.", href: `/${locale}/places/teijo-kirjakkala`, internal: true },
              { name: "Järvi-Salo", place: "Järvi-Salo · maaseutu ja järvet", image: null, text: locale === "fi" ? "Järvimaisemia, maaseutukyliä, retkeilyä ja rauhallisia luontokohteita." : locale === "es" ? "Lagos, pueblos rurales, senderismo y naturaleza tranquila." : "Lakes, rural villages, hiking and peaceful nature spots.", href: `/${locale}/places/jarvi-salo`, internal: true },
              { name: "Kemiönsaari & Rosala", place: "Lähialue · saaristo", image: photoLibrary.rosalaVikingCentre, text: locale === "fi" ? "Rosalan Viikinkikeskus, Kasnäs, Bengtskär ja saaristomajoitus." : locale === "es" ? "Centro Vikingo de Rosala, Kasnäs, Bengtskär y alojamiento insular." : "Rosala Viking Centre, Kasnäs, Bengtskär and island stays.", href: `/${locale}/kimitoon`, internal: true },
            ].map((place) => (
              <article key={place.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
                <div className={`relative aspect-[16/9] ${place.image ? "overflow-hidden bg-brand-100" : "flex items-center justify-center bg-brand-50"}`}>
                  {place.image ? <><Image src={place.image} alt={place.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" /></> : <div className="px-6 text-center text-brand-700"><Map className="mx-auto h-8 w-8" /><p className="mt-2 text-xs font-semibold">{locale === "fi" ? "Paikallinen kuva lisätään vahvistuksen jälkeen" : locale === "es" ? "Se añadirá una imagen local tras verificarla" : "A local image will be added after verification"}</p></div>}
                  <div className={`absolute bottom-0 left-0 p-5 ${place.image ? "text-white" : "text-brand-950"}`}><p className="text-xs font-bold uppercase tracking-[.15em] opacity-80">{place.place}</p><h3 className="mt-1 font-display text-2xl font-bold">{place.name}</h3></div>
                </div>
                <div className="p-5"><p className="text-sm leading-6 text-slate-600">{place.text}</p>
                  {place.internal ? <Link href={place.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa kohdeopas" : locale === "es" ? "Abrir guía" : "Open destination guide"}<ArrowRight className="h-4 w-4" /></Link> : <a href={place.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa VisitSalo-opas" : locale === "es" ? "Abrir guía VisitSalo" : "Open VisitSalo guide"}<ArrowUpRight className="h-4 w-4" /></a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Building2, title: c.market, text: c.marketText },
            { icon: Camera, title: c.culture, text: c.cultureText },
            { icon: Mountain, title: c.nature, text: c.natureText },
            { icon: Waves, title: c.sea, text: c.seaText },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-brand-700" />
              <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{c.countryside}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{c.countryside}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{c.countrysideText}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="https://visitsalo.fi/en/culture-and-attractions/" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white p-5 shadow-soft"><Compass className="h-6 w-6 text-brand-700" /><h3 className="mt-4 font-semibold text-brand-950">Wiurila & culture</h3><p className="mt-2 text-sm leading-6 text-slate-600">{locale === "fi" ? "Kartano, museot ja kulttuurireitti." : locale === "es" ? "Mansión, museos y ruta cultural." : "Manor, museums and cultural route."}</p><ArrowUpRight className="mt-4 h-4 w-4 text-brand-700" /></Link>
            <Link href="https://visitsalo.fi/reitit/" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-white p-5 shadow-soft"><Map className="h-6 w-6 text-brand-700" /><h3 className="mt-4 font-semibold text-brand-950">{c.routes}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{c.routesText}</p><ArrowUpRight className="mt-4 h-4 w-4 text-brand-700" /></Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{c.routes}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{c.routes}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{c.routesText}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {routeIdeas.map((route) => {
            const Icon = route.icon;
            return <a key={route.title.en} href={route.url} target="_blank" rel="noopener noreferrer" className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"><Icon className="h-7 w-7 text-brand-700" /><h3 className="mt-5 font-display text-2xl font-bold text-brand-950">{route.title[locale]}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{route.text[locale]}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">{locale === "fi" ? "Katso reitti" : locale === "es" ? "Ver la ruta" : "View route"}<ArrowUpRight className="h-3.5 w-3.5" /></span></a>;
          })}
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{c.providers}</p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{c.providers}</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">{c.providersText}</p>
          </div>
        </div>
      </section>

      <SaloDirectory locale={locale} />

      <section className="bg-brand-50 py-16 text-center">
        <div className="container-narrow">
          <Flame className="mx-auto h-7 w-7 text-amber-500" />
          <h2 className="mt-4 font-display text-4xl font-bold text-brand-950">{locale === "fi" ? "Salo on enemmän kuin yksi päivä" : locale === "es" ? "Salo merece más de un día" : "Salo deserves more than a day trip"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">{locale === "fi" ? "Yhdistä kaupunki, ruukkikylä, kansallispuisto ja meri samaan omaehtoiseen lomaan – ja varaa mahdolliset palvelut suoraan paikalliselta toimijalta." : locale === "es" ? "Combina ciudad, pueblo histórico, parque nacional y mar en un viaje diseñado por ti; cuando quieras reservar, hazlo directamente con cada proveedor." : "Combine town, an ironworks village, a national park and the sea in one self-planned stay; when you book, do so directly with each local provider."}</p>
          <Link href={`/${locale}/coastal-finland`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white">{c.coastal}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
