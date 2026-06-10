import React from 'react';
import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <section style={{ padding: '140px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(26,111,232,0.04) 0%,transparent 50%,rgba(0,212,160,0.03) 100%)' }} />
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>Our Foundation</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em' }}>
            Vision &amp; <span style={{ color: 'var(--blue2)' }}>Mission</span>
          </motion.h2>
        </div>

        <div className="vision-inner">
          {[
            {
              num: '01 / VISION', title: 'Our', accent: 'Vision', accentColor: 'var(--blue2)',
              text: 'To become the leading GCC technology company delivering AI-driven automation platforms that transform how businesses and consumers interact with services, operations, and digital systems across the Gulf region.',
              borderTop: 'linear-gradient(90deg,var(--blue),var(--blue2),transparent)',
              delay: .15, dir: 'left',
            },
            {
              num: '02 / MISSION', title: 'Our', accent: 'Mission', accentColor: 'var(--emerald)',
              text: 'To build intelligent digital ecosystems that combine AI, automation, and modern user experience into practical business solutions — helping GCC enterprises reduce operational costs and accelerate digital transformation.',
              borderTop: 'linear-gradient(90deg,var(--emerald),var(--emerald2),transparent)',
              delay: .25, dir: 'right',
            },
          ].map((block) => (
            <motion.div
              key={block.num}
              initial={{ opacity: 0, x: block.dir === 'left' ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: block.delay, ease: [.22,1,.36,1] }}
              whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(26,111,232,0.12)', borderColor: 'var(--border2)' }}
              style={{
                padding: '52px', borderRadius: '24px', border: '1px solid var(--border)',
                background: 'var(--glass)', backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden',
                transition: 'all .4s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: block.borderTop }} />
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '12px', color: 'var(--dim)', letterSpacing: '.2em', marginBottom: '20px' }}>{block.num}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '28px', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
                {block.title} <span style={{ color: block.accentColor }}>{block.accent}</span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.85 }}>{block.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
