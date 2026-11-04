import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE } from '../utils/siteData';

const COPY = {
  en: {
    title: 'AXIROVA AI Assistant', status: 'AI sales & support • Online',
    welcome: "Hello! 👋 Welcome to AXIROVA. I can help you explore our services, understand how we can support your business, or prepare a project enquiry. What would you like to work on?",
    disclaimer: 'AI-generated guidance based on AXIROVA website information. Final scope, pricing and timelines are confirmed by our team.',
    placeholder: 'Type your message…', send: 'Send', thinking: 'Thinking…',
    quick: ['Explore services', 'Request a quotation', 'Software testing & QA', 'Talk to our team'],
    quote: 'Project enquiry', quoteIntro: 'I can collect your project requirements so our team can review them and prepare an official proposal.',
    name: 'Your name', company: 'Company (optional)', email: 'Work email', phone: 'WhatsApp / phone (optional)',
    service: 'What do you need?', details: 'Tell us about your project', budget: 'Estimated budget', timeline: 'Expected timeline',
    chooseService: 'Select a service', submit: 'Send enquiry', submitting: 'Submitting…', consent: 'I agree that AXIROVA may contact me about this enquiry and process these details to respond.',
    success: 'Thank you! Your enquiry has been sent to the AXIROVA team. We will review it and contact you.',
    error: 'We could not submit your enquiry. Please try again or email info@axirova.ae.',
    services: ['Custom software / mobile app', 'Website / web application', 'AI solution / AI agent', 'Business automation', 'ERP / CRM / POS', 'Software testing & QA', 'SaaS platform', 'Other'],
    budgets: ['Not decided yet', 'Under AED 25,000', 'AED 25,000–80,000', 'AED 80,000–200,000', 'AED 200,000+', 'Prefer to discuss'],
    timelines: ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'More than 6 months', 'Flexible'],
    open: 'Open AXIROVA AI Assistant', close: 'Close assistant', retry: 'Please try again.', human: 'Contact our team',
    qa: 'For a QA/testing enquiry, tell me what you are testing (web, mobile, desktop or API), the main issue, and the testing scope you have in mind.',
    privacy: 'Please do not send passwords, payment details or sensitive identity information.',
  },
  ar: {
    title: 'مساعد أكسيروفا الذكي', status: 'المبيعات والدعم بالذكاء الاصطناعي • متصل',
    welcome: 'مرحباً بك في أكسيروفا! 👋 يمكنني مساعدتك في استكشاف خدماتنا، ومعرفة الحل المناسب لأعمالك، أو جمع متطلبات مشروعك لطلب عرض سعر. كيف يمكنني مساعدتك؟',
    disclaimer: 'إجابات الذكاء الاصطناعي مبنية على معلومات موقع أكسيروفا. يعتمد السعر والنطاق والجدول الزمني النهائي على تأكيد فريقنا.',
    placeholder: 'اكتب رسالتك…', send: 'إرسال', thinking: 'جاري التفكير…',
    quick: ['استكشف خدماتنا', 'اطلب عرض سعر', 'اختبار البرمجيات وضمان الجودة', 'تواصل مع الفريق'],
    quote: 'طلب مشروع', quoteIntro: 'يمكنني جمع متطلبات مشروعك ليتمكن فريقنا من مراجعتها وإعداد عرض رسمي.',
    name: 'الاسم', company: 'الشركة (اختياري)', email: 'البريد الإلكتروني للعمل', phone: 'واتساب / الهاتف (اختياري)',
    service: 'الخدمة المطلوبة', details: 'أخبرنا عن مشروعك', budget: 'الميزانية التقديرية', timeline: 'الجدول الزمني المتوقع',
    chooseService: 'اختر الخدمة', submit: 'إرسال الطلب', submitting: 'جاري الإرسال…', consent: 'أوافق على تواصل أكسيروفا معي بخصوص هذا الطلب ومعالجة البيانات للرد عليه.',
    success: 'شكراً لك! تم إرسال طلبك إلى فريق أكسيروفا. سنراجعه ونتواصل معك.',
    error: 'تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى أو مراسلتنا على info@axirova.ae.',
    services: ['تطوير برمجيات / تطبيق جوال', 'موقع إلكتروني / تطبيق ويب', 'حل ذكاء اصطناعي / وكيل ذكي', 'أتمتة الأعمال', 'ERP / CRM / POS', 'اختبار البرمجيات وضمان الجودة', 'منصة SaaS', 'أخرى'],
    budgets: ['لم أحدد بعد', 'أقل من 25,000 درهم', '25,000–80,000 درهم', '80,000–200,000 درهم', '200,000 درهم فأكثر', 'أفضل المناقشة'],
    timelines: ['في أقرب وقت', 'خلال 1–3 أشهر', 'خلال 3–6 أشهر', 'أكثر من 6 أشهر', 'مرن'],
    open: 'افتح مساعد أكسيروفا الذكي', close: 'إغلاق المساعد', retry: 'يرجى المحاولة مرة أخرى.', human: 'تواصل مع فريقنا',
    qa: 'لطلب اختبار وضمان جودة البرمجيات، أخبرني بنوع النظام (ويب أو جوال أو سطح مكتب أو API)، والتحدي الأساسي، ونطاق الاختبارات المطلوبة.',
    privacy: 'يرجى عدم إرسال كلمات المرور أو بيانات الدفع أو معلومات الهوية الحساسة.',
  },
};

