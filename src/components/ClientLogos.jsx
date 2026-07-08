import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function ClientLogos() {
  const { t, pick } = useLanguage();

  return (
    <section
      aria-label={t('clientLogos.label')}
      style={{ padding: '56px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(270deg, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="container" style={{ marginBottom: '28px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.18em', textTransform: 'uppercase' }}
        >
          {t('clientLogos.label')}
        </motion.p>
      </div>

      <div className="logos-track-wrap">
        <div className="logos-track">
          {doubled.map((client, i) => (
            <div key={i} className="logo-pill">
              <span className="logo-pill-sector">{pick(client.sector)}</span>
              <span className="logo-pill-name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
