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
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound,
  RotateCcw,
  Check,
  Shield,
  HelpCircle,
} from "lucide-react";

type FlowStep = "request" | "verify" | "reset" | "success" | "error";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<FlowStep>("request");
  const [email, setEmail] = useState("kasun@amparaexplore.lk");
  const [otp, setOtp] = useState(["8", "4", "9", "2", "0", "1"]);
  const [newPassword, setNewPassword] = useState("NewExplorerPass2025!");
  const [confirmPassword, setConfirmPassword] = useState("NewExplorerPass2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(45);
  const [isResent, setIsResent] = useState(false);

  // Quick State Switcher for demo/testing
  const handleStepSwitch = (targetStep: FlowStep) => {
    setStep(targetStep);
    if (targetStep === "error") {
      setEmail("unregistered-user@unknown.lk");
    } else if (targetStep === "request") {
      setEmail("kasun@amparaexplore.lk");
    }
  };

  // OTP inputs handler
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
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

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "error") return;
    setStep("verify");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("reset");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      alert("Passwords do not match.");
      return;
    }
    setStep("success");
  };

  const handleResendCode = () => {
    setIsResent(true);
    setResendCountdown(60);
    setTimeout(() => setIsResent(false), 3000);
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
              Sign In to Explorer ID
            </Link>

            {/* Shield Icon Badge */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#006699] text-white flex items-center justify-center font-bold text-xs ring-2 ring-sky-100 shadow-xs">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-center">
        {/* State Switcher Pill at Top */}
        <div className="flex justify-center sm:justify-end mb-4 sm:mb-6">
          <div className="inline-flex flex-wrap items-center bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200/90 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => handleStepSwitch("request")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${step === "request"
                  ? "bg-slate-100 text-[#006699] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${step === "request" ? "bg-[#0084d1]" : "bg-transparent border border-slate-400"}`} />
              <span>1. Request Code</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepSwitch("verify")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${step === "verify"
                  ? "bg-slate-100 text-[#006699] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${step === "verify" ? "bg-[#0084d1]" : "bg-transparent border border-slate-400"}`} />
              <span>2. Verify OTP</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepSwitch("reset")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${step === "reset"
                  ? "bg-slate-100 text-[#006699] shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${step === "reset" ? "bg-[#0084d1]" : "bg-transparent border border-slate-400"}`} />
              <span>3. New Password</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepSwitch("success")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${step === "success"
                  ? "bg-emerald-50 text-emerald-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${step === "success" ? "bg-emerald-500" : "bg-transparent border border-slate-400"}`} />
              <span>4. Success</span>
            </button>

            <button
              type="button"
              onClick={() => handleStepSwitch("error")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${step === "error"
                  ? "bg-rose-50 text-rose-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${step === "error" ? "bg-rose-500" : "bg-transparent border border-slate-400"}`} />
              <span>Error State</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT SIDE: Visual Showcase Card */}
          <div className="lg:col-span-6 relative rounded-[28px] overflow-hidden min-h-[520px] lg:min-h-[660px] flex flex-col justify-between p-6 sm:p-8 shadow-xl border border-slate-200/60 group">
            {/* Background Image - Deegawapi Stupa or Scenic Ampara */}
            <Image
              src="/images/deegawapi-stupa.jpg"
              alt="Ancient sacred Deegawapi Stupa bathed in golden sunrise light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/85" />

            {/* Top Bar Pills inside Image */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                <span className="uppercase">25 KM Account Security</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Encrypted Recovery Gateway</span>
              </div>
            </div>

            {/* Middle Big Typography */}
            <div className="relative z-10 max-w-lg mt-auto mb-6 pt-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest border border-white/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Protected Explorer Data</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 drop-shadow-md">
                Recover Access.<br />
                Return to Ampara.
              </h2>

              <p className="text-slate-100 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm max-w-md">
                Restore immediate access to your saved radial itineraries, booked wildlife boat safaris, and personalized heritage trail pins.
              </p>

              {/* Safety Checklist */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-slate-200">
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Instant 6-Digit OTP Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Itinerary Data Loss</span>
                </div>
              </div>
            </div>

            {/* Bottom Overlay Card: Security & Protection Guarantee */}
            <div className="relative z-10 bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 text-white shadow-2xl">
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-[#0084d1] flex items-center justify-center shrink-0 shadow-md">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      Explorer ID Protection
                    </div>
                    <div className="text-[10px] text-slate-300 truncate max-w-[170px]">
                      Sri Lanka Tourism Certified
                    </div>
                  </div>
                </div>

                <div className="col-span-3 border-l border-white/10 pl-3">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    256-bit
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    SSL Encryption
                  </div>
                </div>

                <div className="col-span-3 border-l border-white/10 pl-2">
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    100%
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Safe & Private
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Password Recovery Form Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
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

                <div className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-amber-600" />
                  <span>Password Recovery</span>
                </div>
              </div>

              {/* STEP 1: REQUEST CODE */}
              {(step === "request" || step === "error") && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                      Forgot Your Password?
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Enter your registered Explorer email address or phone number, and we will send you a 6-digit verification code.
                    </p>
                  </div>

                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          Registered Explorer Email
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
                          placeholder="explorer@amparaexplore.lk"
                          className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-3.5 py-3 border transition-all focus:outline-none ${step === "error"
                              ? "border-red-400 ring-2 ring-red-100 bg-red-50/20"
                              : "border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white"
                            }`}
                        />
                      </div>

                      {step === "error" && (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>No explorer account found with this email address. Please try another or register.</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-[0.99] mt-2"
                    >
                      <span>Send 6-Digit Recovery Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-slate-600">
                    <span>Remember your password? </span>
                    <Link
                      href="/login"
                      className="font-bold text-[#0084d1] hover:underline"
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </div>
              )}

              {/* STEP 2: VERIFY OTP */}
              {step === "verify" && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                      Check Your Inbox
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      We have sent a 6-digit recovery code to <span className="font-bold text-slate-800">{email}</span>. Enter it below to proceed.
                    </p>
                  </div>

                  <form onSubmit={handleVerifySubmit} className="space-y-4">
                    {/* OTP 6 Digits Inputs */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-800">
                          6-Digit Verification Code
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep("request")}
                          className="text-[11px] font-bold text-[#0084d1] hover:underline cursor-pointer"
                        >
                          Change Email
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-2 sm:gap-3">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className="w-full text-center text-lg sm:text-xl font-bold bg-[#f8fafc] text-slate-900 rounded-xl py-3 border border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white focus:outline-none transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Resend Code Section */}
                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-slate-500 font-medium">
                        Didn&apos;t receive the code?
                      </span>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="font-bold text-[#0084d1] hover:text-[#006699] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Resend Code</span>
                      </button>
                    </div>

                    {isResent && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>New verification code sent to your email!</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-[0.99] mt-2"
                    >
                      <span>Verify & Set New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="text-center mt-6 text-xs text-slate-600">
                    <button
                      type="button"
                      onClick={() => setStep("request")}
                      className="font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Email Step</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: RESET PASSWORD */}
              {step === "reset" && (
                <div className="animate-fadeIn">
                  <div className="mb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                      Create New Password
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Your new password must be secure and different from previously used passwords.
                    </p>
                  </div>

                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    {/* New Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          New Password
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
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-9 py-3 border border-slate-200 focus:border-[#0084d1] focus:ring-3 focus:ring-sky-100 focus:bg-white transition-all focus:outline-none"
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

                    {/* Confirm New Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-800">
                          Confirm New Password
                        </label>
                        {passwordsMatch && (
                          <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Passwords match
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
                          className={`w-full bg-[#f8fafc] text-slate-900 text-xs sm:text-sm font-medium rounded-xl pl-10 pr-9 py-3 border transition-all focus:outline-none ${!passwordsMatch && confirmPassword
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

                      {!passwordsMatch && confirmPassword && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-red-600 mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>Passwords do not match yet.</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer transform active:scale-[0.99] mt-2"
                    >
                      <span>Update Password & Save</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION */}
              {step === "success" && (
                <div className="text-center py-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest mb-2">
                    Security Update Complete
                  </span>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                    Password Reset Successful!
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto mb-6">
                    Your Explorer ID password has been updated securely. You can now use your new password to sign into your travel portal.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Sign In to Explorer ID</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/"
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Return to Home & Attractions</span>
                    </Link>
                  </div>
                </div>
              )}
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
