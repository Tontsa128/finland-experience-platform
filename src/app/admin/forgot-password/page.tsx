"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function ForgotAdminPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/confirm?next=${encodeURIComponent("/admin/recovery")}`,
      });
      if (resetError) throw resetError;
      setMessage("Jos osoite kuuluu tilille, lähetimme siihen salasanan palautuslinkin.");
    } catch (e) { setError(e instanceof Error ? e.message : "Palautusviestiä ei voitu lähettää."); }
    finally { setBusy(false); }
  }

  return <main className="grid min-h-[75vh] place-items-center bg-slate-50 px-4 py-12"><section className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Sisällönhallinta</p><h1 className="mt-2 text-2xl font-bold">Palauta salasana</h1><p className="mt-3 text-sm leading-6 text-slate-600">Lähetämme palautuslinkin ylläpitotilin sähköpostiin.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-semibold">Sähköposti<input required type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3"/></label><button disabled={busy} className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white disabled:opacity-50">{busy?"Lähetetään…":"Lähetä palautuslinkki"}</button></form>{error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{message&&<p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}<Link href="/admin/login" className="mt-5 block text-center text-sm font-semibold text-emerald-700">← Takaisin kirjautumiseen</Link></section></main>;
}
