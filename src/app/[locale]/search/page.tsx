import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { destinations, cabins, experiences, blogPosts } from "@/lib/data";
import { photoLibrary } from "@/lib/photo-library";
import { saloProviders, saloEvents } from "@/lib/salo";
import { luxuryDirectory } from "@/lib/luxury-directory";
import { kimitoonProviders, type KimitoonCategory } from "@/lib/kimitoon-providers";
import { areaProviderIds, areaCopy, type SaloArea } from "@/lib/salo-areas";
import { getPublishedDestinations, getPublishedProperties, getPublishedExperiences, getPublishedBlogPosts } from "@/lib/public-content";
import { getPublishedEvents } from "@/lib/public-events";
import { naantaliEvents, naantaliProviders } from "@/lib/naantali";
import { matchesSearchQuery, matchesServiceFilters, normalizeSearchText } from "@/lib/search";
import { allowDemoFallback } from "@/lib/utils";
import { featuredSaunaPlaces } from "@/components/sauna/FeaturedSaunas";

type Locale = "fi" | "es" | "en";
type SearchParams = { q?: string; type?: string; area?: string; category?: string; kategoria?: string; palvelut?: string };

type ProviderSearchResult = {
  id: string;
  href: string;
  name: string;
  description: string;
  location: string;
  category: string;
  image: string;
  imageCredit?: string;
  price?: string;
  dedupeKey: string;
  external?: boolean;
};

type EventSearchResult = { id: string; title: string; description: string; location: string; start: string; url: string; image?: string };
type ArticleSearchResult = { id: string; slug: string; title: string; excerpt: string; image?: string; publishedAt?: string };

const areaAliases: Record<string, string[]> = {
  "salo-mathildedal": ["salo", "mathildedal", "teijo", "särkisalo", "perniö", "halikko", "suomusjärvi", "vaskio", "förby", "kirjakkala"],
  kemionsaari: ["kemiö", "kemiönsaari", "kimitoön", "kasnäs", "taalintehdas", "dalsbruk", "rosala", "högsåra", "bengtskär", "söderlångvik", "örö"],
  naantali: ["naantali", "rymättylä", "aasla"],
  turku: ["turku", "parainen", "pargas"],
  hanko: ["hanko"],
  aland: ["ahvenanmaa", "åland", "mariehamn"],
  porvoo: ["porvoo", "emäsalo"],
  "southeast-finland": ["kotka", "hamina", "loviisa"],
};

const areaStopWords = new Set(["archipelago", "saaristo", "and", "the", "islands", "coast", "western", "eastern", "y", "el", "ja", "de", "region", "area"]);

function normalizedTokens(value: string) {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
}

function getAreaTerms(area: (typeof destinations)[number], locale: Locale) {
  return Array.from(new Set([
    ...[area.slug, area.name?.fi, area.name?.es, area.name?.en]
      .filter((term): term is string => Boolean(term))
      .flatMap(normalizedTokens),
    ...(areaAliases[area.slug] || []),
  ])).filter((term) => term.length > 2 && !areaStopWords.has(term));
}

function matchesAreaText(value: string, area: (typeof destinations)[number] | undefined, locale: Locale) {
  if (!area) return true;
  const locationTokens = new Set(normalizedTokens(value));
  if (area.slug === "salo-mathildedal" && (locationTokens.has("kimitoon") || locationTokens.has("kemionsaari"))) return false;
  if (area.slug === "kemionsaari" && locationTokens.has("salo") && !locationTokens.has("kimitoon") && !locationTokens.has("kemionsaari")) return false;
  return getAreaTerms(area, locale).some((term) => locationTokens.has(term));
}

function providerDedupeKey(name: string, location: string) {
  const normalizedName = name.toLocaleLowerCase().replace(/\s+/g, " ").trim();
  const primaryLocation = location.split(/[·,]/)[0].toLocaleLowerCase().trim();
  return normalizedName + "|" + primaryLocation;
}

