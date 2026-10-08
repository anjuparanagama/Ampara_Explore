"use client";

import React, { useState } from "react";
import { X, User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isRegister ? "Account created successfully! Welcome to Ampara Explore." : "Welcome back to Ampara Explore!");
    onClose();
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
            {isRegister ? "Join Ampara Explore" : "Welcome Explorer"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister ? "Create an account to save radial trip routes and reviews." : "Sign in to access your saved itineraries."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
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
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#006699] hover:bg-[#0284c7] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            <span>{isRegister ? "Create Account" : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          {isRegister ? "Already have an account?" : "Do not have an account yet?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#0284c7] font-bold hover:underline cursor-pointer"
          >
            {isRegister ? "Sign In here" : "Register now"}
          </button>
        </div>
      </div>
    </div>
  );
}

