'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { X, Sparkles, ArrowUpRight } from 'lucide-react';
type Language = 'fi' | 'es' | 'en';
const answers = {
  fi: { button:'Kysy avustajalta', title:'Suomen matka-avustaja', placeholder:'Esim. haluan rauhallisen mökkiloman...', send:'Etsi', intro:'Kerro mitä etsit. Näytän vaihtoehtoja vain tarkistetusta sisältökatalogista.' },
  es: { button:'Preguntar al asistente', title:'Asistente de viaje en Finlandia', placeholder:'Ej. busco una cabaña tranquila...', send:'Buscar', intro:'Cuéntame qué buscas. Mostraré opciones únicamente del catálogo verificado.' },
  en: { button:'Ask the advisor', title:'Finland travel advisor', placeholder:'E.g. I want a quiet cottage holiday...', send:'Search', intro:'Tell me what you are looking for. I will show options only from the verified catalogue.' },
};
type AdvisorCatalog = {
  destinations: { slug:string; name:Record<string,string>; description:Record<string,string>; tags:string[]; activities:string[]; verified?:boolean }[];
  accommodations: { slug:string; name:Record<string,string>; description:Record<string,string>; location:string; features:string[]; price:number; verified?:boolean }[];
  experiences: { slug:string; name:Record<string,string>; description:Record<string,string>; region:string; tags:string[]; price:number; verified?:boolean }[];
};

export default function TravelAdvisor({ language: initialLanguage, catalog }: { language?: Language; catalog: AdvisorCatalog }) {
  const [language, setLanguage] = useState<Language>(initialLanguage || 'fi');
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState<{type:'destination'|'accommodation'|'experience'; slug:string; reason:string}[]>([]);
  useEffect(() => { const lang = new URLSearchParams(window.location.search).get('lang'); if (lang === 'fi' || lang === 'es' || lang === 'en') setLanguage(lang); }, []);
  const t = answers[language];
  async function ask(e: FormEvent) {
    e.preventDefault(); const q = question.trim(); if (!q || aiLoading) return;
    setAiLoading(true); setAiError(''); setAiAnswer(''); setAiRecommendations([]);
    try {
      const response = await fetch('/api/travel-advisor', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ question:q, language }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Advisor unavailable.');
      setAiAnswer(body.answer || '');
      setAiRecommendations(Array.isArray(body.recommendations) ? body.recommendations : []);
    } catch (error) {
      setAiError(language === 'fi' ? 'Avustaja ei ole juuri nyt saatavilla.' : language === 'es' ? 'El asistente no está disponible ahora.' : 'The advisor is unavailable right now.');
    } finally { setAiLoading(false); }
  }
  return <div className="fixed bottom-5 right-5 z-[60]">
    {!open && <button type="button" onClick={()=>setOpen(true)} aria-expanded="false" className="group flex items-center gap-2 rounded-full border border-white/20 bg-brand-950/95 px-5 py-3.5 text-sm font-extrabold text-white shadow-2xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-brand-950"><Sparkles className="h-4 w-4" /></span>{t.button}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>}
    {open && <div className="absolute bottom-0 right-0 w-[min(92vw,430px)] overflow-hidden rounded-[1.5rem] border border-white/20 bg-white text-slate-900 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between bg-brand-950 px-5 py-4 text-white"><div className="flex items-center gap-2 font-bold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-brand-950"><Sparkles className="h-4 w-4" /></span><div><div className="text-sm">{t.title}</div><div className="text-[10px] font-medium uppercase tracking-[.16em] text-white/55">Finland Experience</div></div></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-white/10"><X className="h-4 w-4" /></button></div>
      <div className="p-5"><p className="text-sm leading-6 text-slate-600">{t.intro}</p><div className="mt-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-emerald-800">{language === "fi" ? "Tarkistettu katalogi" : language === "es" ? "Catálogo verificado" : "Verified catalogue"}</div>
        {aiLoading && <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">{language === 'fi' ? 'Etsin varmennetusta katalogista...' : language === 'es' ? 'Buscando en el catálogo verificado...' : 'Searching the verified catalogue...'}</div>}
        {aiError && <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{aiError}</div>}
        {aiRecommendations.length > 0 && <div className="mt-4 space-y-2"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-brand-600">{language === 'fi' ? 'Suositukset' : language === 'es' ? 'Recomendaciones' : 'Recommendations'}</p>{aiRecommendations.map((r) => {
          const source = r.type === 'destination' ? catalog.destinations.find((x) => x.slug === r.slug) : r.type === 'accommodation' ? catalog.accommodations.find((x) => x.slug === r.slug) : catalog.experiences.find((x) => x.slug === r.slug);
          if (!source || source.verified === false) return null;
          const title = source.name[language] || source.name.en;
          const href = '/' + language + '/' + (r.type === 'accommodation' ? 'accommodations' : r.type === 'destination' ? 'destinations' : 'experiences') + '/' + r.slug;
          const meta = 'location' in source
            ? source.location
            : 'region' in source
              ? source.region
              : source.tags.slice(0,3).join(' · ');
          return <Link key={r.type + r.slug} href={href} className="group block rounded-xl border border-slate-200 p-3 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50"><div className="flex items-start justify-between gap-3"><div><div className="font-display text-lg font-bold text-brand-950">{title}</div><p className="mt-1 text-xs leading-5 text-slate-600">{r.reason}</p><div className="mt-2 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">{meta}</div></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></div></Link>;
        })}</div>}
        {aiAnswer && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-slate-700"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-emerald-800">{language === 'fi' ? 'Varmennettuun tietoon perustuva vastaus' : language === 'es' ? 'Respuesta basada en información verificada' : 'Answer based on verified information'}</p><p className="whitespace-pre-wrap">{aiAnswer}</p></div>}
        <form onSubmit={ask} className="mt-4 flex gap-2"><input value={question} onChange={(e)=>setQuestion(e.target.value)} required placeholder={t.placeholder} aria-label={t.placeholder} className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15" /><button type="submit" className="rounded-xl bg-brand-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800">{t.send}</button></form>
      </div></div>}
  </div>;
}