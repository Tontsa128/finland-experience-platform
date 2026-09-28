"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// PLACEHOLDER copy – replace with real customer reviews before showing this section publicly.
const testimonials = [
  {
    name: "María González",
    location: "Madrid, Spain",
    text: {
      en: "A lakeside cottage, a wood-fired sauna and light evenings that never ended. Everything was easy to book. Best summer trip we have taken!",
      es: "Una cabaña junto al lago, sauna de leña y noches luminosas que no terminaban nunca. Todo fue fácil de reservar. ¡El mejor viaje de verano!",
      fi: "Mökki järven rannalla, puusauna ja valoisat illat, jotka eivät loppuneet. Varaaminen oli helppoa. Paras kesämatkamme!",
    },
    rating: 5,
    avatar: "MG",
  },
  {
    name: "Carlos Ruiz",
    location: "Barcelona, Spain",
    text: {
      en: "Island hopping by bike and kayak with the kids was unforgettable. The archipelago felt like a dream. Highly recommended.",
      es: "Recorrer las islas en bici y kayak con los niños fue inolvidable. El archipiélago parecía un sueño. Muy recomendable.",
      fi: "Saaristopyöräily ja melonta lasten kanssa oli unohtumatonta. Saaristo tuntui unelmalta. Suosittelemme lämpimästi.",
    },
    rating: 5,
    avatar: "CR",
  },
  {
    name: "Laura Fernández",
    location: "Valencia, Spain",
    text: {
      en: "Naantali old town, the harbour at sunset and a swim before dinner. Finnish summer is a secret worth sharing.",
      es: "El casco antiguo de Naantali, el puerto al atardecer y un baño antes de cenar. El verano finlandés es un secreto que vale la pena compartir.",
      fi: "Naantalin vanha kaupunki, satama auringonlaskussa ja uinti ennen illallista. Suomalainen kesä on salaisuus, joka kannattaa jakaa.",
    },
    rating: 5,
    avatar: "LF",
  },
];

export function Testimonials() {
  const t = useTranslations("sections");
  const locale = useLocale();

  return (
    <section className="py-20 bg-white">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">{t("testimonials")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl bg-slate-50 p-6 border border-slate-100 hover:shadow-soft transition"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-brand-100" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                  />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed mb-6 relative z-10">
                {item.text[locale as keyof typeof item.text] || item.text.en}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white text-sm font-semibold">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
