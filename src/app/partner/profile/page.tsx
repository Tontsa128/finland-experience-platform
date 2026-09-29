"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Save } from "lucide-react";
import Link from "next/link";

type Profile = {
  provider: {
    name:string; description_fi:string|null; description_en:string|null; description_es:string|null;
    website_url:string|null; booking_url:string|null; email:string|null; phone:string|null; whatsapp:string|null;
    address:string|null; region:string|null; languages:string[]; categories:string[];
  };
};
type Request = { id:string; changes:Record<string,unknown>; status:string; admin_notes:string|null; created_at:string };

const fields = [
  ["description_fi","Kuvaus (FI)"],["description_en","Kuvaus (EN)"],["description_es","Kuvaus (ES)"],
  ["website_url","Verkkosivu"],["booking_url","Varauslinkki"],["email","Sähköposti"],["phone","Puhelin"],
  ["whatsapp","WhatsApp"],["address","Osoite"],["region","Alue"]
] as const;

export default function PartnerProfilePage() {
  const [profile,setProfile]=useState<Profile|null>(null);
  const [form,setForm]=useState<Record<string,string>>({});
  const [requests,setRequests]=useState<Request[]>([]);
  const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState(""); const [error,setError]=useState("");

  async function load() {
    const [p,r]=await Promise.all([fetch("/api/partner/me",{cache:"no-store"}),fetch("/api/partner/profile/requests",{cache:"no-store"})]);
    if(p.status===401){window.location.href="/partner/login?redirect=/partner/profile";return;}
    const pb=await p.json(), rb=await r.json();
    if(!p.ok) throw new Error(pb.error||"Profiilia ei voitu ladata.");
    if(!r.ok) throw new Error(rb.error||"Muutospyyntöjä ei voitu ladata.");
    setProfile(pb); setRequests(rb.requests||[]);
    const provider=pb.provider;
    setForm(Object.fromEntries(fields.map(([key])=>[key,provider[key]||""])));
    setLoading(false);
  }
  useEffect(()=>{load().catch(e=>{setError(e instanceof Error?e.message:"Lataus epäonnistui");setLoading(false);});},[]);

  async function save() {
    setSaving(true);setMessage("");setError("");
    const r=await fetch("/api/partner/profile/requests",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(form)});
    const b=await r.json();
    if(!r.ok){setError(b.error||"Pyyntöä ei voitu lähettää.");setSaving(false);return;}
    setMessage("Muutospyyntö lähetetty ylläpidon tarkistettavaksi.");
    setSaving(false); await load();
  }

  if(loading)return <main className="min-h-screen bg-slate-50 p-8"><div className="mx-auto max-w-3xl h-96 animate-pulse rounded-3xl bg-slate-200"/></main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-4xl">
    <Link href="/partner" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"><ArrowLeft className="h-4 w-4"/>Takaisin portaaliin</Link>
    <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold text-midnight">Yritysprofiili</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Voit ehdottaa muutoksia tietoihin. Julkiset muutokset julkaistaan ylläpidon tarkistuksen jälkeen.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">{fields.map(([key,label])=><label key={key} className={key.startsWith("description_")?"sm:col-span-2":""}><span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>{key.startsWith("description_")?<textarea rows={5} value={form[key]||""} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500"/>:<input value={form[key]||""} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-emerald-500"/>}</label>)}</div>
      {error&&<p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message&&<p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      <button onClick={save} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-midnight px-5 py-3 font-semibold text-white disabled:opacity-60"><Save className="h-4 w-4"/>{saving?"Lähetetään...":"Lähetä muutokset tarkistettavaksi"}</button>
    </section>
    <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-midnight">Muutospyynnöt</h2>
      <div className="mt-4 space-y-3">{requests.map(request=><article key={request.id} className="rounded-xl border p-4"><div className="flex items-center gap-2 font-semibold">{request.status==="approved"?<CheckCircle2 className="h-4 w-4 text-emerald-600"/>:<Clock3 className="h-4 w-4 text-amber-600"/>}{request.status==="pending"?"Odottaa tarkistusta":request.status==="approved"?"Hyväksytty":"Hylätty"}</div>{request.admin_notes&&<p className="mt-2 text-sm text-slate-600">{request.admin_notes}</p>}<p className="mt-2 text-xs text-slate-400">{new Date(request.created_at).toLocaleString("fi-FI")}</p></article>)}</div>
      {!requests.length&&<p className="mt-4 text-sm text-slate-500">Muutospyyntöjä ei ole vielä.</p>}
    </section>
  </div></main>;
}
