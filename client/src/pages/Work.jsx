import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";

export default function Work() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const mainRef = useScrollReveal([items, filter]);

  useEffect(() => {
    api.projects().then((d) => setItems(d.projects || []));
  }, []);

  const cats = useMemo(() => ["All", ...new Set(items.map((p) => p.category))], [items]);
  const shown = filter === "All" ? items : items.filter((p) => p.category === filter);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Portfolio</div>
        <h1 className="reveal-up">Selected<br />work</h1>
        <p className="reveal-up">AI products, MERN platforms, mobile apps and studio redesigns.</p>
      </header>

      <section className="section wrap">
        {/* ── Filter ── */}
        <div className="tags reveal-up" style={{ justifyContent: "center", marginBottom: 44 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}>
              <i
                style={{
                  background: filter === c ? "var(--ink)" : "",
                  color: filter === c ? "var(--cream)" : "",
                  borderColor: filter === c ? "var(--ink)" : "",
                  cursor: "pointer",
                }}
              >
                {c}
              </i>
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="work-grid">
          {shown.map((p) => (
            <Link className="work-card reveal-up" key={p.slug} to={`/work/${p.slug}`}>
              <figure>
                <img src={p.image} alt={p.title} />
                <figcaption>
                  <small>
                    {p.year} · {p.category}
                  </small>
                  <h3>{p.title}</h3>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
