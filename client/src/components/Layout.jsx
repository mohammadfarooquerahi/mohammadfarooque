import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Cursor from "./Cursor.jsx";
import SmoothScroll from "./SmoothScroll.jsx";
import Magnetic from "./Magnetic.jsx";
import { profile } from "../lib/api.js";

const links = [
  ["01", "Home", "/"],
  ["02", "About", "/about"],
  ["03", "Services", "/services"],
  ["04", "Expertise", "/expertise"],
  ["05", "Work", "/work"],
  ["06", "Journey", "/journey"],
  ["07", "Awards", "/awards"],
  ["08", "Contact", "/contact"],
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Cursor />
      <SmoothScroll />

      {/* ── Fixed Header ── */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner wrap">
          <Magnetic strength={0.15}>
            <Link className="logo" to="/" onClick={() => setOpen(false)}>
              <span className="logo-text">FAROOQ</span>
              <span className="logo-dot" />
            </Link>
          </Magnetic>

          <div className="header-actions">
            <span className="header-status">
              <span className="status-indicator" />
              Available for work
            </span>

            <Magnetic strength={0.15}>
              <Link className="header-contact-btn" to="/contact">
                Let's Talk
              </Link>
            </Magnetic>

            <Magnetic strength={0.15}>
              <button
                className="menu-btn"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <span>MENU</span>
                <div className="menu-icon">
                  <span />
                  <span />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* ── Offcanvas Menu (Strictly hidden when closed) ── */}
      <div
        className={`offcanvas ${open ? "open" : ""}`}
        style={{
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="offcanvas-bg" onClick={() => setOpen(false)} />
        <div className="offcanvas-panel">
          <div className="offcanvas-left">
            <div className="offcanvas-top">
              <Link className="logo" to="/" onClick={() => setOpen(false)}>
                <span className="logo-text">FAROOQ</span>
                <span className="logo-dot" />
              </Link>
            </div>

            <nav className="offcanvas-nav">
              {links.map(([n, label, href]) => (
                <NavLink
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <small>{n}</small>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <p className="offcanvas-copy">
              © {new Date().getFullYear()} Muhammad Farooq. All rights reserved.
            </p>
          </div>

          <div className="offcanvas-right">
            <button
              className="offcanvas-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span>CLOSE</span>
              <span className="close-x">×</span>
            </button>

            <div className="offcanvas-meta">
              <div className="meta-block">
                <h4>Studio Location</h4>
                <p>
                  {profile.location}
                  <br />
                  <span>UTC+5 Timezone</span>
                </p>
              </div>

              <div className="meta-block">
                <h4>Availability</h4>
                <p>{profile.availability}</p>
              </div>

              <div className="meta-block">
                <h4>Direct Inquiries</h4>
                <p>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
              </div>

              <div className="meta-block">
                <h4>Connect</h4>
                <div className="offcanvas-socials">
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <a href={profile.leetcode} target="_blank" rel="noreferrer">
                    LeetCode ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <Outlet />

      {/* ── Studio Footer ── */}
      <footer className="studio-footer">
        {/* Pre-footer Call to Action */}
        <div className="footer-cta wrap">
          <div className="footer-cta-content">
            <span className="cta-kicker">Ready to collaborate?</span>
            <h2 className="cta-heading">
              HAVE A VISION?
              <br />
              <span className="accent-text">LET'S MAKE IT REAL.</span>
            </h2>
            <p className="cta-desc">
              Whether you need end-to-end full stack development, high-performance web engineering, or intelligent AI integrations — let's build something remarkable.
            </p>
          </div>

          <div className="footer-cta-action">
            <Magnetic>
              <Link className="btn-cta" to="/contact">
                <span>Start a Project</span>
                <i className="arrow-icon">→</i>
              </Link>
            </Magnetic>
            <a className="footer-email-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>

        {/* Studio Info Columns */}
        <div className="footer-body wrap">
          <div className="footer-col brand-col">
            <Link className="logo" to="/">
              <span className="logo-text">FAROOQ</span>
              <span className="logo-dot" />
            </Link>
            <p className="brand-tagline">
              Digital-first full stack & AI engineer decoding, discovering, and delivering high-impact web and mobile products.
            </p>
            <div className="brand-badge">
              <span className="status-indicator" />
              Available for freelance & full-time roles
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Studio</Link></li>
              <li><Link to="/services">Services & Craft</Link></li>
              <li><Link to="/expertise">Expertise</Link></li>
              <li><Link to="/work">Selected Work</Link></li>
              <li><Link to="/journey">Journey</Link></li>
              <li><Link to="/awards">Recognition</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Contact & Studio</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="label">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className="label">Location</span>
                <span>{profile.location}</span>
              </li>
              <li>
                <span className="label">Previous Work</span>
                <a href={profile.previousPortfolio} target="_blank" rel="noreferrer">
                  enmfarooq85.vercel.app ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Social & Profiles</h4>
            <ul className="footer-social-list">
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <span className="arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.leetcode} target="_blank" rel="noreferrer">
                  LeetCode (415+ Solved) <span className="arrow">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom wrap">
          <div className="footer-copy">
            © {new Date().getFullYear()} Muhammad Farooq. All rights reserved.
          </div>
          <div className="footer-credit">
            Designed & Engineered with React, GSAP, Node.js & Lenis
          </div>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            Back to Top <span>↑</span>
          </button>
        </div>
      </footer>
    </>
  );
}
