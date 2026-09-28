"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", confirm:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setNotice("");
    if (form.password.length < 8) { setError("Salasanan pitää olla vähintään 8 merkkiä."); setLoading(false); return; }
    if (form.password !== form.confirm) { setError("Salasanat eivät täsmää."); setLoading(false); return; }
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: { data: { full_name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim() } },
      });
      if (signUpError) { setError(signUpError.message); return; }

      if (data.session) {
        await fetch("/api/account/profile", {
          method: "PATCH", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name: form.firstName, last_name: form.lastName }),
        });
        router.replace(`/${locale}/account`);
        router.refresh();
      } else {
        setNotice("Tili luotiin. Tarkista sähköpostisi ja vahvista osoitteesi ennen kirjautumista.");
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Rekisteröinti epäonnistui."); }
    finally { setLoading(false); }
  }

  const set=(key:string,value:string)=>setForm({...form,[key]:value});

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">Finland Experience</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Luo asiakastili</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Tallenna yhteystietosi ja hallitse tulevia varauksiasi samasta paikasta.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">Etunimi<input required value={form.firstName} onChange={e=>set("firstName",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
            <label className="block text-sm font-semibold text-slate-700">Sukunimi<input required value={form.lastName} onChange={e=>set("lastName",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          </div>
          <label className="block text-sm font-semibold text-slate-700">Sähköposti<input required type="email" autoComplete="email" value={form.email} onChange={e=>set("email",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          <label className="block text-sm font-semibold text-slate-700">Salasana<input required minLength={8} type="password" autoComplete="new-password" value={form.password} onChange={e=>set("password",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          <label className="block text-sm font-semibold text-slate-700">Vahvista salasana<input required minLength={8} type="password" autoComplete="new-password" value={form.confirm} onChange={e=>set("confirm",e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {notice && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-brand-900 px-5 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? "Luodaan tiliä…" : "Rekisteröidy"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">Onko sinulla jo tili? <Link className="font-semibold text-emerald-700" href={`/${locale}/account/login`}>Kirjaudu sisään</Link></p>
      </section>
    </main>
  );
}
