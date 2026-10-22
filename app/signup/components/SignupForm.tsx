import React from "react";
import Link from "next/link";
import Input from "@/components/Input";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { SignupFormProps } from "@/interface";

export default function SignupForm({
  name,
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  agreeTerms,
  passwordsMatch,
  error,
  isSubmitting,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onToggleShowPassword,
  onToggleShowConfirmPassword,
  onAgreeTermsChange,
  onSubmit,
}: SignupFormProps) {
  return (
    <div className="w-full max-w-[390px]">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
          Start exploring
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Save places and plan beautiful Ampara journeys.
        </p>
      </div>

      <nav className="mb-7 flex border-b border-slate-200">
        <Link
          href="/login"
          className="w-1/2 border-b-2 border-transparent pb-3 text-center text-sm font-semibold text-slate-400 transition hover:text-slate-700"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="w-1/2 border-b-2 border-sky-600 pb-3 text-center text-sm font-semibold text-sky-600 transition"
        >
          Sign up
        </Link>
      </nav>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-600">
            Full name
          </span>
          <span className="relative block">
            <UserRound className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              required
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Your full name"
              className="h-11 w-full rounded-md bg-white pl-10 pr-3"
            />
          </span>
        </label>

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
              onChange={(e) => onEmailChange(e.target.value)}
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
              minLength={8}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="At least 8 characters"
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

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-slate-600">
            Confirm password
          </span>
          <span className="relative block">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              required
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              placeholder="Repeat your password"
              className="h-11 w-full rounded-md bg-white pl-10 pr-11"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={onToggleShowConfirmPassword}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </span>
          {!passwordsMatch && confirmPassword.length > 0 && (
            <span className="mt-1.5 block text-xs text-rose-600">
              Passwords do not match.
            </span>
          )}
        </label>

        <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
          <input
            required
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => onAgreeTermsChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-sky-600"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-semibold text-sky-600">
              terms and guidelines
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Please wait..." : "Create account"}
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
