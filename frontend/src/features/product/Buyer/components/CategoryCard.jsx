/* ── Single category tile (4:5 image + gradient overlay + label) ───────────
   Hover zooms the image. onClick wired by CategoryGrid.                      */

import { useState } from "react";

export default function CategoryCard({ category, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => onClick?.(category)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        aspectRatio: "4 / 5",
        cursor: "pointer",
      }}
    >
      <img
        src={category.image}
        alt={category.label}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "transform var(--transition-slow)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "#fff",
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {category.label}
      </span>
    </div>
  );
}
