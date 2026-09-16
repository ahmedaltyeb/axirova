import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' } };
const fadeRight = { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-50px' } };

export default function About() {
  const { t } = useLanguage();

  const metrics = [
    { n: '150+', lk: 'about.m1l', em: true },
    { n: '60+',  lk: 'about.m2l', em: false },
    { n: '5',    lk: 'about.m3l', em: false },
    { n: 'AI',   lk: 'about.m4l', em: true },
  ];

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <div className="about-inner">
          {/* Text */}
          <div>
            <motion.span {...fadeUp} transition={{ duration: .7, ease: [.22,1,.36,1] }}
              style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--emerald)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '14px', display: 'block' }}>
              {t('about.eyebrow')}
            </motion.span>
            <motion.div className="sec-label" {...fadeUp} transition={{ duration: .7, delay: .05, ease: [.22,1,.36,1] }}>{t('about.secLabel')}</motion.div>
            <motion.h2 {...fadeUp} transition={{ duration: .7, delay: .1, ease: [.22,1,.36,1] }}
              style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
              {t('about.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('about.h2b')}</span> {t('about.h2c')}
            </motion.h2>
            <motion.p {...fadeUp} transition={{ duration: .7, delay: .18, ease: [.22,1,.36,1] }}
              style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
              {t('about.p1')}
            </motion.p>
            <motion.p {...fadeUp} transition={{ duration: .7, delay: .24, ease: [.22,1,.36,1] }}
              style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
              {t('about.p2')}
            </motion.p>
            <div className="about-metrics">
              {metrics.map((m, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: .7, delay: .3 + i * .06, ease: [.22,1,.36,1] }}
                  style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '14px', padding: '22px', cursor: 'default', transition: 'all .4s cubic-bezier(.22,1,.36,1)' }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(26,111,232,0.15)', borderColor: 'var(--border2)' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '30px', fontWeight: 800, color: m.em ? 'var(--emerald)' : 'var(--blue2)' }}>{m.n}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '5px' }}>{t(m.lk)}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <motion.div className="about-visual-collage" {...fadeRight} transition={{ duration: 1, delay: .2, ease: [.22,1,.36,1] }}>
            <img className="about-visual-main" src="/images/about-city.webp" alt="Modern blue glass business district architecture" loading="lazy" />
            <img className="about-visual-secondary" src="/images/about-axirova-building.webp" alt="AXIROVA brand displayed on a modern technology building concept" loading="lazy" />
            {[
              { cls: 'ab1', color: 'var(--emerald)', labelKey: 'about.badge1', style: { bottom: '60px', left: '-24px', animation: 'float-badge-a 4s ease-in-out infinite alternate' } },
              { cls: 'ab2', color: 'var(--blue2)',   labelKey: 'about.badge2', style: { top: '60px', right: '-24px', animation: 'float-badge-b 4s ease-in-out infinite alternate' } },
            ].map((b) => (
              <div key={b.cls} style={{ position: 'absolute', background: 'var(--badge-float-bg)', border: '1px solid var(--border2)', borderRadius: '12px', padding: '12px 20px', backdropFilter: 'blur(20px)', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', color: 'var(--text)', ...b.style }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                {t(b.labelKey)}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
