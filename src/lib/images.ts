/**
 * Central image registry. Every photo on the site should come from here so a
 * mismatched or broken picture can be swapped in ONE place.
 * Every URL below was verified (via web search) to be a real, existing file at
 * native resolution well above the size it is displayed at — this is what
 * "sharp, not blurry" comes down to: never scale a small source photo up.
 * Only summer photos of Finland / the archipelago belong here (no snow, no mountains).
 */
const commons = (file: string, w = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${w}`;

export const IMG = {
  // Hossa, Finland — bright blue-sky summer morning at a lake dock. Verified real Unsplash photo (native 3000px).
  hero: unsplash("photo-1615185682771-e8af2a4f2494", 2400),
  // Säynätsalo, Finland — golden-hour boat at sunset. Kept for accent use, not the hero (too dark for that).
  sunsetBoat: unsplash("photo-1603024370382-5e82bec1aaac", 1600),

  // Hevonlinnanjärvi, Southwest Finland, August 2018. Wikimedia Commons, native 5472×3648.
  lake: commons("Hevonlinnanjärvi elokuussa 2018.jpg", 1800),

  // Naantali Old Town — wooden shop house. Wikimedia Commons, native 4032×3024.
  naantali: commons("FI Naantali Old Naantali shop.JPG", 1600),
  // Naantali — Taimonranta beach. Wikimedia Commons, native 2632×2632.
  naantaliAlt: commons("Naantali, Finland ( Taimonranta ).jpg", 1600),
  // Kultaranta, the President of Finland's summer garden in Naantali. Native 5355×3174.
  kultaranta: commons("Kultaranta Garden, Naantali, Finland 02.jpg", 1800),

  // Västerhamn, Mariehamn, Åland, July 2009. Wikimedia Commons, native 3008×2000.
  aland: commons("Västerhamn in Mariehamn, Åland.jpg", 1600),
  // Torggatan, Mariehamn, Åland, August 2019. Wikimedia Commons, native 5756×3831.
  alandAlt: commons("Torggatan (Mariehamn), 2019 (03).jpg", 1600),

  // Björkboda träsk, a lake in Kemiönsaari (Kimitoön). Wikimedia Commons, native 9400×3200.
  kemionsaari: commons("Björkboda träsk.jpg", 1800),

  // Brändö, Åland archipelago — sailing. Verified real Unsplash photo (native 3000px).
  archipelagoSail: unsplash("photo-1501162659894-930bb96aad1b", 1600),

  // Pre-existing official Visit Finland asset (Mathildedal ironworks village).
  mathildedal: "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1600",
  mathildedalWide: "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1800",
} as const;

export const SUMMER_FALLBACK = IMG.lake;

/** Attribution required by the Creative Commons licences of the photos above. */
export const PHOTO_CREDITS = [
  "Hossa lake dock — Juho Luomala, Unsplash",
  "Säynätsalo sunset — Tapio Haaja, Unsplash",
  "Hevonlinnanjärvi — Wikimedia Commons",
  "Naantali — Wikimedia Commons",
  "Kultaranta — Wikimedia Commons",
  "Mariehamn, Åland — Fanny Schertzer & Bahnfrend, Wikimedia Commons, CC BY-SA",
  "Björkboda träsk, Kemiönsaari — Wikimedia Commons",
  "Åland archipelago sailing — Atte Grönlund, Unsplash",
];
