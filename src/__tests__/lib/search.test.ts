import test from "node:test";
import assert from "node:assert/strict";
import { matchesSearchQuery, matchesServiceFilter, matchesServiceFilters, normalizeSearchText } from "../../lib/search";

test("normalizes Finnish and Spanish diacritics consistently", () => {
  assert.equal(normalizeSearchText("Kemiönsaari, Rymättylä & navegación"), "kemionsaari rymattyla navegacion");
});
test("finds sauna across Finnish inflections and English aliases", () => {
  assert.equal(matchesSearchQuery("saunat", ["Savusauna Mathildedal"]), true);
  assert.equal(matchesSearchQuery("smoke sauna", ["Aito savusauna saaristossa"]), true);
  assert.equal(matchesSearchQuery("sauna Mathildedal", ["Mathildedal", "oma sauna ja terassi"]), true);
});
test("requires every meaningful search word to match", () => {
  assert.equal(matchesSearchQuery("sauna Mathildedal", ["Sauna Naantalissa"]), false);
});
test("service filters match amenities even when the main category is accommodation", () => {
  assert.equal(matchesServiceFilter("sauna", "stay", ["Villa", "oma sauna", "merinäköala"]), true);
  assert.equal(matchesServiceFilter("sauna", "stay", ["Villa", "terassi", "merinäköala"]), false);
});
test("service filters support multilingual categories and AND combinations", () => {
  assert.equal(matchesServiceFilter("food", "restaurant", ["local dining"]), true);
  assert.equal(matchesServiceFilter("sauna", "hyvinvointi", ["savusauna"]), true);
  assert.equal(matchesServiceFilters(["sauna", "cruise"], "experience", ["savusauna", "boat trip"]), true);
  assert.equal(matchesServiceFilters(["sauna", "food"], "experience", ["savusauna", "boat trip"]), false);
});
