/* ── Seller's product listing with filter/sort controls ──────────────────── */

import { IcoImage } from '../components/seller-dashboard/Icons';
import ProductCard from '../components/seller-dashboard/ProductCard';

/* Shared input/select base styles */
const INPUT_BASE = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 10,
  color: '#fff',
  padding: '8px 12px',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'Inter,sans-serif',
  transition: 'border-color 0.2s',
};

const SELECT_STYLE = {
  ...INPUT_BASE,
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: 34,
  minWidth: 160,
};

/* ── Filter bar (sort + price range) ── */
function FilterBar({ sortBy, setSortBy, priceMin, setPriceMin, priceMax, setPriceMax, count }) {
  return (
    <div style={{ background: '#0f1522', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '14px 20px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>FILTER</div>
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={SELECT_STYLE}>
        <option value="newest">Newest First</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="most_sold">Most Sold</option>
      </select>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="number" placeholder="Min $" value={priceMin} onChange={e => setPriceMin(e.target.value)} style={{ ...INPUT_BASE, width: 88 }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>—</span>
        <input type="number" placeholder="Max $" value={priceMax} onChange={e => setPriceMax(e.target.value)} style={{ ...INPUT_BASE, width: 88 }} />
      </div>

      {(priceMin || priceMax) && (
        <button onClick={() => { setPriceMin(''); setPriceMax(''); }} style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: '#ff6b35', padding: '6px 14px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
          Clear
        </button>
      )}

      <div style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.28)', whiteSpace: 'nowrap' }}>
        {count} product{count !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

/* ── Loading skeleton grid ── */
function SkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ borderRadius: 16, overflow: 'hidden', background: '#0f1522', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="skeleton" style={{ width: '100%', aspectRatio: '4 / 3' }} />
          <div style={{ padding: 15 }}>
            <div className="skeleton" style={{ height: 13, width: '70%', marginBottom: 10, borderRadius: 6 }} />
            <div className="skeleton" style={{ height: 11, width: '45%', borderRadius: 6 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Empty-state when no products match ── */
function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '70px 20px' }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(255,255,255,0.04)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.15)' }}>
        <IcoImage />
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 5, fontWeight: 600 }}>No products found</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)' }}>Products you create will appear here.</div>
    </div>
  );
}

/* ── Assembled products page ── */
export default function ProductsPage({ products, loading, error, sortBy, setSortBy, priceMin, setPriceMin, priceMax, setPriceMax }) {
  return (
    <div>
      <FilterBar
        sortBy={sortBy} setSortBy={setSortBy}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        count={products.length}
      />

      {loading ? (
        <SkeletonGrid />
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '70px 20px' }}>
          <div style={{ fontSize: 14, color: '#f87171', marginBottom: 8, fontWeight: 600 }}>Failed to load products</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)' }}>{error}</div>
        </div>
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