const quickPrompts = {
  en: [
    'What services does AXIROVA offer?',
    'I would like to request a project quotation.',
    'I need software testing and quality assurance.',
    'I would like to speak with your team.',
  ],
  ar: [
    'ما الخدمات التي تقدمها أكسيروفا؟',
    'أرغب في طلب عرض سعر لمشروع.',
    'أحتاج إلى اختبار البرمجيات وضمان الجودة.',
    'أرغب في التحدث مع فريقكم.',
  ],
};

const initialMessage = (text) => ({ role: 'assistant', content: text, id: 'welcome' });

export default function ChatbotWidget() {
  const { lang } = useLanguage();
  const ar = lang === 'ar';
  const t = COPY[ar ? 'ar' : 'en'];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [initialMessage(t.welcome)]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadBusy, setLeadBusy] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [lead, setLead] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', timeline: '', details: '', consent: false, website: '' });
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open, showLead]);

  useEffect(() => {
    setMessages((current) => current.length === 1 && current[0].id === 'welcome' ? [initialMessage(t.welcome)] : current);
  }, [t.welcome]);

  const sendMessage = async (raw) => {
    const text = raw.trim();
    if (!text || sending) return;
    const next = [...messages, { role: 'user', content: text, id: String(Date.now()) }];
    setMessages(next);
    setInput('');
    setSending(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m.id !== 'welcome').slice(-12).map(({ role, content }) => ({ role, content })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t.retry);
      setMessages((current) => [...current, { role: 'assistant', content: data.reply, id: String(Date.now() + 1) }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', content: error.message || t.retry, id: String(Date.now() + 1), error: true }]);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const startQuote = () => {
    setShowLead(true);
    setLeadError('');
    setLeadSuccess(false);
    setMessages((current) => [...current, { role: 'assistant', content: t.quoteIntro, id: String(Date.now()) }]);
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setLeadBusy(true);
    setLeadError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, language: ar ? 'ar' : 'en' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t.error);
      setLeadSuccess(true);
      setLead({ name: '', company: '', email: '', phone: '', service: '', budget: '', timeline: '', details: '', consent: false, website: '' });
    } catch (error) {
      setLeadError(error.message || t.error);
    } finally {
      setLeadBusy(false);
    }
  };

  const fieldStyle = {
    width: '100%', boxSizing: 'border-box', padding: '10px 11px', borderRadius: 9,
    border: '1px solid var(--border2)', background: 'var(--bg2)', color: 'var(--text)',
    font: 'inherit', fontSize: 12, outlineOffset: 2,
  };

  return (
    <div dir={ar ? 'rtl' : 'ltr'} style={{ position: 'fixed', bottom: 22, [ar ? 'left' : 'right']: 22, zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: ar ? 'flex-start' : 'flex-end', gap: 12, fontFamily: 'var(--font-b)', color: 'var(--text)' }}>
      {open && (
        <section aria-label={t.title} style={{ width: 'min(390px, calc(100vw - 32px))', height: 'min(620px, calc(100dvh - 112px))', minHeight: 420, background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,.35), 0 0 0 1px rgba(26,111,232,.10)', animation: 'chatSlideUp .28s cubic-bezier(.22,1,.36,1) both' }}>
          <header style={{ background: 'linear-gradient(130deg,#003566,#087BFF 72%,#00A6D6)', padding: '14px 15px', display: 'flex', alignItems: 'center', gap: 10, color: '#fff', flexShrink: 0 }}>
            <div style={{ width: 39, height: 39, borderRadius: 12, background: 'rgba(255,255,255,.16)', display: 'grid', placeItems: 'center', fontSize: 21 }}>◈</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 750, fontSize: 14 }}>{t.title}</div>
              <div style={{ fontSize: 10, opacity: .86, marginTop: 3 }}>● {t.status}</div>
            </div>
            <a href="https://wa.me/971529307250" target="_blank" rel="noreferrer" aria-label={t.human} title={t.human} style={{ color: '#fff', fontSize: 18, textDecoration: 'none', padding: 6 }}>↗</a>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.close} style={{ background: 'rgba(255,255,255,.14)', border: 0, borderRadius: 8, width: 30, height: 30, color: '#fff', cursor: 'pointer', fontSize: 16 }}>×</button>
          </header>

          <div style={{ padding: '8px 13px', fontSize: 10, lineHeight: 1.5, color: 'var(--dim)', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>{t.disclaimer}</div>

          <div ref={bodyRef} aria-live="polite" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 9, scrollbarWidth: 'thin' }}>
            {messages.map((message) => (
              <div key={message.id} style={{ display: 'flex', justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '88%', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', padding: '10px 12px', borderRadius: message.role === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px', background: message.role === 'user' ? 'linear-gradient(135deg,#087BFF,#1A6FE8)' : 'var(--bg4)', border: message.role === 'user' ? 0 : '1px solid var(--border)', color: message.role === 'user' ? '#fff' : 'var(--text)', fontSize: 12, lineHeight: 1.6 }}>
                  {message.content}
                </div>
              </div>
            ))}
            {sending && <div style={{ alignSelf: 'flex-start', color: 'var(--dim)', fontSize: 11, padding: '5px 8px' }}>{t.thinking}</div>}

            {!showLead && messages.length <= 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 3 }}>
                {t.quick.map((label, index) => (
                  <button key={label} type="button" onClick={() => index === 1 ? startQuote() : sendMessage(quickPrompts[ar ? 'ar' : 'en'][index])} style={{ border: '1px solid var(--border2)', borderRadius: 999, padding: '7px 10px', background: 'var(--bg3)', color: 'var(--blue2)', cursor: 'pointer', fontSize: 10, fontFamily: 'inherit' }}>{label}</button>
                ))}
              </div>
            )}

            {showLead && (
              <form onSubmit={submitLead} style={{ border: '1px solid var(--border2)', borderRadius: 13, padding: 12, background: 'var(--bg3)', display: 'grid', gap: 8 }}>
                <strong style={{ fontSize: 13 }}>{t.quote}</strong>
                {leadSuccess ? (
                  <div role="status" style={{ color: 'var(--emerald, #00a86b)', fontSize: 12, lineHeight: 1.6 }}>{t.success}</div>
                ) : (
                  <>
                    <input required maxLength={120} autoComplete="name" placeholder={t.name} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} style={fieldStyle} />
                    <input maxLength={160} autoComplete="organization" placeholder={t.company} value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} style={fieldStyle} />
                    <input type="email" maxLength={180} autoComplete="email" placeholder={t.email} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} style={fieldStyle} />
                    <input maxLength={60} autoComplete="tel" placeholder={t.phone} value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} style={fieldStyle} />
                    <select required value={lead.service} onChange={(e) => setLead({ ...lead, service: e.target.value })} style={fieldStyle}>
                      <option value="">{t.chooseService}</option>
                      {t.services.map((service, i) => <option key={service} value={COPY.en.services[i]}>{service}</option>)}
                    </select>
                    <select value={lead.budget} onChange={(e) => setLead({ ...lead, budget: e.target.value })} style={fieldStyle}>
                      <option value="">{t.budget}</option>
                      {t.budgets.map((budget) => <option key={budget}>{budget}</option>)}
                    </select>
                    <select value={lead.timeline} onChange={(e) => setLead({ ...lead, timeline: e.target.value })} style={fieldStyle}>
                      <option value="">{t.timeline}</option>
                      {t.timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
                    </select>
                    <textarea required minLength={15} maxLength={3000} rows={3} placeholder={t.details} value={lead.details} onChange={(e) => setLead({ ...lead, details: e.target.value })} style={{ ...fieldStyle, resize: 'vertical' }} />
                    <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' }} aria-hidden="true">
                      <label>Website<input tabIndex={-1} autoComplete="off" value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} /></label>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 10, lineHeight: 1.5, color: 'var(--dim)' }}>
                      <input type="checkbox" required checked={lead.consent} onChange={(e) => setLead({ ...lead, consent: e.target.checked })} style={{ marginTop: 2 }} />
                      {t.consent}
                    </label>
                    {leadError && <div role="alert" style={{ color: '#e36b6b', fontSize: 11 }}>{leadError}</div>}
                    <button type="submit" disabled={leadBusy} style={{ border: 0, borderRadius: 9, padding: '11px 13px', background: 'linear-gradient(135deg,#087BFF,#00A6D6)', color: '#fff', fontWeight: 700, cursor: leadBusy ? 'wait' : 'pointer', fontFamily: 'inherit' }}>{leadBusy ? t.submitting : t.submit}</button>
                  </>
                )}
              </form>
            )}
            <div style={{ color: 'var(--dim)', fontSize: 9, lineHeight: 1.5, textAlign: 'center', padding: '3px 8px' }}>{t.privacy}</div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} style={{ padding: '10px', borderTop: '1px solid var(--border)', background: 'var(--bg3)', display: 'flex', gap: 7, alignItems: 'center', flexShrink: 0 }}>
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} maxLength={1800} aria-label={t.placeholder} disabled={sending} style={{ ...fieldStyle, flex: 1, minWidth: 0, background: 'var(--bg2)' }} />
            <button type="submit" disabled={sending || !input.trim()} style={{ border: 0, borderRadius: 10, width: 40, height: 40, background: 'linear-gradient(135deg,#087BFF,#00A6D6)', color: '#fff', cursor: 'pointer', fontSize: 16, flexShrink: 0 }} aria-label={t.send}>➤</button>
          </form>
          <div style={{ textAlign: 'center', fontSize: 9, color: 'var(--dim)', padding: '0 8px 8px', background: 'var(--bg3)' }}>AXIROVA AI Solutions & Quality Assurance</div>
        </section>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} title={open ? t.close : t.open} aria-label={open ? t.close : t.open} aria-expanded={open} style={{ width: 57, height: 57, borderRadius: '50%', border: '1px solid var(--border2)', background: open ? 'var(--bg3)' : 'linear-gradient(135deg,#003566,#087BFF 70%,#00A6D6)', cursor: 'pointer', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 8px 32px rgba(8,123,255,.36)', transition: 'transform .2s ease' }}>
        {open ? <span style={{ fontSize: 23 }}>×</span> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 24, height: 24 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h8M8 14h5" /></svg>}
      </button>
    </div>
  );
}
