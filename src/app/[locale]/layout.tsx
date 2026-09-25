import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/utils";
import { buildLocalizedMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/ai/AIChat";
import { Toaster } from "sonner";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { getPublishedNavigation } from "@/lib/public-content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as (typeof locales)[number];
  if (!locales.includes(locale)) return {};
  const copy = {
    fi: {
      title: "Suomen kesä, mökit ja saaristo | Finland Experience",
      description: "Löydä suomalaiset mökkilomat, saaristo, sauna ja kesäelämykset.",
    },
    es: {
      title: "Cabañas en Finlandia | Verano, sauna y naturaleza",
      description: "Descubre cabañas en Finlandia, el archipiélago, sauna y auténticas experiencias de verano.",
    },
    en: {
      title: "Finland Travel | Cabins, Archipelago and Summer",
      description: "Discover Finnish cabins, the archipelago, sauna and authentic summer experiences.",
    },
  }[locale];
  return buildLocalizedMetadata({ locale, title: copy.title, description: copy.description });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  setRequestLocale(locale);
  const [messages, navigation] = await Promise.all([getMessages(), getPublishedNavigation(locale as "fi" | "es" | "en")]);
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChat />
        <WhatsAppButton locale={locale} />
        <CookieConsent />
        <Toaster position="top-center" richColors />
      </div>
    </NextIntlClientProvider>
  );
}
