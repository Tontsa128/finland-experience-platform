/**
 * Central image registry. Every photo on the site should come from here so a
 * mismatched picture can be swapped in ONE place.
 * Only summer photos of Finland / the archipelago belong here (no snow, no mountains).
 *
 * TODO (content): replace the slots marked "placeholder" with real photos of that
 * exact place (Visit Naantali / Visit Åland media banks, or your own photos in /public/images/).
 */
const commons = (file: string, w = 1600) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;
const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const IMG = {
  hero: u("photo-1742639008187-0294cf3fdf93", 2400),          // Finnish lake & cottage, summer
  mathildedal: "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1600",
  mathildedalWide: "https://cdn-datahub.visitfinland.com/images/f9ad30d0-0a6f-11f0-88da-256e05b1f1a0.jpeg?s=1800",
  village: u("photo-1510798831971-661eb04b3739"),               // Mathildedal house
  lake: u("photo-1499696010180-025ef6e1a8f9"),                  // Finnish summer lake / cottage
  naantali: u("photo-1478515143454-712b5f547c8c"),              // Naantali harbour (placeholder – verify)
  naantaliAlt: u("photo-1478515143454-712b5f547c8c", 1200),     // placeholder – add 2nd Naantali photo
  aland: commons("Västerhamn in Mariehamn, Åland.jpg"),         // Åland – Västerhamn harbour, Mariehamn (photo taken July 2009)
  alandAlt: commons("Torggatan (Mariehamn), 2019 (03).jpg"),   // Åland – Mariehamn, August 2019
  coast: u("photo-1478515143454-712b5f547c8c", 1400),           // placeholder – Hanko / south coast
  forestStay: u("photo-1449158743715-0a90ebb6d2d8"),            // forest glamping
} as const;

export const SUMMER_FALLBACK = IMG.mathildedalWide;

/** Attribution required by the Creative Commons licences of the Wikimedia Commons photos above. */
export const PHOTO_CREDITS = [
  "Västerhamn in Mariehamn, Åland – Wikimedia Commons, CC BY-SA 2.5/2.0/1.0",
  "Torggatan (Mariehamn), 2019 – Bahnfrend, Wikimedia Commons, CC BY-SA 4.0",
];
