"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  FileText,
  Share2,
  Flag,
  Car,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  CheckCircle2,
  Sun,
  Navigation,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";

interface PlanStop {
  id: string;
  order: string;
  name: string;
  categoryTag: string;
  timeRange: string;
  duration: string;
  location: string;
  distanceFromTown: string;
  description: string;
  tip: string;
  tipType: "green" | "neutral" | "warning";
  image: string;
  transitBefore?: {
    duration: string;
    distance: string;
    route: string;
    traffic: string;
  };
}

export default function MyVisitPlanPage() {
  const [viewState, setViewState] = useState<"active" | "empty">("active");
  const [pace, setPace] = useState("Balanced (3–4 stops)");
  const [showPaceDropdown, setShowPaceDropdown] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("plan");

  // Sample initial stops matching the reference design
  const [stops, setStops] = useState<PlanStop[]>([
    {
      id: "senanayake-samudraya",
      order: "01",
      name: "Senanayake Samudraya Reservoir",
      categoryTag: "Nature Reserve",
      timeRange: "08:30 AM – 11:00 AM",
      duration: "2.5 hrs",
      location: "Inginiyagala",
      distanceFromTown: "12.4 km West of Ampara",
      description:
        "Morning motorized boat safari along Sri Lanka's greatest reservoir. Panoramic mountain-rimmed water vista and aquatic bird nesting colonies.",
      tip: "Recommended morning visit",
      tipType: "green",
      image: "/images/hero-bg.jpg",
      transitBefore: {
        duration: "18 min drive",
        distance: "12.4 km",
        route: "via A25 Highway",
        traffic: "Clear morning traffic",
      },
    },
    {
      id: "buddhangala-monastery",
      order: "02",
      name: "Buddhangala Forest Hermitage",
      categoryTag: "Sacred Hermitage",
      timeRange: "11:30 AM – 01:30 PM",
      duration: "2.0 hrs",
      location: "Buddhangala",
      distanceFromTown: "8.5 km North of Ampara",
      description:
        "Ancient 2,300-year-old monastery nested on gigantic granite boulders amidst evergreen woods. Features original stupa and shaded meditation...",
      tip: "Modest dress code required",
      tipType: "neutral",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      transitBefore: {
        duration: "22 min drive",
        distance: "14.2 km",
        route: "across scenic jungle corridor",
        traffic: "Scenic nature corridor",
      },
    },
    {
      id: "deegawapi-stupa",
      order: "03",
      name: "Deegawapi Sacred Stupa",
      categoryTag: "Historic Relic",
      timeRange: "02:15 PM – 04:30 PM",
      duration: "2.1 hrs",
      location: "Deegawapiya",
      distanceFromTown: "16.8 km East of Ampara",
      description:
        "One of the sacred Solosmasthana sites blessed by Lord Buddha, featuring ancient archaeological ruins and a magnificent stupa restoration.",
      tip: "Best sunset lighting",
      tipType: "green",
      image: "/images/deegawapi-stupa.jpg",
      transitBefore: {
        duration: "19 min drive",
        distance: "16.8 km",
        route: "via B350 Road",
        traffic: "Smooth paved road",
      },
    },
  ]);

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
    alert("✨ Route Optimized! Waypoints sequenced for minimum travel time within the 25km radius.");
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={stops.length}
      />

      {/* 2. Top Breadcrumbs & State Switcher */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0084d1] flex items-center gap-1">
              <span>⌂ Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#0084d1] font-bold">My Visit Plan</span>
          </div>

          {/* State Switcher Pill */}
          <div className="inline-flex items-center bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewState("active")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewState === "active"
                  ? "bg-[#0084d1] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${viewState === "active" ? "bg-emerald-300" : "bg-slate-400"}`} />
              <span>Active Plan ({stops.length} Stops)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewState("empty")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewState === "empty"
                  ? "bg-slate-800 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Empty State</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Main Body */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-6 flex-1">
        
        {/* Header Hero Title Area */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-[#0084d1] text-[11px] font-extrabold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-[#0084d1]" />
            <span>25 KM RADIAL TRIP ARCHITECT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Plan Your Day in Ampara
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-3xl leading-relaxed">
            Curate your single-day expedition around Ampara. Organize sequential waypoints, track drive times through wild reserves, and ensure your entire route remains safely inside the 25 km regional horizon.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Date Picker Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800">
              <Calendar className="w-4 h-4 text-[#0084d1]" />
              <span>Today, 24 Oct 2025</span>
            </div>

            {/* Pace Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPaceDropdown(!showPaceDropdown)}
                className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#0084d1]" />
                <span>Pace: {pace}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPaceDropdown && (
                <div className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 min-w-[200px] animate-fadeIn">
                  {["Relaxed (1–2 stops)", "Balanced (3–4 stops)", "Intensive (5+ stops)"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPace(p);
                        setShowPaceDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        pace === p ? "bg-sky-50 text-[#0084d1]" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{p}</span>
                      {pace === p && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOptimizeRoute}
              className="bg-[#0084d1] hover:bg-[#0070b3] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>Optimize Route</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Itinerary link copied to clipboard!");
                }
              }}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer shadow-2xs"
              title="Share Itinerary"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4. Main 2-Column Itinerary Content */}
        {viewState === "empty" || stops.length === 0 ? (
          
          /* Empty State View */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0084d1] flex items-center justify-center mx-auto shadow-inner">
              <Compass className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Your 1-Day Itinerary is Empty
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Explore destinations within the 25km radius around Ampara and click &ldquo;Add to Visit Plan&rdquo; to begin sequencing your day.
            </p>
            <div className="pt-3">
              <Link
                href="/#explore"
                className="inline-flex items-center gap-2 bg-[#0084d1] hover:bg-[#0070b3] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>Browse Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        ) : (

          /* Active Itinerary View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Sequential Timeline & Stops (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Start Waypoint Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 text-[#0084d1] flex items-center justify-center font-black text-sm shrink-0">
                    <span className="w-4 h-4 rounded-full border-3 border-[#0084d1]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      START WAYPOINT • 08:00 AM DEPARTURE
                    </div>
                    <div className="text-base font-black text-slate-900 leading-tight">
                      Ampara Town Center Clocktower
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      0.0 km radial benchmark • Fuel & Supplies
                    </div>
                  </div>
                </div>

                <Flag className="w-5 h-5 text-slate-300 shrink-0" />
              </div>

              {/* Stops Loop with Transit Connectors */}
              {stops.map((stop, index) => (
                <div key={stop.id} className="space-y-4">
                  
                  {/* Transit Connector */}
                  {stop.transitBefore && (
                    <div className="relative pl-6 sm:pl-7 my-2">
                      <div className="absolute left-5 sm:left-5.5 top-0 bottom-0 w-0.5 bg-slate-300" />
                      
                      <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs">
                        <Car className="w-3.5 h-3.5 text-[#0084d1]" />
                        <span>
                          <strong className="text-slate-900">{stop.transitBefore.duration}</strong> ({stop.transitBefore.distance}) {stop.transitBefore.route} • <span className="text-slate-500">{stop.transitBefore.traffic}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Stop Card */}
                  <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      
                      {/* Left Thumbnail Image */}
                      <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={stop.image}
                          alt={stop.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {stop.categoryTag}
                        </span>
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        
                        {/* Top Time Pill & Actions */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0084d1] border border-sky-200 text-xs font-bold">
                            <span className="w-4 h-4 rounded-full bg-[#0084d1] text-white text-[10px] flex items-center justify-center font-black">
                              {stop.order}
                            </span>
                            <span>{stop.timeRange} ({stop.duration})</span>
                          </span>

                          <div className="flex items-center gap-1 text-slate-400">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMoveStop(index, "up")}
                                className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {index < stops.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMoveStop(index, "down")}
                                className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteStop(stop.id)}
                              className="p-1 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer ml-1"
                              title="Delete Stop"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Stop Title */}
                        <Link
                          href={`/attraction/${stop.id}`}
                          className="text-base font-black text-slate-900 hover:text-[#0084d1] transition-colors leading-snug block"
                        >
                          {stop.name}
                        </Link>

                        {/* Location Subtitle */}
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#0084d1]" />
                          <span>{stop.distanceFromTown}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 pt-1">
                          {stop.description}
                        </p>

                        {/* Tip Bottom Row */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className={`inline-flex items-center gap-1 font-semibold ${
                            stop.tipType === "green" ? "text-emerald-700" : "text-slate-600"
                          }`}>
                            <Clock className="w-3 h-3" />
                            <span>{stop.tip}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => alert(`Duration edit for ${stop.name}`)}
                            className="text-[#0084d1] font-bold hover:underline text-[11px] cursor-pointer"
                          >
                            Edit Duration
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

              {/* Final Return to Ampara Indicator */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">
                    Return to Ampara Town Center by <strong>05:30 PM</strong>
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-bold uppercase">
                  COMPLETE 1-DAY LOOP
                </span>
              </div>

            </div>

            {/* RIGHT COLUMN: Itinerary Intelligence & Trip Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-5 sticky top-20">
              
              {/* Trip Overview Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
                
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

                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Feasible &amp; Optimal</span>
                  </span>
                </div>

                {/* 4 Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Metric 1 */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-[#0084d1]" />
                      <span>DESTINATIONS</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 leading-none">
                      {stops.length} Stops
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-1">
                      + 1 Planned Rest
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Car className="w-3 h-3 text-[#0084d1]" />
                      <span>TOTAL TRAVEL</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 leading-none">
                      43.4 km
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">
                      Safe inside 25 km max
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3 text-[#0084d1]" />
                      <span>SPAN OF DAY</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 leading-none">
                      9.5 hrs
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">
                      08:00 AM – 05:30 PM
                    </div>
                  </div>

                  {/* Metric 4 */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                    <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Compass className="w-3 h-3 text-[#0084d1]" />
                      <span>PACE RATING</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-600 leading-none">
                      Ideal
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">
                      6.5h sights / 1.1h road
                    </div>
                  </div>

                </div>

                {/* Planned Sequence Horizontal Stepper */}
                <div className="pt-2 border-t border-slate-150 space-y-2">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    PLANNED SEQUENCE
                  </div>

                  <div className="flex items-center justify-between text-center gap-1 overflow-x-auto py-1">
                    
                    {/* Waypoint A */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-[#0084d1] text-white text-xs font-black flex items-center justify-center shadow-xs">
                        A
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1">Ampara</span>
                    </div>

                    <div className="h-0.5 flex-1 bg-slate-200 mx-1" />

                    {/* Stop 1 */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        01
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[50px]">Senanayake</span>
                    </div>

                    <div className="h-0.5 flex-1 bg-slate-200 mx-1" />

                    {/* Stop 2 */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        02
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[50px]">Buddhangala</span>
                    </div>

                    <div className="h-0.5 flex-1 bg-slate-200 mx-1" />

                    {/* Stop 3 */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        03
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[50px]">Deegawapi</span>
                    </div>

                    <div className="h-0.5 flex-1 bg-slate-200 mx-1" />

                    {/* Return */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-[9px] font-bold text-slate-700 mt-1">Return</span>
                    </div>

                  </div>
                </div>

                {/* Weather & Climate Warning Box */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>29°C Partly Sunny</span>
                    </span>
                    <span className="text-[10px] font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                      Dry Season
                    </span>
                  </div>
                  <p className="text-amber-800/90 text-[11px] leading-relaxed">
                    Gentle eastern breezes. High UV between 11:30 AM and 01:30 PM during Buddhangala walk. Carry at least 1.5L drinking water.
                  </p>
                </div>

                {/* Big Launch GPS CTA */}
                <button
                  type="button"
                  onClick={() => {
                    window.open("https://maps.google.com/?q=Ampara+Clocktower+to+Senanayake+Samudraya", "_blank");
                  }}
                  className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white font-bold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all cursor-pointer transform active:scale-[0.99]"
                >
                  <Navigation className="w-4 h-4 fill-white" />
                  <span>Launch Turn-by-Turn GPS</span>
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

      {/* Drawers & Modals */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={stops.map((s) => amparaAttractions.find((a) => a.id === s.id) || amparaAttractions[0])}
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

      {/* 5. Global Footer */}
      <Footer />

    </div>
  );
}
