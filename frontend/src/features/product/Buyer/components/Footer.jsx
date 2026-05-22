/* ── Site footer (4-column) ────────────────────────────────────────────────
   Static links — replace hrefs/routes as your pages are built.               */

const COLUMNS = [
  { heading: "Shop", links: ["New Arrivals", "Apparel", "Footwear", "Accessories", "Sale"] },
  { heading: "Help", links: ["Shipping", "Returns", "Order Tracking", "Contact"] },
  { heading: "Company", links: ["About", "Careers", "Sustainability", "Press"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Cookie Policy"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg-elevated)", borderTop: "1px solid var(--color-border-subtle)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px clamp(16px, 4vw, 48px) 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32,
        }}
      >
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
              {col.heading}
            </h4>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                style={{ display: "block", fontSize: 13, color: "var(--color-text-secondary)", textDecoration: "none", marginBottom: 8, transition: "color var(--transition-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--color-border-subtle)", padding: "20px clamp(16px, 4vw, 48px)", maxWidth: 1280, margin: "0 auto" }}>
        <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>AuraStore</span>
        <span style={{ float: "right", fontSize: 12, color: "var(--color-text-muted)" }}>© 2026 AuraStore. All rights reserved.</span>
      </div>
    </footer>
  );
}
