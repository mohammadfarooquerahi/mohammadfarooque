import { useState, useMemo } from "react";
import Magnetic from "../components/Magnetic.jsx";
import { profile, api } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";

export default function Referral() {
  const [projectValue, setProjectValue] = useState(6000);
  const [partnerForm, setPartnerForm] = useState({ name: "", email: "", clientName: "", clientEmail: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [partnerCode, setPartnerCode] = useState("FAROOQ-PARTNER");
  const [copied, setCopied] = useState(false);

  const mainRef = useScrollReveal([]);

  // Calculate commission (15% for projects > $5000, 10% below)
  const commissionRate = projectValue >= 5000 ? 0.15 : 0.10;
  const estimatedPayout = useMemo(() => {
    return Math.round(projectValue * commissionRate);
  }, [projectValue, commissionRate]);

  const handleCopyLink = () => {
    const link = `https://www.mohammadfarooque.online/?ref=${encodeURIComponent(partnerCode)}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReferral = async (e) => {
    e.preventDefault();
    setBusy(true);

    const payload = {
      name: partnerForm.name,
      email: partnerForm.email,
      subject: `Affiliate / Referral Introduction: ${partnerForm.clientName}`,
      message: `Partner: ${partnerForm.name} (${partnerForm.email})\nReferral Code: ${partnerCode}\nReferred Client: ${partnerForm.clientName} (${partnerForm.clientEmail})\nNotes: ${partnerForm.notes || "None"}`,
    };

    try {
      await api.contact(payload);
    } catch {}

    setBusy(false);
    setSubmitted(true);
  };

  return (
    <main ref={mainRef}>
      {/* ── Hero ── */}
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Affiliate &amp; Partner Program</div>
        <h1 className="reveal-up">
          Partner with Farooq.<br />Earn up to 15%.
        </h1>
        <p className="reveal-up">
          Introduce businesses, startups, and founders needing high-performance full-stack web, mobile, or AI engineering. Earn instant payouts on every contract closed.
        </p>
      </header>

      {/* ── Interactive Commission Calculator ── */}
      <section className="section wrap">
        <div className="referral-calc-card reveal-up">
          <div className="calc-header">
            <span className="calc-badge">Interactive Payout Estimator</span>
            <h2>Estimate Your Referral Earnings</h2>
            <p>Drag the slider to preview your commission based on typical project scopes.</p>
          </div>

          <div className="calc-slider-block">
            <div className="calc-val-row">
              <span>Client Project Value:</span>
              <strong className="calc-big-val">${projectValue.toLocaleString()}</strong>
            </div>

            <input
              type="range"
              min="1500"
              max="25000"
              step="500"
              value={projectValue}
              onChange={(e) => setProjectValue(Number(e.target.value))}
              className="calc-range-slider"
              aria-label="Adjust project value"
            />

            <div className="calc-slider-labels">
              <span>$1,500 (MVP)</span>
              <span>$10,000 (SaaS)</span>
              <span>$25,000+ (Enterprise)</span>
            </div>
          </div>

          <div className="calc-result-box">
            <div className="result-item">
              <span>Commission Tier</span>
              <strong>{(commissionRate * 100).toFixed(0)}% Net</strong>
            </div>
            <div className="result-divider" />
            <div className="result-item highlight">
              <span>Your Estimated Payout</span>
              <strong className="payout-amount">${estimatedPayout.toLocaleString()} USD</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Steps ── */}
      <section className="section wrap">
        <h2 className="section-title reveal-up">How the Partnership Works</h2>
        <p className="section-sub reveal-up">Transparent, zero-friction, and backed by direct contracts.</p>

        <div className="referral-steps-grid">
          <div className="ref-step-card reveal-up">
            <span className="step-num">01</span>
            <h3>Generate or Submit</h3>
            <p>
              Use your customized partner link or directly submit your client's contact information below.
            </p>
          </div>
          <div className="ref-step-card reveal-up">
            <span className="step-num">02</span>
            <h3>We Close &amp; Build</h3>
            <p>
              Farooq conducts the discovery call, designs the architecture, scopes the milestone, and signs the agreement.
            </p>
          </div>
          <div className="ref-step-card reveal-up">
            <span className="step-num">03</span>
            <h3>Get Paid Instantly</h3>
            <p>
              Upon client deposit and milestone kick-off, your 10%–15% commission is remitted immediately via Bank Transfer, Wise, or Crypto.
            </p>
          </div>
        </div>
      </section>

      {/* ── Partner Link Generator & Submission Form ── */}
      <section className="section wrap">
        <div className="referral-form-grid">
          {/* Quick Link Card */}
          <div className="ref-link-card reveal-left">
            <h3>Your Unique Partner Link</h3>
            <p>Share this link across your network, newsletters, LinkedIn, or developer groups:</p>

            <div className="ref-code-input-group">
              <label>Partner Code:</label>
              <input
                value={partnerCode}
                onChange={(e) => setPartnerCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
                placeholder="YOUR-CODE"
              />
            </div>

            <div className="ref-share-box">
              <code>https://www.mohammadfarooque.online/?ref={partnerCode}</code>
              <button className="btn-copy" onClick={handleCopyLink}>
                {copied ? "Copied! ✓" : "Copy Link 📋"}
              </button>
            </div>

            <div className="ref-perks">
              <h4>Partner Advantages:</h4>
              <ul>
                <li>✓ Direct WhatsApp access to Mohammad Farooq</li>
                <li>✓ 90-day cookie / referral attribution window</li>
                <li>✓ High closing rate on vetted SaaS &amp; AI briefs</li>
                <li>✓ Recurring commission on long-term client retainers</li>
              </ul>
            </div>
          </div>

          {/* Submission Form */}
          <div className="ref-submit-card reveal-right">
            <h3>Direct Client Referral Submission</h3>
            <p>Have an immediate client opportunity? Introduce them directly here:</p>

            {!submitted ? (
              <form onSubmit={handleSubmitReferral} className="form-grid" style={{ marginTop: "16px" }}>
                <div className="field">
                  <label>Your Name *</label>
                  <input
                    required
                    placeholder="Your full name"
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Your Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="partner@domain.com"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Client / Company Name *</label>
                  <input
                    required
                    placeholder="Startup or Founder Name"
                    value={partnerForm.clientName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, clientName: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Client Email or LinkedIn *</label>
                  <input
                    required
                    placeholder="client@company.com"
                    value={partnerForm.clientEmail}
                    onChange={(e) => setPartnerForm({ ...partnerForm, clientEmail: e.target.value })}
                  />
                </div>
                <div className="field full">
                  <label>Project Scope Overview (Optional)</label>
                  <textarea
                    rows="3"
                    placeholder="What are they looking to build? (e.g. AI platform, MERN SaaS, Mobile App...)"
                    value={partnerForm.notes}
                    onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                  />
                </div>
                <div className="field full">
                  <Magnetic>
                    <button className="submit" type="submit" disabled={busy}>
                      {busy ? "Registering Referral…" : "Submit Referral & Lock Commission 🚀"}
                    </button>
                  </Magnetic>
                </div>
              </form>
            ) : (
              <div className="estimator-success" style={{ padding: "30px 10px" }}>
                <div className="success-icon">🤝</div>
                <h3>Referral Successfully Registered!</h3>
                <p>
                  Thank you, <strong>{partnerForm.name}</strong>. Farooq has received your introduction for <strong>{partnerForm.clientName}</strong> and will follow up with you directly at <strong>{partnerForm.email}</strong>.
                </p>
                <button className="btn-border" onClick={() => setSubmitted(false)} style={{ marginTop: "16px" }}>
                  <span>Submit Another Referral</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
