/* ── Featured row: side panel + horizontal product scroll ──────────────────
   Products default to mock data. onProductClick is the auth-gated handler.
   Scroll the row via arrow buttons, mouse wheel, or ←/→ keys (focus the row). */

import { useRef } from "react";
import BuyerProductCard from "./BuyerProductCard";
import SectionHeader from "./SectionHeader";
import { IcoChevronRight } from "./Icons";
import { MOCK_PRODUCTS } from "./data";

const SCROLL_STEP = 280; // px per arrow click / key press

export default function FeaturedScroll({
  title = "Featured",
  products = MOCK_PRODUCTS,
  onProductClick,
  onSeeAll,
  onFeaturedClick,
}) {
  const rowRef = useRef(null);

  function scrollBy(dir) {
    rowRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  }

  // Translate vertical wheel into horizontal scroll for mouse users.
  function handleWheel(e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      rowRef.current.scrollLeft += e.deltaY;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-1); }
  }

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)" }}>
      <SectionHeader title={title} onSeeAll={onSeeAll} />

      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 320px) 1fr", gap: 24 }} className="aura-featured-grid">
        {/* Featured side panel */}
        <div
          onClick={onFeaturedClick}
          style={{
            position: "relative",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            minHeight: 320,
            cursor: "pointer",
            background: "linear-gradient(135deg, #161618 0%, #0C0C0E 100%)",
            border: "1px solid var(--color-accent)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
            alt="Featured edit"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.55 }}
          />
          <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              Editor's Edit
            </span>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 400, color: "#fff", margin: "8px 0 0" }}>
              The Essentials Drop
            </h3>
          </div>
        </div>

        {/* Horizontal scroll row + arrow controls */}
        <div style={{ position: "relative", minWidth: 0 }}>
          <button aria-label="Scroll left" onClick={() => scrollBy(-1)} style={{ ...arrowBtn, left: -14 }}>
            <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><IcoChevronRight width={18} height={18} /></span>
          </button>

          <div
            ref={rowRef}
            className="no-scrollbar"
            tabIndex={0}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 4, scrollSnapType: "x proximity", outline: "none" }}
          >
            {products.map((p) => (
              <div key={p._id || p.id} style={{ flex: "0 0 220px", scrollSnapAlign: "start" }}>
                <BuyerProductCard product={p} onClick={onProductClick} />
              </div>
            ))}
          </div>

          <button aria-label="Scroll right" onClick={() => scrollBy(1)} style={{ ...arrowBtn, right: -14 }}>
            <IcoChevronRight width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

const arrowBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 5,
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border-visible)",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
};
