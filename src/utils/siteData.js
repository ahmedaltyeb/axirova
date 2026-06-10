export const SITE = {
  name: 'Axirova Technology',
  tagline: 'AI-Powered Solutions & Digital Transformation for the GCC.',
  ceo: 'Ahmed Eltyeb Khalifa',
  email: 'info@axirova.ae',
  phone: '+971 52 930 7250',
  social: {
    twitter: 'https://twitter.com/axirovaa',
    linkedin: 'https://linkedin.com/company/axirova',
    github: 'https://github.com/axirova',
  },
};

export const NAV_LINKS = [
  { labelKey: 'nav.about',      href: '#about' },
  { labelKey: 'nav.services',   href: '#services' },
  { labelKey: 'nav.industries', href: '#industries' },
  { labelKey: 'nav.products',   href: '#products' },
  { labelKey: 'nav.tech',       href: '#tech' },
  { labelKey: 'nav.contact',    href: '#contact' },
];

export const SECTIONS = [
  'hero-section', 'about', 'services', 'industries', 'products', 'tech', 'vision', 'values',
];

export const SERVICES = [
  {
    num: '01',
    icon: '⟨/⟩',
    title: { en: 'Software Development',     ar: 'تطوير البرمجيات' },
    desc:  { en: 'Custom iOS/Android apps, SaaS platforms, ERP, CRM, and web dashboards — built with Flutter, React Native, Django, and Laravel.', ar: 'تطبيقات iOS/Android مخصصة، منصات SaaS، أنظمة ERP وCRM ولوحات تحكم ويب — مبنية بـ Flutter وReact Native وDjango وLaravel.' },
  },
  {
    num: '02',
    icon: '◈',
    title: { en: 'Artificial Intelligence',  ar: 'الذكاء الاصطناعي' },
    desc:  { en: 'AI assistants, image & video analysis, predictive systems, computer vision, and audio analysis — intelligent solutions for real business problems.', ar: 'مساعدو الذكاء الاصطناعي، تحليل الصور والفيديو، الأنظمة التنبؤية، رؤية الحاسوب، وتحليل الصوت — حلول ذكية لمشكلات أعمال حقيقية.' },
  },
  {
    num: '03',
    icon: '⟳',
    title: { en: 'Business Automation',      ar: 'أتمتة الأعمال' },
    desc:  { en: 'HR systems, workflow automation, security operations, patrol management, and enterprise process optimization — zero manual overhead.', ar: 'أنظمة الموارد البشرية، أتمتة سير العمل، العمليات الأمنية، إدارة الدوريات، وتحسين العمليات المؤسسية — بدون عمل يدوي.' },
  },
  {
    num: '04',
    icon: '☁',
    title: { en: 'SaaS Platform Development', ar: 'تطوير منصات SaaS' },
    desc:  { en: 'Multi-tenant cloud platforms, scalable cloud infrastructure, API integrations, and real-time tracking systems built for growth.', ar: 'منصات سحابية متعددة المستأجرين، بنية تحتية سحابية قابلة للتوسع، تكاملات API، وأنظمة تتبع في الوقت الفعلي.' },
  },
  {
    num: '05',
    icon: '↗',
    title: { en: 'Smart GCC Solutions',      ar: 'حلول الخليج الذكية' },
    desc:  { en: 'Arabic-first UX, GCC-specific workflows, region-focused compliance, and culturally adapted digital products for the UAE and Gulf markets.', ar: 'تجربة مستخدم عربية أولاً، سير عمل خليجي خاص، امتثال للمتطلبات الإقليمية، ومنتجات رقمية متكيفة ثقافياً للإمارات وأسواق الخليج.' },
  },
  {
    num: '06',
    icon: '✦',
    title: { en: 'Design & Digital Experience', ar: 'التصميم والتجربة الرقمية' },
    desc:  { en: 'UI/UX design, product design, corporate branding, and design systems — premium interfaces users love, optimized for Arabic and English.', ar: 'تصميم UI/UX، تصميم المنتجات، هوية الشركات، وأنظمة التصميم — واجهات متميزة يحبها المستخدمون، محسّنة للعربية والإنجليزية.' },
  },
];

