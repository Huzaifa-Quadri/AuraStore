/* ── Sticky buy bar ────────────────────────────────────────────────────────
   A slim bar that slides down from the top once the main buy box has scrolled
   out of view. Mirrors the essentials — thumbnail, title, price, Add to Cart.
   Visibility is driven by the page via `visible` (an IntersectionObserver on
   the main BuyBox).                                                           */

import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { money, stockStatus, imgUrl } from "../../utils/format";

export default function StickyBuyBar({ visible, product, price, stock, thumb, quantity }) {
  const status = stockStatus(stock);

  const handleAdd = () => {
    if (!status.available) return;
    toast.success(`Added to cart · ${quantity} × ${product.title}`);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            right: 0,
            zIndex: 90,
            background: "rgba(22,22,24,0.86)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px clamp(16px, 4vw, 48px)", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, flex: "0 0 auto", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--color-bg-elevated)" }}>
              {thumb && <img src={imgUrl(thumb)} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.title}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-accent)" }}>{money(price)}</div>
            </div>
            <motion.button
              type="button"
              onClick={handleAdd}
              disabled={!status.available}
              whileTap={status.available ? { scale: 0.96 } : {}}
              style={{
                flex: "0 0 auto",
                height: 40,
                padding: "0 20px",
                borderRadius: "var(--radius-md)",
                border: "none",
                fontSize: 13,
                fontWeight: 700,
                cursor: status.available ? "pointer" : "not-allowed",
                color: "#0C0C0E",
                background: status.available ? "var(--color-accent)" : "var(--color-border-visible)",
                whiteSpace: "nowrap",
              }}
            >
              {status.available ? "Add to Cart" : "Out of Stock"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
