import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bike, Coffee, Flame, Ship, Waves, Wind } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const t = {
  fi: {
    title: "Hanko – meri kolmelta suunnalta",
    description: "Hanko-opas: rannat, meri, luonto, satamat, pyöräily, melonta, ruoka, majoitus ja saunat.",
    eyebrow: "HANKO · ETELÄISIN SUOMI",
    intro: "Hanko on rannikkokaupunki, jossa avoin meri, hiekkarannat, sileät kalliot, satamat ja huvilat luovat oman kesäisen rytminsä.",
    beaches: "Rannat ja 130 km rantaviivaa",
    beachesText: "Hangolla on noin 130 kilometriä rantaviivaa, josta noin 30 kilometriä on hiekkarantaa. Keskustan rannat ovat helposti saavutettavia, ja kauempana avautuvat luonnon rauha, kalliot ja pienet poukamat.",
    nature: "Uddskatan, Tvärminne ja Puistovuoret",
    natureText: "Eteläkärjen avoin meri, Tvärminnen luonnonsuojelualueen monimuotoisuus ja Puistovuorten kalliot tarjoavat erilaisia näkymiä samaan merelliseen ympäristöön.",
    sea: "Meriaktiviteetit",
    seaText: "Melonta, purjehdus, kalastus, vene- ja kajakkivuokraus sekä pienet saariretket ovat osa Hangon vahvuutta. Lähtö kannattaa sovittaa päivän sää- ja meriolosuhteisiin.",
    food: "Ruoka ja satamaelämä",
    foodText: "Hangon ravintoloissa meri näkyy lautasella: kalaa, saaristolaisleipää, kauden raaka-aineita, satamaravintoloita, bistroja ja kesäterasseja.",
    stay: "Majoitus",
    stayText: "Valittavana on boutique-hotelleja, historiallisia huviloita, B&B-paikkoja, motelleja, leirintäalueita ja merenrantamajoitusta.",
    sauna: "Sauna",
    saunaText: "Hangon saunavalikoimassa on ympärivuotisia vaihtoehtoja ja kesäkauden kohteita kylpylästä venekerhoihin ja rantaympäristöihin.",
    bike: "Pyörällä Hanko haltuun",
    bikeText: "Lyhyet etäisyydet tekevät Hangosta erittäin toimivan pyöräkohteen. Keskustasta pääsee helposti rannoille, satamiin ja luontokohteisiin.",
    official: "Tutustu Visit Hankoon",
    coastal: "Takaisin Rannikon Suomi -oppaaseen",
  },
  es: {
    title: "Hanko – mar por tres lados",
    description: "Guía de Hanko: playas, mar, naturaleza, puertos, ciclismo, kayak, gastronomía, alojamiento y sauna.",
    eyebrow: "HANKO · EL EXTREMO SUR DE FINLANDIA",
    intro: "Hanko es una ciudad costera definida por mar abierto, playas de arena, rocas lisas, puertos y villas de verano.",
    beaches: "Playas y 130 km de costa",
    beachesText: "Hanko tiene unos 130 kilómetros de costa, de los cuales alrededor de 30 son playas de arena. Las playas del centro son fáciles de alcanzar y otras zonas ofrecen más naturaleza y pequeñas calas.",
    nature: "Uddskatan, Tvärminne y Puistovuoret",
    natureText: "El extremo sur, la diversidad natural de Tvärminne y las rocas de Puistovuoret muestran diferentes caras del litoral de Hanko.",
    sea: "Actividades en el mar",
    seaText: "Kayak, vela, pesca, alquiler de barcos y pequeñas excursiones entre islas son parte de la identidad de Hanko. Conviene elegir cada salida según el tiempo y las condiciones del mar.",
    food: "Gastronomía y ambiente portuario",
    foodText: "La cocina de Hanko está marcada por el mar: pescado, pan del archipiélago, ingredientes de temporada, restaurantes del puerto, bistrós y terrazas de verano.",
    stay: "Alojamiento",
    stayText: "Hay hoteles boutique, villas históricas, B&B, moteles, camping y alojamiento junto al mar.",
    sauna: "Sauna",
    saunaText: "Hanko cuenta con saunas abiertas todo el año y opciones de verano, desde spa hasta clubes náuticos y lugares cerca de la playa.",
    bike: "Descubrir Hanko en bicicleta",
    bikeText: "Las distancias cortas hacen de Hanko un destino excelente para bicicletas: desde el centro se llega fácilmente a playas, puertos y espacios naturales.",
    official: "Descubre Visit Hanko",
    coastal: "Volver a la guía de Finlandia costera",
  },
  en: {
    title: "Hanko – sea on three sides",
    description: "Hanko guide: beaches, sea, nature, harbours, cycling, kayaking, food, accommodation and sauna.",
    eyebrow: "HANKO · SOUTHERNMOST FINLAND",
    intro: "Hanko is a coastal town shaped by open sea, sandy beaches, smooth rocks, harbours and summer villas.",
    beaches: "Beaches and 130 km of shoreline",
    beachesText: "Hanko has about 130 kilometres of shoreline, around 30 kilometres of sandy beaches. The central beaches are easy to reach, while farther areas offer quiet coves, rocks and nature.",
    nature: "Uddskatan, Tvärminne & Puistovuoret",
    natureText: "The southern tip, the biodiversity of Tvärminne and the rocks of Puistovuoret reveal different sides of Hanko's coastal environment.",
    sea: "Sea activities",
    seaText: "Kayaking, sailing, fishing, boat and kayak rental and small island outings are central to Hanko. Choose the exact activity according to the day's weather and sea conditions.",
    food: "Food & harbour life",
    foodText: "Hanko's food scene is strongly coastal: fish, archipelago bread, seasonal ingredients, harbour restaurants, bistros and summer terraces.",
    stay: "Accommodation",
    stayText: "Choose from boutique hotels, historic villas, B&Bs, motels, camping and seaside accommodation.",
    sauna: "Sauna",
    saunaText: "Hanko has year-round sauna options as well as summer choices, from spa settings to sailing clubs and seaside locations.",
    bike: "Explore Hanko by bike",
    bikeText: "Short distances make Hanko an excellent cycling destination. Beaches, harbours and nature sites are easy to combine in one day.",
    official: "Explore Visit Hanko",
    coastal: "Back to the Coastal Finland guide",
  },
} as const;

