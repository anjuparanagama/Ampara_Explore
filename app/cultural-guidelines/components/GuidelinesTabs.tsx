"use client";

import React from "react";
import { GuidelinesTabsProps } from "@/interface";

const tabs = [
  { id: "all", label: "All Guidelines" },
  { id: "temples", label: "🛕 Ancient Stupas & Monasteries" },
  { id: "wildlife", label: "🐘 Wild Elephant & Safari Protocol" },
  { id: "eco", label: "🌿 Eco & Reservoir Protection" },
] as const;

export default function GuidelinesTabs({
  activeTab,
  setActiveTab,
}: GuidelinesTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-[#0084d1] text-white shadow-xs"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
