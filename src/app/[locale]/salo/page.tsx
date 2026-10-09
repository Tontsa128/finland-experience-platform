import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Camera, Compass, Flame, Map, Mountain, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import { destinations as fallbackDestinations } from "@/lib/data";

const copy = {
  fi: {
    title: "Salo – meri, metsä, ruukkikylät ja paikallinen elämä",
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
    title: "Salo – mar, bosques, pueblos históricos y vida local",
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
    title: "Salo – sea, forests, ironworks villages and local life",
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
  return buildLocalizedMetadata({ locale, title: c.title, description: c.desc, path: "salo", image: photoLibrary.saloVeturitalli });
}

export default async function SaloPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = copy[locale] || copy.en;
  const featured = fallbackDestinations.filter((d) => ["salo-mathildedal", "rosala"].includes(d.slug));

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saloVeturitalli} alt={locale === "fi" ? "Salon taidemuseo Veturitalli" : locale === "es" ? "Museo de Arte Veturitalli de Salo" : "Salo Art Museum Veturitalli"} fill priority sizes="100vw" className="object-cover opacity-45" />
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

      <section id="salo-places" className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Tutustu Salon seutuun" : locale === "es" ? "Explora la región de Salo" : "Explore the Salo region"}</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Yksi alue, monta erilaista paikkaa" : locale === "es" ? "Una región, muchos lugares diferentes" : "One region, many different places"}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{locale === "fi" ? "Aloita Salon alueoppaasta ja valitse sen jälkeen oma kylä, saaristo tai nähtävyys. Jokainen linkki vie kyseistä paikkaa käsittelevälle sivulle tai sen viralliseen matkailuoppaaseen." : locale === "es" ? "Empieza con la guía regional de Salo y después elige un pueblo, una zona costera o un lugar de interés. Cada enlace conduce a una guía específica o a la web turística oficial del lugar." : "Start with the Salo regional guide, then choose a village, coastal area or attraction. Each link leads to a dedicated guide or the place's official tourism website."}</p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Mathildedal", place: "Mathildedal · ruukkikylä", image: photoLibrary.mathildedalHarbour, text: locale === "fi" ? "Ruukkikylä, majoitus, kahvilat, ravintolat, meri ja paikalliset elämykset." : locale === "es" ? "Pueblo histórico, alojamiento, cafés, restaurantes, mar y experiencias locales." : "Historic village, accommodation, cafés, restaurants, sea and local experiences.", href: `/${locale}/mathildedal`, internal: true },
              { name: "Teijo & kansallispuisto", place: "Teijo · luonto", image: photoLibrary.teijoNationalPark, text: locale === "fi" ? "Retkeilyreitit, järvet, metsät, melonta ja luontokeskuksen palvelut." : locale === "es" ? "Senderos, lagos, bosques, kayak y servicios del centro de naturaleza." : "Trails, lakes, forests, kayaking and nature-centre services.", href: "https://visitsalo.fi/teijon-kansallispuisto/", internal: false },
              { name: "Särkisalo & meri", place: "Särkisalo · saaristo", image: photoLibrary.sarkisalo, text: locale === "fi" ? "Merenrantamökit, satamat, kalastus, veneily ja saariston rauha." : locale === "es" ? "Cabañas junto al mar, puertos, pesca, navegación y tranquilidad insular." : "Seaside cottages, harbours, fishing, boating and island calm.", href: "https://visitsalo.fi/sarkisalo-ja-meri/", internal: false },
              { name: "Perniö", place: "Perniö · maaseutu", image: photoLibrary.saloVeturitalli, text: locale === "fi" ? "Maaseutumaisemat, historia, lähiruoka ja pienet paikalliset yritykset." : locale === "es" ? "Paisajes rurales, historia, productos locales y pequeños negocios." : "Rural landscapes, history, local food and small businesses.", href: "https://visitsalo.fi/", internal: false },
              { name: "Halikko & Wiurila", place: "Halikko · kartanot ja kulttuuri", image: photoLibrary.saloVeturitalli, text: locale === "fi" ? "Wiurilan kartano, näyttelyt, kulttuurihistoria, ruoka ja elämykset." : locale === "es" ? "La mansión Wiurila, exposiciones, patrimonio, gastronomía y experiencias." : "Wiurila Manor, exhibitions, heritage, food and experiences.", href: "https://visitsalo.fi/halikko/", internal: false },
              { name: "Kemiönsaari & Rosala", place: "Lähialue · saaristo", image: photoLibrary.rosalaVikingCentre, text: locale === "fi" ? "Rosalan Viikinkikeskus, Kasnäs, Bengtskär ja saaristomajoitus." : locale === "es" ? "Centro Vikingo de Rosala, Kasnäs, Bengtskär y alojamiento insular." : "Rosala Viking Centre, Kasnäs, Bengtskär and island stays.", href: `/${locale}/kimitoon`, internal: true },
            ].map((place) => (
              <article key={place.name} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
                <div className="relative aspect-[16/9]">
                  <Image src={place.image} alt={place.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[.15em] text-white/75">{place.place}</p><h3 className="mt-1 font-display text-2xl font-bold">{place.name}</h3></div>
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

      <section className="container-narrow py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((d) => <Link key={d.slug} href={d.slug === "salo-mathildedal" ? `/${locale}/mathildedal` : d.slug === "rosala" ? `/${locale}/kimitoon` : `/${locale}/destinations/${d.slug}`} className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 className="font-display text-2xl font-bold text-brand-950">{d.slug === "salo-mathildedal" ? "Mathildedal" : d.slug === "rosala" ? (locale === "fi" ? "Kemiönsaari & Rosala" : locale === "es" ? "Kemiönsaari y Rosala" : "Kemiönsaari & Rosala") : d.name[locale]}</h2><p className="mt-3 leading-7 text-slate-600">{d.shortDescription[locale]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa kohde" : locale === "es" ? "Abrir destino" : "Open destination"}<ArrowRight className="h-4 w-4" /></span></Link>)}
        </div>
      </section>

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
