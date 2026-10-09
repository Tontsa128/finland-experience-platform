import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Landmark, MapPin, Mountain, Ship, Utensils } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

type PlaceCard = { name: string; url: string; description: string };

const copy = {
  fi: {
    eyebrow: "SUOMEN ITÄRANNIKKO · KOTKA · HAMINA · LOVIISA",
    title: "Saaristo, Kymijoki ja historialliset pikkukaupungit",
    intro: "Itärannikko yhdistää Itäisen Suomenlahden saariston, Kymijoen, ruukkimiljööt, linnoituskaupungit ja luonnon. Se sopii matkailijalle, joka haluaa yhdistää meren, kulttuurin ja ulkoilun ilman kiireistä valmispakettia.",
    official: "Tutustu Visit Kotka-Haminaan",
    direct: "Avaa alueen opas",
    note: "Tarkista aina ajantasaiset reitit, aukioloajat, hinnat ja saatavuus suoraan palveluntarjoajalta tai alueen virallisesta matkailuoppaasta.",
    food: "Rannikkokaupungeissa voi yhdistää paikallisen ruoan, kahvilat, torit ja merelliset ravintolat samaan päivään.",
    nature: "Kymijoki, saaristo, kansallispuistot, rannat ja puistot tarjoavat tekemistä jalan, pyörällä ja vesillä.",
    culture: "Haminan linnoitus, Kotkan Merikeskus Vellamo, Strömforsin ruukki ja rannikon sotahistoria rakentavat alueelle vahvan kulttuurikerroksen.",
    coast: "Kesällä Itärannikon saaristo toimii hyvin hitaana päiväretkenä tai useamman pysähdyksen rannikkoreittinä.",
    next: "Jatka Suomen rannikkokohteisiin",
    places: [
      { name: "Kotka", url: "https://www.visitkotkahamina.fi/en/", description: "Palkitut puistot, Merikeskus Vellamo, Maretarium, Kymijoki ja merelliset satamat." },
      { name: "Hamina", url: "https://www.visithamina.fi/", description: "Ympyräkaupunki, linnoitus, Hamina Bastioni ja merellinen Tervasaari." },
      { name: "Loviisa", url: "https://www.visitkotkahamina.fi/en/", description: "Puutalokaupungin tunnelma, historialliset miljööt ja rannikon kulttuurikohteet." },
      { name: "Strömfors", url: "https://www.visitkotkahamina.fi/en/", description: "Vanha ruukki, jokimaisema, käsityöt ja rauhallinen päivä maaseudun keskellä." },
      { name: "Valkmusa", url: "https://www.visitkotkahamina.fi/en/", description: "Kansallispuiston suomaisema ja retkeily sopivat luonnon rauhaa etsivälle." },
      { name: "Itäisen Suomenlahden saaristo", url: "https://www.visitkotkahamina.fi/en/", description: "Veneily, risteilyt, melonta ja pienet saaristokylät avaavat merellisen Itärannikon." },
    ] as PlaceCard[],
  },
  es: {
    eyebrow: "COSTA ESTE DE FINLANDIA · KOTKA · HAMINA · LOVIISA",
    title: "Archipiélago, río Kymi y pequeñas ciudades históricas",
    intro: "La Costa Este combina el archipiélago del Golfo de Finlandia, el río Kymi, antiguas fábricas, ciudades fortificadas y naturaleza. Es ideal para quien quiere mar, cultura y actividades al aire libre sin un viaje organizado.",
    official: "Descubre Visit Kotka-Hamina",
    direct: "Abrir la guía local",
    note: "Comprueba siempre rutas, horarios, precios y disponibilidad actuales directamente con el proveedor o con la oficina oficial de turismo.",
    food: "Las ciudades costeras permiten combinar comida local, cafés, mercados y restaurantes junto al mar.",
    nature: "El río Kymi, el archipiélago, los parques nacionales, las playas y los parques urbanos ofrecen actividades a pie, en bicicleta y sobre el agua.",
    culture: "La fortaleza de Hamina, Maritime Centre Vellamo, Strömfors y la historia militar de la costa forman un patrimonio variado.",
    coast: "En verano, el archipiélago funciona especialmente bien como excursión pausada o ruta costera con varias paradas.",
    next: "Continúa por los destinos costeros de Finlandia",
    places: [
      { name: "Kotka", url: "https://www.visitkotkahamina.fi/en/", description: "Parques junto al mar, Maritime Centre Vellamo, Maretarium, río Kymi y puertos." },
      { name: "Hamina", url: "https://www.visithamina.fi/", description: "Ciudad circular, fortaleza, Hamina Bastioni y el puerto de Tervasaari." },
      { name: "Loviisa", url: "https://www.visitkotkahamina.fi/en/", description: "Casas de madera, historia, cultura y paisajes de la costa." },
      { name: "Strömfors", url: "https://www.visitkotkahamina.fi/en/", description: "Antigua ferrería, río, artesanía y una parada tranquila en el campo." },
      { name: "Valkmusa", url: "https://www.visitkotkahamina.fi/en/", description: "Paisajes de turbera y rutas para quien busca naturaleza y silencio." },
      { name: "Archipiélago del Golfo de Finlandia", url: "https://www.visitkotkahamina.fi/en/", description: "Navegación, cruceros, kayak y pequeños pueblos del archipiélago." },
    ] as PlaceCard[],
  },
  en: {
    eyebrow: "EAST COAST OF FINLAND · KOTKA · HAMINA · LOVIISA",
    title: "Archipelago, Kymi River and historic coastal towns",
    intro: "Finland's East Coast combines the Eastern Gulf of Finland archipelago, the Kymi River, historic ironworks, fortress towns and nature. It suits travellers looking for sea, culture and outdoor life without a packaged tour.",
    official: "Explore Visit Kotka-Hamina",
    direct: "Open local guide",
    note: "Always check current routes, opening hours, prices and availability directly with the provider or the official tourism organisation.",
    food: "Coastal towns make it easy to combine local food, cafés, markets and seaside restaurants in one day.",
    nature: "The Kymi River, archipelago, national parks, beaches and urban parks offer ways to explore on foot, by bike and on the water.",
    culture: "Hamina Fortress, Maritime Centre Vellamo, Strömfors Ironworks and the region's military history add a strong cultural layer.",
    coast: "In summer, the archipelago works especially well as a slow day trip or a coastal route with several stops.",
    next: "Continue to Finland's coastal destinations",
    places: [
      { name: "Kotka", url: "https://www.visitkotkahamina.fi/en/", description: "Award-winning parks, Maritime Centre Vellamo, Maretarium, the Kymi River and seaside harbours." },
      { name: "Hamina", url: "https://www.visithamina.fi/", description: "A circular fortress town, Hamina Bastioni and the maritime setting of Tervasaari." },
      { name: "Loviisa", url: "https://www.visitkotkahamina.fi/en/", description: "Wooden-town atmosphere, history, culture and coastal scenery." },
      { name: "Strömfors", url: "https://www.visitkotkahamina.fi/en/", description: "Historic ironworks, river scenery, craft and a slower countryside stop." },
      { name: "Valkmusa", url: "https://www.visitkotkahamina.fi/en/", description: "Raised bog landscapes and trails for travellers looking for nature and quiet." },
      { name: "Eastern Gulf of Finland archipelago", url: "https://www.visitkotkahamina.fi/en/", description: "Boating, cruises, kayaking and small island communities open up the East Coast." },
    ] as PlaceCard[],
  },
} satisfies Record<Locale, {
  eyebrow: string; title: string; intro: string; official: string; direct: string; note: string;
  food: string; nature: string; culture: string; coast: string; next: string; places: PlaceCard[];
}>;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Metadata {
  const locale = (await params).locale as Locale;
  const c = copy[locale] ?? copy.en;
  return buildLocalizedMetadata({
    locale,
    title: c.title + " | Finland Experience",
    description: c.intro,
    path: "southeast-finland",
    image: photoLibrary.hamina,
  });
}

