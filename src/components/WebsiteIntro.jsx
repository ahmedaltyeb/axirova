import React, { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";
import { useContent } from "../content";

export default function WebsiteIntro({ children }) {
  const { lang } = useContent();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timeout);
  }, []);
  return (
    <>
      {loading && (
        <div
          className="website-intro"
          role="status"
          aria-live="polite"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="website-intro-content">
            <div className="website-intro-mark">
              <BrandLogo height={64} />
            </div>
            <div className="website-intro-line" aria-hidden="true">
              <span />
            </div>
            <p>{lang === "ar" ? "جارٍ التحميل…" : "Loading…"}</p>
          </div>
        </div>
      )}
      <div style={loading ? { display: "none" } : undefined}>{children}</div>
    </>
  );
}
