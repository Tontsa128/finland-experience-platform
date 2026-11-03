import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/types";

export default async function MathildedalLegacyCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale, category: rawCategory } = await params;
  const locale = (rawLocale === "fi" || rawLocale === "es" || rawLocale === "en" ? rawLocale : "fi") as Locale;
  const aliases: Record<string, string> = {
    accommodation: "majoitus", stay: "majoitus", food: "ruoka", experiences: "tekemista", activities: "tekemista", nature: "luonto", tourism: "matkailuinfo",
  };
  const category = aliases[rawCategory] || rawCategory;
  permanentRedirect(`/${locale}/salo/mathildedal/${category}`);
}
