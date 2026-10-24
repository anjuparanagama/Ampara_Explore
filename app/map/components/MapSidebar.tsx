"use client";

import React from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { MapSidebarProps } from "@/interface";
import MapPlaceCard from "./MapPlaceCard";

export default function MapSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedZone,
  setSelectedZone,
  filteredPlaces,
  selectedPlace,
  onSelectPlace,
  visitPlan,
  onTogglePlan,
}: MapSidebarProps) {
  return (
    <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] flex flex-col justify-between overflow-hidden">
      <div className="p-4 sm:p-5 space-y-4">
        {/* Panel Title & Count */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900 tracking-tight">
                Explore Places
              </h1>
              <span className="bg-sky-100 text-[#0084d1] text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                24 SITES
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              25 km radial radius in one view
            </p>
          </div>

          <button
            type="button"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors cursor-pointer"
            title="Filter Options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lake, stupa, ruins..."
            className="w-full bg-[#f8fafc] text-xs font-medium text-slate-800 placeholder-slate-400 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0084d1] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: "All", label: "All (24)" },
            { id: "Nature", label: "Nature (9)" },
            { id: "Wildlife", label: "Wildlife (6)" },
            { id: "Sacred", label: "Sacred (7)" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0084d1] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Radial Distance Controls */}
        <div className="pt-2 border-t border-slate-150 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-extrabold uppercase tracking-wider text-slate-400">
              RADIAL ZONE DISTANCE
            </span>
            <span className="text-[#0084d1] font-bold">Show 25 km Radar</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { km: 5, label: "Within 5 km" },
              { km: 15, label: "Within 15 km" },
              { km: 25, label: "Full 25 km" },
            ].map((z) => (
              <button
                key={z.km}
                type="button"
                onClick={() => setSelectedZone(z.km)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                  selectedZone === z.km
                    ? "bg-[#0084d1] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Destinations List */}
      <div className="flex-1 overflow-y-auto max-h-[460px] p-3 sm:p-4 space-y-2.5 divide-y divide-slate-100">
        {filteredPlaces.map((place) => {
          const isSelected = selectedPlace?.id === place.id;
          const isAdded = visitPlan.some((p) => p.id === place.id);

          return (
            <MapPlaceCard
              key={place.id}
              place={place}
              isSelected={isSelected}
              isAdded={isAdded}
              onSelect={() => onSelectPlace(place)}
              onTogglePlan={(e) => {
                e.stopPropagation();
                onTogglePlan(place);
              }}
            />
          );
        })}
      </div>

      {/* Bottom Sticky Queue & Planner Link */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
        <div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            PLANNER PRESET
          </div>
          <div className="text-xs font-black text-slate-900">
            {visitPlan.length} Destinations Queued
          </div>
        </div>

        <Link
          href="/plan"
          className="bg-[#006699] hover:bg-[#0084d1] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <span>Open Planner</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
