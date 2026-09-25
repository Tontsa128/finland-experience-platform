"use client";
import{MessageCircle}from"lucide-react";
export function WhatsAppButton({phone="+358000000000",locale="es"}:{phone?:string;locale?:string}){
 const messages={fi:"Hei! Olen kiinnostunut Suomen matkasta.",es:"Hola! Estoy interesado/a en unas vacaciones en Finlandia.",en:"Hello! I am interested in a holiday in Finland."};
 const normalized=phone.replace(/[^0-9]/g,"");
 const href="https://wa.me/"+normalized+"?text="+encodeURIComponent(messages[locale as keyof typeof messages]||messages.en);
 return <a href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-xl transition hover:scale-105"><MessageCircle className="h-5 w-5"/>WhatsApp</a>;
}
