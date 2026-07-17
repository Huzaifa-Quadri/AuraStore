import React from "react";
import { SectionHeader, FieldLabel, ErrorMsg, Hint } from "./FormHelpers";

const VariantsCard = ({
  variants,
  currencies,
  maxImages,
  errors,
  onAdd,
  onRemove,
  onField,
  onAddImages,
  onRemoveImage,
  onAddAttr,
  onRemoveAttr,
  onAttr,
}) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
    <div className="flex items-center justify-between mb-5">
      <SectionHeader color="purple" label="Variants" noMargin />
      <span className="text-[11px] font-bold px-3 py-1 rounded-full border bg-white/4 border-white/8 text-white/35">
        {variants.length}
      </span>
    </div>

    {variants.length === 0 && (
      <p className="text-white/22 text-[12px] mb-4">
        No variants. The product sells as a single item using the price and stock above.
        Add variants for different colors, sizes, etc. — each with its own price, stock, and images.
      </p>
    )}

    <div className="flex flex-col gap-5">
      {variants.map((v, vi) => {
        const cur = currencies.find((c) => c.code === v.currency);
        return (
          <div key={v.id} className="rounded-xl border border-white/8 bg-white/2 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/55 text-[12px] font-bold uppercase tracking-[0.12em]">
                Variant {vi + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(v.id)}
                className="text-[11px] font-semibold text-red-400/70 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>

            {/* Attributes */}
            <FieldLabel label="Attributes" />
            <div className="flex flex-col gap-2 mb-3">
              {v.attributes.map((attr, ai) => (
                <div key={ai} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="key (e.g. color)"
                    value={attr.key}
                    onChange={(e) => onAttr(v.id, ai, "key", e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-white/8 bg-white/3 text-white text-sm placeholder:text-white/18 outline-none focus:border-white/20"
                  />
                  <input
                    type="text"
                    placeholder="value (e.g. Red)"
                    value={attr.value}
                    onChange={(e) => onAttr(v.id, ai, "value", e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-white/8 bg-white/3 text-white text-sm placeholder:text-white/18 outline-none focus:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveAttr(v.id, ai)}
                    className="w-8 h-8 shrink-0 rounded-lg border border-white/8 flex items-center justify-center text-white/35 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onAddAttr(v.id)}
                className="self-start text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors"
              >
                + Add attribute
              </button>
            </div>

            {/* Price + Currency + Stock */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div>
                <FieldLabel label="Price" />
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/8 bg-white/3">
                  <span className="text-[#ff6b35] font-black text-sm shrink-0 leading-none">{cur?.symbol}</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={v.price}
                    onChange={(e) => onField(v.id, "price", e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <div>
                <FieldLabel label="Currency" />
                <div className="flex items-center gap-1 px-3 py-2.5 rounded-lg border border-white/8 bg-white/3">
                  <select
                    value={v.currency}
                    onChange={(e) => onField(v.id, "currency", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-white text-sm appearance-none cursor-pointer"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#0b0f1a] text-white">{c.code}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel label="Stock" />
                <div className="flex items-center px-3 py-2.5 rounded-lg border border-white/8 bg-white/3">
                  <input
                    type="number"
                    placeholder="0"
                    value={v.stock}
                    onChange={(e) => onField(v.id, "stock", e.target.value)}
                    min="0"
                    step="1"
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="flex items-center justify-between mb-2">
              <FieldLabel label={`Images (${v.images.length}/${maxImages})`} />
              {v.images.length < maxImages && (
                <label className="text-[11px] font-semibold text-white/40 hover:text-white/70 cursor-pointer transition-colors">
                  + Add images
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      onAddImages(v.id, e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
            {v.images.length > 0 ? (
              <div className="grid grid-cols-4 gap-2">
                {v.images.map((img, ii) => (
                  <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-white/8 bg-white/3">
                    <img src={img.preview} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(v.id, ii)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/75"
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                        <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <Hint>Optional — leave empty to reuse the main product photos</Hint>
            )}

            {errors[`variant-${v.id}`] && <ErrorMsg msg={errors[`variant-${v.id}`]} />}
          </div>
        );
      })}
    </div>

    <button
      type="button"
      onClick={onAdd}
      className="w-full mt-5 py-3 rounded-xl border-2 border-dashed border-white/10 text-white/45 text-sm font-semibold hover:border-white/22 hover:text-white/70 transition-all flex items-center justify-center gap-2"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Add variant
    </button>
  </div>
);

export default VariantsCard;
