import assert from "node:assert/strict";
import test from "node:test";
import { firstValidHttpUrl, isSafeUrlOrPath } from "@/lib/utils";

test("firstValidHttpUrl prefers the first valid HTTP(S) URL", () => {
  assert.equal(
    firstValidHttpUrl("https://provider.example.invalid/booking", "https://provider.example.invalid/"),
    "https://provider.example.invalid/booking",
  );
});

test("firstValidHttpUrl skips malformed and unsafe protocols", () => {
  assert.equal(
    firstValidHttpUrl("javascript:alert(1)", "ftp://example.com", "https://example.com/path"),
    "https://example.com/path",
  );
});

test("firstValidHttpUrl returns null when no safe URL exists", () => {
  assert.equal(firstValidHttpUrl("", null, "not-a-url"), null);
});


test("isSafeUrlOrPath accepts internal paths and HTTP(S) URLs only", () => {
  assert.equal(isSafeUrlOrPath("/fi/destinations"), true);
  assert.equal(isSafeUrlOrPath("https://example.com"), true);
  assert.equal(isSafeUrlOrPath("javascript:alert(1)"), false);
  assert.equal(isSafeUrlOrPath("//evil.example"), false);
});
