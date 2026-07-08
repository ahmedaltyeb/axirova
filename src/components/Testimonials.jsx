import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1L9.854 5.756L15 6.18L11.25 9.444L12.472 14.5L8 11.78L3.528 14.5L4.75 9.444L1 6.18L6.146 5.756L8 1Z" fill="#F59E0B"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t, pick } = useLanguage();

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>
            {t('testimonials.secLabel')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
          >
            {t('testimonials.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('testimonials.h2b')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}
          >
            {t('testimonials.sub')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, delay: i * .1, ease: [.22,1,.36,1] }}
              whileHover={{ y: -10, boxShadow: '0 24px 60px rgba(26,111,232,0.12)', borderColor: 'var(--border2)' }}
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '22px',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'default',
                transition: 'all .4s cubic-bezier(.22,1,.36,1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${item.color}, transparent)` }} />

              <Stars count={item.rating} />

              {/* Quote */}
              <div style={{ fontSize: '28px', color: item.color, lineHeight: 1, marginBottom: '12px', fontFamily: 'Georgia, serif', opacity: .6 }}>&ldquo;</div>
              <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.8, flex: 1, marginBottom: '32px' }}>
                {pick(item.quote)}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: `${item.color}20`,
                  border: `1px solid ${item.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-d)', fontWeight: 800, fontSize: '14px', color: item.color,
                  flexShrink: 0,
                }}>
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '15px', fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                    {pick(item.role)} · <span style={{ color: item.color }}>{pick(item.company)}</span>
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-m)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '.1em', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                  {pick(item.sector)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', border: '1px solid var(--border)', borderRadius: '100px', background: 'var(--glass)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)', animation: 'pulse-live 2s ease infinite' }} />
            <span style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.1em' }}>
              {t('testimonials.badge')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
