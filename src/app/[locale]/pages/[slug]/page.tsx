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
 const {data,error}=await supabaseAdmin.from("site_pages").select("title,content,blocks,canonical_url").eq("locale",params.locale).eq("slug",params.slug).eq("published",true).maybeSingle();
 if(error||!data)notFound();
 const blocks=Array.isArray(data.blocks)?data.blocks.filter((b:any)=>b?.visible!==false):[];
const locale=params.locale as "fi"|"en"|"es";
const copy=(b:any)=>b?.content?.[locale]||b?.content?.fi||{};
return <main className="min-h-[70vh] bg-white">
<article>
{blocks.length===0 ? <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16"><h1 className="font-display text-4xl font-bold text-brand-900 sm:text-6xl">{data.title}</h1><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{data.content||""}</div></div> :
blocks.map((b:any)=><section key={b.id} className={b.type==="spacer"?"h-16 sm:h-24":"relative overflow-hidden"}>
{b.type==="hero"&&<div className="relative min-h-[55svh] flex items-end"><img src={b.imageUrl} alt={b.imageAlt||""} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10"/><div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-white sm:px-8"><p className="text-xs font-bold uppercase tracking-[.2em]">{copy(b).eyebrow}</p><h2 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{copy(b).title}</h2><p className="mt-5 max-w-2xl text-lg text-white/90">{copy(b).text}</p></div></div>}
{b.type==="text"&&<div className="mx-auto max-w-4xl px-4 py-12 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{copy(b).eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-5xl">{copy(b).title}</h2><div className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-700">{copy(b).text}</div></div>}
{b.type==="image"&&<div className="mx-auto max-w-7xl px-4 py-8 sm:px-8"><img src={b.imageUrl} alt={b.imageAlt||""} className="max-h-[760px] w-full rounded-3xl object-cover"/></div>}
{b.type==="image_text"&&<div className={"mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-8 lg:grid-cols-2 "+(b.layout==="image-right"?"lg:[&>img]:order-2":"")}><img src={b.imageUrl} alt={b.imageAlt||""} className="h-[360px] w-full rounded-3xl object-cover"/><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{copy(b).eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-5xl">{copy(b).title}</h2><p className="mt-5 whitespace-pre-wrap text-lg leading-8 text-slate-700">{copy(b).text}</p></div></div>}
{b.type==="gallery"&&<div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-10 sm:grid-cols-3 sm:px-8">{(b.items||[]).map((it:any,i:number)=><img key={i} src={it.url} alt={it.alt||""} className="aspect-[4/3] w-full rounded-2xl object-cover"/>)}</div>}
{b.type==="cta"&&<div className="mx-auto my-8 max-w-6xl rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">{copy(b).eyebrow}</p><h2 className="mt-2 text-3xl font-bold sm:text-5xl">{copy(b).title}</h2><p className="mt-4 max-w-2xl text-lg text-white/75">{copy(b).text}</p>{copy(b).buttonLabel&&<a href={copy(b).buttonUrl||"#"} className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-bold text-slate-950">{copy(b).buttonLabel}</a>}</div>}
</section>)}
</article></main>;
}
