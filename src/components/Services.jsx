import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SERVICES } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';

const SERVICE_SLUGS = ['software-development', 'artificial-intelligence', 'business-automation', 'saas-platforms', 'gcc-solutions', 'ui-ux-design'];

const QUALITY_ASSURANCE_SERVICE = {
  num: '07',
  icon: '✓',
  title: {
    en: 'Quality Assurance & Software Testing',
    ar: 'ضمان الجودة واختبار البرمجيات',
  },
  slug: 'quality-assurance',
  desc: {
    en: 'End-to-end software quality assurance covering QA strategy, functional and regression testing, API and integration testing, test automation, defect management, retesting, quality reporting, and release readiness.',
    ar: 'ضمان جودة شامل للبرمجيات يغطي استراتيجية الجودة، الاختبارات الوظيفية واختبارات الانحدار، اختبار API والتكامل، أتمتة الاختبارات، إدارة العيوب، إعادة الاختبار، تقارير الجودة، وجاهزية الإصدار.',
  },
};

export default function Services() {
  const { t, pick } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const services = [...SERVICES.map((service, index) => ({ ...service, slug: SERVICE_SLUGS[index] })), QUALITY_ASSURANCE_SERVICE];
  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section style={{ padding: '140px 0', background: 'var(--section-overlay-mid)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div className="sec-label" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} style={{ justifyContent: 'center' }}>
            {t('services.secLabel')}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}>
            {t('services.h2a')} <span style={{ color: 'var(--blue2)' }}>{t('services.h2b')}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
            {t('services.sub')}
          </motion.p>
        </div>

        <motion.div className="srv-grid" initial={{ opacity: 0, scale: .88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .9, delay: .25, ease: [.22,1,.36,1] }}>
          {visibleServices.map((s, i) => (
            <div
              key={i}
              style={{ background: 'var(--bg)', padding: '28px 36px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'background .35s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg)'; }}
            >
              <div className="card-media" style={{ margin: '-28px -36px 22px', height: '142px' }}>
                <img
                  src={`/images/services/service-${s.num}.webp`}
                  alt={`${pick(s.title)} — AXIROVA service`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-media__hint">{t('services.secLabel')}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '11px', color: 'var(--dim)', letterSpacing: '.15em', marginBottom: '10px' }}>{s.num}</div>
              <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px', color: 'var(--blue2)', transition: 'all .4s cubic-bezier(.22,1,.36,1)' }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '19px', fontWeight: 700, marginBottom: '12px', lineHeight: 1.2 }}>{pick(s.title)}</div>
              <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>{pick(s.desc)}</div>
              <Link
                to={`/services/${s.slug}`}
                style={{ marginTop: '22px', fontSize: '13px', color: 'var(--blue2)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                aria-label={`${t('services.explore')} — ${pick(s.title)}`}
              >
                {t('services.explore')} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          ))}
        </motion.div>

        {services.length > 6 && (
          <div className="show-more-wrap">
            <button className="show-more-btn" type="button" onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>
              {showAll ? t('common.showLess') : t('common.showMore')}
              <span aria-hidden="true" className={showAll ? 'show-more-arrow is-open' : 'show-more-arrow'}>↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
