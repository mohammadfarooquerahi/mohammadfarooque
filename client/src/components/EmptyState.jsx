export default function EmptyState({
  icon = "🔍",
  title = "No results found",
  message = "Try adjusting your search query, clearing filters, or browsing all available categories.",
  actionLabel = "Reset all filters",
  onAction,
}) {
  return (
    <div className="empty-state-box">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction && actionLabel && (
        <button className="btn-border" onClick={onAction}>
          <span>{actionLabel}</span>
          <i>↺</i>
        </button>
      )}
    </div>
  );
}
