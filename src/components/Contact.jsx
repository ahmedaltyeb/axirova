import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { SITE } from '../utils/siteData';

/* ─────────────────────────────────────────────
   Configuration — change only these two lines
───────────────────────────────────────────── */
const FORM_ID  = 'mgobzkoq';
const CALENDLY = 'https://calendly.com/axirova/consultation';

/* ─── Select options ─── */
const SERVICES = [
  'Artificial Intelligence',
  'Custom Software Development',
  'Mobile App Development',
  'Business Automation',
  'Digital Transformation',
  'Cloud Solutions',
  'E-Commerce Solutions',
];

const BUDGETS = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+',
];

const TIMELINES = [
  'ASAP',
  'Within 1 Month',
  'Within 3 Months',
  'Within 6 Months',
  'Just Exploring',
];

/* ─── Shared design tokens (inline) ─── */
const BASE_INPUT = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  borderRadius: '10px',
  padding: '13px 16px',
  color: 'var(--text)',
  fontSize: '14px',
  fontFamily: 'var(--font-b)',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  boxSizing: 'border-box',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const inputStyle = (field, focused, errors) => {
  const hasError = errors?.some?.(e => e.field === field);
  return {
    ...BASE_INPUT,
    border: `1px solid ${
      hasError   ? 'rgba(248,113,113,0.7)' :
      focused === field ? 'var(--blue2)' :
      'rgba(255,255,255,0.07)'
    }`,
    ...(focused === field && !hasError && {
      boxShadow: '0 0 0 3px rgba(26,111,232,0.12)',
    }),
    ...(hasError && {
      background: 'rgba(248,113,113,0.06)',
    }),
  };
};

/* ─── Small sub-components ─── */
function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: 'block',
        fontFamily: 'var(--font-m)',
        fontSize: '11px',
        color: 'var(--dim)',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}
    >
      {children}
      {required && (
        <span style={{ color: 'var(--blue2)', marginLeft: '4px' }} aria-hidden="true">*</span>
      )}
    </label>
  );
}

function FieldWrap({ children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{children}</div>;
}

function CheckIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="rgba(0,212,160,0.12)" />
      <circle cx="32" cy="32" r="24" stroke="var(--emerald)" strokeWidth="1.5" fill="none" />
      <motion.path
        d="M20 33L28 41L44 24"
        stroke="var(--emerald)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: .6, delay: .3, ease: [.22,1,.36,1] }}
      />
    </svg>
  );
}

/* ─── Success screen ─── */
function SuccessScreen({ name }) {
  const scrollToTop = () =>
    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.div
      initial={{ opacity: 0, scale: .92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .6, ease: [.22,1,.36,1] }}
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        background: 'var(--glass)',
        border: '1px solid rgba(0,212,160,0.2)',
        borderRadius: '24px',
        padding: '64px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '1px', background: 'linear-gradient(90deg,transparent,var(--emerald),transparent)' }} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: .1 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
      >
        <CheckIcon />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .35 }}
      >
        <div style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--emerald)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
          MESSAGE RECEIVED
        </div>
        <h3 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
          Thank you for contacting{' '}
          <span style={{ color: 'var(--blue2)' }}>AXIROVA</span>
          {name ? `, ${name.split(' ')[0]}` : ''}.
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, marginBottom: '8px' }}>
          Your inquiry has been received successfully.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.75, marginBottom: '40px' }}>
          Our team will review your requirements and contact you{' '}
          <strong style={{ color: 'var(--text)' }}>within 24 hours</strong>.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(26,111,232,0.45)' }}
            whileTap={{ scale: .97 }}
            onClick={scrollToTop}
            style={{
              background: 'linear-gradient(135deg,var(--blue),var(--blue2))',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '9px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-b)',
            }}
          >
            ← Return to Homepage
          </motion.button>
          <motion.button
            whileHover={{ y: -3, borderColor: 'var(--emerald)', color: 'var(--emerald)' }}
            whileTap={{ scale: .97 }}
            onClick={() => window.open(CALENDLY, '_blank', 'noopener,noreferrer')}
            style={{
              background: 'transparent',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              padding: '12px 24px',
              borderRadius: '9px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-b)',
              transition: 'all .3s',
            }}
          >
            Book a Consultation →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Calendly side card ─── */
