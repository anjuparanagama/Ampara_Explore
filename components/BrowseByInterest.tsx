"use client";

import React from "react";
import { interestCategories, amparaAttractions } from "@/data/amparaData";
import { useLanguage } from "@/context/LanguageContext";

interface BrowseByInterestProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function BrowseByInterest({
  selectedCategory,
  onSelectCategory,
}: BrowseByInterestProps) {
  const { t } = useLanguage();

  const getCategoryCount = (title: string) => {
    return amparaAttractions.filter(
      (a) => a.category.toLowerCase() === title.toLowerCase()
    ).length;
  };

  const getCategoryTranslation = (title: string) => {
    const keyMap: Record<string, string> = {
      Nature: "catNature",
      Historical: "catHistorical",
      Religious: "catReligious",
      Beaches: "catBeaches",
      Waterfalls: "catWaterfalls",
      Wildlife: "catWildlife",
      Cultural: "catCultural",
    };
    return keyMap[title] ? t(keyMap[title]) : title;
  };

  // Custom icon renderer matching the exact icons from the design
  const renderCategoryIcon = (id: string, color: string) => {
    switch (id) {
      case "nature":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Stylized tree icon */}
            <path d="M12 2L6 10h3l-4 7h6v5h2v-5h6l-4-7h3L12 2z" />
          </svg>
        );
      case "historical":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Ancient temple columns */}
            <path d="M3 21h18M3 7h18M4 7v14M8 7v14M12 7v14M16 7v14M20 7v14M12 3L2 7h20L12 3z" />
          </svg>
        );
      case "religious":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Pagoda / Stupa shrine */}
            <path d="M12 2v3M8 5h8M6 8h12M4 11h16M7 11v7M17 11v7M3 21h18M9 21v-3h6v3" />
          </svg>
        );
      case "beaches":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Ocean waves */}
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          </svg>
        );
      case "waterfalls":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Water droplet with ripple */}
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case "wildlife":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Paw print */}
            <circle cx="12" cy="15" r="4" />
            <circle cx="6" cy="9" r="2" />
            <circle cx="10" cy="5" r="2" />
            <circle cx="14" cy="5" r="2" />
            <circle cx="18" cy="9" r="2" />
          </svg>
        );
      case "cultural":
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Drama / cultural masks */}
            <circle cx="9" cy="11" r="7" />
            <path d="M6 10h.01M12 10h.01M7.5 14c.5.8 1.5 1.2 2.5 1s2-.5 2.5-1" />
            <path d="M15 8c2.5.5 4.5 2.5 5 5 .5 2.5-.5 5-2 6M17 11h.01M17 15c-.5.5-1 .8-1.8.8" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="explore" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
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

      {/* 7 Horizontal Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
        {interestCategories.map((cat) => {
          const isSelected = selectedCategory === cat.title;
          const translatedTitle = getCategoryTranslation(cat.title);
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.title)}
              className={`group flex flex-col items-center justify-center p-5 rounded-2xl bg-white border transition-all duration-300 cursor-pointer text-center ${
                isSelected
                  ? "border-[#0284c7] ring-2 ring-sky-200 shadow-lg scale-105 bg-sky-50/40"
                  : "border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Icon Circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: cat.bgLight }}
              >
                {renderCategoryIcon(cat.id, cat.color)}
              </div>

              {/* Title */}
              <span className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-[#0284c7] transition-colors">
                {translatedTitle}
              </span>

              {/* Place Count */}
              <span className="text-xs text-slate-500 font-medium">
                {getCategoryCount(cat.title)}{" "}
                {getCategoryCount(cat.title) === 1 ? "place" : "places"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Clear indicator if a category is picked */}
      {selectedCategory && (
        <div className="mt-4 flex flex-wrap items-center justify-between bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 text-xs text-sky-800 font-medium animate-fadeIn gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
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


