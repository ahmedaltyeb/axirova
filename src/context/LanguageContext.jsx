import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('axirova-lang') || 'en'
  );

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('axirova-lang', l);
  };

  /* Sync html attributes so CSS [dir="rtl"] selectors fire immediately */
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang, dir]);

  /**
   * t('nav.about') — dot-path lookup in translations[lang], fallback to EN.
   */
  const t = (path) => {
    const keys = path.split('.');
    const res = keys.reduce((o, k) => o?.[k], translations[lang]);
    if (res !== undefined) return res;
    return keys.reduce((o, k) => o?.[k], translations.en) ?? path;
  };

  /**
   * pick({ en: '...', ar: '...' }) — resolves bilingual siteData fields.
   * Also safe to call with a plain string (returns it unchanged).
   */
  const pick = (field) => {
    if (field == null) return '';
    if (typeof field === 'object' && ('en' in field || 'ar' in field)) {
      return field[lang] ?? field.en ?? '';
    }
    return field;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
