import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../utils/siteData';

export default function Services() {
  return (
    <section style={{ padding: '140px 0', background: 'linear-gradient(180deg,transparent,rgba(10,22,40,.7),transparent)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} style={{ justifyContent: 'center' }}>
            Our Expertise
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
            Everything You Need to <span style={{ color: 'var(--blue2)' }}>Go Digital</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            End-to-end technology services from strategy to deployment — built to scale with your business goals.
          </motion.p>
        </div>

        <motion.div className="srv-grid" initial={{ opacity: 0, scale: .88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9, delay: .25, ease: [.22,1,.36,1] }}>
          {SERVICES.map((s, i) => (
            <div
              key={i}
              style={{ background: 'var(--bg)', padding: '44px 36px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background .35s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg)'; }}
            >
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.15em', marginBottom: '10px' }}>{s.num}</div>
              <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(26,111,232,0.1)', border: '1px solid rgba(26,111,232,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '26px', color: 'var(--blue2)', transition: 'all .4s cubic-bezier(.22,1,.36,1)' }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '19px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>{s.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>{s.desc}</div>
              <div style={{ marginTop: '22px', fontSize: '13px', color: 'var(--blue2)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', opacity: 0, transition: 'all .35s cubic-bezier(.22,1,.36,1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                Explore service →
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
