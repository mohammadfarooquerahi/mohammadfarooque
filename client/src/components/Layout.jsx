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
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Header scroll effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Cursor />
      <SmoothScroll />

      {/* ── Fixed Header ── */}
      <header className="header">
        <Magnetic strength={0.15}>
          <Link className="logo" to="/" onClick={() => setOpen(false)}>
            FAROOQ <i />
          </Link>
        </Magnetic>
        <Magnetic strength={0.15}>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            Menu
            <span className="lines" />
          </button>
        </Magnetic>
      </header>

      {/* ── Offcanvas Menu ── */}
      <div className={`offcanvas ${open ? "open" : ""}`}>
        <div className="offcanvas-bg" onClick={() => setOpen(false)} />
        <div className="offcanvas-panel">
          <div className="offcanvas-left">
            <Link className="logo" to="/" onClick={() => setOpen(false)}>
              FAROOQ <i />
            </Link>
            <nav className="offcanvas-nav">
              {links.map(([n, label, href]) => (
                <NavLink key={href} to={href} onClick={() => setOpen(false)}>
                  <small>{n}</small> {label}
                </NavLink>
              ))}
            </nav>
            <p style={{ fontSize: "0.82rem", opacity: 0.5 }}>
              © {new Date().getFullYear()} Muhammad Farooq. Built to ship.
            </p>
          </div>
          <div className="offcanvas-right">
            <button className="offcanvas-close" onClick={() => setOpen(false)}>
              Close <span>×</span>
            </button>
            <div className="offcanvas-meta">
              <h4>Studio</h4>
              <p>
                {profile.location}
                <br />
                {profile.availability}
              </p>
              <h4 style={{ marginTop: 32 }}>Email</h4>
              <p>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <h4 style={{ marginTop: 32 }}>Social</h4>
              <p>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                {" · "}
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                {" · "}
                <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <Outlet />

      {/* ── CTA Section ── */}
      <section className="cta">
        <div className="wrap">
          <p className="kicker">Let's build</p>
          <h2>Have a vision?<br />Let's make it brilliant.</h2>
          <Magnetic>
            <Link className="btn-border" to="/contact">
              Start a project
              <i>→</i>
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} FAROOQ STUDIO · Lahore, Pakistan</span>
        <span>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          {" · "}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {" · "}
          <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
          {" · "}
          <a href={`mailto:${profile.email}`}>Email</a>
        </span>
      </footer>
    </>
  );
}
