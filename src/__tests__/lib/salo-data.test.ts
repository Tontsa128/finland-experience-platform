import assert from "node:assert/strict";
import test from "node:test";
import {
  getSaloProviderArea,
  getSaloProviderDetailCategory,
  saloAreas,
  saloProviders,
} from "@/lib/salo";

test("Salo provider IDs and provider detail paths are unique", () => {
  const ids = saloProviders.map((provider) => provider.id);
  assert.equal(new Set(ids).size, ids.length, "Duplicate Salo provider ID");

  const paths = saloProviders.map(
    (provider) => "/" + getSaloProviderDetailCategory(provider) + "/" + provider.id,
  );
  assert.equal(new Set(paths).size, paths.length, "Duplicate canonical Salo provider detail path");
});

test("every area parent refers to a real area and Salo locality hierarchy is explicit", () => {
  for (const area of Object.values(saloAreas)) {
    if (area.parentId) assert.ok(saloAreas[area.parentId], `Missing parent area for ${area.id}`);
    for (const locale of ["fi", "es", "en"] as const) {
      assert.ok(area.name[locale].trim(), `Missing ${locale} area name for ${area.id}`);
      assert.ok(area.municipality[locale].trim(), `Missing ${locale} municipality for ${area.id}`);
    }
  }

  assert.equal(saloAreas["salo-center"].parentId, "salo-region");
  assert.equal(saloAreas.mathildedal.parentId, "salo-region");
  assert.equal(saloAreas.teijo.parentId, "salo-region");
  assert.equal(saloAreas.sarkisalo.parentId, "salo-region");
  assert.equal(saloAreas.kemionsaari.type, "nearby-region");
  assert.equal(saloAreas.kemionsaari.parentId, undefined);
});

test("important local providers are assigned to the correct geographic parent", () => {
  const areaOf = (id: string) => {
    const provider = saloProviders.find((item) => item.id === id);
    assert.ok(provider, `Missing provider ${id}`);
    return getSaloProviderArea(provider)?.id;
  };

  assert.equal(areaOf("hotel-mathildedal"), "mathildedal");
  assert.equal(areaOf("matildanjarven-kampat"), "teijo");
  assert.equal(areaOf("forby-marina"), "sarkisalo");
  assert.equal(areaOf("aava-adventures"), "sarkisalo");
  assert.equal(areaOf("leipyolin-tila"), "pernio");
  assert.equal(areaOf("topilan-tupa"), "halikko");
  assert.equal(areaOf("onnenperan-mokki"), "vaskio");
  assert.equal(areaOf("villa-viola"), "suomusjarvi");
  assert.equal(areaOf("villa-laperla"), "suomusjarvi");
  assert.equal(areaOf("villa-viktoria"), "suomusjarvi");
  assert.equal(areaOf("visit-salo"), "salo-region");
});

test("every listed provider has a verified locality in the shared Salo area hierarchy", () => {
  for (const provider of saloProviders) {
    assert.ok(provider.areaId, `Missing locality assignment for ${provider.id}`);
    assert.ok(saloAreas[provider.areaId], `Unknown locality assignment for ${provider.id}`);
  }

  assert.equal(saloAreas.halikko.parentId, "salo-region");
  assert.equal(saloAreas.vaskio.parentId, "salo-region");
  assert.equal(saloAreas.suomusjarvi.parentId, "salo-region");
});

test("provider detail category is consistent with the shared area taxonomy", () => {
  const provider = (id: string) => {
    const item = saloProviders.find((candidate) => candidate.id === id);
    assert.ok(item, `Missing provider ${id}`);
    return item;
  };

  assert.equal(getSaloProviderDetailCategory(provider("hotel-mathildedal")), "majoitus");
  assert.equal(getSaloProviderDetailCategory(provider("cafe-vinssi")), "ruoka");
  assert.equal(getSaloProviderDetailCategory(provider("forby-rantajooga")), "elamykset");
  assert.equal(getSaloProviderDetailCategory(provider("teijo-national-park")), "aktiviteetit");
  assert.equal(getSaloProviderDetailCategory(provider("mathildedal-brewery")), "ruoka");
});

test("provider directory does not reuse the same image for multiple businesses", () => {
  const imageOwners = new Map<string, string>();
  for (const provider of saloProviders) {
    if (!provider.image) continue;
    const previousOwner = imageOwners.get(provider.image);
    assert.equal(
      previousOwner,
      undefined,
      `Provider image reused by ${previousOwner} and ${provider.id}`,
    );
    imageOwners.set(provider.image, provider.id);
  }
});

test("provider photo source metadata is complete when provided", () => {
  for (const provider of saloProviders) {
    if (!provider.imageSourcePage) continue;
    assert.ok(provider.imageSourcePage.startsWith("https://"), `Photo source must use HTTPS: ${provider.id}`);
    assert.ok(provider.imageCredit?.trim(), `Missing photo credit for ${provider.id}`);
    assert.ok(provider.imageLicense?.trim(), `Missing photo usage note for ${provider.id}`);
  }
});

test("provider directory links use HTTPS URLs", () => {
  for (const provider of saloProviders) {
    assert.ok(
      provider.url.startsWith("https://"),
      `Provider URL must use HTTPS: ${provider.id}`,
    );
  }
});
