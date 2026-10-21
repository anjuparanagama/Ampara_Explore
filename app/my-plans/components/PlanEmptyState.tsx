"use client";

import React from "react";
import Link from "next/link";
import { Compass, Plus } from "lucide-react";
import { FilterTabType } from "@/interface/myPlans.types";

interface PlanEmptyStateProps {
  searchQuery: string;
  activeFilter: FilterTabType;
  onClearSearch: () => void;
}

export default function PlanEmptyState({
  searchQuery,
  activeFilter,
  onClearSearch,
}: PlanEmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
        <Compass className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">
          {searchQuery
            ? "No matching plans found"
            : activeFilter === "bookmarked"
              ? "No bookmarked itineraries"
              : "No itineraries in this category"}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {searchQuery
            ? "Try searching for a different destination or clear your search query."
            : "Start planning your Ampara excursion with curated stops, routes, and timings."}
        </p>
      </div>
      {searchQuery ? (
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
        >
          Clear Search
        </button>
      ) : (
        <Link
          href="/plan"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create an Itinerary</span>
        </Link>
      )}
    </div>
  );
}
