"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const language = locale === "es" ? "es" : locale === "en" ? "en" : "fi";
  const copy = {
    fi: { title: "Luo asiakastili", intro: "Tallenna yhteystietosi ja matkatoiveesi samaan paikkaan.", firstName: "Etunimi", lastName: "Sukunimi", email: "Sähköposti", password: "Salasana", confirm: "Vahvista salasana", submit: "Rekisteröidy", loading: "Luodaan tiliä…", loginPrompt: "Onko sinulla jo tili?", login: "Kirjaudu sisään", weakPassword: "Salasanan pitää olla vähintään 8 merkkiä.", mismatch: "Salasanat eivät täsmää.", success: "Tili luotiin. Tarkista sähköpostisi ja vahvista osoitteesi ennen kirjautumista.", generic: "Rekisteröinti epäonnistui." },
    es: { title: "Crear cuenta", intro: "Guarda tus datos de contacto y tus preferencias de viaje en un solo lugar.", firstName: "Nombre", lastName: "Apellidos", email: "Correo electrónico", password: "Contraseña", confirm: "Confirmar contraseña", submit: "Registrarse", loading: "Creando cuenta…", loginPrompt: "¿Ya tienes una cuenta?", login: "Iniciar sesión", weakPassword: "La contraseña debe tener al menos 8 caracteres.", mismatch: "Las contraseñas no coinciden.", success: "La cuenta se ha creado. Revisa tu correo y confirma tu dirección antes de iniciar sesión.", generic: "No se pudo crear la cuenta." },
    en: { title: "Create an account", intro: "Save your contact details and travel preferences in one place.", firstName: "First name", lastName: "Last name", email: "Email", password: "Password", confirm: "Confirm password", submit: "Create account", loading: "Creating account…", loginPrompt: "Already have an account?", login: "Log in", weakPassword: "Password must be at least 8 characters.", mismatch: "Passwords do not match.", success: "Your account was created. Check your email and confirm your address before logging in.", generic: "We could not create the account." },
  }[language];
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", password:"", confirm:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setNotice("");
    if (form.password.length < 8) { setError(copy.weakPassword); setLoading(false); return; }
    if (form.password !== form.confirm) { setError(copy.mismatch); setLoading(false); return; }
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
        setNotice(copy.success);
      }
    } catch { setError(copy.generic); }
    finally { setLoading(false); }
  }

  const set = (key: "firstName" | "lastName" | "email" | "password" | "confirm", value: string) => setForm(current => ({ ...current, [key]: value }));

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-slate-50 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">Finland Experience</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{copy.title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{copy.intro}</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">{copy.firstName}<input required value={form.firstName} onChange={e => set("firstName", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
            <label className="block text-sm font-semibold text-slate-700">{copy.lastName}<input required value={form.lastName} onChange={e => set("lastName", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          </div>
          <label className="block text-sm font-semibold text-slate-700">{copy.email}<input required type="email" autoComplete="email" value={form.email} onChange={e => set("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          <label className="block text-sm font-semibold text-slate-700">{copy.password}<input required minLength={8} type="password" autoComplete="new-password" value={form.password} onChange={e => set("password", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          <label className="block text-sm font-semibold text-slate-700">{copy.confirm}<input required minLength={8} type="password" autoComplete="new-password" value={form.confirm} onChange={e => set("confirm", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none" /></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {notice && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-brand-900 px-5 py-3.5 font-semibold text-white disabled:opacity-60">{loading ? copy.loading : copy.submit}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">{copy.loginPrompt} <Link className="font-semibold text-emerald-700" href={`/${locale}/account/login`}>{copy.login}</Link></p>
      </section>
    </main>
  );
}
