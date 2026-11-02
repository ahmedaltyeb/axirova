import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../content";
import SEO from "../components/SEO";
export default function Calculator() {
  const { c } = useContent();
  const [answers, setAnswers] = useState([null, null, null, null]);
  const complete = answers.every((a) => a !== null);
  const score = answers[0] + answers[1] + answers[2];
  const tier = score >= 5 ? 2 : score >= 2 ? 1 : 0;
  return (
    <>
      <SEO title={c.estimator.title} description={c.estimator.intro} />
      <div className="page-intro shell">
        <span className="eyebrow">AXIROVA /</span>
        <h1>{c.estimator.title}</h1>
        <p>{c.estimator.intro}</p>
      </div>
      <div className="shell section estimator-grid">
        <div>
          {c.estimator.questions.map((q, i) => (
            <fieldset className="estimator-question" key={q}>
              <legend>
                <span>0{i + 1}</span>
                {q}
              </legend>
              {c.estimator.options[i].map((option, j) => (
                <label
                  className={answers[i] === j ? "selected" : ""}
                  key={option}
                >
                  <input
                    type="radio"
                    name={`question-${i}`}
                    checked={answers[i] === j}
                    onChange={() =>
                      setAnswers((previous) =>
                        previous.map((a, k) => (k === i ? j : a)),
                      )
                    }
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <aside className="estimator-result" aria-live="polite">
          <span className="eyebrow">{c.estimator.result}</span>
          <h2>{complete ? c.pricing.tiers[tier] : "—"}</h2>
          <p>{c.estimator.note}</p>
          {complete && (
            <>
              <p>{c.pricing.desc[tier]}</p>
              <Link className="button" to="/contact">
                {c.estimator.continue} ↗
              </Link>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
