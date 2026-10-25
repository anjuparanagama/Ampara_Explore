"use client";

import React from "react";
import Image from "next/image";
import { X, MapPin, Clock, Plus, Check, ExternalLink } from "lucide-react";
import type { AttractionModalProps } from "@/interface/home.types";

export default function AttractionModal({
  attraction,
  onClose,
  isAdded,
  onTogglePlan,
}: AttractionModalProps) {
  if (!attraction) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-48 sm:h-64 md:h-72 w-full bg-slate-100 shrink-0">
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#0284c7] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {attraction.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {attraction.distanceKm} km from Ampara Town
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
              {attraction.name}
            </h2>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 overflow-y-auto flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-150">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <MapPin className="w-4 h-4 text-[#0284c7] shrink-0" />
              <span>{attraction.location}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{attraction.duration}</span>
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              About this destination
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {attraction.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Key Highlights & Experiences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attraction.highlights.map((h, i) => (
                <div key={i} className="bg-sky-50/70 border border-sky-100 rounded-xl p-2.5 text-xs font-semibold text-sky-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7] shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3.5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
            <a
              href={`/attraction/${attraction.id}`}
              className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-bold text-[#0084d1] hover:text-[#006699] hover:underline transition-colors py-1 order-2 sm:order-1"
            >
              <span>View Full Destination Guide</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-slate-600 hover:text-slate-900 font-semibold text-xs sm:text-sm hover:bg-slate-100 border border-slate-200 sm:border-transparent transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              <button
                onClick={() => onTogglePlan(attraction)}
                className={`flex-[2] sm:flex-none px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg ${
                  isAdded
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#006699] hover:bg-[#0284c7] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Saved in Visit Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 shrink-0" />
                    <span>Add to Visit Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
