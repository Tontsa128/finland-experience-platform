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
            // Mark the visit before awaiting the request so concurrent effects
            // cannot count the same browser session twice.
            window.sessionStorage.setItem(sessionKey, "pending");
            try {
              const visitResponse = await fetch("/api/visitor-count", { method: "POST", cache: "no-store" });
              const visitData = (await visitResponse.json()) as CounterResponse;
              if (visitResponse.ok && typeof visitData.count === "number") {
                nextCount = visitData.count;
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
    ? "Kävijöitä vähintään"
    : locale === "es"
      ? "Visitas: al menos"
      : "Visitors: at least";

  return (
    <div className="border-b border-brand-100 bg-brand-50 text-brand-900" aria-live="polite">
      <div className="container-narrow flex min-h-14 items-center justify-center gap-2 px-3 py-2 sm:gap-3 sm:py-3">
        <Users className="h-5 w-5 shrink-0 text-brand-700 sm:h-6 sm:w-6" aria-hidden="true" />
        <span className="text-xs font-medium sm:text-sm">{label}</span>
        <span className="text-xl font-extrabold tabular-nums tracking-tight sm:text-2xl">
          {new Intl.NumberFormat(locale).format(count)}+
        </span>
        <Eye className="ml-0.5 h-4 w-4 shrink-0 text-brand-600 sm:h-5 sm:w-5" aria-hidden="true" />
      </div>
    </div>
  );
}
