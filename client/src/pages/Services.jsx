import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useScrollReveal, useStaggerReveal } from "../hooks/useAnimations.js";

export default function Services() {
  const [pack, setPack] = useState(null);
  const mainRef = useScrollReveal([pack]);
  const processRef = useStaggerReveal(".stagger-item", [pack]);

  useEffect(() => {
    api.services().then(setPack);
  }, []);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Services</div>
        <h1 className="reveal-up">What I can<br />help with</h1>
        <p className="reveal-up">From AI copilots to MERN platforms and brand-grade interfaces — one engineer, full stack.</p>
      </header>

      {/* ── Services List ── */}
      <section className="section wrap">
        <div className="svc-list">
          {(pack?.services || []).map((s) => (
            <article className="svc-item reveal-up" key={s.slug}>
              <div className="k">{s.kicker}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </div>
              <div>
                <p>{s.details}</p>
                <div className="tags">
                  {s.tags.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section wrap" ref={processRef}>
        <h2 className="section-title reveal-up">Process</h2>
        <p className="section-sub reveal-up">My systematic approach to delivering quality.</p>
        <div className="process">
          {(pack?.process || []).map((p) => (
            <article key={p.step} className="stagger-item">
              <span>{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      {pack?.testimonials?.length > 0 && (
        <section className="section wrap">
          <h2 className="section-title reveal-up">What people say</h2>
          <p className="section-sub reveal-up">Feedback from clients and collaborators.</p>
          <div className="testimonial-grid">
            {pack.testimonials.map((t, i) => (
              <div className="testimonial-card reveal-up" key={i}>
                <p>{t.text}</p>
                <div className="author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
