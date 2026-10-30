import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { RuukkikylaGuide } from "@/components/salo/RuukkikylaGuide";
import { SaloDirectory } from "@/components/salo/SaloDirectory";

const copy: Record<Locale, { title: string; lead: string; historyTitle: string; history: string; landscapeTitle: string; landscape: string; notice: string; mathildedal: string; source: string }> = {
  fi: {
    title: "Teijon ruukkikylä",
    lead: "Ruukkihistoriaa, kartanomiljöötä, kirkko, luontoa ja elävää kyläyhteisöä Salon eteläosassa.",
    historyTitle: "Teijon pitkä ruukkihistoria",
    history: "Teijon teollinen historia ulottuu 1600-luvulle. Ruukkialueen rakennuksiin ja maisemaan kuuluvat muun muassa historiallinen kartano, kirkko, vanhoja teollisuusrakennuksia ja vesiuoman ympäristö. Teijon kartanon päärakennus on 1700-luvulta, ja alueen ruukkirakennuksia sekä kartanopuistoa on suojeltu kulttuurihistoriallisesti arvokkaana kokonaisuutena. Kartano on yksityisomistuksessa, joten vierailu ja opastukset tulee varmistaa etukäteen.",
    landscapeTitle: "Kulttuuri, kyläpalvelut ja luonto",
    landscape: "Teijossa voi yhdistää historialliseen miljööseen tutustumisen, kahvila- ja lounastauon, käsityö- ja taidepuodit sekä lähialueen luontopolut. Teijon Masuunissa toimii kulttuuriin, näyttelyihin ja käsitöihin liittyviä palveluja. Sahajärven ja Teijon kansallispuiston reitit täydentävät kylävierailua; tarkista reittien ja palveluiden ajantasaiset tiedot ennen lähtöä.",
    notice: "Tiedot aukioloajoista, palveluista ja tapahtumista muuttuvat kausittain. Vahvista yksityiskohdat aina palveluntarjoajalta tai tapahtuman järjestäjältä.",
    mathildedal: "Tutustu myös Mathildedalin ruukkikylään",
    source: "Lähteet: Teijon Ruukkikylät ja Salon matkailu"
  },
  en: {
    title: "Teijo Ironworks Village",
    lead: "Ironworks history, manor surroundings, a historic church, nature and a living village community in southern Salo.",
    historyTitle: "Teijo's long ironworks history",
    history: "Teijo's industrial history dates back to the 17th century. The historic landscape includes the manor, church, former industrial buildings and waterways. The manor's main building dates from the 18th century, and the ironworks buildings and manor park are protected as a culturally significant setting. The manor is privately owned, so visits and guided tours must be arranged in advance.",
    landscapeTitle: "Culture, village services and nature",
    landscape: "Combine a walk through the historic setting with a café or lunch stop, craft and art shops, and nearby nature trails. Teijo Masuuni hosts cultural activities, exhibitions and craft-related services. Trails around Sahajärvi and Teijo National Park can round out a visit; check current trail and service information before setting out.",
    notice: "Opening times, services and events change seasonally. Confirm details with the provider or event organiser before visiting.",
    mathildedal: "Explore Mathildedal Ironworks Village too",
    source: "Sources: Teijo Ironworks Villages and Visit Salo"
  },
  es: {
    title: "Pueblo siderúrgico de Teijo",
    lead: "Historia industrial, entorno señorial, iglesia histórica, naturaleza y una comunidad viva en el sur de Salo.",
    historyTitle: "La larga historia siderúrgica de Teijo",
    history: "La historia industrial de Teijo se remonta al siglo XVII. El paisaje histórico incluye la mansión, la iglesia, antiguos edificios industriales y cursos de agua. El edificio principal de la mansión data del siglo XVIII; los edificios de la ferrería y el parque señorial están protegidos por su valor cultural. La mansión es privada, por lo que las visitas y visitas guiadas deben acordarse con antelación.",
    landscapeTitle: "Cultura, servicios locales y naturaleza",
    landscape: "Combina un paseo por el entorno histórico con una pausa en una cafetería o restaurante, tiendas de artesanía y arte, y senderos cercanos. Teijo Masuuni ofrece actividades culturales, exposiciones y servicios relacionados con la artesanía. Los senderos de Sahajärvi y del Parque Nacional de Teijo pueden completar la visita; consulta la información actual antes de salir.",
    notice: "Los horarios, servicios y eventos cambian según la temporada. Confirma los detalles con el proveedor o el organizador antes de la visita.",
    mathildedal: "Descubre también el pueblo siderúrgico de Mathildedal",
    source: "Fuentes: Teijo Ironworks Villages y Visit Salo"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const t = copy[locale];
  return buildLocalizedMetadata({ locale, title: t.title, description: t.lead, path: "destinations/teijon-ruukkikyla", image: "https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/masuuni_terassi1-%E2%80%93-kopio-1156x768.jpg" });
}

export default async function TeijoIronworksVillagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) return null;
  const locale = rawLocale as Locale;
  const t = copy[locale];
  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-stone-900">
        <img src="https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/masuuni_terassi1-%E2%80%93-kopio-1156x768.jpg" alt={locale === "fi" ? "Teijon Masuunin historiallinen rakennus ja terassi" : locale === "es" ? "Edificio histórico y terraza de Teijo Masuuni" : "Historic Teijo Masuuni building and terrace"} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="container-narrow relative flex min-h-[60vh] items-end py-16 text-white sm:min-h-[68vh] sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-white/80">{locale === "fi" ? "Salon ruukkikylät" : locale === "es" ? "Pueblos siderúrgicos de Salo" : "Salo's ironworks villages"}</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-7xl">{t.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl">{t.lead}</p>
          </div>
        </div>
      </section>
      <p className="container-narrow py-2 text-right text-xs text-slate-500">
        {locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:"} <a className="underline" href="https://kohteet.visitsalo.fi/teijon-masuuni/" target="_blank" rel="noreferrer">Visit Salo / Salon Kohteet</a>
      </p>
      <section className="container-narrow grid gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <article>
          <h2 className="font-display text-3xl font-bold text-brand-950">{t.historyTitle}</h2>
          <p className="mt-4 leading-8 text-slate-700">{t.history}</p>
        </article>
        <article>
          <h2 className="font-display text-3xl font-bold text-brand-950">{t.landscapeTitle}</h2>
          <p className="mt-4 leading-8 text-slate-700">{t.landscape}</p>
          <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">{t.notice}</p>
          <p className="mt-4 text-xs text-slate-500">{t.source}: <a className="underline" href="https://www.teijo.fi/tervetuloakyliin/teijo/" target="_blank" rel="noreferrer">teijo.fi</a> · <a className="underline" href="https://visitsalo.fi/mathildedalin-ruukkikyla/" target="_blank" rel="noreferrer">visitsalo.fi</a></p>
        </article>
      </section>
      <SaloDirectory locale={locale} area="teijo" />
      <RuukkikylaGuide village="teijo" locale={locale} />
      <section className="container-narrow py-12">
        <Link href={`/${locale}/mathildedal`} className="inline-flex rounded-full border border-stone-300 px-5 py-3 text-sm font-bold text-brand-950 hover:bg-stone-50">{t.mathildedal} →</Link>
      </section>
    </main>
  );
}
