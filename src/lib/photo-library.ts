export type PhotoCredit = {
  url: string;
  credit: string;
  license: string;
  sourcePage: string;
};

export const photoLibrary = {
  hero: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mathildedal_harbour_sunset.jpg",
  mathildedalVillage: "https://upload.wikimedia.org/wikipedia/commons/0/08/Anttipoffi_workers%27_quarters_in_Mathildedal.jpg",
  mathildedalHarbour: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mathildedal_harbour_sunset.jpg",
  naantaliOldTown: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Old_Town_of_Naantali%2C_Finland.jpg",
  turkuAura: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Aura_river_in_Turku.jpg",
  hanko: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Hanko_Peninsula_from_air.jpg",
  aland: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kastelholm_2026-08-09_image12.jpg",
  teijoNationalPark: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Punassuo2.jpg",
  porvoo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Porvoo_old_town.jpg",
} as const;

export const photoCredits: PhotoCredit[] = [
  { url: photoLibrary.mathildedalHarbour, credit: "Kotivalo", license: "CC BY-SA 4.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Mathildedal_harbour_sunset.jpg" },
  { url: photoLibrary.mathildedalVillage, credit: "Kotivalo", license: "CC BY-SA 3.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Anttipoffi_workers%27_quarters_in_Mathildedal.jpg" },
  { url: photoLibrary.naantaliOldTown, credit: "Tatu Kosonen", license: "CC BY-SA 4.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Old_Town_of_Naantali,_Finland.jpg" },
  { url: photoLibrary.turkuAura, credit: "Anssi Koskinen", license: "CC BY 2.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Aura_river_in_Turku.jpg" },
  { url: photoLibrary.hanko, credit: "Pascal Terjan", license: "CC BY-SA 2.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Hanko_Peninsula_from_air.jpg" },
  { url: photoLibrary.aland, credit: "Håkan Skogsjö", license: "CC BY-SA 4.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Kastelholm_2026-08-09_image12.jpg" },
  { url: photoLibrary.teijoNationalPark, credit: "Vnnen", license: "CC BY-SA 4.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Punassuo2.jpg" },
  { url: photoLibrary.porvoo, credit: "Teemu Eskola", license: "CC BY-SA 3.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Porvoo_old_town.jpg" },
];
