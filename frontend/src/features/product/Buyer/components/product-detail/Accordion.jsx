/* ── Accordion ─────────────────────────────────────────────────────────────
   Reusable collapsible section with an animated height:auto expand/collapse
   and a rotating chevron. Used for Description and Specifications.            */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 2px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span className="font-display" style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ color: "var(--color-text-secondary)", display: "inline-flex" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: "easeInOut" }, opacity: { duration: 0.2 } }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 2px 24px" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
