import React from "react";
import { CLIENT_LOGOS } from "../utils/siteData";
import { useContent } from "../content";

export default function ClientLogos() {
  const { c } = useContent();
  return (
    <section className="trusted-brands" aria-labelledby="trusted-brands-title">
      <div className="shell">
        <h2 id="trusted-brands-title">{c.brands.title}</h2>
        <ul className="trusted-brands-grid">
          {CLIENT_LOGOS.map((client) => (
            <li key={client.logo}>
              <img
                src={`${import.meta.env.BASE_URL}images/clients/${client.logo}`}
                alt={client.name}
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
