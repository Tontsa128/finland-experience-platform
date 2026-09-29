import assert from "node:assert/strict";
import test from "node:test";
import { rateLimit } from "@/lib/rate-limit";

test("rateLimit allows requests inside the configured window", () => {
  const key = "test:rate-limit-allows";
  const first = rateLimit(key, 2, 60_000);
  const second = rateLimit(key, 2, 60_000);
  const third = rateLimit(key, 2, 60_000);

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.equal(third.ok, false);
  assert.equal(third.remaining, 0);
  assert.ok(third.resetAt > Date.now());
});

test("rateLimit keeps scopes isolated", () => {
  const first = rateLimit("test:scope-a", 1, 60_000);
  const other = rateLimit("test:scope-b", 1, 60_000);

  assert.equal(first.ok, true);
  assert.equal(other.ok, true);
});
