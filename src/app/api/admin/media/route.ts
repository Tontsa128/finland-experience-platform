import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
import { getMediaUsageMap } from "@/lib/media-usage";
export const dynamic="force-dynamic";
export async function GET(){
  try{
    if (!await getAdminContext()) return NextResponse.json({error:"UNAUTHORIZED"},{status:401});
    const {data,error}=await supabaseAdmin.from("media").select("id,filename,url,alt_text,alt_fi,alt_es,alt_en,title,description,source_url,license,rights_status,location_tag,category_tag,storage_path,type,created_at").is("archived_at",null).order("created_at",{ascending:false}).limit(500);
    if(error) return NextResponse.json({error:error.message},{status:500});
    const rows = data ?? [];
    const usage = await getMediaUsageMap(rows.map((item) => ({ id: String(item.id), url: String(item.url || "") })));
    return NextResponse.json({media:rows.map((item)=>({...item,usage_count:usage.get(String(item.id))?.count||0,used_in:usage.get(String(item.id))?.usedIn||[]}))},{headers:{"Cache-Control":"no-store"}});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}

export async function PATCH(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN","ADMIN","CONTENT_MANAGER","EDITOR"].includes(admin.profile.role)) return NextResponse.json({error:"Forbidden"},{status:403});
  try {
    const body=await req.json(); const id=String(body.id||"").trim(); if(!id)return NextResponse.json({error:"id required"},{status:400});
    const sourceUrl=String(body.source_url||"").trim();
    if(sourceUrl && !/^https:\/\//i.test(sourceUrl))return NextResponse.json({error:"Lähdeosoitteen tulee olla HTTPS."},{status:400});
    const rightsStatus=["unknown","licensed","permission_granted","public_domain"].includes(body.rights_status)?body.rights_status:"unknown";
    const patch={alt_text:String(body.alt_text||"").trim().slice(0,500)||null,alt_fi:String(body.alt_fi||"").trim().slice(0,500)||null,alt_es:String(body.alt_es||"").trim().slice(0,500)||null,alt_en:String(body.alt_en||"").trim().slice(0,500)||null,title:String(body.title||"").trim().slice(0,300)||null,description:String(body.description||"").trim().slice(0,2000)||null,source_url:sourceUrl||null,license:String(body.license||"").trim().slice(0,300)||null,rights_status:rightsStatus,location_tag:String(body.location_tag||"").trim().slice(0,160)||null,category_tag:String(body.category_tag||"").trim().slice(0,120)||null};
    const {data,error}=await supabaseAdmin.from("media").update(patch).eq("id",id).select("id,filename,url,alt_text,alt_fi,alt_es,alt_en,title,description,source_url,license,rights_status,location_tag,category_tag,type,created_at").single();
    if(error)return NextResponse.json({error:error.message},{status:400}); return NextResponse.json({media:data});
  } catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virhe"},{status:400});}
}
export async function DELETE(req: NextRequest) {
  const admin = await getAdminContext();
  if (!admin || !["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"].includes(admin.profile.role)) return NextResponse.json({error:"Forbidden"},{status:403});
  try {
    const id=req.nextUrl.searchParams.get("id"); if(!id)return NextResponse.json({error:"id required"},{status:400});
    const {data:media}=await supabaseAdmin.from("media").select("id,url,storage_path").eq("id",id).maybeSingle();
    if(!media)return NextResponse.json({error:"Kuvaa ei löytynyt."},{status:404});
    const usage=(await getMediaUsageMap([{id:String(media.id),url:String(media.url||"")}])).get(id);
    if((usage?.count||0)>0)return NextResponse.json({error:`Kuva on käytössä: ${(usage?.usedIn||[]).join(", ")}. Irrota kuva sisällöistä ennen poistamista.`},{status:409});
    if(media.storage_path){const {error:storageError}=await supabaseAdmin.storage.from("cms-media").remove([media.storage_path]);if(storageError)return NextResponse.json({error:storageError.message},{status:400});}
    const {error}=await supabaseAdmin.from("media").delete().eq("id",id);
    if(error)return NextResponse.json({error:error.message},{status:400}); return NextResponse.json({ok:true});
  } catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virhe"},{status:400});}
}
