"use client";

import { FormEvent, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || t("error"));

      setSent(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-narrow py-16">
      <div className="max-w-2xl">
        <h1 className="section-title">{t("title")}</h1>
        <p className="section-subtitle mt-3">{t("subtitle")}</p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-slate-600">
          <p className="flex gap-3">
            <MapPin className="shrink-0" />
            Finland
          </p>
          <div className="rounded-2xl bg-brand-50 p-5 text-sm leading-relaxed text-brand-900">
            {t("providerNote")}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border bg-white p-6 shadow-soft"
        >
          <input
            name="name"
            required
            maxLength={100}
            placeholder={t("name")}
            className="w-full rounded-xl border px-4 py-3"
          />
          <input
            name="email"
            required
            type="email"
            maxLength={254}
            placeholder={t("email")}
            className="w-full rounded-xl border px-4 py-3"
          />
          <textarea
            name="message"
            required
            minLength={5}
            maxLength={5000}
            placeholder={t("message")}
            rows={6}
            className="w-full rounded-xl border px-4 py-3"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || sent}
            className="btn-primary flex w-full items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {sent ? t("success") : t("send")}
          </button>
        </form>
      </div>
    </div>
  );
}
