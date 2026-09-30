import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getPublishedBlogPosts } from "@/lib/public-content";
import { blogPosts as fallbackPosts, getLocalized } from "@/lib/data";
import { allowDemoFallback } from "@/lib/utils";
import { localizedUrl } from "@/lib/seo";
import type { Locale } from "@/types";

async function getPost(slug: string) {
  const posts = await getPublishedBlogPosts();
  const cmsPost = posts.find((post) => post.slug === slug);
  if (cmsPost) return cmsPost;
  if (allowDemoFallback) return fallbackPosts.find((post) => post.slug === slug) ?? null;
  return null;
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: getLocalized(post.title, locale),
    description: getLocalized(post.excerpt, locale),
    alternates: { canonical: localizedUrl(locale, "blog/" + post.slug) },
    openGraph: {
      title: getLocalized(post.title, locale),
      description: getLocalized(post.excerpt, locale),
      type: "article",
      url: localizedUrl(locale, "blog/" + post.slug),
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: getLocalized(post.title, locale) }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const post = await getPost(params.slug);
  if (!post) notFound();

  const title = getLocalized(post.title, locale);
  const excerpt = getLocalized(post.excerpt, locale);
  const content = getLocalized(post.content, locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.publishedAt || undefined,
    author: { "@type": "Person", name: post.author || "Finland Experience" },
    mainEntityOfPage: localizedUrl(locale, "blog/" + post.slug),
  };

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article>
        <section className="relative min-h-[60vh] overflow-hidden bg-brand-950 text-white">
          {post.image ? <Image src={post.image} alt={title} fill priority sizes="100vw" className="object-cover opacity-60" /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
          <div className="container-narrow relative flex min-h-[60vh] items-end py-16 sm:py-24">
            <div className="max-w-4xl">
              <Link href={"/" + locale + "/blog"} className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft className="h-4 w-4" /> {locale === "fi" ? "Takaisin blogiin" : locale === "es" ? "Volver al blog" : "Back to the blog"}</Link>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[.98] sm:text-7xl">{title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">{excerpt}</p>
              {post.publishedAt ? <p className="mt-5 text-sm font-semibold text-gold-300">{new Date(post.publishedAt).toLocaleDateString(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-GB")}</p> : null}
            </div>
          </div>
        </section>

        <section className="container-narrow py-16 sm:py-24">
          <div className="mx-auto max-w-3xl whitespace-pre-wrap text-lg leading-8 text-slate-700">{content}</div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] bg-brand-50 p-7">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{locale === "fi" ? "Jatka tutkimista" : locale === "es" ? "Sigue explorando" : "Keep exploring"}</p>
            <Link href={"/" + locale + "/destinations"} className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-bold text-brand-950">{locale === "fi" ? "Löydä oma Suomesi" : locale === "es" ? "Descubre tu Finlandia" : "Find Your Finland"} <ArrowRight className="h-5 w-5" /></Link>
          </div>
        </section>
      </article>
    </main>
  );
}
