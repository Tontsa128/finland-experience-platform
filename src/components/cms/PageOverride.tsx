import { supabaseAdmin } from "@/lib/supabase";
import type { Locale } from "@/types";

type LocalizedCopy = Partial<Record<Locale, Record<string, string>>>;
type Block = {
  id?: string;
  type?: string;
  visible?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  layout?: string;
  items?: Array<{ url: string; alt?: string }>;
  content?: LocalizedCopy;
};
type PageRecord = { title?: string | null; content?: string | null; blocks?: unknown };

const copyFields = ["eyebrow", "title", "text"] as const;
type CopyField = (typeof copyFields)[number];

function normalize(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function looksLikeFinnishFallback(candidate: string, finnish: string, field: CopyField): boolean {
  if (!candidate || !finnish || normalize(candidate) !== normalize(finnish)) return false;
  const words = candidate.trim().split(/\s+/).filter(Boolean).length;
  // Keep legitimate names and short labels such as "Sauna" or "Mathildedal",
  // but reject whole copied headings and descriptions.
  return field === "text"
    ? candidate.trim().length >= 35
    : field === "title"
      ? words >= 4 || candidate.trim().length >= 36
      : words >= 6 || candidate.trim().length >= 55;
}

function sameMeaningfulPageText(candidate: unknown, finnish: unknown, field: "title" | "content"): boolean {
  if (!hasText(candidate) || !hasText(finnish) || normalize(candidate) !== normalize(finnish)) return false;
  const words = candidate.trim().split(/\s+/).filter(Boolean).length;
  return field === "content"
    ? candidate.trim().length >= 45
    : words >= 4 || candidate.trim().length >= 36;
}

function localizedPageIsComplete(page: PageRecord, finnishPage: PageRecord | null, locale: Locale): boolean {
  if (!hasText(page.title) && !hasText(page.content) && !Array.isArray(page.blocks)) return false;

  if (locale !== "fi" && finnishPage) {
    if (sameMeaningfulPageText(page.title, finnishPage.title, "title")) return false;
    if (sameMeaningfulPageText(page.content, finnishPage.content, "content")) return false;
  }

  const blocks = Array.isArray(page.blocks) ? (page.blocks as Block[]).filter((block) => block?.visible !== false) : [];
  if (blocks.length === 0) return hasText(page.title) || hasText(page.content);

  const finnishBlocks = Array.isArray(finnishPage?.blocks)
    ? (finnishPage.blocks as Block[]).filter((block) => block?.visible !== false)
    : blocks;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (!block || block.type === "spacer" || block.type === "image" || block.type === "gallery") continue;

    const localizedCopy = block.content?.[locale] ?? {};
    const matchingFinnishBlock =
      (block.id ? finnishBlocks.find((item) => item.id === block.id) : undefined) ??
      finnishBlocks[index];
    const finnishCopy = block.content?.fi ?? matchingFinnishBlock?.content?.fi ?? {};
    const localizedFields = copyFields.filter((field) => hasText(localizedCopy[field]));
    const finnishFields = copyFields.filter((field) => hasText(finnishCopy[field]));

    // A text-bearing block with no copy for the selected language is not safe
    // to use as a CMS override. Let the route render its curated translation.
    if (finnishFields.length > 0 && localizedFields.length === 0) return false;
    if (localizedFields.length === 0 && finnishFields.length === 0) return false;

    for (const field of copyFields) {
      const localizedValue = localizedCopy[field];
      const finnishValue = finnishCopy[field];
      if (hasText(finnishValue) && !hasText(localizedValue)) return false;
      if (
        locale !== "fi" &&
        hasText(localizedValue) &&
        hasText(finnishValue) &&
        looksLikeFinnishFallback(localizedValue, finnishValue, field)
      ) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Lets editors replace existing landing pages through the page builder.
 * Non-Finnish visitors must never receive Finnish block content as a fallback.
 * An incomplete CMS translation returns null so the route can render its
 * built-in localized page instead.
 */
export async function getPageOverride(locale: Locale, slug: string) {
  try {
    const publishedAt = new Date().toISOString();
    const loadPage = (pageLocale: Locale) =>
      supabaseAdmin
        .from("site_pages")
        .select("title,content,blocks")
        .eq("locale", pageLocale)
        .eq("slug", slug)
        .eq("published", true)
        .or(`publish_at.is.null,publish_at.lte.${publishedAt}`)
        .maybeSingle();

    const [localizedResult, finnishResult] = await Promise.all([
      loadPage(locale),
      locale === "fi" ? Promise.resolve({ data: null, error: null }) : loadPage("fi"),
    ]);

    if (localizedResult.error || !localizedResult.data) return null;
    const page = localizedResult.data as PageRecord;
    const finnishPage = (finnishResult.data as PageRecord | null) ?? null;
    if (!localizedPageIsComplete(page, finnishPage, locale)) return null;
    return page;
  } catch {
    return null;
  }
}

export function PageOverride({ page, locale }: { page: NonNullable<Awaited<ReturnType<typeof getPageOverride>>>; locale: Locale }) {
  const blocks = Array.isArray(page.blocks) ? (page.blocks as Block[]).filter((block) => block?.visible !== false) : [];
  const copy = (block: Block) => block.content?.[locale] || {};
  return <main className="min-h-[70vh] bg-white"><article>
    {blocks.length === 0 ? <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16"><h1 className="font-display text-4xl font-bold text-brand-900 sm:text-6xl">{page.title}</h1><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{page.content || ""}</div></div> : blocks.map((block, index) => {
      const text = copy(block);
      if (block.type === "spacer") return <div key={block.id || index} className="h-16 sm:h-24" />;
      if (block.type === "hero") return <section key={block.id || index} className="relative flex min-h-[55svh] items-end overflow-hidden bg-brand-950"><img src={block.imageUrl} alt={block.imageAlt || ""} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/10"/><div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-white sm:px-8"><p className="text-xs font-bold uppercase tracking-[.2em]">{text.eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-6xl">{text.title || page.title}</h1><p className="mt-5 max-w-2xl text-lg text-white/90">{text.text}</p></div></section>;
      if (block.type === "image") return <div key={block.id || index} className="mx-auto max-w-7xl px-4 py-8 sm:px-8"><img src={block.imageUrl} alt={block.imageAlt || ""} className="max-h-[760px] w-full rounded-3xl object-cover"/></div>;
      if (block.type === "gallery") return <div key={block.id || index} className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-10 sm:grid-cols-3 sm:px-8">{(block.items || []).map((item, i) => <img key={i} src={item.url} alt={item.alt || ""} className="aspect-[4/3] w-full rounded-2xl object-cover"/>)}</div>;
      return <section key={block.id || index} className="mx-auto max-w-4xl px-4 py-12 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{text.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-5xl">{text.title}</h2><div className="mt-6 whitespace-pre-wrap text-lg leading-8 text-slate-700">{text.text}</div></section>;
    })}
  </article></main>;
}
