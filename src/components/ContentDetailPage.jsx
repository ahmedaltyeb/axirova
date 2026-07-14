import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/** Shared detail view for Blog and Case Studies (same shape: slug/tag/title/body). */
export default function ContentDetailPage({ items, basePath, contentKey }) {
  const { slug } = useParams();
  const { t, pick } = useLanguage();
  const item = items.find((i) => i.slug === slug);

  if (!item) {
    return (
      <section style={{ padding: '160px 0 120px', minHeight: '70vh', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>{t(`${contentKey}.notFound`)}</p>
        <Link to={basePath} style={{ color: 'var(--blue2)', fontSize: '14px', textDecoration: 'none' }}>
          {t(`${contentKey}.back`)}
        </Link>
      </section>
    );
  }

  return (
    <section style={{ padding: '160px 0 120px', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--blue2)', letterSpacing: '.14em', padding: '4px 10px', border: '1px solid rgba(59,158,255,0.25)', borderRadius: '4px', display: 'inline-block', marginBottom: '18px' }}>
            {pick(item.tag)}
          </span>
          <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.15, marginBottom: '28px' }}>
            {pick(item.title)}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.9, marginBottom: '44px' }}>
            {pick(item.body)}
          </p>
          <Link to={basePath} style={{ color: 'var(--blue2)', fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-b)' }}>
            {t(`${contentKey}.back`)}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
