import React, { useEffect, useState } from 'react';
import { SECTIONS } from '../utils/siteData';

export default function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = () => {
      let cur = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) cur = i;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', track, { passive: true });
    return () => window.removeEventListener('scroll', track);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            width: i === active ? '9px' : '6px',
            height: i === active ? '9px' : '6px',
            borderRadius: '50%',
            border: '1px solid',
            borderColor: i === active ? 'var(--blue2)' : 'rgba(255,255,255,0.2)',
            background: i === active ? 'var(--blue2)' : 'transparent',
            cursor: 'pointer',
            padding: 0,
            transition: 'all .4s cubic-bezier(.22,1,.36,1)',
            boxShadow: i === active ? '0 0 12px rgba(59,158,255,0.7)' : 'none',
          }}
          title={id}
        />
      ))}
    </div>
  );
}
