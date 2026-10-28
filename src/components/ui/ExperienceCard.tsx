"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Experience, Locale } from "@/types";
import { photoLibrary } from "@/lib/photo-library";
import { formatPrice } from "@/lib/utils";

export function ExperienceCard({ experience, index = 0 }: { experience: Experience; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const fallbackImage = experience.tags?.some((tag) => /sauna|smoke/i.test(tag)) ? photoLibrary.saunaTraditionalSmoke : photoLibrary.teijoNationalPark;
  const [imageSrc, setImageSrc] = useState(experience.images?.[0] || fallbackImage);

  return (
    <Link href={`/${locale}/experiences/${experience.slug}`} className="group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={imageSrc} alt={experience.name[locale as keyof typeof experience.name] || experience.name.en} fill priority={index < 2} sizes="(max-width:768px) 100vw,33vw" onError={() => { if (imageSrc !== fallbackImage) setImageSrc(fallbackImage); }} className="object-cover transition duration-700 ease-out group-hover:scale-110" />
      </div>
      <div className="p-5">
        <div className="mb-1 text-xs uppercase tracking-wider text-brand-600">{experience.region}</div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{experience.name[locale as keyof typeof experience.name] || experience.name.en}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{experience.shortDescription[locale as keyof typeof experience.shortDescription] || experience.shortDescription.en}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-brand-900">{experience.price > 0 ? formatPrice(experience.price, locale as Locale) : locale === "fi" ? "Tarkista hinta" : locale === "es" ? "Consultar precio" : "Check price"}</span>
          <span className="text-slate-500">{experience.duration} · {t("perPerson")}</span>
        </div>
      </div>
    </Link>
  );
}
