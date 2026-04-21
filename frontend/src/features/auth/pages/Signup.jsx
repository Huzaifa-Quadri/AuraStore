import React, { useState } from "react";
import { useAuth } from "../hook/useAuth.hook";
import { useNavigate } from "react-router-dom";
import ContinuewithGoogle from "../components/ContinuewithGoogle";

const products = [
  {
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    title: "Air Force Sneakers",
  },
  {
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",
    title: "Leather Tote",
  },
  {
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80",
    title: "Aviator Glasses",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    title: "Minimalist Watch",
  },
  {
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&q=80",
    title: "Puffer Jacket",
  },
  {
    img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80",
    title: "Gold Hoops",
  },
  {
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80",
    title: "Canvas Backpack",
  },
  {
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80",
    title: "Running Shoes",
  },
];

const Signup = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [role, setRole] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  // const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    // Clear that field's error as user types
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullname.trim()) e.fullname = "Full name is required";
    if (!form.email.includes("@")) e.email = "Please enter a valid email";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid phone required";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 chars";
    if (!role) e.role = "Please select a role";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    try {
      const res = await handleRegister({
        email: form.email.trim(),
        contact: form.phone.replace(/\D/g, ""), // send clean digits only
        password: form.password, // never trim passwords
        fullname: form.fullname.trim(),
        role: form.role,
      });

      if (res?.success) {
        // toast.success("Account created successfully!");  // use toast, not alert
        navigate("/");
      } else {
        setErrors({
          general: res?.message || "Registration failed. Please try again.",
        });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] flex items-center justify-center font-sans overflow-hidden">
      <style>{`
        @keyframes spin-circle { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        
        .orbit-container {
          position: absolute;
          width: 0;
          height: 0;
          top: 50%;
          left: 50%;
          animation: spin-circle 40s linear infinite;
        }
        .orbit-container-2 {
          position: absolute;
          width: 0;
          height: 0;
          top: 50%;
          left: 50%;
          animation: spin-circle 55s linear infinite reverse;
        }
        .orbit-item {
          animation: spin-reverse 40s linear infinite;
        }
        .orbit-item-2 {
          animation: spin-reverse 55s linear infinite reverse;
        }
        .glass-panel {
          background: rgba(20, 24, 38, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-screen relative">
        {/* LEFT SECTION - Visually Stunning Circular Orbit */}
        {/* Changed overflow-hidden to overflow-visible so orbits cleanly hide UNDER the right side glass! */}
        <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-visible h-full z-10">
          {/* Background Gradients */}
          <div className="absolute w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute w-[400px] h-[400px] bg-[#ff6b35]/10 rounded-full blur-[100px] top-1/2 left-1/2 pointer-events-none"></div>

          {/* Inner Orbit Ring (400px diameter -> 200px radius) */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white-[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_60px_rgba(255,255,255,0.01)_inset] pointer-events-none"></div>

          <div className="orbit-container">
            {products.slice(0, 4).map((p, i) => {
              const angle = (i * 360) / 4;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: 0,
                    left: 0,
                    transform: `rotate(${angle}deg) translate(200px)`,
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "-40px",
                      left: "-40px",
                      transform: `rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="orbit-item w-20 h-20 rounded-2xl overflow-hidden border border-white/10 p-1 bg-white/5 backdrop-blur-md shadow-2xl">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer Orbit Ring (640px diameter -> 320px radius) */}
          <div className="absolute w-[640px] h-[640px] rounded-full border border-white-[0.02] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_60px_rgba(255,255,255,0.01)_inset] pointer-events-none"></div>

          <div className="orbit-container-2">
            {products.slice(4, 8).map((p, i) => {
              const angle = (i * 360) / 4 + 45; // Offset by 45deg from inner ring
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: 0,
                    left: 0,
                    transform: `rotate(${angle}deg) translate(320px)`,
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "-50px",
                      left: "-50px",
                      transform: `rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="orbit-item-2 w-[100px] h-[100px] rounded-2xl overflow-hidden border border-white/10 p-1.5 bg-white/5 backdrop-blur-md shadow-2xl">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Branding / Black Hole */}
          <div className="absolute z-10 w-36 h-36 bg-[#030407] rounded-full border border-gray-800 flex items-center justify-center flex-col shadow-[0_0_80px_20px_rgba(255,107,53,0.15)]">
            <span className="text-5xl font-black bg-linear-to-br from-[#ff6b35] to-[#a855f7] bg-clip-text text-transparent">
              S
            </span>
            <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] mt-1 pr-1">
              SNITCH
            </span>
          </div>
        </div>

        {/* RIGHT SECTION - The Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 z-20 overflow-y-auto hide-scrollbar">
          <div className="glass-panel w-full max-w-md p-8 sm:p-10 rounded-3xl relative">
            {/* Mobile Header elements (Hidden on LG) */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 bg-linear-to-br from-[#ff6b35] to-[#a855f7] rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg">
                S
              </div>
              <span className="text-2xl font-black text-white tracking-wider">
                SNITCH
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Join the ultimate fashion destination.
            </p>

            {/* Social signup */}
            <ContinuewithGoogle />

            {/* Divider */}
            <div className="flex items-center gap-4 w-full mb-7">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-[12px] text-white/30 font-medium uppercase tracking-widest whitespace-nowrap">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    👤
                  </span>
                  <input
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#ff6b35] focus:bg-[#ff6b35]/5 focus:ring-4 focus:ring-[#ff6b35]/10 transition-all font-medium placeholder:text-gray-600"
                    type="text"
                    placeholder="John Doe"
                    value={form.fullname}
                    onChange={update("fullname")}
                  />
                </div>
                {errors.fullname && (
                  <p className="text-red-400 text-xs font-medium">
                    {errors.fullname}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                  <input
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#a855f7] focus:bg-[#a855f7]/5 focus:ring-4 focus:ring-[#a855f7]/10 transition-all font-medium placeholder:text-gray-600"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider block">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    📱
                  </span>
                  <input
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#ff6b35] focus:bg-[#ff6b35]/5 focus:ring-4 focus:ring-[#ff6b35]/10 transition-all font-medium placeholder:text-gray-600"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>
                  <input
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-12 outline-none focus:border-[#a855f7] focus:bg-[#a855f7]/5 focus:ring-4 focus:ring-[#a855f7]/10 transition-all font-medium placeholder:text-gray-600"
                    type={showPwd ? "text" : "password"}
                    placeholder="Min 8 chars"
                    value={form.password}
                    onChange={update("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPwd ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="pt-2 pb-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-3">
                  I am here to
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`rounded-2xl border p-4 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                      role === "buyer"
                        ? "border-[#ff6b35] bg-[#ff6b35]/10 shadow-[0_4px_20px_rgba(255,107,53,0.15)] scale-[1.02]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setRole("buyer");
                      setErrors((e) => ({ ...e, role: null }));
                    }}
                  >
                    <div className="text-3xl mb-2">🛍️</div>
                    <div className="text-white font-bold text-sm">Shop</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">
                      Buy trendy products
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 cursor-pointer transition-all duration-300 flex flex-col items-center text-center ${
                      role === "seller"
                        ? "border-[#a855f7] bg-[#a855f7]/10 shadow-[0_4px_20px_rgba(168,85,247,0.15)] scale-[1.02]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setRole("seller");
                      setErrors((e) => ({ ...e, role: null }));
                    }}
                  >
                    <div className="text-3xl mb-2">🏪</div>
                    <div className="text-white font-bold text-sm">Sell</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">
                      List your products
                    </div>
                  </div>
                </div>
                {errors.role && (
                  <p className="text-red-400 text-xs font-medium mt-2 text-center">
                    {errors.role}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 mt-6 bg-linear-to-r from-[#ff6b35] via-[#f72585] to-[#a855f7] bg-size-[200%_auto] text-white font-bold rounded-xl shadow-[0_8px_24px_rgba(255,107,53,0.3)] hover:shadow-[0_12px_32px_rgba(255,107,53,0.4)] hover:bg-position-[right_center] transition-all duration-500 active:scale-[0.98]"
              >
                Create My Account
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[#ff6b35] font-bold cursor-pointer hover:text-white transition-colors duration-300"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
