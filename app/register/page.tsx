"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  RegisterHeader,
  RegisterForm,
  RegisterHeroShowcase,
  RegisterFooter,
} from "./components";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) return;
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "Unable to complete registration.");
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
          <RegisterHeader />

          <div className="flex flex-1 items-center justify-center py-12">
            <RegisterForm
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              agreeTerms={agreeTerms}
              passwordsMatch={passwordsMatch}
              error={error}
              isSubmitting={isSubmitting}
              onNameChange={setName}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onToggleShowPassword={() => setShowPassword((prev) => !prev)}
              onToggleShowConfirmPassword={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              onAgreeTermsChange={setAgreeTerms}
              onSubmit={handleSubmit}
            />
          </div>

          <RegisterFooter />
        </section>

        <RegisterHeroShowcase />
      </div>
    </main>
  );
}
