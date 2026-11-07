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
    try {
      const res = await api.contact(form);
      setStatus({ ok: true, text: res.note || "Message sent — I'll reply soon!" });
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err) {
      const msg = err.response?.data?.error || "Could not send. Email me directly instead.";
      setStatus({ ok: false, text: msg });
    } finally {
      setBusy(false);
    }
  };

  return (
    <main ref={mainRef}>
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Contact</div>
        <h1 className="reveal-up">Let's make it<br />brilliant</h1>
        <p className="reveal-up">Have a product, a brief, or a role? Write me — I reply personally.</p>
      </header>

      <section className="section wrap">
        <div className="contact-grid">
          {/* ── Info Card ── */}
          <div className="contact-card reveal-left">
            <h2>Get in touch</h2>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Based in {profile.location}. Available for freelance, full-time roles, and creative collaborations.
            </p>

            <div className="info-row">
              <strong>Email</strong>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>

            <div className="info-row">
              <strong>Location</strong>
              <span>{profile.location}</span>
            </div>

            <div className="info-row">
              <strong>Previous Portfolio</strong>
              <a href={profile.previousPortfolio} target="_blank" rel="noreferrer">
                enmfarooq85.vercel.app
              </a>
            </div>

            <div className="social-links">
              <Magnetic>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              </Magnetic>
              <Magnetic>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </Magnetic>
              <Magnetic>
                <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              </Magnetic>
            </div>
          </div>

          {/* ── Form Card ── */}
          <form className="form-card reveal-right" onSubmit={onSubmit}>
            {status && <div className={`alert ${status.ok ? "ok" : "err"}`}>{status.text}</div>}

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
                  placeholder="Project, role, or collaboration"
                />
              </div>
              <div className="field full">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about the product, timeline, and what success looks like."
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
