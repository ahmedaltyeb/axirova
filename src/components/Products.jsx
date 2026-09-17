import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

function MockScreen({ prod, index }) {
  return (
    <div className="product-media" style={{ height: '220px', background: 'var(--bg2)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
      <img
        src={`/images/placeholders/product-0${index + 1}.svg`}
        alt={`${prod.name.en} example visual`}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .65s var(--ease)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 36%,rgba(5,8,22,.88) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', insetInlineStart: '20px', insetInlineEnd: '20px', bottom: '18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
        <strong style={{ color: '#fff', fontFamily: 'var(--font-d)', fontSize: '18px', lineHeight: 1.2 }}>{prod.name.en}</strong>
        <span style={{ flexShrink: 0, color: '#dff8ff', fontFamily: 'var(--font-m)', fontSize: '8px', letterSpacing: '.12em', padding: '5px 8px', border: '1px solid rgba(255,255,255,.24)', borderRadius: '5px', background: 'rgba(5,8,22,.52)', backdropFilter: 'blur(8px)' }}>REPLACEABLE IMAGE</span>
      </div>
    </div>
  );
}

export default function Products() {
  const { t, pick } = useLanguage();
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const goTo = (i) => setCur(i);
  const startAuto = () => { timerRef.current = setInterval(() => setCur(c => (c + 1) % PRODUCTS.length), 4000); };

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  const cardW = 388;

  return (
    <section style={{ padding: '140px 0', background: 'var(--section-overlay-deep)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>{t('products.secLabel')}</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
            {t('products.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('products.h2b')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            {t('products.sub')}
          </motion.p>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div
            className="prod-track"
            style={{ display: 'flex', gap: '28px', transform: `translateX(${-cur * cardW}px)`, transition: 'transform .75s cubic-bezier(.22,1,.36,1)' }}
          >
            {PRODUCTS.map((prod, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  flex: '0 0 360px',
                  borderRadius: '22px',
                  border: `1px solid ${i === cur ? 'var(--blue)' : 'var(--border)'}`,
                  background: 'var(--bg3)',
                  overflow: 'hidden',
                  boxShadow: i === cur ? '0 0 50px rgba(26,111,232,0.25)' : 'none',
                  transition: 'border-color .35s, box-shadow .35s',
                }}
              >
                <MockScreen prod={prod} index={i} />
                <div style={{ padding: '28px 28px 32px' }}>
                  <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--blue2)', letterSpacing: '.14em', padding: '4px 10px', border: '1px solid rgba(59,158,255,0.25)', borderRadius: '4px', display: 'inline-block', marginBottom: '14px' }}>
                    {pick(prod.tag)}
                  </span>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>{pick(prod.name)}</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{pick(prod.desc)}</div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label={`${t('products.view')} — ${pick(prod.name)}`}
                    style={{
                      marginTop: '20px',
                      padding: 0,
                      border: 0,
                      background: 'transparent',
                      color: 'var(--blue2)',
                      fontFamily: 'var(--font-b)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {t('products.view')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '36px' }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => { clearInterval(timerRef.current); goTo(i); startAuto(); }}
              style={{ width: i === cur ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === cur ? 'var(--blue2)' : 'var(--border2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all .35s cubic-bezier(.22,1,.36,1)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
