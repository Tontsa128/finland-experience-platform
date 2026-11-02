import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/types";

export default async function MathildedalLegacyCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale, category: rawCategory } = await params;
  const locale = (rawLocale === "fi" || rawLocale === "es" || rawLocale === "en" ? rawLocale : "fi") as Locale;
  const categoryMap: Record<string, string> = {
    accommodation: "majoitus",
    stay: "majoitus",
    majoitus: "majoitus",
    food: "ruoka",
    ruoka: "ruoka",
    activities: "tekemista",
    experiences: "tekemista",
    tekemista: "tekemista",
    elamykset: "tekemista",
  };
  const category = categoryMap[rawCategory];
  permanentRedirect(`/${locale}/salo/mathildedal${category ? `/${category}` : ""}`);
}
