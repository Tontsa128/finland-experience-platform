import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Compass, Sparkles } from 'lucide-react';
import AdminLink from '@/components/AdminLink';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Suomi Experience | Koe Suomen taika',
  description: 'Autenttisia suomalaisia elämyksiä Lapista Helsinkiin – suunniteltu kansainvälisille matkailijoille.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={inter.variable}>
      <body>
        <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/95 text-white shadow-lg backdrop-blur-xl">
          <div className="container-site flex min-h-[72px] items-center justify-between gap-5 py-3">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-lg"><Compass className="h-5 w-5" /></span>
              <span><span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">FINLAND</span><span className="block text-lg font-bold tracking-tight">Suomi Experience</span></span>
            </Link>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Päänavigaatio">
              <Link href="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">Etusivu</Link>
              <Link href="/destinos" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">Kohteet</Link>
              <Link href="/experiencias" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">Elämykset</Link>
              <Link href="/#blog" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">Blogi</Link>
              <Link href="/#contact" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white">Yhteys</Link>
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden items-center rounded-xl border border-white/10 bg-white/5 p-1 sm:flex" aria-label="Kielivalinta">
                <Link href="/?lang=fi" className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-bold">FI</Link>
                <Link href="/?lang=es" className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white">ES</Link>
                <Link href="/?lang=en" className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-white/60 hover:bg-white/10 hover:text-white">EN</Link>
              </div>
              <AdminLink />
            </div>
          </div>
          <nav className="border-t border-white/10 lg:hidden" aria-label="Mobiilinavigaatio"><div className="container-site flex gap-1 overflow-x-auto py-2"><Link href="/destinos" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Kohteet</Link><Link href="/experiencias" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Elämykset</Link><Link href="/#blog" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Blogi</Link><Link href="/#contact" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Yhteys</Link></div></nav>
        </header>
        {children}
        <footer className="bg-midnight text-white">
          <div className="container-site grid gap-8 py-12 sm:grid-cols-3 sm:items-start">
            <div className="sm:col-span-2"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand"><Compass className="h-5 w-5" /></span><span className="text-lg font-bold">Suomi Experience</span></div><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">Autenttisia suomalaisia elämyksiä kansainvälisille matkailijoille – Lapista järvi-Suomeen, Helsingistä saaristoon.</p></div>
            <div className="text-sm text-white/55"><p className="font-bold text-white">Matkasi alkaa tästä</p><p className="mt-2">FI · ES · EN</p><p className="mt-1 inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-terracotta" /> Finland, authentically.</p></div>
          </div>
        </footer>
      </body>
    </html>
  );
}
