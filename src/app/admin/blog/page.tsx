"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MediaPicker from "@/components/admin/MediaPicker";
import { translateFinnishText } from "@/components/admin/AITranslationPanel";

type Locale = "fi" | "es" | "en";
type Translation = { title: string; excerpt: string; content: string; seoTitle: string; seoDescription: string };
type Post = {
  id: string;
  slug: string;
  status: "draft" | "published" | "archived";
  author_name?: string | null;
  published_at?: string | null;
  cover_media_id?: string | null;
  blog_post_translations?: Array<Translation & { locale: Locale; id?: string }>;
};
type Form = {
  id?: string;
  slug: string;
  status: "draft" | "published" | "archived";
  authorName: string;
  publishedAt: string;
  coverMediaId: string;
  translations: Record<Locale, Translation>;
};

const emptyTranslation = (): Translation => ({ title: "", excerpt: "", content: "", seoTitle: "", seoDescription: "" });
const emptyForm = (): Form => ({
  slug: "",
  status: "draft",
  authorName: "Finland Experience",
  publishedAt: "",
  coverMediaId: "",
  translations: { fi: emptyTranslation(), es: emptyTranslation(), en: emptyTranslation() },
});

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<Form>(emptyForm());
  const [mediaIds, setMediaIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/blog", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Blogia ei voitu ladata");
      setPosts(body.posts || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lataus epäonnistui");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === form.id),
    [posts, form.id],
  );

  function edit(post: Post) {
    const translations = {
      fi: emptyTranslation(),
      es: emptyTranslation(),
      en: emptyTranslation(),
    };
    for (const row of post.blog_post_translations || []) {
      translations[row.locale] = {
        title: row.title || "",
        excerpt: row.excerpt || "",
        content: row.content || "",
        seoTitle: (row as Translation & { seo_title?: string }).seo_title || (row as Translation).seoTitle || "",
        seoDescription: (row as Translation & { seo_description?: string }).seo_description || (row as Translation).seoDescription || "",
      };
    }
    setForm({
      id: post.id,
      slug: post.slug,
      status: post.status,
      authorName: post.author_name || "Finland Experience",
      publishedAt: post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : "",
      coverMediaId: post.cover_media_id || "",
      translations,
    });
    setMediaIds(post.cover_media_id ? [post.cover_media_id] : []);
    setSaved(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setTranslation(locale: Locale, key: keyof Translation, value: string) {
    setForm((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [locale]: { ...current.translations[locale], [key]: value },
      },
    }));
  }

  async function translateFromFinnish() {
    if (!form.translations.fi.title.trim() && !form.translations.fi.content.trim()) {
      setError("Kirjoita ensin vähintään otsikko tai sisältö suomeksi.");
      return;
    }
    setTranslating(true);
    setError("");
    try {
      const [title, excerpt, body, seoTitle, seoDescription] = await Promise.all([
        form.translations.fi.title ? translateFinnishText(form.translations.fi.title, "travel") : null,
        form.translations.fi.excerpt ? translateFinnishText(form.translations.fi.excerpt, "travel") : null,
        form.translations.fi.content ? translateFinnishText(form.translations.fi.content, "travel") : null,
        form.translations.fi.seoTitle ? translateFinnishText(form.translations.fi.seoTitle, "travel") : null,
        form.translations.fi.seoDescription ? translateFinnishText(form.translations.fi.seoDescription, "travel") : null,
      ]);

      setForm((current) => ({
        ...current,
        translations: {
          ...current.translations,
          en: {
            title: title?.english || current.translations.en.title,
            excerpt: excerpt?.english || current.translations.en.excerpt,
            content: body?.english || current.translations.en.content,
            seoTitle: seoTitle?.english || current.translations.en.seoTitle,
            seoDescription: seoDescription?.english || current.translations.en.seoDescription,
          },
          es: {
            title: title?.spanish || current.translations.es.title,
            excerpt: excerpt?.spanish || current.translations.es.excerpt,
            content: body?.spanish || current.translations.es.content,
            seoTitle: seoTitle?.spanish || current.translations.es.seoTitle,
            seoDescription: seoDescription?.spanish || current.translations.es.seoDescription,
          },
        },
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Käännös epäonnistui");
    } finally {
      setTranslating(false);
    }
  }

  async function save() {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      if (!form.slug.trim()) throw new Error("Slug puuttuu.");
      for (const locale of ["fi", "es", "en"] as Locale[]) {
        if (!form.translations[locale].title.trim()) throw new Error("Kaikilla kolmella kielellä pitää olla otsikko.");
      }

      const response = await fetch("/api/admin/blog", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          slug: form.slug,
          status: form.status,
          authorName: form.authorName,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
          coverMediaId: mediaIds[0] || form.coverMediaId || null,
          translations: form.translations,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Tallennus epäonnistui");
      await load();
      setForm(emptyForm());
      setMediaIds([]);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tallennus epäonnistui");
    } finally {
      setSaving(false);
    }
  }

  async function remove(post: Post) {
    if (!window.confirm("Poistetaanko tämä artikkeli?")) return;
    setError("");
    const response = await fetch("/api/admin/blog?id=" + encodeURIComponent(post.id), { method: "DELETE" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(body.error || "Poisto epäonnistui");
      return;
    }
    if (form.id === post.id) {
      setForm(emptyForm());
      setMediaIds([]);
    }
    await load();
  }

  const field = (locale: Locale, key: keyof Translation, label: string, rows = 1) => (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      {rows > 1 ? (
        <textarea value={form.translations[locale][key]} onChange={(e) => setTranslation(locale, key, e.target.value)} rows={rows} className="rounded-xl border border-slate-200 px-4 py-3 font-normal leading-6 outline-none focus:border-emerald-500" />
      ) : (
        <input value={form.translations[locale][key]} onChange={(e) => setTranslation(locale, key, e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-emerald-500" />
      )}
    </label>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">CMS / Blog</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Matkaoppaat ja artikkelit</h1>
            <p className="mt-2 max-w-3xl text-slate-500">Kirjoita kerran suomeksi, käännä AI-avusteisesti englanniksi ja espanjaksi, tarkista ja julkaise.</p>
          </div>
          <Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>Slug</span><input value={form.slug} onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") }))} placeholder="mathildedal-guide" className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /></label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>Tekijä</span><input value={form.authorName} onChange={(e) => setForm((s) => ({ ...s, authorName: e.target.value }))} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /></label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>Tila</span><select value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as Form["status"] }))} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"><option value="draft">Luonnos</option><option value="published">Julkaistu</option><option value="archived">Arkistoitu</option></select></label>
          </div>

          <div className="mt-5">
            <label className="grid gap-2 text-sm font-semibold text-slate-700"><span>Julkaisuaika</span><input type="datetime-local" value={form.publishedAt} onChange={(e) => setForm((s) => ({ ...s, publishedAt: e.target.value }))} className="max-w-sm rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" /></label>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-800">Kansikuva</p>
            <p className="mt-1 text-xs text-slate-500">Valitse yksi kuva kuvapankista.</p>
            <div className="mt-4"><MediaPicker value={mediaIds} onChange={(ids: string[]) => setMediaIds(ids.slice(-1))} /></div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="font-semibold text-slate-900">AI-käännös</p><p className="mt-1 text-sm text-slate-600">Suomenkielinen sisältö on lähdeteksti. Tarkista aina käännökset ennen julkaisua.</p></div>
              <button type="button" onClick={translateFromFinnish} disabled={translating} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{translating ? "Käännetään..." : "Käännä EN + ES"}</button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {([
              ["fi", "Suomi"],
              ["es", "Español"],
              ["en", "English"],
            ] as const).map(([locale, label]) => (
              <section key={locale} className="rounded-2xl border border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-950">{label}</h2>
                <div className="mt-4 grid gap-4">
                  {field(locale, "title", "Otsikko")}
                  {field(locale, "excerpt", "Ingressi", 4)}
                  {field(locale, "content", "Sisältö", 14)}
                  {field(locale, "seoTitle", "SEO-otsikko")}
                  {field(locale, "seoDescription", "SEO-kuvaus", 3)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white disabled:opacity-50">{saving ? "Tallennetaan..." : form.id ? "Tallenna muutokset" : "Luo artikkeli"}</button>
            {form.id && <button type="button" onClick={() => { setForm(emptyForm()); setMediaIds([]); setError(""); }} className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700">Uusi artikkeli</button>}
            {saved && <span className="text-sm font-semibold text-emerald-700">Tallennettu.</span>}
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Artikkelit</h2>
          {loading ? <p className="mt-4 text-sm text-slate-500">Ladataan…</p> : (
            <div className="mt-5 divide-y divide-slate-100">
              {posts.map((post) => (
                <div key={post.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950">{post.blog_post_translations?.find((item) => item.locale === "fi")?.title || post.slug}</p>
                    <p className="mt-1 text-xs text-slate-500">/{post.slug} · {post.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => edit(post)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold">Muokkaa</button>
                    <button type="button" onClick={() => remove(post)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">Poista</button>
                  </div>
                </div>
              ))}
              {!posts.length && <p className="py-5 text-sm text-slate-500">Ei vielä artikkeleita.</p>}
            </div>
          )}
          {selectedPost && <p className="mt-4 text-xs text-slate-400">Muokkaat: {selectedPost.slug}</p>}
        </section>
      </div>
    </main>
  );
}
