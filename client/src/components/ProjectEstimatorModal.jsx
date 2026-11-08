import { useState, useEffect } from "react";
import { profile, api } from "../lib/api.js";

const PROJECT_TYPES = [
  { id: "fullstack", title: "Full-Stack SaaS", icon: "💻", desc: "MERN / Next.js web application" },
  { id: "ai-agent", title: "Agentic AI / LLM", icon: "🤖", desc: "Autonomous AI workflows & APIs" },
  { id: "mobile", title: "Mobile App", icon: "📱", desc: "React Native iOS & Android app" },
  { id: "mvp", title: "High-Speed MVP", icon: "⚡", desc: "Sprint to market in 2–4 weeks" },
  { id: "redesign", title: "UI/UX & Engineering", icon: "✨", desc: "Pixel-perfect revamp & GSAP" },
];

const FEATURES_LIST = [
  "User Authentication & Roles",
  "Stripe / Payment Processing",
  "OpenAI / Custom AI Workflows",
  "Real-time Chat / WebSockets",
  "Admin Analytics Dashboard",
  "Database Architecture (Mongo/Postgres)",
  "Cloud CI/CD (Vercel/AWS/Render)",
  "SEO & Performance Optimization",
];

const BUDGET_RANGES = [
  "< $2,500 (Sprint MVP)",
  "$2,500 – $5,000 (Standard)",
  "$5,000 – $10,000 (Full Platform)",
  "$10,000+ (Enterprise / Retainer)",
];

