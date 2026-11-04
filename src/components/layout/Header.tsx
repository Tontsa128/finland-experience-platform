"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, UserRound, X, Waves, Heart } from "lucide-react";
import { useState } from "react";

type NavigationItem = { id: string; label: string; href: string; sortOrder: number };

const languageOptions = [
  { locale: "fi", label: "FI", full: "Suomi" },
  { locale: "es", label: "ES", full: "Español" },
  { locale: "en", label: "EN", full: "English" },
] as const;

export function Header({ navigation = [] }: { navigation?: NavigationItem[] }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const fallbackItems = [
    ["home", ""], ["destinations", "destinations"], ["experiences", "experiences"],
    ["events", "events"], ["coastalFinland", "coastal-finland"], ["accommodations", "accommodations"],
    ["plan", "plan"], ["sauna", "sauna"], ["blog", "blog"], ["contact", "contact"],
  ] as const;
  const baseItems = navigation.length ? navigation.map((item) => [item.id, item.href] as const) : fallbackItems;
  const items = baseItems.some(([key]) => key === "home") ? baseItems : [["home", ""] as const, ...baseItems];
  const desktopOrder = ["home", "destinations", "experiences", "events", "coastalFinland"];
  const desktopItems = desktopOrder.flatMap((key) => {
    const item = items.find(([id]) => id === key);
    return item ? [item] : [];
  });
  const labels = new Map(navigation.map((item) => [item.id, item.label]));
  const ui = locale === "fi"
    ? { account: "Oma tili", login: "Kirjaudu", close: "Sulje valikko", open: "Avaa valikko", plan: "Suunnittele" }
    : locale === "es"
      ? { account: "Mi cuenta", login: "Iniciar sesión", close: "Cerrar menú", open: "Abrir menú", plan: "Planificar" }
      : { account: "My account", login: "Log in", close: "Close menu", open: "Open menu", plan: "Plan" };

  const href = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.replace(/^\/(fi|es|en)(?=\/|$)/, "").replace(/^\//, "");
    return `/${locale}${normalized ? `/${normalized}` : ""}`;
  };
  const languageHref = (targetLocale: string) => {
    const withoutLocale = path.replace(/^\/(fi|es|en)(?=\/|$)/, "");
    return `/${targetLocale}${withoutLocale || ""}`;
  };
  const labelFor = (key: string) => {
    const translatedKeys = new Set(["home", "destinations", "accommodations", "experiences", "sauna", "plan", "coastalFinland", "blog", "contact", "events"]);
    return translatedKeys.has(key) ? t(key) : labels.get(key) || key;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e9eee9] bg-white/95 backdrop-blur-xl">
      <div className="container-narrow flex min-h-[68px] items-center justify-between gap-3">
        <Link href={href("")} aria-label="Finland Experience – home" className="flex shrink-0 items-center gap-2.5 text-brand-950">
          <Waves className="h-9 w-9 text-brand-800" strokeWidth={1.8} aria-hidden="true" />
          <span className="flex flex-col font-display text-[13px] font-extrabold leading-[1.05] tracking-[.12em] sm:text-sm">
            <span>FINLAND</span><span>EXPERIENCE</span>
          </span>
        </Link>

        <nav aria-label={locale === "fi" ? "Päänavigaatio" : locale === "es" ? "Navegación principal" : "Main navigation"} className="hidden min-w-0 flex-1 items-center justify-center gap-5 xl:flex">
          {desktopItems.map(([key, target]) => (
            <Link key={key} href={href(target)} aria-current={path === href(target) ? "page" : undefined} className={`whitespace-nowrap border-b-2 px-0.5 py-2 text-[13px] font-semibold transition ${path === href(target) ? "border-brand-800 text-brand-950" : "border-transparent text-slate-700 hover:border-brand-300 hover:text-brand-900"}`}>
              {labelFor(key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 text-[11px] font-bold tracking-wide" aria-label="Language selector">
            {languageOptions.map(({ locale: targetLocale, label, full }, index) => (
              <span key={targetLocale} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true" className="text-slate-300">|</span>}
                <Link href={languageHref(targetLocale)} aria-current={targetLocale === locale ? "page" : undefined} aria-label={full} title={full} className={targetLocale === locale ? "text-brand-950" : "text-slate-500 hover:text-brand-800"}>{label}</Link>
              </span>
            ))}
          </div>
          <Link href={`/${locale}/plan`} aria-label={ui.plan} title={ui.plan} className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-950 transition hover:bg-brand-50 sm:flex"><Heart className="h-5 w-5" strokeWidth={1.8} /></Link>
          <Link href={`/${locale}/account/login`} className="hidden min-h-10 items-center gap-2 rounded-full bg-brand-950 px-4 text-xs font-bold text-white transition hover:bg-brand-800 sm:inline-flex"><UserRound className="h-4 w-4" />{ui.account}</Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-950 shadow-sm xl:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? ui.close : ui.open} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && <nav aria-label={locale === "fi" ? "Mobiilivalikko" : locale === "es" ? "Menú móvil" : "Mobile menu"} className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg xl:hidden"><div className="container-narrow grid gap-1 sm:grid-cols-2">
        {items.map(([key, target]) => <Link key={key} href={href(target)} onClick={() => setOpen(false)} aria-current={path === href(target) ? "page" : undefined} className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-950">{labelFor(key)}</Link>)}
        <Link href={`/${locale}/account/login`} onClick={() => setOpen(false)} className="rounded-xl bg-brand-950 px-3 py-3 text-sm font-bold text-white">{ui.account} · {ui.login}</Link>
      </div></nav>}
    </header>
  );
}
