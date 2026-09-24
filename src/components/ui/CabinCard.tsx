"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Cabin } from "@/types";
import { formatPrice } from "@/lib/utils";

export function CabinCard({ cabin, index = 0 }: { cabin: Cabin; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const price = cabin.pricePerNight > 0 ? formatPrice(cabin.pricePerNight, locale as any) + " / " + (locale === "fi" ? "yö" : locale === "es" ? "noche" : "night") : (locale === "fi" ? "Tarkista hinta" : locale === "es" ? "Consultar precio" : "Check price");
  return (
    <Link href={"/" + locale + "/accommodations/" + cabin.slug} className="group block overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-card transition">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={cabin.images[0]} alt={cabin.name[locale as keyof typeof cabin.name]} fill priority={index < 2} sizes="(max-width:768px) 100vw,33vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-brand-600 mb-1">{cabin.location}</div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{cabin.name[locale as keyof typeof cabin.name]}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">{cabin.description[locale as keyof typeof cabin.description]}</p>
        <div className="mt-4 text-sm font-semibold text-brand-900">{price}</div>
        <div className="mt-2 text-xs text-slate-400">{locale === "fi" ? "Varaus palveluntarjoajalta" : locale === "es" ? "Reserva con el proveedor" : "Booking with provider"}</div>
      </div>
    </Link>
  );
}
