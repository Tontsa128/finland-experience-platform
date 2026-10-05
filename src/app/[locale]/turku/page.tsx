import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bike, Coffee, Flame, Landmark, Ship, Trees, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const contentByLocale = {
  fi: {
    title: "Turku – Aurajoki, historia ja saariston portti",
    description: "Turku-opas: Aurajoki, Turun linna, Ruissalo, saaristo, ruoka, majoitus, saunat, pyöräily ja merelliset elämykset.",
    eyebrow: "TURKU · SUOMEN HISTORIALLINEN RANNIKKOKAUPUNKI",
    intro: "Turku sopii matkailijalle, joka haluaa yhdistää kaupungin kulttuurin ja meren. Aurajoki kulkee keskustan läpi, saaristo alkaa läheltä ja Ruissalo tuo luonnon nopeasti pois kaupungin vilinästä.",
    river: "Aurajoki – kaupungin oma olohuone",
    riverText: "Kävele jokirantaa, pysähdy kahvilaan tai ravintolaan ja jatka iltaa veden äärellä. Aurajoen varrella Turun historia, ruokakulttuuri ja kesäinen kaupunkielämä ovat samassa maisemassa.",
    history: "Turun linna ja historia",
    historyText: "Turun linna, tuomiokirkko, museot ja vanhat rakennukset tekevät Turusta Suomen historiaan syventyjän vahvan lähtökohdan. Kaupunkipäivän voi rakentaa myös arkkitehtuuri- ja kulttuurikävelyjen ympärille.",
    ruissalo: "Ruissalo – meri ja luonto kaupungin vieressä",
    ruissaloText: "Ruissalo on luonnonsuojelualuetta lukuun ottamatta Saaronniemen aluetta. Saarella voi pyöräillä, kävellä rantaa ja pysähtyä kahville Honkapirttiin tai uimaan Saaronniemeen.",
    archipelago: "Saaristopäivä Turusta",
    archipelagoText: "Turusta on helppo lähteä vesille. River Taxi, vesibussit ja saaristoyhteydet avaavat erilaisia tapoja nähdä saaria, rantoja ja kesämökkimaisemia.",
    sauna: "Sauna & uinti",
    saunaText: "Turun seudulla sauna voi olla kaupunkikokemus, järvenrantapäivä tai saaristoreissun päätös. Kauppatorin Sauna, Forum Sauna ja Villa Järvelä tarjoavat erilaisia tapoja saunoa.",
    food: "Ruoka & paikalliset maut",
    foodText: "Aurajoen ravintolat, kahvilat, panimot ja saariston ruokapaikat tekevät Turusta vahvan ruokakohteen. Paikallisissa listoissa yhdistyvät kala, saariston tuotteet, suomalaiset klassikot ja moderni keittiö.",
    stay: "Majoitus",
    stayText: "Keskustan hotellit tekevät kaupungista helpon tukikohdan. Rauhallisempaan yöpymiseen kannattaa katsoa Ruissalon, lähisaariston ja Kaarinan puolen vaihtoehtoja.",
    cycling: "Pyörällä saaristoon",
    cyclingText: "Turku on luonteva lähtöpaikka pyöräilylle: kaupungista voi jatkaa Ruissaloon ja saariston suuntaan, ja pienempi saaristoreitti yhdistää Naantalin, Seilin, Nauvon, Paraisten ja Turun.",
    direct: "Palveluntarjoajat",
    directText: "Alla olevat kohteet ovat inspiraatiota ja suoria jatkopolkuja. Emme vastaanota varausta tai maksua, vaan lopullinen asiointi tehdään palveluntarjoajan kanssa.",
    official: "Tutustu Visit Turkuun",
    explore: "Tutustu kohteisiin",
    coastal: "Takaisin Rannikon Suomi -oppaaseen",
  },
  es: {
    title: "Turku – río Aura, historia y puerta al archipiélago",
    description: "Guía de Turku: río Aura, castillo, Ruissalo, archipiélago, gastronomía, alojamiento, saunas, ciclismo y experiencias marítimas.",
    eyebrow: "TURKU · CIUDAD COSTERA HISTÓRICA DE FINLANDIA",
    intro: "Turku es ideal para combinar cultura urbana y mar. El río Aura atraviesa el centro, el archipiélago comienza cerca y Ruissalo ofrece naturaleza sin alejarse de la ciudad.",
    river: "Río Aura – el salón al aire libre de Turku",
    riverText: "Camina junto al río, entra en un café o restaurante y deja que la tarde continúe junto al agua. Historia, gastronomía y vida urbana se encuentran a orillas del Aura.",
    history: "Castillo e historia",
    historyText: "El castillo de Turku, la catedral, los museos y los edificios históricos hacen de la ciudad una base excelente para descubrir la historia de Finlandia.",
    ruissalo: "Ruissalo – mar y naturaleza junto a la ciudad",
    ruissaloText: "Ruissalo es una reserva natural salvo en el área de Saaronniemi. Es un lugar para caminar, montar en bicicleta, bañarse y parar a tomar algo en Honkapirtti.",
    archipelago: "Un día de archipiélago desde Turku",
    archipelagoText: "Desde Turku es fácil salir al agua. River Taxi, barcos de conexión y servicios hacia las islas permiten descubrir costas, islas y paisajes de verano.",
    sauna: "Sauna y baño",
    saunaText: "La sauna puede ser una experiencia urbana, una tarde junto a un lago o el final perfecto de un día en las islas. Kauppatorin Sauna, Forum Sauna y Villa Järvelä ofrecen estilos diferentes.",
    food: "Gastronomía y sabores locales",
    foodText: "Restaurantes junto al Aura, cafés, cervecerías y destinos gastronómicos del archipiélago hacen de Turku un lugar excelente para comer. El pescado y los productos locales conviven con la cocina finlandesa moderna.",
    stay: "Alojamiento",
    stayText: "Los hoteles del centro son una base cómoda. Para un ritmo más tranquilo, mira las opciones de Ruissalo, las islas cercanas y Kaarina.",
    cycling: "En bicicleta hacia las islas",
    cyclingText: "Turku es un punto de partida natural para el ciclismo. Puedes continuar hacia Ruissalo y el archipiélago, y combinar el viaje con Naantali, Seili, Nauvo y Parainen.",
    direct: "Proveedores locales",
    directText: "Los lugares siguientes son ideas y enlaces directos. No gestionamos reservas ni pagos: la contratación final se realiza con cada proveedor.",
    official: "Descubre Visit Turku",
    explore: "Explorar destinos",
    coastal: "Volver a la guía de Finlandia costera",
  },
  en: {
    title: "Turku – the Aura River, history and gateway to the archipelago",
    description: "Turku guide: the Aura River, castle, Ruissalo, archipelago, food, accommodation, saunas, cycling and coastal experiences.",
    eyebrow: "TURKU · HISTORIC FINNISH COASTAL CITY",
    intro: "Turku is made for combining city culture and the sea. The Aura River runs through the centre, the archipelago begins nearby and Ruissalo brings nature close to the city.",
    river: "The Aura River – Turku's outdoor living room",
    riverText: "Walk the riverfront, stop at a café or restaurant and let the evening continue beside the water. History, food and urban summer life meet along the Aura.",
    history: "Castle & history",
    historyText: "Turku Castle, the Cathedral, museums and historic buildings make the city a strong base for discovering Finnish history.",
    ruissalo: "Ruissalo – sea and nature beside the city",
    ruissaloText: "Ruissalo is a nature reserve except for the Saaronniemi area. It is ideal for cycling, coastal walks, swimming and a coffee break at Honkapirtti.",
    archipelago: "An archipelago day from Turku",
    archipelagoText: "It is easy to get on the water from Turku. River Taxi, water buses and island connections offer different ways to see the coast and islands.",
    sauna: "Sauna & swimming",
    saunaText: "Sauna can be a city experience, a lakeside afternoon or the perfect end to an island day. Kauppatorin Sauna, Forum Sauna and Villa Järvelä offer different styles.",
    food: "Food & local flavours",
    foodText: "Aura riverside restaurants, cafés, breweries and archipelago food destinations make Turku a strong culinary base. Fish, local produce and modern Finnish cooking sit naturally together.",
    stay: "Accommodation",
    stayText: "Central hotels make Turku easy to explore. For a slower stay, look towards Ruissalo, the nearby islands and Kaarina.",
    cycling: "Cycle towards the islands",
    cyclingText: "Turku is a natural cycling starting point. Continue towards Ruissalo and the archipelago, and combine the ride with Naantali, Seili, Nauvo and Parainen.",
    direct: "Local providers",
    directText: "The places below are inspiration and direct onward links. We do not take bookings or payments; final arrangements are made with the provider.",
    official: "Explore Visit Turku",
    explore: "Explore destinations",
    coastal: "Back to the Coastal Finland guide",
  },
} as const;

