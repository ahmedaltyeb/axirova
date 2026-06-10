import React from 'react';
import { motion } from 'framer-motion';
import { VALUES } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

export default function Values() {
  const { t, pick } = useLanguage();

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>{t('values.secLabel')}</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em' }}>
            {t('values.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('values.h2b')}</span>
          </motion.h2>
        </div>

        <div className="values-grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, delay: i * .08, ease: [.22,1,.36,1] }}
              whileHover={{ y: -10, scale: 1.03, boxShadow: '0 20px 50px rgba(26,111,232,0.15)', borderColor: 'var(--border2)' }}
              style={{
                flex: '0 0 calc(20% - 16px)', minWidth: '180px', background: 'var(--glass)',
                border: '1px solid var(--border)', borderRadius: '20px', padding: '36px 28px',
                textAlign: 'center', cursor: 'default',
              }}
            >
              <span style={{ fontSize: '36px', marginBottom: '18px', display: 'block' }}>{v.icon}</span>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{pick(v.name)}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>{pick(v.desc)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