const links = [
  ["Hanko Nature", "https://visithanko.fi/en/teemasivu/the-diverse-nature-of-hanko/"],
  ["Hanko Saunas", "https://visithanko.fi/en/infosivu/hanko-saunas/"],
  ["Sea activities", "https://visithanko.fi/en/teemasivu/sea-activities/"],
  ["Restaurants", "https://visithanko.fi/en/restaurants/"],
  ["Accommodation", "https://visithanko.fi/en/teemasivu/accommodation/"],
  ["Digital service map", "https://visithanko.fi/en/infosivu/hanko-digital-service-map/"],
] as const;

const providers = [
  { category: { fi: "Majoitus", es: "Alojamiento", en: "Accommodation" }, name: "Villa Maija", text: { fi: "Vuonna 1888 rakennettu pitsihuvila, joka tarjoaa ympäri vuoden huoneistoja, omat keittiöt ja osassa huoneistoista saunan.", es: "Villa histórica de 1888 con apartamentos durante todo el año, cocina propia y sauna en algunos apartamentos.", en: "A historic 1888 villa offering year-round apartments, private kitchens and sauna in some apartments." }, url: "https://villamaija.fi/" },
  { category: { fi: "Majoitus", es: "Alojamiento", en: "Accommodation" }, name: "Viking Motel", text: { fi: "Pohjois-Hangon ympärivuotinen motelli, jossa on majoitusta, mökkejä, suuri sauna ja polkupyörävuokrausta.", es: "Motel abierto todo el año en el norte de Hanko, con habitaciones, cabañas, una gran sauna y alquiler de bicicletas.", en: "A year-round motel in northern Hanko with rooms, cabins, a large sauna and bicycle rental." }, url: "https://vikingmotel.fi/" },
  { category: { fi: "Majoitus & hyvinvointi", es: "Alojamiento y bienestar", en: "Stay & wellbeing" }, name: "Regatta SPA", text: { fi: "Hangon merellinen kylpylähotelli, jossa yhdistyvät kylpyläperinne, sauna, hyvinvointi ja meren läheisyys.", es: "Hotel spa junto al mar que recupera la tradición balnearia de Hanko y combina bienestar, sauna y mar.", en: "A seaside spa hotel reviving Hanko's historic spa tradition with wellness, sauna and the sea." }, url: "https://regattaspa.fi/" },
  { category: { fi: "Majoitus", es: "Alojamiento", en: "Accommodation" }, name: "Silversand Resort & Camping", text: { fi: "Merenrantakohde noin neljän kilometrin päässä keskustasta, oma hiekkaranta ja leirintäpalvelut.", es: "Complejo junto al mar a unos cuatro kilómetros del centro, con playa propia y camping.", en: "A seaside resort about four kilometres from the centre, with its own beach and camping services." }, url: "https://silversand.fi/" },
  { category: { fi: "Elämys", es: "Experiencia", en: "Experience" }, name: "Outdoor Happiness", text: { fi: "Luontoelämyksiä, opastettuja retkiä ja kajakkivuokrausta. Palvelu sopii myös ryhmille.", es: "Experiencias de naturaleza, excursiones guiadas y alquiler de kayaks, también para grupos.", en: "Nature experiences, guided activities and kayak rental, including group programmes." }, url: "https://www.outdoorhappiness.fi/en/" },
  { category: { fi: "Elämys", es: "Experiencia", en: "Experience" }, name: "SE-action", text: { fi: "Ryhmäohjelmaa Hangossa: luonnon, yhdessä tekemisen ja ulkoilun ympärille rakennettuja ohjelmia.", es: "Programas para grupos en Hanko centrados en naturaleza, actividad y experiencias compartidas.", en: "Group programmes in Hanko built around nature, outdoor activity and shared experiences." }, url: "https://www.seaction.com/" },
  { category: { fi: "Ruoka", es: "Gastronomía", en: "Food" }, name: "Restaurant Segel", text: { fi: "Hangon keskustan elegantti ravintola, jossa sesongin raaka-aineet ja merellinen tunnelma ovat keskiössä.", es: "Restaurante elegante en el centro de Hanko, con ingredientes de temporada y ambiente costero.", en: "An elegant Hanko restaurant focused on seasonal ingredients and a relaxed coastal atmosphere." }, url: "https://segelhanko.com/restaurant-segel" },
  { category: { fi: "Meri & retket", es: "Mar y excursiones", en: "Sea & excursions" }, name: "Sailing trips in Hanko", text: { fi: "Purjehdus on yksi Hangon luontevimmista tavoista kokea avoin meri, rannikko ja saariston pienet saaret.", es: "La navegación es una de las mejores formas de descubrir el mar abierto, la costa y las pequeñas islas de Hanko.", en: "Sailing is one of the most natural ways to experience Hanko's open sea, coast and small islands." }, url: "https://silversand.fi/" },
] as const;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const x = t[locale] || t.en;
  return buildLocalizedMetadata({ locale, title: x.title, description: x.description, path: "hanko", image: photoLibrary.hanko });
}

