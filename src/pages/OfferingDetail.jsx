import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SERVICE_DETAILS = [
  {
    slug: 'software-development', num: '01', image: '/images/services/service-01.webp',
    title: { en: 'Custom Software Development', ar: 'تطوير البرمجيات المخصصة' },
    eyebrow: { en: 'ENGINEERING', ar: 'الهندسة البرمجية' },
    description: { en: 'We design and build secure web, mobile, ERP, CRM, and operational systems around your real business workflow.', ar: 'نصمم ونبني أنظمة ويب وموبايل وERP وCRM وأنظمة تشغيلية آمنة حول سير العمل الحقيقي في شركتك.' },
    features: [
      { en: 'Web and mobile applications', ar: 'تطبيقات الويب والموبايل' },
      { en: 'ERP, CRM and POS systems', ar: 'أنظمة ERP وCRM ونقاط البيع' },
      { en: 'API and system integrations', ar: 'تكاملات API والأنظمة' },
      { en: 'Cloud deployment and support', ar: 'النشر السحابي والدعم' },
    ],
  },
  {
    slug: 'artificial-intelligence', num: '02', image: '/images/services/service-02.webp',
    title: { en: 'Artificial Intelligence Solutions', ar: 'حلول الذكاء الاصطناعي' },
    eyebrow: { en: 'APPLIED AI', ar: 'الذكاء الاصطناعي التطبيقي' },
    description: { en: 'Practical AI solutions connected to your data, team, and daily operations—not isolated demonstrations.', ar: 'حلول ذكاء اصطناعي عملية مرتبطة ببياناتك وفريقك وعملياتك اليومية، وليست مجرد عروض تجريبية منفصلة.' },
    features: [
      { en: 'AI agents and assistants', ar: 'وكلاء ومساعدو الذكاء الاصطناعي' },
      { en: 'Document and data intelligence', ar: 'ذكاء المستندات والبيانات' },
      { en: 'Computer vision and analysis', ar: 'الرؤية الحاسوبية والتحليل' },
      { en: 'Secure model integration', ar: 'تكامل النماذج بشكل آمن' },
    ],
  },
  {
    slug: 'business-automation', num: '03', image: '/images/services/service-03.webp',
    title: { en: 'Business Process Automation', ar: 'أتمتة عمليات الأعمال' },
    eyebrow: { en: 'AUTOMATION', ar: 'الأتمتة' },
    description: { en: 'Replace repetitive Excel, email, and WhatsApp handoffs with traceable workflows and connected dashboards.', ar: 'استبدل العمليات المتكررة عبر Excel والبريد وWhatsApp بسير عمل قابل للتتبع ولوحات تحكم مترابطة.' },
    features: [
      { en: 'Workflow discovery and mapping', ar: 'اكتشاف ورسم سير العمل' },
      { en: 'Approvals and notifications', ar: 'الموافقات والإشعارات' },
      { en: 'Operations dashboards', ar: 'لوحات تحكم العمليات' },
      { en: 'Integration with existing tools', ar: 'التكامل مع الأدوات الحالية' },
    ],
  },
  {
    slug: 'saas-platforms', num: '04', image: '/images/services/service-04.webp',
    title: { en: 'SaaS Platform Development', ar: 'تطوير منصات SaaS' },
    eyebrow: { en: 'CLOUD PRODUCTS', ar: 'المنتجات السحابية' },
    description: { en: 'From MVP to multi-tenant platform, we build scalable SaaS products with clear ownership and growth paths.', ar: 'من المنتج الأولي إلى المنصة متعددة المستأجرين، نبني منتجات SaaS قابلة للتوسع مع ملكية واضحة ومسار نمو.' },
    features: [
      { en: 'Product architecture and MVP', ar: 'معمارية المنتج والنسخة الأولية' },
      { en: 'Multi-tenant account design', ar: 'تصميم الحسابات متعددة المستأجرين' },
      { en: 'Subscriptions and permissions', ar: 'الاشتراكات والصلاحيات' },
      { en: 'Analytics and administration', ar: 'التحليلات والإدارة' },
    ],
  },
  {
    slug: 'gcc-solutions', num: '05', image: '/images/services/service-05.webp',
    title: { en: 'Smart GCC Solutions', ar: 'حلول الخليج الذكية' },
    eyebrow: { en: 'REGIONAL EXPERIENCE', ar: 'خبرة إقليمية' },
    description: { en: 'Bilingual digital products designed for UAE and GCC operating models, users, and service expectations.', ar: 'منتجات رقمية ثنائية اللغة مصممة لنماذج العمل والمستخدمين وتوقعات الخدمة في الإمارات والخليج.' },
    features: [
      { en: 'Arabic-first UX and full RTL', ar: 'تجربة عربية أولاً ودعم RTL كامل' },
      { en: 'UAE and GCC workflows', ar: 'سير عمل الإمارات والخليج' },
      { en: 'Local payment integrations', ar: 'تكاملات الدفع المحلية' },
      { en: 'Regional data considerations', ar: 'اعتبارات البيانات الإقليمية' },
    ],
  },
  {
    slug: 'ui-ux-design', num: '06', image: '/images/services/service-06.webp',
    title: { en: 'UI/UX & Digital Experience', ar: 'تصميم UI/UX والتجربة الرقمية' },
    eyebrow: { en: 'PRODUCT DESIGN', ar: 'تصميم المنتجات' },
    description: { en: 'Clear bilingual interfaces shaped by user journeys, business goals, and reusable design systems.', ar: 'واجهات ثنائية اللغة واضحة مبنية على رحلة المستخدم وأهداف العمل وأنظمة تصميم قابلة لإعادة الاستخدام.' },
    features: [
      { en: 'Research and user journeys', ar: 'البحث ورحلات المستخدم' },
      { en: 'Wireframes and prototypes', ar: 'المخططات والنماذج التفاعلية' },
      { en: 'Bilingual design systems', ar: 'أنظمة تصميم ثنائية اللغة' },
      { en: 'Usability review and handoff', ar: 'مراجعة سهولة الاستخدام والتسليم' },
    ],
  },
  {
    slug: 'quality-assurance', num: '07', image: '/images/services/service-07.webp',
    title: { en: 'Quality Assurance & Software Testing', ar: 'ضمان الجودة واختبار البرمجيات' },
    eyebrow: { en: 'RELEASE CONFIDENCE', ar: 'الثقة في الإصدار' },
    description: { en: 'Structured quality assurance that identifies functional, integration, usability, and release risks before your users do.', ar: 'ضمان جودة منظم يكتشف مخاطر الوظائف والتكامل وسهولة الاستخدام والإصدار قبل أن يكتشفها المستخدم.' },
    features: [
      { en: 'Functional and regression testing', ar: 'الاختبار الوظيفي واختبار الانحدار' },
      { en: 'API and integration testing', ar: 'اختبار API والتكامل' },
      { en: 'Test automation and reporting', ar: 'أتمتة الاختبارات والتقارير' },
      { en: 'Release-readiness assessment', ar: 'تقييم جاهزية الإصدار' },
    ],
  },
];

