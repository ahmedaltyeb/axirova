import test from "node:test";
import assert from "node:assert/strict";
import enquiry from "../netlify/functions/enquiry.mjs";

test("Netlify adapter preserves enquiry status, origin checks, and payload limits", async () => {
  const url = "https://axirova-example.netlify.app/api/enquiry";
  const context = { ip: "netlify-adapter-test" };
  const methodResponse = await enquiry(new Request(url), context);
  assert.equal(methodResponse.status, 405);
  assert.equal(methodResponse.headers.get("Allow"), "POST");
  assert.equal(methodResponse.headers.get("Cache-Control"), "no-store");
  const rejected = await enquiry(
    new Request(url, {
      method: "POST",
      headers: {
        Origin: "https://elsewhere.example",
        "Content-Type": "application/json",
      },
      body: "{}",
    }),
    context,
  );
  assert.equal(rejected.status, 403);
  const honeypot = await enquiry(
    new Request(url, {
      method: "POST",
      headers: {
        Origin: "https://axirova-example.netlify.app",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website: "spam" }),
    }),
    context,
  );
  assert.equal(honeypot.status, 200);
  assert.deepEqual(await honeypot.json(), { ok: true });
  const large = await enquiry(
    new Request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": "17000",
      },
      body: "{}",
    }),
    context,
  );
  assert.equal(large.status, 413);
});
