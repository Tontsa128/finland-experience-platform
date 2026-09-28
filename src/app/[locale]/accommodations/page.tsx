import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cabins as fallbackCabins } from "@/lib/data";
import { getPublishedProperties } from "@/lib/public-content";
import { CabinCard } from "@/components/ui/CabinCard";
import type { Locale } from "@/types";
import { buildLocalizedMetadata, siteUrl } from "@/lib/seo";

const copy = {
  fi: { title: "Mökit Suomessa | Sauna, luonto ja kesäloma", description: "Löydä mökki, jossa Suomen kesä tuntuu oikealta.", heading: "Löydä oma paikkasi Suomessa", intro: "Herää järven rannalla, lämmitä sauna ja anna päivän kulua omalla painollaan.", idea: "Millainen kesä sinun unelmissasi on?", ideaText: "Rauhallinen mökkiviikko, sauna ja järvi vai tukikohta, josta lähdet tutkimaan Suomea?", cta: "Tutustu mökkeihin", more: "Katso kaikki majoitukset" },
  es: { title: "Cabañas en Finlandia | Sauna, naturaleza y verano", description: "Encuentra un lugar donde el verano finlandés se convierte en un recuerdo.", heading: "Encuentra tu lugar en Finlandia", intro: "Despierta junto al lago, calienta la sauna y deja que el día avance sin prisas.", idea: "¿Cómo imaginas tu verano perfecto?", ideaText: "Una semana junto al lago, sauna y naturaleza, o una base para descubrir Finlandia a tu ritmo.", cta: "Descubrir alojamientos", more: "Ver todos los alojamientos" },
  en: { title: "Cabins in Finland | Sauna, Nature and Summer", description: "Find a place where Finnish summer becomes a memory.", heading: "Find your place in Finland", intro: "Wake up by the lake, warm the sauna and let the day unfold without hurry.", idea: "What does your dream summer look like?", ideaText: "A quiet week by the lake, sauna and nature—or a base for exploring Finland at your own pace.", cta: "Explore places to stay", more: "See all places to stay" },
} as const;

export async function generateMetadata({params}:{params:{locale:string}}):Promise<Metadata>{
  const locale=params.locale as Locale; const c=copy[locale]||copy.en;
  return buildLocalizedMetadata({locale,title:c.title,description:c.description,path:"accommodations"});
}

export default async function AccommodationsPage({params}:{params:{locale:string}}){
 const locale=params.locale as Locale; const c=copy[locale]||copy.en;
 const cmsCabins=await getPublishedProperties(); const cabins=cmsCabins.length?cmsCabins:fallbackCabins;
 const jsonLd={"@context":"https://schema.org","@type":"ItemList","name":c.title,"url":siteUrl+"/"+locale+"/accommodations","itemListElement":cabins.map((cabin,index)=>({"@type":"ListItem","position":index+1,"name":cabin.name[locale]||cabin.name.en,"url":siteUrl+"/"+locale+"/accommodations/"+cabin.slug}))};
 return <div className="bg-white">
   <section className="bg-brand-950 text-white"><div className="container-narrow py-16 sm:py-24"><p className="text-sm font-semibold uppercase tracking-[.22em] text-white/60">Finland • Summer</p><h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[1.04] sm:text-7xl">{c.heading}</h1><p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">{c.intro}</p><Link href={`/${locale}/experiences`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-950 hover:bg-brand-50">{c.cta}<ArrowRight className="h-4 w-4"/></Link></div></section>
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
   <section className="container-narrow py-14 sm:py-20"><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{cabins.map((cabin,i)=><CabinCard key={cabin.id} cabin={cabin} index={i}/>)}</div></section>
   <section className="bg-slate-50"><div className="container-narrow py-14"><div className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-10"><Sparkles className="h-7 w-7 text-amber-500"/><h2 className="mt-5 font-display text-3xl font-bold text-brand-950 sm:text-4xl">{c.idea}</h2><p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{c.ideaText}</p><Link href={`/${locale}/accommodations`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-800">{c.more}<ArrowRight className="h-4 w-4"/></Link></div></div></section>
 </div>;
}
