import type { Locale } from "@/types";

export type SaloProvider = {
  id: string;
  category: "tourism" | "stay" | "experience" | "nature" | "food";
  name: string;
  description: Record<Locale, string>;
  url: string;
  price?: string;
  image?: string;
  imageCredit?: string;
  officialGuide?: boolean;
};

export type SaloEvent = {
  id: string;