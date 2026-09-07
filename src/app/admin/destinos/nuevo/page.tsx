'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ImagePlus, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ManagedDestination } from '../page';

const STORAGE_KEY = 'finland-experience-managed-destinations';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=85';
function slugify(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

export default function NewDestinationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nameEs: '', nameFi: '', nameEn: '', slug: '', region: '', descriptionEs: '', descriptionFi: '', descriptionEn: '', imageUrl: '' });
  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }

  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError('');
    const slug = form.slug || slugify(form.nameEn || form.nameEs || form.nameFi);
    const payload = {
      slug,
      region: form.region.trim(),
      heroImageUrl: form.imageUrl.trim() || FALLBACK_IMAGE,
      status: 'published' as const,
      translations: {
        fi: { name: form.nameFi.trim(), shortDescription: form.descriptionFi.trim(), fullDescription: form.descriptionFi.trim() },
        es: { name: form.nameEs.trim(), shortDescription: form.descriptionEs.trim(), fullDescription: form.descriptionEs.trim() },
        en: { name: form.nameEn.trim(), shortDescription: form.descriptionEn.trim(), fullDescription: form.descriptionEn.trim() },
      },
    };
    try {
      const response = await fetch('/api/admin/destinations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) { router.push('/admin/destinos'); return; }
      const result = await response.json().catch(() => ({}));
      // Keep the browser demo usable when Supabase environment variables are not configured yet.
      const fallback: ManagedDestination = { id: Date.now() * -1, slug, nameEs: form.nameEs.trim(), nameFi: form.nameFi.trim(), nameEn: form.nameEn.trim(), region: form.region.trim(), descriptionEs: form.descriptionEs.trim(), descriptionFi: form.descriptionFi.trim(), descriptionEn: form.descriptionEn.trim(), imageUrl: form.imageUrl.trim() || FALLBACK_IMAGE, createdAt: new Date().toISOString() };
      const existing: ManagedDestination[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([fallback, ...existing]));
      setError(result.error ? `${result.error} – käytetään selaimen MVP-tallennusta.` : 'Supabase ei ole vielä käytössä – käytetään selaimen MVP-tallennusta.');
      setTimeout(() => router.push('/admin/destinos'), 700);
    } catch {
      try {
        const fallback: ManagedDestination = { id: Date.now() * -1, slug, nameEs: form.nameEs.trim(), nameFi: form.nameFi.trim(), nameEn: form.nameEn.trim(), region: form.region.trim(), descriptionEs: form.descriptionEs.trim(), descriptionFi: form.descriptionFi.trim(), descriptionEn: form.descriptionEn.trim(), imageUrl: form.imageUrl.trim() || FALLBACK_IMAGE, createdAt: new Date().toISOString() };
        const existing: ManagedDestination[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        localStorage.setItem(STORAGE_KEY, JSON.stringify([fallback, ...existing]));
        router.push('/admin/destinos');
      } catch { setError('Kohteen tallennus epäonnistui.'); }
    } finally { setSaving(false); }
  }

  const input = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10';
  return <main className="min-h-[75vh] bg-slate-50 py-10"><div className="container-site max-w-5xl"><Link href="/admin/destinos" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-midnight"><ArrowLeft className="h-4 w-4" /> Takaisin hallintaan</Link><div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card"><div className="bg-midnight px-6 py-8 text-white sm:px-10"><p className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta">Content Manager · FI / ES / EN</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Lisää uusi matkakohde</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">Täytä sisältö kolmella kielellä. Tallennus käyttää tuotannossa Supabasea ja säilyttää MVP-varaston varalla, jos tietokanta ei ole vielä konfiguroitu.</p></div><form onSubmit={submit} className="space-y-9 p-6 sm:p-10"><section><h2 className="text-lg font-bold text-midnight">1. Nimi ja sijainti</h2><div className="mt-4 grid gap-5 sm:grid-cols-3"><label className="text-sm font-semibold text-slate-700">Suomi<input required value={form.nameFi} onChange={(e) => update('nameFi', e.target.value)} className={input} placeholder="Rovaniemi" /></label><label className="text-sm font-semibold text-slate-700">Español<input required value={form.nameEs} onChange={(e) => update('nameEs', e.target.value)} className={input} placeholder="Rovaniemi" /></label><label className="text-sm font-semibold text-slate-700">English<input required value={form.nameEn} onChange={(e) => update('nameEn', e.target.value)} className={input} placeholder="Rovaniemi" /></label></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">URL-slug<input value={form.slug} onChange={(e) => update('slug', e.target.value)} className={input} placeholder="rovaniemi" /></label><label className="text-sm font-semibold text-slate-700">Alue / Region<input required value={form.region} onChange={(e) => update('region', e.target.value)} className={input} placeholder="Lapland / Lappi" /></label></div></section><section><h2 className="text-lg font-bold text-midnight">2. Myyntitekstit</h2><div className="mt-4 grid gap-5 lg:grid-cols-3"><label className="text-sm font-semibold text-slate-700">Suomi<textarea required rows={7} value={form.descriptionFi} onChange={(e) => update('descriptionFi', e.target.value)} className={input} placeholder="Rovaniemi on portti Lappiin..." /></label><label className="text-sm font-semibold text-slate-700">Español<textarea required rows={7} value={form.descriptionEs} onChange={(e) => update('descriptionEs', e.target.value)} className={input} placeholder="Rovaniemi es la puerta de entrada a Laponia..." /></label><label className="text-sm font-semibold text-slate-700">English<textarea required rows={7} value={form.descriptionEn} onChange={(e) => update('descriptionEn', e.target.value)} className={input} placeholder="Rovaniemi is the gateway to Lapland..." /></label></div></section><section><h2 className="text-lg font-bold text-midnight">3. Hero-kuva</h2><label className="mt-4 block text-sm font-semibold text-slate-700">Kuvan URL<div className="relative"><ImagePlus className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} className={`${input} pl-12`} placeholder="https://..." /></div></label><p className="mt-2 text-xs text-slate-400">Suositus: suuri 16:9-kuva. Jos kenttä jätetään tyhjäksi, käytetään oletuskuvaa.</p></section>{error && <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><span>{error}</span></div>}<div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Link href="/admin/destinos" className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50">Peruuta</Link><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-brand-dark disabled:opacity-60"><Save className="h-4 w-4" />{saving ? 'Tallennetaan...' : 'Julkaise kohde'}</button></div></form></div></div></main>;
}
