import { writeFileSync } from "node:fs";
import {
  services,
  products,
  industries,
  work,
  insights,
} from "../src/content/catalog.js";
const origin = (process.env.VITE_SITE_URL || "https://axirova.ae").replace(
  /\/$/,
  "",
);
const paths = [
  "/",
  "/services",
  "/products",
  "/industries",
  "/work",
  "/insights",
  "/pricing",
  "/about",
  "/contact",
  "/request-demo",
  "/calculator",
  "/privacy",
  "/terms",
];
for (const [base, items] of Object.entries({
  services,
  products,
  industries,
  work,
  insights,
}))
  for (const item of items)
    if (!item.placeholder) paths.push(`/${base}/${item.slug}`);
const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `\n  <url><loc>${escape(origin + path)}</loc></url>`).join("")}\n</urlset>\n`,
);
writeFileSync(
  "public/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`,
);
