import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { getPublishedNavigation } from "@/lib/public-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as (typeof locales)[number];
  if (!locales.includes(locale)) return {};
  const copy = {
    fi: {
      title: "Suomen rannikko, saaristo ja elämykset",
      description: "Löydä suomalaiset rannikkokohteet, mökit, saaristo, sauna, luonto ja paikalliset elämykset ympäri vuoden.",
    },
    es: {
      title: "Viajes a Finlandia | Costa, archipiélago y experiencias",
      description: "Descubre la costa finlandesa, cabañas, archipiélago, saunas, naturaleza y experiencias locales durante todo el año.",
    },
    en: {
      title: "Finland Travel | Coast, Archipelago and Experiences",
      description: "Discover Finland’s coast, cabins, archipelago, sauna, nature and authentic local experiences all year round.",
    },
  }[locale];
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  setRequestLocale(locale);
  const [messages, navigation] = await Promise.all([getMessages(), getPublishedNavigation(locale as "fi" | "es" | "en")]);
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Header navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBottomNav />
        <WhatsAppButton locale={locale} />
        <CookieConsent />
        <Toaster position="top-center" richColors />
      </div>
    </NextIntlClientProvider>
  );
}
