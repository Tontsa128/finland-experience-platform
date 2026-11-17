"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, UserRound, X, Waves, Heart } from "lucide-react";
import { useState } from "react";

type NavigationItem = { id: string; label: string; href: string; sortOrder: number };

const languageOptions = [
  { locale: "fi", label: "FI", full: "Suomi", flag: "🇫🇮" },
  { locale: "es", label: "ES", full: "Español", flag: "🇪🇸" },
  { locale: "en", label: "EN", full: "English", flag: "🇬🇧" },
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
  const withMap = baseItems.some(([key]) => key === "map") ? baseItems : [...baseItems.slice(0, 2), ["map", "map"] as const, ...baseItems.slice(2)];
  const items = withMap.some(([key]) => key === "home") ? withMap : [["home", ""] as const, ...withMap];
  const desktopOrder = ["home", "destinations", "map", "experiences", "events", "coastalFinland"];
  const desktopItems = desktopOrder.flatMap((key) => {
    const item = items.find(([id]) => id === key);
    return item ? [item] : [];
  });
  const labels = new Map(navigation.map((item) => [item.id, item.label]));
  const ui = locale === "fi"
    ? { account: "Oma tili", login: "Kirjaudu", close: "Sulje valikko", open: "Avaa valikko", plan: "Suunnittele", languages: "Valitse kieli" }
    : locale === "es"
      ? { account: "Mi cuenta", login: "Iniciar sesión", close: "Cerrar menú", open: "Abrir menú", plan: "Planificar", languages: "Seleccionar idioma" }
      : { account: "My account", login: "Log in", close: "Close menu", open: "Open menu", plan: "Plan", languages: "Choose language" };

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
    if (key === "map") return locale === "fi" ? "Kartta" : locale === "es" ? "Mapa" : "Map";
    const translatedKeys = new Set(["home", "destinations", "accommodations", "experiences", "sauna", "plan", "coastalFinland", "blog", "contact", "events"]);
    return translatedKeys.has(key) ? t(key) : labels.get(key) || key;
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full border-b border-[#e9eee9] bg-white/95 backdrop-blur-xl">
      <div className="container-narrow flex min-h-[64px] w-full min-w-0 items-center justify-between gap-2 sm:min-h-[68px] sm:gap-3">
        <Link href={href("")} aria-label="Finland Experience – home" className="flex min-w-0 shrink items-center gap-2 text-brand-950 sm:gap-2.5">
          <Waves className="h-8 w-8 shrink-0 text-brand-800 sm:h-9 sm:w-9" strokeWidth={1.8} aria-hidden="true" />
          <span className="flex min-w-0 flex-col whitespace-nowrap font-display text-[11px] font-extrabold leading-[1.05] tracking-[.1em] sm:text-sm sm:tracking-[.12em]">
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

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3">
          <nav aria-label={ui.languages} translate="no" className="notranslate flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 p-0.5 sm:gap-1 sm:p-1">
            {languageOptions.map(({ locale: targetLocale, label, full, flag }) => {
              const active = targetLocale === locale;
              return (
                <Link
                  key={targetLocale}
                  href={languageHref(targetLocale)}
                  aria-current={active ? "page" : undefined}
                  aria-label={`${full} (${label})`}
                  title={full}
                  lang={targetLocale}
                  translate="no"
                  className={`notranslate inline-flex min-h-10 min-w-10 items-center justify-center gap-1 rounded-full px-2 text-[11px] font-extrabold tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 sm:min-h-10 sm:min-w-10 sm:px-2.5 ${active ? "bg-brand-950 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-brand-950"}`}
                >
                  <span aria-hidden="true">{flag}</span>
                  <span className="sm:hidden">{label}</span>
                  <span className="hidden sm:inline" lang={targetLocale}>{full}</span>
                </Link>
              );
            })}
          </nav>
          <Link href={`/${locale}/plan`} aria-label={ui.plan} title={ui.plan} className="hidden h-10 w-10 items-center justify-center rounded-full text-brand-950 transition hover:bg-brand-50 sm:flex"><Heart className="h-5 w-5" strokeWidth={1.8} /></Link>
          <Link href={`/${locale}/account/login`} className="hidden min-h-10 items-center gap-2 rounded-full bg-brand-950 px-4 text-xs font-bold text-white transition hover:bg-brand-800 sm:inline-flex"><UserRound className="h-4 w-4" />{ui.account}</Link>
          <button type="button" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-950 shadow-sm sm:h-10 sm:w-10 xl:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? ui.close : ui.open} aria-expanded={open}>
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
