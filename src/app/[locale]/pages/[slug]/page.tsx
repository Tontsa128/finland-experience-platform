import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { localizedUrl } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({params}:{params:{locale:string;slug:string}}):Promise<Metadata>{
 const locale = params.locale as Locale;
 if (!locales.includes(locale)) return {};
 const {data}=await supabaseAdmin.from("site_pages").select("title,seo_title,seo_description,canonical_url,noindex").eq("locale",locale).eq("slug",params.slug).eq("published",true).maybeSingle();
 if(!data)return {};
 const canonical = data.canonical_url || localizedUrl(locale, "pages/" + params.slug);
 return {
   title:data.seo_title||data.title,
   description:data.seo_description||undefined,
   alternates:{canonical},
   robots:data.noindex?"noindex, nofollow":"index, follow"
 };
}

export default async function CustomPage({params}:{params:{locale:string;slug:string}}){
 if(!["fi","es","en"].includes(params.locale))notFound();
 const {data,error}=await supabaseAdmin.from("site_pages").select("title,content,canonical_url").eq("locale",params.locale).eq("slug",params.slug).eq("published",true).maybeSingle();
 if(error||!data)notFound();
 return <main className="min-h-[70vh] bg-white px-4 py-10 sm:py-16"><article className="mx-auto max-w-4xl"><h1 className="font-display text-4xl font-bold text-brand-900 sm:text-6xl">{data.title}</h1><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{data.content||""}</div></article></main>;
}
