"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export function CookieConsent() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(document.cookie.indexOf("cookie_consent=") === -1);
  }, []);

  function choose() {
    document.cookie = "cookie_consent=necessary; Path=/; Max-Age=31536000; SameSite=Lax";
    setVisible(false);
  }

  if (!visible) return null;

  const copy = {
    fi: {
      label: "Evästeasetukset",
      text: "Käytämme välttämätöntä asetusevästettä, jotta muistamme valintasi. Emme ota analytiikka- tai markkinointievästeitä käyttöön tällä hetkellä.",
      button: "Selvä",
    },
    es: {
      label: "Preferencias de cookies",
      text: "Usamos una cookie necesaria para recordar tu elección. Actualmente no activamos cookies de analítica o marketing.",
      button: "Entendido",
    },
    en: {
      label: "Cookie settings",
      text: "We use one necessary preference cookie to remember your choice. Analytics and marketing cookies are not enabled at this time.",
      button: "Got it",
    },
  } as const;
  const t = copy[locale as keyof typeof copy] || copy.en;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.label}
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
    >
      <h2 className="font-semibold text-slate-950">{t.label}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{t.text}</p>
      <button onClick={choose} className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        {t.button}
      </button>
    </div>
  );
}
