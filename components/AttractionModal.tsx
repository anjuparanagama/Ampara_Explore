"use client";

import React from "react";
import Image from "next/image";
import { Attraction } from "@/data/amparaData";
import { X, Star, MapPin, Clock, Plus, Check, ExternalLink } from "lucide-react";

interface AttractionModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  isAdded: boolean;
  onTogglePlan: (attraction: Attraction) => void;
}

export default function AttractionModal({
  attraction,
  onClose,
  isAdded,
  onTogglePlan,
}: AttractionModalProps) {
  if (!attraction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-100">
          <Image
            src={attraction.image}
            alt={attraction.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#0284c7] text-white text-xs font-bold px-3 py-1 rounded-full">
                {attraction.category}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
                {attraction.distanceKm} km from Ampara Town
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {attraction.name}
            </h2>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-150">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#0284c7]" />
              {attraction.location}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700 text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-slate-400" />
              {attraction.duration}
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-500 text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              {attraction.rating} ({attraction.reviewsCount} reviews)
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              About this destination
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {attraction.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
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
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <a
              href={`/attraction/${attraction.id}`}
              className="text-xs sm:text-sm font-bold text-[#0084d1] hover:underline flex items-center gap-1"
            >
              <span>View Full Destination Guide</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => onTogglePlan(attraction)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-[#006699] hover:bg-[#0284c7] text-white shadow-md hover:shadow-lg"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved in Visit Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
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

