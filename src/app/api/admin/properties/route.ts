import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const locales = ["fi", "es", "en"] as const;
type Locale = typeof locales[number];
type Translation = { name: string; shortDescription?: string; description?: string; locationName?: string; seoTitle?: string; seoDescription?: string };
type Payload = { id?: string; providerId?: string | null; slug: string; propertyType?: string; region?: string; maxGuests?: number; bedrooms?: number; bathrooms?: number; basePriceEur?: number | null; providerName?: string; providerUrl?: string; featured?: boolean; status?: "draft"|"published"|"archived"; mediaIds?: string[]; translations: Record<Locale, Translation> };
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PROPERTY_TYPES = new Set(["cabin","igloo","hotel","villa","glamping"]);

function validate(body: Payload) {
  const errors: string[] = [];
  if (!body.slug?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug.trim())) {
    errors.push("slug must contain lowercase letters, numbers and single hyphens");
  }
  for (const locale of locales) if (!body.translations?.[locale]?.name?.trim()) errors.push(locale + " name is required");

  const integerFields: Array<[string, number | undefined]> = [
    ["maxGuests", body.maxGuests],
    ["bedrooms", body.bedrooms],
    ["bathrooms", body.bathrooms],
  ];
  for (const [name, value] of integerFields) {
    if (value != null && (!Number.isInteger(value) || value < 0)) errors.push(name + " must be a non-negative integer");
  }
  if (body.maxGuests != null && body.maxGuests < 1) errors.push("maxGuests must be at least 1");
  if (body.basePriceEur != null && (!Number.isFinite(body.basePriceEur) || body.basePriceEur < 0)) {
    errors.push("basePriceEur must be a non-negative number");
  }
  if (body.providerId != null && !UUID_PATTERN.test(body.providerId)) errors.push("providerId must be a valid UUID");
  if (body.providerUrl && !/^https?:\/\//i.test(body.providerUrl.trim())) errors.push("providerUrl must be an http(s) URL");
  if (body.propertyType != null && !PROPERTY_TYPES.has(body.propertyType.trim())) errors.push("propertyType must be one of cabin, igloo, hotel, villa or glamping");
  if (body.mediaIds && (!Array.isArray(body.mediaIds) || body.mediaIds.some((id) => typeof id !== "string" || !id.trim()))) {
    errors.push("mediaIds must contain non-empty IDs");
  }
  return errors;
}

export async function GET() {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const [{ data, error }, { data: providers, error: providersError }] = await Promise.all([
      supabaseAdmin.from("properties").select("*, property_translations(*), property_media(sort_order,media(id,filename,url,alt_fi,alt_es,alt_en)), provider_property_links(provider_id)").order("created_at",{ascending:false}),
      supabaseAdmin.from("providers").select("id,name,verified,active").order("name")
    ]);
    if (error) return NextResponse.json({error:error.message},{status:500});
    if (providersError) return NextResponse.json({error:providersError.message},{status:500});
    return NextResponse.json({properties:data ?? [], providers:providers ?? []},{headers:{"Cache-Control":"no-store"}});
  } catch (error) {
    return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});
  }
}

export async function POST(req:NextRequest) {
  try {
    const admin = await getAdminContext();
    if (!admin) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body = await req.json() as Payload;
    const errors=validate(body);
    if(errors.length) return NextResponse.json({error:"Validation failed",details:errors},{status:400});
    const status=body.status==="published"?"published":body.status==="archived"?"archived":"draft";
    if (body.providerId) {
      const { data: provider, error: providerError } = await supabaseAdmin
        .from("providers")
        .select("id,verified,active,website_url,booking_url")
        .eq("id", body.providerId)
        .maybeSingle();
      if (providerError) return NextResponse.json({error:providerError.message},{status:500});
      if (!provider) return NextResponse.json({error:"Provider not found"},{status:400});
      if (status === "published" && (!provider.active || !provider.verified)) {
        return NextResponse.json({error:"Published accommodations require an active verified provider."},{status:400});
      }
      if (status === "published") {
        const providerUrl = String(provider.booking_url || provider.website_url || "").trim();
        if (!/^https?:\/\//i.test(providerUrl)) {
          return NextResponse.json({error:"Published accommodations require a valid provider website or booking URL."},{status:400});
        }
      }
    } else if (status === "published") {
      return NextResponse.json({error:"Published accommodations require a verified provider."},{status:400});
    }
    const {data:property,error}=await supabaseAdmin.from("properties").insert({
      slug:body.slug.trim(),property_type:body.propertyType?.trim()||"cabin",region:body.region?.trim()||null,
      max_guests:body.maxGuests??2,bedrooms:body.bedrooms??1,bathrooms:body.bathrooms??1,
      base_price_eur:body.basePriceEur??null,provider_name:body.providerName?.trim()||null,provider_url:body.providerUrl?.trim()||null,featured:Boolean(body.featured),status
    }).select().single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    const rows=locales.map((locale)=>{const t=body.translations[locale];return {
      property_id:property.id,locale,name:t.name.trim(),short_description:t.shortDescription?.trim()||null,
      description:t.description?.trim()||null,location_name:t.locationName?.trim()||null,
      seo_title:t.seoTitle?.trim()||null,seo_description:t.seoDescription?.trim()||null
    };});
    const {error:translationError}=await supabaseAdmin.from("property_translations").insert(rows);
    if(translationError){await supabaseAdmin.from("properties").delete().eq("id",property.id);return NextResponse.json({error:translationError.message},{status:400});}
    if (body.mediaIds?.length) {
      const { error: mediaError } = await supabaseAdmin.from("property_media").insert(body.mediaIds.map((media_id, sort_order) => ({ property_id: property.id, media_id, sort_order })));
      if (mediaError) {
        await supabaseAdmin.from("properties").delete().eq("id", property.id);
        return NextResponse.json({error:mediaError.message},{status:400});
      }
    }
    if (body.providerId) {
      const { error: linkError } = await supabaseAdmin.from("provider_property_links").insert({provider_id:body.providerId,property_id:property.id});
      if (linkError) {
        await supabaseAdmin.from("properties").delete().eq("id", property.id);
        return NextResponse.json({error:linkError.message},{status:400});
      }
    }
    return NextResponse.json({property},{status:201});
  } catch(error) { return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400}); }
}

