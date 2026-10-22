"use client";

import React, { useState } from "react";
import {
  Search,
  Compass,
  MapPin,
  Target,
  ArrowRight,
  Star,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import HeroTimeLapseBg from "./HeroTimeLapseBg";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  selectedRadius: number;
  setSelectedRadius: (radius: number) => void;
  onExploreClick: () => void;
  onMapClick: () => void;
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  onSearch,
  selectedRadius,
  setSelectedRadius,
  onExploreClick,
  onMapClick,
}: HeroProps) {
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);
  const { t } = useLanguage();

  const popularTags = [
    "Senanayake Samudraya",
    "Deegawapi Stupa",
    "Gal Oya Safari",
    "Buddhangala",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    onSearch(tag);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-0 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Smooth Time-Lapse Hero Background synced with Current Local Time */}
      <HeroTimeLapseBg />

      {/* Main Content Container */}
      <div className="max-w-4xl w-full mx-auto text-center flex flex-1 flex-col items-center justify-center relative z-10">
        {/* Hero Title and Subtitle */}
        <div className="max-w-3xl px-4 py-3 sm:px-8 sm:py-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-3 sm:mb-4 drop-shadow-[0_3px_3px_rgba(15,23,42,0.9)]">
            {t("heroTitleDiscover")}
            <span className="text-[#0084d1] text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] drop-shadow-[0_2px_2px_rgba(15,23,42,0.9)]">
              {t("heroTitleCity")}
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_2px_rgba(15,23,42,0.95)]">
            {t("heroSubtitle")}
            <span className="block sm:inline font-bold text-white">
              {t("heroSubtitleSuffix")}
            </span>
          </p>
        </div>

        {/* Main Search Input Form */}
        <div className="w-full max-w-2xl mx-auto relative mb-3 sm:mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white backdrop-blur-md rounded-full p-1.5 pl-4 sm:pl-5 shadow-xl shadow-slate-900/10 border border-slate-200/90 flex items-center gap-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-sky-200 focus-within:border-sky-400"
          >
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 font-medium text-xs sm:text-sm focus:outline-none px-1"
            />

            {/* Radius Badge / Toggle Selector */}
            <div className="relative">
              {/* Radius Dropdown */}
              {showRadiusDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 min-w-[150px] text-left animate-fadeIn">
                  <div className="text-[11px] font-bold text-slate-400 uppercase px-3 py-1">
                    Select Radius
                  </div>
                  {[5, 15, 25].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => {
                        setSelectedRadius(km);
                        setShowRadiusDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        selectedRadius === km
                          ? "bg-sky-50 text-[#0284c7]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>
                        {t("withinRadius")} {km} km
                      </span>
                      {selectedRadius === km && (
                        <span className="text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="shrink-0 bg-[#006699] hover:bg-[#0284c7] text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t("searchButton")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Popular Tags */}
        {/*         <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs mb-4 sm:mb-5">
          <span className="font-bold text-slate-700">{t("popularLabel")}</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="bg-white/80 hover:bg-white text-slate-800 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs backdrop-blur-xs transition-all hover:scale-105 hover:border-sky-300 hover:text-[#0284c7] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div> */}

        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-[#006699] hover:bg-[#0275a8] text-white px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-950/20 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>{t("ctaExplore")}</span>
            <Compass className="w-4 h-4" />
          </button>

          <button
            onClick={onMapClick}
            className="w-full sm:w-auto bg-white/85 hover:bg-white text-slate-800 hover:text-[#006699] border border-slate-200/90 backdrop-blur-md px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <MapPin className="w-4 h-4 text-[#0284c7]" />
            <span>{t("ctaMap")}</span>
          </button>
        </div>
      </div>

      {/* 4 Bottom Key Metrics Stat Cards */}
      <div className="max-w-5xl mx-auto w-full mt-4 sm:mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* Card 1: 40+ Attractions */}
          <div className="bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-0.5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat1Number")}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
              {t("stat1Label")}
            </div>
          </div>

          {/* Card 2: 25 km Radius */}
          <div className="bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-0.5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat2Number")}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
              {t("stat2Label")}
            </div>
          </div>

          {/* Card 3: 1-Day Plans */}
          <div className="bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-0.5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              {t("stat3Number")}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
              {t("stat3Label")}
            </div>
          </div>

          {/* Card 4: 4.9 Satisfaction */}
          <div className="bg-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 text-center border border-slate-200/80 shadow-md hover:shadow-lg transition-all group hover:-translate-y-0.5">
            <div className="flex items-center justify-center gap-1 text-xl sm:text-2xl lg:text-3xl font-black text-[#006699] tracking-tight group-hover:scale-105 transition-transform">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline-block" />
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
              {t("stat4Label")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
