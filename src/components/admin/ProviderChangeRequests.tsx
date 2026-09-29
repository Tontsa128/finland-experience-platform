"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, X } from "lucide-react";

type RequestItem={
  id:string;
  changes:Record<string,unknown>;
  status:"pending"|"approved"|"rejected";
  admin_notes:string|null;
  created_at:string;
  reviewed_at:string|null;
};

const labels:Record<string,string>={
  description_fi:"Kuvaus FI",description_es:"Kuvaus ES",description_en:"Kuvaus EN",
  website_url:"Verkkosivusto",booking_url:"Varauslinkki",email:"Sähköposti",phone:"Puhelin",
  whatsapp:"WhatsApp",address:"Osoite",region:"Alue",languages:"Kielet",categories:"Kategoriat"
};

export default function ProviderChangeRequests({providerId}:{providerId:string}){
 const [items,setItems]=useState<RequestItem[]>([]);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState("");
 const [error,setError]=useState("");
 const [notes,setNotes]=useState<Record<string,string>>({});

 const load=useCallback(async()=>{
   setLoading(true);setError("");
   const r=await fetch("/api/admin/providers/change-requests?providerId="+encodeURIComponent(providerId),{cache:"no-store"});
   const b=await r.json();
   if(!r.ok) throw new Error(b.error||"Muutospyyntöjä ei voitu ladata.");
   setItems(b.requests||[]);setLoading(false);
 },[providerId]);

 useEffect(()=>{load().catch(e=>{setError(e instanceof Error?e.message:"Lataus epäonnistui");setLoading(false)})},[load]);

 async function review(id:string,status:"approved"|"rejected"){
   setBusy(id);setError("");
   const r=await fetch("/api/admin/providers/change-requests",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,status,adminNotes:notes[id]||""})});
   const b=await r.json();
   if(!r.ok){setError(b.error||"Käsittely epäonnistui.");setBusy("");return}
   await load();setBusy("");
 }

 if(loading) return <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-slate-500">Ladataan muutospyyntöjä…</div>;

 return <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
   <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Partner profile</p><h2 className="mt-1 text-2xl font-bold text-slate-950">Profiilin muutospyynnöt</h2><p className="mt-2 text-sm text-slate-500">Partnerin muutokset julkaistaan vasta admin-hyväksynnän jälkeen.</p></div>
   {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
   {!items.length?<p className="mt-6 text-sm text-slate-500">Ei muutospyyntöjä.</p>:<div className="mt-6 space-y-4">{items.map(item=><article key={item.id} className="rounded-2xl border border-slate-200 p-4">
     <div className="flex flex-wrap items-center justify-between gap-2"><div className="text-sm font-semibold">{new Date(item.created_at).toLocaleString("fi-FI")}</div><span className={"rounded-full px-3 py-1 text-xs font-bold "+(item.status==="pending"?"bg-amber-50 text-amber-700":item.status==="approved"?"bg-emerald-50 text-emerald-700":"bg-slate-100 text-slate-600")}>{item.status}</span></div>
     <div className="mt-4 grid gap-2 sm:grid-cols-2">{Object.entries(item.changes||{}).map(([key,value])=><div key={key} className="rounded-xl bg-slate-50 p-3"><div className="text-xs font-bold uppercase tracking-wider text-slate-400">{labels[key]||key}</div><div className="mt-1 break-words text-sm text-slate-700">{Array.isArray(value)?value.join(", "):String(value)}</div></div>)}</div>
     {item.status==="pending"&&<><textarea value={notes[item.id]||""} onChange={e=>setNotes(v=>({...v,[item.id]:e.target.value}))} maxLength={5000} rows={2} placeholder="Adminin kommentti (valinnainen)" className="mt-4 w-full rounded-xl border p-3 text-sm"/><div className="mt-3 flex flex-wrap gap-2"><button disabled={busy===item.id} onClick={()=>review(item.id,"approved")} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"><Check className="h-4 w-4"/>Hyväksy ja julkaise</button><button disabled={busy===item.id} onClick={()=>review(item.id,"rejected")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-50"><X className="h-4 w-4"/>Hylkää</button></div></>}
   </article>)}</div>}
 </section>;
}
