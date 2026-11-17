import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Compass, Utensils, Waves, BedDouble, MapPin, Sparkles, CalendarDays, TreePine, ShoppingBag, Landmark, Flame } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { VisitorCounter } from "@/components/home/VisitorCounter";
import TravelAdvisor from "@/components/TravelAdvisor";
import PaidAdSlideshow from "@/components/ads/PaidAdSlideshow";
import { destinations, cabins, experiences } from "@/lib/data";
import { photoLibrary } from "@/lib/photo-library";
import { getHomepagePhotoCredit, getHomepagePhotoUsageNote } from "@/lib/homepage-destination-features";
import {
  getHomepageSettings,
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
  getActiveAdCampaigns,
} from "@/lib/public-content";

type Locale = "fi" | "es" | "en";

const copy = {
  fi: {
    subtitle: "Tutustu paikallisiin palveluihin, löydä uusia suosikkeja ja suunnittele oma reittisi.",
    searchPlaceholder: "Hae kohdetta tai palvelua...",
    allServices: "Kaikki palvelut", allAreas: "Kaikki alueet", search: "Etsi",
    categories: ["Majoitus", "Ruoka", "Elämykset", "Luonto", "Saunat", "Kulttuuri", "Paikalliset putiikit", "Tapahtumat"],
    categorySub: ["Hotellit, mökit ja majatalot", "Ravintolat ja kahvilat", "Aktiviteetit ja tekeminen", "Kansallispuistot ja retkeily", "Perinteiset ja modernit saunat", "Museot ja nähtävyydet", "Paikalliset tuotteet ja käsityöt", "Tapahtumat ympäri Suomen"],
    popular: "Suositut kohteet", stays: "Suositellut majoitukset", experiences: "Suositellut elämykset",
    showAll: "Näytä kaikki", viewStay: "Katso majoitus", viewExperience: "Katso lisää",
    advisorTitle: "Kysy matkailuavustajalta",
    advisorText: "Löydä täydellinen majoitus, aktiviteetti tai ravintola helposti.",
    advisorQuick: ["Mökki kahdelle", "Lähimmät ravintolat", "Perheaktiviteetit", "Saunaelämys"],
    events: "Tapahtumat", guides: "Alueoppaat", favourites: "Suunnittele matka",
    eventsText: "Näe mitä tapahtuu lähialueella", guidesText: "Suunnittele matkasi helposti", favouritesText: "Rakenna oma matkasuunnitelmasi",
    locationUnknown: "Tutustu kohteeseen", priceCheck: "Tarkista hinta", imageSourceLabel: "©",
  },
  es: {
    subtitle: "Descubre servicios locales, encuentra nuevos favoritos y crea tu propia ruta.",
    searchPlaceholder: "Busca un destino o servicio...",
    allServices: "Todos los servicios", allAreas: "Todas las zonas", search: "Buscar",
    categories: ["Alojamiento", "Gastronomía", "Experiencias", "Naturaleza", "Saunas", "Cultura", "Tiendas locales", "Eventos"],
    categorySub: ["Hoteles, cabañas y casas rurales", "Restaurantes y cafeterías", "Actividades y planes", "Parques nacionales y rutas", "Saunas tradicionales y modernas", "Museos y lugares de interés", "Productos locales y artesanía", "Eventos en toda Finlandia"],
    popular: "Destinos populares", stays: "Alojamientos recomendados", experiences: "Experiencias recomendadas",
    showAll: "Ver todos", viewStay: "Ver alojamiento", viewExperience: "Ver más",
    advisorTitle: "Pregunta al asistente de viaje",
    advisorText: "Encuentra fácilmente alojamiento, actividades o restaurantes.",
    advisorQuick: ["Cabaña para dos", "Restaurantes cercanos", "Planes en familia", "Experiencia de sauna"],
    events: "Eventos", guides: "Guías de zonas", favourites: "Planifica tu viaje",
    eventsText: "Descubre qué ocurre cerca", guidesText: "Planifica tu viaje fácilmente", favouritesText: "Crea tu propio plan de viaje",
    locationUnknown: "Descubrir destino", priceCheck: "Consultar precio", imageSourceLabel: "©",
  },
  en: {
    subtitle: "Explore local services, find new favourites and shape your own journey.",
    searchPlaceholder: "Search destinations or services...",
    allServices: "All services", allAreas: "All areas", search: "Search",
    categories: ["Accommodation", "Food", "Experiences", "Nature", "Saunas", "Culture", "Local shops", "Events"],
    categorySub: ["Hotels, cottages and guesthouses", "Restaurants and cafés", "Activities and things to do", "National parks and trails", "Traditional and modern saunas", "Museums and attractions", "Local products and crafts", "Events across Finland"],
    popular: "Popular destinations", stays: "Recommended stays", experiences: "Recommended experiences",
    showAll: "View all", viewStay: "View stay", viewExperience: "View more",
    advisorTitle: "Ask the travel assistant",
    advisorText: "Find the right accommodation, activity or restaurant with ease.",
    advisorQuick: ["Cottage for two", "Nearby restaurants", "Family activities", "Sauna experience"],
    events: "Events", guides: "Area guides", favourites: "Plan your trip",
    eventsText: "See what is happening nearby", guidesText: "Plan your trip with ease", favouritesText: "Build your own travel plan",
    locationUnknown: "Explore destination", priceCheck: "Check price", imageSourceLabel: "©",
  },
} as const;


