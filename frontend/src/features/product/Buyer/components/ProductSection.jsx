/* ── Tabbed product grid with full state handling ──────────────────────────
   Switches between loading / error / empty / grid. Tab state is local; wire
   real filtering where noted. `onProductClick` is the auth-gated handler.     */

import { useState } from "react";
import FilterTabs from "./FilterTabs";
import BuyerProductCard from "./BuyerProductCard";
import ProductGridSkeleton from "./states/ProductGridSkeleton";
import EmptyState from "./states/EmptyState";
import ErrorState from "./states/ErrorState";
import { MOCK_TABS } from "./data";

export default function ProductSection({
  title = "Trending Now",
  tabs = MOCK_TABS,
  products = [],
  loading = false,
  error = null,
  onProductClick,
  onRetry,
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // TODO (you): filter products by activeTab here once products carry a category.
  const visible = products;

  function renderBody() {
    if (loading) return <ProductGridSkeleton />;
    if (error) return <ErrorState message={typeof error === "string" ? error : undefined} onRetry={onRetry} />;
    if (!visible || visible.length === 0) return <EmptyState />;

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {visible.map((p) => (
          <BuyerProductCard key={p._id || p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
    );
  }

  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)" }}>
      <h2 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#fff", margin: "0 0 24px" }}>
        {title}
      </h2>
      <FilterTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      {renderBody()}
    </section>
  );
}
