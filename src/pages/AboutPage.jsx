import React from "react";
import { useContent } from "../content";
import { SITE } from "../utils/siteData";
import Vision from "../components/Vision";
import Values from "../components/Values";
import SEO from "../components/SEO";
import { CTA } from "../components/Marketing";
export default function AboutPage() {
  const { c } = useContent();
  return (
    <>
      <SEO title={c.nav.about} description={c.descriptions.about} />
      <div className="page-intro shell">
        <span className="eyebrow">AXIROVA / {c.nav.about}</span>
        <h1>{c.descriptions.about}</h1>
        <p>{c.aboutText}</p>
        <div className="founder-note">
          <span>{c.founder}</span>
          {SITE.founders.map((founder) => (
            <strong key={founder.name}>{founder.name}</strong>
          ))}
        </div>
      </div>
      <section
        className="shell founder-message"
        aria-labelledby="founder-message-title"
      >
        <div className="founder-portraits">
          {SITE.founders.map((founder) => (
            <figure className="founder-portrait" key={founder.name}>
              <img
                src={`${import.meta.env.BASE_URL}${founder.portrait}`}
                alt={founder.name}
                width={founder.width}
                height={founder.height}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{founder.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="founder-message-copy">
          <span className="eyebrow">{c.founderMessage.eyebrow}</span>
          <h2 id="founder-message-title">{c.founderMessage.title}</h2>
          {c.founderMessage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="founder-message-signature">
            <span>{c.founder}</span>
            {SITE.founders.map((founder) => (
              <strong key={founder.name}>{founder.name}</strong>
            ))}
          </div>
        </div>
      </section>
      <Vision />
      <Values />
      <CTA />
    </>
  );
}
