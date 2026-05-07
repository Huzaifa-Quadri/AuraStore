import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth.hook";

const SelectRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleSelectRole } = useAuth();

  const handleSubmit = async () => {
    if (!role) {
      setError("Select a role to continue");
      return;
    }
    setLoading(true);
    try {
      const res = await handleSelectRole(role);
      if (res?.success) {
        navigate("/");
      } else {
        setError(res?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 font-['Inter',system-ui,sans-serif]"
      style={{ background: "linear-gradient(180deg, #080b14 0%, #0b0f1a 50%, #080b14 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <div className="w-12 h-12 bg-linear-to-br from-[#ff6b35] to-[#a855f7] rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            S
          </div>
          <span className="text-2xl font-black text-white tracking-[4px]">SNITCH</span>
        </div>

        <h1 className="text-[28px] font-extrabold text-white mb-2 tracking-tight text-center">
          You&rsquo;re almost in
        </h1>
        <p className="text-white/40 text-sm mb-10 text-center">
          Tell us how you&rsquo;ll use Snitch so we can set up your account correctly.
        </p>

        {/* Role cards */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            type="button"
            onClick={() => { setRole("buyer"); setError(null); }}
            className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
              role === "buyer"
                ? "border-[#ff6b35] bg-[#ff6b35]/10 shadow-[0_4px_24px_rgba(255,107,53,0.2)]"
                : "border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                role === "buyer" ? "bg-[#ff6b35]/20" : "bg-white/8"
              }`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={role === "buyer" ? "#ff6b35" : "rgba(255,255,255,0.5)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div>
                <p className={`font-bold text-base transition-colors duration-300 ${role === "buyer" ? "text-white" : "text-white/70"}`}>
                  Shop
                </p>
                <p className="text-white/35 text-sm mt-0.5">Browse and buy from top fashion brands</p>
              </div>
              {role === "buyer" && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#ff6b35] flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => { setRole("seller"); setError(null); }}
            className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
              role === "seller"
                ? "border-[#a855f7] bg-[#a855f7]/10 shadow-[0_4px_24px_rgba(168,85,247,0.2)]"
                : "border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                role === "seller" ? "bg-[#a855f7]/20" : "bg-white/8"
              }`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={role === "seller" ? "#a855f7" : "rgba(255,255,255,0.5)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                  <line x1="12" y1="12" x2="12" y2="19" />
                  <line x1="8" y1="15.5" x2="16" y2="15.5" />
                </svg>
              </div>
              <div>
                <p className={`font-bold text-base transition-colors duration-300 ${role === "seller" ? "text-white" : "text-white/70"}`}>
                  Sell
                </p>
                <p className="text-white/35 text-sm mt-0.5">List your products and reach thousands of buyers</p>
              </div>
              {role === "seller" && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#a855f7] flex items-center justify-center shrink-0">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs font-medium mb-4 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !role}
          className="w-full py-3.5 rounded-xl border-none text-white text-[15px] font-bold cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(255,107,53,0.3)] flex items-center justify-center min-h-12.5 tracking-[0.5px] disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_12px_40px_rgba(255,107,53,0.45)]"
          style={{ background: "linear-gradient(135deg, #ff6b35 0%, #e04520 50%, #a855f7 100%)" }}
        >
          {loading
            ? <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
            : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
