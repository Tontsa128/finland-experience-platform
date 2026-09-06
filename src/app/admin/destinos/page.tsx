'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Plus, Trash2 } from 'lucide-react';

export interface ManagedDestination {
  id: number;
  slug: string;
  nameEs: string;
  nameFi: string;
  region: string;
  descriptionEs: string;
  descriptionFi: string;
  imageUrl: string;
  createdAt: string;
}

const STORAGE_KEY = 'finland-experience-managed-destinations';

export default function AdminDestinationsPage() {
  const [items, setItems] = useState<ManagedDestination[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
  }, []);

  function removeDestination(id: number) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <main className="min-h-[75vh] bg-slate-50">
      <section className="bg-midnight py-12 text-white">
        <div className="container-site flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">CMS · Destinos</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Hallinta</h1>
            <p className="mt-2 max-w-xl text-white/65">Lisää ja hallitse Finland Experience -sivuston matkakohteita.</p>
          </div>
          <Link href="/admin/destinos/nuevo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-midnight shadow-lg hover:bg-emerald-300">
            <Plus className="h-5 w-5" />
            Lisää kohde
          </Link>
        </div>
      </section>

      <section className="container-site py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-midnight">Omat lisätyt kohteet</h2>
            <p className="mt-1 text-sm text-slate-500">{items.length} kohdetta tässä selaimessa</p>
          </div>
          <Link href="/destinos" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">Näytä matkailusivu →</Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-midnight">Aloita lisäämällä ensimmäinen kohde</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Täytä espanjan- ja suomenkieliset tiedot, alue ja hero-kuva. Kohde ilmestyy heti matkailusivun listaan.</p>
            <Link href="/admin/destinos/nuevo" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-midnight px-5 py-3 font-semibold text-white hover:bg-slate-800">
              <Plus className="h-4 w-4" /> Lisää matkakohde
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img src={item.imageUrl} alt={item.nameEs} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">{item.region}</p>
                  <h3 className="mt-1 text-xl font-bold text-midnight">{item.nameEs}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.nameFi}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <Link href={`/destinos/${item.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                      Esikatselu <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button type="button" onClick={() => removeDestination(item.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label={`Poista ${item.nameEs}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
