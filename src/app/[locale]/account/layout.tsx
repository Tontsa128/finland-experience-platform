import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : rawLocale === "en" ? "en" : "fi";
  const copy = {
    fi: { title: "Oma tili | Finland Experience", description: "Hallitse Finland Experience -käyttäjätiliäsi." },
    es: { title: "Mi cuenta | Finland Experience", description: "Gestiona tu cuenta de Finland Experience." },
    en: { title: "My account | Finland Experience", description: "Manage your Finland Experience account." },
  }[locale];
  return buildLocalizedMetadata({ locale, ...copy, path: "account", noindex: true });
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
