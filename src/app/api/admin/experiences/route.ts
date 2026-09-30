import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { firstValidHttpUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";
const locales = ["fi","es","en"] as const;

type Translation = { title: string; shortDescription?: string; fullDescription?: string; whatToBring?: string; safetyInformation?: string };
type Payload = { id?: number; destinationId: number; categoryId: number; providerId?: string | null; slug: string; durationMinutes?: number|null; minGroupSize?: number; maxGroupSize?: number; difficultyLevel?: string; status?: "draft"|"published"|"archived"; mediaIds?: string[]; translations: Record<typeof locales[number], Translation>; pricing?: { basePriceEur?: number|null; adultPriceEur?: number|null; childPriceEur?: number|null } };

function validate(body: Payload) {
  const errors: string[] = [];
  if (!body.slug?.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug.trim())) {
    errors.push("slug must contain lowercase letters, numbers and single hyphens");
  }
  if (!Number.isInteger(body.destinationId) || body.destinationId < 1) errors.push("destinationId must be a positive integer");
  if (!Number.isInteger(body.categoryId) || body.categoryId < 1) errors.push("categoryId must be a positive integer");
  if (body.providerId != null && (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.providerId))) errors.push("providerId must be a valid UUID");

  const min = body.minGroupSize ?? 1;
  const max = body.maxGroupSize ?? 100;
  if (!Number.isInteger(min) || min < 1) errors.push("minGroupSize must be a positive integer");
  if (!Number.isInteger(max) || max < min) errors.push("maxGroupSize must be an integer greater than or equal to minGroupSize");

  if (body.durationMinutes != null && (!Number.isInteger(body.durationMinutes) || body.durationMinutes <= 0)) {
    errors.push("durationMinutes must be a positive integer");
  }

  const prices = body.pricing;
  if (prices) {
    for (const [name, value] of Object.entries({
      basePriceEur: prices.basePriceEur,
      adultPriceEur: prices.adultPriceEur,
      childPriceEur: prices.childPriceEur,
    })) {
      if (value != null && (!Number.isFinite(value) || value < 0)) errors.push(name + " must be a non-negative number");
    }
  }

  for (const locale of locales) {
    if (!body.translations?.[locale]?.title?.trim()) errors.push(locale + " title is required");
  }
  return errors;
}

export async function GET() {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const [{data:experiences,error:experienceError},{data:destinations},{data:categories},{data:providers}] = await Promise.all([
      supabaseAdmin.from("experiences").select("*, experience_translations(*), pricing_rules(*), experience_media(sort_order,media(id,filename,url,alt_fi,alt_es,alt_en)), provider_experience_links(provider_id)").order("created_at",{ascending:false}),
      supabaseAdmin.from("destinations").select("id,slug,destination_translations(language_code,name)").order("slug"),
      supabaseAdmin.from("experience_categories").select("id,slug,name_fi,name_es,icon").order("slug"),
      supabaseAdmin.from("providers").select("id,name,verified,active").order("name")
    ]);
    if (experienceError) return NextResponse.json({error:experienceError.message},{status:500});
    return NextResponse.json({experiences:experiences??[],destinations:destinations??[],categories:categories??[],providers:providers??[]},{headers:{"Cache-Control":"no-store"}});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}

export async function POST(req:NextRequest) {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body=await req.json() as Payload; const errors=validate(body);
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
      if (status === "published" && (!provider.active || !provider.verified)) return NextResponse.json({error:"Published experiences require an active verified provider."},{status:400});
      if (status === "published") {
        const providerUrl = firstValidHttpUrl(provider.booking_url, provider.website_url);
        if (!providerUrl) {
          return NextResponse.json({error:"Published experiences require a valid provider website or booking URL."},{status:400});
        }
      }
    } else if (status === "published") {
      return NextResponse.json({error:"Published experiences require a verified provider."},{status:400});
    }
    const {data:experience,error}=await supabaseAdmin.from("experiences").insert({
      destination_id:body.destinationId,category_id:body.categoryId,slug:body.slug.trim(),duration_minutes:body.durationMinutes??null,
      min_group_size:body.minGroupSize??1,max_group_size:body.maxGroupSize??100,difficulty_level:body.difficultyLevel?.trim()||null,status,
      published_at:status==="published"?new Date().toISOString():null
    }).select().single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    const translations=locales.map((language_code)=>{const t=body.translations[language_code];return {experience_id:experience.id,language_code,title:t.title.trim(),short_description:t.shortDescription?.trim()||null,full_description:t.fullDescription?.trim()||null,what_to_bring:t.whatToBring?.trim()||null,safety_information:t.safetyInformation?.trim()||null};});
    const {error:translationError}=await supabaseAdmin.from("experience_translations").insert(translations);
    if(translationError){await supabaseAdmin.from("experiences").delete().eq("id",experience.id);return NextResponse.json({error:translationError.message},{status:400});}
    if (body.mediaIds?.length) {
      const { error: mediaError } = await supabaseAdmin.from("experience_media").insert(body.mediaIds.map((media_id, sort_order) => ({ experience_id: experience.id, media_id, sort_order })));
      if (mediaError) {
        await supabaseAdmin.from("experiences").delete().eq("id", experience.id);
        return NextResponse.json({error:mediaError.message},{status:400});
      }
    }
    if(body.pricing){
      const {error:pricingError}=await supabaseAdmin.from("pricing_rules").insert({experience_id:experience.id,base_price_eur:body.pricing.basePriceEur??0,adult_price_eur:body.pricing.adultPriceEur??null,child_price_eur:body.pricing.childPriceEur??null});
      if(pricingError){
        await supabaseAdmin.from("experiences").delete().eq("id", experience.id);
        return NextResponse.json({error:pricingError.message},{status:400});
      }
    }
    if (body.providerId) {
      const { error: linkError } = await supabaseAdmin.from("provider_experience_links").insert({ provider_id: body.providerId, experience_id: experience.id });
      if (linkError) {
        await supabaseAdmin.from("experiences").delete().eq("id", experience.id);
        return NextResponse.json({error:linkError.message},{status:400});
      }
    }
    return NextResponse.json({experience},{status:201});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}

