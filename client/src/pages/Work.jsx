import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useScrollReveal } from "../hooks/useAnimations.js";
import { useDebounce } from "../hooks/useDebounce.js";
import { SkeletonGrid } from "../components/SkeletonLoader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import DataTable from "../components/DataTable.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

export default function Work() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 200);
  const mainRef = useScrollReveal([items, category, yearFilter, debouncedSearch, viewMode]);

  // Load projects & stored bookmarks
  useEffect(() => {
    setLoading(true);
    api.projects().then((d) => {
      setItems(d.projects || []);
      setLoading(false);
    });

    try {
      const saved = JSON.parse(localStorage.getItem("farooq_bookmarked_projects") || "[]");
      setBookmarkedIds(new Set(saved));
    } catch {}
  }, []);

  // Save bookmarks
  const toggleBookmark = (slug) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      localStorage.setItem("farooq_bookmarked_projects", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleBulkBookmark = (slugs) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      slugs.forEach((s) => next.add(s));
      localStorage.setItem("farooq_bookmarked_projects", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds(new Set());
    localStorage.removeItem("farooq_bookmarked_projects");
    setShowBookmarksOnly(false);
    setConfirmClearOpen(false);
  };

  // Filter Categories & Years
  const categories = useMemo(() => ["All", ...new Set(items.map((p) => p.category))], [items]);
  const years = useMemo(() => ["All", ...new Set(items.map((p) => p.year))].sort().reverse(), [items]);

  // Filtered dataset
  const filtered = useMemo(() => {
    return items.filter((p) => {
      // Category match
      if (category !== "All" && p.category !== category) return false;
      // Year match
      if (yearFilter !== "All" && p.year !== yearFilter) return false;
      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.has(p.slug)) return false;
      // Search match
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inDesc = p.summary && p.summary.toLowerCase().includes(q);
        const inTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inTags) return false;
      }
      return true;
    });
  }, [items, category, yearFilter, showBookmarksOnly, bookmarkedIds, debouncedSearch]);

  const hasActiveFilters = category !== "All" || yearFilter !== "All" || searchQuery.trim() !== "" || showBookmarksOnly;

  const resetFilters = () => {
    setCategory("All");
    setYearFilter("All");
    setSearchQuery("");
    setShowBookmarksOnly(false);
  };

  return (
    <main ref={mainRef}>
      {/* ── Page Hero ── */}
      <header className="page-hero wrap">
        <div className="kicker reveal-up">Portfolio &amp; Case Studies</div>
        <h1 className="reveal-up">Selected<br />work</h1>
        <p className="reveal-up">
          Full-stack SaaS platforms, agentic AI copilots, mobile apps, and interactive web architectures built to ship.
        </p>
      </header>

      <section className="section wrap">
        {/* ── Control Bar: Search & View Switcher ── */}
        <div className="work-controls-bar reveal-up">
          <div className="work-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search projects by name, technology, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="work-search-input"
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                ×
              </button>
            )}
          </div>

          <div className="work-actions-row">
            {/* Year Dropdown */}
            <div className="select-wrapper">
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="filter-select"
                aria-label="Filter by year"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? "All Years" : `Year: ${y}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Bookmarks Toggle */}
            <button
              className={`filter-btn-pill ${showBookmarksOnly ? "active" : ""}`}
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              title="Show only bookmarked projects"
            >
              <span>⭐ Saved ({bookmarkedIds.size})</span>
            </button>

            {bookmarkedIds.size > 0 && showBookmarksOnly && (
              <button
                className="filter-btn-pill-subtle"
                onClick={() => setConfirmClearOpen(true)}
              >
                Clear Saved
              </button>
            )}

            {/* View Switcher: Grid vs Table */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid Card View"
                aria-label="Switch to Grid view"
              >
                ⊞ Cards
              </button>
              <button
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Reusable Data Table View"
                aria-label="Switch to Table view"
              >
                ☰ Table
              </button>
            </div>
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="work-category-pills reveal-up">
          {categories.map((c) => (
            <button
              key={c}
              className={`cat-pill ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}

          {hasActiveFilters && (
            <button className="reset-pill" onClick={resetFilters}>
              Reset Filters ×
            </button>
          )}
        </div>

        {/* ── Active Filters Summary Count ── */}
        <div className="results-count-bar">
          <span>
            Showing <strong>{filtered.length}</strong> of <strong>{items.length}</strong> projects
          </span>
          {showBookmarksOnly && (
            <span className="bookmark-filter-indicator">
              (Filtering by bookmarked items)
            </span>
          )}
        </div>

        {/* ── Content: Loading / Empty / Grid / Table ── */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No matching projects found"
            message={`We couldn't find any projects matching your current search or category filters.`}
            actionLabel="Reset all filters"
            onAction={resetFilters}
          />
        ) : viewMode === "grid" ? (
          <div className="work-grid">
            {filtered.map((p) => {
              const isBookmarked = bookmarkedIds.has(p.slug);
              return (
                <div className="work-card-container reveal-up" key={p.slug}>
                  <Link className="work-card" to={`/work/${p.slug}`}>
                    <figure>
                      <img src={p.image} alt={p.title} loading="lazy" />
                      <figcaption>
                        <div className="card-top-meta">
                          <small>
                            {p.year} · {p.category}
                          </small>
                          <span className="card-arrow">↗</span>
                        </div>
                        <h3>{p.title}</h3>
                        <p className="card-summary">{p.summary}</p>
                        <div className="card-tags">
                          {(p.tags || []).slice(0, 3).map((t) => (
                            <span key={t} className="card-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </figcaption>
                    </figure>
                  </Link>

                  {/* Optimistic Bookmark Star Button */}
                  <button
                    className={`card-bookmark-btn ${isBookmarked ? "starred" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleBookmark(p.slug);
                    }}
                    title={isBookmarked ? "Remove bookmark" : "Bookmark project"}
                    aria-label={`Bookmark ${p.title}`}
                  >
                    {isBookmarked ? "★" : "☆"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <DataTable
            data={filtered}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={toggleBookmark}
            onBulkBookmark={handleBulkBookmark}
          />
        )}
      </section>

      {/* Destructive Action Modal for Bookmarks */}
      <ConfirmModal
        isOpen={confirmClearOpen}
        title="Clear Bookmarked Projects?"
        message="This will remove all saved bookmarks from your browser storage. Are you sure?"
        confirmLabel="Yes, Clear All"
        cancelLabel="Keep Bookmarks"
        onConfirm={handleClearAllBookmarks}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </main>
  );
}
