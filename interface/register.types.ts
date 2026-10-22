import { type FormEvent } from "react";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreeTerms: boolean;
  passwordsMatch: boolean;
  error: string;
  isSubmitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onToggleShowPassword: () => void;
  onToggleShowConfirmPassword: () => void;
  onAgreeTermsChange: (checked: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface RegisterHeaderProps {
  appName?: string;
  homeLinkText?: string;
}

export interface RegisterHeroShowcaseProps {
  tagline?: string;
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}
