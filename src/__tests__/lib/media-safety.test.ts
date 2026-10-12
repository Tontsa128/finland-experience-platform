import { photoLibrary, photoCredits } from "@/lib/photo-library";
import assert from "node:assert/strict";
import test from "node:test";
import { getPublishableImageUrl, sanitizeImageUrl } from "@/lib/media-safety";

test("photo-library assets are unique and have complete attribution metadata", () => {
  const owners = new Map<string, string>();
  for (const [key, url] of Object.entries(photoLibrary)) {
    const previous = owners.get(url);
    assert.equal(previous, undefined, `Photo URL reused by asset keys ${previous} and ${key}`);
    owners.set(url, key);
  }

  for (const photo of photoCredits) {
    assert.ok(photo.url.startsWith("https://"), "Photo URL must use HTTPS");
    assert.ok(photo.sourcePage.startsWith("https://"), `Missing HTTPS source page for ${photo.credit}`);
    assert.ok(photo.credit.trim(), "Photo credit must not be empty");
    assert.ok(photo.license.trim(), `Missing license/use note for ${photo.sourcePage}`);
  }
});

test("sanitizes internal image paths and HTTPS image URLs", () => {
  assert.equal(sanitizeImageUrl("/images/coast.webp"), "/images/coast.webp");
  assert.equal(sanitizeImageUrl("https://media.example.test/coast.webp"), "https://media.example.test/coast.webp");
  assert.equal(sanitizeImageUrl("  https://media.example.test/coast.webp  "), "https://media.example.test/coast.webp");
});

test("rejects unsafe, non-HTTPS, and protocol-relative image URLs", () => {
  assert.equal(sanitizeImageUrl("http://media.example.test/coast.webp"), "");
  assert.equal(sanitizeImageUrl("//media.example.test/coast.webp"), "");
  assert.equal(sanitizeImageUrl("javascript:alert(1)"), "");
  assert.equal(sanitizeImageUrl("data:image/svg+xml,<svg/>"), "");
  assert.equal(sanitizeImageUrl(""), "");
  assert.equal(sanitizeImageUrl(null), "");
});

test("publication requires explicit image-rights approval", () => {
  assert.equal(getPublishableImageUrl("https://media.example.test/coast.webp", false), null);
  assert.equal(getPublishableImageUrl("https://media.example.test/coast.webp", undefined), null);
  assert.equal(getPublishableImageUrl("https://media.example.test/coast.webp", true), "https://media.example.test/coast.webp");
  assert.equal(getPublishableImageUrl("http://media.example.test/coast.webp", true), null);
  assert.equal(getPublishableImageUrl("/images/coast.webp", true), "/images/coast.webp");
});
