"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowDown, ArrowRight, CalendarDays, Compass, Sparkles } from "lucide-react";

const copy={
 fi:{eyebrow:"FINNISH SUMMER · SOUTHERN FINLAND",title:"Löydä Suomi, jonka olet aina halunnut kokea.",desc:"Merenrantamökit, omat saunat, saaristopäivät, ruukkikylät ja pitkät valoisat illat. Löydä paikat ja ihmiset aidon suomalaisen kesän takaa.",stay:"LÖYDÄ MAJOITUS",explore:"TUTKI SUOMEA",events:"TULEVAT TAPAHTUMAT",scroll:"Aloita matka"},
 es:{eyebrow:"VERANO FINLANDÉS · SUR DE FINLANDIA",title:"Descubre la Finlandia que siempre has soñado vivir.",desc:"Cabañas junto al mar, saunas privadas, islas, pueblos históricos y largas noches de verano. Encuentra lugares auténticos y reserva directamente con el proveedor.",stay:"ENCUENTRA TU ALOJAMIENTO",explore:"EXPLORA FINLANDIA",events:"PRÓXIMOS EVENTOS",scroll:"Comienza el viaje"},
 en:{eyebrow:"FINNISH SUMMER · SOUTHERN FINLAND",title:"Discover the Finland you’ve been dreaming of.",desc:"Seaside cottages, private saunas, island days, historic villages and long luminous summer evenings. Find authentic places and book directly with the provider.",stay:"FIND YOUR STAY",explore:"EXPLORE FINLAND",events:"UPCOMING EVENTS",scroll:"Start the journey"}
} as const;
export function Hero(){const locale=useLocale() as keyof typeof copy;const c=copy[locale]||copy.en;return <section className="relative min-h-[calc(100svh-120px)] overflow-hidden bg-[#06131b] text-white">
<Image src="https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=2000" alt="Finnish summer cottage and nature in Mathildedal" fill priority sizes="100vw" className="object-cover object-center scale-[1.02]"/>
<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,12,18,.88)_0%,rgba(2,12,18,.62)_42%,rgba(2,12,18,.12)_78%),linear-gradient(0deg,rgba(2,12,18,.72)_0%,transparent_35%,rgba(2,12,18,.18)_100%)]"/>
<div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_75%_30%,rgba(255,214,126,.5),transparent_24%)]"/>
<div className="container-narrow relative z-10 flex min-h-[calc(100svh-120px)] items-end pb-14 pt-20 sm:pb-20 lg:items-center lg:pb-10"><div className="max-w-4xl">
<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[11px] font-bold tracking-[.22em] text-white/90 backdrop-blur-md"><Sparkles className="h-4 w-4 text-amber-300"/>{c.eyebrow}</div>
<h1 className="max-w-4xl font-display text-5xl font-black leading-[.98] tracking-[-.035em] sm:text-6xl lg:text-8xl">{c.title}</h1>
<p className="mt-7 max-w-2xl text-base leading-7 text-white/85 sm:text-xl sm:leading-8">{c.desc}</p>
<div className="mt-9 flex flex-wrap gap-3"><Link href={`/${locale}/accommodations`} className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3.5 text-sm font-black text-slate-950 shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-200">{c.stay}<ArrowRight className="h-4 w-4"/></Link><Link href={`/${locale}/destinations`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur-md transition hover:bg-white hover:text-slate-950"><Compass className="h-4 w-4"/>{c.explore}</Link><Link href={`/${locale}/events`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 py-3.5 text-sm font-bold backdrop-blur-md transition hover:bg-white/15"><CalendarDays className="h-4 w-4"/>{c.events}</Link></div>
<div className="mt-12 hidden items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-white/60 lg:flex"><ArrowDown className="h-4 w-4 animate-bounce"/>{c.scroll}</div>
</div></div></section>}
