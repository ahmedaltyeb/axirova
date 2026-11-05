const pair = (en, ar) => ({ en, ar });
export const services = [
  [
    "custom-software",
    "Custom software",
    "البرمجيات المخصصة",
    "Build",
    "Replace disconnected tools with software shaped around your operations.",
    "استبدل الأدوات المتفرقة ببرمجيات مصممة حول عملياتك.",
    ["Web & mobile applications", "API integrations", "Operational dashboards"],
    ["تطبيقات الويب والجوال", "تكامل واجهات البرمجة", "لوحات العمليات"],
  ],
  [
    "web-design-ui-ux",
    "Web design & UI/UX",
    "تصميم الويب وتجربة المستخدم",
    "Build",
    "Make your first impression clear, useful, and easy to act on.",
    "اجعل انطباعك الأول واضحاً ومفيداً وسهل التفاعل.",
    ["Bilingual websites", "Design systems", "Conversion journeys"],
    ["مواقع ثنائية اللغة", "أنظمة التصميم", "مسارات التحويل"],
  ],
  [
    "saas-product-development",
    "SaaS product development",
    "تطوير منتجات SaaS",
    "Build",
    "Turn a focused idea into a product your customers can use and your team can grow.",
    "حوّل فكرتك إلى منتج يستخدمه عملاؤك ويطوره فريقك.",
    ["Product discovery", "Multi-tenant architecture", "Release planning"],
    ["اكتشاف المنتج", "بنية متعددة المستأجرين", "تخطيط الإصدارات"],
  ],
  [
    "erp-pos-systems",
    "ERP & POS systems",
    "أنظمة ERP ونقاط البيع",
    "Build",
    "Bring inventory, sales, and everyday operations into one connected workflow.",
    "اجمع المخزون والمبيعات والعمليات اليومية في مسار مترابط.",
    ["Inventory workflows", "Sales & billing", "Management reporting"],
    ["سير عمل المخزون", "المبيعات والفوترة", "تقارير الإدارة"],
  ],
  [
    "ai-automation",
    "AI & automation",
    "الذكاء الاصطناعي والأتمتة",
    "Automate",
    "Give repetitive work a reliable workflow, with people in control.",
    "امنح المهام المتكررة مساراً موثوقاً مع بقاء القرار بيد الأشخاص.",
    ["n8n workflows", "WhatsApp agents", "Human review & handoff"],
    ["مسارات n8n", "وكلاء واتساب", "مراجعة بشرية وتسليم المهام"],
  ],
  [
    "digital-marketing-seo",
    "Digital marketing & SEO",
    "التسويق الرقمي وتحسين البحث",
    "Grow",
    "Connect discovery, useful content, and a measurable path to enquiry.",
    "اربط الظهور والمحتوى المفيد بمسار قابل للقياس نحو الاستفسار.",
    ["Technical SEO", "Campaign strategy", "Measurement planning"],
    ["تحسين البحث التقني", "استراتيجية الحملات", "تخطيط القياس"],
  ],
  [
    "business-consulting",
    "Business consulting",
    "استشارات الأعمال",
    "Grow",
    "Find the operational bottleneck before investing in the next system.",
    "حدد عائق العمليات قبل الاستثمار في النظام التالي.",
    ["Process mapping", "Technology roadmap", "Implementation priorities"],
    ["رسم العمليات", "خارطة التقنية", "أولويات التنفيذ"],
  ],
].map(([slug, en, ar, group, de, da, fe, fa]) => ({
  slug,
  title: pair(en, ar),
  desc: pair(de, da),
  group,
  features: pair(fe, fa),
}));
const productArtwork = {
  pharmexa: pair(
    "Concept illustration of a pharmacy checkout terminal with medicine cartons.",
    "تصور توضيحي لجهاز نقاط بيع صيدلية مع عبوات أدوية.",
  ),
  pharmaxpsm: pair(
    "Concept illustration of a pharmacy inventory workspace and organized medicine stock.",
    "تصور توضيحي لمساحة إدارة مخزون صيدلية وعبوات أدوية منظمة.",
  ),
  udrive: pair(
    "Concept illustration of a rental car, booking phone, and vehicle key.",
    "تصور توضيحي لسيارة تأجير وهاتف للحجز ومفتاح مركبة.",
  ),
  solarerp: pair(
    "Concept illustration of solar panels and a field-service planning tablet.",
    "تصور توضيحي لألواح شمسية وجهاز لوحي لتخطيط الخدمات الميدانية.",
  ),
  mohamina: pair(
    "Concept illustration of legal scales, documents, and a digital workspace.",
    "تصور توضيحي لميزان العدالة ومستندات ومساحة عمل رقمية.",
  ),
  "axirova-fleet": pair(
    "Concept illustration of fleet vehicles with location pins on a route map.",
    "تصور توضيحي لمركبات أسطول وعلامات مواقع على خريطة مسارات.",
  ),
  "axirova-os": pair(
    "Concept illustration of an agency workspace with connected project boards.",
    "تصور توضيحي لمساحة عمل وكالة مع لوحات مشاريع مترابطة.",
  ),
};
const pharmexaImage = {
  actual: true,
  src: pair(
    "images/products/pharmexa/overview-en.jpg",
    "images/products/pharmexa/overview-ar.jpg",
  ),
  alt: pair(
    "Pharmexa pharmacy management dashboard with illustrative demo data.",
    "لوحة إدارة صيدلية Pharmexa ببيانات تجريبية للعرض.",
  ),
  width: 1200,
  height: 900,
  caption: pair(
    "Actual application interface · illustrative demo data",
    "واجهة فعلية من النظام · بيانات تجريبية للعرض",
  ),
  detail: {
    src: pair(
      "images/products/pharmexa/hero-en.jpg",
      "images/products/pharmexa/hero-ar.jpg",
    ),
    alt: pair(
      "Pharmexa sales, inventory, and reporting workspace, available in local Desktop or cloud browser editions.",
      "مساحة Pharmexa للمبيعات والمخزون والتقارير بإصدار مكتبي محلي أو سحابي عبر المتصفح.",
    ),
    width: 1920,
    height: 1080,
  },
};
const pharmexaGallery = [
  ["point-of-sale", "Point of sale", "نقطة البيع"],
  ["inventory", "Inventory & expiry", "المخزون والصلاحية"],
  ["purchases", "Purchasing", "المشتريات"],
  ["reports", "Reporting", "التقارير"],
].map(([screen, en, ar]) => ({
  title: pair(en, ar),
  src: pair(
    `images/products/pharmexa/${screen}-en.png`,
    `images/products/pharmexa/${screen}-ar.png`,
  ),
  alt: pair(
    `Pharmexa ${en.toLowerCase()} screen with illustrative demo data.`,
    `واجهة ${ar} في Pharmexa ببيانات تجريبية للعرض.`,
  ),
  width: 2400,
  height: 1500,
}));
const udriveImage = {
  presentation: true,
  src: "images/products/udrive/showcase-card.jpg",
  alt: pair(
    "UDrive car rental system presentation showing the customer portal, vehicle booking, dashboard, and vehicle administration.",
    "عرض نظام يو درايف لتأجير السيارات يضم بوابة العملاء والحجز ولوحة التحكم وإدارة المركبات.",
  ),
  width: 768,
  height: 512,
  caption: pair(
    "Screenshot-based product presentation",
    "عرض تقديمي مبني على لقطات النظام",
  ),
  detail: {
    src: "images/products/udrive/showcase.jpg",
    alt: pair(
      "UDrive customer and administration interface showcase.",
      "عرض واجهات العملاء والإدارة في يو درايف.",
    ),
    width: 1536,
    height: 1024,
  },
};
const udriveGalleryCaption = pair(
  "Original application screenshots · sample data. Open a preview to see the full capture.",
  "لقطات أصلية من النظام · بيانات للعرض. افتح المعاينة لعرض اللقطة كاملة.",
);
const udriveGallery = [
  [
    "storefront",
    "Customer portal & car listings",
    "بوابة العملاء وقائمة السيارات",
    5760,
    750,
  ],
  [
    "booking",
    "Vehicle details & booking request",
    "تفاصيل المركبة وطلب الحجز",
    3829,
    750,
  ],
  ["dashboard", "Administration dashboard", "لوحة تحكم الإدارة", 1038, 649],
  ["vehicles", "Vehicle management", "إدارة المركبات", 1143, 714],
].map(([screen, en, ar, height, previewHeight]) => ({
  title: pair(en, ar),
  src: pair(
    `images/products/udrive/${screen}.png`,
    `images/products/udrive/${screen}.png`,
  ),
  preview: pair(
    `images/products/udrive/${screen}-preview.jpg`,
    `images/products/udrive/${screen}-preview.jpg`,
  ),
  alt: pair(
    `UDrive ${en.toLowerCase()} application screenshot.`,
    `لقطة من نظام يو درايف: ${ar}.`,
  ),
  width: 1920,
  height,
  previewWidth: 1200,
  previewHeight,
}));

