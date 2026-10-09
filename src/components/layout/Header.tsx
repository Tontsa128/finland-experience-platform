"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe, Menu, UserRound, X } from "lucide-react";
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
    ["home", ""], ["destinations", "destinations"], ["accommodations", "accommodations"],
    ["experiences", "experiences"], ["sauna", "sauna"], ["events", "events"], ["coastalFinland", "coastal-finland"], ["cityBreaks", "city-breaks"], ["ruralFinland", "rural-finland"], ["blog", "blog"], ["contact", "contact"],
  ] as const;

  const baseItems = navigation.length ? navigation.map((item) => [item.id, item.href] as const) : fallbackItems;
  const withPlan = baseItems.some(([key]) => key === "plan") ? baseItems : [...baseItems, ["plan", "plan"] as const];
  const withSauna = withPlan.some(([key]) => key === "sauna") ? withPlan : [...withPlan, ["sauna", "sauna"] as const];
  const items = withSauna.some(([key]) => key === "ruralFinland") ? withSauna : [...withSauna, ["ruralFinland", "rural-finland"] as const];
  const labels = new Map(navigation.map((item) => [item.id, item.label]));
  const ui = locale === "fi"
    ? { account: "Asiakastili", login: "Kirjaudu", close: "Sulje valikko", open: "Avaa valikko" }
    : locale === "es"
      ? { account: "Cuenta", login: "Iniciar sesión", close: "Cerrar menú", open: "Abrir menú" }
      : { account: "Account", login: "Log in", close: "Close menu", open: "Open menu" };

  const href = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.replace(/^\/(fi|es|en)(?=\/|$)/, "").replace(/^\//, "");
    return `/${locale}${normalized ? `/${normalized}` : ""}`;
  };

  const languageHref = (targetLocale: string) => {
    const withoutLocale = path.replace(/^\/(fi|es|en)(?=\/|$)/, "");
    return `/${targetLocale}${withoutLocale || ""}`;
  };

  const labelFor = (key: string) => labels.get(key) || t(key);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-narrow flex min-h-16 w-full items-center gap-2 py-2 sm:min-h-18 sm:gap-4 sm:py-3">
        <Link href={href("")} className="min-w-0 flex-1 truncate font-display text-lg font-bold text-brand-900 sm:text-xl">
          Finland <span className="text-brand-500">Experience</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 p-1 sm:gap-1" aria-label="Language selector">
            <Globe className="mx-1 hidden h-4 w-4 text-slate-500 sm:block" aria-hidden="true" />
            {languageOptions.map(({ locale: targetLocale, label, flag }) => (
              <Link
                key={targetLocale}
                href={languageHref(targetLocale)}
                aria-current={targetLocale === locale ? "page" : undefined}
                aria-label={label}
                title={label}
                className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold transition sm:h-auto sm:min-w-0 sm:px-2.5 sm:py-1.5 ${targetLocale === locale ? "bg-brand-900 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-brand-700"}`}
              >
                <span aria-hidden="true">{flag}</span>
                <span className="ml-1 hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>

          <Link
            href={`/${locale}/account/login`}
            aria-label={ui.account}
            title={ui.account}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-900 shadow-sm hover:border-brand-300"
          >
            <UserRound className="h-5 w-5" />
          </Link>

          <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-900 shadow-sm lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? ui.close : ui.open} aria-expanded={open} aria-controls="mobile-primary-navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="hidden border-t border-slate-100 lg:block">
        <div className="container-narrow overflow-x-auto">
          <nav className="flex min-w-max items-center gap-6 py-3">
            {items.map(([key, p]) => (
              <Link key={key} href={href(p)} className={`text-sm font-medium transition hover:text-brand-600 ${path === href(p) ? "text-brand-700" : "text-slate-600"}`}>
                {labelFor(key)}
              </Link>
            ))}
            <Link href={`/${locale}/account/login`} className="ml-auto text-sm font-semibold text-brand-700">{ui.login}</Link>
          </nav>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg lg:hidden">
          <div className="container-narrow space-y-1">
            <Link href={`/${locale}/account/login`} onClick={() => setOpen(false)} className="block rounded-xl bg-brand-50 px-3 py-3 text-base font-semibold text-brand-900">
              {ui.account} / {ui.login}
            </Link>
            {items.map(([key, p]) => (
              <Link key={key} onClick={() => setOpen(false)} href={href(p)} aria-current={path === href(p) ? "page" : undefined} className={`block rounded-xl px-3 py-3 text-base font-medium ${path === href(p) ? "bg-brand-50 text-brand-900" : "text-slate-700 hover:bg-brand-50 hover:text-brand-900"}`}>
                {labelFor(key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
