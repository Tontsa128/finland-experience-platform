import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedSaunas } from "@/components/sauna/FeaturedSaunas";
import { SaunaCarousel } from "@/components/sauna/SaunaCarousel";
import { photoLibrary } from "@/lib/photo-library";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";

type Localized = Record<Locale, string>;
type Slide = { image: string; title: Localized; text: Localized; credit: string; source: string };

const copy: Record<Locale, {
  title: string; description: string; eyebrow: string; heading: string; intro: string;
  listTitle: string; listIntro: string; note: string; explore: string;
}> = {
  fi: {
    title: "Saunat Salossa – yleiset saunat ja vuokrasaunat | FINNEXPRIENCE",
    description: "Löydä Salon ja lähialueen yleiset saunat, saunalliset uimapaikat ja vuokrattavat saunaelämykset. Tarkista tiedot ja varaa suoraan palveluntarjoajalta.",
    eyebrow: "SAUNAT · SALO JA LÄHIALUE",
    heading: "Löylyjä järven rannalla, merellisessä saaristossa ja vanhoissa saunaperinteissä",
    intro: "Tutustu Salon seudun yleisiin saunavuoroihin, yksityisesti varattaviin saunoihin ja saunallisiin uimapaikkoihin. Valitse oma elämyksesi ja jatka suoraan saunan järjestäjän sivuille.",
    listTitle: "Löydä sauna ja tarkista varaustapa",
    listIntro: "Erotamme yleiset saunavuorot, yksityisvuokrauksen ja saunalliset uimapaikat toisistaan. Aukioloajat, hinnat ja käyttötilanne voivat muuttua, joten tarkista ajantasaiset tiedot aina järjestäjältä.",
    note: "FINNEXPRIENCE esittelee kohteet ja ohjaa suoraan palveluntarjoajalle. Varaus, maksu ja sopimus tehdään palveluntarjoajan kanssa.",
    explore: "Tutustu kaikkiin elämyksiin",
  },
  en: {
    title: "Saunas in Salo – Public Saunas and Rentals | FINNEXPRIENCE",
    description: "Discover public saunas, sauna beaches and rentable sauna experiences in Salo, Finland. Check current details and book directly with each provider.",
    eyebrow: "SAUNAS · SALO & SURROUNDINGS",
    heading: "Steam by the lake, beside the sea and in Finland’s living sauna traditions",
    intro: "Explore public sauna sessions, private sauna rentals and swimming spots with saunas around Salo. Choose your experience and continue directly to the organiser’s website.",
    listTitle: "Find a sauna and check how to visit",
    listIntro: "Public sessions, private rentals and swimming beaches with saunas are listed separately. Hours, prices and access may change, so confirm current information with the organiser.",
    note: "FINNEXPRIENCE showcases destinations and directs visitors to providers. Booking, payment and contracts are handled directly by the provider.",
    explore: "Explore all experiences",
  },
  es: {
    title: "Saunas en Salo – públicas y de alquiler | FINNEXPRIENCE",
    description: "Descubre saunas públicas, playas con sauna y experiencias de sauna de alquiler en Salo, Finlandia. Consulta los datos actuales y reserva directamente con cada proveedor.",
    eyebrow: "SAUNAS · SALO Y ALREDEDORES",
    heading: "Vapor junto al lago, junto al mar y entre las tradiciones finlandesas",
    intro: "Explora turnos públicos, saunas privadas de alquiler y zonas de baño con sauna en la región de Salo. Elige tu experiencia y continúa directamente en la web del organizador.",
    listTitle: "Encuentra una sauna y consulta cómo acceder",
    listIntro: "Separamos los turnos públicos, los alquileres privados y las zonas de baño con sauna. Los horarios, precios y condiciones pueden cambiar; confirma siempre los datos con el organizador.",
    note: "FINNEXPRIENCE presenta destinos y dirige a los visitantes a los proveedores. La reserva, el pago y el contrato se gestionan directamente con el proveedor.",
    explore: "Descubrir todas las experiencias",
  },
};

