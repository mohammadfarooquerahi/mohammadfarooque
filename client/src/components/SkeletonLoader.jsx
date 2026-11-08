export function SkeletonText({ width = "100%", height = "18px", style = {} }) {
  return (
    <div
      className="skeleton skeleton-text"
      style={{ width, height, ...style }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-media" />
      <div className="skeleton-body">
        <SkeletonText width="35%" height="12px" style={{ marginBottom: "8px" }} />
        <SkeletonText width="80%" height="22px" style={{ marginBottom: "12px" }} />
        <SkeletonText width="100%" height="14px" style={{ marginBottom: "6px" }} />
        <SkeletonText width="65%" height="14px" />
        <div className="skeleton-tags" style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
          <SkeletonText width="60px" height="24px" style={{ borderRadius: "999px" }} />
          <SkeletonText width="75px" height="24px" style={{ borderRadius: "999px" }} />
          <SkeletonText width="50px" height="24px" style={{ borderRadius: "999px" }} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="work-grid" aria-label="Loading content...">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr className="skeleton-tr" aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}>
          <SkeletonText width={i === 0 ? "80%" : "60%"} height="16px" />
        </td>
      ))}
    </tr>
  );
}
