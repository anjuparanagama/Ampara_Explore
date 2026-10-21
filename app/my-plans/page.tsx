"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions } from "@/data/amparaData";

import { SavedPlan, FilterTabType, initialPlans } from "@/interface/myPlans.types";
import {
  PlanHeader,
  PlanFilters,
  PlanCard,
  PlanEmptyState,
  PlanModal,
} from "./components";

export default function MyVisitPlansPage() {
  const [plans, setPlans] = useState<SavedPlan[]>(initialPlans);
  const [activeFilter, setActiveFilter] = useState<FilterTabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal active plan state
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // App UI state
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("plan");
  const [currentUser, setCurrentUser] = useState<{ name?: string } | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const selectedPlan = useMemo(() => {
    return plans.find((p) => p.id === selectedPlanId) || null;
  }, [plans, selectedPlanId]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === id) {
          const next = !plan.isBookmarked;
          showToast(next ? "Plan bookmarked" : "Removed from bookmarks");
          return { ...plan, isBookmarked: next };
        }
        return plan;
      }),
    );
  };

  const duplicatePlan = (plan: SavedPlan, e: React.MouseEvent) => {
    e.stopPropagation();
    const newPlan: SavedPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
      title: `${plan.title} (Copy)`,
      status: "draft",
      date: "Draft Copy",
      isBookmarked: false,
      stops: plan.stops.map((s) => ({ ...s, visited: false })),
    };
    setPlans((prev) => [newPlan, ...prev]);
    showToast("Itinerary duplicated as draft");
  };

  const deletePlan = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setPlans((prev) => prev.filter((p) => p.id !== id));
      if (selectedPlanId === id) setSelectedPlanId(null);
      showToast("Plan deleted");
    }
  };

  // Modal actions: Start Trip, Mark Stop as Visited, Finish Trip, Restart
  const handleStartTrip = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          return { ...p, status: "in-progress" };
        }
        return p;
      }),
    );
    showToast("Trip started! Enjoy your expedition in Ampara.");
  };

  const handleToggleStopVisited = (planId: string, stopId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          const updatedStops = p.stops.map((s) => {
            if (s.id === stopId) {
              const nextVisited = !s.visited;
              showToast(
                nextVisited
                  ? `Marked "${s.name}" as Visited!`
                  : `Unmarked "${s.name}"`,
              );
              return { ...s, visited: nextVisited };
            }
            return s;
          });

          // Check if all stops are now visited
          const allVisited = updatedStops.every((s) => s.visited);
          const nextStatus =
            allVisited && p.status === "in-progress" ? "completed" : p.status;

          if (allVisited && p.status === "in-progress") {
            showToast("All stops visited! Tour marked as Completed 🎉");
          }

          return { ...p, stops: updatedStops, status: nextStatus };
        }
        return p;
      }),
    );
  };

  const handleFinishTrip = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          const completedStops = p.stops.map((s) => ({ ...s, visited: true }));
          return {
            ...p,
            status: "completed",
            date: "Completed Today",
            stops: completedStops,
          };
        }
        return p;
      }),
    );
    showToast("Congratulations! Tour marked as Completed 🎉");
  };

  const handleRestartTrip = (planId: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          const resetStops = p.stops.map((s) => ({ ...s, visited: false }));
          return {
            ...p,
            status: "in-progress",
            stops: resetStops,
          };
        }
        return p;
      }),
    );
    showToast("Trip restarted in progress.");
  };

  // Filtered and searched plans
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      if (activeFilter === "in-progress" && plan.status !== "in-progress")
        return false;
      if (activeFilter === "upcoming" && plan.status !== "upcoming")
        return false;
      if (activeFilter === "draft" && plan.status !== "draft") return false;
      if (activeFilter === "completed" && plan.status !== "completed")
        return false;
      if (activeFilter === "bookmarked" && !plan.isBookmarked) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = plan.title.toLowerCase().includes(query);
        const matchDesc = plan.description.toLowerCase().includes(query);
        const matchStops = plan.stops.some((s) =>
          s.name.toLowerCase().includes(query),
        );
        return matchTitle || matchDesc || matchStops;
      }
      return true;
    });
  }, [plans, activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: plans.length,
      inProgress: plans.filter((p) => p.status === "in-progress").length,
      upcoming: plans.filter((p) => p.status === "upcoming").length,
      draft: plans.filter((p) => p.status === "draft").length,
      completed: plans.filter((p) => p.status === "completed").length,
      bookmarked: plans.filter((p) => p.isBookmarked).length,
    };
  }, [plans]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={plans.length}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        {/* Header Component */}
        <PlanHeader userName={currentUser?.name} />

        {/* Filters and Search Component */}
        <PlanFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          counts={counts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Plans Grid or Empty State */}
        {filteredPlans.length === 0 ? (
          <PlanEmptyState
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            onClearSearch={() => setSearchQuery("")}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={(p) => setSelectedPlanId(p.id)}
                onToggleBookmark={toggleBookmark}
                onDuplicate={duplicatePlan}
                onDelete={deletePlan}
              />
            ))}
          </div>
        )}
      </main>

      {/* Interactive Trip Tracking Modal */}
      <PlanModal
        plan={selectedPlan}
        onClose={() => setSelectedPlanId(null)}
        onStartTrip={handleStartTrip}
        onToggleStopVisited={handleToggleStopVisited}
        onFinishTrip={handleFinishTrip}
        onRestartTrip={handleRestartTrip}
      />

      {/* Global Shared Footer */}
      <Footer />

      {/* Visit Plan Drawer & Auth Modal */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={plans.map(() => amparaAttractions[0])}
        onRemove={() => {}}
        onClear={() => {}}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
