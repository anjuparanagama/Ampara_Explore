import React from "react";
import {
  Calendar,
  Compass,
  ChevronDown,
  Check,
  Zap,
  FileText,
  Share2,
  Plus,
} from "lucide-react";
import { PlanControlsProps } from "@/interface";

export default function PlanControls({
  pace,
  setPace,
  showPaceDropdown,
  setShowPaceDropdown,
  onOptimizeRoute,
  onCreatePlan,
}: PlanControlsProps) {
  const paceOptions = [
    "Relaxed (1–2 stops)",
    "Balanced (3–4 stops)",
    "Intensive (5+ stops)",
  ];

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Itinerary link copied to clipboard!");
    }
  };

  const handleExportPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date Picker Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800">
          <Calendar className="w-4 h-4 text-[#0084d1]" />
          <span>Today, 24 Oct 2025</span>
        </div>

        {/* Pace Selector Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowPaceDropdown((prev) => !prev)}
            className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#0084d1]" />
            <span>Pace: {pace}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showPaceDropdown && (
            <div className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 min-w-[200px] animate-fadeIn">
              {paceOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPace(p);
                    setShowPaceDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    pace === p
                      ? "bg-sky-50 text-[#0084d1]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{p}</span>
                  {pace === p && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex items-center gap-2">
        {onCreatePlan && (
          <button
            type="button"
            onClick={onCreatePlan}
            className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Plan</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOptimizeRoute}
          className="bg-[#0084d1] hover:bg-[#0070b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 fill-white text-white" />
          <span>Optimize Route</span>
        </button>

        <button
          type="button"
          onClick={handleExportPdf}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Export PDF</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer shadow-2xs"
          title="Share Itinerary"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
