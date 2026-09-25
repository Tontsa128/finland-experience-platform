import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
export const dynamic="force-dynamic";
export async function GET(){
  try{
    const {data,error}=await supabaseAdmin.from("site_settings").select("*").eq("singleton",true).maybeSingle();
    if(error) return NextResponse.json({error:error.message},{status:500});
    return NextResponse.json({settings:data});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}
export async function PATCH(req:NextRequest){
  try{
    const body=await req.json();
    const allowed=["site_name","primary_color","secondary_color","accent_color","heading_font","body_font","whatsapp_number","contact_email","instagram_url","facebook_url","default_og_image","google_analytics_id"];
    const patch:Record<string,unknown>={};
    for(const key of allowed) if(key in body) patch[key]=body[key];
    patch.updated_at=new Date().toISOString();
    const {data,error}=await supabaseAdmin.from("site_settings").upsert({singleton:true,...patch},{onConflict:"singleton"}).select("*").single();
    if(error) return NextResponse.json({error:error.message},{status:400});
    return NextResponse.json({settings:data});
  }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}
