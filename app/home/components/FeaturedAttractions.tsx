"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ExternalLink,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { FeaturedAttractionsProps } from "@/interface/home.types";

export default function FeaturedAttractions({
  attractions,
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
  const filteredAttractions = attractions.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) =>
        h.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory = (() => {
      if (!selectedCategory) return true;
      const sel = selectedCategory.toLowerCase().trim();
      const cat = (item.category || "").toLowerCase().trim();
      if (
        sel === "religious and historical" ||
        sel === "religious & historical"
      ) {
        return (
          cat === "religious" ||
          cat === "historical" ||
          cat === "religious and historical" ||
          cat === "religious & historical"
        );
      }
      return cat === sel;
    })();

    // When browsing by category, ensure full 25km radius is covered so attractions aren't clipped
    const matchesRadius = selectedCategory
      ? item.distanceKm <= Math.max(selectedRadius, 25)
      : item.distanceKm <= selectedRadius;

    return matchesSearch && matchesCategory && matchesRadius;
  });

  return (
    <section
      id="destinations"
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Section Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200/80 gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            <span>{t("destinationsTitle")}</span>
            <span className="ml-2 inline-flex items-center align-middle bg-sky-100 text-[#0284c7] text-xs font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
              {filteredAttractions.length} Found
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t("destinationsSubtitle")}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> 0-5 km Inner
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" /> 5-15 km Mid
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" /> 15-25 km Horizon
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
          <h4 className="text-lg font-bold text-slate-800">
            No destinations match your criteria
          </h4>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try expanding your search radius or clearing category filters to
            discover more hidden gems.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAttractions.map((attraction) => {
            return (
              <div
                key={attraction.id}
                className="group relative h-[380px] overflow-hidden rounded-[1.35rem] border border-white/70 bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl focus-within:-translate-y-1.5 focus-within:shadow-2xl"
              >
                {/* Image Container */}
                <div
                  onClick={() => onSelectAttraction(attraction)}
                  className="absolute inset-0 cursor-pointer bg-slate-100"
                  title={`Quick preview ${attraction.name}`}
                >
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 transition-colors duration-300 group-hover:from-black/95 group-hover:via-black/60" />

                  {/* Radial Zone & Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-slate-800 shadow-xs backdrop-blur-md">
                      {attraction.category}
                    </span>
                    <span className="rounded-full bg-[#0284c7]/90 px-2 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-md">
                      {attraction.distanceKm} km
                    </span>
                  </div>
                </div>

                {/* Card details reveal inside the image on hover/focus. */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white transition-transform duration-300 group-hover:-translate-y-0 group-focus-within:-translate-y-0">
                  <div className="pointer-events-none transition-transform duration-300 group-hover:-translate-y-1 group-focus-within:-translate-y-1">
                    <span className="mb-1 flex items-center gap-1 text-[11px] font-medium text-sky-200">
                      <MapPin className="h-3 w-3" />
                      {attraction.location}
                    </span>
                    <Link
                      href={`/attraction/${attraction.id}`}
                      className="block line-clamp-2 text-lg font-extrabold leading-tight text-white transition-colors hover:text-sky-200 focus:text-sky-200"
                    >
                      {attraction.name}
                    </Link>
                  </div>

                  <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-44 group-hover:pt-3 group-hover:opacity-100 group-focus-within:max-h-44 group-focus-within:pt-3 group-focus-within:opacity-100">
                    <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-slate-200">
                      {attraction.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {attraction.highlights.slice(0, 2).map((hl, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-200">
                        <Clock className="h-3.5 w-3.5 text-sky-200" />
                        <span>{attraction.duration}</span>
                      </div>

                      <Link
                        href={`/attraction/${attraction.id}`}
                        className="rounded-full p-2 text-white transition-colors hover:bg-white/20 focus:bg-white/20"
                        title={t("viewDetails")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
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
