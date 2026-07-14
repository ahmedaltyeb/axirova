import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { loadGA } from '../utils/analytics';

const STORAGE_KEY = 'axirova-cookie-consent';
const EXIT_MS = 400;

export default function CookieConsent() {
  const { t } = useLanguage();
  const [shown, setShown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted') {
      loadGA();
    } else if (stored !== 'declined') {
      setMounted(true);
      // Mount off-screen first, then animate in on the next frame.
      requestAnimationFrame(() => setShown(true));
    }
  }, []);

  const dismiss = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    if (choice === 'accepted') loadGA();
    setShown(false);
    setTimeout(() => setMounted(false), EXIT_MS);
  };

  if (!mounted) return null;

  return (
    <motion.div
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 40 }}
      transition={{ duration: EXIT_MS / 1000, ease: [.22, 1, .36, 1] }}
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed', bottom: '16px', left: '16px', right: '16px',
        zIndex: 9999, maxWidth: '560px', margin: '0 auto',
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: '16px',
        padding: '20px 22px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '14px',
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
        {t('cookieConsent.message')}{' '}
        <Link to="/privacy" style={{ color: 'var(--blue2)' }}>{t('cookieConsent.privacyLink')}</Link>
      </p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => dismiss('declined')}
          style={{
            background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)',
            padding: '9px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer',
            fontFamily: 'var(--font-b)',
          }}
        >
          {t('cookieConsent.decline')}
        </button>
        <button
          onClick={() => dismiss('accepted')}
          style={{
            background: 'linear-gradient(135deg,var(--blue),var(--blue2))', color: '#fff', border: 'none',
            padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            fontFamily: 'var(--font-b)',
          }}
        >
          {t('cookieConsent.accept')}
        </button>
      </div>
    </motion.div>
  );
}
