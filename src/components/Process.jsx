import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCESS_STEPS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
  const { t, pick } = useLanguage();
  const [active, setActive] = useState(0);
  const step = PROCESS_STEPS[active];

  return (
    <section style={{ padding: '140px 0', background: 'linear-gradient(180deg,transparent,rgba(8,15,30,.7),transparent)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>
            {t('process.secLabel')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
          >
            {t('process.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('process.h2b')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}
          >
            {t('process.sub')}
          </motion.p>
        </div>

        {/* Step tabs */}
        <div className="process-tabs">
          {PROCESS_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                padding: '20px 16px',
                background: active === i ? 'var(--glass2)' : 'transparent',
                border: 'none',
                borderBottom: active === i ? `2px solid ${s.color}` : '2px solid transparent',
                cursor: 'pointer',
                color: active === i ? 'var(--text)' : 'var(--muted)',
                transition: 'all .3s var(--ease)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '.15em', marginBottom: '6px' }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '15px', fontWeight: 700 }}>{pick(s.title)}</div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: active === i ? s.color : 'var(--dim)', marginTop: '4px', letterSpacing: '.08em' }}>{pick(s.duration)}</div>
            </button>
          ))}
        </div>

        {/* Step detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: .45, ease: [.22,1,.36,1] }}
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              borderTop: `2px solid ${step.color}`,
              borderRadius: '0 0 20px 20px',
              padding: '52px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
            }}
            className="process-panel"
          >
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: `${step.color}18`, border: `1px solid ${step.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color: step.color, fontFamily: 'var(--font-m)' }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '.18em' }}>{step.num} / {pick(step.title).toUpperCase()}</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '22px', fontWeight: 800, marginTop: '2px' }}>{pick(step.title)}</div>
                </div>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>{pick(step.desc)}</p>
            </div>

            {/* Right — deliverables */}
            <div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.15em', marginBottom: '20px' }}>{t('process.delivLabel')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {step.deliverables.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: step.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'var(--text)' }}>{pick(d)}</span>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(26,111,232,0.4)' }}
                whileTap={{ scale: .97 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  marginTop: '32px',
                  background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
                  color: '#fff',
                  border: 'none',
                  padding: '11px 24px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-b)',
                }}
              >
                {t('process.discoveryCta')}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
