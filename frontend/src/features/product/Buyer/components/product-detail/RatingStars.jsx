/* ── Reusable star row ─────────────────────────────────────────────────────
   Renders 5 stars, filling `value` of them with the gold accent. Purely
   presentational — used by ProductInfo and ReviewsPlaceholder.               */

import { IcoStar } from "../Icons";

export default function RatingStars({ value = 0, size = 15, gap = 3 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IcoStar
          key={i}
          width={size}
          height={size}
          style={{ color: i < Math.round(value) ? "var(--color-accent)" : "rgba(255,255,255,0.14)" }}
        />
      ))}
    </div>
  );
}
