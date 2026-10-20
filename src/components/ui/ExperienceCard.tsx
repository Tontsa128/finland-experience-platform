"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Experience, Locale } from "@/types";
import { formatPrice } from "@/lib/utils";

function experienceImagePlaceholder(locale: string) {
  return locale === "fi"
    ? "Elämyskuva lisätään, kun käyttöoikeus ja kohde on vahvistettu"
    : locale === "es"
      ? "La imagen se añadirá cuando se verifiquen el lugar y los derechos de uso"
      : "An experience photo will be added once the place and image rights are confirmed";
}

export function ExperienceCard({ experience, index = 0 }: { experience: Experience; index?: number }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const image = experience.images?.[0];
  const price = experience.verified && experience.price > 0
    ? formatPrice(experience.price, locale as Locale)
    : locale === "fi" ? "Tarkista palveluntarjoajalta" : locale === "es" ? "Consultar al proveedor" : "Check with provider";

  return (
    <Link
      href={`/${locale}/experiences/${experience.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-brand-50">
        {image ? (
          <Image
            src={image}
            alt={experience.name[locale as keyof typeof experience.name]}
            fill
            priority={index < 2}
            sizes="(max-width:768px) 100vw,33vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex max-w-xs flex-col items-center px-6 text-center text-brand-700">
            <MapPin className="h-8 w-8" />
            <p className="mt-3 text-xs font-semibold leading-5">{experienceImagePlaceholder(locale)}</p>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1 text-xs uppercase tracking-wider text-brand-600">{experience.region}</div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{experience.name[locale as keyof typeof experience.name]}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{experience.shortDescription[locale as keyof typeof experience.shortDescription]}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-brand-900">{price}</span>
          <span className="text-right text-slate-500">{experience.duration} · {t("perPerson")}</span>
        </div>
        <div className="mt-3 text-xs text-slate-400">
          {locale === "fi" ? "Varaus suoraan palveluntarjoajalta" : locale === "es" ? "Reserva directa con el proveedor" : "Book directly with the provider"}
        </div>
      </div>
    </Link>
  );
}
