import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";
import { localizedUrl } from "@/lib/seo";
import { isSafeUrlOrPath, locales } from "@/lib/utils";
import { getPublishableImageUrl } from "@/lib/media-safety";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

type LocalizedCopy = {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

function imageRightsText(locale: Locale) {
  return locale === "fi"
    ? "Kuva näytetään, kun paikallisuus ja käyttöoikeus on vahvistettu."
    : locale === "es"
      ? "La imagen se mostrará cuando se verifiquen la ubicación y los derechos de uso."
      : "The image will appear once the location and usage rights have been confirmed.";
}

function ImageRightsPlaceholder({ locale, label }: { locale: Locale; label?: string }) {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-slate-50 to-brand-100 px-6 py-10 text-center text-brand-700">
      <MapPin className="h-10 w-10" />
      <p className="mt-4 max-w-xl text-sm font-semibold leading-6">{label || imageRightsText(locale)}</p>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const { data } = await supabaseAdmin
    .from("site_pages")
    .select("title,seo_title,seo_description,canonical_url,noindex")
    .eq("locale", locale)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (!data) return {};
  const canonical = data.canonical_url || localizedUrl(locale, "pages/" + slug);
  return {
    title: data.seo_title || data.title,
    description: data.seo_description || undefined,
    alternates: { canonical },
    robots: data.noindex ? "noindex, nofollow" : "index, follow",
  };
}

export default async function CustomPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  const { data, error } = await supabaseAdmin
    .from("site_pages")
    .select("title,content,blocks,canonical_url")
    .eq("locale", locale)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) notFound();
  const blocks = Array.isArray(data.blocks) ? data.blocks.filter((block: any) => block?.visible !== false) : [];
  const copy = (block: any): LocalizedCopy => block?.content?.[locale] || block?.content?.fi || {};

  return (
    <main className="min-h-[70vh] bg-white">
      <article>
        {blocks.length === 0 ? (
          <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
            <h1 className="font-display text-4xl font-bold text-brand-900 sm:text-6xl">{data.title}</h1>
            <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{data.content || ""}</div>
          </div>
        ) : blocks.map((block: any) => {
          const blockCopy = copy(block);
          const blockImage = getPublishableImageUrl(block.imageUrl, block.rightsConfirmed);
          const blockAlt = String(block.imageAlt || blockCopy.title || data.title || "").trim();
          const galleryItems = Array.isArray(block.items)
            ? block.items.map((item: any) => ({ ...item, safeUrl: getPublishableImageUrl(item?.url, item?.rightsConfirmed) })).filter((item: any) => item.safeUrl)
            : [];

          return (
            <section key={block.id} className={block.type === "spacer" ? "h-16 sm:h-24" : "relative overflow-hidden"}>
              {block.type === "hero" ? (
                <div className="relative flex min-h-[55svh] items-end">
                  <div className="absolute inset-0">
                    {blockImage ? (
                      <Image src={blockImage} alt={blockAlt} fill priority sizes="100vw" unoptimized className="object-cover" />
                    ) : (
                      <ImageRightsPlaceholder locale={locale} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10" />
                  <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-white sm:px-8">
                    <p className="text-xs font-bold uppercase tracking-[.2em]">{blockCopy.eyebrow}</p>
                    <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{blockCopy.title || data.title}</h1>
                    <p className="mt-5 max-w-2xl text-lg text-white/90">{blockCopy.text}</p>
                  </div>
                </div>
              ) : null}

              {block.type === "text" ? (
                <div className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{blockCopy.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-5xl">{blockCopy.title}</h2>
                  <div className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-700">{blockCopy.text}</div>
                </div>
              ) : null}

              {block.type === "image" ? (
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
                  <div className="relative aspect-[16/9] max-h-[760px] overflow-hidden rounded-3xl bg-brand-50">
                    {blockImage ? (
                      <Image src={blockImage} alt={blockAlt} fill sizes="(max-width: 768px) 100vw, 90vw" unoptimized className="object-cover" />
                    ) : (
                      <ImageRightsPlaceholder locale={locale} />
                    )}
                  </div>
                </div>
              ) : null}

              {block.type === "image_text" ? (
                <div className={"mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-8 lg:grid-cols-2 " + (block.layout === "image-right" ? "lg:[&>div:first-child]:order-2" : "")}>
                  <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-brand-50 sm:h-[360px]">
                    {blockImage ? (
                      <Image src={blockImage} alt={blockAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" unoptimized className="object-cover" />
                    ) : (
                      <ImageRightsPlaceholder locale={locale} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{blockCopy.eyebrow}</p>
                    <h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-5xl">{blockCopy.title}</h2>
                    <p className="mt-5 whitespace-pre-wrap text-lg leading-8 text-slate-700">{blockCopy.text}</p>
                  </div>
                </div>
              ) : null}

              {block.type === "gallery" ? (
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
                  {galleryItems.length ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {galleryItems.map((item: any, index: number) => (
                        <div key={item.id || index} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-50">
                          <Image src={item.safeUrl} alt={String(item.alt || blockCopy.title || data.title || "")} fill sizes="(max-width: 640px) 50vw, 33vw" unoptimized className="object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ImageRightsPlaceholder locale={locale} label={imageRightsText(locale)} />
                  )}
                </div>
              ) : null}

              {block.type === "cta" ? (
                <div className="mx-auto my-8 max-w-6xl rounded-3xl bg-slate-950 px-6 py-12 text-white sm:px-12">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">{blockCopy.eyebrow}</p>
                  <h2 className="mt-2 text-3xl font-bold sm:text-5xl">{blockCopy.title}</h2>
                  <p className="mt-4 max-w-2xl text-lg text-white/75">{blockCopy.text}</p>
                  {blockCopy.buttonLabel && isSafeUrlOrPath(String(blockCopy.buttonUrl || "")) ? (
                    <a href={blockCopy.buttonUrl} className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-bold text-slate-950">{blockCopy.buttonLabel}</a>
                  ) : null}
                </div>
              ) : null}
            </section>
          );
        })}
      </article>
    </main>
  );
}