export const INDUSTRIES = [
  { icon: '🏥', title: { en: 'Healthcare',           ar: 'الرعاية الصحية' },    subtitle: { en: 'Pharmacies · Clinics · Medical Centers',         ar: 'صيدليات · عيادات · مراكز طبية' },          tag: { en: 'HEALTHCARE', ar: 'صحة'     }, color: '#1a6fe8' },
  { icon: '🍽️', title: { en: 'Food & Beverage',      ar: 'الأغذية والمشروبات' }, subtitle: { en: 'Restaurants · Cafes · Food Chains',              ar: 'مطاعم · مقاهي · سلاسل غذائية' },           tag: { en: 'F&B',        ar: 'أغذية'  }, color: '#00d4a0' },
  { icon: '🏢', title: { en: 'Real Estate',           ar: 'العقارات' },           subtitle: { en: 'Agencies · Developers · Property Mgmt',          ar: 'وكالات · مطورون · إدارة عقارات' },          tag: { en: 'REAL ESTATE', ar: 'عقارات' }, color: '#3b9eff' },
  { icon: '🛒', title: { en: 'Retail & Commerce',     ar: 'التجزئة والتجارة' },   subtitle: { en: 'Stores · E-Commerce · Distributors',             ar: 'متاجر · تجارة إلكترونية · موزعون' },        tag: { en: 'RETAIL',     ar: 'تجزئة'  }, color: '#6bbfff' },
  { icon: '💼', title: { en: 'Professional Services', ar: 'الخدمات المهنية' },    subtitle: { en: 'Consulting · Agencies · Service Providers',      ar: 'استشارات · وكالات · مزودو خدمات' },         tag: { en: 'SERVICES',   ar: 'خدمات'  }, color: '#00f0b5' },
  { icon: '🏗️', title: { en: 'Government & Public',  ar: 'الحكومة والقطاع العام' }, subtitle: { en: 'Municipalities · Public Sector · Smart City', ar: 'بلديات · القطاع العام · المدينة الذكية' }, tag: { en: 'GOV',        ar: 'حكومة'  }, color: '#1a6fe8' },
];

export const PRODUCTS = [
  {
    tag:  { en: 'HEALTHCARE',   ar: 'رعاية صحية' },
    name: { en: 'PharmaX',      ar: 'فارماإكس' },
    desc: { en: 'Cloud-based pharmacy management platform — inventory, billing, prescriptions, multi-branch, reporting.', ar: 'منصة إدارة صيدليات سحابية — مخزون، فوترة، وصفات طبية، فروع متعددة، تقارير.' },
    barColor: 'linear-gradient(90deg,#1a6fe8,#3b9eff)',
    barWidth: '60%',
  },
  {
    tag:  { en: 'FOOD & BEVERAGE', ar: 'أغذية ومشروبات' },
    name: { en: 'Restaurant Insight Hub', ar: 'مركز رؤى المطاعم' },
    desc: { en: 'Operations, orders, kitchen management, analytics and reporting for restaurants and food chains.', ar: 'العمليات، الطلبات، إدارة المطبخ، التحليلات والتقارير للمطاعم وسلاسل الغذاء.' },
    barColor: 'linear-gradient(90deg,#00d4a0,#00f0b5)',
    barWidth: '80%',
  },
  {
    tag:  { en: 'REAL ESTATE', ar: 'عقارات' },
    name: { en: 'Real Estate Hub', ar: 'منصة العقارات' },
    desc: { en: 'Property listings, client management, deal pipeline tracking and detailed financial reporting platform.', ar: 'قوائم العقارات، إدارة العملاء، تتبع خط أنابيب الصفقات، ومنصة التقارير المالية التفصيلية.' },
    barColor: 'linear-gradient(90deg,#3b9eff,#6bbfff)',
    barWidth: '50%',
  },
  {
    tag:  { en: 'AI PLATFORM', ar: 'منصة ذكاء اصطناعي' },
    name: { en: 'AI Automation Hub', ar: 'مركز أتمتة الذكاء الاصطناعي' },
    desc: { en: 'Centralized platform for deploying AI agents and automating business workflows at enterprise scale.', ar: 'منصة مركزية لنشر وكلاء الذكاء الاصطناعي وأتمتة سير العمل على نطاق مؤسسي.' },
    barColor: 'linear-gradient(90deg,#00d4a0,#3b9eff)',
    barWidth: '90%',
  },
  {
    tag:  { en: 'ENTERPRISE', ar: 'مؤسسات' },
    name: { en: 'AXIROVA ERP Suite', ar: 'مجموعة AXIROVA ERP' },
    desc: { en: 'Integrated ERP covering inventory, finance, HR, procurement, and full business operations management.', ar: 'نظام ERP متكامل يغطي المخزون والمالية والموارد البشرية والمشتريات وإدارة عمليات الأعمال الكاملة.' },
    barColor: 'linear-gradient(90deg,#1a6fe8,#3b9eff)',
    barWidth: '75%',
  },
];

