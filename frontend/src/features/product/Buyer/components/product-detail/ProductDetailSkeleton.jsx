/* ── Loading skeleton ──────────────────────────────────────────────────────
   Mirrors the detail layout (gallery left, info right) using the shared
   .aura-shimmer treatment while the product request is in flight.             */

const block = (style) => ({
  borderRadius: "var(--radius-md)",
  ...style,
});

export default function ProductDetailSkeleton() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px clamp(16px, 4vw, 48px)" }}>
      <div className="pd-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: 48 }}>
        {/* gallery */}
        <div style={{ display: "flex", flexDirection: "column-reverse", gap: 14 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aura-shimmer" style={block({ width: 62, height: 62 })} />
            ))}
          </div>
          <div className="aura-shimmer" style={block({ width: "100%", aspectRatio: "1 / 1", borderRadius: "var(--radius-lg)" })} />
        </div>

        {/* info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div className="aura-shimmer" style={block({ width: 80, height: 22, borderRadius: 20 })} />
            <div className="aura-shimmer" style={block({ width: 64, height: 22, borderRadius: 20 })} />
          </div>
          <div className="aura-shimmer" style={block({ width: "80%", height: 38 })} />
          <div className="aura-shimmer" style={block({ width: 140, height: 18 })} />
          <div className="aura-shimmer" style={block({ width: 160, height: 34 })} />
          <div className="aura-shimmer" style={block({ width: "100%", height: 260, borderRadius: "var(--radius-lg)", marginTop: 8 })} />
        </div>
      </div>
    </div>
  );
}
