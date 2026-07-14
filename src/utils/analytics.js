/**
 * Minimal GA4 loader — only called after the user accepts the cookie banner
 * (or on mount if a prior "accepted" choice is already stored).
 */
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let loaded = false;

export function loadGA() {
  if (loaded || !MEASUREMENT_ID || typeof window === 'undefined') return;
  loaded = true;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
}

/** No-op until GA has loaded and consent was given. */
export function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
