import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useScrollReveal, useStaggerReveal } from "../hooks/useAnimations.js";

export default function Expertise() {
  const [pack, setPack] = useState(null);
  const [profile, setProfile] = useState(null);
  const mainRef = useScrollReveal([pack]);
  const gridRef = useStaggerReveal(".stagger-item", [pack]);

  useEffect(() => {
    api.services().then(setPack);
    api.profile().then((d) => setProfile(d.profile));
  }, []);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Expertise</div>
        <h1 className="reveal-up">Stack &<br />studio skills</h1>
        <p className="reveal-up">{profile?.headline}</p>
      </header>

      {/* ── Skills Grid ── */}
      <section className="section wrap" ref={gridRef}>
        <div className="award-grid">
          {(pack?.services || []).map((s) => (
            <article className="award stagger-item" key={s.slug}>
              <em>{s.kicker}</em>
              <h3>{s.title}</h3>
              <p>{s.details}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <div className="clients">
        <div className="track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>
              React · Node.js · MongoDB · Next.js · TypeScript · React Native · Python · FastAPI · AWS · Docker · Firebase ·
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
