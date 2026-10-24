"use client";

import React from "react";
import { ZoomIn, ZoomOut, LocateFixed } from "lucide-react";
import { MapLegendBarProps } from "@/interface";

export default function MapLegendBar({
  zoomLevel,
  setZoomLevel,
  onRecenter,
}: MapLegendBarProps) {
  return (
    <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex flex-wrap items-center gap-4 text-slate-600 font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0084d1]" /> Main Landmark
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Conservation Water
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Monastic
          Hermitages
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Wildlife
          Corridors
        </span>
      </div>

      {/* Bottom Right Map Zoom Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onRecenter}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="Recenter Radar"
        >
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
