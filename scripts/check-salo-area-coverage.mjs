import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const salo = readFileSync(new URL("../src/lib/salo.ts", import.meta.url), "utf8");
const areasSource = readFileSync(new URL("../src/lib/salo-areas.ts", import.meta.url), "utf8");

const providerMatch = salo.match(/export const saloProviders: SaloProvider\[\] = \[([\s\S]*?)\n\];\n\nexport const saloEvents/);
assert.ok(providerMatch, "saloProviders array must exist before saloEvents");
const providerBody = providerMatch[1];
const providerBlocks = providerBody.split(/\n  \{\n    id:/).slice(1);
const providerIds = providerBlocks.map((block) => {
  const match = block.match(/^\s*"([^"]+)"/);
  assert.ok(match, "every provider block must begin with a stable id");
  return match[1];
});
assert.equal(new Set(providerIds).size, providerIds.length, "provider IDs must be unique");

for (const [index, block] of providerBlocks.entries()) {
  const id = providerIds[index];
  for (const locale of ["fi", "en", "es"]) {
    assert.match(block, new RegExp("\\b" + locale + ":\\s*\\""), `provider ${id} must have a ${locale} description`);
  }
  assert.match(block, /url:\s*"https?:\/\//, `provider ${id} must link to an official provider or source page`);
  if (/image:\s*(?:providerImages\.|"https?:\/\/)/.test(block)) {
    assert.match(block, /imageCredit:\s*"/, `provider ${id} image must include a credit`);
    assert.match(block, /imageSource:\s*"/, `provider ${id} image must include its source URL`);
  }
}

const areaMatch = areasSource.match(/export const areaProviderIds: Record<SaloArea, string\[\]> = \{([\s\S]*?)\n\};/);
assert.ok(areaMatch, "areaProviderIds map must exist");
const areaEntries = [...areaMatch[1].matchAll(/^\s+([a-z_]+): \[([^\]]*)\],?$/gm)].map((match) => ({
  area: match[1],
  ids: [...match[2].matchAll(/"([^"]+)"/g)].map((id) => id[1]),
}));
assert.ok(areaEntries.length > 0, "at least one Salo area must be configured");
assert.equal(new Set(areaEntries.map((entry) => entry.area)).size, areaEntries.length, "area keys must be unique");

const areaNames = areaEntries.map((entry) => entry.area);
const officialMatch = areasSource.match(/export const areaOfficialSources: Record<SaloArea,[\s\S]*?= \{([\s\S]*?)\n\};/);
const copyMatch = areasSource.match(/export const areaCopy: Record<SaloArea,[\s\S]*?= \{([\s\S]*?)\n\};/);
assert.ok(officialMatch, "every area must have an official source map");
assert.ok(copyMatch, "every area must have localized guide copy");
const officialAreas = [...officialMatch[1].matchAll(/^\s+([a-z_]+):/gm)].map((match) => match[1]);
const copyAreas = [...copyMatch[1].matchAll(/^\s+([a-z_]+): \{\n    fi:/gm)].map((match) => match[1]);

for (const area of areaNames) {
  assert.ok(officialAreas.includes(area), `area ${area} must have an official source`);
  assert.ok(copyAreas.includes(area), `area ${area} must have localized FI/EN/ES guide copy`);
}

const mappedIds = areaEntries.flatMap((entry) => {
  assert.ok(entry.ids.length > 0, `area ${entry.area} must not be an empty placeholder`);
  return entry.ids;
});
const providerIdSet = new Set(providerIds);
for (const id of mappedIds) {
  assert.ok(providerIdSet.has(id), `area mapping references missing provider ${id}`);
}
const mappedIdSet = new Set(mappedIds);
for (const id of providerIds) {
  assert.ok(mappedIdSet.has(id), `provider ${id} is not assigned to an area`);
}

console.log(`Salo area coverage OK: ${areaEntries.length} areas, ${providerIds.length} unique provider listings, all localized and mapped.`);
