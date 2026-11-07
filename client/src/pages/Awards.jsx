import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useScrollReveal, useStaggerReveal } from "../hooks/useAnimations.js";

export default function Awards() {
  const [list, setList] = useState([]);
  const mainRef = useScrollReveal([list]);
  const gridRef = useStaggerReveal(".stagger-item", [list]);

  useEffect(() => {
    api.awards().then((d) => setList(d.awards || []));
  }, []);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Recognition</div>
        <h1 className="reveal-up">Awards &<br />honors</h1>
        <p className="reveal-up">Hackathons, contests, and the long game on LeetCode.</p>
      </header>

      <section className="section wrap" ref={gridRef}>
        <div className="award-grid">
          {list.map((a) => (
            <article className="award stagger-item" key={a.title}>
              <em>{a.year}</em>
              <h3>{a.title}</h3>
              <p>
                {a.org}
                <br />
                {a.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
