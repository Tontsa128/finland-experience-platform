import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { saloProviders, type SaloProvider } from "@/lib/salo";
import { areaCopy, areaOfficialSources, areaProviderIds, type SaloArea } from "@/lib/salo-areas";
import { SaloDirectory } from "@/components/salo/SaloDirectory";

const locales: Locale[] = ["fi", "en", "es"];
const categories: SaloProvider["category"][] = ["food", "stay", "experience", "nature", "tourism"];
const categoryTitles = {
  fi: { food: "Ruoka ja kahvilat", stay: "Majoitus", experience: "Tekemistä ja aktiviteetit", nature: "Luonto ja ulkoilu", tourism: "Palvelut ja matkailuinfo" },
  en: { food: "Food and cafés", stay: "Accommodation", experience: "Things to do and activities", nature: "Nature and outdoors", tourism: "Local services and visitor information" },
  es: { food: "Gastronomía y cafeterías", stay: "Alojamiento", experience: "Qué hacer y actividades", nature: "Naturaleza y aire libre", tourism: "Servicios e información turística" },
} as const;

function isArea(value: string): value is SaloArea {
  return Object.prototype.hasOwnProperty.call(areaProviderIds, value);
}

function isCategory(value: string): value is SaloProvider["category"] {
  return categories.includes(value as SaloProvider["category"]);
}

export function generateStaticParams() {
  return Object.keys(areaProviderIds).flatMap((area) => categories.map((category) => ({ area, category })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; area: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, area: rawArea, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !isArea(rawArea) || !isCategory(rawCategory)) return {};
  const locale = rawLocale as Locale;
  const title = categoryTitles[locale][rawCategory];
  const areaTitle = areaCopy[rawArea][locale].title;
  return buildLocalizedMetadata({
    locale,
    title: `${title} – ${areaTitle}`,
    description: locale === "fi" ? `${areaTitle}: tutustu alueen ${title.toLowerCase()}-palveluihin ja palveluntarjoajiin.` : locale === "es" ? `${areaTitle}: descubre ${title.toLowerCase()} y los proveedores locales.` : `${areaTitle}: discover local ${title.toLowerCase()} services and providers.`,
    path: `salo/${rawArea}/${rawCategory}`,
  });
}

export default async function SaloAreaCategoryPage({ params }: { params: Promise<{ locale: string; area: string; category: string }> }) {
  const { locale: rawLocale, area: rawArea, category: rawCategory } = await params;
  if (!locales.includes(rawLocale as Locale) || !isArea(rawArea) || !isCategory(rawCategory)) notFound();
  const locale = rawLocale as Locale;
  const providers = saloProviders.filter((provider) => areaProviderIds[rawArea].includes(provider.id) && provider.category === rawCategory);
  const areaTitle = areaCopy[rawArea][locale].title;
  const title = categoryTitles[locale][rawCategory];

  return (
    <main className="bg-white">
      <section className="bg-brand-950 text-white">
        <div className="container-narrow py-12 sm:py-16">
          <Link href={`/${locale}/salo/${rawArea}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            {locale === "fi" ? "Takaisin alueen palveluihin" : locale === "es" ? "Volver a los servicios de la zona" : "Back to area categories"}
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-gold-300">{areaTitle}</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/75">
            {locale === "fi" ? `Tutustu ${areaTitle.toLowerCase()} alueen ${title.toLowerCase()}-kohteisiin. Jokaisella palveluntarjoajalla on oma esittelysivu ja linkki suoraan palveluun.` : locale === "es" ? `Descubre ${title.toLowerCase()} en ${areaTitle}. Cada proveedor tiene su propia ficha y un enlace directo a su servicio.` : `Discover ${title.toLowerCase()} in ${areaTitle}. Every provider has an individual profile and a direct link to their service.`}
          </p>
        </div>
      </section>
      {providers.length ? <SaloDirectory locale={locale} area={rawArea} category={rawCategory} /> : (
        <section className="container-narrow py-14 sm:py-20">
          <div className="max-w-2xl rounded-3xl border border-brand-100 bg-brand-50 p-7 sm:p-9">
            <h2 className="font-display text-2xl font-bold text-brand-950">{locale === "fi" ? "Palveluntarjoajia lisätään tähän kategoriaan" : locale === "es" ? "Estamos incorporando proveedores a esta categoría" : "Providers are being added to this category"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{locale === "fi" ? "Tarkistamme alueen yritys- ja yhdistystiedot ennen julkaisua. Sillä välin voit tutustua alueen viralliseen esittelyyn." : locale === "es" ? "Estamos verificando empresas y asociaciones locales antes de publicarlas. Mientras tanto, consulta la presentación oficial de la zona." : "We verify local businesses and associations before publishing them. In the meantime, visit the area's official guide."}</p>
            <a href={areaOfficialSources[rawArea].url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center rounded-full bg-brand-950 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800">{areaOfficialSources[rawArea].label}</a>
          </div>
        </section>
      )}
    </main>
  );
}
