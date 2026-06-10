import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../utils/siteData';

const fadeRise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const lineReveal = (delay = 0) => ({
  initial: { y: '110%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const canvasRef = useRef(null);
  const inner3dRef = useRef(null);
  const particleLayerRef = useRef(null);

  // ── Particle canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, pts = [];
    let mx = 0, my = 0, mActive = false;
    let animId;

    const resize = () => {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
      pts = [];
      const n = Math.min(110, Math.floor(W * H / 8000));
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
        r: Math.random() * 2 + .4, a: Math.random() * .5 + .1,
        pulse: Math.random() * Math.PI * 2,
        hue: Math.random() < .2 ? '0,212,160' : '59,158,255',
      });
    };

    const hero = c.parentElement;
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top; mActive = true;
    };
    const onLeave = () => { mActive = false; };
    const onClick = (e) => {
      const heroEl = document.getElementById('hero-section') || document.querySelector('section');
      for (let i = 0; i < 3; i++) {
        const rip = document.createElement('div');
        rip.className = 'hero-ripple';
        rip.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${40 + i * 30}px;height:${40 + i * 30}px;animation-delay:${i * .12}s;border-color:${i === 1 ? 'rgba(0,240,181,0.6)' : 'rgba(59,158,255,0.6)'}`;
        document.body.appendChild(rip);
        setTimeout(() => rip.remove(), 900 + i * 120);
      }
      const r = c.getBoundingClientRect();
      const bx = e.clientX - r.left, by = e.clientY - r.top;
      for (let j = 0; j < 8; j++) {
        const angle = (j / 8) * Math.PI * 2;
        pts.push({ x: bx, y: by, vx: Math.cos(angle) * 2.5, vy: Math.sin(angle) * 2.5, r: 2.5, a: .8, pulse: 0, hue: '0,212,160', ttl: 80, age: 0 });
      }
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    hero.addEventListener('click', onClick);

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(5,13,26,0.18)';
      ctx.fillRect(0, 0, W, H);
      pts = pts.filter(p => !p.ttl || p.age < p.ttl);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.ttl) { p.age++; p.vx *= .97; p.vy *= .97; }
        else {
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        }
        p.pulse += .022;
        const pa = p.ttl ? p.a * (1 - p.age / p.ttl) : p.a * (0.55 + 0.45 * Math.sin(p.pulse));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${pa})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        if (pts[i].ttl) continue;
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[j].ttl) continue;
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(26,111,232,${(1 - d / 135) * .18})`; ctx.lineWidth = .8; ctx.stroke();
          }
        }
        if (mActive) {
          const dx = pts[i].x - mx, dy = pts[i].y - my, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 220) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(59,158,255,${(1 - d / 220) * .38})`; ctx.lineWidth = .9; ctx.stroke();
            pts[i].vx += (mx - pts[i].x) * .00012; pts[i].vy += (my - pts[i].y) * .00012;
          }
        }
      }
      if (mActive) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
        g.addColorStop(0, 'rgba(59,158,255,0.09)'); g.addColorStop(.5, 'rgba(0,212,160,0.04)'); g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(mx, my, 150, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,240,181,0.7)'; ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('click', onClick);
    };
  }, []);

  // ── 3D Tilt
  useEffect(() => {
    const hero = document.getElementById('hero-section');
    const inner = inner3dRef.current;
    if (!hero || !inner) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, rafId;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 10;
      ty = ((e.clientY - r.top) / r.height - .5) * 8;
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    const loop = () => {
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      inner.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafId); hero.removeEventListener('mousemove', onMove); };
  }, []);

  // ── Floating particles
  useEffect(() => {
    const layer = particleLayerRef.current;
    if (!layer) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `position:absolute;left:${Math.random() * 100}%;bottom:-10px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(59,158,255,${Math.random() * .4 + .1});animation:particle-float ${Math.random() * 15 + 10}s linear ${Math.random() * 10}s infinite`;
      layer.appendChild(p);
    }
    return () => { if (layer) layer.innerHTML = ''; };
  }, []);

  // ── Hero counters
  useEffect(() => {
    const els = document.querySelectorAll('.hero-counter');
    els.forEach((el) => {
      const t = +el.dataset.target;
      if (!t) return;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 2000, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * t);
        if (p < 1) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 1700);
    });
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        perspective: '1200px',
        paddingTop: '72px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, width: '100%', height: '100%' }}
      />

      {/* Aurora */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <div className="aurora-band" style={{ background: 'linear-gradient(90deg,rgba(26,111,232,0.18),rgba(59,158,255,0.12),rgba(0,212,160,0.1))', top: '15%', animation: 'aurora-wave-a 14s ease-in-out 1.2s infinite alternate' }} />
        <div className="aurora-band" style={{ background: 'linear-gradient(90deg,rgba(0,212,160,0.08),rgba(26,111,232,0.14),rgba(107,191,255,0.1))', top: '35%', animation: 'aurora-wave-b 18s ease-in-out 1.5s infinite alternate' }} />
        <div className="aurora-band" style={{ background: 'linear-gradient(90deg,rgba(59,158,255,0.06),rgba(0,240,181,0.08),rgba(26,111,232,0.1))', top: '55%', animation: 'aurora-wave-c 11s ease-in-out 1.8s infinite alternate' }} />
      </div>

      {/* Scan line */}
      <div className="hero-scan" />

      {/* Grid */}
      <div className="hero-grid" />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 85% 65% at 50% 40%,rgba(26,111,232,0.08) 0%,transparent 70%)' }} />

      {/* Depth rings */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div className="depth-ring dr1" /><div className="depth-ring dr2" /><div className="depth-ring dr3" />
      </div>

      {/* Orbs */}
      <div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" />

      {/* Floating particles */}
      <div ref={particleLayerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} />

      {/* 3D Content */}
      <div
        ref={inner3dRef}
        style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px', paddingInline: '24px', boxSizing: 'border-box', transformStyle: 'preserve-3d' }}
      >
        {/* Badge */}
        <motion.div {...fadeRise(0.3)} style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 18px', borderRadius: '100px',
            background: 'rgba(26,111,232,0.12)', border: '1px solid rgba(59,158,255,0.3)',
            fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--blue2)', letterSpacing: '.12em', position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px' }}>
              <span style={{ position: 'absolute', width: '14px', height: '14px', borderRadius: '50%', border: '1px solid var(--emerald)', animation: 'pulse-ring 2s ease infinite', opacity: 0 }} />
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 10px var(--emerald)', animation: 'pulse-live 2s ease infinite', position: 'relative', zIndex: 1 }} />
            </span>
            UAE-BASED · AI &amp; AUTOMATION COMPANY
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(59,158,255,0.12),transparent)', transform: 'translateX(-100%)', animation: 'badge-shine 3.5s ease-in-out 2s infinite' }} />
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          className="hero-h1"
          style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2.4rem,5.5vw,5.2rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-.04em', marginBottom: '20px' }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} {...lineReveal(0.5)}>Building</motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} {...lineReveal(0.68)}>
              <span className="glitch-word" data-text="Intelligent" style={{ color: 'var(--blue2)' }}>Intelligent</span> Systems
            </motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} {...lineReveal(0.86)}>for Modern Business</motion.span>
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fadeRise(1.2)}
          style={{ fontSize: 'clamp(1rem,1.4vw,1.15rem)', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 28px' }}
        >
          Axirova Technology is a UAE-based company specializing in AI-powered solutions, intelligent automation, and digital transformation — built specifically for businesses across the GCC region.
        </motion.p>

        {/* Actions */}
        <motion.div
          {...fadeRise(1.4)}
          className="hero-actions"
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ y: -4, scale: 1.02, boxShadow: '0 16px 50px rgba(26,111,232,0.6)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'linear-gradient(135deg,var(--blue),var(--blue2))', color: '#fff', border: 'none',
              padding: '13px 30px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-b)', display: 'inline-flex', alignItems: 'center', gap: '10px',
            }}
            onClick={() => document.getElementById('cta-sec')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Project <span>→</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -4, borderColor: 'var(--blue2)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'transparent', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.15)',
              padding: '13px 30px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-b)',
            }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Solutions
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeRise(1.7)} className="hero-stats">
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center', padding: '14px 24px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px', backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden',
                cursor: 'default', minWidth: '120px', transition: 'all .35s cubic-bezier(.22,1,.36,1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(26,111,232,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '28px', fontWeight: 800, lineHeight: 1, color: 'var(--text)' }}>
                {s.target ? (
                  <><span className="hero-counter" data-target={s.target} style={{ color: 'var(--blue2)' }}>0</span><span style={{ color: 'var(--blue2)' }}>{s.suffix}</span></>
                ) : (
                  <span style={{ color: 'var(--blue2)' }}>{s.suffix}</span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '.12em', marginTop: '7px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <div style={{ width: '22px', height: '34px', border: '1.5px solid rgba(59,158,255,0.3)', borderRadius: '11px', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
          <div style={{ width: '3px', height: '7px', background: 'linear-gradient(180deg,var(--blue2),var(--emerald))', borderRadius: '2px', animation: 'mouse-scroll 1.8s ease infinite' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '.15em' }}>SCROLL TO EXPLORE</span>
      </motion.div>

      <style>{`
        @keyframes pulse-live { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
        @keyframes pulse-ring { 0%{transform:scale(.5);opacity:.8} 100%{transform:scale(2);opacity:0} }
      `}</style>
    </section>
  );
}
