import React from "react";
import { FileCheck2 } from "lucide-react";
import { TermsHeroProps } from "@/interface";

export default function TermsHero({
  lastUpdated = "October 2024 (Version 1.8)",
  sections,
}: TermsHeroProps) {
  return (
    <div className="bg-white rounded-[28px] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-900/5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Regional Portal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Rules and responsibilities governing use of the Ampara Explore radial
            discovery platform.
          </p>
        </div>

        <div className="text-left sm:text-right text-xs text-slate-500 shrink-0">
          <span className="font-bold text-slate-700 block">
            Jurisdiction: Sri Lanka
          </span>
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </div>

      {/* Table of Contents Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
          Jump to:
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
