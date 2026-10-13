import assert from "node:assert/strict";
import test from "node:test";
import { getMathildedalItem, mathildedalData, slugifyMathildedal } from "@/lib/mathildedal";

test("Mathildedal service entries have unique slugs within each category", () => {
  for (const [category, items] of Object.entries(mathildedalData)) {
    const slugs = items.map((item) => slugifyMathildedal(item.name));
    assert.equal(new Set(slugs).size, slugs.length, `Duplicate Mathildedal slug in ${category}`);
  }
});

test("Mathildedal provider detail lookup resolves the exact category and item", () => {
  const slug = slugifyMathildedal("Hotel Mathildedal");
  const result = getMathildedalItem("majoitus", slug);
  assert.equal(result?.category, "majoitus");
  assert.equal(result?.item.name, "Hotel Mathildedal");
  assert.equal(getMathildedalItem("ruoka", slug), null);
  assert.equal(getMathildedalItem("not-a-category", slug), null);
});

test("all Mathildedal entries have FI/ES/EN descriptions and official HTTPS links", () => {
  for (const items of Object.values(mathildedalData)) {
    for (const item of items) {
      assert.ok(item.url.startsWith("https://"), `Unsafe provider URL for ${item.name}`);
      for (const locale of ["fi", "es", "en"] as const) {
        assert.ok(item.description[locale].trim(), `Missing ${locale} description for ${item.name}`);
      }
    }
  }
});

test("unlicensed individual provider photography remains unpublished", () => {
  for (const items of Object.values(mathildedalData)) {
    for (const item of items) {
      if (item.name !== "Teijon kansallispuisto" && item.name !== "Mathildedalin ruukkikylä" && item.name !== "Teijon kansallispuisto – luontoelämys") {
        assert.equal(item.image, null, `Unverified provider image is set for ${item.name}`);
      }
    }
  }
});
