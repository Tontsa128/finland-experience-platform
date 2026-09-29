import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";

export async function GET(){
 const admin=await getAdminContext();
 if(!admin)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"].includes(admin.profile.role))return NextResponse.json({error:"Forbidden"},{status:403});
 try{
  const {data,error}=await supabaseAdmin.from("providers").select("id,name,slug,provider_type,region,verified,active,featured,email,website_url,bookings_inquiries(id),provider_verification_checks(*)").order("featured",{ascending:false}).order("name");
  if(error)return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({providers:(data||[]).map((p:any)=>{
    const check=p.provider_verification_checks?.[0]||null;
    const checks=["company_checked","contact_checked","pricing_checked","booking_flow_checked","spanish_content_checked","photos_checked"];
    const completed=checks.filter((key)=>check?.[key]).length;
    return {...p,lead_count:p.bookings_inquiries?.length||0,verification_completed:completed,verification_total:checks.length,verification_checked_at:check?.checked_at||null,bookings_inquiries:undefined,provider_verification_checks:undefined};
  })});
 }catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Failed to load providers."},{status:503});}
}
