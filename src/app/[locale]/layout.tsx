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
      title: "Löydä Suomen salaiset helmet | Finland Experience",
      description: "Löydä Suomen idylliset kohteet, majoitukset, saunat, paikalliset maut, luontoelämykset ja tapahtumat ympäri vuoden.",
    },
    es: {
      title: "Descubre los tesoros ocultos de Finlandia | Finland Experience",
      description: "Descubre pueblos idílicos, alojamientos, saunas, gastronomía local, naturaleza y experiencias por toda Finlandia.",
    },
    en: {
      title: "Discover Finland’s Hidden Gems | Finland Experience",
      description: "Discover idyllic villages, stays, saunas, local food, nature experiences and events across Finland."
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
