"use client";

import Link from "next/link";
import { ArrowRight, FileText, ImageIcon, MapPinned, Menu, PenSquare, Sparkles, Waves, Home } from "lucide-react";

const sections = [
  { href: "/admin/homepage", label: "Etusivu", text: "Hero-kuva, otsikot, tekstit ja toimintopainikkeet.", icon: Home },
  { href: "/admin/destinos", label: "Matkakohteet", text: "Kohteet, kieliversiot, kuvaukset, URL-osoitteet ja julkaisutila.", icon: MapPinned },
  { href: "/admin/properties", label: "Majoitukset", text: "Mökit, huvilat, hinnat, vierasmäärät ja SEO-tekstit.", icon: FileText },
  { href: "/admin/experiences", label: "Elämykset", text: "Sauna, veneily, kalastus ja muut varattavat elämykset.", icon: Waves },
  { href: "/admin/media", label: "Kuvapankki", text: "Lataa kuvia ja hallitse FI/ES/EN-alt-tekstejä.", icon: ImageIcon },
  { href: "/admin/blog", label: "Blogi", text: "Matkaoppaat, artikkelit ja hakukoneystävällinen sisältö.", icon: PenSquare },
  { href: "/admin/navigation", label: "Navigaatio", text: "Päävalikko, CTA-linkit ja sivuston rakenteen hallinta.", icon: Menu },
];

export default function CmsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Finland Experience · CMS</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Sisällönhallinta</h1>
            <p className="mt-2 max-w-2xl text-slate-500">Yksi paikka matkailusivuston sisällölle. Kaikki muutokset tallennetaan palvelimelle ja julkaisutila pidetään erillään luonnoksista.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">← Hallinnan etusivu</Link>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ href, label, text, icon: Icon }) => (
            <Link key={href} href={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="h-5 w-5" /></div>
              <h2 className="mt-5 text-xl font-semibold text-slate-950">{label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">Avaa <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 h-5 w-5 text-emerald-300" />
            <div>
              <h2 className="font-semibold">Julkaisutyön periaate</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Sisältö kannattaa kirjoittaa ensin luonnokseksi, tarkistaa kaikilla kolmella kielellä ja julkaista vasta sen jälkeen. Näin sivuston julkinen sisältö ei vaihdu vahingossa keskeneräiseksi.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
