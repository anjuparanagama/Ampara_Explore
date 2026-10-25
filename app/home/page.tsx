"use client";

import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import BrowseByInterest from "./components/BrowseByInterest";
import FeaturedAttractions from "./components/FeaturedAttractions";
import AttractionModal from "./components/AttractionModal";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import type { Attraction } from "@/data/amparaData";
import type { CategoryItem } from "@/interface/home.types";
import { mapDatabaseAttraction } from "@/lib/attractions";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(25);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [visitPlan, setVisitPlan] = useState<Attraction[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/api/attractions", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load attractions.");
      const result = await response.json();
      setAttractions(
        Array.isArray(result.attractions)
          ? result.attractions.map((row: Record<string, unknown>) =>
              mapDatabaseAttraction(row),
            )
          : [],
      );
    };

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories", { cache: "no-store" });
        if (!response.ok) return;
        const result = await response.json();
        if (Array.isArray(result.categories)) {
          setCategories(result.categories);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    void loadData().catch((error) => console.error(error));
    void loadCategories();
    void fetch("/api/plans", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (!result?.plan?.stops) return;
        setVisitPlan(
          result.plan.stops.map((stop: Record<string, unknown>) => ({
            ...stop,
            category: String(
              stop.category_name || "Nature",
            ) as Attraction["category"],
            distanceKm: Number(stop.distance_km || 0),
            duration: String(stop.duration || ""),
            rating: 0,
            reviewsCount: 0,
            description: "",
            highlights: [],
            image: String(stop.image || "/images/hero-bg.jpg"),
            radialZone: "0-5km",
            location: String(stop.location || ""),
          })),
        );
      })
      .catch(() => undefined);
  }, []);

  const handleTogglePlan = (attraction: Attraction) => {
    if (visitPlan.some((item) => item.id === attraction.id)) {
      setVisitPlan(visitPlan.filter((item) => item.id !== attraction.id));
      void fetch(
        `/api/plans/stops?attractionId=${encodeURIComponent(attraction.id)}`,
        { method: "DELETE" },
      );
    } else {
      setVisitPlan([...visitPlan, attraction]);
      void fetch("/api/plans/stops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attractionId: attraction.id }),
      }).then((response) => {
        if (response.status === 401) {
          setVisitPlan((current) =>
            current.filter((item) => item.id !== attraction.id),
          );
          alert("Please sign in to save a visit plan.");
        }
      });
    }
  };

  const handleRemoveFromPlan = (id: string) => {
    setVisitPlan(visitPlan.filter((item) => item.id !== id));
    void fetch(`/api/plans/stops?attractionId=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  };

  const handleClearPlan = () => {
    setVisitPlan([]);
    void fetch("/api/plans/stops", { method: "DELETE" });
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
        attractions={attractions}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Curated Featured Attractions Grid */}
      <FeaturedAttractions
        attractions={attractions}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedRadius={selectedRadius}
        visitPlan={visitPlan}
        onTogglePlan={handleTogglePlan}
        onSelectAttraction={(attr) => setSelectedAttraction(attr)}
        onClearCategory={() => handleCategorySelect(null)}
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

    </main>
  );
}
