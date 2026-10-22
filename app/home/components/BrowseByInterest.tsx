"use client";

import React from "react";
import Image from "next/image";
import { interestCategories } from "@/data/amparaData";
import { useLanguage } from "@/context/LanguageContext";
import type { BrowseByInterestProps } from "@/interface/home.types";

export default function BrowseByInterest({
  attractions,
  selectedCategory,
  onSelectCategory,
}: BrowseByInterestProps) {
  const { t } = useLanguage();

  const getCategoryCount = (title: string) => {
    const titleLower = title.toLowerCase().trim();
    if (
      titleLower === "religious and historical" ||
      titleLower === "religious & historical"
    ) {
      return attractions.filter((a) => {
        const cat = typeof a.category === "string" ? a.category.toLowerCase().trim() : "";
        return (
          cat === "religious" ||
          cat === "historical" ||
          cat === "religious and historical" ||
          cat === "religious & historical"
        );
      }).length;
    }
    return attractions.filter(
      (a) =>
        typeof a.category === "string" &&
        a.category.toLowerCase().trim() === titleLower,
    ).length;
  };

  const getCategoryTranslation = (title: string) => {
    const keyMap: Record<string, string> = {
      Nature: "catNature",
      "Religious and Historical": "catReligiousHistorical",
      Beaches: "catBeaches",
      Wildlife: "catWildlife",
      Historical: "catHistorical",
      Religious: "catReligious",
    };
    return keyMap[title] ? t(keyMap[title]) : title;
  };

  const getCategoryDescription = (catTitle: string, defaultDesc?: string) => {
    const descKeyMap: Record<string, string> = {
      Nature: "catNatureDesc",
      "Religious and Historical": "catReligiousHistoricalDesc",
      Beaches: "catBeachesDesc",
      Wildlife: "catWildlifeDesc",
    };
    const key = descKeyMap[catTitle];
    if (key) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    return defaultDesc || "";
  };

  const getCategoryIconSrc = (idOrTitle: string) => {
    const val = idOrTitle.toLowerCase();
    if (val === "nature") return "/Nature.png";
    if (val.includes("religious") || val.includes("historical")) return "/religious.png";
    if (val.includes("beach")) return "/beach.png";
    if (val.includes("wildlife")) return "/wildlife.png";
    return "/Nature.png";
  };

  const getCategoryStyles = (idOrTitle: string) => {
    const val = idOrTitle.toLowerCase();
    if (val === "nature") {
      return {
        accentGradient: "from-emerald-400 via-teal-400 to-emerald-500",
        glowColor: "#10b981",
        lightBg: "#ecfdf5",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
        hoverBorder: "hover:border-emerald-300 hover:ring-2 hover:ring-emerald-100",
        bracketColor: "#10b981",
      };
    }
    if (val.includes("religious") || val.includes("historical")) {
      return {
        accentGradient: "from-amber-400 via-yellow-400 to-amber-600",
        glowColor: "#f59e0b",
        lightBg: "#fef3c7",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200/80",
        hoverBorder: "hover:border-amber-300 hover:ring-2 hover:ring-amber-100",
        bracketColor: "#f59e0b",
      };
    }
    if (val.includes("beach")) {
      return {
        accentGradient: "from-sky-400 via-cyan-400 to-blue-500",
        glowColor: "#06b6d4",
        lightBg: "#e0f2fe",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200/80",
        hoverBorder: "hover:border-sky-300 hover:ring-2 hover:ring-sky-100",
        bracketColor: "#06b6d4",
      };
    }
    if (val.includes("wildlife")) {
      return {
        accentGradient: "from-emerald-500 via-green-400 to-teal-600",
        glowColor: "#059669",
        lightBg: "#dcfce7",
        badgeBg: "bg-green-50 text-green-700 border-green-200/80",
        hoverBorder: "hover:border-green-300 hover:ring-2 hover:ring-green-100",
        bracketColor: "#059669",
      };
    }
    return {
      accentGradient: "from-sky-400 via-blue-400 to-indigo-500",
      glowColor: "#0284c7",
      lightBg: "#e0f2fe",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200/80",
      hoverBorder: "hover:border-sky-300 hover:ring-2 hover:ring-sky-100",
      bracketColor: "#0284c7",
    };
  };

  return (
    <section
      id="explore"
      className="w-full max-w-[1440px] mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Header with Title and Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#0084d1] uppercase block mb-1.5">
            TAILORED NAVIGATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("browseInterestTitle")}
          </h2>
        </div>
        <p className="text-sm text-slate-600 max-w-md md:text-right leading-relaxed">
          {t("browseInterestSubtitle")}
        </p>
      </div>

      {/* 4 Category Feature Cards with Artistic Corner Designs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {interestCategories.map((cat) => {
          const isSelected = selectedCategory === cat.title;
          const translatedTitle = getCategoryTranslation(cat.title);
          const translatedDesc = getCategoryDescription(cat.title, cat.description);
          const placeCount = getCategoryCount(cat.title);
          const iconSrc = getCategoryIconSrc(cat.id);
          const styles = getCategoryStyles(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.title)}
              className={`group relative flex flex-col justify-between text-left p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/80 border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? "border-[#0284c7] ring-2 ring-sky-300 shadow-xl scale-[1.02] bg-gradient-to-b from-sky-50/60 via-white to-white"
                  : `border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${styles.hoverBorder}`
              }`}
            >
              {/* Top Accent Gradient Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${styles.accentGradient} transition-all duration-300 ${
                  isSelected ? "h-2 opacity-100" : "opacity-80 group-hover:opacity-100 group-hover:h-2"
                }`}
              />

              {/* Decorative Corner Element: Top-Right Radial Glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: styles.glowColor }}
              />

              {/* Decorative Corner Element: Top-Right Topographical / Radar Contour Rings */}
              <svg
                className="absolute top-0 right-0 w-28 h-28 pointer-events-none text-slate-200/80 group-hover:text-slate-300 transition-colors duration-500"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle
                  cx="95"
                  cy="5"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
                <circle
                  cx="95"
                  cy="5"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.45"
                />
                <circle
                  cx="95"
                  cy="5"
                  r="74"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  opacity="0.3"
                />
              </svg>

              {/* Decorative Corner Bracket: Top-Right */}
              <span
                className="absolute top-3.5 right-3.5 w-3 h-3 border-t-2 border-r-2 rounded-tr-md transition-opacity duration-300 opacity-25 group-hover:opacity-100 pointer-events-none"
                style={{ borderColor: styles.bracketColor }}
              />

              {/* Decorative Corner Bracket: Bottom-Left */}
              <span
                className="absolute bottom-3.5 left-3.5 w-3 h-3 border-b-2 border-l-2 rounded-bl-md transition-opacity duration-300 opacity-20 group-hover:opacity-80 pointer-events-none"
                style={{ borderColor: styles.bracketColor }}
              />

              {/* Top Row: Icon & Place Count Badge */}
              <div className="relative z-10 flex items-start justify-between w-full mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs border border-white/90 ring-1 ring-slate-100 p-2.5"
                  style={{ backgroundColor: styles.lightBg }}
                >
                  <Image
                    src={iconSrc}
                    alt={translatedTitle}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain drop-shadow-xs"
                  />
                </div>

                {/* Count Pill with Category Accent Dot */}
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                      : `${styles.badgeBg} group-hover:shadow-xs`
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-white animate-pulse" : ""
                    }`}
                    style={
                      isSelected ? {} : { backgroundColor: styles.glowColor }
                    }
                  />
                  <span>
                    {placeCount} {placeCount === 1 ? "place" : "places"}
                  </span>
                </div>
              </div>

              {/* Title and Short Description */}
              <div className="relative z-10 flex-1 flex flex-col justify-start mb-2">
                <h3 className="font-extrabold text-slate-900 text-lg mb-1.5 group-hover:text-[#0284c7] transition-colors flex items-center gap-1.5">
                  <span>{translatedTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {translatedDesc}
                </p>
              </div>

              {/* Bottom Subtle Interactive Indicator */}
              <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span
                  className={
                    isSelected
                      ? "text-[#0284c7] font-bold"
                      : "text-slate-400 group-hover:text-[#0284c7] transition-colors"
                  }
                >
                  {isSelected ? "Active Filter" : "Explore Category"}
                </span>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0284c7] text-white scale-110 shadow-xs"
                      : "bg-slate-100 text-slate-500 group-hover:bg-[#0284c7] group-hover:text-white group-hover:translate-x-1"
                  }`}
                >
                  <span className="text-xs font-bold">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Filter Clear indicator if a category is picked */}
      {selectedCategory && (
        <div className="mt-5 flex flex-wrap items-center justify-between bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-xs text-sky-800 font-medium animate-fadeIn gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-sky-200 flex items-center justify-center p-1 shadow-2xs">
              <Image
                src={getCategoryIconSrc(selectedCategory)}
                alt={selectedCategory}
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span>
              Filtering attractions by:{" "}
              <strong className="font-bold text-[#0284c7]">
                {getCategoryTranslation(selectedCategory)}
              </strong>
            </span>
            <span className="bg-white text-[#0284c7] font-bold px-2.5 py-0.5 rounded-full border border-sky-200 text-[11px] shadow-2xs">
              {getCategoryCount(selectedCategory)} destinations
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("destinations");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="text-[#0284c7] hover:text-[#0369a1] font-bold flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-sky-200 shadow-2xs hover:shadow-xs transition-all"
            >
              <span>View Destinations</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => onSelectCategory(null)}
              className="text-slate-600 hover:text-slate-900 font-bold underline cursor-pointer"
            >
              Show All Attractions
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
