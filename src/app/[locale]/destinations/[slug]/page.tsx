import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, MapPin, Sparkles } from "lucide-react";
import { getPublishedDestinations } from "@/lib/public-content";
import { destinations as fallbackDestinations, getLocalized } from "@/lib/data";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { NaantaliDirectory } from "@/components/naantali/NaantaliDirectory";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const cmsDestinations = await getPublishedDestinations();
  const canonicalSlug = slug === "mathildedal" ? "salo-mathildedal" : slug;
  const source = cmsDestinations.length ? cmsDestinations : fallbackDestinations;
  const destination = source.find((item) => item.slug === slug) ?? source.find((item) => item.slug === canonicalSlug);
  if (!destination) return {};
  const seo = destination.seo?.[locale] as { title?: string; description?: string } | undefined;
  return buildLocalizedMetadata({
    locale,
    title: seo?.title || getLocalized(destination.name, locale),
    description: seo?.description || getLocalized(destination.shortDescription, locale),
    path: "destinations/" + destination.slug,
    image: destination.images[0],
  });
}

export default async function DestinationDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const cmsDestinations = await getPublishedDestinations();
  const destinations = cmsDestinations.length ? cmsDestinations : fallbackDestinations;
  const canonicalSlug = slug === "mathildedal" ? "salo-mathildedal" : slug;
  const d = destinations.find((x) => x.slug === slug) ?? destinations.find((x) => x.slug === canonicalSlug);
  if (!d) notFound();

  const isCoastal = ["salo-mathildedal", "naantali", "turku", "rosala", "hanko", "aland", "southeast-finland"].includes(d.slug);
  const isNaantali = d.slug === "naantali";
  const isMathildedal = d.slug === "salo-mathildedal" || d.slug === "mathildedal";
  const regionalGuides: Record<string, string> = {
    "salo-mathildedal": "salo",
    "mathildedal": "salo", turku: "turku", naantali: "naantali", hanko: "hanko", rosala: "kimitoon", aland: "aland", porvoo: "porvoo", "southeast-finland": "southeast-finland",
  };
  const regionalGuidePath = regionalGuides[d.slug];
  const travelInfo = locale === "fi" ? d.travel_info_fi : locale === "es" ? d.travel_info_es : d.travel_info_en;

  const destinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: getLocalized(d.name, locale),
    description: getLocalized(d.shortDescription, locale),
    image: d.images,
    geo: d.coordinates
      ? { "@type": "GeoCoordinates", latitude: d.coordinates.lat, longitude: d.coordinates.lng }
      : undefined,
    touristType: locale === "es" ? "Spanish travellers" : "International travellers",
  };

  const copy = locale === "fi"
    ? {
        eyebrow: "Suomen kesä alkaa tästä",
        dream: "Kuvittele itsesi täällä.",
        dreamText: isNaantali
          ? "Vanha puukaupunki, satama, meri ja saariston valo – päivä, jossa kävely, kahvi ja meri kuuluvat samaan rytmiin."
          : isMathildedal
            ? "Vanha ruukkikylä, meri, metsät ja käsityöläisten pieni maailma – paikka, jossa päivä hidastuu luonnostaan."
            : isCoastal
              ? "Meri, kallio, saariston valo ja pitkät kesäillat – maisema, jossa ei tarvitse kiirehtiä."
              : "Järvet, metsät, pitkät valoisat illat ja tunne siitä, ettei mihinkään ole kiire.",
        exploreStays: "Löydä majoitus",
        exploreExperiences: "Etsi elämyksiä",
        tips: "Näin koet kohteen",
        tipText: d.travel_info_fi || "Yhdistä tähän kohteeseen sauna, luonto, paikallinen ruoka ja yksi elämyksellinen kesäpäivä.",
        summerIdea: "Täydellinen kesäpäivä",
        summerText: isCoastal
          ? "Aloita kävelyllä rannalla tai vanhassa kylässä, vietä iltapäivä meren äärellä ja anna illan jatkua valoisassa kesäillassa."
          : "Aloita aamulla luonnosta, vietä iltapäivä veden äärellä ja anna illan jatkua auringonlaskuun asti.",
        back: "Takaisin kohteisiin",
      }
    : locale === "es"
      ? {
          eyebrow: "Así empieza tu verano en Finlandia",
          dream: "Imagínate aquí.",
          dreamText: isNaantali
          ? "Casas de madera, puerto, mar y luz del archipiélago: un día para caminar, parar a tomar un café y disfrutar de la costa."
          : isMathildedal
            ? "Un antiguo pueblo siderúrgico, mar, bosques y pequeños talleres: un lugar para bajar el ritmo."
            : isCoastal
              ? "Mar, rocas, luz del archipiélago y largas tardes de verano: un paisaje para ir sin prisas."
              : "Un lago tranquilo, bosques infinitos y noches tan luminosas que el tiempo parece detenerse.",
          exploreStays: "Encontrar alojamiento",
          exploreExperiences: "Descubrir experiencias",
          tips: "Cómo vivir el destino",
          tipText: d.travel_info_es || "Combina naturaleza, sauna, gastronomía local y una experiencia especial de verano.",
          summerIdea: "Un día de verano perfecto",
          summerText: isCoastal
          ? "Empieza junto al mar o en el casco histórico, pasa la tarde en la costa y deja que la luz del verano continúe hasta tarde."
          : "Empieza entre naturaleza, disfruta del agua por la tarde y deja que la noche continúe bajo el sol de medianoche.",
          back: "Volver a destinos",
        }
      : {
          eyebrow: "This is where your Finnish summer begins",
          dream: "Imagine yourself here.",
          dreamText: isNaantali
          ? "Wooden houses, a guest harbour, the sea and archipelago light — a place made for walking, lingering and discovering."
          : isMathildedal
            ? "A historic ironworks village, sea, forest and small makers — a place where the day naturally slows down."
            : isCoastal
              ? "Sea, granite rocks, archipelago light and long summer evenings — a landscape with room to breathe."
              : "A quiet lake, endless forests and bright summer evenings when there is simply no need to hurry.",
          exploreStays: "Find a place to stay",
          exploreExperiences: "Discover experiences",
          tips: "How to experience it",
          tipText: d.travel_info_en || "Combine nature, sauna, local food and one unforgettable summer experience.",
          summerIdea: "Your perfect summer day",
          summerText: isCoastal
          ? "Start by the sea or in the old town, spend the afternoon on the coast and let the bright summer evening stretch late."
          : "Start in nature, spend the afternoon by the water and let the evening stretch beneath the midnight sun.",
          back: "Back to destinations",
        };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }} />
      <section className="relative isolate min-h-[68vh] overflow-hidden">
        {d.images[0] ? <Image src={d.images[0]} alt={getLocalized(d.name, locale)} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
        <div className="container-narrow relative flex min-h-[68vh] items-end py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.22em] text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">{getLocalized(d.name, locale)}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">{getLocalized(d.shortDescription, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/accommodations`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">{copy.exploreStays}<ArrowRight className="h-4 w-4" /></Link>
              <Link href={`/${locale}/experiences`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/15">{copy.exploreExperiences}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{copy.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">{copy.dream}</h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-600">{copy.dreamText}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{getLocalized(d.description, locale)}</p>
          </div>
          <div className="rounded-[2rem] bg-brand-950 p-7 text-white shadow-card sm:p-9">
            <Sparkles className="h-7 w-7 text-amber-300" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[.16em] text-white/60">{copy.summerIdea}</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug">{copy.summerText}</p>
            <Link href={`/${locale}/contact`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-amber-200">{copy.tips}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {d.slug === "naantali" ? <NaantaliDirectory locale={locale} /> : null}


      <section className="container-narrow py-14 sm:py-20">
        <div className="mb-9 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Kohdeopas" : locale === "es" ? "Guía del destino" : "Destination guide"}</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{locale === "fi" ? "Mitä täällä kannattaa kokea?" : locale === "es" ? "Qué merece la pena vivir aquí" : "What is worth experiencing here?"}</h2>
        </div>
        {d.activities?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.activities.map((activity) => (
              <article key={activity} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <Sparkles className="h-5 w-5 text-brand-700" />
                <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{activity}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{locale === "fi" ? "Tarkista ajantasaiset tiedot ja mahdolliset varaukset suoraan palveluntarjoajalta." : locale === "es" ? "Comprueba la información actual y las posibles reservas directamente con el proveedor." : "Check current details and any booking requirements directly with the provider."}</p>
              </article>
            ))}
          </div>
        ) : null}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <MapPin className="h-6 w-6 text-brand-700" />
            <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{locale === "fi" ? "Sijainti" : locale === "es" ? "Ubicación" : "Location"}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{d.region}</p>
            {d.coordinates ? <a href={"https://www.google.com/maps/search/?api=1&query=" + d.coordinates.lat + "," + d.coordinates.lng} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa kartalla" : locale === "es" ? "Abrir en el mapa" : "Open map"} <ArrowUpRight className="h-4 w-4" /></a> : null}
          </article>
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <BedDouble className="h-6 w-6 text-brand-700" />
            <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{locale === "fi" ? "Majoitus" : locale === "es" ? "Alojamiento" : "Accommodation"}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{d.accommodationIds?.length ? (locale === "fi" ? "Kohteeseen liittyvää majoitusta löytyy Finland Experiencen majoitusosiosta." : locale === "es" ? "Encontrarás alojamientos relacionados con este destino en nuestra sección de alojamiento." : "Related stays are available in the Finland Experience accommodation directory.") : (locale === "fi" ? "Tarkista alueen ajantasainen majoitustarjonta virallisesta matkailuoppaasta." : locale === "es" ? "Consulta la oferta actual de alojamiento en la guía turística oficial." : "Check current accommodation options in the official tourism guide.")}</p>
            <Link href={"/" + locale + "/accommodations"} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{copy.exploreStays} <ArrowRight className="h-4 w-4" /></Link>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <Sparkles className="h-6 w-6 text-brand-700" />
            <h3 className="mt-4 font-display text-xl font-bold text-brand-950">{locale === "fi" ? "Paikallinen tieto" : locale === "es" ? "Información local" : "Local information"}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{travelInfo || (locale === "fi" ? "Tarkista reitit, sesonki, aukioloajat ja palveluiden saatavuus ennen matkaa." : locale === "es" ? "Comprueba rutas, temporada, horarios y disponibilidad antes del viaje." : "Check routes, season, opening hours and service availability before travelling.")}</p>
            {regionalGuidePath ? <Link href={"/" + locale + "/" + regionalGuidePath} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa alueopas" : locale === "es" ? "Abrir guía regional" : "Open regional guide"} <ArrowRight className="h-4 w-4" /></Link> : null}
          </article>
        </div>
        {d.tags?.length ? <div className="mt-8 flex flex-wrap gap-2">{d.tags.map((tag) => <span key={tag} className="rounded-full bg-brand-50 px-4 py-2 text-sm text-brand-800">{tag}</span>)}</div> : null}
      </section>

      {d.slug === "porvoo" ? (
        <section className="bg-brand-50 py-14 sm:py-18">
          <div className="container-narrow">
            <div className="grid gap-8 rounded-[2rem] bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">
                  {locale === "fi" ? "Porvoon oma rytmi" : locale === "es" ? "El ritmo de Porvoo" : "Porvoo in its own rhythm"}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
                  {locale === "fi" ? "Vanha Porvoo ja jokiranta" : locale === "es" ? "Casco antiguo y río de Porvoo" : "Old Porvoo & the riverside"}
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {locale === "fi"
                    ? "Mutkittelevat mukulakivikadut, punaiset jokimakasiinit, kahvilat, ravintolat ja putiikit tekevät vanhasta kaupungista kohteen, jossa kannattaa viipyä."
                    : locale === "es"
                      ? "Calles empedradas, almacenes rojos junto al río, cafés, restaurantes y pequeñas tiendas hacen que el casco antiguo merezca más que una visita rápida."
                      : "Cobbled streets, red-ochre riverside warehouses, cafés, restaurants and boutiques make Old Porvoo worth more than a quick stop."}
                </p>
              </div>
              <a href="https://www.visitporvoo.fi/en/sights/old-porvoo/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
                {locale === "fi" ? "Tutustu Visit Porvooseen" : locale === "es" ? "Visitar Porvoo" : "Visit Porvoo"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {d.slug === "rosala" ? (
        <section className="bg-brand-50 py-14 sm:py-20">
          <div className="container-narrow">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{locale === "fi" ? "Rosalan saariston oma elämys" : locale === "es" ? "Una experiencia propia del archipiélago" : "A distinctive archipelago experience"}</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
                  {locale === "fi" ? "Rosalan Viikinkikeskus & Bed & Breakfast" : locale === "es" ? "Centro Vikingo de Rosala & Bed & Breakfast" : "Rosala Viking Centre & Bed & Breakfast"}
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  {locale === "fi"
                    ? "Rosalassa voi yöpyä viikinkien maailmaan rakennetussa ympäristössä. Päällikön hallissa on kolme huonetta, lisäksi suuren salin alkoveissa tai viikinkiteltassa voi majoittua. Majoitukseen kuuluu iltasauna ja aamiainen. Viikinkikylässä voi kokeilla esimerkiksi miekkailua, varpa-peliä ja puujalkakävelyä, ja iltaan voi yhdistää Rodeborgin viikinki-illallisen."
                    : locale === "es"
                      ? "En Rosala puedes alojarte en un entorno inspirado en la época vikinga. El salón del jefe ofrece tres habitaciones, además de alcobas y tiendas vikingas. La estancia incluye sauna nocturna y desayuno. En el poblado se pueden probar actividades inspiradas en la vida vikinga y completar la visita con una cena temática en Rodeborg."
                      : "Rosala offers accommodation in a Viking-inspired setting. The chieftain's hall has three rooms, with further alcoves and Viking-tent options. The stay includes an evening sauna and breakfast. The village also offers Viking-themed activities, with the option of a themed dinner at Rodeborg."}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                  {locale === "fi" ? "Rosalan Viikinkikeskus sijaitsee Rosalan saarella Kemiönsaaressa. Saarelle pääsee veneellä tai Kasnäsista lautalla." : locale === "es" ? "El Centro Vikingo de Rosala está en la isla de Rosala, en Kemiönsaari. Se puede llegar en barco o en ferry desde Kasnäs." : "Rosala Viking Centre is on Rosala island in Kemiönsaari, reached by boat or ferry from Kasnäs."}
                </p>
              </div>
              <a href="https://rosala.fi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-800">
                {locale === "fi" ? "Siirry Rosalan omille sivuille" : locale === "es" ? "Ir a la web de Rosala" : "Visit Rosala directly"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {[
                { image: photoLibrary.rosalaVikingCentre, title: locale === "fi" ? "Viikinkikylä" : locale === "es" ? "Poblado vikingo" : "Viking village", text: locale === "fi" ? "Historiallinen ympäristö, jossa voi tutustua viikinkiajan elämään ja näyttelyihin." : locale === "es" ? "Entorno histórico para conocer la vida y la cultura de la época vikinga." : "A historical setting to explore Viking-age life and exhibitions." },
                { image: photoLibrary.rosalaVikingHall, title: locale === "fi" ? "Yöpyminen & sauna" : locale === "es" ? "Alojamiento & sauna" : "Stay & sauna", text: locale === "fi" ? "Päällikön hallin huoneet, alkovi- tai telttamajoitus sekä iltasauna ja aamiainen." : locale === "es" ? "Habitaciones, alcobas o tienda vikinga, con sauna nocturna y desayuno." : "Rooms, alcoves or a Viking tent, with evening sauna and breakfast." },
              ].map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft">
                  <div className="relative aspect-[16/9]">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="p-5"><h3 className="font-display text-2xl font-bold text-brand-950">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}      <section className="bg-slate-50">
        <div className="container-narrow py-14 sm:py-18">
          <h2 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">{copy.tips}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{copy.tipText}</p>
          {d.tags.length > 0 && <div className="mt-7 flex flex-wrap gap-2">{d.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-4 py-2 text-sm text-brand-800 shadow-sm">{tag}</span>)}</div>}
          <Link href={`/${locale}/destinations`} className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-600">{copy.back}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
