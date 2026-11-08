export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "⌘K / Ctrl+K", desc: "Open Command Palette (Spotlight Search)" },
    { key: "? / Shift+/", desc: "Toggle Keyboard Shortcuts Modal" },
    { key: "Esc", desc: "Close any open modal or off-canvas drawer" },
    { key: "H", desc: "Navigate to Home Page" },
    { key: "W", desc: "Navigate to Selected Work & Projects" },
    { key: "S", desc: "Navigate to Services & Pricing Tiers" },
    { key: "E", desc: "Navigate to Expertise & Stack" },
    { key: "C", desc: "Navigate to Contact Page" },
    { key: "R", desc: "Navigate to Referral Program" },
    { key: "T", desc: "Smooth Scroll to Top of Page" },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-badge-info">⌨️ Power User</div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <h3 className="modal-title">Keyboard Shortcuts</h3>
        <p className="modal-desc">
          Navigate Farooq Studio at developer speed with these built-in hotkeys:
        </p>

        <div className="shortcuts-table">
          {shortcuts.map((s) => (
            <div className="shortcut-row" key={s.key}>
              <span className="shortcut-desc">{s.desc}</span>
              <kbd className="shortcut-kbd">{s.key}</kbd>
            </div>
          ))}
        </div>

        <div className="modal-actions" style={{ marginTop: "24px" }}>
          <button className="btn-fill" onClick={onClose} style={{ width: "100%", justifyContent: "center" }}>
            <span>Got it, close (ESC)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
