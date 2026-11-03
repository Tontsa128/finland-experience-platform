"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Compass, Home, MapPinned, Route } from "lucide-react";

type Locale = "fi" | "es" | "en";

const copy: Record<Locale, { home: string; destinations: string; map: string; plan: string; label: string }> = {
  fi: { home: "Etusivu", destinations: "Kohteet", map: "Kartta", plan: "Suunnittele", label: "Päänavigaatio" },
  es: { home: "Inicio", destinations: "Destinos", map: "Mapa", plan: "Planificar", label: "Navegación principal" },
  en: { home: "Home", destinations: "Destinations", map: "Map", plan: "Plan", label: "Main navigation" },
};

export function MobileBottomNav() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = copy[locale] || copy.en;
  const items = [
    { href: "/" + locale, label: t.home, icon: Home, active: pathname === "/" + locale },
    { href: "/" + locale + "/destinations", label: t.destinations, icon: Compass, active: pathname.startsWith("/" + locale + "/destinations") },
    { href: "/" + locale + "/experiences#experience-map", label: t.map, icon: MapPinned, active: pathname === "/" + locale + "/experiences" },
    { href: "/" + locale + "/plan", label: t.plan, icon: Route, active: pathname === "/" + locale + "/plan" },
  ];

  return (
    <nav aria-label={t.label} className="fixed inset-x-0 bottom-0 z-[55] border-t border-slate-200 bg-white/95 px-2 pt-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1">
        {items.map(({ href, label, icon: Icon, active }) => (
          <li key={href}>
            <Link
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={"flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 " + (active ? "bg-brand-50 text-brand-900" : "text-slate-600 hover:bg-slate-50 hover:text-brand-900")}
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