const providers = [
  { name: { fi: "River Taxi", es: "River Taxi", en: "River Taxi" }, text: { fi: "Puisella jokiveneellä Aurajoella ja mahdollisesti kohti Ruissaloa.", es: "Barco de madera por el Aura y, según el servicio, hacia Ruissalo.", en: "A traditional wooden boat on the Aura, with routes that can extend towards Ruissalo." }, url: "https://en.visitturku.fi/see-and-do" },
  { name: { fi: "Villa Järvelä", es: "Villa Järvelä", en: "Villa Järvelä" }, text: { fi: "Järvenrantasaunoja, paljuja, kylmäuintia, SUP-lautoja, soutuveneitä ja kesäkahvila.", es: "Saunas junto al lago, jacuzzis, baño frío, SUP, botes de remos y café de verano.", en: "Lakeside saunas, hot tubs, cold plunges, SUP boards, rowing boats and a summer café." }, url: "https://jarvela.fi/" },
  { name: { fi: "Forum Sauna", es: "Forum Sauna", en: "Forum Sauna" }, text: { fi: "Turun perinteinen yleinen sauna Kurjenmäessä.", es: "Una sauna pública tradicional de Turku en Kurjenmäki.", en: "A long-running public sauna in Kurjenmäki, Turku." }, url: "https://forumsauna.fi/" },
  { name: { fi: "Ruissalo Boatyard", es: "Ruissalo Boatyard", en: "Ruissalo Boatyard" }, text: { fi: "Merenrannan tapahtuma- ja ruokakokonaisuus Ruissalossa.", es: "Espacio costero para eventos y gastronomía en Ruissalo.", en: "A seaside destination for events and food on Ruissalo." }, url: "https://en.visitturku.fi/see-and-do" },
  { name: { fi: "OOBU", es: "OOBU", en: "OOBU" }, text: { fi: "Saaristovaikutteista ruokaa Aurajoen äärellä.", es: "Cocina inspirada en el archipiélago junto al Aura.", en: "Archipelago-inspired food by the Aura." }, url: "https://en.visitturku.fi/turkus-unique-spots-and-hidden-gems" },
  { name: { fi: "Honkapirtti", es: "Honkapirtti", en: "Honkapirtti" }, text: { fi: "Perinteinen hirsikahvila Ruissalon luonnossa.", es: "Cafetería tradicional de troncos en la naturaleza de Ruissalo.", en: "A traditional log café in the nature of Ruissalo." }, url: "https://en.visitturku.fi/eat-and-drink" },
];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const c = contentByLocale[locale] || contentByLocale.en;
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "turku", image: photoLibrary.turkuAura });
}