export const VALUES = [
  { icon: '⚡', name: { en: 'Innovation',  ar: 'الابتكار' },       desc: { en: 'We continuously explore new technologies and push boundaries to deliver better solutions.',                                      ar: 'نستكشف باستمرار تقنيات جديدة ونتجاوز الحدود لتقديم حلول أفضل.' } },
  { icon: '🛡️', name: { en: 'Reliability', ar: 'الموثوقية' },      desc: { en: 'We build systems that businesses can depend on — 24/7, at any scale, without compromise.',                                     ar: 'نبني أنظمة يمكن للأعمال الاعتماد عليها — على مدار الساعة، بأي حجم، دون تنازل.' } },
  { icon: '📐', name: { en: 'Scalability', ar: 'قابلية التوسع' },  desc: { en: 'We design platforms architected for growth — ready for tomorrow before today is done.',                                       ar: 'نصمم منصات معمارتها للنمو — جاهزة لغد الغد قبل انتهاء اليوم.' } },
  { icon: '🔒', name: { en: 'Security',    ar: 'الأمان' },          desc: { en: 'We prioritize data protection, system integrity, and compliance across every product we ship.',                                  ar: 'نضع حماية البيانات وسلامة الأنظمة والامتثال في مقدمة أولوياتنا في كل منتج نطلقه.' } },
  { icon: '✦', name:  { en: 'Excellence',  ar: 'التميز' },          desc: { en: 'We maintain uncompromising standards — in code quality, design, delivery, and client outcomes.',                               ar: 'نحافظ على معايير لا تحتمل التنازل — في جودة الكود، التصميم، التسليم، ونتائج العملاء.' } },
];

export const STATS = [
  { target: 150, suffix: '+', label: { en: 'Projects Shipped',   ar: 'مشروع منجز' } },
  { target: 60,  suffix: '+', label: { en: 'Clients Worldwide',  ar: 'عميل حول العالم' } },
  { target: 5,   suffix: '',  label: { en: 'Core Products',      ar: 'منتجات أساسية' } },
  { target: null, suffix: 'AI', label: { en: 'Powered Platform', ar: 'منصة مدعومة بالذكاء الاصطناعي' } },
];

export const COUNTER_STATS = [
  { target: 150, suffix: '+', label: { en: 'PROJECTS DELIVERED',   ar: 'مشروع منجز' } },
  { target: 60,  suffix: '+', label: { en: 'GLOBAL CLIENTS',       ar: 'عميل حول العالم' } },
  { target: 5,   suffix: '',  label: { en: 'CORE PLATFORMS',       ar: 'منصات أساسية' } },
  { target: 99,  suffix: '%', label: { en: 'CLIENT SATISFACTION',  ar: 'رضا العملاء' } },
];

