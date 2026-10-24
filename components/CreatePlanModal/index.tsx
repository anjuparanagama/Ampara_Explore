"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Check,
  Calendar,
  MapPin,
  Car,
  Clock,
  Compass,
  CheckCircle2,
  Search,
  Sun,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { amparaAttractions, Attraction } from "@/data/amparaData";
import { SavedPlan } from "@/interface/myPlans.types";
import { PlanStop } from "@/interface/plan.types";

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan?: (newPlan: SavedPlan) => void;
}

export default function CreatePlanModal({
  isOpen,
  onClose,
  onCreatePlan,
}: CreatePlanModalProps) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState("My Ampara Expedition");
  const [date, setDate] = useState("");
  const [pace, setPace] = useState("Balanced (3–4 stops)");

  // Selection & Filter State (Starts EMPTY as requested by user!)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Initialize date client-side only to avoid SSR/prerender date instability
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Categories list
  const categories = [
    "All",
    "Nature",
    "Religious",
    "Wildlife",
    "Historical",
    "Beaches",
  ];

  // Filtered attractions catalog
  const filteredAttractions = amparaAttractions.filter((attr) => {
    const matchesSearch =
      attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      attr.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Selected attractions in order of selection
  const selectedAttractions = useMemo(() => {
    return selectedIds
      .map((id) => amparaAttractions.find((a) => a.id === id))
      .filter((a): a is Attraction => Boolean(a));
  }, [selectedIds]);

  // Toggle selection
  const handleTogglePlace = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations for Journey Summary (matches Image 3)
  const journeyMetrics = useMemo(() => {
    const stopsCount = selectedAttractions.length;
    if (stopsCount === 0) {
      return {
        stopsCount: 0,
        totalKm: "0.0 km",
        isSafeInside: true,
        spanHours: "0 hrs",
        timeRangeStr: "08:00 AM – 08:00 AM",
        paceRating: "No Stops",
        paceSubtext: "Select destinations below",
        isOptimal: false,
      };
    }

    // Distance calculation based on stops
    const totalDist =
      stopsCount === 1
        ? selectedAttractions[0].distanceKm * 2
        : Math.round(
            selectedAttractions.reduce((acc, curr) => acc + curr.distanceKm, 0) *
              0.8 +
              10
          );

    // Duration calculation
    const sightsHours = Math.round(stopsCount * 1.8 * 10) / 10;
    const roadHours = Math.round(stopsCount * 0.4 * 10) / 10;
    const totalHours = Math.round((sightsHours + roadHours + 0.8) * 10) / 10;

    // End time
    const startHour = 8.0;
    const endHourDec = startHour + totalHours;
    const endH = Math.floor(endHourDec);
    const endM = Math.round((endHourDec - endH) * 60);
    const formattedEndH = endH > 12 ? endH - 12 : endH;
    const ampm = endH >= 12 ? "PM" : "AM";
    const formattedEndM = endM < 10 ? `0${endM}` : `${endM}`;
    const timeRangeStr = `08:00 AM – ${formattedEndH}:${formattedEndM} ${ampm}`;

    // Pace rating
    let paceRating = "Ideal";
    if (stopsCount <= 2) paceRating = "Relaxed";
    else if (stopsCount >= 5) paceRating = "Active";

    return {
      stopsCount,
      totalKm: `${totalDist} km`,
      isSafeInside: totalDist <= 55,
      spanHours: `${totalHours} hrs`,
      timeRangeStr,
      paceRating,
      paceSubtext: `${sightsHours}h sights / ${roadHours}h road`,
      isOptimal: stopsCount > 0 && stopsCount <= 5,
    };
  }, [selectedAttractions]);

  // Format date helper (e.g. 2025-10-26 -> Oct 26, 2025)
  const formatDisplayDate = (dStr: string) => {
    try {
      const parts = dStr.split("-");
      if (parts.length === 3) {
        const d = new Date(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2])
        );
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch {}
    return dStr;
  };

  // Submit and create the plan
  const handleCreatePlan = () => {
    if (selectedAttractions.length === 0) return;

    // 1. Create SavedPlan for My Plans
    const newSavedPlan: SavedPlan = {
      id: `plan-${Date.now()}`,
      status: "upcoming",
      date: formatDisplayDate(date),
      title: title.trim() || "My Ampara Adventure",
      description: `Customized itinerary featuring ${selectedAttractions
        .map((a) => a.name)
        .join(", ")}.`,
      totalDistance: journeyMetrics.totalKm,
      allocatedTime: journeyMetrics.spanHours,
      coverImage: selectedAttractions[0]?.image || "/images/hero-bg.jpg",
      isBookmarked: false,
      stops: selectedAttractions.map((a, i) => ({
        id: `stop-${a.id}-${Date.now()}`,
        name: a.name,
        location: a.location,
        category: a.category,
        distance: `${a.distanceKm} km from town`,
        duration: a.duration,
        image: a.image,
        visited: false,
        notes: a.highlights?.[0] || "",
      })),
    };

    // 2. Create PlanStop[] for /plan page
    const newPlanStops: PlanStop[] = selectedAttractions.map((a, i) => {
      const startSlot = 8.5 + i * 2.5;
      const startH = Math.floor(startSlot);
      const startM = (startSlot - startH) * 60;
      const endSlot = startSlot + 2.0;
      const endH = Math.floor(endSlot);
      const endM = (endSlot - endH) * 60;

      const fmtTime = (h: number, m: number) => {
        const h12 = h > 12 ? h - 12 : h;
        const ap = h >= 12 ? "PM" : "AM";
        const mm = m < 10 ? `0${Math.round(m)}` : `${Math.round(m)}`;
        return `${h12}:${mm} ${ap}`;
      };

      return {
        id: a.id,
        order: String(i + 1).padStart(2, "0"),
        name: a.name,
        categoryTag: a.category,
        timeRange: `${fmtTime(startH, startM)} – ${fmtTime(endH, endM)}`,
        duration: a.duration || "2.0 hrs",
        location: a.location,
        distanceFromTown: `${a.distanceKm} km from Ampara`,
        description: a.description,
        tip: a.highlights?.[0]
          ? `Recommended: ${a.highlights[0]}`
          : "Recommended daytime visit",
        tipType: "green",
        image: a.image,
        transitBefore: {
          duration: `${15 + i * 4} min drive`,
          distance: `${a.distanceKm} km`,
          route: "via regional corridor",
          traffic: "Clear morning traffic",
        },
      };
    });

    // 3. Persist to localStorage for /plan synchronization
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "ampara_active_plan",
          JSON.stringify({
            stops: newPlanStops,
            title: newSavedPlan.title,
            date: newSavedPlan.date,
            pace: pace,
          })
        );

        // Also update saved plans in localStorage
        const existingPlansRaw = localStorage.getItem("ampara_saved_plans");
        const existingPlans = existingPlansRaw
          ? JSON.parse(existingPlansRaw)
          : [];
        localStorage.setItem(
          "ampara_saved_plans",
          JSON.stringify([newSavedPlan, ...existingPlans])
        );
      } catch (err) {
        console.error("Failed to save plan to localStorage:", err);
      }
    }

    if (onCreatePlan) {
      onCreatePlan(newSavedPlan);
    }

    onClose();
    // Navigate to the plan view with the user's newly selected places
    router.push("/plan");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-slate-150 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-100 text-[#0084d1]">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                Create New Visit Plan
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
              Select destinations, preview journey feasibility, and generate your plan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
          {/* SECTION 1: Plan Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0084d1]" />
              <span>Step 1: Itinerary Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Plan Title */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekend Safari & Heritage"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-white"
                />
              </div>

              {/* Date Picker */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>Travel Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-white"
                />
              </div>

              {/* Pace Selection */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-600" />
                  <span>Travel Pace</span>
                </label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all bg-white cursor-pointer"
                >
                  <option value="Relaxed (1–2 stops)">Relaxed (1–2 stops)</option>
                  <option value="Balanced (3–4 stops)">Balanced (3–4 stops)</option>
                  <option value="Intensive (5+ stops)">Intensive (5+ stops)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Select Places (Card Design with Image and Name Only) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0084d1]" />
                  <span>Step 2: Select Destinations to Visit</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click to select the attractions you want to add. Cards display image and name only.
                </p>
              </div>

              {/* Selected Counter Badge */}
              <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0084d1] text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>{selectedIds.length} Destinations Selected</span>
              </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search destinations by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#0084d1] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Places Grid: Image & Name Only */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[380px] overflow-y-auto p-1">
              {filteredAttractions.map((attr) => {
                const isSelected = selectedIds.includes(attr.id);
                const orderIndex = selectedIds.indexOf(attr.id);

                return (
                  <button
                    key={attr.id}
                    type="button"
                    onClick={() => handleTogglePlace(attr.id)}
                    className={`group relative flex flex-col rounded-2xl overflow-hidden border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#0084d1] ring-2 ring-sky-500/20 shadow-md bg-sky-50/20"
                        : "border-slate-200 hover:border-sky-300 hover:shadow-sm bg-white"
                    }`}
                  >
                    {/* Image Area */}
                    <div className="relative h-28 sm:h-32 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={attr.image}
                        alt={attr.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      {/* Selected Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#0084d1] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-scaleUp">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Selected Sequence Order Badge */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                          Stop #{orderIndex + 1}
                        </div>
                      )}
                    </div>

                    {/* Name Area ONLY */}
                    <div className="p-2.5 flex-1 flex items-center">
                      <h4
                        className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug transition-colors ${
                          isSelected
                            ? "text-[#0084d1]"
                            : "text-slate-800 group-hover:text-[#0084d1]"
                        }`}
                      >
                        {attr.name}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: Journey Summary Section (Image 3 Design) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0084d1]" />
              <span>Step 3: Journey Summary &amp; Feasibility</span>
            </h3>

            {/* Summary Container matching Image 3 */}
            <div className="bg-slate-50/80 rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    ITINERARY INTELLIGENCE
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    Trip Overview
                  </h2>
                </div>

                <span
                  className={`inline-flex items-center gap-1 border text-xs font-bold px-3 py-1 rounded-full ${
                    journeyMetrics.isOptimal
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {journeyMetrics.stopsCount === 0
                      ? "Select Destinations"
                      : journeyMetrics.stopsCount <= 4
                      ? "Feasible & Optimal"
                      : "Active & Dense"}
                  </span>
                </span>
              </div>

              {/* 4 Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Metric 1: Destinations */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3 text-[#0084d1]" />
                    <span>DESTINATIONS</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {journeyMetrics.stopsCount} Stops
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1">
                    {journeyMetrics.stopsCount > 0
                      ? "+ 1 Planned Rest"
                      : "0 destinations"}
                  </div>
                </div>

                {/* Metric 2: Total Travel */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Car className="w-3 h-3 text-[#0084d1]" />
                    <span>TOTAL TRAVEL</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {journeyMetrics.totalKm}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-1">
                    Safe inside 25 km max
                  </div>
                </div>

                {/* Metric 3: Span of Day */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-[#0084d1]" />
                    <span>SPAN OF DAY</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 leading-none">
                    {journeyMetrics.spanHours}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1 truncate">
                    {journeyMetrics.timeRangeStr}
                  </div>
                </div>

                {/* Metric 4: Pace Rating */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs">
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <Compass className="w-3 h-3 text-[#0084d1]" />
                    <span>PACE RATING</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-600 leading-none">
                    {journeyMetrics.paceRating}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-1 truncate">
                    {journeyMetrics.paceSubtext}
                  </div>
                </div>
              </div>

              {/* Planned Sequence Horizontal Stepper */}
              <div className="pt-2 border-t border-slate-200/80 space-y-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  PLANNED SEQUENCE
                </div>

                {selectedAttractions.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400 font-medium">
                    No destinations selected yet. Select destinations above to preview the route sequence.
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-center gap-1 overflow-x-auto py-2">
                    {/* Waypoint A */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#0084d1] text-white text-xs font-black flex items-center justify-center shadow-xs">
                        A
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1">
                        Ampara
                      </span>
                    </div>

                    <div className="h-0.5 flex-1 min-w-[16px] bg-slate-200 mx-1" />

                    {/* Dynamic Selected Stops Stepper */}
                    {selectedAttractions.map((stop, idx) => (
                      <React.Fragment key={stop.id}>
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[65px]">
                            {stop.name.split(" ")[0]}
                          </span>
                        </div>
                        <div className="h-0.5 flex-1 min-w-[16px] bg-slate-200 mx-1" />
                      </React.Fragment>
                    ))}

                    {/* Return Waypoint */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1">
                        Return
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Weather & Advisory Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>29°C Partly Sunny</span>
                  </div>
                  <span className="bg-amber-200/80 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    Dry Season
                  </span>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  Gentle eastern breezes. High UV between 11:30 AM and 01:30 PM. Carry at least 1.5L drinking water for your excursions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/80 shrink-0">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left w-full sm:w-auto">
            {selectedIds.length === 0 ? (
              <span className="text-amber-600 flex items-center justify-center sm:justify-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Please select at least 1 destination to create plan</span>
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Ready to create itinerary with {selectedIds.length} stops</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleCreatePlan}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap ${
                selectedIds.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white hover:shadow-lg cursor-pointer"
              }`}
            >
              <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>Create Visit Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