export async function PATCH(req:NextRequest) {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body=await req.json() as Payload & {id:number}; if(!body.id)return NextResponse.json({error:"id is required"},{status:400});
    const errors=validate(body); if(errors.length)return NextResponse.json({error:"Validation failed",details:errors},{status:400});
    const status=body.status==="published"?"published":body.status==="archived"?"archived":"draft";
    if (body.providerId && status === "published") {
      const { data: provider, error: providerError } = await supabaseAdmin
        .from("providers")
        .select("id,verified,active,website_url,booking_url")
        .eq("id", body.providerId)
        .maybeSingle();
      if (providerError) return NextResponse.json({error:providerError.message},{status:500});
      if (!provider || !provider.active || !provider.verified) return NextResponse.json({error:"Published experiences require an active verified provider."},{status:400});
      const providerUrl = firstValidHttpUrl(provider.booking_url, provider.website_url);
      if (!providerUrl) return NextResponse.json({error:"Published experiences require a valid provider website or booking URL."},{status:400});
    } else if (!body.providerId && status === "published") {
      return NextResponse.json({error:"Published experiences require a verified provider."},{status:400});
    }
    const {data:experience,error}=await supabaseAdmin.from("experiences").update({
      destination_id:body.destinationId,category_id:body.categoryId,slug:body.slug.trim(),duration_minutes:body.durationMinutes??null,min_group_size:body.minGroupSize??1,max_group_size:body.maxGroupSize??100,difficulty_level:body.difficultyLevel?.trim()||null,status,published_at:status==="published"?new Date().toISOString():null,updated_at:new Date().toISOString()
    }).eq("id",body.id).select().single();
    if(error)return NextResponse.json({error:error.message},{status:400});
    await supabaseAdmin.from("experience_media").delete().eq("experience_id", body.id);
    if (body.mediaIds?.length) { const { error: mediaError } = await supabaseAdmin.from("experience_media").insert(body.mediaIds.map((media_id, sort_order) => ({ experience_id: body.id, media_id, sort_order }))); if (mediaError) return NextResponse.json({error:mediaError.message},{status:400}); }
    for(const language_code of locales){const t=body.translations[language_code];const {error:e}=await supabaseAdmin.from("experience_translations").upsert({experience_id:body.id,language_code,title:t.title.trim(),short_description:t.shortDescription?.trim()||null,full_description:t.fullDescription?.trim()||null,what_to_bring:t.whatToBring?.trim()||null,safety_information:t.safetyInformation?.trim()||null,updated_at:new Date().toISOString()},{onConflict:"experience_id,language_code"});if(e)return NextResponse.json({error:e.message},{status:400});}
    await supabaseAdmin.from("provider_experience_links").delete().eq("experience_id", body.id);
    if (body.providerId) {
      const { error: linkError } = await supabaseAdmin.from("provider_experience_links").insert({ provider_id: body.providerId, experience_id: body.id });
      if (linkError) return NextResponse.json({error:linkError.message},{status:400});
    }
    if(body.pricing){const {error:e}=await supabaseAdmin.from("pricing_rules").upsert({experience_id:body.id,base_price_eur:body.pricing.basePriceEur??0,adult_price_eur:body.pricing.adultPriceEur??null,child_price_eur:body.pricing.childPriceEur??null,updated_at:new Date().toISOString()},{onConflict:"experience_id"});if(e)return NextResponse.json({error:e.message},{status:400});}
    return NextResponse.json({experience});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}
