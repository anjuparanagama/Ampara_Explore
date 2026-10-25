"use client";

import React, { useState } from "react";
import { GuidelinesTab, defaultDosAndDonts } from "@/interface";
import {
  GuidelinesHeader,
  GuidelinesBreadcrumbs,
  GuidelinesHero,
  GuidelinesQuickHighlights,
  GuidelinesTabs,
  GuidelinesCategoryCard,
  GuidelinesAssistanceBox,
} from "./components";

export default function CulturalGuidelinesPage() {
  const [activeTab, setActiveTab] = useState<GuidelinesTab>("all");

  const filteredCategories =
    activeTab === "all"
      ? defaultDosAndDonts
      : defaultDosAndDonts.filter((d) => d.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* 2. Main Body Container */}
      <main className="flex-1 max-w-360 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <GuidelinesBreadcrumbs />

        {/* Hero Banner Card */}
        <GuidelinesHero />

        {/* Quick Icon Highlights Bar */}
        <GuidelinesQuickHighlights />

        {/* Filter Navigation Tabs */}
        <GuidelinesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Do's and Don'ts Visual Grid */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => (
            <GuidelinesCategoryCard key={cat.category} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
}
