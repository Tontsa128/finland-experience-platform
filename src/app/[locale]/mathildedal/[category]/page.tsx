import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BedDouble, Coffee, Compass, Flame, MapPin } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { mathildedalData, slugifyMathildedal } from "@/lib/mathildedal";

type Copy = { title: string; description: string; intro: string; eyebrow: string; back: string; openProvider: string; note: string; addressLabel: string; emptyNote: string };
const copy: Record<Locale, Record<string, Copy>> = {
  fi: {
    majoitus: { title: "Majoitus ja mökit Mathildedalissa", description: "Mathildedalin hotellit, mökkikylät, lomahuoneistot ja luontomajoitus – siirry varaamaan suoraan majoittajalta.", intro: "Tutustu Mathildedalin kylän ja aivan lähialueen majoituksiin. Tarkista saatavuus, hinnat, varustelu ja ehdot aina majoittajan omalta sivulta.", eyebrow: "Yövy Mathildedalissa", back: "Takaisin Mathildedaliin", openProvider: "Majoittajan sivuille", note: "Finnexprience esittelee vaihtoehdot. Varaus, maksu ja sopimus tehdään suoraan majoittajan kanssa.", addressLabel: "Osoite", emptyNote: "Aukioloajat, hinnat ja saatavuus voivat muuttua sesongin mukaan." },
    ruoka: { title: "Ruoka ja juoma Mathildedalissa", description: "Mathildedalin ravintolat, kahvilat, leipomot ja paikalliset ruokapaikat – valitse paikka ja siirry sen omille sivuille.", intro: "Kahvilat, ravintolat, satamaterassit ja kausittaiset ruokapaikat kuuluvat Mathildedalin kyläpäivään. Tarkista aukioloajat ja menu suoraan toimijalta.", eyebrow: "Paikalliset maut", back: "Takaisin Mathildedaliin", openProvider: "Ravintolan sivuille", note: "Listaus perustuu kohteen viralliseen matkailuoppaaseen. Sesonkipaikat voivat olla suljettuina osan vuodesta.", addressLabel: "Osoite", emptyNote: "Tarkista päivän aukiolo ja pöytävaraus suoraan ravintolasta." },
    aktiviteetit: { title: "Aktiviteetit ja luonto Mathildedalissa", description: "Tutustu Mathildedalin ja Teijon alueen retkeilyyn, melontaan, golfiin ja ulkoiluun.", intro: "Valitse rauhallinen kyläkävely, päivä Teijon kansallispuistossa tai aktiivinen retki vesille. Tarkista reittien olosuhteet ja palveluiden kausitiedot ennen lähtöä.", eyebrow: "Liiku ja tutki", back: "Takaisin Mathildedaliin", openProvider: "Tutustu palveluun", note: "Aktiviteettien saatavuus ja varauskäytännöt vaihtelevat palveluntarjoajan ja vuodenajan mukaan.", addressLabel: "Sijainti", emptyNote: "Varmista varusteet, reitit ja sääolosuhteet ennen retkeä." },
    elamykset: { title: "Sauna ja paikalliset elämykset", description: "Sauna, satama, ruukkikylän historia ja paikalliset elämykset Mathildedalissa.", intro: "Mathildedalissa yhdistyvät historiallinen ruukkimiljöö, meren läheisyys, sauna ja paikallisten tekijöiden pienet elämykset. Ota yhteyttä järjestäjään ja sovi yksityiskohdat suoraan.", eyebrow: "Koe kylän tunnelma", back: "Takaisin Mathildedaliin", openProvider: "Järjestäjän sivuille", note: "Elämykset eivät ole Finnexpriencen myymiä paketteja. Palvelut sovitaan ja maksetaan suoraan järjestäjälle.", addressLabel: "Sijainti", emptyNote: "Varmista toteutuminen ja varaus suoraan järjestäjältä." },
  },
  es: {
    majoitus: { title: "Alojamiento y cabañas en Mathildedal", description: "Hoteles, cabañas y alojamientos de Mathildedal; reserva directamente con cada proveedor.", intro: "Descubre alojamientos en el pueblo y sus alrededores. Comprueba disponibilidad, precios, equipamiento y condiciones en la web oficial de cada proveedor.", eyebrow: "Dormir en Mathildedal", back: "Volver a Mathildedal", openProvider: "Web del alojamiento", note: "Finnexprience presenta opciones; la reserva, el pago y el contrato se gestionan directamente con el alojamiento.", addressLabel: "Dirección", emptyNote: "Los precios y la disponibilidad pueden variar según la temporada." },
    ruoka: { title: "Restaurantes y cafés de Mathildedal", description: "Restaurantes, cafés y locales gastronómicos de Mathildedal con enlaces directos.", intro: "Cafés, restaurantes, terrazas junto al puerto y propuestas de temporada forman parte de la visita. Consulta horarios y menú directamente con cada establecimiento.", eyebrow: "Sabores locales", back: "Volver a Mathildedal", openProvider: "Web del establecimiento", note: "La lista se basa en la guía turística oficial del destino. Algunos locales son estacionales.", addressLabel: "Dirección", emptyNote: "Confirma los horarios y las reservas directamente con el establecimiento." },
    aktiviteetit: { title: "Actividades y naturaleza en Mathildedal", description: "Senderismo, kayak, golf y actividades al aire libre en Mathildedal y Teijo.", intro: "Elige un paseo por el pueblo, una jornada en el Parque Nacional de Teijo o una salida activa al agua. Comprueba las condiciones y la temporada antes de salir.", eyebrow: "Explora y disfruta", back: "Volver a Mathildedal", openProvider: "Ver actividad", note: "La disponibilidad y las reservas dependen del proveedor y de la temporada.", addressLabel: "Lugar", emptyNote: "Comprueba el equipo, las rutas y el tiempo antes de salir." },
    elamykset: { title: "Sauna y experiencias locales", description: "Sauna, puerto, historia industrial y experiencias locales en Mathildedal.", intro: "Mathildedal combina patrimonio industrial, mar, sauna y experiencias de pequeños negocios locales. Contacta directamente con los organizadores para concretar los detalles.", eyebrow: "Vive el ambiente local", back: "Volver a Mathildedal", openProvider: "Web del organizador", note: "Finnexprience no vende paquetes turísticos. Los servicios se acuerdan y pagan directamente al proveedor.", addressLabel: "Lugar", emptyNote: "Confirma la disponibilidad directamente con el organizador." },
  },
  en: {
    majoitus: { title: "Accommodation and cottages in Mathildedal", description: "Hotels, cottages and holiday stays in Mathildedal with direct links to accommodation providers.", intro: "Explore places to stay in the village and nearby. Check availability, prices, facilities and terms directly on each provider's website.", eyebrow: "Stay in Mathildedal", back: "Back to Mathildedal", openProvider: "Visit accommodation website", note: "Finnexprience introduces the options; booking, payment and the contract remain directly between guest and provider.", addressLabel: "Address", emptyNote: "Prices and availability can change with the season." },
    ruoka: { title: "Food and drink in Mathildedal", description: "Restaurants, cafés, bakeries and food spots in Mathildedal with direct links.", intro: "Cafés, restaurants, harbour terraces and seasonal food spots are part of a day in Mathildedal. Check opening hours and menus directly with each business.", eyebrow: "Local flavours", back: "Back to Mathildedal", openProvider: "Visit business website", note: "This directory is based on the destination's official tourism guide. Some venues operate seasonally.", addressLabel: "Address", emptyNote: "Confirm opening times and reservations directly with the venue." },
    aktiviteetit: { title: "Activities and nature in Mathildedal", description: "Hiking, kayaking, golf and outdoor activities around Mathildedal and Teijo.", intro: "Choose a relaxed village walk, a day in Teijo National Park or an active trip on the water. Check trail conditions and seasonal services before setting out.", eyebrow: "Explore outdoors", back: "Back to Mathildedal", openProvider: "Explore activity", note: "Availability and booking arrangements depend on the provider and season.", addressLabel: "Location", emptyNote: "Check equipment, trail conditions and weather before your trip." },
    elamykset: { title: "Sauna and local experiences", description: "Sauna, harbour life, ironworks history and local experiences in Mathildedal.", intro: "Mathildedal brings together ironworks heritage, the sea, sauna and experiences offered by local makers. Contact organisers directly to arrange details.", eyebrow: "Experience local life", back: "Back to Mathildedal", openProvider: "Visit organiser website", note: "Finnexprience does not sell combined travel packages. Services are agreed and paid for directly with each provider.", addressLabel: "Location", emptyNote: "Confirm availability directly with the organiser." },
  },
};

