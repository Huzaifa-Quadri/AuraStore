/* ── Specifications table ──────────────────────────────────────────────────
   Simple label/value rows built from the product document. Rendered inside an
   Accordion on the detail page.                                               */

import { money } from "../../utils/format";

export default function SpecsTable({ product }) {
  const rows = [
    ["Brand", product.brand],
    ["Category", product.category],
    ["Base price", money(product.price)],
    ["Currency", product.price?.currency || "INR"],
    ["Base stock", `${Number(product.stock) || 0} units`],
    ["Variants", product.variants?.length || 0],
  ].filter(([, v]) => v !== undefined && v !== null && v !== "");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 40 }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--color-border-subtle)" }}>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
