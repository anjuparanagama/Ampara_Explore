"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import type { FlowStep, PasswordStrength } from "@/interface/forgetpassword.types";
import RecoveryFormCard from "./components/RecoveryFormCard";
import RecoveryHeader from "./components/RecoveryHeader";
import RecoveryShowcase from "./components/RecoveryShowcase";
import RecoveryStateSwitcher from "./components/RecoveryStateSwitcher";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<FlowStep>("request");
  const [email, setEmail] = useState("kasun@amparaexplore.lk");
  const [otp, setOtp] = useState(["8", "4", "9", "2", "0", "1"]);
  const [newPassword, setNewPassword] = useState("NewExplorerPass2025!");
  const [confirmPassword, setConfirmPassword] = useState("NewExplorerPass2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResent, setIsResent] = useState(false);

  const handleStepSwitch = (targetStep: FlowStep) => {
    setStep(targetStep);
    if (targetStep === "error") setEmail("unregistered-user@unknown.lk");
    if (targetStep === "request") setEmail("kasun@amparaexplore.lk");
  };

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.slice(-1);
    setOtp((current) => current.map((digit, digitIndex) => (digitIndex === index ? nextValue : digit)));
    if (nextValue && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return { score: 0, text: "None", color: "bg-slate-200" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { score: 1, text: "Weak", color: "bg-rose-500", textCol: "text-rose-600" };
    if (score <= 3) return { score: 2, text: "Good", color: "bg-amber-500", textCol: "text-amber-600" };
    return { score: 3, text: "Strong", color: "bg-emerald-500", textCol: "text-emerald-600" };
  };

  const passwordsMatch = Boolean(newPassword && confirmPassword && newPassword === confirmPassword);

  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== "error") setStep("verify");
  };

  const handleVerifySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep("reset");
  };

  const handleResetSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) {
      alert("Passwords do not match.");
      return;
    }
    setStep("success");
  };

  const handleResendCode = () => {
    setIsResent(true);
    window.setTimeout(() => setIsResent(false), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f3f6fa] font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      <RecoveryHeader />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <RecoveryStateSwitcher step={step} onStepChange={handleStepSwitch} />
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <RecoveryShowcase />
          <RecoveryFormCard
            step={step}
            email={email}
            otp={otp}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            isResent={isResent}
            strength={getPasswordStrength(newPassword)}
            passwordsMatch={passwordsMatch}
            onEmailChange={setEmail}
            onOtpChange={handleOtpChange}
            onOtpKeyDown={handleOtpKeyDown}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
            onToggleConfirmPassword={() => setShowConfirmPassword((visible) => !visible)}
            onRequestSubmit={handleRequestSubmit}
            onVerifySubmit={handleVerifySubmit}
            onResetSubmit={handleResetSubmit}
            onResendCode={handleResendCode}
            onStepChange={setStep}
          />
        </div>
      </main>
    </div>
  );
}
