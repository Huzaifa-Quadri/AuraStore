/* ── Quantity stepper ──────────────────────────────────────────────────────
   Reusable +/- control, clamped to [1, max]. The number pops on change via an
   AnimatePresence key swap. `max` is the available stock (0 → disabled).       */

import { AnimatePresence, motion } from "framer-motion";

const btn = (disabled) => ({
  width: 38,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  color: disabled ? "var(--color-text-muted)" : "#fff",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: 18,
  lineHeight: 1,
  transition: "color var(--transition-fast)",
});

export default function QuantityStepper({ value, onChange, max = 99 }) {
  const canDec = value > 1;
  const canInc = value < Math.max(1, max);

  const set = (next) => onChange(Math.min(Math.max(1, next), Math.max(1, max)));

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--color-border-visible)",
        borderRadius: "var(--radius-md)",
        background: "var(--color-bg-surface)",
        overflow: "hidden",
      }}
    >
      <motion.button
        type="button"
        aria-label="Decrease quantity"
        disabled={!canDec}
        onClick={() => set(value - 1)}
        whileTap={canDec ? { scale: 0.85 } : {}}
        style={btn(!canDec)}
      >
        −
      </motion.button>

      <div style={{ position: "relative", width: 40, height: 38, overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        aria-label="Increase quantity"
        disabled={!canInc}
        onClick={() => set(value + 1)}
        whileTap={canInc ? { scale: 0.85 } : {}}
        style={btn(!canInc)}
      >
        +
      </motion.button>
    </div>
  );
}
