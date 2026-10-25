import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { LoginFormProps } from "@/interface";

export default function LoginForm({
  email,
  password,
  showPassword,
  rememberMe,
  error,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onToggleShowPassword,
  onRememberMeChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="w-full max-w-[390px]">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Continue planning your next Ampara adventure.
        </p>
      </div>

      <nav className="mb-7 flex border-b border-slate-200">
        <Link
          href="/login"
          className="w-1/2 border-b-2 border-sky-600 pb-3 text-center text-sm font-semibold text-sky-600 transition"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="w-1/2 border-b-2 border-transparent pb-3 text-center text-sm font-semibold text-slate-400 transition hover:text-slate-700"
        >
          Sign up
        </Link>
      </nav>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-600">
            Email address
          </span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              required
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-md bg-white pl-10 pr-3"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-600">
            Password
          </span>
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Your password"
              className="h-11 w-full rounded-md bg-white pl-10 pr-11"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={onToggleShowPassword}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </span>
        </label>

        <div className="flex items-center justify-between gap-4 text-xs">
          <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => onRememberMeChange(event.target.checked)}
              className="h-4 w-4 accent-sky-600"
            />
            Remember me
          </label>
          {/*           <Link
            href="/forgot-password"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Forgot password?
          </Link> */}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Please wait..." : "Sign in"}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>

        {error && (
          <p
            role="alert"
            className="rounded-md bg-rose-50 px-3 py-2 text-center text-xs text-rose-700"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
