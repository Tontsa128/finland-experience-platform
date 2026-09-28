"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Customer = { first_name:string; last_name:string; email:string; phone:string|null; language_preference:string };
export default function AccountPage() {
  const router=useRouter(); const {locale}=useParams<{locale:string}>();
  const [customer,setCustomer]=useState<Customer>({first_name:"",last_name:"",email:"",phone:"",language_preference:locale});
  const [email,setEmail]=useState(""); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [error,setError]=useState(""); const [saved,setSaved]=useState(false);

  useEffect(()=>{(async()=>{
    try{
      const r=await fetch("/api/account/profile",{cache:"no-store"}); const b=await r.json();
      if(r.status===401){router.replace(`/${locale}/account/login`);return;}
      if(!r.ok)throw new Error(b.error||"Tietoja ei voitu ladata.");
      if(b.customer)setCustomer(b.customer);
      setEmail(b.user?.email||"");
    }catch(e){setError(e instanceof Error?e.message:"Lataus epäonnistui.");}
    finally{setLoading(false);}
  })()},[locale,router]);

  async function save(){setSaving(true);setSaved(false);setError("");
    const r=await fetch("/api/account/profile",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(customer)});
    const b=await r.json(); if(!r.ok){setError(b.error||"Tallennus epäonnistui.");setSaving(false);return;}
    setCustomer(b.customer);setSaved(true);setSaving(false);
  }
  async function logout(){const supabase=createSupabaseBrowserClient();await supabase.auth.signOut();router.replace(`/${locale}`);router.refresh();}

  if(loading)return <main className="min-h-[70vh] grid place-items-center bg-slate-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"/></main>;

  return <main className="min-h-[calc(100svh-4rem)] bg-slate-50 px-4 py-10 sm:py-16"><div className="mx-auto max-w-3xl">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">Asiakastili</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Omat tietoni</h1><p className="mt-2 text-slate-500">Pidä yhteystietosi ajan tasalla.</p></div><button onClick={logout} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Kirjaudu ulos</button></div>
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">Etunimi<input value={customer.first_name} onChange={e=>setCustomer({...customer,first_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700">Sukunimi<input value={customer.last_name} onChange={e=>setCustomer({...customer,last_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Sähköposti<input value={email} disabled className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-500"/></label>
        <label className="text-sm font-semibold text-slate-700">Puhelin<input value={customer.phone||""} onChange={e=>setCustomer({...customer,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700">Kieli<select value={customer.language_preference||locale} onChange={e=>setCustomer({...customer,language_preference:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"><option value="fi">Suomi</option><option value="es">Español</option><option value="en">English</option></select></label>
      </div>
      {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {saved&&<p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">Tiedot tallennettu.</p>}
      <button onClick={save} disabled={saving} className="mt-6 rounded-xl bg-brand-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{saving?"Tallennetaan…":"Tallenna tiedot"}</button>
    </section>
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500"><strong className="text-slate-900">Varaukset</strong><p className="mt-1">Varaushistoria liitetään tähän tiliin seuraavassa vaiheessa, kun varausprosessi siirretään kokonaan Supabase-pohjaiseksi.</p></div>
  </div></main>;
}
