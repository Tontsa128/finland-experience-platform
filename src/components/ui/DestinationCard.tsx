"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Destination } from "@/types";
import { formatPrice } from "@/lib/utils";

export function DestinationCard({ destination, index=0 }: { destination: Destination; index?: number }) {
 const locale=useLocale(); const t=useTranslations("common");
 return <Link href={`/${locale}/destinations/${destination.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-soft hover:shadow-card transition">
  <div className="relative aspect-[16/10] overflow-hidden"><Image src={destination.images[0]} alt={destination.name[locale as keyof typeof destination.name]} fill priority={index<2} sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/></div>
  <div className="p-5"><div className="text-xs uppercase tracking-wider text-brand-600 mb-1">{destination.region}</div><h3 className="font-display text-xl font-semibold text-brand-900">{destination.name[locale as keyof typeof destination.name]}</h3><p className="mt-2 text-sm text-slate-600 line-clamp-2">{destination.shortDescription[locale as keyof typeof destination.shortDescription]}</p><div className="mt-4 text-sm font-semibold text-brand-900">{t("from")} {formatPrice(destination.priceFrom,locale as any)}</div></div>
 </Link>;
}
