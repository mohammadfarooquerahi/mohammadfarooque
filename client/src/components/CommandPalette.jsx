import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.js";
import { projects, profile } from "../lib/fallback.js";

const STATIC_ACTIONS = [
  { id: "page-home", title: "Home", group: "Pages", href: "/", icon: "🏠", desc: "Studio landing page & showcase" },
  { id: "page-about", title: "About Studio", group: "Pages", href: "/about", icon: "👤", desc: "Bio, philosophy & engineering process" },
  { id: "page-services", title: "Services & Tiers", group: "Pages", href: "/services", icon: "⚡", desc: "Full Stack, AI, Architecture & Engagement tiers" },
  { id: "page-expertise", title: "Expertise & Tech Stack", group: "Pages", href: "/expertise", icon: "🛠️", desc: "MERN, Python, FastAPI, Next.js, React Native" },
  { id: "page-work", title: "Selected Work & Projects", group: "Pages", href: "/work", icon: "💼", desc: "Production apps, case studies & interactive table" },
  { id: "page-journey", title: "Journey & Timeline", group: "Pages", href: "/journey", icon: "🚀", desc: "Career milestones, education & growth" },
  { id: "page-awards", title: "Awards & Recognition", group: "Pages", href: "/awards", icon: "🏆", desc: "Hackathon wins, LeetCode (415+), accolades" },
  { id: "page-referral", title: "Referral & Affiliate Program", group: "Pages", href: "/referral", icon: "🤝", desc: "Earn 10%–15% commission by partnering with Farooq Studio" },
  { id: "page-contact", title: "Contact & Inquiries", group: "Pages", href: "/contact", icon: "✉️", desc: "Start a project, call or chat on WhatsApp" },
  {
    id: "action-whatsapp",
    title: "Chat on WhatsApp Direct",
    group: "Quick Actions",
    icon: "💬",
    desc: "+92 319 0211218 (Karachi, Pakistan)",
    action: () => window.open(profile.whatsapp, "_blank"),
  },
  {
    id: "action-email",
    title: "Copy Email Address",
    group: "Quick Actions",
    icon: "📋",
    desc: profile.email,
    action: () => {
      navigator.clipboard.writeText(profile.email);
      alert(`Copied email to clipboard: ${profile.email}`);
    },
  },
  {
    id: "action-call",
    title: "Call Direct Phone",
    group: "Quick Actions",
    icon: "📞",
    desc: "+92 319 0211218",
    action: () => (window.location.href = `tel:${profile.phone}`),
  },
  {
    id: "action-linkedin",
    title: "Open LinkedIn Profile",
    group: "Quick Actions",
    icon: "🔗",
    desc: "linkedin.com/in/mohammadfarooque",
    action: () => window.open(profile.linkedin, "_blank"),
  },
  {
    id: "action-github",
    title: "Explore GitHub Repositories",
    group: "Quick Actions",
    icon: "🐙",
    desc: "github.com/mohammadfarooquerahi",
    action: () => window.open(profile.github, "_blank"),
  },
  {
    id: "action-figma",
    title: "View Figma Design System",
    group: "Quick Actions",
    icon: "🎨",
    desc: "bit.ly/farooqportfolio (Interactive Prototype)",
    action: () => window.open(profile.previousPortfolio, "_blank"),
  },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debouncedQuery = useDebounce(query, 120);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const projectItems = useMemo(() => {
    return (projects || []).map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      group: "Projects",
      href: `/work/${p.slug}`,
      icon: "📁",
      desc: `${p.category} · ${p.year} — ${p.summary}`,
    }));
  }, []);

  const allItems = useMemo(() => {
    return [...STATIC_ACTIONS, ...projectItems];
  }, [projectItems]);

  const filteredItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return allItems.slice(0, 10);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        (item.desc && item.desc.toLowerCase().includes(q))
    );
  }, [debouncedQuery, allItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleSelect = (item) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.href) {
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank");
      } else {
        navigate(item.href);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="command-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-search-row">
          <span className="search-icon">⌘</span>
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Type a command or search pages, projects, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="esc-badge" onClick={onClose}>ESC</kbd>
        </div>

        <div className="command-palette-list">
          {filteredItems.length === 0 ? (
            <div className="command-palette-empty">
              No matching commands or projects found for "<strong>{query}</strong>"
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`command-palette-item ${idx === selectedIndex ? "active" : ""}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="command-item-icon">{item.icon}</span>
                <div className="command-item-content">
                  <div className="command-item-title-row">
                    <span className="command-item-title">{item.title}</span>
                    <span className="command-item-group">{item.group}</span>
                  </div>
                  {item.desc && <div className="command-item-desc">{item.desc}</div>}
                </div>
                <span className="command-item-arrow">↵</span>
              </div>
            ))
          )}
        </div>

        <div className="command-palette-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to dismiss</span>
        </div>
      </div>
    </div>
  );
}
