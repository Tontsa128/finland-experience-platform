"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Destination, Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { canonicalDestinationSlug, formatPrice } from "@/lib/utils";

function destinationFallback(slug: string): string {
  const normalized = slug.toLowerCase();
  if (normalized.includes("mathildedal") || normalized === "salo") return photoLibrary.mathildedalHarbour;
  if (normalized.includes("naantali")) return photoLibrary.naantaliOldTown;
  if (normalized.includes("aland") || normalized.includes("ahvenan")) return photoLibrary.aland;
  if (normalized.includes("hanko")) return photoLibrary.hankoRegattaBeach;
  if (normalized.includes("turku")) return photoLibrary.turkuArchipelago;
  if (normalized.includes("teijo")) return photoLibrary.teijoNationalPark;
  if (normalized.includes("rosala") || normalized.includes("kemionsaari")) return photoLibrary.rosalaVikingCentre;
  if (normalized.includes("porvoo")) return photoLibrary.porvoo;
  if (normalized.includes("hamina") || normalized.includes("southeast")) return photoLibrary.hamina;
  return photoLibrary.turkuArchipelago;
}

export function DestinationCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const fallbackImage = destinationFallback(destination.slug);
  const [imageSrc, setImageSrc] = useState(destination.images?.[0] || fallbackImage);

  return (
    <Link href={`/${locale}/destinations/${canonicalDestinationSlug(destination.slug)}`} className="group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={destination.name[locale as keyof typeof destination.name] || destination.name.en}
          fill
          priority={index < 2}
          sizes="(max-width:768px) 100vw, 33vw"
          onError={() => {
            if (imageSrc !== fallbackImage) setImageSrc(fallbackImage);
          }}
          className="object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-5">
        <div className="mb-1 text-xs uppercase tracking-wider text-brand-600">{destination.region}</div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{destination.name[locale as keyof typeof destination.name] || destination.name.en}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{destination.shortDescription[locale as keyof typeof destination.shortDescription] || destination.shortDescription.en}</p>
        {destination.priceFrom > 0 ? (
          <div className="mt-4 text-sm font-semibold text-brand-900">{t("from")} {formatPrice(destination.priceFrom, locale as Locale)}</div>
        ) : (
          <div className="mt-4 text-sm font-semibold text-brand-700">
            {locale === "fi" ? "Tutustu kohteeseen" : locale === "es" ? "Descubrir destino" : "Explore destination"}
          </div>
        )}
      </div>
    </Link>
  );
}
