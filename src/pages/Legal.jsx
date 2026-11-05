import React from "react";
import { useContent } from "../content";
import { SITE } from "../utils/siteData";
import SEO from "../components/SEO";
export default function Legal({ type }) {
  const { c } = useContent();
  const title = c.nav[type];
  return (
    <>
      <SEO title={title} description={c.legal.draft} />
      <article className="page-intro shell reading">
        <h1>{title}</h1>
        <p className="notice">{c.legal.draft}</p>
        <p>{c.legal[type]}</p>
        <a className="text-link" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </article>
    </>
  );
}
