import React from "react";

const ProductNavbar = () => (
  <div className="sticky top-0 z-20 border-b border-white/6 bg-[#07090F]/90 backdrop-blur-md">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center hover:bg-white/8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <p className="text-white/30 text-[11px] font-medium">Seller Dashboard</p>
          <h1 className="text-white font-bold text-[17px] leading-tight">Add Product</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-linear-to-br from-[#ff6b35] to-[#a855f7] rounded-lg flex items-center justify-center font-black text-white text-sm">S</div>
        <span className="text-white/50 font-black text-sm tracking-[3px]">SNITCH</span>
      </div>
    </div>
  </div>
);

export default ProductNavbar;
