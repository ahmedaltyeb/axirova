import React from "react";
import { useParams, Link } from "react-router-dom";
import { useContent } from "../content";
import * as catalog from "../content/catalog";
import { Cards, Section, CTA, FAQs } from "../components/Marketing";
import SEO from "../components/SEO";
import NotFound from "./NotFound";
import ProductVisual from "../components/ProductVisual";
import ProductGallery from "../components/ProductGallery";
export default function Collection({ type }) {
  const { slug } = useParams();
  const { c, pick } = useContent();
  const items = catalog[type];
  const item = items.find((i) => i.slug === slug);
  if (slug && !item) return <NotFound />;
  const title = item ? pick(item.title) : c.nav[type];
  const description = item ? pick(item.desc) : c.descriptions[type];
  return (
    <>
      <SEO
        title={title}
        description={description}
        service={type === "services" && !!item}
        faq={type === "services" ? c.faq : undefined}
        noindex={!!item?.placeholder}
      />
      <div className="page-intro shell">
        <span className="eyebrow">AXIROVA / {c.nav[type]}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {item && (
          <Link className="text-link" to={`/${type}`}>
            {c.back} →
          </Link>
        )}
      </div>
      {!item ? (
        <Section>
          <Cards items={items} base={type} />
        </Section>
      ) : (
        <>
          {(type === "services" || type === "products") && (
            <Section title={c.detail.problem} sub={description}>
              <div className="two-grid">
                <article className="feature-card">
                  <h2>{c.detail.solution}</h2>
                  <p>{c.home.reframeText}</p>
                </article>
                <article className="feature-card">
                  <h2>{c.home.steps[0]}</h2>
                  <p>{c.home.stepText[0]}</p>
                </article>
              </div>
            </Section>
          )}
          {type === "products" && (
            <Section>
              <ProductVisual product={item} detail />
              <ProductGallery item={item} />
              <p className="notice">{c.detail.productNote}</p>
            </Section>
          )}
          {type === "work" && item.showcase && (
            <Section>
              <ProductVisual product={item} detail />
              <ProductGallery item={item} />
              <div className="button-row section-link">
                <Link className="button" to={`/products/${item.productSlug}`}>
                  {c.nav.products} · UDrive ↗
                </Link>
                <Link
                  className="text-link"
                  to={`/request-demo?product=${item.productSlug}`}
                >
                  {c.demo} ↗
                </Link>
              </div>
            </Section>
          )}
          {type === "work" && !item.showcase && (
            <Section>
              <p className="notice">{c.detail.workNote}</p>
              <div className="two-grid">
                <article className="feature-card">
                  <h2>{c.detail.problem}</h2>
                  <p>{description}</p>
                </article>
                <article className="feature-card">
                  <h2>{c.detail.solution}</h2>
                  <p>{c.home.reframeText}</p>
                </article>
              </div>
              <article className="outcome">
                <h2>{c.detail.outcome}</h2>
                <p>{c.detail.outcomeText}</p>
              </article>
            </Section>
          )}
          {type === "insights" && (
            <Section>
              <article className="reading">
                <p className="notice">{c.detail.insightNote}</p>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            </Section>
          )}
          {(type === "services" || type === "products") && (
            <Section title={c.detail.features}>
              <div className="three-grid">
                {pick(item.features).map((f, i) => (
                  <article className="feature-card" key={f}>
                    <span className="eyebrow">0{i + 1}</span>
                    <h3>{f}</h3>
                    <p>
                      {type === "services"
                        ? c.home.stepText[i]
                        : c.detail.productNote}
                    </p>
                  </article>
                ))}
              </div>
              <div className="button-row">
                <Link
                  className="button"
                  to={
                    type === "products"
                      ? `/request-demo?product=${item.slug}`
                      : "/contact"
                  }
                >
                  {type === "products" ? c.demo : c.start} ↗
                </Link>
              </div>
            </Section>
          )}
          {type === "industries" && (
            <Section title={c.home.products} sub={c.home.productsSub}>
              <Cards
                items={catalog.products.filter((p) => p.industry === item.slug)}
                base="products"
              />
              <Link className="text-link section-link" to="/services">
                {c.nav.services} →
              </Link>
            </Section>
          )}
        </>
      )}
      {type === "services" && (
        <Section title={c.home.faq}>
          <FAQs />
        </Section>
      )}
      <CTA />
    </>
  );
}
