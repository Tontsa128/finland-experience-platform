"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users } from "lucide-react";

type VisitorStats = {
  totalVisitors: number;
  monthlyVisitors: number;
};

const labels = {
  fi: { total: "Kävijöitä yhteensä", month: "Tämän kuun kävijät" },
  es: { total: "Visitantes en total", month: "Visitantes este mes" },
  en: { total: "Total visitors", month: "Visitors this month" },
} as const;

const numberFormat = new Intl.NumberFormat("fi-FI");

export function VisitorCounter({ locale }: { locale: "fi" | "es" | "en" }) {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch("/api/analytics/visitors", {
          headers: { accept: "application/json" },
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as VisitorStats;
        if (
          active &&
          Number.isFinite(data.totalVisitors) &&
          Number.isFinite(data.monthlyVisitors)
        ) {
          setStats(data);
        }
      } catch {
        // The public site should remain usable if analytics are temporarily unavailable.
      }
    };

    void loadStats();
    return () => {
      active = false;
    };
  }, []);

  // Do not show fabricated values while the analytics API is unavailable.
  if (!stats) return null;

  const text = labels[locale];

  return (
    <aside
      aria-label={locale === "fi" ? "Sivuston kävijätilastot" : locale === "es" ? "Estadísticas de visitantes" : "Website visitor statistics"}
      className="relative z-40 w-full border-b border-slate-100 bg-slate-50/95 text-slate-600"
    >
      <div className="container-narrow flex min-h-8 flex-wrap items-center justify-center gap-x-5 gap-y-1 px-3 py-1.5 text-[11px] sm:justify-end sm:text-xs">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Users aria-hidden="true" className="h-3.5 w-3.5 text-brand-700" />
          <span>{text.total}</span>
          <strong className="font-semibold tabular-nums text-brand-950">{numberFormat.format(stats.totalVisitors)}</strong>
        </span>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-brand-700" />
          <span>{text.month}</span>
          <strong className="font-semibold tabular-nums text-brand-950">{numberFormat.format(stats.monthlyVisitors)}</strong>
        </span>
      </div>
    </aside>
  );
}