export async function PATCH(req:NextRequest) {
  try {
    const admin = await getAdminContext();
    if (!admin) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body=await req.json() as Payload & {id:string};
    if(!body.id) return NextResponse.json({error:"id is required"},{status:400});
    const errors=validate(body); if(errors.length) return NextResponse.json({error:"Validation failed",details:errors},{status:400});
    const status=body.status==="published"?"published":body.status==="archived"?"archived":"draft";
    if (body.providerId) {
      const { data: provider, error: providerError } = await supabaseAdmin
        .from("providers")
        .select("id,verified,active")
        .eq("id", body.providerId)
        .maybeSingle();
      if (providerError) return NextResponse.json({error:providerError.message},{status:500});
      if (!provider) return NextResponse.json({error:"Provider not found"},{status:400});
      if (status === "published" && (!provider.active || !provider.verified)) {
        return NextResponse.json({error:"Published accommodations require an active verified provider."},{status:400});
      }
    } else if (status === "published") {
      return NextResponse.json({error:"Published accommodations require a verified provider."},{status:400});
    }
    const {data:property,error}=await supabaseAdmin.from("properties").update({
      slug:body.slug.trim(),property_type:body.propertyType?.trim()||"cabin",region:body.region?.trim()||null,
      max_guests:body.maxGuests??2,bedrooms:body.bedrooms??1,bathrooms:body.bathrooms??1,
      base_price_eur:body.basePriceEur??null,provider_name:body.providerName?.trim()||null,provider_url:body.providerUrl?.trim()||null,featured:Boolean(body.featured),status,updated_at:new Date().toISOString()
    }).eq("id",body.id).select().single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    await supabaseAdmin.from("property_media").delete().eq("property_id", body.id);
    if (body.mediaIds?.length) {
      const { error: mediaError } = await supabaseAdmin.from("property_media").insert(body.mediaIds.map((media_id, sort_order) => ({ property_id: body.id, media_id, sort_order })));
      if (mediaError) return NextResponse.json({error:mediaError.message},{status:400});
    }
    const { error: oldLinksError } = await supabaseAdmin.from("provider_property_links").delete().eq("property_id", body.id);
    if (oldLinksError) return NextResponse.json({error:oldLinksError.message},{status:400});
    if (body.providerId) {
      const { error: linkError } = await supabaseAdmin.from("provider_property_links").insert({provider_id:body.providerId,property_id:body.id});
      if (linkError) return NextResponse.json({error:linkError.message},{status:400});
    }
    for(const locale of locales){
      const t=body.translations[locale];
      const {error:translationError}=await supabaseAdmin.from("property_translations").upsert({
        property_id:body.id,locale,name:t.name.trim(),short_description:t.shortDescription?.trim()||null,
        description:t.description?.trim()||null,location_name:t.locationName?.trim()||null,
        seo_title:t.seoTitle?.trim()||null,seo_description:t.seoDescription?.trim()||null,updated_at:new Date().toISOString()
      },{onConflict:"property_id,locale"});
      if(translationError) return NextResponse.json({error:translationError.message},{status:400});
    }
    return NextResponse.json({property});
  } catch(error) { return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400}); }
}
