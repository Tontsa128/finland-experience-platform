"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";

type Settings = Record<string, unknown>;

const initial: Settings = {
  hero_image_url: "",
  hero_eyebrow_fi: "Finland Experience",
  hero_eyebrow_es: "Finland Experience",
  hero_eyebrow_en: "Finland Experience",
  hero_title_fi: "Löydä Suomen parhaat elämykset",
  hero_title_es: "Descubre las mejores experiencias de Finlandia",
  hero_title_en: "Discover the best experiences in Finland",
  hero_description_fi: "Ainutlaatuiset majoitukset, luonnonläheiset kohteet ja aidot suomalaiset elämykset.",
  hero_description_es: "Alojamientos únicos, destinos en la naturaleza y auténticas experiencias finlandesas.",
  hero_description_en: "Unique stays, nature destinations and authentic Finnish experiences.",
  hero_cta_label_fi: "Tutustu majoituksiin",
  hero_cta_label_es: "Ver alojamientos",
  hero_cta_label_en: "Explore stays",
  hero_cta_url: "/accommodations",
  hero_secondary_label_fi: "Tutustu kohteisiin",
  hero_secondary_label_es: "Explorar destinos",
  hero_secondary_label_en: "Explore destinations",
  hero_secondary_url: "/destinations",
  homepage_featured_destination_ids: [],
  homepage_featured_property_ids: [],
  homepage_featured_experience_ids: [],
};

const languages = [
  ["fi", "Suomi"],
  ["es", "Español"],
  ["en", "English"],
] as const;

export default function HomepageCmsPage() {
  const [settings, setSettings] = useState<Settings>(initial);
  const [mediaIds, setMediaIds] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [catalog, setCatalog] = useState<{ destinations: any[]; properties: any[]; experiences: any[] }>({ destinations: [], properties: [], experiences: [] });

  useEffect(() => {
    fetch("/api/admin/settings", { cache: "no-store" })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.error || "Asetuksia ei voitu ladata");
        setSettings((current) => ({ ...current, ...(body.settings || {}) }));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Lataus epäonnistui"));
  }, []);

  useEffect(() => {
    Promise.all([fetch("/api/admin/destinations"), fetch("/api/admin/properties"), fetch("/api/admin/experiences")])
      .then(async ([d,p,e]) => setCatalog({ destinations: (await d.json()).destinations || [], properties: (await p.json()).properties || [], experiences: (await e.json()).experiences || [] }))
      .catch(() => undefined);
  }, []);

  const set = (key: string, value: unknown) => setSettings((current) => ({ ...current, [key]: value }));

  async function save() {
    setSaved(false);
    setError("");
    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const body = await response.json();
    if (!response.ok) {
      setError(body.error || "Tallennus epäonnistui");
      return;
    }
    setSettings((current) => ({ ...current, ...(body.settings || {}) }));
    setSaved(true);
  }

  const field = (key: string, label: string, placeholder = "") => (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        value={String(settings[key] ?? "")}
        placeholder={placeholder}
        onChange={(e) => set(key, e.target.value)}
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
      />
    </label>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">CMS / Etusivu</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Etusivun sisältö</h1>
            <p className="mt-2 max-w-3xl text-slate-500">Muokkaa hero-osion kuvaa, otsikkoa, kuvausta ja painikkeita ilman koodimuutoksia.</p>
          </div>
          <Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Hero-kuva</h2>
          <p className="mt-1 text-sm text-slate-500">Valitse kuvapankista yksi kuva. Jos et valitse kuvaa, sivusto käyttää oletuskuvaa.</p>
          <div className="mt-5">
            <MediaPicker value={mediaIds} onChange={(ids: string[]) => {
              setMediaIds(ids.slice(-1));
              if (ids.length) {
                fetch("/api/admin/media", { cache: "no-store" }).then((r) => r.json()).then((body) => {
                  const selected = (body.media || []).find((item: { id: string; url: string }) => ids.includes(item.id));
                  if (selected) set("hero_image_url", selected.url);
                }).catch(() => undefined);
              }
            }} />
          </div>
          {field("hero_image_url", "Hero-kuvan URL", "https://...")}
        </section>

        {languages.map(([code, name]) => (
          <section key={code} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">{name}</h2>
            <div className="mt-5 grid gap-5">
              {field(`hero_eyebrow_${code}`, "Pieni otsikko")}
              {field(`hero_title_${code}`, "Pääotsikko")}
              {field(`hero_description_${code}`, "Kuvaus")}
              <div className="grid gap-5 md:grid-cols-2">
                {field(`hero_cta_label_${code}`, "Ensimmäinen painike")}
                {field(`hero_secondary_label_${code}`, "Toinen painike")}
              </div>
            </div>
          </section>
        ))}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Painikkeiden kohteet</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {field("hero_cta_url", "Ensimmäisen painikkeen URL", "/accommodations")}
            {field("hero_secondary_url", "Toisen painikkeen URL", "/destinations")}
          </div>
        </section>

        <div className="sticky bottom-4 mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <button onClick={save} className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white">Tallenna etusivu</button>
          <Link href="/" target="_blank" className="text-sm font-semibold text-emerald-700">Esikatsele sivustoa ↗</Link>
          {saved && <span className="text-sm text-emerald-700">Tallennettu.</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>
    </main>
  );
}
