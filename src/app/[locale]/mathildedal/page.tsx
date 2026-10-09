import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Coffee, Compass, Flame, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";

const copy = {
  fi: {
    title: "Mathildedal – ruukkikylä meren ja metsän välissä",
    description: "Mathildedalin opas: majoitus ja mökit, aktiviteetit, ruoka ja juoma, sauna ja paikalliset elämykset.",
    intro: "Mathildedal on historiallinen ruukkikylä Salon alueella, meren rannalla ja Teijon kansallispuiston lähellä. Täällä vanhat tehdasrakennukset, pienet putiikit, kahvilat, satama ja lähiluonto muodostavat oman rauhallisen kokonaisuutensa.",
    stay: "Majoitus ja mökit", stayText: "Kylässä ja lähialueella on pieniä hotelleja ja huoneita, vuokramökkejä, lomakylämajoitusta, glampingia sekä matkailuautopaikkoja. Tarkista saatavuus, varustelu ja kausi suoraan majoittajalta.",
    activities: "Aktiviteetit ja luonto", activitiesText: "Tutustu ruukkikylään kävellen, lähde Teijon kansallispuiston reiteille tai vietä päivä Matildanjärvellä. Sesongin mukaan tarjolla on melontaa, SUP-lautailua, pyöräilyä, kalastusta ja opastettuja luontoelämyksiä.",
    food: "Ruoka ja juoma", foodText: "Mathildedalin tunnelma löytyy kahviloista, leipomoista, ravintoloista ja paikallisista mauista. Aukioloajat ja tarjonta vaihtelevat sesongin mukaan – tarkista ajantasaiset tiedot toimijan omilta sivuilta.",
    experiences: "Sauna, meri ja kyläelämä", experiencesText: "Yhdistä kyläkävely merelliseen uintipaikkaan, saunaan tai rauhalliseen iltaan satamassa. Mathildedal sopii myös tukikohdaksi, josta jatkaa Teijoon ja muualle Salon rannikkoalueelle.",
    gettingHere: "Saapuminen ja kartta", gettingHereText: "Mathildedal sijaitsee alle 30 kilometrin päässä Salon keskustasta. Kylään pääsee autolla, bussilla ja veneellä. Tarkista reitit, aikataulut, pysäköinti ja sataman palvelut virallisesta saapumisoppaasta.",
    official: "Visit Mathildedal – virallinen opas", visitSalo: "VisitSalo – majoitus ja elämykset", back: "Takaisin Salon oppaaseen",
    direct: "Varaa ja asioi suoraan palveluntarjoajan kanssa", directText: "Finnexprience kokoaa kohteen ideat ja paikalliset palvelut yhteen. Varaus, maksu ja sopimus tehdään aina suoraan palveluntarjoajan kanssa.",
  },
  es: {
    title: "Mathildedal – pueblo histórico entre el mar y el bosque",
    description: "Guía de Mathildedal: alojamiento y cabañas, actividades, gastronomía, sauna y experiencias locales.",
    intro: "Mathildedal es un histórico pueblo siderúrgico de la región de Salo, junto al mar y cerca del Parque Nacional de Teijo. Sus edificios industriales, pequeñas tiendas, cafés, puerto y naturaleza forman un destino tranquilo y singular.",
    stay: "Alojamiento y cabañas", stayText: "En el pueblo y sus alrededores hay pequeños hoteles y habitaciones, cabañas, complejos vacacionales, glamping y zonas para autocaravanas. Comprueba la disponibilidad y las condiciones directamente con cada proveedor.",
    activities: "Actividades y naturaleza", activitiesText: "Pasea por el pueblo, recorre los senderos del Parque Nacional de Teijo o pasa el día junto al lago Matildanjärvi. Según la temporada, hay kayak, SUP, ciclismo, pesca y experiencias guiadas.",
    food: "Gastronomía y bebidas", foodText: "El ambiente local se descubre en cafés, panaderías, restaurantes y sabores de la zona. Los horarios y la oferta cambian según la temporada; consulta las páginas de los establecimientos antes de visitarlos.",
    experiences: "Sauna, mar y vida local", experiencesText: "Combina un paseo por el pueblo con un baño en el mar, una sauna o una tarde tranquila en el puerto. Mathildedal también es una buena base para explorar Teijo y la costa de Salo.",
    gettingHere: "Cómo llegar y mapa", gettingHereText: "Mathildedal está a menos de 30 km del centro de Salo. Se puede llegar en coche, autobús o barco. Consulta la guía oficial para conocer rutas, horarios, aparcamiento y servicios del puerto.",
    official: "Visit Mathildedal – guía oficial", visitSalo: "VisitSalo – alojamiento y actividades", back: "Volver a la guía de Salo",
    direct: "Reserva directamente con el proveedor", directText: "Finnexprience reúne inspiración y servicios locales. Las reservas, los pagos y los contratos se realizan siempre directamente con cada proveedor.",
  },
  en: {
    title: "Mathildedal – an ironworks village between sea and forest",
    description: "Mathildedal guide: accommodation and cottages, activities, food and drink, sauna and local experiences.",
    intro: "Mathildedal is a historic ironworks village in the Salo region, beside the sea and close to Teijo National Park. Old industrial buildings, small shops, cafés, a harbour and nearby nature give the village its own relaxed character.",
    stay: "Accommodation and cottages", stayText: "Stays in the village and nearby include small hotels and rooms, cottages, holiday villages, glamping and motorhome pitches. Check availability, facilities and season directly with the accommodation provider.",
    activities: "Activities and nature", activitiesText: "Explore the village on foot, follow the trails in Teijo National Park or spend a day by Lake Matildanjärvi. Depending on the season, options include kayaking, SUP, cycling, fishing and guided nature experiences.",
    food: "Food and drink", foodText: "Discover Mathildedal through its cafés, bakeries, restaurants and local flavours. Opening hours and offerings vary by season, so check each business's own website before visiting.",
    experiences: "Sauna, sea and village life", experiencesText: "Combine a village walk with a swim, sauna or quiet evening by the harbour. Mathildedal is also a good base for exploring Teijo and other parts of the Salo coast.",
    gettingHere: "Getting here and map", gettingHereText: "Mathildedal is less than 30 km from central Salo and can be reached by car, bus or boat. Check the official arrival guide for current routes, timetables, parking and harbour services.",
    official: "Visit Mathildedal – official guide", visitSalo: "VisitSalo – stays and activities", back: "Back to the Salo guide",
    direct: "Book directly with the provider", directText: "Finnexprience brings destination inspiration and local services together. Reservations, payments and contracts always take place directly with the provider.",
  },
} as const;

