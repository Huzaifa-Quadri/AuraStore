import React from "react";

const ChecklistCard = ({ checklist }) => (
  <div className="rounded-2xl border border-white/8 bg-[#0a0d16] p-6">
    <p className="text-white/35 text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Ready to publish?</p>
    <div className="flex flex-col gap-3">
      {checklist.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            item.done
              ? "bg-emerald-500/15 border border-emerald-500/35"
              : "bg-white/4 border border-white/10"
          }`}>
            {item.done && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            )}
          </div>
          <span className={`text-xs font-medium transition-colors duration-300 ${item.done ? "text-white/55" : "text-white/22"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ChecklistCard;
