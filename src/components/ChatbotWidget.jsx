import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "../content";
import { assistantCopy } from "../content/assistant";
import { useLanguage } from "../context/LanguageContext";
const QuoteForm = lazy(() => import("./QuoteForm"));

export default function ChatbotWidget({ onClose }) {
  const { lang } = useContent();
  const { setLang } = useLanguage();
  const c = assistantCopy[lang];
  const { pathname } = useLocation();
  const dialog = useRef(null);
  const scroll = useRef(null);
  const controller = useRef(null);
  const input = useRef(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: c.welcome },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("guided");
  const [error, setError] = useState("");
  const [handoff, setHandoff] = useState(null);
  const [suggested, setSuggested] = useState("sales");
  useEffect(() => {
    if (!dialog.current?.open) dialog.current?.showModal();
    input.current?.focus();
    return () => controller.current?.abort();
  }, []);
  useEffect(() => {
    const abort = new AbortController();
    fetch("/api/assistant", { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.mode === "ai") setMode("ai");
      })
      .catch(() => {});
    return () => abort.abort();
  }, []);
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [messages, busy, handoff]);
  const send = async (text) => {
    const content = text.trim();
    if (!content || busy || content.length > 1800) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setError("");
    setBusy(true);
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 25000);
    try {
      const history = next
        .slice(-12)
        .map(({ role, content }) => ({ role, content }));
      while (
        history.length > 1 &&
        new TextEncoder().encode(
          JSON.stringify({ lang, path: pathname, messages: history }),
        ).length > 22000
      )
        history.shift();
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.current.signal,
        body: JSON.stringify({
          lang,
          path: pathname,
          messages: history,
        }),
      });
      if (!response.ok) {
        setError(response.status === 429 ? c.rate : c.error);
        return;
      }
      const data = await response.json();
      if (
        typeof data.reply !== "string" ||
        !["ai", "guided"].includes(data.mode)
      )
        throw new Error("Invalid reply");
      setMode(data.mode);
      setSuggested(data.intent);
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
          links: Array.isArray(data.links) ? data.links : [],
        },
      ]);
    } catch {
      setError(c.error);
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      input.current?.focus();
    }
  };
  const reset = () => {
    controller.current?.abort();
    setMessages([{ role: "assistant", content: c.welcome }]);
    setDraft("");
    setError("");
    setSuggested("sales");
    setHandoff(null);
  };
  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";
  return (
    <dialog
      ref={dialog}
      className="assistant-dialog"
      dir={lang === "ar" ? "rtl" : "ltr"}
      aria-labelledby="assistant-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <header className="assistant-header">
        <div>
          <h2 id="assistant-title">{c.title}</h2>
          <span className="assistant-mode">
            {mode === "ai" ? c.ai : c.guided}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="assistant-language"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            lang={lang === "en" ? "ar" : "en"}
            aria-label={c.switchLanguage}
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={reset}
            aria-label={c.reset}
            title={c.reset}
          >
            ↻
          </button>
          <button type="button" onClick={onClose} aria-label={c.close}>
            ×
          </button>
        </div>
      </header>
      <div className="assistant-body" ref={scroll}>
        <p className="assistant-privacy">
          {c.privacy}{" "}
          <Link to="/privacy" onClick={onClose}>
            {c.privacyLink}
          </Link>
        </p>
        {mode === "guided" && (
          <p className="assistant-guided">{c.guidedNotice}</p>
        )}
        {handoff ? (
          <div className="assistant-handoff">
            <button
              type="button"
              className="text-link"
              onClick={() => setHandoff(null)}
            >
              ← {c.back}
            </button>
            <h3>{c[handoff === "quotation" ? "quote" : handoff]}</h3>
            <p>
              {
                c[
                  handoff === "quotation"
                    ? "quoteNote"
                    : handoff === "support"
                      ? "supportNote"
                      : "leadNote"
                ]
              }
            </p>
            <Suspense fallback={<p role="status">{c.busy}</p>}>
              <QuoteForm
                key={handoff}
                intent={handoff}
                initialMessage={lastUser}
              />
            </Suspense>
          </div>
        ) : (
          <>
            <ol
              className="assistant-messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label={c.title}
            >
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`assistant-message assistant-message--${message.role}`}
                >
                  <p dir="auto">{message.content}</p>
                  {message.links?.length > 0 && (
                    <nav aria-label={c.sources}>
                      {message.links
                        .filter(
                          (l) =>
                            typeof l.to === "string" &&
                            l.to.startsWith("/") &&
                            !l.to.startsWith("//"),
                        )
                        .map((link) => (
                          <Link key={link.to} to={link.to} onClick={onClose}>
                            {link.label} ↗
                          </Link>
                        ))}
                    </nav>
                  )}
                </li>
              ))}
            </ol>
            {busy && (
              <p role="status" className="assistant-busy">
                {c.busy}
              </p>
            )}
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <div className="assistant-starters">
              {c.starters.map((label, i) => (
                <button
                  type="button"
                  key={label}
                  disabled={busy}
                  onClick={() => send(c.prompts[i])}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {!handoff && (
        <footer className="assistant-controls">
          <div className="assistant-actions">
            {["quotation", "support", "lead"].map((intent) => (
              <button
                type="button"
                key={intent}
                className={suggested === intent ? "is-suggested" : ""}
                disabled={busy}
                onClick={() => setHandoff(intent)}
              >
                {c[intent === "quotation" ? "quote" : intent]}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
            className="assistant-composer"
          >
            <label className="sr-only" htmlFor="assistant-message">
              {c.replyLabel}
            </label>
            <textarea
              id="assistant-message"
              ref={input}
              maxLength={1800}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows="2"
              placeholder={c.placeholder}
              disabled={busy}
            />
            <button
              className="button"
              type="submit"
              disabled={busy || !draft.trim()}
            >
              {c.send}
            </button>
          </form>
          <Link className="assistant-direct" to="/contact" onClick={onClose}>
            {c.direct} ↗
          </Link>
        </footer>
      )}
    </dialog>
  );
}
