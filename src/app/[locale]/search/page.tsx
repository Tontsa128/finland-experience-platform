import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { destinations, cabins, experiences } from "@/lib/data";
import { photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { areaProviderIds, areaCopy, type SaloArea } from "@/lib/salo-areas";
import { getPublishedDestinations, getPublishedProperties, getPublishedExperiences } from "@/lib/public-content";

type Locale = "fi" | "es" | "en";
type SearchParams = { q?: string; type?: string; area?: string; category?: string };

const labels = {
  fi: { title: "Löydä sopivat palvelut", results: "Hakutulokset", empty: "Hakuehdoilla ei löytynyt tuloksia. Kokeile toista hakusanaa tai aluetta.", stays: "Majoitukset", experiences: "Elämykset", destinations: "Kohteet", search: "Hae", placeholder: "Mitä etsit?", all: "Kaikki palvelut", accommodation: "Majoitus", experience: "Elämykset", destination: "Kohteet", category: "Palvelun teema", allCategories: "Kaikki teemat", food: "Ruoka ja ravintolat", sauna: "Sauna", cruise: "Risteilyt ja veneily", hiking: "Luonto ja retkeily", culture: "Kulttuuri", providers: "Paikalliset palveluntarjoajat", price: "Hinta tarkistettava" },
  es: { title: "Encuentra los servicios adecuados", results: "Resultados de búsqueda", empty: "No se encontraron resultados. Prueba con otra palabra o zona.", stays: "Alojamientos", experiences: "Experiencias", destinations: "Destinos", search: "Buscar", placeholder: "¿Qué estás buscando?", all: "Todos los servicios", accommodation: "Alojamiento", experience: "Experiencias", destination: "Destinos", category: "Tipo de experiencia", allCategories: "Todas las categorías", food: "Gastronomía", sauna: "Sauna", cruise: "Cruceros y navegación", hiking: "Naturaleza y senderismo", culture: "Cultura", providers: "Proveedores locales", price: "Consultar precio" },
  en: { title: "Find the right services", results: "Search results", empty: "No results found. Try another search term or area.", stays: "Accommodation", experiences: "Experiences", destinations: "Destinations", search: "Search", placeholder: "What are you looking for?", all: "All services", accommodation: "Accommodation", experience: "Experiences", destination: "Destinations", category: "Experience category", allCategories: "All categories", food: "Food and dining", sauna: "Sauna", cruise: "Cruises and boating", hiking: "Nature and hiking", culture: "Culture", providers: "Local providers", price: "Check price" },
};

function localized(value: Record<string, string> | undefined, locale: Locale): string {
  return value?.[locale] || value?.en || "";
}

type SearchableItem = {
  id?: string | number;
  slug?: string;
  name?: Record<string, string>;
  description?: Record<string, string>;
  shortDescription?: Record<string, string>;
  location?: string;
  locationByLocale?: Record<string, string>;
  region?: string;
  category?: string;
  destination_id?: string;
  destinationId?: string | number;
  tags?: string[];
  features?: string[];
  activities?: string[];
  audienceTags?: string[];
  seasonTags?: string[];
  experienceTags?: string[];
  address?: string;
  provider?: string;
  providerName?: string;
};

function matches(item: SearchableItem, query: string, locale: Locale, area?: (typeof destinations)[number]) {
  const searchableValues = [
    item.slug,
    item.name?.[locale], item.name?.fi, item.name?.es, item.name?.en,
    item.description?.[locale], item.shortDescription?.[locale],
    item.location, item.locationByLocale?.[locale], item.region,
    item.category, item.address, item.provider, item.providerName,
    ...(item.tags || []), ...(item.features || []), ...(item.activities || []),
    ...(item.audienceTags || []), ...(item.seasonTags || []), ...(item.experienceTags || []),
  ];
  const haystack = searchableValues.filter(Boolean).join(" ").toLocaleLowerCase(locale);
  const matchesQuery = !query || haystack.includes(query);
  if (!matchesQuery) return false;
  if (!area) return true;

  const linkedDestinationId = item.destination_id ?? item.destinationId;
  const normalizedDestinationId = linkedDestinationId == null ? "" : String(linkedDestinationId).trim();
  if (normalizedDestinationId && normalizedDestinationId !== "null" && normalizedDestinationId !== "undefined") {
    return normalizedDestinationId === String(area.id);
  }

  const areaTerms = [
    area.slug,
    area.name?.[locale],
    area.name?.fi,
    area.name?.es,
    area.name?.en,
  ]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.toLocaleLowerCase(locale).replace(/[^a-z0-9À-ž]+/gi, " ").split(/\s+/))
    .filter((term) => term.length > 2);

  return areaTerms.some((term) => haystack.includes(term));
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ locale: rawLocale }, paramsValue] = await Promise.all([params, searchParams]);
  const locale = (["fi", "es", "en"].includes(rawLocale) ? rawLocale : "fi") as Locale;
  setRequestLocale(locale);
  const t = labels[locale];
  const query = (paramsValue.q || "").trim().toLocaleLowerCase();
  const type = paramsValue.type || "all";
  const category = paramsValue.category || "";
  const [cmsDestinations, cmsCabins, cmsExperiences] = await Promise.all([
    getPublishedDestinations(), getPublishedProperties(), getPublishedExperiences(),
  ]);
  const allDestinations = cmsDestinations.length ? cmsDestinations : destinations;
  const allCabins = cmsCabins.length ? cmsCabins : cabins;
  const allExperiences = cmsExperiences.length ? cmsExperiences : experiences;
  const selectedArea = allDestinations.find((item) => item.slug === paramsValue.area);

  const foundDestinations = type === "all" || type === "destination"
    ? allDestinations.filter((item) => matches(item, query, locale, selectedArea)) : [];
  const foundCabins = type === "all" || type === "accommodation"
    ? allCabins.filter((item) => matches(item, query, locale, selectedArea)) : [];
  const foundExperiences = type === "all" || type === "experience"
    ? allExperiences.filter((item) => matches(item, query, locale, selectedArea) && (!category || item.category === category)) : [];

  const selectedSaloArea = selectedArea?.slug === "salo-mathildedal"
    ? "mathildedal"
    : selectedArea?.slug && Object.prototype.hasOwnProperty.call(areaProviderIds, selectedArea.slug)
      ? selectedArea.slug as SaloArea
      : undefined;
  const providerAreaById = new Map<string, SaloArea>(
    Object.entries(areaProviderIds).flatMap(([area, ids]) => ids.map((id) => [id, area as SaloArea] as const)),
  );
  const foundProviders = saloProviders.filter((provider) => {
    if (!provider.image) return false;
    if (type === "destination") return false;
    if (type === "accommodation" && provider.category !== "stay") return false;
    if (type === "experience" && provider.category === "stay") return false;
    if (category && provider.category !== category) return false;
    const providerArea = providerAreaById.get(provider.id);
    if (selectedArea && (!selectedSaloArea || providerArea !== selectedSaloArea)) return false;
    const name = provider.nameByLocale?.[locale] || provider.name;
    const haystack = [name, provider.description[locale], provider.category, providerArea ? areaCopy[providerArea][locale].eyebrow : ""]
      .filter(Boolean).join(" ").toLocaleLowerCase(locale);
    return !query || haystack.includes(query);
  });

  const total = foundDestinations.length + foundCabins.length + foundExperiences.length + foundProviders.length;

  return (
    <main className="container-narrow min-h-[65vh] py-10 sm:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">FINLAND EXPERIENCE</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.results}: {total}</p>
      </div>
      <form action={`/${locale}/search`} method="GET" className="mb-10 grid gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-[1fr_160px_180px_180px_auto]">
        <input name="q" defaultValue={paramsValue.q || ""} placeholder={t.placeholder} className="min-h-11 min-w-0 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-700" />
        <select name="type" defaultValue={type} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm"><option value="all">{t.all}</option><option value="accommodation">{t.accommodation}</option><option value="experience">{t.experience}</option><option value="destination">{t.destination}</option></select>
        <select name="category" defaultValue={category} aria-label={t.category} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm"><option value="">{t.allCategories}</option>{(["food", "sauna", "cruise", "hiking", "culture"] as const).map((key) => <option key={key} value={key}>{t[key]}</option>)}</select>
        <select name="area" defaultValue={paramsValue.area || ""} className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm"><option value="">{locale === "fi" ? "Kaikki alueet" : locale === "es" ? "Todas las zonas" : "All areas"}</option>{allDestinations.map((item) => <option key={item.slug} value={item.slug}>{localized(item.name, locale)}</option>)}</select>
        <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white"><Search className="h-4 w-4" />{t.search}</button>
      </form>

      {total === 0 && <p className="rounded-2xl bg-brand-50 p-6 text-sm text-slate-700">{t.empty}</p>}

      {foundDestinations.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.destinations}</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{foundDestinations.map((item) => <Link key={item.slug} href={`/${locale}/destinations/${item.slug}`} className="group relative isolate flex aspect-[1.3] overflow-hidden rounded-xl bg-brand-950 text-white"><Image src={item.images?.[0] || photoLibrary.turkuArchipelago} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover" /><span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 to-transparent" /><span className="mt-auto p-3 font-display text-lg font-bold">{localized(item.name, locale)}<span className="mt-1 flex items-center gap-1 font-sans text-xs font-normal"><MapPin className="h-3 w-3" />{item.region}</span></span></Link>)}</div></section>}

      {foundCabins.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.stays}</h2><div className="grid gap-4 sm:grid-cols-3">{foundCabins.map((item) => <Link key={item.slug} href={`/${locale}/accommodations/${item.slug}`} className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft"><div className="relative aspect-[16/9]"><Image src={item.images?.[0] || photoLibrary.saunaCottage} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div><div className="p-4"><h3 className="font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 text-xs text-slate-500">{item.locationByLocale?.[locale] || item.location}</p><p className="mt-3 text-sm font-bold text-brand-900">{item.pricePerNight > 0 ? new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(item.pricePerNight) : t.price}</p></div></Link>)}</div></section>}

      {foundExperiences.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.experiences}</h2><div className="grid gap-4 sm:grid-cols-2">{foundExperiences.map((item) => <Link key={item.slug} href={`/${locale}/experiences/${item.slug}`} className="grid overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft sm:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-40"><Image src={item.images?.[0] || photoLibrary.saunaTraditionalSmoke} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,50vw" className="object-cover" /></div><div className="p-4"><h3 className="font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 text-xs text-slate-500">{item.region}</p><p className="mt-2 text-sm text-slate-600">{localized(item.shortDescription, locale)}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-900">{locale === "fi" ? "Katso palvelu" : locale === "es" ? "Ver servicio" : "View service"}<ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></section>}
      {foundProviders.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.providers}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{foundProviders.map((provider) => {
        const providerArea = providerAreaById.get(provider.id);
        const providerName = provider.nameByLocale?.[locale] || provider.name;
        const providerPrice = provider.priceByLocale?.[locale] || provider.price;
        return <Link key={provider.id} href={`/${locale}/providers/${provider.id}`} className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
          <div className="relative aspect-[16/9]"><Image src={provider.image!} alt={providerName} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div>
          <div className="p-4"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-brand-700">{providerArea ? areaCopy[providerArea][locale].eyebrow : ""}</p><h3 className="mt-1 font-display text-lg font-bold text-brand-950">{providerName}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{provider.description[locale]}</p>{providerPrice && <p className="mt-3 text-sm font-semibold text-brand-900">{providerPrice}</p>}{provider.imageCredit && <p className="mt-3 border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-500">{provider.imageCredit}</p>}</div>
        </Link>;
      })}</div></section>}

    </main>
  );
}
