import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { canonicalDestinationSlug, locales } from "@/lib/utils";
import {
  getPublishedDestinations,
  getPublishedExperiences,
  getPublishedProperties,
  getPublishedBlogPosts,
} from "@/lib/public-content";
import { supabaseAdmin } from "@/lib/supabase";

export const revalidate = 3600;

const basePaths = [
  "",
  "destinations",
  "destinations/kemionsaari",
  "destinations/kemionsaari/majoitus",
  "destinations/kemionsaari/ruoka",
  "destinations/kemionsaari/luonto",
  "destinations/kemionsaari/kulttuuri",
  "destinations/kemionsaari/saaristo",
  "destinations/kemionsaari/tapahtumat",
  "destinations/kemionsaari/kohde/taalintehdas",
  "destinations/kemionsaari/kohde/kasnas",
  "destinations/kemionsaari/kohde/soderlangvik",
  "destinations/kemionsaari/kohde/sagalund",
  "destinations/kemionsaari/kohde/oro",
  "destinations/kemionsaari/kohde/kansakoulu",
  "destinations/kemionsaari/kohde/kansakoulu-ravintola",
  "destinations/rosala",
  "destinations/bengtskar",
  "salo",
  "turku",
  "naantali",
  "hanko",
  "kimitoon",
  "aland",
  "porvoo",
  "southeast-finland",
  "accommodations",
  "experiences",
  "sauna",
  "rural-finland",
  "city-breaks",
  "coastal-finland",
  "luxury-finland",
  "plan",
  "blog",
  "events",
  "contact",
  "photo-credits",
  "privacy",
  "terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((locale) =>
    basePaths.map((path) => ({
      url: siteUrl + "/" + locale + (path ? "/" + path : ""),
      changeFrequency: path === "" ? "daily" as const : "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  try {
    const [destinations, properties, experiences, blogPosts, pagesResult] = await Promise.all([
      getPublishedDestinations(),
      getPublishedProperties(),
      getPublishedExperiences(),
      getPublishedBlogPosts(),
      supabaseAdmin
        .from("site_pages")
        .select("slug,locale,updated_at")
        .eq("published", true)
        .eq("noindex", false)
        .in("locale", locales),
    ]);

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...destinations.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/destinations/" + canonicalDestinationSlug(item.slug),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...properties.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/accommodations/" + item.slug,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...experiences.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/experiences/" + item.slug,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
      ),
      ...blogPosts.flatMap((post) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/blog/" + post.slug,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ),
      ...((pagesResult.data ?? []).map((page) => ({
        url: siteUrl + "/" + page.locale + "/pages/" + page.slug,
        ...(page.updated_at && Number.isFinite(Date.parse(page.updated_at))
          ? { lastModified: new Date(page.updated_at) }
          : {}),
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
