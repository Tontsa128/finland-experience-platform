import assert from "node:assert/strict";
import test from "node:test";
import { buildLocalizedMetadata, localizedUrl, siteUrl } from "@/lib/seo";

test("localizedUrl normalizes leading slashes and creates locale-specific URLs", () => {
  assert.equal(
    localizedUrl("fi", "/destinations/mathildedal"),
    siteUrl + "/fi/destinations/mathildedal",
  );
  assert.equal(localizedUrl("es"), siteUrl + "/es");
  assert.equal(localizedUrl("en", "accommodations/cabin"), siteUrl + "/en/accommodations/cabin");
});

test("buildLocalizedMetadata uses the current page as canonical and supplies all language alternates", () => {
  const metadata = buildLocalizedMetadata({
    locale: "es",
    title: "Viajar por Finlandia",
    description: "Descubre Finlandia.",
    path: "destinations/mathildedal",
  });

  assert.equal(metadata.alternates?.canonical, siteUrl + "/es/destinations/mathildedal");
  assert.equal(metadata.alternates?.languages?.fi, siteUrl + "/fi/destinations/mathildedal");
  assert.equal(metadata.alternates?.languages?.es, siteUrl + "/es/destinations/mathildedal");
  assert.equal(metadata.alternates?.languages?.en, siteUrl + "/en/destinations/mathildedal");
  assert.equal(metadata.alternates?.languages?.["x-default"], siteUrl + "/en/destinations/mathildedal");
  assert.equal(metadata.openGraph?.url, siteUrl + "/es/destinations/mathildedal");
});

test("buildLocalizedMetadata can mark admin or utility pages as noindex", () => {
  const metadata = buildLocalizedMetadata({
    locale: "fi",
    title: "Hallinta",
    description: "Ylläpitonäkymä",
    path: "admin",
    noindex: true,
  });

  assert.deepEqual(metadata.robots, { index: false, follow: false });
});
