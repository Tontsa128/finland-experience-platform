"use client";

import { useEffect, useState } from "react";
import { Download, Eye, Users } from "lucide-react";

type MetricsResponse = {
  count: number | null;
  totalVisitors?: number;
  totalDownloads?: number;
  totalSiteVisits?: number;
  monthVisitors?: number;
  monthKey?: string;
  configured?: boolean;
};

export function VisitorCounter({ locale }: { locale: string }) {
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadMetrics() {
      try {
        const response = await fetch("/api/visitor-count", { cache: "no-store" });
        const data = (await response.json()) as MetricsResponse;
        if (!response.ok || !data.configured || typeof data.totalVisitors !== "number") {
          if (!cancelled) setAvailable(false);
          return;
        }

        let nextMetrics = data;
        try {
          const sessionKey = "finnexprience-visit-counted";
          if (!window.sessionStorage.getItem(sessionKey)) {
            window.sessionStorage.setItem(sessionKey, "pending");
            try {
              const visitResponse = await fetch("/api/visitor-count", {
                method: "POST",
                cache: "no-store",
              });
              const visitData = (await visitResponse.json()) as MetricsResponse;
              if (visitResponse.ok && typeof visitData.totalVisitors === "number") {
                nextMetrics = visitData;
                window.sessionStorage.setItem(sessionKey, "1");
              } else {
                window.sessionStorage.removeItem(sessionKey);
              }
            } catch (error) {
              window.sessionStorage.removeItem(sessionKey);
              throw error;
            }
          }
        } catch {
          // If storage is unavailable, keep showing the shared metrics.
        }

        if (!cancelled) setMetrics(nextMetrics);
      } catch {
        if (!cancelled) setAvailable(false);
      }
    }

    void loadMetrics();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!available || !metrics) return null;

  const copy = locale === "fi"
    ? {
        month: "Kävijät tässä kuussa",
        total: "Vierailijat yhteensä",
        downloads: "Lataukset yhteensä",
        visits: "Kokonaiskäynnit",
      }
    : locale === "es"
      ? {
          month: "Visitantes este mes",
          total: "Visitantes en total",
          downloads: "Descargas en total",
          visits: "Visitas totales",
        }
      : {
          month: "Visitors this month",
          total: "Total visitors",
          downloads: "Total downloads",
          visits: "Total site visits",
        };

  const numberFormat = new Intl.NumberFormat(locale);
  const stats = [
    { label: copy.month, value: metrics.monthVisitors ?? 0, icon: Users },
    { label: copy.total, value: metrics.totalVisitors ?? 17558, icon: Eye },
    { label: copy.downloads, value: metrics.totalDownloads ?? 53547, icon: Download },
    { label: copy.visits, value: metrics.totalSiteVisits ?? 50000, icon: Eye, plus: true },
  ];

  return (
    <section
      className="border-b border-brand-100 bg-brand-50 text-brand-950"
      aria-label={locale === "fi" ? "Sivuston kävijätilastot" : locale === "es" ? "Estadísticas del sitio" : "Website visitor statistics"}
    >
      <div className="container-narrow grid grid-cols-2 divide-x divide-y divide-brand-100 px-2 sm:grid-cols-4 sm:divide-y-0 sm:px-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex min-w-0 flex-col items-center justify-center gap-1 px-1 py-2 text-center sm:flex-row sm:gap-2 sm:px-3 sm:py-3">
            <Icon className="h-4 w-4 shrink-0 text-brand-700 sm:h-5 sm:w-5" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-base font-extrabold leading-tight tabular-nums sm:text-xl">
                {numberFormat.format(value)}{"plus" in stats.find((item) => item.label === label)! && stats.find((item) => item.label === label)?.plus ? "+" : ""}
              </div>
              <div className="text-[10px] font-medium leading-tight text-brand-800 sm:text-xs">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
