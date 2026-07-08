import React from 'react';
import { motion } from 'framer-motion';
import useCounter from '../hooks/useCounter';
import { COUNTER_STATS } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

function CounterBox({ stat, delay }) {
  const { pick } = useLanguage();
  const { ref, count } = useCounter(stat.target || 0);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7, delay, ease: [.22,1,.36,1] }}
      style={{ background: 'var(--bg)', padding: '48px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'background .3s', cursor: 'default' }}
      whileHover={{ backgroundColor: 'var(--bg3)' }}
    >
      <div style={{
        fontFamily: 'var(--font-d)', fontSize: '52px', fontWeight: 800, lineHeight: 1,
        background: 'linear-gradient(135deg,var(--text),var(--blue3))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        <span style={{ WebkitTextFillColor: 'var(--blue2)', color: 'var(--blue2)' }}>
          {stat.target ? count : stat.suffix}
        </span>
        {stat.target && stat.suffix && (
          <span style={{ fontSize: '36px', WebkitTextFillColor: 'var(--blue2)', color: 'var(--blue2)' }}>{stat.suffix}</span>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.12em', marginTop: '10px' }}>
        {pick(stat.label)}
      </div>
    </motion.div>
  );
}

export default function Counters() {
  return (
    <section style={{ padding: '100px 0', background: 'var(--section-overlay)' }}>
      <div className="container">
        <div className="counters-inner">
          {COUNTER_STATS.map((stat, i) => (
            <CounterBox key={i} stat={stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
