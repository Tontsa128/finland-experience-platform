import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { ArrowRight, ArrowUpRight, Building2, Coffee, MapPin, Sparkles, Waves } from "lucide-react";

type City = {
  key: "helsinki" | "tampere" | "turku";
  name: string;
  image: string;
  place: string;
  text: Record<Locale, string>;
  href: string;
  hrefLabel: Record<Locale, string>;
};

const cities: City[] = [
  {
    key: "helsinki",
    name: "Helsinki",
    image: photoLibrary.helsinkiHarbour,
    place: "Helsinki · Baltic Sea",
    text: {
      fi: "Meri, design, kaupunkikulttuuri ja pitkät kesäillat. Helsinki toimii helposti lyhyen kaupunkiloman tukikohtana myös saaristopäivälle.",
      es: "Mar, diseño, cultura urbana y largas tardes de verano. Helsinki funciona como base para una escapada corta y una jornada junto al mar.",
      en: "Sea, design, city culture and long summer evenings. Helsinki works well as a base for a short city break and a day by the sea.",
    },
    href: "https://www.myhelsinki.fi/",
    hrefLabel: { fi: "Tutustu MyHelsinkiin", es: "Descubre MyHelsinki", en: "Explore MyHelsinki" },
  },
  {
    key: "tampere",
    name: "Tampere",
    image: photoLibrary.tampereTammerkoski,
    place: "Tampere · Lakes · Tammerkoski",
    text: {
      fi: "Järvet, Tammerkoski, kulttuuri ja sauna tekevät Tampereesta erilaisen kaupunkikohteen. Päivään voi yhdistää järvimaiseman ja ilta­saunan.",
      es: "Lagos, Tammerkoski, cultura y sauna crean una escapada urbana diferente. El día puede combinar ciudad, agua y una sauna por la tarde.",
      en: "Lakes, Tammerkoski, culture and sauna make Tampere a distinctive city break. A day can move naturally between the city, the water and an evening sauna.",
    },
    href: "https://visittampere.fi/en/",
    hrefLabel: { fi: "Tutustu Visit Tampereeseen", es: "Descubre Visit Tampere", en: "Explore Visit Tampere" },
  },
  {
    key: "turku",
    name: "Turku",
    image: photoLibrary.turkuAura,
    place: "Turku · Aura River · Archipelago",
    text: {
      fi: "Aurajoki, historia, ravintolat ja saaristo tekevät Turusta luontevan yhdistelmän kaupunkipäivää ja meren läheisyyttä.",
      es: "El río Aura, la historia, la gastronomía y el archipiélago hacen de Turku una combinación natural de ciudad y mar.",
      en: "The Aura River, history, food and the archipelago make Turku a natural combination of city life and the sea.",
    },
    href: "https://en.visitturku.fi/see-and-do",
    hrefLabel: { fi: "Tutustu Turkuun", es: "Descubre Turku", en: "Explore Turku" },
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const copy = locale === "fi"
    ? {
        title: "Kaupunkiloma Suomessa | Helsinki, Tampere ja Turku",
        description: "Yhdistä suomalainen kaupunkikulttuuri, ruoka, sauna, meri ja luonto viikonloppulomaksi.",
      }
    : locale === "es"
      ? {
          title: "Escapadas urbanas en Finlandia | Helsinki, Tampere y Turku",
          description: "Combina cultura urbana, gastronomía, sauna, mar y naturaleza en una escapada finlandesa.",
        }
      : {
          title: "City Breaks in Finland | Helsinki, Tampere & Turku",
          description: "Combine Finnish city culture, food, sauna, sea and nature in a memorable city break.",
        };

  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "city-breaks" });
}

