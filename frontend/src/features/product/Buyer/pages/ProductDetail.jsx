/* ── Buyer Product Detail ──────────────────────────────────────────────────
   Fetches one product by :id and presents it in the storefront's dark-luxury
   language. Owns the cross-cutting selection state (variant / image /
   quantity) and feeds it to the presentational sub-components. Cart is
   visual-only for now (toast) — no cart state exists yet.                     */

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import "../styles/buyer.css";

import BuyerNavbar from "../components/BuyerNavbar";
import Footer from "../components/Footer";
import { useProduct } from "../hook/useProduct.hook";

import Breadcrumb from "../components/product-detail/Breadcrumb";
import ProductGallery from "../components/product-detail/ProductGallery";
import ProductInfo from "../components/product-detail/ProductInfo";
import VariantSelector from "../components/product-detail/VariantSelector";
import BuyBox from "../components/product-detail/BuyBox";
import StickyBuyBar from "../components/product-detail/StickyBuyBar";
import Accordion from "../components/product-detail/Accordion";
import SpecsTable from "../components/product-detail/SpecsTable";
import ReviewsPlaceholder from "../components/product-detail/ReviewsPlaceholder";
import ProductDetailSkeleton from "../components/product-detail/ProductDetailSkeleton";
import ProductNotFound from "../components/product-detail/ProductNotFound";

import { galleryFor, minVariantPrice } from "../utils/format";

const section = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProductDetail() {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");

  // Selection state
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sticky bar visibility — driven by an observer on the main buy box.
  const buyBoxRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    handleGetProductById(id)
      .then((p) => {
        if (!alive) return;
        setProduct(p);
        setStatus("ready");
      })
      .catch((err) => {
        if (!alive) return;
        setErrorMsg(err?.response?.data?.message || "");
        setStatus("error");
      });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Reset selection whenever a different product loads.
  useEffect(() => {
    setSelectedVariantIdx(null);
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  const variants = useMemo(() => product?.variants || [], [product]);
  const selectedVariant = selectedVariantIdx != null ? variants[selectedVariantIdx] : null;
  const hasVariants = variants.length > 0;
  const showingBaseWithVariants = hasVariants && selectedVariantIdx == null;

  const gallery = useMemo(() => galleryFor(product, selectedVariant), [product, selectedVariant]);

  // Active price / stock reflect the selection; before a variant is picked we
  // show the cheapest variant ("from") and combined variant stock.
  const combinedVariantStock = useMemo(
    () => variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0),
    [variants],
  );
  const activePrice = selectedVariant?.price
    ?? (showingBaseWithVariants ? minVariantPrice(variants) : product?.price);
  const activeStock = selectedVariant ? selectedVariant.stock
    : (showingBaseWithVariants ? combinedVariantStock : product?.stock);

  const selectVariant = (idx) => {
    setSelectedVariantIdx(idx);
    setActiveImage(0);
    setQuantity(1);
  };

  // Observe the buy box; show the sticky bar once it leaves the viewport.
  useEffect(() => {
    const el = buyBoxRef.current;
    if (!el || status !== "ready") return;
    const io = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [status]);

  return (
    <div className="buyer-home">
      <BuyerNavbar cartCount={0} onAccountClick={() => {}} />

      {status === "loading" && <ProductDetailSkeleton />}

      {status === "error" && <ProductNotFound message={errorMsg} />}

      {status === "ready" && product && (
        <>
          <Breadcrumb category={product.category} title={product.title} />

          <StickyBuyBar
            visible={showStickyBar}
            product={product}
            price={activePrice}
            stock={activeStock}
            thumb={gallery[0]}
            quantity={quantity}
          />

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px clamp(16px, 4vw, 48px) 64px" }}>
            {/* Top: gallery + info/buy */}
            <div className="pd-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: 48, alignItems: "start" }}>
              {/* Gallery (sticky on desktop) */}
              <motion.div initial="hidden" animate="show" variants={section} className="pd-gallery-col" style={{ position: "sticky", top: 80 }}>
                <ProductGallery
                  images={gallery}
                  title={product.title}
                  activeIndex={Math.min(activeImage, Math.max(0, gallery.length - 1))}
                  onSelect={setActiveImage}
                />
              </motion.div>

              {/* Info + buy box */}
              <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                <motion.div variants={section}>
                  <ProductInfo
                    product={product}
                    price={activePrice}
                    stock={activeStock}
                    fromPrice={showingBaseWithVariants}
                    variantCount={variants.length}
                  />
                </motion.div>

                <motion.div variants={section} ref={buyBoxRef}>
                  <BuyBox
                    product={product}
                    price={activePrice}
                    stock={activeStock}
                    quantity={quantity}
                    onQuantity={setQuantity}
                    selectedVariant={selectedVariant}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Variants */}
            {hasVariants && (
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={section} style={{ marginTop: 56 }}>
                <VariantSelector
                  product={product}
                  variants={variants}
                  selectedIdx={selectedVariantIdx}
                  onSelect={selectVariant}
                />
              </motion.div>
            )}

            {/* Description + specs */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={section} style={{ marginTop: 56 }}>
              <Accordion title="Description" defaultOpen>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-text-secondary)", whiteSpace: "pre-line", margin: 0 }}>
                  {product.description}
                </p>
              </Accordion>
              <Accordion title="Specifications">
                <SpecsTable product={product} />
              </Accordion>
            </motion.div>

            {/* Reviews */}
            <div style={{ marginTop: 56 }}>
              <ReviewsPlaceholder />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
