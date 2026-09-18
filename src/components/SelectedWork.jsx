import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const WORK = [
  {
    name: 'Hajn Al Khaleej',
    category: { en: 'Sports Marketplace', ar: 'منصة سوق رياضي' },
    summary: { en: 'Founder-led product experience connecting the Gulf camel-racing community through a bilingual digital marketplace.', ar: 'خبرة منتج بقيادة المؤسس لربط مجتمع سباقات الهجن الخليجي عبر سوق رقمي ثنائي اللغة.' },
    image: '/images/work/hajn-al-khaleej.svg',
  },
  {
    name: 'Mohamina',
    category: { en: 'AI LegalTech', ar: 'تقنية قانونية بالذكاء الاصطناعي' },
    summary: { en: 'A legal-technology product direction focused on simplifying access to structured legal information and services.', ar: 'توجه منتج تقني قانوني يركز على تبسيط الوصول إلى المعلومات والخدمات القانونية المنظمة.' },
    image: '/images/work/mohamina.svg',
  },
  {
    name: 'OUNDA Technical Services',
    category: { en: 'Corporate Digital Experience', ar: 'تجربة رقمية للشركات' },
    summary: { en: 'Bilingual brand and digital experience work for a UAE technical-services business.', ar: 'عمل على الهوية والتجربة الرقمية الثنائية اللغة لشركة خدمات فنية في الإمارات.' },
    image: '/images/work/ounda.svg',
  },
  {
    name: 'Ismet Chef',
    category: { en: 'F&B Digital Support', ar: 'دعم رقمي للمطاعم' },
    summary: { en: 'Digital operations and marketing experience supporting a restaurant business in the UAE.', ar: 'خبرة في العمليات الرقمية والتسويق لدعم نشاط مطعم في الإمارات.' },
    image: '/images/work/ismet-chef.svg',
  },
  {
    name: 'LOOF Boutique',
    category: { en: 'E-Commerce Experience', ar: 'تجربة تجارة إلكترونية' },
    summary: { en: 'A commerce-focused digital experience shaped around product presentation and customer discovery.', ar: 'تجربة رقمية تركز على التجارة وعرض المنتجات واكتشافها من قِبل العملاء.' },
    image: '/images/work/loof-boutique.svg',
  },
  {
    name: 'Al Arabi Falcons',
    category: { en: 'Operations & Digital Systems', ar: 'العمليات والأنظمة الرقمية' },
    summary: { en: 'Operational and technology experience supporting structured business processes and day-to-day delivery.', ar: 'خبرة تشغيلية وتقنية لدعم إجراءات العمل المنظمة والتنفيذ اليومي.' },
    image: '/images/work/al-arabi-falcons.svg',
  },
  {
    name: 'Flowrz',
    category: { en: 'Digital Commerce', ar: 'التجارة الرقمية' },
    summary: { en: 'A digital-commerce experience centered on visual products, customer journeys, and streamlined enquiries.', ar: 'تجربة تجارة رقمية تركز على المنتجات البصرية ورحلة العميل وتبسيط الاستفسارات.' },
    image: '/images/work/flowrz.svg',
  },
];

export default function SelectedWork() {
  const { lang, pick } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="work-section">
      <div className="container">
        <motion.div
          className="work-head"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .35 }}
          transition={{ duration: .7 }}
        >
          <div className="sec-label">{lang === 'ar' ? 'خبرات مختارة' : 'Selected Experience'}</div>
          <h2>
            {lang === 'ar' ? 'عمل مبني على ' : 'Work shaped by '}
            <span>{lang === 'ar' ? 'مشكلات حقيقية' : 'real business problems'}</span>
          </h2>
          <p>{lang === 'ar'
            ? 'نماذج من خبرات المؤسسين والأعمال الرقمية. تُعرض النتائج التفصيلية ودراسات الحالة الموثقة عند توفر موافقة النشر.'
            : 'Examples from founder and digital delivery experience. Detailed outcomes and verified case studies are shared when publication approval is available.'}</p>
        </motion.div>

        <div className="work-grid">
          {WORK.map((item, index) => (
            <motion.article
              className={index === 0 || index === 3 ? 'work-card work-card--wide' : 'work-card'}
              key={item.name}
              initial={reduceMotion ? false : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .2 }}
              transition={{ duration: .58, delay: Math.min(index * .06, .3), ease: [.22, 1, .36, 1] }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
            >
              <div className="work-card__media">
                <img src={item.image} alt={`${item.name} — ${pick(item.category)}`} loading="lazy" />
                <div className="work-card__shade" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="work-card__body">
                <div className="work-card__category">{pick(item.category)}</div>
                <h3>{item.name}</h3>
                <p>{pick(item.summary)}</p>
                <a href="/#contact">{lang === 'ar' ? 'ناقش مشروعًا مشابهًا' : 'Discuss a similar project'} <span aria-hidden="true">↗</span></a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .work-section{padding:140px 0;background:var(--section-overlay-deep);overflow:hidden}
        .work-head{max-width:760px;margin-bottom:58px}
        .work-head h2{font-family:var(--font-d);font-size:clamp(34px,4.8vw,58px);font-weight:800;line-height:1.07;letter-spacing:-.035em;margin:14px 0 18px}
        .work-head h2 span{color:var(--blue2)}
        .work-head p{color:var(--muted);font-size:16px;line-height:1.8;max-width:680px}
        .work-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
        .work-card{border:1px solid var(--border);border-radius:24px;overflow:hidden;background:var(--bg3);transition:border-color .3s,box-shadow .3s}
        .work-card:hover{border-color:var(--accent-border);box-shadow:0 24px 70px rgba(26,111,232,.15)}
        .work-card--wide{grid-column:span 2}
        .work-card__media{height:300px;position:relative;overflow:hidden;background:var(--bg2)}
        .work-card--wide .work-card__media{height:390px}
        .work-card__media img{width:100%;height:100%;object-fit:cover;transition:transform .75s cubic-bezier(.22,1,.36,1)}
        .work-card:hover .work-card__media img{transform:scale(1.035)}
        .work-card__shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 48%,rgba(5,8,22,.76))}
        .work-card__media>span{position:absolute;inset-inline-end:22px;top:20px;color:#fff;font-family:var(--font-m);font-size:10px;letter-spacing:.14em;padding:7px 10px;border:1px solid rgba(255,255,255,.24);border-radius:7px;background:rgba(5,8,22,.42);backdrop-filter:blur(10px)}
        .work-card__body{padding:28px 30px 32px}
        .work-card__category{color:var(--emerald);font-family:var(--font-m);font-size:10px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
        .work-card h3{font-family:var(--font-d);font-size:clamp(22px,2.6vw,32px);margin-bottom:12px}
        .work-card p{color:var(--muted);font-size:14px;line-height:1.75;max-width:740px}
        .work-card a{display:inline-flex;gap:8px;align-items:center;margin-top:20px;color:var(--blue2);font-size:13px;font-weight:700;text-decoration:none}
        .work-card a span{transition:transform .25s}
        .work-card a:hover span{transform:translate(3px,-3px)}
        @media(max-width:760px){.work-grid{grid-template-columns:1fr}.work-card--wide{grid-column:auto}.work-card__media,.work-card--wide .work-card__media{height:260px}}
      `}</style>
    </section>
  );
}
