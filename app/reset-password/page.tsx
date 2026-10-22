"use client";

import { useState, type FormEvent } from "react";
import type { ResetStep, PasswordStrength } from "@/interface";
import {
  ResetPasswordHeader,
  ResetPasswordShowcase,
  ResetPasswordFormCard,
  ResetPasswordStateSwitcher,
} from "./components";

export default function ResetPasswordPage() {
  const [step, setStep] = useState<ResetStep>("reset");
  const [email] = useState("kasun@amparaexplore.lk");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, text: "None", color: "bg-slate-200" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1)
      return {
        score: 1,
        text: "Weak",
        color: "bg-rose-500",
        textCol: "text-rose-600",
      };
    if (score <= 3)
      return {
        score: 2,
        text: "Good",
        color: "bg-amber-500",
        textCol: "text-amber-600",
      };
    return {
      score: 3,
      text: "Strong",
      color: "bg-emerald-500",
      textCol: "text-emerald-600",
    };
  };

  const passwordsMatch = Boolean(
    newPassword && confirmPassword && newPassword === confirmPassword
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      // Simulate/trigger password reset completion
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStep("success");
    } catch {
      setError("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f3f6fa] font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      <ResetPasswordHeader />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <ResetPasswordStateSwitcher step={step} onStepChange={setStep} />
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <ResetPasswordShowcase />
          <ResetPasswordFormCard
            step={step}
            email={email}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            strength={getPasswordStrength(newPassword)}
            passwordsMatch={passwordsMatch}
            error={error}
            isSubmitting={isSubmitting}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
            onToggleConfirmPassword={() =>
              setShowConfirmPassword((visible) => !visible)
            }
            onSubmit={handleSubmit}
            onStepChange={setStep}
          />
        </div>
      </main>
    </div>
  );
}
