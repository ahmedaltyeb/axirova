import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' } };
const fadeRight = { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-50px' } };

export default function About() {
  const { t } = useLanguage();

  const metrics = [
    { n: 'AI',  lk: 'about.m1l', em: true },
    { n: 'QA',  lk: 'about.m2l', em: false },
    { n: 'RTL', lk: 'about.m3l', em: false },
    { n: 'GCC', lk: 'about.m4l', em: true },
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
            <motion.div {...fadeUp} transition={{ duration: .7, delay: .28, ease: [.22,1,.36,1] }} className="company-profile-actions">
              <a href="/documents/AXIROVA-Company-Profile.pdf" target="_blank" rel="noopener noreferrer" className="company-profile-btn company-profile-btn--primary">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>
                {t('about.profileView')}
              </a>
              <a href="/documents/AXIROVA-Company-Profile.pdf" download="AXIROVA-Company-Profile.pdf" className="company-profile-btn company-profile-btn--secondary">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>
                {t('about.profileDownload')}
              </a>
            </motion.div>
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
      <style>{`
        .company-profile-actions { display:flex; flex-wrap:wrap; gap:12px; margin:26px 0 28px; }
        .company-profile-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:46px; padding:11px 18px; border-radius:9px; font-family:var(--font-b); font-size:14px; font-weight:700; text-decoration:none; transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease; }
        .company-profile-btn:hover { transform:translateY(-3px); }
        .company-profile-btn svg { width:19px; height:19px; fill:none; stroke:currentColor; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
        .company-profile-btn--primary { color:#fff; background:linear-gradient(135deg,var(--blue),var(--blue2)); box-shadow:0 10px 30px rgba(26,111,232,.28); }
        .company-profile-btn--primary:hover { box-shadow:0 16px 38px rgba(26,111,232,.42); }
        .company-profile-btn--secondary { color:var(--text); background:var(--glass); border:1px solid var(--border2); }
        .company-profile-btn--secondary:hover { border-color:var(--blue2); }
        @media (max-width:520px) { .company-profile-actions { display:grid; grid-template-columns:1fr; } .company-profile-btn { width:100%; } }
      `}</style>
    </section>
  );
}
