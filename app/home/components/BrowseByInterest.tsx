"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Droplets,
  Landmark,
  Compass,
  Mountain,
  Utensils,
  Camera,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { BrowseByInterestProps, CategoryItem } from "@/interface/home.types";

interface CategoryStyles {
  accentGradient: string;
  glowColor: string;
  lightBg: string;
  badgeBg: string;
  hoverBorder: string;
  bracketColor: string;
}

type CategoryIcon =
  | { type: "image"; src: string }
  | {
      type: "lucide";
      icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
      }>;
    };

export default function BrowseByInterest({
  attractions,
  categories: propCategories,
  selectedCategory,
  onSelectCategory,
}: BrowseByInterestProps) {
  const { t } = useLanguage();
  const [fetchedCategories, setFetchedCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    if (propCategories && propCategories.length > 0) return;
    let isMounted = true;
    void fetch("/api/categories", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data?.categories && Array.isArray(data.categories)) {
          setFetchedCategories(data.categories);
        }
      })
      .catch((err) => console.error("Failed to load categories in BrowseByInterest:", err));

    return () => {
      isMounted = false;
    };
  }, [propCategories]);

  const activeCategoriesList =
    propCategories && propCategories.length > 0
      ? propCategories
      : fetchedCategories;

  const displayCategories = useMemo(() => {
    if (!activeCategoriesList || activeCategoriesList.length === 0) {
      return [];
    }

    const priorityOrder = [
      "nature",
      "religious and historical",
      "beaches",
      "wildlife",
    ];

    return [...activeCategoriesList].sort((a, b) => {
      const aName = a.name.toLowerCase().trim();
      const bName = b.name.toLowerCase().trim();
      const aIdx = priorityOrder.indexOf(aName);
      const bIdx = priorityOrder.indexOf(bName);

      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;

      const aCount = Number(a.attraction_count || 0);
      const bCount = Number(b.attraction_count || 0);
      if (aCount !== bCount) return bCount - aCount;
      return a.name.localeCompare(b.name);
    });
  }, [activeCategoriesList]);

  const getCategoryCount = (title: string, dbCount?: number) => {
    const titleLower = title.toLowerCase().trim();
    if (
      titleLower === "religious and historical" ||
      titleLower === "religious & historical"
    ) {
      const count = attractions.filter((a) => {
        const cat =
          typeof a.category === "string" ? a.category.toLowerCase().trim() : "";
        return (
          cat === "religious" ||
          cat === "historical" ||
          cat === "religious and historical" ||
          cat === "religious & historical"
        );
      }).length;
      return count > 0 || attractions.length > 0 ? count : (dbCount ?? 0);
    }

    const count = attractions.filter(
      (a) =>
        typeof a.category === "string" &&
        a.category.toLowerCase().trim() === titleLower,
    ).length;

    if (count > 0 || attractions.length > 0) return count;
    return typeof dbCount === "number" ? dbCount : 0;
  };

  const getCategoryTranslation = (title: string) => {
    const keyMap: Record<string, string> = {
      Nature: "catNature",
      "Religious and Historical": "catReligiousHistorical",
      Beaches: "catBeaches",
      Wildlife: "catWildlife",
      Historical: "catHistorical",
      Religious: "catReligious",
      Waterfalls: "catWaterfalls",
      Cultural: "catCultural",
    };
    return keyMap[title] ? t(keyMap[title]) : title;
  };

  const getCategoryDescription = (catTitle: string, defaultDesc?: string | null) => {
    const descKeyMap: Record<string, string> = {
      Nature: "catNatureDesc",
      "Religious and Historical": "catReligiousHistoricalDesc",
      Beaches: "catBeachesDesc",
      Wildlife: "catWildlifeDesc",
      Waterfalls: "catWaterfallsDesc",
      Cultural: "catCulturalDesc",
      Historical: "catHistoricalDesc",
      Religious: "catReligiousDesc",
    };
    const key = descKeyMap[catTitle];
    if (key) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    if (defaultDesc && defaultDesc.trim().length > 0) {
      return defaultDesc;
    }
    return `Explore memorable ${catTitle.toLowerCase()} attractions and destinations in Ampara.`;
  };

  const getCategoryIcon = (idOrTitle: string): CategoryIcon => {
    const val = idOrTitle.toLowerCase().trim();
    if (val === "nature") return { type: "image", src: "/Nature.png" };
    if (
      val.includes("religious") ||
      val.includes("historical") ||
      val.includes("sacred")
    ) {
      return { type: "image", src: "/religious.png" };
    }
    if (val.includes("beach") || val.includes("coast") || val.includes("surf")) {
      return { type: "image", src: "/beach.png" };
    }
    if (
      val.includes("wildlife") ||
      val.includes("safari") ||
      val.includes("animal")
    ) {
      return { type: "image", src: "/wildlife.png" };
    }
    if (
      val.includes("waterfall") ||
      val.includes("falls") ||
      val.includes("river") ||
      val.includes("lake")
    ) {
      return { type: "lucide", icon: Droplets };
    }
    if (
      val.includes("culture") ||
      val.includes("cultural") ||
      val.includes("heritage") ||
      val.includes("art")
    ) {
      return { type: "lucide", icon: Landmark };
    }
    if (
      val.includes("hike") ||
      val.includes("hiking") ||
      val.includes("mountain") ||
      val.includes("adventure") ||
      val.includes("trail")
    ) {
      return { type: "lucide", icon: Mountain };
    }
    if (
      val.includes("food") ||
      val.includes("restaurant") ||
      val.includes("culinary") ||
      val.includes("dining")
    ) {
      return { type: "lucide", icon: Utensils };
    }
    if (
      val.includes("photo") ||
      val.includes("view") ||
      val.includes("sunset")
    ) {
      return { type: "lucide", icon: Camera };
    }
    return { type: "lucide", icon: Sparkles };
  };

  const getCategoryStyles = (idOrTitle: string): CategoryStyles => {
    const val = idOrTitle.toLowerCase().trim();
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
    if (val.includes("religious") || val.includes("historical") || val.includes("sacred")) {
      return {
        accentGradient: "from-amber-400 via-yellow-400 to-amber-600",
        glowColor: "#f59e0b",
        lightBg: "#fef3c7",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200/80",
        hoverBorder: "hover:border-amber-300 hover:ring-2 hover:ring-amber-100",
        bracketColor: "#f59e0b",
      };
    }
    if (val.includes("beach") || val.includes("coast") || val.includes("surf")) {
      return {
        accentGradient: "from-sky-400 via-cyan-400 to-blue-500",
        glowColor: "#06b6d4",
        lightBg: "#e0f2fe",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200/80",
        hoverBorder: "hover:border-sky-300 hover:ring-2 hover:ring-sky-100",
        bracketColor: "#06b6d4",
      };
    }
    if (val.includes("wildlife") || val.includes("safari") || val.includes("animal")) {
      return {
        accentGradient: "from-emerald-500 via-green-400 to-teal-600",
        glowColor: "#059669",
        lightBg: "#dcfce7",
        badgeBg: "bg-green-50 text-green-700 border-green-200/80",
        hoverBorder: "hover:border-green-300 hover:ring-2 hover:ring-green-100",
        bracketColor: "#059669",
      };
    }
    if (val.includes("waterfall") || val.includes("falls") || val.includes("river") || val.includes("lake")) {
      return {
        accentGradient: "from-blue-400 via-indigo-400 to-cyan-500",
        glowColor: "#2563eb",
        lightBg: "#eff6ff",
        badgeBg: "bg-blue-50 text-blue-700 border-blue-200/80",
        hoverBorder: "hover:border-blue-300 hover:ring-2 hover:ring-blue-100",
        bracketColor: "#2563eb",
      };
    }
    if (val.includes("culture") || val.includes("cultural") || val.includes("heritage")) {
      return {
        accentGradient: "from-purple-400 via-fuchsia-400 to-indigo-500",
        glowColor: "#9333ea",
        lightBg: "#faf5ff",
        badgeBg: "bg-purple-50 text-purple-700 border-purple-200/80",
        hoverBorder: "hover:border-purple-300 hover:ring-2 hover:ring-purple-100",
        bracketColor: "#9333ea",
      };
    }
    if (val.includes("hike") || val.includes("hiking") || val.includes("adventure") || val.includes("mountain")) {
      return {
        accentGradient: "from-orange-400 via-rose-400 to-red-500",
        glowColor: "#ea580c",
        lightBg: "#fff7ed",
        badgeBg: "bg-orange-50 text-orange-700 border-orange-200/80",
        hoverBorder: "hover:border-orange-300 hover:ring-2 hover:ring-orange-100",
        bracketColor: "#ea580c",
      };
    }

    // Dynamic fallback palette for any new custom categories added in admin
    const palettes: CategoryStyles[] = [
      {
        accentGradient: "from-teal-400 via-emerald-400 to-cyan-500",
        glowColor: "#0d9488",
        lightBg: "#f0fdfa",
        badgeBg: "bg-teal-50 text-teal-700 border-teal-200/80",
        hoverBorder: "hover:border-teal-300 hover:ring-2 hover:ring-teal-100",
        bracketColor: "#0d9488",
      },
      {
        accentGradient: "from-rose-400 via-pink-400 to-red-500",
        glowColor: "#e11d48",
        lightBg: "#fff1f2",
        badgeBg: "bg-rose-50 text-rose-700 border-rose-200/80",
        hoverBorder: "hover:border-rose-300 hover:ring-2 hover:ring-rose-100",
        bracketColor: "#e11d48",
      },
      {
        accentGradient: "from-violet-400 via-purple-400 to-indigo-500",
        glowColor: "#7c3aed",
        lightBg: "#f5f3ff",
        badgeBg: "bg-violet-50 text-violet-700 border-violet-200/80",
        hoverBorder: "hover:border-violet-300 hover:ring-2 hover:ring-violet-100",
        bracketColor: "#7c3aed",
      },
      {
        accentGradient: "from-sky-400 via-blue-400 to-indigo-500",
        glowColor: "#0284c7",
        lightBg: "#e0f2fe",
        badgeBg: "bg-sky-50 text-sky-700 border-sky-200/80",
        hoverBorder: "hover:border-sky-300 hover:ring-2 hover:ring-sky-100",
        bracketColor: "#0284c7",
      },
    ];

    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash = (hash + val.charCodeAt(i)) % palettes.length;
    }
    return palettes[hash];
  };

  const selectedCategoryIcon = selectedCategory ? getCategoryIcon(selectedCategory) : null;

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

      {/* Dynamic Category Feature Cards (2 cols on mobile, 3 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
        {displayCategories.map((cat) => {
          const isSelected =
            selectedCategory?.toLowerCase().trim() === cat.name.toLowerCase().trim();
          const translatedTitle = getCategoryTranslation(cat.name);
          const translatedDesc = getCategoryDescription(cat.name, cat.description);
          const placeCount = getCategoryCount(cat.name, cat.attraction_count);
          const iconInfo = getCategoryIcon(cat.name);
          const styles = getCategoryStyles(cat.name);

          return (
            <button
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(isSelected ? null : cat.name)}
              className={`group relative flex flex-col justify-between text-left p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/80 border transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? "border-[#0284c7] ring-2 ring-sky-300 shadow-xl scale-[1.02] bg-gradient-to-b from-sky-50/60 via-white to-white"
                  : `border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${styles.hoverBorder}`
              }`}
            >
              {/* Top Accent Gradient Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${styles.accentGradient} transition-all duration-300 ${
                  isSelected
                    ? "h-2 opacity-100"
                    : "opacity-80 group-hover:opacity-100 group-hover:h-2"
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
              <div className="relative z-10 flex items-start justify-between w-full mb-3 sm:mb-4">
                <div
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs border border-white/90 ring-1 ring-slate-100 p-1.5 sm:p-2.5"
                  style={{ backgroundColor: styles.lightBg }}
                >
                  {iconInfo.type === "image" ? (
                    <Image
                      src={iconInfo.src}
                      alt={translatedTitle}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain drop-shadow-xs"
                    />
                  ) : (
                    <iconInfo.icon
                      className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:scale-110"
                      style={{ color: styles.glowColor }}
                    />
                  )}
                </div>

                {/* Count Pill with Category Accent Dot */}
                <div
                  className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                      : `${styles.badgeBg} group-hover:shadow-xs`
                  }`}
                >
                  <span
                    className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${
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
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-lg mb-1 sm:mb-1.5 group-hover:text-[#0284c7] transition-colors flex items-center gap-1.5 leading-snug">
                  <span>{translatedTitle}</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
                  {translatedDesc}
                </p>
              </div>

              {/* Bottom Subtle Interactive Indicator */}
              <div className="relative z-10 mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-semibold">
                <span
                  className={
                    isSelected
                      ? "text-[#0284c7] font-bold"
                      : "text-slate-400 group-hover:text-[#0284c7] transition-colors"
                  }
                >
                  {isSelected ? "Active" : "Explore"}{" "}
                  <span className="hidden sm:inline">
                    {isSelected ? "Filter" : "Category"}
                  </span>
                </span>

                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[#0284c7] text-white scale-110 shadow-xs"
                      : "bg-slate-100 text-slate-500 group-hover:bg-[#0284c7] group-hover:text-white group-hover:translate-x-1"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-bold">→</span>
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
              {selectedCategoryIcon ? (
                selectedCategoryIcon.type === "image" ? (
                  <Image
                    src={selectedCategoryIcon.src}
                    alt={selectedCategory}
                    width={20}
                    height={20}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <selectedCategoryIcon.icon
                    className="w-4 h-4 text-[#0284c7]"
                  />
                )
              ) : (
                <Compass className="w-4 h-4 text-[#0284c7]" />
              )}
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