export const TECH_NODES = [
  { lbl: 'Flutter',         cat: 'fe',    x: 0.1,  y: 0.22 },
  { lbl: 'React Native',    cat: 'fe',    x: 0.2,  y: 0.1  },
  { lbl: 'React',           cat: 'fe',    x: 0.07, y: 0.52 },
  { lbl: 'Django',          cat: 'be',    x: 0.3,  y: 0.38 },
  { lbl: 'Laravel',         cat: 'be',    x: 0.26, y: 0.65 },
  { lbl: 'Node.js',         cat: 'be',    x: 0.4,  y: 0.18 },
  { lbl: 'OpenAI',          cat: 'ai',    x: 0.55, y: 0.13 },
  { lbl: 'Computer Vision', cat: 'ai',    x: 0.66, y: 0.28 },
  { lbl: 'LangChain',       cat: 'ai',    x: 0.6,  y: 0.54 },
  { lbl: 'Audio AI',        cat: 'ai',    x: 0.73, y: 0.13 },
  { lbl: 'AWS',             cat: 'cloud', x: 0.83, y: 0.22 },
  { lbl: 'Firebase',        cat: 'cloud', x: 0.92, y: 0.44 },
  { lbl: 'GCP',             cat: 'cloud', x: 0.8,  y: 0.6  },
  { lbl: 'PostgreSQL',      cat: 'db',    x: 0.33, y: 0.82 },
  { lbl: 'MongoDB',         cat: 'db',    x: 0.5,  y: 0.85 },
  { lbl: 'Redis',           cat: 'db',    x: 0.2,  y: 0.88 },
  { lbl: 'Docker',          cat: 'infra', x: 0.62, y: 0.78 },
  { lbl: 'REST APIs',       cat: 'infra', x: 0.76, y: 0.82 },
  { lbl: 'CI/CD',           cat: 'infra', x: 0.9,  y: 0.72 },
  { lbl: 'AXIROVA\nCore',   cat: 'core',  x: 0.5,  y: 0.48, r: 46, core: true },
];

export const CAT_COLOR = {
  fe: '#3b9eff',
  be: '#1a6fe8',
  ai: '#00d4a0',
  cloud: '#6bbfff',
  db: '#7060e0',
  infra: '#8fa3c0',
  core: '#1a6fe8',
};

export const CALENDLY_URL = 'https://calendly.com/axirova/consultation';
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgobzkoq';

export const CLIENT_LOGOS = [
  { name: 'Al Noor Pharmacy',      sector: { en: 'Healthcare',  ar: 'رعاية صحية' } },
  { name: 'Gulf Restaurants Group', sector: { en: 'F&B',        ar: 'أغذية' } },
  { name: 'Prime Properties UAE',   sector: { en: 'Real Estate', ar: 'عقارات' } },
  { name: 'Emirates Retail Co.',    sector: { en: 'Retail',      ar: 'تجزئة' } },
  { name: 'Dubai Smart Services',   sector: { en: 'Government',  ar: 'حكومة' } },
  { name: 'GCC Logistics Hub',      sector: { en: 'Logistics',   ar: 'لوجستيات' } },
  { name: 'Medica Clinics',         sector: { en: 'Healthcare',  ar: 'رعاية صحية' } },
  { name: 'SkyDine Group',          sector: { en: 'F&B',         ar: 'أغذية' } },
];