function localized(value: Record<string, string> | undefined, locale: Locale): string {
  return value?.[locale] || value?.en || "";
}

function localizedRegion(region: string | undefined, locale: Locale): string {
  if (!region) return locale === "fi" ? "Koko Suomi" : locale === "es" ? "Toda Finlandia" : "Across Finland";
  const regions: Record<string, Record<Locale, string>> = {
    "Southwest Finland": { fi: "Lounais-Suomi", es: "Suroeste de Finlandia", en: "Southwest Finland" },
    "Western Finland": { fi: "Länsi-Suomi", es: "Oeste de Finlandia", en: "Western Finland" },
    "Southern Finland": { fi: "Etelä-Suomi", es: "Sur de Finlandia", en: "Southern Finland" },
    "Eastern Uusimaa": { fi: "Itä-Uusimaa", es: "Uusimaa oriental", en: "Eastern Uusimaa" },
    "Åland": { fi: "Ahvenanmaa", es: "Åland", en: "Åland" },
    "Mathildedal harbour": { fi: "Mathildedalin satama", es: "Puerto de Mathildedal", en: "Mathildedal harbour" },
  };
  return regions[region]?.[locale] || region;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "fi") as Locale;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences, paidAdCampaigns] = await Promise.all([
    getHomepageSettings(),
    getPublishedDestinations(),
    getPublishedProperties(),
    getPublishedExperiences(),
    getActiveAdCampaigns("homepage", "finland"),
  ]);

  // Prefer published CMS records. Curated local records remain the safe fallback
  // until the corresponding CMS collection has published content.
  const catalogDestinations = cmsDestinations.length ? cmsDestinations : destinations;
  const catalogCabins = cmsCabins.length ? cmsCabins : cabins;
  const catalogExperiences = cmsExperiences.length ? cmsExperiences : experiences;
  const t = copy[locale];

  const destinationIds = homepage?.featuredDestinationIds ?? [];
  const cabinIds = homepage?.featuredPropertyIds ?? [];
  const experienceIds = homepage?.featuredExperienceIds ?? [];
  const featuredDestinations = (destinationIds.length
    ? destinationIds.map((id) => catalogDestinations.find((item) => String(item.id) === id)).filter(Boolean)
    : catalogDestinations.filter((item) => item.featured)).slice(0, 4) as typeof destinations;
  const featuredCabins = (cabinIds.length
    ? cabinIds.map((id) => catalogCabins.find((item) => String(item.id) === id)).filter(Boolean)
    : catalogCabins.slice(0, 3)).slice(0, 3) as typeof cabins;
  const featuredExperiences = (experienceIds.length
    ? experienceIds.map((id) => catalogExperiences.find((item) => String(item.id) === id)).filter(Boolean)
    : catalogExperiences.slice(0, 2)).slice(0, 2) as typeof experiences;

  // Allocate homepage imagery once, in display order, so duplicate CMS/gallery
  // URLs cannot silently produce repeated cards across different homepage sections.
  const usedHomepageImages = new Set<string>();
  const imageKey = (value: string) => {
    try {
      const url = new URL(value);
      url.hash = "";
      return url.toString();
    } catch {
      return value.trim();
    }
  };
  const uniqueHomepageImage = (candidates: Array<string | undefined>, fallbacks: string[] = []) => {
    for (const image of [...candidates, ...fallbacks]) {
      if (!image) continue;
      const key = imageKey(image);
      if (!usedHomepageImages.has(key)) {
        usedHomepageImages.add(key);
        return image;
      }
    }
    // No unused supplied or curated image remains. Keep the first real source
    // rather than fabricate an image or silently substitute unrelated content.
    return "";
  };

  const categoryCards = [
    // Provider images are used where we have a known provider-owned asset.
    { title: t.categories[0], subtitle: t.categorySub[0], href: `/${locale}/search?type=accommodation`, image: uniqueHomepageImage([featuredCabins[0]?.images?.[1], featuredCabins[0]?.images?.[0], photoLibrary.storfinnhova]), icon: BedDouble },
    { title: t.categories[1], subtitle: t.categorySub[1], href: `/${locale}/search?type=experience&category=food`, image: uniqueHomepageImage([photoLibrary.mathildanMarinaDining]), icon: Utensils },
    { title: t.categories[2], subtitle: t.categorySub[2], href: `/${locale}/search?type=experience`, image: uniqueHomepageImage([photoLibrary.saunaBoat]), icon: Waves },
    { title: t.categories[3], subtitle: t.categorySub[3], href: `/${locale}/search?palvelut=hiking`, image: uniqueHomepageImage([photoLibrary.teijoNationalPark]), icon: TreePine },
    { title: t.categories[4], subtitle: t.categorySub[4], href: `/${locale}/search?palvelut=sauna`, image: uniqueHomepageImage([photoLibrary.herrankukkaroSauna, photoLibrary.saunaTraditionalSmoke]), icon: Flame },
    { title: t.categories[5], subtitle: t.categorySub[5], href: `/${locale}/search?palvelut=culture`, image: uniqueHomepageImage([photoLibrary.rosalaVikingCentre]), icon: Landmark },
    { title: t.categories[6], subtitle: t.categorySub[6], href: `/${locale}/search?palvelut=shopping`, image: uniqueHomepageImage([photoLibrary.matildanKesakauppa]), icon: ShoppingBag },
    { title: t.categories[7], subtitle: t.categorySub[7], href: `/${locale}/search?type=event`, image: uniqueHomepageImage([photoLibrary.pumpkinWeeks]), icon: CalendarDays },
  ];

  const advisorCatalog = {
    destinations: catalogDestinations.map((d) => ({ slug: d.slug, name: d.name, description: d.shortDescription, tags: d.tags || [], activities: d.activities || [], verified: d.verified })),
    accommodations: catalogCabins.map((c) => ({ slug: c.slug, name: c.name, description: c.description, location: c.location, features: c.features || [], price: c.pricePerNight, verified: c.verified })),
    experiences: catalogExperiences.map((e) => ({ slug: e.slug, name: e.name, description: e.shortDescription, region: e.region, tags: e.tags || [], price: e.price, verified: e.verified })),
  };

  return (
    <>
      <VisitorCounter locale={locale} />
      <Hero settings={homepage} />

      <section aria-labelledby="travel-advisor-heading" className="relative z-20 isolate mx-auto w-full min-w-0 max-w-5xl overflow-x-clip px-4 pt-5 pb-6 sm:pt-7 sm:pb-8">
        <div className="mb-3 text-center"><h2 id="travel-advisor-heading" className="font-display text-xl font-bold tracking-tight text-brand-950 sm:text-2xl">{locale === "fi" ? "Suunnittele matkasi tekoälyn avulla" : locale === "es" ? "Planifica tu viaje con ayuda de IA" : "Plan your trip with AI"}</h2><p className="mx-auto mt-1 max-w-2xl text-sm leading-6 text-slate-600">{t.subtitle}</p></div>
        <div className="mx-auto max-w-4xl rounded-2xl border border-brand-100 bg-[#f4f7f3] p-3 shadow-[0_8px_28px_rgba(20,45,35,.07)] sm:p-4">
          <div className="mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 shrink-0 text-brand-700" /><h3 className="min-w-0 break-words font-display text-base font-bold text-brand-950 sm:text-lg">{t.advisorTitle}</h3></div>
          <p className="mb-3 text-sm text-slate-600">{locale === "fi" ? "Kuvaile omin sanoin millaista paikkaa, majoitusta tai elämystä etsit. AI auttaa löytämään sopivia vaihtoehtoja." : locale === "es" ? "Describe el lugar, alojamiento o experiencia que buscas. La IA te ayudará a encontrar opciones adecuadas." : "Describe the place, accommodation or experience you are looking for. AI will help you find suitable options."}</p>
          <TravelAdvisor language={locale} catalog={advisorCatalog} embedded suggestions={[...t.advisorQuick]} />
        </div>
      </section>



      {paidAdCampaigns.length > 0 && (
        <section className="container-narrow pb-7 sm:pb-9" aria-label={locale === "fi" ? "Esittelyssä olevat kumppanit" : locale === "es" ? "Socios destacados" : "Featured partners"}>
          <PaidAdSlideshow campaigns={paidAdCampaigns} locale={locale} />
        </section>
      )}

      <section className="container-narrow py-8 sm:py-10">
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categoryCards.map(({ title, subtitle, href, image, icon: Icon }) => {
            const photo = getHomepagePhotoCredit(image);
            const usageNote = getHomepagePhotoUsageNote(photo, locale);
            return (
              <article key={title} className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-soft">
                <Link href={href} className="group relative isolate flex min-h-40 min-w-0 max-w-full overflow-hidden rounded-2xl bg-brand-950 text-white transition hover:-translate-y-1 hover:shadow-card sm:min-h-48">
                  <Image src={image} alt={title} fill sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
                  <span className="mt-auto w-full p-4 sm:p-5"><Icon className="mb-3 h-6 w-6" /><span className="block break-words font-display text-base font-bold leading-tight sm:text-xl">{title}</span><span className="mt-1 block break-words text-xs leading-snug text-white/85">{subtitle}</span></span>
                </Link>
                {photo && <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] leading-4 text-slate-500"><span>{photo.credit} · {usageNote}</span><a href={photo.sourcePage} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-950">{t.imageSourceLabel}</a></div>}
              </article>
            );
          })}
        </div>
      </section>



      <section className="container-narrow pb-8 sm:pb-10">
        <div className="mb-4 flex items-end justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t.popular}</h2><Link href={`/${locale}/destinations`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featuredDestinations.filter((d) => d.images?.length).map((d, i) => {
            const image = uniqueHomepageImage(d.images || []);
            if (!image) return null;
            const photo = getHomepagePhotoCredit(image);
            const usageNote = getHomepagePhotoUsageNote(photo, locale);
            return (
              <article key={d.slug} className="overflow-hidden rounded-xl bg-white shadow-soft">
                <Link href={`/${locale}/destinations/${d.slug}`} className="group relative isolate flex aspect-[1.35] overflow-hidden bg-brand-950 text-white">
                  <Image src={image} alt={localized(d.name, locale)} fill priority={i < 2} sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="mt-auto p-3 sm:p-4"><span className="block font-display text-lg font-bold">{localized(d.name, locale)}</span><span className="mt-1 flex items-center gap-1 text-xs text-white/85"><MapPin className="h-3 w-3" />{localizedRegion(d.region, locale)}</span></span>
                </Link>
                {photo && <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] leading-4 text-slate-500"><span>{photo.credit} · {usageNote}</span><a href={photo.sourcePage} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-950">{t.imageSourceLabel}</a></div>}
              </article>
            );
          })}
        </div>
      </section>

      

      <section className="container-narrow pb-9 sm:pb-12">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{locale === "fi" ? "Löydä Suomi alueittain" : locale === "es" ? "Descubre Finlandia por regiones" : "Explore Finland by region"}</h2>
            <p className="mt-1 text-sm text-slate-600">{locale === "fi" ? "Tutustu eri puolilla Suomea sijaitseviin kohteisiin." : locale === "es" ? "Explora destinos de distintas partes de Finlandia." : "Discover destinations in different parts of Finland."}</p>
          </div>
          <Link href={`/${locale}/destinations`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {catalogDestinations.filter((destination) => destination.images?.length && !featuredDestinations.some((featured) => featured.slug === destination.slug)).slice(0, 6).map((destination) => {
            const image = uniqueHomepageImage(destination.images || []);
            if (!image) return null;
            return <Link key={destination.slug} href={`/${locale}/search?area=${encodeURIComponent(destination.slug)}`} className="group relative isolate flex min-h-36 overflow-hidden rounded-xl bg-brand-950 text-white shadow-soft sm:min-h-44">
              <Image src={image} alt={localized(destination.name, locale)} fill sizes="(max-width:640px) 50vw,33vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <span className="mt-auto p-3 sm:p-4"><strong className="block font-display text-lg">{localized(destination.name, locale)}</strong><span className="mt-1 flex items-center gap-1 text-xs text-white/85"><MapPin className="h-3 w-3" />{localizedRegion(destination.region, locale)}</span></span>
            </Link>;
          })}
        </div>
      </section>

      <section className="container-narrow pb-9 sm:pb-12">
        <div className="mb-4 flex items-end justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t.stays}</h2><Link href={`/${locale}/accommodations`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredCabins.filter((c) => c.images?.length).map((c, i) => {
            const image = uniqueHomepageImage(c.images || []);
            if (!image) return null;
            return <Link key={c.slug} href={`/${locale}/accommodations/${c.slug}`} className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_5px_20px_rgba(25,45,35,.08)] transition hover:-translate-y-1 hover:shadow-card">
            <div className="relative aspect-[16/9] overflow-hidden"><Image src={image} alt={localized(c.name, locale)} fill priority={i === 0} sizes="(max-width:640px) 100vw,33vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
            <div className="p-4"><h3 className="font-display text-lg font-bold text-brand-950">{localized(c.name, locale)}</h3><p className="mt-1 text-xs text-slate-500">{c.locationByLocale?.[locale] || c.location}</p><div className="mt-3 flex items-center justify-between gap-2"><span className="text-sm font-bold text-brand-900">{c.pricePerNight > 0 ? new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(c.pricePerNight) + (locale === "fi" ? " / yö" : locale === "es" ? " / noche" : " / night") : t.priceCheck}</span><span className="rounded-full bg-brand-950 px-3 py-2 text-[11px] font-bold text-white">{t.viewStay}<ArrowRight className="ml-1 inline h-3 w-3" /></span></div></div>
          </Link>;
          })}
        </div>
      </section>

      <section className="container-narrow pb-12 sm:pb-16">
        <div className="mb-4 flex items-end justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t.experiences}</h2><Link href={`/${locale}/experiences`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredExperiences.filter((e) => e.images?.length).map((e) => {
            const image = uniqueHomepageImage(e.images || []);
            if (!image) return null;
            return <Link key={e.slug} href={`/${locale}/experiences/${e.slug}`} className="group grid overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_5px_20px_rgba(25,45,35,.08)] sm:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-44 overflow-hidden"><Image src={image} alt={localized(e.name, locale)} fill sizes="(max-width:640px) 100vw,50vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
            <div className="flex flex-col justify-center p-4"><h3 className="font-display text-lg font-bold text-brand-950">{localized(e.name, locale)}</h3><p className="mt-1 text-xs text-slate-500">{e.region}</p><p className="mt-2 line-clamp-2 text-sm text-slate-600">{localized(e.shortDescription, locale)}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-900">{t.viewExperience}<ArrowRight className="h-4 w-4" /></span></div>
          </Link>;
          })}
        </div>
      </section>

      <section className="container-narrow pb-12 sm:pb-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{locale === "fi" ? "Inspiraatiota ja ajankohtaista" : locale === "es" ? "Inspiración y actualidad" : "Inspiration and what’s on"}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { title: t.events, text: t.eventsText, href: `/${locale}/events`, image: photoLibrary.rosalaVikingHall, Icon: CalendarDays },
            { title: t.guides, text: t.guidesText, href: `/${locale}/destinations`, image: uniqueHomepageImage([photoLibrary.turkuAura]), Icon: MapPin },
            { title: t.favourites, text: t.favouritesText, href: `/${locale}/plan`, image: photoLibrary.aland, Icon: CalendarDays },
          ].map(({ title, text, href, image, Icon }) => <Link key={title} href={href} className="group relative isolate flex min-h-32 overflow-hidden rounded-xl bg-brand-950 text-white"><Image src={image} alt="" fill sizes="(max-width:640px) 100vw,33vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" /><span className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 to-black/20" /><span className="m-auto w-full p-5"><Icon className="mb-2 h-6 w-6" /><strong className="block font-display text-lg">{title}</strong><span className="mt-1 block text-xs text-white/85">{text}</span></span></Link>)}
        </div>
      </section>
    </>
  );
}
