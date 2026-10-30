import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import type { SaloProvider } from "@/lib/salo";

const categoryConfig = {
  majoitus: {
    category: "stay",
    fi: { title: "Majoitus Salossa", description: "Hotellit, mökit, huoneistot, saaristomajoitus ja muut yöpymispaikat Salon alueella." },
    en: { title: "Accommodation in Salo", description: "Hotels, cottages, apartments, island stays and other places to stay across the Salo region." },
    es: { title: "Alojamiento en Salo", description: "Hoteles, cabañas, apartamentos y alojamientos en las islas y pueblos de la región de Salo." },
  },
  ruoka: {
    category: "food",
    fi: { title: "Ruoka ja kahvilat Salossa", description: "Tutustu ravintoloihin, kahviloihin, paikallisiin makuihin ja ruokaan liittyviin vierailukohteisiin." },
    en: { title: "Food and cafés in Salo", description: "Discover restaurants, cafés, local flavours and food-related places to visit." },
    es: { title: "Gastronomía y cafeterías en Salo", description: "Descubre restaurantes, cafeterías, sabores locales y lugares gastronómicos." },
  },
  elamykset: {
    category: "experience",
    fi: { title: "Aktiviteetit ja elämykset Salossa", description: "Opastukset, veneily, kalastus, golf ja muut paikalliset elämykset." },
    en: { title: "Activities and experiences in Salo", description: "Guided activities, boating, fishing, golf and other local experiences." },
    es: { title: "Actividades y experiencias en Salo", description: "Visitas guiadas, navegación, pesca, golf y otras experiencias locales." },
  },
  luonto: {
    category: "nature",
    fi: { title: "Luonto ja retkeily Salossa", description: "Kansallispuisto, rannat, satamat ja luonnossa liikkumisen kohteet." },
    en: { title: "Nature and outdoors in Salo", description: "The national park, beaches, harbours and places to explore outdoors." },
    es: { title: "Naturaleza y actividades al aire libre en Salo", description: "El parque nacional, playas, puertos y lugares para disfrutar de la naturaleza." },
  },
  ostokset: {
    category: "shopping",
    fi: { title: "Ostokset ja käsityö Salossa", description: "Paikalliset puodit, design, käsityö, vaatteet ja lähituotteet." },
    en: { title: "Shopping and crafts in Salo", description: "Local shops, design, crafts, clothing and regional products." },
    es: { title: "Compras y artesanía en Salo", description: "Tiendas locales, diseño, artesanía, ropa y productos regionales." },
  },
  tapahtumat: {
    category: "events",
    fi: { title: "Tapahtumat ja juhlatilat Salossa", description: "Paikalliset tapahtumapaikat, juhlatilat ja järjestäjien ajantasaiset tapahtumatiedot." },
    en: { title: "Events and venues in Salo", description: "Local event venues, celebration spaces and current event information from organisers." },
    es: { title: "Eventos y espacios en Salo", description: "Espacios locales para eventos y celebraciones e información actualizada de los organizadores." },
  },
  kulttuuri: {
    category: "culture",
    fi: { title: "Kulttuuri ja historia Salossa", description: "Historialliset kohteet, ruukkiperintö, museot, kirkot ja paikallinen kulttuuri." },
    en: { title: "Culture and history in Salo", description: "Historic places, ironworks heritage, museums, churches and local culture." },
    es: { title: "Cultura e historia en Salo", description: "Lugares históricos, patrimonio industrial, museos, iglesias y cultura local." },
  },
  hyvinvointi: {
    category: "wellbeing",
    fi: { title: "Hyvinvointi ja sauna Salossa", description: "Saunat, palautumisen palvelut ja luonnon äärellä virkistäytyminen." },
    en: { title: "Wellbeing and sauna in Salo", description: "Saunas, relaxation services and ways to recharge in nature." },
    es: { title: "Bienestar y sauna en Salo", description: "Saunas, servicios de relajación y formas de descansar en la naturaleza." },
  },
  matkailuinfo: {
    category: "tourism",
    fi: { title: "Matkailuinfo ja alueoppaat", description: "Viralliset matkailuoppaat ja paikalliset tietolähteet Salon alueelle." },
    en: { title: "Tourism information and local guides", description: "Official destination guides and local information sources for the Salo region." },
    es: { title: "Información turística y guías locales", description: "Guías oficiales del destino y fuentes de información local de la región de Salo." },
  },
} as const satisfies Record<string, { category: SaloProvider["category"]; fi: { title: string; description: string }; en: { title: string; description: string }; es: { title: string; description: string } }>;

type CategorySlug = keyof typeof categoryConfig;

function resolveCategory(value: string): CategorySlug | null {
  return Object.prototype.hasOwnProperty.call(categoryConfig, value) ? value as CategorySlug : null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const category = resolveCategory(rawCategory);
  if (!category) return {};
  const locale = rawLocale as Locale;
  const copy = categoryConfig[category][locale];
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: `salo/${category}` });
}

export default async function SaloCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const category = resolveCategory(rawCategory);
  if (!category) notFound();
  const locale = rawLocale as Locale;
  const config = categoryConfig[category];
  const copy = config[locale];

  return (
    <main className="bg-white">
      <section className="bg-brand-950 py-14 text-white sm:py-20">
        <div className="container-narrow">
          <Link href={`/${locale}/salo`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {locale === "fi" ? "Takaisin Salon alueoppaaseen" : locale === "es" ? "Volver a la guía de Salo" : "Back to the Salo guide"}
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-gold-300">Salo · Southwest Finland</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{copy.description}</p>
        </div>
      </section>
      <SaloDirectory locale={locale} category={config.category} />
      <section className="container-narrow py-12">
        <p className="text-sm leading-7 text-slate-600">
          {locale === "fi" ? "Tarkista ajantasaiset tiedot, aukioloajat, hinnat ja saatavuus aina palveluntarjoajan omalta sivulta." : locale === "es" ? "Comprueba siempre la información, horarios, precios y disponibilidad actuales en la web del proveedor." : "Always confirm current details, opening times, prices and availability on the provider's own website."}
        </p>
        <a href="https://visitsalo.fi" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 underline underline-offset-4">
          {locale === "fi" ? "Visit Salon virallinen matkailuopas" : locale === "es" ? "Guía turística oficial Visit Salo" : "Official Visit Salo tourism guide"} <ArrowUpRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
