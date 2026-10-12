import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
import { isSafeUrlOrPath } from "@/lib/utils";
import { sanitizeImageUrl } from "@/lib/media-safety";

export const dynamic = "force-dynamic";

const locales = ["fi", "en", "es"] as const;

function guard() {
  return getAdminContext().then((admin) =>
    admin && ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "EDITOR"].includes(admin.profile.role)
      ? admin
      : null,
  );
}

function clean(value: unknown) {
  if (!Array.isArray(value)) return [];

  const rows = value
    .slice(0, 30)
    .map((row: any, index: number) => ({
      id: String(row?.id || crypto.randomUUID()),
      imageUrl: sanitizeImageUrl(row?.imageUrl),
      credit: String(row?.credit || "").trim().slice(0, 300),
      creditUrl: safeHttpsUrlOrEmpty(row?.creditUrl).slice(0, 500),
      rightsConfirmed: row?.rightsConfirmed === true,
      href: isSafeUrlOrPath(String(row?.href || "/destinations"))
        ? String(row?.href || "/destinations")
        : "/destinations",
      external: Boolean(row?.external),
      sortOrder: index,
      durationMs: Math.max(1500, Math.min(20000, Number(row?.durationMs || 3000))),
      enabled: row?.enabled !== false,
      copy: Object.fromEntries(
        locales.map((locale) => [
          locale,
          {
            eyebrow: String(row?.copy?.[locale]?.eyebrow || "").slice(0, 300),
            title: String(row?.copy?.[locale]?.title || "").slice(0, 300),
            text: String(row?.copy?.[locale]?.text || "").slice(0, 2000),
            cta: String(row?.copy?.[locale]?.cta || "").slice(0, 200),
          },
        ]),
      ),
    }))
    .filter((row) => row.imageUrl);

  const seenImages = new Set<string>();
  for (const row of rows) {
    if (!row.enabled || !row.imageUrl) continue;
    const imageKey = row.imageUrl.split(/[?#]/, 1)[0].replace(/\/+$/, "").toLowerCase();
    if (seenImages.has(imageKey)) {
      throw new Error("Samaa kuvaa ei voi käyttää useassa aktiivisessa karusellidiassa. Valitse jokaiselle dialle oma kuva.");
    }
    seenImages.add(imageKey);
  }

  return rows;
}
function safeHttpsUrlOrEmpty(value: unknown) {
  const url = typeof value === "string" ? value.trim() : "";
  return /^https:\/\//i.test(url) && isSafeUrlOrPath(url) ? url : "";
}

export async function GET() {
  const admin = await guard();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("homepage_slides")
    .eq("singleton", true)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    slides: Array.isArray(data?.homepage_slides) ? data.homepage_slides : [],
  });
}

export async function PUT(request: NextRequest) {
  const admin = await guard();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const slides = clean((await request.json())?.slides);
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        {
          singleton: true,
          homepage_slides: slides,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "singleton" },
      )
      .select("homepage_slides")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await supabaseAdmin.from("cms_revisions").insert({
      entity_type: "homepage_slides",
      entity_id: "singleton",
      payload: { slides },
      created_by: admin.user.id,
    });

    return NextResponse.json({ slides: data?.homepage_slides || slides });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Virhe" },
      { status: 400 },
    );
  }
}
