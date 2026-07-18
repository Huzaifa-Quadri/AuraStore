/* ── Not-found / error state ───────────────────────────────────────────────
   Shown when the product id is missing/invalid or the request fails.          */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IcoImage } from "../Icons";

export default function ProductNotFound({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}
    >
      <div style={{ width: 72, height: 72, borderRadius: "var(--radius-lg)", background: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-border-visible)", marginBottom: 20 }}>
        <IcoImage width={30} height={30} />
      </div>
      <h1 className="font-display" style={{ fontSize: 28, fontWeight: 500, color: "#fff", margin: "0 0 8px" }}>
        Product not found
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 24, maxWidth: 360 }}>
        {message || "This product may have been removed or the link is incorrect."}
      </p>
      <Link
        to="/"
        style={{ padding: "12px 24px", borderRadius: "var(--radius-md)", background: "var(--color-accent)", color: "#0C0C0E", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
      >
        Back to shop
      </Link>
    </motion.div>
  );
}
