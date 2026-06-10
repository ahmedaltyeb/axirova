import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

const CATEGORY_COLOR = {
  Cloud: '#3b9eff',
  AI: '#00d4a0',
  Mobile: '#6bbfff',
  Payments: '#7060e0',
  Infrastructure: '#8fa3c0',
  Database: '#1a6fe8',
};

export default function Partners() {
  const { t, pick } = useLanguage();

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: '40px' }}
        >
          {t('partners.label')}
        </motion.p>

        <div className="partners-grid">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: .88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .5, delay: i * .05 }}
              whileHover={{ y: -6, borderColor: CATEGORY_COLOR[p.category.en] + '60', boxShadow: `0 12px 30px ${CATEGORY_COLOR[p.category.en]}15` }}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'default',
                transition: 'all .35s cubic-bezier(.22,1,.36,1)',
              }}
              title={pick(p.full)}
            >
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '16px', fontWeight: 800, color: CATEGORY_COLOR[p.category.en], marginBottom: '6px' }}>
                {p.name}
              </div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '.1em' }}>
                {pick(p.category)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
