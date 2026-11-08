import { NavLink } from "react-router-dom";

export default function MobileBottomNav({ onOpenCommandPalette, onOpenEstimator }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
      <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <span className="mobile-nav-icon">🏠</span>
        <span className="mobile-nav-label">Home</span>
      </NavLink>

      <NavLink to="/work" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <span className="mobile-nav-icon">💼</span>
        <span className="mobile-nav-label">Work</span>
      </NavLink>

      <button className="mobile-nav-item nav-action-btn" onClick={onOpenCommandPalette} aria-label="Open command palette">
        <span className="mobile-nav-icon-cmd">⌘K</span>
        <span className="mobile-nav-label">Search</span>
      </button>

      <button className="mobile-nav-item" onClick={onOpenEstimator} aria-label="Estimate scope">
        <span className="mobile-nav-icon">⚡</span>
        <span className="mobile-nav-label">Estimate</span>
      </button>

      <NavLink to="/contact" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
        <span className="mobile-nav-icon">✉️</span>
        <span className="mobile-nav-label">Contact</span>
      </NavLink>
    </nav>
  );
}
