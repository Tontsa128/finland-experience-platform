import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Compass, ShieldCheck, Sparkles } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Suomi Experience | Autenttisia matkoja Suomeen',
  description: 'Löydä Lapin, järvi-Suomen, Helsingin, Turun ja saariston parhaat suomalaiset elämykset.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" className={inter.variable}>
      <body>
        <header className="glass-nav sticky top-0 z-50 text-white shadow-lg">
          <div className="container-site flex min-h-16 items-center justify-between gap-4 py-2">
            <Link href="/" className="flex shrink-0 items-center gap-3 font-semibold tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora text-midnight shadow-lg">
                <Compass className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">FINLAND</span>
                <span className="block text-base">Suomi Experience</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Päänavigaatio">
              <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Etusivu</Link>
              <Link href="/destinos" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Kohteet</Link>
              <Link href="/experiencias" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Elämykset</Link>
              <Link href="/#blog" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Blogi</Link>
              <Link href="/#contact" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">Yhteys</Link>
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/70 sm:inline-flex">FI · ES · EN</span>
              <Link href="/admin/destinos" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Hallinta</span>
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 md:hidden">
            <nav className="container-site flex gap-1 overflow-x-auto py-2" aria-label="Mobiilinavigaatio">
              <Link href="/" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Etusivu</Link>
              <Link href="/destinos" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Kohteet</Link>
              <Link href="/experiencias" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Elämykset</Link>
              <Link href="/#blog" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Blogi</Link>
              <Link href="/#contact" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-white/75">Yhteys</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-midnight text-white">
          <div className="container-site flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Suomi Experience</p>
              <p className="mt-1 text-sm text-white/55">Autenttisia matkoja. Unohtumattomia elämyksiä.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/55">
              <Sparkles className="h-4 w-4 text-aurora" />
              Finland · FI · ES · EN
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
