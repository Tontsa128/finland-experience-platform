import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Coffee, Compass, Palette, ShoppingBag } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const copy = {
  fi: {
    title: "Mathildedal – majoitukset, ruoka ja elämykset ruukkikylässä",
    description: "Suunnittele vierailu Mathildedaliin: löydä majoitukset, ravintolat, kahvilat, luontoelämykset, kulttuuri, ostokset ja tapahtumat.",
    eyebrow: "ETELÄINEN SAARISTOSUOMI · SALO",
    intro: "Vanhan ruukkikylän punamultaiset rakennukset, meren läheisyys, metsäreitit ja pienet paikalliset yritykset kutsuvat viipymään. Kokoa oma matkasi majoituksesta, hyvästä ruoasta, luonnosta ja kylän kulttuurista.",
    plan: "Tutustu palveluihin",
    planner: "Suunnittele vierailusi",
    stays: "Majoitu Mathildedalissa",
    staysText: "Valitse boutique-hotelli, persoonallinen majatalo tai oma mökki. Kun yövyt kylässä, ehdit nauttia myös rauhallisesta aamusta, lähiluonnosta ja illallisesta ilman kiirettä.",
    food: "Paikalliset maut",
    foodText: "Kahvilat, leipomot, ravintolat ja kylän pienet makuelämykset tekevät vierailusta enemmän kuin retken. Tarkista aukiolo ja kausivalikoima suoraan palveluntarjoajalta.",
    nature: "Luonto ja tekeminen",
    natureText: "Lähde Teijon kansallispuiston reiteille, vesille melomaan tai pyöräilemään. Vuokrattavat välineet ja ohjatut elämykset kannattaa varmistaa järjestäjältä etukäteen.",
    culture: "Kulttuuri ja historia",
    cultureText: "Mathildedalin ruukki kertoo teollisesta historiasta, käsityöstä ja yrittäjyydestä. Kylän tapahtumat, kesäteatteri ja pienet putiikit tuovat vanhaan miljööseen elämää.",
    shopping: "Putiikit ja paikallinen design",
    shoppingText: "Tutustu käsitöihin, vaatteisiin, lahjoihin ja paikallisten tekijöiden tuotteisiin. Putiikkien valikoima ja aukioloajat vaihtelevat sesongin mukaan.",
    events: "Tapahtumat ja ryhmät",
    eventsText: "Kylässä järjestetään kauden mukaan konsertteja, esityksiä, hyvinvointitapahtumia ja yhteisiä juhlia. Tarkista ajantasainen ohjelma järjestäjien omilta sivuilta.",
    directory: "Tutustu palveluntarjoajiin",
    directoryText: "Nämä ovat Mathildedalin virallisessa matkailusisällössä ja paikallisten toimijoiden omilla sivuilla esiteltyjä palveluja. Varmista palvelun saatavuus, hinnat ja aukiolo aina suoraan toimijalta.",
    stayCategory: "Majoitus",
    foodCategory: "Ravintolat ja kahvilat",
    activityCategory: "Aktiviteetit",
    cultureCategory: "Kulttuuri ja tapahtumat",
    shopCategory: "Ostokset",
    official: "Visit Mathildedal",
    provider: "Palveluntarjoajan sivuille",
    allEvents: "Tapahtumat ja ajankohtaiset tiedot",
    disclaimer: "Finland Experience on matkailun löytö- ja inspiraatiopalvelu. Varaukset, hinnat, aukioloajat ja palvelusopimukset vahvistetaan suoraan palveluntarjoajalta.",
    links: "Hyödyllisiä virallisia linkkejä",
  },
  en: {
    title: "Mathildedal – places to stay, eat and experience",
    description: "Plan a visit to Mathildedal, Finland: discover accommodation, restaurants, cafés, outdoor activities, culture, shopping and events.",
    eyebrow: "SOUTHERN ARCHIPELAGO FINLAND · SALO",
    intro: "Red-painted historic buildings, the nearby sea, forest trails and independent local businesses make Mathildedal a place to slow down and stay a little longer. Build your trip around a welcoming place to stay, local food, nature and village culture.",
    plan: "Explore local services",
    planner: "Plan your visit",
    stays: "Stay in Mathildedal",
    staysText: "Choose a boutique hotel, a characterful guesthouse or a private cottage. Staying overnight gives you time for a quiet morning, nearby nature and an unhurried dinner.",
    food: "Local food and cafés",
    foodText: "Cafés, bakeries, restaurants and small local food experiences make the visit more than a day trip. Confirm opening hours and seasonal menus with each provider.",
    nature: "Nature and activities",
    natureText: "Explore the trails of Teijo National Park, head out on the water or discover the area by bike. Check equipment rentals and guided experiences directly with the operator.",
    culture: "Culture and heritage",
    cultureText: "Mathildedal Ironworks tells stories of industrial heritage, craftsmanship and entrepreneurship. Seasonal events, summer theatre and independent shops bring the historic village to life.",
    shopping: "Independent shops and design",
    shoppingText: "Discover crafts, clothing, gifts and products by local makers. Shop selections and opening hours may change with the season.",
    events: "Events and groups",
    eventsText: "Depending on the season, the village hosts concerts, performances, wellbeing events and community gatherings. Check current details with the organisers.",
    directory: "Explore local providers",
    directoryText: "The businesses below are listed in official Mathildedal tourism content or on their own websites. Confirm availability, prices and opening hours directly with each provider.",
    stayCategory: "Accommodation",
    foodCategory: "Restaurants and cafés",
    activityCategory: "Activities",
    cultureCategory: "Culture and events",
    shopCategory: "Shopping",
    official: "Visit Mathildedal",
    provider: "Visit provider website",
    allEvents: "Events and current information",
    disclaimer: "Finland Experience is a travel discovery and inspiration platform. Bookings, prices, opening hours and service agreements are confirmed directly with each provider.",
    links: "Official links for planning",
  },
  es: {
    title: "Mathildedal – alojamiento, gastronomía y experiencias",
    description: "Organiza tu visita a Mathildedal, Finlandia: descubre alojamiento, restaurantes, cafeterías, naturaleza, cultura, tiendas y eventos.",
    eyebrow: "ARCHIPIÉLAGO DEL SUR · SALO",
    intro: "Casas históricas de color rojo, el mar cercano, senderos forestales y pequeños negocios locales invitan a bajar el ritmo y quedarse un poco más. Diseña tu viaje combinando alojamiento, gastronomía, naturaleza y cultura del pueblo.",
    plan: "Descubrir servicios",
    planner: "Planifica tu visita",
    stays: "Alojamiento en Mathildedal",
    staysText: "Elige un hotel boutique, una casa de huéspedes con carácter o una cabaña privada. Pasar la noche permite disfrutar de una mañana tranquila, la naturaleza cercana y una cena sin prisas.",
    food: "Sabores locales",
    foodText: "Cafeterías, panaderías y restaurantes convierten la visita en algo más que una excursión. Confirma los horarios y los menús de temporada directamente con cada establecimiento.",
    nature: "Naturaleza y actividades",
    natureText: "Recorre los senderos del Parque Nacional de Teijo, sal al agua o descubre la zona en bicicleta. Consulta directamente con los operadores el alquiler de equipos y las actividades guiadas.",
    culture: "Cultura e historia",
    cultureText: "La antigua ferrería de Mathildedal cuenta historias de industria, artesanía y emprendimiento. Los eventos, el teatro de verano y las pequeñas tiendas dan vida al pueblo histórico.",
    shopping: "Tiendas y diseño local",
    shoppingText: "Descubre artesanía, ropa, regalos y productos de creadores locales. La selección y los horarios pueden variar según la temporada.",
    events: "Eventos y grupos",
    eventsText: "Según la temporada, el pueblo acoge conciertos, espectáculos, actividades de bienestar y celebraciones. Consulta la información actualizada con los organizadores.",
    directory: "Descubre los negocios locales",
    directoryText: "Los negocios que aparecen aquí se mencionan en la información turística oficial de Mathildedal o en sus propias webs. Confirma directamente la disponibilidad, los precios y los horarios.",
    stayCategory: "Alojamiento",
    foodCategory: "Restaurantes y cafeterías",
    activityCategory: "Actividades",
    cultureCategory: "Cultura y eventos",
    shopCategory: "Compras",
    official: "Visit Mathildedal",
    provider: "Visitar la web del proveedor",
    allEvents: "Eventos e información actualizada",
    disclaimer: "Finland Experience es una plataforma para descubrir destinos e inspirarse. Las reservas, los precios, los horarios y los contratos se confirman directamente con cada proveedor.",
    links: "Enlaces oficiales para planificar",
  },
} as const;

