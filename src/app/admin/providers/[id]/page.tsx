"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Save, ShieldCheck } from "lucide-react";
import ProviderChangeRequests from "@/components/admin/ProviderChangeRequests";

const fields = [
  ["company_checked","Yritys ja perustiedot"],
  ["contact_checked","Yhteystiedot"],
  ["pricing_checked","Hinnoittelutiedot"],
  ["booking_flow_checked","Varauspolku"],
  ["spanish_content_checked","Espanjankielinen sisältö"],
  ["photos_checked","Kuvat ja käyttöoikeudet"],
] as const;

export default function ProviderVerificationPage({ params }: { params: Promise<{ id:string }> }) {
  const [id,setId] = useState("");
  const [name,setName] = useState("");
  const [checks,setChecks] = useState<Record<string,boolean>>({});
  const [notes,setNotes] = useState("");
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const load = useCallback(async (providerId:string) => {
    setLoading(true);
    const [providersResponse,verificationResponse] = await Promise.all([
      fetch("/api/admin/providers",{cache:"no-store"}),
      fetch("/api/admin/providers/"+providerId+"/verification",{cache:"no-store"})
    ]);
    const providersBody = await providersResponse.json();
    const verificationBody = await verificationResponse.json();
    if (!providersResponse.ok) throw new Error(providersBody.error || "Palveluntarjoajia ei voitu ladata.");
    if (!verificationResponse.ok) throw new Error(verificationBody.error || "Varmennusta ei voitu ladata.");
    const provider = (providersBody.providers || []).find((item:{id:string}) => item.id === providerId);
    setName(provider?.name || "Palveluntarjoaja");
    const verification = verificationBody.verification || {};
    setChecks(Object.fromEntries(fields.map(([key]) => [key,Boolean(verification[key])])));
    setNotes(verification.notes || "");
    setLoading(false);
  },[]);

  useEffect(() => {
    params.then(value => { setId(value.id); load(value.id).catch(e => { setError(e instanceof Error ? e.message : "Lataus epäonnistui"); setLoading(false); }); });
  },[params,load]);

  async function save() {
    setSaving(true); setMessage(""); setError("");
    const r = await fetch("/api/admin/providers/"+id+"/verification",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({...checks,notes})});
    const body = await r.json();
    if (!r.ok) { setError(body.error || "Tallennus epäonnistui."); setSaving(false); return; }
    setMessage(body.verified ? "Kaikki kuusi tarkistusta ovat kunnossa. Kumppani on Verified." : "Tarkistukset tallennettu.");
    setSaving(false);
  }

  if (loading) return <main className="min-h-screen bg-slate-50 p-8"><div className="mx-auto max-w-3xl h-40 animate-pulse rounded-3xl bg-slate-200"/></main>;

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-3xl">
    <Link href="/admin/providers" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"><ArrowLeft className="h-4 w-4"/>Takaisin kumppaneihin</Link>
    <div className="mt-6 rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-600">Provider verification</p><h1 className="mt-1 text-3xl font-bold text-midnight">{name}</h1><p className="mt-2 text-sm leading-6 text-slate-500">Tämä on Finland Experience Platformin oma toimituksellinen tarkistus, ei viranomaissertifikaatti.</p></div><ShieldCheck className="h-8 w-8 text-emerald-600"/></div>
      <div className="mt-8 space-y-3">{fields.map(([key,label])=><label key={key} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"><input type="checkbox" checked={Boolean(checks[key])} onChange={e=>setChecks(current=>({...current,[key]:e.target.checked}))} className="h-5 w-5 rounded border-slate-300"/><span className="flex-1 font-semibold text-slate-800">{label}</span>{checks[key]&&<CheckCircle2 className="h-5 w-5 text-emerald-600"/>}</label>)}</div>
      <label className="mt-6 block"><span className="mb-2 block text-sm font-semibold text-slate-700">Sisäiset muistiinpanot</span><textarea value={notes} onChange={e=>setNotes(e.target.value)} maxLength={5000} rows={5} className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-emerald-500" placeholder="Mitä tarkistettiin ja milloin?"/></label>
      {error&&<p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message&&<p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
      <button onClick={save} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-midnight px-5 py-3 font-semibold text-white shadow-lg disabled:opacity-60"><Save className="h-4 w-4"/>{saving?"Tallennetaan...":"Tallenna tarkistukset"}</button>
    </div>
    <ProviderChangeRequests providerId={id}/>
  </div></main>;
}
