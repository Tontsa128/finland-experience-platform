import { blogPosts as fallbackPosts, getLocalized } from "@/lib/data";
import { getPublishedBlogPosts } from "@/lib/public-content";
import type { Locale } from "@/types";

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const cmsPosts = await getPublishedBlogPosts();
  const posts = cmsPosts.length ? cmsPosts : fallbackPosts;

  return (
    <div className="container-narrow py-16">
      <h1 className="section-title">Blog</h1>
      <p className="section-subtitle mt-3 mb-10">
        {locale === "fi" ? "Matkaoppaat, vinkit ja inspiraatio Suomen matkailuun." : locale === "es" ? "Guías, consejos e inspiración para viajar por Finlandia." : "Guides, tips and inspiration for travelling in Finland."}
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border bg-white shadow-soft">
            {post.image ? <img src={post.image} alt={getLocalized(post.title, locale)} className="aspect-[16/9] w-full object-cover" /> : null}
            <div className="p-6">
              <div className="text-xs text-brand-600">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(locale === "fi" ? "fi-FI" : locale === "es" ? "es-ES" : "en-IE") : ""}</div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-brand-900">{getLocalized(post.title, locale)}</h2>
              <p className="mt-3 text-slate-600">{getLocalized(post.excerpt, locale)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
