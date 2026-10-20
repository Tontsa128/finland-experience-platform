import assert from "node:assert/strict";
import test from "node:test";
import { cabins, destinations, experiences } from "@/lib/data";

test("fallback destination, accommodation, and experience slugs are unique", () => {
  for (const [label, values] of [
    ["destination", destinations],
    ["accommodation", cabins],
    ["experience", experiences],
  ] as const) {
    const slugs = values.map((value) => value.slug);
    assert.equal(new Set(slugs).size, slugs.length, `Duplicate ${label} slug`);
  }
});

test("destination accommodation references all point to existing fallback records", () => {
  const cabinIds = new Set(cabins.map((cabin) => cabin.id));
  for (const destination of destinations) {
    for (const accommodationId of destination.accommodationIds ?? []) {
      assert.ok(
        cabinIds.has(accommodationId),
        `Destination ${destination.slug} references missing accommodation ${accommodationId}`,
      );
    }
  }
});

test("unverified fallback catalogue entries do not publish price values", () => {
  for (const destination of destinations) {
    if (destination.verified !== true) {
      assert.equal(destination.priceFrom, 0, `Unverified destination price: ${destination.slug}`);
    }
  }
  for (const cabin of cabins) {
    if (cabin.verified !== true) {
      assert.equal(cabin.pricePerNight, 0, `Unverified accommodation price: ${cabin.slug}`);
    }
  }
  for (const experience of experiences) {
    if (experience.verified !== true) {
      assert.equal(experience.price, 0, `Unverified experience price: ${experience.slug}`);
    }
  }
});

test("fallback destination galleries do not repeat the same image within a card", () => {
  for (const destination of destinations) {
    assert.equal(
      new Set(destination.images).size,
      destination.images.length,
      `Repeated destination image: ${destination.slug}`,
    );
  }
});

test("all fallback destination and service labels include Finnish, Spanish, and English", () => {
  const locales = ["fi", "es", "en"] as const;
  for (const item of [...destinations, ...cabins, ...experiences]) {
    for (const field of ["name", "description"] as const) {
      for (const locale of locales) {
        assert.ok(
          typeof item[field]?.[locale] === "string" && item[field][locale].trim().length > 0,
          `Missing ${locale} ${field} text on ${item.slug}`,
        );
      }
    }
  }
});
