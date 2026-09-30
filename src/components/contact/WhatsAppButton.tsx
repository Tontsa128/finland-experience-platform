"use client";

import { MessageCircle } from "lucide-react";

const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim() || "";

export function WhatsAppButton({ locale = "es" }: { locale?: string }) {
  const normalized = phone.replace(/[^0-9]/g, "");
  if (!normalized) return null;

  const messages = {
    fi: "Hei! Olen kiinnostunut Suomen matkasta.",
    es: "Hola! Estoy interesado/a en unas vacaciones en Finlandia.",
    en: "Hello! I am interested in a holiday in Finland.",
  } as const;

  const labels = {
    fi: "Avaa WhatsApp",
    es: "Abrir WhatsApp",
    en: "Open WhatsApp",
  } as const;

  const href = "https://wa.me/" + normalized + "?text=" + encodeURIComponent(messages[locale as keyof typeof messages] || messages.en);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={labels[locale as keyof typeof labels] || labels.en}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-xl transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      WhatsApp
    </a>
  );
}
