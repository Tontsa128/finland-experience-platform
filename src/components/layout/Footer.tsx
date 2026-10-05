"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const c = useTranslations("common");
  const locale = useLocale();

  const quickLinks = [
    ["destinations", "destinations"],
    ["accommodations", "accommodations"],
    ["experiences", "experiences"],
    ["sauna", "sauna"],
    ["events", "events"],
    ["blog", "blog"],
  ] as const;

  return (
    <footer className="bg-brand-900 text-white">
      <div className="container-narrow grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-bold text-brand-900">F</span>
            <span className="font-display text-xl font-bold">{c("siteName")}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-brand-100">{t("aboutText")}</p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{t("quickLinks")}</h3>
          <nav className="space-y-2 text-sm text-brand-100" aria-label={t("quickLinks")}>
            {quickLinks.map(([key, path]) => (
              <Link key={key} href={`/${locale}/${path}`} className="block hover:text-white">{n(key)}</Link>
            ))}
            <Link href={`/${locale}/plan`} className="block hover:text-white">{n("plan")}</Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{c("contact")}</h3>
          <div className="space-y-3 text-sm text-brand-100">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 hover:text-white">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {c("contact")}
            </Link>
            <p className="text-xs leading-5 text-brand-200">Finland</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">{t("legal")}</h3>
          <nav className="space-y-2 text-sm text-brand-100" aria-label={t("legal")}>
            <Link href={`/${locale}/privacy`} className="block hover:text-white">{t("privacy")}</Link>
            <Link href={`/${locale}/terms`} className="block hover:text-white">{t("terms")}</Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-brand-100">
        © {new Date().getFullYear()} {c("siteName")} · {t("rights")}
      </div>
    </footer>
  );
}
