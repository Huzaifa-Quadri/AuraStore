import React from "react";
import { SectionHeader } from "./FormHelpers";

const ImageUploadCard = ({
  images,
  dragging,
  maxImages,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
  onImageRemove,
}) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
    <div className="flex items-center justify-between mb-5">
      <SectionHeader color="purple" label="Product Photos" noMargin />
      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-colors ${
        images.length >= maxImages
          ? "bg-orange-500/12 border-orange-500/25 text-orange-400"
          : "bg-white/4 border-white/8 text-white/35"
      }`}>
        {images.length} / {maxImages}
      </span>
    </div>

    {/* Drop Zone */}
    {images.length < maxImages && (
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 select-none ${
          dragging
            ? "border-[#ff6b35]/50 bg-[#ff6b35]/6 scale-[1.01]"
            : "border-white/10 hover:border-white/18 hover:bg-white/2"
        } ${images.length > 0 ? "py-5" : "py-10"}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
            dragging ? "bg-[#ff6b35]/18" : "bg-white/5"
          }`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dragging ? "#ff6b35" : "rgba(255,255,255,0.3)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2.5" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="text-center">
            <p className={`font-semibold text-sm mb-0.5 ${dragging ? "text-[#ff6b35]" : "text-white/50"}`}>
              {dragging ? "Release to upload" : "Drag & drop photos here"}
            </p>
            <p className="text-white/22 text-xs">
              or <span className="text-white/45 underline underline-offset-2 cursor-pointer">browse files</span>
              {" "}· JPG, PNG, WEBP · up to {maxImages - images.length} more
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    )}

    {/* Previews */}
    {images.length > 0 && (
      <div className={`grid grid-cols-4 gap-3 ${images.length < maxImages ? "mt-4" : ""}`}>
        {images.map((img, i) => (
          <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-white/8 bg-white/3">
            <img src={img.preview} alt="" className="w-full h-full object-cover" />

            {i === 0 && (
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/75 to-transparent pt-4 pb-1.5 text-center">
                <span className="text-[9px] font-black text-white/65 tracking-[0.15em] uppercase">Cover</span>
              </div>
            )}

            <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md bg-black/55 backdrop-blur-sm flex items-center justify-center">
              <span className="text-[10px] font-bold text-white/55">{i + 1}</span>
            </div>

            <button
              type="button"
              onClick={() => onImageRemove(i)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/75"
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
              </svg>
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-white/8 flex flex-col items-center justify-center gap-1 hover:border-white/18 hover:bg-white/2 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-[10px] text-white/22 font-semibold">Add</span>
          </button>
        )}
      </div>
    )}

    {images.length === 0 && (
      <p className="text-white/18 text-[11px] text-center mt-3">First photo becomes the product cover image</p>
    )}
  </div>
);

export default ImageUploadCard;
