import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

const editable = new Set([
  "description_fi","description_es","description_en","website_url","booking_url",
  "email","phone","whatsapp","address","region","languages","categories"
]);

const statuses = new Set(["approved","rejected"]);
const allowedRoles = new Set(["SUPER_ADMIN","ADMIN","CONTENT_MANAGER"]);

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  if (!allowedRoles.has(admin.profile.role)) return NextResponse.json({ error:"Forbidden" }, { status:403 });
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get("providerId") || "";
  if (!providerId) return NextResponse.json({ error:"Provider ID is required." }, { status:400 });
  const { data, error } = await supabaseAdmin
    .from("provider_change_requests")
    .select("id,provider_id,requested_by,changes,status,admin_notes,created_at,reviewed_at")
    .eq("provider_id", providerId)
    .order("created_at",{ascending:false})
    .limit(20);
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({requests:data||[]});
}

export async function PATCH(request: Request) {
  const admin = await getAdminContext();
  if (!admin) return NextResponse.json({ error:"Unauthorized" }, { status:401 });
  if (!allowedRoles.has(admin.profile.role)) return NextResponse.json({ error:"Forbidden" }, { status:403 });
  const body = await request.json().catch(()=>({}));
  const id = typeof body.id === "string" ? body.id : "";
  const status = typeof body.status === "string" ? body.status : "";
  const adminNotes = typeof body.adminNotes === "string" ? body.adminNotes.trim().slice(0,5000) : "";
  if (!id || !statuses.has(status)) return NextResponse.json({error:"Invalid request."},{status:400});

  const { data: changeRequest, error: requestError } = await supabaseAdmin
    .from("provider_change_requests")
    .select("id,provider_id,changes,status")
    .eq("id",id)
    .maybeSingle();
  if(requestError) return NextResponse.json({error:requestError.message},{status:500});
  if(!changeRequest) return NextResponse.json({error:"Change request not found."},{status:404});
  if(changeRequest.status !== "pending") return NextResponse.json({error:"Change request has already been reviewed."},{status:409});

  if(status === "approved"){
    const raw = changeRequest.changes && typeof changeRequest.changes === "object" ? changeRequest.changes as Record<string,unknown> : {};
    const safe: Record<string,unknown> = {};
    for(const [key,value] of Object.entries(raw)){
      if(!editable.has(key)) continue;
      if(key === "languages" || key === "categories"){
        if(Array.isArray(value) && value.every(v=>typeof v==="string")) safe[key]=value.slice(0,20).map(v=>String(v).slice(0,80));
      } else if(typeof value === "string" || typeof value === "boolean"){
        safe[key]=typeof value === "string" ? value.slice(0,5000) : value;
      }
    }
    const { error:updateError } = await supabaseAdmin.from("providers").update(safe).eq("id",changeRequest.provider_id);
    if(updateError) return NextResponse.json({error:updateError.message},{status:500});
  }

  const { data, error } = await supabaseAdmin
    .from("provider_change_requests")
    .update({status,admin_notes:adminNotes||null,reviewed_at:new Date().toISOString()})
    .eq("id",id)
    .select("id,status,admin_notes,reviewed_at")
    .single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  await supabaseAdmin.from("providers").update({partner_change_requested_at:null}).eq("id",changeRequest.provider_id);
  return NextResponse.json({request:data});
}
