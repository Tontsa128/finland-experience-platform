"use client";

import Link from "next/link";
import type { Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";

type Place = "rosala" | "bengtskar";

const content = {
  fi: {
    back: "Takaisin Kemiönsaaren oppaaseen",
    region: "Kemiönsaari · Saaristo",
    rosala: {
      title: "Rosala – saariston oma rytmi",
      intro: "Tutustu Hiittisten saaristoon, Rosalan viikinkiperinteeseen ja merellisiin retkiin. Suunnittele yhteydet etukäteen ja tarkista palveluiden kausittaiset aukioloajat suoraan järjestäjiltä.",
      imageAlt: "Rosalan viikinkikeskus ja saaristokohde",
      aboutTitle: "Saarikylä ja viikinkien historia",
      about: "Rosala tunnetaan viikinkikeskuksestaan ja yhteyksistään Bengtskärin majakalle. Alue sopii matkailijalle, joka haluaa yhdistää saaristomaisemat, paikallisen historian ja merellisen retkipäivän.",
      highlightsTitle: "Mitä tehdä Rosalassa?",
      highlights: [
        ["Rosalan Viikinkikeskus", "Tutustu viikinkiajan elämään ja tarkista vierailun ajankohta sekä palvelut keskuksen omilta sivuilta.", "https://rosala.fi/"],
        ["Meriretket ja Bengtskär", "Kesäkaudella tarjolla voi olla yhdistelmäretkiä Rosalaan ja Bengtskärin majakalle. Retket ovat kausiluonteisia ja sääolosuhteista riippuvaisia.", "https://rosala.net/fi/tidtabeller/"],
        ["Saaristomaisemat", "Varaa aikaa rauhalliseen kiertelyyn ja tarkista etukäteen, mitkä palvelut ovat avoinna vierailusi aikana.", "https://www.visitkimitoon.fi/fi/"]
      ],
      travelTitle: "Näin saavut",
      travel: "Kasnäsin ja Långnäsin välinen M/S Aurora -autolautta kulkee Rosalan suuntaan ympäri vuoden. Ylitys kestää noin 30 minuuttia, on maksuton eikä ennakkovarausta yleensä tarvita. Långnäsistä Rosalan Viikinkikeskukseen on noin viisi kilometriä. Tarkista aina liikennöitsijän ajantasaiset aikataulut ennen lähtöä.",
      ferry: "M/S Aurora – virallinen lauttatieto",
      schedule: "Tarkista ajantasaiset aikataulut",
      booking: "Retket ja vierailut",
      practicalTitle: "Ennen matkaa",
      practical: ["Tarkista lautta-aikataulu ja mahdolliset poikkeukset matkustuspäivälle.", "Varmista risteilyjen, Viikinkikeskuksen ja muiden palveluiden kausi sekä aukiolo.", "Varaa sääolosuhteille joustoa, erityisesti meriretkille."],
      source: "Viralliset lisätiedot",
      sourceText: "Visit Kemiönsaari",
    },
    bengtskar: {
      title: "Bengtskär – majakka avomerellä",
      intro: "Bengtskärin majakka on vaikuttava merellinen retkikohde ulkosaaristossa. Vierailu vaatii kuljetuksen meritse, joten aikataulut, sää ja kausittainen saatavuus on tarkistettava ennen matkaa.",
      imageAlt: "Bengtskärin majakka ja avomeri",
      aboutTitle: "Majakka, historia ja avomeri",
      about: "Bengtskär tunnetaan korkeasta majakastaan, näyttelyistä ja merellisestä sijainnistaan. Kohteen palvelut ja vierailumahdollisuudet ovat kausiluonteisia, ja merisää voi vaikuttaa liikennöintiin.",
      highlightsTitle: "Mitä vierailuun kuuluu?",
      highlights: [
        ["Majakka ja historia", "Tutustu majakan historiaan ja paikan päällä tarjolla oleviin näyttelyihin, kun kohde on avoinna.", "https://bengtskar.fi/"],
        ["Merimatka", "Tarkista lähtöpaikka, retken kesto, saatavuus ja sääehdot suoraan retken järjestäjältä.", "https://rosala.net/fi/tidtabeller/"],
        ["Rosala ja Hiittinen", "Yhdistä retkeen Rosalan Viikinkikeskus tai tutustu Hiittisten saaristoon, jos aikataulu ja yhteydet sopivat.", "https://rosala.fi/"]
      ],
      travelTitle: "Suunnittele meriyhteys",
      travel: "Bengtskärille ei ajeta autolla; vierailu edellyttää järjestettyä merikuljetusta. Lähtöpaikat, retkipäivät ja aikataulut vaihtelevat kauden mukaan. Älä luota vanhoihin aikataulukuviin, vaan tarkista tiedot aina palveluntarjoajan ajantasaiselta sivulta.",
      ferry: "Rosala ja Bengtskär – järjestäjän tiedot",
      schedule: "Tarkista ajantasaiset retket ja aikataulut",
      booking: "Varaa retki suoraan järjestäjältä",
      practicalTitle: "Ennen matkaa",
      practical: ["Varmista retken toteutuminen ja lähtöpaikka järjestäjältä.", "Pukeudu avomeren tuuleen ja vaihtelevaan säähän.", "Tarkista kohteen esteettömyys ja palvelut omalta viralliselta sivulta."],
      source: "Viralliset lisätiedot",
      sourceText: "Visit Kemiönsaari",
    }
  },
  en: {
    back: "Back to the Kimitoön guide",
    region: "Kimitoön · Archipelago",
    rosala: {
      title: "Rosala – island life at its own pace",
      intro: "Discover the Hiittinen archipelago, Rosala’s Viking heritage and sea excursions. Plan connections ahead and confirm seasonal opening hours directly with each operator.",
      imageAlt: "Rosala Viking Centre and archipelago destination",
      aboutTitle: "An island village with Viking heritage",
      about: "Rosala is known for its Viking Centre and connections to Bengtskär Lighthouse. It suits travellers who want to combine island scenery, local history and a day on the sea.",
      highlightsTitle: "Things to do in Rosala",
      highlights: [
        ["Rosala Viking Centre", "Explore the Viking Age and check visiting dates and services on the centre’s own website.", "https://rosala.fi/"],
        ["Sea excursions and Bengtskär", "Seasonal trips may combine Rosala and Bengtskär Lighthouse. Excursions depend on the season and weather.", "https://rosala.net/fi/tidtabeller/"],
        ["Archipelago scenery", "Allow time to explore at a relaxed pace and confirm which services are open during your visit.", "https://www.visitkimitoon.fi/fi/"]
      ],
      travelTitle: "Getting there",
      travel: "The M/S Aurora car ferry connects Kasnäs and Långnäs towards Rosala year-round. The crossing takes about 30 minutes, is free and generally does not require advance booking. Rosala Viking Centre is about five kilometres from Långnäs. Always check the operator’s current timetable before travelling.",
      ferry: "M/S Aurora – official ferry information",
      schedule: "Check current timetables",
      booking: "Excursions and visits",
      practicalTitle: "Before you go",
      practical: ["Check the ferry timetable and travel-day service notices.", "Confirm seasonal opening and availability for cruises, the Viking Centre and other services.", "Allow flexibility for weather, especially for sea excursions."],
      source: "Official visitor information",
      sourceText: "Visit Kimitoön",
    },
    bengtskar: {
      title: "Bengtskär – a lighthouse out at sea",
      intro: "Bengtskär Lighthouse is a remarkable maritime destination in the outer archipelago. Reaching it requires a boat transfer, so check schedules, weather and seasonal availability before travelling.",
      imageAlt: "Bengtskär Lighthouse and the open sea",
      aboutTitle: "Lighthouse, history and open sea",
      about: "Bengtskär is known for its tall lighthouse, exhibitions and exposed maritime setting. Visitor services are seasonal, and sea conditions can affect transport.",
      highlightsTitle: "What to experience",
      highlights: [
        ["The lighthouse and its history", "Explore the lighthouse history and exhibitions available when the site is open.", "https://bengtskar.fi/"],
        ["The boat journey", "Confirm departure point, duration, availability and weather conditions with the excursion operator.", "https://rosala.net/fi/tidtabeller/"],
        ["Rosala and Hiittinen", "Combine the trip with Rosala Viking Centre or explore Hiittinen if the schedule and connections allow.", "https://rosala.fi/"]
      ],
      travelTitle: "Plan your boat connection",
      travel: "Bengtskär cannot be reached by car; visitors need an organised boat transfer. Departure points, operating days and schedules vary by season. Do not rely on old timetable images—check the operator’s current information.",
      ferry: "Rosala and Bengtskär – operator information",
      schedule: "Check current trips and timetables",
      booking: "Book directly with the operator",
      practicalTitle: "Before you go",
      practical: ["Confirm the trip, departure point and operating status with the operator.", "Dress for wind and changeable weather at sea.", "Check accessibility and facilities on the destination’s official website."],
      source: "Official visitor information",
      sourceText: "Visit Kimitoön",
    }
  },
  es: {
    back: "Volver a la guía de Kimitoön",
    region: "Kimitoön · Archipiélago",
    rosala: {
      title: "Rosala: la vida isleña a su propio ritmo",
      intro: "Descubre el archipiélago de Hiittinen, el legado vikingo de Rosala y las excursiones por mar. Planifica las conexiones y confirma los horarios de temporada directamente con cada operador.",
      imageAlt: "Centro Vikingo de Rosala y destino del archipiélago",
      aboutTitle: "Un pueblo isleño con historia vikinga",
      about: "Rosala es conocida por su Centro Vikingo y por las conexiones con el faro de Bengtskär. Es ideal para combinar paisajes insulares, historia local y una excursión marítima.",
      highlightsTitle: "Qué hacer en Rosala",
      highlights: [
        ["Centro Vikingo de Rosala", "Descubre la época vikinga y consulta las fechas de visita y los servicios en la web del centro.", "https://rosala.fi/"],
        ["Excursiones marítimas y Bengtskär", "En temporada puede haber excursiones que combinan Rosala y el faro de Bengtskär. Dependen de la temporada y del tiempo.", "https://rosala.net/fi/tidtabeller/"],
        ["Paisajes del archipiélago", "Reserva tiempo para explorar sin prisas y confirma qué servicios están abiertos durante tu visita.", "https://www.visitkimitoon.fi/fi/"]
      ],
      travelTitle: "Cómo llegar",
      travel: "El ferry para coches M/S Aurora conecta Kasnäs y Långnäs durante todo el año en dirección a Rosala. La travesía dura unos 30 minutos, es gratuita y normalmente no requiere reserva previa. El Centro Vikingo de Rosala está a unos cinco kilómetros de Långnäs. Comprueba siempre el horario vigente antes de salir.",
      ferry: "M/S Aurora: información oficial del ferry",
      schedule: "Consultar horarios actualizados",
      booking: "Excursiones y visitas",
      practicalTitle: "Antes de viajar",
      practical: ["Consulta el horario del ferry y posibles avisos para el día del viaje.", "Confirma la temporada y apertura de cruceros, el Centro Vikingo y otros servicios.", "Ten flexibilidad por el tiempo, especialmente para las excursiones marítimas."],
      source: "Información oficial para visitantes",
      sourceText: "Visit Kimitoön",
    },
    bengtskar: {
      title: "Bengtskär: un faro en mar abierto",
      intro: "El faro de Bengtskär es un destino marítimo excepcional en el archipiélago exterior. Para llegar se necesita transporte en barco; comprueba horarios, meteorología y disponibilidad estacional antes de viajar.",
      imageAlt: "El faro de Bengtskär y el mar abierto",
      aboutTitle: "Faro, historia y mar abierto",
      about: "Bengtskär es conocido por su alto faro, sus exposiciones y su ubicación expuesta al mar. Los servicios son estacionales y las condiciones marítimas pueden afectar al transporte.",
      highlightsTitle: "Qué descubrir",
      highlights: [
        ["El faro y su historia", "Descubre la historia del faro y las exposiciones disponibles cuando el lugar está abierto.", "https://bengtskar.fi/"],
        ["La travesía en barco", "Confirma con el operador el punto de salida, la duración, la disponibilidad y las condiciones meteorológicas.", "https://rosala.net/fi/tidtabeller/"],
        ["Rosala y Hiittinen", "Combina la visita con el Centro Vikingo de Rosala o explora Hiittinen si los horarios y conexiones lo permiten.", "https://rosala.fi/"]
      ],
      travelTitle: "Planifica la conexión marítima",
      travel: "No se puede llegar a Bengtskär en coche; hace falta un traslado organizado en barco. Los puntos de salida, los días de operación y los horarios varían según la temporada. No dependas de imágenes antiguas de horarios: consulta la información vigente del operador.",
      ferry: "Rosala y Bengtskär: información del operador",
      schedule: "Consultar excursiones y horarios actuales",
      booking: "Reserva directamente con el operador",
      practicalTitle: "Antes de viajar",
      practical: ["Confirma con el operador la salida, el punto de encuentro y el servicio.", "Lleva ropa adecuada para el viento y el tiempo cambiante en el mar.", "Consulta la accesibilidad y los servicios en la web oficial del destino."],
      source: "Información oficial para visitantes",
      sourceText: "Visit Kimitoön",
    }
  }
} as const;

const ferryUrl = "https://rosala.fi/fi/bilfarjan-ms-aurora/";
const scheduleUrl = "https://rosala.net/fi/tidtabeller/";

export function KimitoonPlaceDetail({ locale, place }: { locale: Locale; place: Place }) {
  const t = content[locale][place];
  const common = content[locale];
  const heroImage = place === "rosala" ? photoLibrary.rosalaVikingCentre : "https://www.bengtskar.fi/wp-content/uploads/2024/05/SisselOchFyren-2-1024x512.jpg";
  const galleryPhotos = place === "rosala"
    ? [
        { src: "https://rosala.fi/wp-content/uploads/2016/04/rosala-farmansgarden-2.jpg", alt: { fi: "Rosalan viikinkikylän historiallinen pihapiiri", en: "The historic setting of Rosala Viking Village", es: "El entorno histórico de la aldea vikinga de Rosala" } },
        { src: "https://rosala.fi/wp-content/uploads/2016/04/rosala-farmansgarden-8.jpg", alt: { fi: "Rosalan viikinkikylän rakennuksia", en: "Buildings in Rosala Viking Village", es: "Edificios de la aldea vikinga de Rosala" } },
        { src: "https://rosala.fi/wp-content/uploads/2016/04/rosala-farmansgarden-4.jpg", alt: { fi: "Viikinkikylän miljöö Rosalassa", en: "The Viking village atmosphere in Rosala", es: "El ambiente de la aldea vikinga en Rosala" } },
        { src: "https://rosala.fi/wp-content/uploads/2016/04/rosala-farmansgarden-5.jpg", alt: { fi: "Rosalan viikinkikeskuksen ulkoalue", en: "Outdoor area at Rosala Viking Centre", es: "Zona exterior del Centro Vikingo de Rosala" } },
      ]
    : [
        { src: "https://www.bengtskar.fi/wp-content/uploads/2024/05/SisselOchFyren-2-1024x512.jpg", alt: { fi: "Bengtskärin majakka ja avomeri", en: "Bengtskär Lighthouse and the open sea", es: "El faro de Bengtskär y el mar abierto" } },
        { src: "https://www.bengtskar.fi/wp-content/uploads/2018/04/kahvi-ja-pulla.jpg", alt: { fi: "Kahvihetki Bengtskärin majakalla", en: "Coffee break at Bengtskär Lighthouse", es: "Una pausa para tomar café en el faro de Bengtskär" } },
        { src: "https://www.bengtskar.fi/wp-content/uploads/2018/07/n%C3%A4e-ja-koe.jpg", alt: { fi: "Bengtskärin majakkasaaren nähtävyydet", en: "Sights and experiences on Bengtskär Lighthouse Island", es: "Lugares y experiencias en la isla del faro de Bengtskär" } },
      ];
  const galleryTitle = place === "rosala"
    ? (locale === "fi" ? "Kuvia Rosalan viikinkikeskuksesta" : locale === "es" ? "Imágenes del Centro Vikingo de Rosala" : "Rosala Viking Centre gallery")
    : (locale === "fi" ? "Kuvia Bengtskärin majakalta" : locale === "es" ? "Imágenes del faro de Bengtskär" : "Bengtskär Lighthouse gallery");

  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <img src={heroImage} alt={t.imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/55 to-brand-950/10" />
        <div className="container-narrow flex min-h-[58vh] items-end py-16 sm:min-h-[68vh] sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{common.region}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={place === "rosala" ? "https://rosala.fi/" : "https://bengtskar.fi/"} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-semibold text-brand-950 transition hover:bg-gold-100">{t.booking}</a>
              <a href={scheduleUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10">{t.schedule}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow grid gap-10 py-14 md:grid-cols-[1.15fr_.85fr] md:py-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{common.region}</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{t.aboutTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">{t.about}</p>
          <h2 className="mt-10 font-display text-2xl font-bold">{t.highlightsTitle}</h2>
          <div className="mt-5 grid gap-4">
            {t.highlights.map(([title, description, url]) => (
              <article key={title} className="rounded-2xl border border-slate-200 p-5 sm:p-6">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{description}</p>
                <a href={url} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold text-brand-700 underline underline-offset-4">{t.sourceText} ↗</a>
              </article>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-3xl bg-slate-50 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold">{t.travelTitle}</h2>
          <p className="mt-4 leading-7 text-slate-700">{t.travel}</p>
          <div className="mt-6 grid gap-3">
            <a href={ferryUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold hover:border-brand-700">{t.ferry} ↗</a>
            <a href={scheduleUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 font-semibold hover:border-brand-700">{t.schedule} ↗</a>
          </div>
          <h3 className="mt-8 text-lg font-bold">{t.practicalTitle}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
            {t.practical.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </section>

      <section className="container-narrow py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{common.region}</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{galleryTitle}</h2>
          </div>
          <a href={place === "rosala" ? "https://rosala.fi/en/galleri/" : "https://www.bengtskar.fi/en/photo-gallery/"} target="_blank" rel="noreferrer" className="font-semibold text-brand-800 underline underline-offset-4">
            {locale === "fi" ? "Katso palveluntarjoajan kuvagalleria" : locale === "es" ? "Ver la galería oficial" : "View the provider's photo gallery"} ↗
          </a>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryPhotos.map((photo) => (
            <figure key={photo.src} className="group overflow-hidden rounded-2xl bg-stone-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={photo.src} alt={photo.alt[locale]} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <figcaption className="p-3 text-xs leading-5 text-slate-600">{photo.alt[locale]} · {place === "rosala" ? "rosala.fi" : "bengtskar.fi"}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-10 sm:py-14">
        <div className="container-narrow flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-700">{t.source}</p>
            <p className="mt-1 text-slate-700">
              {place === "rosala"
                ? locale === "fi" ? "Pääkuva: Rosala & Bengtskär Booking Office / Rosalan Viikinkikeskus" : locale === "es" ? "Imagen principal: Rosala & Bengtskär Booking Office / Centro Vikingo de Rosala" : "Hero photo: Rosala & Bengtskär Booking Office / Rosala Viking Centre"
                : locale === "fi" ? "Pääkuva: Bengtskärin majakka" : locale === "es" ? "Imagen principal: Faro de Bengtskär" : "Hero photo: Bengtskär Lighthouse"}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/destinations/kemionsaari`} className="font-semibold text-brand-800 underline underline-offset-4">{common.back}</Link>
            <a href="https://www.visitkimitoon.fi/fi/kohteet/" target="_blank" rel="noreferrer" className="font-semibold text-brand-800 underline underline-offset-4">{t.sourceText} ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
