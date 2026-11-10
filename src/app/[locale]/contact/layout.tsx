import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : rawLocale === "en" ? "en" : "fi";
  const copy = {
    fi: { title: "Ota yhteyttä | Finland Experience", description: "Ota yhteyttä Finland Experienceen tai kysy palveluntarjoajan näkyvyydestä alustalla." },
    es: { title: "Contacto | Finland Experience", description: "Contacta con Finland Experience o consulta cómo presentar tu negocio en la plataforma." },
    en: { title: "Contact | Finland Experience", description: "Contact Finland Experience or ask about listing your business on the platform." },
  }[locale];
  return buildLocalizedMetadata({ locale, ...copy, path: "contact" });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
