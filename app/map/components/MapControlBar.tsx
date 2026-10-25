"use client";

import React from "react";
import { MapControlBarProps } from "@/interface";
import { useLanguage } from "@/context/LanguageContext";

export default function MapControlBar({
  mapLayer,
  setMapLayer,
}: MapControlBarProps) {
  const { t } = useLanguage();

  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
      {/* Center Benchmark Tag */}
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#0084d1] animate-pulse" />
        <span>{t("clockTowerBenchmark")}</span>
        <span className="text-[10px] text-slate-400 font-semibold">
          {t("benchmarkCenter")}
        </span>
      </div>

      {/* Map Layer Switcher */}
      <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-sm text-xs font-bold">
        <button
          type="button"
          onClick={() => setMapLayer("terrain")}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            mapLayer === "terrain"
              ? "bg-[#0084d1] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t("layerTerrain")}
        </button>
        <button
          type="button"
          onClick={() => setMapLayer("satellite")}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            mapLayer === "satellite"
              ? "bg-[#0084d1] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t("layerSatellite")}
        </button>
        <button
          type="button"
          onClick={() => setMapLayer("topo")}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            mapLayer === "topo"
              ? "bg-[#0084d1] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {t("layerTopo")}
        </button>
      </div>
    </div>
  );
}
