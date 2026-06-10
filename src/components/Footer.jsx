import React from 'react';
import logoSVG from '../assets/icons/logo_text.svg';
import { SITE } from '../utils/siteData';

export default function Footer() {
  const cols = [
    {
      title: 'Services',
      links: ['Software Development', 'Artificial Intelligence', 'Business Automation', 'SaaS Platforms', 'Smart GCC Solutions'],
    },
    {
      title: 'Products',
      links: ['PharmaX', 'Restaurant Hub', 'Real Estate Hub', 'AI Automation Hub', 'ERP Suite'],
    },
    {
      title: 'Company',
      links: ['About AXIROVA', 'Industries', 'Careers', 'Contact', 'Privacy Policy'],
    },
  ];

  return (
    <footer style={{ padding: '80px 5% 48px', borderTop: '1px solid var(--border)', position: 'relative' }}>
      {/* Top glow line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '400px', height: '1px', background: 'linear-gradient(90deg,transparent,var(--blue2),transparent)' }} />

      <div className="footer-grid" style={{ maxWidth: '1160px', margin: '0 auto' }}>
        {/* Brand */}
        <div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logoSVG} alt="Axirova" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
          </a>
          <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, marginTop: '16px' }}>
            AI-Powered Solutions &amp; Digital<br />Transformation for the GCC.
          </p>
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.08em', marginBottom: '6px' }}>
              <a href={`mailto:${SITE.email}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{SITE.email}</a>
            </p>
            <p style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.08em' }}>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{SITE.phone}</a>
            </p>
          </div>
        </div>

        {/* Link columns */}
        {cols.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontFamily: 'var(--font-d)', fontSize: '14px', fontWeight: 700, marginBottom: '20px', color: 'var(--text)' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: 'var(--muted)', fontSize: '14px', textDecoration: 'none', transition: 'color .2s, padding-left .2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.paddingLeft = '4px'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.paddingLeft = '0'; }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '36px', borderTop: '1px solid var(--border)', fontSize: '13px', color: 'var(--dim)', flexWrap: 'wrap', gap: '16px' }}>
        <span>© 2025 Axirova Technology. All rights reserved.</span>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', letterSpacing: '.15em' }}>UAE · AI · AUTOMATION · GCC</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { label: 'in', href: SITE.social.linkedin },
            { label: '𝕏', href: SITE.social.twitter },
            { label: 'gh', href: SITE.social.github },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '36px', height: '36px', borderRadius: '9px', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--font-d)', fontWeight: 600,
                textDecoration: 'none', transition: 'all .3s cubic-bezier(.22,1,.36,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue2)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(26,111,232,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = ''; e.currentTarget.style.transform = ''; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
