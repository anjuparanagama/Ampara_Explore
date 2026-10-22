export type FlowStep = "request" | "verify" | "reset" | "success" | "error";

export interface PasswordStrength {
  score: number;
  text: string;
  color: string;
  textCol?: string;
}