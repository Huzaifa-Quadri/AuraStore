/* ── Single product tile shown in the products grid ──────────────────────── */

import { IcoImage } from './Icons';

/* Map currency code → symbol prefix */
const CURRENCY_SYMBOL = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', PKR: '₨' };

export default function ProductCard({ product }) {
  const img      = product.image?.url || product.images?.[0]?.url || product.images?.[0];
  const amount   = product.price?.amount ?? product.price;
  const currency = product.price?.currency || 'INR';
  const symbol   = CURRENCY_SYMBOL[currency] || '';
  const priceNum = typeof amount === 'number' ? amount : parseFloat(amount);
  const priceStr = isNaN(priceNum) ? String(amount ?? '') : `${symbol}${priceNum.toFixed(2)}`;
  const units    = product.unitsSold ?? 0;

  return (
    <div className="product-card" style={{ background: '#0f1522', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', cursor: 'pointer' }}>

      {/* Thumbnail */}
      <div style={{ width: '100%', aspectRatio: '4 / 3', background: '#111826', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {img ? (
          <img src={img} alt={product.image?.alt || product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.1)' }}><IcoImage /></div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,21,34,0.65) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,107,53,0.88)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 8, backdropFilter: 'blur(4px)' }}>
          {priceStr}
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: '13px 15px 15px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>{units} sold</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#ff6b35' }}>{priceStr}</span>
        </div>
      </div>

    </div>
  );
}
