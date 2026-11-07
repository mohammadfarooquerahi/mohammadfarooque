import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";

export default function Journey() {
  const [pack, setPack] = useState(null);
  const mainRef = useScrollReveal([pack]);

  useEffect(() => {
    api.experience().then(setPack);
  }, []);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Journey</div>
        <h1 className="reveal-up">Experience<br />& study</h1>
        <p className="reveal-up">From internship to AI engineering — teaching, shipping, and competing along the way.</p>
      </header>

      {/* ── Timeline ── */}
      <section className="section wrap">
        <div className="timeline">
          {(pack?.experience || []).map((j) => (
            <article className="job reveal-up" key={j.company}>
              <div className="when">
                {j.period}
                <div style={{ marginTop: 8 }}>{j.location}</div>
                <div className="tags" style={{ marginTop: 12 }}>
                  <i>{j.type}</i>
                </div>
              </div>
              <div>
                <h3>{j.role}</h3>
                <h4>{j.company}</h4>
                <ul>
                  {j.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tags">
                  {j.tags.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">Education</h2>
        <p className="section-sub reveal-up">Academic foundation and continuous learning.</p>
        <div className="award-grid">
          {(pack?.education || []).map((e) => (
            <article className="award reveal-up" key={e.title}>
              <em>{e.period}</em>
              <h3>{e.title}</h3>
              <p>{e.place}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
