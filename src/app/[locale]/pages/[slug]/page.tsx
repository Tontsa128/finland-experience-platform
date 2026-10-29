import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { PageOverride, getPageOverride } from "@/components/cms/PageOverride";
import { localizedUrl } from "@/lib/seo";
import { locales } from "@/lib/utils";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { locale: rawLocale, slug } = await params;
 const locale = rawLocale as Locale;
 if (!locales.includes(locale)) return {};
 const {data}=await supabaseAdmin.from("site_pages").select("title,seo_title,seo_description,canonical_url,noindex").eq("locale",locale).eq("slug",slug).eq("published",true).or(`publish_at.is.null,publish_at.lte.${new Date().toISOString()}`).maybeSingle();
 if(!data)return {};
 const canonical = data.canonical_url || localizedUrl(locale, "pages/" + slug);
 return {
   title:data.seo_title||data.title,
   description:data.seo_description||undefined,
   alternates:{canonical},
   robots:data.noindex?"noindex, nofollow":"index, follow"
 };
}

export default async function CustomPage({ params }: Props) {
 const { locale: rawLocale, slug } = await params;
 if (!locales.includes(rawLocale)) notFound();
 const locale = rawLocale as Locale;
 const page = await getPageOverride(locale, slug);
 if (!page) notFound();
 return <PageOverride page={page} locale={locale} />;
}
