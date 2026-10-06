import type { Metadata } from "next";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getPublishedExperiences } from "@/lib/public-content";
import ExperienceDirectory from "@/components/experiences/ExperienceDirectory";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const copy = locale === "fi"
    ? { title: "Elämykset Salossa | Mathildedal, Teijo & Särkisalo", description: "Löydä Salon alueen luonto-, sauna-, saaristo-, maatila-, ruoka-, kulttuuri- ja aktiivielämykset kartalta." }
    : locale === "es"
      ? { title: "Experiencias en Salo | Mathildedal, Teijo y Särkisalo", description: "Descubre naturaleza, sauna, archipiélago, granjas, gastronomía, cultura y actividades en el sur de Salo." }
      : { title: "Experiences in Salo | Mathildedal, Teijo & Särkisalo", description: "Discover nature, sauna, archipelago, farm, food, culture and active experiences around Salo." };
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "experiences" });
}

export default async function ExperiencesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsExperiences = await getPublishedExperiences();
  const experiences = cmsExperiences;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fi" ? "Salon alueen elämykset" : locale === "es" ? "Experiencias en Salo" : "Experiences in Salo",
    itemListElement: experiences.map((experience, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: experience.name[locale] || experience.name.fi,
      url: `/${locale}/experiences/${experience.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ExperienceDirectory experiences={experiences} locale={locale} />
    </>
  );
}
