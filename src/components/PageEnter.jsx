import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fullLogo from '../assets/icons/axirova-logo-horizontal.png';

export default function PageEnter() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-enter"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 45%, rgba(26,111,232,.10), transparent 34%), #050d1b', overflow: 'hidden' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 'min(86vw, 720px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <motion.img
              src={fullLogo}
              alt="AXIROVA"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', maxWidth: '680px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 24px rgba(0,212,255,.16))' }}
            />
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.65, delay: 0.85 }}
              style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', width: '100%' }}
            >
              <span style={{ height: '1px', width: 'clamp(34px,9vw,110px)', background: 'linear-gradient(90deg,transparent,#00d4ff)' }} />
              <span style={{ color: '#39bfff', fontFamily: 'var(--font-m)', fontSize: 'clamp(9px,1.25vw,14px)', letterSpacing: '.28em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Build Smarter. Scale Faster.</span>
              <span style={{ height: '1px', width: 'clamp(34px,9vw,110px)', background: 'linear-gradient(90deg,#00d4ff,transparent)' }} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
