import type { Metadata } from "next";
import { cabins as fallbackCabins } from "@/lib/data";
import { getPublishedProperties } from "@/lib/public-content";
import { CabinCard } from "@/components/ui/CabinCard";
import type { Locale } from "@/types";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";

const copy = {
  fi: { title: "Mökit Suomessa | Sauna, luonto ja kesäloma", description: "Löydä mökkejä Suomessa, saaristossa ja järvimaisemissa. Sauna, luonto ja rauhallinen suomalainen kesä.", heading: "Majoitukset" },
  es: { title: "Cabañas en Finlandia | Sauna, naturaleza y verano", description: "Descubre cabañas en Finlandia, el archipiélago y villas junto al mar. Sauna, naturaleza y auténticas vacaciones finlandesas.", heading: "Alojamientos" },
  en: { title: "Cabins in Finland | Sauna, Nature and Summer", description: "Discover Finnish cabins, archipelago stays and seaside villas with sauna, nature and authentic summer experiences.", heading: "Places to stay" },
} as const;

export async function generateMetadata({params}:{params:{locale:string}}):Promise<Metadata>{
  const locale=params.locale as Locale;
  const c=copy[locale]||copy.en;
  return buildLocalizedMetadata({locale,title:c.title,description:c.description,path:"accommodations"});
}

export default async function AccommodationsPage({params}:{params:{locale:string}}){
 const locale=params.locale as Locale;
 const c=copy[locale]||copy.en;
 const cmsCabins = await getPublishedProperties();
 const cabins = cmsCabins.length ? cmsCabins : fallbackCabins;
 const jsonLd={"@context":"https://schema.org","@type":"ItemList","name":c.title,"url":siteUrl+"/"+locale+"/accommodations","itemListElement":cabins.map((cabin,index)=>({"@type":"ListItem","position":index+1,"name":cabin.name[locale]||cabin.name.en,"url":siteUrl+"/"+locale+"/accommodations#"+cabin.slug}))};
 return <div className="container-narrow py-16"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Southern Finland • Summer</p><h1 className="mt-2 section-title">{c.heading}</h1><p className="section-subtitle mt-3 mb-10">{c.description}</p><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cabins.map((cabin,i)=><CabinCard key={cabin.id} cabin={cabin} index={i}/>)}</div></div>;
}
