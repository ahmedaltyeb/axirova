import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const fadeUp = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' } };
const fadeRight = { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-50px' } };

export default function About() {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const reduced = prefersReducedMotion();
    let W, H, t = 0, animId;
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const nodes = [
      { lbl: 'CRM', x: .15, y: .2, c: '#1a6fe8' }, { lbl: 'ERP', x: .15, y: .5, c: '#1a6fe8' }, { lbl: 'POS', x: .15, y: .8, c: '#1a6fe8' },
      { lbl: 'AI Core', x: .5, y: .5, r: 32, c: '#3b9eff' }, { lbl: 'Analytics', x: .5, y: .18, c: '#00d4a0' },
      { lbl: 'Automation', x: .85, y: .3, c: '#00d4a0' }, { lbl: 'Reports', x: .85, y: .6, c: '#3b9eff' }, { lbl: 'API', x: .85, y: .85, c: '#1a6fe8' },
    ];
    const edges = [[0,3],[1,3],[2,3],[3,4],[3,5],[3,6],[3,7],[4,5]];

    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += .007;
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const x1 = na.x * W, y1 = na.y * H, x2 = nb.x * W, y2 = nb.y * H;
        ctx.setLineDash([4, 8]);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(59,158,255,0.18)'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.setLineDash([]);
        const p = (t * 1.2 + i * .3) % 1;
        const px = x1 + (x2 - x1) * p, py = y1 + (y2 - y1) * p;
        const g2 = ctx.createRadialGradient(px, py, 0, px, py, 6);
        g2.addColorStop(0, 'rgba(0,240,181,1)'); g2.addColorStop(1, 'rgba(0,240,181,0)');
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
      });
      nodes.forEach((n) => {
        const x = n.x * W, y = n.y * H, r = n.r || 22;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, n.c + '20'); g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(x, y, r * 3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        if (n.r) {
          const pr = r * 1.6 + Math.sin(t * 2) * 4;
          ctx.beginPath(); ctx.arc(x, y, pr, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59,158,255,0.12)'; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.c + '20'; ctx.strokeStyle = n.c; ctx.lineWidth = 1.5; ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f0f4ff';
        ctx.font = `500 ${Math.max(10, r * .55)}px DM Sans,sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.lbl, x, y);
      });
      if (!reduced) animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

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
          <motion.div {...fadeRight} transition={{ duration: 1, delay: .2, ease: [.22,1,.36,1] }}
            style={{ position: 'relative', height: '500px' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', borderRadius: '20px', border: '1px solid var(--border2)', background: 'var(--bg3)' }} />
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
