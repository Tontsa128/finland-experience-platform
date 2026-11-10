import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Compass, Utensils, Waves, BedDouble, MapPin, Sparkles, CalendarDays } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { VisitorCounter } from "@/components/home/VisitorCounter";
import TravelAdvisor from "@/components/TravelAdvisor";
import { destinations, cabins, experiences } from "@/lib/data";
import { photoLibrary } from "@/lib/photo-library";
import { getHomepagePhotoCredit, getHomepagePhotoUsageNote } from "@/lib/homepage-destination-features";
import {
  getHomepageSettings,
  getPublishedDestinations,
  getPublishedProperties,
  getPublishedExperiences,
} from "@/lib/public-content";

type Locale = "fi" | "es" | "en";

const copy = {
  fi: {
    subtitle: "Majoitukset, elämykset ja paikalliset palvelut yhdessä paikassa.",
    searchPlaceholder: "Hae kohdetta tai palvelua...",
    allServices: "Kaikki palvelut", allAreas: "Kaikki alueet", search: "Etsi",
    categories: ["Majoitus", "Ruoka", "Elämykset", "Nähtävyydet"],
    categorySub: ["Hotellit, mökit ja majatalot", "Ravintolat ja kahvilat", "Aktiviteetit ja tekeminen", "Luonto ja kulttuuri"],
    popular: "Suositut kohteet", stays: "Suositellut majoitukset", experiences: "Suositellut elämykset",
    showAll: "Näytä kaikki", viewStay: "Katso majoitus", viewExperience: "Katso lisää",
    advisorTitle: "Kysy matkailuavustajalta",
    advisorText: "Löydä täydellinen majoitus, aktiviteetti tai ravintola helposti.",
    advisorQuick: ["Mökki kahdelle", "Lähimmät ravintolat", "Perheaktiviteetit", "Saunaelämys"],
    events: "Tapahtumat", guides: "Alueoppaat", favourites: "Suunnittele matka",
    eventsText: "Näe mitä tapahtuu lähialueella", guidesText: "Suunnittele matkasi helposti", favouritesText: "Rakenna oma matkasuunnitelmasi",
    locationUnknown: "Tutustu kohteeseen", priceCheck: "Tarkista hinta", imageSourceLabel: "Kuvan lähde",
  },
  es: {
    subtitle: "Alojamientos, experiencias y servicios locales en un solo lugar.",
    searchPlaceholder: "Busca un destino o servicio...",
    allServices: "Todos los servicios", allAreas: "Todas las zonas", search: "Buscar",
    categories: ["Alojamiento", "Gastronomía", "Experiencias", "Lugares de interés"],
    categorySub: ["Hoteles, cabañas y casas rurales", "Restaurantes y cafeterías", "Actividades y planes", "Naturaleza y cultura"],
    popular: "Destinos populares", stays: "Alojamientos recomendados", experiences: "Experiencias recomendadas",
    showAll: "Ver todos", viewStay: "Ver alojamiento", viewExperience: "Ver más",
    advisorTitle: "Pregunta al asistente de viaje",
    advisorText: "Encuentra fácilmente alojamiento, actividades o restaurantes.",
    advisorQuick: ["Cabaña para dos", "Restaurantes cercanos", "Planes en familia", "Experiencia de sauna"],
    events: "Eventos", guides: "Guías de zonas", favourites: "Planifica tu viaje",
    eventsText: "Descubre qué ocurre cerca", guidesText: "Planifica tu viaje fácilmente", favouritesText: "Crea tu propio plan de viaje",
    locationUnknown: "Descubrir destino", priceCheck: "Consultar precio", imageSourceLabel: "Fuente de la imagen",
  },
  en: {
    subtitle: "Stays, experiences and local services in one place.",
    searchPlaceholder: "Search destinations or services...",
    allServices: "All services", allAreas: "All areas", search: "Search",
    categories: ["Accommodation", "Food", "Experiences", "Attractions"],
    categorySub: ["Hotels, cottages and guesthouses", "Restaurants and cafés", "Activities and things to do", "Nature and culture"],
    popular: "Popular destinations", stays: "Recommended stays", experiences: "Recommended experiences",
    showAll: "View all", viewStay: "View stay", viewExperience: "View more",
    advisorTitle: "Ask the travel assistant",
    advisorText: "Find the right accommodation, activity or restaurant with ease.",
    advisorQuick: ["Cottage for two", "Nearby restaurants", "Family activities", "Sauna experience"],
    events: "Events", guides: "Area guides", favourites: "Plan your trip",
    eventsText: "See what is happening nearby", guidesText: "Plan your trip with ease", favouritesText: "Build your own travel plan",
    locationUnknown: "Explore destination", priceCheck: "Check price", imageSourceLabel: "Image source",
  },
} as const;

