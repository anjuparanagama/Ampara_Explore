"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Check,
} from "lucide-react";

export default function LoginPage() {
  // State switcher: "default" | "error"
  const [viewState, setViewState] = useState<"default" | "error">("default");

  // Form values
  const [email, setEmail] = useState(
    viewState === "default" ? "kasun@amparaexplore.lk" : "kasun-invalid@"
  );
  const [password, setPassword] = useState(
    viewState === "default" ? "SuperSecurePass123!" : "123"
  );
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStateToggle = (state: "default" | "error") => {
    setViewState(state);
    if (state === "default") {
      setEmail("kasun@amparaexplore.lk");
      setPassword("SuperSecurePass123!");
    } else {
      setEmail("invalid-email-format");
      setPassword("123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">

      {/* 1. Header Bar */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-[#0084d1] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              Ampara <span className="text-[#0084d1] font-extrabold">Explore</span>
            </span>
          </Link>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0084d1] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Back to Explore</span>
            </Link>

            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0084d1] hover:text-[#006699] transition-colors px-2 py-1"
            >
              New Explorer? Register
            </Link>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#006699] text-white flex items-center justify-center font-bold text-xs ring-2 ring-sky-100 shadow-xs">
              <span className="sr-only">User Profile</span>
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-center">

        {/* State Switcher Pill at Top */}
        <div className="flex justify-center sm:justify-end mb-4 sm:mb-6">
          <div className="inline-flex items-center bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200/90 shadow-xs">
            <button
              type="button"
              onClick={() => handleStateToggle("default")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${viewState === "default"
                ? "bg-slate-100 text-[#006699] shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${viewState === "default" ? "bg-[#0084d1]" : "bg-transparent border border-slate-400"}`} />
              <span>Default State</span>
            </button>

            <button
              type="button"
              onClick={() => handleStateToggle("error")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${viewState === "error"
                ? "bg-red-50 text-red-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${viewState === "error" ? "bg-red-500" : "bg-transparent border border-slate-400"}`} />
              <span>Error State</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* LEFT SIDE: Visual Showcase Card */}
          <div className="lg:col-span-7 relative rounded-[28px] overflow-hidden min-h-[520px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-8 shadow-xl border border-slate-200/60 group">

            {/* Background Image */}
            <Image
              src="/images/login-bg.jpg"
              alt="Traditional fishing boats on tranquil lake in Ampara"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
            />

            {/* Gradient Overlays for perfect legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-900/15 to-slate-950/70" />

            {/* Top Bar Pills inside the Image Card */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">

              {/* Left Pill: Discovery Horizon */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider">
                <Search className="w-3.5 h-3.5 text-white/90" />
                <span className="uppercase">25 KM Radial Discovery Horizon</span>
              </div>

              {/* Right Pill: Location Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Senanayake Samudraya</span>
              </div>
            </div>

            {/* Middle Big Typography */}
            <div className="relative z-10 max-w-lg mt-auto mb-6 pt-16">
              <div className="inline-block px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest border border-white/20 mb-3">
                Gateway to Sri Lanka&apos;s East
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 drop-shadow-md">
                Explore More.<br />
                Plan Better.
              </h2>

              <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm max-w-md">
                Discover ancient stupas, elephant corridors, and pristine reservoir sunrises nestled within Ampara&apos;s protected perimeter.
              </p>
            </div>

            {/* Bottom Overlay Card: Curated Ecological Circuit */}
            <div className="relative z-10 bg-slate-900/75 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 text-white shadow-2xl">
              <div className="grid grid-cols-12 gap-3 items-center">

                {/* Circuit Info */}
                <div className="col-span-7 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-[#0084d1] flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Curated Ecological Circuit
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300 truncate max-w-[200px]">
                      24+ mapped sanctuaries, historical stupas & wetland...
                    </div>
                  </div>
                </div>

                {/* Stat 1: Max Eco Radius */}
                <div className="col-span-3 border-l border-white/10 pl-3">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    25.0 km
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Max Eco Radius
                  </div>
                </div>

                {/* Stat 2: Free Access */}
                <div className="col-span-2 border-l border-white/10 pl-2">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    100%
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Free Access
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Authentication Form Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* White Form Card */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-900/5">

              {/* Card Header with Brand + 25KM Secure Badge */}
              <div className="flex items-start justify-between gap-2 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#0084d1] flex items-center justify-center text-white">
                    <Compass className="w-5 h-5 text-white stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-base font-black text-slate-900 leading-tight">
                      Ampara Explore
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#0084d1]">
                      Heritage & Wildlife
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                  25KM Secure ID
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1.5">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Enter your credentials to access your saved itineraries and visit plans.
                </p>
              </div>

              {/* Form Elements */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Email Address
                    </label>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Required
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kasun@amparaexplore.lk"
                      className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-3.5 py-3 border transition-all focus:outline-none ${viewState === "error"
                        ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                        : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                        }`}
                    />
                  </div>

                  {viewState === "error" && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Please enter a valid Explorer email address.</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-[#0084d1] hover:text-[#006699] hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••••••"
                      className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-10 py-3 border transition-all focus:outline-none ${viewState === "error"
                        ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                        : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {viewState === "error" && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Invalid password or credentials mismatch.</span>
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0084d1] focus:ring-[#0084d1] cursor-pointer accent-[#0084d1]"
                  />
                  <label htmlFor="remember" className="text-xs font-semibold text-slate-700 select-none cursor-pointer">
                    Remember my itinerary session
                  </label>
                </div>

                {/* Sign In Primary CTA */}
                <button
                  type="submit"
                  className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-[0.99] mt-2"
                >
                  <span>Sign In to Ampara Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

              {/* Social Login Separator */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  <span className="bg-white px-3">Or continue with</span>
                </div>
              </div>

              {/* Social Buttons (Google & Sri Lanka Pass) */}
              <div className="grid grid-cols-2 gap-3">

                {/* Google Button */}
                <button
                  type="button"
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* Sri Lanka Pass Button */}
                <button
                  type="button"
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0">
                    🇱🇰
                  </span>
                  <span>Sri Lanka Pass</span>
                </button>

              </div>

              {/* Bottom Sign up Link */}
              <div className="text-center mt-6 text-xs text-slate-600">
                <span>Don&apos;t have an account? </span>
                <Link
                  href="/register"
                  className="font-bold text-[#0084d1] hover:underline"
                >
                  Create an Explorer ID
                </Link>
              </div>

            </div>

            {/* Bottom Security / Protection Badge */}
            <div className="flex items-center justify-center gap-2 text-center text-slate-600 text-[11px] font-semibold mt-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Protected by Sri Lanka Tourism Digital Gateway • 256-bit encryption</span>
            </div>

          </div>

        </div>

      </main>

      {/* 3. Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white px-4 sm:px-8 py-4 text-slate-500 text-xs mt-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2024 Ampara Regional Discovery Project. 25 km Radial Heritage & Wildlife Portal.
          </div>
          <div className="flex items-center gap-5 font-semibold text-slate-600">
            <Link href="/privacy-policy" className="hover:text-[#0084d1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#0084d1] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cultural-guidelines" className="hover:text-[#0084d1] transition-colors">
              Cultural Guidelines
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
