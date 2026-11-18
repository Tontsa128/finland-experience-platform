import test from "node:test";
import assert from "node:assert/strict";
import { isAllowedSlideLicense, passesSlideImageFilters } from "../../../scripts/lib/slide-image-filters.mjs";

const brief = { season: "summer", avoid: ["motorcycle"] };
const image = (overrides = {}) => ({
  mime: "image/jpeg", width: 2400, height: 1600, thumburl: "https://upload.wikimedia.org/thumb.jpg",
  extmetadata: { LicenseShortName: { value: "CC BY-SA 4.0" }, DateTimeOriginal: { value: "2024:07:15 10:00:00" } },
  ...overrides
});

test("accepts a wide image with an approved Creative Commons license", () => {
  assert.equal(passesSlideImageFilters(image(), brief), true);
});
test("rejects images below the minimum width", () => {
  assert.equal(passesSlideImageFilters(image({ width: 1200 }), brief), false);
});
test("rejects portrait and near-square images", () => {
  assert.equal(passesSlideImageFilters(image({ width: 1600, height: 1500 }), brief), false);
});
test("rejects unapproved licenses", () => {
  assert.equal(isAllowedSlideLicense({ extmetadata: { LicenseShortName: { value: "All rights reserved" } } }), false);
});
test("rejects winter images for summer slides", () => {
  assert.equal(passesSlideImageFilters(image({ title: "Snowy winter lake" }), brief), false);
});
test("rejects an avoided subject in image metadata", () => {
  assert.equal(passesSlideImageFilters(image({ title: "Motorcycle by the village" }), brief), false);
});
test("rejects photographs taken in winter months", () => {
  assert.equal(passesSlideImageFilters(image({ extmetadata: { LicenseShortName: { value: "CC BY 4.0" }, DateTimeOriginal: { value: "2024:01:15 10:00:00" } } }), brief), false);
});
