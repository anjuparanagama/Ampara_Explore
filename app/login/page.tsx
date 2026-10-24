"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  LoginHeader,
  LoginForm,
  LoginHeroShowcase,
  LoginFooter,
} from "./components";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "Unable to complete authentication.");
        return;
      }

      window.dispatchEvent(new Event("ampara-auth-change"));
      router.push(result.user?.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch {
      setError("Unable to connect to the authentication service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-white text-slate-800">
      <div className="grid min-h-dvh w-full lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex min-h-dvh flex-col px-6 py-7 sm:px-12 lg:px-[clamp(3rem,8vw,8rem)]">
          <LoginHeader />

          <div className="flex flex-1 items-center justify-center py-12">
            <LoginForm
              email={email}
              password={password}
              showPassword={showPassword}
              rememberMe={rememberMe}
              error={error}
              isSubmitting={isSubmitting}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onToggleShowPassword={() => setShowPassword((prev) => !prev)}
              onRememberMeChange={setRememberMe}
              onSubmit={handleSubmit}
            />
          </div>

          <LoginFooter />
        </section>

        <LoginHeroShowcase />
      </div>
    </main>
  );
}