export const PROCESS_STEPS = [
  {
    num: '01', icon: '◎', color: 'var(--blue)',
    title:    { en: 'Discovery',       ar: 'الاستكشاف' },
    duration: { en: '1–2 Weeks',       ar: '1–2 أسبوع' },
    desc:     { en: 'We map your business goals, technical requirements, and user needs. You receive a scoped project brief, architecture proposal, and timeline before any code is written.', ar: 'نرسم خريطة أهداف أعمالك ومتطلباتك التقنية واحتياجات مستخدميك. تستلم ملخص مشروع محدد النطاق، ومقترح معماري، وجدولاً زمنياً قبل كتابة أي كود.' },
    deliverables: [
      { en: 'Requirements doc',      ar: 'وثيقة المتطلبات' },
      { en: 'Architecture proposal', ar: 'مقترح المعمارية' },
      { en: 'Project timeline',      ar: 'الجدول الزمني للمشروع' },
      { en: 'Fixed-price quote',     ar: 'عرض سعر ثابت' },
    ],
  },
  {
    num: '02', icon: '◈', color: 'var(--blue2)',
    title:    { en: 'Design',          ar: 'التصميم' },
    duration: { en: '2–4 Weeks',       ar: '2–4 أسابيع' },
    desc:     { en: 'Our designers build bilingual (English/Arabic) UI prototypes. Every screen is reviewed with you before development begins — no surprises mid-build.', ar: 'يبني مصممونا نماذج واجهة مستخدم ثنائية اللغة (إنجليزي/عربي). تُراجع كل شاشة معك قبل بدء التطوير — بدون مفاجآت في منتصف البناء.' },
    deliverables: [
      { en: 'Figma prototypes',      ar: 'نماذج Figma' },
      { en: 'Design system',         ar: 'نظام التصميم' },
      { en: 'Arabic RTL layouts',    ar: 'تخطيطات RTL عربية' },
      { en: 'Stakeholder sign-off',  ar: 'موافقة أصحاب المصلحة' },
    ],
  },
  {
    num: '03', icon: '⟨/⟩', color: 'var(--emerald)',
    title:    { en: 'Build',           ar: 'البناء' },
    duration: { en: '6–16 Weeks',      ar: '6–16 أسبوع' },
    desc:     { en: 'Agile two-week sprints with weekly demos. You see working software from week two. Every sprint ends with a deployed preview you can test on your own device.', ar: 'سبرنتات رشيقة مدة كل منها أسبوعان مع عروض أسبوعية. تشاهد برنامجاً يعمل من الأسبوع الثاني. كل سبرنت ينتهي بمعاينة منشورة يمكنك اختبارها على جهازك.' },
    deliverables: [
      { en: 'Weekly sprint demos',   ar: 'عروض سبرنت أسبوعية' },
      { en: 'Deployed staging',      ar: 'بيئة تجريبية منشورة' },
      { en: 'API documentation',     ar: 'توثيق API' },
      { en: 'Test coverage reports', ar: 'تقارير تغطية الاختبارات' },
    ],
  },
  {
    num: '04', icon: '↗', color: 'var(--emerald2)',
    title:    { en: 'Launch & Support',  ar: 'الإطلاق والدعم' },
    duration: { en: 'Ongoing',           ar: 'مستمر' },
    desc:     { en: 'We handle production deployment, staff training, and a 90-day hypercare period. Post-launch, you get 24/7 monitoring, SLA-backed support, and quarterly roadmap reviews.', ar: 'نتولى النشر في الإنتاج، وتدريب الموظفين، وفترة الرعاية المكثفة لمدة 90 يوماً. بعد الإطلاق، تحصل على مراقبة 24/7، ودعم مدعوم بـ SLA، ومراجعات ربع سنوية لخارطة الطريق.' },
    deliverables: [
      { en: 'Production deployment', ar: 'نشر في الإنتاج' },
      { en: 'Staff training',        ar: 'تدريب الموظفين' },
      { en: '90-day hypercare',      ar: '90 يوم رعاية مكثفة' },
      { en: 'SLA support contract',  ar: 'عقد دعم SLA' },
    ],
  },
];

export const WHY_CHOOSE = [
  { icon: '🇦🇪', title: { en: 'UAE-Based Team',           ar: 'فريق مقيم في الإمارات' },     desc: { en: 'On-the-ground presence in the UAE means same-timezone collaboration, in-person meetings, and deep understanding of local regulations and culture.', ar: 'الوجود الميداني في الإمارات يعني التعاون في نفس التوقيت، الاجتماعات الشخصية، والفهم العميق للوائح والثقافة المحلية.' } },
  { icon: '🌐', title: { en: 'Arabic-First by Default',   ar: 'عربي أولاً بشكل افتراضي' },  desc: { en: 'Every product ships with full RTL support, Arabic UX patterns, and bilingual content — not bolted on, built in from day one.', ar: 'كل منتج يُشحن مع دعم RTL كامل، وأنماط تجربة مستخدم عربية، ومحتوى ثنائي اللغة — ليست مضافة لاحقاً، مدمجة من اليوم الأول.' } },
  { icon: '🏗️', title: { en: 'End-to-End Delivery',       ar: 'تسليم متكامل من البداية' },  desc: { en: 'Strategy, design, engineering, QA, and deployment under one roof. No handoffs between agencies. One team, full ownership.', ar: 'الاستراتيجية، التصميم، الهندسة، ضمان الجودة، والنشر تحت سقف واحد. لا تسليمات بين وكالات. فريق واحد، ملكية كاملة.' } },
  { icon: '⚡', title: { en: 'AI-Native Architecture',    ar: 'معمارية أصيلة للذكاء الاصطناعي' }, desc: { en: 'We build AI capabilities into the core of every product — not as a feature add-on. Computer vision, NLP, predictive analytics are standard.', ar: 'نبني قدرات الذكاء الاصطناعي في جوهر كل منتج — ليست ميزة إضافية. رؤية الحاسوب ومعالجة اللغة والتحليل التنبؤي هي المعيار.' } },
  { icon: '📐', title: { en: 'GCC Compliance Ready',      ar: 'جاهز للامتثال الخليجي' },     desc: { en: 'Products are designed for UAE PDPL, Saudi PDPL, and regional data residency requirements — compliance is engineered in, not audited after.', ar: 'المنتجات مصممة وفق PDPL الإماراتي والسعودي ومتطلبات الإقامة الإقليمية للبيانات — الامتثال مدمج هندسياً، لا يُراجع لاحقاً.' } },
  { icon: '🔁', title: { en: 'Proven SaaS Products',      ar: 'منتجات SaaS مثبتة' },         desc: { en: 'Five production-ready platforms (PharmaX, ERP Suite, AI Hub) means your industry solution is 60% built before we start your project.', ar: 'خمس منصات جاهزة للإنتاج (PharmaX، ERP Suite، AI Hub) تعني أن حل قطاعك مبني 60% قبل أن نبدأ مشروعك.' } },
  { icon: '🎯', title: { en: 'Fixed-Price Delivery',      ar: 'تسليم بسعر ثابت' },           desc: { en: 'After discovery, you receive a fixed price — not an estimate. Scope changes go through a transparent change-order process, never hidden overruns.', ar: 'بعد الاستكشاف، تستلم سعراً ثابتاً — ليس تقديراً. تغييرات النطاق تمر بعملية أوامر تغيير شفافة، لا تجاوزات مخفية.' } },
  { icon: '📊', title: { en: 'Measurable ROI Focus',      ar: 'تركيز على عائد استثمار قابل للقياس' }, desc: { en: 'Every project is scoped with clear KPIs. We track cost reduction, time saved, and revenue impact — not just features shipped.', ar: 'كل مشروع محدد النطاق بمؤشرات أداء رئيسية واضحة. نتتبع خفض التكاليف، الوقت الموفر، والأثر على الإيرادات — لا مجرد ميزات تم شحنها.' } },
];