export default async function CityBreaksPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;

  const copy = locale === "fi"
    ? {
        eyebrow: "Kaupunki kohtaa Suomen luonnon",
        title: "Viikonloppu, josta tulee muisto",
        intro: "Helsinki, Tampere tai Turku — kolme erilaista tapaa nähdä suomalainen kesä.",
        cta: "Tutki elämyksiä",
        stay: "Löydä majoitus",
        directTitle: "Suunnittele oma kaupunkilomasi",
        directText: "Finland Experience Platform toimii inspiraatio- ja löytöpalveluna. Valitset kohteet itse, ja mahdolliset varaukset sekä maksut tehdään suoraan palveluntarjoajille.",
        routeTitle: "Yhdistä kaupunki ja saaristo",
        routeText: "Turku antaa helpon lähtökohdan saaristoon, Tampere yhdistää kaupungin järvimaisemiin ja Helsinki tuo meren aivan keskustan tuntumaan.",
      }
    : locale === "es"
      ? {
          eyebrow: "La ciudad se encuentra con la naturaleza",
          title: "Un fin de semana que recordarás",
          intro: "Helsinki, Tampere o Turku: tres formas diferentes de vivir el verano finlandés.",
          cta: "Descubrir experiencias",
          stay: "Encontrar alojamiento",
          directTitle: "Diseña tu propia escapada",
          directText: "Finland Experience Platform es un servicio de inspiración y descubrimiento. Tú eliges los destinos y las reservas y pagos se realizan directamente con cada proveedor.",
          routeTitle: "Combina ciudad y archipiélago",
          routeText: "Turku conecta de forma natural con el archipiélago, Tampere con los lagos y Helsinki con el mar en pleno centro.",
        }
      : {
          eyebrow: "Where city meets Finnish nature",
          title: "A weekend worth remembering",
          intro: "Helsinki, Tampere or Turku — three different ways to experience Finnish summer.",
          cta: "Explore experiences",
          stay: "Find a place to stay",
          directTitle: "Design your own city break",
          directText: "Finland Experience Platform is an inspiration and discovery service. You choose the destinations, while any bookings and payments are handled directly with the provider.",
          routeTitle: "Combine the city with the archipelago",
          routeText: "Turku connects naturally to the archipelago, Tampere to its lakes, and Helsinki to the sea right beside the city centre.",
        };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: locale === "fi" ? "Kaupunkiloma Suomessa" : locale === "es" ? "Escapadas urbanas en Finlandia" : "City breaks in Finland",
    description: copy.intro,
    touristType: locale === "es" ? "Spanish travellers" : "International travellers",
    containsPlace: cities.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image
          src={photoLibrary.turkuAura}
          alt={locale === "fi" ? "Turun Aurajoki kesällä" : locale === "es" ? "Río Aura de Turku en verano" : "Turku Aura River in summer"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/10" />
        <div className="container-narrow relative py-20 sm:py-28 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.98] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85 sm:text-xl">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/experiences`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">
              {copy.cta}<ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/${locale}/accommodations`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/15 px-6 py-3.5 text-sm font-bold text-white backdrop-blur hover:bg-white/10">
              {copy.stay}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Helsinki · Tampere · Turku</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.routeTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">{copy.routeText}</p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {cities.map((city, index) => (
            <article key={city.key} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
                <Image src={city.image} alt={city.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" priority={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-white/75">
                    <MapPin className="h-3.5 w-3.5" />{city.place}
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-bold">{city.name}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-7 text-slate-600">{city.text[locale]}</p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <a href={city.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-600">
                    {city.hrefLabel[locale]}<ArrowUpRight className="h-4 w-4" />
                  </a>
                  {city.key === "turku" ? <Link href={`/${locale}/turku`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-600">
                    {locale === "fi" ? "Avaa Turku-opas" : locale === "es" ? "Abrir guía de Turku" : "Open Turku guide"}<ArrowRight className="h-4 w-4" />
                  </Link> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] bg-white p-7 shadow-soft">
            <Building2 className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">Helsinki</h2>
            <p className="mt-3 leading-7 text-slate-600">{locale === "fi" ? "Lyhyt kaupunkiloma, jossa meri ja kaupunkikulttuuri ovat lähellä toisiaan." : locale === "es" ? "Una escapada corta donde el mar y la vida urbana están siempre cerca." : "A short city break where the sea and urban culture stay close."}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft">
            <Waves className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">Tampere</h2>
            <p className="mt-3 leading-7 text-slate-600">{locale === "fi" ? "Järvimaisemaa, Tammerkoski ja sauna samassa kompaktissa kaupunkikohteessa." : locale === "es" ? "Lagos, Tammerkoski y sauna en una escapada urbana compacta." : "Lakes, Tammerkoski and sauna in a compact city break."}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-7 shadow-soft">
            <Coffee className="h-7 w-7 text-brand-700" />
            <h2 className="mt-5 font-display text-2xl font-bold text-brand-950">Turku</h2>
            <p className="mt-3 leading-7 text-slate-600">{locale === "fi" ? "Aurajoki, ravintolat, historia ja saariston läheisyys antavat viikonlopulle monta rytmiä." : locale === "es" ? "Río Aura, restaurantes, historia y archipiélago ofrecen varios ritmos para el fin de semana." : "The Aura River, food, history and the archipelago give the weekend several different rhythms."}</p>
          </article>
        </div>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="rounded-[2rem] bg-brand-950 p-8 text-white sm:p-12">
          <Sparkles className="h-7 w-7 text-gold-300" />
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold sm:text-5xl">{copy.directTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{copy.directText}</p>
          <Link href={`/${locale}/accommodations`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
            {copy.stay}<ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
