import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, CalendarDays, Compass, Flame, Landmark, TreePine, Utensils } from "lucide-react";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { RuukkikylaGuide } from "@/components/salo/RuukkikylaGuide";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import { saloProviders } from "@/lib/salo";
import { photoLibrary } from "@/lib/photo-library";

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
        <Image src="https://kohteet.visitsalo.fi/wp-content/uploads/sites/5/2020/05/masuuni_terassi1-%E2%80%93-kopio-1156x768.jpg" alt={locale === "fi" ? "Teijon Masuunin historiallinen rakennus ja terassi" : locale === "es" ? "Edificio histórico y terraza de Teijo Masuuni" : "Historic Teijo Masuuni building and terrace"} fill priority sizes="100vw" className="object-cover opacity-70" />
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
          <p className="mt-4 text-xs text-slate-500">{t.source}: <a className="underline" href="https://www.teijo.fi/tervetuloakyliin/teijo/" target="_blank" rel="noreferrer">teijo.fi</a> · <a className="underline" href="https://kohteet.visitsalo.fi/teijon-masuuni/" target="_blank" rel="noreferrer">visitsalo.fi</a></p>
        </article>
      </section>
      <section className="bg-stone-50 py-14 sm:py-20">
        <div className="container-narrow">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">{locale === "fi" ? "Suunnittele vierailu" : locale === "es" ? "Planifica tu visita" : "Plan your visit"}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{locale === "fi" ? "Teijon palvelut ja elämykset" : locale === "es" ? "Servicios y experiencias de Teijo" : "Teijo services and experiences"}</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">{locale === "fi" ? "Valitse kiinnostava teema. Ruukkikylän palvelut ja kansallispuiston retkeilypalvelut on erotettu toisistaan, vaikka ne täydentävät samaa vierailua." : locale === "es" ? "Elige un tema. Los servicios del pueblo siderúrgico y los del parque nacional se presentan por separado, aunque pueden combinarse en una misma visita." : "Choose a theme. Village services and national park services are presented separately, even though they can be combined in one visit."}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "#salo-category-stay", id: "matildanjarven-kampat", icon: BedDouble, title: { fi: "Majoitus", en: "Accommodation", es: "Alojamiento" }, text: { fi: "Vuokrakämpät ja luontomajoitus.", en: "Rental cabins and nature stays.", es: "Cabañas y alojamientos en la naturaleza." } },
              { href: "#salo-category-food", id: "teijon-arkki", icon: Utensils, title: { fi: "Ruoka ja kahvilat", en: "Food and cafés", es: "Gastronomía y cafeterías" }, text: { fi: "Kylän kahvila-, leipomo- ja lounaspalvelut.", en: "Village cafés, bakery and lunch services.", es: "Cafeterías, panadería y almuerzos del pueblo." } },
              { href: "#salo-category-experience", id: "teijo-action-park", icon: Compass, title: { fi: "Aktiviteetit", en: "Activities", es: "Actividades" }, text: { fi: "Pyöräily, golf ja ympärivuotiset elämykset.", en: "Cycling, golf and year-round experiences.", es: "Ciclismo, golf y experiencias todo el año." } },
              { href: "#salo-category-nature", id: "teijo-national-park", icon: TreePine, title: { fi: "Kansallispuisto ja retkeily", en: "National park and hiking", es: "Parque nacional y senderismo" }, text: { fi: "Järvet, metsät, reitit ja luontokeskus.", en: "Lakes, forests, trails and the visitor centre.", es: "Lagos, bosques, senderos y centro de visitantes." } },
              { href: "#salo-category-wellbeing", id: "matildanjarven-sauna", icon: Flame, title: { fi: "Sauna ja hyvinvointi", en: "Sauna and wellbeing", es: "Sauna y bienestar" }, text: { fi: "Matildanjärven rantasauna ja uimapaikka.", en: "The Matildanjärvi lakeside sauna and swimming area.", es: "Sauna junto al lago Matildanjärvi y zona de baño." } },
              { href: "#salo-category-culture", id: "teijon-kirkko", icon: Landmark, title: { fi: "Kulttuuri ja historia", en: "Culture and history", es: "Cultura e historia" }, text: { fi: "Ruukkiperintö, kirkko, taide ja käsityö.", en: "Ironworks heritage, church, art and crafts.", es: "Patrimonio industrial, iglesia, arte y artesanía." } },
              { href: "#salo-category-events", id: "teijon-juhlatila", icon: CalendarDays, title: { fi: "Tapahtumat", en: "Events", es: "Eventos" }, text: { fi: "Kylän tapahtumat ja sesonkiohjelma.", en: "Village events and seasonal programme.", es: "Eventos del pueblo y programa de temporada." } },
            ].map((item) => {
              const Icon = item.icon;
              const image = saloProviders.find((provider) => provider.id === item.id)?.image || photoLibrary.teijoNationalPark;
              return (
                <a key={item.href} href={item.href} className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-100">
                    <Image src={image} alt={item.title[locale]} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <Icon className="absolute bottom-4 left-4 h-7 w-7 text-white drop-shadow" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-brand-950">{item.title[locale]}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text[locale]}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <SaloDirectory locale={locale} area="teijo" />
      <RuukkikylaGuide village="teijo" locale={locale} />
      <section className="container-narrow grid gap-4 py-12 sm:grid-cols-2">
        <Link href={`/${locale}/mathildedal`} className="rounded-2xl border border-stone-200 p-6 transition hover:bg-stone-50">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{locale === "fi" ? "Toinen ruukkikylä" : locale === "es" ? "Otro pueblo siderúrgico" : "Another ironworks village"}</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Mathildedal</h3>
          <p className="mt-2 text-sm text-slate-600">{t.mathildedal}</p>
        </Link>
        <Link href={`/${locale}/destinations/kirjakkalan-ruukkikyla`} className="rounded-2xl border border-stone-200 p-6 transition hover:bg-stone-50">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{locale === "fi" ? "Kolmas ruukkikylä" : locale === "es" ? "Otro pueblo siderúrgico" : "Another ironworks village"}</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-brand-950">Kirjakkala</h3>
          <p className="mt-2 text-sm text-slate-600">{locale === "fi" ? "Tutustu Hamarijärven rannan historialliseen ruukkikylään." : locale === "es" ? "Descubre el histórico pueblo siderúrgico junto al lago Hamarijärvi." : "Explore the historic ironworks village beside Lake Hamarijärvi."}</p>
        </Link>
      </section>
    </main>
  );
}
