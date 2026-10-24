import React from "react";
import { TermsSectionCardProps } from "@/interface";

export default function TermsSectionCard({ section }: TermsSectionCardProps) {
  return (
    <div
      id={section.id}
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm scroll-mt-24 transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
          {section.icon}
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          {section.title}
        </h2>
      </div>

      <div className="pt-2">{section.content}</div>
    </div>
  );
}
