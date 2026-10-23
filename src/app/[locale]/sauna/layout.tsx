import type { ReactNode } from "react";
import { FeaturedSaunas } from "@/components/sauna/FeaturedSaunas";
import type { Locale } from "@/types";

function localeOf(value: string): Locale {
  return value === "fi" || value === "es" || value === "en" ? value : "en";
}

export default async function SaunaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = localeOf(rawLocale);

  return (
    <>
      <FeaturedSaunas locale={locale} />
      {children}
    </>
  );
}
