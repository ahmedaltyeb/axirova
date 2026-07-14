import React from 'react';
import { motion } from 'framer-motion';
import { CALENDLY_URL } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';

export default function CTA() {
  const { t } = useLanguage();
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const openCalendly = () => {
    trackEvent('calendly_click', { source: 'cta' });
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: .88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .9, ease: [.22,1,.36,1] }}
          whileHover={{ y: -4, boxShadow: '0 32px 80px rgba(26,111,232,0.18)' }}
          className="cta-box"
          style={{
            background: 'linear-gradient(135deg,rgba(26,111,232,0.12),rgba(0,212,160,0.06))',
            border: '1px solid rgba(26,111,232,0.25)',
            borderRadius: '28px',
            padding: '90px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle,rgba(26,111,232,0.18),transparent 70%)',
            pointerEvents: 'none', animation: 'cta-pulse 4s ease-in-out infinite alternate',
          }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: .5, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(26,111,232,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(26,111,232,0.06) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: '20px', position: 'relative' }}>
            {t('cta.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('cta.h2b')}</span><br />{t('cta.h2c')}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', marginBottom: '44px', position: 'relative' }}>
            {t('cta.sub')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <motion.button
              whileHover={{ y: -4, scale: 1.02, boxShadow: '0 16px 50px rgba(26,111,232,0.6)' }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              style={{ background: 'linear-gradient(135deg,var(--blue),var(--blue2))', color: '#fff', border: 'none', padding: '15px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-b)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {t('cta.btn1')}
            </motion.button>
            <motion.button
              whileHover={{ y: -4, borderColor: 'var(--blue2)', color: 'var(--text)' }}
              whileTap={{ scale: 0.98 }}
              onClick={openCalendly}
              style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid rgba(255,255,255,0.15)', padding: '15px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-b)', transition: 'all .3s' }}
            >
              {t('cta.btn2')}
            </motion.button>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes cta-pulse {
          0% { opacity: .6; transform: translateX(-50%) scale(1); }
          100% { opacity: 1; transform: translateX(-50%) scale(1.15); }
        }
      `}</style>
    </section>
  );
}
