import React, { useState } from "react";
import { useAuth } from "../hook/useAuth.hook";
import { Link, useNavigate } from "react-router-dom";
import ContinuewithGoogle from "../components/ContinuewithGoogle";

const products = [
  { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", title: "Air Force Sneakers" },
  { img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80", title: "Leather Tote" },
  { img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", title: "Aviator Glasses" },
  { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", title: "Minimalist Watch" },
  { img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&q=80", title: "Puffer Jacket" },
  { img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80", title: "Gold Hoops" },
  { img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", title: "Canvas Backpack" },
  { img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80", title: "Running Shoes" },
];

const Signup = () => {
  const [form, setForm] = useState({ fullname: "", email: "", phone: "", password: "" });
  const [role, setRole] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullname.trim()) e.fullname = "Required";
    if (!form.email.includes("@")) e.email = "Invalid email";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Invalid phone";
    if (form.password.length < 8) e.password = "Min 8 chars";
    if (!role) e.role = "Select a role to continue";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }
    setLoading(true);
    try {
      const res = await handleRegister({
        email: form.email.trim(),
        contact: form.phone.replace(/\D/g, ""),
        password: form.password,
        fullname: form.fullname.trim(),
        role,
      });
      if (res?.success) {
        navigate("/");
      } else {
        setErrors({ general: res?.message || "Registration failed. Please try again." });
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field) => {
    const isOrange = field === "fullname" || field === "phone";
    if (errors[field]) return "border-red-500 bg-white/5";
    if (focused === field)
      return isOrange
        ? "border-[#ff6b35] bg-[#ff6b35]/5 shadow-[0_0_0_3px_rgba(255,107,53,0.12)]"
        : "border-[#a855f7] bg-[#a855f7]/5 shadow-[0_0_0_3px_rgba(168,85,247,0.12)]";
    return "border-white/10 bg-white/5";
  };

  return (
    <div className="h-screen bg-[#07090F] flex overflow-hidden font-['Inter',system-ui,sans-serif]">
      <style>{`
        @keyframes spin-circle { 100% { transform: rotate(360deg); } }
        .orbit-container {
          position: absolute; width: 0; height: 0;
          top: 50%; left: 50%;
          animation: spin-circle 40s linear infinite;
        }
        .orbit-container-2 {
          position: absolute; width: 0; height: 0;
          top: 50%; left: 50%;
          animation: spin-circle 55s linear infinite reverse;
        }
        .orbit-item  { animation: spin-circle 40s linear infinite reverse; }
        .orbit-item-2 { animation: spin-circle 55s linear infinite; }
        input::placeholder { color: rgba(255,255,255,0.22) !important; font-weight: 400; }
        .signup-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(255,107,53,0.45); }
        .signup-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>

      {/* LEFT: Orbit Animation */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden shrink-0">
        <div className="absolute w-125 h-125 bg-purple-900/15 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute w-87.5 h-87.5 bg-[#ff6b35]/8 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="absolute w-95 h-95 rounded-full border border-white/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="orbit-container">
          {products.slice(0, 4).map((p, i) => {
            const angle = (i * 360) / 4;
            return (
              <div key={i} className="absolute" style={{ top: 0, left: 0, transform: `rotate(${angle}deg) translate(190px)` }}>
                <div className="absolute" style={{ top: "-38px", left: "-38px", transform: `rotate(-${angle}deg)` }}>
                  <div className="orbit-item w-19 h-19 rounded-2xl overflow-hidden border border-white/10 p-1 bg-white/5 backdrop-blur-md shadow-2xl">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover rounded-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute w-150 h-150 rounded-full border border-white/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="orbit-container-2">
          {products.slice(4, 8).map((p, i) => {
            const angle = (i * 360) / 4 + 45;
            return (
              <div key={i} className="absolute" style={{ top: 0, left: 0, transform: `rotate(${angle}deg) translate(300px)` }}>
                <div className="absolute" style={{ top: "-46px", left: "-46px", transform: `rotate(-${angle}deg)` }}>
                  <div className="orbit-item-2 w-23 h-23 rounded-2xl overflow-hidden border border-white/10 p-1.5 bg-white/5 backdrop-blur-md shadow-2xl">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover rounded-xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute z-10 w-32 h-32 bg-[#030407] rounded-full border border-gray-800 flex items-center justify-center flex-col shadow-[0_0_80px_20px_rgba(255,107,53,0.15)]">
          <span className="text-4xl font-black bg-linear-to-br from-[#ff6b35] to-[#a855f7] bg-clip-text text-transparent">S</span>
          <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] mt-0.5 pr-1">SNITCH</span>
        </div>
      </div>

      {/* RIGHT: Form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-6 lg:px-12 overflow-hidden shrink-0"
        style={{ background: "linear-gradient(180deg, #080b14 0%, #0b0f1a 50%, #080b14 100%)" }}
      >
        <div className="w-full max-w-105">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-5">
            <div className="w-10 h-10 bg-linear-to-br from-[#ff6b35] to-[#a855f7] rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg">S</div>
            <span className="text-xl font-black text-white tracking-[4px]">SNITCH</span>
          </div>

          <h1 className="text-[28px] font-extrabold text-white mb-1 tracking-tight leading-tight">Create Account</h1>
          <p className="text-white/40 text-sm mb-5">Join the ultimate fashion destination.</p>

          <ContinuewithGoogle />

          <div className="flex items-center gap-4 w-full mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] text-white/30 font-medium uppercase tracking-widest whitespace-nowrap">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {errors.general && (
            <p className="text-red-400 text-xs font-medium mb-4 text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-[0.5px]">Full Name</label>
                <div className={`flex items-center gap-2.5 py-2.75 px-3.5 rounded-xl border transition-all duration-300 ${fieldClass("fullname")}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text" placeholder="John Doe" value={form.fullname}
                    onChange={update("fullname")} onFocus={() => setFocused("fullname")} onBlur={() => setFocused(null)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium"
                  />
                </div>
                {errors.fullname && <p className="text-red-400 text-[11px] mt-1">{errors.fullname}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-[0.5px]">Email</label>
                <div className={`flex items-center gap-2.5 py-2.75 px-3.5 rounded-xl border transition-all duration-300 ${fieldClass("email")}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    type="email" placeholder="you@example.com" value={form.email}
                    onChange={update("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Row 2: Phone + Password */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-[0.5px]">Phone</label>
                <div className={`flex items-center gap-2.5 py-2.75 px-3.5 rounded-xl border transition-all duration-300 ${fieldClass("phone")}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.19 12.9 19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    type="tel" placeholder="+91 98765 43210" value={form.phone}
                    onChange={update("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 tracking-[0.5px]">Password</label>
                <div className={`flex items-center gap-2.5 py-2.75 px-3.5 rounded-xl border transition-all duration-300 ${fieldClass("password")}`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPwd ? "text" : "password"} placeholder="Min 8 chars" value={form.password}
                    onChange={update("password")} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="bg-transparent border-none cursor-pointer p-0 flex items-center shrink-0" aria-label="Toggle password">
                    {showPwd ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-[11px] mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Role selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-white/50 mb-2 tracking-[0.5px]">I am here to</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setRole("buyer"); setErrors((e) => ({ ...e, role: null })); }}
                  className={`flex-1 py-2.75 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    role === "buyer"
                      ? "border-[#ff6b35] bg-[#ff6b35]/10 text-white shadow-[0_4px_16px_rgba(255,107,53,0.2)]"
                      : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Shop
                </button>
                <button
                  type="button"
                  onClick={() => { setRole("seller"); setErrors((e) => ({ ...e, role: null })); }}
                  className={`flex-1 py-2.75 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    role === "seller"
                      ? "border-[#a855f7] bg-[#a855f7]/10 text-white shadow-[0_4px_16px_rgba(168,85,247,0.2)]"
                      : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" /><line x1="12" y1="12" x2="12" y2="19" /><line x1="8" y1="15.5" x2="16" y2="15.5" />
                  </svg>
                  Sell
                </button>
              </div>
              {errors.role && <p className="text-red-400 text-[11px] mt-1.5 text-center">{errors.role}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="signup-btn w-full py-3.5 rounded-xl border-none text-white text-[15px] font-bold cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(255,107,53,0.3)] flex items-center justify-center min-h-12.5 tracking-[0.5px] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #ff6b35 0%, #e04520 50%, #a855f7 100%)", backgroundSize: "200% 200%" }}
            >
              {loading
                ? <div className="w-5 h-5 border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
                : "Create My Account"}
            </button>
          </form>

          <p className="text-center text-white/35 text-sm mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff6b35] font-bold no-underline hover:text-[#ff8555] transition-colors duration-200">
              Sign In
            </Link>
          </p>

          <p className="text-center text-white/20 text-[11px] mt-3 leading-[1.6]">
            By signing up, you agree to Snitch's{" "}
            <a href="#" className="text-white/35 underline underline-offset-2 hover:text-white/50">Terms</a>
            {" "}and{" "}
            <a href="#" className="text-white/35 underline underline-offset-2 hover:text-white/50">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