export const TESTIMONIALS = [
  {
    quote:   { en: 'Axirova delivered our pharmacy management system in under 4 months. The Arabic UI is flawless and our staff adopted it with zero training issues. PharmaX saved us 3 hours of manual work every day.', ar: 'أكسيروفا سلّمت نظام إدارة الصيدلية لدينا في أقل من 4 أشهر. واجهة المستخدم العربية مثالية واعتمدها موظفونا دون أي مشاكل في التدريب. وفّر PharmaX 3 ساعات عمل يدوي يومياً.' },
    name:    'Dr. Khalid Al Rashidi',
    role:    { en: 'Operations Director',   ar: 'مدير العمليات' },
    company: { en: 'Al Noor Pharmacy Group', ar: 'مجموعة النور للصيدليات' },
    sector:  { en: 'Healthcare',            ar: 'رعاية صحية' },
    rating: 5, initials: 'KR', color: '#1a6fe8',
  },
  {
    quote:   { en: 'The Restaurant Insight Hub transformed how we manage our 7 branches. Real-time kitchen dashboards, Arabic POS, and automated inventory — exactly what a growing F&B business in Dubai needs.', ar: 'مركز رؤى المطاعم غيّر طريقة إدارتنا لـ 7 فروع. لوحات مطبخ في الوقت الفعلي، نقطة بيع عربية، ومخزون تلقائي — تماماً ما يحتاجه عمل أغذية ومشروبات نامٍ في دبي.' },
    name:    'Sara Al Mansoori',
    role:    { en: 'CEO',                   ar: 'الرئيس التنفيذي' },
    company: { en: 'SkyDine Group',          ar: 'مجموعة سكاي داين' },
    sector:  { en: 'Food & Beverage',       ar: 'أغذية ومشروبات' },
    rating: 5, initials: 'SM', color: '#00d4a0',
  },
  {
    quote:   { en: 'We needed a custom CRM for our real estate agency with Arabic client profiles, deal pipeline tracking, and automated reports. Axirova built it in 10 weeks and it works perfectly on mobile.', ar: 'احتجنا إلى CRM مخصص لوكالتنا العقارية مع ملفات عملاء عربية، تتبع خط أنابيب الصفقات، وتقارير تلقائية. بنته أكسيروفا في 10 أسابيع ويعمل بشكل مثالي على الجوال.' },
    name:    'Ahmed Bin Hamad',
    role:    { en: 'Managing Partner',      ar: 'الشريك الإداري' },
    company: { en: 'Prime Properties UAE',  ar: 'برايم بروبرتيز الإمارات' },
    sector:  { en: 'Real Estate',          ar: 'عقارات' },
    rating: 5, initials: 'AH', color: '#3b9eff',
  },
];

