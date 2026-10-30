import Link from "next/link";
import { BedDouble, Utensils } from "lucide-react";
import type { Locale } from "@/types";

export function KimitoonKansakouluCategoryCard({locale,category}:{locale:Locale;category:"majoitus"|"ruoka"}) {
 const stay=category==="majoitus";
 const title=stay
  ? {fi:"Kansakoulu – majatalo vanhassa koulussa",en:"Kansakoulu – guesthouse in a former school",es:"Kansakoulu – alojamiento en una antigua escuela"}[locale]
  : {fi:"Kansakoulun ravintola – saariston makuja",en:"Kansakoulu Restaurant – flavours of the archipelago",es:"Restaurante Kansakoulu – sabores del archipiélago"}[locale];
 const description=stay
  ? {fi:"Persoonalliset huoneet, vanhan kansakoulun tunnelma ja rauhallinen tukikohta saaristomatkalle. Tutustu huonetyyppeihin ja yhteisiin pesutiloihin.",en:"Individual rooms, historic schoolhouse character and a peaceful base for exploring the islands. Discover room types and shared facilities.",es:"Habitaciones con personalidad, ambiente histórico y una base tranquila para descubrir el archipiélago. Conoce los tipos de habitación y los baños compartidos."}[locale]
  : {fi:"Tutustu ravintolaan, lähiruokaan, juhlasaliin, kahvilaan ja terasseihin. Tarkista päivän ruokalista ja aukiolo suoraan ravintolalta.",en:"Explore the restaurant, local food, function hall, café and terraces. Check today's menu and opening hours directly with the restaurant.",es:"Descubre el restaurante, los productos locales, el salón de celebraciones, la cafetería y las terrazas. Consulta directamente el menú y los horarios."}[locale];
 const href="/"+locale+"/destinations/kemionsaari/kohde/"+(stay?"kansakoulu":"kansakoulu-ravintola");
 return <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
  <Link href={href} className="block">
   {stay ? (
    <div className="flex h-64 flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white" aria-label={title}>
     <BedDouble className="h-10 w-10 text-gold-300" aria-hidden="true"/>
     <span className="text-xs font-bold uppercase tracking-[.22em] text-white/80">{locale==="fi"?"Majoitus":locale==="es"?"Alojamiento":"Accommodation"}</span>
     <span className="font-display text-2xl font-semibold">Kansakoulu</span>
    </div>
   ) : (
    <div className="grid h-64 grid-cols-2 overflow-hidden bg-stone-100">
     <img src="https://www.kansakouluun.fi/wp-content/uploads/2017/05/ravintola.jpg" alt={locale==="fi"?"Kansakoulun ravintolan historiallinen miljöö":locale==="es"?"Ambiente histórico del restaurante Kansakoulu":"The historic restaurant setting at Kansakoulu"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
     <img src="https://www.kansakouluun.fi/wp-content/uploads/2017/05/lahiruoka.jpg" alt={locale==="fi"?"Kansakoulun lähiruokatuotteita":locale==="es"?"Productos locales de Kansakoulu":"Local food products at Kansakoulu"} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
    </div>
   )}
   <div className="p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">Västanfjärd · Kemiönsaari</p><h2 className="mt-2 font-display text-2xl font-bold text-brand-950">{title}</h2><p className="mt-3 leading-7 text-slate-600">{description}</p><span className="mt-5 inline-flex text-sm font-bold text-brand-800">{locale==="fi"?"Tutustu palveluntarjoajaan":locale==="es"?"Descubrir el establecimiento":"Explore this provider"} →</span>
   </div>
  </Link>
 </article>;
}
