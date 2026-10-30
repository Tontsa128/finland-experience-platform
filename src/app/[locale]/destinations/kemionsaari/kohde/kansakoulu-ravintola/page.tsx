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
  fi:{title:"Kansakoulun ravintola – lähiruokaa Kemiönsaarella",description:"Tutustu Kansakoulun ravintolaan, lähiruokaan, juhlasaliin, ruokalistatietoihin ja asiakasarvioihin."},
  en:{title:"Kansakoulu Restaurant – local food on Kimitoön",description:"Explore Kansakoulu Restaurant, local ingredients, function hall, menu information and guest reviews."},
  es:{title:"Restaurante Kansakoulu – productos locales en Kimitoön",description:"Conoce el restaurante Kansakoulu, los productos locales, el salón de celebraciones y las opiniones."}
 }[locale];
 return buildLocalizedMetadata({locale,...meta,path:"destinations/kemionsaari/kohde/kansakoulu-ravintola",image:"https://www.kansakouluun.fi/wp-content/uploads/2017/05/ravintola.jpg"});
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale:raw}=await params;
 if(!locales.includes(raw as Locale)) notFound();
 return <KimitoonKansakouluDetail locale={raw as Locale} kind="food"/>;
}
