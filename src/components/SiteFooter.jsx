import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content";
import { SITE } from "../utils/siteData";
import BrandLogo from "./BrandLogo";

const paths = {
  linkedin: (
    <>
      <path d="M5 9v10M5 5v.1M10 19V9h4v2c1-3 6-3 6 2v6M10 13c0-3 4-3 4 0v6" />
    </>
  ),
  twitter: <path d="m4 4 16 16M20 4 4 20M4 4h5l11 16h-5Z" />,
  github: (
    <path d="M9 20c-4 1-4-2-6-2m12 4v-4c0-1-.3-2-1-2 4-.5 6-2 6-6 0-1-.4-2-1-3 0-1 0-2-.3-3-2 0-3 1-4 1-2-.5-4-.5-6 0-1 0-2-1-4-1-.4 1-.4 2-.2 3C4 8 4 9 4 10c0 4 2 5.5 6 6-.7.5-1 1-1 2v4" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M8 3H4a1 1 0 0 0-1 1c0 10 7 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 2c-3-1-5-3-6-6l2-2Z" />
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <>
      <path d="m4 20 1-5a9 9 0 1 1 4 4Z" />
      <path d="M8 7c0 5 4 8 8 8l1-2-3-1-1 1c-2-1-3-2-3-3l1-1-1-2Z" />
    </>
  ),
  arrow: <path d="M5 19 19 5M5 5h14v14" />,
};
function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
export default function SiteFooter() {
  const { c, lang } = useContent();
  const copy =
    lang === "ar"
      ? {
          eyebrow: "لنصنع الخطوة التالية",
          title: "أفكارك تستحق أن تصبح واقعاً.",
          description:
            "حدثنا عن التحدي. لنبدأ ببناء حل يدفع أعمالك إلى الأمام.",
          company: "الشركة",
          solutions: "الحلول",
          connect: "تواصل معنا",
          follow: "تابع أكسيروفا",
          location: "الإمارات العربية المتحدة",
          language: "بالعربية والإنجليزية",
          top: "العودة إلى الأعلى",
          brand:
            "نبني البرمجيات ونربط الأنظمة ونبسط العمل. شريكك التقني من الفكرة إلى النمو.",
        }
      : {
          eyebrow: "YOUR NEXT CHAPTER",
          title: "Great ideas deserve to move forward.",
          description:
            "Tell us about your next challenge. Let’s build something that moves your business forward.",
          company: "Company",
          solutions: "Solutions",
          connect: "Let’s connect",
          follow: "Follow AXIROVA",
          location: "United Arab Emirates",
          language: "Arabic & English",
          top: "Back to top",
          brand:
            "We build software, connect systems, and simplify work. Your technology partner, from the first idea to what comes next.",
        };
  const wa = `https://wa.me/${SITE.phone.replace(/\D/g, "")}`;
  return (
    <footer className="site-footer modern-footer">
      <div className="shell">
        <div className="footer-invitation">
          <div>
            <span className="footer-eyebrow">{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
          <Link className="footer-project" to="/contact">
            <span>{c.start}</span>
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="footer-columns">
          <div className="footer-brand">
            <Link to="/" aria-label="AXIROVA">
              <BrandLogo height={44} />
            </Link>
            <p>{copy.brand}</p>
            <span className="footer-social-label">{copy.follow}</span>
            <div className="footer-socials">
              {Object.entries(SITE.social).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`AXIROVA ${name === "twitter" ? "X" : name === "linkedin" ? "LinkedIn" : "GitHub"}`}
                  title={
                    name === "twitter"
                      ? "X"
                      : name === "linkedin"
                        ? "LinkedIn"
                        : "GitHub"
                  }
                >
                  <Icon name={name} />
                </a>
              ))}
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                aria-label={c.whatsapp}
                title="WhatsApp"
              >
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>
          <nav className="footer-link-group" aria-label={copy.company}>
            <h3>{copy.company}</h3>
            {["about", "work", "industries", "insights"].map((k) => (
              <Link key={k} to={`/${k}`}>
                {c.nav[k]}
              </Link>
            ))}
          </nav>
          <nav className="footer-link-group" aria-label={copy.solutions}>
            <h3>{copy.solutions}</h3>
            {["services", "products", "pricing"].map((k) => (
              <Link key={k} to={`/${k}`}>
                {c.nav[k]}
              </Link>
            ))}
            <Link to="/request-demo">{c.demo}</Link>
            <Link to="/calculator">{c.estimator.title}</Link>
          </nav>
          <div className="footer-contact">
            <h3>{copy.connect}</h3>
            <a href={`mailto:${SITE.email}`}>
              <Icon name="mail" />
              <span dir="ltr">{SITE.email}</span>
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
              <Icon name="phone" />
              <span dir="ltr">{SITE.phone}</span>
            </a>
            <p>
              <Icon name="pin" />
              <span>{copy.location}</span>
            </p>
            <a
              className="footer-whatsapp"
              href={wa}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="whatsapp" />
              {c.whatsapp}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="footer-baseline">
          <span>
            © {new Date().getFullYear()} {SITE.name}. {c.rights}
          </span>
          <div>
            <Link to="/privacy">{c.nav.privacy}</Link>
            <Link to="/terms">{c.nav.terms}</Link>
            <span className="footer-language">{copy.language}</span>
          </div>
          <a href="#main" className="footer-top">
            {copy.top}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