const providers = [
  { name: "Hotel Mathildedal", category: "stay", url: "https://mathildedal.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/mathildedal_131-copylowres.jpg?itok=blmtNtmc", credit: "Visit Mathildedal" },
  { name: "Matri House", category: "stay", url: "https://matrihouse.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/matrihouse_mathildedal_web.jpg?itok=hgOKNF9U", credit: "Visit Mathildedal" },
  { name: "Mathildan Marina", category: "stay", url: "https://mathildanmarina.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Huone%205%20talvi%200001.jpg?itok=6ElNUZ3H", credit: "Visit Mathildedal" },
  { name: "Matilda Villas", category: "stay", url: "https://matildavillas.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/Matilda%20Villas_10%20kopio.jpg?itok=fPv5YeEK", credit: "Visit Mathildedal" },
  { name: "Meri-Ruukki Holiday Village", category: "stay", url: "https://meri-ruukki.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/oleskelutila.jpg?itok=hIXkNyVI", credit: "Visit Mathildedal" },
  { name: "Kyläravintola Terho", category: "food", url: "https://www.ravintolaterho.fi/", image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/visit-matilda_9-uai-1032x688.jpg?itok=fNisvaPC", credit: "Visit Mathildedal" },
  { name: "Mathildan Marina Restaurant", category: "food", url: "https://mathildanmarina.fi/ravintola/", image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/terassi%20tyt%C3%B6t%20ruoka%206329.jpg?itok=KjXz8Y_x", credit: "Visit Mathildedal" },
  { name: "Bistro Bruket", category: "food", url: "https://www.bistrobruket.fi/", image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/bruket_tila.jpg?itok=yL7mEIcZ", credit: "Visit Mathildedal" },
  { name: "Café Mathildedal", category: "food", url: "https://mathildedal.fi/", image: "https://www.visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/123sv_vp23710.jpg?itok=urTug-um", credit: "Visit Mathildedal" },
  { name: "Teijo Nature Centre / Natura Viva", category: "activity", url: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop", image: photoLibrary.naturaVivaTeijo, credit: "Natura Viva" },
  { name: "Mathildedalin Keskuspuisto", category: "activity", url: "https://mathildedalinkeskuspuisto.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/adventure_koko-alue.jpeg?itok=0O7HY6ly", credit: "Visit Mathildedal" },
  { name: "Meri-Teijo Bike Park", category: "activity", url: "https://www.meriteijobikepark.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/MTBP2025_Background.jpg?itok=y1W2mJKP", credit: "Visit Mathildedal" },
  { name: "Meri-Teijo Golf", category: "activity", url: "https://meriteijogolf.com/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/golf_aktiviteetit.jpg?itok=lpvm1Tl0", credit: "Visit Mathildedal" },
  { name: "Mathildedal Ironworks", category: "culture", url: "https://mathildedal.fi/en/things-to-do/", image: photoLibrary.mathildedalVillage, credit: "Finland Experience photo library — destination context image" },
  { name: "Mathildedal Summer Theatre / Teatteri ProVinssi", category: "culture", url: "https://www.teatteriprovinssi.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/mathildedal-katsomo.jpg?itok=IDFAL0tW", credit: "Visit Mathildedal — official theatre photo" },
  { name: "Ruukki Creative", category: "shop", url: "https://ruukkicreative.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/tyohuone.jpg?itok=shPoTuHn", credit: "Visit Mathildedal" },
  { name: "Ruukin Kehräämö", category: "shop", url: "https://ruukinkehraamo.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/alpakkaneule10-lowres.jpg?itok=rVgS1bDJ", credit: "Visit Mathildedal — official alpaca knitwear photo" },
  { name: "Aate Clothing", category: "shop", url: "https://aateclothing.fi/", image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/myymalavaaka.jpg?itok=U0j0U7-1", credit: "Visit Mathildedal" },
] as const;


const providerSummaries: Record<string, Record<Locale, string>> = {
  "Hotel Mathildedal": { fi: "Persoonallinen majoitus historiallisessa ruukkimiljöössä.", en: "Characterful accommodation in the historic ironworks setting.", es: "Alojamiento con personalidad en el entorno histórico de la ferrería." },
  "Matri House": { fi: "Paikallinen majoitusvaihtoehto rauhalliseen vierailuun.", en: "A local accommodation option for a relaxed visit.", es: "Una opción de alojamiento local para una visita tranquila." },
  "Mathildan Marina": { fi: "Sataman äärellä sijaitseva majoitus- ja vierailukohde.", en: "A harbour-side place to stay and visit.", es: "Un lugar para alojarse y visitar junto al puerto." },
  "Matilda Villas": { fi: "Omaa tilaa ja itsenäistä lomailua arvostavalle.", en: "Villa accommodation for an independent holiday.", es: "Villas para unas vacaciones independientes." },
  "Meri-Ruukki Holiday Village": { fi: "Loma-asumista kylän ja lähiluonnon tuntumassa.", en: "Holiday accommodation near the village and nature.", es: "Alojamiento vacacional cerca del pueblo y la naturaleza." },
  "Kyläravintola Terho": { fi: "Kyläravintola paikalliseen ruokailuhetkeen.", en: "A village restaurant for a local dining stop.", es: "Un restaurante de pueblo para disfrutar de la gastronomía local." },
  "Mathildan Marina Restaurant": { fi: "Ruokailua Mathildedalin merellisessä satamaympäristössä.", en: "Dining in Mathildedal's maritime harbour setting.", es: "Comida en el entorno marítimo del puerto de Mathildedal." },
  "Bistro Bruket": { fi: "Bistro-vaihtoehto historiallisessa ruukkikylässä.", en: "A bistro option in the historic ironworks village.", es: "Una opción de bistró en el pueblo histórico." },
  "Café Mathildedal": { fi: "Kahvilapysähdys kyläkierroksen lomaan.", en: "A café stop during a village visit.", es: "Una parada para tomar café durante la visita al pueblo." },
  "Teijo Nature Centre / Natura Viva": { fi: "Ulkoiluun ja luontoretkiin liittyviä palveluja Teijon alueella.", en: "Outdoor and nature-experience services in the Teijo area.", es: "Servicios para actividades al aire libre en la zona de Teijo." },
  "Mathildedalin Keskuspuisto": { fi: "Kylän vapaa-ajan alue; tarkista aktiviteetit ja aukiolo omalta sivulta.", en: "A village leisure area; check activities and opening details on its own site.", es: "Una zona de ocio; consulta las actividades y horarios en su web." },
  "Meri-Teijo Bike Park": { fi: "Maastopyöräilyä Teijon alueella; tarkista kausi ja reitit etukäteen.", en: "Mountain biking in the Teijo area; check season and trails in advance.", es: "Ciclismo de montaña en Teijo; consulta la temporada y los recorridos." },
  "Meri-Teijo Golf": { fi: "Golfkohde Teijon alueella; varmista kentän tiedot suoraan toimijalta.", en: "A golf destination in Teijo; confirm course details with the operator.", es: "Un destino de golf en Teijo; confirma los detalles con el operador." },
  "Mathildedal Ironworks": { fi: "Historiallinen ruukkimiljöö ja kylän teollinen perintö.", en: "Historic ironworks surroundings and the village's industrial heritage.", es: "La antigua ferrería y el patrimonio industrial del pueblo." },
  "Mathildedal Summer Theatre / Teatteri ProVinssi": { fi: "Tarkista esitykset ja liput teatterin omilta sivuilta.", en: "Check performances and tickets on the theatre's own website.", es: "Consulta las funciones y entradas en la web del teatro." },
  "Ruukki Creative": { fi: "Luovia paikallisia toimijoita ja tuotteita.", en: "Creative local makers and products.", es: "Creadores y productos creativos locales." },
  "Ruukin Kehräämö": { fi: "Paikallinen ostoskohde käsitöille ja designlöydöille.", en: "A local shopping stop for crafts and design finds.", es: "Una tienda local para encontrar artesanía y diseño." },
  "Aate Clothing": { fi: "Paikallinen vaateputiikki ja sen ajankohtainen valikoima.", en: "A local clothing boutique and its current collection.", es: "Una boutique de ropa local con su colección actual." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale in copy ? rawLocale : "en") as Locale;
  const c = copy[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "mathildedal", image: photoLibrary.mathildedalHarbour });
}

export default async function MathildedalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale in copy ? rawLocale : "en") as Locale;
  const c = copy[locale];
  const categoryLabel = (category: typeof providers[number]["category"]) => category === "stay" ? c.stayCategory : category === "food" ? c.foodCategory : category === "activity" ? c.activityCategory : category === "culture" ? c.cultureCategory : c.shopCategory;
  const officialLocalePath = locale === "fi" ? "fi" : "en";

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[70vh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt="Mathildedalin satama ja historiallinen ruukkikylä kesäiltana" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[70vh] flex-col justify-end py-16 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#palvelut" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{c.plan}<ArrowDown className="h-4 w-4" /></a>
            <a href={`https://visitmathildedal.fi/${officialLocalePath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-sm font-bold text-white">{c.official}<ArrowUpRight className="h-4 w-4" /></a>
            <a href={`/${locale}/mathildedal/suunnittele`} className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-gold-300/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-gold-300/20">{c.planner}<ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="palvelut" className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: BedDouble, title: c.stays, text: c.staysText, href: `/${locale}/mathildedal/majoitus`, image: "https://cdn-datahub.visitfinland.com/images/67490c50-bc54-11ef-9fcc-d37cec752366.jpeg?s=1280" },
            { icon: Coffee, title: c.food, text: c.foodText, href: `/${locale}/mathildedal/ruoka`, image: "https://visitmathildedal.fi/sites/default/files/styles/390_s_c/public/listauskuvat/metsaravintola.jpg?itok=C0O4bfsi" },
            { icon: Compass, title: c.nature, text: c.natureText, href: `/${locale}/mathildedal/tekemista`, image: photoLibrary.naturaVivaTeijo },
            { icon: Palette, title: c.culture, text: c.cultureText, href: `/${locale}/mathildedal/kulttuuri`, image: photoLibrary.mathildedalVillage },
            { icon: ShoppingBag, title: c.shopping, text: c.shoppingText, href: `/${locale}/mathildedal/ostokset`, image: "https://visitmathildedal.fi/sites/default/files/styles/wide/public/listauskuvat/kesakauppa.png?itok=5_Dxm8dm" },
            { icon: CalendarDays, title: c.events, text: c.eventsText, href: `/${locale}/mathildedal/tapahtumat`, image: photoLibrary.mathildedalVillage },
          ].map(({ icon: Icon, title, text, href, image }) => (
            <a key={title} href={href} className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden bg-brand-50">
                <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <Icon className="h-6 w-6 text-brand-700" />
                <h2 className="mt-3 font-display text-2xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{c.plan}<ArrowRight className="h-4 w-4" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{c.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{c.directory}</h2>
            <p className="mt-4 leading-8 text-slate-600">{c.directoryText}</p>
          </div>
          {(["stay", "food", "activity", "culture", "shop"] as const).map((category) => {
            const items = providers.filter((p) => p.category === category);
            return (
              <div key={category} id={category === "stay" ? "majoitus" : category === "food" ? "ruoka" : category === "activity" ? "tekemista" : category === "culture" ? "kulttuuri" : "ostokset"} className="mt-12 scroll-mt-24">
                <h3 className="mb-5 font-display text-2xl font-bold sm:text-3xl">{categoryLabel(category)}</h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((provider) => (
                    <article key={provider.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-100">
                      <div className="relative h-52 bg-brand-100">
                        {provider.image ? <Image src={provider.image} alt={provider.name + " Mathildedalissa"} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-50 to-stone-100 p-6 text-center"><div><p className="font-semibold text-brand-900">{locale === "fi" ? "Kuvaa ei ole vielä vahvistettu" : locale === "es" ? "Imagen aún no verificada" : "Image not yet verified"}</p><p className="mt-2 text-sm text-slate-600">{locale === "fi" ? "Emme näytä väärää kuvaa." : locale === "es" ? "No mostramos una imagen incorrecta." : "We will not show a mismatched photo."}</p></div></div>}
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{categoryLabel(provider.category)}</p>
                        <h4 className="mt-2 text-xl font-bold">{provider.name}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{providerSummaries[provider.name]?.[locale] ?? c.directoryText}</p>
                        <p className="mt-3 text-xs text-slate-500">{locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la imagen" : "Image source"}: {provider.credit}</p>
                        <a href={provider.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:underline">{c.provider}<ArrowUpRight className="h-4 w-4" /></a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="mt-12 rounded-2xl border border-brand-200 bg-white p-6 text-sm leading-7 text-slate-600">
            {c.disclaimer}
            <p className="mt-3"><a className="font-semibold text-brand-800 underline" href={`https://visitmathildedal.fi/${officialLocalePath}`} target="_blank" rel="noopener noreferrer">{c.official}</a> · <a className="font-semibold text-brand-800 underline" href={`https://visitmathildedal.fi/${officialLocalePath === "fi" ? "fi/tapahtumat" : "en/events"}`} target="_blank" rel="noopener noreferrer">{c.allEvents}</a> · <a className="font-semibold text-brand-800 underline" href={`https://visitmathildedal.fi/${officialLocalePath === "fi" ? "fi/aktiviteetit" : "en/activities"}`} target="_blank" rel="noopener noreferrer">{c.activityCategory}</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
