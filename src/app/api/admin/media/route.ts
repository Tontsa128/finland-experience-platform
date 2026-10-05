import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
export const dynamic="force-dynamic";
export async function GET(){
  try{
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const {data,error}=await supabaseAdmin.from("media").select("id,filename,url,alt_text,alt_fi,alt_es,alt_en,type,created_at").order("created_at",{ascending:false});
    if(error) return NextResponse.json({error:error.message},{status:500});
    return NextResponse.json({media:data??[]},{headers:{"Cache-Control":"no-store"}});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN","ADMIN","CONTENT_MANAGER","EDITOR"].includes(admin.profile.role)) return NextResponse.json({error:"Forbidden"},{status:403});
  try {
    const body=await req.json(); const id=String(body.id||"").trim(); if(!id)return NextResponse.json({error:"id required"},{status:400});
    const patch={alt_text:String(body.alt_text||"").trim()||null,alt_fi:String(body.alt_fi||"").trim()||null,alt_es:String(body.alt_es||"").trim()||null,alt_en:String(body.alt_en||"").trim()||null,title:String(body.title||"").trim()||null};
    const {data,error}=await supabaseAdmin.from("media").update(patch).eq("id",id).select("id,filename,url,alt_text,alt_fi,alt_es,alt_en,title,type,created_at").single();
    if(error)return NextResponse.json({error:error.message},{status:400}); return NextResponse.json({media:data});
  } catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virhe"},{status:400});}
}
export async function DELETE(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"].includes(admin.profile.role)) return NextResponse.json({error:"Forbidden"},{status:403});
  try {
    const id=req.nextUrl.searchParams.get("id"); if(!id)return NextResponse.json({error:"id required"},{status:400});
    const {data:media}=await supabaseAdmin.from("media").select("storage_path").eq("id",id).maybeSingle();
    if(media?.storage_path) await supabaseAdmin.storage.from("cms-media").remove([media.storage_path]);
    const {error}=await supabaseAdmin.from("media").delete().eq("id",id);
    if(error)return NextResponse.json({error:error.message},{status:400}); return NextResponse.json({ok:true});
  } catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virhe"},{status:400});}
}
