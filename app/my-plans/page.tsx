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
  Plus,
  Check,
  Navigation,
  ExternalLink,
  ChevronRight,
  Share2,
  Bookmark,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Layers,
  ShieldCheck,
  Trees,
  Info,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";

interface SavedPlan {
  id: string;
  status: "upcoming" | "draft" | "completed";
  statusLabel: string;
  dateTag: string;
  maxDistanceTag: string;
  title: string;
  subtitle: string;
  stopsCount: number;
  loopDistance: string;
  allocatedTime: string;
  updatedTime: string;
  photos: {
    label: string;
    image: string;
  }[];
}

const initialPlans: SavedPlan[] = [
  {
    id: "plan-1",
    status: "upcoming",
    statusLabel: "Upcoming - Scheduled Oct 26, 2025",
    dateTag: "Created Oct 20",
    maxDistanceTag: "21.4 km Max Distance",
    title: "Senanayake Inland Sea & Elephant Trail",
    subtitle:
      "Dawn reservoir cruise at sunrise, ancient wilderness corridor, and hermitage ridge walk.",
    stopsCount: 3,
    loopDistance: "43.4 km loop",
    allocatedTime: "9.5 hrs allocated",
    updatedTime: "Updated 2 hrs ago",
    photos: [
      { label: "1. Reservoir Pier", image: "/images/hero-bg.jpg" },
      { label: "2. Elephant Shore", image: "/images/gal-oya-elephants.jpg" },
      { label: "3. Forest Stupa", image: "/images/deegawapi-stupa.jpg" },
    ],
  },
  {
    id: "plan-2",
    status: "draft",
    statusLabel: "Draft Exploration",
    dateTag: "Created Oct 18",
    maxDistanceTag: "16.8 km Max Radial",
    title: "Sacred Hermitages & Solosmasthana Pilgrimage",
    subtitle:
      "Revered Dighavapi Maha Seya stupa, monastic stone pathways, and deep meditation forest rocks.",
    stopsCount: 3,
    loopDistance: "39.2 km loop",
    allocatedTime: "7.0 hrs allocated",
    updatedTime: "Updated Yesterday",
    photos: [
      { label: "1. Dighavapi Seya", image: "/images/deegawapi-stupa.jpg" },
      {
        label: "2. Buddhangala Peak",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      },
      { label: "3. Pannalgama Lake", image: "/images/login-bg.jpg" },
    ],
  },
  {
    id: "plan-3",
    status: "upcoming",
    statusLabel: "Upcoming - Scheduled Nov 04, 2025",
    dateTag: "Created Oct 22",
    maxDistanceTag: "14.2 km Max Radial",
    title: "Untouched Reservoirs & Sunset Canoe Safari",
    subtitle:
      "Gentle wetland paddling, endemic bird watching at twilight, and dam crest viewpoint.",
    stopsCount: 2,
    loopDistance: "29.6 km loop",
    allocatedTime: "5.5 hrs allocated",
    updatedTime: "Updated 3 days ago",
    photos: [
      { label: "1. Pannalgama Boat Launch", image: "/images/login-bg.jpg" },
      { label: "2. Dam Crest Sunset Point", image: "/images/hero-bg.jpg" },
    ],
  },
  {
    id: "plan-4",
    status: "completed",
    statusLabel: "Completed Expedition",
    dateTag: "Traversed Sep 18, 2025",
    maxDistanceTag: "Logged in Explorer Passport",
    title: "Inginiyagala Heritage & Highland Vistas",
    subtitle:
      "Historical spillway, wild elephant viewpoint, and sacred lakeside shrines.",
    stopsCount: 3,
    loopDistance: "36.0 km logged",
    allocatedTime: "8.0 hrs on trail",
    updatedTime: "Completed 1 month ago",
    photos: [],
  },
];