const quickSearches: Record<Locale, Array<{ label: string; href: string }>> = {
  fi: [
    { label: "Saunat", href: "/search?palvelut=sauna" },
    { label: "Hyvinvointi", href: "/search?palvelut=wellbeing" },
    { label: "Majoitus", href: "/search?kategoria=majoitus" },
    { label: "Majoitus saunalla", href: "/search?type=accommodation&palvelut=sauna" },
    { label: "Ruoka ja ravintolat", href: "/search?palvelut=food" },
    { label: "Veneily ja risteilyt", href: "/search?palvelut=cruise" },
    { label: "Luonto ja retkeily", href: "/search?palvelut=hiking" },
    { label: "Kulttuuri ja nähtävyydet", href: "/search?palvelut=culture" },
    { label: "Tapahtumat", href: "/search?type=event" },
  ],
  es: [
    { label: "Saunas", href: "/search?palvelut=sauna" },
    { label: "Bienestar", href: "/search?palvelut=wellbeing" },
    { label: "Alojamiento", href: "/search?kategoria=majoitus" },
    { label: "Alojamiento con sauna", href: "/search?type=accommodation&palvelut=sauna" },
    { label: "Gastronomía", href: "/search?palvelut=food" },
    { label: "Barcos y cruceros", href: "/search?palvelut=cruise" },
    { label: "Naturaleza y senderismo", href: "/search?palvelut=hiking" },
    { label: "Cultura y lugares de interés", href: "/search?palvelut=culture" },
    { label: "Eventos", href: "/search?type=event" },
  ],
  en: [
    { label: "Saunas", href: "/search?palvelut=sauna" },
    { label: "Wellbeing", href: "/search?palvelut=wellbeing" },
    { label: "Accommodation", href: "/search?kategoria=majoitus" },
    { label: "Stays with sauna", href: "/search?type=accommodation&palvelut=sauna" },
    { label: "Food and restaurants", href: "/search?palvelut=food" },
    { label: "Boating and cruises", href: "/search?palvelut=cruise" },
    { label: "Nature and hiking", href: "/search?palvelut=hiking" },
    { label: "Culture and attractions", href: "/search?palvelut=culture" },
    { label: "Events", href: "/search?type=event" },
  ],
};

