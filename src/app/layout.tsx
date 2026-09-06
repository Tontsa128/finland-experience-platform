import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Finland Experience | Viajes premium a Finlandia',
  description: 'Descubre y reserva experiencias auténticas en Finlandia para viajeros internacionales.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <header className="glass-nav sticky top-0 z-50 text-white shadow-lg">
          <div className="container-site flex h-16 items-center justify-between gap-6">
            <Link href="/destinos" className="flex items-center gap-3 font-semibold tracking-tight">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora text-midnight shadow-lg">
                <Compass className="h-5 w-5" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm text-white/60">FINLAND</span>
                <span className="block text-base">Experience</span>
              </span>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
              <Link href="/destinos" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                Destinos
              </Link>
              <Link href="/experiencias" className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                Experiencias
              </Link>
              <Link href="/admin/destinos" className="hidden items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15 sm:flex">
                <ShieldCheck className="h-4 w-4" />
                Gestionar
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 bg-midnight text-white">
          <div className="container-site flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Finland Experience</p>
              <p className="mt-1 text-sm text-white/60">Viajes auténticos. Finlandia inolvidable.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Sparkles className="h-4 w-4 text-aurora" />
              Experiencias seleccionadas en Finlandia
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
