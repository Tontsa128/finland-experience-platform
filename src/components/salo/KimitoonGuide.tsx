import Link from "next/link";
import type { Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { KansakouluSpotlight } from "@/components/home/KansakouluSpotlight";

type Category = "majoitus" | "ruoka" | "luonto" | "kulttuuri" | "saaristo" | "tapahtumat";

const copy = {
  fi: {
    eyebrow: "Saariston portti · Varsinais-Suomi",
    title: "Kemiö ja Kemiönsaari",
    intro: "Saavu saariston rytmiin. Tutustu satamiin, kyliin, lähiruokaan, historiaan ja merellisiin retkiin – omaan tahtiin, paikallisia tekijöitä arvostaen.",
    storyTitle: "Saaristo, jossa on tilaa hengittää",
    story: "Kemiönsaari on portti Saaristomeren kansallispuistoon ja saaristoon, jossa kylät, satamat, metsät ja merimaisemat vaihtuvat lyhyiden ajomatkojen ja veneyhteyksien varrella. Taalintehtaan ruukkihistoria, Kemiön kulttuurikohteet ja etelän Kasnäsin yhteydet ulkosaaristoon tekevät alueesta monipuolisen tukikohdan.",
    explore: "Tutustu alueeseen",
    categories: "Suunnittele oma saaristopäiväsi",
    places: "Paikallisia paikkoja ja elämyksiä",
    events: "Tapahtumat ja paikallinen elämä",
    eventsText: "Markkinat, konsertit, työpajat ja kylien omat tapahtumat tuovat saaristoon elämää eri vuodenaikoina. Ajankohtaiset päivät ja ilmoittautumiset kannattaa tarkistaa järjestäjien kalenterista.",
    plan: "Näin saavut",
    planText: "Kemiönsaarelle pääsee autolla ja bussilla. Turusta matka kestää yleensä alle tunnin ja Helsingistä noin kaksi tuntia, mutta jatkoyhteydet saaristoon kannattaa suunnitella etukäteen. Kasnäs toimii tärkeänä yhteyspaikkana ulkosaaristoon.",
    official: "Virallinen matkailusivusto",
    visit: "Katso lisätiedot",
    source: "Kuva ja lähde",
    category: {
      majoitus: ["Majoitu saariston rauhassa", "Pienet majatalot, mökit ja merelliset majoituskohteet – tarkista saatavuus ja varaus suoraan palveluntarjoajalta."],
      ruoka: ["Maista paikallisia makuja", "Kahvilat, leipomot, satamaravintolat ja lähiruokatuottajat nostavat esiin saariston omat raaka-aineet."],
      luonto: ["Lähde luontoon", "Saaristomeren kansallispuisto, rannat, metsäpolut ja saarten vaihtelevat maisemat tarjoavat retkiä eri tasoisille kulkijoille."],
      kulttuuri: ["Historiaa ja kulttuuria", "Taalintehtaan ruukkiperintö, Sagalundin museo ja paikalliset kulttuuritilat kertovat alueen elämästä ennen ja nyt."],
      saaristo: ["Satamat ja ulkosaaret", "Kasnäs, Rosala, Bengtskär ja muut saaristokohteet avaavat näkymiä merelle. Tarkista lautta- ja veneyhteydet ennen matkaa."],
      tapahtumat: ["Kohtaa paikallinen saaristo", "Tapahtumakalenteri kokoaa markkinoita, konsertteja, näyttelyitä ja yhteisöllisiä tapahtumia. Varmista ajankohta järjestäjältä."]
    }
  },
  en: {
    eyebrow: "Gateway to the archipelago · Southwest Finland",
    title: "Kimitoön and the Archipelago",
    intro: "Find your own island rhythm. Explore harbours, villages, local food, history and sea adventures at an unhurried pace, supporting local businesses along the way.",
    storyTitle: "An archipelago with room to breathe",
    story: "Kimitoön is a gateway to the Archipelago Sea National Park and an island region of villages, harbours, forests and changing seascapes. Dalsbruk's ironworks heritage, cultural attractions around Kimito and connections from Kasnäs to the outer islands make the area a versatile base for exploring.",
    explore: "Explore the region",
    categories: "Plan your own island day",
    places: "Local places and experiences",
    events: "Events and local life",
    eventsText: "Markets, concerts, workshops and village events bring the islands to life throughout the year. Check current dates and registration details with the official event calendar.",
    plan: "Getting here",
    planText: "Kimitoön is accessible by car and bus. The drive usually takes under an hour from Turku and around two hours from Helsinki, but onward island connections should be planned ahead. Kasnäs is an important hub for trips to the outer archipelago.",
    official: "Official tourism website",
    visit: "More information",
    source: "Photo and source",
    category: {
      majoitus: ["Stay close to island life", "Discover guesthouses, cottages and seaside stays. Check availability and book directly with each provider."],
      ruoka: ["Taste local flavours", "Cafés, bakeries, harbour restaurants and local producers showcase the ingredients and flavours of the archipelago."],
      luonto: ["Head outdoors", "The Archipelago Sea National Park, shorelines, forest trails and varied island landscapes offer routes for different abilities."],
      kulttuuri: ["History and culture", "Dalsbruk's ironworks heritage, Sagalund open-air museum and local cultural venues tell the story of island life past and present."],
      saaristo: ["Harbours and outer islands", "Kasnäs, Rosala, Bengtskär and other island destinations open up the seascape. Check ferry and boat connections before travelling."],
      tapahtumat: ["Meet the local archipelago", "The event calendar features markets, concerts, exhibitions and community events. Confirm dates with organisers."]
    }
  },
  es: {
    eyebrow: "Puerta al archipiélago · Suroeste de Finlandia",
    title: "Kimitoön y el archipiélago",
    intro: "Encuentra tu propio ritmo isleño. Descubre puertos, pueblos, sabores locales, historia y excursiones por mar sin prisas y apoyando a los negocios locales.",
    storyTitle: "Un archipiélago con espacio para respirar",
    story: "Kimitoön es la puerta al Parque Nacional del Mar del Archipiélago y a una región de pueblos, puertos, bosques y paisajes marítimos cambiantes. La historia industrial de Dalsbruk, los lugares culturales de Kimito y las conexiones desde Kasnäs hacia las islas exteriores convierten la zona en una base versátil para explorar.",
    explore: "Explora la región",
    categories: "Planifica tu día en las islas",
    places: "Lugares y experiencias locales",
    events: "Eventos y vida local",
    eventsText: "Mercados, conciertos, talleres y eventos de los pueblos animan las islas durante todo el año. Consulta las fechas y la inscripción en el calendario oficial.",
    plan: "Cómo llegar",
    planText: "Se puede llegar a Kimitoön en coche y autobús. El trayecto suele durar menos de una hora desde Turku y unas dos horas desde Helsinki; conviene planificar con antelación las conexiones marítimas. Kasnäs es un importante punto de conexión con las islas exteriores.",
    official: "Web oficial de turismo",
    visit: "Más información",
    source: "Foto y fuente",
    category: {
      majoitus: ["Alójate junto al archipiélago", "Descubre casas de huéspedes, cabañas y alojamientos junto al mar. Comprueba la disponibilidad y reserva directamente."],
      ruoka: ["Saborea los productos locales", "Cafeterías, panaderías, restaurantes portuarios y productores locales muestran los sabores del archipiélago."],
      luonto: ["Sal a la naturaleza", "El Parque Nacional del Mar del Archipiélago, las costas, los senderos forestales y los paisajes isleños ofrecen rutas variadas."],
      kulttuuri: ["Historia y cultura", "El patrimonio industrial de Dalsbruk, el museo al aire libre Sagalund y los espacios culturales cuentan la vida local de ayer y hoy."],
      saaristo: ["Puertos e islas exteriores", "Kasnäs, Rosala, Bengtskär y otros destinos muestran el paisaje marítimo. Comprueba las conexiones de ferry y barco antes de viajar."],
      tapahtumat: ["Conoce la vida local", "El calendario reúne mercados, conciertos, exposiciones y actividades comunitarias. Confirma las fechas con los organizadores."]
    }
  }
};

const categories: { id: Category; title: Record<Locale, string>; image: string; url: string }[] = [
  { id: "saaristo", title: { fi: "Saaristo ja satamat", en: "Islands and harbours", es: "Islas y puertos" }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/dalsbruk-gasthamn1-1-760x507.jpg", url: "https://www.visitkimitoon.fi/fi/suunnittele/vierasvenesatamat/" },
  { id: "luonto", title: { fi: "Luonto ja retket", en: "Nature and trails", es: "Naturaleza y rutas" }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/oro-flygbilder6-760x427.jpg", url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/luonto-ulkoilu/" },
  { id: "kulttuuri", title: { fi: "Historia ja kulttuuri", en: "History and culture", es: "Historia y cultura" }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg", url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/vierailukohteet/" },
  { id: "ruoka", title: { fi: "Kahvilat ja paikalliset maut", en: "Cafés and local flavours", es: "Cafeterías y sabores locales" }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg", url: "https://www.visitkimitoon.fi/fi/syo-ja-majoitu/ravintolat-kahvilat/" },
  { id: "majoitus", title: { fi: "Majoitus", en: "Places to stay", es: "Alojamiento" }, image: "https://cdn.johku.com/rosala/largefiles/577.jpg", url: "https://www.visitkimitoon.fi/fi/syo-ja-majoitu/majoitus/" },
  { id: "tapahtumat", title: { fi: "Tapahtumat", en: "Events", es: "Eventos" }, image: photoLibrary.rosalaVikingHall, url: "https://www.visitkimitoon.fi/fi/nae-ja-koe/tapahtumat/tapahtumakalenteri/" }
];

const places = [
  { title: "Taalintehdas", sub: { fi: "Ruukkihistoriaa, vierasvenesatama ja kylän palvelut.", en: "Ironworks heritage, guest harbour and village services.", es: "Patrimonio industrial, puerto deportivo y servicios del pueblo." }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2026/04/Visitkimito_NLux_cJaskaPoikonen-1472-1162x657.jpg", url: "https://www.visitkimitoon.fi/fi/" },
  { title: "Kasnäs", sub: { fi: "Satama ja yhteydet ulkosaaristoon.", en: "Harbour and connections to the outer islands.", es: "Puerto y conexiones con las islas exteriores." }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2024/07/Kasnas-gasthamn-760x507.jpg", url: "https://www.visitkimitoon.fi/fi/suunnittele/kemionsaareen/" },
  { title: "Rosala ja Bengtskär", sub: { fi: "Viikinkihistoriaa, saaristoretkiä ja majakkamaisemia.", en: "Viking history, island excursions and lighthouse scenery.", es: "Historia vikinga, excursiones y paisajes de faros." }, image: photoLibrary.rosalaVikingCentre, url: "https://rosala-viking-centre.johku.com/" },
  { title: "Sagalund", sub: { fi: "Ulkomuseo ja paikallista kulttuuriperintöä Kemiössä.", en: "Open-air museum and local heritage in Kimito.", es: "Museo al aire libre y patrimonio local en Kimito." }, image: "https://www.visitkimitoon.fi/wp-content/uploads/sites/2/2023/05/sagalund30-760x507.jpg", url: "https://www.sagalund.fi/" }
];

export function KimitoonGuide({ locale, category }: { locale: Locale; category?: Category }) {
  const t = copy[locale];
  const visibleCategories = category ? categories.filter((item) => item.id === category) : categories;
  const detail = category ? t.category[category] : null;
  return (
    <div className="bg-white">
      {!category ? (
        <>
          <section className="relative isolate overflow-hidden bg-brand-950 text-white">
            <img src={photoLibrary.rosalaVikingCentre} alt={t.title} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-65" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/45 to-black/10" />
            <div className="container-narrow flex min-h-[65vh] items-end py-16 sm:min-h-[72vh] sm:py-24">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{t.eyebrow}</p>
                <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{t.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{t.intro}</p>
                <a href="https://www.visitkimitoon.fi/fi/" target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-bold text-brand-950">{t.official} ↗</a>
              </div>
            </div>
          </section>
          <section className="container-narrow grid gap-8 py-14 sm:py-20 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{t.eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.storyTitle}</h2></div>
            <p className="text-lg leading-8 text-slate-700">{t.story}</p>
          </section>
        </>
      ) : (
        <section className="bg-brand-950 py-16 text-white sm:py-20">
          <div className="container-narrow"><p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{t.title}</p><h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">{detail?.[0] ?? t.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">{detail?.[1] ?? ""}</p><Link href={`/${locale}/destinations/kemionsaari`} className="mt-6 inline-flex font-bold text-gold-300 underline">{locale === "fi" ? "Takaisin Kemiönsaaren oppaaseen" : locale === "es" ? "Volver a la guía de Kimitoön" : "Back to the Kimitoön guide"} →</Link></div>
        </section>
      )}
      {!category || category === "ruoka" ? <KansakouluSpotlight locale={locale} /> : null}
      <section className="container-narrow py-14 sm:py-20">
        {!category ? <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{t.explore}</p><h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.categories}</h2></div> : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link href={`/${locale}/destinations/kemionsaari/${item.id}`} className="block">
                <div className="relative h-56 overflow-hidden bg-stone-100"><img src={item.image} alt={item.title[locale]} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5"><h3 className="font-display text-xl font-bold text-brand-950">{item.title[locale]}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{t.category[item.id][1]}</p><span className="mt-4 inline-flex text-sm font-bold text-brand-800">{locale === "fi" ? "Tutustu" : locale === "es" ? "Descubrir" : "Explore"} →</span></div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      {!category ? <>
        <section className="bg-stone-50 py-14 sm:py-20"><div className="container-narrow"><h2 className="mb-7 font-display text-3xl font-bold text-brand-950">{t.places}</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{places.map((place) => <article key={place.title} className="overflow-hidden rounded-2xl border border-stone-200 bg-white"><img src={place.image} alt={place.title} loading="lazy" className="h-48 w-full object-cover"/><div className="p-4"><h3 className="font-display text-xl font-bold text-brand-950">{place.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{place.sub[locale]}</p><a href={place.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-bold text-brand-800 underline">{t.visit} ↗</a></div></article>)}</div></div></section>
        <section className="container-narrow grid gap-8 py-14 sm:py-20 lg:grid-cols-2"><div><h2 className="font-display text-3xl font-bold text-brand-950">{t.events}</h2><p className="mt-4 leading-7 text-slate-600">{t.eventsText}</p><a href="https://www.visitkimitoon.fi/fi/nae-ja-koe/tapahtumat/tapahtumakalenteri/" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-stone-300 px-5 py-3 font-bold text-brand-950">{t.visit} ↗</a></div><div><h2 className="font-display text-3xl font-bold text-brand-950">{t.plan}</h2><p className="mt-4 leading-7 text-slate-600">{t.planText}</p><a href="https://www.visitkimitoon.fi/fi/suunnittele/kemionsaareen/" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-stone-300 px-5 py-3 font-bold text-brand-950">{t.visit} ↗</a></div></section>
      </> : null}
      <section className="container-narrow pb-12"><p className="text-xs leading-5 text-slate-500">{t.source}: <a className="underline" href="https://www.visitkimitoon.fi/fi/" target="_blank" rel="noreferrer">Visit Kemiönsaari</a> · <a className="underline" href="https://www.visitkimitoon.fi/fi/kohteet/" target="_blank" rel="noreferrer">{t.visit}</a></p></section>
    </div>
  );
}
