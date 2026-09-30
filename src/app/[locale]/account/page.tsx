"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Customer = { first_name:string; last_name:string; email:string; phone:string|null; language_preference:string };

export default function AccountPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const language = locale === "es" ? "es" : locale === "en" ? "en" : "fi";
  const copy = {
    fi: {
      eyebrow:"Asiakastili", title:"Omat tietoni", intro:"Pidä yhteystietosi ja kieliasetuksesi ajan tasalla.",
      logout:"Kirjaudu ulos", firstName:"Etunimi", lastName:"Sukunimi", email:"Sähköposti", phone:"Puhelin", language:"Kieli",
      save:"Tallenna tiedot", saving:"Tallennetaan…", saved:"Tiedot tallennettu.", loadingError:"Tietoja ei voitu ladata.", genericError:"Lataus epäonnistui.", saveError:"Tallennus epäonnistui.",
      travelRequests:"Matkatoiveet", travelRequestsText:"Kun lähetät meille matkatoiveen, sitä käsitellään erillisenä yhteydenottona. Varsinainen varaus, sopimus ja maksu tehdään aina suoraan palveluntarjoajan kanssa.",
    },
    es: {
      eyebrow:"Cuenta", title:"Mis datos", intro:"Mantén actualizados tus datos de contacto y preferencias de idioma.",
      logout:"Cerrar sesión", firstName:"Nombre", lastName:"Apellidos", email:"Correo electrónico", phone:"Teléfono", language:"Idioma",
      save:"Guardar datos", saving:"Guardando…", saved:"Datos guardados.", loadingError:"No se pudieron cargar tus datos.", genericError:"No se pudo cargar la cuenta.", saveError:"No se pudieron guardar los datos.",
      travelRequests:"Preferencias de viaje", travelRequestsText:"Cuando nos envías una solicitud de viaje, la tratamos como una consulta independiente. La reserva, el contrato y el pago se realizan siempre directamente con el proveedor.",
    },
    en: {
      eyebrow:"Account", title:"My details", intro:"Keep your contact details and language preference up to date.",
      logout:"Log out", firstName:"First name", lastName:"Last name", email:"Email", phone:"Phone", language:"Language",
      save:"Save details", saving:"Saving…", saved:"Details saved.", loadingError:"Could not load your details.", genericError:"Could not load the account.", saveError:"Could not save your details.",
      travelRequests:"Travel requests", travelRequestsText:"When you send us a travel request, it is handled as a separate enquiry. Booking, the contract and payment are always completed directly with the provider.",
    },
  }[language];

  const [customer,setCustomer]=useState<Customer>({first_name:"",last_name:"",email:"",phone:"",language_preference:language});
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  const [saved,setSaved]=useState(false);

  useEffect(()=>{(async()=>{
    try{
      const r=await fetch("/api/account/profile",{cache:"no-store"});
      const b=await r.json();
      if(r.status===401){router.replace(`/${locale}/account/login`);return;}
      if(!r.ok)throw new Error(b.error||copy.loadingError);
      if(b.customer)setCustomer(b.customer);
      setEmail(b.user?.email||"");
    }catch(e){setError(e instanceof Error?e.message:copy.genericError);}
    finally{setLoading(false);}
  })()},[locale,router]);

  async function save(){
    setSaving(true);setSaved(false);setError("");
    const r=await fetch("/api/account/profile",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(customer)});
    const b=await r.json();
    if(!r.ok){setError(b.error||copy.saveError);setSaving(false);return;}
    setCustomer(b.customer);setSaved(true);setSaving(false);
  }
  async function logout(){
    const supabase=createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace(`/${locale}`);
    router.refresh();
  }

  if(loading)return <main className="min-h-[70vh] grid place-items-center bg-slate-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"/></main>;

  return <main className="min-h-[calc(100svh-4rem)] bg-slate-50 px-4 py-10 sm:py-16"><div className="mx-auto max-w-3xl">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">{copy.eyebrow}</p><h1 className="mt-2 text-3xl font-bold text-slate-950">{copy.title}</h1><p className="mt-2 text-slate-500">{copy.intro}</p></div>
      <button onClick={logout} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">{copy.logout}</button>
    </div>
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">{copy.firstName}<input value={customer.first_name} onChange={e=>setCustomer({...customer,first_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700">{copy.lastName}<input value={customer.last_name} onChange={e=>setCustomer({...customer,last_name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700 sm:col-span-2">{copy.email}<input value={email} disabled className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-slate-500"/></label>
        <label className="text-sm font-semibold text-slate-700">{copy.phone}<input value={customer.phone||""} onChange={e=>setCustomer({...customer,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"/></label>
        <label className="text-sm font-semibold text-slate-700">{copy.language}<select value={customer.language_preference||language} onChange={e=>setCustomer({...customer,language_preference:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"><option value="fi">Suomi</option><option value="es">Español</option><option value="en">English</option></select></label>
      </div>
      {error&&<p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {saved&&<p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{copy.saved}</p>}
      <button onClick={save} disabled={saving} className="mt-6 rounded-xl bg-brand-900 px-5 py-3 font-semibold text-white disabled:opacity-60">{saving?copy.saving:copy.save}</button>
    </section>
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
      <h2 className="font-semibold text-slate-900">{copy.travelRequests}</h2>
      <p className="mt-1 leading-6">{copy.travelRequestsText}</p>
    </section>
  </div></main>;
}
