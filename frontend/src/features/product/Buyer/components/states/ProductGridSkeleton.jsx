/* ── Loading placeholder for the product grid (dark shimmer) ─────────────── */

export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          <div className="aura-shimmer" style={{ width: "100%", aspectRatio: "1 / 1" }} />
          <div style={{ padding: "12px 14px 16px" }}>
            <div className="aura-shimmer" style={{ height: 10, width: "40%", borderRadius: 4, marginBottom: 10 }} />
            <div className="aura-shimmer" style={{ height: 12, width: "80%", borderRadius: 4, marginBottom: 12 }} />
            <div className="aura-shimmer" style={{ height: 14, width: "30%", borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
