import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { locales } from "@/lib/utils";
import {
  getPublishedDestinations,
  getPublishedExperiences,
  getPublishedProperties,
} from "@/lib/public-content";
import { supabaseAdmin } from "@/lib/supabase";

export const revalidate = 3600;

const basePaths = ["", "destinations", "accommodations", "experiences", "blog", "contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((locale) =>
    basePaths.map((path) => ({
      url: siteUrl + "/" + locale + (path ? "/" + path : ""),
      lastModified: new Date(),
      changeFrequency: path === "" ? "daily" as const : "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  try {
    const [destinations, properties, experiences, pagesResult] = await Promise.all([
      getPublishedDestinations(),
      getPublishedProperties(),
      getPublishedExperiences(),
      supabaseAdmin
        .from("site_pages")
        .select("slug,locale,updated_at")
        .eq("published", true)
        .eq("noindex", false),
    ]);

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...destinations.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/destinations/" + item.slug,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...properties.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/accommodations/" + item.slug,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...experiences.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/experiences/" + item.slug,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...((pagesResult.data ?? []).map((page) => ({
        url: siteUrl + "/" + page.locale + "/pages/" + page.slug,
        lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))),
    ];

    return [...staticEntries, ...dynamicEntries].filter(
      (entry, index, entries) => entries.findIndex((candidate) => candidate.url === entry.url) === index,
    );
  } catch {
    return staticEntries;
  }
}
