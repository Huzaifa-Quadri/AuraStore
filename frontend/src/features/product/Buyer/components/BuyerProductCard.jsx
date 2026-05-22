/* ── Buyer product tile ────────────────────────────────────────────────────
   Click is gated by the parent: Home passes `onClick(product)` which checks
   auth and redirects to /login when logged out. brand/rating render only when
   the product has them (fields may not exist yet).                           */

import { useState } from "react";
import { IcoStar, IcoImage } from "./Icons";

const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥", PKR: "₨" };

function formatPrice(product) {
  const amount = product.price?.amount ?? product.price;
  const currency = product.price?.currency || "INR";
  const symbol = CURRENCY_SYMBOL[currency] || "";
  const num = typeof amount === "number" ? amount : parseFloat(amount);
  return isNaN(num) ? String(amount ?? "") : `${symbol}${num.toLocaleString()}`;
}

export default function BuyerProductCard({ product, onClick }) {
  const [hover, setHover] = useState(false);
  const img = product.image?.url || product.images?.[0]?.url || product.images?.[0];
  const price = formatPrice(product);

  return (
    <div
      onClick={() => onClick?.(product)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--color-bg-surface)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 12px 32px rgba(0,0,0,0.45)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform var(--transition-base), box-shadow var(--transition-base)",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: "var(--color-bg-base)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {img ? (
          <img
            src={img}
            alt={product.image?.alt || product.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hover ? "scale(1.04)" : "scale(1)",
              transition: "transform var(--transition-slow)",
            }}
          />
        ) : (
          <div style={{ color: "var(--color-border-visible)" }}><IcoImage /></div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 16px" }}>
        {product.brand && (
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-secondary)", marginBottom: 4 }}>
            {product.brand}
          </div>
        )}

        <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.4, marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{price}</span>

          {product.rating != null && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-accent)" }}>
              <IcoStar width={13} height={13} />
              {product.rating}
              {product.ratingCount != null && (
                <span style={{ color: "var(--color-text-muted)", fontSize: 11 }}>({product.ratingCount})</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
