export type L3 = { fi: string; en: string; es: string };
export const tr = (locale: string, v: L3) => (locale === "fi" ? v.fi : locale === "es" ? v.es : v.en);
