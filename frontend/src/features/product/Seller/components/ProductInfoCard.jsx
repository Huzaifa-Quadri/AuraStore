import React from "react";
import { SectionHeader, FieldLabel, ErrorMsg, Hint } from "./FormHelpers";

const ProductInfoCard = ({ form, errors, focused, onUpdate, onFocus, onBlur, fieldClass }) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
    <SectionHeader color="orange" label="Product Info" />

    {/* Title */}
    <div className="mb-5">
      <FieldLabel label="Title" counter={`${form.title.length}/100`} warn={form.title.length > 90} />
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${fieldClass("title")}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <input
          type="text"
          placeholder="e.g. Vintage Oversized Leather Jacket"
          value={form.title}
          onChange={onUpdate("title")}
          onFocus={() => onFocus("title")}
          onBlur={onBlur}
          maxLength={100}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/18 font-medium"
        />
      </div>
      {errors.title && <ErrorMsg msg={errors.title} />}
      <Hint>5–100 characters required</Hint>
    </div>

    {/* Description */}
    <div>
      <FieldLabel label="Description" counter={`${form.description.length}/1000`} warn={form.description.length > 900} />
      <textarea
        placeholder="Describe your product — material, size, condition, dimensions, care instructions..."
        value={form.description}
        onChange={onUpdate("description")}
        onFocus={() => onFocus("description")}
        onBlur={onBlur}
        maxLength={1000}
        rows={7}
        className={`w-full px-4 py-3.5 rounded-xl border transition-all duration-200 text-white text-sm placeholder:text-white/18 bg-transparent outline-none resize-none font-medium leading-relaxed ${fieldClass("description")}`}
      />
      {errors.description && <ErrorMsg msg={errors.description} />}
      <Hint>20–1000 characters required</Hint>
    </div>
  </div>
);

export default ProductInfoCard;
