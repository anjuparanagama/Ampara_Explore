"use client";

import React from "react";
import { interestCategories, amparaAttractions } from "@/data/amparaData";
import { useLanguage } from "@/context/LanguageContext";
import {
  Church,
  Droplets,
  Landmark,
  PawPrint,
  Theater,
  TreePine,
  WavesHorizontal,
} from "lucide-react";

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
      (a) => a.category.toLowerCase() === title.toLowerCase(),
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

  const renderCategoryIcon = (id: string, color: string) => {
    const iconProps = {
      className: "w-6 h-6",
      color,
      strokeWidth: 2,
    };

    switch (id) {
      case "nature":
        return <TreePine {...iconProps} />;
      case "historical":
        return <Landmark {...iconProps} />;
      case "religious":
        return <Church {...iconProps} />;
      case "beaches":
        return <WavesHorizontal {...iconProps} />;
      case "waterfalls":
        return <Droplets {...iconProps} />;
      case "wildlife":
        return <PawPrint {...iconProps} />;
      case "cultural":
        return <Theater {...iconProps} />;
      default:
        return null;
    }
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

      {/* 7 Horizontal Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
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
