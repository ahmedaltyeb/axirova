import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

function IndustryCard({ ind }) {
  const { pick } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, t = 0, pts = [], animId;
    const resize = () => {
      W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; pts = [];
      for (let i = 0; i < 8; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 2.5 + 1 });
    };
    resize();
    window.addEventListener('resize', resize);
    const col = ind.color;
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += .008;
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
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
      style={{ flex: '0 0 280px', height: '350px', borderRadius: '22px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: 'var(--bg3)', cursor: 'default', flexShrink: 0 }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, opacity: .5, width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', background: 'linear-gradient(to top,rgba(5,13,26,.97) 60%,transparent)' }}>
        <span style={{ fontSize: '38px', marginBottom: '14px', display: 'block' }}>{ind.icon}</span>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: '21px', fontWeight: 700, marginBottom: '6px' }}>{pick(ind.title)}</div>
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>{pick(ind.subtitle)}</div>
        <span style={{ display: 'inline-block', marginTop: '12px', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--blue2)', letterSpacing: '.1em', padding: '4px 10px', border: '1px solid rgba(59,158,255,0.25)', borderRadius: '4px' }}>
          {pick(ind.tag)}
        </span>
      </div>
    </motion.div>
  );
}

export default function Industries() {
  const { t, dir } = useLanguage();
  const trackRef = useRef(null);
  const wrapRef  = useRef(null);
  const scrollLeft = useRef(0);
  const isDown  = useRef(false);
  const startX  = useRef(0);

  const onMouseDown = (e) => { isDown.current = true; startX.current = e.pageX; wrapRef.current.style.cursor = 'grabbing'; };
  const onMouseUp   = () => { isDown.current = false; if (wrapRef.current) wrapRef.current.style.cursor = 'grab'; };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    /* In RTL the drag delta is inverted */
    scrollLeft.current -= dx * (dir === 'rtl' ? -1.2 : 1.2);
    startX.current = e.pageX;
    const max = trackRef.current.scrollWidth - wrapRef.current.offsetWidth + 40;
    scrollLeft.current = Math.max(-40, Math.min(scrollLeft.current, max));
    trackRef.current.style.transform = `translateX(${-scrollLeft.current}px)`;
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    return () => document.removeEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{t('industries.secLabel')}</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
          style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
          {t('industries.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('industries.h2b')}</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
          style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', marginBottom: '48px' }}>
          {t('industries.sub')}
        </motion.p>
      </div>

      <div ref={wrapRef} style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
        <div ref={trackRef} style={{ display: 'flex', gap: '20px', padding: '20px 5%', transition: 'transform .15s linear' }}>
          {INDUSTRIES.map((ind, i) => <IndustryCard key={i} ind={ind} />)}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '28px', fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.1em' }}>
        {t('industries.drag')}
      </div>
    </section>
  );
}
