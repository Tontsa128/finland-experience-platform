import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { destinations, cabins, experiences } from "@/lib/data";
import { photoLibrary } from "@/lib/photo-library";
import { saloProviders } from "@/lib/salo";
import { luxuryDirectory } from "@/lib/luxury-directory";
import { kimitoonProviders, type KimitoonCategory } from "@/lib/kimitoon-providers";
import { areaProviderIds, areaCopy, type SaloArea } from "@/lib/salo-areas";
import { getPublishedDestinations, getPublishedProperties, getPublishedExperiences } from "@/lib/public-content";

type Locale = "fi" | "es" | "en";
type SearchParams = { q?: string; type?: string; area?: string; category?: string };

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
};

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

const areaStopWords = new Set(["archipelago", "archipiélago", "archipielago", "saaristo", "and", "the", "islands", "coast", "western", "eastern", "y", "el", "ja", "de", "region", "area"]);

function normalizedTokens(value: string) {
  return value.toLocaleLowerCase().replace(/[^a-z0-9À-ž]+/gi, " ").split(/\s+/).filter(Boolean);
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
  if (area.slug === "salo-mathildedal" && (locationTokens.has("kimitoön") || locationTokens.has("kemiönsaari"))) return false;
  if (area.slug === "kemionsaari" && locationTokens.has("salo") && !locationTokens.has("kimitoön") && !locationTokens.has("kemiönsaari")) return false;
  return getAreaTerms(area, locale).some((term) => locationTokens.has(term));
}

function providerDedupeKey(name: string, location: string) {
  const normalizedName = name.toLocaleLowerCase().replace(/\s+/g, " ").trim();
  const primaryLocation = location.split(/[·,]/)[0].toLocaleLowerCase().trim();
  return normalizedName + "|" + primaryLocation;
}

