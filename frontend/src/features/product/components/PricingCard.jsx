import React from "react";
import { SectionHeader, FieldLabel, ErrorMsg } from "./FormHelpers";

const PricingCard = ({ form, errors, focused, currencies, selectedCurrency, onUpdate, onFocus, onBlur, fieldClass }) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
    <SectionHeader color="orange" label="Pricing" />

    {/* Currency */}
    <div className="mb-4">
      <FieldLabel label="Currency" />
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${fieldClass("currency")}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9a3 3 0 0 1 6 0c0 1.5-1 2.5-3 3-2 .5-3 1.5-3 3a3 3 0 0 0 6 0" />
        </svg>
        <select
          value={form.currency}
          onChange={onUpdate("currency")}
          onFocus={() => onFocus("currency")}
          onBlur={onBlur}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm appearance-none cursor-pointer font-medium"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code} className="bg-[#0b0f1a] text-white">
              {c.code} — {c.label}
            </option>
          ))}
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    {/* Price */}
    <div>
      <FieldLabel label="Price" />
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${fieldClass("price")}`}>
        <span className="text-[#ff6b35] font-black text-lg shrink-0 leading-none">{selectedCurrency?.symbol}</span>
        <input
          type="number"
          placeholder="0.00"
          value={form.price}
          onChange={onUpdate("price")}
          onFocus={() => onFocus("price")}
          onBlur={onBlur}
          min="0"
          step="0.01"
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/20 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      {errors.price && <ErrorMsg msg={errors.price} />}
    </div>

    {/* Price Preview */}
    {form.price !== "" && Number(form.price) >= 0 && (
      <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/6">
        <p className="text-white/28 text-[10px] uppercase font-bold tracking-[0.15em] mb-1.5">Listed price</p>
        <p className="text-white font-black text-2xl leading-none">
          {selectedCurrency?.symbol}
          {Number(form.price).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-white/25 text-xs font-semibold ml-1.5">{form.currency}</span>
        </p>
      </div>
    )}
  </div>
);

export default PricingCard;
