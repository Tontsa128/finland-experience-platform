import type { Locale } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: Locale = "en"): string {
  const numberLocale = locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-IE";

  return new Intl.NumberFormat(numberLocale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export const formatCurrency = formatPrice;

export const locales: Locale[] = ["fi", "es", "en"];
export const defaultLocale: Locale = "en";

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale;
}