function normalizeLocale(value: string): Locale {
  return locales.includes(value as Locale) ? value as Locale : "en";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "sauna", image: photoLibrary.naturaVivaTeijo });
}

const heroSlides: Slide[] = [
  {
    image: "https://cdn.johku.com/naturaviva/files/761/w374-h237-s/image.matildanj%C3%A4rven%20sauna.jpg",
    title: { fi: "Matildanjärven rantasauna", en: "Matildanjärvi lakeside sauna", es: "Sauna junto al lago Matildanjärvi" },
    text: { fi: "Varaa oma saunavuoro kansallispuiston järvimaisemassa.", en: "Book a private sauna session beside a lake in the national park.", es: "Reserva una sesión privada junto al lago del parque nacional." },
    credit: "Natura Viva",
    source: "https://tervarumpu.fi/fi_FI/naturaviva-sauna-teijon-kansallispuisto",
  },
  {
    image: "https://cdn-datahub.visitfinland.com/images/e6b2c520-c1cf-11ed-8fb6-cd05a147400e.jpeg?s=1280",
    title: { fi: "Mathildan Marinan sauna & lounge", en: "Mathildan Marina sauna & lounge", es: "Sauna y lounge de Mathildan Marina" },
    text: { fi: "Yksityinen saunahetki satamassa – kaksi saunaa, meriterassi ja varattava ulkoporeallas.", en: "A private sauna session by the harbour, with two saunas, a sea-view terrace and a bookable hot tub.", es: "Una sesión privada junto al puerto, con dos saunas, terraza con vistas al mar y jacuzzi reservable." },
    credit: "Mathildan Marina / Visit Finland DataHub",
    source: "https://mathildanmarina.fi/saunat/",
  },
  {
    image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2026/03/Niksaari-2-1024x768.jpg",
    title: { fi: "Niksaaren merellinen sauna", en: "Niksaari sauna by the sea", es: "Sauna marítima de Niksaari" },
    text: { fi: "Saaristomaisema, yleisiä kesävuoroja ja erikseen varattava yksityiskäyttö.", en: "Archipelago scenery, public summer sessions and separate private bookings.", es: "Paisaje de archipiélago, turnos públicos de verano y reservas privadas." },
    credit: "Visit Salo / Salon kaupunki",
    source: "https://kohteet.visitsalo.fi/niksaaren-sauna/",
  },
];

