'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Bot, X, Sparkles, ArrowUpRight } from 'lucide-react';
type Language = 'fi' | 'es' | 'en';
const answers = {
  fi: { button:'Kysy tekoälyltä', title:'Suomen kesäloma-avustaja', placeholder:'Esim. haluan rauhallisen mökkiloman...', send:'Kysy', intro:'Kerro millaista kesälomaa haet, niin etsitään sopivia kohteita.', summer:'Mathildedal, Naantali ja Ahvenanmaa ovat hyviä lähtökohtia rauhalliseen 1–2 viikon lomaan.', sauna:'Teijolta ja saaristosta löytyy savusaunoja, järvisaunoja ja merenrantasaunoja.', family:'Naantali sopii perheille Muumimaailman, rantojen ja saariston ansiosta.', default:'Voin auttaa vertailemaan majoituksia ja tekemistä. Kerro alue, matkaseurue ja toivottu lomatyyli.' },
  es: { button:'Preguntar a la IA', title:'Asistente de verano finlandés', placeholder:'Ej. busco una cabaña tranquila...', send:'Preguntar', intro:'Cuéntame qué tipo de verano buscas y compararemos opciones.', summer:'Mathildedal, Naantali y Åland son buenos puntos de partida para una estancia tranquila de 1–2 semanas.', sauna:'En Teijo y el archipiélago hay saunas de humo, saunas junto al lago y saunas junto al mar.', family:'Naantali es una buena base para familias gracias a Moominworld, playas y actividades del archipiélago.', default:'Puedo ayudarte a comparar alojamiento y actividades. Dime la zona y el estilo de vacaciones que buscas.' },
  en: { button:'Ask the AI', title:'Finnish summer advisor', placeholder:'E.g. I want a quiet cottage holiday...', send:'Ask', intro:'Tell me what kind of summer you want and we can compare options.', summer:'Mathildedal, Naantali and Åland are good starting points for a quiet 1–2 week stay.', sauna:'Teijo and the archipelago offer smoke saunas, lakeside saunas and seaside saunas.', family:'Naantali is a good family base with Moominworld, beaches and archipelago activities.', default:'I can help compare accommodation and activities. Tell me the area and the style of holiday you want.' },
};
type AdvisorCatalog = {
  destinations: { slug:string; name:Record<string,string>; description:Record<string,string>; tags:string[]; activities:string[] }[];
  accommodations: { slug:string; name:Record<string,string>; description:Record<string,string>; location:string; features:string[]; price:number }[];
  experiences: { slug:string; name:Record<string,string>; description:Record<string,string>; region:string; tags:string[]; price:number }[];
};

export default function TravelAdvisor({ language: initialLanguage, catalog }: { language?: Language; catalog: AdvisorCatalog }) {
  const [language, setLanguage] = useState<Language>(initialLanguage || 'fi');
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState<{type:'destination'|'accommodation'|'experience'; slug:string; title:string; description:string; meta:string; href:string}[]>([]);
  useEffect(() => { const lang = new URLSearchParams(window.location.search).get('lang'); if (lang === 'fi' || lang === 'es' || lang === 'en') setLanguage(lang); }, []);
  const t = answers[language];
  function score(text: string, q: string) {
    const words = q.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(/[^a-z0-9åäö]+/).filter((w) => w.length > 2);
    const hay = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return words.reduce((n, word) => n + (hay.includes(word) ? 2 : 0), 0);
  }
  function ask(e: FormEvent) {
    e.preventDefault(); const q = question.trim(); if (!q) return;
    const ranked = [
      ...catalog.destinations.map((d) => ({ type:'destination' as const, slug:d.slug, title:d.name[language] || d.name.en, description:d.description[language] || d.description.en, meta:d.tags.slice(0,3).join(' · '), href:'/'+language+'/destinations/'+d.slug, rank:score([d.name[language] || '', d.description[language] || '', ...d.tags, ...d.activities].join(' '), q) })),
      ...catalog.accommodations.map((a) => ({ type:'accommodation' as const, slug:a.slug, title:a.name[language] || a.name.en, description:a.description[language] || a.description.en, meta:a.price ? '€'+a.price+'/night · '+a.location : a.location, href:'/'+language+'/accommodations/'+a.slug, rank:score([a.name[language] || '', a.description[language] || '', a.location, ...a.features].join(' '), q) })),
      ...catalog.experiences.map((x) => ({ type:'experience' as const, slug:x.slug, title:x.name[language] || x.name.en, description:x.description[language] || x.description.en, meta:x.price ? '€'+x.price : x.region, href:'/'+language+'/experiences/'+x.slug, rank:score([x.name[language] || '', x.description[language] || '', x.region, ...x.tags].join(' '), q) })),
    ].sort((a,b) => b.rank-a.rank).filter((x) => x.rank > 0).slice(0,3);
    if (hasDuration) ranked.forEach((item) => { item.meta = (item.meta ? item.meta + ' · ' : '') + q.match(/\\d+\\s*(?:päivä|paiva|days?|dias?)/i)?.[0]; });
    setResults(ranked.length ? ranked : catalog.destinations.slice(0,2).map((d) => ({ type:'destination' as const, slug:d.slug, title:d.name[language] || d.name.en, description:d.description[language] || d.description.en, meta:d.tags.slice(0,3).join(' · '), href:'/'+language+'/destinations/'+d.slug })));
  }
  return <div className="fixed bottom-5 right-5 z-[60]">
    {!open && <button type="button" onClick={()=>setOpen(true)} aria-expanded="false" className="group flex items-center gap-2 rounded-full border border-white/20 bg-brand-950/95 px-5 py-3.5 text-sm font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-brand-950"><Sparkles className="h-4 w-4" /></span>{t.button}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>}
    {open && <div className="absolute bottom-0 right-0 w-[min(92vw,430px)] overflow-hidden rounded-[1.5rem] border border-white/20 bg-white text-slate-900 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between bg-brand-950 px-5 py-4 text-white"><div className="flex items-center gap-2 font-bold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-brand-950"><Sparkles className="h-4 w-4" /></span><div><div className="text-sm">{t.title}</div><div className="text-[10px] font-medium uppercase tracking-[.16em] text-white/55">Finland Experience</div></div></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-white/10"><X className="h-4 w-4" /></button></div>
      <div className="p-5"><p className="text-sm leading-6 text-slate-600">{t.intro}</p>
        {results.length > 0 && <div className="mt-4 space-y-2"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-brand-600">{language === 'fi' ? 'Sinulle sopivia ideoita' : language === 'es' ? 'Ideas para ti' : 'Ideas for you'}</p>{results.map((r) => <Link key={r.type+r.slug} href={r.href} className="group block rounded-xl border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50"><div className="flex items-start justify-between gap-3"><div><div className="font-display text-lg font-bold text-brand-950">{r.title}</div><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{r.description}</p><div className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{r.meta}</div></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div></Link>)}</div>}
        <form onSubmit={ask} className="mt-4 flex gap-2"><input value={question} onChange={(e)=>setQuestion(e.target.value)} required placeholder={t.placeholder} aria-label={t.placeholder} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15" /><button type="submit" className="rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800">{t.send}</button></form>
      </div></div>}
  </div>;
}