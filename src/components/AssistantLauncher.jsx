import React, { lazy, Suspense, useRef, useState } from "react";
import { useContent } from "../content";
import { assistantCopy } from "../content/assistant";
const ChatbotWidget = lazy(() => import("./ChatbotWidget"));

export default function AssistantLauncher() {
  const { lang } = useContent();
  const c = assistantCopy[lang];
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => button.current?.focus());
  };
  return (
    <>
      <button
        type="button"
        ref={button}
        className="assistant-launcher"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden>✦</span>
        <span>{c.launcher}</span>
      </button>
      {open && (
        <Suspense
          fallback={
            <div className="assistant-loading" role="status">
              {c.busy}
            </div>
          }
        >
          <ChatbotWidget key={lang} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
