import React from "react";

const PublishCard = ({ loading, allGood }) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-5">
    <button
      type="submit"
      disabled={loading || !allGood}
      className="w-full py-3.5 rounded-xl text-white text-[15px] font-bold transition-all duration-300 flex items-center justify-center gap-2.5 min-h-[50px] tracking-[0.3px] disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_14px_40px_rgba(255,107,53,0.4)] shadow-[0_6px_24px_rgba(255,107,53,0.2)]"
      style={{ background: "linear-gradient(135deg, #ff6b35 0%, #e04520 50%, #a855f7 100%)" }}
    >
      {loading ? (
        <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Publish Product
        </>
      )}
    </button>
    {!allGood && (
      <p className="text-white/20 text-[11px] text-center mt-2.5">Complete checklist to publish</p>
    )}
    {allGood && (
      <p className="text-emerald-400/50 text-[11px] text-center mt-2.5">All good — ready to go live</p>
    )}
  </div>
);

export default PublishCard;
