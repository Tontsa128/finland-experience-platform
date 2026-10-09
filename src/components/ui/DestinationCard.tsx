"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import type { Destination } from "@/types";

import { canonicalDestinationSlug } from "@/lib/utils";
import { photoLibrary } from "@/lib/photo-library";
import { MapPin } from "lucide-react";

export function DestinationCard({ destination, index=0 }: { destination: Destination; index?: number }) {
 const locale=useLocale();
 return <Link href={`/${locale}/${destination.slug === "salo-mathildedal" ? "salo" : ["naantali", "turku", "hanko", "aland", "porvoo"].includes(destination.slug) ? destination.slug : destination.slug === "rosala" ? "kimitoon" : "destinations/" + canonicalDestinationSlug(destination.slug)}`} className="group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-brand-50">
    {destination.slug === "salo-mathildedal" || destination.images[0] ? <Image src={destination.slug === "salo-mathildedal" ? photoLibrary.mathildedalHarbour : destination.images[0]} alt={destination.slug === "salo-mathildedal" ? (locale === "fi" ? "Mathildedalin satama Salon seudulla" : locale === "es" ? "Puerto de Mathildedal en la región de Salo" : "Mathildedal harbour in the Salo region") : destination.name[locale as keyof typeof destination.name]} fill priority={index<2} sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 ease-out group-hover:scale-110"/> : <div className="flex flex-col items-center px-5 text-center text-brand-700"><MapPin className="h-8 w-8"/><p className="mt-3 text-xs font-semibold">{locale === "fi" ? "Kohdekuva lisätään käyttöoikeuden vahvistamisen jälkeen" : locale === "es" ? "La imagen se añadirá cuando se confirmen los derechos de uso" : "A destination photo will be added once usage rights are confirmed"}</p></div>}
    {destination.images[0] || destination.slug === "salo-mathildedal" ? <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/> : null}
  </div>
  <div className="p-5"><div className="text-xs uppercase tracking-wider text-brand-600 mb-1">{destination.region}</div><h3 className="font-display text-xl font-semibold text-brand-900">{destination.slug === "salo-mathildedal" ? "Salo" : destination.name[locale as keyof typeof destination.name]}</h3><p className="mt-2 text-sm text-slate-600 line-clamp-2">{destination.slug === "salo-mathildedal" ? (locale === "fi" ? "Mathildedal, Teijo, Särkisalo, Perniö ja Salon keskusta." : locale === "es" ? "Mathildedal, Teijo, Särkisalo, Perniö y el centro de Salo." : "Mathildedal, Teijo, Särkisalo, Perniö and central Salo.") : destination.shortDescription[locale as keyof typeof destination.shortDescription]}</p><div className="mt-4 text-sm font-semibold text-brand-700">
          {locale === "fi" ? "Tutustu kohteeseen" : locale === "es" ? "Descubrir destino" : "Explore destination"}
        </div></div>
 </Link>;
}
