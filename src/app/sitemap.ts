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
import { saloProviders } from "@/lib/salo";

export const revalidate = 3600;

const basePaths = [
  "",
  "destinations",
  "salo",
  "salo/majoitus",
  "salo/ruoka",
  "salo/aktiviteetit",
  "salo/elamykset",
  "salo/saaristo",
  "salo/oppaat",
  "mathildedal",
  "mathildedal/majoitus",
  "mathildedal/ruoka",
  "mathildedal/aktiviteetit",
  "mathildedal/elamykset",
  "places/teijo",
  "places/teijo-kirjakkala",
  "places/sarkisalo",
  "places/pernio",
  "places/halikko-wiurila",
  "places/jarvi-salo",
  "places/salo-center",
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
      lastModified: new Date(),
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
        .eq("noindex", false),
    ]);

    const archipelagoProviderIds = new Set(["saaristomokit-sarkisalo", "forby-marina", "cafe-vinssi", "saaristoravintola-nixor", "sarkisalo-fishing", "chill-out-fishing", "villa-meri-sarkisalo"]);
    const providerCategory = (provider: (typeof saloProviders)[number]) => archipelagoProviderIds.has(provider.id)
      ? "saaristo"
      : provider.category === "stay" ? "majoitus"
      : provider.category === "food" ? "ruoka"
      : provider.category === "nature" ? "aktiviteetit"
      : provider.category === "experience" ? "elamykset"
      : "oppaat";

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...saloProviders.flatMap((provider) => locales.map((locale) => ({
        url: siteUrl + "/" + locale + "/salo/" + providerCategory(provider) + "/" + provider.id,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))),

      ...destinations.flatMap((item) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/destinations/" + canonicalDestinationSlug(item.slug),
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
      ...blogPosts.flatMap((post) =>
        locales.map((locale) => ({
          url: siteUrl + "/" + locale + "/blog/" + post.slug,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
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
