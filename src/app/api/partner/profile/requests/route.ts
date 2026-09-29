import { NextResponse } from "next/server";
import { getProviderContext } from "@/lib/provider-auth";
import { supabaseAdmin } from "@/lib/supabase";

const editable = ["description_fi","description_es","description_en","website_url","booking_url","email","phone","whatsapp","address","region","languages","categories"] as const;

export const dynamic = "force-dynamic";

export async function GET() {
  const context = await getProviderContext();
  if (!context) return NextResponse.json({ error:"Unauthorized" },{status:401});
  const { data, error } = await supabaseAdmin
    .from("provider_change_requests")
    .select("id,changes,status,admin_notes,created_at,reviewed_at")
    .eq("provider_id",context.provider.id)
    .order("created_at",{ascending:false})
    .limit(20);
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({requests:data||[]});
}

export async function POST(request:Request) {
  const context = await getProviderContext();
  if (!context) return NextResponse.json({ error:"Unauthorized" },{status:401});
  const body = await request.json().catch(()=>({}));
  const changes: Record<string,unknown> = {};
  for(const key of editable) {
    if(body[key] === undefined) continue;
    if(["languages","categories"].includes(key)) {
      if(!Array.isArray(body[key]) || body[key].some((v:unknown)=>typeof v!=="string")) return NextResponse.json({error:"Virheellinen lista."},{status:400});
      changes[key]=(body[key] as string[]).slice(0,20).map(v=>v.slice(0,80));
    } else {
      if(typeof body[key] !== "string") return NextResponse.json({error:"Virheellinen kenttä."},{status:400});
      changes[key]=(body[key] as string).trim().slice(0,5000);
    }
  }
  if(!Object.keys(changes).length) return NextResponse.json({error:"Muutoksia ei annettu."},{status:400});
  const { data: pendingRequest, error: pendingError } = await supabaseAdmin
    .from("provider_change_requests")
    .select("id")
    .eq("provider_id", context.provider.id)
    .eq("status", "pending")
    .limit(1)
    .maybeSingle();
  if (pendingError) return NextResponse.json({error: pendingError.message},{status:500});
  if (pendingRequest) return NextResponse.json({error:"Sinulla on jo odottava muutospyyntö."},{status:409});

  const { data, error } = await supabaseAdmin.from("provider_change_requests").insert({
    provider_id:context.provider.id, requested_by:context.user.id, changes
  }).select("id,changes,status,created_at").single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  await supabaseAdmin.from("providers").update({partner_change_requested_at:new Date().toISOString()}).eq("id",context.provider.id);
  return NextResponse.json({request:data},{status:201});
}
