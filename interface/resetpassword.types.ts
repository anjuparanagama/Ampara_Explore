import type { FormEvent } from "react";
import type { PasswordStrength } from "./forgetpassword.types";

export type ResetStep = "reset" | "success" | "error";

export interface ResetPasswordFormCardProps {
  step: ResetStep;
  email: string;
  newPassword: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  strength: PasswordStrength;
  passwordsMatch: boolean;
  error: string;
  isSubmitting: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onStepChange: (step: ResetStep) => void;
}

export interface ResetPasswordStateSwitcherProps {
  step: ResetStep;
  onStepChange: (step: ResetStep) => void;
}