export default function TurkuPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const c = contentByLocale[locale] || contentByLocale.en;

  const cards = [
    { icon: Waves, title: c.river, text: c.riverText },
    { icon: Landmark, title: c.history, text: c.historyText },
    { icon: Trees, title: c.ruissalo, text: c.ruissaloText },
    { icon: Ship, title: c.archipelago, text: c.archipelagoText },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.turkuAura} alt={locale === "fi" ? "Aurajoki Turussa" : locale === "es" ? "Río Aura de Turku" : "Aura River in Turku"} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://en.visitturku.fi/see-and-do" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{c.official}<ArrowUpRight className="h-4 w-4" /></a>
            <Link href={`/${locale}/coastal-finland#turku-archipelago`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white">{c.coastal}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft">
              <Icon className="h-7 w-7 text-brand-700" />
              <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Flame className="h-7 w-7 text-amber-500" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{c.sauna}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{c.saunaText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Coffee className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{c.food}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{c.foodText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Landmark className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{c.stay}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{c.stayText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
            <Bike className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-3xl font-bold text-brand-950">{c.cycling}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{c.cyclingText}</p>
          </article>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <a key={provider.name.en} href={provider.url} target="_blank" rel="noopener noreferrer" className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <h2 className="font-display text-2xl font-bold text-brand-950">{provider.name[locale]}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{provider.text[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">{locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider"}<ArrowUpRight className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
        <Image src={photoLibrary.turkuArchipelago} alt="" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-brand-950/75" />
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{c.direct}</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{c.direct}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{c.directText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/accommodations`} className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{locale === "fi" ? "Majoitukset" : locale === "es" ? "Alojamientos" : "Accommodation"}<ArrowRight className="ml-2 inline-block h-4 w-4" /></Link>
            <Link href={`/${locale}/experiences`} className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white">{locale === "fi" ? "Elämykset" : locale === "es" ? "Experiencias" : "Experiences"}<ArrowRight className="ml-2 inline-block h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
