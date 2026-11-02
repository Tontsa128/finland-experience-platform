import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import { getPageOverride, PageOverride } from "@/components/cms/PageOverride";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { SaloAreaGrid } from "@/components/salo/SaloAreaGrid";

const copy = {
  fi: {
    title: "Salo – kyliä, merta ja elämyksiä",
    desc: "Tutustu Salon kyliin, paikalliseen ruokaan, majoitukseen, luontoon ja elämyksiin.",
    eyebrow: "SALON SEUTU · LOUNAIS-SUOMI",
    intro: "Valitse kylä tai alue ja löydä sen omat palvelut, paikalliset maut ja elämykset.",
    browse: "Tutustu kyliin",
    coastal: "Rannikon Suomi",
  },
  es: {
    title: "Salo – pueblos, mar y experiencias",
    desc: "Descubre los pueblos de Salo, su gastronomía, alojamiento, naturaleza y experiencias.",
    eyebrow: "REGIÓN DE SALO · SUROESTE DE FINLANDIA",
    intro: "Elige un pueblo o una zona para descubrir sus servicios, sabores y experiencias locales.",
    browse: "Explorar los pueblos",
    coastal: "Finlandia costera",
  },
  en: {
    title: "Salo – villages, sea and experiences",
    desc: "Explore Salo's villages, local food, accommodation, nature and experiences.",
    eyebrow: "SALO REGION · SOUTHWEST FINLAND",
    intro: "Choose a village or area to discover its local services, flavours and experiences.",
    browse: "Explore the villages",
    coastal: "Coastal Finland",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const c = copy[locale] || copy.en;
  return buildLocalizedMetadata({ locale, title: c.title, description: c.desc, path: "salo", image: photoLibrary.saloVeturitalli });
}

export default async function SaloPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const cmsPage = await getPageOverride(locale, "salo");
  if (cmsPage) return <PageOverride page={cmsPage} locale={locale} />;
  const c = copy[locale] || copy.en;

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <Image src={photoLibrary.saloVeturitalli} alt={locale === "fi" ? "Salon taidemuseo Veturitalli" : locale === "es" ? "Museo de Arte Veturitalli de Salo" : "Salo Art Museum Veturitalli"} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/65 to-brand-950/15" />
        <div className="container-narrow relative py-24 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] sm:text-7xl lg:text-8xl">{c.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-9">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#salo-areas" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">{c.browse}<ArrowRight className="h-4 w-4" /></Link>
            <Link href={`/${locale}/coastal-finland#sarkisalo`} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-6 py-3.5 text-sm font-bold text-white">{c.coastal}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <SaloAreaGrid locale={locale} />

    </main>
  );
}
