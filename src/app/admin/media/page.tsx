"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Media = {
  id: string; filename: string; url: string; alt_text: string | null; alt_fi: string | null; alt_es: string | null; alt_en: string | null;
  title: string | null; description: string | null; source_url: string | null; license: string | null; rights_status: string;
  location_tag: string | null; category_tag: string | null; type: string; created_at: string; usage_count: number; used_in: string[];
};

const blank = { title: "", description: "", source_url: "", license: "", rights_status: "unknown", location_tag: "", category_tag: "", alt_fi: "", alt_es: "", alt_en: "" };
const rightsLabel: Record<string,string> = { unknown: "Tarkistettava", licensed: "Lisensoitu", permission_granted: "Lupa saatu", public_domain: "Public domain" };

export default function MediaAdminPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [rightsFilter, setRightsFilter] = useState("");

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/media", { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Mediaa ei voitu ladata");
    setItems(payload.media || []);
  }, []);

  useEffect(() => { load().catch((e) => setError(e instanceof Error ? e.message : "Lataus epäonnistui")); }, [load]);

  const locations = useMemo(() => Array.from(new Set(items.map((item) => item.location_tag).filter(Boolean))) as string[], [items]);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category_tag).filter(Boolean))) as string[], [items]);
  const filtered = useMemo(() => items.filter((item) => {
    const haystack = [item.filename,item.title,item.description,item.location_tag,item.category_tag,item.alt_fi,item.alt_en,item.alt_es].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase()) && (!locationFilter || item.location_tag === locationFilter) && (!categoryFilter || item.category_tag === categoryFilter) && (!rightsFilter || item.rights_status === rightsFilter);
  }), [items,search,locationFilter,categoryFilter,rightsFilter]);

  async function upload(event: FormEvent) {
    event.preventDefault();
    if (!file) return setError("Valitse ensin kuva.");
    setBusy(true); setError(""); setNotice("");
    try {
      const body = new FormData(); body.set("file", file);
      for (const [key,value] of Object.entries(metadata)) body.set(key,value);
      const response = await fetch("/api/admin/media/upload", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Upload epäonnistui");
      setFile(null); setMetadata(blank);
      const input = document.getElementById("media-file") as HTMLInputElement | null;
      if (input) input.value = "";
      setNotice("Kuva ladattu kuvapankkiin."); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Upload epäonnistui"); }
    finally { setBusy(false); }
  }

  function chooseFile(event: ChangeEvent<HTMLInputElement>) { setFile(event.target.files?.[0] || null); }

  function startEdit(item: Media) {
    setEditing(item.id);
    setEditForm({ title:item.title||"",description:item.description||"",source_url:item.source_url||"",license:item.license||"",rights_status:item.rights_status||"unknown",location_tag:item.location_tag||"",category_tag:item.category_tag||"",alt_fi:item.alt_fi||"",alt_es:item.alt_es||"",alt_en:item.alt_en||"" });
  }

  async function saveMetadata(id: string) {
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/media", { method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,...editForm,alt_text:editForm.alt_fi||editForm.alt_en||editForm.alt_es}) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error||"Tietoja ei voitu tallentaa.");
      setEditing(null); setNotice("Kuvan tiedot tallennettu."); await load();
    } catch(e) { setError(e instanceof Error?e.message:"Tallennus epäonnistui."); }
    finally { setBusy(false); }
  }

  async function remove(item: Media) {
    if (item.usage_count) return setError(`Kuva on käytössä: ${item.used_in.join(", ")}. Irrota se sisällöistä ennen poistoa.`);
    if (!confirm(`Poistetaanko käyttämätön kuva “${item.title||item.filename}” pysyvästi?`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response=await fetch(`/api/admin/media?id=${encodeURIComponent(item.id)}`,{method:"DELETE"});
      const body=await response.json(); if(!response.ok)throw new Error(body.error||"Kuvaa ei voitu poistaa.");
      setNotice("Kuva poistettu kuvapankista."); await load();
    } catch(e) { setError(e instanceof Error?e.message:"Poisto epäonnistui."); }
    finally { setBusy(false); }
  }

  const field="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";
  const localeFields = (value: typeof blank, setValue: (next: typeof blank) => void) => <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs font-semibold">Vaihtoehtoinen teksti · FI<input value={value.alt_fi} onChange={e=>setValue({...value,alt_fi:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Alt text · EN<input value={value.alt_en} onChange={e=>setValue({...value,alt_en:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Texto alternativo · ES<input value={value.alt_es} onChange={e=>setValue({...value,alt_es:e.target.value})} className={field}/></label></div>;
  const metadataFields=(value: typeof blank,setValue:(next:typeof blank)=>void)=> <><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold">Otsikko<input value={value.title} onChange={e=>setValue({...value,title:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Kuvaus<input value={value.description} onChange={e=>setValue({...value,description:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Kuvan lähde<input type="url" value={value.source_url} onChange={e=>setValue({...value,source_url:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Lisenssi / lupa<input value={value.license} onChange={e=>setValue({...value,license:e.target.value})} className={field}/></label><label className="text-xs font-semibold">Sijainti<input value={value.location_tag} onChange={e=>setValue({...value,location_tag:e.target.value})} placeholder="Mathildedal" className={field}/></label><label className="text-xs font-semibold">Kategoria / käyttötarkoitus<input value={value.category_tag} onChange={e=>setValue({...value,category_tag:e.target.value})} placeholder="Karuselli, sauna…" className={field}/></label><label className="text-xs font-semibold sm:col-span-2">Käyttöoikeus<select value={value.rights_status} onChange={e=>setValue({...value,rights_status:e.target.value})} className={field}><option value="unknown">Tarkistettava</option><option value="licensed">Lisensoitu</option><option value="permission_granted">Lupa saatu</option><option value="public_domain">Public domain</option></select></label></div>{localeFields(value,setValue)}</>;

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-emerald-700">CMS / Media</p><h1 className="mt-1 text-3xl font-bold text-slate-950">Kuvapankki</h1><p className="mt-2 max-w-3xl text-slate-600">Lataa kuvat puhelimesta tai tietokoneelta, kirjaa lähde ja käyttöoikeus ja löydä kuva sijainnin tai käyttötarkoituksen mukaan.</p></div><Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link></div>
    {error&&<p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice&&<p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}
    <form onSubmit={upload} className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><h2 className="text-lg font-semibold">Lataa uusi kuva</h2><div className="mt-4 grid gap-4"><label className="text-sm font-semibold">Kuva<input required id="media-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" capture="environment" onChange={chooseFile} className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"/><span className="mt-1 block text-xs font-normal text-slate-500">JPG, PNG, WebP, GIF tai AVIF · enintään 10 Mt · kuvaa ei muokata tai pakata automaattisesti</span></label>{metadataFields(metadata,setMetadata)}<button disabled={busy||!file} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy?"Ladataan…":"Lataa kuvapankkiin"}</button></div></form>
    <section className="mt-7 rounded-2xl border bg-white p-4 shadow-sm"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hae nimestä, alt-tekstistä tai lähteestä…" className="rounded-lg border px-3 py-2 text-sm"/><select value={locationFilter} onChange={e=>setLocationFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="">Kaikki sijainnit</option>{locations.map(x=><option key={x}>{x}</option>)}</select><select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="">Kaikki käyttötarkoitukset</option>{categories.map(x=><option key={x}>{x}</option>)}</select><select value={rightsFilter} onChange={e=>setRightsFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="">Kaikki käyttöoikeudet</option>{Object.entries(rightsLabel).map(([key,value])=><option key={key} value={key}>{value}</option>)}</select></div><p className="mt-3 text-xs text-slate-500">Näytetään {filtered.length} / {items.length} kuvaa. Käytössä olevat kuvat merkitään eikä niitä voi poistaa.</p></section>
    <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(item=><article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><a href={item.url} target="_blank" rel="noreferrer" title="Avaa alkuperäinen kuva"><div className="relative aspect-[4/3] bg-slate-100"><Image src={item.url} alt={item.alt_fi||item.alt_text||item.filename} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></div></a><div className="p-4"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="truncate text-sm font-semibold">{item.title||item.filename}</p><p className="mt-1 truncate text-xs text-slate-500">{item.filename}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${item.rights_status==="unknown"?"bg-amber-100 text-amber-900":"bg-emerald-100 text-emerald-900"}`}>{rightsLabel[item.rights_status]||rightsLabel.unknown}</span></div><p className="mt-2 text-xs text-slate-500">{item.location_tag||"Ei sijaintia"} · {item.category_tag||"Ei kategoriaa"}</p><p className="mt-2 text-xs text-slate-500">{item.usage_count?`Käytössä ${item.usage_count} kertaa · ${item.used_in.join(", ")}`:"Ei käytössä sivustolla"}</p><div className="mt-3 flex gap-2"><button type="button" onClick={()=>startEdit(item)} className="flex-1 rounded-lg border px-3 py-2 text-xs font-semibold">Muokkaa tietoja</button><button type="button" disabled={busy||item.usage_count>0} title={item.usage_count?`Irrota kuva ensin: ${item.used_in.join(", ")}`:"Poista käyttämätön kuva"} onClick={()=>void remove(item)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40">Poista</button></div>
      {editing===item.id&&<div className="mt-4 space-y-3 border-t pt-4">{metadataFields(editForm,setEditForm)}<div className="flex gap-2"><button type="button" disabled={busy} onClick={()=>void saveMetadata(item.id)} className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Tallenna</button><button type="button" onClick={()=>setEditing(null)} className="rounded-lg border px-3 py-2 text-xs">Peruuta</button></div></div>}</div></article>)}{!filtered.length&&<p className="rounded-xl bg-white p-6 text-sm text-slate-500">Hakuehdoilla ei löytynyt kuvia.</p>}</div>
  </div></main>;
}
