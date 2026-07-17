/* ── Seller-facing product detail page ───────────────────────────────────────
 *  Opens when a seller clicks a product tile on ProductsPage. Presents the
 *  product like a premium storefront (gallery + info), while keeping a
 *  seller-oriented "inventory & actions" rail and a full variant breakdown.
 *
 *  Props:
 *    product  : the product document ({ title, price:{amount,currency}, images, variants, ... })
 *    onBack   : () => void   — return to the products grid
 *    onEdit   : (product) => void   — optional, shows an Edit button when provided
 *    onDelete : (product) => void   — optional, shows a Delete button when provided
 * ───────────────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from "react";

const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥", PKR: "₨" };

/* Normalise an image entry that may be a string or an { url, alt } object. */
const imgUrl = (img) => (typeof img === "string" ? img : img?.url) || "";
const imgAlt = (img, fallback) => (typeof img === "object" && img?.alt) || fallback;

/* Format a { amount, currency } money object (or a bare number) into "₹1,299.00". */
const money = (price) => {
  const amount = price?.amount ?? price;
  const currency = price?.currency || "INR";
  const symbol = CURRENCY_SYMBOL[currency] || "";
  const n = typeof amount === "number" ? amount : parseFloat(amount);
  return isNaN(n) ? String(amount ?? "—") : `${symbol}${n.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

/* Map a stock count → presentational status. */
const stockStatus = (n) => {
  const s = Number(n) || 0;
  if (s <= 0) return { label: "Out of stock", dot: "bg-red-400", text: "text-red-400", ring: "border-red-500/25 bg-red-500/8" };
  if (s <= 10) return { label: `Only ${s} left`, dot: "bg-amber-400", text: "text-amber-400", ring: "border-amber-500/25 bg-amber-500/8" };
  return { label: `In stock · ${s} units`, dot: "bg-emerald-400", text: "text-emerald-400", ring: "border-emerald-500/25 bg-emerald-500/8" };
};

/* ── Small presentational atoms ─────────────────────────────────────────────── */

const SectionTitle = ({ color = "orange", children }) => (
  <h2 className="text-white font-bold text-[15px] flex items-center gap-2.5 mb-5">
    <span
      className={`w-1 h-4 rounded-full ${
        color === "orange"
          ? "bg-linear-to-b from-[#ff6b35] to-[#e04520]"
          : "bg-linear-to-b from-[#a855f7] to-[#7c3aed]"
      }`}
    />
    {children}
  </h2>
);

const Stars = ({ value = 0 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="shrink-0"
        fill={i < Math.round(value) ? "#ff6b35" : "rgba(255,255,255,0.12)"}>
        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

/* ── Empty / fallback state ─────────────────────────────────────────────────── */

const NotFound = ({ onBack }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
    <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-4 text-white/20">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
      </svg>
    </div>
    <p className="text-white/55 font-semibold text-sm mb-1">No product selected</p>
    <p className="text-white/25 text-[12px] mb-5">Pick a product from the grid to see its details.</p>
    {onBack && (
      <button onClick={onBack} className="px-5 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 transition-colors">
        Back to products
      </button>
    )}
  </div>
);

/* ── Main component ─────────────────────────────────────────────────────────── */

const SellerProductDetail = ({ product, onBack, onEdit, onDelete }) => {
  // selectedVariant === null → viewing the base product.
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  const variants = useMemo(() => product?.variants || [], [product]);
  const selectedVariant = selectedVariantIdx != null ? variants[selectedVariantIdx] : null;

  const hasVariants = variants.length > 0;
  const showingBaseWithVariants = hasVariants && selectedVariantIdx == null;

  // Gallery shows the selected variant's images if it has any, otherwise the base images.
  const gallery = useMemo(() => {
    const base = product?.images?.length ? product.images : [];
    const v = selectedVariant?.images?.length ? selectedVariant.images : null;
    return v || base;
  }, [product, selectedVariant]);

  // Seller summary: total inventory across variants (or base if no variants).
  const totalStock = useMemo(() => {
    const base = Number(product?.stock) || 0;
    const v = variants.reduce((sum, x) => sum + (Number(x.stock) || 0), 0);
    return variants.length ? v : base;
  }, [product, variants]);

  // Lowest variant price — shown as "from X" when no variant is selected yet.
  const minVariantPrice = useMemo(() => {
    if (!variants.length) return null;
    let min = null, minAmt = Infinity;
    for (const v of variants) {
      const raw = Number(v.price?.amount ?? v.price);
      const amt = isNaN(raw) ? Infinity : raw;
      if (amt < minAmt) { minAmt = amt; min = v.price; }
    }
    return min;
  }, [variants]);

  // The price / stock shown reflects the active selection; when variants exist and
  // none is selected yet, show min-variant price and combined variant stock.
  const activePrice = selectedVariant?.price ?? (showingBaseWithVariants ? minVariantPrice : product?.price);
  const activeStock = selectedVariant ? selectedVariant.stock : (showingBaseWithVariants ? totalStock : product?.stock);

  if (!product) return <NotFound onBack={onBack} />;

  const status = stockStatus(activeStock);
  const created = product.createdAt ? new Date(product.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "—";

  const selectVariant = (idx) => {
    setSelectedVariantIdx(idx);
    setActiveImg(0);
  };

  return (
    <div className="min-h-screen bg-[#07090f] text-white" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 border-b border-white/6 bg-[#07090f]/90 backdrop-blur-md">
        <div className="w-full px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="w-9 h-9 shrink-0 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center hover:bg-white/8 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-white/30 text-[11px] font-medium flex items-center gap-1.5">
                <span>Products</span>
                <span className="text-white/15">/</span>
                <span className="text-white/45">{product.category || "Detail"}</span>
              </p>
              <h1 className="text-white font-bold text-[17px] leading-tight truncate">{product.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-linear-to-br from-[#ff6b35] to-[#a855f7] rounded-lg flex items-center justify-center font-black text-white text-sm">S</div>
            <span className="text-white/50 font-black text-sm tracking-[3px] hidden sm:inline">SNITCH</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

          {/* ── Gallery ── */}
          <div className="lg:col-span-5">
            <div className="flex gap-3 lg:sticky lg:top-24">
              {/* Thumbnail rail */}
              {gallery.length > 1 && (
                <div className="flex flex-col gap-2.5 shrink-0">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setActiveImg(i)}
                      onClick={() => setActiveImg(i)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i ? "border-[#ff6b35]" : "border-white/8 hover:border-white/25"
                      }`}
                    >
                      <img src={imgUrl(img)} alt={imgAlt(img, product.title)} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 group rounded-2xl overflow-hidden border border-white/8 bg-[#0a0d16] aspect-square flex items-center justify-center">
                {gallery.length ? (
                  <img
                    src={imgUrl(gallery[activeImg])}
                    alt={imgAlt(gallery[activeImg], product.title)}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-white/12">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Product info ── */}
          <div className="lg:col-span-4 flex flex-col">
            {/* brand + category chips */}
            <div className="flex items-center gap-2 mb-3">
              {product.brand && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff6b35]/20 text-[#ff6b35] tracking-wide uppercase">
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-white/45">
                  {product.category}
                </span>
              )}
            </div>

            <h2 className="text-white font-bold text-[26px] leading-tight mb-3">{product.title}</h2>

            {/* rating placeholder (model has no reviews yet) */}
            <div className="flex items-center gap-2.5 mb-5">
              <Stars value={0} />
              <span className="text-white/30 text-[12px]">No reviews yet</span>
            </div>

            {/* price */}
            <div className="flex items-end gap-3 mb-2">
              {showingBaseWithVariants && <span className="text-white/40 text-sm font-semibold self-end mb-1.5">from</span>}
              <span className="text-white font-black text-[34px] leading-none">{money(activePrice)}</span>
              <span className="text-white/30 text-[12px] mb-1">
                {showingBaseWithVariants ? `· ${variants.length} variants` : "incl. all taxes"}
              </span>
            </div>

            {/* stock status */}
            <div className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg border mb-6 ${status.ring}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className={`text-[12px] font-semibold ${status.text}`}>{status.label}</span>
            </div>

            {/* description */}
            <div className="mb-6">
              <SectionTitle>Description</SectionTitle>
              <p className="text-white/55 text-[13.5px] leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* selected variant attributes */}
            {selectedVariant && selectedVariant.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
              <div className="mb-2">
                <SectionTitle color="purple">Selected variant</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedVariant.attributes).map(([k, v]) => (
                    <span key={k} className="text-[12px] px-3 py-1.5 rounded-lg bg-white/4 border border-white/8">
                      <span className="text-white/40">{k}: </span>
                      <span className="text-white font-semibold">{v}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Seller "buy box" / actions rail ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-5 lg:sticky lg:top-24">
              <p className="text-white/40 text-[11px] font-bold tracking-[0.5px] uppercase mb-1">
                {selectedVariant ? "Variant price" : showingBaseWithVariants ? "Starting from" : "Listing price"}
              </p>
              <p className="text-white font-black text-[26px] leading-none mb-4">{money(activePrice)}</p>

              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border mb-5 ${status.ring}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                <span className={`text-[12px] font-semibold ${status.text}`}>{status.label}</span>
              </div>

              {/* seller actions */}
              <div className="flex flex-col gap-2.5 mb-5">
                <button
                  type="button"
                  onClick={() => onEdit?.(product)}
                  className="w-full py-2.5 rounded-xl bg-linear-to-r from-[#ff6b35] to-[#e04520] text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit product
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(product)}
                  className="w-full py-2.5 rounded-xl border border-red-500/25 bg-red-500/8 text-red-400 text-sm font-semibold hover:bg-red-500/15 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              </div>

              {/* metadata */}
              <div className="border-t border-white/6 pt-4 flex flex-col gap-3">
                {[
                  ["Total inventory", `${totalStock} units`],
                  ["Variants", variants.length || "—"],
                  ["Images", product.images?.length || 0],
                  ["Created", created],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/35 text-[12px]">{label}</span>
                    <span className="text-white/75 text-[12px] font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Variants ── */}
        {variants.length > 0 && (
          <div className="mt-10 rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
            <div className="flex items-center justify-between mb-5">
              <SectionTitle color="purple">Variants</SectionTitle>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/4 border border-white/8 text-white/35">
                {variants.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* base product as a selectable option */}
              <button
                type="button"
                onClick={() => selectVariant(null)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  selectedVariant == null ? "border-[#ff6b35]/50 bg-[#ff6b35]/5" : "border-white/8 bg-white/2 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/55 text-[11px] font-bold uppercase tracking-[0.12em]">Base product</span>
                  {selectedVariant == null && <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />}
                </div>
                <p className="text-white font-bold text-lg mb-1">{money(product.price)}</p>
                <p className="text-white/35 text-[12px]">{stockStatus(product.stock).label}</p>
              </button>

              {variants.map((v, i) => {
                const isActive = selectedVariantIdx === i;
                const attrs = v.attributes ? Object.entries(v.attributes) : [];
                const thumb = v.images?.[0] || product.images?.[0];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectVariant(i)}
                    className={`text-left rounded-xl border p-4 transition-all ${
                      isActive ? "border-[#a855f7]/50 bg-[#a855f7]/5" : "border-white/8 bg-white/2 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden border border-white/8 bg-white/3 flex items-center justify-center">
                        {thumb ? (
                          <img src={imgUrl(thumb)} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white/15 text-[10px]">—</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/45 text-[11px] font-bold uppercase tracking-[0.12em]">Variant {i + 1}</span>
                          {isActive && <span className="w-2 h-2 rounded-full bg-[#a855f7]" />}
                        </div>
                        <p className="text-white font-bold text-base leading-none mb-1.5">{money(v.price)}</p>
                        <p className="text-white/35 text-[11px]">{stockStatus(v.stock).label}</p>
                      </div>
                    </div>

                    {attrs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {attrs.map(([k, val]) => (
                          <span key={k} className="text-[10.5px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-white/55">
                            {k}: <span className="text-white/80 font-semibold">{val}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Specifications ── */}
        <div className="mt-6 rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
          <SectionTitle>Specifications</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
            {[
              ["Brand", product.brand],
              ["Category", product.category],
              ["Base price", money(product.price)],
              ["Currency", product.price?.currency || "INR"],
              ["Base stock", `${Number(product.stock) || 0} units`],
              ["Total variants", variants.length],
            ].map(([label, value], i) => (
              <div key={label} className={`flex items-center justify-between py-3 ${i < 4 ? "border-b border-white/6" : "sm:border-b-0 border-b border-white/6"}`}>
                <span className="text-white/35 text-[12.5px]">{label}</span>
                <span className="text-white/80 text-[12.5px] font-semibold">{value ?? "—"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetail;
