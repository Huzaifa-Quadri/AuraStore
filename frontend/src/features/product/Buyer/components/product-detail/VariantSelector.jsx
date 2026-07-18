/* ── Variant selector ──────────────────────────────────────────────────────
   Lists the base product plus each variant as a selectable card. The active
   card is marked by a shared-layout gold ring that slides between options
   (framer `layoutId`). Selecting one bubbles up so the page can swap the
   gallery, price and stock.                                                   */

import { motion } from "framer-motion";
import { money, stockStatus, imgUrl } from "../../utils/format";

function VariantCard({ selected, onClick, thumb, label, sub, price, attrs }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        textAlign: "left",
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        borderRadius: "var(--radius-lg)",
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border-subtle)",
        cursor: "pointer",
        width: "100%",
      }}
    >
      {selected && (
        <motion.span
          layoutId="variant-ring"
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-lg)", border: "1.5px solid var(--color-accent)", pointerEvents: "none" }}
        />
      )}

      {thumb !== undefined && (
        <span style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--color-bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {thumb ? <img src={imgUrl(thumb)} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ color: "var(--color-text-muted)", fontSize: 11 }}>—</span>}
        </span>
      )}

      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-secondary)" }}>{label}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>{money(price)}</span>
        </span>
        {attrs && attrs.length > 0 && (
          <span style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 6 }}>
            {attrs.map(([k, v]) => (
              <span key={k} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 5, background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>
                {k}: <b style={{ color: "#fff", fontWeight: 600 }}>{v}</b>
              </span>
            ))}
          </span>
        )}
        <span style={{ display: "block", fontSize: 11, color: "var(--color-text-muted)", marginTop: attrs?.length ? 6 : 4 }}>{sub}</span>
      </span>
    </button>
  );
}

export default function VariantSelector({ product, variants, selectedIdx, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <section>
      <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: "#fff", margin: "0 0 16px" }}>
        Choose a variant
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
        {/* base product */}
        <VariantCard
          selected={selectedIdx == null}
          onClick={() => onSelect(null)}
          thumb={product.images?.[0] || product.image}
          label="Base"
          price={product.price}
          sub={stockStatus(product.stock).label}
        />
        {variants.map((v, i) => (
          <VariantCard
            key={i}
            selected={selectedIdx === i}
            onClick={() => onSelect(i)}
            thumb={v.images?.[0] || product.images?.[0] || product.image}
            label={`Variant ${i + 1}`}
            price={v.price}
            sub={stockStatus(v.stock).label}
            attrs={v.attributes ? Object.entries(v.attributes) : []}
          />
        ))}
      </div>
    </section>
  );
}
