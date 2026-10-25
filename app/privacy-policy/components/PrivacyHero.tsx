import React from "react";
import { ShieldCheck } from "lucide-react";
import { PrivacyHeroProps } from "@/interface";

export default function PrivacyHero({
  lastUpdated = "October 2024 (Version 2.4)",
  sections,
}: PrivacyHeroProps) {
  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-900/5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#006699] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Data Protection Document</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            How we protect and handle your personal data across the 25 KM Radial
            Horizon portal.
          </p>
        </div>
      </div>

      {/* Table of Contents Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
          Sections:
        </span>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-[#0084d1] text-slate-700 transition-colors"
          >
            {s.title.split(".")[1]?.trim()}
          </a>
        ))}
      </div>
    </div>
  );
}
