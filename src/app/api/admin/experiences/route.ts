import { NextRequest, NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
const locales = ["fi","es","en"] as const;

type Translation = { title: string; shortDescription?: string; fullDescription?: string; whatToBring?: string; safetyInformation?: string };
type Payload = { id?: number; destinationId: number; categoryId: number; slug: string; durationMinutes?: number|null; minGroupSize?: number; maxGroupSize?: number; difficultyLevel?: string; status?: "draft"|"published"|"archived"; translations: Record<typeof locales[number], Translation>; pricing?: { basePriceEur?: number|null; adultPriceEur?: number|null; childPriceEur?: number|null } };

function validate(body: Payload) {
  const errors: string[] = [];
  if (!body.slug?.trim()) errors.push("slug is required");
  if (!Number.isFinite(Number(body.destinationId))) errors.push("destinationId is required");
  if (!Number.isFinite(Number(body.categoryId))) errors.push("categoryId is required");
  for (const locale of locales) if (!body.translations?.[locale]?.title?.trim()) errors.push(locale + " title is required");
  return errors;
}

export async function GET() {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const [{data:experiences,error:experienceError},{data:destinations},{data:categories}] = await Promise.all([
      supabaseAdmin.from("experiences").select("*, experience_translations(*), pricing_rules(*)").order("created_at",{ascending:false}),
      supabaseAdmin.from("destinations").select("id,slug,destination_translations(language_code,name)").order("slug"),
      supabaseAdmin.from("experience_categories").select("id,slug,name_fi,name_es,icon").order("slug")
    ]);
    if (experienceError) return NextResponse.json({error:experienceError.message},{status:500});
    return NextResponse.json({experiences:experiences??[],destinations:destinations??[],categories:categories??[]},{headers:{"Cache-Control":"no-store"}});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}

export async function POST(req:NextRequest) {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body=await req.json() as Payload; const errors=validate(body);
    if(errors.length) return NextResponse.json({error:"Validation failed",details:errors},{status:400});
    const status=body.status==="published"?"published":body.status==="archived"?"archived":"draft";
    const {data:experience,error}=await supabaseAdmin.from("experiences").insert({
      destination_id:body.destinationId,category_id:body.categoryId,slug:body.slug.trim(),duration_minutes:body.durationMinutes??null,
      min_group_size:body.minGroupSize??1,max_group_size:body.maxGroupSize??100,difficulty_level:body.difficultyLevel?.trim()||null,status,
      published_at:status==="published"?new Date().toISOString():null
    }).select().single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    const translations=locales.map((language_code)=>{const t=body.translations[language_code];return {experience_id:experience.id,language_code,title:t.title.trim(),short_description:t.shortDescription?.trim()||null,full_description:t.fullDescription?.trim()||null,what_to_bring:t.whatToBring?.trim()||null,safety_information:t.safetyInformation?.trim()||null};});
    const {error:translationError}=await supabaseAdmin.from("experience_translations").insert(translations);
    if(translationError){await supabaseAdmin.from("experiences").delete().eq("id",experience.id);return NextResponse.json({error:translationError.message},{status:400});}
    if(body.pricing){const {error:pricingError}=await supabaseAdmin.from("pricing_rules").insert({experience_id:experience.id,base_price_eur:body.pricing.basePriceEur??0,adult_price_eur:body.pricing.adultPriceEur??null,child_price_eur:body.pricing.childPriceEur??null});if(pricingError)return NextResponse.json({error:pricingError.message},{status:400});}
    return NextResponse.json({experience},{status:201});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}

export async function PATCH(req:NextRequest) {
  try {
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const body=await req.json() as Payload & {id:number}; if(!body.id)return NextResponse.json({error:"id is required"},{status:400});
    const errors=validate(body); if(errors.length)return NextResponse.json({error:"Validation failed",details:errors},{status:400});
    const status=body.status==="published"?"published":body.status==="archived"?"archived":"draft";
    const {data:experience,error}=await supabaseAdmin.from("experiences").update({
      destination_id:body.destinationId,category_id:body.categoryId,slug:body.slug.trim(),duration_minutes:body.durationMinutes??null,min_group_size:body.minGroupSize??1,max_group_size:body.maxGroupSize??100,difficulty_level:body.difficultyLevel?.trim()||null,status,published_at:status==="published"?new Date().toISOString():null,updated_at:new Date().toISOString()
    }).eq("id",body.id).select().single();
    if(error)return NextResponse.json({error:error.message},{status:400});
    for(const language_code of locales){const t=body.translations[language_code];const {error:e}=await supabaseAdmin.from("experience_translations").upsert({experience_id:body.id,language_code,title:t.title.trim(),short_description:t.shortDescription?.trim()||null,full_description:t.fullDescription?.trim()||null,what_to_bring:t.whatToBring?.trim()||null,safety_information:t.safetyInformation?.trim()||null,updated_at:new Date().toISOString()},{onConflict:"experience_id,language_code"});if(e)return NextResponse.json({error:e.message},{status:400});}
    if(body.pricing){const {error:e}=await supabaseAdmin.from("pricing_rules").upsert({experience_id:body.id,base_price_eur:body.pricing.basePriceEur??0,adult_price_eur:body.pricing.adultPriceEur??null,child_price_eur:body.pricing.childPriceEur??null,updated_at:new Date().toISOString()},{onConflict:"experience_id"});if(e)return NextResponse.json({error:e.message},{status:400});}
    return NextResponse.json({experience});
  } catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}
