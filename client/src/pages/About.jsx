import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useScrollReveal, useStaggerReveal } from "../hooks/useAnimations.js";

export default function About() {
  const [data, setData] = useState(null);
  const [exp, setExp] = useState([]);
  const mainRef = useScrollReveal([data]);
  const processRef = useStaggerReveal(".stagger-item", [data]);

  useEffect(() => {
    api.profile().then(setData);
    api.experience().then((d) => setExp(d.experience || []));
  }, []);

  const p = data?.profile;

  return (
    <main ref={mainRef}>
      {/* ── Page Hero ── */}
      <header className="page-hero wrap">
        <div className="kicker reveal-up">About</div>
        <h1 className="reveal-up">Digital-first<br />engineer</h1>
        <p className="reveal-up">{p?.bioShort}</p>
      </header>

      {/* ── Bio ── */}
      <section className="section wrap-s">
        {(p?.about || []).map((t, i) => (
          <p key={i} className="reveal-up" style={{ fontSize: "1.2rem", lineHeight: 1.75, marginBottom: 24, color: "#2a2a2a" }}>
            {t}
          </p>
        ))}
        <div className="tags reveal-up" style={{ marginTop: 28 }}>
          {(p?.interests || []).map((i) => (
            <i key={i}>{i}</i>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section wrap" ref={processRef}>
        <h2 className="section-title reveal-up">How I work</h2>
        <p className="section-sub reveal-up">Decode · Discover · Derive · Deliver</p>
        <div className="process">
          {(data
            ? [
                ["01", "Decode", "Unpack the brief until the real problem is obvious. Every great product starts with the right questions."],
                ["02", "Discover", "Research, architecture planning, and choosing the right tech stack for speed of learning and shipping."],
                ["03", "Derive", "Interfaces, APIs and data models with tight feedback loops — building fast, iterating faster."],
                ["04", "Deliver", "Deployed, documented, then iterated until it's polished. Every pixel and endpoint is production-ready."],
              ]
            : []
          ).map(([step, title, text]) => (
            <article key={step} className="stagger-item">
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Current Focus ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">Current focus</h2>
        <div className="award-grid">
          {(p?.focus || []).map((f) => (
            <article className="award reveal-up" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <div className="tags">
                {f.tags.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Studio Leadership ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">Studio leadership</h2>
        <p className="section-sub reveal-up">One-person studio with the discipline of a team.</p>
        <div className="reveal-up" style={{
          background: "#fff",
          borderRadius: "var(--radius)",
          padding: "36px 32px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.06)",
        }}>
          <h3 style={{ fontFamily: "var(--syne)", fontSize: "1.5rem" }}>{p?.name}</h3>
          <h4 style={{ fontWeight: 500, margin: "6px 0 14px", color: "var(--muted)" }}>
            {p?.title} · {p?.location}
          </h4>
          <p style={{ lineHeight: 1.7, color: "#333" }}>
            {exp.length > 0 && (
              <>
                Latest seat: {exp[0]?.role} at {exp[0]?.company}.
                {exp[1] && <> Previously {exp[1]?.company}</>}
                {exp[2] && <>, {exp[2]?.company}</>}
                {exp[3] && <>, and {exp[3]?.company}</>}.
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