function matchesProviderCategory(requested: string, category: string, haystack: string) {
  if (!requested) return true;
  if (category === requested) return true;
  const aliases: Record<string, string[]> = {
    sauna: ["sauna", "savusauna", "löyly", "smoke sauna"],
    cruise: ["boat", "boating", "cruise", "sailing", "veneily", "purjehdus", "marina", "harbour"],
    hiking: ["nature", "outdoors", "hiking", "trail", "retkeily", "luontopolku"],
    culture: ["culture", "museum", "heritage", "history", "kulttuuri", "historia", "ruukki"],
  };
  return (aliases[requested] || []).some((term) => haystack.includes(term));
}

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
    item.name?.[locale], item.name?.fi, item.name?.es, item.name?.en,
    item.description?.[locale], item.shortDescription?.[locale],
    item.location, item.locationByLocale?.[locale], item.region,
    item.category, item.address, item.provider, item.providerName,
    ...(item.tags || []), ...(item.features || []), ...(item.activities || []),
    ...(item.audienceTags || []), ...(item.seasonTags || []), ...(item.experienceTags || []),
  ];
  const haystack = searchableValues.filter(Boolean).join(" ").toLocaleLowerCase(locale);
  if (query && !haystack.includes(query)) return false;
  if (!area) return true;

  const linkedDestinationId = item.destination_id ?? item.destinationId;
  const normalizedDestinationId = linkedDestinationId == null ? "" : String(linkedDestinationId).trim();
  if (normalizedDestinationId && normalizedDestinationId !== "null" && normalizedDestinationId !== "undefined") {
    return normalizedDestinationId === String(area.id);
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
  const saloProviderResults: ProviderSearchResult[] = saloProviders
    .filter((provider) => {
      if (!provider.image || type === "destination") return false;
      if (type === "accommodation" && provider.category !== "stay") return false;
      if (type === "experience" && provider.category === "stay") return false;
      const providerArea = providerAreaById.get(provider.id);
      if (selectedArea && (!selectedSaloArea || providerArea !== selectedSaloArea)) return false;
      const name = provider.nameByLocale?.[locale] || provider.name;
      const haystack = [name, provider.description[locale], provider.category, providerArea ? areaCopy[providerArea][locale].eyebrow : ""]
        .filter(Boolean).join(" ").toLocaleLowerCase(locale);
      return (!query || haystack.includes(query)) && matchesProviderCategory(category, provider.category, haystack);
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
        image: provider.image!,
        imageCredit: provider.imageCredit,
        price: provider.priceByLocale?.[locale] || provider.price,
        dedupeKey: providerDedupeKey(provider.nameByLocale?.[locale] || provider.name, providerArea ? areaCopy[providerArea][locale].eyebrow : "Salo"),
      };
    });

  const directoryProviderResults: ProviderSearchResult[] = luxuryDirectory
    .filter((provider) => {
      if (!provider.image || type === "destination") return false;
      if (type === "accommodation" && provider.category !== "stay") return false;
      if (type === "experience" && provider.category === "stay") return false;
      const name = provider.nameByLocale?.[locale] || provider.name;
      const location = provider.locationByLocale?.[locale] || provider.location;
      const haystack = [name, provider.description[locale], location, ...provider.tags]
        .filter(Boolean).join(" ").toLocaleLowerCase(locale);
      return (!query || haystack.includes(query))
        && matchesProviderCategory(category, provider.category, haystack)
        && matchesAreaText([location, provider.location, provider.locationByLocale?.fi, provider.locationByLocale?.es, provider.locationByLocale?.en].filter(Boolean).join(" "), selectedArea, locale);
    })
    .map((provider) => ({
      id: `directory-${provider.id}`,
      href: `/${locale}/providers/directory-${provider.id}`,
      name: provider.nameByLocale?.[locale] || provider.name,
      description: provider.description[locale],
      location: provider.locationByLocale?.[locale] || provider.location,
      category: provider.category,
      image: provider.image!,
      imageCredit: provider.imageCredit,
      price: provider.priceByLocale?.[locale] || provider.price,
      dedupeKey: providerDedupeKey(provider.nameByLocale?.[locale] || provider.name, provider.locationByLocale?.[locale] || provider.location),
    }));

  const kimitoonCategoryMap: Record<KimitoonCategory, string> = {
    majoitus: "stay",
    ruoka: "food",
    aktiviteetit: "experience",
    saaristo: "cruise",
    luonto: "hiking",
    kulttuuri: "culture",
    hyvinvointi: "sauna",
    kuljetukset: "experience",
    ostokset: "food",
    talviaktiviteetit: "experience",
    tapahtumapaikat: "culture",
    "muut-palvelut": "experience",
    tapahtumat: "culture",
  };
  const kimitoonProviderResults: ProviderSearchResult[] = kimitoonProviders
    .filter((provider) => {
      const image = provider.image || provider.categoryImages?.[provider.categories[0]];
      if (!image || type === "destination") return false;
      const categories = provider.categories.map((item) => kimitoonCategoryMap[item]);
      if (type === "accommodation" && !categories.includes("stay")) return false;
      if (type === "experience" && categories.includes("stay") && categories.length === 1) return false;
      if (category && !categories.some((item) => item === category || matchesProviderCategory(category, item, provider.tags.join(" ").toLocaleLowerCase(locale)))) return false;
      const location = provider.location[locale];
      const haystack = [provider.name[locale], provider.description[locale], location, ...provider.tags]
        .filter(Boolean).join(" ").toLocaleLowerCase(locale);
      return (!query || haystack.includes(query))
        && matchesAreaText([provider.location.fi, provider.location.en, provider.location.es].join(" "), selectedArea, locale);
    })
    .map((provider) => ({
      id: `kimitoon-${provider.id}`,
      href: `/${locale}/providers/kimitoon-${provider.id}`,
      name: provider.name[locale],
      description: provider.description[locale],
      location: provider.location[locale],
      category: kimitoonCategoryMap[provider.categories[0]],
      image: (provider.image || provider.categoryImages?.[provider.categories[0]])!,
      imageCredit: provider.imageCredit,
      dedupeKey: providerDedupeKey(provider.name[locale], provider.location[locale]),
    }));

  const foundProviders = [...saloProviderResults, ...directoryProviderResults, ...kimitoonProviderResults]
    .filter((provider, index, all) => all.findIndex((item) => item.dedupeKey === provider.dedupeKey) === index);
  const total = foundDestinations.length + foundCabins.length + foundExperiences.length + foundProviders.length;

  return (
    <main className="container-narrow min-h-[65vh] min-w-0 overflow-x-clip py-8 sm:py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-700">FINLAND EXPERIENCE</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{t.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{t.results}: {total}</p>
      </div>
      <form action={`/${locale}/search`} method="GET" className="mb-10 grid w-full min-w-0 gap-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_180px_180px_auto]">
        <input name="q" defaultValue={paramsValue.q || ""} placeholder={t.placeholder} className="min-h-11 min-w-0 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-700" />
        <select name="type" defaultValue={type} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-sm"><option value="all">{t.all}</option><option value="accommodation">{t.accommodation}</option><option value="experience">{t.experience}</option><option value="destination">{t.destination}</option></select>
        <select name="category" defaultValue={category} aria-label={t.category} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-sm"><option value="">{t.allCategories}</option>{(["food", "sauna", "cruise", "hiking", "culture"] as const).map((key) => <option key={key} value={key}>{t[key]}</option>)}</select>
        <select name="area" defaultValue={paramsValue.area || ""} className="min-h-11 w-full min-w-0 max-w-full rounded-xl border border-slate-200 px-3 text-sm"><option value="">{locale === "fi" ? "Kaikki alueet" : locale === "es" ? "Todas las zonas" : "All areas"}</option>{allDestinations.map((item) => <option key={item.slug} value={item.slug}>{localized(item.name, locale)}</option>)}</select>
        <button type="submit" className="inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full bg-brand-950 px-6 text-sm font-bold text-white sm:w-auto"><Search className="h-4 w-4" />{t.search}</button>
      </form>

      {total === 0 && <p className="rounded-2xl bg-brand-50 p-6 text-sm text-slate-700">{t.empty}</p>}

      {foundDestinations.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.destinations}</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{foundDestinations.map((item) => <Link key={item.slug} href={`/${locale}/destinations/${item.slug}`} className="group relative isolate flex aspect-[1.3] min-w-0 max-w-full overflow-hidden rounded-xl bg-brand-950 text-white"><Image src={item.images?.[0] || photoLibrary.turkuArchipelago} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 50vw,25vw" className="absolute inset-0 -z-20 object-cover" /><span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 to-transparent" /><span className="mt-auto min-w-0 max-w-full break-words p-3 font-display text-base font-bold leading-tight sm:text-lg">{localized(item.name, locale)}<span className="mt-1 flex min-w-0 items-center gap-1 break-words font-sans text-xs font-normal"><MapPin className="h-3 w-3 shrink-0" />{item.region}</span></span></Link>)}</div></section>}

      {foundCabins.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.stays}</h2><div className="grid gap-4 sm:grid-cols-3">{foundCabins.map((item) => <Link key={item.slug} href={`/${locale}/accommodations/${item.slug}`} className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft"><div className="relative aspect-[16/9]"><Image src={item.images?.[0] || photoLibrary.saunaCottage} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div><div className="min-w-0 p-4"><h3 className="break-words font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 break-words text-xs text-slate-500">{item.locationByLocale?.[locale] || item.location}</p><p className="mt-3 text-sm font-bold text-brand-900">{item.pricePerNight > 0 ? new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(item.pricePerNight) : t.price}</p></div></Link>)}</div></section>}

      {foundExperiences.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.experiences}</h2><div className="grid gap-4 sm:grid-cols-2">{foundExperiences.map((item) => <Link key={item.slug} href={`/${locale}/experiences/${item.slug}`} className="grid min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft sm:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-40"><Image src={item.images?.[0] || photoLibrary.saunaTraditionalSmoke} alt={localized(item.name, locale)} fill sizes="(max-width:640px) 100vw,50vw" className="object-cover" /></div><div className="min-w-0 break-words p-4"><h3 className="break-words font-display text-lg font-bold text-brand-950">{localized(item.name, locale)}</h3><p className="mt-1 break-words text-xs text-slate-500">{item.region}</p><p className="mt-2 break-words text-sm text-slate-600">{localized(item.shortDescription, locale)}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-900">{locale === "fi" ? "Katso palvelu" : locale === "es" ? "Ver servicio" : "View service"}<ArrowRight className="h-4 w-4" /></span></div></Link>)}</div></section>}
      {foundProviders.length > 0 && <section className="mb-10"><h2 className="mb-4 font-display text-2xl font-bold text-brand-950">{t.providers}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{foundProviders.map((provider) => <Link key={provider.id} href={provider.href} className="min-w-0 max-w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
        <div className="relative aspect-[16/9]"><Image src={provider.image} alt={provider.name} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover" /></div>
        <div className="min-w-0 break-words p-4"><p className="break-words text-[10px] font-bold uppercase tracking-[.14em] text-brand-700">{provider.location}</p><h3 className="mt-1 break-words font-display text-lg font-bold text-brand-950">{provider.name}</h3><p className="mt-2 break-words text-sm leading-6 text-slate-600">{provider.description}</p>{provider.price && <p className="mt-3 text-sm font-semibold text-brand-900">{provider.price}</p>}{provider.imageCredit && <p className="mt-3 border-t border-slate-100 pt-2 text-[10px] leading-4 text-slate-500">{provider.imageCredit}</p>}</div>
      </Link>)}</div></section>}

    </main>
  );
}
