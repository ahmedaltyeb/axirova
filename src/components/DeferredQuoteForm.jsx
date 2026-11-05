import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useContent } from "../content";

const QuoteForm = lazy(() => import("./QuoteForm"));
export default function DeferredQuoteForm() {
  const { lang } = useContent();
  const container = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const preview = (
    <div className="form-preview">
      <div className="form-preview-fields" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <button
        type="button"
        className="button"
        onClick={() => setActive(true)}
        disabled={active}
        aria-busy={active}
      >
        {lang === "ar" ? "افتح نموذج الاستفسار" : "Open enquiry form"}
      </button>
    </div>
  );
  return (
    <div ref={container} className="deferred-form">
      <Suspense fallback={preview}>{active ? <QuoteForm /> : preview}</Suspense>
    </div>
  );
}
