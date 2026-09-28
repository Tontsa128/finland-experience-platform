"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ShieldCheck, Sparkles, Languages, MapPin } from "lucide-react";
import { tr } from "@/lib/l";

export function ValueStrip({ destinations, stays, experiences }: { destinations: number; stays: number; experiences: number }) {
  const locale = useLocale();
  const items = [
    { icon: MapPin, big: String(destinations), label: { fi: "kesäkohdetta", en: "summer destinations", es: "destinos de verano" } },
    { icon: Sparkles, big: String(stays), label: { fi: "valittua majoitusta", en: "hand-picked stays", es: "alojamientos elegidos" } },
    { icon: ShieldCheck, big: String(experiences), label: { fi: "kesäelämystä", en: "summer experiences", es: "experiencias de verano" } },
    { icon: Languages, big: "3", label: { fi: "kieltä: FI · EN · ES", en: "languages: FI · EN · ES", es: "idiomas: FI · EN · ES" } },
  ];
  return (
    <section className="relative z-20 -mt-10 px-4">
      <div className="container-narrow">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200/60 shadow-2xl ring-1 ring-black/5 md:grid-cols-4">
          {items.map(({ icon: Icon, big, label }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 bg-white p-5 sm:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-900">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-3xl font-bold leading-none text-brand-900">{big}</p>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">{tr(locale, label)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
