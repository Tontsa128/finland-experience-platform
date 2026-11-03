import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/types";

export default async function MathildedalLegacyCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale === "fi" || rawLocale === "es" || rawLocale === "en" ? rawLocale : "fi") as Locale;
  permanentRedirect(`/${locale}/destinations/salo-mathildedal`);
}
