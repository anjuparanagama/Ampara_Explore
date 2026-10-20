"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthPageProps {
  mode: AuthMode;
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const passwordsMatch =
    isLogin || (password.length > 0 && password === confirmPassword);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-dvh bg-white text-slate-800">
      <div className="grid min-h-dvh w-full lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex min-h-dvh flex-col px-6 py-7 sm:px-12 lg:px-[clamp(3rem,8vw,8rem)]">
          <header className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-sky-600"
            >
              Ampara<span className="text-slate-800"> Explore</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </header>

          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-[390px]">
              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
                  {isLogin ? "Welcome back" : "Start exploring"}
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
                  {isLogin ? "Sign in to your account" : "Create your account"}
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  {isLogin
                    ? "Continue planning your next Ampara adventure."
                    : "Save places and plan beautiful Ampara journeys."}
                </p>
              </div>

              <nav className="mb-7 flex border-b border-slate-200">
                <Link
                  href="/login"
                  className={`w-1/2 border-b-2 pb-3 text-center text-sm font-semibold transition ${
                    isLogin
                      ? "border-sky-600 text-sky-600"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className={`w-1/2 border-b-2 pb-3 text-center text-sm font-semibold transition ${
                    !isLogin
                      ? "border-sky-600 text-sky-600"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Sign up
                </Link>
              </nav>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Full name
                    </span>
                    <span className="relative block">
                      <UserRound className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your full name"
                        className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </span>
                  </label>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Email address
                  </span>
                  <span className="relative block">
                    <Mail className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Password
                  </span>
                  <span className="relative block">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      required
                      minLength={isLogin ? undefined : 8}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={
                        isLogin ? "Your password" : "At least 8 characters"
                      }
                      className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </span>
                </label>

                {!isLogin && (
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Confirm password
                    </span>
                    <span className="relative block">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Repeat your password"
                        className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() =>
                          setShowConfirmPassword((visible) => !visible)
                        }
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
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
                )}

                {isLogin ? (
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <label className="flex items-center gap-2 text-slate-500">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) =>
                          setRememberMe(event.target.checked)
                        }
                        className="h-4 w-4 accent-sky-600"
                      />
                      Remember me
                    </label>
                    <Link
                      href="/forgot-password"
                      className="font-semibold text-sky-600 hover:text-sky-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                    <input
                      required
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 accent-sky-600"
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="font-semibold text-sky-600"
                      >
                        terms and guidelines
                      </Link>
                      .
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-sky-600 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
                >
                  {isLogin ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                {submitted && (
                  <p
                    role="status"
                    className="rounded-md bg-emerald-50 px-3 py-2 text-center text-xs text-emerald-700"
                  >
                    {isLogin
                      ? "Sign-in details submitted."
                      : "Account details submitted."}
                  </p>
                )}
              </form>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            © Ampara Explore. All rights reserved.
          </p>
        </section>

        <aside className="relative hidden min-h-dvh overflow-hidden bg-sky-600 lg:block">
          <Image
            src="/images/login-bg.jpg"
            alt="A peaceful reservoir in Ampara"
            fill
            priority
            sizes="55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-sky-600/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/70 via-cyan-500/35 to-sky-900/55" />
          <div className="relative z-10 flex min-h-dvh items-center px-10 py-16 xl:px-20">
            <div className="max-w-lg text-white">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">
                Ampara, Sri Lanka
              </p>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-6xl">
                {isLogin
                  ? "Continue your journey. Discover beautiful places."
                  : "Start your journey. Explore beautiful places."}
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-sky-50">
                Discover reservoirs, wildlife, heritage and unforgettable
                experiences across the heart of Ampara.
              </p>
              <div className="mt-10 flex items-center gap-2">
                <span className="h-2.5 w-8 rounded-full bg-white" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
