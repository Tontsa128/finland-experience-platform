"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import type { Destination } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { canonicalDestinationSlug } from "@/lib/utils";

function destinationFallback(slug: string): string {
  const normalized = slug.toLowerCase();
  if (normalized.includes("mathildedal") || normalized === "salo") return photoLibrary.mathildedalHarbour;
  if (normalized.includes("naantali")) return photoLibrary.naantaliOldTown;
  if (normalized.includes("aland") || normalized.includes("ahvenan")) return photoLibrary.aland;
  if (normalized.includes("hanko")) return photoLibrary.hankoRegattaBeach;
  if (normalized.includes("turku")) return photoLibrary.turkuAura;
  if (normalized.includes("teijo")) return photoLibrary.teijoNationalPark;
  if (normalized.includes("rosala") || normalized.includes("kemionsaari")) return photoLibrary.rosalaVikingCentre;
  if (normalized.includes("porvoo")) return photoLibrary.porvoo;
  if (normalized.includes("hamina") || normalized.includes("southeast")) return photoLibrary.hamina;
  return photoLibrary.turkuArchipelago;
}

export function DestinationCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  const locale = useLocale() as "fi" | "es" | "en";
  const fallbackImage = destinationFallback(destination.slug);
  const [imageSrc, setImageSrc] = useState(destination.images?.[0] || fallbackImage);
  const name = destination.name[locale] || destination.name.en;
  const description = destination.shortDescription[locale] || destination.shortDescription.en;

  return (
    <Link
      href={`/${locale}/destinations/${canonicalDestinationSlug(destination.slug)}`}
      className="group relative block min-h-[390px] overflow-hidden rounded-[1.8rem] bg-[#e5eade] shadow-[0_14px_40px_rgba(38,58,42,0.10)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(38,58,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-4 sm:min-h-[440px]"
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        priority={index < 2}
        sizes="(max-width:768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => {
          if (imageSrc !== fallbackImage) setImageSrc(fallbackImage);
        }}
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17261a]/90 via-[#17261a]/18 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 sm:p-6">
        <span className="rounded-full border border-white/45 bg-white/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-brand-900 shadow-sm backdrop-blur-sm">
          {destination.region}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-brand-900 shadow-sm transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <h3 className="max-w-[18ch] font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{name}</h3>
        <p className="mt-3 max-w-[42ch] text-sm leading-6 text-white/90">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#fff0ce]">
          {locale === "fi" ? "Tutustu kohteeseen" : locale === "es" ? "Descubrir destino" : "Explore destination"}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
