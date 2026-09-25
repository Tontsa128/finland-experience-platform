"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Item={id:string;locale:"fi"|"es"|"en";label:string;href:string;sort_order:number;active:boolean;location:string};
const empty={locale:"fi" as const,label:"",href:"",sort_order:0,active:true,location:"header"};

export default function NavigationAdmin(){
 const [items,setItems]=useState<Item[]>([]); const [form,setForm]=useState(empty); const [editing,setEditing]=useState<string|null>(null); const [error,setError]=useState("");
 async function load(){const r=await fetch("/api/admin/navigation",{cache:"no-store"});const b=await r.json();if(!r.ok)throw new Error(b.error);setItems(b.items||[]);}
 useEffect(()=>{load().catch(e=>setError(e.message));},[]);
 async function save(){
  setError(""); const r=await fetch("/api/admin/navigation",{method:editing?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(editing?{...form,id:editing}:form)}); const b=await r.json();
  if(!r.ok){setError(b.error||"Tallennus epäonnistui");return;} setEditing(null);setForm(empty);await load();
 }
 async function remove(id:string){if(!confirm("Poistetaanko valikkokohta?"))return;const r=await fetch("/api/admin/navigation?id="+id,{method:"DELETE"});if(!r.ok){const b=await r.json();setError(b.error||"Poisto epäonnistui");return;}await load();}
 function edit(i:Item){setEditing(i.id);setForm({locale:i.locale,label:i.label,href:i.href,sort_order:i.sort_order,active:i.active,location:i.location});}
 return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl">
  <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">CMS / Navigaatio</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Päävalikko</h1><p className="mt-2 text-slate-500">Muokkaa valikon tekstejä ja linkkejä kielikohtaisesti.</p></div><Link href="/admin/cms" className="text-sm font-semibold text-emerald-700">← CMS</Link></div>
  <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">{editing?"Muokkaa kohtaa":"Lisää valikkokohta"}</h2><div className="mt-5 grid gap-4 md:grid-cols-5">
   <select value={form.locale} onChange={e=>setForm({...form,locale:e.target.value as Item["locale"]})} className="rounded-xl border p-3"><option value="fi">FI</option><option value="es">ES</option><option value="en">EN</option></select>
   <input value={form.label} onChange={e=>setForm({...form,label:e.target.value})} placeholder="Teksti" className="rounded-xl border p-3"/>
   <input value={form.href} onChange={e=>setForm({...form,href:e.target.value})} placeholder="/destinations" className="rounded-xl border p-3"/>
   <input type="number" value={form.sort_order} onChange={e=>setForm({...form,sort_order:Number(e.target.value)})} className="rounded-xl border p-3"/>
   <label className="flex items-center gap-2 rounded-xl border px-3"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Aktiivinen</label>
  </div><div className="mt-4 flex gap-3"><button onClick={save} className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white">{editing?"Tallenna":"Lisää"}</button>{editing&&<button onClick={()=>{setEditing(null);setForm(empty)}} className="rounded-xl bg-slate-100 px-5 py-3 font-semibold">Peruuta</button>}</div>{error&&<p className="mt-4 text-sm text-red-600">{error}</p>}</section>
  <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="grid grid-cols-[60px_1fr_1fr_80px_120px] gap-3 border-b bg-slate-50 px-5 py-3 text-xs font-semibold uppercase text-slate-500"><span>Kieli</span><span>Teksti</span><span>Linkki</span><span>Järj.</span><span></span></div>
   {items.map(i=><div key={i.id} className="grid grid-cols-[60px_1fr_1fr_80px_120px] items-center gap-3 border-b px-5 py-4 text-sm last:border-0"><span className="font-semibold">{i.locale.toUpperCase()}</span><span>{i.label}</span><span className="truncate text-slate-500">{i.href}</span><span>{i.sort_order}</span><span className="flex gap-3"><button onClick={()=>edit(i)} className="font-semibold text-emerald-700">Muokkaa</button><button onClick={()=>remove(i.id)} className="font-semibold text-red-600">Poista</button></span></div>)}
   {items.length===0&&<p className="p-6 text-sm text-slate-500">Ei valikkokohtia vielä.</p>}
  </section>
 </div></main>;
}
