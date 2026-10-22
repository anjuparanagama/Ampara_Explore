import Link from "next/link";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RotateCcw,
} from "lucide-react";
import type { FlowStep, PasswordStrength } from "@/interface/forgetpassword.types";

interface RecoveryFormCardProps {
  step: FlowStep;
  email: string;
  otp: string[];
  newPassword: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isResent: boolean;
  strength: PasswordStrength;
  passwordsMatch: string | boolean;
  onEmailChange: (value: string) => void;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, event: KeyboardEvent<HTMLInputElement>) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onRequestSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onVerifySubmit: (event: FormEvent<HTMLFormElement>) => void;
  onResetSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onResendCode: () => void;
  onStepChange: (step: FlowStep) => void;
}

const buttonClass =
  "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0084d1] px-4 py-3.5 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-[#0070b3] hover:shadow-lg sm:text-sm";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-[#f8fafc] py-3 pl-10 pr-3.5 text-xs font-medium text-slate-900 transition-all focus:border-[#0084d1] focus:bg-white focus:outline-none focus:ring-3 focus:ring-sky-100 sm:text-sm";

export default function RecoveryFormCard(props: RecoveryFormCardProps) {
  const {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isResent,
    strength,
    passwordsMatch,
    onEmailChange,
    onOtpChange,
    onOtpKeyDown,
    onNewPasswordChange,
    onConfirmPasswordChange,
    onTogglePassword,
    onToggleConfirmPassword,
    onRequestSubmit,
    onVerifySubmit,
    onResetSubmit,
    onResendCode,
    onStepChange,
  } = props;

  return (
    <div className="flex flex-col justify-center lg:col-span-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0084d1] text-white">
              <Compass className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-base font-black leading-tight text-slate-900">Ampara Explore</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#0084d1]">Heritage & Wildlife</div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-800">
            <KeyRound className="h-3 w-3 text-amber-600" />
            <span>Password Recovery</span>
          </div>
        </div>

        {(step === "request" || step === "error") && (
          <div className="animate-fadeIn">
            <StepHeading title="Forgot Your Password?">
              Enter your registered Explorer email address or phone number, and we will send you a 6-digit verification code.
            </StepHeading>
            <form onSubmit={onRequestSubmit} className="space-y-4">
              <div>
                <FieldLabel label="Registered Explorer Email" />
                <div className="relative">
                  <MailIcon />
                  <input type="email" required value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="explorer@amparaexplore.lk" className={`${inputClass} ${step === "error" ? "border-red-400 bg-red-50/20 ring-2 ring-red-100" : ""}`} />
                </div>
                {step === "error" && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>No explorer account found with this email address. Please try another or register.</span>
                  </div>
                )}
              </div>
              <button type="submit" className={buttonClass}><span>Send 6-Digit Recovery Code</span><ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-6 text-center text-xs text-slate-600">
              <span>Remember your password? </span>
              <Link href="/login" className="font-bold text-[#0084d1] hover:underline">Back to Sign In</Link>
            </div>
          </div>
        )}

        {step === "verify" && (
          <div className="animate-fadeIn">
            <StepHeading title="Check Your Inbox">
              We have sent a 6-digit recovery code to <span className="font-bold text-slate-800">{email}</span>. Enter it below to proceed.
            </StepHeading>
            <form onSubmit={onVerifySubmit} className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <FieldLabel label="6-Digit Verification Code" />
                  <button type="button" onClick={() => onStepChange("request")} className="text-[11px] font-bold text-[#0084d1] hover:underline">Change Email</button>
                </div>
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(event) => onOtpChange(index, event.target.value)} onKeyDown={(event) => onOtpKeyDown(index, event)} className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] py-3 text-center text-lg font-bold text-slate-900 transition-all focus:border-[#0084d1] focus:bg-white focus:outline-none focus:ring-3 focus:ring-sky-100 sm:text-xl" />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between py-1 text-xs">
                <span className="font-medium text-slate-500">Didn&apos;t receive the code?</span>
                <button type="button" onClick={onResendCode} className="flex items-center gap-1 font-bold text-[#0084d1] hover:text-[#006699]"><RotateCcw className="h-3.5 w-3.5" /><span>Resend Code</span></button>
              </div>
              {isResent && <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /><span>New verification code sent to your email!</span></div>}
              <button type="submit" className={buttonClass}><span>Verify & Set New Password</span><ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-6 text-center text-xs text-slate-600">
              <button type="button" onClick={() => onStepChange("request")} className="inline-flex items-center gap-1 font-bold text-slate-600 hover:text-slate-900"><ArrowLeft className="h-3.5 w-3.5" /><span>Back to Email Step</span></button>
            </div>
          </div>
        )}

        {step === "reset" && (
          <div className="animate-fadeIn">
            <StepHeading title="Create New Password">Your new password must be secure and different from previously used passwords.</StepHeading>
            <form onSubmit={onResetSubmit} className="space-y-4">
              <PasswordField label="New Password" value={newPassword} visible={showPassword} onChange={onNewPasswordChange} onToggle={onTogglePassword} strength={strength} />
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <FieldLabel label="Confirm New Password" />
                  {passwordsMatch && <span className="flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-600"><Check className="h-3 w-3" /> Passwords match</span>}
                </div>
                <PasswordField value={confirmPassword} visible={showConfirmPassword} onChange={onConfirmPasswordChange} onToggle={onToggleConfirmPassword} invalid={!passwordsMatch && Boolean(confirmPassword)} />
                {!passwordsMatch && confirmPassword && <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-red-600"><AlertCircle className="h-3 w-3 shrink-0" /><span>Passwords do not match yet.</span></div>}
              </div>
              <button type="submit" className={buttonClass}><span>Update Password & Save</span><ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div className="animate-fadeIn py-4 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-inner"><CheckCircle2 className="h-9 w-9" /></div>
            <span className="mb-2 inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">Security Update Complete</span>
            <h1 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Password Reset Successful!</h1>
            <p className="mx-auto mb-6 max-w-sm text-xs font-medium text-slate-500 sm:text-sm">Your Explorer ID password has been updated securely. You can now use your new password to sign into your travel portal.</p>
            <div className="space-y-3">
              <Link href="/login" className={buttonClass}><span>Sign In to Explorer ID</span><ArrowRight className="h-4 w-4" /></Link>
              <Link href="/" className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"><span>Return to Home & Attractions</span></Link>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-600">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
        <span>Protected by Sri Lanka Tourism Digital Gateway • 256-bit encryption</span>
      </div>
    </div>
  );
}

function StepHeading({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <h1 className="mb-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
      <p className="text-xs font-medium text-slate-500 sm:text-sm">{children}</p>
    </div>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <div className="mb-1 flex items-center justify-between">
      <label className="text-xs font-bold text-slate-800">{label}</label>
      {label === "Registered Explorer Email" && <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Required</span>}
    </div>
  );
}

function MailIcon() {
  return <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Mail className="h-4 w-4" /></div>;
}

function PasswordField({ label, value, visible, onChange, onToggle, invalid = false, strength }: { label?: string; value: string; visible: boolean; onChange: (value: string) => void; onToggle: () => void; invalid?: boolean; strength?: PasswordStrength }) {
  return (
    <div>
      {label && <div className="mb-1 flex items-center justify-between"><FieldLabel label={label} /><span className={`text-[10px] font-extrabold uppercase ${strength?.textCol || "text-slate-400"}`}>{strength?.text}</span></div>}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"><Lock className="h-4 w-4" /></div>
        <input type={visible ? "text" : "password"} required value={value} onChange={(event) => onChange(event.target.value)} placeholder="••••••••••••" className={`${inputClass} pr-9 ${invalid ? "border-red-400 bg-red-50/20 ring-2 ring-red-100" : ""}`} />
        <button type="button" onClick={onToggle} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 hover:text-slate-600">{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </div>
      {strength && (
        <div className="mt-1.5 flex items-center gap-1">
          {[1, 2, 3].map((level) => (
            <div key={level} className={`h-1 flex-1 rounded-full ${strength.score >= level ? strength.color : "bg-slate-200"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
