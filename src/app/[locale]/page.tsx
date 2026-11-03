import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { VisitorCounter } from "@/components/home/VisitorCounter";
import { photoLibrary, photoCredits } from "@/lib/photo-library";
import { HomeDestinationFeatureCard } from "@/components/home/HomeDestinationFeatureCard";
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


type HomeLocale = "fi" | "en" | "es";

const homepageDestinationFeatures = {
  "salo-mathildedal": {
    image: photoLibrary.mathildedalVillage,
    eyebrow: {
      fi: "Mathildedal · Teijo · Särkisalo",
      en: "Mathildedal · Teijo · Särkisalo",
      es: "Mathildedal · Teijo · Särkisalo",
    },
    imageAlt: {
      fi: "Mathildedalin historialliset ruukkikylän rakennukset",
      en: "Historic ironworks village buildings in Mathildedal",
      es: "Edificios históricos del antiguo pueblo siderúrgico de Mathildedal",
    },
    description: {
      fi: "Tutustu Mathildedalin historialliseen ruukkimiljööseen, Teijon metsä- ja järvimaisemiin sekä Särkisalon merellisiin kyliin. Paikalliset kahvilat, ravintolat, saunat ja pienet elämykset kutsuvat viipymään.",
      en: "Explore Mathildedal’s historic ironworks setting, the forests and lakes of Teijo, and the coastal villages of Särkisalo. Local cafés, restaurants, saunas and small-scale experiences invite you to slow down.",
      es: "Descubre el histórico entorno siderúrgico de Mathildedal, los bosques y lagos de Teijo y los pueblos costeros de Särkisalo. Cafés, restaurantes, saunas y experiencias locales invitan a disfrutar sin prisas.",
    },
  },
  naantali: {
    image: photoLibrary.naantaliOldTown,
    eyebrow: {
      fi: "Naantali · Saaristomeri",
      en: "Naantali · Archipelago Sea",
      es: "Naantali · Mar del Archipiélago",
    },
    imageAlt: {
      fi: "Naantalin vanhankaupungin historialliset puutalot",
      en: "Historic wooden houses in Naantali Old Town",
      es: "Casas históricas de madera en el casco antiguo de Naantali",
    },
    description: {
      fi: "Kulje vanhankaupungin puutalokujilla, nauti sataman tunnelmasta ja suuntaa saaristoon. Naantalissa yhdistyvät merellinen kaupunkielämä, kulttuuri ja koko perheelle sopivat elämykset.",
      en: "Wander the wooden streets of the Old Town, enjoy the harbour atmosphere and head out into the archipelago. Naantali brings together seaside town life, culture and experiences for the whole family.",
      es: "Pasea por las calles de madera del casco antiguo, disfruta del ambiente del puerto y descubre el archipiélago. Naantali combina vida junto al mar, cultura y experiencias para toda la familia.",
    },
  },
  turku: {
    image: photoLibrary.turkuAura,
    eyebrow: {
      fi: "Turku · Aurajoki",
      en: "Turku · Aura River",
      es: "Turku · Río Aura",
    },
    imageAlt: {
      fi: "Aurajoki ja Turun kaupunkimaisema",
      en: "The Aura River and cityscape of Turku",
      es: "El río Aura y el paisaje urbano de Turku",
    },
    description: {
      fi: "Aurajoen rantareitit, Turun linna, museot ja ravintolat tekevät kaupungista kiinnostavan pysähdyksen. Täältä on helppo jatkaa merelle ja Turun saariston kyliin.",
      en: "Riverside paths, Turku Castle, museums and restaurants make the city a rewarding stop. From here, it is easy to continue towards the sea and the villages of the Turku Archipelago.",
      es: "Los paseos junto al río Aura, el castillo de Turku, los museos y los restaurantes hacen de la ciudad una parada llena de interés. Desde aquí es fácil continuar hacia el mar y los pueblos del archipiélago de Turku.",
    },
  },
  hanko: {
    image: photoLibrary.hankoRegattaBeach,
    eyebrow: {
      fi: "Hanko · Suomen etelärannikko",
      en: "Hanko · Southern coast of Finland",
      es: "Hanko · Costa sur de Finlandia",
    },
    imageAlt: {
      fi: "Regattanrannan hiekkaranta Hangossa",
      en: "Regatta Beach in Hanko",
      es: "La playa de Regatta en Hanko",
    },
    description: {
      fi: "Hiekkarannat, avomeren läheisyys, historialliset huvilat ja vierassatama luovat Hangolle oman merellisen tunnelman. Tutustu rantareitteihin, luontoon ja paikallisiin ruokapaikkoihin.",
      en: "Sandy beaches, the open sea, historic villas and the guest harbour give Hanko its distinctive coastal character. Discover the waterfront paths, nature and local places to eat.",
      es: "Las playas de arena, el mar abierto, las villas históricas y el puerto deportivo dan a Hanko su carácter costero. Descubre los paseos junto al mar, la naturaleza y la gastronomía local.",
    },
  },
  aland: {
    image: photoLibrary.aland,
    eyebrow: {
      fi: "Ahvenanmaa · Saaristo",
      en: "Åland · Archipelago",
      es: "Åland · Archipiélago",
    },
    imageAlt: {
      fi: "Kastelholman historiallinen ympäristö Ahvenanmaalla",
      en: "The historic Kastelholm area in Åland",
      es: "El entorno histórico de Kastelholm en Åland",
    },
    description: {
      fi: "Punaiset graniittikalliot, pienet satamat, pyöräilyreitit ja Kastelholman historiallinen ympäristö tekevät Ahvenanmaasta omanlaisensa saaristokohteen. Löydä paikallisia makuja ja reittejä saarelta toiselle.",
      en: "Red granite cliffs, small harbours, cycling routes and the historic Kastelholm area give Åland a character all of its own. Discover local flavours and routes from one island to the next.",
      es: "Los acantilados de granito rojo, los pequeños puertos, las rutas ciclistas y el entorno histórico de Kastelholm dan a Åland un carácter único. Descubre sabores locales y rutas entre las islas.",
    },
  },
} satisfies Record<
  "salo-mathildedal" | "naantali" | "turku" | "hanko" | "aland",
  {
    image: string;
    eyebrow: Record<HomeLocale, string>;
    imageAlt: Record<HomeLocale, string>;
    description: Record<HomeLocale, string>;
  }
