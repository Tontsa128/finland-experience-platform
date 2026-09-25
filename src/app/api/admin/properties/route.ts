import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const locales = ["fi", "es", "en"] as const;
type Locale = typeof locales[number];
type Translation = { name: string; shortDescription?: string; description?: string; locationName?: string; seoTitle?: string; seoDescription?: string };
type Payload = { id?: string; slug: string; propertyType?: string; region?: string; maxGuests?: number; bedrooms?: number; bathrooms?: number; basePriceEur?: number | null; featured?: boolean; status?: "draft"|"published"|"archived"; mediaIds?: string[]; translations: Record<Locale, Translation> };

function validate(body: Payload) {
  const errors: string[] = [];
  if (!body.slug?.trim()) errors.push("slug is required");
  for (const locale of locales) if (!body.translations?.[locale]?.name?.trim()) errors.push(locale + " name is required");
  return errors;
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from("properties").select("*, property_translations(*), property_media(sort_order,media(id,filename,url,alt_fi,alt_es,alt_en))").order("created_at",{ascending:false});
    if (error) return NextResponse.json({error:error.message},{status:500});
    return NextResponse.json({properties:data ?? []},{headers:{"Cache-Control":"no-store"}});
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
    const status=body.status==="published"?"published":"draft";
    const {data:property,error}=await supabaseAdmin.from("properties").insert({
      slug:body.slug.trim(),property_type:body.propertyType?.trim()||"cabin",region:body.region?.trim()||null,
      max_guests:body.maxGuests??2,bedrooms:body.bedrooms??1,bathrooms:body.bathrooms??1,
      base_price_eur:body.basePriceEur??null,featured:Boolean(body.featured),status
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
      if (mediaError) return NextResponse.json({error:mediaError.message},{status:400});
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
    const {data:property,error}=await supabaseAdmin.from("properties").update({
      slug:body.slug.trim(),property_type:body.propertyType?.trim()||"cabin",region:body.region?.trim()||null,
      max_guests:body.maxGuests??2,bedrooms:body.bedrooms??1,bathrooms:body.bathrooms??1,
      base_price_eur:body.basePriceEur??null,featured:Boolean(body.featured),status:body.status??"draft",updated_at:new Date().toISOString()
    }).eq("id",body.id).select().single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    await supabaseAdmin.from("property_media").delete().eq("property_id", body.id);
    if (body.mediaIds?.length) {
      const { error: mediaError } = await supabaseAdmin.from("property_media").insert(body.mediaIds.map((media_id, sort_order) => ({ property_id: body.id, media_id, sort_order })));
      if (mediaError) return NextResponse.json({error:mediaError.message},{status:400});
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
