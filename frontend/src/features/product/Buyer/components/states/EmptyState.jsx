/* ── Shown when the product list is empty ──────────────────────────────────
   onAction is optional — wire it to "clear filters" or "browse all".         */

import { IcoImage } from "../Icons";

export default function EmptyState({
  title = "No products yet",
  message = "We couldn't find anything here. Check back soon or explore other categories.",
  actionLabel,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "72px 24px",
        color: "var(--color-text-secondary)",
      }}
    >
      <div style={{ color: "var(--color-border-visible)", marginBottom: 16 }}>
        <IcoImage />
      </div>
      <h3 className="font-display" style={{ fontSize: 28, fontWeight: 400, color: "var(--color-text-primary)", margin: "0 0 8px" }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, maxWidth: 360, lineHeight: 1.5, margin: 0 }}>{message}</p>

      {actionLabel && (
        <button
          onClick={onAction}
          style={{
            marginTop: 24,
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid var(--color-accent)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-accent)",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
