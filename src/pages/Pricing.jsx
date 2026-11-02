import React from "react";
import { useContent } from "../content";
import { Section, PricingCards, CTA } from "../components/Marketing";
import SEO from "../components/SEO";
export default function Pricing() {
  const { c } = useContent();
  return (
    <>
      <SEO title={c.nav.pricing} description={c.descriptions.pricing} />
      <div className="page-intro shell">
        <span className="eyebrow">AXIROVA /</span>
        <h1>{c.pricing.title}</h1>
        <p>{c.descriptions.pricing}</p>
      </div>
      <Section>
        <PricingCards />
      </Section>
      <CTA />
    </>
  );
}
