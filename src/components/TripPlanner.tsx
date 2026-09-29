'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, Check, Compass, Heart, Sparkles, Waves, TreePine, Utensils } from 'lucide-react';

type Lang = 'fi' | 'es' | 'en';
type Item = { slug:string; name:Record<string,string>; description:Record<string,string>; location?:string; region?:string; features?:string[]; tags?:string[]; activities?:string[]; price?:number };

const ui = {
  fi:{title:'Suunnittele oma Suomen-escapesi',intro:'Kerro muutama asia lomastasi. Saat ehdotuksen kohteesta, majoituksesta ja elämyksestä.',days:'Päivät',people:'Henkilöt',budget:'Budjetti / yö',interests:'Mitä haluat kokea?',plan:'Luo matkasuunnitelma',result:'Sinulle sopiva lähtökohta',destination:'Kohde',stay:'Majoitus',experience:'Elämys',discover:'Tutustu',note:'Suositukset perustuvat sivuston nykyiseen sisältökatalogiin. Hinnat ja saatavuus tarkistetaan palveluntarjoajalta.'},
  es:{title:'Diseña tu escapada a Finlandia',intro:'Cuéntanos algunos detalles de tu viaje y te proponemos destino, alojamiento y experiencia.',days:'Días',people:'Personas',budget:'Presupuesto / noche',interests:'¿Qué quieres vivir?',plan:'Crear mi plan',result:'Tu punto de partida',destination:'Destino',stay:'Alojamiento',experience:'Experiencia',discover:'Descubrir',note:'Las recomendaciones se basan en el catálogo actual del sitio. Confirma precios y disponibilidad con cada proveedor.'},
  en:{title:'Design your Finland escape',intro:'Tell us a few details and we will suggest a destination, stay and experience.',days:'Days',people:'People',budget:'Budget / night',interests:'What do you want to experience?',plan:'Create my plan',result:'Your starting point',destination:'Destination',stay:'Stay',experience:'Experience',discover:'Discover',note:'Recommendations use the site catalogue. Confirm current prices and availability with each provider.'}
} as const;

const choices = [
  ['nature',TreePine,{fi:'Luonto',es:'Naturaleza',en:'Nature'}],
  ['sauna',Sparkles,{fi:'Sauna',es:'Sauna',en:'Sauna'}],
  ['sea',Waves,{fi:'Meri & saaristo',es:'Mar y archipiélago',en:'Sea & archipelago'}],
  ['food',Utensils,{fi:'Ruoka',es:'Gastronomía',en:'Food'}],
  ['romance',Heart,{fi:'Romantiikka',es:'Romántico',en:'Romance'}],
] as const;

