import React, { useState, useRef, useEffect } from 'react';
import { CALENDLY_URL } from '../utils/siteData';

const MESSAGES = [
  { from: 'bot',  text: "Hello! I'm AI Axirova — your tech demo assistant. Ask me about our services, products, or pricing." },
  { from: 'user', text: "Tell me about your AI solutions." },
  { from: 'bot',  text: "We build AI assistants, computer vision systems, predictive analytics, and audio intelligence — integrated directly into your business workflows." },
  { from: 'user', text: "I'd like to schedule a demo." },
  { from: 'bot',  text: "Great choice! Book a free consultation via the button below, or use the WhatsApp button to connect with our team instantly. 🚀" },
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [open]);

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      zIndex: 9998, display: 'flex', flexDirection: 'column',
      alignItems: 'flex-end', gap: '12px',
    }}>
      {open && (
        <div style={{
          width: 'min(360px, calc(100vw - 48px))',
          height: '480px',
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(26,111,232,0.12)',
          animation: 'chatSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg,#1a6fe8 0%,#3b9eff 100%)',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
            flexShrink: 0,
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', flexShrink: 0, color: '#fff',
            }}>◈</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '14px', color: '#fff', lineHeight: 1.2 }}>
                AI Axirova
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.82)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f0b429', flexShrink: 0, display: 'inline-block' }} />
                Scripted Demo Preview
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px',
                width: '28px', height: '28px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '12px', flexShrink: 0,
              }}
            >✕</button>
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: '9px 14px', fontSize: '11px', lineHeight: 1.5, color: 'var(--dim)',
            background: 'var(--bg3)', borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}>
            This is a scripted preview, not a live AI session. For real answers, book a call or message us on WhatsApp below.
          </div>

          {/* Messages */}
          <div
            ref={bodyRef}
            style={{
              flex: 1, overflowY: 'auto', padding: '14px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(26,111,232,0.3) transparent',
            }}
          >
            {MESSAGES.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '84%', padding: '9px 13px',
                  borderRadius: msg.from === 'user' ? '14px 14px 3px 14px' : '14px 14px 14px 3px',
                  background: msg.from === 'user'
                    ? 'linear-gradient(135deg,#1a6fe8,#3b9eff)'
                    : 'var(--bg4)',
                  border: msg.from === 'user' ? 'none' : '1px solid var(--border)',
                  fontSize: '13px', lineHeight: 1.55, color: 'var(--text)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '10px 12px', borderTop: '1px solid var(--border)',
            background: 'var(--bg3)', flexShrink: 0,
            display: 'flex', gap: '8px', alignItems: 'center',
          }}>
            <div style={{
              flex: 1, background: 'var(--bg4)',
              border: '1px solid var(--border)', borderRadius: '10px',
              padding: '8px 12px', fontSize: '12px', color: 'var(--dim)',
              fontFamily: 'var(--font-b)', userSelect: 'none',
            }}>
              Preview only — not a live chat
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              title="Book a free consultation"
              style={{
                background: 'linear-gradient(135deg,#1a6fe8,#3b9eff)',
                borderRadius: '10px', width: '36px', height: '36px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '15px', textDecoration: 'none',
              }}
            >↗</a>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? 'Close demo preview' : 'View scripted demo preview'}
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: open
            ? 'var(--bg3)'
            : 'linear-gradient(135deg,#1a6fe8 0%,#3b9eff 100%)',
          border: '1px solid var(--border2)',
          cursor: 'pointer', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(26,111,232,0.4)',
          transition: 'all 0.25s var(--ease)',
          flexShrink: 0,
        }}
      >
        {open
          ? <span style={{ fontSize: '16px' }}>✕</span>
          : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      </button>
    </div>
  );
}
