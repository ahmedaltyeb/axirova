import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CALENDLY_URL } from '../utils/siteData';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../utils/analytics';

const FORM_ENDPOINT = 'https://formspree.io/f/mgobzkoq';
const WHATSAPP_URL = 'https://wa.me/971529307250?text=';

const COPY = {
  en: {
    title: 'AXIROVA Assistant',
    status: 'Lead & service assistant',
    disclaimer: 'Guided assistant — not a live AI agent. Your details are only sent when you submit the form.',
    welcome: 'Welcome to AXIROVA. What would you like help with today?',
    quick: [
      { id: 'services', label: 'Explore services' },
      { id: 'products', label: 'Explore products' },
      { id: 'pricing', label: 'Project pricing' },
      { id: 'lead', label: 'Start a project' },
    ],
    answers: {
      services: 'We deliver AI solutions, business automation, custom software, SaaS platforms, ERP/CRM/POS, web and mobile apps, and quality assurance.',
      products: 'Our platform concepts cover pharmacy operations, restaurants, real estate, AI automation, and enterprise ERP. Each solution is configured around the client workflow.',
      pricing: 'Pricing depends on scope, integrations, users, and delivery timeline. Share a few project details and the team will prepare the right next step.',
    },
    followUp: 'Would you like the AXIROVA team to contact you?',
    yes: 'Share project details',
    back: 'Main options',
    formTitle: 'Tell us about your project',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone / WhatsApp',
    company: 'Company name',
    service: 'Service needed',
    details: 'What would you like to build or improve?',
    select: 'Select a service',
    services: ['AI & Automation', 'Custom Software', 'SaaS Platform', 'ERP / CRM / POS', 'Web & Mobile Apps', 'QA & Software Testing', 'UI/UX Design', 'Not sure yet'],
    consent: 'I agree that AXIROVA may use these details to respond to my enquiry.',
    submit: 'Send to AXIROVA',
    sending: 'Sending…',
    required: 'Add your name and at least an email address or phone number.',
    consentRequired: 'Please accept the privacy consent before submitting.',
    success: 'Thank you. Your enquiry was sent to the AXIROVA team. We will contact you using the details provided.',
    error: 'The message could not be sent. Please try again or continue on WhatsApp.',
    whatsapp: 'Continue on WhatsApp',
    book: 'Book consultation',
    restart: 'Start another enquiry',
    close: 'Close assistant',
    open: 'Open AXIROVA assistant',
  },
  ar: {
    title: 'مساعد أكسيروفا',
    status: 'مساعد الخدمات وطلبات المشاريع',
    disclaimer: 'مساعد إرشادي وليس وكيل ذكاء اصطناعي مباشر. لن تُرسل بياناتك إلا بعد تقديم النموذج.',
    welcome: 'مرحباً بك في أكسيروفا. كيف يمكننا مساعدتك اليوم؟',
    quick: [
      { id: 'services', label: 'استكشف الخدمات' },
      { id: 'products', label: 'استكشف المنتجات' },
      { id: 'pricing', label: 'تكلفة المشروع' },
      { id: 'lead', label: 'ابدأ مشروعاً' },
    ],
    answers: {
      services: 'نقدم حلول الذكاء الاصطناعي وأتمتة الأعمال والبرمجيات المخصصة ومنصات SaaS وأنظمة ERP وCRM ونقاط البيع وتطبيقات الويب والموبايل وضمان الجودة.',
      products: 'تشمل مفاهيم منصاتنا إدارة الصيدليات والمطاعم والعقارات وأتمتة الذكاء الاصطناعي وأنظمة ERP، ويتم تخصيص كل حل حسب سير عمل العميل.',
      pricing: 'تتحدد التكلفة وفق نطاق المشروع والتكاملات وعدد المستخدمين والمدة المطلوبة. أرسل تفاصيل مختصرة ليحدد الفريق الخطوة المناسبة.',
    },
    followUp: 'هل تريد أن يتواصل معك فريق أكسيروفا؟',
    yes: 'أرسل تفاصيل المشروع',
    back: 'الخيارات الرئيسية',
    formTitle: 'أخبرنا عن مشروعك',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف / واتساب',
    company: 'اسم الشركة',
    service: 'الخدمة المطلوبة',
    details: 'ما الذي تريد بناءه أو تطويره؟',
    select: 'اختر الخدمة',
    services: ['الذكاء الاصطناعي والأتمتة', 'برمجيات مخصصة', 'منصة SaaS', 'ERP / CRM / نقاط البيع', 'تطبيقات الويب والموبايل', 'ضمان الجودة واختبار البرمجيات', 'تصميم UI/UX', 'لست متأكداً بعد'],
    consent: 'أوافق على استخدام أكسيروفا لهذه البيانات للرد على طلبي.',
    submit: 'إرسال إلى أكسيروفا',
    sending: 'جارٍ الإرسال…',
    required: 'أدخل الاسم وبريداً إلكترونياً أو رقم هاتف واحداً على الأقل.',
    consentRequired: 'يرجى الموافقة على سياسة الخصوصية قبل الإرسال.',
    success: 'شكراً لك. تم إرسال طلبك إلى فريق أكسيروفا وسنتواصل معك عبر البيانات التي قدمتها.',
    error: 'تعذر إرسال الرسالة. حاول مرة أخرى أو تابع عبر واتساب.',
    whatsapp: 'المتابعة عبر واتساب',
    book: 'حجز استشارة',
    restart: 'إرسال طلب آخر',
    close: 'إغلاق المساعد',
    open: 'فتح مساعد أكسيروفا',
  },
};

