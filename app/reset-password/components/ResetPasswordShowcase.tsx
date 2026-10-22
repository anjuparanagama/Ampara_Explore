import React from "react";
import Image from "next/image";
import { Check, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export default function ResetPasswordShowcase() {
  return (
    <div className="group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/60 p-6 shadow-xl sm:p-8 lg:col-span-6 lg:min-h-[660px]">
      <Image
        src="/images/deegawapi-stupa.jpg"
        alt="Sacred Deegawapi Stupa bathed in golden sunrise light"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="transform object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/85" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/50 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white backdrop-blur-md">
          <LockKeyhole className="h-3.5 w-3.5 text-sky-400" />
          <span className="uppercase">25 KM Account Security</span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/50 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span>Credential Update Gateway</span>
        </div>
      </div>

      <div className="relative z-10 mt-auto mb-6 max-w-lg pt-16">
        <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md sm:text-[11px]">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Secure Credentials</span>
        </div>
        <h2 className="mb-3 text-3xl font-black leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-5xl">
          Set New Password.
          <br />
          Resume Adventure.
        </h2>
        <p className="max-w-md text-xs font-medium leading-relaxed text-slate-100 drop-shadow-sm sm:text-sm">
          Keep your personalized Ampara itineraries, saved secret safari routes,
          and heritage trail points protected with your new password.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 text-[11px] font-medium text-slate-200 sm:grid-cols-2">
          {["Military-grade 256-Bit Protection", "Immediate Account Activation"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/25 px-2.5 py-1.5 backdrop-blur-xs"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative z-10 rounded-2xl border border-white/15 bg-slate-900/80 p-3.5 text-white shadow-2xl backdrop-blur-md sm:p-4">
        <div className="grid grid-cols-12 items-center gap-3">
          <div className="col-span-6 flex items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0084d1] shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight sm:text-sm">
                Explorer ID Protection
              </div>
              <div className="max-w-[170px] truncate text-[10px] text-slate-300">
                Sri Lanka Tourism Certified
              </div>
            </div>
          </div>
          <div className="col-span-3 border-l border-white/10 pl-3">
            <div className="text-sm font-black leading-tight sm:text-base">
              256-bit
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              SSL Encryption
            </div>
          </div>
          <div className="col-span-3 border-l border-white/10 pl-2">
            <div className="text-sm font-black leading-tight sm:text-base">
              100%
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Safe & Private
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