function CalendlyCard() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg,rgba(26,111,232,0.1),rgba(0,212,160,0.06))',
        border: '1px solid rgba(26,111,232,0.2)',
        borderRadius: '20px',
        padding: '32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)', animation: 'pulse-live 2s ease infinite', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--blue2)', letterSpacing: '.15em' }}>PREFER A CALL?</span>
      </div>
      <div style={{ fontFamily: 'var(--font-d)', fontSize: '20px', fontWeight: 800, lineHeight: 1.2, marginBottom: '10px' }}>
        Book a Free 30-Min Consultation
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7, marginBottom: '22px' }}>
        Pick a time that works for you. We'll discuss your project, answer every question, and outline next steps — zero commitment.
      </p>
      <motion.button
        whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(0,212,160,0.35)' }}
        whileTap={{ scale: .97 }}
        onClick={() => window.open(CALENDLY, '_blank', 'noopener,noreferrer')}
        aria-label="Schedule a consultation on Calendly"
        style={{
          background: 'linear-gradient(135deg,var(--emerald),var(--emerald2))',
          color: '#050d1a',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '9px',
          fontSize: '13px',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'var(--font-b)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        Schedule a Consultation →
      </motion.button>
    </div>
  );
}

/* ─── Contact info card ─── */
function ContactInfoCard() {
  const items = [
    { label: 'EMAIL', value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'PHONE', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g,'')}` },
    { label: 'LOCATION', value: 'United Arab Emirates — GCC Region', href: null },
  ];

  return (
    <div style={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {items.map(({ label, value, href }) => (
        <div key={label}>
          <div style={{ fontFamily: 'var(--font-m)', fontSize: '9px', color: 'var(--dim)', letterSpacing: '.18em', marginBottom: '5px' }}>{label}</div>
          {href ? (
            <a
              href={href}
              style={{ color: 'var(--text)', fontSize: '13px', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--blue2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; }}
            >
              {value}
            </a>
          ) : (
            <span style={{ color: 'var(--text)', fontSize: '13px' }}>{value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Contact component
═══════════════════════════════════════════ */
export default function Contact() {
  const [state, handleSubmit] = useForm(FORM_ID);
  const [focused, setFocused] = useState(null);
  const [submittedName, setSubmittedName] = useState('');

  const focus  = (f) => () => setFocused(f);
  const blur   = ()  => setFocused(null);
  const iStyle = (field) => inputStyle(field, focused, state.errors);

  /* Capture name before submission for the success message */
  const onSubmit = (e) => {
    const nameField = e.target.elements['name'];
    if (nameField) setSubmittedName(nameField.value);
    handleSubmit(e);
  };

  const hasGeneralError = state.errors?.some?.(e => !e.field);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ padding: '140px 0', background: 'linear-gradient(180deg,transparent,rgba(8,15,30,.55),transparent)' }}
    >
      <div className="container">

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div
            className="sec-label"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ justifyContent: 'center' }}
          >
            Get In Touch
          </motion.div>
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(32px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: '16px' }}
          >
            Start Your <span style={{ color: 'var(--blue2)' }}>Project</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: .18 }}
            style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}
          >
            Tell us about your project. We respond within 24 hours with a free initial assessment.
          </motion.p>
        </div>

        {/* ── Success state ── */}
        <AnimatePresence mode="wait">
          {state.succeeded ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SuccessScreen name={submittedName} />
            </motion.div>
          ) : (

            /* ── Form + sidebar ── */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="contact-inner"
            >
              {/* ════ LEFT — Form ════ */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .8, ease: [.22,1,.36,1] }}
              >
                <form
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="Project inquiry form"
                  style={{
                    background: 'var(--glass)',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    padding: '44px',
                  }}
                >
                  {/* ── Hidden lead-quality fields ── */}
                  <input type="hidden" name="source"  value="AXIROVA Website" />
                  <input type="hidden" name="website" value="axirova.ae" />

                  {/* ── Honeypot (bot trap — must stay visually hidden, NOT display:none) ── */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, overflow: 'hidden' }}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    {/* Row 1 — Name + Email */}
                    <div className="cf-row">
                      <FieldWrap>
                        <Label htmlFor="cf-name" required>Full Name</Label>
                        <input
                          id="cf-name"
                          type="text"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Ahmed Al Rashidi"
                          aria-required="true"
                          aria-invalid={state.errors?.some?.(e => e.field === 'name') ? 'true' : undefined}
                          aria-describedby="err-name"
                          onFocus={focus('name')}
                          onBlur={blur}
                          style={iStyle('name')}
                        />
                        <ValidationError id="err-name" prefix="Name" field="name" errors={state.errors} className="cf-error" />
                      </FieldWrap>

                      <FieldWrap>
                        <Label htmlFor="cf-email" required>Business Email</Label>
                        <input
                          id="cf-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="ahmed@company.ae"
                          aria-required="true"
                          aria-invalid={state.errors?.some?.(e => e.field === 'email') ? 'true' : undefined}
                          aria-describedby="err-email"
                          onFocus={focus('email')}
                          onBlur={blur}
                          style={iStyle('email')}
                        />
                        <ValidationError id="err-email" prefix="Email" field="email" errors={state.errors} className="cf-error" />
                      </FieldWrap>
                    </div>

                    {/* Row 2 — Company + Phone */}
                    <div className="cf-row">
                      <FieldWrap>
                        <Label htmlFor="cf-company">Company Name</Label>
                        <input
                          id="cf-company"
                          type="text"
                          name="company"
                          autoComplete="organization"
                          placeholder="Your Company LLC"
                          onFocus={focus('company')}
                          onBlur={blur}
                          style={iStyle('company')}
                        />
                      </FieldWrap>

                      <FieldWrap>
                        <Label htmlFor="cf-phone">Phone Number</Label>
                        <input
                          id="cf-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="+971 50 000 0000"
                          onFocus={focus('phone')}
                          onBlur={blur}
                          style={iStyle('phone')}
                        />
                      </FieldWrap>
                    </div>

                    {/* Row 3 — Service + Budget */}
                    <div className="cf-row">
                      <FieldWrap>
                        <Label htmlFor="cf-service" required>Service Required</Label>
                        <div style={{ position: 'relative' }}>
                          <select
                            id="cf-service"
                            name="service"
                            required
                            defaultValue=""
                            aria-required="true"
                            aria-describedby="err-service"
                            onFocus={focus('service')}
                            onBlur={blur}
                            style={{ ...iStyle('service'), cursor: 'pointer', paddingRight: '36px' }}
                          >
                            <option value="" disabled>Select a service</option>
                            {SERVICES.map(o => (
                              <option key={o} value={o} style={{ background: '#0a1525' }}>{o}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--dim)', fontSize: '10px' }}>▼</span>
                        </div>
                        <ValidationError id="err-service" prefix="Service" field="service" errors={state.errors} className="cf-error" />
                      </FieldWrap>

                      <FieldWrap>
                        <Label htmlFor="cf-budget">Project Budget</Label>
                        <div style={{ position: 'relative' }}>
                          <select
                            id="cf-budget"
                            name="budget"
                            defaultValue=""
                            onFocus={focus('budget')}
                            onBlur={blur}
                            style={{ ...iStyle('budget'), cursor: 'pointer', paddingRight: '36px' }}
                          >
                            <option value="" disabled>Select budget range</option>
                            {BUDGETS.map(o => (
                              <option key={o} value={o} style={{ background: '#0a1525' }}>{o}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--dim)', fontSize: '10px' }}>▼</span>
                        </div>
                      </FieldWrap>
                    </div>

                    {/* Row 4 — Timeline (half width) */}
                    <div className="cf-row">
                      <FieldWrap>
                        <Label htmlFor="cf-timeline">Project Timeline</Label>
                        <div style={{ position: 'relative' }}>
                          <select
                            id="cf-timeline"
                            name="timeline"
                            defaultValue=""
                            onFocus={focus('timeline')}
                            onBlur={blur}
                            style={{ ...iStyle('timeline'), cursor: 'pointer', paddingRight: '36px' }}
                          >
                            <option value="" disabled>When do you want to start?</option>
                            {TIMELINES.map(o => (
                              <option key={o} value={o} style={{ background: '#0a1525' }}>{o}</option>
                            ))}
                          </select>
                          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--dim)', fontSize: '10px' }}>▼</span>
                        </div>
                      </FieldWrap>
                      {/* Empty cell keeps the grid consistent */}
                      <div />
                    </div>

                    {/* Message */}
                    <FieldWrap>
                      <Label htmlFor="cf-message" required>Project Description</Label>
                      <textarea
                        id="cf-message"
                        name="message"
                        required
                        rows={5}
                        aria-required="true"
                        aria-invalid={state.errors?.some?.(e => e.field === 'message') ? 'true' : undefined}
                        aria-describedby="err-message"
                        placeholder="Tell us about your project — what you want to build, your goals, timeline, and any specific requirements..."
                        onFocus={focus('message')}
                        onBlur={blur}
                        style={{ ...iStyle('message'), resize: 'vertical', minHeight: '120px' }}
                      />
                      <ValidationError id="err-message" prefix="Message" field="message" errors={state.errors} className="cf-error" />
                    </FieldWrap>

                    {/* General / network error */}
                    {hasGeneralError && (
                      <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        style={{ fontSize: '13px', color: '#f87171', padding: '12px 16px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px' }}
                      >
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href={`mailto:${SITE.email}`} style={{ color: 'var(--blue2)' }}>{SITE.email}</a>
                      </motion.p>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={state.submitting}
                      whileHover={!state.submitting ? { y: -3, boxShadow: '0 16px 50px rgba(26,111,232,0.55)' } : {}}
                      whileTap={!state.submitting ? { scale: .98 } : {}}
                      aria-label="Submit project inquiry"
                      style={{
                        background: state.submitting
                          ? 'rgba(26,111,232,0.3)'
                          : 'linear-gradient(135deg,var(--blue),var(--blue2))',
                        color: '#fff',
                        border: 'none',
                        padding: '15px 32px',
                        borderRadius: '10px',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: state.submitting ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-b)',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'background .3s',
                        marginTop: '4px',
                      }}
                    >
                      {state.submitting ? (
                        <>
                          <span className="cf-spinner" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        'Send Project Brief →'
                      )}
                    </motion.button>

                    <p style={{ textAlign: 'center', fontFamily: 'var(--font-m)', fontSize: '10px', color: 'var(--dim)', letterSpacing: '.08em', marginTop: '-4px' }}>
                      🔒 Your information is private and will never be shared.
                    </p>
                  </div>
                </form>
              </motion.div>

              {/* ════ RIGHT — Sidebar ════ */}
              <motion.aside
                aria-label="Consultation options and contact details"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .8, delay: .1, ease: [.22,1,.36,1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                <CalendlyCard />
                <ContactInfoCard />

                {/* Response promise */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px' }}>
                  <span
                    aria-hidden="true"
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)', flexShrink: 0, animation: 'pulse-live 2s ease infinite' }}
                  />
                  <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>
                    We respond to all project inquiries{' '}
                    <strong style={{ color: 'var(--text)' }}>within 24 hours</strong>{' '}
                    on business days.
                  </p>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
