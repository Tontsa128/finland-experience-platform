"use client";
import Link from "next/link";
import { useEffect,useMemo,useState } from "react";

type Locale="fi"|"en"|"es";
type Copy={eyebrow:string;title:string;text:string;buttonLabel:string;buttonUrl:string};
type Block={id:string;type:string;imageUrl:string;imageAlt:string;layout:string;visible:boolean;content:Record<Locale,Copy>;items:any[]};
type Slide={id:string;imageUrl:string;imageAlt?:Record<Locale,string>;focal?:{x:number;y:number};imageLicense?:string;imageSourcePage?:string;credit?:string;creditUrl?:string;href:string;external?:boolean;durationMs?:number;enabled?:boolean;imageReviewed?:boolean;copy:Record<Locale,{eyebrow:string;title:string;text:string;cta:string}>};

const locales:[Locale,string][]=[["fi","Suomi"],["es","Español"],["en","English"]];
const emptyCopy=():Copy=>({eyebrow:"",title:"",text:"",buttonLabel:"",buttonUrl:""});
const emptyBlock=(type="text"):Block=>({id:crypto.randomUUID(),type,imageUrl:"",imageAlt:"",layout:"wide",visible:true,content:{fi:emptyCopy(),en:emptyCopy(),es:emptyCopy()},items:[]});
const emptySlide=():Slide=>({id:crypto.randomUUID(),imageUrl:"",href:"/destinations",durationMs:3000,enabled:true,copy:{fi:{eyebrow:"",title:"",text:"",cta:""},en:{eyebrow:"",title:"",text:"",cta:""},es:{eyebrow:"",title:"",text:"",cta:""}}});

