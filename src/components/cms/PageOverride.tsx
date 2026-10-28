import { supabaseAdmin } from "@/lib/supabase";
import type { Locale } from "@/types";

type Block = { id?: string; type?: string; visible?: boolean; imageUrl?: string; imageAlt?: string; layout?: string; items?: Array<{url:string;alt?:string}>; content?: Record<string, Record<string,string>> };

/** Lets editors replace the existing landing pages through the page builder. */
export async function getPageOverride(locale: Locale, slug: string) {
  try {
    const { data, error } = await supabaseAdmin.from("site_pages").select("title,content,blocks")
      .eq("locale", locale).eq("slug", slug).eq("published", true)
      .or(`publish_at.is.null,publish_at.lte.${new Date().toISOString()}`).maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export function PageOverride({ page, locale }: { page: NonNullable<Awaited<ReturnType<typeof getPageOverride>>>; locale: Locale }) {
  const blocks = Array.isArray(page.blocks) ? (page.blocks as Block[]).filter((block) => block?.visible !== false) : [];
  const copy = (block: Block) => block.content?.[locale] || block.content?.fi || {};
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