function localized(value: Record<string, string> | undefined, locale: Locale): string {
  return value?.[locale] || value?.en || "";
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "fi") as Locale;
  setRequestLocale(locale);

  const [homepage, cmsDestinations, cmsCabins, cmsExperiences] = await Promise.all([
    getHomepageSettings(),
    getPublishedDestinations(),
    getPublishedProperties(),
    getPublishedExperiences(),
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
    return candidates.find((image): image is string => Boolean(image)) || fallbacks[0] || "";
  };

  const categoryCards = [
    // Use an accommodation gallery image, not the harbour image previously used for Matilda Villas.
    { title: t.categories[0], subtitle: t.categorySub[0], href: `/${locale}/search?type=accommodation`, image: uniqueHomepageImage([featuredCabins[0]?.images?.[1], featuredCabins[0]?.images?.[0]], [photoLibrary.saunaCottage]), icon: BedDouble },
    // Show an actual restaurant dining scene for the food category.
    { title: t.categories[1], subtitle: t.categorySub[1], href: `/${locale}/search?type=experience&category=food`, image: uniqueHomepageImage([photoLibrary.mathildanMarinaDining]), icon: Utensils },
    // Keep the experience category visually distinct with a real activity: a Finnish sauna boat.
    { title: t.categories[2], subtitle: t.categorySub[2], href: `/${locale}/search?type=experience`, image: uniqueHomepageImage([photoLibrary.saunaBoat]), icon: Waves },
    // Use a recognizable cultural attraction rather than another generic nature image.
    { title: t.categories[3], subtitle: t.categorySub[3], href: `/${locale}/search?type=destination`, image: uniqueHomepageImage([photoLibrary.rosalaVikingCentre]), icon: Camera },
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

      <section className="relative z-20 isolate mx-auto w-full min-w-0 max-w-6xl overflow-x-clip px-4 pt-10 pb-8 sm:pt-16 sm:pb-10">
        <form action={`/${locale}/search`} method="GET" className="grid w-full min-w-0 gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_14px_45px_rgba(20,45,35,.16)] sm:grid-cols-[minmax(0,1fr)_190px_190px_auto] sm:items-center sm:rounded-full sm:p-2">
          <label className="flex min-w-0 items-center gap-3 px-3">
            <Compass className="h-5 w-5 shrink-0 text-brand-800" />
            <input name="q" placeholder={t.searchPlaceholder} className="min-h-11 w-full min-w-0 border-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0" />
          </label>
          <label className="flex min-w-0 max-w-full min-h-11 items-center gap-2 border-t border-slate-100 px-3 text-sm text-slate-700 sm:border-l sm:border-t-0">
            <Sparkles className="h-4 w-4 text-brand-700" />
            <select name="type" defaultValue="all" aria-label={t.allServices} className="w-full min-w-0 max-w-full truncate bg-transparent outline-none"><option value="all">{t.allServices}</option><option value="accommodation">{t.categories[0]}</option><option value="experience">{t.categories[2]}</option><option value="destination">{t.categories[3]}</option></select>
          </label>
          <label className="flex min-h-11 items-center gap-2 border-t border-slate-100 px-3 text-sm text-slate-700 sm:border-l sm:border-t-0">
            <MapPin className="h-4 w-4 text-brand-700" />
            <select name="area" defaultValue="" aria-label={t.allAreas} className="w-full bg-transparent outline-none"><option value="">{t.allAreas}</option>{catalogDestinations.map((d) => <option key={d.slug} value={d.slug}>{localized(d.name, locale)}</option>)}</select>
          </label>
          <button type="submit" className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-brand-950 px-5 text-sm font-bold text-white transition hover:bg-brand-800 sm:w-auto sm:px-7"><Compass className="h-4 w-4" />{t.search}</button>
        </form>
      </section>

      <nav aria-label={locale === "fi" ? "Suositut haut" : locale === "es" ? "Búsquedas populares" : "Popular searches"} className="container-narrow flex flex-wrap gap-2 pb-5">
        {quickSearches[locale].map((item) => <Link key={item.label} href={`/${locale}${item.href}`} className="inline-flex min-h-10 items-center rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-700 hover:bg-brand-50">{item.label}</Link>)}
      </nav>

      <section className="container-narrow py-8 sm:py-10">
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categoryCards.map(({ title, subtitle, href, image, icon: Icon }) => (
            <Link key={title} href={href} className="group relative isolate flex min-h-40 min-w-0 max-w-full overflow-hidden rounded-2xl bg-brand-950 text-white shadow-soft transition hover:-translate-y-1 hover:shadow-card sm:min-h-48">
              <Image src={image} alt={title} fill sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
              <span className="mt-auto w-full p-4 sm:p-5"><Icon className="mb-3 h-6 w-6" /><span className="block break-words font-display text-base font-bold leading-tight sm:text-xl">{title}</span><span className="mt-1 block break-words text-xs leading-snug text-white/85">{subtitle}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-narrow pb-9 sm:pb-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-[#e7f0ed] shadow-[0_18px_50px_rgba(28,54,42,.12)]">
          <div className="absolute inset-0"><Image src={uniqueHomepageImage([photoLibrary.mathildedalVillage])} alt="" fill sizes="100vw" className="object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-r from-[#e7f0ed] via-[#e7f0ed]/95 to-[#e7f0ed]/65" /></div>
          <div className="relative grid gap-5 p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-brand-700">FINLAND EXPERIENCE</p><h2 className="mt-2 min-w-0 break-words text-balance font-display text-[clamp(1.35rem,5vw,1.6rem)] font-bold leading-tight text-brand-950 sm:text-3xl">{t.advisorTitle}</h2><p className="mt-2 max-w-xl break-words text-sm leading-6 text-slate-700">{t.advisorText}</p></div>
            <TravelAdvisor language={locale} catalog={advisorCatalog} embedded suggestions={[...t.advisorQuick]} />
          </div>
        </div>
      </section>

      <section className="container-narrow pb-8 sm:pb-10">
        <div className="mb-4 flex items-end justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t.popular}</h2><Link href={`/${locale}/destinations`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featuredDestinations.filter((d) => d.images?.length).map((d, i) => {
            const image = uniqueHomepageImage(d.images || []);
            const photo = getHomepagePhotoCredit(image);
            const usageNote = getHomepagePhotoUsageNote(photo, locale);
            return (
              <article key={d.slug} className="overflow-hidden rounded-xl bg-white shadow-soft">
                <Link href={`/${locale}/destinations/${d.slug}`} className="group relative isolate flex aspect-[1.35] overflow-hidden bg-brand-950 text-white">
                  <Image src={image} alt={localized(d.name, locale)} fill priority={i < 2} sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="mt-auto p-3 sm:p-4"><span className="block font-display text-lg font-bold">{localized(d.name, locale)}</span><span className="mt-1 flex items-center gap-1 text-xs text-white/85"><MapPin className="h-3 w-3" />{d.region || t.locationUnknown}</span></span>
                </Link>
                {photo && <div className="flex items-center justify-between gap-2 px-3 py-2 text-[10px] leading-4 text-slate-500"><span>{photo.credit} · {usageNote}</span><a href={photo.sourcePage} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-950">{t.imageSourceLabel}</a></div>}
              </article>
            );
          })}
        </div>
      </section>

      

      <section className="container-narrow pb-9 sm:pb-12">
        <div className="mb-4 flex items-end justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">{t.stays}</h2><Link href={`/${locale}/accommodations`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-600">{t.showAll}<ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredCabins.filter((c) => c.images?.length).map((c, i) => {
            const image = uniqueHomepageImage(c.images || []);
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
