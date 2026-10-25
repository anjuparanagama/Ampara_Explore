"use client";

import React from "react";
import Image from "next/image";
import { MapPlaceCardProps } from "@/interface";
import { useLanguage } from "@/context/LanguageContext";

export default function MapPlaceCard({
  place,
  isSelected,
  onSelect,
}: MapPlaceCardProps) {
  const { getCategoryName } = useLanguage();

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
            {place.category ? getCategoryName(place.category) : place.ringTag} •{" "}
            {place.distanceKm} km
          </span>
        </div>

        <h4 className="text-xs font-black text-slate-900 truncate">
          {place.name}
        </h4>

        <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
          {place.description}
        </p>
      </div>
    </div>
  );
}