const PRODUCT_DETAILS = [
  {
    slug: 'pharmax', num: '01', image: '/images/placeholders/product-01.svg',
    title: { en: 'PharmaX', ar: 'فارماإكس' }, eyebrow: { en: 'HEALTHCARE PLATFORM', ar: 'منصة للرعاية الصحية' },
    description: { en: 'A configurable pharmacy operations concept for inventory, sales, prescriptions, branches, and management reporting.', ar: 'مفهوم منصة قابلة للتخصيص لعمليات الصيدليات والمخزون والمبيعات والوصفات والفروع والتقارير الإدارية.' },
    features: [{ en: 'Inventory and expiry control', ar: 'إدارة المخزون والصلاحية' }, { en: 'POS and billing workflows', ar: 'سير عمل نقاط البيع والفوترة' }, { en: 'Multi-branch visibility', ar: 'رؤية متعددة الفروع' }, { en: 'Operational reporting', ar: 'التقارير التشغيلية' }],
  },
  {
    slug: 'restaurant-insight-hub', num: '02', image: '/images/placeholders/product-02.svg',
    title: { en: 'Restaurant Insight Hub', ar: 'مركز رؤى المطاعم' }, eyebrow: { en: 'F&B OPERATIONS', ar: 'عمليات الأغذية والمشروبات' },
    description: { en: 'A restaurant operations concept connecting orders, kitchen activity, inventory, branches, and management insights.', ar: 'مفهوم لإدارة عمليات المطاعم يربط الطلبات والمطبخ والمخزون والفروع والرؤى الإدارية.' },
    features: [{ en: 'Orders and kitchen flow', ar: 'الطلبات وسير عمل المطبخ' }, { en: 'Menu and branch management', ar: 'إدارة القائمة والفروع' }, { en: 'Inventory visibility', ar: 'رؤية المخزون' }, { en: 'Sales and operations insights', ar: 'رؤى المبيعات والعمليات' }],
  },
  {
    slug: 'real-estate-hub', num: '03', image: '/images/placeholders/product-03.svg',
    title: { en: 'Real Estate Hub', ar: 'منصة العقارات' }, eyebrow: { en: 'PROPERTY OPERATIONS', ar: 'عمليات العقارات' },
    description: { en: 'A connected workspace for listings, leads, clients, deals, documents, and property performance reporting.', ar: 'مساحة عمل مترابطة للقوائم والعملاء المحتملين والعملاء والصفقات والمستندات وتقارير أداء العقارات.' },
    features: [{ en: 'Listings and property records', ar: 'القوائم وسجلات العقارات' }, { en: 'Lead and client CRM', ar: 'إدارة العملاء المحتملين والعملاء' }, { en: 'Deal pipeline tracking', ar: 'تتبع مسار الصفقات' }, { en: 'Documents and reporting', ar: 'المستندات والتقارير' }],
  },
  {
    slug: 'ai-automation-hub', num: '04', image: '/images/placeholders/product-04.svg',
    title: { en: 'AI Automation Hub', ar: 'مركز أتمتة الذكاء الاصطناعي' }, eyebrow: { en: 'AI OPERATIONS', ar: 'عمليات الذكاء الاصطناعي' },
    description: { en: 'A centralized concept for deploying assistants, connecting knowledge, and orchestrating repeatable AI workflows.', ar: 'مفهوم مركزي لنشر المساعدين وربط المعرفة وتنظيم سير عمل الذكاء الاصطناعي القابل للتكرار.' },
    features: [{ en: 'AI agent workspaces', ar: 'مساحات عمل وكلاء الذكاء الاصطناعي' }, { en: 'Knowledge connections', ar: 'ربط مصادر المعرفة' }, { en: 'Workflow orchestration', ar: 'تنظيم سير العمل' }, { en: 'Usage and quality monitoring', ar: 'مراقبة الاستخدام والجودة' }],
  },
  {
    slug: 'erp-suite', num: '05', image: '/images/placeholders/product-05.svg',
    title: { en: 'AXIROVA ERP Suite', ar: 'مجموعة AXIROVA ERP' }, eyebrow: { en: 'ENTERPRISE OPERATIONS', ar: 'عمليات المؤسسات' },
    description: { en: 'A modular ERP concept connecting finance, procurement, inventory, people, and operational reporting.', ar: 'مفهوم ERP معياري يربط المالية والمشتريات والمخزون والموارد البشرية والتقارير التشغيلية.' },
    features: [{ en: 'Finance and expenses', ar: 'المالية والمصروفات' }, { en: 'Procurement and inventory', ar: 'المشتريات والمخزون' }, { en: 'HR and permissions', ar: 'الموارد البشرية والصلاحيات' }, { en: 'Management dashboards', ar: 'لوحات تحكم الإدارة' }],
  },
];

