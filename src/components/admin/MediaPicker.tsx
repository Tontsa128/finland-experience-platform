"use client";

import { useEffect, useState } from "react";

type Media = { id: string; filename: string; url: string; alt_fi?: string | null; alt_es?: string | null; alt_en?: string | null };

export default function MediaPicker({ value, onChange }: { value: string[]; onChange: (ids: string[]) => void }) {
  const [items, setItems] = useState<Media[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/media", { cache: "no-store" })
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.error || "Kuvia ei voitu ladata");
        setItems(body.media || []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Kuvia ei voitu ladata"));
  }, []);

  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-950">Kuvat</h3>
          <p className="mt-1 text-xs text-slate-500">Valitse kuvapankista kuvat tässä järjestyksessä.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{value.length} valittu</span>
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : items.length === 0 ? <p className="mt-4 text-sm text-slate-500">Kuvapankissa ei ole vielä kuvia.</p> : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item) => {
            const selected = value.includes(item.id);
            return (
              <button type="button" key={item.id} onClick={() => toggle(item.id)} className={"overflow-hidden rounded-xl border-2 bg-white text-left " + (selected ? "border-emerald-600 ring-2 ring-emerald-100" : "border-transparent")}>
                <img src={item.url} alt={item.alt_fi || item.alt_es || item.alt_en || item.filename} className="aspect-[4/3] w-full object-cover" />
                <div className="truncate px-2 py-2 text-xs font-medium">{item.filename}</div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
