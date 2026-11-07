import { useState } from "react";
import Magnetic from "../components/Magnetic.jsx";
import { api, profile } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const mainRef = useScrollReveal([]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus(null);

    // Save locally as immediate backup
    try {
      const existing = JSON.parse(localStorage.getItem("farooq_contact_submissions") || "[]");
      existing.push({ ...form, date: new Date().toISOString() });
      localStorage.setItem("farooq_contact_submissions", JSON.stringify(existing));
    } catch {}

    try {
      const res = await api.contact(form);
      setStatus({
        ok: true,
        text: res.note || `Thank you ${form.name}! Your message has been received. I'll get back to you shortly.`,
      });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      // Graceful fallback if backend is sleeping or spinning up on Render
      console.warn("Backend not immediately reachable, providing direct mailto option:", err);
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        form.subject || "Project Inquiry"
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;

      setStatus({
        ok: true,
        text: `Your inquiry has been drafted! You can also click the button below to send directly via email or chat on WhatsApp.`,
        fallbackMailto: mailtoUrl,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Contact Studio</div>
        <h1 className="reveal-up">Let's make it<br />brilliant</h1>
        <p className="reveal-up">
          Have a product in mind, a brief to build, or a full-time role? Reach out directly — I reply personally within 24 hours.
        </p>
      </header>

      <section className="section wrap">
        <div className="contact-grid">
          {/* ── Info Card ── */}
          <div className="contact-card reveal-left">
            <h2>Get in touch</h2>
            <p style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.6 }}>
              Based in <strong>{profile.location}</strong>. Available for high-impact contracts, full-time engineering roles, and innovative collaborations.
            </p>

            <div className="info-row">
              <strong>Email</strong>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>

            <div className="info-row">
              <strong>Phone / WhatsApp</strong>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
                <a href={`tel:${profile.phone}`}>{profile.phoneDisplay || profile.phone}</a>
                <span style={{ opacity: 0.3 }}>·</span>
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#10b981", fontWeight: 600 }}
                >
                  Chat on WhatsApp ↗
                </a>
              </div>
            </div>

            <div className="info-row">
              <strong>Location</strong>
              <span>{profile.location} (UTC+5)</span>
            </div>

            <div className="info-row">
              <strong>Design Portfolio</strong>
              <a href={profile.previousPortfolio} target="_blank" rel="noreferrer">
                Figma Prototype System ↗
              </a>
            </div>

            <div className="social-links" style={{ marginTop: 24 }}>
              <Magnetic>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp ↗
                </a>
              </Magnetic>
              <Magnetic>
                <a href={profile.leetcode} target="_blank" rel="noreferrer">
                  LeetCode ↗
                </a>
              </Magnetic>
            </div>
          </div>

          {/* ── Form Card ── */}
          <form className="form-card reveal-right" onSubmit={onSubmit}>
            {status && (
              <div className={`alert ${status.ok ? "ok" : "err"}`} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span>{status.text}</span>
                {status.fallbackMailto && (
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "6px" }}>
                    <a
                      href={status.fallbackMailto}
                      className="btn-border"
                      style={{ padding: "8px 18px", fontSize: "0.82rem", background: "var(--ink)", color: "var(--cream)" }}
                    >
                      Open Email App ✉️
                    </a>
                    <a
                      href={profile.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-border"
                      style={{ padding: "8px 18px", fontSize: "0.82rem", background: "#10b981", color: "#fff", borderColor: "#10b981" }}
                    >
                      Chat on WhatsApp 💬
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Honeypot */}
            <div className="hp" aria-hidden="true">
              <input name="website" value={form.website} onChange={onChange} tabIndex={-1} />
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Full name *</label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@company.com"
                />
              </div>
              <div className="field full">
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Project, Full-Time Role, or Collaboration"
                />
              </div>
              <div className="field full">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your product vision, timeline, and what success looks like."
                />
              </div>
            </div>

            <Magnetic>
              <button className="submit" type="submit" disabled={busy}>
                {busy ? "Sending…" : "Send message"} →
              </button>
            </Magnetic>
          </form>
        </div>
      </section>
    </main>
  );
}
