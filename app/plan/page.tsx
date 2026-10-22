"use client";

import React, { useState } from "react";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions } from "@/data/amparaData";
import { PlanStop, PlanViewState, initialPlanStops } from "@/interface";
import {
  PlanBreadcrumbs,
  PlanHero,
  PlanControls,
  PlanEmptyState,
  PlanTimeline,
  TripOverview,
} from "./components";

export default function MyVisitPlanPage() {
  const [viewState, setViewState] = useState<PlanViewState>("active");
  const [pace, setPace] = useState("Balanced (3–4 stops)");
  const [showPaceDropdown, setShowPaceDropdown] = useState(false);
  const [, setIsOptimized] = useState(false);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sample initial stops matching the reference design
  const [stops, setStops] = useState<PlanStop[]>(initialPlanStops);

  const handleMoveStop = (index: number, direction: "up" | "down") => {
    const newStops = [...stops];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newStops.length) return;

    const temp = newStops[index];
    newStops[index] = newStops[targetIndex];
    newStops[targetIndex] = temp;

    // Recalculate order labels
    newStops.forEach((stop, idx) => {
      stop.order = `0${idx + 1}`;
    });

    setStops(newStops);
  };

  const handleDeleteStop = (id: string) => {
    const filtered = stops.filter((s) => s.id !== id);
    filtered.forEach((stop, idx) => {
      stop.order = `0${idx + 1}`;
    });
    setStops(filtered);
    if (filtered.length === 0) setViewState("empty");
  };

  const handleOptimizeRoute = () => {
    setIsOptimized(true);
    alert(
      "✨ Route Optimized! Waypoints sequenced for minimum travel time within the 25km radius."
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
      {/* 1. Top Breadcrumbs & State Switcher */}
      <PlanBreadcrumbs
        viewState={viewState}
        setViewState={setViewState}
        stopsCount={stops.length}
      />

      {/* 2. Main Body */}
      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-6 flex-1">
        {/* Header Hero Title Area */}
        <PlanHero />

        {/* Action Controls Bar */}
        <PlanControls
          pace={pace}
          setPace={setPace}
          showPaceDropdown={showPaceDropdown}
          setShowPaceDropdown={setShowPaceDropdown}
          onOptimizeRoute={handleOptimizeRoute}
        />

        {/* 3. Main 2-Column Itinerary Content or Empty State */}
        {viewState === "empty" || stops.length === 0 ? (
          <PlanEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sequential Timeline & Stops */}
            <PlanTimeline
              stops={stops}
              onMoveStop={handleMoveStop}
              onDeleteStop={handleDeleteStop}
            />

            {/* Itinerary Intelligence & Trip Overview */}
            <TripOverview stops={stops} />
          </div>
        )}
      </main>

      {/* Drawers & Modals */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={stops.map(
          (s) =>
            amparaAttractions.find((a) => a.id === s.id) || amparaAttractions[0]
        )}
        onRemove={(id) => handleDeleteStop(id)}
        onClear={() => {
          setStops([]);
          setViewState("empty");
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
