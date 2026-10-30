import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Locale } from "@/types";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import type { SaloProvider } from "@/lib/salo";

const categories = {
  "meri-ja-saaristo": {
    category: "archipelago",
    fi: { title: "Meri ja saaristo Mathildedalissa", description: "Venesatama, saaristoretket ja merelliset elämykset Mathildedalin lähialueella." },
    en: { title: "Sea and archipelago in Mathildedal", description: "Guest harbour, island trips and coastal experiences around Mathildedal." },
    es: { title: "Mar y archipiélago en Mathildedal", description: "Puerto deportivo, excursiones a islas y experiencias marítimas en Mathildedal." },
  },
  lahiruoka: {
    category: "localFood",
    fi: { title: "Lähiruoka ja tilapuodit Mathildedalissa", description: "Tutustu Mathildedalin ja lähialueen paikallisiin tuottajiin, tilapuoteihin ja kylän omiin ruokatuotteisiin." },
    en: { title: "Local food and farm shops in Mathildedal", description: "Discover local producers, farm shops and village-made food products in and around Mathildedal." },
    es: { title: "Productos locales y tiendas de granja en Mathildedal", description: "Descubre productores locales, tiendas de granja y productos gastronómicos del pueblo y sus alrededores." },
  },
  majoitus: {
    category: "stay",
    fi: { title: "Majoitus Mathildedalissa", description: "Boutique-hotellit, huoneistot, mökit ja lähialueen luontomajoitus." },
    en: { title: "Accommodation in Mathildedal", description: "Boutique hotels, apartments, cottages and nearby nature stays." },
    es: { title: "Alojamiento en Mathildedal", description: "Hoteles boutique, apartamentos, cabañas y alojamientos en la naturaleza cercana." },
  },
  ruoka: {
    category: "food",
    fi: { title: "Ruoka ja kahvilat Mathildedalissa", description: "Ravintolat, kahvilat, pienpanimo ja paikalliset maut." },
    en: { title: "Food and cafés in Mathildedal", description: "Restaurants, cafés, a village brewery and local flavours." },
    es: { title: "Gastronomía y cafeterías en Mathildedal", description: "Restaurantes, cafeterías, cervecería local y sabores de la zona." },
  },
  ostokset: {
    category: "shopping",
    fi: { title: "Puodit, design ja käsityö", description: "Mathildedalin pienet itsenäiset liikkeet, käsityö, design ja paikalliset tuotteet." },
    en: { title: "Shops, design and crafts", description: "Mathildedal's independent shops, crafts, design and local products." },
    es: { title: "Tiendas, diseño y artesanía", description: "Tiendas independientes, artesanía, diseño y productos locales de Mathildedal." },
  },
  aktiviteetit: {
    category: "experience",
    fi: { title: "Aktiviteetit ja tekeminen", description: "Minigolf, tennis, padel ja muut kylän vapaa-ajan palvelut." },
    en: { title: "Activities and things to do", description: "Mini golf, tennis, padel and other village leisure services." },
    es: { title: "Actividades y cosas que hacer", description: "Minigolf, tenis, pádel y otros servicios de ocio del pueblo." },
  },
  luonto: {
    category: "nature",
    fi: { title: "Meri, uimapaikat ja lähiluonto", description: "Mathildedalin meriuimapaikka ja lähialueen luontokohteet." },
    en: { title: "Sea, swimming and nearby nature", description: "Mathildedal's seaside swimming beach and nearby natural areas." },
    es: { title: "Mar, baño y naturaleza cercana", description: "La playa de Mathildedal y los espacios naturales de los alrededores." },
  },
  hyvinvointi: {
    category: "wellbeing",
    fi: { title: "Sauna ja hyvinvointi", description: "Matildanjärven rantasauna ja lähialueen palautumisen palvelut." },
    en: { title: "Sauna and wellbeing", description: "The lakeside sauna at Matildanjärvi and nearby relaxation services." },
    es: { title: "Sauna y bienestar", description: "La sauna junto al lago Matildanjärvi y servicios cercanos de descanso." },
  },
} as const satisfies Record<string, { category: SaloProvider["category"]; fi: { title: string; description: string }; en: { title: string; description: string }; es: { title: string; description: string } }>;

type CategorySlug = keyof typeof categories;

function resolveCategory(value: string): CategorySlug | null {
  return Object.prototype.hasOwnProperty.call(categories, value) ? value as CategorySlug : null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const category = resolveCategory(rawCategory);
  if (!category) return {};
  const locale = rawLocale as Locale;
  const copy = categories[category][locale];
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: `mathildedal/${category}` });
}

export default async function MathildedalCategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale: rawLocale, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const category = resolveCategory(rawCategory);
  if (!category) notFound();
  const locale = rawLocale as Locale;
  const copy = categories[category][locale];

  return (
    <main className="bg-white">
      <section className="bg-brand-950 py-14 text-white sm:py-20">
        <div className="container-narrow">
          <Link href={`/${locale}/mathildedal`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {locale === "fi" ? "Takaisin Mathildedalin oppaaseen" : locale === "es" ? "Volver a la guía de Mathildedal" : "Back to the Mathildedal guide"}
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-gold-300">Mathildedal · Salo</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{copy.description}</p>
        </div>
      </section>
      <SaloDirectory locale={locale} area="mathildedal" category={categories[category].category} />
      <section className="container-narrow py-12">
        <p className="text-sm leading-7 text-slate-600">
          {locale === "fi" ? "Mathildedalin yritysten sesonkiaikaiset aukiolot ja palvelut voivat vaihdella. Vahvista tiedot aina suoraan palveluntarjoajalta." : locale === "es" ? "Los horarios de temporada y servicios pueden variar. Confirma siempre la información directamente con cada proveedor." : "Seasonal opening times and services may vary. Always confirm details directly with each provider."}
        </p>
        <a href="https://www.visitmathildedal.fi/fi/aukioloajat" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-800 underline underline-offset-4">
          {locale === "fi" ? "Visit Mathildedal – ajankohtaiset aukioloajat" : locale === "es" ? "Visit Mathildedal – horarios actuales" : "Visit Mathildedal – current opening times"} <ArrowUpRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