export const FAQ_ITEMS = [
  {
    q: { en: 'What services does Axirova Technology offer?', ar: 'ما الخدمات التي تقدمها أكسيروفا تكنولوجي؟' },
    a: { en: 'Axirova offers six core services: Software Development (mobile apps, web, ERP, CRM), Artificial Intelligence (AI assistants, computer vision, predictive analytics), Business Automation (HR systems, workflow automation), SaaS Platform Development (multi-tenant cloud platforms), Smart GCC Solutions (Arabic-first apps, regional compliance), and UI/UX Design. We cover strategy through deployment.', ar: 'تقدم أكسيروفا ست خدمات أساسية: تطوير البرمجيات (تطبيقات موبايل، ويب، ERP، CRM)، الذكاء الاصطناعي (مساعدون ذكاء اصطناعي، رؤية حاسوب، تحليل تنبؤي)، أتمتة الأعمال (أنظمة الموارد البشرية، أتمتة سير العمل)، تطوير منصات SaaS (منصات سحابية متعددة المستأجرين)، حلول الخليج الذكية (تطبيقات عربية أولاً، امتثال إقليمي)، وتصميم UI/UX. نغطي من الاستراتيجية حتى النشر.' },
  },
  {
    q: { en: 'Does Axirova build Arabic-language mobile apps?', ar: 'هل تبني أكسيروفا تطبيقات موبايل بالعربية؟' },
    a: { en: 'Yes — Arabic-first UX is a core capability, not an afterthought. Every app we build ships with full RTL layout support, Arabic typography, bilingual content management, and GCC-specific workflows. We build natively for both iOS and Android using Flutter.', ar: 'نعم — تجربة المستخدم العربية الأولى قدرة أساسية، ليست فكرة لاحقة. كل تطبيق نبنيه يُشحن مع دعم تخطيط RTL الكامل، الطباعة العربية، إدارة المحتوى ثنائي اللغة، وسير العمل الخاص بالخليج. نبني بشكل أصيل لـ iOS وAndroid باستخدام Flutter.' },
  },
  {
    q: { en: 'Which industries does Axirova serve in the UAE?', ar: 'ما القطاعات التي تخدمها أكسيروفا في الإمارات؟' },
    a: { en: 'We serve Healthcare (pharmacies, clinics, medical centres), Food & Beverage (restaurants, cafes, food chains), Real Estate (agencies, developers, property management), Retail & E-Commerce, Professional Services, and Government/Public Sector across the UAE and GCC.', ar: 'نخدم الرعاية الصحية (صيدليات، عيادات، مراكز طبية)، الأغذية والمشروبات (مطاعم، مقاهي، سلاسل غذائية)، العقارات (وكالات، مطورون، إدارة عقارات)، التجزئة والتجارة الإلكترونية، الخدمات المهنية، والحكومة/القطاع العام في الإمارات ودول الخليج.' },
  },
  {
    q: { en: 'How long does a typical project take?', ar: 'كم يستغرق المشروع النموذجي؟' },
    a: { en: 'A focused mobile app takes 3–4 months. A full SaaS platform takes 4–7 months. An ERP or enterprise system takes 6–10 months. After our Discovery phase (1–2 weeks), you receive a fixed timeline and price — no estimate ranges, no surprises.', ar: 'تطبيق موبايل محدد التركيز يستغرق 3–4 أشهر. منصة SaaS كاملة تستغرق 4–7 أشهر. نظام ERP أو مؤسسي يستغرق 6–10 أشهر. بعد مرحلة الاستكشاف (1–2 أسبوع)، تستلم جدولاً زمنياً وسعراً ثابتاً — لا نطاقات تقديرية، لا مفاجآت.' },
  },
  {
    q: { en: 'What is the minimum project budget?', ar: 'ما الحد الأدنى لميزانية المشروع؟' },
    a: { en: 'Our minimum engagement is AED 25,000 for a focused product (single-feature app, automation module, or UI/UX redesign). Full platform projects typically range from AED 80,000 to AED 400,000+ depending on scope. Contact us for a free scoping call.', ar: 'الحد الأدنى لتعاملنا هو 25,000 درهم لمنتج محدد (تطبيق بميزة واحدة، وحدة أتمتة، أو إعادة تصميم UI/UX). مشاريع المنصات الكاملة تتراوح عادةً من 80,000 إلى 400,000+ درهم حسب النطاق. تواصل معنا لمكالمة تحديد نطاق مجانية.' },
  },
  {
    q: { en: 'Do you offer post-launch support and maintenance?', ar: 'هل تقدمون دعماً وصيانة بعد الإطلاق؟' },
    a: { en: 'Yes. All projects include a 90-day hypercare period post-launch with priority bug fixes at no extra cost. After that, we offer monthly SLA-backed support plans covering monitoring, updates, security patches, and feature enhancements.', ar: 'نعم. جميع المشاريع تتضمن فترة رعاية مكثفة 90 يوماً بعد الإطلاق مع إصلاح الأخطاء ذات الأولوية بدون تكلفة إضافية. بعد ذلك، نقدم خطط دعم شهرية مدعومة بـ SLA تغطي المراقبة والتحديثات وتصحيحات الأمان وتحسينات الميزات.' },
  },
  {
    q: { en: 'Can Axirova integrate with existing systems like Oracle or SAP?', ar: 'هل تستطيع أكسيروفا التكامل مع أنظمة قائمة مثل Oracle أو SAP؟' },
    a: { en: 'Yes. We build custom integration middleware and REST API connectors for Oracle, SAP, Microsoft Dynamics, Odoo, and any system with an API. We have experience connecting GCC government portals, payment gateways (Telr, Checkout.com), and logistics APIs.', ar: 'نعم. نبني برمجيات وسيطة تكامل مخصصة وموصلات REST API لـ Oracle وSAP وMicrosoft Dynamics وOdoo وأي نظام لديه API. لدينا خبرة في توصيل بوابات حكومية خليجية، بوابات دفع (Telr، Checkout.com)، وواجهات برمجية لوجستية.' },
  },
  {
    q: { en: 'Where is Axirova based and do you work remotely?', ar: 'أين مقر أكسيروفا وهل تعملون عن بُعد؟' },
    a: { en: 'Axirova Technology is based in the United Arab Emirates. We work with clients across the entire GCC region (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman). We offer both in-person and remote collaboration — your preference.', ar: 'مقر أكسيروفا تكنولوجي في الإمارات العربية المتحدة. نعمل مع عملاء في منطقة الخليج بأكملها (الإمارات، السعودية، قطر، الكويت، البحرين، عُمان). نقدم التعاون الشخصي والعن بُعد — حسب تفضيلك.' },
  },
];

