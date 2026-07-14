import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/** Shared renderer for simple bilingual legal pages (Privacy, Terms) — sections s1..s5. */
export default function LegalPage({ contentKey }) {
  const { t } = useLanguage();
  const sections = [1, 2, 3, 4, 5];

  return (
    <section style={{ padding: '160px 0 120px', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '10px' }}>
            {t(`${contentKey}.title`)}
          </h1>
          <p style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.1em', marginBottom: '32px' }}>
            {t(`${contentKey}.updated`)}
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.8, marginBottom: '44px' }}>
            {t(`${contentKey}.intro`)}
          </p>

          {sections.map((n) => (
            <div key={n} style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--text)' }}>
                {t(`${contentKey}.s${n}h`)}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8 }}>
                {t(`${contentKey}.s${n}p`)}
              </p>
            </div>
          ))}

          <Link to="/" style={{ color: 'var(--blue2)', fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-b)' }}>
            {t(`${contentKey}.back`)}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