const labels = {
  fi: { title: "Löydä sopivat palvelut", results: "Hakutulokset", empty: "Hakuehdoilla ei löytynyt tuloksia. Kokeile toista hakusanaa tai aluetta.", stays: "Majoitukset", experiences: "Elämykset", destinations: "Kohteet", search: "Hae", placeholder: "Mitä etsit?", all: "Kaikki palvelut", accommodation: "Majoitus", experience: "Elämykset", destination: "Kohteet", category: "Palvelun teema", allCategories: "Kaikki teemat", food: "Ruoka ja ravintolat", sauna: "Sauna", wellbeing: "Hyvinvointi ja rentoutuminen", cruise: "Risteilyt ja veneily", archipelago: "Saaristo ja rannikko", shopping: "Ostokset ja paikalliset liikkeet", hiking: "Luonto ja retkeily", culture: "Kulttuuri", providers: "Paikalliset palveluntarjoajat", events: "Tapahtumat", articles: "Artikkelit", eventProvider: "Järjestäjän sivulle", price: "Hinta tarkistettava" },
  es: { title: "Encuentra los servicios adecuados", results: "Resultados de búsqueda", empty: "No se encontraron resultados. Prueba con otra palabra o zona.", stays: "Alojamientos", experiences: "Experiencias", destinations: "Destinos", search: "Buscar", placeholder: "¿Qué estás buscando?", all: "Todos los servicios", accommodation: "Alojamiento", experience: "Experiencias", destination: "Destinos", category: "Tipo de experiencia", allCategories: "Todas las categorías", food: "Gastronomía", sauna: "Sauna", wellbeing: "Bienestar y relajación", cruise: "Cruceros y navegación", archipelago: "Archipiélago y costa", shopping: "Tiendas y compras locales", hiking: "Naturaleza y senderismo", culture: "Cultura", providers: "Proveedores locales", events: "Eventos", articles: "Artículos", eventProvider: "Ver organizador", price: "Consultar precio" },
  en: { title: "Find the right services", results: "Search results", empty: "No results found. Try another search term or area.", stays: "Accommodation", experiences: "Experiences", destinations: "Destinations", search: "Search", placeholder: "What are you looking for?", all: "All services", accommodation: "Accommodation", experience: "Experiences", destination: "Destinations", category: "Experience category", allCategories: "All categories", food: "Food and dining", sauna: "Sauna", wellbeing: "Wellbeing and relaxation", cruise: "Cruises and boating", archipelago: "Archipelago and coast", shopping: "Shops and local shopping", hiking: "Nature and hiking", culture: "Culture", providers: "Local providers", events: "Events", articles: "Articles", eventProvider: "Visit organizer", price: "Check price" },
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
  destination_slug?: string;
  destinationSlug?: string;
  city?: string;
  town?: string;
  areaName?: string;
  destinationName?: string;
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
    ...Object.values(item.name || {}), ...Object.values(item.description || {}), ...Object.values(item.shortDescription || {}),
    item.location, ...Object.values(item.locationByLocale || {}), item.region,
    item.category, item.address, item.provider, item.providerName,
    ...(item.tags || []), ...(item.features || []), ...(item.activities || []),
    ...(item.audienceTags || []), ...(item.seasonTags || []), ...(item.experienceTags || []),
  ];
  if (query && !matchesSearchQuery(query, searchableValues)) return false;
  if (!area) return true;

  const linkedDestinationId = item.destination_id ?? item.destinationId;
  const normalizedDestinationId = linkedDestinationId == null ? "" : String(linkedDestinationId).trim();
  if (normalizedDestinationId && normalizedDestinationId !== "null" && normalizedDestinationId !== "undefined" && normalizedDestinationId === String(area.id)) {
    return true;
  }
  if (String(item.id) === String(area.id) || item.slug === area.slug || item.destination_slug === area.slug || item.destinationSlug === area.slug) {
    return true;
  }

  const locationText = [
    item.location, item.locationByLocale?.fi, item.locationByLocale?.es, item.locationByLocale?.en,
    item.region, item.city, item.town, item.areaName, item.destinationName,
    ...(item.tags || []),
  ].filter(Boolean).join(" ");
  return matchesAreaText(locationText, area, locale);
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
  const query = (paramsValue.q || "").trim();
  const typeAliases: Record<string, string> = { majoitus: "accommodation", accommodation: "accommodation", elamykset: "experience", "elämykset": "experience", experience: "experience", kohteet: "destination", destination: "destination", tapahtumat: "event", events: "event", event: "event", blogi: "article", blog: "article", article: "article", articles: "article", kaikki: "all", all: "all" };
  const rawType = (paramsValue.type || paramsValue.kategoria || "all").toLocaleLowerCase();
  const type = typeAliases[rawType] || "all";
  const rawServiceFilters = paramsValue.palvelut || paramsValue.category || (paramsValue.kategoria && !typeAliases[paramsValue.kategoria.toLocaleLowerCase()] ? paramsValue.kategoria : "");
  const serviceFilters = rawServiceFilters.split(",").map((value) => value.trim()).filter(Boolean);
  const category = serviceFilters[0] || "";
  const [cmsDestinations, cmsCabins, cmsExperiences, cmsEvents, cmsBlogPosts] = await Promise.all([
    getPublishedDestinations(), getPublishedProperties(), getPublishedExperiences(), getPublishedEvents(), getPublishedBlogPosts(),
  ]);
  const mergeBySlug = <T extends { slug: string }>(fallback: T[], published: T[]) => {
    const merged = new Map(fallback.map((item) => [item.slug, item]));
    for (const item of published) merged.set(item.slug, item);
    return Array.from(merged.values());
  };
  // Published CMS rows override matching curated entries; they must not hide unrelated catalogue items.
  const allDestinations = mergeBySlug(destinations, cmsDestinations);
  const allCabins = mergeBySlug(cabins, cmsCabins);
  const allExperiences = mergeBySlug(experiences, cmsExperiences);
  const eventCatalog = cmsEvents.length ? cmsEvents : [...saloEvents, ...naantaliEvents];
  const articleCatalog = cmsBlogPosts.length || !allowDemoFallback ? cmsBlogPosts : blogPosts;
  const selectedArea = allDestinations.find((item) => item.slug === paramsValue.area);

  const foundDestinations = type === "all" || type === "destination"
    ? allDestinations.filter((item) => matches(item, query, locale, selectedArea)
      && matchesServiceFilters(serviceFilters, "", [item.slug, ...Object.values(item.name || {}), ...Object.values(item.description || {}), ...(item.tags || []), ...(item.activities || [])])) : [];
  const foundCabins = type === "all" || type === "accommodation"
    ? allCabins.filter((item) => matches(item, query, locale, selectedArea)
      && matchesServiceFilters(serviceFilters, item.type || "", [item.slug, ...Object.values(item.name || {}), ...Object.values(item.description || {}), ...(item.features || []), item.location, item.region])) : [];
  const foundExperiences = type === "all" || type === "experience"
    ? allExperiences.filter((item) => matches(item, query, locale, selectedArea)
      && matchesServiceFilters(serviceFilters, item.category || "", [item.category, ...Object.values(item.name || {}), ...Object.values(item.description || {}), ...(item.tags || []), ...(item.features || []), ...(item.activities || [])])) : [];
  const today = new Date().toISOString().slice(0, 10);
  const foundEvents: EventSearchResult[] = (type === "all" || type === "event")
    ? eventCatalog.filter((event) => (event.end || event.start).slice(0, 10) >= today
      && matchesSearchQuery(query, [...Object.values(event.title), ...Object.values(event.description), event.location])
      && matchesAreaText(event.location, selectedArea, locale)
      && matchesServiceFilters(serviceFilters, "event", [...Object.values(event.title), ...Object.values(event.description), event.location]))
      .map((event) => ({ id: String(event.id), title: event.title[locale] || event.title.en, description: event.description[locale] || event.description.en, location: event.location, start: event.start, url: event.url, image: event.image }))
    : [];

  const foundArticles: ArticleSearchResult[] = (type === "all" || type === "article")
    ? articleCatalog.filter((article) => {
        const searchable = [...Object.values(article.title), ...Object.values(article.excerpt), ...Object.values(article.content), ...(article.tags || [])];
        return matchesSearchQuery(query, searchable)
          && matchesServiceFilters(serviceFilters, "article", searchable)
          && matchesAreaText(searchable.join(" "), selectedArea, locale);
      })
      .map((article) => ({
        id: String(article.id),
        slug: article.slug,
        title: article.title[locale] || article.title.en,
        excerpt: article.excerpt[locale] || article.excerpt.en,
        image: article.image,
        publishedAt: article.publishedAt,
      }))
    : [];

  const selectedSaloArea = selectedArea?.slug === "salo-mathildedal"
    ? "mathildedal"
    : selectedArea?.slug && Object.prototype.hasOwnProperty.call(areaProviderIds, selectedArea.slug)
      ? selectedArea.slug as SaloArea
      : undefined;
  const providerAreaById = new Map<string, SaloArea>(
    Object.entries(areaProviderIds).flatMap(([area, ids]) => ids.map((id) => [id, area as SaloArea] as const)),
  );
  const saloProviderResults: ProviderSearchResult[] = saloProviders
    .filter((provider) => {
      if (type === "destination" || type === "event" || type === "article") return false;
      if (type === "accommodation" && provider.category !== "stay") return false;
      if (type === "experience" && provider.category === "stay") return false;
      const providerArea = providerAreaById.get(provider.id);
      if (selectedArea && (!selectedSaloArea || providerArea !== selectedSaloArea)) return false;
      const name = provider.nameByLocale?.[locale] || provider.name;
      const haystack = [name, ...Object.values(provider.nameByLocale || {}), ...Object.values(provider.description), provider.category, providerArea ? areaCopy[providerArea][locale].eyebrow : ""];
      return matchesSearchQuery(query, haystack) && matchesServiceFilters(serviceFilters, provider.category, haystack);
    })
    .map((provider) => {
      const providerArea = providerAreaById.get(provider.id);
      return {
        id: `salo-${provider.id}`,
        href: `/${locale}/providers/salo-${provider.id}`,
        name: provider.nameByLocale?.[locale] || provider.name,
        description: provider.description[locale],
        location: providerArea ? areaCopy[providerArea][locale].eyebrow : "Salo",
        category: provider.category,
        image: provider.image || (provider.category === "stay" ? photoLibrary.saunaCottage : provider.category === "food" ? photoLibrary.mathildanMarinaDining : provider.category === "nature" ? photoLibrary.teijoNationalPark : photoLibrary.turkuArchipelago),
        imageCredit: provider.imageCredit,
        price: provider.priceByLocale?.[locale] || provider.price,
        dedupeKey: providerDedupeKey(provider.nameByLocale?.[locale] || provider.name, providerArea ? areaCopy[providerArea][locale].eyebrow : "Salo"),
      };
    });

  const directoryProviderResults: ProviderSearchResult[] = luxuryDirectory
    .filter((provider) => {
      if (type === "destination" || type === "event" || type === "article") return false;
      if (type === "accommodation" && provider.category !== "stay") return false;
      if (type === "experience" && provider.category === "stay") return false;
      const name = provider.nameByLocale?.[locale] || provider.name;
      const location = provider.locationByLocale?.[locale] || provider.location;
      const haystack = [name, ...Object.values(provider.nameByLocale || {}), ...Object.values(provider.description), location, ...Object.values(provider.locationByLocale || {}), ...provider.tags];
      return matchesSearchQuery(query, haystack)
        && matchesServiceFilters(serviceFilters, provider.category, haystack)
        && matchesAreaText([location, provider.location, provider.locationByLocale?.fi, provider.locationByLocale?.es, provider.locationByLocale?.en].filter(Boolean).join(" "), selectedArea, locale);
    })
    .map((provider) => ({
      id: `directory-${provider.id}`,
      href: `/${locale}/providers/directory-${provider.id}`,
      name: provider.nameByLocale?.[locale] || provider.name,
      description: provider.description[locale],
      location: provider.locationByLocale?.[locale] || provider.location,
      category: provider.category,
      image: provider.image || (provider.category === "stay" ? photoLibrary.saunaCottage : provider.category === "food" ? photoLibrary.mathildanMarinaDining : provider.category === "sauna" ? photoLibrary.saunaTraditionalSmoke : photoLibrary.turkuArchipelago),
      imageCredit: provider.imageCredit,
      price: provider.priceByLocale?.[locale] || provider.price,
      dedupeKey: providerDedupeKey(provider.nameByLocale?.[locale] || provider.name, provider.locationByLocale?.[locale] || provider.location),
    }));

  const kimitoonCategoryMap: Record<KimitoonCategory, string> = {
    majoitus: "stay",
    ruoka: "food",
    aktiviteetit: "experience",
    saaristo: "archipelago",
    luonto: "hiking",
    kulttuuri: "culture",
    hyvinvointi: "wellbeing",
    kuljetukset: "experience",
    ostokset: "shopping",
    talviaktiviteetit: "experience",
    tapahtumapaikat: "culture",
    "muut-palvelut": "experience",
    tapahtumat: "culture",
  };
  const kimitoonProviderResults: ProviderSearchResult[] = kimitoonProviders
    .filter((provider) => {
      if (type === "destination" || type === "event" || type === "article") return false;
      const categories = provider.categories.map((item) => kimitoonCategoryMap[item]);
      if (type === "accommodation" && !categories.includes("stay")) return false;
      if (type === "experience" && categories.includes("stay") && categories.length === 1) return false;
      const location = provider.location[locale];
      const haystack = [provider.name[locale], ...Object.values(provider.name), ...Object.values(provider.description), location, ...Object.values(provider.location), ...provider.tags, ...provider.categories];
      if (!matchesServiceFilters(serviceFilters, categories, haystack)) return false;
      return matchesSearchQuery(query, haystack)
        && matchesAreaText([provider.location.fi, provider.location.en, provider.location.es].join(" "), selectedArea, locale);
    })
    .map((provider) => {
      const categories = provider.categories.map((item) => kimitoonCategoryMap[item]);
      return {
        id: `kimitoon-${provider.id}`,
        href: `/${locale}/providers/kimitoon-${provider.id}`,
        name: provider.name[locale],
        description: provider.description[locale],
        location: provider.location[locale],
        category: categories[0] || "experience",
        image: provider.image || provider.categoryImages?.[provider.categories[0]] || (categories.includes("sauna") ? photoLibrary.saunaTraditionalSmoke : categories.includes("stay") ? photoLibrary.saunaCottage : photoLibrary.turkuArchipelago),
        imageCredit: provider.imageCredit,
        dedupeKey: providerDedupeKey(provider.name[locale], provider.location[locale]),
      };
    });

  const naantaliCategoryMap: Record<string, string> = {
    tourism: "tourism",
    sight: "culture",
    stay: "stay",
    experience: "experience",
    nature: "hiking",
    food: "food",
  };
  const existingProviderNames = new Set([
    ...saloProviders.map((provider) => normalizeSearchText(provider.name)),
    ...luxuryDirectory.map((provider) => normalizeSearchText(provider.name)),
    ...kimitoonProviders.map((provider) => normalizeSearchText(provider.name.fi)),
  ]);
  const naantaliProviderResults: ProviderSearchResult[] = naantaliProviders
    .filter((provider) => {
      const category = naantaliCategoryMap[provider.category];
      if (existingProviderNames.has(normalizeSearchText(provider.name))) return false;
      if (type === "destination" || type === "event" || type === "article") return false;
      if (type === "accommodation" && category !== "stay") return false;
      if (type === "experience" && category === "stay") return false;
      const haystack = [provider.name, ...Object.values(provider.description), category, "Naantali", "Naantali archipelago"];
      return matchesSearchQuery(query, haystack)
        && matchesServiceFilters(serviceFilters, category, haystack)
        && matchesAreaText("Naantali Naantalin saaristo", selectedArea, locale);
    })
    .map((provider) => {
      const category = naantaliCategoryMap[provider.category];
      return {
        id: `naantali-${provider.id}`,
        href: provider.url,
        name: provider.name,
        description: provider.description[locale],
        location: "Naantali",
        category,
        image: provider.image || (category === "stay" ? photoLibrary.naantaliOldTown : category === "food" ? photoLibrary.mathildanMarinaDining : photoLibrary.turkuArchipelago),
        imageCredit: provider.imageCredit,
        price: provider.price,
        dedupeKey: providerDedupeKey(provider.name, "Naantali"),
        external: true,
      };
    });

  const featuredSaunaResults: ProviderSearchResult[] = (type === "all" || type === "experience")
    ? featuredSaunaPlaces
      .filter((place) => {
        const searchable = [place.name, place.location, ...Object.values(place.description), ...Object.values(place.access), ...Object.values(place.type), ...Object.values(place.status || {}), place.capacity || ""];
        return matchesSearchQuery(query, searchable)
          && matchesServiceFilters(serviceFilters, "sauna", searchable)
          && matchesAreaText(place.location, selectedArea, locale);
      })
      .map((place) => ({
        id: `sauna-${normalizeSearchText(place.name).replace(/ /g, "-")}`,
        href: place.booking || place.source,
        name: place.name,
        description: place.status?.[locale] ? `${place.description[locale]} ${place.status[locale]}` : place.description[locale],
        location: place.location,
        category: "sauna",
        image: place.image,
        imageCredit: place.imageCredit,
        dedupeKey: providerDedupeKey(place.name, place.location),
        external: true,
      }))
    : [];

  const catalogueNames = new Set([
    ...foundDestinations.flatMap((item) => Object.values(item.name || {})),
    ...foundCabins.flatMap((item) => Object.values(item.name || {})),
    ...foundExperiences.flatMap((item) => Object.values(item.name || {})),
  ].map((name) => normalizeSearchText(name)));
  const eventNames = new Set(foundEvents.map((event) => normalizeSearchText(event.title)));
  const articleNames = new Set(foundArticles.map((article) => normalizeSearchText(article.title)));
  const foundProviders = [...saloProviderResults, ...directoryProviderResults, ...kimitoonProviderResults, ...naantaliProviderResults, ...featuredSaunaResults]
    .filter((provider) => !catalogueNames.has(normalizeSearchText(provider.name)))
    .filter((provider) => !eventNames.has(normalizeSearchText(provider.name)) && !articleNames.has(normalizeSearchText(provider.name)))
    .filter((provider, index, all) => all.findIndex((item) => normalizeSearchText(item.name) === normalizeSearchText(provider.name)) === index);
  const total = foundDestinations.length + foundCabins.length + foundExperiences.length + foundProviders.length + foundEvents.length + foundArticles.length;

  return (
    <main className="container-narrow min-h-[65vh] min-w-0 overflow-x-clip py-8 sm:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">FINLAND EXPERIENCE</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.results}: {total}</p>
      </div>
      <form action={`/${locale}/search`} method="GET" className="mb-10 grid w-full min-w-0 gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_180px_180px_auto]">
        <input name="q" defaultValue={paramsValue.q || ""} placeholder={t.placeholder} className="min-h-11 w-full min-w-0 rounded-xl border border-slate-200 px-3 text-base outline-none focus:border-brand-700 sm:text-sm" />
        <select name="type" defaultValue={type} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-base sm:text-sm"><option value="all">{t.all}</option><option value="accommodation">{t.accommodation}</option><option value="experience">{t.experience}</option><option value="destination">{t.destination}</option><option value="event">{t.events}</option><option value="article">{t.articles}</option></select>
        <select name="palvelut" defaultValue={category} aria-label={t.category} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-sm"><option value="">{t.allCategories}</option>{(["food", "sauna", "wellbeing", "cruise", "archipelago", "shopping", "hiking", "culture"] as const).map((key) => <option key={key} value={key}>{t[key]}</option>)}</select>
        <select name="area" defaultValue={paramsValue.area || ""} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-sm"><option value="">{locale === "fi" ? "Kaikki alueet" : locale === "es" ? "Todas las zonas" : "All areas"}</option>{allDestinations.map((item) => <option key={item.slug} value={item.slug}>{localized(item.name, locale)}</option>)}</select>
        <button type="submit" className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white sm:w-auto"><Search className="h-4 w-4" />{t.search}</button>
      </form>

      {total === 0 && <p className="rounded-2xl bg-brand-50 p-6 text-sm text-slate-700">{t.empty}</p>}

      {foundDestinations.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.destinations}</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{foundDestinations.map((item) => <Link key={item.slug} href={`/${locale}/destinations/${item.slug}`} className="group relative isolate flex aspect-[1.3] min-w-0 max-w-full overflow-hidden rounded-xl bg-brand-950 text-white"><Image src={item.images?.[0] || photoLibrary.turkuArchipelago} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover" /><span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 to-transparent" /><span className="mt-auto min-w-0 max-w-full break-words p-3 font-display text-base font-bold leading-tight sm:text-lg">{localized(item.name, locale)}<span className="mt-1 flex min-w-0 items-center gap-1 break-words font-sans text-xs font-normal"><MapPin className="h-3 w-3 shrink-0" />{item.region}</span></span></Link>)}</div></section>}

      {foundCabins.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.stays}</h2><div className="grid gap-4 sm:grid-cols-3">{foundCabins.map((item) => <Link key={item.slug} href={`/${locale}/accommodations/${item.slug}`} className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft"><div className="relative aspect-[16/9]"><Image src={item.images?.[0] || photoLibrary.saunaCottage} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div><div className="min-w-0 p-4"><h3 className="break-words font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 break-words text-xs text-slate-500">{item.locationByLocale?.[locale] || item.location}</p><p className="mt-3 text-sm font-bold text-brand-900">{item.pricePerNight > 0 ? new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(item.pricePerNight) : t.price}</p></div></Link>)}</div></section>}

      {foundExperiences.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.experiences}</h2><div className="grid gap-4 sm:grid-cols-2">{foundExperiences.map((item) => <Link key={item.slug} href={`/${locale}/experiences/${item.slug}`} className="grid min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft sm:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-40"><Image src={item.images?.[0] || photoLibrary.saunaTraditionalSmoke} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,50vw" className="object-cover" /></div><div className="min-w-0 break-words p-4"><h3 className="break-words font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 break-words text-xs text-slate-500">{item.region}</p><p className="mt-2 break-words text-sm text-slate-600">{localized(item.shortDescription, locale)}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-900">{locale === "fi" ? "Katso palvelu" : locale === "es" ? "Ver servicio" : "View service"}<ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></section>}
      {foundProviders.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.providers}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{foundProviders.map((provider) => {
        const content = <><div className="relative aspect-[16/9]"><Image src={provider.image} alt={provider.name} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div><div className="min-w-0 break-words p-4"><p className="break-words text-[10px] font-bold uppercase tracking-[.14em] text-brand-700">{provider.location}</p><h3 className="mt-1 break-words font-display text-lg font-bold text-brand-950">{provider.name}</h3><p className="mt-2 break-words text-sm leading-6 text-slate-600">{provider.description}</p>{provider.price && <p className="mt-3 text-sm font-semibold text-brand-900">{provider.price}</p>}{provider.imageCredit && <p className="mt-3 border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-500">{provider.imageCredit}</p>}</div></>;
        return provider.external
          ? <a key={provider.id} href={provider.href} target="_blank" rel="noopener noreferrer" className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">{content}</a>
          : <Link key={provider.id} href={provider.href} className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">{content}</Link>;
      })}</div></section>}
      {foundEvents.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.events}</h2><div className="grid gap-4 sm:grid-cols-2">{foundEvents.map((event) => <a key={event.id} href={event.url} target="_blank" rel="noreferrer" className="grid min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft sm:grid-cols-[.8fr_1.2fr]"><div className="relative min-h-36"><Image src={event.image || photoLibrary.saunaTraditionalSmoke} alt={event.title} fill sizes="(max-width:640px) 100vw,40vw" className="object-cover" /></div><div className="min-w-0 p-4"><p className="text-xs font-semibold text-brand-700">{new Date(event.start).toLocaleDateString(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" })} · {event.location}</p><h3 className="mt-2 font-display text-lg font-bold text-brand-950">{event.title}</h3><p className="mt-2 text-sm text-slate-600">{event.description}</p><span className="mt-3 inline-flex text-xs font-bold text-brand-900">{t.eventProvider} <ArrowRight className="ml-1 h-4 w-4" /></span></div></a>)}</div></section>}
      {foundArticles.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.articles}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{foundArticles.map((article) => <Link key={article.id} href={`/${locale}/blog/${article.slug}`} className="min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"><div className="relative aspect-[16/9]"><Image src={article.image || photoLibrary.mathildedalVillage} alt={article.title} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div><div className="min-w-0 p-4">{article.publishedAt && <p className="text-xs font-semibold text-brand-700">{new Date(article.publishedAt).toLocaleDateString(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-GB")}</p>}<h3 className="mt-2 font-display text-lg font-bold text-brand-950">{article.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p></div></Link>)}</div></section>}

    </main>
  );
}
