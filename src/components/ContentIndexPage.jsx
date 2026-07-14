import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/** Shared card-grid index for Blog and Case Studies (same shape: slug/tag/title/excerpt). */
export default function ContentIndexPage({ items, basePath, contentKey }) {
  const { t, pick } = useLanguage();

  return (
    <section style={{ padding: '160px 0 120px', minHeight: '70vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>{t(`${contentKey}.secLabel`)}</div>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
            {t(`${contentKey}.h2`)}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            {t(`${contentKey}.sub`)}
          </p>
        </div>

        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--dim)' }}>{t(`${contentKey}.empty`)}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {items.map((item) => (
              <motion.div
                key={item.slug}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg3)', padding: '28px' }}
              >
                <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--blue2)', letterSpacing: '.14em', padding: '4px 10px', border: '1px solid rgba(59,158,255,0.25)', borderRadius: '4px', display: 'inline-block', marginBottom: '14px' }}>
                  {pick(item.tag)}
                </span>
                <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '19px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                  {pick(item.title)}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '18px' }}>
                  {pick(item.excerpt)}
                </p>
                <Link to={`${basePath}/${item.slug}`} style={{ fontSize: '13px', color: 'var(--blue2)', fontWeight: 500, textDecoration: 'none' }}>
                  {t(`${contentKey}.readMore`)}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
