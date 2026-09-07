import type { Locale } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatPrice(price: number, locale: Locale = "en"): string {
  return new Intl.NumberFormat(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-EU", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
}
export const locales: Locale[] = ["fi", "es", "en"];
export const defaultLocale: Locale = "en";
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return locales.includes(segment as Locale) ? (segment as Locale) : defaultLocale;
}
