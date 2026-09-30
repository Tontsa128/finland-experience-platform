import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

const CONTENT_ROLES = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"];

type Translation = {
  title?: unknown;
  excerpt?: unknown;
  content?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function normalizeTranslations(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }
  const source = input as Record<string, Translation>;
  const result: Record<string, Record<string, string>> = {};
  for (const locale of ["fi", "es", "en"] as const) {
    const row = source[locale];
    if (!row || typeof row !== "object") return null;
    result[locale] = {
      title: clean(row.title, 200),
      excerpt: clean(row.excerpt, 500),
      content: clean(row.content, 15000),
      seoTitle: clean(row.seoTitle, 200),
      seoDescription: clean(row.seoDescription, 320),
    };
  }
  if (!result.fi.title || !result.es.title || !result.en.title) return null;
  return result;
}

function parseStatus(value: unknown) {
  return value === "published" || value === "archived" ? value : "draft";
}

export async function GET() {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CONTENT_ROLES.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("id,slug,status,author_name,published_at,cover_media_id,created_at,updated_at,blog_post_translations(id,locale,title,excerpt,content,seo_title,seo_description)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: NextRequest) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CONTENT_ROLES.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await request.json();
    const slug = clean(body.slug, 120).toLowerCase();
    if (!validSlug(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    const translations = normalizeTranslations(body.translations);
    if (!translations) return NextResponse.json({ error: "FI, ES and EN titles are required" }, { status: 400 });

    const status = parseStatus(body.status);
    const authorName = clean(body.authorName, 120) || "Finland Experience";
    const coverMediaId = typeof body.coverMediaId === "string" && body.coverMediaId ? body.coverMediaId : null;
    const publishedAt = status === "published"
      ? (typeof body.publishedAt === "string" && !Number.isNaN(Date.parse(body.publishedAt)) ? body.publishedAt : new Date().toISOString())
      : null;

    const { data: post, error: postError } = await supabaseAdmin
      .from("blog_posts")
      .insert({ slug, status, author_name: authorName, cover_media_id: coverMediaId, published_at: publishedAt })
      .select("id,slug,status,author_name,published_at,cover_media_id,created_at,updated_at")
      .single();

    if (postError) return NextResponse.json({ error: postError.message }, { status: 400 });

    const rows = Object.entries(translations).map(([locale, value]) => ({
      post_id: post.id,
      locale,
      title: value.title,
      excerpt: value.excerpt || null,
      content: value.content || null,
      seo_title: value.seoTitle || null,
      seo_description: value.seoDescription || null,
    }));

    const { error: translationError } = await supabaseAdmin.from("blog_post_translations").insert(rows);
    if (translationError) {
      await supabaseAdmin.from("blog_posts").delete().eq("id", post.id);
      return NextResponse.json({ error: translationError.message }, { status: 400 });
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CONTENT_ROLES.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const body = await request.json();
    if (!body?.id || typeof body.id !== "string") return NextResponse.json({ error: "id is required" }, { status: 400 });

    const slug = clean(body.slug, 120).toLowerCase();
    if (!validSlug(slug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    const translations = normalizeTranslations(body.translations);
    if (!translations) return NextResponse.json({ error: "FI, ES and EN titles are required" }, { status: 400 });

    const status = parseStatus(body.status);
    const patch = {
      slug,
      status,
      author_name: clean(body.authorName, 120) || "Finland Experience",
      cover_media_id: typeof body.coverMediaId === "string" && body.coverMediaId ? body.coverMediaId : null,
      published_at: status === "published"
        ? (typeof body.publishedAt === "string" && !Number.isNaN(Date.parse(body.publishedAt)) ? body.publishedAt : new Date().toISOString())
        : null,
      updated_at: new Date().toISOString(),
    };

    const { data: post, error: postError } = await supabaseAdmin
      .from("blog_posts")
      .update(patch)
      .eq("id", body.id)
      .select("id,slug,status,author_name,published_at,cover_media_id,created_at,updated_at")
      .single();

    if (postError) return NextResponse.json({ error: postError.message }, { status: 400 });

    const { error: deleteError } = await supabaseAdmin.from("blog_post_translations").delete().eq("post_id", body.id);
    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 400 });

    const rows = Object.entries(translations).map(([locale, value]) => ({
      post_id: body.id,
      locale,
      title: value.title,
      excerpt: value.excerpt || null,
      content: value.content || null,
      seo_title: value.seoTitle || null,
      seo_description: value.seoDescription || null,
    }));

    const { error: translationError } = await supabaseAdmin.from("blog_post_translations").insert(rows);
    if (translationError) return NextResponse.json({ error: translationError.message }, { status: 400 });

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CONTENT_ROLES.includes(admin.profile.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
