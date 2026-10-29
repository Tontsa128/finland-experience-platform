import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonPlaceDetail } from "@/components/salo/KimitoonPlaceDetail";
import { buildLocalizedMetadata } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const copy = {
    fi: { title: "Bengtskär – majakka ja meriretket", description: "Suunnittele vierailu Bengtskärin majakalle ja tarkista merikuljetusten ajantasaiset aikataulut suoraan järjestäjältä." },
    en: { title: "Bengtskär – lighthouse and sea excursions", description: "Plan a visit to Bengtskär Lighthouse and check current boat transfer schedules directly with the operator." },
    es: { title: "Bengtskär: faro y excursiones marítimas", description: "Planifica la visita al faro de Bengtskär y consulta los horarios actuales del transporte marítimo directamente con el operador." },
  } as const;
  return buildLocalizedMetadata({ locale: locale as Locale, title: copy[locale as Locale].title, description: copy[locale as Locale].description, path: "destinations/bengtskar", image: "https://cdn.johku.com/rosala/largefiles/94.jpg" });
}

export default async function BengtskarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <KimitoonPlaceDetail locale={locale as Locale} place="bengtskar" />;
}
