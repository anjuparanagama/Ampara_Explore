import type { FlowStep } from "@/interface/forgetpassword.types";

interface RecoveryStateSwitcherProps {
  step: FlowStep;
  onStepChange: (step: FlowStep) => void;
}

const steps: { value: FlowStep; label: string; activeClass: string }[] = [
  { value: "request", label: "1. Request Code", activeClass: "bg-slate-100 text-[#006699]" },
  { value: "verify", label: "2. Verify OTP", activeClass: "bg-slate-100 text-[#006699]" },
  { value: "reset", label: "3. New Password", activeClass: "bg-slate-100 text-[#006699]" },
  { value: "success", label: "4. Success", activeClass: "bg-emerald-50 text-emerald-700" },
  { value: "error", label: "Error State", activeClass: "bg-rose-50 text-rose-700" },
];

export default function RecoveryStateSwitcher({
  step,
  onStepChange,
}: RecoveryStateSwitcherProps) {
  return (
    <div className="mb-4 flex justify-center sm:mb-6 sm:justify-end">
      <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-200/90 bg-white/90 p-1 shadow-xs backdrop-blur-md">
        {steps.map(({ value, label, activeClass }) => (
          <button
            key={value}
            type="button"
            onClick={() => onStepChange(value)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all ${
              step === value ? `${activeClass} shadow-2xs` : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                step === value
                  ? value === "success"
                    ? "bg-emerald-500"
                    : value === "error"
                      ? "bg-rose-500"
                      : "bg-[#0084d1]"
                  : "border border-slate-400 bg-transparent"
              }`}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