export default function ProjectEstimatorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("fullstack");
  const [selectedFeatures, setSelectedFeatures] = useState(["User Authentication & Roles", "Database Architecture (Mongo/Postgres)"]);
  const [budget, setBudget] = useState("$2,500 – $5,000 (Standard)");
  const [timeline, setTimeline] = useState("2–4 Weeks");
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [autosavedTime, setAutosavedTime] = useState("");

  // Autosave onboarding state
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const stateToSave = { projectType, selectedFeatures, budget, timeline, clientInfo };
      localStorage.setItem("farooq_onboarding_draft", JSON.stringify(stateToSave));
      setAutosavedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [isOpen, projectType, selectedFeatures, budget, timeline, clientInfo]);

  // Restore onboarding draft if exists
  useEffect(() => {
    if (isOpen) {
      try {
        const saved = JSON.parse(localStorage.getItem("farooq_onboarding_draft"));
        if (saved) {
          if (saved.projectType) setProjectType(saved.projectType);
          if (saved.selectedFeatures) setSelectedFeatures(saved.selectedFeatures);
          if (saved.budget) setBudget(saved.budget);
          if (saved.timeline) setTimeline(saved.timeline);
          if (saved.clientInfo) setClientInfo(saved.clientInfo);
        }
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFeature = (feat) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email) {
      alert("Please provide your name and email so Farooq can send you the scoped proposal.");
      return;
    }
    setBusy(true);

    const payload = {
      name: clientInfo.name,
      email: clientInfo.email,
      subject: `Project Scope Intake: ${projectType.toUpperCase()} (${budget})`,
      message: `Project Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\nSelected Features: ${selectedFeatures.join(
        ", "
      )}\nClient Notes: ${clientInfo.notes || "None"}`,
    };

    try {
      await api.contact(payload);
    } catch (err) {
      console.warn("Estimator fallback:", err);
    }

    setBusy(false);
    setSubmitted(true);
    localStorage.removeItem("farooq_onboarding_draft");
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card estimator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-badge-info">
            <span>✨ Project Scope Estimator</span>
            {autosavedTime && <span className="autosave-tag">● Saved {autosavedTime}</span>}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>

        {!submitted ? (
          <>
            {/* Step Indicators */}
            <div className="estimator-steps">
              <div className={`step-dot ${step >= 1 ? "active" : ""}`}>1. Type</div>
              <div className="step-line" />
              <div className={`step-dot ${step >= 2 ? "active" : ""}`}>2. Features</div>
              <div className="step-line" />
              <div className={`step-dot ${step >= 3 ? "active" : ""}`}>3. Budget & Contact</div>
            </div>

            {/* Step 1: Project Type */}
            {step === 1 && (
              <div className="estimator-step-body">
                <h3 className="modal-title">What type of product are we building?</h3>
                <p className="modal-desc">Select the primary architecture of your initiative:</p>
                <div className="estimator-type-grid">
                  {PROJECT_TYPES.map((t) => (
                    <div
                      key={t.id}
                      className={`estimator-type-card ${projectType === t.id ? "selected" : ""}`}
                      onClick={() => setProjectType(t.id)}
                    >
                      <span className="type-icon">{t.icon}</span>
                      <h4>{t.title}</h4>
                      <p>{t.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="modal-actions" style={{ marginTop: "24px", justifyContent: "flex-end" }}>
                  <button className="btn-fill" onClick={() => setStep(2)}>
                    <span>Next: Select Features →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div className="estimator-step-body">
                <h3 className="modal-title">Select core capabilities</h3>
                <p className="modal-desc">Choose the modules needed for your platform:</p>
                <div className="features-checklist">
                  {FEATURES_LIST.map((feat) => {
                    const checked = selectedFeatures.includes(feat);
                    return (
                      <div
                        key={feat}
                        className={`feature-chip ${checked ? "active" : ""}`}
                        onClick={() => toggleFeature(feat)}
                      >
                        <span className="check-box">{checked ? "✓" : "+"}</span>
                        <span>{feat}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="modal-actions" style={{ marginTop: "24px", justifyContent: "space-between" }}>
                  <button className="btn-border" onClick={() => setStep(1)}>
                    <span>← Back</span>
                  </button>
                  <button className="btn-fill" onClick={() => setStep(3)}>
                    <span>Next: Timeline & Budget →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Budget */}
            {step === 3 && (
              <form className="estimator-step-body" onSubmit={handleFinish}>
                <h3 className="modal-title">Timeline & Estimated Budget</h3>
                <p className="modal-desc">Help align expectations for rapid onboarding:</p>

                <div className="budget-selection">
                  <label>Budget Tier:</label>
                  <div className="budget-grid">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`budget-btn ${budget === b ? "active" : ""}`}
                        onClick={() => setBudget(b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid" style={{ marginTop: "16px" }}>
                  <div className="field">
                    <label>Your Name *</label>
                    <input
                      required
                      placeholder="Alex Mercer"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Your Work Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="field full">
                    <label>Brief Vision / Notes (Optional)</label>
                    <textarea
                      rows="2"
                      placeholder="Any specific reference URLs, repositories, or deadline details..."
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-actions" style={{ marginTop: "20px", justifyContent: "space-between" }}>
                  <button type="button" className="btn-border" onClick={() => setStep(2)}>
                    <span>← Back</span>
                  </button>
                  <button type="submit" className="btn-fill" disabled={busy}>
                    <span>{busy ? "Submitting Scope…" : "Submit Scoped Request 🚀"}</span>
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="estimator-success">
            <div className="success-icon">🎉</div>
            <h3 className="modal-title">Scope Intake Received!</h3>
            <p className="modal-desc">
              Thank you, <strong>{clientInfo.name}</strong>. Farooq will review your {projectType.toUpperCase()} scope specifications and reply to <strong>{clientInfo.email}</strong> with an architecture breakdown and roadmap.
            </p>
            <div className="modal-actions" style={{ marginTop: "20px", justifyContent: "center" }}>
              <button
                className="btn-fill"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  onClose();
                }}
              >
                <span>Done &amp; Close</span>
              </button>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-border"
                style={{ background: "#10b981", color: "#fff", borderColor: "#10b981" }}
              >
                <span>Instant WhatsApp Ping 💬</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
