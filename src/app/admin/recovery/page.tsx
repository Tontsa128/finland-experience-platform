"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminRecoveryPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (password.length < 10) return setError("Käytä vähintään 10 merkin salasanaa.");
    if (password !== confirm) return setError("Salasanat eivät täsmää.");
    setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      router.replace("/admin/login?password-updated=1");
      router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Salasanaa ei voitu vaihtaa. Avaa uusi palautuslinkki."); }
    finally { setBusy(false); }
  }

  return <main className="grid min-h-[75vh] place-items-center bg-slate-50 px-4 py-12"><section className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl"><h1 className="text-2xl font-bold">Aseta uusi salasana</h1><p className="mt-3 text-sm text-slate-600">Käytä vähintään 10 merkin salasanaa.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-semibold">Uusi salasana<input required type="password" minLength={10} autoComplete="new-password" value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3"/></label><label className="block text-sm font-semibold">Vahvista salasana<input required type="password" minLength={10} autoComplete="new-password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3"/></label><button disabled={busy} className="w-full rounded-xl bg-slate-950 px-4 py-3 font-semibold text-white disabled:opacity-50">{busy?"Tallennetaan…":"Vaihda salasana"}</button></form>{error&&<p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Link href="/admin/login" className="mt-5 block text-center text-sm font-semibold text-emerald-700">Takaisin kirjautumiseen</Link></section></main>;
}
