"use client";

import { useCallback, useEffect, useState } from "react";

type RecommendedItem = { type?: string; slug?: string; reason?: string };
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
  trip_interests: string[];
  trip_question: string | null;
  recommended_items: RecommendedItem[];
  providers?: { name: string; slug: string } | null;
};

const statuses = ["new", "contacted", "qualified", "referred", "booked", "lost"] as const;
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
      const response = await fetch("/api/admin/leads", { cache: "no-store" });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error || "Liidejä ei voitu ladata.");
      }

      setLeads(Array.isArray(body.leads) ? body.leads : []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Lataus epäonnistui.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(id: string, leadStatus: string) {
    setError("");

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, leadStatus }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error || "Statusta ei voitu päivittää.");
      }

      setLeads((current) =>
        current.map((lead) =>
          lead.id === id ? { ...lead, lead_status: leadStatus } : lead,
        ),
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Statusta ei voitu päivittää.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold text-emerald-700">CMS / Concierge CRM</p>

        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Matkasuunnittelun liidit</h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Trip Plannerin ja Concierge-palvelun asiakkaat yhdellä sivulla.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold shadow-sm"
          >
            Päivitä
          </button>
        </div>

        {error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}

        {loading ? (
          <div className="mt-8 rounded-2xl border bg-white p-8 text-slate-500">
            Ladataan liidejä…
          </div>
        ) : !leads.length ? (
          <div className="mt-8 rounded-2xl border bg-white p-8 text-slate-500">
            Ei concierge-liidejä vielä.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {leads.map((lead) => (
              <article key={lead.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-slate-950">
                      {lead.first_name} {lead.last_name || ""}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {lead.email}
                      {lead.phone ? " · " + lead.phone : ""} · {(lead.locale || "fi").toUpperCase()}
                    </div>
                  </div>

                  <select
                    value={lead.lead_status}
                    onChange={(event) => void changeStatus(lead.id, event.target.value)}
                    className="rounded-lg border px-3 py-2 text-sm font-semibold"
                    aria-label="Liidin tila"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {labels[status]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Matka</div>
                    <div className="font-semibold">
                      {lead.trip_days ? lead.trip_days + " päivää" : "—"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Budjetti / yö</div>
                    <div className="font-semibold">
                      {lead.trip_budget_eur ? "€" + lead.trip_budget_eur : "—"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Lähde</div>
                    <div className="font-semibold">{lead.source || lead.lead_type}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Kumppani</div>
                    <div className="font-semibold">
                      {lead.providers?.name || "Ei vielä ohjattu"}
                    </div>
                  </div>
                </div>

                {lead.trip_interests?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lead.trip_interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}

                {lead.trip_question && (
                  <div className="mt-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      Asiakkaan toive
                    </div>
                    <p className="mt-1 text-slate-700">{lead.trip_question}</p>
                  </div>
                )}

                {lead.recommended_items?.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      AI:n tarkistetut suositukset
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {lead.recommended_items.map((item, index) => (
                        <span key={item.slug || index} className="rounded-lg border px-3 py-2 text-sm">
                          {item.slug || "Suositus"}
                          {item.type ? " · " + item.type : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-xs text-slate-400">
                  {new Date(lead.created_at).toLocaleString("fi-FI")} · {lead.source_path || "—"}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
