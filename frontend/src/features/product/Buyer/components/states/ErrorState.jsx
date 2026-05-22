/* ── Shown when fetching products failed ───────────────────────────────────
   onRetry is optional — wire it to re-call your fetch hook.                  */

import { IcoAlert } from "../Icons";

export default function ErrorState({
  message = "Something went wrong while loading products.",
  onRetry,
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
      <div style={{ color: "#b4503c", marginBottom: 16 }}>
        <IcoAlert />
      </div>
      <h3 className="font-display" style={{ fontSize: 28, fontWeight: 400, color: "var(--color-text-primary)", margin: "0 0 8px" }}>
        Couldn't load products
      </h3>
      <p style={{ fontSize: 14, maxWidth: 360, lineHeight: 1.5, margin: 0 }}>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 24,
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid #FFFFFF",
            borderRadius: "var(--radius-sm)",
            color: "#FFFFFF",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background var(--transition-fast), color var(--transition-fast)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#0C0C0E"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FFFFFF"; }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
