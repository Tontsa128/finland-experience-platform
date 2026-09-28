import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { CabinCard } from "@/components/ui/CabinCard";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { Testimonials } from "@/components/home/Testimonials";
import TravelAdvisor from "@/components/TravelAdvisor";
import { destinations, cabins, experiences } from "@/lib/data";
import {
  getHomepageSettings,
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
  getActiveBanners,
} from "@/lib/public-content";
import {
  ArrowRight,
  Building2,
  Flame,
  Sparkles,
  Sun,
  Waves,
  TreePine,
} from "lucide-react";

const fallbackSummerImage =
  "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1800";

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences, banners] =
    await Promise.all([
      getHomepageSettings(),
      getPublishedDestinations(),
      getPublishedProperties(),
      getPublishedExperiences(),
      getActiveBanners(locale as "fi" | "es" | "en"),
    ]);

  const t = await getTranslations({ locale, namespace: "sections" });
  const tw = await getTranslations({ locale, namespace: "why" });
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

  const storyImage = featuredDestinations[0]?.images?.[0] || fallbackSummerImage;
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

  const whyItems = [
    { key: "nature", icon: TreePine },
    { key: "lights", icon: Sparkles },
    { key: "sauna", icon: Waves },
    { key: "design", icon: Building2 },
  ] as const;

  return (
    <>
      <Hero settings={homepage} />

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

      {banners[0] && (
        <section className="bg-brand-900 text-white">
          <div className="container-narrow flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">{banners[0].title}</p>
              <p className="text-sm text-white/80">{banners[0].text}</p>
            </div>
            {banners[0].ctaUrl && (
              <Link href={banners[0].ctaUrl} className="btn-gold shrink-0">
                {banners[0].ctaLabel || tc("viewAll")}
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="bg-white py-20 sm:py-24">
        <div className="container-narrow grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="relative min-h-[430px] overflow-hidden rounded-[2rem]">
            <Image
              src={storyImage}
              alt={sh("storyTitle")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md">
              <Sun className="mr-2 inline h-4 w-4 text-gold-400" />
              {sh("storyEyebrow")}
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
              {sh("storyEyebrow")}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-brand-950 sm:text-5xl">
              {sh("storyTitle")}
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {sh("storyText")}
            </p>
            <Link
              href={`/${locale}/destinations`}
              className="btn-gold mt-7 inline-flex items-center gap-2"
            >
              {sh("storyCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
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

      <section className="bg-white py-20">
        <div className="container-narrow">
          <div className="mb-14 text-center">
            <h2 className="section-title mb-3">{t("whyFinland")}</h2>
            <p className="section-subtitle mx-auto">{t("whyFinlandDesc")}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItems.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-2xl bg-brand-50 p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-900">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-brand-900">
                  {tw(`${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {tw(`${key}.desc`)}
                </p>
              </div>
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

      <Testimonials />

      <section className="py-20">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-16 text-center text-white sm:px-12">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-4 font-display text-3xl font-bold sm:text-4xl">
                {t("newsletter")}
              </h2>
              <p className="mb-8 text-lg text-white/90">{t("newsletterDesc")}</p>
              <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 rounded-full border-0 px-5 py-3.5 text-sm text-slate-900"
                />
                <button type="submit" className="btn-gold whitespace-nowrap px-8">
                  {locale === "fi" ? "Tilaa" : locale === "es" ? "Suscribirme" : "Subscribe"}
                </button>
              </form>
              <div className="mt-10 border-t border-white/20 pt-8">
                <p className="mb-4 text-white/80">
                  {locale === "fi"
                    ? "Valmis aloittamaan kesäseikkailun?"
                    : locale === "es"
                      ? "¿Listo para comenzar tu aventura de verano?"
                      : "Ready to start your summer adventure?"}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex rounded-full border-2 border-white/80 bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white hover:text-brand-900"
                >
                  {tc("contact")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
