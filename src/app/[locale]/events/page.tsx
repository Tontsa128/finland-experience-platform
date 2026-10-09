import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { saloEvents } from "@/lib/salo";
import { naantaliEvents } from "@/lib/naantali";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";

const heroImage = "https://cdn-datahub.visitfinland.com/images/2c7e7830-f614-11f0-ad78-29bd5b45e175.jpeg?s=1800";

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value + "T12:00:00"));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const copy = locale === "fi"
    ? { title: "Tapahtumat Varsinais-Suomessa | Finland Experience", description: "Salon, Mathildedalin, Teijon ja Naantalin tapahtumia sekä linkit järjestäjien ajantasaisiin kalentereihin." }
    : locale === "es"
      ? { title: "Eventos en el suroeste de Finlandia | Finland Experience", description: "Eventos de Salo, Mathildedal, Teijo y Naantali con enlaces a los calendarios oficiales de los organizadores." }
      : { title: "Events in Southwest Finland | Finland Experience", description: "Events in Salo, Mathildedal, Teijo and Naantali, with links to official organizer calendars." };
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "events", image: heroImage });
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const today = new Date().toISOString().slice(0, 10);
  const events = [...saloEvents, ...naantaliEvents]
    .filter((event) => (event.end || event.start) >= today)
    .sort((a, b) => a.start.localeCompare(b.start));

  const eventSchema = events.slice(0, 40).map((event) => ({
    "@type": "Event",
    name: event.title[locale] || event.title.en || event.title.fi,
    startDate: event.start,
    endDate: event.end || event.start,
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.location, address: { "@type": "PostalAddress", addressCountry: "FI" } },
    url: event.url,
  }));

  const copy = locale === "fi"
    ? {
        eyebrow: "Salo · Mathildedal · Teijo · Naantali",
        title: "Tapahtumat, joiden vuoksi kannattaa jäädä yöksi.",
        intro: "Poimimme Salon seudun syksyn, joulun ja vuodenvaihteen tapahtumia. Tiedot muuttuvat, joten tarkista aina järjestäjän oma sivu ennen lähtöä.",
        all: "Katso ajantasaiset tapahtumat",
        month: "Tapahtumat",
        provider: "Siirry järjestäjän sivulle",
        mathildedalTitle: "Syksy, joulu ja uusi vuosi",
        mathildedalText: "Mathildedalin oma tapahtumasivu päivittyy jatkuvasti. Sieltä löydät kylän pienempiä jooga-, sauna-, ravintola- ja kulttuuritapahtumia.",
        mathildedalCta: "Visit Mathildedalin tapahtumat",
        naantaliTitle: "Naantalin tapahtumakalenteri",
        naantaliText: "Naantalin tapahtumat päivittyvät Visit Naantalin kalenteriin. Tarkista aina järjestäjän oma sivu ennen matkaa.",
        naantaliCta: "Visit Naantalin tapahtumat",
        verifyTitle: "Tarkista ajantasainen kalenteri ennen matkaa",
        verifyText: "Finland Experience Platform toimii inspiraatio- ja löytöpalveluna. Tapahtuman järjestäjä vastaa tapahtumasta, lipuista, varauksista ja maksuista.",
        verifyCta: "Tutustu Naantalin kohteisiin",
      }
    : locale === "es"
      ? {
          eyebrow: "Salo · Mathildedal · Teijo · Naantali",
          title: "Eventos que hacen que quieras quedarte una noche más.",
          intro: "Una selección de eventos de otoño, Navidad y Año Nuevo. Los datos cambian, así que comprueba siempre la web del organizador.",
          all: "Ver eventos actualizados",
          month: "Eventos",
          provider: "Ir a la página del organizador",
          mathildedalTitle: "Otoño, Navidad y Año Nuevo",
          mathildedalText: "La página de eventos de Mathildedal se actualiza con actividades de yoga, sauna, restaurantes y vida local.",
          mathildedalCta: "Eventos de Visit Mathildedal",
          naantaliTitle: "Calendario de eventos de Naantali",
          naantaliText: "Los eventos de Naantali se actualizan en Visit Naantali. Comprueba siempre la web del organizador.",
          naantaliCta: "Eventos de Visit Naantali",
          verifyTitle: "Comprueba el calendario actualizado antes de viajar",
          verifyText: "Finland Experience Platform es un servicio de inspiración y descubrimiento. El organizador responde de eventos, entradas, reservas y pagos.",
          verifyCta: "Descubre Naantali",
        }
      : {
          eyebrow: "Salo · Mathildedal · Teijo · Naantali",
          title: "Events worth staying an extra night for.",
          intro: "A curated selection of autumn, Christmas and New Year's events. Details can change, so always check the organizer's own page before travelling.",
          all: "See current events",
          month: "Events",
          provider: "Visit organizer",
          mathildedalTitle: "Autumn, Christmas & New Year",
          mathildedalText: "Mathildedal's own event page is updated with smaller yoga, sauna, restaurant and village events.",
          mathildedalCta: "Visit Mathildedal events",
          naantaliTitle: "Naantali's event calendar",
          naantaliText: "Naantali events are updated on Visit Naantali. Always check the organizer's own website before travelling.",
          naantaliCta: "Visit Naantali events",
          verifyTitle: "Check the current calendar before travelling",
          verifyText: "Finland Experience Platform is an inspiration and discovery service. Organizers are responsible for events, tickets, reservations and payments.",
          verifyCta: "Explore Naantali",
        };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": eventSchema }) }} />
      <section className="relative min-h-[56vh] overflow-hidden bg-brand-950 text-white">
        <Image src={heroImage} alt={copy.title} fill priority sizes="100vw" className="object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/45 to-brand-950/10" />
        <div className="container-narrow relative flex min-h-[56vh] items-end py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{copy.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[.98] sm:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">{copy.intro}</p>
            <a href="https://visitsalo.fi/tapahtumat/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
              {copy.all}<ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">2026</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-brand-950 sm:text-5xl">{copy.month}</h2>
          </div>
          <CalendarDays className="hidden h-8 w-8 text-gold-500 sm:block" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-brand-600">
                <span>{formatDate(event.start, locale)}</span>
                {event.end ? <><span>→</span><span>{formatDate(event.end, locale)}</span></> : null}
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-brand-950">{event.title[locale] || event.title.en || event.title.fi}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><MapPin className="h-4 w-4" />{event.location}</p>
              <p className="mt-4 leading-7 text-slate-600">{event.description[locale] || event.description.en || event.description.fi}</p>
              <a href={event.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{copy.provider}<ArrowRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="container-narrow grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">Mathildedal</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-950">{copy.mathildedalTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{copy.mathildedalText}</p>
            <a href="https://visitmathildedal.fi/fi/tapahtumat" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{copy.mathildedalCta}<ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">Naantali</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-950">{copy.naantaliTitle}</h2>
            <p className="mt-4 leading-7 text-slate-600">{copy.naantaliText}</p>
            <a href="https://visitnaantali.com/tapahtumat/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{copy.naantaliCta}<ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-[2rem] bg-brand-950 p-8 text-white md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-gold-300">Salo & Naantali</p>
            <h2 className="mt-3 font-display text-3xl font-bold">{copy.verifyTitle}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-white/70">{copy.verifyText}</p>
            <Link href={"/" + locale + "/destinations/naantali"} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-300">{copy.verifyCta}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
