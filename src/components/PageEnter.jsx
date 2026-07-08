import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_BASE64 } from '../utils/logoData';

export default function PageEnter() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-enter"
          initial={{ opacity: 1, scaleY: 1, transformOrigin: 'top' }}
          exit={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
          >
            <img src={LOGO_BASE64} alt="Axirova" style={{ width: 40, height: 40, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontFamily: 'var(--font-d)', fontSize: '32px', fontWeight: 800, color: 'var(--text)' }}>
              AXIROVA
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
