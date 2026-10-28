import { notFound } from "next/navigation";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ locale?: string }> };

export default async function AdminPagePreview({ params, searchParams }: Props) {
  const admin = await getAdminContext();
  if (!admin) notFound();
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const locale = ["fi", "en", "es"].includes(query.locale || "") ? query.locale! : "fi";
  const { data } = await supabaseAdmin.from("site_pages").select("title,content,blocks,published").eq("slug", slug).eq("locale", locale).maybeSingle();
  if (!data) notFound();
  const blocks = Array.isArray(data.blocks) ? data.blocks.filter((block: any) => block?.visible !== false) : [];
  const copy = (block: any) => block?.content?.[locale] || block?.content?.fi || {};

  return <main className="min-h-screen bg-white"><div className="sticky top-0 z-50 flex items-center justify-between bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-950"><span>Esikatselu · {locale.toUpperCase()} · {data.published ? "Julkaistu" : "Luonnos"}</span><a href={`/admin/pages`} className="underline">Takaisin sivueditoriin</a></div><article>
    {blocks.length===0?<div className="mx-auto max-w-4xl px-4 py-10 sm:py-16"><h1 className="text-4xl font-bold sm:text-6xl">{data.title}</h1><div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{data.content||""}</div></div>:blocks.map((block:any)=><section key={block.id} className={block.type==="spacer"?"h-16 sm:h-24":"px-4 py-12 sm:px-8"}>
      {block.type==="hero"&&<div className="relative mx-auto flex min-h-[45vh] max-w-7xl items-end overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-14">{block.imageUrl&&<img src={block.imageUrl} alt={block.imageAlt||""} className="absolute inset-0 h-full w-full object-cover opacity-60"/>}<div className="relative"><p className="text-sm uppercase tracking-widest">{copy(block).eyebrow}</p><h2 className="mt-3 text-4xl font-bold sm:text-6xl">{copy(block).title}</h2><p className="mt-5 max-w-2xl text-lg">{copy(block).text}</p></div></div>}
      {block.type==="text"&&<div className="mx-auto max-w-4xl"><p className="text-sm uppercase tracking-widest text-emerald-700">{copy(block).eyebrow}</p><h2 className="mt-3 text-3xl font-bold sm:text-5xl">{copy(block).title}</h2><p className="mt-5 whitespace-pre-wrap text-lg leading-8 text-slate-700">{copy(block).text}</p></div>}
      {block.type==="image"&&block.imageUrl&&<img src={block.imageUrl} alt={block.imageAlt||""} className="mx-auto max-h-[70vh] w-full max-w-7xl rounded-3xl object-cover"/>}
      {block.type==="image_text"&&<div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">{block.imageUrl&&<img src={block.imageUrl} alt={block.imageAlt||""} className="h-80 w-full rounded-3xl object-cover"/>}<div><p className="text-sm uppercase tracking-widest text-emerald-700">{copy(block).eyebrow}</p><h2 className="mt-3 text-3xl font-bold sm:text-5xl">{copy(block).title}</h2><p className="mt-5 whitespace-pre-wrap text-lg leading-8">{copy(block).text}</p></div></div>}
      {block.type==="gallery"&&<div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-3">{(block.items||[]).map((item:any,index:number)=><img key={index} src={item.url} alt={item.alt||""} className="aspect-[4/3] w-full rounded-2xl object-cover"/>)}</div>}
      {block.type==="cta"&&<div className="mx-auto max-w-6xl rounded-3xl bg-slate-950 p-8 text-white sm:p-12"><p className="text-sm uppercase tracking-widest text-emerald-300">{copy(block).eyebrow}</p><h2 className="mt-3 text-3xl font-bold sm:text-5xl">{copy(block).title}</h2><p className="mt-5 text-lg">{copy(block).text}</p>{copy(block).buttonLabel&&<span className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-slate-950">{copy(block).buttonLabel}</span>}</div>}
    </section>)}
  </article></main>;
}
