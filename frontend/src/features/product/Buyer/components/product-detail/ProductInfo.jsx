/* ── Product info block ────────────────────────────────────────────────────
   Brand/category chips, serif title, rating placeholder, animated price, and
   the stock badge. Price crossfades whenever the active selection changes.    */

import { AnimatePresence, motion } from "framer-motion";
import RatingStars from "./RatingStars";
import { money, stockStatus, STOCK_TONE } from "../../utils/format";

const chip = (accent) => ({
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "4px 10px",
  borderRadius: 20,
  color: accent ? "var(--color-accent)" : "var(--color-text-secondary)",
  background: accent ? "rgba(196,160,82,0.10)" : "rgba(255,255,255,0.04)",
  border: `1px solid ${accent ? "rgba(196,160,82,0.22)" : "var(--color-border-subtle)"}`,
});

export default function ProductInfo({ product, price, stock, fromPrice, variantCount }) {
  const status = stockStatus(stock);
  const tone = STOCK_TONE[status.tone];

  return (
    <div>
      {/* chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {product.brand && <span style={chip(true)}>{product.brand}</span>}
        {product.category && <span style={chip(false)}>{product.category}</span>}
      </div>

      {/* title */}
      <h1 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, lineHeight: 1.12, color: "#fff", margin: "0 0 14px" }}>
        {product.title}
      </h1>

      {/* rating placeholder */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <RatingStars value={0} />
        <span style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>No reviews yet</span>
      </div>

      {/* price */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 14, minHeight: 44 }}>
        {fromPrice && <span style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 7 }}>from</span>}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={money(price)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ fontSize: "clamp(30px, 4vw, 38px)", fontWeight: 600, color: "var(--color-accent)", lineHeight: 1 }}
          >
            {money(price)}
          </motion.span>
        </AnimatePresence>
        <span style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }}>
          {fromPrice ? `· ${variantCount} variants` : "incl. all taxes"}
        </span>
      </div>

      {/* stock badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${tone.ring}`,
          background: tone.bg,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: tone.dot }} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: tone.text }}>{status.label}</span>
      </div>
    </div>
  );
}
