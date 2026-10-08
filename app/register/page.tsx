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
  User,
  Phone,
  Award,
  QrCode,
  Bookmark,
} from "lucide-react";

type FormState = "default" | "error" | "success";

interface InterestOption {
  id: string;
  label: string;
  icon: string;
}

const INTERESTS: InterestOption[] = [
  { id: "wildlife", label: "Wildlife & Elephants", icon: "🐘" },
  { id: "heritage", label: "Ancient Stupas & Monasteries", icon: "🛕" },
  { id: "reservoirs", label: "Reservoirs & Sunrise Boating", icon: "🌅" },
  { id: "nature", label: "Offbeat Hiking & Camping", icon: "🌿" },
];

export default function RegisterPage() {
  // State switcher: "default" | "error" | "success"
  const [viewState, setViewState] = useState<FormState>("default");

  // Form values
  const [fullName, setFullName] = useState("Amara Fernando");
  const [email, setEmail] = useState("amara@amparaexplore.lk");
  const [phone, setPhone] = useState("77 234 5678");
  const [selectedInterest, setSelectedInterest] = useState<string>("wildlife");
  const [password, setPassword] = useState("ExploreAmpara@2025");
  const [confirmPassword, setConfirmPassword] = useState("ExploreAmpara@2025");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rangerAlerts, setRangerAlerts] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submittedPassId, setSubmittedPassId] = useState<string | null>(null);

  // Handle switching sample states for demo/testing
  const handleStateToggle = (state: FormState) => {
    setViewState(state);
    if (state === "default") {
      setFullName("Amara Fernando");
      setEmail("amara@amparaexplore.lk");
      setPhone("77 234 5678");
      setPassword("ExploreAmpara@2025");
      setConfirmPassword("ExploreAmpara@2025");
      setAgreeTerms(true);
      setSelectedInterest("wildlife");
      setSubmittedPassId(null);
    } else if (state === "error") {
      setFullName("");
      setEmail("invalid-email-address");
      setPhone("123");
      setPassword("123");
      setConfirmPassword("mismatched-pass");
      setAgreeTerms(false);
      setSubmittedPassId(null);
    } else if (state === "success") {
      setSubmittedPassId("AMP-2025-EXP-9402");
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: "None", color: "bg-slate-200" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, text: "Weak", color: "bg-rose-500", textCol: "text-rose-600" };
    if (score <= 3) return { score: 2, text: "Good", color: "bg-amber-500", textCol: "text-amber-600" };
    return { score: 3, text: "Strong", color: "bg-emerald-500", textCol: "text-emerald-600" };
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms && viewState !== "error") {
      alert("Please accept the Cultural & Eco Preservation guidelines to register.");
      return;
    }
    const randomPassId = `AMP-${new Date().getFullYear()}-EXP-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedPassId(randomPassId);
    setViewState("success");
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
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0084d1] hover:text-[#006699] transition-colors px-2 py-1"
            >
              Already Registered? Log In
            </Link>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#006699] text-white flex items-center justify-center font-bold text-xs ring-2 ring-sky-100 shadow-xs">
              <span className="sr-only">User Profile</span>
              <User className="w-4 h-4 text-white" />
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
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewState === "default"
                  ? "bg-slate-100 text-[#006699] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  viewState === "default" ? "bg-[#0084d1]" : "bg-transparent border border-slate-400"
                }`}
              />
              <span>Default Form</span>
            </button>

            <button
              type="button"
              onClick={() => handleStateToggle("error")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewState === "error"
                  ? "bg-red-50 text-red-600 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  viewState === "error" ? "bg-red-500" : "bg-transparent border border-slate-400"
                }`}
              />
              <span>Validation Error</span>
            </button>

            <button
              type="button"
              onClick={() => handleStateToggle("success")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewState === "success"
                  ? "bg-emerald-50 text-emerald-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  viewState === "success" ? "bg-emerald-500" : "bg-transparent border border-slate-400"
                }`}
              />
              <span>Issued Pass Preview</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT SIDE: Visual Showcase Card */}
          <div className="lg:col-span-6 relative rounded-[28px] overflow-hidden min-h-[540px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-8 shadow-xl border border-slate-200/60 group">
            {/* Background Image - Gal Oya or Scenic Lake */}
            <Image
              src="/images/gal-oya-elephants.jpg"
              alt="Wild elephants along the waters of Gal Oya reservoir in Ampara"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
            />

            {/* Gradient Overlays for maximum legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/85" />

            {/* Top Bar Pills inside Image */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider">
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span className="uppercase">25 KM Radial Explorer Pass</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sanctuary & Heritage Tier</span>
              </div>
            </div>

            {/* Middle Big Typography */}
            <div className="relative z-10 max-w-lg mt-auto mb-6 pt-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest border border-white/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Official Tourism Registration</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 drop-shadow-md">
                Begin Your Journey.<br />
                Become an Explorer.
              </h2>

              <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm max-w-md">
                Unlock personalized 25 km radial itinerary routing, offline GPS heritage trails, and verified wildlife tracker alerts across Ampara.
              </p>

              {/* Explorer Benefits Checklist */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-slate-200">
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Save 1-Day Itinerary Plans</span>
                </div>
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Live Wildlife Ranger Alerts</span>
                </div>
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Interactive 25KM Radar</span>
                </div>
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Sinhala, Tamil & English</span>
                </div>
              </div>
            </div>

            {/* Bottom Overlay Card: Verified Explorer Pass Stats */}
            <div className="relative z-10 bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 text-white shadow-2xl">
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Circuit Info */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-[#0084d1] flex items-center justify-center shrink-0 shadow-md">
                    <Award className="w-5 h-5 text-white" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </span>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Ampara Explorer Pass
                    </div>
                    <div className="text-[10px] text-slate-300 truncate max-w-[170px]">
                      Verified Traveler Access Card
                    </div>
                  </div>
                </div>

                {/* Stat 1: Radius */}
                <div className="col-span-3 border-l border-white/10 pl-3">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    25.0 km
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Full Horizon
                  </div>
                </div>

                {/* Stat 2: Free Lifetime */}
                <div className="col-span-3 border-l border-white/10 pl-2">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    100% Free
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Lifetime Pass
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Account Registration Form OR Issued Pass Preview */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {viewState === "success" ? (
              /* Celebration & Issued Pass Card */
              <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-900/5 animate-fadeIn">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                    Account Created Successfully
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Welcome to Ampara Explore!
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto mt-1">
                    Your official 25 KM Explorer ID has been generated and linked to your profile.
                  </p>
                </div>

                {/* Digital Explorer ID Card Badge Preview */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-5 border border-sky-500/30 shadow-2xl mb-6">
                  {/* Watermark Compass */}
                  <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none">
                    <Compass className="w-full h-full text-white" />
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0084d1] flex items-center justify-center text-white shadow-md">
                        <Compass className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-black tracking-wider uppercase text-sky-300">
                          Ampara Regional Tourism
                        </div>
                        <div className="text-base font-extrabold text-white">
                          Verified Explorer Pass
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Active Pass
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/10 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Explorer Name
                      </div>
                      <div className="text-sm font-black text-white mt-0.5 truncate">
                        {fullName || "Amara Fernando"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Pass ID Code
                      </div>
                      <div className="text-sm font-mono font-black text-sky-400 mt-0.5">
                        {submittedPassId || "AMP-2025-EXP-9402"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Radial Horizon
                      </div>
                      <div className="font-semibold text-slate-200 mt-0.5">
                        25 km (Center: Ampara Clock Tower)
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Primary Interest
                      </div>
                      <div className="font-semibold text-amber-300 mt-0.5 capitalize">
                        {INTERESTS.find((i) => i.id === selectedInterest)?.label || "Wildlife & Safari"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-sky-300" />
                      <span className="font-mono text-[10px]">QR VERIFIED • SL TOURISM</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Valid for 2024 / 2025 Season
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Start Exploring Attractions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/my-plans"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#0084d1]" />
                      <span>My Visit Plan</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleStateToggle("default")}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
                    >
                      <span>Edit Account Info</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Normal Register Form Card */
              <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-900/5">
                {/* Card Header with Brand + Badge */}
                <div className="flex items-start justify-between gap-2 mb-5">
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

                  <div className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#006699] text-[10px] font-black uppercase tracking-wider">
                    New Explorer
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-5">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                    Create Explorer Account
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Register your traveler profile to plan, customize and track your visits in the 25 km radial zone.
                  </p>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-800">
                        Full Name
                      </label>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                        Required
                      </span>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Kasun Perera or John Doe"
                        className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 border transition-all focus:outline-none ${
                          viewState === "error" && !fullName
                            ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                            : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                        }`}
                      />
                    </div>

                    {viewState === "error" && !fullName && (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Please enter your full legal or traveler name.</span>
                      </div>
                    )}
                  </div>

                  {/* Email & Contact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Email Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
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
                          placeholder="explorer@ampara.lk"
                          className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 border transition-all focus:outline-none ${
                            viewState === "error"
                              ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                              : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                          }`}
                        />
                      </div>

                      {viewState === "error" && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-red-600 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>Invalid email format.</span>
                        </div>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          Contact / WhatsApp
                        </label>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                          Optional
                        </span>
                      </div>

                      <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                          <span className="text-slate-500 mr-1">🇱🇰</span>
                          <span className="text-slate-600">+94</span>
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="77 123 4567"
                          className="w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-16 pr-3.5 py-2.5 sm:py-3 border border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white transition-all focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Primary Travel Passion Interest Pills */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Primary Explorer Interest
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {INTERESTS.map((interest) => {
                        const isSelected = selectedInterest === interest.id;
                        return (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => setSelectedInterest(interest.id)}
                            className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-sky-50 border-[#0084d1] text-[#006699] ring-1 ring-[#0084d1]"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="text-base shrink-0">{interest.icon}</span>
                            <span className="truncate">{interest.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Password & Confirm Password Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          Password
                        </label>
                        <span className={`text-[10px] font-extrabold uppercase ${strength.textCol || "text-slate-400"}`}>
                          {strength.text}
                        </span>
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
                          placeholder="••••••••••••"
                          className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-9 py-2.5 sm:py-3 border transition-all focus:outline-none ${
                            viewState === "error" && password.length < 6
                              ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                              : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Strength Meter Bar */}
                      <div className="mt-1.5 flex items-center gap-1">
                        <div className={`h-1 flex-1 rounded-full ${strength.score >= 1 ? strength.color : "bg-slate-200"}`} />
                        <div className={`h-1 flex-1 rounded-full ${strength.score >= 2 ? strength.color : "bg-slate-200"}`} />
                        <div className={`h-1 flex-1 rounded-full ${strength.score >= 3 ? strength.color : "bg-slate-200"}`} />
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          Confirm Password
                        </label>
                        {passwordsMatch && (
                          <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Match
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-9 py-2.5 sm:py-3 border transition-all focus:outline-none ${
                            viewState === "error" && !passwordsMatch
                              ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                              : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {viewState === "error" && !passwordsMatch && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-red-600 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>Passwords do not match.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkboxes: Terms & Wildlife Alerts */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2.5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0084d1] focus:ring-[#0084d1] cursor-pointer accent-[#0084d1]"
                      />
                      <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none leading-tight">
                        I agree to the{" "}
                        <Link href="/cultural-guidelines" target="_blank" className="font-bold text-[#0084d1] hover:underline">
                          Cultural Preservation & Eco Code
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms-of-service" target="_blank" className="font-bold text-[#0084d1] hover:underline">
                          Terms of Service
                        </Link>.
                      </label>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <input
                        id="alerts"
                        type="checkbox"
                        checked={rangerAlerts}
                        onChange={(e) => setRangerAlerts(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#0084d1] focus:ring-[#0084d1] cursor-pointer accent-[#0084d1]"
                      />
                      <label htmlFor="alerts" className="text-xs text-slate-600 cursor-pointer select-none leading-tight">
                        Receive seasonal elephant crossing & boat safari sunrise timing alerts.
                      </label>
                    </div>
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-[0.99] mt-3"
                  >
                    <span>Create Explorer Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Social Login Separator */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 tracking-wider">
                    <span className="bg-white px-3">Or register quickly with</span>
                  </div>
                </div>

                {/* Social Buttons (Google & Sri Lanka Pass) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedPassId("AMP-2025-GGL-8812");
                      setViewState("success");
                    }}
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
                    onClick={() => {
                      setSubmittedPassId("AMP-2025-SLP-4109");
                      setViewState("success");
                    }}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-[10px] font-black text-amber-700 shrink-0">
                      🇱🇰
                    </span>
                    <span>Sri Lanka Pass</span>
                  </button>
                </div>

                {/* Bottom Already Have Account Link */}
                <div className="text-center mt-5 text-xs text-slate-600">
                  <span>Already have an Explorer ID? </span>
                  <Link
                    href="/login"
                    className="font-bold text-[#0084d1] hover:underline"
                  >
                    Sign in to Ampara Explore
                  </Link>
                </div>
              </div>
            )}

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
