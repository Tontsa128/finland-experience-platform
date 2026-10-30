import assert from "node:assert/strict";
import test from "node:test";
import { getSaloProviderCategories, saloProviders, type SaloProviderCategory } from "@/lib/salo";
import { firstValidHttpUrl } from "@/lib/utils";

const allowedCategories: SaloProviderCategory[] = [
  "tourism", "stay", "experience", "nature", "food", "shopping",
  "wellbeing", "culture", "events", "archipelago",
];

test("Salo provider directory has unique canonical provider IDs", () => {
  const ids = saloProviders.map((provider) => provider.id);
  assert.equal(new Set(ids).size, ids.length, "Provider IDs must be unique");
});

test("every Salo provider has complete FI, EN and ES descriptions and a safe official URL", () => {
  for (const provider of saloProviders) {
    for (const locale of ["fi", "en", "es"] as const) {
      assert.ok(provider.description[locale]?.trim(), `${provider.id} is missing ${locale} description`);
    }
    assert.ok(firstValidHttpUrl(provider.url), `${provider.id} must have a valid HTTP(S) provider or official information URL`);
  }
});

test("provider images always include a source or credit", () => {
  for (const provider of saloProviders) {
    if (provider.image) {
      assert.ok(provider.imageCredit?.trim(), `${provider.id} has an image without source/credit`);
    }
  }
});

test("cross-listed providers appear in every relevant category without duplicate records", () => {
  const marina = saloProviders.find((provider) => provider.id === "mathildan-marina");
  const fishing = saloProviders.find((provider) => provider.id === "chill-out-fishing");
  assert.ok(marina);
  assert.ok(fishing);
  assert.deepEqual(getSaloProviderCategories(marina), ["stay", "food", "archipelago"]);
  assert.deepEqual(getSaloProviderCategories(fishing), ["experience", "archipelago"]);
  for (const provider of saloProviders) {
    const categories = getSaloProviderCategories(provider);
    assert.equal(new Set(categories).size, categories.length, `${provider.id} has duplicate category membership`);
    for (const category of categories) assert.ok(allowedCategories.includes(category));
  }
});
