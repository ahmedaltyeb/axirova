import React, { useId, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContent } from "../content";
import { services, products } from "../content/catalog";
import { createLeadSchema } from "../../shared/leadSchema";
export default function QuoteForm({ demo = false }) {
  const { c, lang, pick } = useContent();
  const id = useId();
  const submission = useRef(null);
  const [status, setStatus] = useState("");
  const [params] = useSearchParams();
  const selected = params.get("product");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createLeadSchema(c.form)),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      whatsapp: "",
      service:
        demo && products.some((p) => p.slug === selected) ? selected : "",
      budget: "",
      message: "",
      website: "",
      consent: false,
    },
  });
  const submit = async (values) => {
    setStatus("");
    try {
      const fingerprint = JSON.stringify({ ...values, lang, demo });
      if (submission.current?.fingerprint !== fingerprint)
        submission.current = { fingerprint, id: crypto.randomUUID() };
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          submissionId: submission.current.id,
          lang,
          type: demo ? "demo" : "project",
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("success");
      reset();
      submission.current = null;
    } catch {
      setStatus("error");
    }
  };
  const field = (name, type = "text", required = false) => (
    <div className="field" key={name}>
      <label htmlFor={id + name}>
        {c.form[name]} {required ? "*" : ""}
      </label>
      <input
        id={id + name}
        type={type}
        {...register(name)}
        autoComplete={
          {
            name: "name",
            company: "organization",
            email: "email",
            whatsapp: "tel",
          }[name]
        }
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? id + name + "-error" : undefined}
      />
      {errors[name] && (
        <span id={id + name + "-error"} className="error">
          {errors[name].message}
        </span>
      )}
    </div>
  );
  return (
    <form className="quote-form" onSubmit={handleSubmit(submit)} noValidate>
      <p className="form-note">{c.form.note}</p>
      <div className="form-grid">
        {field("name", "text", true)}
        {field("company", "text", true)}
        {field("email", "email")}
        {field("whatsapp", "tel")}
        <div className="field">
          <label htmlFor={id + "service"}>
            {demo ? c.nav.products : c.form.service} *
          </label>
          <select
            id={id + "service"}
            {...register("service")}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? id + "service-error" : undefined}
          >
            <option value="">{c.form.choose}</option>
            {(demo ? products : services).map((s) => (
              <option key={s.slug} value={s.slug}>
                {pick(s.title)}
              </option>
            ))}
          </select>
          {errors.service && (
            <span id={id + "service-error"} className="error">
              {errors.service.message}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor={id + "budget"}>{c.form.budget} *</label>
          <select
            id={id + "budget"}
            {...register("budget")}
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? id + "budget-error" : undefined}
          >
            <option value="">{c.form.choose}</option>
            {c.form.budgets.map((b, i) => (
              <option key={b} value={String(i)}>
                {b}
              </option>
            ))}
          </select>
          {errors.budget && (
            <span id={id + "budget-error"} className="error">
              {errors.budget.message}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor={id + "message"}>{c.form.message} *</label>
        <textarea
          id={id + "message"}
          rows="3"
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? id + "message-error" : undefined}
        />
        {errors.message && (
          <span id={id + "message-error"} className="error">
            {errors.message.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={id + "website"}>{c.form.website}</label>
        <input
          id={id + "website"}
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          {...register("consent")}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? id + "consent-error" : undefined}
        />
        <span>
          {c.form.consent} <Link to="/privacy">{c.form.privacy}</Link>
        </span>
      </label>
      {errors.consent && (
        <p id={id + "consent-error"} className="error">
          {errors.consent.message}
        </p>
      )}
      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? c.form.sending : c.form.send}
        <span aria-hidden>↗</span>
      </button>
      <div role="status" aria-live="polite">
        {status && (
          <p className={status === "error" ? "error" : "success"}>
            {c.form[status]}
          </p>
        )}
      </div>
    </form>
  );
}
