import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

test("Apps Script saves once, retries email, and blocks unauthorized writes", () => {
  const rows = [Array(13).fill("header")];
  let sent = 0;
  let emailFails = false;
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    getRange(row, column) {
      return {
        createTextFinder(text) {
          return {
            matchEntireCell() {
              return this;
            },
            findNext() {
              const index = rows.findIndex((r, i) => i > 0 && r[0] === text);
              return index < 0 ? null : { getRow: () => index + 1 };
            },
          };
        },
        getValue: () => rows[row - 1][column - 1],
        setValue(value) {
          rows[row - 1][column - 1] = value;
        },
      };
    },
    appendRow(row) {
      rows.push(row);
    },
  };
  const properties = {
    WEBHOOK_TOKEN: "test-secret",
    NOTIFY_EMAIL: "axirova26@gmail.com",
    SPREADSHEET_ID: "test-sheet",
  };
  const context = vm.createContext({
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: (key) => properties[key] }),
    },
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput: (body) => ({ setMimeType: () => JSON.parse(body) }),
    },
    LockService: {
      getScriptLock: () => ({
        waitLock() {
          locked = true;
        },
        hasLock: () => locked,
        releaseLock() {
          locked = false;
        },
      }),
    },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName: () => sheet,
        getUrl: () => "https://example.com/sheet",
      }),
      flush() {},
    },
    MailApp: {
      sendEmail(message) {
        assert.equal(message.to, "axirova26@gmail.com");
        if (emailFails) throw new Error("quota");
        sent++;
      },
    },
  });
  vm.runInContext(
    readFileSync("integrations/google-apps-script/Code.gs", "utf8"),
    context,
  );
  const lead = {
    token: "test-secret",
    submissionId: "55555555-5555-4555-8555-555555555555",
    consent: true,
    name: "=formula",
    company: "Demo Co",
    email: "test@example.com",
    message: "A test enquiry only",
  };
  const run = (body) =>
    context.doPost({ postData: { contents: JSON.stringify(body) } });
  assert.equal(run({ ...lead, token: "wrong" }).ok, false);
  assert.equal(rows.length, 1);
  emailFails = true;
  const partial = run(lead);
  assert.equal(partial.saved, true);
  assert.equal(partial.emailSent, false);
  assert.equal(rows.length, 2);
  assert.equal(rows[1][4], "'=formula");
  emailFails = false;
  assert.equal(run(lead).ok, true);
  assert.equal(rows.length, 2);
  assert.equal(sent, 1);
  assert.equal(run(lead).ok, true);
  assert.equal(rows.length, 2);
  assert.equal(sent, 1);
});
