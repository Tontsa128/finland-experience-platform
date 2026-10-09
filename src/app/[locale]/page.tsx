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
import {
  ArrowRight,
  Building2,
  Sparkles,
  Waves,
  TreePine,
} from "lucide-react";

const fallbackSummerImage = photoLibrary.turkuArchipelago;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences] =
    await Promise.all([
      getHomepageSettings(),
      getPublishedDestinations(),
      getPublishedProperties(),
      getPublishedExperiences(),
    ]);

  // Public pages must remain usable even when the optional CMS catalog is empty
  // (for example before a new Supabase migration has been applied).
  const catalogDestinations = cmsDestinations.length ? cmsDestinations : destinations;
  const catalogCabins = cmsCabins.length ? cmsCabins : cabins;
  const catalogExperiences = cmsExperiences.length ? cmsExperiences : experiences;

  const t = await getTranslations({ locale, namespace: "sections" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const sh = await getTranslations({ locale, namespace: "summerHome" });

  const featuredDestinations = homepage?.featuredDestinationIds.length
    ? homepage.featuredDestinationIds
        .map((id) =>
          catalogDestinations.find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof destinations
    : catalogDestinations.slice(0, 3);

  const featuredCabins = homepage?.featuredPropertyIds.length
    ? homepage.featuredPropertyIds
        .map((id) =>
          catalogCabins.find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof cabins
    : catalogCabins.slice(0, 3);

  const featuredExperiences = homepage?.featuredExperienceIds.length
    ? homepage.featuredExperienceIds
        .map((id) =>
          catalogExperiences.find(
            (item) => String(item.id) === id,
          ),
        )
        .filter(Boolean)
        .slice(0, 3) as typeof experiences
    : catalogExperiences.slice(0, 3);

  const summerImages = [
    featuredDestinations[1]?.images?.[0] || fallbackSummerImage,
    featuredDestinations[0]?.images?.[1] || fallbackSummerImage,
    featuredDestinations[2]?.images?.[0] || fallbackSummerImage,
    featuredCabins[0]?.images?.[0] || fallbackSummerImage,
  ];

  const coastalHighlights = ["salo-mathildedal", "naantali", "turku", "hanko", "aland"]
    .map((slug) => catalogDestinations.find((item) => item.slug === slug))
    .filter(Boolean)
    .slice(0, 5) as typeof destinations;

  return (
    <>
      <Hero settings={homepage} />
      <section className="border-y border-brand-100 bg-white py-7 sm:py-8">
        <div className="container-narrow">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              [Building2, "featureStays", `/${locale}/accommodations`],
              [Sparkles, "featureSauna", `/${locale}/sauna`],
              [Waves, "featureFood", `/${locale}/experiences`],
              [TreePine, "featureNature", `/${locale}/destinations`],
              [Waves, "featureArchipelago", `/${locale}/destinations`],
              [Sparkles, "featureSummer", "#find-your-finland"],
            ].map(([Icon, key, href]) => {
              const FeatureIcon = Icon as typeof Sparkles;
              return (
                <Link key={key as string} href={href as string} className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-brand-50">
                  <FeatureIcon className="h-7 w-7 shrink-0 text-brand-700" />
                  <span className="text-xs font-bold uppercase leading-5 tracking-[.12em] text-brand-950 group-hover:text-brand-700">
                    {sh(key as string)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-950 py-16 text-white sm:py-20">
        <div className="container-narrow">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{sh("coastalEyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{sh("coastalTitle")}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{sh("coastalText")}</p>
            </div>
            <Link href={`/${locale}/coastal-finland`} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-gold-300 hover:text-white">
              {sh("coastalCta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {coastalHighlights.map((destination) => (
              <Link
                key={destination.id}
                href={`/${locale}/${destination.slug === "salo-mathildedal" ? "salo" : destination.slug}`}
                className="group relative min-h-[280px] overflow-hidden rounded-[1.5rem] bg-brand-900"
              >
                <Image
                  src={destination.slug === "salo-mathildedal" ? photoLibrary.mathildedalHarbour : destination.images?.[0] || fallbackSummerImage}
                  alt={destination.slug === "salo-mathildedal" ? (locale === "fi" ? "Salon seutu" : locale === "es" ? "Región de Salo" : "Salo region") : destination.name[locale as keyof typeof destination.name] || destination.name.en}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-gold-300">{destination.region}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">
                    {destination.slug === "salo-mathildedal"
                      ? "Salo"
                      : destination.name[locale as keyof typeof destination.name] || destination.name.en}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-white/85">
                    {tc("learnMore")} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeasonalHighlights locale={locale as "fi" | "es" | "en"} />
      <LocalIcons locale={locale as "fi" | "es" | "en"} />

      <section id="find-your-finland" className="bg-snow py-16 sm:py-24">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("findEyebrow")}</p><h2 className="mt-4 section-title">{sh("findTitle")}</h2><p className="mt-4 section-subtitle mx-auto">{sh("findText")}</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["archipelago", Waves, `/${locale}/destinations`],
              ["sauna", Sparkles, `/${locale}/sauna`],
              ["nature", TreePine, `/${locale}/destinations`],
              ["food", Building2, `/${locale}/experiences`],
            ].map(([key, Icon, href]) => { const I = Icon as typeof Sparkles; return <Link key={key as string} href={href as string} className="group rounded-[1.75rem] bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"><I className="h-7 w-7 text-brand-700" /><h3 className="mt-7 font-display text-2xl font-bold text-brand-950">{sh(key as string)}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{sh(`${key}Desc` as string)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{tc("learnMore")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>; })}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
        <div className="container-narrow grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{sh("whyEyebrow")}</p><h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{sh("whyTitle")}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{sh("whyText")}</p></div><div className="overflow-hidden rounded-[2rem] shadow-2xl"><Image src={summerImages[2]} alt={sh("whyTitle")} width={1200} height={900} className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div></div>
      </section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="grid gap-6 lg:grid-cols-3">
        {[["smoke","sauna",`/${locale}/experiences`],["stay","stays",`/${locale}/accommodations`],["taste","food",`/${locale}/experiences`]].map(([key],index)=>{const images=[summerImages[1],summerImages[3],summerImages[0]];return <Link key={key} href={key==="smoke"?`/${locale}/experiences`:key==="stay"?`/${locale}/accommodations`:`/${locale}/experiences`} className="group relative min-h-[470px] overflow-hidden rounded-[2rem] bg-brand-950 text-white"><Image src={images[index]} alt={sh(key)} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-gold-300">{sh("experienceEyebrow")}</p><h3 className="mt-3 font-display text-3xl font-bold">{sh(key)}</h3><p className="mt-3 text-sm leading-6 text-white/80">{sh(`${key}Desc`)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-300">{tc("learnMore")} <ArrowRight className="h-4 w-4" /></span></div></Link>})}
      </div></div></section>
      <section className="bg-brand-50 py-20 sm:py-28"><div className="container-narrow grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("summerEyebrow")}</p><h2 className="mt-4 section-title">{sh("summerTitle")}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{sh("summerText")}</p><Link href={`/${locale}/experiences`} className="btn-primary mt-7">{sh("summerCta")} <ArrowRight className="h-4 w-4"/></Link></div><div className="grid grid-cols-2 gap-3"><Image src={summerImages[0]} alt={sh("summerTitle")} width={900} height={1100} className="aspect-[3/4] rounded-[1.75rem] object-cover"/><Image src={summerImages[1]} alt={sh("summerTitle")} width={900} height={1100} className="mt-10 aspect-[3/4] rounded-[1.75rem] object-cover"/></div></div></section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("destinationsEyebrow")}</p><h2 className="mt-3 section-title">{t("featuredDestinations")}</h2></div><Link href={`/${locale}/destinations`} className="btn-secondary hidden sm:inline-flex">{tc("viewAll")}</Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredDestinations.map((d,i)=><DestinationCard key={d.id} destination={d} index={i}/>)}</div></div></section>
      <section className="bg-slate-50 py-20 sm:py-28"><div className="container-narrow"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("staysEyebrow")}</p><h2 className="mt-3 section-title">{t("uniqueStays")}</h2></div><Link href={`/${locale}/accommodations`} className="btn-secondary hidden sm:inline-flex">{tc("viewAll")}</Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredCabins.map((c,i)=><CabinCard key={c.id} cabin={c} index={i}/>)}</div></div></section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("experiencesEyebrow")}</p><h2 className="mt-3 section-title">{t("popularExperiences")}</h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredExperiences.map((e,i)=><ExperienceCard key={e.id} experience={e} index={i}/>)}</div></div></section>
      <section className="bg-brand-950 py-20 text-white sm:py-28"><div className="container-narrow grid items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-gold-300">{sh("directEyebrow")}</p><h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{sh("directTitle")}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-white/70">{sh("directText")}</p></div><div className="rounded-[2rem] border border-white/10 bg-white/5 p-8"><div className="text-5xl">01</div><p className="mt-4 font-display text-2xl font-bold">{sh("directStep1")}</p><div className="my-5 h-px bg-white/10"/><div className="text-5xl">02</div><p className="mt-4 font-display text-2xl font-bold">{sh("directStep2")}</p></div></div></section>
      <section className="bg-snow py-20 sm:py-28"><div className="container-narrow"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("advisorEyebrow")}</p><h2 className="mt-4 section-title">{sh("advisorTitle")}</h2><p className="mt-4 section-subtitle mx-auto">{sh("advisorText")}</p><Link href={`/${locale}/plan`} className="btn-gold mt-6 inline-flex">{locale === "es" ? "Diseña tu viaje" : locale === "en" ? "Plan your trip" : "Suunnittele matkasi"} <ArrowRight className="h-4 w-4"/></Link></div><div className="mx-auto mt-10 max-w-5xl rounded-[2rem] bg-white p-3 shadow-card"><div className="rounded-[1.5rem] bg-brand-50 p-5 sm:p-7"><TravelAdvisor
  language={locale as "fi"|"es"|"en"}
  catalog={{
    destinations: catalogDestinations.map((d) => ({
      slug: d.slug, name: d.name, description: d.shortDescription, tags: d.tags || [], activities: d.activities || [], verified: d.verified,
    })),
    accommodations: catalogCabins.map((c) => ({
      slug: c.slug, name: c.name, description: c.description, location: c.location, features: c.features || [], price: c.pricePerNight, verified: c.verified,
    })),
    experiences: catalogExperiences.map((e) => ({
      slug: e.slug, name: e.name, description: e.shortDescription, region: e.region, tags: e.tags || [], price: e.price, verified: e.verified,
    })),
  }}
/></div></div></div></section>
      <section className="relative isolate overflow-hidden bg-brand-950 py-24 text-center text-white sm:py-32"><Image src={summerImages[0]} alt="" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover opacity-35" /><div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/75 via-brand-950/80 to-brand-950" /><div className="container-narrow"><p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{sh("finalEyebrow")}</p><h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-bold leading-[.98] tracking-[-.03em] sm:text-7xl">{sh("finalTitle")}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">{sh("finalText")}</p><Link href={`/${locale}/destinations`} className="btn-gold mt-8 px-8 py-4 shadow-2xl">{sh("finalCta")} <ArrowRight className="h-4 w-4"/></Link></div></section>
    </>
  );
}