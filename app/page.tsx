"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrowseByInterest from "@/components/BrowseByInterest";
import FeaturedAttractions from "@/components/FeaturedAttractions";
import RadialMapView from "@/components/RadialMapView";
import AttractionModal from "@/components/AttractionModal";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import { Attraction, amparaAttractions } from "@/data/amparaData";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(25);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [visitPlan, setVisitPlan] = useState<Attraction[]>([
    amparaAttractions[0], // Pre-loaded with Senanayake Samudraya
    amparaAttractions[3], // Buddhangala Monastery
  ]);

  const handleTogglePlan = (attraction: Attraction) => {
    if (visitPlan.some((item) => item.id === attraction.id)) {
      setVisitPlan(visitPlan.filter((item) => item.id !== attraction.id));
    } else {
      setVisitPlan([...visitPlan, attraction]);
    }
  };

  const handleRemoveFromPlan = (id: string) => {
    setVisitPlan(visitPlan.filter((item) => item.id !== id));
  };

  const handleClearPlan = () => {
    setVisitPlan([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const element = document.getElementById("explore");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchQuery("");
      setSelectedRadius(25);
      setTimeout(() => {
        const element = document.getElementById("destinations");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    } else {
      const element = document.getElementById("explore");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToExplore = () => {
    const element = document.getElementById("explore");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToMap = () => {
    const element = document.getElementById("map");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white">
      {/* Top Floating Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={visitPlan.length}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        selectedRadius={selectedRadius}
        setSelectedRadius={setSelectedRadius}
        onExploreClick={handleScrollToExplore}
        onMapClick={handleScrollToMap}
      />

      {/* Browse by Interest Navigation Section */}
      <BrowseByInterest
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Curated Featured Attractions Grid */}
      <FeaturedAttractions
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedRadius={selectedRadius}
        visitPlan={visitPlan}
        onTogglePlan={handleTogglePlan}
        onSelectAttraction={(attr) => setSelectedAttraction(attr)}
        onClearCategory={() => handleCategorySelect(null)}
      />

      {/* 25km Radial Horizon Radar & Map Visualization */}
      <RadialMapView
        onSelectAttraction={(attr) => setSelectedAttraction(attr)}
      />

      {/* Destination Quick-View Modal */}
      <AttractionModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        isAdded={
          selectedAttraction
            ? visitPlan.some((p) => p.id === selectedAttraction.id)
            : false
        }
        onTogglePlan={handleTogglePlan}
      />

      {/* 1-Day Visit Itinerary Plan Slide-over Drawer */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={visitPlan}
        onRemove={handleRemoveFromPlan}
        onClear={handleClearPlan}
      />

      {/* Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Page Footer */}
      <Footer />
    </main>
  );
}

