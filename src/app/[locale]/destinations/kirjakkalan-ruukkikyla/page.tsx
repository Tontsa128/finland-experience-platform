import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Compass, Flame, Waves } from "lucide-react";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";

const photos = [
  { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kirjakkalan_ruukkikyl%C3%A4-web-1366x768.jpg", alt: { fi: "Hamarijärven ranta Kirjakkalan ruukkikylässä", en: "Lake Hamarijärvi shore at Kirjakkala Ironworks Village", es: "Orilla del lago Hamarijärvi en el pueblo siderúrgico de Kirjakkala" } },
  { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kirjakkala-rakennus-web-1366x768.jpg", alt: { fi: "Kirjakkalan ruukkikylän historiallinen majoitusrakennus", en: "Historic accommodation building in Kirjakkala Ironworks Village", es: "Edificio histórico de alojamiento en Kirjakkala" } },
  { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kirjakkala-melontaa-web-1366x768.jpg", alt: { fi: "Melontaa Hamarijärvellä", en: "Canoeing on Lake Hamarijärvi", es: "Piragüismo en el lago Hamarijärvi" } },
  { src: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/Kirjakkalan-laituri-web.jpg", alt: { fi: "Kirjakkalan laituri Hamarijärvellä", en: "Kirjakkala pier on Lake Hamarijärvi", es: "Embarcadero de Kirjakkala en el lago Hamarijärvi" } },
];

const copy: Record<Locale, {
  title: string; lead: string; historyTitle: string; history: string; experienceTitle: string;
  experience: string; stay: string; outdoor: string; sauna: string; source: string; provider: string;
}> = {
  fi: {
    title: "Kirjakkalan ruukkikylä",
    lead: "Historiallinen ruukkimiljöö, Hamarijärven rantamaisemat ja aktiivinen luontoelämä Teijon kansallispuiston reittien äärellä.",
    historyTitle: "Ruukkihistoriaa Hamarijärven rannalla",
    history: "Kirjakkalan historia alkaa vuodesta 1686, jolloin kylään perustettiin Suomen 11. rautatehdas eli ruukki. Vanha Ruukinkartano ja suuret hirsirakennukset sijaitsevat vehreässä lehdossa Hamarijärven rannalla. Alueella yhdistyvät historiallinen rakennusperintö, järvimaisema ja kansallispuiston retkeilyreitit.",
    experienceTitle: "Aktiivinen tukikohta luonnossa",
    experience: "Kirjakkalan Ruukkikylä / Extreme Fun tarjoaa majoitus-, kokous- ja saunapalveluja sekä outdoor- ja melontakeskuksen palveluja. Hamarijärven ranta ja läheiset reitit sopivat luonnossa liikkumiseen. Palveluiden saatavuus, aktiviteetit ja varausehdot vahvistetaan suoraan palveluntarjoajalta.",
    stay: "Majoitus ja ryhmät",
    outdoor: "Ulkoilu ja melonta",
    sauna: "Sauna ja kokoustilat",
    source: "Kuvat ja lähde",
    provider: "Palveluntarjoaja",
  },
  en: {
    title: "Kirjakkala Ironworks Village",
    lead: "Historic ironworks heritage, Lake Hamarijärvi scenery and outdoor experiences beside the trails of Teijo National Park.",
    historyTitle: "Ironworks history by Lake Hamarijärvi",
    history: "Kirjakkala's history dates to 1686, when Finland's eleventh ironworks was established in the village. The old manor and large timber buildings stand in a leafy grove beside Lake Hamarijärvi. The area brings together historic architecture, lakeside scenery and national park trails.",
    experienceTitle: "An active base in nature",
    experience: "Kirjakkala Ironworks Village / Extreme Fun offers accommodation, meeting and sauna facilities, plus outdoor and canoeing services. The lakeshore and nearby trails are ideal for outdoor activities. Confirm current availability, activities and booking terms directly with the provider.",
    stay: "Accommodation and groups",
    outdoor: "Outdoor activities and canoeing",
    sauna: "Sauna and meeting facilities",
    source: "Photos and source",
    provider: "Provider",
  },
  es: {
    title: "Pueblo siderúrgico de Kirjakkala",
    lead: "Patrimonio industrial, paisajes del lago Hamarijärvi y experiencias al aire libre junto a los senderos del Parque Nacional de Teijo.",
    historyTitle: "Historia siderúrgica junto al lago Hamarijärvi",
    history: "La historia de Kirjakkala se remonta a 1686, cuando se fundó en el pueblo la undécima ferrería de Finlandia. La antigua casa solariega y los grandes edificios de madera se encuentran en un frondoso bosque junto al lago Hamarijärvi. La zona combina arquitectura histórica, paisaje lacustre y rutas del parque nacional.",
    experienceTitle: "Una base activa en plena naturaleza",
    experience: "Kirjakkala Ironworks Village / Extreme Fun ofrece alojamiento, salas de reuniones y sauna, además de servicios de actividades al aire libre y piragüismo. La orilla del lago y los senderos cercanos son ideales para disfrutar de la naturaleza. Confirma disponibilidad, actividades y condiciones directamente con el proveedor.",
    stay: "Alojamiento y grupos",
    outdoor: "Actividades al aire libre y piragüismo",
    sauna: "Sauna y salas de reuniones",
    source: "Fotos y fuente",
    provider: "Proveedor",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const t = copy[locale];
  return buildLocalizedMetadata({ locale, title: t.title, description: t.lead, path: "destinations/kirjakkalan-ruukkikyla", image: photos[0].src });
}

export default async function KirjakkalaIronworksVillagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = copy[locale];

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <Image src={photos[0].src} alt={photos[0].alt[locale]} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="container-narrow relative flex min-h-[60vh] items-end py-16 sm:min-h-[68vh] sm:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-gold-300">{locale === "fi" ? "Teijon ruukkikylät · Salo" : locale === "es" ? "Pueblos siderúrgicos de Teijo · Salo" : "Teijo Ironworks Villages · Salo"}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-7xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90 sm:text-xl">{t.lead}</p>
            <a href="https://www.ruukkikyla.fi/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{locale === "fi" ? "Siirry palveluntarjoajalle" : locale === "es" ? "Ir al proveedor" : "Visit provider"} <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
      <p className="container-narrow py-2 text-right text-xs text-slate-500">{locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:"} Visit Salo / Salon Kohteet</p>

      <section className="container-narrow grid gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <article>
          <h2 className="font-display text-3xl font-bold text-brand-950">{t.historyTitle}</h2>
          <p className="mt-4 leading-8 text-slate-700">{t.history}</p>
        </article>
        <article>
          <h2 className="font-display text-3xl font-bold text-brand-950">{t.experienceTitle}</h2>
          <p className="mt-4 leading-8 text-slate-700">{t.experience}</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li className="flex gap-3"><BedDouble className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />{t.stay}</li>
            <li className="flex gap-3"><Compass className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />{t.outdoor}</li>
            <li className="flex gap-3"><Flame className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />{t.sauna}</li>
          </ul>
          <a href="https://www.luontoon.fi/fi/kohteet/teijon-kansallispuisto" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800 underline underline-offset-4">{locale === "fi" ? "Tutustu Teijon kansallispuiston reitteihin" : locale === "es" ? "Ver rutas del Parque Nacional de Teijo" : "Explore Teijo National Park trails"} <ArrowUpRight className="h-4 w-4" /></a>
        </article>
      </section>

      <section className="bg-stone-50 py-14 sm:py-20">
        <div className="container-narrow">
          <h2 className="font-display text-3xl font-bold text-brand-950">{locale === "fi" ? "Kirjakkala kuvina" : locale === "es" ? "Kirjakkala en imágenes" : "Kirjakkala in pictures"}</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <a href="https://kohteet.visitsalo.fi/kirjakkalan-ruukkikyla-melontakeskus/" target="_blank" rel="noopener noreferrer">
                  <Image src={photo.src} alt={photo.alt[locale]} width={900} height={600} className="h-52 w-full object-cover transition duration-500 hover:scale-[1.02]" />
                </a>
                <figcaption className="p-3 text-xs text-slate-500">{photo.alt[locale]} · Visit Salo / Salon Kohteet</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SaloDirectory locale={locale} area="kirjakkala" />

      <section className="container-narrow grid gap-5 py-12 sm:grid-cols-2">
        <Link href={`/${locale}/destinations/teijon-ruukkikyla`} className="rounded-2xl border border-slate-200 p-6 transition hover:bg-stone-50">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{locale === "fi" ? "Seuraava ruukkikylä" : locale === "es" ? "Otro pueblo siderúrgico" : "Another ironworks village"}</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Teijo</h3>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Tutustu Teijoon" : locale === "es" ? "Descubrir Teijo" : "Explore Teijo"} <ArrowRight className="h-4 w-4" /></span>
        </Link>
        <Link href={`/${locale}/mathildedal`} className="rounded-2xl border border-slate-200 p-6 transition hover:bg-stone-50">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{locale === "fi" ? "Seuraava ruukkikylä" : locale === "es" ? "Otro pueblo siderúrgico" : "Another ironworks village"}</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Mathildedal</h3>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{locale === "fi" ? "Tutustu Mathildedaliin" : locale === "es" ? "Descubrir Mathildedal" : "Explore Mathildedal"} <ArrowRight className="h-4 w-4" /></span>
        </Link>
      </section>
    </main>
  );
}
