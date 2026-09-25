import { NextRequest,NextResponse } from "next/server";
import {supabaseAdmin} from "@/lib/supabase";
export const dynamic="force-dynamic";
export async function GET(){
 try{const{data,error}=await supabaseAdmin.from("bookings_inquiries").select("*").order("created_at",{ascending:false});if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({inquiries:data??[]},{headers:{"Cache-Control":"no-store"}});}
 catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Supabase is not configured"},{status:503});}
}
export async function PATCH(req:NextRequest){
 try{const body=await req.json();if(!body.id||!body.status)return NextResponse.json({error:"id and status are required"},{status:400});const allowed=["new","contacted","quoted","confirmed","cancelled","completed"];if(!allowed.includes(body.status))return NextResponse.json({error:"Invalid status"},{status:400});const{data,error}=await supabaseAdmin.from("bookings_inquiries").update({status:body.status,admin_notes:body.adminNotes??null,updated_at:new Date().toISOString()}).eq("id",body.id).select().single();if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({inquiry:data});}
 catch(error){return NextResponse.json({error:error instanceof Error?error.message:"Invalid request"},{status:400});}
}
