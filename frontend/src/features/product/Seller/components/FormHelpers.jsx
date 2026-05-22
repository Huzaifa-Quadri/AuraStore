import React from "react";

export const SectionHeader = ({ label, color, noMargin }) => (
  <h2 className={`text-white font-bold text-[15px] flex items-center gap-2.5 ${noMargin ? "" : "mb-5"}`}>
    <div className={`w-1 h-4 rounded-full ${
      color === "orange"
        ? "bg-linear-to-b from-[#ff6b35] to-[#e04520]"
        : "bg-linear-to-b from-[#a855f7] to-[#7c3aed]"
    }`} />
    {label}
  </h2>
);

export const FieldLabel = ({ label, counter, warn }) => (
  <div className="flex items-center justify-between mb-2">
    <label className="text-white/42 text-[11px] font-bold tracking-[0.5px] uppercase">{label}</label>
    {counter && (
      <span className={`text-[11px] font-semibold tabular-nums transition-colors ${warn ? "text-orange-400" : "text-white/22"}`}>
        {counter}
      </span>
    )}
  </div>
);

export const ErrorMsg = ({ msg }) => (
  <p className="text-red-400 text-[11px] mt-1.5 font-medium">{msg}</p>
);

export const Hint = ({ children }) => (
  <p className="text-white/18 text-[11px] mt-1.5">{children}</p>
);