const galleries: { id: string; title: Localized; intro: Localized; items: Slide[] }[] = [
  {
    id: "sauna-history",
    title: { fi: "Saunan pitkä historia", en: "The long history of sauna", es: "La larga historia de la sauna" },
    intro: { fi: "Savupirtistä nykypäivän löylyihin – sauna on ollut suomalaisille peseytymisen, levon ja yhdessäolon paikka sukupolvien ajan.", en: "From smoke saunas to modern bathing, sauna has long been a place for washing, rest and togetherness in Finland.", es: "Desde las saunas de humo hasta las modernas, la sauna ha sido durante generaciones un lugar de higiene, descanso y convivencia." },
    items: [
      { image: photoLibrary.saunaTraditionalSmoke, title: { fi: "Savusaunan hämärä", en: "The glow of a smoke sauna", es: "La penumbra de la sauna de humo" }, text: { fi: "Pehmeä, pitkäkestoinen lämpö ja puun tumma patina luovat ajattoman tunnelman.", en: "Gentle lasting heat and darkened timber create a timeless atmosphere.", es: "El calor suave y la madera oscurecida crean una atmósfera atemporal." }, credit: "JP Korpi-Vartiainen · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg" },
      { image: photoLibrary.saunaRajaportti, title: { fi: "Elävä saunaperinne", en: "A living sauna tradition", es: "Una tradición viva" }, text: { fi: "Sauna ei ole vain rakennus, vaan tapa pysähtyä ja olla yhdessä.", en: "A sauna is more than a building: it is a way to slow down and be together.", es: "La sauna es más que un edificio: es una forma de parar y compartir." }, credit: "Visa580 · CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Rajaportti_sauna1.jpg" },
    ],
  },
  {
    id: "sauna-spa",
    title: { fi: "Saunasta spa-hetkeen", en: "From sauna to spa", es: "De la sauna al spa" },
    intro: { fi: "Yhdistä lempeät löylyt, vilvoittelu, lämmin vesi ja rauhallinen hetki. Salon seudulla esimerkiksi Mathildan Marinan saunatilat ja ulkoporeallas tarjoavat varattavan merellisen saunaelämyksen.", en: "Pair gentle steam with cooling off, warm water and time to unwind. Mathildan Marina, for example, offers bookable sauna facilities and an outdoor hot tub by the harbour.", es: "Combina el vapor suave con agua caliente y un momento de calma. Mathildan Marina ofrece sauna reservable y bañera de hidromasaje exterior junto al puerto." },
    items: [
      { image: photoLibrary.herrankukkaroSauna, title: { fi: "Lämpöä ja lepoa", en: "Warmth and rest", es: "Calor y descanso" }, text: { fi: "Varaa oma hetki ja anna kiireen jäädä ulkopuolelle.", en: "Book a moment for yourself and leave the rush behind.", es: "Reserva un momento para ti y deja atrás las prisas." }, credit: "Herrankukkaro", source: "https://www.herrankukkaro.fi/kokous/saunat-ja-kylvyt" },
      { image: photoLibrary.naturaVivaTeijo, title: { fi: "Luonnon rauha", en: "Calm in nature", es: "Calma en la naturaleza" }, text: { fi: "Järvimaisema ja ulkoilma täydentävät saunakokemusta.", en: "Lake views and fresh air complete the sauna experience.", es: "El paisaje del lago y el aire fresco completan la experiencia." }, credit: "Natura Viva", source: "https://naturaviva.fi/en_US/forest-hut-matildanjarvi/teijo-rental-shop" },
    ],
  },
  {
    id: "savusauna",
    title: { fi: "Savusauna – puun ja savun taikaa", en: "Smoke sauna – the magic of wood and smoke", es: "Sauna de humo: magia de madera y humo" },
    intro: { fi: "Savusaunan valmistelu vaatii aikaa ja osaamista. Palkintona on syvä, pehmeä löyly ja puun tuoksu, joka kuuluu perinteiseen suomalaiseen saunakokemukseen.", en: "Preparing a smoke sauna takes time and skill. The reward is deep, gentle steam and the scent of wood, a hallmark of Finnish sauna culture.", es: "Preparar una sauna de humo requiere tiempo y experiencia. La recompensa es un vapor profundo y suave y el aroma de la madera." },
    items: [
      { image: photoLibrary.saunaTraditionalSmoke, title: { fi: "Pehmeät savulöylyt", en: "Gentle smoke-sauna steam", es: "Vapor suave de la sauna de humo" }, text: { fi: "Hämärä, lämmin puupinta ja kiireetön rytmi tekevät kokemuksesta erityisen.", en: "Dim light, warm timber and an unhurried rhythm make the experience special.", es: "La luz tenue, la madera cálida y el ritmo pausado hacen especial la experiencia." }, credit: "JP Korpi-Vartiainen · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_smoke_sauna.jpg" },
      { image: photoLibrary.storfinnhova, title: { fi: "Erilaisia savusaunoja", en: "Distinctive smoke saunas", es: "Saunas de humo singulares" }, text: { fi: "Tutustu savusaunojen erilaisiin rakennustapoihin ja perinteisiin.", en: "Discover different smoke-sauna structures and traditions.", es: "Descubre diferentes construcciones y tradiciones de saunas de humo." }, credit: "Storfinnhova Gård", source: "https://www.storfinnhova.com/savusauna/" },
    ],
  },
  {
    id: "vasta",
    title: { fi: "Vasta, vihta ja koivun tuoksu", en: "Birch vihta and the scent of summer", es: "Abedul, vihta y aroma de verano" },
    intro: { fi: "Tuore koivuvihta kuuluu monen kesäsaunaan. Kevyt taputtelu ja koivun raikas tuoksu tuovat löylyihin oman, vuodenaikaan sidotun rituaalinsa.", en: "A fresh birch whisk is part of many Finnish summer saunas. Gentle whisking and the fresh scent of birch add a seasonal ritual to the steam.", es: "La rama de abedul fresca forma parte de muchas saunas de verano. Su aroma y el suave golpeteo añaden un ritual estacional." },
    items: [
      { image: photoLibrary.saunaVasta, title: { fi: "Koivuvihta", en: "Birch whisk", es: "Ramillete de abedul" }, text: { fi: "Kesän tuoksu ja perinteinen saunarituaali.", en: "The scent of summer and a traditional sauna ritual.", es: "El aroma del verano y un ritual tradicional." }, credit: "Michael Niederdorfer · CC BY-SA 3.0", source: "https://commons.wikimedia.org/wiki/File:Finnish_Vasta_(Vihta).jpg" },
      { image: photoLibrary.saunaWhisking, title: { fi: "Vihtomisen perinne", en: "The tradition of whisking", es: "La tradición de la vihta" }, text: { fi: "Vihta ja vasta ovat saman koivunoksista sidotun saunavihdan alueellisia nimiä.", en: "Vihta and vasta are regional names for a whisk made from birch branches.", es: "Vihta y vasta son nombres regionales de un manojo de ramas de abedul." }, credit: "Ville Kurki · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_whisking_and_l%C3%B6yly.jpg" },
    ],
  },
  {
    id: "kiuasnakki",
    title: { fi: "Kiuasnakki – saunan herkullinen klassikko", en: "Kiuasnakki – a Finnish sauna classic", es: "Kiuasnakki: un clásico finlandés" },
    intro: { fi: "Saunan jälkeen maistuu usein makkara ja sinappi ulkoilmassa. Kiuasmakkara on osa suomalaista mökki- ja saunaperinnettä – valmistuksessa on kuitenkin noudatettava kiuasvalmistajan ohjeita, eikä ruokaa tai rasvaa pidä asettaa suoraan kiukaalle.", en: "After sauna, sausage and mustard outdoors are a Finnish favourite. Sauna sausage is part of cottage culture, but always follow the stove manufacturer's guidance and never place food or fat directly on the heater.", es: "Después de la sauna, una salchicha con mostaza al aire libre es un clásico finlandés. Sigue siempre las instrucciones del fabricante y no pongas comida ni grasa directamente sobre el calentador." },
    items: [
      { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sausage,_beer_and_cake_at_Uusi_Sauna.jpg", title: { fi: "Saunamakkara", en: "Sauna sausage", es: "Salchicha de sauna" }, text: { fi: "Yksinkertainen herkku kruunaa mökki-illan – turvallisesti valmistettuna.", en: "A simple treat to finish a cottage evening – prepared safely.", es: "Un sencillo capricho para terminar la tarde – preparado de forma segura." }, credit: "JIP · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Sausage,_beer_and_cake_at_Uusi_Sauna.jpg" },
      { image: "https://finnmarksauna.com/cdn/shop/products/finnish-soapstone-sauna-sausagehot-dog-cooker-makkaraputki-soapstone-sauna-sausage-cooker-hukka-design-oy-soapstone-sauna-sausage-cooker-finnmark-sauna-911176.png?v=1698765598&width=1946", title: { fi: "Makkaraputki", en: "Soapstone sausage cooker", es: "Cocedor de salchichas de esteatita" }, text: { fi: "Erillinen saunamakkaran valmistusväline on yksi tapa pitää ruoka erillään kiukaan kivistä.", en: "A dedicated sausage cooker is one way to keep food separate from the heater stones.", es: "Un utensilio específico permite mantener la comida separada de las piedras del calentador." }, credit: "Finnmark Sauna", source: "https://finnmarksauna.com/products/finnish-soapstone-sauna-sausage-hot-dog-cooker-makkaraputki" },
    ],
  },
  {
    id: "saunatherapy",
    title: { fi: "Saunaterapia ja aistien rauhoittaminen", en: "Sauna rituals for wellbeing", es: "Rituales de sauna para el bienestar" },
    intro: { fi: "Lämpö, hiljaisuus, luonnon tuoksut ja kiireetön hengähdys voivat tehdä saunasta palauttavan hyvinvointihetken. Kuuntele omaa oloasi ja pidä taukoja.", en: "Warmth, quiet, natural scents and an unhurried pause can turn sauna into a restorative wellbeing ritual. Listen to your body and take breaks.", es: "El calor, el silencio, los aromas naturales y una pausa sin prisas pueden convertir la sauna en un ritual reparador. Escucha a tu cuerpo y descansa." },
    items: [
      { image: photoLibrary.saunaWhisking, title: { fi: "Lempeä saunarituaali", en: "A gentle sauna ritual", es: "Un ritual suave" }, text: { fi: "Pysähdy, hengitä rauhassa ja nauti lämmöstä omaan tahtiisi.", en: "Pause, breathe calmly and enjoy the warmth at your own pace.", es: "Haz una pausa, respira con calma y disfruta del calor a tu ritmo." }, credit: "Ville Kurki · CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_whisking_and_l%C3%B6yly.jpg" },
      { image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Traditional_Finnish_sauna_healing.jpg", title: { fi: "Luonnon tuoksut", en: "Natural aromas", es: "Aromas naturales" }, text: { fi: "Koivun, tervan ja eukalyptuksen tuoksut tuovat saunaan oman tunnelmansa. Käytä vain saunaan tarkoitettuja tuotteita ohjeiden mukaan.", en: "Birch, tar and eucalyptus scents create atmosphere. Use only sauna-approved products as directed.", es: "Los aromas de abedul, alquitrán y eucalipto crean ambiente. Usa solo productos aptos para sauna siguiendo las instrucciones." }, credit: "Kaisu Mokkila · Wikimedia Commons", source: "https://commons.wikimedia.org/wiki/File:Traditional_Finnish_sauna_healing.jpg" },
    ],
  },
];

export default async function SaunaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const c = copy[locale];

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[60svh] overflow-hidden bg-brand-950 text-white">
        <Image src="https://cdn.johku.com/naturaviva/files/589/w374-h237-s/image.Matildanj%C3%A4rvensauna-2.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[60svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">{c.heading}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{c.intro}</p>
            <Link href="#sauna-rentals" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-300 px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-gold-200">
              {c.listTitle}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-8 sm:py-12" aria-label="Sauna experience carousel">
        <SaunaCarousel items={heroSlides} locale={locale} imageLabel={locale === "fi" ? "Kuva" : locale === "es" ? "Imagen" : "Image"} />
      </section>

      <section id="sauna-rentals" className="scroll-mt-24 py-10 sm:py-16">
        <FeaturedSaunas locale={locale} />
      </section>

      {galleries.map((gallery) => (
        <section key={gallery.id} id={gallery.id} className="border-t border-brand-100 py-12 sm:py-16">
          <div className="container-narrow grid gap-5 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{gallery.title[locale]}</h2>
              <p className="mt-4 leading-7 text-slate-600">{gallery.intro[locale]}</p>
            </div>
            <div className="min-w-0">
              <SaunaCarousel items={gallery.items} locale={locale} imageLabel={locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de imagen" : "Image source"} />
            </div>
          </div>
        </section>
      ))}

      <section className="bg-brand-50 py-12 sm:py-16">
        <div className="container-narrow flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl leading-7 text-slate-700">{c.note}</p>
          <Link href={`/${locale}/experiences`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-900 px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
            {c.explore}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
