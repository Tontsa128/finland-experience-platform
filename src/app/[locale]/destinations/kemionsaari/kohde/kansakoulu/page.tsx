import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KimitoonKansakouluDetail } from "@/components/salo/KimitoonKansakouluDetail";
import { buildLocalizedMetadata } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale:raw}=await params;
 if(!locales.includes(raw as Locale)) return {};
 const locale=raw as Locale;
 const meta={
  fi:{title:"Kansakoulu – majatalo Västanfjärdissä",description:"Tutustu Brännbodan vanhan kansakoulun persoonalliseen majataloon, huoneisiin, käytännön tietoihin ja vierasarvioihin."},
  en:{title:"Kansakoulu guesthouse in Västanfjärd",description:"Discover the characterful guesthouse in the former Brännboda village school, with room details and guest ratings."},
  es:{title:"Alojamiento Kansakoulu en Västanfjärd",description:"Descubre el alojamiento con personalidad de la antigua escuela de Brännboda, sus habitaciones y opiniones de huéspedes."}
 }[locale];
 return buildLocalizedMetadata({locale,...meta,path:"destinations/kemionsaari/kohde/kansakoulu",image:"https://www.kansakouluun.fi/wp-content/uploads/2017/05/ravintola.jpg"});
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale:raw}=await params;
 if(!locales.includes(raw as Locale)) notFound();
 return <KimitoonKansakouluDetail locale={raw as Locale} kind="stay"/>;
}
