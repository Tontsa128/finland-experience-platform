import { NextRequest,NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getAdminContext } from "@/lib/admin-auth";
import { isSafeUrlOrPath } from "@/lib/utils";
export const dynamic="force-dynamic";
const locales=["fi","en","es"] as const;
function guard(){return getAdminContext().then(a=>a&&["SUPER_ADMIN","ADMIN","CONTENT_MANAGER","EDITOR"].includes(a.profile.role)?a:null)}
function clean(v:any){
 if(!Array.isArray(v))return [];
 return v.slice(0,30).map((r:any,i:number)=>({id:String(r?.id||crypto.randomUUID()),imageUrl:String(r?.imageUrl||"").trim(),credit:String(r?.credit||"").slice(0,300),creditUrl:String(r?.creditUrl||"").slice(0,500),href:isSafeUrlOrPath(String(r?.href||"/destinations"))?String(r?.href||"/destinations"):"/destinations",external:Boolean(r?.external),sortOrder:i,durationMs:Math.max(1500,Math.min(20000,Number(r?.durationMs||3000))),enabled:r?.enabled!==false,copy:Object.fromEntries(locales.map(l=>[l,{eyebrow:String(r?.copy?.[l]?.eyebrow||"").slice(0,300),title:String(r?.copy?.[l]?.title||"").slice(0,300),text:String(r?.copy?.[l]?.text||"").slice(0,2000),cta:String(r?.copy?.[l]?.cta||"").slice(0,200)}]))})).filter((r:any)=>r.imageUrl);
}
export async function GET(){const a=await guard();if(!a)return NextResponse.json({error:"Forbidden"},{status:403});const {data,error}=await supabaseAdmin.from("site_settings").select("homepage_slides").eq("singleton",true).maybeSingle();if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({slides:Array.isArray(data?.homepage_slides)?data.homepage_slides:[]})}
export async function PUT(req:NextRequest){const a=await guard();if(!a)return NextResponse.json({error:"Forbidden"},{status:403});try{const slides=clean((await req.json())?.slides);const {data,error}=await supabaseAdmin.from("site_settings").upsert({singleton:true,homepage_slides:slides,updated_at:new Date().toISOString()},{onConflict:"singleton"}).select("homepage_slides").single();if(error)return NextResponse.json({error:error.message},{status:400});await supabaseAdmin.from("cms_revisions").insert({entity_type:"homepage_slides",entity_id:"singleton",payload:{slides},created_by:a.user.id});return NextResponse.json({slides:data?.homepage_slides||slides})}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Virhe"},{status:400})}}
