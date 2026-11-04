import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useContent } from "../content";
import { services } from "../content/catalog";
import { SITE } from "../utils/siteData";
import BrandLogo from "./BrandLogo";
import AssistantLauncher from "./AssistantLauncher";
import SiteFooter from "./SiteFooter";

export default function SiteLayout() {
  const { c, pick } = useContent();
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("axirova-theme") || "dark",
  );
  const location = useLocation();
  const main = useRef(null);
  const previous = useRef(location.pathname);
  const mega = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("axirova-theme", theme);
  }, [theme]);
  useEffect(() => {
    setOpen(false);
    if (mega.current) mega.current.open = false;
    if (previous.current !== location.pathname) {
      window.scrollTo(0, 0);
      main.current?.focus();
      previous.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (mega.current) mega.current.open = false;
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  const keys = [
    "home",
    "products",
    "industries",
    "work",
    "insights",
    "about",
    "contact",
  ];
  return (
    <>
      <a href="#main" className="skip-link">
        {c.skip}
      </a>
      <header className="site-header">
        <div className="shell nav-row">
          <Link to="/" aria-label="Axirova">
            <BrandLogo height={36} />
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? c.close : c.menu}
          </button>
          <nav
            id="primary-nav"
            className={open ? "primary-nav is-open" : "primary-nav"}
            aria-label={c.menu}
          >
            <NavLink to="/" end>
              {c.nav.home}
            </NavLink>
            <details className="mega" ref={mega}>
              <summary>
                {c.nav.services} <span aria-hidden>⌄</span>
              </summary>
              <div className="mega-panel">
                <Link to="/services">{c.nav.services} →</Link>
                {services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`}>
                    <strong>{pick(s.title)}</strong>
                    <small>{pick(s.desc)}</small>
                  </Link>
                ))}
              </div>
            </details>
            {keys.slice(1).map((k) => (
              <NavLink key={k} to={`/${k}`}>
                {c.nav[k]}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="language"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              lang={lang === "en" ? "ar" : "en"}
            >
              {lang === "en" ? "العربية" : "EN"}
            </button>
            <button
              className="theme-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={c.theme}
            >
              ◐
            </button>
            <Link className="button small nav-cta" to="/contact">
              {c.start} <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1} ref={main}>
        <Outlet />
      </main>
      <SiteFooter />
      <a
        className="whatsapp-float"
        href={`https://wa.me/${SITE.phone.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label={c.whatsapp}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 19 2 22l1-6a9 9 0 1 1 4 4Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M8 7c0 5 4 8 8 8l1-2-3-1-1 1c-2-1-3-2-3-3l1-1-1-2Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <AssistantLauncher />
    </>
  );
}
