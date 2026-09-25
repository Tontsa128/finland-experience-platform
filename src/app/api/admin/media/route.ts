import { NextResponse } from "next/server";
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
