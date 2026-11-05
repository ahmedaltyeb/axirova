import test from "node:test";
import assert from "node:assert/strict";
import en from "../src/content/en.js";
import ar from "../src/content/ar.js";
import {
  services,
  products,
  industries,
  work,
  insights,
} from "../src/content/catalog.js";
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, shape(v)]),
    );
  assert.equal(typeof value, "string");
  assert.ok(value.length);
  return "string";
}
test("all page copy has Arabic parity", () =>
  assert.deepEqual(shape(en), shape(ar)));
test("catalog routes have unique slugs and bilingual fields", () => {
  for (const items of [services, products, industries, work, insights]) {
    assert.equal(new Set(items.map((i) => i.slug)).size, items.length);
    for (const item of items) {
      assert.match(item.slug, /^[a-z0-9-]+$/);
      assert.ok(item.title.en && item.title.ar && item.desc.en && item.desc.ar);
      if (item.features)
        assert.equal(item.features.en.length, item.features.ar.length);
    }
  }
});
