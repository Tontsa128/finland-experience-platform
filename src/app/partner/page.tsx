"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Building2, ExternalLink, LogOut, Mail, ShieldCheck } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Profile = {
  provider: { name:string; region:string|null; provider_type:string; booking_url:string|null; email:string|null; verified:boolean };
  membership: { role:string };
  verification: { completed:number; total:number; verified:boolean };
};
type Lead = { id:string; first_name:string; last_name:string|null; email:string; phone:string|null; arrival_date:string|null; departure_date:string|null; guests:number|null; message:string|null; lead_type:string; lead_status:string; created_at:string };

const statuses = ["new","contacted","qualified","referred","booked","lost"] as const;
const statusLabels: Record<string,string> = { new:"Uusi", contacted:"Kontaktoitu", qualified:"Kvalifioitu", referred:"Ohjattu varaukseen", booked:"Varattu", lost:"Hävitty" };

export default function PartnerPage() {
  const [profile,setProfile] = useState<Profile|null>(null);
  const [leads,setLeads] = useState<Lead[]>([]);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    const [profileResponse, leadResponse] = await Promise.all([
      fetch("/api/partner/me",{cache:"no-store"}),
      fetch("/api/partner/leads",{cache:"no-store"})
    ]);
    if (profileResponse.status === 401) { window.location.href="/partner/login?redirect=/partner"; return; }
    const profileBody = await profileResponse.json();
    const leadBody = await leadResponse.json();
    if (!profileResponse.ok) throw new Error(profileBody.error || "Profiilia ei voitu ladata.");
    if (!leadResponse.ok) throw new Error(leadBody.error || "Liidejä ei voitu ladata.");
    setProfile(profileBody); setLeads(leadBody.leads || []); setLoading(false);
  },[]);

  useEffect(() => { load().catch(e => { setError(e instanceof Error ? e.message : "Lataus epäonnistui"); setLoading(false); }); },[load]);

  async function updateStatus(id:string, leadStatus:string) {
    const r = await fetch("/api/partner/leads",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,leadStatus})});
    if (!r.ok) { const b=await r.json(); setError(b.error || "Tilaa ei voitu päivittää."); return; }
    setLeads(items => items.map(lead => lead.id===id ? {...lead,lead_status:leadStatus} : lead));
  }

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href="/partner/login";
  }

  if (loading) return <main className="min-h-screen bg-slate-50 p-8"><div className="mx-auto max-w-6xl animate-pulse"><div className="h-10 w-64 rounded bg-slate-200"/><div className="mt-6 h-40 rounded-3xl bg-slate-200"/></div></main>;
  if (error && !profile) return <main className="min-h-screen bg-slate-50 p-8"><div className="mx-auto max-w-2xl rounded-2xl bg-red-50 p-6 text-red-700">{error}</div></main>;

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Partner Portal</p><h1 className="mt-1 text-3xl font-bold text-midnight">{profile?.provider.name}</h1><p className="mt-1 text-slate-500">{profile?.provider.region || "Finland"} · {profile?.membership.role}</p></div>
      <Link href="/partner/profile" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Yritysprofiili</Link><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LogOut className="h-4 w-4"/>Kirjaudu ulos</button>
    </header>
    {error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
    <section className="mt-8 grid gap-5 md:grid-cols-3">
      <article className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><ShieldCheck className="h-4 w-4"/> Verification</div><p className="mt-3 text-2xl font-bold">{profile?.verification.completed}/{profile?.verification.total}</p><p className="text-sm text-slate-500">{profile?.verification.verified ? "Verified" : "Tarkistus kesken"}</p></article>
      <article className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Mail className="h-4 w-4"/> Liidit</div><p className="mt-3 text-2xl font-bold">{leads.length}</p><p className="text-sm text-slate-500">Viimeiset 100 liidiä</p></article>
      <article className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Building2 className="h-4 w-4"/> Yritys</div><p className="mt-3 text-sm font-semibold">{profile?.provider.provider_type}</p><p className="mt-1 text-sm text-slate-500">{profile?.provider.email || "Yhteystietoa ei ole lisätty"}</p></article>
    </section>
    <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold text-midnight">Saapuneet liidit</h2><p className="mt-1 text-sm text-slate-500">Liidi syntyy, kun asiakas ottaa yhteyttä tämän palvelun kautta.</p></div>{profile?.provider.booking_url && <a href={profile.provider.booking_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">Varaussivu <ExternalLink className="h-4 w-4"/></a>}</div>
      <div className="mt-5 space-y-3">{leads.map(lead => <article key={lead.id} className="rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start"><div><p className="font-semibold text-slate-900">{lead.first_name} {lead.last_name || ""}</p><p className="mt-1 text-sm text-slate-600">{lead.email}{lead.phone ? " · " + lead.phone : ""}{lead.guests ? " · " + lead.guests + " hlöä" : ""}</p>{(lead.arrival_date || lead.departure_date) && <p className="mt-1 text-sm text-slate-500">{lead.arrival_date || "—"} → {lead.departure_date || "—"}</p>}{lead.message && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{lead.message}</p>}</div><label className="text-sm"><span className="mb-1 block font-semibold text-slate-600">Tila</span><select value={lead.lead_status || "new"} onChange={e=>updateStatus(lead.id,e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2">{statuses.map(status=><option key={status} value={status}>{statusLabels[status]}</option>)}</select></label></div>
        <p className="mt-3 text-xs text-slate-400">{new Date(lead.created_at).toLocaleString("fi-FI")} · {lead.lead_type}</p>
      </article>)}</div>
      {!leads.length && <div className="mt-5 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">Ei liidejä vielä.</div>}
    </section>
  </div></main>;
}
