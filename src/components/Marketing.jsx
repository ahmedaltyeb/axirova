import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useContent } from "../content";
import ProductVisual from "./ProductVisual";
export function Section({ title, sub, eyebrow, children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className={`section shell ${className}`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.45 }}
      viewport={{ once: true }}
    >
      <div className="section-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </motion.section>
  );
}
export function Cards({ items, base }) {
  const { c, pick } = useContent();
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <Link
          className={`feature-card ${base === "products" ? "product-card" : ""}`}
          key={item.slug}
          to={`/${base}/${item.slug}`}
        >
          {base === "products" && <ProductVisual product={item} />}
          <div className="card-top">
            <span className="card-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden>↗</span>
          </div>
          <h3>{pick(item.title)}</h3>
          <p>{pick(item.desc)}</p>
          {item.placeholder && (
            <small className="placeholder-label">
              {base === "work" ? c.detail.workNote : c.detail.insightNote}
            </small>
          )}
          <span className="card-link">
            {c.explore} <span aria-hidden>→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
export function PricingCards() {
  const { c } = useContent();
  return (
    <>
      <div className="card-grid pricing-grid">
        {c.pricing.tiers.map((name, i) => (
          <article
            className={`feature-card price-card ${i === 1 ? "featured" : ""}`}
            key={name}
          >
            <span className="eyebrow">0{i + 1}</span>
            <h3>{name}</h3>
            <p>{c.pricing.desc[i]}</p>
            <strong className="price-placeholder">{c.pricing.price}</strong>
            <p className="placeholder-label">{c.pricing.features}</p>
            <Link
              className={i === 1 ? "button" : "button secondary"}
              to="/contact"
            >
              {c.start} ↗
            </Link>
          </article>
        ))}
      </div>
      <div className="two-grid engagement">
        {c.pricing.models.map((m, i) => (
          <article key={m}>
            <h3>{m}</h3>
            <p>{c.pricing.modelText[i]}</p>
          </article>
        ))}
      </div>
    </>
  );
}
export function FAQs() {
  const { c } = useContent();
  return (
    <div className="faqs">
      {c.faq.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden>＋</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function CTA() {
  const { c } = useContent();
  return (
    <Section className="cta-section" title={c.home.final} sub={c.home.finalSub}>
      <div className="button-row">
        <Link className="button" to="/contact">
          {c.start} ↗
        </Link>
        <Link className="button secondary" to="/calculator">
          {c.estimator.title}
        </Link>
      </div>
    </Section>
  );
}
