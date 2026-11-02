import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SaloAreaGrid } from "@/components/salo/SaloAreaGrid";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

const supportedLocales: Locale[] = ["fi", "es", "en"];

const copy: Record<Locale, { title: string; description: string; back: string }> = {
  fi: {
    title: "Salon kylät ja alueet",
    description: "Valitse kylä tutustuaksesi sen palveluihin, paikallisiin makuihin, luontoon ja elämyksiin.",
    back: "Takaisin Salon esittelyyn",
  },
  es: {
    title: "Pueblos y zonas de Salo",
    description: "Elige un pueblo para descubrir sus servicios, sabores locales, naturaleza y experiencias.",
    back: "Volver a la presentación de Salo",
  },
  en: {
    title: "Villages and areas of Salo",
    description: "Choose a village to explore its services, local flavours, nature and experiences.",
    back: "Back to the Salo introduction",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!supportedLocales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  return buildLocalizedMetadata({
    locale,
    title: copy[locale].title,
    description: copy[locale].description,
    path: "salo/kylat",
  });
}

export default async function SaloVillagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!supportedLocales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <main className="bg-white">
      <section className="bg-brand-950 text-white">
        <div className="container-narrow py-10 sm:py-14">
          <Link
            href={`/${locale}/salo`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy[locale].back}
          </Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.24em] text-gold-300">SALO · FINLAND</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{copy[locale].title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{copy[locale].description}</p>
        </div>
      </section>
      <SaloAreaGrid locale={locale} />
    </main>
  );
}
