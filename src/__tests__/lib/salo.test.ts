import assert from "node:assert/strict";
import test from "node:test";
import { getSaloProviderCategories, saloProviders, type SaloProviderCategory } from "@/lib/salo";
import { firstValidHttpUrl } from "@/lib/utils";

const allowedCategories: SaloProviderCategory[] = [
  "tourism", "stay", "experience", "nature", "food", "shopping",
  "wellbeing", "culture", "events", "archipelago", "localFood",
];

test("Salo provider directory has unique canonical provider IDs", () => {
  const ids = saloProviders.map((provider) => provider.id);
  assert.equal(new Set(ids).size, ids.length, "Provider IDs must be unique");
  const names = saloProviders.map((provider) => provider.name.normalize("NFKC").trim().toLocaleLowerCase());
  assert.equal(new Set(names).size, names.length, "Canonical provider names must not be duplicated");
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
  for (const providerId of ["leipyolin-tila", "lepola-drinks", "mathildedal-brewery", "alaspaan-maatila", "finnholm-strandbo", "matildankartano", "pohjolan-tila", "katiskanmaeki", "lahiruokapuoti-puhti", "vuorovetten-jaatelo", "ellun-kanat-ja-munat", "kalliolan-tila", "kirakan-kalkkuna", "kosken-kartano", "mikkolan-tila", "peltosaaren-luomulammastila", "pernion-saunapalvi", "wanhantuvan-ankkala", "wibergs", "ylivesan-luomutila", "oyrilan-isontalon-lammastila", "hallonmaen-siideripanimo", "paulan-puutarha", "vaski-cider-distillery", "hallonmaen-tila", "heinan-puutarha", "haston-maatila", "ilolan-tila", "kurjen-maatila", "maneliuksen-mansikkatila", "meisalan-marja", "ohrakasken-tila", "rinteen-luomutila", "meriniityn-lihakauppa"]) {
    const provider = saloProviders.find((item) => item.id === providerId);
    assert.ok(provider, `Missing local-food provider ${providerId}`);
    assert.ok(getSaloProviderCategories(provider).includes("localFood"), `${providerId} must be listed in the local-food category`);
  }
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

test("Salo catalogue inventory matches the audited production dataset", () => {
  assert.equal(saloProviders.length, 100, "The canonical Salo catalogue must contain 100 unique provider profiles");

  const expectedPrimaryCounts: Record<SaloProviderCategory, number> = {
    tourism: 2,
    stay: 30,
    experience: 12,
    nature: 4,
    food: 10,
    shopping: 7,
    wellbeing: 2,
    culture: 2,
    events: 3,
    archipelago: 0,
    localFood: 28,
  };
  for (const [category, expected] of Object.entries(expectedPrimaryCounts)) {
    assert.equal(
      saloProviders.filter((provider) => provider.category === category).length,
      expected,
      `Unexpected primary category count for ${category}`,
    );
  }

  const imageBacked = saloProviders.filter((provider) => Boolean(provider.image));
  assert.equal(imageBacked.length, 90, "Only source-backed provider photos may be counted as image-backed");
  assert.deepEqual(
    saloProviders.filter((provider) => !provider.image).map((provider) => provider.id).sort(),
    [
      "chill-out-fishing",
      "meriniityn-lihakauppa",
      "ohrakasken-tila",
      "puutarha-siimes",
      "rannikon-puutarha",
      "rinteen-luomutila",
      "vaanelan-puutarha",
      "veljesten-kurkut",
      "wanhantuvan-ankkala",
      "wibergs",
    ].sort(),
    "Providers without a verified matching image must remain image-free",
  );
});