const initialForm = { name: '', email: '', phone: '', company: '', service: '', details: '', consent: false, website: '' };

export default function ChatbotWidget() {
  const { lang } = useLanguage();
  const c = COPY[lang];
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('menu');
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    setMessages([{ from: 'bot', text: c.welcome }]);
    setView('menu');
    setError('');
  }, [lang]);

  useEffect(() => {
    if (!open || !bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [open, messages, view, status]);

  const whatsappMessage = useMemo(() => {
    const service = form.service || (lang === 'ar' ? 'استشارة تقنية' : 'technology consultation');
    const text = lang === 'ar'
      ? `مرحباً فريق أكسيروفا، أريد مناقشة: ${service}.`
      : `Hi AXIROVA Team, I would like to discuss: ${service}.`;
    return `${WHATSAPP_URL}${encodeURIComponent(text)}`;
  }, [form.service, lang]);

  const choose = (action) => {
    trackEvent('chatbot_quick_action', { action, language: lang });
    if (action === 'lead') {
      setView('form');
      setError('');
      return;
    }
    const label = c.quick.find(item => item.id === action)?.label;
    setMessages(previous => [
      ...previous,
      { from: 'user', text: label },
      { from: 'bot', text: c.answers[action] },
      { from: 'bot', text: c.followUp },
    ]);
    setView('followup');
  };

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) {
      setError(c.required);
      return;
    }
    if (!form.consent) {
      setError(c.consentRequired);
      return;
    }
    if (form.website) return;

    setStatus('sending');
    try {
      const payload = new FormData();
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('phone', form.phone);
      payload.append('company', form.company);
      payload.append('service', form.service);
      payload.append('message', form.details);
      payload.append('source', 'AXIROVA website chatbot');
      payload.append('language', lang);
      payload.append('_subject', `New AXIROVA chatbot lead — ${form.service || 'General enquiry'}`);

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Submission failed');

      setStatus('success');
      setView('success');
      trackEvent('chatbot_lead_submitted', { service: form.service || 'not_selected', language: lang });
    } catch {
      setStatus('error');
      setError(c.error);
      trackEvent('chatbot_lead_error', { language: lang });
    }
  };

  const restart = () => {
    setForm(initialForm);
    setStatus('idle');
    setError('');
    setMessages([{ from: 'bot', text: c.welcome }]);
    setView('menu');
  };

  return (
    <div className="leadbot-shell" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {open && (
          <motion.section
            className="leadbot"
            aria-label={c.title}
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: .97 }}
            transition={{ duration: .28, ease: [.22, 1, .36, 1] }}
          >
            <header className="leadbot__header">
              <div className="leadbot__mark">AX</div>
              <div className="leadbot__identity">
                <strong>{c.title}</strong>
                <span><i />{c.status}</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={c.close}>✕</button>
            </header>

            <div className="leadbot__notice">{c.disclaimer}</div>

            <div className="leadbot__body" ref={bodyRef}>
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.text}-${index}`}
                  className={`leadbot__message leadbot__message--${message.from}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.text}
                </motion.div>
              ))}

              {view === 'menu' && (
                <div className="leadbot__choices">
                  {c.quick.map(item => (
                    <button key={item.id} type="button" onClick={() => choose(item.id)}>{item.label}<span>↗</span></button>
                  ))}
                </div>
              )}

              {view === 'followup' && (
                <div className="leadbot__choices leadbot__choices--two">
                  <button type="button" onClick={() => { setView('form'); setError(''); }}>{c.yes}<span>↗</span></button>
                  <button type="button" onClick={() => setView('menu')}>{c.back}</button>
                </div>
              )}

              {view === 'form' && (
                <motion.form className="leadbot__form" onSubmit={submitLead} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3>{c.formTitle}</h3>
                  <div className="leadbot__fields">
                    <label><span>{c.name} *</span><input name="name" value={form.name} onChange={updateField} autoComplete="name" required /></label>
                    <label><span>{c.email}</span><input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" /></label>
                    <label><span>{c.phone}</span><input name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" /></label>
                    <label><span>{c.company}</span><input name="company" value={form.company} onChange={updateField} autoComplete="organization" /></label>
                    <label className="leadbot__field--full"><span>{c.service}</span><select name="service" value={form.service} onChange={updateField}><option value="">{c.select}</option>{c.services.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
                    <label className="leadbot__field--full"><span>{c.details}</span><textarea name="details" rows="3" value={form.details} onChange={updateField} /></label>
                    <label className="leadbot__honeypot" aria-hidden="true"><input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" /></label>
                  </div>
                  <label className="leadbot__consent">
                    <input name="consent" type="checkbox" checked={form.consent} onChange={updateField} />
                    <span>{c.consent} <a href="/privacy" target="_blank" rel="noreferrer">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy policy'}</a></span>
                  </label>
                  {error && <div className="leadbot__error" role="alert">{error}</div>}
                  <div className="leadbot__form-actions">
                    <button className="leadbot__submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.submit}</button>
                    <button className="leadbot__text-button" type="button" onClick={() => setView('menu')}>{c.back}</button>
                  </div>
                </motion.form>
              )}

              {view === 'success' && (
                <motion.div className="leadbot__success" initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="leadbot__success-icon">✓</div>
                  <p>{c.success}</p>
                  <a href={whatsappMessage} target="_blank" rel="noreferrer" onClick={() => trackEvent('chatbot_whatsapp_click')}>{c.whatsapp}</a>
                  <a className="leadbot__secondary-link" href={CALENDLY_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent('chatbot_calendly_click')}>{c.book}</a>
                  <button type="button" onClick={restart}>{c.restart}</button>
                </motion.div>
              )}
            </div>

            <footer className="leadbot__footer">
              <span>AXIROVA · {lang === 'ar' ? 'مساعد آمن لطلبات المشاريع' : 'Secure project enquiry assistant'}</span>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        className={open ? 'leadbot-toggle leadbot-toggle--open' : 'leadbot-toggle'}
        type="button"
        onClick={() => { setOpen(value => !value); if (!open) trackEvent('chatbot_open', { language: lang }); }}
        aria-expanded={open}
        aria-label={open ? c.close : c.open}
      >
        {open ? '✕' : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
      </button>

      <style>{`
        .leadbot-shell{position:fixed;right:24px;bottom:24px;z-index:9998;display:flex;flex-direction:column;align-items:flex-end;gap:12px;font-family:var(--font-b)}
        [dir="rtl"] .leadbot-shell{right:auto;left:24px;align-items:flex-start}
        .leadbot{width:min(410px,calc(100vw - 32px));height:min(680px,calc(100vh - 110px));background:var(--bg2);border:1px solid var(--border2);border-radius:22px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 28px 80px rgba(0,0,0,.55),0 0 0 1px rgba(26,111,232,.1)}
        .leadbot__header{padding:14px 15px;background:linear-gradient(135deg,#0f57c8,#3b9eff);display:flex;align-items:center;gap:10px;color:#fff}
        .leadbot__mark{width:40px;height:40px;border-radius:13px;background:rgba(255,255,255,.17);display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:800;font-size:12px}
        .leadbot__identity{flex:1;min-width:0;display:flex;flex-direction:column}
        .leadbot__identity strong{font-family:var(--font-d);font-size:14px}
        .leadbot__identity span{font-size:10px;color:rgba(255,255,255,.8);margin-top:3px;display:flex;align-items:center;gap:5px}
        .leadbot__identity i{width:6px;height:6px;border-radius:50%;background:#00f0b5;box-shadow:0 0 8px #00f0b5}
        .leadbot__header button{width:30px;height:30px;border:0;border-radius:8px;background:rgba(255,255,255,.14);color:#fff;cursor:pointer}
        .leadbot__notice{padding:9px 14px;background:var(--bg3);border-bottom:1px solid var(--border);color:var(--dim);font-size:10px;line-height:1.5}
        .leadbot__body{flex:1;overflow-y:auto;padding:16px;scrollbar-width:thin;scrollbar-color:rgba(26,111,232,.35) transparent}
        .leadbot__message{width:fit-content;max-width:88%;padding:10px 13px;border-radius:15px;font-size:13px;line-height:1.6;margin-bottom:9px}
        .leadbot__message--bot{background:var(--bg4);border:1px solid var(--border);color:var(--text);border-end-start-radius:4px}
        .leadbot__message--user{margin-inline-start:auto;background:linear-gradient(135deg,#1a6fe8,#3b9eff);color:#fff;border-end-end-radius:4px}
        .leadbot__choices{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
        .leadbot__choices button{min-height:46px;padding:10px 12px;border-radius:11px;border:1px solid var(--border2);background:var(--glass);color:var(--text);font-family:var(--font-b);font-size:12px;text-align:start;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;transition:border-color .25s,transform .25s,background .25s}
        .leadbot__choices button:hover{border-color:var(--blue2);background:var(--accent-soft);transform:translateY(-2px)}
        .leadbot__choices--two{grid-template-columns:1fr}
        .leadbot__form{margin-top:8px}
        .leadbot__form h3{font-family:var(--font-d);font-size:18px;margin-bottom:14px}
        .leadbot__fields{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .leadbot__fields label{display:flex;flex-direction:column;gap:6px}
        .leadbot__fields label>span{color:var(--dim);font-size:10px;letter-spacing:.06em}
        .leadbot__fields input,.leadbot__fields select,.leadbot__fields textarea{width:100%;box-sizing:border-box;border:1px solid var(--input-border);border-radius:9px;background:var(--input-bg);color:var(--text);padding:10px 11px;font-family:var(--font-b);font-size:12px;outline:none}
        .leadbot__fields input:focus,.leadbot__fields select:focus,.leadbot__fields textarea:focus{border-color:var(--blue2);box-shadow:0 0 0 3px rgba(26,111,232,.11)}
        .leadbot__field--full{grid-column:1/-1}
        .leadbot__honeypot{position:absolute!important;left:-9999px!important}
        .leadbot__consent{display:flex;align-items:flex-start;gap:8px;margin:12px 0;color:var(--muted);font-size:10px;line-height:1.5}
        .leadbot__consent input{margin-top:2px;accent-color:var(--blue)}
        .leadbot__consent a{color:var(--blue2)}
        .leadbot__error{padding:9px 10px;border-radius:8px;background:rgba(248,113,113,.09);border:1px solid rgba(248,113,113,.3);color:#f87171;font-size:11px;margin-bottom:10px}
        .leadbot__form-actions{display:flex;flex-direction:column;gap:8px}
        .leadbot__submit{min-height:43px;border:0;border-radius:10px;background:linear-gradient(135deg,#1a6fe8,#3b9eff);color:#fff;font-family:var(--font-b);font-weight:700;cursor:pointer}
        .leadbot__submit:disabled{opacity:.65;cursor:wait}
        .leadbot__text-button{border:0;background:transparent;color:var(--muted);font-family:var(--font-b);font-size:11px;cursor:pointer}
        .leadbot__success{text-align:center;padding:24px 4px;display:flex;flex-direction:column;align-items:center;gap:11px}
        .leadbot__success-icon{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,212,160,.12);border:1px solid rgba(0,212,160,.4);color:var(--emerald);font-size:23px}
        .leadbot__success p{font-size:13px;line-height:1.7;color:var(--muted);margin-bottom:4px}
        .leadbot__success a{width:100%;box-sizing:border-box;padding:11px;border-radius:9px;text-decoration:none;background:#25D366;color:#fff;font-size:12px;font-weight:700}
        .leadbot__success .leadbot__secondary-link{background:var(--accent-soft);color:var(--blue2);border:1px solid var(--accent-border)}
        .leadbot__success button{border:0;background:transparent;color:var(--muted);font-family:var(--font-b);font-size:11px;cursor:pointer;margin-top:3px}
        .leadbot__footer{padding:9px 12px;border-top:1px solid var(--border);background:var(--bg3);text-align:center;color:var(--dim);font-family:var(--font-m);font-size:8px;letter-spacing:.08em}
        .leadbot-toggle{width:58px;height:58px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:linear-gradient(135deg,#1a6fe8,#3b9eff);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 34px rgba(26,111,232,.42);transition:transform .25s,background .25s}
        .leadbot-toggle:hover{transform:translateY(-3px)}
        .leadbot-toggle svg{width:23px;height:23px}
        .leadbot-toggle--open{background:var(--bg3);color:var(--text);border-color:var(--border2)}
        @media(max-width:560px){.leadbot-shell{right:16px;bottom:16px}.leadbot{height:min(650px,calc(100vh - 92px))}[dir="rtl"] .leadbot-shell{left:16px}.leadbot__fields{grid-template-columns:1fr}.leadbot__field--full{grid-column:auto}.leadbot__choices{grid-template-columns:1fr 1fr}}
        @media(max-width:380px){.leadbot__choices{grid-template-columns:1fr}}
        @media(prefers-reduced-motion:reduce){.leadbot-shell *{scroll-behavior:auto!important;transition:none!important}}
      `}</style>
    </div>
  );
}
