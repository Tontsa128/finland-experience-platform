"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, X, Send, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "fi" | "es" | "en";
type Recommendation = { type: "destination" | "accommodation" | "experience"; slug: string; reason: string };

export function AIChat() {
  const t = useTranslations("ai");
  const locale = useLocale() as Language;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const labels = {
    fi: { search: "Etsin varmennetusta katalogista…", error: "Avustaja ei ole juuri nyt saatavilla.", verified: "Varmennettu tieto", recommendation: "Suositukset", close: "Sulje" },
    es: { search: "Buscando en el catálogo verificado…", error: "El asistente no está disponible ahora.", verified: "Información verificada", recommendation: "Recomendaciones", close: "Cerrar" },
    en: { search: "Searching the verified catalogue…", error: "The advisor is unavailable right now.", verified: "Verified information", recommendation: "Recommendations", close: "Close" },
  }[locale] || {
    search: "Searching the verified catalogue…", error: "The advisor is unavailable right now.", verified: "Verified information", recommendation: "Recommendations", close: "Close",
  };

  async function send() {
    const question = input.trim();
    if (!question || loading) return;
    setLoading(true);
    setError("");
    setAnswer("");
    setRecommendations([]);
    try {
      const response = await fetch("/api/travel-advisor", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, language: locale }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof body.error === "string" ? body.error : "Advisor unavailable.");
      setAnswer(typeof body.answer === "string" ? body.answer : "");
      setRecommendations(Array.isArray(body.recommendations) ? body.recommendations : []);
      setInput("");
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  function href(r: Recommendation) {
    const section = r.type === "accommodation" ? "accommodations" : r.type === "destination" ? "destinations" : "experiences";
    return `/${locale}/${section}/${r.slug}`;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t("title")}
        className={cn("fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-white shadow-glow transition hover:-translate-y-1", open && "hidden")}
      >
        <MessageCircle />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-950 px-4 py-3 text-white">
            <span className="flex items-center gap-2 font-bold">
              <Sparkles className="h-5 w-5 text-gold-400" />
              {t("title")}
            </span>
            <button onClick={() => setOpen(false)} aria-label={labels.close}><X /></button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {answer && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-700">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-emerald-800">{labels.verified}</p>
                {answer}
              </div>
            )}
            {recommendations.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-brand-600">{labels.recommendation}</p>
                {recommendations.map((r) => (
                  <Link key={r.type + r.slug} href={href(r)} className="group block rounded-xl border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-brand-950">{r.slug}</p>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-700" />
                    </div>
                    {r.reason && <p className="mt-1 text-xs leading-5 text-slate-600">{r.reason}</p>}
                  </Link>
                ))}
              </div>
            )}
            {loading && <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">{labels.search}</div>}
            {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {!answer && !loading && !error && recommendations.length === 0 && (
              <p className="pt-8 text-center text-sm leading-6 text-slate-500">{t("placeholder")}</p>
            )}
          </div>

          <form onSubmit={(event) => { event.preventDefault(); void send(); }} className="flex gap-2 border-t p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
            />
            <button type="submit" disabled={loading} className="h-10 w-10 shrink-0 rounded-full bg-brand-900 text-white disabled:opacity-50">
              <Send className="mx-auto h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
