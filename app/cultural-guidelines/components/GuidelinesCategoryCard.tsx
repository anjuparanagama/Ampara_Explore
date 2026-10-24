"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { GuidelinesCategoryCardProps, guidelineCategoryTitles } from "@/interface";

export default function GuidelinesCategoryCard({
  category,
  meta,
}: GuidelinesCategoryCardProps) {
  const info = meta || guidelineCategoryTitles[category.category];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
      <div className="mb-5 pb-4 border-b border-slate-100">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {info?.label || category.category}
        </h2>
        {info?.desc && (
          <p className="text-xs text-slate-500 mt-0.5">{info.desc}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Do's Column */}
        <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
          <div className="flex items-center gap-2 mb-3.5 text-emerald-800 font-extrabold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>RECOMMENDED (DO)</span>
          </div>
          <ul className="space-y-2.5">
            {category.dos.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts Column */}
        <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
          <div className="flex items-center gap-2 mb-3.5 text-rose-800 font-extrabold text-sm">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>PROHIBITED (DON&apos;T)</span>
          </div>
          <ul className="space-y-2.5">
            {category.donts.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
