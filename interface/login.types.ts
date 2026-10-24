import { type FormEvent } from "react";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  error: string;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onToggleShowPassword: () => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface LoginHeaderProps {
  appName?: string;
  homeLinkText?: string;
}

export interface LoginHeroShowcaseProps {
  tagline?: string;
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
}
