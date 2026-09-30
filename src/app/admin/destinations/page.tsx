"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import MediaPicker from "@/components/admin/MediaPicker";
import AITranslationPanel, { translateFinnishText } from "@/components/admin/AITranslationPanel";

type Translation = { name: string; shortDescription: string; fullDescription: string; highlights: string; travelInformation: string };
type Item = any;

const languages = ["fi", "es", "en"] as const;
const emptyTranslations: Record<(typeof languages)[number], Translation> = {
  fi: { name: "", shortDescription: "", fullDescription: "", highlights: "", travelInformation: "" },
  es: { name: "", shortDescription: "", fullDescription: "", highlights: "", travelInformation: "" },
  en: { name: "", shortDescription: "", fullDescription: "", highlights: "", travelInformation: "" },
};
const emptyForm = {
  slug: "",
  region: "",
  heroImageUrl: "",
  latitude: "",
  longitude: "",
  publishAt: "",
  status: "draft",
  seo: { fi: { title: "", description: "" }, es: { title: "", description: "" }, en: { title: "", description: "" } },
  translations: emptyTranslations,
  mediaIds: [] as string[],
};

function toLocalDateTime(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

export default function DestinationsAdminPage() {
  const [data, setData] = useState<Item[]>([]);
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const response = await fetch("/api/admin/destinations", { cache: "no-store" });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Kohteita ei voitu ladata.");
    setData(body.destinations || []);
  }

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : "Lataus epäonnistui.")).finally(() => setLoading(false));
  }, []);

  function start(item?: Item) {
    if (!item) {
      setForm({ ...emptyForm, translations: JSON.parse(JSON.stringify(emptyTranslations)) });
      return;
    }
    const translations = Object.fromEntries(
      languages.map((language) => {
        const source = item.destination_translations?.find((row: any) => row.language_code === language) || {};
        return [language, {
          name: source.name || "",
          shortDescription: source.short_description || "",
          fullDescription: source.full_description || "",
          highlights: source.highlights || "",
          travelInformation: source.travel_information || "",
        }];
      }),
    );
    setForm({
      id: item.id,
      slug: item.slug || "",
      region: item.region || "",
      heroImageUrl: item.hero_image_url || "",
      latitude: item.latitude ?? "",
      longitude: item.longitude ?? "",
      publishAt: toLocalDateTime(item.publish_at),
      status: item.status || "draft",
      seo: {
        fi: { title: item.seo_title_fi || "", description: item.seo_description_fi || "" },
        es: { title: item.seo_title_es || "", description: item.seo_description_es || "" },
        en: { title: item.seo_title_en || "", description: item.seo_description_en || "" },
      },
      translations,
      mediaIds: (item.destination_media || []).sort((a: any, b: any) => Number(a.sort_order || 0) - Number(b.sort_order || 0)).map((row: any) => row.media?.id).filter(Boolean),
    });
  }

  function setTranslation(language: string, field: keyof Translation, value: string) {
    setForm((current: any) => ({
      ...current,
      translations: { ...current.translations, [language]: { ...current.translations[language], [field]: value } },
    }));
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      const next = {
        ...form,
        translations: JSON.parse(JSON.stringify(form.translations)),
        seo: JSON.parse(JSON.stringify(form.seo)),
      };
      const fi = next.translations.fi;
      if (!fi.name.trim()) throw new Error("Suomenkielinen nimi on pakollinen.");
      if (!next.translations.en.name.trim() || !next.translations.es.name.trim()) {
        const translated = await translateFinnishText(fi.name, "travel");
        if (!next.translations.en.name.trim()) next.translations.en.name = translated.english;
        if (!next.translations.es.name.trim()) next.translations.es.name = translated.spanish;
      }
      if (fi.shortDescription.trim() && (!next.translations.en.shortDescription.trim() || !next.translations.es.shortDescription.trim())) {
        const translated = await translateFinnishText(fi.shortDescription, "travel");
        if (!next.translations.en.shortDescription.trim()) next.translations.en.shortDescription = translated.english;
        if (!next.translations.es.shortDescription.trim()) next.translations.es.shortDescription = translated.spanish;
      }
      if (fi.fullDescription.trim() && (!next.translations.en.fullDescription.trim() || !next.translations.es.fullDescription.trim())) {
        const translated = await translateFinnishText(fi.fullDescription, "travel");
        if (!next.translations.en.fullDescription.trim()) next.translations.en.fullDescription = translated.english;
        if (!next.translations.es.fullDescription.trim()) next.translations.es.fullDescription = translated.spanish;
      }

      const payload = {
        ...next,
        latitude: next.latitude === "" ? null : Number(next.latitude),
        longitude: next.longitude === "" ? null : Number(next.longitude),
        publishAt: next.publishAt ? new Date(next.publishAt).toISOString() : null,
      };
      const response = await fetch("/api/admin/destinations", {
        method: next.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Tallennus epäonnistui.");
      setForm(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tallennus epäonnistui.");
    } finally {
      setSaving(false);
    }
  }

  const input = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">CMS / Kohteet</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Matkakohteet</h1>
            <p className="mt-2 max-w-2xl text-slate-500">Lisää ja muokkaa kohteita, kieliversioita, karttasijaintia, kuvia, SEO-tekstejä ja julkaisuaikataulua.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/cms" className="rounded-xl px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">CMS</Link>
            <button onClick={() => start()} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">+ Uusi kohde</button>
          </div>
        </header>

        {error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? <div className="p-8 text-slate-500">Ladataan…</div> : data.length === 0 ? (
            <div className="p-8 text-slate-500">Ei vielä kohteita. Luo ensimmäinen kohde.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.map((item) => {
                const title = item.destination_translations?.find((row: any) => row.language_code === "fi")?.name || item.destination_translations?.[0]?.name || item.slug;
                return (
                  <button key={item.id} onClick={() => start(item)} className="flex w-full flex-col gap-2 p-5 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-semibold text-slate-950">{title}</h2>
                      <p className="mt-1 text-sm text-slate-500">{item.region || "Suomi"} · /destinations/{item.slug}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{item.status || "draft"}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {form && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4">
            <form onSubmit={save} className="mx-auto my-6 max-w-6xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">{form.id ? "Muokkaa kohdetta" : "Uusi kohde"}</h2>
                  <p className="mt-1 text-sm text-slate-500">Suomi on lähdekieli. Tarkista AI-käännökset ennen julkaisemista.</p>
                </div>
                <button type="button" onClick={() => setForm(null)} className="rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100">Sulje</button>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                <label className="text-sm font-semibold text-slate-700">Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={input} /></label>
                <label className="text-sm font-semibold text-slate-700">Alue<input required value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className={input} /></label>
                <label className="text-sm font-semibold text-slate-700">Leveysaste<input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} className={input} /></label>
                <label className="text-sm font-semibold text-slate-700">Pituusaste<input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} className={input} /></label>
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">Hero-kuvan URL<input value={form.heroImageUrl} onChange={(e) => setForm({ ...form, heroImageUrl: e.target.value })} className={input} placeholder="https://…" /></label>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">Julkaise alkaen<input type="datetime-local" value={form.publishAt} onChange={(e) => setForm({ ...form, publishAt: e.target.value })} className={input} /><span className="mt-1 block text-xs font-normal text-slate-500">Jätä tyhjäksi, jos julkaisu alkaa heti kun tila on julkaistu.</span></label>
                <label className="text-sm font-semibold text-slate-700">Tila<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={input}><option value="draft">Luonnos</option><option value="published">Julkaistu</option><option value="archived">Arkistoitu</option></select></label>
              </div>

              {languages.map((language) => (
                <section key={language} className="mt-7 rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-950">{language === "fi" ? "🇫🇮 Suomi" : language === "es" ? "🇪🇸 Español" : "🇬🇧 English"}</h3>
                  <label className="mt-4 block text-sm font-medium text-slate-700">Nimi<input required value={form.translations[language].name} onChange={(e) => setTranslation(language, "name", e.target.value)} className={input} /></label>
                  <label className="mt-4 block text-sm font-medium text-slate-700">Lyhyt kuvaus<textarea rows={3} value={form.translations[language].shortDescription} onChange={(e) => setTranslation(language, "shortDescription", e.target.value)} className={input} /></label>
                  <label className="mt-4 block text-sm font-medium text-slate-700">Kuvaus<textarea rows={6} value={form.translations[language].fullDescription} onChange={(e) => setTranslation(language, "fullDescription", e.target.value)} className={input} /></label>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <label className="text-sm font-medium text-slate-700">Avainsanat / nostot<input value={form.translations[language].highlights} onChange={(e) => setTranslation(language, "highlights", e.target.value)} className={input} placeholder="sauna, saaristo, luonto" /></label>
                    <label className="text-sm font-medium text-slate-700">Matkailutieto<textarea rows={2} value={form.translations[language].travelInformation} onChange={(e) => setTranslation(language, "travelInformation", e.target.value)} className={input} /></label>
                  </div>
                </section>
              ))}

              <AITranslationPanel
                valueFi={form.translations.fi.fullDescription}
                valueEn={form.translations.en.fullDescription}
                valueEs={form.translations.es.fullDescription}
                onChange={({ fi, en, es }) => setForm((current: any) => ({
                  ...current,
                  translations: {
                    ...current.translations,
                    fi: { ...current.translations.fi, fullDescription: fi },
                    en: { ...current.translations.en, fullDescription: en },
                    es: { ...current.translations.es, fullDescription: es },
                  },
                }))}
                label="Kohteen kuvauksen AI-käännös"
              />

              <div className="mt-7 grid gap-5 lg:grid-cols-3">
                {languages.map((language) => (
                  <section key={language} className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="font-semibold">{language === "fi" ? "SEO · Suomi" : language === "es" ? "SEO · Español" : "SEO · English"}</h3>
                    <input value={form.seo[language].title} onChange={(e) => setForm({ ...form, seo: { ...form.seo, [language]: { ...form.seo[language], title: e.target.value } } })} className={input} placeholder="SEO-otsikko" />
                    <textarea rows={3} value={form.seo[language].description} onChange={(e) => setForm({ ...form, seo: { ...form.seo, [language]: { ...form.seo[language], description: e.target.value } } })} className={input} placeholder="Meta description" />
                  </section>
                ))}
              </div>

              <MediaPicker value={form.mediaIds || []} onChange={(ids) => setForm((current: any) => ({ ...current, mediaIds: ids }))} />

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setForm(null)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Peruuta</button>
                <button disabled={saving} className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Tallennetaan…" : "Tallenna kohde"}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
