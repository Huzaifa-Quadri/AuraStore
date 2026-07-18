/* ── Breadcrumb ────────────────────────────────────────────────────────────
   Home / Category / Title. Segments fade+rise in a gentle stagger. The first
   two are links; the last (current product) is muted, non-interactive.        */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sep = (
  <span style={{ color: "var(--color-text-muted)", margin: "0 8px", userSelect: "none" }}>/</span>
);

const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

const linkStyle = {
  color: "var(--color-text-secondary)",
  textDecoration: "none",
  transition: "color var(--transition-fast)",
  whiteSpace: "nowrap",
};

export default function Breadcrumb({ category, title }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      initial="hidden"
      animate="show"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        fontSize: 12.5,
        letterSpacing: "0.02em",
        padding: "20px clamp(16px, 4vw, 48px) 0",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <motion.span variants={item}>
        <Link to="/" style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}>
          Home
        </Link>
      </motion.span>

      {category && (
        <motion.span variants={item} style={{ display: "inline-flex", alignItems: "center" }}>
          {sep}
          <span style={{ color: "var(--color-text-secondary)" }}>{category}</span>
        </motion.span>
      )}

      <motion.span variants={item} style={{ display: "inline-flex", alignItems: "center", minWidth: 0 }}>
        {sep}
        <span style={{ color: "var(--color-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "50vw" }}>
          {title}
        </span>
      </motion.span>
    </motion.nav>
  );
}
