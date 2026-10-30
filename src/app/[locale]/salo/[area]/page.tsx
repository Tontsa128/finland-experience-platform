import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoCredits, photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { SaloDirectory } from "@/components/salo/SaloDirectory";
import { areaCopy, areaProviderIds, type SaloArea } from "@/lib/salo-areas";

const supportedLocales: Locale[] = ["fi", "en", "es"];
const areaSlugs = Object.keys(areaProviderIds) as SaloArea[];

function isSaloArea(value: string): value is SaloArea {
  return Object.prototype.hasOwnProperty.call(areaProviderIds, value);
}

function getAreaImage(area: SaloArea): { src: string; credit: string; source: string } | null {
  const providerImageIds: Partial<Record<SaloArea, string>> = {
    pernio: "leipyolin-tila",
    halikko: "topilan-tupa",
    vaskio: "onnenperan-mokki",
    suomusjarvi: "villa-frans",
  };
  const providerId = providerImageIds[area];
  if (providerId) {
    const provider = saloProviders.find((item) => item.id === providerId);
    return provider?.image
      ? {
          src: provider.image,
          credit: provider.imageCredit || provider.name,
          source: provider.imageSource || provider.url,
        }
      : null;
  }

  const src = area === "mathildedal"
    ? photoLibrary.mathildedalHarbour
    : area === "teijo"
      ? photoLibrary.teijoNationalPark
      : area === "sarkisalo"
        ? photoLibrary.sarkisalo
        : area === "salo"
          ? photoLibrary.saloVeturitalli
          : null;
  if (!src) return null;
  const attribution = photoCredits.find((photo) => photo.url === src);
  return attribution
    ? { src, credit: `${attribution.credit} · ${attribution.license}`, source: attribution.sourcePage }
    : null;
}

export function generateStaticParams() {
  return areaSlugs.map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, area: rawArea } = await params;
  if (!isSaloArea(rawArea) || !supportedLocales.includes(rawLocale as Locale)) {
    return {};
  }

  const locale = rawLocale as Locale;
  const copy = areaCopy[rawArea][locale];
  return buildLocalizedMetadata({
    locale,
    title: copy.title,
    description: copy.intro,
    path: `salo/${rawArea}`,
    image: getAreaImage(rawArea)?.src,
  });
}

export default async function SaloAreaPage({
  params,
}: {
  params: Promise<{ locale: string; area: string }>;
}) {
  const { locale: rawLocale, area: rawArea } = await params;
  if (!isSaloArea(rawArea) || !supportedLocales.includes(rawLocale as Locale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const area = rawArea;
  const copy = areaCopy[area][locale];
  const image = getAreaImage(area);

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        {image ? (
          <Image
            src={image.src}
            alt={copy.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 -z-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/35" />
        <div className="container-narrow relative z-10 py-16 sm:py-24 lg:py-28">
          <Link
            href={`/${locale}/salo`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "fi" ? "Takaisin Salon seudun oppaaseen" : locale === "es" ? "Volver a la guía de Salo" : "Back to the Salo regional guide"}
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[.24em] text-gold-300">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.98] sm:text-7xl">{copy.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">{copy.intro}</p>
          {image ? (
            <a
              href={image.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block text-[11px] text-white/65 underline decoration-white/30 underline-offset-4 transition hover:text-white"
            >
              {locale === "fi" ? "Kuva:" : locale === "es" ? "Foto:" : "Photo:"} {image.credit}
            </a>
          ) : null}
        </div>
      </section>

      <SaloDirectory locale={locale} area={area} />

      <section className="bg-brand-50 py-14 sm:py-20">
        <div className="container-narrow flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-950">
              {locale === "fi" ? "Tutustu koko Salon seutuun" : locale === "es" ? "Descubre toda la región de Salo" : "Explore the wider Salo region"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {locale === "fi" ? "Yhdistä useita kyliä, luontokohteita ja paikallisia palveluja omaksi matkaksesi." : locale === "es" ? "Combina pueblos, naturaleza y servicios locales en tu propio viaje." : "Combine villages, nature and local services into a trip of your own."}
            </p>
          </div>
          <Link href={`/${locale}/salo`} className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-800">
            {locale === "fi" ? "Avaa Salon seudun opas" : locale === "es" ? "Abrir la guía de Salo" : "Open the Salo regional guide"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
