"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Home, Search, MapPinned, Route, UserRound } from "lucide-react";

type Locale = "fi" | "es" | "en";

const copy: Record<Locale, { home: string; search: string; map: string; plan: string; account: string; label: string }> = {
  fi: { home: "Etusivu", search: "Haku", map: "Kartta", plan: "Suunnitelma", account: "Oma tili", label: "Päänavigaatio" },
  es: { home: "Inicio", search: "Buscar", map: "Mapa", plan: "Mi viaje", account: "Mi cuenta", label: "Navegación principal" },
  en: { home: "Home", search: "Search", map: "Map", plan: "My trip", account: "Account", label: "Main navigation" },
};

export function MobileBottomNav() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = copy[locale] || copy.en;
  const homeHref = `/${locale}`;
  const searchHref = `/${locale}/search`;
  const mapHref = `/${locale}/experiences#experience-map`;
  const planHref = `/${locale}/plan`;
  const accountHref = `/${locale}/account/login`;

  const items = [
    { href: homeHref, label: t.home, icon: Home, active: pathname === homeHref },
    { href: searchHref, label: t.search, icon: Search, active: pathname === searchHref },
    { href: mapHref, label: t.map, icon: MapPinned, active: pathname === `/${locale}/experiences` },
    { href: planHref, label: t.plan, icon: Route, active: pathname === planHref },
    { href: accountHref, label: t.account, icon: UserRound, active: pathname.startsWith(`/${locale}/account`) },
  ];

  return (
    <nav aria-label={t.label} className="fixed inset-x-0 bottom-0 z-[55] border-t border-slate-200 bg-white/95 px-1 pt-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5 gap-0.5">
        {items.map(({ href, label, icon: Icon, active }) => (
          <li key={href}>
            <Link
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={"flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1.5 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 " + (active ? "bg-brand-50 text-brand-900" : "text-slate-600 hover:bg-slate-50 hover:text-brand-900")}
            >
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
              <span className="leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
