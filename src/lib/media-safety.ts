import { isSafeUrlOrPath } from "@/lib/utils";

/** Keep only HTTP-safe internal paths and HTTPS image URLs from CMS input. */
export function sanitizeImageUrl(value: unknown): string {
  const url = typeof value === "string" ? value.trim() : "";
  if (!url) return "";
  const internalPath = url.startsWith("/") && !url.startsWith("//");
  const secureExternal = /^https:\/\//i.test(url);
  return (internalPath || secureExternal) && isSafeUrlOrPath(url) ? url : "";
}

/** A CMS image is public only after an editor confirms usage rights. */
export function getPublishableImageUrl(value: unknown, rightsConfirmed: unknown): string | null {
  if (rightsConfirmed !== true) return null;
  return sanitizeImageUrl(value) || null;
}
