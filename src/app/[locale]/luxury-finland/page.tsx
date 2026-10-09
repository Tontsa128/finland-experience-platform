import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { photoLibrary } from "@/lib/photo-library";
import { LuxuryDirectory } from "@/components/luxury/LuxuryDirectory";

const heroImage = photoLibrary.mathildedalHarbour;

const copy = {
  fi: {
    title: "Luxury & Authentic Finland",
    intro: "Sauna, saaristo, lähiruoka ja uniikit yöpymiset Etelä-Suomessa.",
    note: "Finland Experience Platform on inspiraatio- ja löytöpalvelu. Et varaa tai maksa meille — siirryt aina palveluntarjoajan omalle sivulle.",
    back: "Takaisin kohteisiin",
  },
  es: {
    title: "Luxury & Authentic Finland",
    intro: "Sauna, archipiélago, gastronomía local y estancias únicas en el sur de Finlandia.",
    note: "Finland Experience Platform es un servicio de inspiración y descubrimiento. Reservas y pagos se realizan directamente con cada proveedor.",
    back: "Volver a destinos",
  },
  en: {
    title: "Luxury & Authentic Finland",
    intro: "Sauna, archipelago, local food and unique stays in Southern Finland.",
    note: "Finland Experience Platform is an inspiration and discovery service. You book and pay directly with each provider.",
    back: "Back to destinations",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return buildLocalizedMetadata({
    locale,
    title: copy[locale].title,
    description: copy[locale].intro,
  });
}

export default async function LuxuryFinlandPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const c = copy[locale];

  return (
    <div className="bg-white">
      <section className="relative min-h-[62vh] overflow-hidden bg-brand-950 text-white">
        <Image src={heroImage} alt="Finnish archipelago and cottage sauna" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/45 to-black/10" />
        <div className="container-narrow relative flex min-h-[62vh] items-end py-16 sm:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">Southern Finland · Archipelago · Sauna · Food</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[.98] sm:text-7xl">{c.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-white/85">{c.intro}</p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70">{c.note}</p>
            <Link href={`/${locale}/destinations`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950">
              {c.back}<ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <LuxuryDirectory locale={locale} />
    </div>
  );
}
