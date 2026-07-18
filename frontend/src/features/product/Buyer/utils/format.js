/* ── Buyer storefront formatting helpers ───────────────────────────────────
   Shared by the product-detail components. Absorbs the two product image
   shapes in the DB: newer products carry `images:[{url,alt,isThumbnail}]`,
   older ones only a singular `image:{url}` with an empty `images` array.     */

export const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥", PKR: "₨" };

/* Normalise an image entry that may be a string or an { url, alt } object. */
export const imgUrl = (img) => (typeof img === "string" ? img : img?.url) || "";
export const imgAlt = (img, fallback) => (typeof img === "object" && img?.alt) || fallback;

/* Format a { amount, currency } money object (or a bare number) → "₹1,299". */
export const money = (price) => {
  const amount = price?.amount ?? price;
  const currency = price?.currency || "INR";
  const symbol = CURRENCY_SYMBOL[currency] || "";
  const n = typeof amount === "number" ? amount : parseFloat(amount);
  return isNaN(n) ? String(amount ?? "—") : `${symbol}${n.toLocaleString()}`;
};

/* Map a stock count → presentational status keyed to the buyer gold/amber/red theme.
   tone drives colour: "in" (emerald), "low" (amber/gold), "out" (red).          */
export const stockStatus = (n) => {
  const s = Number(n) || 0;
  if (s <= 0) return { label: "Out of stock", tone: "out", available: false, count: 0 };
  if (s <= 10) return { label: `Only ${s} left`, tone: "low", available: true, count: s };
  return { label: "In stock", tone: "in", available: true, count: s };
};

export const STOCK_TONE = {
  in:  { dot: "#4ade80", text: "#86efac", ring: "rgba(74,222,128,0.25)",  bg: "rgba(74,222,128,0.08)" },
  low: { dot: "#C4A052", text: "#E2C47A", ring: "rgba(196,160,82,0.30)",  bg: "rgba(196,160,82,0.10)" },
  out: { dot: "#f87171", text: "#fca5a5", ring: "rgba(248,113,113,0.25)", bg: "rgba(248,113,113,0.08)" },
};

/* Normalised gallery for the active selection: a selected variant's own images
   win, otherwise the product images, otherwise the legacy singular image.       */
export const galleryFor = (product, selectedVariant) => {
  if (selectedVariant?.images?.length) return selectedVariant.images;
  if (product?.images?.length) return product.images;
  if (product?.image) return [product.image];
  return [];
};

/* Lowest variant price, used to show "from ₹X" before a variant is picked. */
export const minVariantPrice = (variants = []) => {
  if (!variants.length) return null;
  let min = null, minAmt = Infinity;
  for (const v of variants) {
    const raw = Number(v.price?.amount ?? v.price);
    const amt = isNaN(raw) ? Infinity : raw;
    if (amt < minAmt) { minAmt = amt; min = v.price; }
  }
  return min;
};