export default function TripPlanner({language,catalog}:{language:Lang;catalog:{destinations:Item[];accommodations:Item[];experiences:Item[]}}){
  const t=ui[language];
  const [days,setDays]=useState('4');
  const [people,setPeople]=useState('2');
  const [budget,setBudget]=useState('200');
  const [selected,setSelected]=useState<string[]>(['nature','sauna','sea']);
  const [submitted,setSubmitted]=useState(false);
  const [leadName,setLeadName]=useState('');
  const [leadEmail,setLeadEmail]=useState('');
  const [leadSent,setLeadSent]=useState(false);
  const [leadError,setLeadError]=useState('');

  const toggle=(key:string)=>setSelected(v=>v.includes(key)?v.filter(x=>x!==key):[...v,key]);
  const result=useMemo(()=>{
    const keywords:Record<string,string[]>={
      nature:['nature','luonto','forest','metsä','teijo','hiking','quiet'],
      sauna:['sauna','savusauna'],
      sea:['sea','meri','archipelago','saaristo','coast','water'],
      food:['food','ruoka','restaurant','ravintola','comida','gastronomia'],
      romance:['romantic','romanttinen','pareja','couple']
    };
    const q=selected.flatMap(k=>keywords[k]||[]).join(' ');
    const norm=(x:string)=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const rank=(x:Item)=>selected.reduce((n,k)=>n+(keywords[k]||[]).some(w=>norm([x.name[language]||'',x.description[language]||'',...(x.features||[]),...(x.tags||[]),...(x.activities||[])].join(' ')).includes(norm(w)))?2:0),0);
    const best=(items:Item[])=>[...items].sort((a,b)=>rank(b)-rank(a))[0];
    return {destination:best(catalog.destinations),stay:best(catalog.accommodations),experience:best(catalog.experiences)};
  },[catalog,language,selected]);

  function submit(e:FormEvent){e.preventDefault();setSubmitted(true);document.getElementById('trip-result')?.scrollIntoView({behavior:'smooth',block:'start'});}
  async function sendLead(e:FormEvent){e.preventDefault();setLeadError('');const message=`Trip planner: ${days} days, ${people} people, budget €${budget}/night. Interests: ${selected.join(', ')}. Suggested destination: ${result.destination?.name[language]||''}. Stay: ${result.stay?.name[language]||''}. Experience: ${result.experience?.name[language]||''}.`;const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName:leadName,email:leadEmail,locale:language,leadType:'planner',message,source:'trip-planner',sourcePath:`/${language}/plan`})});const b=await r.json();if(!r.ok){setLeadError(b.error||'Unable to send request.');return;}setLeadSent(true);}

  return <div>
    <section className="rounded-[2rem] bg-brand-950 p-6 text-white shadow-2xl sm:p-10">
      <div className="flex items-center gap-2 text-gold-300"><Compass className="h-5 w-5"/><span className="text-xs font-bold uppercase tracking-[.2em]">Finland Experience</span></div>
      <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">{t.title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">{t.intro}</p>
      <form onSubmit={submit} className="mt-8 grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="rounded-2xl bg-white/10 p-4"><span className="text-xs font-bold uppercase tracking-wider text-white/60">{t.days}</span><input type="number" min="1" max="30" value={days} onChange={e=>setDays(e.target.value)} className="mt-2 w-full bg-transparent text-2xl font-bold outline-none"/></label>
          <label className="rounded-2xl bg-white/10 p-4"><span className="text-xs font-bold uppercase tracking-wider text-white/60">{t.people}</span><input type="number" min="1" max="20" value={people} onChange={e=>setPeople(e.target.value)} className="mt-2 w-full bg-transparent text-2xl font-bold outline-none"/></label>
          <label className="rounded-2xl bg-white/10 p-4"><span className="text-xs font-bold uppercase tracking-wider text-white/60">{t.budget}</span><input type="number" min="0" value={budget} onChange={e=>setBudget(e.target.value)} className="mt-2 w-full bg-transparent text-2xl font-bold outline-none"/></label>
        </div>
        <div><p className="mb-3 text-sm font-bold">{t.interests}</p><div className="flex flex-wrap gap-2">{choices.map(([key,Icon,label])=><button type="button" key={key} onClick={()=>toggle(key)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${selected.includes(key)?'border-gold-300 bg-gold-300 text-brand-950':'border-white/20 bg-white/5 text-white hover:bg-white/10'}`}><Icon className="h-4 w-4"/>{label[language]}</button>)}</div></div>
        <button className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 font-extrabold text-brand-950 transition hover:-translate-y-0.5 hover:bg-gold-300">{t.plan}<ArrowRight className="h-4 w-4"/></button>
      </form>
    </section>
    {submitted && <section id="trip-result" className="mt-10 scroll-mt-20">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-brand-600">{t.result}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {[[t.destination,result.destination,'/destinations/'],[t.stay,result.stay,'/accommodations/'],[t.experience,result.experience,'/experiences/']].map(([label,item,path])=>item&&<Link key={path as string} href={`/${language}${path}${(item as Item).slug}`} className="group rounded-[1.75rem] border border-brand-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">{label as string}</span><Check className="h-4 w-4 text-emerald-600"/></div><h2 className="mt-5 font-display text-2xl font-bold text-brand-950">{(item as Item).name[language]||(item as Item).name.en}</h2><p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{(item as Item).description[language]||(item as Item).description.en}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-700">{t.discover}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span></Link>)}
      </div>
      <div className="mt-8 rounded-[1.5rem] border border-brand-100 bg-brand-50 p-5">
        {leadSent ? <div className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 text-emerald-600"/><div><p className="font-bold text-brand-950">{language==='fi'?'Suunnitelma lähetetty.':language==='es'?'Tu solicitud ha sido enviada.':'Your request has been sent.'}</p><p className="mt-1 text-sm text-slate-600">{language==='fi'?'Palaamme asiaan ja voimme auttaa jatkosuunnittelussa.':language==='es'?'Te ayudaremos con los siguientes pasos.':'We can help you with the next steps.'}</p></div></div> : <form onSubmit={sendLead} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input required value={leadName} onChange={e=>setLeadName(e.target.value)} placeholder={language==='es'?'Tu nombre':'Nimesi'} className="rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"/><input required type="email" value={leadEmail} onChange={e=>setLeadEmail(e.target.value)} placeholder={language==='es'?'Correo electrónico':'Sähköposti'} className="rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold-300"/><button className="rounded-xl bg-brand-950 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800">{language==='fi'?'Lähetä suunnitelma':language==='es'?'Enviar mi plan':'Send my plan'}</button>{leadError&&<p className="text-sm text-red-700 sm:col-span-3">{leadError}</p>}</form>}
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500">{t.note}</p>
    </section>}
  </div>
}
