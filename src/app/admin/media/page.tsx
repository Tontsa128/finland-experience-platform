"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type Media = { id: string; filename: string; url: string; alt_text: string | null; alt_fi: string | null; alt_es: string | null; alt_en: string | null; type: string; created_at: string };

export default function MediaAdminPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [alts, setAlts] = useState({ fi: "", es: "", en: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    const response = await fetch("/api/admin/media", { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Mediaa ei voitu ladata");
    setItems(payload.media || []);
  }

  useEffect(() => { load().catch((e) => setError(e instanceof Error ? e.message : "Lataus epäonnistui")); }, []);

  async function upload(event: FormEvent) {
    event.preventDefault();
    if (!file) return setError("Valitse ensin kuva.");
    setBusy(true); setError(""); setNotice("");
    try {
      const body = new FormData();
      body.set("file", file); body.set("alt_fi", alts.fi); body.set("alt_es", alts.es); body.set("alt_en", alts.en);
      const response = await fetch("/api/admin/media/upload", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Upload epäonnistui");
      setItems((current) => [payload.media, ...current]);
      setFile(null); setAlts({ fi: "", es: "", en: "" });
      const input = document.getElementById("media-file") as HTMLInputElement | null;
      if (input) input.value = "";
      setNotice("Kuva ladattu onnistuneesti.");
    } catch (e) { setError(e instanceof Error ? e.message : "Upload epäonnistui"); }
    finally { setBusy(false); }
  }

  function chooseFile(event: ChangeEvent<HTMLInputElement>) { setFile(event.target.files?.[0] || null); }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-semibold text-emerald-700">CMS / Media</p><h1 className="mt-1 text-3xl font-bold text-slate-950">Kuvapankki</h1><p className="mt-2 text-slate-500">Lataa kuvat keskitettyyn Supabase Storage -kuvapankkiin ja anna hakukoneille kielikohtainen vaihtoehtoinen teksti.</p></div>
          <Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link>
        </div>

        <form onSubmit={upload} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Lataa uusi kuva</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <label className="text-sm font-semibold text-slate-700">Kuva<input id="media-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={chooseFile} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm" /></label>
            <label className="text-sm font-semibold text-slate-700">Alt · FI<input value={alts.fi} onChange={(e)=>setAlts({...alts,fi:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Lapin revontulet" /></label>
            <label className="text-sm font-semibold text-slate-700">Alt · ES<input value={alts.es} onChange={(e)=>setAlts({...alts,es:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Auroras boreales en Laponia" /></label>
            <label className="text-sm font-semibold text-slate-700">Alt · EN<input value={alts.en} onChange={(e)=>setAlts({...alts,en:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Northern lights in Lapland" /></label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3"><button disabled={busy} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Ladataan…" : "Lataa kuva"}</button><span className="text-xs text-slate-400">JPG, PNG, WebP, GIF tai AVIF · enintään 10 Mt</span></div>
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {notice && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p>}
        </form>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m) => <article key={m.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="aspect-[4/3] bg-slate-100">{m.url && <img src={m.url} alt={m.alt_fi || m.alt_text || m.filename} className="h-full w-full object-cover" />}</div>
            <div className="p-4"><p className="truncate text-sm font-semibold text-slate-950">{m.filename}</p><p className="mt-1 text-xs text-slate-500">FI: {m.alt_fi || "—"}</p><p className="text-xs text-slate-500">ES: {m.alt_es || "—"}</p><p className="text-xs text-slate-500">EN: {m.alt_en || "—"}</p></div>
          </article>)}
        </div>
      </div>
    </main>
  );
}
