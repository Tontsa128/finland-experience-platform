"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Building2, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

function safeRedirect(value: string | null) {
  if (!value || !value.startsWith("/partner")) return "/partner";
  return value;
}

function PartnerLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = safeRedirect(searchParams.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError("Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.");
        return;
      }
      const check = await fetch("/api/partner/me", { cache: "no-store" });
      if (!check.ok) {
        await supabase.auth.signOut();
        setError("Tälle käyttäjätilille ei ole aktiivista palveluntarjoajan jäsenyyttä.");
        return;
      }
      router.replace(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kirjautumista ei voitu käynnistää.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-midnight text-white"><Building2 className="h-7 w-7 text-emerald-300" /></div>
        <div className="mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Finland Experience</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-midnight">Partner Portal</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Hallitse yrityksesi tietoja ja Finland Experience Platformin kautta saapuneita liidejä.</p>
        </div>
        <div className="mt-6 flex gap-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /><span>Portaali näyttää vain sinun palveluntarjoajallesi kuuluvat tiedot.</span></div>
        <form onSubmit={login} className="mt-6 space-y-4">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Sähköposti</span><span className="flex items-center rounded-xl border border-slate-200 px-3"><Mail className="h-4 w-4 text-slate-400" /><input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent px-3 py-3 outline-none" /></span></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Salasana</span><input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-emerald-500" /></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-midnight px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"><LockKeyhole className="h-4 w-4" />{loading ? "Kirjaudutaan..." : "Kirjaudu partneriportaaliin"}</button>
        </form>
      </section>
    </main>
  );
}

export default function PartnerLoginPage() {
  return <Suspense fallback={<main className="flex min-h-[75vh] items-center justify-center bg-slate-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" /></main>}><PartnerLoginContent /></Suspense>;
}
