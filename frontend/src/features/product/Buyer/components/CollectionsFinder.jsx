/* ── "Shop by Collection" finder ───────────────────────────────────────────
   Generic adaptation of the audit's Scent Finder: left copy + CTA, right 2×2
   selectable cards. Selection is local UI state — wire onApply to filter/route.*/

import { useState } from "react";
import { MOCK_COLLECTIONS } from "./data";

export default function CollectionsFinder({ collections = MOCK_COLLECTIONS, onApply }) {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{ background: "linear-gradient(135deg, #161618 0%, #0C0C0E 100%)", borderTop: "1px solid var(--color-border-subtle)", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "center",
        }}
        className="aura-finder-grid"
      >
        {/* Left copy */}
        <div>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>
            Find your fit
          </span>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#fff", margin: "16px 0 16px", lineHeight: 1.15 }}>
            Not sure where to start?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: "0 0 28px", maxWidth: 400 }}>
            Pick a collection that matches your mood and we&apos;ll surface the pieces worth your time.
          </p>
          <button
            onClick={() => onApply?.(selected)}
            disabled={!selected}
            style={{
              padding: "12px 26px",
              background: selected ? "var(--color-accent)" : "transparent",
              border: "1px solid var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              color: selected ? "#0C0C0E" : "var(--color-accent)",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: selected ? "pointer" : "not-allowed",
              opacity: selected ? 1 : 0.55,
              transition: "all var(--transition-base)",
            }}
          >
            Explore Now
          </button>
        </div>

        {/* Right 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {collections.map((k) => {
            const active = selected === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setSelected(active ? null : k.id)}
                style={{
                  textAlign: "left",
                  background: active ? "#1E1A10" : "var(--color-bg-surface)",
                  border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border-subtle)"}`,
                  borderRadius: "var(--radius-md)",
                  padding: "20px 16px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#fff",
                  cursor: "pointer",
                  minHeight: 88,
                  transition: "border-color var(--transition-base), background var(--transition-base)",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--color-accent)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--color-border-subtle)"; }}
              >
                {k.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
