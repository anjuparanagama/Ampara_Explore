"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { MapPlaceCardProps } from "@/interface";

export default function MapPlaceCard({
  place,
  isSelected,
  isAdded,
  onSelect,
  onTogglePlan,
}: MapPlaceCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-2xl transition-all cursor-pointer flex gap-3 items-start ${
        isSelected
          ? "bg-sky-50/80 border border-sky-200 shadow-2xs ring-1 ring-sky-300"
          : "hover:bg-slate-50 border border-transparent"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-extrabold uppercase text-[#0084d1] tracking-wider truncate">
            {place.ringTag}
          </span>
          <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold shrink-0">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{place.rating}</span>
          </div>
        </div>

        <h4 className="text-xs font-black text-slate-900 truncate">
          {place.name}
        </h4>

        <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
          {place.description}
        </p>

        <div className="pt-1 flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-medium">{place.roadInfo}</span>

          <button
            type="button"
            onClick={onTogglePlan}
            className={`font-bold hover:underline cursor-pointer ${
              isAdded ? "text-emerald-600" : "text-[#0084d1]"
            }`}
          >
            {isAdded ? "✓ Added" : "+ Add to Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
