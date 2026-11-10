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
test("ignores connector words in natural-language searches", () => {
  assert.equal(matchesSearchQuery("sauna in Naantali", ["Naantali", "seaside hotel with sauna world"]), true);
  assert.equal(matchesSearchQuery("sauna near Salo", ["Salo", "public sauna sessions"]), true);
});

test("service filters match amenities even when the main category is accommodation", () => {
  assert.equal(matchesServiceFilter("sauna", "stay", ["Villa", "oma sauna", "merinäköala"]), true);
  assert.equal(matchesServiceFilter("sauna", "stay", ["Villa", "terassi", "merinäköala"]), false);
});
test("service filters support multilingual categories and AND combinations", () => {
  assert.equal(matchesServiceFilter("food", "restaurant", ["local dining"]), true);
  assert.equal(matchesServiceFilter("sauna", "sauna", ["savusauna"]), true);
  assert.equal(matchesServiceFilter("sauna", "wellbeing", ["massage", "wellness trail"]), false);
  assert.equal(matchesServiceFilter("sauna", "wellbeing", ["traditional sauna and massage"]), true);
  assert.equal(matchesServiceFilter("wellbeing", "hyvinvointi", ["massage"]), true);
  assert.equal(matchesServiceFilters(["sauna", "cruise"], "experience", ["savusauna", "boat trip"]), true);
  assert.equal(matchesServiceFilters(["sauna", "food"], "experience", ["savusauna", "boat trip"]), false);
});
