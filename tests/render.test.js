import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { writeFile, unlink } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
import {
  services,
  products,
  industries,
  work,
  insights,
} from "../src/content/catalog.js";

test("every page template renders in English and Arabic", async () => {
  const output = path.resolve(".render-check.mjs");
  const originalStorage = globalThis.localStorage;
  const originalError = console.error;
  // The app is client rendered. Ignore React's expected SSR layout-effect notice
  // in this render-only smoke test while preserving unexpected warnings.
  console.error = (...args) => {
    if (
      !String(args[0]).startsWith(
        "Warning: useLayoutEffect does nothing on the server",
      )
    )
      originalError(...args);
  };
  try {
    const bundle = await build({
      entryPoints: ["tests/renderHarness.jsx"],
      bundle: true,
      write: false,
      platform: "node",
      format: "esm",
      external: ["react", "react/*", "react-dom", "react-dom/*"],
      loader: { ".png": "dataurl" },
      define: { "import.meta.env": "{}" },
    });
    await writeFile(output, bundle.outputFiles[0].text);
    const { renderPage } = await import(pathToFileURL(output).href);
    const examples = [
      ["/", "Home", {}],
      ["/pricing", "Pricing", {}],
      ["/about", "AboutPage", {}],
      ["/contact", "ContactPage", {}],
      ["/request-demo", "ContactPage", { demo: true }],
      ["/calculator", "Calculator", {}],
      ["/privacy", "Legal", { type: "privacy" }],
      ["/terms", "Legal", { type: "terms" }],
      ["/missing", "NotFound", {}],
    ];
    for (const [type, items] of Object.entries({
      services,
      products,
      industries,
      work,
      insights,
    })) {
      examples.push([`/${type}`, "Collection", { type }]);
      for (const item of items)
        examples.push([`/${type}/${item.slug}`, "Collection", { type }]);
      examples.push([`/${type}/unknown`, "Collection", { type }]);
    }
    for (const lang of ["en", "ar"]) {
      globalThis.localStorage = { getItem: () => lang };
      for (const [url, name, props] of examples) {
        const route =
          name === "Collection"
            ? url.split("/").length === 3
              ? `/${props.type}/:slug`
              : `/${props.type}`
            : "*";
        const html = renderPage(name, url, props, route);
        assert.match(html, /<h1[ >]/, `${lang} ${url} must have a heading`);
        assert.ok(html.length > 200, `${lang} ${url} must render content`);
        if (lang === "ar")
          assert.match(html, /[\u0600-\u06ff]/, `${url} must include Arabic`);
      }
    }
  } finally {
    console.error = originalError;
    globalThis.localStorage = originalStorage;
    await unlink(output).catch(() => {});
  }
});
