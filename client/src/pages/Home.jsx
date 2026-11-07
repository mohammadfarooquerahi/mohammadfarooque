import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../components/Magnetic.jsx";
import { useScrollReveal, useCounterAnimation } from "../hooks/useAnimations.js";
import { api } from "../lib/api.js";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [data, setData] = useState(null);
  const [work, setWork] = useState([]);
  const [svc, setSvc] = useState([]);
  const heroRef = useRef(null);
  const mainRef = useScrollReveal([data, work]);
  const countersRef = useCounterAnimation([data]);

  useEffect(() => {
    api.profile().then(setData);
    api.projects().then((d) => setWork((d.projects || []).filter((p) => p.featured)));
    api.services().then((d) => setSvc(d.marqueeServices || []));
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.5 })
        .fromTo(".hero-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=0.6")
        .fromTo(".hero-row", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(
          ".float-card",
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.4"
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const profile = data?.profile;
  const stats = data?.stats || [];
  const imgs = (work.length ? work : []).slice(0, 6);

  return (
    <main ref={(el) => { heroRef.current = el; if (mainRef.current !== el) mainRef.current = el; }}>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="wrap">
          <p className="hero-sub">
            I'm a digital-first engineer who
            <br />
            decodes, discovers, derives and delivers
          </p>
          <h1 className="hero-title">
            <span className="accent">FAR</span>OOQ
          </h1>
          <div className="hero-row">
            <Magnetic>
              <Link className="btn-border" to="/work">
                Explore my projects
                <i>→</i>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link className="btn-fill" to="/contact">
                Let's talk
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="wrap-s hero-float">
          <div className="float-row">
            <div className="float-card">
              <img src={imgs[0]?.image} alt={imgs[0]?.title || "Featured Work"} />
            </div>
          </div>
          <div className="float-row right">
            <div className="float-card sm">
              <img src={imgs[1]?.image} alt={imgs[1]?.title || "Featured Work"} />
            </div>
          </div>
          <div className="float-row">
            <div className="float-card">
              <img src={imgs[2]?.image} alt={imgs[2]?.title || "Featured Work"} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tag Marquee ── */}
      <div className="tag-marquee">
        <div className="tag-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              Strategy <span className="dot" /> Design <span className="dot" /> Engineering
            </div>
          ))}
        </div>
        <div className="tag-track reverse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              MERN <span className="dot" /> AI <span className="dot" /> Growth
            </div>
          ))}
        </div>
      </div>

      {/* ── About Blurb ── */}
      <section className="about-blurb wrap-s">
        <p className="reveal-up">
          {profile?.about?.[1] ||
            "With a deep commitment to quality and performance, I approach every project from strategy to deployment — designing interfaces that look stunning, writing backends that scale, and shipping products that actually work."}
        </p>
        <div className="reveal-up">
          <Magnetic>
            <Link className="btn-border" to="/about">
              More about me <i>→</i>
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ── Services Marquee ── */}
      <section className="section" id="services">
        <h2 className="section-title reveal-up">We can help you with</h2>
        <p className="section-sub reveal-up">Product craft across AI, web, mobile and performance.</p>
        {(svc.length ? svc : ["AI Solutions", "Full Stack Development", "Web & App Development"]).map((s, i) => (
          <div className="help-row" key={s}>
            <div className="help-inner">
              {Array.from({ length: 8 }).map((_, n) => (
                <span key={n}>
                  <b className={["b-red", "b-cyan", "b-yellow", "b-indigo", "b-ink"][i % 5]} /> {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Numbers / Stats ── */}
      <section className="section wrap" ref={countersRef}>
        <div className="numbers">
          <div>
            <span className="pill reveal-up">Fun facts</span>
            <h2 className="reveal-up">Numbers that speak volumes</h2>
            <p className="reveal-up">
              Curious mind, competitive programmer, and builder. I turn briefs into shipped products with obsessive
              attention to detail — work that looks good and performs.
            </p>
          </div>
          <div className="counters">
            {stats.map((s) => (
              <div className="counter" key={s.label}>
                <strong data-count={s.value} data-suffix={s.suffix}>
                  0{s.suffix}
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <div className="clients">
        <div className="track">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>React · Node.js · MongoDB · Next.js · React Native · FastAPI · AWS · TypeScript · OpenAI ·</span>
          ))}
        </div>
      </div>

      {/* ── Selected Work ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">Selected work</h2>
        <p className="section-sub reveal-up">Products, redesigns and hackathon builds from 2023–2025.</p>
        <div className="work-grid">
          {work.slice(0, 6).map((p, i) => (
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
        <div style={{ textAlign: "center", marginTop: 44 }} className="reveal-up">
          <Magnetic>
            <Link className="btn-border" to="/work">
              View all work <i>→</i>
            </Link>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}
