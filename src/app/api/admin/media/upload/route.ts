import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

function safeName(name: string) {
  return name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminContext();
    if (!admin) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "file is required" }, { status: 400 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Tiedostomuoto ei ole tuettu. Käytä JPG-, PNG-, WebP-, GIF- tai AVIF-kuvaa." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "Kuvan enimmäiskoko on 10 Mt." }, { status: 400 });

    const filename = safeName(file.name) || "image";
    const path = `${new Date().toISOString().slice(0,10)}/${crypto.randomUUID()}-${filename}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage.from("cms-media").upload(path, bytes, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

    const { data: publicUrl } = supabaseAdmin.storage.from("cms-media").getPublicUrl(path);
    const altFi = String(form.get("alt_fi") || "").trim() || null;
    const altEs = String(form.get("alt_es") || "").trim() || null;
    const altEn = String(form.get("alt_en") || "").trim() || null;
    const title = String(form.get("title") || "").trim() || null;

    const { data: media, error: mediaError } = await supabaseAdmin.from("media").insert({
      filename: file.name,
      url: publicUrl.publicUrl,
      storage_path: path,
      mime_type: file.type,
      size_bytes: file.size,
      alt_text: altFi || altEs || altEn,
      alt_fi: altFi,
      alt_es: altEs,
      alt_en: altEn,
      title,
      type: "image",
    }).select("id,filename,url,storage_path,mime_type,size_bytes,alt_fi,alt_es,alt_en,title,created_at").single();

    if (mediaError) {
      await supabaseAdmin.storage.from("cms-media").remove([path]);
      return NextResponse.json({ error: mediaError.message }, { status: 400 });
    }

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload epäonnistui" }, { status: 500 });
  }
}
