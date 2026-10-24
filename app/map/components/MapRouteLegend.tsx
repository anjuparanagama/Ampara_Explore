"use client";

import React from "react";

export default function MapRouteLegend() {
  return (
    <div className="absolute top-16 right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 text-[10px] font-bold text-slate-700 hidden sm:block">
      <div className="flex items-center gap-2">
        <span className="w-4 h-1 bg-amber-500 rounded-full" />
        <span>A-Class Highway (A25/A4 - Inginiyagala)</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-1 bg-cyan-400 rounded-full" />
        <span>B-Roads &amp; Scenic Corridor</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-1 bg-blue-600 rounded-full" />
        <span>Gal Oya to Deegawapi Radial Loop</span>
      </div>
    </div>
  );
}
