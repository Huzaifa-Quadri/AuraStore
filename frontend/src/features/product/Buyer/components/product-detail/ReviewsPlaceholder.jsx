/* ── Reviews placeholder ───────────────────────────────────────────────────
   The product model has no reviews yet (schema field is commented out). This
   presents a tasteful empty state, ready to swap for real reviews later, and
   reveals gently on scroll into view.                                         */

import { motion } from "framer-motion";
import { toast } from "sonner";
import RatingStars from "./RatingStars";

export default function ReviewsPlaceholder() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: "#fff", margin: "0 0 16px" }}>
        Reviews
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 12,
          padding: "48px 24px",
          borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--color-border-visible)",
          background: "var(--color-bg-surface)",
        }}
      >
        <RatingStars value={0} size={20} />
        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>No reviews yet</div>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", maxWidth: 340 }}>
          Be the first to share your thoughts on this product once you&apos;ve made it yours.
        </div>
        <button
          type="button"
          onClick={() => toast("Reviews are coming soon")}
          style={{
            marginTop: 6,
            padding: "10px 20px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-visible)",
            background: "transparent",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Write a review
        </button>
      </div>
    </motion.section>
  );
}
