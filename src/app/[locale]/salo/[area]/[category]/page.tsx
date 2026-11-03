import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";
import { getSaloAreaCategories, getSaloCategoryFromSlug, saloCategoryCopy, saloCategorySlugs } from "@/lib/salo-categories";

const supportedLocales: Locale[] = ["fi", "en", "es"];
const areaSlugs = Object.keys(areaProviderIds) as SaloArea[];

export function generateStaticParams() {
  return areaSlugs.flatMap((area) =>
    getSaloAreaCategories(area).map((category) => ({ area, category: saloCategorySlugs[category] })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; area: string; category: string }> }): Promise<Metadata> {
  const { locale: rawLocale, area: rawArea, category: rawCategory } = await params;
  const category = getSaloCategoryFromSlug(rawCategory);
  if (!areaSlugs.includes(rawArea as SaloArea) || !supportedLocales.includes(rawLocale as Locale) || !category) return {};
  const locale = rawLocale as Locale;
  const area = rawArea as SaloArea;
  const content = saloCategoryCopy[category][locale];
  return buildLocalizedMetadata({ locale, title: `${content.title} – ${areaCopy[area][locale].title}`, description: content.intro, path: `salo/${area}/${rawCategory}` });
}

export default async function SaloCategoryPage({ params }: { params: Promise<{ locale: string; area: string; category: string }> }) {
  const { locale: rawLocale, area: rawArea, category: rawCategory } = await params;
  if (!areaSlugs.includes(rawArea as SaloArea) || !supportedLocales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const area = rawArea as SaloArea;
  const category = getSaloCategoryFromSlug(rawCategory);
  if (!category || !getSaloAreaCategories(area).includes(category)) notFound();

  const content = saloCategoryCopy[category][locale];
  const areaContent = areaCopy[area][locale];
  return (
    <main className="bg-white">
      <section className="bg-brand-950 text-white">
        <div className="container-narrow py-14 sm:py-20">
          <Link href={`/${locale}/salo/${area}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            {locale === "fi" ? `Takaisin: ${areaContent.eyebrow}` : locale === "es" ? `Volver: ${areaContent.eyebrow}` : `Back to: ${areaContent.eyebrow}`}
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{areaContent.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{content.intro}</p>
        </div>
      </section>
      <SaloDirectory locale={locale} area={area} category={category} />
    </main>
  );
}
