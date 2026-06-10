import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../utils/siteData';

function ChevronIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .3s var(--ease)', flexShrink: 0 }}>
      <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const toggle = (i) => setOpen(prev => prev === i ? null : i);

  return (
    <section id="faq" style={{ padding: '140px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ justifyContent: 'center' }}>
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
          >
            Common <span style={{ color: 'var(--blue2)' }}>Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}
          >
            Everything you need to know before starting a project with Axirova.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease: [.22,1,.36,1] }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '26px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: open === i ? 'var(--text)' : 'var(--muted)',
                  textAlign: 'left',
                  transition: 'color .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { if (open !== i) e.currentTarget.style.color = 'var(--muted)'; }}
              >
                <span style={{ fontFamily: 'var(--font-d)', fontSize: '16px', fontWeight: 600, lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span style={{ color: open === i ? 'var(--blue2)' : 'var(--dim)', transition: 'color .2s' }}>
                  <ChevronIcon open={open === i} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: .35, ease: [.22,1,.36,1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ paddingBottom: '26px', fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '680px' }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          style={{ textAlign: 'center', marginTop: '64px' }}
        >
          <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '20px' }}>
            Still have questions? We&apos;re happy to help.
          </p>
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(26,111,232,0.45)' }}
            whileTap={{ scale: .97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, var(--blue), var(--blue2))',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '9px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-b)',
            }}
          >
            Ask Us Anything →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
