import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useScrollReveal, useStaggerReveal } from "../hooks/useAnimations.js";
import Magnetic from "../components/Magnetic.jsx";

const ENGAGEMENT_TIERS = [
  {
    id: "mvp",
    tier: "Tier 01",
    name: "High-Speed MVP Sprint",
    badge: "⚡ Fast Track",
    timeline: "2 – 3 Weeks",
    desc: "Rapid delivery of your core product prototype or minimum viable product to test market validation.",
    features: [
      "Full MERN or Next.js Architecture",
      "Essential Auth & Role Management",
      "Responsive UI & GSAP Micro-interactions",
      "Core Database Schema & REST API",
      "Automated Vercel / Render Deployment",
      "Complete Source Code & Documentation",
    ],
    cta: "Launch MVP",
  },
  {
    id: "saas",
    tier: "Tier 02",
    name: "Full-Stack SaaS Platform",
    badge: "⭐ Most Popular",
    popular: true,
    timeline: "4 – 6 Weeks",
    desc: "End-to-end web & cloud application with payment processing, analytics, and scalable data layers.",
    features: [
      "Production-Grade Next.js / React & Node.js",
      "Stripe / LemonSqueezy Payment Integration",
      "Interactive Admin Dashboard & Analytics",
      "Advanced Data Filtering, Search & Tables",
      "PostgreSQL / MongoDB with Indexing & Caching",
      "Comprehensive Testing, CI/CD & Error Monitoring",
      "14 Days Post-Launch Warranty & Support",
    ],
    cta: "Build SaaS Platform",
  },
  {
    id: "enterprise",
    tier: "Tier 03",
    name: "Agentic AI & Custom Architecture",
    badge: "🤖 Enterprise Grade",
    timeline: "6 – 10 Weeks / Retainer",
    desc: "Custom autonomous agent workflows, LLM pipelines, cross-platform mobile apps, and enterprise systems.",
    features: [
      "Custom LangChain, OpenAI & Python/FastAPI Services",
      "Autonomous Multi-Agent Task Orchestration",
      "Cross-Platform React Native (iOS & Android) Apps",
      "Real-Time WebSockets & Message Streaming",
      "Enterprise Access Control & Security Auditing",
      "Dedicated Slack / WhatsApp Communication Channel",
      "Monthly SLA Maintenance & Optimization",
    ],
    cta: "Scope Enterprise AI",
  },
];

export default function Services({ onOpenEstimator }) {
  const [pack, setPack] = useState(null);
  const mainRef = useScrollReveal([pack]);
  const processRef = useStaggerReveal(".stagger-item", [pack]);

  useEffect(() => {
    api.services().then(setPack);
  }, []);

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Services &amp; Engagement Models</div>
        <h1 className="reveal-up">What I can<br />help with</h1>
        <p className="reveal-up">
          From autonomous AI copilots to scalable MERN platforms and brand-grade interfaces — one engineer, full stack.
        </p>
      </header>

      {/* ── Tier-Based Engagement Models ── */}
      <section className="section wrap">
        <div className="tier-section-header reveal-up">
          <span className="pill">Engagement Models</span>
          <h2>Tier-Based Engineering Plans</h2>
          <p>Transparent milestones, predictable delivery, and production-grade software craftsmanship.</p>
        </div>

        <div className="tier-grid">
          {ENGAGEMENT_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`tier-card reveal-up ${tier.popular ? "tier-card-popular" : ""}`}
            >
              <div className="tier-top">
                <span className="tier-label">{tier.tier}</span>
                <span className={`tier-badge ${tier.popular ? "badge-popular" : ""}`}>
                  {tier.badge}
                </span>
              </div>

              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-desc">{tier.desc}</p>

              <div className="tier-meta-row">
                <span className="meta-timeline">⏱️ Timeline: <strong>{tier.timeline}</strong></span>
              </div>

              <div className="tier-divider" />

              <h4 className="tier-features-heading">Included Capabilities:</h4>
              <ul className="tier-features-list">
                {tier.features.map((feat) => (
                  <li key={feat}>
                    <span className="tier-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="tier-action">
                <Magnetic>
                  <Link
                    to="/contact"
                    className={tier.popular ? "btn-fill" : "btn-border"}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>{tier.cta} →</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          ))}
        </div>

        {/* Scope Estimator Banner */}
        <div className="estimator-banner reveal-up">
          <div className="estimator-banner-content">
            <h3>Need a custom scope or specific architecture?</h3>
            <p>Use our interactive 3-step project estimator to calculate timeline, features, and budget.</p>
          </div>
          {onOpenEstimator ? (
            <button className="btn-fill" onClick={onOpenEstimator}>
              <span>Launch Scope Estimator ⚡</span>
            </button>
          ) : (
            <Link to="/contact" className="btn-fill">
              <span>Request Custom Scoping →</span>
            </Link>
          )}
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">Technical Capabilities</h2>
        <p className="section-sub reveal-up">Core specializations across software, AI, and design.</p>
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
                <p>"{t.text}"</p>
                <div className="author">
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
