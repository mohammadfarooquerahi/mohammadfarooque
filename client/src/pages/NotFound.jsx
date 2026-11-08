import { Link } from "react-router-dom";
import Magnetic from "../components/Magnetic.jsx";

export default function NotFound({ onOpenCommandPalette }) {
  return (
    <main className="not-found-screen">
      <div className="wrap not-found-content">
        <span className="error-pill">Error 404</span>
        <h1 className="not-found-glitch">404</h1>
        <h2 className="not-found-heading">LOST IN DIGITAL SPACE</h2>
        <p className="not-found-sub">
          The coordinate or case study you're seeking has moved, been refactored, or does not exist in this universe.
        </p>

        <div className="not-found-actions">
          <Magnetic>
            <Link to="/" className="btn-fill">
              <span>Return to Orbit (Home)</span>
              <i>→</i>
            </Link>
          </Magnetic>

          <Magnetic>
            <Link to="/work" className="btn-border">
              <span>Explore Selected Work</span>
              <i>→</i>
            </Link>
          </Magnetic>

          {onOpenCommandPalette && (
            <button className="btn-border" onClick={onOpenCommandPalette}>
              <span>Command Palette (⌘K)</span>
            </button>
          )}
        </div>

        <div className="not-found-sitemap">
          <span>Quick destinations:</span>
          <div className="quick-links">
            <Link to="/services">Services</Link>
            <span>·</span>
            <Link to="/expertise">Expertise</Link>
            <span>·</span>
            <Link to="/journey">Journey</Link>
            <span>·</span>
            <Link to="/contact">Contact Studio</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
