import { services, products, industries } from "../src/content/catalog.js";
import en from "../src/content/en.js";
import ar from "../src/content/ar.js";
import { assistantCopy } from "../src/content/assistant.js";

export function routeIndex(lang) {
  const c = lang === "ar" ? ar : en;
  const routes = new Map(
    Object.entries(c.nav).map(([key, label]) => [
      key === "home" ? "/" : `/${key}`,
      label,
    ]),
  );
  routes.set("/request-demo", c.demo);
  routes.set("/calculator", c.estimator.title);
  for (const [base, items] of Object.entries({
    services,
    products,
    industries,
  }))
    for (const item of items)
      routes.set(`/${base}/${item.slug}`, item.title[lang]);
  return routes;
}
export function knowledgePack(lang) {
  const c = lang === "ar" ? ar : en;
  return {
    company:
      "AXIROVA Technology: founder-led UAE software company serving GCC/MENA. Arabic and English.",
    services: services.map((s) => ({
      name: s.title[lang],
      description: s.desc[lang],
      areas: s.features[lang],
      path: `/services/${s.slug}`,
    })),
    products: products.map((p) => ({
      name: p.title[lang],
      description: p.desc[lang],
      discussionAreas: p.features[lang],
      path: `/products/${p.slug}`,
    })),
    faq: c.faq,
    pricing:
      "No confirmed public prices, fixed timelines, discounts, or service-level commitments. Launch / Growth / Custom are engagement directions only. Final proposal follows discovery.",
    support:
      "No authenticated product access, ticket lookup, password reset, remote diagnostics, or system changes. Collect a reviewable support request for staff.",
    productCaveat: c.detail.productNote,
    routes: Object.fromEntries(routeIndex(lang)),
  };
}
export function cleanReply(reply, lang) {
  const routes = routeIndex(lang);
  return {
    ...reply,
    links: [...new Set(reply.links)]
      .filter((path) => routes.has(path))
      .slice(0, 3)
      .map((to) => ({ to, label: routes.get(to) })),
  };
}
export function guidedReply(input) {
  const c = assistantCopy[input.lang];
  const last = input.messages.at(-1).content.toLowerCase();
  let intent = "sales";
  if (/support|error|broken|login|bug|دعم|مشكلة|خطأ|دخول/.test(last))
    intent = "support";
  else if (/quot|pric|cost|estimate|عرض سعر|تكلف|تسعير|سعر/.test(last))
    intent = "quotation";
  else if (/contact|talk to|call me|تواصل|اتصل|فريق المبيعات/.test(last))
    intent = "lead";
  const aliases = {
    pharmexa: ["pharmexa", "فارمكسا", "فارمكسا", "صيدلي", "pharmacy"],
    pharmaxpsm: ["pharmaxpsm", "فارماكس"],
    udrive: ["udrive", "يو درايف", "car rental", "تأجير"],
    solarerp: ["solarerp", "سولار", "solar", "ميداني"],
    mohamina: ["mohamina", "محامينا", "legal", "قانون"],
    "axirova-fleet": ["fleet", "gps", "أسطول", "تتبع"],
    "axirova-os": ["axirova os", "agency", "وكالة"],
  };
  let entity = products.find((p) =>
    aliases[p.slug]?.some((alias) => last.includes(alias)),
  );
  let base = "products";
  if (!entity) {
    base = "services";
    entity = services.find(
      (s) =>
        last.includes(s.title.en.toLowerCase()) || last.includes(s.title.ar),
    );
  }
  let reply =
    c[
      `${intent === "sales" ? "default" : intent === "quotation" ? "quote" : intent}Reply`
    ];
  let links =
    intent === "support"
      ? ["/contact", "/products"]
      : intent === "quotation"
        ? ["/calculator", "/pricing"]
        : intent === "lead"
          ? ["/contact"]
          : ["/services", "/products"];
  if (entity && intent === "sales") {
    reply = `${entity.title[input.lang]}: ${entity.desc[input.lang]} ${c.featureCaveat}`;
    links = [`/${base}/${entity.slug}`, "/request-demo"];
  }
  return {
    ...cleanReply({ reply, intent, links }, input.lang),
    mode: "guided",
  };
}
