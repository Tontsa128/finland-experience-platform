import { getTranslations } from "next-intl/server";
import TripPlanner from "@/components/TripPlanner";
import type { Metadata } from "next";
import type { Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";
import {
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const copy = locale === "fi"
    ? { title: "Suunnittele matkasi Suomeen | Finland Experience", description: "Luo inspiraatiopohjainen matkasuunnitelma tarkistetusta mökki-, elämyksiä ja kohteita sisältävästä katalogista." }
    : locale === "es"
      ? { title: "Diseña tu viaje a Finlandia | Finland Experience", description: "Crea una propuesta de viaje usando un catálogo verificado de alojamientos, experiencias y destinos." }
      : { title: "Plan Your Finland Trip | Finland Experience", description: "Create a trip starting point from a verified catalogue of stays, experiences and destinations." };
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description, path: "plan" });
}

export default async function PlanPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const lang = (locale === "es" || locale === "en" ? locale : "fi") as
    | "fi"
    | "es"
    | "en";

  const [cmsDestinations, cmsCabins, cmsExperiences] = await Promise.all([
    getPublishedDestinations(),
    getPublishedProperties(),
    getPublishedExperiences(),
  ]);

  await getTranslations({ locale, namespace: "common" });

  const destinationSource = cmsDestinations.filter((item) => item.verified === true);
  const accommodationSource = cmsCabins.filter((item) => item.verified === true);
  const experienceSource = cmsExperiences.filter((item) => item.verified === true);

  return (
    <main className="bg-snow py-12 sm:py-20">
      <div className="container-narrow">
        <TripPlanner
          language={lang}
          catalog={{
            destinations: destinationSource,
            accommodations: accommodationSource,
            experiences: experienceSource,
          }}
        />
      </div>
    </main>
  );
}
