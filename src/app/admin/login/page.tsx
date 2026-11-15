"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Compass, Github, LockKeyhole, Mail, ShieldAlert } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const ADMIN_ROLES = new Set([
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_MANAGER",
  "BOOKING_MANAGER",
  "EDITOR",
]);

function safeRedirect(value: string | null) {
  if (!value || value.startsWith("//") || !(value === "/admin" || value.startsWith("/admin/"))) return "/admin";
  return value;
}

function AdminLoginContent() {
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
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setError("Kirjautuminen onnistui, mutta käyttäjätietoja ei voitu vahvistaa.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .maybeSingle();

      if (profileError) {
        setError("Käyttäjäroolia ei voitu tarkistaa. Yritä uudelleen.");
        return;
      }

      if (!profile?.role || !ADMIN_ROLES.has(profile.role)) {
        await supabase.auth.signOut();
        setError("Tällä käyttäjätilillä ei ole oikeutta hallintaan.");
        return;
      }

      router.replace(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Supabase-kirjautumista ei voitu käynnistää.");
    } finally {
      setLoading(false);
    }
  }

  async function loginWithProvider(provider: "google" | "github") {
    setLoading(true);
    setError("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
          ...(provider === "github" ? { scopes: "read:user user:email" } : {}),
        },
      });

      if (signInError) throw signInError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ulkopuolista kirjautumista ei voitu käynnistää.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-midnight text-white">
          <Compass className="h-7 w-7 text-emerald-300" />
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">Finland Experience</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-midnight">Content Manager</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Kirjaudu hallitsemaan majoituksia, elämyksiä, mediaa, SEO:ta ja yhteydenottoja.
          </p>
        </div>

        {searchParams.get("reason") === "supabase-not-configured" && (
          <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Supabase-ympäristömuuttujat puuttuvat palvelimelta. Lisää ne ennen tuotantokäyttöä.</span>
          </div>
        )}

        {searchParams.get("reason") === "oauth-not-authorized" && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Tämä Google- tai GitHub-tili ei ole sallittu ylläpitotili.
          </p>
        )}
        {searchParams.get("reason") === "oauth-admin-setup" && (
          <p role="alert" className="mt-6 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            Ylläpitäjätilin viimeistely epäonnistui. Tarkista palvelimen Supabase-asetukset.
          </p>
        )}
        {searchParams.get("reason") === "oauth-failed" && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Kirjautuminen epäonnistui. Yritä uudelleen.
          </p>
        )}

        <form onSubmit={login} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Sähköposti</span>
            <span className="flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-emerald-500">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent px-3 py-3 outline-none"
                placeholder="admin@esimerkki.fi"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Salasana</span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-emerald-500"
              placeholder="••••••••"
            />
          </label>

          {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-midnight px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
          >
            <LockKeyhole className="h-4 w-4" />
            {loading ? "Kirjaudutaan..." : "Kirjaudu hallintaan"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          tai kirjaudu palvelulla
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => loginWithProvider("google")}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <span aria-hidden="true" className="text-lg font-bold text-blue-600">G</span>
            Google
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => loginWithProvider("github")}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
          >
            <Github className="h-4 w-4" />
            GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-sm"><Link href="/admin/forgot-password" className="font-semibold text-emerald-700 hover:underline">Unohtuiko salasana?</Link></p>

        <p className="mt-5 text-center text-xs text-slate-400">
          Käyttäjät ja roolit hallitaan Supabase Auth + profiles -mallilla.
        </p>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-[75vh] items-center justify-center bg-slate-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" /></main>}>
      <AdminLoginContent />
    </Suspense>
  );
}

