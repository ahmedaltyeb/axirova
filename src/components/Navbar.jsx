import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import logoSVG from '../assets/icons/logo_text.svg';
import { NAV_LINKS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';
import { scrollToSection } from '../utils/scrollToSection';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled]   = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem('axirova-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('axirova-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href) => {
    setActiveHref(href);
    setMenuOpen(false);
    const id = href.replace('#', '');
    setTimeout(() => scrollToSection(navigate, location, id), menuOpen ? 300 : 0);
  };

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 400,
          padding: '0 5%',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.5s cubic-bezier(.22,1,.36,1)',
          background: scrolled || menuOpen ? 'var(--nav-bg-scrolled)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero-section"
          onClick={(e) => { e.preventDefault(); handleNav('#hero-section'); }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1 }}
          aria-label="Axirova Technology — Home"
        >
          <div
            style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s cubic-bezier(.22,1,.36,1)' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            <img src={logoSVG} alt="Axirova" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="nav-links" style={{ display: 'flex', gap: '36px', listStyle: 'none', margin: 0, padding: 0 }} role="list">
          {NAV_LINKS.map(({ labelKey, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                style={{
                  color: activeHref === href ? 'var(--text)' : 'var(--muted)',
                  fontSize: '14px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = activeHref === href ? 'var(--text)' : 'var(--muted)'; }}
              >
                {t(labelKey)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right side: theme + lang toggle + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Language toggle */}
          <button
            className="lang-toggle"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--muted)',
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-b)',
              minWidth: '48px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {lang === 'en' ? 'ع' : 'EN'}
          </button>

          {/* CTA */}
          <motion.button
            className="nav-cta"
            whileHover={{ y: -2, scale: 1.03, boxShadow: '0 10px 36px rgba(26,111,232,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-b)',
            }}
            onClick={() => handleNav('#contact')}
            aria-label="Get in touch"
          >
            {t('nav.getInTouch')}
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '5px',
            padding: '0',
            zIndex: 1,
          }}
        >
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text)', transition: 'all .3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text)', transition: 'all .3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text)', transition: 'all .3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .3, ease: [.22,1,.36,1] }}
            style={{
              position: 'fixed',
              top: '72px', left: 0, right: 0,
              zIndex: 399,
              background: 'var(--mobile-nav-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border)',
              padding: '24px 5% 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ labelKey, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .05 }}
                style={{
                  color: 'var(--muted)',
                  fontSize: '18px',
                  fontFamily: 'var(--font-d)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'color .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
              >
                {t(labelKey)}
                <span style={{ fontSize: '16px', color: 'var(--dim)' }}>→</span>
              </motion.a>
            ))}

            {/* Mobile theme toggle */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * .05 }}
              onClick={toggleTheme}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--muted)',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-b)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {theme === 'dark' ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  Light Mode
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark Mode
                </>
              )}
            </motion.button>

            {/* Mobile lang toggle */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 1) * .05 }}
              onClick={toggleLang}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--muted)',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-b)',
                width: '100%',
              }}
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 2) * .05 }}
              onClick={() => handleNav('#contact')}
              style={{
                marginTop: '8px',
                background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-b)',
                width: '100%',
              }}
            >
              {t('nav.getInTouch')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
