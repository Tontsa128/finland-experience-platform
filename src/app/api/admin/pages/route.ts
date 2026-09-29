import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
const locales = ["fi","es","en"] as const;

async function guard() {
  const admin = await getAdminContext();
  if (!admin) return null;
  if (!["SUPER_ADMIN","ADMIN","CONTENT_MANAGER","EDITOR"].includes(admin.profile.role)) return null;
  return admin;
}

export async function GET() {
  if (!await guard()) return NextResponse.json({error:"Forbidden"},{status:403});
  const {data,error}=await supabaseAdmin.from("site_pages").select("*").order("updated_at",{ascending:false});
  if(error)return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({pages:data||[]});
}

export async function POST(req:NextRequest) {
  if (!await guard()) return NextResponse.json({error:"Forbidden"},{status:403});
  try{
    const body=await req.json();
    const slug=String(body.slug||"").trim().toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-|-$/g,"").slice(0,80);
    const locale=String(body.locale||"fi");
    const title=String(body.title||"").trim().slice(0,160);
    const canonicalUrl=String(body.canonical_url||"").trim().slice(0,500);
    if(!slug||!locales.includes(locale as typeof locales[number])||!title)return NextResponse.json({error:"Slug, kieli ja otsikko ovat pakollisia."},{status:400});
    if(canonicalUrl && !/^(\/|https?:\/\/)/i.test(canonicalUrl))return NextResponse.json({error:"Virheellinen canonical URL."},{status:400});
    const {data,error}=await supabaseAdmin.from("site_pages").upsert({
      slug,locale,title,content:String(body.content||"").slice(0,50000),seo_title:String(body.seo_title||"").slice(0,160)||null,
      seo_description:String(body.seo_description||"").slice(0,320)||null,canonical_url:canonicalUrl||null,
      noindex:Boolean(body.noindex),published:Boolean(body.published),updated_at:new Date().toISOString()
    },{onConflict:"slug,locale"}).select("*").single();
    if(error)return NextResponse.json({error:error.message},{status:400});
    return NextResponse.json({page:data});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virheellinen pyyntö."},{status:400});}
}

export async function DELETE(req:NextRequest) {
  if (!await guard()) return NextResponse.json({error:"Forbidden"},{status:403});
  const slug=req.nextUrl.searchParams.get("slug"); const locale=req.nextUrl.searchParams.get("locale");
  if(!slug||!locales.includes(locale as typeof locales[number]))return NextResponse.json({error:"Virheelliset tiedot."},{status:400});
  const {error}=await supabaseAdmin.from("site_pages").delete().eq("slug",slug).eq("locale",locale);
  if(error)return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({ok:true});
}
