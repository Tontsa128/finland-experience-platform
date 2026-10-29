"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Cabin, Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { formatPrice } from "@/lib/utils";

export function CabinCard({ cabin, index = 0 }: { cabin: Cabin; index?: number }) {
  const locale = useLocale();
  const fallbackImage = photoLibrary.sarkisalo;
  const [imageSrc, setImageSrc] = useState(cabin.images?.[0] || photoLibrary.saunaCottage || fallbackImage);
  const price = cabin.pricePerNight > 0
    ? formatPrice(cabin.pricePerNight, locale as Locale) + " / " + (locale === "fi" ? "yö" : locale === "es" ? "noche" : "night")
    : (locale === "fi" ? "Tarkista hinta" : locale === "es" ? "Consultar precio" : "Check price");

  return (
    <Link href={`/${locale}/accommodations/${cabin.slug}`} className="group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={imageSrc} alt={cabin.name[locale as keyof typeof cabin.name] || cabin.name.en} fill priority={index < 2} sizes="(max-width:768px) 100vw,33vw" onError={() => { if (imageSrc !== fallbackImage) setImageSrc(fallbackImage); }} className="object-cover transition duration-700 ease-out group-hover:scale-110" />
      </div>
      <div className="p-5">
        <div className="mb-1 text-xs uppercase tracking-wider text-brand-600">{cabin.locationByLocale?.[locale as Locale] || cabin.location}</div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{cabin.name[locale as keyof typeof cabin.name] || cabin.name.en}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{cabin.description[locale as keyof typeof cabin.description] || cabin.description.en}</p>
        <div className="mt-4 text-sm font-semibold text-brand-900">{price}</div>
        <div className="mt-2 text-xs text-slate-400">{locale === "fi" ? "Varaus palveluntarjoajalta" : locale === "es" ? "Reserva con el proveedor" : "Booking with provider"}</div>
      </div>
    </Link>
  );
}
