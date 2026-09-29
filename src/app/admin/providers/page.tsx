"use client";
import { useCallback, useEffect, useState } from "react";

type Provider = {
 id:string; name:string; slug:string; provider_type:string; region:string|null;
 verified:boolean; active:boolean; featured:boolean; email:string|null; website_url:string|null;
 lead_count:number; verification_completed:number; verification_total:number; verification_checked_at:string|null;
};

export default function ProvidersAdmin(){
 const [items,setItems]=useState<Provider[]>([]);
 const [error,setError]=useState("");
 const load=useCallback(async()=>{setError("");const r=await fetch("/api/admin/providers",{cache:"no-store"});const b=await r.json();if(!r.ok)throw new Error(b.error||"Palveluntarjoajia ei voitu ladata.");setItems(b.providers||[]);},[]);
 useEffect(()=>{load().catch(e=>setError(e instanceof Error?e.message:"Lataus epäonnistui"));},[load]);
 return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-7xl">
  <p className="text-sm font-semibold text-emerald-700">CMS / Partner Network</p>
  <h1 className="mt-1 text-3xl font-bold text-slate-950">Verified Partners</h1>
  <p className="mt-2 max-w-2xl text-slate-600">Hallitse paikallisia palveluntarjoajia, varmennusta ja liidien määrää. Verified on sivuston oma toimituksellinen tarkistus, ei viranomaissertifikaatti.</p>
  {error&&<div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
  <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-4">Yritys</th><th className="p-4">Tyyppi</th><th className="p-4">Alue</th><th className="p-4">Verification</th><th className="p-4">Liidit</th></tr></thead><tbody>{items.map(p=><tr key={p.id} className="border-t"><td className="p-4 font-semibold">{p.name}<div className="text-xs font-normal text-slate-500">{p.email||"—"}</div></td><td className="p-4">{p.provider_type}</td><td className="p-4">{p.region||"—"}</td><td className="p-4"><div className="font-semibold">{p.verified?"✓ Verified":"Pending"}</div><div className="text-xs text-slate-500">{p.verification_completed}/{p.verification_total} tarkistusta</div></td><td className="p-4 font-semibold">{p.lead_count}</td></tr>)}</tbody></table>{!items.length&&!error&&<div className="p-8 text-slate-500">Ei kumppaneita vielä.</div>}</div>
 </div></main>;
}
