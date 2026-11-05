import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

// Follow static imports: optional route/form/desktop effects must not delay home.
const manifest = JSON.parse(readFileSync("dist/.vite/manifest.json", "utf8"));
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
assert.ok(
  entry,
  "Build the production website before checking its download budget.",
);
const visited = new Set();
const visiting = new Set();
function visit(key) {
  assert.ok(
    !visiting.has(key),
    `Initial bundles must not form a dependency cycle: ${key}`,
  );
  if (visited.has(key)) return;
  visiting.add(key);
  for (const dependency of manifest[key].imports || []) visit(dependency);
  visiting.delete(key);
  visited.add(key);
}
visit(entry);
const files = [...visited].map((key) => manifest[key].file);
const bytes = files.reduce(
  (sum, file) => sum + gzipSync(readFileSync(`dist/${file}`)).length,
  0,
);
assert.ok(
  !files.some((file) => /framer-motion|QuoteForm/.test(file)),
  "Form and desktop animation libraries must stay off the initial download path.",
);
assert.ok(
  bytes <= 110000,
  `Initial JavaScript exceeds the 110 kB gzip budget: ${bytes} bytes.`,
);
console.log(
  `Initial JavaScript: ${(bytes / 1000).toFixed(1)} kB gzip; budget 110 kB. Optional form and animation code is deferred.`,
);
