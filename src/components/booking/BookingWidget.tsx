"use client";

import Link from "next/link";
import { ExternalLink, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/types";

interface Props {
  price: number;
  priceLabel: string;
  locale: string;
  providerUrl?: string | null;
  providerName?: string | null;
  maxGuests?: number;
  duration?: string;
}

export function BookingWidget({ price, priceLabel, locale, providerUrl, providerName, maxGuests = 4, duration }: Props) {
  const isExternal = Boolean(providerUrl);
  const labels = {
    fi: { from: "Alkaen", provider: "Siirry palveluntarjoajalle", note: "Varaus, maksu ja sopimus tehdään suoraan palveluntarjoajan kanssa.", guests: "Enintään", unavailable: "Palveluntarjoajan varauslinkki ei ole vielä saatavilla." },
    en: { from: "From", provider: "Visit provider", note: "Booking, payment and the contract are completed directly with the provider.", guests: "Up to", unavailable: "The provider booking link is not available yet." },
    es: { from: "Desde", provider: "Ir al proveedor", note: "La reserva, el pago y el contrato se realizan directamente con el proveedor.", guests: "Hasta", unavailable: "El enlace de reserva del proveedor aún no está disponible." },
  } as const;
  const l = labels[locale as keyof typeof labels] || labels.en;

  return (
    <aside className="sticky top-28 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-card">
      <p className="text-sm text-slate-500">{l.from}</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-brand-900">{formatPrice(price, locale as Locale)}</span>
        <span className="text-sm text-slate-500">{priceLabel}</span>
      </div>
      {duration && <p className="mt-1 text-sm text-slate-500">{duration}</p>}
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
        <Users className="h-4 w-4" />
        <span>{l.guests} {maxGuests}</span>
      </div>
      {isExternal ? (
        <Link href={providerUrl!} target="_blank" rel="noopener noreferrer" className="btn-gold mt-6 w-full py-3.5">
          {l.provider}<ExternalLink className="h-4 w-4" />
        </Link>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">{l.unavailable}</div>
      )}
      <p className="mt-4 text-xs leading-5 text-slate-500">{l.note}</p>
    </aside>
  );
}
