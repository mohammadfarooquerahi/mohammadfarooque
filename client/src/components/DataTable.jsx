import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function DataTable({
  data = [],
  onBookmarkToggle,
  bookmarkedIds = new Set(),
  onBulkExport,
  onBulkBookmark,
}) {
  const [sortField, setSortField] = useState("year");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Selection helpers
  const isAllSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.has(item.slug));

  const toggleSelectAll = () => {
    const next = new Set(selectedIds);
    if (isAllSelected) {
      paginatedData.forEach((item) => next.delete(item.slug));
    } else {
      paginatedData.forEach((item) => next.add(item.slug));
    }
    setSelectedIds(next);
  };

  const toggleSelectOne = (slug) => {
    const next = new Set(selectedIds);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    setSelectedIds(next);
  };

  const handleExportSelected = () => {
    const selectedItems = data.filter((item) => selectedIds.has(item.slug));
    const jsonStr = JSON.stringify(selectedItems, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `farooq-studio-projects-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBookmarkSelected = () => {
    if (onBulkBookmark) {
      onBulkBookmark(Array.from(selectedIds));
    }
  };

  return (
    <div className="data-table-container">
      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="bulk-action-bar">
          <div className="bulk-info">
            <span className="bulk-count">{selectedIds.size}</span> item(s) selected
          </div>
          <div className="bulk-buttons">
            <button className="btn-table-action" onClick={handleExportSelected}>
              <span>Export JSON 📥</span>
            </button>
            <button className="btn-table-action" onClick={handleBookmarkSelected}>
              <span>Star / Bookmark All ⭐</span>
            </button>
            <button className="btn-table-action-subtle" onClick={() => setSelectedIds(new Set())}>
              Clear selection ×
            </button>
          </div>
        </div>
      )}

      {/* Table Wrapper */}
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th className="th-checkbox">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows on current page"
                />
              </th>
              <th className="th-sortable" onClick={() => handleSort("title")}>
                <span>Project Name</span>
                <span className="sort-indicator">
                  {sortField === "title" ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                </span>
              </th>
              <th className="th-sortable" onClick={() => handleSort("category")}>
                <span>Category</span>
                <span className="sort-indicator">
                  {sortField === "category" ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                </span>
              </th>
              <th className="th-sortable" onClick={() => handleSort("year")}>
                <span>Year</span>
                <span className="sort-indicator">
                  {sortField === "year" ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
                </span>
              </th>
              <th>Tech Stack</th>
              <th>Status / Link</th>
              <th className="th-actions">Save</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => {
              const isSelected = selectedIds.has(item.slug);
              const isBookmarked = bookmarkedIds.has(item.slug);

              return (
                <tr key={item.slug} className={isSelected ? "row-selected" : ""}>
                  <td className="td-checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(item.slug)}
                      aria-label={`Select ${item.title}`}
                    />
                  </td>
                  <td className="td-title">
                    <Link to={`/work/${item.slug}`} className="table-item-link">
                      <strong>{item.title}</strong>
                      <span className="table-item-summary">{item.summary}</span>
                    </Link>
                  </td>
                  <td>
                    <span className="table-badge">{item.category}</span>
                  </td>
                  <td>
                    <span className="table-year">{item.year}</span>
                  </td>
                  <td>
                    <div className="table-tags">
                      {(item.tags || []).slice(0, 3).map((t) => (
                        <span key={t} className="table-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {item.live ? (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noreferrer"
                        className="status-pill-live"
                      >
                        ● Production Live ↗
                      </a>
                    ) : (
                      <span className="status-pill-repo">● Case Study</span>
                    )}
                  </td>
                  <td className="td-actions">
                    <button
                      className={`btn-star ${isBookmarked ? "starred" : ""}`}
                      onClick={() => onBookmarkToggle && onBookmarkToggle(item.slug)}
                      title={isBookmarked ? "Remove bookmark" : "Bookmark project"}
                      aria-label="Toggle project bookmark"
                    >
                      {isBookmarked ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="data-table-pagination">
        <div className="pagination-info">
          Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> –{" "}
          <strong>{Math.min(currentPage * pageSize, sortedData.length)}</strong> of{" "}
          <strong>{sortedData.length}</strong> items
        </div>

        <div className="pagination-controls">
          <div className="page-size-selector">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="page-nav-btns">
            <button
              className="page-nav-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ← Prev
            </button>
            <span className="page-counter">
              {currentPage} / {totalPages}
            </span>
            <button
              className="page-nav-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
