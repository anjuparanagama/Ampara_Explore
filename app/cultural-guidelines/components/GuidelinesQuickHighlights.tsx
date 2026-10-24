"use client";

import React from "react";
import { Shirt, Footprints, Trees, VolumeX } from "lucide-react";

export default function GuidelinesQuickHighlights() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
          <Shirt className="w-5 h-5" />
        </div>
        <div className="text-xs font-bold text-slate-900">Modest Clothing</div>
        <div className="text-[11px] text-slate-500">
          Shoulders &amp; knees covered
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0084d1] flex items-center justify-center mx-auto mb-2">
          <Footprints className="w-5 h-5" />
        </div>
        <div className="text-xs font-bold text-slate-900">Remove Footwear</div>
        <div className="text-[11px] text-slate-500">
          Before sacred sand terraces
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
          <Trees className="w-5 h-5" />
        </div>
        <div className="text-xs font-bold text-slate-900">Leave No Trace</div>
        <div className="text-[11px] text-slate-500">Zero plastic littering</div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 text-center shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
          <VolumeX className="w-5 h-5" />
        </div>
        <div className="text-xs font-bold text-slate-900">Maintain Silence</div>
        <div className="text-[11px] text-slate-500">Reverence in hermitages</div>
      </div>
    </div>
  );
}