export default function HankoPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const x = t[locale] || t.en;
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.hanko} alt={locale === "fi" ? "Hanko ilmasta" : locale === "es" ? "Hanko desde el aire" : "Hanko from the air"} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{x.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{x.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{x.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://visithanko.fi/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{x.official}<ArrowUpRight className="h-4 w-4" /></a>
            <Link href={`/${locale}/coastal-finland#hanko`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white">{x.coastal}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [Waves, x.beaches, x.beachesText],
            [Wind, x.nature, x.natureText],
            [Ship, x.sea, x.seaText],
            [Bike, x.bike, x.bikeText],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Waves;
            return <article key={title as string} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft"><I className="h-7 w-7 text-brand-700" /><h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{title as string}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{text as string}</p></article>;
          })}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card">
            <Image src={photoLibrary.hankoRegattaBeach} alt={locale === "fi" ? "Regattanranta Hangossa" : locale === "es" ? "Playa de Regattanranta en Hanko" : "Regattanranta beach in Hanko"} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{x.beaches}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{x.beaches}</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">{x.beachesText}</p>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-7 shadow-soft"><Coffee className="h-7 w-7 text-brand-700" /><h2 className="mt-4 font-display text-3xl font-bold text-brand-950">{x.food}</h2><p className="mt-4 leading-8 text-slate-700">{x.foodText}</p></article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft"><Flame className="h-7 w-7 text-amber-500" /><h2 className="mt-4 font-display text-3xl font-bold text-brand-950">{x.sauna}</h2><p className="mt-4 leading-8 text-slate-700">{x.saunaText}</p></article>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Paikalliset palvelut" : locale === "es" ? "Servicios locales" : "Local providers"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Valitse oma tapasi kokea Hanko" : locale === "es" ? "Elige cómo vivir Hanko" : "Choose your way to experience Hanko"}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{locale === "fi" ? "Poimintoja Visit Hangon palveluvalikoimasta. Käyttäjä jatkaa aina palveluntarjoajan tai virallisen kohdesivun kautta; emme ota varausta tai maksua vastaan." : locale === "es" ? "Una selección de servicios de Visit Hanko. El visitante continúa siempre hacia el proveedor o la página oficial; no gestionamos reservas ni pagos." : "A selection from Visit Hanko's service offering. Visitors always continue to the provider or official destination page; we do not take bookings or payments."}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <a key={provider.name} href={provider.url} target="_blank" rel="noopener noreferrer" className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-600">{provider.category[locale]}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">{provider.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{provider.text[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">{locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider"}<ArrowUpRight className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-24">
        <div className="container-narrow">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">{locale === "fi" ? "Suorat jatkopolut" : locale === "es" ? "Enlaces directos" : "Direct onward links"}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"><h3 className="font-semibold">{name}</h3><span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-gold-300">{locale === "fi" ? "Avaa" : locale === "es" ? "Abrir" : "Open"}<ArrowUpRight className="h-3.5 w-3.5" /></span></a>)}
          </div>
        </div>
      </section>
    </main>
  );
}
