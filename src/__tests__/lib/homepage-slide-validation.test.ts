import assert from "node:assert/strict";
import test from "node:test";
import { firstInvalidHomepageSlideIndex, getHomepageSlideValidationErrors } from "../../lib/homepage-slide-validation";

const validSlide = {
  enabled: true,
  imageUrl: "https://images.example.com/slide.jpg",
  imageReviewed: true,
  href: "/fi/destinations",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Example.jpg",
  copy: {
    fi: { title: "Suomen kesä", text: "Kuvaus suomeksi.", cta: "Tutustu" },
    es: { title: "El verano finlandés", text: "Descripción en español.", cta: "Descubrir" },
    en: { title: "Finnish summer", text: "Description in English.", cta: "Explore" },
  },
};

test("accepts a reviewed slide with HTTPS image, safe links and all locale copy", () => {
  assert.deepEqual(getHomepageSlideValidationErrors(validSlide), []);
});

test("requires explicit image-to-copy review", () => {
  assert.ok(getHomepageSlideValidationErrors({ ...validSlide, imageReviewed: false }).includes("image_review"));
});

test("rejects non-HTTPS image URLs", () => {
  assert.ok(getHomepageSlideValidationErrors({ ...validSlide, imageUrl: "http://images.example.com/slide.jpg" }).includes("image_https"));
});

test("rejects unsafe external links", () => {
  assert.ok(getHomepageSlideValidationErrors({ ...validSlide, href: "javascript:alert(1)" }).includes("href"));
  assert.ok(getHomepageSlideValidationErrors({ ...validSlide, creditUrl: "http://example.com/source" }).includes("credit_url"));
});

test("requires title, description and CTA in Finnish, Spanish and English", () => {
  const copy = { ...validSlide.copy, es: { ...validSlide.copy.es, text: "" } };
  assert.ok(getHomepageSlideValidationErrors({ ...validSlide, copy }).includes("copy_es"));
});

test("does not block a disabled slide from being saved", () => {
  assert.deepEqual(getHomepageSlideValidationErrors({ ...validSlide, enabled: false, imageReviewed: false, imageUrl: "" }), []);
});

test("returns the first invalid slide index", () => {
  assert.equal(firstInvalidHomepageSlideIndex([{ ...validSlide }, { ...validSlide, imageReviewed: false }]), 1);
});
