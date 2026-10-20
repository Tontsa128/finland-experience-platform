"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

type CounterResponse = { count: number | null; configured?: boolean };

export function VisitorCounter({ locale }: { locale: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCounter() {
      try {
        const response = await fetch("/api/visitor-count", { cache: "no-store" });
        const data = (await response.json()) as CounterResponse;
        if (!response.ok || !data.configured || typeof data.count !== "number") {
          if (!cancelled) setAvailable(false);
          return;
        }

        let nextCount = data.count;
        try {
          const sessionKey = "finnexprience-visit-counted";
          if (!window.sessionStorage.getItem(sessionKey)) {
            const visitResponse = await fetch("/api/visitor-count", { method: "POST", cache: "no-store" });
            const visitData = (await visitResponse.json()) as CounterResponse;
            if (visitResponse.ok && typeof visitData.count === "number") {
              nextCount = visitData.count;
              window.sessionStorage.setItem(sessionKey, "1");
            }
          }
        } catch {
          // Storage can be disabled; still show the shared total.
        }

        if (!cancelled) setCount(nextCount);
      } catch {
        if (!cancelled) setAvailable(false);
      }
    }

    void loadCounter();
    return () => { cancelled = true; };
  }, []);

  if (!available || count === null) return null;

  const label = locale === "fi"
    ? "Kävijöitä"
    : locale === "es"
      ? "Visitas"
      : "Visits";

  return (
    <div className="border-b border-brand-100 bg-brand-50 text-brand-900" aria-live="polite">
      <div className="container-narrow flex min-h-9 items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium sm:text-sm">
        <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{label}:</span>
        <span className="tabular-nums font-bold">{new Intl.NumberFormat(locale).format(count)}</span>
        <Eye className="ml-1 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
      </div>
    </div>
  );
}
