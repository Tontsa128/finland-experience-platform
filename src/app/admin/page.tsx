"use client";
import Link from "next/link";
import { BarChart3, BedDouble, CalendarDays, ImageIcon, MessageSquare, Settings2, Sparkles } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

const cards=[
 {href:"/admin/properties",label:"Majoitukset",text:"Mökit, huvilat, saaristokohteet, hinnat ja saatavuus.",icon:BedDouble},
 {href:"/admin/destinos",label:"Kohteet",text:"Suomen alueet ja matkakohteet.",icon:Sparkles},
 {href:"/admin/experiences",label:"Experiences",text:"Sauna, veneily, kalastus ja muut elämykset.",icon:CalendarDays},
 {href:"/admin/media",label:"Media",text:"Kuvapankki ja FI/ES/EN alt-tekstit.",icon:ImageIcon},
 {href:"/admin/inquiries",label:"Yhteydenotot",text:"Varaus- ja yhteydenottopyynnöt.",icon:MessageSquare},
 {href:"/admin/settings",label:"Asetukset",text:"Brändi, fontit, WhatsApp ja globaalit asetukset.",icon:Settings2}
];

export default function AdminDashboard(){
 return <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8"><div className="mx-auto max-w-7xl">
  <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
   <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Finland Experience</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Matkailusivuston hallinta</h1><p className="mt-2 max-w-2xl text-slate-300">Hallitse kohteita, majoituksia, elämyksiä, mediaa, SEO:ta ja yhteydenottoja.</p></div>
   <AdminLogoutButton />
  </header>
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cards.map(({href,label,text,icon:Icon})=><Link key={href} href={href} className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:bg-white/10"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><Icon className="h-5 w-5"/></div><h2 className="mt-5 text-xl font-semibold">{label}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p><span className="mt-5 inline-block text-sm font-semibold text-emerald-300">Avaa →</span></Link>)}</section>
  <section className="mt-8 grid gap-4 md:grid-cols-3">{[["SEO","FI / ES / EN","Hreflang, canonical, Open Graph ja sitemap."],["Performance","Next Image","Kuvat ja Server Components suorituskyky edellä."],["Trust","WhatsApp + reviews","Espanjan markkinoille tärkeät yhteydenotto- ja luottamuselementit."]].map(([title,value,desc])=><div key={title} className="rounded-2xl border border-white/10 bg-slate-900 p-5"><div className="text-sm text-slate-400">{title}</div><div className="mt-1 text-lg font-semibold">{value}</div><div className="mt-2 text-sm leading-6 text-slate-400">{desc}</div></div>)}</section>
 </div></main>;
}
