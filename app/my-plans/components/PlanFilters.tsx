"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { FilterTabType } from "@/interface/myPlans.types";

interface Counts {
  all: number;
  inProgress: number;
  upcoming: number;
  draft: number;
  completed: number;
  bookmarked: number;
}

interface PlanFiltersProps {
  activeFilter: FilterTabType;
  setActiveFilter: (filter: FilterTabType) => void;
  counts: Counts;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function PlanFilters({
  activeFilter,
  setActiveFilter,
  counts,
  searchQuery,
  setSearchQuery,
}: PlanFiltersProps) {
  const tabs: { id: FilterTabType; label: string; count: number }[] = [
    { id: "all", label: "All Plans", count: counts.all },
    ...(counts.inProgress > 0
      ? [
          {
            id: "in-progress" as FilterTabType,
            label: "In Progress",
            count: counts.inProgress,
          },
        ]
      : []),
    { id: "upcoming", label: "Upcoming", count: counts.upcoming },
    { id: "draft", label: "Drafts", count: counts.draft },
    { id: "completed", label: "Completed", count: counts.completed },
    { id: "bookmarked", label: "Bookmarked", count: counts.bookmarked },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {tabs.map((tab) => {
          const active = activeFilter === tab.id;
          const isPulse = tab.id === "in-progress";

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? isPulse
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {isPulse && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search box */}
      <div className="relative w-full md:w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search plans or stops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
