import React from 'react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t, pick } = useLanguage();

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>
            {t('whyChoose.secLabel')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
          >
            {t('whyChoose.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('whyChoose.h2b')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}
          >
            {t('whyChoose.sub')}
          </motion.p>
        </div>

        <div className="why-grid">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: i * .06, ease: [.22,1,.36,1] }}
              whileHover={{ y: -8, borderColor: 'var(--border2)', boxShadow: '0 20px 50px rgba(26,111,232,0.1)' }}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '36px 32px',
                cursor: 'default',
                transition: 'all .4s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px', lineHeight: 1 }} role="img" aria-label={pick(item.title)}>
                {item.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '17px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                {pick(item.title)}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>
                {pick(item.desc)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
