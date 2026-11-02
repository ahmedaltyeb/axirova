import test from "node:test";
import assert from "node:assert/strict";
import { deliverGoogleEnquiry } from "../api/google-enquiry.js";

test("Google delivery requires acknowledgement of both sheet and email", async () => {
  const savedFetch = globalThis.fetch;
  const savedUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const savedToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
  try {
    delete process.env.GOOGLE_APPS_SCRIPT_URL;
    delete process.env.GOOGLE_APPS_SCRIPT_TOKEN;
    assert.equal((await deliverGoogleEnquiry({})).status, 503);
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://example.com/hook";
    process.env.GOOGLE_APPS_SCRIPT_TOKEN = "test-secret";
    assert.equal((await deliverGoogleEnquiry({})).status, 503);
    process.env.GOOGLE_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/test-deployment/exec";
    let payload;
    globalThis.fetch = async (_url, options) => {
      payload = JSON.parse(options.body);
      return {
        ok: true,
        json: async () => ({ ok: true, saved: true, emailSent: true }),
      };
    };
    const id = "55555555-5555-4555-8555-555555555555";
    assert.equal(
      (await deliverGoogleEnquiry({ name: "Demo", submissionId: id })).status,
      200,
    );
    assert.equal(payload.token, "test-secret");
    assert.equal(payload.submissionId, id);
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ ok: true, saved: true, emailSent: false }),
    });
    assert.equal((await deliverGoogleEnquiry({})).status, 502);
    globalThis.fetch = async () => ({ ok: false });
    assert.equal((await deliverGoogleEnquiry({})).status, 502);
  } finally {
    globalThis.fetch = savedFetch;
    if (savedUrl === undefined) delete process.env.GOOGLE_APPS_SCRIPT_URL;
    else process.env.GOOGLE_APPS_SCRIPT_URL = savedUrl;
    if (savedToken === undefined) delete process.env.GOOGLE_APPS_SCRIPT_TOKEN;
    else process.env.GOOGLE_APPS_SCRIPT_TOKEN = savedToken;
  }
});
