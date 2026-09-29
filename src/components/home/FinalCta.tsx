import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { tr } from "@/lib/l";

export function FinalCta({ locale }: { locale: string }) {
  return (
    <section className="relative isolate overflow-hidden py-24 text-white sm:py-32">
      <Image src={IMG.kultaranta} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/75 via-brand-950/35 to-brand-950/10" />
      <div className="container-narrow text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          {tr(locale, { fi: "Kesä on lyhyt. Varaa se, mikä sinusta tuntuu kesältä.", en: "Summer is short. Book the one that feels like summer.", es: "El verano es corto. Reserva el que se siente como verano." })}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
          {tr(locale, { fi: "Suorat linkit palveluntarjoajiin, selkeät hintatiedot ja apua suomeksi, englanniksi ja espanjaksi.", en: "Direct links to providers, clear pricing information and help in Finnish, English and Spanish.", es: "Enlaces directos a los proveedores, precios claros y ayuda en finlandés, inglés y español." })}
        </p>
        <Link href={`/${locale}/destinations`} className="btn-gold group mt-9 px-9 py-4 text-base shadow-[0_10px_40px_-8px_rgba(245,183,72,.8)]">
          {tr(locale, { fi: "Löydä oma kesäkohteesi", en: "Find your summer destination", es: "Encuentra tu destino de verano" })}
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
