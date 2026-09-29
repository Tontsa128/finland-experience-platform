import { getTranslations } from "next-intl/server";
import TripPlanner from "@/components/TripPlanner";
import {
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";

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
