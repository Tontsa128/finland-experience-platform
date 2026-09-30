import assert from "node:assert/strict";
import test from "node:test";
import { firstValidHttpUrl } from "@/lib/utils";

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
