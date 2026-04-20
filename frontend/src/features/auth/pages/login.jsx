import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth.hook";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.email.includes("@")) err.email = "Enter a valid email address";
    if (form.password.length < 1) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    try {
      const res = await handleLogin({
        email: form.email.trim(),
        password: form.password,
      });
      if (res?.success) {
        navigate("/");
      } else {
        setErrors({
          general: res?.message || "Login failed. Please try again.",
        });
      }
    } catch (err) {
      // Catches unexpected errors (hook re-throw, etc.)
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#06080e] font-['Inter',system-ui,-apple-system,sans-serif] overflow-hidden">
      <style>{`
        input::placeholder {
          color: rgba(255,255,255,0.25) !important;
          font-weight: 400;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease both;
        }
        .login-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(255,107,53,0.45);
          background-position: right center;
        }
        .login-submit-btn:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* ── LEFT: Model Image ── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden min-h-screen bg-[#0a0a0f]">
        <img
          src="/login-model.png"
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover object-center block"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, #0a0a0f 0%, transparent 15%, transparent 85%, #0a0a0f 100%),
              linear-gradient(to bottom, #0a0a0f 0%, transparent 12%, transparent 75%, #0a0a0f 100%),
              linear-gradient(to top, rgba(6,8,14,0.95) 0%, rgba(6,8,14,0.35) 30%, rgba(6,8,14,0.05) 55%, rgba(6,8,14,0.2) 100%)
            `,
          }}
        />

        {/* Branding on image */}
        <div className="absolute top-10 left-10 z-10">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl font-black text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] bg-linear-to-br from-[#ff6b35] to-[#a855f7]">
              S
            </div>
            <span className="text-[26px] font-extrabold text-white tracking-[4px]">
              SNITCH
            </span>
          </div>
          <p className="text-white/50 text-[13px] tracking-[2px] mt-1.5 ml-[54px] font-normal">
            Where Style Meets You.
          </p>
        </div>

        {/* Bottom text on image */}
        <div className="absolute bottom-12 left-10 right-10 z-10">
          <p className="text-white/70 text-lg font-light leading-[1.6] italic m-0 tracking-[0.3px]">
            "Fashion is the armor to survive the reality of everyday life."
          </p>
          <p className="text-white/35 text-[13px] mt-2.5 font-medium tracking-[1px]">
            — Bill Cunningham
          </p>
        </div>
      </div>

      {/* ── RIGHT: Login Form ── */}
      <div
        className="w-full lg:w-[48%] lg:min-w-[440px] flex items-center justify-center py-8 px-6 lg:py-12 lg:px-14 relative overflow-y-auto animate-fade-in-up"
        style={{
          background:
            "linear-gradient(180deg, #080b14 0%, #0b0f1a 50%, #080b14 100%)",
        }}
      >
        <div className="w-full max-w-[400px] flex flex-col items-start">
          {/* Mobile-only logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl font-black text-white shadow-[0_4px_20px_rgba(255,107,53,0.35)] bg-linear-to-br from-[#ff6b35] to-[#a855f7]">
              S
            </div>
            <span className="text-[22px] font-extrabold text-white tracking-[4px]">
              SNITCH
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 w-full">
            <h1 className="text-[32px] font-extrabold text-white m-0 mb-2 tracking-tight leading-[1.2]">
              Welcome back
            </h1>
            <p className="text-[15px] text-white/40 m-0 font-normal leading-relaxed">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Social login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-[13px] px-5 rounded-xl border border-white/10 bg-white/5 text-white/85 text-sm font-semibold cursor-pointer transition-all duration-300 ease-in-out mb-7 hover:bg-white/10 hover:border-white/20 hover:-translate-y-px"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full mb-7">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30 whitespace-nowrap font-medium uppercase tracking-[1px]">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* Email */}
            <div className="mb-6 w-full">
              <label className="block text-xs font-semibold text-white/50 mb-2 tracking-[0.5px]">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 py-[13px] px-4 rounded-xl border-[1.5px] transition-all duration-300 ease-in-out ${
                  errors.email
                    ? "border-red-500 bg-white/5"
                    : focused === "email"
                      ? "border-[#ff6b35] bg-[#ff6b35]/10 shadow-[0_0_0_3px_rgba(255,107,53,0.12)]"
                      : "border-white/10 bg-white/5"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium font-['Inter',sans-serif] tracking-[0.2px]"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-medium mt-1.5 mb-0">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6 w-full">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-white/50 tracking-[0.5px] mb-0">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#ff6b35] no-underline font-semibold transition-colors duration-200 hover:text-[#ff8555]"
                >
                  Forgot password?
                </a>
              </div>
              <div
                className={`flex items-center gap-3 py-[13px] px-4 rounded-xl border-[1.5px] transition-all duration-300 ease-in-out ${
                  errors.password
                    ? "border-red-500 bg-white/5"
                    : focused === "password"
                      ? "border-[#a855f7] bg-[#a855f7]/10 shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                      : "border-white/10 bg-white/5"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={update("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium font-['Inter',sans-serif] tracking-[0.2px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-transparent border-none cursor-pointer p-0 flex items-center shrink-0"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium mt-1.5 mb-0">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              className="login-submit-btn w-full p-[15px] rounded-xl border-none text-white text-[15px] font-bold font-['Inter',sans-serif] cursor-pointer transition-all duration-300 ease-in-out shadow-[0_8px_32px_rgba(255,107,53,0.3)] mt-1.5 tracking-[0.5px] flex items-center justify-center min-h-[52px]"
              style={{
                background:
                  "linear-gradient(135deg, #ff6b35 0%, #e04520 50%, #a855f7 100%)",
                backgroundSize: "200% 200%",
              }}
              disabled={loading}
            >
              {loading ? (
                <div className="w-[22px] h-[22px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-white/35 text-sm w-full mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#ff6b35] font-bold no-underline transition-colors duration-200 hover:text-[#ff8555]"
            >
              Create account
            </Link>
          </p>

          <p className="text-center text-white/20 text-[11px] w-full mt-3.5 leading-[1.6]">
            By signing in, you agree to Snitch's{" "}
            <a
              href="#"
              className="text-white/35 underline underline-offset-2 hover:text-white/50"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-white/35 underline underline-offset-2 hover:text-white/50"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
