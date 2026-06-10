import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { INDUSTRIES } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

function IndustryCard({ ind }) {
  const { pick } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, pts = [], animId;
    const resize = () => {
      W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; pts = [];
      for (let i = 0; i < 8; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 2.5 + 1 });
    };
    resize();
    window.addEventListener('resize', resize);
    const col = ind.color;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = col + '55'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = col + Math.round((1 - d / 110) * 50).toString(16).padStart(2, '0'); ctx.lineWidth = .8; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [ind.color]);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ width: '280px', height: '280px', borderRadius: '22px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: 'var(--bg3)', cursor: 'grab' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: .4, width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,13,26,0.82)' }} />
      <div style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '32px', marginBottom: '10px', display: 'block', lineHeight: 1 }}>{ind.icon}</span>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: '20px', fontWeight: 700, marginBottom: '6px', lineHeight: 1.2 }}>{pick(ind.title)}</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5, flex: 1 }}>{pick(ind.subtitle)}</div>
        <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--blue2)', letterSpacing: '.1em', padding: '4px 10px', border: '1px solid rgba(59,158,255,0.25)', borderRadius: '4px' }}>
          {pick(ind.tag)}
        </span>
      </div>
    </motion.div>
  );
}

export default function Industries() {
  const { t, dir } = useLanguage();

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {t('industries.secLabel')}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
          style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
        >
          {t('industries.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('industries.h2b')}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
          style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', marginBottom: '48px' }}
        >
          {t('industries.sub')}
        </motion.p>
      </div>

      <div style={{ position: 'relative', paddingBottom: '8px' }} className="industries-swiper-wrap">
        <Swiper
          key={dir}
          modules={[Navigation, FreeMode, Autoplay]}
          dir={dir}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.5 }}
          grabCursor
          navigation={{
            nextEl: '.ind-next',
            prevEl: '.ind-prev',
          }}
          autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
          style={{ padding: '20px 5% 8px', overflow: 'visible' }}
        >
          {INDUSTRIES.map((ind, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              <IndustryCard ind={ind} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <button className="ind-prev ind-nav-btn" aria-label="Previous">&#8592;</button>
        <button className="ind-next ind-nav-btn" aria-label="Next">&#8594;</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '28px', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.1em' }}>
        {t('industries.drag')}
      </div>

      <style>{`
        .industries-swiper-wrap .swiper { overflow: visible; }
        .ind-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg2);
          color: var(--text);
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s;
        }
        .ind-nav-btn:hover { border-color: var(--blue2); background: rgba(26,111,232,0.12); }
        .ind-nav-btn.swiper-button-disabled { opacity: 0.3; pointer-events: none; }
        .ind-prev { left: 8px; }
        .ind-next { right: 8px; }
        [dir="rtl"] .ind-prev { left: auto; right: 8px; }
        [dir="rtl"] .ind-next { right: auto; left: 8px; }
      `}</style>
    </section>
  );
}
