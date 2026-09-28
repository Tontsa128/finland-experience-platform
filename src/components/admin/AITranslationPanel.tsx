"use client";

import { useState } from "react";

export async function translateFinnishText(text: string, context: "travel" | "seo" | "button" | "general" = "travel") {
  const response = await fetch("/api/admin/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, context }),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Käännös epäonnistui.");
  return { english: String(body.english || ""), spanish: String(body.spanish || "") };
}

type Props = {
  valueFi: string;
  valueEn: string;
  valueEs: string;
  onChange: (values: { fi: string; en: string; es: string }) => void;
  context?: "travel" | "seo" | "button" | "general";
  label?: string;
};

export default function AITranslationPanel({ valueFi, valueEn, valueEs, onChange, context = "travel", label = "Teksti ja käännökset" }: Props) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function translate() {
    if (!valueFi.trim()) return setMessage("Kirjoita ensin suomenkielinen teksti.");
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: valueFi, context })
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Käännös epäonnistui.");
      onChange({ fi: valueFi, en: body.english, es: body.spanish });
      setMessage("Käännökset luotu. Tarkista ne ennen tallennusta.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Käännös epäonnistui.");
    } finally { setBusy(false); }
  }

  return <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><h3 className="font-semibold text-slate-950">{label}</h3><p className="mt-1 text-xs text-slate-500">Suomi on lähdeteksti. AI tekee englannin ja espanjan luonnokset, jotka voit tarkistaa ja muokata.</p></div>
      <button type="button" onClick={translate} disabled={busy} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Käännetään…" : "✨ Käännä FI → EN + ES"}</button>
    </div>
    <div className="mt-5 grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-slate-700">🇫🇮 Suomi<textarea value={valueFi} onChange={e => onChange({ fi: e.target.value, en: valueEn, es: valueEs })} rows={4} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" /></label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">🇬🇧 English<textarea value={valueEn} onChange={e => onChange({ fi: valueFi, en: e.target.value, es: valueEs })} rows={4} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" /></label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">🇪🇸 Español<textarea value={valueEs} onChange={e => onChange({ fi: valueFi, en: valueEn, es: e.target.value })} rows={4} className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500" /></label>
    </div>
    {message && <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-slate-600">{message}</p>}
  </section>;
}
