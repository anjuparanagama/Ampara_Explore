"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isRegister ? { name } : {}),
          email,
          password,
          ...(isRegister ? {} : { rememberMe: true }),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "Unable to complete authentication.");
        return;
      }

      window.dispatchEvent(new Event("ampara-auth-change"));
      onClose();
      router.push(result.user?.role === "admin" ? "/admin" : "/");
    } catch {
      setError("Unable to connect to the authentication service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200 animate-scaleUp">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0284c7] flex items-center justify-center mx-auto mb-3 font-extrabold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegister ? t("joinAmpara") : t("welcomeExplorer")}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister ? t("registerSubtitle") : t("loginSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t("fullName")}
              </label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-400">
                <User className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Perera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {t("emailAddress")}
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-400">
              <Mail className="w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="explorer@ampara.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              {t("password")}
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-400">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>
            {!isRegister && (
              <div className="flex justify-end pt-1">
                <a
                  href="/forgot-password"
                  onClick={onClose}
                  className="text-xs font-semibold text-[#0284c7] hover:underline"
                >
                  {t("forgotPasswordLink", "Forgot password?")}
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#006699] hover:bg-[#0284c7] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            <span>
              {isSubmitting
                ? isRegister
                  ? t("creatingAccount")
                  : t("signingIn")
                : isRegister
                  ? t("registerBtn")
                  : t("signInBtn")}
            </span>
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
          {error && (
            <p role="alert" className="text-center text-xs text-rose-600">
              {error}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#0284c7] font-bold hover:underline cursor-pointer"
          >
            {isRegister ? t("alreadyHaveAccount") : t("dontHaveAccount")}
          </button>
        </div>
      </div>
    </div>
  );
}
