import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";

export async function GET(){
 const admin=await getAdminContext();
 if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const {data,error}=await supabaseAdmin.from("providers").select("id,name,slug,provider_type,region,verified,active,featured,email,website_url,bookings_inquiries(id)").order("featured",{ascending:false}).order("name");
  if(error)return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({providers:(data||[]).map((p:any)=>({...p,lead_count:p.bookings_inquiries?.length||0,bookings_inquiries:undefined}))});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Failed to load providers."},{status:503});}
}
