import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
      return;
    }

    const onMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const onDown = () => document.body.classList.add('clicking');
    const onUp = () => document.body.classList.remove('clicking');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    // Hover targets
    const addHover = () => {
      document.querySelectorAll('button, a, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
      });
    };
    addHover();
    const mo = new MutationObserver(addHover);
    mo.observe(document.body, { childList: true, subtree: true });

    // Lerp ring
    const lerpRing = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = Math.round(rx.current) + 'px';
        ringRef.current.style.top = Math.round(ry.current) + 'px';
      }
      rafRef.current = requestAnimationFrame(lerpRing);
    };
    rafRef.current = requestAnimationFrame(lerpRing);

    // Scroll progress bar
    const bar = document.getElementById('scroll-bar');
    const onScroll = () => {
      if (bar) {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = p + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-bar" />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          background: 'var(--blue2)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width .15s, height .15s, background .2s',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1.5px solid rgba(59,158,255,0.45)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), border-color .3s',
        }}
      />
      <style>{`
        body.hovering #cursor-dot,
        body.hovering [data-cursor-dot] { width: 10px !important; height: 10px !important; background: var(--emerald2) !important; }
        body.hovering [data-cursor-ring] { width: 60px !important; height: 60px !important; border-color: rgba(0,240,181,0.5) !important; }
        body.clicking [data-cursor-dot] { transform: translate(-50%,-50%) scale(.6) !important; }
      `}</style>
    </>
  );
}
