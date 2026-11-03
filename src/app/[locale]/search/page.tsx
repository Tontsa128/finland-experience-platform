import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { getPublishedDestinations, getPublishedProperties, getPublishedExperiences } from "@/lib/public-content";
import { destinations as fallbackDestinations } from "@/lib/data";
import { saloProviders } from "@/lib/salo";
import { canonicalDestinationSlug } from "@/lib/utils";
import type { Destination, Cabin, Experience, Locale } from "@/types";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  fi: { title:"Haku", description:"Hae kohteita, majoituksia, elämyksiä ja Salon paikallisia palveluita.", intro:"Löydä sopiva kohde tai palvelu yhdellä haulla.", placeholder:"Mitä etsit?", destinations:"Matkakohteet", accommodations:"Majoitukset", experiences:"Elämykset", providers:"Salon paikalliset palvelut", empty:"Haulla ei löytynyt tuloksia. Kokeile toista sanaa.", results:"tulosta", more:"Näytetään enintään 12 osumaa kategoriasta.", browse:"Selaa kaikkia" },
  es: { title:"Buscar", description:"Busca destinos, alojamientos, experiencias y servicios locales de Salo.", intro:"Encuentra el destino o servicio adecuado con una sola búsqueda.", placeholder:"¿Qué buscas?", destinations:"Destinos", accommodations:"Alojamientos", experiences:"Experiencias", providers:"Servicios locales de Salo", empty:"No hay resultados. Prueba con otra palabra.", results:"resultados", more:"Se muestran hasta 12 resultados por categoría.", browse:"Ver todos" },
  en: { title:"Search", description:"Search destinations, accommodation, experiences and local Salo services.", intro:"Find the right place or service with one search.", placeholder:"What are you looking for?", destinations:"Destinations", accommodations:"Places to stay", experiences:"Experiences", providers:"Local services in Salo", empty:"No results found. Try another search term.", results:"results", more:"Showing up to 12 results per category.", browse:"Browse all" },
} as const;
type SearchItem = { slug:string; name:string; description:string; region:string; href:string };
function localized(value: Record<Locale,string> | undefined, locale: Locale): string { return value?.[locale]?.trim() || value?.en?.trim() || ""; }
function normalized(value: string): string { return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase(); }
function matches(query: string, fields: string[]): boolean { const haystack=normalized(fields.join(" ")); return query.split(/\s+/).every((term)=>haystack.includes(term)); }
function destinationHref(destination: Destination, locale: Locale): string {
  return destination.slug === "salo-mathildedal" || destination.slug === "salo" ? `/${locale}/salo` : `/${locale}/destinations/${canonicalDestinationSlug(destination.slug)}`;
}
function resultItems(query: string, locale: Locale, destinations: Destination[], stays: Cabin[], experiences: Experience[]) {
  const destinationItems: SearchItem[] = destinations.filter((item)=>matches(query,[localized(item.name,locale),localized(item.shortDescription,locale),localized(item.description,locale),item.region,...(item.tags||[]),...(item.activities||[])])).map((item)=>({slug:item.slug,name:localized(item.name,locale),description:localized(item.shortDescription,locale),region:item.region,href:destinationHref(item,locale)}));
  const stayItems: SearchItem[] = stays.filter((item)=>matches(query,[localized(item.name,locale),localized(item.description,locale),item.location,item.region,...(item.features||[])])).map((item)=>({slug:item.slug,name:localized(item.name,locale),description:localized(item.description,locale),region:item.location,href:`/${locale}/accommodations/${item.slug}`}));
  const experienceItems: SearchItem[] = experiences.filter((item)=>matches(query,[localized(item.name,locale),localized(item.shortDescription,locale),localized(item.description,locale),item.region,item.category,item.address||"",...(item.tags||[]),...(item.audienceTags||[]),...(item.seasonTags||[])])).map((item)=>({slug:item.slug,name:localized(item.name,locale),description:localized(item.shortDescription,locale),region:item.region,href:`/${locale}/experiences/${item.slug}`}));
  const providerItems: SearchItem[] = saloProviders.filter((item)=>matches(query,[item.nameByLocale?.[locale]||item.name,item.description[locale],item.priceByLocale?.[locale]||item.price||"",item.category])).map((item)=>({slug:item.id,name:item.nameByLocale?.[locale]||item.name,description:item.description[locale],region:"Salo",href:`/${locale}/providers/salo-${item.id}`}));
  return [
    { key:"destinations",titleKey:"destinations",items:destinationItems,href:`/${locale}/destinations` },
    { key:"accommodations",titleKey:"accommodations",items:stayItems,href:`/${locale}/accommodations` },
    { key:"experiences",titleKey:"experiences",items:experienceItems,href:`/${locale}/experiences` },
    { key:"providers",titleKey:"providers",items:providerItems,href:`/${locale}/salo/kylat` },
  ] as const;
}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale:raw}=await params;const locale=(raw==="es"||raw==="en"?raw:"fi") as Locale;const c=copy[locale];
  return buildLocalizedMetadata({locale,title:c.title,description:c.description,path:"search"});
}
export default async function SearchPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{q?:string|string[]}>}){
  const [{locale:raw},search]=await Promise.all([params,searchParams]);const locale=(raw==="es"||raw==="en"?raw:"fi") as Locale;
  const rawQuery=typeof search.q==="string"?search.q.trim().slice(0,100):"";const query=normalized(rawQuery);const c=copy[locale];
  const [cmsDestinations,stays,experiences]=await Promise.all([getPublishedDestinations(),getPublishedProperties(),getPublishedExperiences()]);
  const destinations=cmsDestinations.length?cmsDestinations:fallbackDestinations;const groups=query.length>=2?resultItems(query,locale,destinations,stays,experiences):[];
  const total=groups.reduce((count,group)=>count+group.items.length,0);
  return <main className="bg-snow py-10 sm:py-16"><div className="container-narrow">
    <header className="rounded-[2rem] bg-brand-950 p-6 text-white shadow-card sm:p-10">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-gold-300"><Search className="h-4 w-4" />{c.title}</p>
      <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{c.intro}</h1>
      <form action={`/${locale}/search`} role="search" className="mt-6 flex gap-2 rounded-full bg-white p-2">
        <label className="sr-only" htmlFor="search-page-query">{c.placeholder}</label>
        <input id="search-page-query" type="search" name="q" required minLength={2} maxLength={100} defaultValue={rawQuery} placeholder={c.placeholder} className="min-w-0 flex-1 rounded-full px-4 py-3 text-sm text-brand-950 outline-none" />
        <button type="submit" aria-label={c.title} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white hover:bg-brand-800"><Search className="h-4 w-4" /></button>
      </form>
    </header>
    {query.length>=2 ? total>0 ? (
      <div className="mt-10 space-y-10" aria-live="polite"><p className="text-sm font-semibold text-slate-600">{total} {c.results}. {c.more}</p>
        {groups.filter((group)=>group.items.length>0).map((group)=>(
          <section key={group.key} aria-labelledby={`search-${group.key}`}><div className="mb-4 flex items-center justify-between gap-4">
            <h2 id={`search-${group.key}`} className="font-display text-2xl font-bold text-brand-950">{c[group.titleKey]}</h2>
            <Link href={group.href} className="inline-flex items-center gap-1 text-sm font-bold text-brand-700">{c.browse}<ArrowRight className="h-4 w-4" /></Link>
          </div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{group.items.slice(0,12).map((item)=>(
            <Link key={group.key+item.slug} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{item.region}</p><h3 className="mt-2 font-bold text-brand-950">{item.name}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>))}</div></section>))}
      </div>
    ) : <p className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">{c.empty}</p> : null}
  </div></main>;
}
