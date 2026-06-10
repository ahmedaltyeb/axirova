import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TECH_NODES, CAT_COLOR } from '../utils/siteData';

export default function TechStack() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, t = 0, animId;
    let nodes = [];

    const resize = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight || 500;
      nodes = TECH_NODES.map(n => ({ ...n, px: n.x * W, py: n.y * H, r: n.r || 18, ox: n.x * W, oy: n.y * H }));
    };
    resize();
    window.addEventListener('resize', () => { resize(); });

    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += .005;
      nodes.slice(0, -1).forEach((n, i) => {
        const core = nodes[nodes.length - 1];
        ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(core.px, core.py);
        ctx.strokeStyle = CAT_COLOR[n.cat] + '1a'; ctx.lineWidth = 1; ctx.stroke();
        const p = (t * 1.5 + i * .18) % 1;
        const px = n.px + (core.px - n.px) * p, py = n.py + (core.py - n.py) * p;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = CAT_COLOR[n.cat] + 'cc'; ctx.fill();
      });
      nodes.forEach((n, i) => {
        if (!n.core) { n.px = n.ox + Math.sin(t * 1.1 + i * 1.3) * 7; n.py = n.oy + Math.cos(t * .9 + i * 1.7) * 6; }
        const col = CAT_COLOR[n.cat];
        if (n.core) {
          [3.5, 2.5, 1.8].forEach((rf, ri) => {
            ctx.beginPath(); ctx.arc(n.px, n.py, n.r * rf + Math.sin(t * 1.5 + ri) * 3, 0, Math.PI * 2);
            ctx.strokeStyle = col + `${Math.round(8 - ri * 2).toString(16)}0`; ctx.lineWidth = 1; ctx.stroke();
          });
          const g = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, n.r * 4);
          g.addColorStop(0, 'rgba(26,111,232,0.22)'); g.addColorStop(1, 'transparent');
          ctx.beginPath(); ctx.arc(n.px, n.py, n.r * 4, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(n.px, n.py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = col + (n.core ? '28' : '1a'); ctx.strokeStyle = col + (n.core ? 'ee' : '88');
        ctx.lineWidth = n.core ? 2 : 1.2; ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f0f4ff';
        ctx.font = `${n.core ? 600 : 500} ${n.core ? 12 : 11}px DM Sans,sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        if (n.lbl.includes('\n')) { const [a, b] = n.lbl.split('\n'); ctx.fillText(a, n.px, n.py - 7); ctx.fillText(b, n.px, n.py + 7); }
        else ctx.fillText(n.lbl, n.px, n.py);
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const legend = [
    { color: '#3b9eff', label: 'Mobile / Frontend' },
    { color: '#1a6fe8', label: 'Backend' },
    { color: '#00d4a0', label: 'AI & Computer Vision' },
    { color: '#6bbfff', label: 'Cloud' },
    { color: '#8fa3c0', label: 'APIs & Infrastructure' },
    { color: '#7060e0', label: 'Databases' },
  ];

  return (
    <section style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>Technology Stack</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
            Built on <span style={{ color: 'var(--blue2)' }}>World-Class</span> Infrastructure
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            Our architecture spans modern frontend frameworks, powerful backends, cloud infrastructure, and leading AI platforms.
          </motion.p>
        </div>

        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0, scale: .88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .9, delay: .3, ease: [.22,1,.36,1] }}
          id="tech-canvas"
          style={{ width: '100%', height: '500px', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--bg3)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .4 }}
          style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}
        >
          {legend.map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-m)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '.08em' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