>;

function getHomepagePhotoCredit(image: string) {
  return photoCredits.find((photo) => photo.url === image);
}

function getHomepageDestinationHref(slug: string, locale: string) {
  if (slug === "salo-mathildedal") return `/${locale}/salo`;
  const anchor = slug === "aland" ? "aland" : slug === "turku" ? "turku-archipelago" : slug;
  return `/${locale}/coastal-finland#${anchor}`;
}

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

  const kimitoonPhoto = getHomepagePhotoCredit(photoLibrary.rosalaVikingCentre);
  const kimitoonImageUsageNote = kimitoonPhoto && (kimitoonPhoto.license.startsWith("CC BY") || kimitoonPhoto.license === "Public domain")
    ? kimitoonPhoto.license
    : locale === "fi" ? "Palveluntarjoajan kuva" : locale === "es" ? "Imagen del proveedor" : "Provider image";

  return (
    <>
      <VisitorCounter locale={locale as "fi" | "es" | "en"} />
      <Hero settings={homepage} />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f1e8] via-[#fbfaf7] to-[#edf3ed] py-14 sm:py-20"><div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dce9df]/60 blur-3xl" /><div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#f0e4d1]/70 blur-3xl" /><div className="container-narrow"><div className="mx-auto mb-10 max-w-4xl rounded-[2rem] border border-[#e8e1d5] bg-white/90 px-6 py-9 text-center shadow-[0_18px_60px_rgba(47,65,49,0.08)] sm:px-12 sm:py-12"><p className="text-xs font-bold uppercase tracking-[.24em] text-brand-700">{sh("advisorEyebrow")}</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-brand-950 sm:text-5xl">{sh("advisorTitle")}</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{sh("advisorText")}</p><Link href={`/${locale}/plan`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#dfe9df] px-7 py-3.5 text-sm font-bold text-brand-950 shadow-sm transition hover:bg-[#cddfce]">{locale === "es" ? "Diseña tu viaje" : locale === "en" ? "Plan your trip" : "Suunnittele matkasi"} <ArrowRight className="h-4 w-4"/></Link></div><TravelAdvisor
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
/></div></section>
      <section className="border-y border-brand-100 bg-white py-7 sm:py-8">
        <div className="container-narrow">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              [Building2, "featureStays", `/${locale}/accommodations`],
              [Sparkles, "featureSauna", `/${locale}/experiences`],
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

      <section className="bg-[#f1f4ee] py-16 text-brand-950 sm:py-20">
        <div className="container-narrow">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-brand-700">{sh("coastalEyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{sh("coastalTitle")}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{sh("coastalText")}</p>
            </div>
            <Link href={`/${locale}/coastal-finland`} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-800 hover:text-brand-600">
              {sh("coastalCta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
            {coastalHighlights.map((destination, index) => {
              const feature = homepageDestinationFeatures[destination.slug as keyof typeof homepageDestinationFeatures];
              if (!feature) return null;
              const photo = getHomepagePhotoCredit(feature.image);
              if (!photo) return null;
              const localizedName = destination.name[locale as HomeLocale] || destination.name.en;
              const imageUsageNote = photo.license.startsWith("CC BY") || photo.license === "Public domain"
                ? photo.license
                : locale === "fi" ? "Palveluntarjoajan kuva" : locale === "es" ? "Imagen del proveedor" : "Provider image";
              return (
                <div
                  key={destination.id}
                  className={index === 4 ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-0.625rem)]" : ""}
                >
                  <HomeDestinationFeatureCard
                    href={getHomepageDestinationHref(destination.slug, locale)}
                    image={feature.image}
                    imageAlt={feature.imageAlt[locale as HomeLocale]}
                    eyebrow={feature.eyebrow[locale as HomeLocale]}
                    title={localizedName}
                    description={feature.description[locale as HomeLocale]}
                    actionLabel={locale === "fi" ? "Tutustu kohteeseen" : locale === "es" ? "Descubre el destino" : "Discover the destination"}
                    imageCredit={photo.credit}
                    imageUsageNote={imageUsageNote}
                    imageSource={photo.sourcePage}
                    imageSourceLabel={locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la imagen" : "Image source"}
                    priority={index < 2}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="container-narrow">
          <HomeDestinationFeatureCard
            href={`/${locale}/destinations/kemionsaari`}
            image={photoLibrary.rosalaVikingCentre}
            imageAlt={locale === "fi" ? "Rosalan viikinkikeskus Kemiönsaarella" : locale === "es" ? "Centro Vikingo de Rosala en Kimitoön" : "Rosala Viking Centre on Kimitoön"}
            imageBadge={locale === "fi" ? "Uusi kohdealue" : locale === "es" ? "Nuevo destino" : "New destination"}
            headingLevel="h2"
            imageSize="feature"
            eyebrow={locale === "fi" ? "Saariston portti · Varsinais-Suomi" : locale === "es" ? "Puerta al archipiélago · Finlandia suroccidental" : "Gateway to the archipelago · Southwest Finland"}
            title={locale === "fi" ? "Kemiö ja Kemiönsaari" : locale === "es" ? "Kimitoön y el archipiélago" : "Kimitoön and the Archipelago"}
            description={locale === "fi" ? "Satamia, saaristokyliä, paikallisia makuja, historiaa ja merellisiä retkiä. Löydä saariston oma rytmi ja suunnittele matka suoraan paikallisten palveluntarjoajien avulla." : locale === "es" ? "Puertos, pueblos isleños, sabores locales, historia y excursiones marítimas. Descubre el ritmo del archipiélago y planifica tu viaje con proveedores locales." : "Harbours, island villages, local flavours, history and sea adventures. Discover the archipelago at your own pace and plan your trip with local providers."}
            actionLabel={locale === "fi" ? "Tutustu Kemiönsaareen" : locale === "es" ? "Descubre Kimitoön" : "Explore Kimitoön"}
            imageCredit={kimitoonPhoto?.credit}
            imageUsageNote={kimitoonImageUsageNote}
            imageSource={kimitoonPhoto?.sourcePage}
            imageSourceLabel={locale === "fi" ? "Kuvan lähde" : locale === "es" ? "Fuente de la imagen" : "Image source"}
          />
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
              ["sauna", Sparkles, `/${locale}/experiences`],
              ["nature", TreePine, `/${locale}/destinations`],
              ["food", Building2, `/${locale}/experiences`],
            ].map(([key, Icon, href]) => { const I = Icon as typeof Sparkles; return <Link key={key as string} href={href as string} className="group rounded-[1.75rem] bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"><I className="h-7 w-7 text-brand-700" /><h3 className="mt-7 font-display text-2xl font-bold text-brand-950">{sh(key as string)}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{sh(`${key}Desc` as string)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{tc("learnMore")} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>; })}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#f1f4ee] py-20 text-brand-950 sm:py-28">
        <div className="container-narrow grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-700">{sh("whyEyebrow")}</p><h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{sh("whyTitle")}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{sh("whyText")}</p></div><div className="overflow-hidden rounded-[2rem] shadow-2xl"><Image src={summerImages[2]} alt={sh("whyTitle")} width={1200} height={900} className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div></div>
      </section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="grid gap-6 lg:grid-cols-3">
        {[["smoke","sauna",`/${locale}/experiences`],["stay","stays",`/${locale}/accommodations`],["taste","food",`/${locale}/experiences`]].map(([key],index)=>{const images=[summerImages[1],summerImages[3],summerImages[0]];return <Link key={key} href={key==="smoke"?`/${locale}/experiences`:key==="stay"?`/${locale}/accommodations`:`/${locale}/experiences`} className="group relative min-h-[470px] overflow-hidden rounded-[2rem] bg-brand-950 text-white"><Image src={images[index]} alt={sh(key)} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7"><p className="text-xs font-bold uppercase tracking-[.18em] text-gold-300">{sh("experienceEyebrow")}</p><h3 className="mt-3 font-display text-3xl font-bold">{sh(key)}</h3><p className="mt-3 text-sm leading-6 text-white/80">{sh(`${key}Desc`)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-300">{tc("learnMore")} <ArrowRight className="h-4 w-4" /></span></div></Link>})}
      </div></div></section>
      <section className="bg-brand-50 py-20 sm:py-28"><div className="container-narrow grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("summerEyebrow")}</p><h2 className="mt-4 section-title">{sh("summerTitle")}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{sh("summerText")}</p><Link href={`/${locale}/experiences`} className="btn-primary mt-7">{sh("summerCta")} <ArrowRight className="h-4 w-4"/></Link></div><div className="grid grid-cols-2 gap-3"><Image src={summerImages[0]} alt={sh("summerTitle")} width={900} height={1100} className="aspect-[3/4] rounded-[1.75rem] object-cover"/><Image src={summerImages[1]} alt={sh("summerTitle")} width={900} height={1100} className="mt-10 aspect-[3/4] rounded-[1.75rem] object-cover"/></div></div></section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("destinationsEyebrow")}</p><h2 className="mt-3 section-title">{t("featuredDestinations")}</h2></div><Link href={`/${locale}/destinations`} className="btn-secondary hidden sm:inline-flex">{tc("viewAll")}</Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredDestinations.map((d,i)=><DestinationCard key={d.id} destination={d} index={i}/>)}</div></div></section>
      <section className="bg-slate-50 py-20 sm:py-28"><div className="container-narrow"><div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("staysEyebrow")}</p><h2 className="mt-3 section-title">{t("uniqueStays")}</h2></div><Link href={`/${locale}/accommodations`} className="btn-secondary hidden sm:inline-flex">{tc("viewAll")}</Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredCabins.map((c,i)=><CabinCard key={c.id} cabin={c} index={i}/>)}</div></div></section>
      <section className="bg-white py-20 sm:py-28"><div className="container-narrow"><div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-600">{sh("experiencesEyebrow")}</p><h2 className="mt-3 section-title">{t("popularExperiences")}</h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredExperiences.map((e,i)=><ExperienceCard key={e.id} experience={e} index={i}/>)}</div></div></section>
      <section className="bg-[#edf2eb] py-20 text-brand-950 sm:py-28"><div className="container-narrow grid items-center gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-brand-700">{sh("directEyebrow")}</p><h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{sh("directTitle")}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{sh("directText")}</p></div><div className="rounded-[2rem] border border-[#dce5da] bg-white/80 p-8 shadow-soft"><div className="text-5xl">01</div><p className="mt-4 font-display text-2xl font-bold">{sh("directStep1")}</p><div className="my-5 h-px bg-white/10"/><div className="text-5xl">02</div><p className="mt-4 font-display text-2xl font-bold">{sh("directStep2")}</p></div></div></section>

      <section className="relative isolate overflow-hidden bg-brand-950 py-24 text-center text-white sm:py-32"><Image src={summerImages[0]} alt="" fill sizes="100vw" className="absolute inset-0 -z-20 object-cover opacity-35" /><div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/75 via-brand-950/80 to-brand-950" /><div className="container-narrow"><p className="text-xs font-bold uppercase tracking-[.24em] text-gold-300">{sh("finalEyebrow")}</p><h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-bold leading-[.98] tracking-[-.03em] sm:text-7xl">{sh("finalTitle")}</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">{sh("finalText")}</p><Link href={`/${locale}/destinations`} className="btn-gold mt-8 px-8 py-4 shadow-2xl">{sh("finalCta")} <ArrowRight className="h-4 w-4"/></Link></div></section>
    </>
  );
}