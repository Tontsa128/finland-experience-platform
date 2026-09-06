'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Compass, LockKeyhole } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/destinos';
  const [loading, setLoading] = useState(false);

  function login() {
    setLoading(true);
    document.cookie = 'demo_session=session-super; Path=/; SameSite=Lax';
    router.push(redirect);
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
            Hallitse matkakohteita ja pidä espanjankielinen matkailusivusto ajan tasalla.
          </p>
        </div>

        <button
          type="button"
          onClick={login}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-midnight px-5 py-3.5 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
        >
          <LockKeyhole className="h-4 w-4" />
          {loading ? 'Avataan hallinta...' : 'Avaa hallinta'}
        </button>

        <p className="mt-5 text-center text-xs text-slate-400">Demo-MVP · oikea käyttäjähallinta liitetään myöhemmin.</p>
      </section>
    </main>
  );
}
