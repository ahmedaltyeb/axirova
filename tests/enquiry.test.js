import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/enquiry.js";
const valid = {
  name: "Test Person",
  company: "Test Company",
  email: "test@example.com",
  whatsapp: "",
  service: "custom-software",
  budget: "0",
  message: "Please discuss our workflow.",
  consent: true,
  website: "",
  lang: "en",
  type: "project",
};
let counter = 0;
async function request(body = valid, extra = {}) {
  const result = { headers: {}, statusCode: 0, data: null };
  const req = {
    method: "POST",
    headers: { "content-type": "application/json", host: "example.com" },
    socket: { remoteAddress: `test-${counter++}` },
    body,
    ...extra,
  };
  const res = {
    setHeader: (k, v) => (result.headers[k] = v),
    status(code) {
      result.statusCode = code;
      return this;
    },
    json(data) {
      result.data = data;
      return this;
    },
  };
  await handler(req, res);
  return result;
}
test("enquiry delivery and abuse controls", async () => {
  const originalFetch = globalThis.fetch;
  const oldEnv = { ...process.env };
  delete process.env.ENQUIRY_WEBHOOK_URL;
  delete process.env.RESEND_API_KEY;
  try {
    assert.equal((await request(valid, { method: "GET" })).statusCode, 405);
    assert.equal(
      (
        await request(valid, {
          headers: {
            origin: "https://evil.example",
            host: "example.com",
            "content-type": "application/json",
          },
        })
      ).statusCode,
      403,
    );
    assert.equal(
      (await request({ ...valid, email: "", whatsapp: "" })).statusCode,
      400,
    );
    assert.equal((await request({ ...valid, consent: false })).statusCode, 400);
    assert.equal((await request({ ...valid, message: "x" })).statusCode, 400);
    assert.equal(
      (await request({ ...valid, website: "spam" })).statusCode,
      200,
    );
    assert.equal((await request()).statusCode, 503);
    process.env.ENQUIRY_WEBHOOK_URL = "https://example.com/hook";
    let sent;
    globalThis.fetch = async (_url, init) => {
      sent = JSON.parse(init.body);
      return { ok: true };
    };
    assert.equal((await request()).statusCode, 200);
    assert.equal(sent.email, valid.email);
    assert.equal(
      (await request({ ...valid, email: "", whatsapp: "+971 52 930 7250" }))
        .statusCode,
      200,
    );
    const same = { socket: { remoteAddress: "repeat-ip" } };
    for (let i = 0; i < 5; i++)
      assert.equal((await request(valid, same)).statusCode, 200);
    assert.equal((await request(valid, same)).statusCode, 429);
    globalThis.fetch = async () => ({ ok: false });
    assert.equal((await request()).statusCode, 502);
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    assert.equal((await request()).statusCode, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of ["ENQUIRY_WEBHOOK_URL", "RESEND_API_KEY"]) {
      if (oldEnv[key] === undefined) delete process.env[key];
      else process.env[key] = oldEnv[key];
    }
  }
});