const pageMotion = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function OfferingDetail({ type }) {
  const { slug } = useParams();
  const { pick, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const collection = type === 'service' ? SERVICE_DETAILS : PRODUCT_DETAILS;
  const item = collection.find(entry => entry.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (item) document.title = `${pick(item.title)} — AXIROVA`;
    return () => { document.title = 'Axirova Technology — AI-Powered Solutions for the GCC'; };
  }, [item, lang]);

  if (!item) return <Navigate to="/" replace />;

  const rootPath = type === 'service' ? '/#services' : '/#products';
  const typeLabel = type === 'service'
    ? { en: 'Service', ar: 'خدمة' }
    : { en: 'Platform Concept', ar: 'مفهوم منصة' };

  return (
    <main className="offering-page">
      <section className="offering-hero">
        <div className="offering-glow offering-glow--one" />
        <div className="offering-glow offering-glow--two" />
        <div className="container offering-hero__grid">
          <motion.div
            initial={reduceMotion ? false : 'hidden'}
            animate="show"
            variants={pageMotion}
            transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
          >
            <Link className="offering-back" to={rootPath}>← {lang === 'ar' ? 'العودة للرئيسية' : 'Back to home'}</Link>
            <div className="offering-kicker"><span>{item.num}</span>{pick(typeLabel)} · {pick(item.eyebrow)}</div>
            <h1>{pick(item.title)}</h1>
            <p className="offering-lead">{pick(item.description)}</p>
            <div className="offering-actions">
              <a className="offering-btn offering-btn--primary" href="/#contact">{lang === 'ar' ? 'ابدأ مشروعك' : 'Start your project'} <span>↗</span></a>
              <a className="offering-btn offering-btn--secondary" href="/documents/AXIROVA-Company-Profile.pdf" target="_blank" rel="noreferrer">{lang === 'ar' ? 'ملف الشركة' : 'Company profile'}</a>
            </div>
          </motion.div>

          <motion.div
            className="offering-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: .9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: .9, delay: .12, ease: [.22, 1, .36, 1] }}
          >
            <img src={item.image} alt={pick(item.title)} />
            <motion.div
              className="offering-orbit"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <div className="offering-visual__label">AXIROVA · {item.num}</div>
          </motion.div>
        </div>
      </section>

      <section className="offering-capabilities">
        <div className="container">
          <motion.div
            className="offering-section-head"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .3 }}
          >
            <span>{lang === 'ar' ? 'ما الذي يشمله' : 'What it includes'}</span>
            <h2>{lang === 'ar' ? 'قدرات مصممة حول عملك' : 'Capabilities shaped around your business'}</h2>
          </motion.div>
          <div className="offering-grid">
            {item.features.map((feature, index) => (
              <motion.article
                key={index}
                className="offering-card"
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .3 }}
                transition={{ duration: .55, delay: index * .08 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
              >
                <span>0{index + 1}</span>
                <h3>{pick(feature)}</h3>
                <div className="offering-card__line" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        className="offering-cta"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: .35 }}
      >
        <div className="container offering-cta__inner">
          <div>
            <span>{lang === 'ar' ? 'جاهز للخطوة التالية؟' : 'Ready for the next step?'}</span>
            <h2>{lang === 'ar' ? 'لنحوّل الفكرة إلى نظام يعمل.' : 'Let’s turn the idea into a working system.'}</h2>
          </div>
          <a className="offering-btn offering-btn--primary" href="/#contact">{lang === 'ar' ? 'احجز استشارة' : 'Book a consultation'} <span>↗</span></a>
        </div>
      </motion.section>

      <style>{`
        .offering-page { overflow:hidden; background:var(--bg); }
        .offering-hero { min-height:100vh; padding:150px 0 90px; position:relative; display:flex; align-items:center; }
        .offering-hero__grid { display:grid; grid-template-columns:1.05fr .95fr; gap:72px; align-items:center; position:relative; z-index:2; }
        .offering-glow { position:absolute; border-radius:50%; filter:blur(20px); pointer-events:none; }
        .offering-glow--one { width:520px; height:520px; inset-inline-end:-180px; top:40px; background:radial-gradient(circle,rgba(26,111,232,.18),transparent 70%); }
        .offering-glow--two { width:360px; height:360px; inset-inline-start:-140px; bottom:-80px; background:radial-gradient(circle,rgba(0,212,160,.12),transparent 70%); }
        .offering-back { display:inline-flex; color:var(--muted); text-decoration:none; font-size:13px; margin-bottom:32px; transition:color .25s,transform .25s; }
        .offering-back:hover { color:var(--blue2); transform:translateX(-3px); }
        .offering-kicker { display:flex; gap:10px; align-items:center; color:var(--blue2); font-family:var(--font-m); font-size:11px; letter-spacing:.13em; text-transform:uppercase; margin-bottom:18px; }
        .offering-kicker span { color:var(--emerald); }
        .offering-hero h1 { font-family:var(--font-d); font-size:clamp(42px,6vw,78px); line-height:1.02; letter-spacing:-.045em; max-width:760px; margin-bottom:24px; }
        .offering-lead { max-width:680px; color:var(--muted); font-size:clamp(17px,2vw,20px); line-height:1.8; }
        .offering-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
        .offering-btn { min-height:48px; padding:12px 22px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; gap:10px; text-decoration:none; font-weight:700; transition:transform .25s,box-shadow .25s,border-color .25s; }
        .offering-btn:hover { transform:translateY(-3px); }
        .offering-btn--primary { color:#fff; background:linear-gradient(135deg,var(--blue),var(--blue2)); box-shadow:0 12px 34px rgba(26,111,232,.3); }
        .offering-btn--secondary { color:var(--text); border:1px solid var(--border2); background:var(--glass); }
        .offering-visual { min-height:440px; border-radius:32px; border:1px solid var(--border2); background:var(--glass); position:relative; overflow:hidden; box-shadow:0 30px 90px rgba(0,0,0,.22); }
        .offering-visual img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .offering-visual:after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 35%,rgba(5,8,22,.78)); }
        .offering-visual__label { position:absolute; z-index:3; inset-inline-start:28px; bottom:26px; color:#fff; font-family:var(--font-m); font-size:11px; letter-spacing:.15em; }
        .offering-orbit { position:absolute; z-index:2; width:220px; height:220px; border:1px solid rgba(255,255,255,.34); border-radius:50%; top:calc(50% - 110px); left:calc(50% - 110px); }
        .offering-orbit:before { content:''; position:absolute; width:10px; height:10px; border-radius:50%; background:var(--emerald); top:-5px; left:calc(50% - 5px); box-shadow:0 0 18px var(--emerald); }
        .offering-capabilities { padding:120px 0; background:var(--section-overlay-mid); }
        .offering-section-head { max-width:760px; margin-bottom:48px; }
        .offering-section-head span,.offering-cta__inner>div>span { color:var(--emerald); font-family:var(--font-m); font-size:11px; letter-spacing:.15em; text-transform:uppercase; }
        .offering-section-head h2,.offering-cta h2 { font-family:var(--font-d); font-size:clamp(30px,4vw,52px); line-height:1.1; margin-top:14px; }
        .offering-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; }
        .offering-card { min-height:220px; padding:28px; border-radius:20px; border:1px solid var(--border); background:var(--glass); display:flex; flex-direction:column; transition:border-color .3s,box-shadow .3s; }
        .offering-card:hover { border-color:var(--accent-border); box-shadow:0 20px 50px rgba(26,111,232,.12); }
        .offering-card>span { color:var(--blue2); font-family:var(--font-m); font-size:11px; letter-spacing:.12em; }
        .offering-card h3 { font-family:var(--font-d); font-size:20px; line-height:1.35; margin:auto 0 24px; }
        .offering-card__line { width:42px; height:2px; background:linear-gradient(90deg,var(--blue2),var(--emerald)); }
        .offering-cta { padding:80px 0 110px; }
        .offering-cta__inner { padding:46px; border-radius:26px; border:1px solid var(--border2); background:linear-gradient(135deg,rgba(26,111,232,.12),rgba(0,212,160,.06)); display:flex; align-items:center; justify-content:space-between; gap:30px; }
        .offering-cta h2 { max-width:740px; font-size:clamp(28px,4vw,46px); }
        @media(max-width:960px){.offering-hero__grid{grid-template-columns:1fr;gap:44px}.offering-visual{min-height:360px}.offering-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:600px){.offering-hero{padding:120px 0 70px}.offering-visual{min-height:300px;border-radius:22px}.offering-grid{grid-template-columns:1fr}.offering-cta__inner{padding:30px 24px;align-items:flex-start;flex-direction:column}.offering-btn{width:100%}}
        @media(prefers-reduced-motion:reduce){.offering-orbit{animation:none!important}.offering-btn,.offering-card,.offering-back{transition:none}}
      `}</style>
    </main>
  );
}
