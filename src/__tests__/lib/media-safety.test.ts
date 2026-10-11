import assert from "node:assert/strict";
import test from "node:test";
import { getPublishableImageUrl, sanitizeImageUrl } from "@/lib/media-safety";

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