const data: Record<string, (typeof mathildedalData)["majoitus"]> = mathildedalData;
const icons = { majoitus: BedDouble, ruoka: Coffee, aktiviteetit: Compass, elamykset: Flame };
const sectionLabels: Record<Locale, Record<string, string>> = {
  fi: { majoitus: "Majoitus", ruoka: "Ruoka ja juoma", aktiviteetit: "Aktiviteetit", elamykset: "Elämykset" },
  es: { majoitus: "Alojamiento", ruoka: "Gastronomía", aktiviteetit: "Actividades", elamykset: "Experiencias" },
  en: { majoitus: "Accommodation", ruoka: "Food & drink", aktiviteetit: "Activities", elamykset: "Experiences" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "en") as Locale;
  if (!Object.prototype.hasOwnProperty.call(mathildedalData, category)) return {};
  const c = copy[locale][category];
  if (!c) return {};
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: `mathildedal/${category}`, image: category === "ruoka" ? undefined : category === "majoitus" ? photoLibrary.mathildedalVillage : category === "aktiviteetit" ? photoLibrary.teijoNationalPark : category === "elamykset" ? photoLibrary.sauna : undefined });
}

export default async function MathildedalCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "en") as Locale;
  if (!Object.prototype.hasOwnProperty.call(mathildedalData, category)) notFound();
  const c = copy[locale][category];
  const items = data[category];
  if (!c || !items) notFound();
  const Icon = icons[category as keyof typeof icons];
  const hero = category === "majoitus" ? photoLibrary.mathildedalVillage : category === "ruoka" ? null : category === "aktiviteetit" ? photoLibrary.teijoNationalPark : photoLibrary.sauna;
  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[48svh] overflow-hidden bg-brand-950 text-white">
        {hero ? <Image src={hero} alt={category === "majoitus" ? (locale === "fi" ? "Mathildedalin ruukkikylä" : locale === "es" ? "Pueblo histórico de Mathildedal" : "Mathildedal ironworks village") : category === "aktiviteetit" ? (locale === "fi" ? "Teijon kansallispuisto" : locale === "es" ? "Parque Nacional de Teijo" : "Teijo National Park") : (locale === "fi" ? "Sauna suomalaisessa maisemassa" : locale === "es" ? "Sauna en un paisaje finlandés" : "Sauna in a Finnish setting")} fill priority unoptimized sizes="100vw" className="object-cover" /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-800 via-brand-950 to-brand-950 px-6 text-center"><Coffee className="h-12 w-12 text-gold-300" /><p className="mt-4 text-sm font-semibold text-white/85">{locale === "fi" ? "Paikallinen ruokakuva lisätään, kun käyttöoikeus on vahvistettu" : locale === "es" ? "La foto gastronómica local se añadirá cuando se confirmen los derechos de uso" : "A local food photo will be added once usage rights are confirmed"}</p></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="container-narrow relative z-10 flex min-h-[48svh] items-end py-12 sm:py-16">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{c.eyebrow} · Mathildedal</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{c.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">{c.intro}</p>
          </div>
        </div>
      </section>
      <section className="container-narrow py-12 sm:py-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-600">{items.length} {locale === "fi" ? "kohdetta" : locale === "es" ? "lugares" : "places"}</p><h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{sectionLabels[locale][category]}</h2></div>
          <Icon className="mt-1 h-8 w-8 shrink-0 text-brand-700" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.name} href={`/${locale}/mathildedal/${category}/${slugifyMathildedal(item.name)}`} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-brand-50">
                {item.image ? <Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" className="object-cover" /> : <div className="flex max-w-xs flex-col items-center px-5 text-center text-brand-700"><MapPin className="h-8 w-8" /><p className="mt-3 text-xs font-semibold leading-5">{locale === "fi" ? "Kohteen oma kuva lisätään, kun käyttöoikeus on vahvistettu" : locale === "es" ? "La imagen del establecimiento se añadirá cuando se confirmen los derechos de uso" : "A venue-specific photo will be added once usage rights are confirmed"}</p></div>}
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold">{item.name}</h3>
                <p className="mt-3 min-h-[5rem] text-sm leading-6 text-slate-600">{item.description[locale]}</p>
                {item.address ? <p className="mt-3 flex gap-2 text-xs text-slate-500"><MapPin className="h-4 w-4 shrink-0" />{item.address}</p> : null}
                {item.seasonal ? <p className="mt-2 text-xs font-semibold text-amber-800">{locale === "fi" ? "Kausikohde – varmista aukiolo" : locale === "es" ? "Lugar estacional: confirma apertura" : "Seasonal venue — confirm opening"}</p> : null}
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Avaa kohteen tiedot" : locale === "es" ? "Ver detalles del lugar" : "View place details"}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-brand-50 p-5 text-sm leading-6 text-slate-600">{c.note} {c.emptyNote}</p>
      </section>
      <section className="border-t border-slate-100 bg-slate-50 py-8">
        <div className="container-narrow flex flex-wrap items-center justify-between gap-4">
          <Link href={`/${locale}/mathildedal`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-800"><ArrowLeft className="h-4 w-4" />{c.back}</Link>
          <a href="https://visitmathildedal.fi/fi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800">{locale === "fi" ? "Virallinen Visit Mathildedal -opas" : locale === "es" ? "Guía oficial de Visit Mathildedal" : "Official Visit Mathildedal guide"}<ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}
