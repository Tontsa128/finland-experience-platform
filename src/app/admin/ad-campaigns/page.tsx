"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Locale = "fi" | "es" | "en";
type Copy = Record<Locale, string>;
type Slide = { imageUrl: string; href: string; title: Copy; text: Copy; ctaLabel: Copy; alt: Copy };
type MediaItem = { id: string; filename: string; url: string };
type Campaign = {
  id: string; campaign_name: string; advertiser_name: string; provider_url: string;
  billing_model: "monthly" | "campaign"; price_eur: number; placement: "homepage" | "map" | "directory" | "category";
  region: string; status: "draft" | "pending" | "approved" | "paused" | "archived";
  starts_at: string | null; ends_at: string | null; slide_interval_ms: number; slides: Slide[];\n  metrics?: { impressions: number | null; clicks: number | null };
};
type Form = Omit<Campaign, "id" | "starts_at" | "ends_at"> & { starts_at: string; ends_at: string };
const emptyCopy = (): Copy => ({ fi: "", es: "", en: "" });
const emptySlide = (): Slide => ({ imageUrl: "", href: "", title: emptyCopy(), text: emptyCopy(), ctaLabel: emptyCopy(), alt: emptyCopy() });
function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

const blank = (): Form => ({
  campaign_name: "", advertiser_name: "", provider_url: "", billing_model: "monthly", price_eur: 0,
  placement: "homepage", region: "southwest_finland", status: "draft", starts_at: "", ends_at: "",
  slide_interval_ms: 6000, slides: [emptySlide(), emptySlide(), emptySlide()],
});

const localeNames: Record<Locale, string> = { fi: "Suomi", es: "Español", en: "English" };
const statusNames: Record<Campaign["status"], string> = { draft: "Luonnos", pending: "Odottaa hyväksyntää", approved: "Hyväksytty", paused: "Keskeytetty", archived: "Arkistoitu" };\nfunction metricsText(campaign: Campaign) {\n  const impressions = campaign.metrics?.impressions;\n  const clicks = campaign.metrics?.clicks;\n  if (impressions == null || clicks == null) return "Raportointi aktivoituu tietokantapäivityksen jälkeen";\n  const rate = impressions > 0 ? (clicks / impressions) * 100 : 0;\n  return `${impressions.toLocaleString("fi-FI")} näyttöä · ${clicks.toLocaleString("fi-FI")} klikkausta · ${rate.toFixed(1)} % klikkausaste`;\n}

