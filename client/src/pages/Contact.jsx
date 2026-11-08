import { useState, useEffect } from "react";
import Magnetic from "../components/Magnetic.jsx";
import { api, profile } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";
import ConfirmModal from "../components/ConfirmModal.jsx";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [autosaveTime, setAutosaveTime] = useState("");
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const mainRef = useScrollReveal([]);

  // Restore draft on initial load
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("farooq_contact_draft"));
      if (saved && (saved.name || saved.email || saved.message)) {
        setForm(saved);
        setAutosaveTime(saved.savedAt || "restored draft");
      }
    } catch {}
  }, []);

  // Autosave to localStorage on every change (debounced 800ms)
  useEffect(() => {
    if (!form.name && !form.email && !form.message) return;
    const timer = setTimeout(() => {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      localStorage.setItem("farooq_contact_draft", JSON.stringify({ ...form, savedAt: now }));
      setAutosaveTime(now);
    }, 800);
    return () => clearTimeout(timer);
  }, [form]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Smart Validation States
  const errors = {
    name: !form.name.trim() ? "Name is required." : form.name.length < 2 ? "Name too short." : null,
    email: !form.email.trim()
      ? "Email address is required."
      : !EMAIL_REGEX.test(form.email)
      ? "Enter a valid email address (e.g., name@domain.com)."
      : null,
    subject: !form.subject.trim() ? "Subject is required." : null,
    message:
      !form.message.trim()
        ? "Message is required."
        : form.message.length < 15
        ? "Please share a few more details (min 15 chars)."
        : null,
  };

  const isFormValid = !errors.name && !errors.email && !errors.subject && !errors.message;

  const handleClearDraft = () => {
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
    setTouched({});
    setAutosaveTime("");
    localStorage.removeItem("farooq_contact_draft");
    setConfirmClearOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!isFormValid) return;

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
      setTouched({});
      setAutosaveTime("");
      localStorage.removeItem("farooq_contact_draft");
    } catch (err) {
      console.warn("Backend not immediately reachable, providing direct mailto option:", err);
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        form.subject || "Project Inquiry"
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;

      setStatus({
        ok: true,
        text: `Your inquiry has been drafted! You can also click below to open your email client or chat directly on WhatsApp.`,
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

          {/* ── Form Card with Autosave & Smart Validation ── */}
          <div className="form-card-container reveal-right">
            <form className="form-card" onSubmit={onSubmit} noValidate>
              {/* Form Card Header with Autosave status */}
              <div className="form-header-bar">
                <span className="form-legend">Send a Direct Message</span>
                {autosaveTime && (
                  <div className="autosave-indicator">
                    <span className="autosave-dot" />
                    <span>Autosaved {autosaveTime}</span>
                    <button
                      type="button"
                      className="clear-draft-link"
                      onClick={() => setConfirmClearOpen(true)}
                      title="Clear draft"
                    >
                      (Clear)
                    </button>
                  </div>
                )}
              </div>

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
                {/* Name Field */}
                <div className={`field ${touched.name && errors.name ? "has-error" : touched.name && !errors.name ? "is-valid" : ""}`}>
                  <div className="field-label-row">
                    <label htmlFor="name">Full name *</label>
                    {touched.name && !errors.name && <span className="valid-mark">✓</span>}
                  </div>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    onBlur={() => onBlur("name")}
                    placeholder="Alex Mercer"
                  />
                  {touched.name && errors.name && <span className="field-hint-error">{errors.name}</span>}
                </div>

                {/* Email Field */}
                <div className={`field ${touched.email && errors.email ? "has-error" : touched.email && !errors.email ? "is-valid" : ""}`}>
                  <div className="field-label-row">
                    <label htmlFor="email">Email address *</label>
                    {touched.email && !errors.email && <span className="valid-mark">✓</span>}
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    onBlur={() => onBlur("email")}
                    placeholder="alex@company.com"
                  />
                  {touched.email && errors.email && <span className="field-hint-error">{errors.email}</span>}
                </div>

                {/* Subject Field */}
                <div className={`field full ${touched.subject && errors.subject ? "has-error" : touched.subject && !errors.subject ? "is-valid" : ""}`}>
                  <div className="field-label-row">
                    <label htmlFor="subject">Subject / Scope *</label>
                    {touched.subject && !errors.subject && <span className="valid-mark">✓</span>}
                  </div>
                  <input
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={onChange}
                    onBlur={() => onBlur("subject")}
                    placeholder="SaaS Platform, AI Agent, Full-Time Role..."
                  />
                  {touched.subject && errors.subject && <span className="field-hint-error">{errors.subject}</span>}
                </div>

                {/* Message Field with Character Counter */}
                <div className={`field full ${touched.message && errors.message ? "has-error" : touched.message && !errors.message ? "is-valid" : ""}`}>
                  <div className="field-label-row">
                    <label htmlFor="message">Project details *</label>
                    <span className="char-counter">{form.message.length} / 1000</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    maxLength={1000}
                    required
                    value={form.message}
                    onChange={onChange}
                    onBlur={() => onBlur("message")}
                    placeholder="Tell me about your product vision, timeline, and what success looks like."
                  />
                  {touched.message && errors.message && <span className="field-hint-error">{errors.message}</span>}
                </div>
              </div>

              <div className="form-submit-row">
                <Magnetic>
                  <button className="submit" type="submit" disabled={busy}>
                    {busy ? "Sending Inquiry…" : "Send message →"}
                  </button>
                </Magnetic>
                <span className="form-security-note">🔒 Spam-protected &amp; autosaved</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Destructive Action Modal for Clearing Draft */}
      <ConfirmModal
        isOpen={confirmClearOpen}
        title="Discard Contact Draft?"
        message="Are you sure you want to clear your current message draft? All unsent text will be removed."
        confirmLabel="Yes, Discard Draft"
        cancelLabel="Keep Writing"
        onConfirm={handleClearDraft}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </main>
  );
}
