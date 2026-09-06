'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ImagePlus, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ManagedDestination } from '../page';

const STORAGE_KEY = 'finland-experience-managed-destinations';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function NewDestinationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nameEs: '',
    nameFi: '',
    slug: '',
    region: '',
    descriptionEs: '',
    descriptionFi: '',
    imageUrl: '',
  });

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);

    const destination: ManagedDestination = {
      id: Date.now() * -1,
      slug: form.slug || slugify(form.nameEs),
      nameEs: form.nameEs.trim(),
      nameFi: form.nameFi.trim(),
      region: form.region.trim(),
      descriptionEs: form.descriptionEs.trim(),
      descriptionFi: form.descriptionFi.trim(),
      imageUrl: form.imageUrl.trim() || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85',
      createdAt: new Date().toISOString(),
    };

    try {
      const existing: ManagedDestination[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([destination, ...existing]));
      router.push('/admin/destinos');
    } catch {
      setSaving(false);
    }
  }

  const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10';

  return (
    <main className="min-h-[75vh] bg-slate-50 py-10">
      <div className="container-site max-w-4xl">
        <Link href="/admin/destinos" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-midnight">
          <ArrowLeft className="h-4 w-4" /> Takaisin hallintaan
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
          <div className="bg-midnight px-6 py-8 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Uusi matkakohde</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Lisää kohde katalogiin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Täytä sisältö molemmilla kielillä. Espanja on asiakassivuston oletuskieli.</p>
          </div>

          <form onSubmit={submit} className="space-y-8 p-6 sm:p-10">
            <section>
              <h2 className="text-lg font-bold text-midnight">Perustiedot</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">Nimi espanjaksi<input required value={form.nameEs} onChange={(e) => update('nameEs', e.target.value)} className={inputClass} placeholder="Rovaniemi" /></label>
                <label className="text-sm font-semibold text-slate-700">Nimi suomeksi<input required value={form.nameFi} onChange={(e) => update('nameFi', e.target.value)} className={inputClass} placeholder="Rovaniemi" /></label>
                <label className="text-sm font-semibold text-slate-700">Slug<input value={form.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} placeholder="rovaniemi" /></label>
                <label className="text-sm font-semibold text-slate-700">Alue<input required value={form.region} onChange={(e) => update('region', e.target.value)} className={inputClass} placeholder="Laponia" /></label>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-midnight">Kuvaus</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">Lyhyt kuvaus · ES<textarea required rows={5} value={form.descriptionEs} onChange={(e) => update('descriptionEs', e.target.value)} className={inputClass} placeholder="Descubre..." /></label>
                <label className="text-sm font-semibold text-slate-700">Lyhyt kuvaus · FI<textarea required rows={5} value={form.descriptionFi} onChange={(e) => update('descriptionFi', e.target.value)} className={inputClass} placeholder="Tutustu..." /></label>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-midnight">Hero-kuva</h2>
              <label className="mt-4 block text-sm font-semibold text-slate-700">
                Kuvan URL
                <div className="relative">
                  <ImagePlus className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input required value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} className={`${inputClass} pl-12`} placeholder="https://..." />
                </div>
              </label>
              <p className="mt-2 text-xs text-slate-400">MVP-vaiheessa käytetään kuvan URL-osoitetta. Media Library liitetään seuraavassa vaiheessa.</p>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <Link href="/admin/destinos" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50">Peruuta</Link>
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-600 disabled:opacity-60">
                <Save className="h-4 w-4" />
                {saving ? 'Tallennetaan...' : 'Tallenna kohde'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