export default function AdCampaignsAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [form, setForm] = useState<Form>(blank());
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const response = await fetch("/api/admin/ad-campaigns", { cache: "no-store" });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Kampanjoita ei voitu ladata");
    setCampaigns(body.campaigns || []);
  }
  useEffect(() => { load().catch((e) => setError(e.message)); }, []);
  useEffect(() => {
    fetch("/api/admin/media", { cache: "no-store" }).then(async (response) => {
      const body = await response.json();
      if (response.ok) setMediaItems(body.media || []);
    }).catch(() => undefined);
  }, []);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function updateSlide(index: number, patch: Partial<Slide>) {
    setForm((current) => ({ ...current, slides: current.slides.map((slide, i) => i === index ? { ...slide, ...patch } : slide) }));
  }
  function updateSlideCopy(index: number, key: "title" | "text" | "ctaLabel" | "alt", locale: Locale, value: string) {
    const slide = form.slides[index];
    updateSlide(index, { [key]: { ...slide[key], [locale]: value } });
  }

  function edit(campaign: Campaign) {
    setEditing(campaign.id);
    setForm({
      campaign_name: campaign.campaign_name, advertiser_name: campaign.advertiser_name, provider_url: campaign.provider_url,
      billing_model: campaign.billing_model, price_eur: campaign.price_eur, placement: campaign.placement,
      region: campaign.region, status: campaign.status,
      starts_at: campaign.starts_at ? new Date(campaign.starts_at).toISOString().slice(0, 16) : "",
      ends_at: campaign.ends_at ? new Date(campaign.ends_at).toISOString().slice(0, 16) : "",
      slide_interval_ms: campaign.slide_interval_ms, slides: campaign.slides,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    setSaving(true); setError("");
    try {
      const payload = {
        ...form,
        starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : null,
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      };
      const response = await fetch("/api/admin/ad-campaigns", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...payload, id: editing } : payload),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Tallennus epäonnistui");
      setEditing(null); setForm(blank()); await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tallennus epäonnistui");
    } finally { setSaving(false); }
  }

  async function archive(id: string) {
    if (!confirm("Arkistoidaanko mainoskampanja?")) return;
    const response = await fetch("/api/admin/ad-campaigns?id=" + encodeURIComponent(id), { method: "DELETE" });
    const body = await response.json();
    if (!response.ok) { setError(body.error || "Arkistointi epäonnistui"); return; }
    await load();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">CMS / Mainoskampanjat</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Maksettu näkyvyys</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Luo 3–5 dian kumppaniesityksiä, valitse näkyvyyspaikka ja aikataulu. Mainokset julkaistaan vasta hyväksynnän jälkeen.</p></div>
          <Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-slate-950">{editing ? "Muokkaa kampanjaa" : "Uusi mainoskampanja"}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium text-slate-700">Kampanjan nimi<input value={form.campaign_name} onChange={(e) => update("campaign_name", e.target.value)} maxLength={120} className="rounded-xl border p-3" /></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Palveluntarjoaja / mainostaja<input value={form.advertiser_name} onChange={(e) => update("advertiser_name", e.target.value)} maxLength={120} className="rounded-xl border p-3" /></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700 sm:col-span-2">Palveluntarjoajan HTTPS-verkkosivu<input value={form.provider_url} onChange={(e) => update("provider_url", e.target.value)} placeholder="https://example.fi" className="rounded-xl border p-3" /></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Myyntimalli<select value={form.billing_model} onChange={(e) => update("billing_model", e.target.value as Form["billing_model"])} className="rounded-xl border p-3"><option value="monthly">Kuukausinäkyvyys</option><option value="campaign">Määräaikainen kampanja</option></select></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Sovittu hinta (€)<input type="number" min="0" step="0.01" value={form.price_eur} onChange={(e) => update("price_eur", Number(e.target.value))} className="rounded-xl border p-3" /></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Sijoittelu<select value={form.placement} onChange={(e) => update("placement", e.target.value as Form["placement"])} className="rounded-xl border p-3"><option value="homepage">Etusivu</option><option value="map">Karttasivu</option><option value="directory">Kohdehakemisto</option><option value="category">Kategoriat</option></select></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Alue<select value={form.region} onChange={(e) => update("region", e.target.value)} className="rounded-xl border p-3"><option value="southwest_finland">Lounais-Suomi (Salo, Perniö, Mathildedal, Teijo)</option></select></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Julkaisutila<select value={form.status} onChange={(e) => update("status", e.target.value as Form["status"])} className="rounded-xl border p-3">{Object.entries(statusNames).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Dian kesto<select value={form.slide_interval_ms} onChange={(e) => update("slide_interval_ms", Number(e.target.value))} className="rounded-xl border p-3"><option value={5000}>5 sekuntia</option><option value={6000}>6 sekuntia</option><option value={7000}>7 sekuntia</option></select></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Alkaa<input type="datetime-local" value={form.starts_at} onChange={(e) => update("starts_at", e.target.value)} className="rounded-xl border p-3" /></label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">Päättyy<input type="datetime-local" value={form.ends_at} onChange={(e) => update("ends_at", e.target.value)} className="rounded-xl border p-3" /></label>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3"><h3 className="text-lg font-bold text-slate-950">Mainosdiat ({form.slides.length}/5)</h3><button type="button" disabled={form.slides.length >= 5} onClick={() => update("slides", [...form.slides, emptySlide()])} className="rounded-full border px-4 py-2 text-sm font-semibold disabled:opacity-40">+ Lisää dia</button></div>
          <p className="mt-1 text-xs text-slate-500">Vähintään 3 ja enintään 5 diaa. Suositeltu kuvakoko 1920 × 1080 (16:9). Valitse kuvat nykyisestä CMS-kuvapankista ja liitä kuvan julkinen URL.</p>
          <div className="mt-4 grid gap-4">
            {form.slides.map((slide, index) => (
              <details key={index} open className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">Dia {index + 1}</summary>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1 text-xs font-semibold text-slate-600 sm:col-span-2">Valitse kuva nykyisestä CMS-kuvapankista<select value={slide.imageUrl} onChange={(e) => updateSlide(index, { imageUrl: e.target.value })} className="rounded-lg border bg-white p-3 text-sm font-normal"><option value="">Valitse kuvapankin kuva…</option>{mediaItems.map((item) => <option key={item.id} value={item.url}>{item.filename}</option>)}</select></label>
                  <label className="grid gap-1 text-xs font-semibold text-slate-600 sm:col-span-2">Tai anna kuvan URL<input value={slide.imageUrl} onChange={(e) => updateSlide(index, { imageUrl: e.target.value })} placeholder="https://... tai /..." className="rounded-lg border bg-white p-3 text-sm font-normal" /></label>
                  <label className="grid gap-1 text-xs font-semibold text-slate-600 sm:col-span-2">Kohdelinkki<input value={slide.href} onChange={(e) => updateSlide(index, { href: e.target.value })} placeholder="https://palveluntarjoaja.fi" className="rounded-lg border bg-white p-3 text-sm font-normal" /></label>
                  {(["fi", "es", "en"] as Locale[]).map((locale) => (
                    <fieldset key={locale} className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3">
                      <legend className="px-1 text-xs font-bold text-emerald-800">{localeNames[locale]}</legend>
                      <label className="grid gap-1 text-xs text-slate-600">Otsikko<input value={slide.title[locale]} onChange={(e) => updateSlideCopy(index, "title", locale, e.target.value)} className="rounded-lg border p-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs text-slate-600">Kuvausteksti<textarea value={slide.text[locale]} onChange={(e) => updateSlideCopy(index, "text", locale, e.target.value)} rows={2} className="rounded-lg border p-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs text-slate-600">Painikkeen teksti<input value={slide.ctaLabel[locale]} onChange={(e) => updateSlideCopy(index, "ctaLabel", locale, e.target.value)} className="rounded-lg border p-2 text-sm" /></label>
                      <label className="grid gap-1 text-xs text-slate-600">Kuvan vaihtoehtoinen teksti<input value={slide.alt[locale]} onChange={(e) => updateSlideCopy(index, "alt", locale, e.target.value)} className="rounded-lg border p-2 text-sm" /></label>
                    </fieldset>
                  ))}
                  {form.slides.length > 3 && <button type="button" onClick={() => update("slides", form.slides.filter((_, i) => i !== index))} className="justify-self-start text-xs font-semibold text-red-600">Poista dia</button>}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3"><button type="button" disabled={saving} onClick={save} className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{saving ? "Tallennetaan…" : editing ? "Tallenna muutokset" : "Tallenna kampanja"}</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(blank()); }} className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold">Peruuta</button>}</div>
          {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
          <p className="mt-4 text-xs leading-5 text-slate-500">Hyväksytyt kampanjat näytetään vasta voimassaoloaikana. CONTENT_MANAGER voi tehdä luonnoksia ja lähettää hyväksyttäväksi; julkaisuun tarvitaan ADMIN- tai SUPER_ADMIN-rooli. Laskutus ja maksujen vastaanotto hoidetaan tässä vaiheessa manuaalisesti.</p>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-slate-950">Tallennetut kampanjat</h2>
          <div className="grid gap-3">{campaigns.map((campaign) => (
            <article key={campaign.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-slate-950">{campaign.campaign_name}</h3><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{statusNames[campaign.status]}</span></div><p className="mt-1 text-sm text-slate-500">{campaign.advertiser_name} · {campaign.billing_model === "monthly" ? "Kuukausinäkyvyys" : "Kampanja"} · {campaign.price_eur.toFixed(2)} € · {campaign.slides.length} diaa</p><p className="mt-2 text-xs font-medium text-slate-500">{metricsText(campaign)}</p></div>
              <div className="flex gap-3"><button type="button" onClick={() => edit(campaign)} className="text-sm font-semibold text-emerald-700">Muokkaa</button><button type="button" onClick={() => archive(campaign.id)} className="text-sm font-semibold text-red-600">Arkistoi</button></div>
            </article>
          ))}{campaigns.length === 0 && <p className="rounded-xl border border-dashed p-6 text-sm text-slate-500">Kampanjoita ei ole vielä luotu.</p>}</div>
        </section>
      </div>
    </main>
  );
}
