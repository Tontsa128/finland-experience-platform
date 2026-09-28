import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ValueStrip } from "@/components/home/ValueStrip";
import { FinalCta } from "@/components/home/FinalCta";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { CabinCard } from "@/components/ui/CabinCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import TravelAdvisor from "@/components/TravelAdvisor";
import { SUMMER_FALLBACK } from "@/lib/images";
import { destinations, cabins, experiences } from "@/lib/data";
import {
  getHomepageSettings,
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";
import {
  ArrowRight,
  Building2,
  Sparkles,
  Waves,
  TreePine,
} from "lucide-react";

const fallbackSummerImage = SUMMER_FALLBACK;

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences] =
    await Promise.all([
      getHomepageSettings(),
      getPublishedDestinations(),
      getPublishedProperties(),
      getPublishedExperiences(),
    ]);

  const t = await getTranslations({ locale, namespace: "sections" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const sh = await getTranslations({ locale, namespace: "summerHome" });

  const featuredDestinations = homepage?.featuredDestinationIds.length
    ? homepage.featuredDestinationIds
        .map((id) =>
          (cmsDestinations.length ? cmsDestinations : destinations).find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof destinations
    : (cmsDestinations.length ? cmsDestinations : destinations).slice(0, 3);

  const featuredCabins = homepage?.featuredPropertyIds.length
    ? homepage.featuredPropertyIds
        .map((id) =>
          (cmsCabins.length ? cmsCabins : cabins).find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof cabins
    : (cmsCabins.length ? cmsCabins : cabins).slice(0, 3);

  const featuredExperiences = homepage?.featuredExperienceIds.length
    ? homepage.featuredExperienceIds
        .map((id) =>
          (cmsExperiences.length ? cmsExperiences : experiences).find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof experiences
    : (cmsExperiences.length ? cmsExperiences : experiences).slice(0, 3);

  const summerImages = [
    featuredDestinations[1]?.images?.[0] || fallbackSummerImage,
    featuredDestinations[0]?.images?.[1] || fallbackSummerImage,
    featuredDestinations[2]?.images?.[0] || fallbackSummerImage,
    featuredCabins[0]?.images?.[0] || fallbackSummerImage,
  ];

  const summerChoices = [
    {
      key: "midnight",
      image: summerImages[0],
      icon: Sparkles,
      href: `/${locale}/experiences`,
      accent: "from-indigo-950/90 via-indigo-900/45 to-transparent",
    },
    {
      key: "sauna",
      image: summerImages[1],
      icon: Waves,
      href: `/${locale}/experiences`,
      accent: "from-slate-950/90 via-slate-900/35 to-transparent",
    },
    {
      key: "cities",
      image: summerImages[2],
      icon: Building2,
      href: `/${locale}/destinations`,
      accent: "from-brand-950/90 via-brand-900/40 to-transparent",
    },
    {
      key: "cabins",
      image: summerImages[3],
      icon: TreePine,
      href: `/${locale}/accommodations`,
      accent: "from-emerald-950/90 via-emerald-900/35 to-transparent",
    },
  ] as const;


  return (
    <>
      <Hero settings={homepage} />
      <ValueStrip
        destinations={(cmsDestinations.length ? cmsDestinations : destinations).length}
        stays={(cmsCabins.length ? cmsCabins : cabins).length}
        experiences={(cmsExperiences.length ? cmsExperiences : experiences).length}
      />

      <section className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,183,72,.22),transparent_35%)]" />
        <div className="container-narrow relative">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              {sh("eyebrow")}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
              {sh("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              {sh("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summerChoices.map(({ key, image, icon: Icon, href, accent }) => (
              <Link
                key={key}
                href={href}
                className="group relative min-h-[310px] overflow-hidden rounded-3xl"
              >
                <Image
                  src={image}
                  alt={sh(key)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${accent}`} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Icon className="h-5 w-5 text-gold-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{sh(key)}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    {sh(`${key}Desc`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-300">
                    {tc("learnMore")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-brand-50 py-20">
        <div className="container-narrow">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title mb-3">{t("featuredDestinations")}</h2>
              <p className="section-subtitle">{t("featuredDestinationsDesc")}</p>
            </div>
            <Link
              href={`/${locale}/destinations`}
              className="btn-secondary self-start sm:self-auto"
            >
              {tc("viewAll")}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-narrow">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title mb-3">{t("uniqueStays")}</h2>
              <p className="section-subtitle">{t("uniqueStaysDesc")}</p>
            </div>
            <Link
              href={`/${locale}/accommodations`}
              className="btn-secondary self-start sm:self-auto"
            >
              {tc("viewAll")}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCabins.map((c, i) => (
              <CabinCard key={c.id} cabin={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-narrow">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="section-title mb-3">{t("popularExperiences")}</h2>
              <p className="section-subtitle">{t("popularExperiencesDesc")}</p>
            </div>
            <Link
              href={`/${locale}/experiences`}
              className="btn-secondary self-start sm:self-auto"
            >
              {tc("viewAll")}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredExperiences.map((e, i) => (
              <ExperienceCard key={e.id} experience={e} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-20">
        <div className="container-narrow relative grid items-center gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              {sh("advisorEyebrow")}
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {sh("advisorTitle")}
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/70">
              {sh("advisorText")}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl">
            <div className="rounded-[1.35rem] bg-white p-5 sm:p-6">
              <TravelAdvisor language={locale as "fi" | "es" | "en"} />
              <div className="flex flex-wrap gap-3">
                {[sh("cabins"), sh("cities"), sh("midnight")].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-900"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <FinalCta locale={locale} />
    </>
  );
}
