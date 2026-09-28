import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { saloEvents } from "@/lib/salo";
import { naantaliEvents } from "@/lib/naantali";

const heroImage = "https://cdn-datahub.visitfinland.com/images/2c7e7830-f614-11f0-ad78-29bd5b45e175.jpeg?s=1800";

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value + "T12:00:00"));
}

export default async function EventsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const events = [...saloEvents, ...naantaliEvents].sort((a, b) => a.start.localeCompare(b.start));
  const copy = locale === "fi"
    ? {
        eyebrow: "Salo · Mathildedal · Teijo · Naantali",
        title: "Tapahtumat, joiden vuoksi kannattaa jäädä yöksi.",
        intro: "Poimimme Salon seudun syksyn, joulun ja vuodenvaihteen tapahtumia yhdelle sivulle. Tiedot elävät – tarkista aina järjestäjän oma sivu ennen lähtöä.",
        all: "Katso kaikki tapahtumat Visit Salossa ja Naantalissa",
        month: "Tapahtumat",
        provider: "Siirry järjestäjän sivulle",
      }
    : locale === "es"
      ? {
          eyebrow: "Salo · Mathildedal · Teijo · Naantali",
          title: "Eventos que hacen que quieras quedarte una noche más.",
          intro: "Hemos reunido una selección de eventos de otoño, Navidad y Año Nuevo. Los datos cambian, así que comprueba siempre la página del organizador.",
          all: "Ver todos los eventos en Visit Salo y Visit Naantali",
          month: "Eventos",
          provider: "Ir a la página del organizador",
        }
      : {
          eyebrow: "Salo · Mathildedal · Teijo · Naantali",
          title: "Events worth staying an extra night for.",
          intro: "A curated selection of autumn, Christmas and New Year's events. Details can change, so always check the organizer's own page before travelling.",
          all: "See all events on Visit Salo and Visit Naantali",
          month: "Events",
          provider: "Visit organizer",
        };

  return (
    <div className="bg-white">
      <section className="relative min-h-[56vh] overflow-hidden bg-brand-950 text-white">
        <Image src={heroImage} alt="Mathildedal, Salo" fill priority sizes="100vw" className="object-cover opacity-65" />
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
              <h2 className="mt-3 font-display text-2xl font-bold text-brand-950">{event.title[locale]}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500"><MapPin className="h-4 w-4" />{event.location}</p>
              <p className="mt-4 leading-7 text-slate-600">{event.description[locale]}</p>
              <a href={event.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
                {copy.provider}<ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14">
        <div className="container-narrow grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">Mathildedal</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-950">Syksy, joulu ja uusi vuosi</h2>
            <p className="mt-4 leading-7 text-slate-600">Mathildedalin oma tapahtumasivu päivittyy jatkuvasti. Sieltä löydät kylän pienemmät joogat, saunat, ravintolaillat ja muut ohjelmat.</p>
            <a href="https://visitmathildedal.fi/fi/tapahtumat" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800">Visit Mathildedalin tapahtumat <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">Naantali</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-950">Naantalin oma tapahtumakalenteri</h2>
            <p className="mt-4 leading-7 text-slate-600">Naantalin tapahtumat päivittyvät Visit Naantalin kalenteriin. Tarkista aina järjestäjän oma sivu ennen matkaa.</p>
            <a href="https://visitnaantali.com/tapahtumat/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800">Visit Naantalin tapahtumat <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-[2rem] bg-brand-950 p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-gold-300">Salo & Naantali</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Tarkista ajantasainen kalenteri ennen matkaa</h2>
            <p className="mt-4 leading-7 text-white/70">Finland Experience Platform toimii inspiraatio- ja löytöpalveluna. Tapahtuman järjestäjä vastaa tapahtumasta, lipuista, varauksista ja maksuista.</p>
            <Link href={`/${locale}/destinations/naantali`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-300">Tutustu Naantalin kohteisiin <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
