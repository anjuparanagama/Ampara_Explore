import React from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  Lock,
  RotateCcw,
} from "lucide-react";
import { ResetPasswordFormCardProps, PasswordStrength } from "@/interface";

const buttonClass =
  "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0084d1] px-4 py-3.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-[#0070b3] hover:shadow-lg sm:text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-[#f8fafc] py-3 pl-10 pr-10 text-xs font-medium text-slate-900 transition-all focus:border-[#0084d1] focus:bg-white focus:outline-none focus:ring-3 focus:ring-sky-100 sm:text-sm";

export default function ResetPasswordFormCard(props: ResetPasswordFormCardProps) {
  const {
    step,
    email,
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    strength,
    passwordsMatch,
    error,
    isSubmitting,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onTogglePassword,
    onToggleConfirmPassword,
    onSubmit,
    onStepChange,
  } = props;

  return (
    <div className="flex flex-col justify-center lg:col-span-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0084d1] text-white">
              <Compass className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-base font-black leading-tight text-slate-900">
                Ampara Explore
              </div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#0084d1]">
                Heritage &amp; Wildlife
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-sky-800">
            <Lock className="h-3 w-3 text-sky-600" />
            <span>Reset Password</span>
          </div>
        </div>

        {step === "reset" && (
          <div className="animate-fadeIn">
            <div className="mb-5">
              <h1 className="mb-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Create New Password
              </h1>
              <p className="text-xs font-medium text-slate-500 sm:text-sm">
                Your new password must be secure and at least 8 characters long.
                {email && (
                  <span className="block mt-1 font-semibold text-slate-700">
                    Account: {email}
                  </span>
                )}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    New Password
                  </label>
                  <span
                    className={`text-[10px] font-extrabold uppercase ${
                      strength?.textCol || "text-slate-400"
                    }`}
                  >
                    {strength?.text}
                  </span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => onNewPasswordChange(e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {strength && (
                  <div className="mt-1.5 flex items-center gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          strength.score >= level
                            ? strength.color
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Confirm New Password
                  </label>
                  {passwordsMatch && (
                    <span className="flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-600">
                      <Check className="h-3 w-3" /> Passwords match
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    placeholder="Repeat your new password"
                    className={`${inputClass} ${
                      !passwordsMatch && confirmPassword
                        ? "border-red-400 bg-red-50/20 ring-2 ring-red-100"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {!passwordsMatch && confirmPassword && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>Passwords do not match yet.</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !passwordsMatch}
                className={buttonClass}
              >
                <span>
                  {isSubmitting ? "Updating..." : "Update Password & Save"}
                </span>
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="animate-fadeIn py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <span className="mb-2 inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
              Security Update Complete
            </span>
            <h1 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Password Reset Successful!
            </h1>
            <p className="mx-auto mb-6 max-w-sm text-xs font-medium text-slate-500 sm:text-sm">
              Your Explorer ID password has been updated securely. You can now use
              your new password to sign into your travel portal.
            </p>
            <div className="space-y-3">
              <Link href="/login" className={buttonClass}>
                <span>Sign In to Explorer ID</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
              >
                <span>Return to Home &amp; Attractions</span>
              </Link>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="animate-fadeIn py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 shadow-inner">
              <AlertCircle className="h-9 w-9" />
            </div>
            <span className="mb-2 inline-block rounded-full bg-rose-100/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-800">
              Verification Failed
            </span>
            <h1 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Reset Session Expired
            </h1>
            <p className="mx-auto mb-6 max-w-sm text-xs font-medium text-slate-500 sm:text-sm">
              This password reset link or token has expired or is invalid.
              Please initiate a new recovery request to receive a fresh verification code.
            </p>
            <div className="space-y-3">
              <Link href="/forgot-password" className={buttonClass}>
                <RotateCcw className="h-4 w-4" />
                <span>Request New Reset Link</span>
              </Link>
              <button
                type="button"
                onClick={() => onStepChange("reset")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 cursor-pointer"
              >
                <span>Try Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-600">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>
          Protected by Sri Lanka Tourism Digital Gateway • 256-bit encryption
        </span>
      </div>
    </div>
  );
}
