"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { amparaAttractions, Attraction } from "@/data/amparaData";
import { Star, MapPin, Clock, Plus, Check, ExternalLink, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FeaturedAttractionsProps {
  searchQuery: string;
  selectedCategory: string | null;
  selectedRadius: number;
  visitPlan: Attraction[];
  onTogglePlan: (attraction: Attraction) => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onClearCategory?: () => void;
}

export default function FeaturedAttractions({
  searchQuery,
  selectedCategory,
  selectedRadius,
  visitPlan,
  onTogglePlan,
  onSelectAttraction,
  onClearCategory,
}: FeaturedAttractionsProps) {
  const { t } = useLanguage();
  
  // Filter attractions based on search, category, and radius
  const filteredAttractions = amparaAttractions.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    // When browsing by category, ensure full 25km radius is covered so attractions aren't clipped
    const matchesRadius = selectedCategory
      ? item.distanceKm <= Math.max(selectedRadius, 25)
      : item.distanceKm <= selectedRadius;

    return matchesSearch && matchesCategory && matchesRadius;
  });

  return (
    <section id="destinations" className="scroll-mt-24 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200/80 gap-3">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t("destinationsTitle")}</span>
            <span className="bg-sky-100 text-[#0284c7] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {filteredAttractions.length} Found
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t("destinationsSubtitle")}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 0-5 km Inner
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> 5-15 km Mid
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> 15-25 km Horizon
          </span>
        </div>
      </div>

      {/* Active Category Filter Tag Banner */}
      {selectedCategory && (
        <div className="mb-6 flex flex-wrap items-center justify-between bg-sky-50/90 border border-sky-200/80 rounded-2xl px-5 py-3 text-xs gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            <span className="text-slate-700">
              Filtered by Category:{" "}
              <strong className="text-[#0284c7] font-bold text-sm">
                {selectedCategory}
              </strong>
            </span>
            <span className="bg-[#0284c7] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-1 shadow-2xs">
              {filteredAttractions.length} destinations
            </span>
          </div>
          {onClearCategory && (
            <button
              onClick={onClearCategory}
              className="text-[#0284c7] hover:text-[#0369a1] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Show All Attractions</span>
              <span>✕</span>
            </button>
          )}
        </div>
      )}

      {/* Grid of Attractions */}
      {filteredAttractions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800">No destinations match your criteria</h4>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try expanding your search radius or clearing category filters to discover more hidden gems.
          </p>
          {selectedCategory && onClearCategory && (
            <button
              onClick={onClearCategory}
              className="mt-4 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Show All Attractions
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAttractions.map((attraction) => {
            const isAdded = visitPlan.some((p) => p.id === attraction.id);

            return (
              <div
                key={attraction.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectAttraction(attraction)}
                  className="relative h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  title={`Quick preview ${attraction.name}`}
                >
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Radial Zone & Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                      {attraction.category}
                    </span>
                    <span className="bg-[#0284c7]/90 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-xs">
                      {attraction.distanceKm} km
                    </span>
                  </div>

                  {/* Rating Pill */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{attraction.rating}</span>
                  </div>

                  {/* Location Title Over Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] text-sky-200 flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3" />
                      {attraction.location}
                    </span>
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/attraction/${attraction.id}`}
                      className="font-bold text-slate-900 text-base leading-snug hover:text-[#0284c7] transition-colors mb-2 line-clamp-1 block"
                    >
                      {attraction.name}
                    </Link>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {attraction.description}
                    </p>

                    {/* Highlight Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {attraction.highlights.slice(0, 2).map((hl, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{attraction.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/attraction/${attraction.id}`}
                        className="text-xs font-bold text-slate-600 hover:text-[#0284c7] p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                        title={t("viewDetails")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => onTogglePlan(attraction)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isAdded
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                            : "bg-sky-50 text-[#0284c7] hover:bg-[#0284c7] hover:text-white border border-sky-200"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t("addedBtn")}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t("addBtn")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


