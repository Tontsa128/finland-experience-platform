"use client";
import{useEffect,useState}from"react";
export function CookieConsent(){
 const[visible,setVisible]=useState(false);
 useEffect(()=>{setVisible(document.cookie.indexOf("cookie_consent=")===-1)},[]);
 function choose(value:"all"|"necessary"){document.cookie="cookie_consent="+value+"; Path=/; Max-Age=31536000; SameSite=Lax";setVisible(false);}
 if(!visible)return null;
 return <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"><h2 className="font-semibold text-slate-950">Evästeasetukset</h2><p className="mt-2 text-sm leading-6 text-slate-600">Käytämme välttämättömiä evästeitä sivuston toimintaan. Analytiikka- ja markkinointievästeet otetaan käyttöön vain suostumuksella.</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>choose("necessary")} className="rounded-xl border px-4 py-2 text-sm font-semibold">Vain välttämättömät</button><button onClick={()=>choose("all")} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Hyväksy kaikki</button></div></div>;
}
