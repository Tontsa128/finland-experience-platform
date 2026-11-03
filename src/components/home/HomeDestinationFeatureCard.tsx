import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type HomeDestinationFeatureCardProps = {
  href: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  imageBadge?: string;
  headingLevel?: "h2" | "h3";
  imageSize?: "standard" | "feature";
  imageCredit?: string;
  imageUsageNote?: string;
  imageSource?: string;
  imageSourceLabel?: string;
  priority?: boolean;
};

export function HomeDestinationFeatureCard({
  href,
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  actionLabel,
  imageBadge,
  headingLevel = "h3",
  imageSize = "standard",
  imageCredit,
  imageUsageNote,
  imageSource,
  imageSourceLabel,
  priority = false,
}: HomeDestinationFeatureCardProps) {
  const Heading = headingLevel;
  const imagePanelClassName = imageSize === "feature"
    ? "flex min-h-[320px] flex-col bg-[#e8eee7] sm:min-h-[420px]"
    : "flex min-h-[250px] flex-col bg-[#e8eee7] sm:min-h-[280px] md:min-h-[320px]";

  return (
    <article className="group grid h-full grid-cols-1 overflow-hidden rounded-[2rem] border border-[#e8e1d5] bg-white text-brand-950 shadow-[0_18px_50px_rgba(47,65,49,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(38,58,42,0.16)] focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <figure className={imagePanelClassName}>
        <Link
          href={href}
          aria-label={`${title} — ${actionLabel}`}
          className="group/image relative block min-h-[220px] flex-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-600"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 600px"
            className="object-cover transition duration-700 ease-out group-hover/image:scale-[1.04]"
          />
          {imageBadge ? (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-brand-950 shadow-sm backdrop-blur">
              {imageBadge}
            </span>
          ) : null}
        </Link>
        {imageCredit && imageUsageNote && imageSource ? (
          <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-stone-100 bg-white px-4 py-3 text-[10px] leading-4 text-slate-500 sm:px-5">
            <span>{imageCredit}</span>
            <span aria-hidden="true">·</span>
            <span>{imageUsageNote}</span>
            <a
              href={imageSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 underline underline-offset-2 transition hover:text-brand-950"
            >
              {imageSourceLabel || "Image source"}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </figcaption>
        ) : null}
      </figure>
      <div className="flex flex-col justify-center p-6 sm:p-7 lg:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-brand-700 sm:text-[11px]">{eyebrow}</p>
        <Heading className="mt-3 font-display text-2xl font-bold leading-tight text-brand-950 sm:text-3xl">{title}</Heading>
        <p className="mt-4 max-w-[48ch] text-sm leading-7 text-slate-600 sm:text-[15px]">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#dfe9df] px-5 py-3 text-sm font-bold text-brand-950 transition hover:bg-[#cddfce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
