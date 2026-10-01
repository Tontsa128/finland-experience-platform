"use client";

import { useCallback, useEffect, useState } from "react";

type RecommendedItem = { type: string; slug: string; reason?: string };

type Lead = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  locale: string | null;
  lead_type: string;
  lead_status: string;
  source: string | null;
  source_path: string | null;
  provider_id: string | null;
  trip_days: number | null;
  trip_budget_eur: number | null;
  trip_interests: string[] | null;
  trip_question: string | null;
  recommended_items: RecommendedItem[] | null;
  message: string | null;
  providers: { name: string; slug: string } | null;
};

const statuses = ["new", "contacted", "qualified", "referred", "booked", "lost"];
const labels: Record<string, string> = {
  new: "Uusi",
  contacted: "Kontaktoitu",
  qualified: "Kvalifioitu",
  referred: "Ohjattu kumppanille",
  booked: "Varattu",
  lost: "Ei jatkoa",
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/leads", { cache: "no-store" });
      const b = await r.json();
      if (!r.ok) throw new Error(b.error || "Liidejä ei voitu ladata.");
      setLeads(b.leads || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lataus epäonnistui.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function changeStatus(id: string, leadStatus: string) {
    const previous = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, lead_status: leadStatus } : l)));
    const r = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, leadStatus }),
    });
    if (!r.ok) {
      setLeads(previous);
      const b = await r.json().catch(() => ({}));
      setError(b.error || "Tilan päivitys epäonnistui.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-emerald-700">CMS / Concierge CRM</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Matkasuunnittelun liidit</h1>
            <p className="mt-1 text-sm text-slate-500">
              AI-reissusuunnittelijan ja neuvojan kautta tulleet yhteydenotot.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="mt-8 rounded-2xl border bg-white p-8 text-slate-500">Ladataan liidejä…</div>
        ) : !leads.length ? (
          <div className="mt-8 rounded-2xl border bg-white p-8 text-slate-500">Ei concierge-liidejä vielä.</div>
        ) : (
          <div className="mt-8 space-y-4">
            {leads.map((l) => (
              <article key={l.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-slate-950">
                      {l.first_name} {l.last_name || ""}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {l.email}
                      {l.phone ? ` · ${l.phone}` : ""}
                      {l.locale ? ` · ${l.locale.toUpperCase()}` : ""}
                    </div>
                    {l.providers && (
                      <div className="mt-1 text-xs text-slate-400">Kumppani: {l.providers.name}</div>
                    )}
                  </div>
                  <select
                    value={l.lead_status}
                    onChange={(e) => changeStatus(l.id, e.target.value)}
                    className="rounded-lg border px-3 py-2 text-sm font-semibold"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {labels[s] || s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Matka</div>
                    <div className="font-semibold">{l.trip_days ? l.trip_days + " päivää" : "—"}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Budjetti / yö</div>
                    <div className="font-semibold">{l.trip_budget_eur ? "€" + l.trip_budget_eur : "—"}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Lähde</div>
                    <div className="font-semibold">{l.source || "—"}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Saapui</div>
                    <div className="font-semibold">{new Date(l.created_at).toLocaleDateString("fi-FI")}</div>
                  </div>
                </div>

                {l.trip_interests && l.trip_interests.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {l.trip_interests.map((x) => (
                      <span key={x} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                        {x}
                      </span>
                    ))}
                  </div>
                )}

                {l.trip_question && (
                  <div className="mt-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Asiakkaan toive</div>
                    <p className="mt-1 text-sm text-slate-700">{l.trip_question}</p>
                  </div>
                )}

                {l.message && !l.trip_question && (
                  <div className="mt-4 rounded-xl border-l-4 border-slate-300 bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Viesti</div>
                    <p className="mt-1 text-sm text-slate-700">{l.message}</p>
                  </div>
                )}

                {l.recommended_items && l.recommended_items.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      AI:n tarkistetut suositukset
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {l.recommended_items.map((item, i) => (
                        <span key={item.slug + i} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {item.type}: {item.slug}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-xs text-slate-400">
                  {new Date(l.created_at).toLocaleString("fi-FI")} · {l.source_path || "—"}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