export default function SiteBuilder(){
 const [mode,setMode]=useState<"pages"|"carousel">("pages");
 const [pages,setPages]=useState<any[]>([]); const [page,setPage]=useState<any>(null); const [locale,setLocale]=useState<Locale>("fi");
 const [blocks,setBlocks]=useState<Block[]>([]); const [slides,setSlides]=useState<Slide[]>([]);
 const [media,setMedia]=useState<any[]>([]); const [notice,setNotice]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const [slidePreviewLocale,setSlidePreviewLocale]=useState<Locale>("fi"); const [brokenSlideImages,setBrokenSlideImages]=useState<Record<string,boolean>>({});

 useEffect(()=>{Promise.all([fetch("/api/admin/pages",{cache:"no-store"}),fetch("/api/admin/media",{cache:"no-store"}),fetch("/api/admin/homepage/slides",{cache:"no-store"})]).then(async([p,m,s])=>{const pb=await p.json(),mb=await m.json(),sb=await s.json();setPages(pb.pages||[]);setMedia(mb.media||[]);setSlides(sb.slides||[]);}).catch(e=>setError(e.message||"Lataus epäonnistui."));},[]);
 const localizedPages=useMemo(()=>pages.filter(p=>p.locale===locale),[pages,locale]);

 function choosePage(p:any){setPage(p);setBlocks(Array.isArray(p.blocks)?p.blocks:[]);}
 function patchBlock(index:number,patch:Partial<Block>){setBlocks(b=>b.map((x,i)=>i===index?{...x,...patch}:x));}
 function patchCopy(index:number,field:keyof Copy,value:string){setBlocks(b=>b.map((x,i)=>i===index?{...x,content:{...x.content,[locale]:{...x.content[locale],[field]:value}}}:x));}
 function moveBlock(i:number,dir:number){setBlocks(b=>{const n=i+dir;if(n<0||n>=b.length)return b;const x=[...b];[x[i],x[n]]=[x[n],x[i]];return x;});}
 function addBlock(type:string){setBlocks(b=>[...b,emptyBlock(type)]);}
 function selectImage(url:string,index:number){patchBlock(index,{imageUrl:url});}
 async function saveBlocks(){if(!page)return;setBusy(true);setError("");setNotice("");try{const r=await fetch("/api/admin/pages/blocks",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug:page.slug,locale:page.locale,blocks})});const b=await r.json();if(!r.ok)throw new Error(b.error||"Tallennus epäonnistui.");setPage({...page,blocks:b.page.blocks});setPages(ps=>ps.map(p=>p.id===page.id?{...p,blocks:b.page.blocks}:p));setNotice("Sivu tallennettu.");}catch(e){setError(e instanceof Error?e.message:"Tallennus epäonnistui.");}finally{setBusy(false);}}
 function setSlideImage(index:number,url:string){const slide=slides[index];if(slide)setBrokenSlideImages(current=>({...current,[slide.id]:false}));setSlides(current=>current.map((item,n)=>n===index?{...item,imageUrl:url,imageReviewed:false}:item));}
 function isSecureImageUrl(value:string){try{return new URL(value).protocol==="https:";}catch{return false;}}
 function isSafeSlideLink(value:string){const url=value.trim();if(url.startsWith("/")&&!url.startsWith("//"))return true;try{return new URL(url).protocol==="https:";}catch{return false;}}
 async function saveSlides(){
  setError("");setNotice("");
  const incompleteIndex=slides.findIndex(slide=>slide.enabled!==false&&(
   !isSecureImageUrl(slide.imageUrl.trim())||
   Boolean(brokenSlideImages[slide.id])||
   slide.imageReviewed!==true||
   !isSafeSlideLink(slide.href)||
   (Boolean(slide.creditUrl?.trim())&&!isSafeSlideLink(slide.creditUrl||""))||
   locales.some(([language])=>{
    const copy=slide.copy?.[language];
    return !copy?.title?.trim()||!copy?.text?.trim()||!copy?.cta?.trim();
   })
  ));
  if(incompleteIndex>=0){
   const missing=locales.filter(([language])=>{
    const copy=slides[incompleteIndex]?.copy?.[language];
    return !copy?.title?.trim()||!copy?.text?.trim()||!copy?.cta?.trim();
   }).map(([,name])=>name);
   const imageReviewMissing=slides[incompleteIndex]?.imageReviewed!==true;
   setError(`Karusellin dia ${incompleteIndex+1}: varmista HTTPS-kuva, turvallinen linkki, kuvan ja tekstien vastaavuus sekä otsikko, kuvaus ja painiketeksti kaikilla kielillä.${imageReviewMissing?" Kuva/teksti-tarkistus puuttuu.":""} Puutteelliset kielet: ${missing.join(", ")}.`);
   return;
  }
  setBusy(true);
  try{
   const r=await fetch("/api/admin/homepage/slides",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slides})});
   const b=await r.json();
   if(!r.ok)throw new Error(b.error||"Karusellin tallennus epäonnistui.");
   setSlides(b.slides||slides);setNotice("Karuselli tallennettu.");
  }catch(e){setError(e instanceof Error?e.message:"Karusellin tallennus epäonnistui.");}
  finally{setBusy(false);}
 }
 const mediaButtons=(onPick:(url:string)=>void)=><div className="mt-3 grid max-h-48 grid-cols-4 gap-2 overflow-auto">{media.map(m=><button type="button" key={m.id} onClick={()=>onPick(m.url)} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 hover:border-emerald-500"><img src={m.url} alt="" className="h-full w-full object-cover"/></button>)}</div>;
 return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-7xl">
  <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">FINNEXPRIENCE STUDIO</p><h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">Sivuston visuaalinen editori</h1><p className="mt-2 max-w-3xl text-slate-500">Muokkaa sivujen osioita, kuvia, tekstejä, CTA-painikkeita ja etusivun karusellia ilman koodia.</p></div><Link href="/admin/cms" className="font-semibold text-emerald-700">← CMS</Link></header>
  <div className="mt-7 flex flex-wrap gap-2"><button onClick={()=>setMode("pages")} className={mode==="pages"?"rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white":"rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-600"}>Sivurakentaja</button><button onClick={()=>setMode("carousel")} className={mode==="carousel"?"rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white":"rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-600"}>Etusivun karuselli</button></div>
  {mode==="pages"?<div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
   <aside className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex gap-2">{locales.map(([l,n])=><button key={l} onClick={()=>{setLocale(l);setPage(null)}} className={locale===l?"rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white":"rounded-lg border px-3 py-2 text-xs font-bold"}>{n}</button>)}</div><div className="mt-4 space-y-2">{localizedPages.map(p=><button key={p.id} onClick={()=>choosePage(p)} className={"w-full rounded-xl border p-3 text-left "+(page?.id===p.id?"border-emerald-400 bg-emerald-50":"border-slate-200")}><b>{p.title}</b><span className="mt-1 block text-xs text-slate-400">/{p.slug}</span></button>)}</div></aside>
   <section className="space-y-5">
    {!page?<div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Valitse muokattava sivu.</div>:<>
     <div className="sticky top-3 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur"><b className="mr-auto">{page.title}</b>{["hero","text","image","image_text","gallery","cta","spacer"].map(t=><button key={t} onClick={()=>addBlock(t)} className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold hover:bg-emerald-50">+ {t}</button>)}<button disabled={busy} onClick={saveBlocks} className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-bold text-white">{busy?"Tallennetaan…":"Tallenna"}</button></div>
     {blocks.map((b,i)=><article key={b.id} className={"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm "+(!b.visible?"opacity-50":"")}>
      <div className="flex items-center gap-2"><span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold">{b.type}</span><button onClick={()=>moveBlock(i,-1)} className="ml-auto rounded-lg border px-2 py-1 text-xs">↑</button><button onClick={()=>moveBlock(i,1)} className="rounded-lg border px-2 py-1 text-xs">↓</button><button onClick={()=>patchBlock(i,{visible:!b.visible})} className="rounded-lg border px-2 py-1 text-xs">{b.visible?"Piilota":"Näytä"}</button><button onClick={()=>setBlocks(x=>x.filter((_,n)=>n!==i))} className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-700">Poista</button></div>
      {b.type!=="spacer"&&<div className="mt-4 grid gap-4 md:grid-cols-2"><label className="text-xs font-bold">Kuvan URL<input value={b.imageUrl} onChange={e=>patchBlock(i,{imageUrl:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label><label className="text-xs font-bold">Kuvan alt<input value={b.imageAlt} onChange={e=>patchBlock(i,{imageAlt:e.target.value})} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label></div>}
      {(b.type==="image"||b.type==="image_text"||b.type==="hero")&&mediaButtons(url=>selectImage(url,i))}
      {b.type==="image_text"&&<label className="mt-3 block text-xs font-bold">Kuvan sijainti<select value={b.layout} onChange={e=>patchBlock(i,{layout:e.target.value})} className="mt-1 rounded-lg border px-3 py-2"><option value="wide">Kuva vasemmalla</option><option value="image-right">Kuva oikealla</option></select></label>}
      {b.type!=="spacer"&&<div className="mt-5 grid gap-3">{[["eyebrow","Pieni otsikko"],["title",b.type==="cta"?"Otsikko":"Otsikko"],["text","Teksti"],["buttonLabel","Painikkeen teksti"],["buttonUrl","Painikkeen URL"]].map(([field,label])=><label key={field} className="text-xs font-bold">{label}<textarea rows={field==="text"?4:1} value={(b.content[locale] as any)[field]} onChange={e=>patchCopy(i,field as keyof Copy,e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label>)}</div>}
     </article>)}
    </>}
   </section>
  </div>:<section className="mt-6 space-y-5">
   <div className="flex flex-wrap items-center gap-3"><div className="mr-auto max-w-3xl text-sm text-slate-600"><p>Täällä hallitset etusivun kaikki diat, kuvat, tekstit, linkit ja vaihtumisajan.</p><p className="mt-2 rounded-lg bg-amber-50 p-3 text-amber-900">Tärkeää: valitse jokaiseen diaan kuva, joka näyttää juuri tekstissä mainitun kohteen tai palvelun. Suosi palveluntarjoajan omia kuvia. Majoitusdiaan majoituksen kuva, ravintoladiaan ravintolan kuva ja saunadiaan kyseisen saunan kuva. Älä käytä yleistä tai toiseen palveluun kuuluvaa kuvaa vain täytteenä.</p></div><button onClick={()=>setSlides(s=>[...s,emptySlide()])} className="rounded-xl border bg-white px-4 py-3 text-sm font-bold">+ Lisää dia</button><button disabled={busy} onClick={saveSlides} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">{busy?"Tallennetaan…":"Tallenna karuselli"}</button></div>
   <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3"><span className="mr-2 text-xs font-bold uppercase tracking-wide text-slate-500">Esikatselun kieli</span>{locales.map(([l,n])=><button type="button" key={l} onClick={()=>setSlidePreviewLocale(l)} className={slidePreviewLocale===l?"rounded-lg bg-slate-950 px-3 py-2 text-xs font-bold text-white":"rounded-lg border px-3 py-2 text-xs font-bold text-slate-600"}>{n}</button>)}</div>
   {slides.map((s,i)=><article key={s.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><b>Dia {i+1}</b><button onClick={()=>setSlides(x=>x.filter((_,n)=>n!==i))} className="ml-auto rounded-lg border border-red-200 px-3 py-1 text-xs text-red-700">Poista</button></div>
    <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(280px,0.9fr)_1.1fr]"><div><div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900 text-white">{s.imageUrl&&<img src={s.imageUrl} alt="" onError={()=>setBrokenSlideImages(current=>({...current,[s.id]:true}))} className="absolute inset-0 h-full w-full object-cover"/>}{brokenSlideImages[s.id]&&<div className="absolute inset-x-2 top-2 rounded-lg bg-red-700/95 px-3 py-2 text-xs font-bold text-white">Kuva ei latautunut. Vaihda kuva ennen tallennusta.</div>}<div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-200">{s.copy[slidePreviewLocale].eyebrow||" "}</p><h3 className="mt-1 line-clamp-2 text-lg font-bold leading-tight sm:text-xl">{s.copy[slidePreviewLocale].title||"Dian otsikko"}</h3><p className="mt-2 line-clamp-3 text-xs leading-5 text-white/90 sm:text-sm">{s.copy[slidePreviewLocale].text||"Dian kuvaus näkyy tässä esikatselussa."}</p><span className="mt-3 inline-flex rounded-full bg-amber-300 px-3 py-2 text-xs font-bold text-slate-950">{s.copy[slidePreviewLocale].cta||"Painiketeksti"}</span></div></div>{mediaButtons(url=>setSlideImage(i,url))}</div>
    <div className="grid gap-3 md:grid-cols-2"><label className="text-xs font-bold">Kuvan URL<input value={s.imageUrl} onChange={e=>setSlideImage(i,e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>{locales.map(([language,name])=><label key={language} className="text-xs font-bold">Kuvan vaihtoehtoinen teksti · {name}<input value={s.imageAlt?.[language]||""} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,imageReviewed:false,imageAlt:{...z.imageAlt,[language]:e.target.value}}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>)}
     <label className="text-xs font-bold">Rajaus X (0–100)<input type="number" min="0" max="100" value={s.focal?.x??50} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,focal:{x:Math.max(0,Math.min(100,Number(e.target.value))),y:z.focal?.y??60},imageReviewed:false}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
     <label className="text-xs font-bold">Rajaus Y (0–100)<input type="number" min="0" max="100" value={s.focal?.y??60} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,focal:{x:z.focal?.x??50,y:Math.max(0,Math.min(100,Number(e.target.value)))},imageReviewed:false}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
     <label className="text-xs font-bold">Kuvan lisenssi<input value={s.imageLicense||""} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,imageLicense:e.target.value}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
     <label className="text-xs font-bold">Kuvan lähdesivu<input value={s.imageSourcePage||""} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,imageSourcePage:e.target.value}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-xs font-bold">Linkki<input value={s.href} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,href:e.target.value}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-xs font-bold">Krediitti<input value={s.credit||""} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,credit:e.target.value}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-xs font-bold">Krediittilinkki<input value={s.creditUrl||""} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,creditUrl:e.target.value}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="text-xs font-bold">Vaihtumisaika (ms)<input type="number" min="1500" max="20000" value={s.durationMs||3000} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,durationMs:Number(e.target.value)}:z))} className="mt-1 w-full rounded-lg border px-3 py-2"/></label><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={s.enabled!==false} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,enabled:e.target.checked}:z))}/> Dia käytössä</label><label className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-950 md:col-span-2"><input type="checkbox" checked={s.imageReviewed===true} onChange={e=>setSlides(x=>x.map((z,n)=>n===i?{...z,imageReviewed:e.target.checked}:z))}/> Olen tarkistanut esikatselusta, että kuva vastaa otsikkoa ja kuvausta kaikilla kolmella kielellä.</label>
     </div></div>
    <div className="mt-5 border-t pt-5">{locales.map(([l,n])=><div key={l} className="mt-4"><p className="text-xs font-bold uppercase text-slate-400">{n}</p><div className="mt-2 grid gap-3 md:grid-cols-2">{(["eyebrow","title","text","cta"] as const).map(k=><label key={k} className="text-xs font-bold">{k}<textarea rows={k==="text"?3:1} value={s.copy[l][k]} onChange={e=>setSlides(x=>x.map((z,nr)=>nr===i?{...z,imageReviewed:(k==="eyebrow"||k==="title"||k==="text")?false:z.imageReviewed,copy:{...z.copy,[l]:{...z.copy[l],[k]:e.target.value}}}:z))} className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"/></label>)}</div></div>)}</div>
   </article>)}
  </section>}
  {(notice||error)&&<div className={error?"mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700":"mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"}>{error||notice}</div>}
 </div></main>;
}