export const products = [
  [
    "pharmexa",
    "Pharmexa",
    "فارمكسا",
    "Pharmacy sales, inventory, purchasing, and reporting in one bilingual workspace. Local Desktop or cloud browser editions.",
    "المبيعات والمخزون والمشتريات والتقارير في مساحة عمل واحدة بالعربية والإنجليزية. إصدار مكتبي محلي أو سحابي عبر المتصفح.",
    "pharmacy",
    [
      "Point of sale & returns",
      "Inventory & purchasing",
      "Reporting in Arabic & English",
    ],
    [
      "نقطة البيع والمرتجعات",
      "المخزون والمشتريات",
      "التقارير بالعربية والإنجليزية",
    ],
  ],
  [
    "pharmaxpsm",
    "PharmaDesk",
    "فارما ديسك",
    "Pharmacy management",
    "إدارة الصيدليات",
    "pharmacy",
    ["Inventory coordination", "Branch workflows", "Reporting"],
    ["تنسيق المخزون", "عمليات الفروع", "التقارير"],
  ],
  [
    "udrive",
    "UDrive",
    "يو درايف",
    "Car listings, vehicle details, booking requests, and an admin workspace.",
    "قائمة السيارات وتفاصيل المركبات وطلبات الحجز ومساحة عمل للإدارة.",
    "car-rental",
    [
      "Car listings & booking requests",
      "Vehicle & brand management",
      "Administration dashboard",
    ],
    [
      "قائمة السيارات وطلبات الحجز",
      "إدارة المركبات والعلامات",
      "لوحة تحكم الإدارة",
    ],
  ],
  [
    "solarerp",
    "SolarERP",
    "سولار ERP",
    "Field-service ERP",
    "تخطيط موارد الخدمات الميدانية",
    "solar-field-services",
    ["Job scheduling", "Field teams", "Service records"],
    ["جدولة المهام", "الفرق الميدانية", "سجلات الخدمة"],
  ],
  [
    "mohamina",
    "Mohamina",
    "محامينا",
    "Legal-tech SaaS",
    "منصة تقنية قانونية",
    "legal",
    ["Matter organization", "Document workflows", "Team coordination"],
    ["تنظيم الملفات", "مسارات المستندات", "تنسيق الفريق"],
  ],
  [
    "axirova-fleet",
    "AXIROVA Fleet",
    "أسطول أكسيروفا",
    "GPS fleet tracking",
    "تتبع الأسطول عبر GPS",
    "logistics-fleet",
    ["Vehicle location", "Trip visibility", "Fleet operations"],
    ["مواقع المركبات", "رؤية الرحلات", "عمليات الأسطول"],
  ],
  [
    "axirova-os",
    "Axirova OS",
    "نظام أكسيروفا",
    "Agency operating system",
    "نظام تشغيل الوكالات",
    "retail",
    ["Project workflows", "Team visibility", "Delivery coordination"],
    ["مسارات المشاريع", "رؤية الفريق", "تنسيق التسليم"],
  ],
].map(([slug, en, ar, de, da, industry, fe, fa]) => ({
  slug,
  title: pair(en, ar),
  desc: pair(de, da),
  industry,
  features: pair(fe, fa),
  image:
    slug === "pharmexa"
      ? pharmexaImage
      : slug === "udrive"
        ? udriveImage
        : { src: `images/products/${slug}.jpg`, alt: productArtwork[slug] },
  ...(slug === "pharmexa" ? { gallery: pharmexaGallery } : {}),
  ...(slug === "udrive"
    ? { gallery: udriveGallery, galleryCaption: udriveGalleryCaption }
    : {}),
}));
export const industries = [
  [
    "pharmacy",
    "Pharmacy",
    "الصيدليات",
    "Connect the counter, stock room, and management team.",
    "اربط نقطة البيع والمخزون وفريق الإدارة.",
  ],
  [
    "car-rental",
    "Car rental",
    "تأجير السيارات",
    "Manage availability, contracts, and vehicle handovers.",
    "نظم التوفر والعقود وتسليم المركبات.",
  ],
  [
    "solar-field-services",
    "Solar & field services",
    "الطاقة الشمسية والخدمات الميدانية",
    "Connect office planning with work in the field.",
    "اربط تخطيط المكتب بالعمل الميداني.",
  ],
  [
    "legal",
    "Legal",
    "القطاع القانوني",
    "Organize matters, documents, and team responsibilities.",
    "نظم الملفات والمستندات ومسؤوليات الفريق.",
  ],
  [
    "logistics-fleet",
    "Logistics & fleet",
    "الخدمات اللوجستية والأساطيل",
    "Bring vehicle movements and operational decisions together.",
    "اجمع حركة المركبات وقرارات التشغيل.",
  ],
  [
    "retail",
    "Retail",
    "التجزئة",
    "Keep sales, stock, and customer journeys connected.",
    "اربط المبيعات والمخزون ورحلة العميل.",
  ],
].map(([slug, en, ar, de, da]) => ({
  slug,
  title: pair(en, ar),
  desc: pair(de, da),
}));
export const work = [
  [
    "pharmacy-operations",
    "A connected pharmacy workflow",
    "مسار صيدلية مترابط",
    "From separate stock and sales records to a shared operational view.",
    "من سجلات مخزون ومبيعات منفصلة إلى رؤية تشغيلية مشتركة.",
  ],
  [
    "rental-workspace",
    "UDrive · Car rental system",
    "يو درايف · نظام تأجير السيارات",
    "A customer booking portal and an administration workspace for vehicles, brands, and rental requests.",
    "بوابة لحجوزات العملاء ومساحة إدارة للمركبات والعلامات التجارية وطلبات التأجير.",
  ],
  [
    "field-service",
    "Field teams, connected",
    "فرق ميدانية مترابطة",
    "From manual job updates to a coordinated service workflow.",
    "من تحديثات يدوية إلى مسار خدمة منسق.",
  ],
].map(([slug, en, ar, de, da]) => ({
  slug,
  title: pair(en, ar),
  desc: pair(de, da),
  placeholder: slug !== "rental-workspace",
  ...(slug === "rental-workspace"
    ? {
        showcase: true,
        image: udriveImage,
        gallery: udriveGallery,
        galleryCaption: udriveGalleryCaption,
        productSlug: "udrive",
      }
    : {}),
}));
export const insights = [
  [
    "before-you-build",
    "What to map before you build software",
    "ما الذي ترسمه قبل بناء البرمجيات؟",
    "Start with a single workflow. Document who owns each step, what information they need, and where work waits. Use that map to agree on a focused first release.",
    "ابدأ بمسار واحد. وثّق مسؤولية كل خطوة والمعلومات المطلوبة ومواطن الانتظار. استخدم الخريطة لتحديد إصدار أول واضح.",
  ],
  [
    "automation-with-oversight",
    "Automation needs a human handoff",
    "الأتمتة تحتاج إلى تسليم بشري",
    "Define the cases an agent can handle, then design a clear path for uncertainty. Logs, approvals, and a named owner make automation easier to operate.",
    "حدد الحالات التي يعالجها الوكيل وصمم مساراً واضحاً عند عدم اليقين. السجلات والموافقات والمسؤول المحدد تسهّل التشغيل.",
  ],
  [
    "arabic-first",
    "Why Arabic-first design starts early",
    "لماذا يبدأ التصميم العربي مبكراً؟",
    "Navigation, forms, dates, and mixed-language content all affect an Arabic interface. Test real tasks in both directions before the layout becomes expensive to change.",
    "التنقل والنماذج والتواريخ والمحتوى المختلط تؤثر على الواجهة العربية. اختبر المهام الفعلية في الاتجاهين قبل أن يصبح التعديل مكلفاً.",
  ],
].map(([slug, en, ar, de, da]) => ({
  slug,
  title: pair(en, ar),
  desc: pair(de, da),
  placeholder: true,
}));
