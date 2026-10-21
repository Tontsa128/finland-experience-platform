"use client";

import { useEffect, useState } from "react";
import { Users, CalendarDays } from "lucide-react";

type VisitorStats = { monthlyVisitors: number; totalVisitors: number };

const copy = {
  fi: { month: "Kävijää tässä kuussa", total: "Kävijää yhteensä" },
  en: { month: "Visitors this month", total: "Visitors overall" },
  es: { month: "Visitantes este mes", total: "Visitantes en total" },
} as const;

export function VisitorCounter({ locale }: { locale: "fi" | "en" | "es" }) {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await fetch("/api/visitor-stats", { method: "POST", cache: "no-store" });
        const response = await fetch("/api/visitor-stats", { cache: "no-store" });
        if (!response.ok) return;
        const result = (await response.json()) as VisitorStats;
        if (active && Number.isFinite(result.monthlyVisitors) && Number.isFinite(result.totalVisitors)) {
          setStats(result);
        }
      } catch {
        // Keep the counter hidden when real statistics are unavailable; never show demo values.
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  if (!stats) return null;
  const labels = copy[locale];
  const numberLocale = locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-IE";
  const format = (value: number) => new Intl.NumberFormat(numberLocale).format(value);

  return (
    <section aria-label={locale === "fi" ? "Sivuston kävijätilastot" : locale === "es" ? "Estadísticas de visitantes" : "Website visitor statistics"} className="border-b border-slate-100 bg-white/90">
      <div className="container-narrow flex flex-wrap items-center justify-end gap-x-5 gap-y-2 py-2 text-[11px] text-slate-600 sm:gap-x-6 sm:text-xs">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-brand-600" />
          <span>{labels.month}:</span>
          <strong className="font-semibold tabular-nums text-brand-900">{format(stats.monthlyVisitors)}</strong>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users aria-hidden="true" className="h-3.5 w-3.5 text-brand-600" />
          <span>{labels.total}:</span>
          <strong className="font-semibold tabular-nums text-brand-900">{format(stats.totalVisitors)}</strong>
        </span>
      </div>
    </section>
  );
}