const sections = [
  { key: "stay", icon: BedDouble, image: photoLibrary.mathildedalVillage },
  { key: "activities", icon: Compass, image: photoLibrary.teijoNationalPark },
  { key: "food", icon: Coffee, image: photoLibrary.mathildedalHarbour },
  { key: "experiences", icon: Flame, image: photoLibrary.sauna },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  const c = copy[locale];
  return buildLocalizedMetadata({ locale, title: c.title, description: c.description, path: "mathildedal", image: photoLibrary.mathildedalHarbour });
}

export default async function MathildedalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = (["fi", "es", "en"].includes(raw) ? raw : "en") as Locale;
  const c = copy[locale];
  return (
    <main className="bg-white text-brand-950">
      <section className="relative isolate min-h-[68svh] overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.mathildedalHarbour} alt={c.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="container-narrow relative z-10 flex min-h-[68svh] items-end py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">Mathildedal · Salo</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[.96] sm:text-7xl lg:text-8xl">{c.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90 sm:text-2xl">{c.intro}</p>
          </div>
        </div>
      </section>

      <section className="container-narrow py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map(({ key, icon: Icon, image }) => (
            <article key={key} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
              <div className="relative aspect-[16/9]">
                <Image src={image} alt={c[key]} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <Icon className="h-7 w-7 text-brand-700" />
                <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{c[key]}</h2>
                <p className="mt-3 leading-7 text-slate-600">{c[({stay:"stayText",activities:"activitiesText",food:"foodText",experiences:"experiencesText"} as const)[key]]}</p>
                <Link href={`/${locale}/mathildedal/${({ stay: "majoitus", activities: "aktiviteetit", food: "ruoka", experiences: "elamykset" } as const)[key]}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{key === "stay" ? c.stay : key === "activities" ? c.activities : key === "food" ? c.food : c.experiences}<ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card">
            <Image src={photoLibrary.mathildedalHarbour} alt={c.gettingHere} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{c.gettingHere}</h2>
            <p className="mt-5 leading-8 text-slate-600">{c.gettingHereText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.visitmathildedal.fi/fi/saapuminen" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white">{c.official}<ArrowUpRight className="h-4 w-4" /></a>
              <a href="https://visitsalo.fi/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-brand-200 px-5 py-3 text-sm font-bold text-brand-950">{c.visitSalo}<ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-14 text-white">
        <div className="container-narrow flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl"><h2 className="font-display text-3xl font-bold">{c.direct}</h2><p className="mt-3 leading-7 text-white/75">{c.directText}</p></div>
          <Link href={`/${locale}/salo`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{c.back}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
