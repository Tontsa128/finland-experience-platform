"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

type NavigationItem = { id: string; label: string; href: string; sortOrder: number };

const languageOptions = [
  { locale: "fi", label: "Suomi", flag: "🇫🇮" },
  { locale: "es", label: "Español", flag: "🇪🇸" },
  { locale: "en", label: "English", flag: "🇬🇧" },
] as const;

export function Header({ navigation = [] }: { navigation?: NavigationItem[] }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const fallbackItems = [
    ["home", ""],
    ["destinations", "destinations"],
    ["accommodations", "accommodations"],
    ["experiences", "experiences"],
    ["cityBreaks", "city-breaks"],
    ["blog", "blog"],
    ["contact", "contact"],
  ] as const;

  const items = navigation.length ? navigation.map((item) => [item.id, item.href.replace(/^\/(fi|es|en)(?=\/|$)/, "").replace(/^\//, "")] as const) : fallbackItems;
  const labels = new Map(navigation.map((item) => [item.id, item.label]));
  const href = (l: string) => `/${locale}${l ? `/${l}` : ""}`;
  const languageHref = (targetLocale: string) => {
    const withoutLocale = path.replace(/^\/(fi|es|en)(?=\/|$)/, "");
    return `/${targetLocale}${withoutLocale || ""}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-narrow flex min-h-18 items-center justify-between gap-4 py-3">
        <Link href={href("")} className="shrink-0 font-display text-xl font-bold text-brand-900">
          Nordic <span className="text-brand-500">Escape</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1"
            aria-label="Language selector"
          >
            <Globe className="mx-1 h-4 w-4 text-slate-500" aria-hidden="true" />
            {languageOptions.map(({ locale: targetLocale, label, flag }) => (
              <Link
                key={targetLocale}
                href={languageHref(targetLocale)}
                aria-current={targetLocale === locale ? "page" : undefined}
                title={label}
                className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
                  targetLocale === locale
                    ? "bg-brand-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-brand-700"
                }`}
              >
                <span aria-hidden="true">{flag}</span>
                <span className="ml-1 hidden sm:inline">{label}</span>
                <span className="ml-1 sm:hidden">{targetLocale.toUpperCase()}</span>
              </Link>
            ))}
          </div>

          <button
            className="rounded-lg p-2 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="container-narrow overflow-x-auto">
          <nav className="hidden min-w-max items-center gap-6 py-3 lg:flex">
            {items.map(([key, p]) => (
              <Link
                key={key}
                href={href(p)}
                className={`text-sm font-medium transition hover:text-brand-600 ${
                  path === href(p) ? "text-brand-700" : "text-slate-600"
                }`}
              >
                {labels.get(key) || t(key)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white p-4 space-y-2 lg:hidden">
          {items.map(([key, p]) => (
            <Link
              key={key}
              onClick={() => setOpen(false)}
              href={href(p)}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-brand-50"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
