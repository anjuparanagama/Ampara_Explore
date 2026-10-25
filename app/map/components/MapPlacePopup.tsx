"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, Check, Car } from "lucide-react";
import { MapPlacePopupProps } from "@/interface";
import { useLanguage } from "@/context/LanguageContext";

export default function MapPlacePopup({ place, onClose }: MapPlacePopupProps) {
  const { t, getCategoryName } = useLanguage();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/90 animate-scaleUp">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Top Image Banner */}
      <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-slate-100">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          <span className="bg-sky-500/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
            {place.category
              ? getCategoryName(place.category)
              : t("sanctuaryWildlifeRing")}
          </span>
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>{place.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Title */}
      <div className="space-y-1.5">
        <h3 className="text-base font-black text-slate-900 leading-snug">
          {place.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {place.description}
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
            <Check className="w-3 h-3" />
            <span>{place.openHours}</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
            <Car className="w-3 h-3 text-[#0084d1]" />
            <span>{place.roadInfo}</span>
          </span>
        </div>

        {/* Actions Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/attraction/${place.id}`}
            className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-center text-xs font-bold text-slate-800 transition-colors"
          >
            {t("viewGuide")}
          </Link>
        </div>
      </div>
    </div>
  );
}
