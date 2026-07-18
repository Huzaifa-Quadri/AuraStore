/* ── Product gallery ───────────────────────────────────────────────────────
   Thumbnail rail (vertical on desktop, horizontal on mobile) + a large main
   image. The main image crossfades between selections via AnimatePresence,
   zooms + pans toward the cursor on hover, and opens a full-screen lightbox on
   click. Falls back to a placeholder when the product has no images.          */

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { imgUrl, imgAlt } from "../../utils/format";
import { IcoImage } from "../Icons";

export default function ProductGallery({ images = [], title = "", activeIndex, onSelect }) {
  const reduce = useReducedMotion();
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const hasImages = images.length > 0;
  const active = images[activeIndex] || images[0];

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: 14 }} className="pd-gallery">
      {/* Thumbnail rail */}
      {images.length > 1 && (
        <div className="pd-thumbs no-scrollbar" style={{ display: "flex", gap: 10, overflowX: "auto" }}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => onSelect(i)}
              onClick={() => onSelect(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                flex: "0 0 auto",
                width: 62,
                height: 62,
                padding: 0,
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                cursor: "pointer",
                background: "var(--color-bg-surface)",
                border: `1.5px solid ${activeIndex === i ? "var(--color-accent)" : "var(--color-border-subtle)"}`,
                transition: "border-color var(--transition-base)",
              }}
            >
              <img src={imgUrl(img)} alt={imgAlt(img, title)} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: activeIndex === i ? 1 : 0.6 }} />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div
        onMouseMove={handleMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => { setZoomed(false); setOrigin("50% 50%"); }}
        onClick={() => hasImages && setLightbox(true)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border-subtle)",
          cursor: hasImages ? "zoom-in" : "default",
        }}
      >
        {hasImages ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={imgUrl(active)}
              src={imgUrl(active)}
              alt={imgAlt(active, title)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: zoomed && !reduce ? 1.6 : 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ opacity: { duration: 0.3 }, scale: { duration: zoomed ? 0.35 : 0.4, ease: "easeOut" } }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transformOrigin: origin,
                display: "block",
              }}
            />
          </AnimatePresence>
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-border-visible)" }}>
            <IcoImage width={54} height={54} />
          </div>
        )}

        {images.length > 1 && (
          <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: "#fff", background: "rgba(0,0,0,0.55)", padding: "4px 9px", borderRadius: 20, backdropFilter: "blur(4px)" }}>
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Lightbox — portalled to <body> so it escapes the gallery column's
          transformed stacking context and paints above the buy box. */}
      {createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(6,6,8,0.92)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              cursor: "zoom-out",
            }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(false)}
              style={{ position: "absolute", top: 20, right: 24, width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--color-border-visible)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 20, cursor: "pointer" }}
            >
              ✕
            </button>
            <motion.img
              key={imgUrl(active)}
              src={imgUrl(active)}
              alt={imgAlt(active, title)}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "var(--radius-md)" }}
            />
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
