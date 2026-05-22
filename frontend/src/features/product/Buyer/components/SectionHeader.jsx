/* ── Reusable section title + optional "See all" link ──────────────────────
   Arrow slides right on hover. onSeeAll is optional.                         */

import { useState } from "react";
import { IcoArrowRight } from "./Icons";

export default function SectionHeader({ title, seeAllLabel = "See all", onSeeAll }) {
  const [hover, setHover] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
      <h2 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#fff", margin: 0 }}>
        {title}
      </h2>

      {onSeeAll && (
        <button
          onClick={onSeeAll}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "var(--color-text-secondary)",
            fontSize: 13,
            letterSpacing: "0.05em",
            cursor: "pointer",
            transition: "color var(--transition-fast)",
          }}
        >
          {seeAllLabel}
          <span style={{ display: "inline-flex", transform: hover ? "translateX(4px)" : "translateX(0)", transition: "transform var(--transition-fast)" }}>
            <IcoArrowRight width={16} height={16} />
          </span>
        </button>
      )}
    </div>
  );
}
