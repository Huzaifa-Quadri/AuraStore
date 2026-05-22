/* ── Full-width hero ───────────────────────────────────────────────────────
   Mock copy + image. Swap text/image and wire the CTA handlers as needed.    */

import { IcoArrowRight } from "./Icons";

export default function HeroBanner({ onShop, onExplore }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #161618 0%, #0C0C0E 100%)",
      }}
    >
      {/* Right product image with fade-to-dark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "right center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, #0C0C0E 32%, rgba(12,12,14,0.55) 58%, transparent 80%)",
        }}
      />

      {/* Left text block */}
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            New Season 2026
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              margin: "16px 0 20px",
              color: "#fff",
            }}
          >
            Curated pieces for the modern wardrobe
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--color-text-secondary)", margin: "0 0 32px", maxWidth: 420 }}>
            Discover apparel, footwear, fragrance and more from independent makers — all in one place.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={onShop} style={btnPrimary} {...invertHover}>
              Shop Now <IcoArrowRight width={16} height={16} />
            </button>
            <button onClick={onExplore} style={btnAccent} {...accentHover}>
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 26px",
  borderRadius: "var(--radius-sm)",
  fontSize: 13,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  background: "transparent",
  transition: "background var(--transition-base), color var(--transition-base)",
};

const btnPrimary = { ...btnBase, border: "1px solid #fff", color: "#fff" };
const btnAccent = { ...btnBase, border: "1px solid var(--color-accent)", color: "var(--color-accent)" };

const invertHover = {
  onMouseEnter: (e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0C0C0E"; },
  onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; },
};
const accentHover = {
  onMouseEnter: (e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.color = "#0C0C0E"; },
  onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; },
};