export default async function SoutheastFinlandPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = copy[locale] ?? copy.en;
  const featureCards = [
    { title: locale === "fi" ? "Ruoka & kahvilat" : locale === "es" ? "Gastronomía y cafés" : "Food & cafés", icon: Utensils, text: c.food },
    { title: locale === "fi" ? "Luonto & ulkoilu" : locale === "es" ? "Naturaleza y aire libre" : "Nature & outdoors", icon: Mountain, text: c.nature },
    { title: locale === "fi" ? "Kulttuuri & historia" : locale === "es" ? "Cultura e historia" : "Culture & history", icon: Landmark, text: c.culture },
    { title: locale === "fi" ? "Meri & saaristo" : locale === "es" ? "Mar y archipiélago" : "Sea & archipelago", icon: Ship, text: c.coast },
  ];

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image
          src={photoLibrary.hamina}
          alt={locale === "fi" ? "Haminan historiallinen kaupunkimaisema" : locale === "es" ? "Paisaje histórico de Hamina" : "Historic Hamina streetscape"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-950/10" />
        <div className="container-narrow relative py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.96] sm:text-7xl lg:text-8xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.visitkotkahamina.fi/en/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
              {c.official}<ArrowUpRight className="h-4 w-4" />
            </a>
            <Link href={"/" + locale + "/destinations/southeast-finland"} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-bold text-white">
              {locale === "fi" ? "Avaa kohdesivu" : locale === "es" ? "Abrir destino" : "Open destination"}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.places.map((place) => (
            <article key={place.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
              <div className="flex items-center gap-4 border-b border-slate-100 bg-brand-50 p-5">
                <MapPin className="h-6 w-6 text-brand-700" />
                <h2 className="font-display text-2xl font-bold text-brand-950">{place.name}</h2>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-slate-600">{place.description}</p>
                <a href={place.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-brand-700">
                  {c.direct}<ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-narrow grid gap-5 md:grid-cols-2">
          {featureCards.map(({ title, icon: Icon, text }) => (
            <article key={title} className="rounded-[1.75rem] bg-white p-7 shadow-soft">
              <Icon className="h-6 w-6 text-brand-700" />
              <h2 className="mt-4 font-display text-2xl font-bold text-brand-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="container-narrow mt-7">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <MapPin className="h-6 w-6 text-amber-700" />
            <p className="mt-3 text-sm leading-6 text-slate-700">{c.note}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-narrow flex flex-col gap-6 rounded-[2rem] bg-brand-950 p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{c.next}</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Salo · Mathildedal · Naantali · Turku · Hanko · Åland · Porvoo</h2>
          </div>
          <Link href={"/" + locale + "/coastal-finland"} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {c.next}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
