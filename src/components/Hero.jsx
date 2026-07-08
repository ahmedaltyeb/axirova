import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const SERVICES = [
  {
    title: 'Web Development',
    desc: 'Custom-built web platforms engineered for scale and performance.',
    metric: '150+ Projects Shipped',
  },
  {
    title: 'SaaS Systems',
    desc: 'End-to-end SaaS products — from architecture to deployment.',
    metric: '60+ Active Clients',
  },
  {
    title: 'UI & UX Design',
    desc: 'Interfaces that convert — designed for clarity and delight.',
    metric: '100% Responsive',
  },
  {
    title: 'Automation Solutions',
    desc: 'AI-powered workflows that eliminate repetitive bottlenecks.',
    metric: '10× Efficiency Gains',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const next = useCallback(() => setActiveSlide(s => (s + 1) % SERVICES.length), []);
  const prev = useCallback(() => setActiveSlide(s => (s - 1 + SERVICES.length) % SERVICES.length), []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3800);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const onDotClick = (i) => { setActiveSlide(i); resetTimer(); };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetTimer(); }
    touchStartX.current = null;
  };

  return (
    <section className="hst-hero" id="hero-section">

      {/* ── Background video ── */}
      {/* Replace the src below with a real .mp4 URL for your background video */}
      <video
        className="hst-hero__video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="" type="video/mp4" />
      </video>

      {/* ── Dark overlay ── */}
      <div className="hst-hero__overlay" aria-hidden="true" />

      {/* ── Subtle glow orbs ── */}
      <div className="hst-orb hst-orb-a" aria-hidden />
      <div className="hst-orb hst-orb-b" aria-hidden />

      {/* ── Main grid ── */}
      <div className="hst-hero__inner">

        {/* LEFT: text column */}
        <div className="hst-hero__text">

          <motion.div {...fadeUp(0.2)} className="hst-hero__badge">
            <span className="hst-hero__badge-dot" />
            {t('hero.badge')}
          </motion.div>

          <motion.h1 {...fadeUp(0.4)} className="hst-hero__h1">
            {t('hero.line1')}{' '}
            <span className="hst-hero__h1-accent">{t('hero.line2')}</span>{' '}
            {t('hero.line3')}
          </motion.h1>

          <motion.p {...fadeUp(0.6)} className="hst-hero__sub">
            {t('hero.sub')}
          </motion.p>

          <motion.div {...fadeUp(0.75)} className="hst-hero__actions">
            <motion.button
              className="hst-btn-primary"
              whileHover={{ y: -3, boxShadow: '0 16px 50px rgba(26,111,232,0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('cta-sec')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta1')}
            </motion.button>

            <motion.button
              className="hst-btn-outline"
              whileHover={{ y: -3, borderColor: 'rgba(59,158,255,0.8)', background: 'rgba(59,158,255,0.08)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
            </motion.button>
          </motion.div>

          <motion.p {...fadeUp(0.9)} className="hst-hero__reassurance">
            <span>✓ Fixed-price delivery</span>
            <span className="hst-hero__reassurance-dot" />
            <span>✓ 90-day hypercare</span>
            <span className="hst-hero__reassurance-dot" />
            <span>✓ GCC-focused team</span>
          </motion.p>
        </div>

        {/* RIGHT: service slider */}
        <motion.div {...fadeUp(0.5)} className="hst-hero__slider-wrap">
          <div
            className="hst-hero__slider"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={i}
                className={`hst-slide${i === activeSlide ? ' hst-slide--active' : ''}`}
                aria-hidden={i !== activeSlide}
              >
                <span className="hst-slide__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="hst-slide__title">{svc.title}</div>
                <div className="hst-slide__desc">{svc.desc}</div>
                <div className="hst-slide__metric">
                  <span className="hst-slide__metric-arrow">↗</span>
                  {svc.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="hst-slider__dots" role="tablist" aria-label="Service slides">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeSlide}
                className={`hst-slider__dot${i === activeSlide ? ' hst-slider__dot--active' : ''}`}
                onClick={() => onDotClick(i)}
                aria-label={`${SERVICES[i].title} slide`}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="hst-hero__scroll-cue"
      >
        <div className="hst-hero__scroll-mouse">
          <div className="hst-hero__scroll-wheel" />
        </div>
        <span>{t('hero.scroll')}</span>
      </motion.div>

      <style>{`
        /* ── Section ── */
        .hst-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
          padding-bottom: 60px;
          overflow: hidden;
          box-sizing: border-box;
          background: #050d1a;
        }

        /* ── Video background ── */
        .hst-hero__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.15;
          pointer-events: none;
        }

        /* ── Dark gradient overlay ── */
        .hst-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            150deg,
            rgba(5,13,26,0.85) 0%,
            rgba(5,13,26,0.70) 45%,
            rgba(8,18,36,0.90) 100%
          );
        }

        /* ── Glow orbs ── */
        .hst-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }
        .hst-orb-a {
          width: 640px;
          height: 640px;
          top: -180px;
          right: -180px;
          background: radial-gradient(circle, rgba(26,111,232,0.14) 0%, transparent 68%);
        }
        .hst-orb-b {
          width: 440px;
          height: 440px;
          bottom: -110px;
          left: -90px;
          background: radial-gradient(circle, rgba(0,212,160,0.10) 0%, transparent 70%);
        }

        /* ── Main grid ── */
        .hst-hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ── Text column ── */
        .hst-hero__text { display: flex; flex-direction: column; }

        .hst-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 100px;
          background: rgba(26,111,232,0.12);
          border: 1px solid rgba(59,158,255,0.3);
          font-family: var(--font-m);
          font-size: 10px;
          color: var(--blue2);
          letter-spacing: .12em;
          width: fit-content;
          margin-bottom: 24px;
        }
        .hst-hero__badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--emerald);
          box-shadow: 0 0 8px var(--emerald);
          animation: pulse-live 2s ease infinite;
          flex-shrink: 0;
        }

        .hst-hero__h1 {
          font-family: var(--font-d);
          font-size: clamp(2.2rem, 4vw, 3.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 20px;
        }
        .hst-hero__h1-accent { color: var(--blue2); }

        .hst-hero__sub {
          font-family: var(--font-b);
          font-size: clamp(0.95rem, 1.2vw, 1.05rem);
          color: var(--muted);
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 32px;
        }

        /* ── CTAs ── */
        .hst-hero__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .hst-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--blue), var(--blue2));
          color: #fff;
          border: none;
          font-family: var(--font-b);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .hst-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 10px;
          background: transparent;
          color: var(--blue2);
          border: 1.5px solid rgba(59,158,255,0.4);
          font-family: var(--font-b);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }

        .hst-hero__reassurance {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          font-family: var(--font-m);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        .hst-hero__reassurance-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--dim);
          flex-shrink: 0;
        }

        /* ── Slider ── */
        .hst-hero__slider-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hst-hero__slider {
          position: relative;
          width: 100%;
          min-height: 230px;
        }
        .hst-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px 30px 26px;
          border-radius: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(59,158,255,0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 8px 40px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 0 0 0.5px rgba(59,158,255,0.06);
          opacity: 0;
          transform: translateY(14px) scale(0.98);
          transition: opacity 0.45s ease, transform 0.45s ease;
          pointer-events: none;
        }
        .hst-slide--active {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .hst-slide__num {
          font-family: var(--font-d);
          font-size: 10px;
          font-weight: 700;
          color: var(--blue2);
          letter-spacing: .18em;
          opacity: 0.45;
          margin-bottom: 14px;
          display: block;
        }
        .hst-slide__title {
          font-family: var(--font-d);
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 800;
          color: var(--text);
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .hst-slide__desc {
          font-family: var(--font-b);
          font-size: 14px;
          color: var(--muted);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 20px;
        }
        .hst-slide__metric {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-m);
          font-size: 11px;
          color: var(--emerald);
          letter-spacing: .08em;
          background: rgba(0,212,160,0.08);
          border: 1px solid rgba(0,212,160,0.2);
          padding: 5px 12px;
          border-radius: 100px;
          width: fit-content;
        }
        .hst-slide__metric-arrow { font-size: 13px; }

        /* ── Dots ── */
        .hst-slider__dots {
          display: flex;
          gap: 8px;
          padding-left: 2px;
        }
        .hst-slider__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: rgba(59,158,255,0.22);
          transition: all 0.3s ease;
          padding: 0;
        }
        .hst-slider__dot--active {
          background: var(--blue2);
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(59,158,255,0.5);
        }

        /* ── Scroll cue ── */
        .hst-hero__scroll-cue {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: var(--font-m);
          font-size: 9px;
          color: var(--dim);
          letter-spacing: .15em;
        }
        .hst-hero__scroll-mouse {
          width: 22px;
          height: 34px;
          border: 1.5px solid rgba(59,158,255,0.3);
          border-radius: 11px;
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }
        .hst-hero__scroll-wheel {
          width: 3px;
          height: 7px;
          background: linear-gradient(180deg, var(--blue2), var(--emerald));
          border-radius: 2px;
          animation: mouse-scroll 1.8s ease infinite;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hst-hero__inner {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .hst-hero__badge { margin: 0 auto 24px; }
          .hst-hero__sub { max-width: 100%; }
          .hst-hero__reassurance { justify-content: center; }
          .hst-hero__actions { justify-content: center; }
          .hst-slider__dots { justify-content: center; }
          .hst-hero__slider { min-height: 210px; }
          .hst-orb-a { width: 300px; height: 300px; top: -80px; right: -80px; }
          .hst-orb-b { width: 220px; height: 220px; }
        }

        /* ── Animations ── */
        @keyframes pulse-live {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(.75); }
        }
      `}</style>
    </section>
  );
}
