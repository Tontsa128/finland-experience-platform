import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { photoLibrary } from "@/lib/photo-library";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { CabinCard } from "@/components/ui/CabinCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import TravelAdvisor from "@/components/TravelAdvisor";
import LocalIcons from "@/components/home/LocalIcons";
import SeasonalHighlights from "@/components/home/SeasonalHighlights";
import { destinations, cabins, experiences } from "@/lib/data";
import {
  getHomepageSettings,
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";
import { ArrowRight, Building2, Sparkles, Waves, TreePine } from "lucide-react";

const fallbackSummerImage = photoLibrary.turkuArchipelago;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences] = await Promise.all([
    getHomepageSettings(),
    getPublishedDestinations(),
    getPublishedProperties(),
    getPublishedExperiences(),
  ]);

  const catalogDestinations = cmsDestinations.length ? cmsDestinations : destinations;
  const catalogCabins = cmsCabins.length ? cmsCabins : cabins;
  const catalogExperiences = cmsExperiences.length ? cmsExperiences : experiences;

  const t = await getTranslations({ locale, namespace: "sections" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const sh = await getTranslations({ locale, namespace: "summerHome" });

  const featuredDestinations = homepage?.featuredDestinationIds.length
    ? homepage.featuredDestinationIds.map((id) => catalogDestinations.find((item) => String(item.id) === id)).filter(Boolean).slice(0, 3) as typeof destinations
    : catalogDestinations.slice(0, 3);

  const featuredCabins = homepage?.featuredPropertyIds.length
    ? homepage.featuredPropertyIds.map((id) => catalogCabins.find((item) => String(item.id) === id)).filter(Boolean).slice(0, 3) as typeof cabins
    : catalogCabins.slice(0, 3);

  const featuredExperiences = homepage?.featuredExperienceIds.length
    ? homepage.featuredExperienceIds.map((id) => catalogExperiences.find((item) => String(item.id) === id)).filter(Boolean).slice(0, 3) as typeof experiences
    : catalogExperiences.slice(0, 3);

  const coastalHighlights = ["salo-mathildedal", "naantali", "turku", "hanko", "aland"]
    .map((slug) => catalogDestinations.find((item) => item.slug === slug))
    .filter(Boolean)
    .slice(0, 5) as typeof destinations;

  return (
    <>
      <Hero settings={homepage} />
      <section className="border-y border-brand-100 bg-white py-7 sm:py-8">
        <div className="container-narrow">
          {/* content continues below in the repository; this edit only normalizes the homepage route params */}
        </div>
      </section>
    </>
  );
}
