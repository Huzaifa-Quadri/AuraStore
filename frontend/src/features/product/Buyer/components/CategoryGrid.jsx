/* ── "Shop by Category" grid ───────────────────────────────────────────────
   Real categories are yet to be added — `categories` defaults to mock data.
   onCategoryClick is a placeholder (e.g. navigate to a category page).        */

import CategoryCard from "./CategoryCard";
import SectionHeader from "./SectionHeader";
import { MOCK_CATEGORIES } from "./data";

export default function CategoryGrid({ categories = MOCK_CATEGORIES, onCategoryClick, onSeeAll }) {
  return (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) clamp(16px, 4vw, 48px)" }}>
      <SectionHeader title="Shop by Category" onSeeAll={onSeeAll} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} onClick={onCategoryClick} />
        ))}
      </div>
    </section>
  );
}
