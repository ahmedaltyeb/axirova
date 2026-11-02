import React from "react";
import { useContent } from "../content";
import { SITE } from "../utils/siteData";
import QuoteForm from "../components/QuoteForm";
import SEO from "../components/SEO";
export default function ContactPage({ demo = false }) {
  const { c } = useContent();
  const booking = import.meta.env.VITE_BOOKING_URL;
  return (
    <>
      <SEO
        title={demo ? c.demo : c.nav.contact}
        description={demo ? c.booking.text : c.descriptions.contact}
      />
      <div className="page-intro shell">
        <span className="eyebrow">AXIROVA / {c.region}</span>
        <h1>{demo ? c.booking.title : c.home.final}</h1>
        <p>{demo ? c.booking.text : c.descriptions.contact}</p>
      </div>
      <section className="shell section contact-grid">
        <aside>
          <h2>{c.contactUs}</h2>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a dir="ltr" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
            {SITE.phone}
          </a>
          <p>{c.region}</p>
          {demo && (
            <div className="booking-placeholder">
              {booking ? (
                <>
                  <a
                    className="text-link"
                    href={booking}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.booking.open} ↗
                  </a>
                  <iframe
                    title={c.booking.title}
                    src={booking}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                  />
                </>
              ) : (
                <p>{c.booking.placeholder}</p>
              )}
            </div>
          )}
        </aside>
        <div className="form-card">
          <QuoteForm demo={demo} />
        </div>
      </section>
    </>
  );
}
