"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) {
        setError("Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.");
        return;
      }
      router.replace(`/${locale}/account`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kirjautuminen epäonnistui.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">Finland Experience</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Kirjaudu sisään</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Kirjaudu asiakkaan omalle sivulle nähdäksesi tietosi ja hallitaksesi tiliäsi.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Sähköposti
            <span className="mt-2 flex items-center rounded-xl border border-slate-200 px-3">
              <Mail className="h-4 w-4 text-slate-400" />
              <input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-3 outline-none" placeholder="sinä@example.com" />
            </span>
          </label>
          <label className="block text-sm font-semibold text-slate-700">Salasana
            <span className="mt-2 flex items-center rounded-xl border border-slate-200 px-3">
              <LockKeyhole className="h-4 w-4 text-slate-400" />
              <input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-3 py-3 outline-none" />
            </span>
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-brand-900 px-5 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? "Kirjaudutaan…" : "Kirjaudu"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">Eikö sinulla ole tiliä? <Link className="font-semibold text-emerald-700" href={`/${locale}/account/register`}>Rekisteröidy</Link></p>
      </section>
    </main>
  );
}
