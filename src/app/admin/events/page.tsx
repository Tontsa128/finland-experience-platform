"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type EventRow = {
  id: string;
  title_fi: string;
  description_fi: string | null;
  title_en: string | null;
  description_en: string | null;
  title_es: string | null;
  description_es: string | null;
  starts_at: string;
  ends_at: string | null;
  external_url: string;
  image_url: string | null;
  image_license: string | null;
  image_rights_verified: boolean;
  status: string;
  category: string | null;
  event_locations?: { city?: string; village?: string; venue?: string; address?: string } | null;
  event_sources?: { name?: string } | null;
};

type Source = { id: string; name: string; feed_url: string; region: string; enabled: boolean; auto_publish: boolean; image_policy: string; last_checked_at: string | null; next_check_at: string; terms_url: string | null };

const statusLabel: Record<string, string> = { pending: "Tarkistettava", draft: "Luonnos", published: "Julkaistu", cancelled: "Peruttu", archived: "Arkistoitu" };

function localInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [runs, setRuns] = useState<any[]>([]);
  const [selected, setSelected] = useState<EventRow | null>(null);
  const [sourceForm, setSourceForm] = useState({ name: "", feed_url: "", terms_url: "", source_site_url: "", region: "Salo", fetch_interval_minutes: 360, enabled: false, auto_publish: false, image_policy: "omit", image_license: "" });
  const [filter, setFilter] = useState("pending");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    const [eventResponse, sourceResponse] = await Promise.all([
      fetch("/api/admin/events", { cache: "no-store" }),
      fetch("/api/admin/events/sources", { cache: "no-store" }),
    ]);
    const [eventBody, sourceBody] = await Promise.all([eventResponse.json(), sourceResponse.json()]);
    if (!eventResponse.ok) throw new Error(eventBody.error || "Tapahtumia ei voitu ladata.");
    if (!sourceResponse.ok) throw new Error(sourceBody.error || "Lähteitä ei voitu ladata.");
    setEvents(eventBody.events || []);
    setSources(sourceBody.sources || []);
    setRuns(sourceBody.runs || []);
  }, []);

  useEffect(() => { load().catch((e) => setError(e instanceof Error ? e.message : "Lataus epäonnistui.")); }, [load]);

  const visibleEvents = events.filter((event) => filter === "all" || event.status === filter);

  async function addSource(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events/sources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sourceForm) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Lähdettä ei voitu tallentaa.");
      setSourceForm({ name: "", feed_url: "", terms_url: "", source_site_url: "", region: "Salo", fetch_interval_minutes: 360, enabled: false, auto_publish: false, image_policy: "omit", image_license: "" });
      setNotice("Lähde tallennettu. Tarkista syöte manuaalisella haulla ennen automaattista julkaisua.");
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Tallennus epäonnistui."); }
    finally { setBusy(false); }
  }

  async function updateSource(source: Source, patch: Record<string, unknown>) {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/events/sources", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: source.id, ...patch }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Lähteen päivitys epäonnistui.");
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Päivitys epäonnistui."); }
    finally { setBusy(false); }
  }

  async function sync(sourceIds?: string[]) {
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sourceIds }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Synkronointi epäonnistui.");
      const failed = (body.results || []).filter((r: any) => r.status === "failed").length;
      setNotice(`Haku valmis: ${body.checked} lähdettä, ${(body.results || []).reduce((sum: number, r: any) => sum + r.created, 0)} uutta, ${(body.results || []).reduce((sum: number, r: any) => sum + r.updated, 0)} muutosta${failed ? `, ${failed} virhettä` : ""}.`);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Synkronointi epäonnistui."); }
    finally { setBusy(false); }
  }

  async function saveEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selected) return;
    const form = new FormData(event.currentTarget);
    const body: Record<string, FormDataEntryValue | null> = Object.fromEntries(form.entries());
    body.starts_at = new Date(String(body.starts_at)).toISOString();
    body.ends_at = body.ends_at ? new Date(String(body.ends_at)).toISOString() : null;
    body.image_rights_verified = form.get("image_rights_verified") === "on" ? "true" : "false";
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id, ...body }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Tapahtumaa ei voitu tallentaa.");
      setSelected(null); setNotice("Tapahtuman tiedot tallennettu."); await load();
    } catch (e) { setError(e instanceof Error ? e.message : "Tallennus epäonnistui."); }
    finally { setBusy(false); }
  }

  const field = "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm";

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-7xl">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">CMS / Tapahtumakone</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Tapahtumat ja lähteet</h1><p className="mt-2 max-w-3xl text-slate-600">Automaattinen haku kerää ehdotuksia. Uudet tapahtumat jäävät tarkistettaviksi, ellei lähdettä erikseen merkitä luotetuksi automaattijulkaisijaksi.</p></div><div className="flex gap-3"><Link href="/admin/cms" className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold">CMS</Link><button type="button" disabled={busy} onClick={() => void sync()} className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Haetaan…" : "Hae nyt"}</button></div></header>

    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}

    <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <form onSubmit={addSource} className="rounded-2xl border bg-white p-5 shadow-sm"><h2 className="text-lg font-bold">Lisää RSS / Atom -lähde</h2><p className="mt-1 text-xs leading-5 text-slate-500">Salon tapahtumasivun RSS-osoitetta ei ole vielä varmennettu. Lisää lähde vasta, kun syöte ja sen käyttöehdot on tarkistettu.</p>
        <div className="mt-4 grid gap-3"><label className="text-sm font-medium">Lähteen nimi<input required value={sourceForm.name} onChange={(e)=>setSourceForm({...sourceForm,name:e.target.value})} className={field}/></label><label className="text-sm font-medium">Syötteen HTTPS-osoite<input required type="url" value={sourceForm.feed_url} onChange={(e)=>setSourceForm({...sourceForm,feed_url:e.target.value})} placeholder="https://…/feed/" className={field}/></label><label className="text-sm font-medium">Lähteen verkkosivu<input type="url" value={sourceForm.source_site_url} onChange={(e)=>setSourceForm({...sourceForm,source_site_url:e.target.value})} className={field}/></label><label className="text-sm font-medium">Käyttöehdot / kuvalupa<input type="url" value={sourceForm.terms_url} onChange={(e)=>setSourceForm({...sourceForm,terms_url:e.target.value})} className={field}/></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Alue<input value={sourceForm.region} onChange={(e)=>setSourceForm({...sourceForm,region:e.target.value})} className={field}/></label><label className="text-sm font-medium">Hakuväli (min)<input type="number" min="60" max="10080" step="60" value={sourceForm.fetch_interval_minutes} onChange={(e)=>setSourceForm({...sourceForm,fetch_interval_minutes:Number(e.target.value)})} className={field}/></label></div><label className="text-sm font-medium">Kuvien käyttö<select value={sourceForm.image_policy} onChange={(e)=>setSourceForm({...sourceForm,image_policy:e.target.value})} className={field}><option value="omit">Älä tuo kuvia (turvallinen oletus)</option><option value="review">Näytä kuvat tarkistettaviksi</option><option value="licensed">Käytä syötteen kuvia dokumentoidulla lisenssillä</option></select></label>{sourceForm.image_policy === "licensed" && <label className="text-sm font-medium">Lisenssi / kirjallinen lupa<input required value={sourceForm.image_license} onChange={(e)=>setSourceForm({...sourceForm,image_license:e.target.value})} className={field}/></label>}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sourceForm.enabled} onChange={(e)=>setSourceForm({...sourceForm,enabled:e.target.checked})}/>Ota lähde käyttöön</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sourceForm.auto_publish} onChange={(e)=>setSourceForm({...sourceForm,auto_publish:e.target.checked})}/>Julkaise uudet tapahtumat automaattisesti tämän lähteen tiedoilla</label><button disabled={busy} className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">Tallenna lähde</button>
        </div>
      </form>

      <section className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Tapahtumalähteet</h2><p className="text-xs text-slate-500">{sources.length} lähdettä · ajastettu haku 6 tunnin välein</p></div></div><div className="mt-4 space-y-3">{sources.map(source=><article key={source.id} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0"><h3 className="font-semibold">{source.name}</h3><p className="mt-1 truncate text-xs text-slate-500">{source.feed_url}</p><p className="mt-1 text-xs text-slate-500">{source.region} · kuvat: {source.image_policy} · seuraava tarkistus {new Date(source.next_check_at).toLocaleString("fi-FI")}</p></div><button disabled={busy} onClick={()=>void sync([source.id])} className="rounded-lg border px-3 py-2 text-xs font-semibold">Hae nyt</button></div><div className="mt-3 flex flex-wrap gap-4 text-xs"><label className="flex items-center gap-2"><input type="checkbox" checked={source.enabled} onChange={(e)=>void updateSource(source,{enabled:e.target.checked})}/>Aktiivinen</label><label className="flex items-center gap-2"><input type="checkbox" checked={source.auto_publish} onChange={(e)=>void updateSource(source,{auto_publish:e.target.checked})}/>Automaattijulkaisu</label><span>Viimeksi haettu: {source.last_checked_at ? new Date(source.last_checked_at).toLocaleString("fi-FI") : "Ei vielä"}</span></div></article>)}{sources.length===0&&<p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">Lähteitä ei vielä ole. Käytä vain virallisia syötteitä, joiden käyttöehdot tunnetaan.</p>}</div>
        {runs.length>0&&<details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">Synkronointihistoria ({runs.length})</summary><div className="mt-3 max-h-56 space-y-2 overflow-auto">{runs.slice(0,20).map(run=><p key={run.id} className="rounded-lg bg-slate-50 p-2 text-xs">{new Date(run.started_at).toLocaleString("fi-FI")} · {run.status} · löytyi {run.found_count}, lisättiin {run.created_count}, päivitettiin {run.updated_count}, ohitettiin {run.skipped_count}{run.error_message&&<span className="block text-red-700">{run.error_message}</span>}</p>)}</div></details>}
      </section>
    </section>

    <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Tarkistusjono</h2><p className="text-xs text-slate-500">Vain julkaistut ja tulevat tapahtumat näkyvät yleisölle.</p></div><select value={filter} onChange={(e)=>setFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm"><option value="pending">Tarkistettavat</option><option value="draft">Luonnokset</option><option value="published">Julkaistut</option><option value="cancelled">Perutut</option><option value="all">Kaikki</option></select></div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)]"><div className="max-h-[70vh] space-y-2 overflow-auto">{visibleEvents.map(event=><button type="button" key={event.id} onClick={()=>setSelected(event)} className={`w-full rounded-xl border p-4 text-left hover:border-emerald-400 ${selected?.id===event.id?"border-emerald-500 bg-emerald-50":"border-slate-200"}`}><div className="flex items-start justify-between gap-2"><span className="font-semibold">{event.title_fi}</span><span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs">{statusLabel[event.status]||event.status}</span></div><p className="mt-2 text-xs text-slate-500">{new Date(event.starts_at).toLocaleString("fi-FI")} · {event.event_locations?.village||event.event_locations?.venue||event.event_locations?.city||"Sijaintia ei annettu"}</p><p className="mt-1 truncate text-xs text-slate-400">{event.event_sources?.name||"Manuaalinen"} · {event.external_url}</p></button>)}{!visibleEvents.length&&<p className="rounded-xl bg-slate-50 p-6 text-sm text-slate-500">Ei tapahtumia tässä näkymässä.</p>}</div>
        {selected ? <form key={selected.id} onSubmit={saveEvent} className="rounded-xl border border-slate-200 p-4"><div className="flex justify-between gap-2"><h3 className="font-bold">Tarkista / muokkaa</h3><button type="button" onClick={()=>setSelected(null)} className="text-sm text-slate-500">Sulje</button></div><div className="mt-3 grid gap-3"><label className="text-xs font-semibold">Nimi · FI<input name="title_fi" defaultValue={selected.title_fi} required className={field}/></label><label className="text-xs font-semibold">Kuvaus · FI<textarea name="description_fi" defaultValue={selected.description_fi||""} rows={3} className={field}/></label><label className="text-xs font-semibold">Title · EN<input name="title_en" defaultValue={selected.title_en||""} className={field}/></label><label className="text-xs font-semibold">Description · EN<textarea name="description_en" defaultValue={selected.description_en||""} rows={2} className={field}/></label><label className="text-xs font-semibold">Título · ES<input name="title_es" defaultValue={selected.title_es||""} className={field}/></label><label className="text-xs font-semibold">Descripción · ES<textarea name="description_es" defaultValue={selected.description_es||""} rows={2} className={field}/></label><div className="grid grid-cols-2 gap-3"><label className="text-xs font-semibold">Alkaa<input name="starts_at" type="datetime-local" defaultValue={localInput(selected.starts_at)} required className={field}/></label><label className="text-xs font-semibold">Päättyy<input name="ends_at" type="datetime-local" defaultValue={localInput(selected.ends_at)} className={field}/></label></div><label className="text-xs font-semibold">Kategoria<input name="category" defaultValue={selected.category||""} className={field}/></label><label className="text-xs font-semibold">Järjestäjän linkki<input name="external_url" defaultValue={selected.external_url} readOnly className={field}/></label><label className="text-xs font-semibold">Kuvan HTTPS-osoite<input name="image_url" type="url" defaultValue={selected.image_url||""} className={field}/></label><label className="text-xs font-semibold">Kuvan lupa / lisenssi<input name="image_license" defaultValue={selected.image_license||""} className={field}/></label><label className="flex items-center gap-2 text-xs"><input name="image_rights_verified" type="checkbox" defaultChecked={selected.image_rights_verified}/>Kuvan käyttöoikeus tarkistettu</label><label className="text-xs font-semibold">Julkaisutila<select name="status" defaultValue={selected.status} className={field}><option value="pending">Tarkistettava</option><option value="draft">Luonnos</option><option value="published">Julkaise</option><option value="cancelled">Peruttu</option><option value="archived">Arkistoi</option></select></label><button disabled={busy} className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">Tallenna tapahtuma</button></div></form> : <div className="grid min-h-64 place-items-center rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Valitse tapahtuma jonosta sen tietojen tarkistamista ja julkaisemista varten.</div>}</div>
    </section>
  </div></main>;
}
