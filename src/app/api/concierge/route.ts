import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const languages = new Set(["fi","en","es"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const language = languages.has(body.language) ? body.language : "fi";
  const question = typeof body.question === "string" ? body.question.trim().slice(0, 1500) : "";
  const rawDays = Number(body.days);
  const rawPeople = Number(body.people);
  const rawBudget = Number(body.budget);
  const days = Number.isFinite(rawDays) ? Math.min(Math.max(Math.floor(rawDays), 1), 14) : 1;
  const people = Number.isFinite(rawPeople) ? Math.min(Math.max(Math.floor(rawPeople), 1), 20) : 1;
  const budget = Number.isFinite(rawBudget) ? Math.min(Math.max(rawBudget, 0), 100000) : 0;
  const interests = Array.isArray(body.interests) ? body.interests.filter((x: unknown) => typeof x === "string").map((x: string) => x.trim().slice(0,50)).filter(Boolean).slice(0,10) : [];
  if (!question) return NextResponse.json({ error: "Question is required." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const [d,p,e] = await Promise.all([
    supabase.from("destinations").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,tags,activities,verified").eq("status","PUBLISHED").eq("verified",true).limit(100),
    supabase.from("properties").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,location,features,price,verified").eq("status","PUBLISHED").eq("verified",true).limit(100),
    supabase.from("experiences").select("slug,name_fi,name_en,name_es,description_fi,description_en,description_es,region,tags,price,verified").eq("status","PUBLISHED").eq("verified",true).limit(100)
  ]);
  if(d.error||p.error||e.error) return NextResponse.json({error:"Verified catalogue is temporarily unavailable."},{status:503});
  const catalog={destinations:d.data||[],accommodations:p.data||[],experiences:e.data||[]};
  const langName=language==="es"?"European Spanish":language==="en"?"English":"Finnish";
  const prompt=[
    "You are a premium Finland travel concierge.",
    "Use ONLY the VERIFIED CATALOGUE. Never invent services, availability, opening hours, prices, distances, amenities or booking conditions.",
    "Create a practical inspiration plan for the requested number of days. This is not a booking and must not imply availability.",
    "Return ONLY JSON: {"summary":"string","days":[{"day":1,"title":"string","items":[{"type":"destination"|"accommodation"|"experience","slug":"exact catalog slug","reason":"catalog-based reason"}]}],"recommendations":[{"type":"destination"|"accommodation"|"experience","slug":"exact catalog slug","reason":"short catalog-based reason"}]}",
    "Use 1-2 catalog items per day, maximum 6 days in the response. Use at most 3 recommendations. Every slug must exist in the verified catalogue.",
    "If the catalogue lacks enough matching content, keep the plan shorter rather than inventing content.",
    "Write in "+langName+".",
    "Trip length: "+days+" days. People: "+people+". Budget per night: €"+budget+". Interests: "+JSON.stringify(interests)+".",
    "Customer request: "+question,
    "VERIFIED CATALOGUE: "+JSON.stringify(catalog)
  ].join("\n\n");
  const key=process.env.OPENAI_API_KEY;
  if(!key) return NextResponse.json({error:"AI concierge is not configured."},{status:503});
  const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"content-type":"application/json",authorization:"Bearer "+key},body:JSON.stringify({model:process.env.OPENAI_ADVISOR_MODEL||process.env.OPENAI_TRANSLATION_MODEL||"gpt-5.6-luna",input:prompt,max_output_tokens:1400})});
  if(!response.ok) return NextResponse.json({error:"AI concierge is temporarily unavailable."},{status:503});
  const data=await response.json();const raw=typeof data.output_text==="string"?data.output_text.trim():"";
  if(!raw) return NextResponse.json({error:"AI concierge returned no answer."},{status:503});
  let parsed:any;try{parsed=JSON.parse(raw)}catch{return NextResponse.json({error:"AI concierge returned invalid plan."},{status:503})};
  const valid=new Set([...d.data!.map(x=>"destination:"+x.slug),...p.data!.map(x=>"accommodation:"+x.slug),...e.data!.map(x=>"experience:"+x.slug)]);
  const clean=(x:any)=>x&&typeof x==="object"&&typeof x.type==="string"&&typeof x.slug==="string"&&valid.has(x.type+":"+x.slug)?{type:x.type,slug:x.slug,reason:typeof x.reason==="string"?x.reason.slice(0,300):""}:null;
  const recommendations=Array.isArray(parsed.recommendations)?parsed.recommendations.map(clean).filter(Boolean).slice(0,3):[];
  const plan=Array.isArray(parsed.days)?parsed.days.slice(0,6).map((day:any,i:number)=>({day:i+1,title:typeof day?.title==="string"?day.title.slice(0,160):"Day "+(i+1),items:Array.isArray(day?.items)?day.items.map(clean).filter(Boolean).slice(0,2):[]})).filter((x:any)=>x.items.length):[];
  const summary=typeof parsed.summary==="string"?parsed.summary.trim().slice(0,1000):"";
  if(!summary&&!plan.length)return NextResponse.json({error:"AI concierge returned no usable plan."},{status:503});
  return NextResponse.json({summary,days:plan,recommendations,verifiedOnly:true});
}