export const PARTNERS = [
  { name: 'AWS',        full: { en: 'Amazon Web Services',      ar: 'أمازون ويب سيرفيسز' },   category: { en: 'Cloud',          ar: 'سحابة' } },
  { name: 'GCP',        full: { en: 'Google Cloud Platform',    ar: 'منصة Google السحابية' },  category: { en: 'Cloud',          ar: 'سحابة' } },
  { name: 'Firebase',   full: { en: 'Google Firebase',          ar: 'Google Firebase' },        category: { en: 'Cloud',          ar: 'سحابة' } },
  { name: 'OpenAI',     full: { en: 'OpenAI API',               ar: 'OpenAI API' },              category: { en: 'AI',             ar: 'ذكاء اصطناعي' } },
  { name: 'Flutter',    full: { en: 'Flutter by Google',        ar: 'Flutter من Google' },      category: { en: 'Mobile',         ar: 'موبايل' } },
  { name: 'Stripe',     full: { en: 'Stripe Payments',          ar: 'مدفوعات Stripe' },         category: { en: 'Payments',       ar: 'مدفوعات' } },
  { name: 'Docker',     full: { en: 'Docker Container Platform', ar: 'منصة Docker للحاويات' },  category: { en: 'Infrastructure', ar: 'بنية تحتية' } },
  { name: 'PostgreSQL', full: { en: 'PostgreSQL Database',      ar: 'قاعدة بيانات PostgreSQL' }, category: { en: 'Database',      ar: 'قاعدة بيانات' } },
];
