"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { translateFinnishText } from "@/components/admin/AITranslationPanel";

type Page={id:string;slug:string;locale:string;title:string;content:string|null;seo_title:string|null;seo_description:string|null;canonical_url:string|null;noindex:boolean;published:boolean};
const empty:Page={id:"",slug:"",locale:"fi",title:"",content:"",seo_title:"",seo_description:"",canonical_url:"",noindex:false,published:false};

export default function PagesAdminPage(){
 const [pages,setPages]=useState<Page[]>([]); const [form,setForm]=useState<Page>(empty); const [error,setError]=useState(""); const [notice,setNotice]=useState(""); const [busy,setBusy]=useState(false);
 async function load(){const r=await fetch("/api/admin/pages",{cache:"no-store"});const b=await r.json();if(!r.ok)throw new Error(b.error||"Sivuja ei voitu ladata.");setPages(b.pages||[]);}
 useEffect(()=>{load().catch(e=>setError(e.message));},[]);
 async function save(){setBusy(true);setError("");setNotice("");try{
  if(form.locale==="fi"){
    const [titleTr,contentTr,seoTitleTr,seoDescTr]=await Promise.all([
      translateFinnishText(form.title,"travel"),
      translateFinnishText(form.content||"","travel"),
      translateFinnishText(form.seo_title||"","seo"),
      translateFinnishText(form.seo_description||"","seo"),
    ]);
    const {id: _id, ...base}=form;
    const requests=[
      {...base,locale:"fi"},
      {...base,locale:"en",title:titleTr.english,content:contentTr.english,seo_title:seoTitleTr.english||null,seo_description:seoDescTr.english||null},
      {...base,locale:"es",title:titleTr.spanish,content:contentTr.spanish,seo_title:seoTitleTr.spanish||null,seo_description:seoDescTr.spanish||null}
    ];
    for(const payload of requests){
      const r=await fetch("/api/admin/pages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const b=await r.json();if(!r.ok)throw new Error(b.error||"Tallennus epäonnistui.");
    }
    setNotice("Sivu tallennettu. EN- ja ES-versiot sekä SEO-kentät päivitettiin.");
  } else {
    const r=await fetch("/api/admin/pages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const b=await r.json();if(!r.ok)throw new Error(b.error||"Tallennus epäonnistui.");setNotice("Sivu tallennettu.");setForm(b.page);
  }
  await load();
 }catch(e){setError(e instanceof Error?e.message:"Tallennus epäonnistui.");}finally{setBusy(false);}}
 async function remove(page:Page){if(!confirm(`Poistetaanko sivu "${page.title}"?`))return;const r=await fetch(`/api/admin/pages?slug=${encodeURIComponent(page.slug)}&locale=${page.locale}`,{method:"DELETE"});const b=await r.json();if(!r.ok){setError(b.error||"Poisto epäonnistui.");return;}if(form.id===page.id)setForm(empty);await load();}
 return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-7xl">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-emerald-700">CMS / Sivut</p><h1 className="mt-1 text-3xl font-bold text-slate-950">Luo ja muokkaa sivuja</h1><p className="mt-2 max-w-2xl text-slate-500">Luo uusia sisältösivuja ilman koodimuutoksia. Julkaisematon sivu ei näy julkisella sivustolla.</p></div><Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link></div>
  <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
   <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-semibold">Sivut</h2><button onClick={()=>setForm(empty)} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white">+ Uusi</button></div><div className="mt-4 space-y-2">{pages.map(p=><button key={p.id} onClick={()=>setForm(p)} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-emerald-300"><div className="flex items-center justify-between gap-2"><span className="font-semibold">{p.title}</span><span className="text-xs text-slate-400">{p.locale.toUpperCase()}</span></div><p className="mt-1 text-xs text-slate-500">/{p.locale}/pages/{p.slug} · {p.published?"Julkaistu":"Luonnos"}</p></button>)}</div></section>
   <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="font-semibold">{form.id?"Muokkaa sivua":"Uusi sivu"}</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
     <label className="text-sm font-semibold">Slug<input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} placeholder="yritys" className="mt-2 w-full rounded-xl border px-3 py-3"/></label>
     <label className="text-sm font-semibold">Kieli<select value={form.locale} onChange={e=>setForm({...form,locale:e.target.value})} className="mt-2 w-full rounded-xl border px-3 py-3"><option value="fi">Suomi</option><option value="es">Español</option><option value="en">English</option></select></label>
     <label className="text-sm font-semibold sm:col-span-2">Otsikko<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="mt-2 w-full rounded-xl border px-3 py-3"/></label>
     <label className="text-sm font-semibold sm:col-span-2">Sisältö<textarea value={form.content||""} onChange={e=>setForm({...form,content:e.target.value})} rows={12} className="mt-2 w-full rounded-xl border px-3 py-3 font-sans leading-6"/></label>
     <label className="text-sm font-semibold">SEO-otsikko<input value={form.seo_title||""} onChange={e=>setForm({...form,seo_title:e.target.value})} className="mt-2 w-full rounded-xl border px-3 py-3"/></label>
     <label className="text-sm font-semibold">SEO-kuvaus<input value={form.seo_description||""} onChange={e=>setForm({...form,seo_description:e.target.value})} className="mt-2 w-full rounded-xl border px-3 py-3"/></label>
    </div>
    <div className="mt-4 flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})}/> Julkaistu</label><label className="flex items-center gap-2"><input type="checkbox" checked={form.noindex} onChange={e=>setForm({...form,noindex:e.target.checked})}/> Älä indeksoi</label></div>
    {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{notice&&<p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
    <div className="mt-5 flex flex-wrap gap-3"><button disabled={busy} onClick={save} className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white disabled:opacity-50">{busy?"Tallennetaan…":"Tallenna sivu"}</button>{form.id&&<button onClick={()=>remove(form)} className="rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-700">Poista</button>}</div>
   </section>
  </div>
 </div></main>;
}
