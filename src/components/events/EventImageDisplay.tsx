"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  imageUrl: string | null;
  alt: string;
  locale: "fi" | "es" | "en";
};

const copy = {
  fi: {
    missing: "Järjestäjän tapahtumakuvaa ei saatu ladattua.",
    credit: "Järjestäjän kuva",
  },
  es: {
    missing: "No se pudo cargar la imagen del organizador.",
    credit: "Imagen del organizador",
  },
  en: {
    missing: "The organizer's event image could not be loaded.",
    credit: "Organizer image",
  },
};

export function EventImageDisplay({ imageUrl, alt, locale }: Props) {
  const [failed, setFailed] = useState(false);
  const text = copy[locale];

  if (!imageUrl || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt}. ${text.missing}`}
        className="mb-5 flex aspect-[16/9] items-center justify-center rounded-[1.25rem] bg-brand-50 px-6 text-center text-sm text-brand-700"
      >
        {text.missing}
      </div>
    );
  }

  return (
    <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-slate-100">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        unoptimized
        onError={() => setFailed(true)}
      />
      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-sm">
        {text.credit}
      </div>
    </div>
  );
}
