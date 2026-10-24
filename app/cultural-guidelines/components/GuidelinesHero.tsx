"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function GuidelinesHero() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-[28px] p-6 sm:p-10 text-white shadow-xl shadow-slate-900/10 mb-8 border border-sky-500/20 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Heritage &amp; Eco-Preservation Protocol</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          Cultural &amp; Environmental Guidelines
        </h1>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          Ampara is a land of sacred millennia-old Buddhist stupas, thriving
          elephant corridors, and delicate wetland ecosystems. As explorers, we
          travel with deep respect, humility, and care.
        </p>
      </div>
    </div>
  );
}
