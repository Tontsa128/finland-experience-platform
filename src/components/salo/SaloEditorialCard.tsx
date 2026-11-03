import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";

type SaloEditorialCardProps = {
  href: string;
  image?: string | null;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel: string;
  imageCredit?: string;
  imageSource?: string;
};

export function SaloEditorialCard({
  href,
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  actionLabel,
  imageCredit,
  imageSource,
}: SaloEditorialCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl">
      <Link href={href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950">
          {image ? (
            <>
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/5 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/85">
              <Compass className="h-9 w-9 text-gold-300" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[.2em]">
                {eyebrow || "Salo"}
              </span>
            </div>
          )}
          {eyebrow && image ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-brand-950/55 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-sm">
              {eyebrow}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-xl font-bold leading-tight text-brand-950 transition group-hover:text-brand-700 sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-800">
            {actionLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
      {imageCredit && imageSource ? (
        <div className="mt-auto px-5 pb-4 sm:px-6">
          <a
            href={imageSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 underline underline-offset-2 transition hover:text-brand-800"
          >
            {imageCredit}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </article>
  );
}