export default function MyVisitPlansPage() {
  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "upcoming" | "draft" | "completed">("all");
  const [viewState, setViewState] = useState<"populated" | "empty">("populated");
  const [plans, setPlans] = useState<SavedPlan[]>(initialPlans);
  const [bookmarkedPlans, setBookmarkedPlans] = useState<string[]>(["plan-1"]);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("plan");

  const toggleBookmark = (id: string) => {
    if (bookmarkedPlans.includes(id)) {
      setBookmarkedPlans(bookmarkedPlans.filter((p) => p !== id));
    } else {
      setBookmarkedPlans([...bookmarkedPlans, id]);
    }
  };

  const filteredPlans = plans.filter((plan) => {
    if (activeFilterTab === "all") return true;
    return plan.status === activeFilterTab;
  });

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={plans.length}
      />

      {/* 2. Top Breadcrumb & GPS Radius Tag */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0084d1] flex items-center gap-1">
              <span>⌂ Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#0084d1] font-bold">My Visit Plans</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0084d1] text-[11px] font-extrabold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0084d1] animate-pulse" />
            <span>GPS RADIUS: 25 KM STRICT BOUND</span>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 space-y-6 flex-1">
        
        {/* 3. User Explorer Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          
          <div className="flex items-center gap-4">
            {/* Avatar Circle with Online Dot */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white ring-2 ring-sky-200 shadow-sm shrink-0">
              <Image
                src="/images/avatar.jpg"
                alt="Kasun Explorer Avatar"
                fill
                className="object-cover"
                priority
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-100 text-[#0084d1] text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  REGIONAL EXPLORER TIER
                </span>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#0084d1]" />
                  <span>Ampara Basecamp (Clocktower 0.0 km)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ayubowan, Kasun!
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl">
                Curate, sequence, and review your one-day regional itineraries strictly within Ampara&apos;s 25 km sanctuary horizon.
              </p>
            </div>
          </div>

          {/* Create New Plan CTA */}
          <Link
            href="/plan"
            className="bg-[#006699] hover:bg-[#0084d1] text-white px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-950/10 hover:shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Create New Plan</span>
          </Link>

        </div>

        {/* 4. Quick Key Metric Stats Bar (4 cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0084d1] flex items-center justify-center font-black shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 leading-none">3</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Active Itineraries</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 leading-none">1</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Completed Tour</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-black shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 leading-none">12</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Waypoints Planned</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-purple-700 leading-none">100%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">25km Compliant</div>
            </div>
          </div>

        </div>

        {/* 5. Filter Tabs & Preview Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: "all", label: `All Plans (${plans.length})` },
              { id: "upcoming", label: `Upcoming (${plans.filter((p) => p.status === "upcoming").length})` },
              { id: "draft", label: `Drafts (${plans.filter((p) => p.status === "draft").length})` },
              { id: "completed", label: `Completed (${plans.filter((p) => p.status === "completed").length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilterTab(tab.id as any)}
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilterTab === tab.id
                    ? "bg-[#0084d1] text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Preview Mode Switcher */}
          <div className="inline-flex items-center gap-2 text-xs font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
            <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">PREVIEW MODE:</span>
            <button
              type="button"
              onClick={() => setViewState("populated")}
              className={`cursor-pointer ${viewState === "populated" ? "text-[#0084d1] underline" : "text-slate-500 hover:text-slate-800"}`}
            >
              Populated (4)
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => setViewState("empty")}
              className={`cursor-pointer ${viewState === "empty" ? "text-[#0084d1] underline" : "text-slate-500 hover:text-slate-800"}`}
            >
              Empty State
            </button>
          </div>

        </div>

        {/* 6. 2-Column Main Content */}
        {viewState === "empty" || filteredPlans.length === 0 ? (
          
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-xl mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-[#0084d1] flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              No Itineraries in this Category
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You haven&apos;t created any itineraries under this filter yet. Start by planning a 1-day exploration within 25km.
            </p>
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 bg-[#0084d1] hover:bg-[#0070b3] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition-all"
            >
              <span>Create an Itinerary</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        ) : (

          /* Populated 2-Column Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Saved Plans Feed (8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {filteredPlans.map((plan) => {
                const isBookmarked = bookmarkedPlans.includes(plan.id);

                return (
                  <div
                    key={plan.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    {/* Card Header Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[11px] font-extrabold px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5 ${
                            plan.status === "upcoming"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : plan.status === "draft"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-sky-50 text-[#0084d1] border border-sky-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              plan.status === "upcoming"
                                ? "bg-emerald-500"
                                : plan.status === "draft"
                                ? "bg-purple-500"
                                : "bg-[#0084d1]"
                            }`}
                          />
                          <span>{plan.statusLabel}</span>
                        </span>

                        <span className="text-[11px] font-semibold text-slate-400">
                          {plan.dateTag}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-[#0084d1] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        📍 {plan.maxDistanceTag}
                      </span>
                    </div>

                    {/* Card Title & Subtitle */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                        {plan.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {plan.subtitle}
                      </p>
                    </div>

                    {/* Photos Preview Grid (if any) */}
                    {plan.photos.length > 0 && (
                      <div className={`grid gap-2.5 ${plan.photos.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {plan.photos.map((photo, pIdx) => (
                          <div
                            key={pIdx}
                            className="relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 group border border-slate-150"
                          >
                            <Image
                              src={photo.image}
                              alt={photo.label}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <span className="absolute bottom-2 left-2 text-[10px] sm:text-[11px] font-bold text-white drop-shadow-sm truncate max-w-[90%]">
                              {photo.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Bottom Meta & Actions */}
                    <div className="pt-3 border-t border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Meta stats */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                        <span className="font-bold text-[#0084d1] bg-sky-50 px-2 py-0.5 rounded-md">
                          {plan.stopsCount} {plan.status === "completed" ? "Stops Explored" : "Stops"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{plan.loopDistance}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{plan.allocatedTime}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 ml-auto sm:ml-0">
                          {plan.updatedTime}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => alert(`Edit ${plan.title}`)}
                          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleBookmark(plan.id)}
                          className={`p-2 rounded-xl transition-colors cursor-pointer ${
                            isBookmarked
                              ? "text-[#0084d1] bg-sky-50"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#0084d1]" : ""}`} />
                        </button>

                        {plan.status === "completed" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => alert(`Duplicating ${plan.title}`)}
                              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Duplicate to New Plan</span>
                            </button>
                            <Link
                              href="/plan"
                              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-all"
                            >
                              View Expedition Log
                            </Link>
                          </>
                        ) : plan.status === "draft" ? (
                          <>
                            <Link
                              href="/plan"
                              className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                            >
                              Resume Drafting
                            </Link>
                            <Link
                              href="/plan"
                              className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                            >
                              <span>Open Plan</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/map"
                              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1"
                            >
                              <span>View Route</span>
                            </Link>
                            <Link
                              href="/plan"
                              className="px-4 py-2 rounded-xl bg-[#0084d1] hover:bg-[#0070b3] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                            >
                              <span>View Full Plan</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* RIGHT COLUMN: Sidebar Intelligence (4 cols) */}
            <div className="lg:col-span-4 space-y-5 sticky top-20">
              
              {/* 1. Horizon Compliance Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      RADIAL HORIZON RADIUS
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      Horizon Compliance: 100%
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Every planned waypoint is strictly anchored within 25 km of Ampara&apos;s central clocktower for feasible, stress-free single-day excursions.
                </p>

                {/* Ring Indicator Box */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-3 border-[#0084d1] flex items-center justify-center font-black text-xs text-[#0084d1] bg-white shadow-2xs">
                    25km
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">
                      Max Radial: 21.4 km
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Senanayake Dam Western Edge
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>In Safe Boundary</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Recommended to Add */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0084d1]" />
                    <span>Recommended to Add</span>
                  </div>
                  <Link href="/#explore" className="text-xs font-bold text-[#0084d1] hover:underline">
                    View All
                  </Link>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Unvisited treasures nearby that integrate seamlessly into your existing routes:
                </p>

                {/* Items */}
                <div className="space-y-2.5">
                  
                  <div className="p-2.5 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80"
                          alt="Hingurana Valley"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Hingurana Valley</div>
                        <div className="text-[10px] text-slate-500">Sugarcane plains &amp; waterways</div>
                        <button
                          type="button"
                          onClick={() => alert("Added to Oct 26 Plan!")}
                          className="text-[10px] font-bold text-[#0084d1] hover:underline cursor-pointer mt-0.5"
                        >
                          + Add to Oct 26 Plan
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      11.2 km
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl border border-slate-200/80 hover:bg-slate-50 transition-all flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src="/images/login-bg.jpg"
                          alt="Pannalgama Quiet Pier"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Pannalgama Quiet Pier</div>
                        <div className="text-[10px] text-slate-500">Canoe launch &amp; kingfisher birding</div>
                        <button
                          type="button"
                          onClick={() => alert("Added to Nov 04 Plan!")}
                          className="text-[10px] font-bold text-[#0084d1] hover:underline cursor-pointer mt-0.5"
                        >
                          + Add to Nov 04 Plan
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      18.7 km
                    </span>
                  </div>

                </div>
              </div>

              {/* 3. Wildlife & Heritage Advisory */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 space-y-1 text-xs">
                <div className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <Trees className="w-4 h-4 text-emerald-600" />
                  <span>Wildlife &amp; Heritage Advisory</span>
                </div>
                <p className="text-emerald-900/90 text-[11px] leading-relaxed">
                  Elephant corridors around Senanayake Samudraya become active around 4:00 PM. Please maintain respectful 50m buffers and adhere to park boundaries.
                </p>
              </div>

            </div>

          </div>

        )}

      </main>

      {/* 7. Global Footer */}
      <footer className="w-full bg-white border-t border-slate-200/90 mt-8 pt-8 pb-6 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0084d1] flex items-center justify-center text-white font-bold">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-black text-slate-900">
                  Ampara Explore
                </span>
                <span className="bg-sky-100 text-[#0084d1] text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-sky-200 uppercase">
                  OFFICIAL GUIDE
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                Curating ancient stupas, untouched reservoir sanctuaries, and coastal peripheries nestled strictly within a 25 km radius of Ampara. Travel thoughtfully with genuine regional insight.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                QUICK LINKS
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li>
                  <Link href="/#explore" className="hover:text-[#0084d1] transition-colors">
                    Explore Attractions
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="hover:text-[#0084d1] transition-colors">
                    Radial Route Map
                  </Link>
                </li>
                <li>
                  <Link href="/plan" className="hover:text-[#0084d1] transition-colors">
                    One-Day Visit Planner
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-[#0084d1] transition-colors">
                    Account Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                HERITAGE &amp; WILDLIFE
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Adhere to regional conservation rules when visiting Senanayake Samudraya, Dighavapi, and Buddhist forest monasteries.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © 2024 Ampara Explore. Sri Lanka Tourism Development Authority aligned.
            </div>
            <div className="font-bold text-slate-700">
              Eastern Province, Sri Lanka
            </div>
          </div>
        </div>
      </footer>

      {/* Drawers & Modals */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={plans.map((p) => amparaAttractions[0])}
        onRemove={(id) => {}}
        onClear={() => {}}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}
