/* ── Tabbed filter above the product grid ──────────────────────────────────
   Active tab is controlled by the parent (ProductSection). Real filtering is
   left blank — onChange just reports the selected tab label.                  */

export default function FilterTabs({ tabs = [], active, onChange }) {
  return (
    <div
      className="no-scrollbar"
      style={{
        display: "flex",
        gap: 0,
        borderBottom: "1px solid var(--color-border-subtle)",
        marginBottom: 24,
        overflowX: "auto",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange?.(tab)}
            style={{
              padding: "10px 20px",
              fontSize: 14,
              whiteSpace: "nowrap",
              color: isActive ? "#fff" : "var(--color-text-secondary)",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${isActive ? "#fff" : "transparent"}`,
              cursor: "pointer",
              transition: "color var(--transition-fast), border-color var(--transition-fast)",
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)"; }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
