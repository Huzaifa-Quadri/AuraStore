/* ── Buy box ───────────────────────────────────────────────────────────────
   The purchase panel: live price, stock badge, quantity stepper, Add to Cart +
   Buy Now, and the trust badges. Cart has no backend yet, so the actions fire
   a sonner toast and the Add button plays a brief success-check micro-state.
   Sticky on desktop (the page positions it).                                  */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import QuantityStepper from "./QuantityStepper";
import TrustBadges from "./TrustBadges";
import { money, stockStatus } from "../../utils/format";

export default function BuyBox({ product, price, stock, quantity, onQuantity, selectedVariant }) {
  const status = stockStatus(stock);
  const [added, setAdded] = useState(false);

  const variantLabel = selectedVariant?.attributes
    ? Object.entries(selectedVariant.attributes).map(([k, v]) => `${k}: ${v}`).join(", ")
    : null;

  const handleAdd = () => {
    if (!status.available) return;
    setAdded(true);
    toast.success(`Added to cart · ${quantity} × ${product.title}`);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    if (!status.available) return;
    toast("Checkout is coming soon", { description: `${quantity} × ${product.title} reserved for you.` });
  };

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-subtle)",
        background: "var(--color-bg-surface)",
        padding: 20,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 6 }}>
        {selectedVariant ? "Variant price" : "Price"}
      </div>
      <div style={{ fontSize: 30, fontWeight: 600, color: "#fff", lineHeight: 1, marginBottom: variantLabel ? 8 : 16 }}>
        {money(price)}
      </div>
      {variantLabel && (
        <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 16 }}>{variantLabel}</div>
      )}

      {/* quantity */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Quantity</span>
        <QuantityStepper value={quantity} onChange={onQuantity} max={status.count} />
      </div>

      {/* actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <motion.button
          type="button"
          onClick={handleAdd}
          disabled={!status.available}
          whileTap={status.available ? { scale: 0.97 } : {}}
          style={{
            position: "relative",
            height: 48,
            borderRadius: "var(--radius-md)",
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.02em",
            cursor: status.available ? "pointer" : "not-allowed",
            color: "#0C0C0E",
            background: status.available ? "var(--color-accent)" : "var(--color-border-visible)",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  Added
                </>
              ) : status.available ? "Add to Cart" : "Out of Stock"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleBuyNow}
          disabled={!status.available}
          whileTap={status.available ? { scale: 0.97 } : {}}
          style={{
            height: 48,
            borderRadius: "var(--radius-md)",
            fontSize: 14,
            fontWeight: 600,
            cursor: status.available ? "pointer" : "not-allowed",
            color: "#fff",
            background: "transparent",
            border: "1px solid var(--color-border-visible)",
            transition: "background var(--transition-fast)",
          }}
          onMouseEnter={(e) => { if (status.available) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Buy Now
        </motion.button>
      </div>

      <div style={{ height: 1, background: "var(--color-border-subtle)", margin: "20px 0" }} />

      <TrustBadges />
    </div>
  );
}
