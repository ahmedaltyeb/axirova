import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content";
import { services, products, work } from "../content/catalog";
import { Cards, Section, PricingCards, FAQs } from "../components/Marketing";
import QuoteForm from "../components/QuoteForm";
import SEO from "../components/SEO";
import useRichEffects from "../hooks/useRichEffects";
import ClientLogos from "../components/ClientLogos";
const Particles = lazy(() => import("../components/Particles"));
const TechStack = lazy(() => import("../components/TechStack"));
export default function Home() {
  const { c } = useContent();
  const rich = useRichEffects();
  const techRef = useRef(null);
  const [showTech, setShowTech] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTech(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" },
    );
    if (techRef.current) observer.observe(techRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <SEO title={c.home.intro} description={c.home.sub} faq={c.faq} />
      <section className="hero">
        <div className="aurora" aria-hidden />
        {rich && (
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        )}
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <i />
              {c.home.eyebrow}
            </span>
            <h1>
              {c.home.title}
              <br />
              <span>{c.home.accent}</span>
            </h1>
            <p className="hero-intro">{c.home.intro}</p>
            <p>{c.home.sub}</p>
            <div className="button-row">
              <Link className="button" to="/contact">
                {c.start} ↗
              </Link>
              <Link className="text-link" to="/services">
                {c.home.secondary} <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="trust-list">
              {c.home.trust.map((t) => (
                <span key={t}>
                  <b aria-hidden>✓</b> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-form">
            <div className="form-heading">
              <span className="eyebrow">{c.home.next}</span>
              <h2>{c.home.quote}</h2>
            </div>
            <QuoteForm />
          </div>
        </div>
        <div className="shell metrics-strip">
          {c.home.metrics.map((t) => (
            <div key={t}>
              <span className="metric-dash">—</span>
              <small>{t}</small>
            </div>
          ))}
          <div>
            <span className="metric-dash">EN / AR</span>
            <small>{c.home.trust[1]}</small>
          </div>
        </div>
      </section>
      <div className="tech-ribbon">
        <div className="shell">
          <span>{c.home.tech}</span>
          <div className="technology-names" dir="ltr">
            {[
              "React",
              "Flutter",
              "Django",
              "Laravel",
              "n8n",
              "OpenAI",
              "Cloud",
            ].map((t) => (
              <strong key={t}>{t}</strong>
            ))}
          </div>
        </div>
      </div>
      <Section title={c.home.problem} sub={c.home.problemSub} eyebrow="01 /">
        <Cards
          items={[services[0], services[3], services[4]]}
          base="services"
        />
      </Section>
      <Section
        className="pain-section"
        title={c.home.painTitle}
        sub={c.home.painText}
      >
        <div className="pain-list">
          {c.home.pains.map((p, i) => (
            <div key={p}>
              <span>0{i + 1}</span>
              <h3>{p}</h3>
              <span aria-hidden>↘</span>
            </div>
          ))}
        </div>
      </Section>
      <Section
        className="reframe"
        title={c.home.reframe}
        sub={c.home.reframeText}
      >
        <div className="system-map" aria-hidden>
          <span>{c.home.operations}</span>
          <i>↔</i>
          <strong>AXIROVA</strong>
          <i>↔</i>
          <span>{c.home.growth}</span>
        </div>
      </Section>
      <Section title={c.home.process} eyebrow="02 /">
        <ol className="process-grid">
          {c.home.steps.map((s, i) => (
            <li key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
              <p>{c.home.stepText[i]}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section
        title={c.home.services}
        sub={c.descriptions.services}
        eyebrow="03 /"
      >
        {["Build", "Automate", "Grow"].map((group) => (
          <div className="service-group" key={group}>
            <h3 className="group-title">{c.groups[group]}</h3>
            <Cards
              items={services.filter((s) => s.group === group)}
              base="services"
            />
          </div>
        ))}
      </Section>
      <Section title={c.home.products} sub={c.home.productsSub} eyebrow="04 /">
        <Cards items={products.slice(0, 3)} base="products" />
        <Link className="text-link section-link" to="/products">
          {c.nav.products} →
        </Link>
      </Section>
      <Section title={c.home.compare}>
        <div className="two-grid comparison">
          {[c.home.before, c.home.after].map((h, i) => (
            <article key={h}>
              <h3>{h}</h3>
              {(i ? c.home.afterItems : c.home.beforeItems).map((s) => (
                <p key={s}>
                  <span aria-hidden>{i ? "↗" : "—"}</span>
                  {s}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Section>
      <Section title={c.home.work} sub={c.descriptions.work} eyebrow="05 /">
        <Cards items={work} base="work" />
      </Section>
      <Section
        title={c.pricing.title}
        sub={c.descriptions.pricing}
        eyebrow="06 /"
      >
        <PricingCards />
      </Section>
      <div ref={techRef}>
        {rich && showTech && (
          <Suspense fallback={null}>
            <TechStack />
          </Suspense>
        )}
      </div>
      <ClientLogos />
      <Section title={c.home.faq}>
        <FAQs />
      </Section>
      <Section
        className="final-quote"
        title={c.home.final}
        sub={c.home.finalSub}
      >
        <QuoteForm />
      </Section>
    </>
  );
}
