import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Magnetic from "../components/Magnetic.jsx";
import { api } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";

export default function WorkDetail() {
  const { slug } = useParams();
  const [pack, setPack] = useState("loading");
  const mainRef = useScrollReveal([pack]);

  useEffect(() => {
    setPack("loading");
    api.project(slug).then((d) => setPack(d || null));
  }, [slug]);

  if (pack === "loading") {
    return (
      <main className="page-hero">
        <h1 style={{ opacity: 0.3 }}>Loading...</h1>
      </main>
    );
  }

  if (!pack?.project) {
    return (
      <main className="page-hero">
        <h1>Not found</h1>
        <p style={{ marginTop: 16 }}>
          <Link className="btn-border" to="/work">
            Back to work <i>→</i>
          </Link>
        </p>
      </main>
    );
  }

  const p = pack.project;

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">{p.category}</div>
        <h1 className="reveal-up">{p.title}</h1>
        <p className="reveal-up">{p.summary}</p>
      </header>

      <section className="wrap project-hero">
        <div className="reveal-scale">
          <img src={p.image} alt={p.title} />
        </div>
        <div className="meta-row reveal-up">
          <div>Client <b>{p.client}</b></div>
          <div>Year <b>{p.year}</b></div>
          <div>Discipline <b>{p.category}</b></div>
        </div>
        <p className="reveal-up" style={{ fontSize: "1.15rem", lineHeight: 1.8, maxWidth: 820, color: "#333" }}>
          {p.description}
        </p>
        <div className="tags reveal-up" style={{ margin: "28px 0 36px" }}>
          {p.tags.map((t) => (
            <i key={t}>{t}</i>
          ))}
        </div>
        <div className="reveal-up" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {p.live && (
            <Magnetic>
              <a className="btn-fill" href={p.live} target="_blank" rel="noreferrer">
                Live site →
              </a>
            </Magnetic>
          )}
          {p.repo && (
            <Magnetic>
              <a className="btn-border" href={p.repo} target="_blank" rel="noreferrer">
                Repository <i>→</i>
              </a>
            </Magnetic>
          )}
        </div>
      </section>

      {/* ── Related Work ── */}
      {pack.related?.length > 0 && (
        <section className="section wrap">
          <h2 className="section-title reveal-up">More work</h2>
          <div className="work-grid" style={{ marginTop: 36 }}>
            {pack.related.map((r) => (
              <Link className="work-card reveal-up" key={r.slug} to={`/work/${r.slug}`}>
                <figure>
                  <img src={r.image} alt={r.title} />
                  <figcaption>
                    <small>{r.year} · {r.category}</small>
                    <h3>{r.title}</h3>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
