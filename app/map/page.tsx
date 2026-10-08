"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Search,
  SlidersHorizontal,
  Layers,
  Trees,
  Check,
  Plus,
  Navigation,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  LocateFixed,
  Eye,
  Car,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";

interface MapPlace {
  id: string;
  name: string;
  category: "Nature" | "Wildlife" | "Sacred" | "Historical";
  ringTag: string;
  distanceKm: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  x: number; // Percentage coordinate on map canvas (0-100)
  y: number; // Percentage coordinate on map canvas (0-100)
  openHours: string;
  roadInfo: string;
  zone: "0-5km" | "5-15km" | "15-25km";
}

const mapDestinations: MapPlace[] = [
  {
    id: "senanayake-samudraya",
    name: "Senanayake Samudraya",
    category: "Nature",
    ringTag: "Nature • 18.2 km Ring",
    distanceKm: 18.2,
    duration: "2.5-3.5h Visit",
    rating: 4.9,
    reviewsCount: 540,
    description:
      "Sri Lanka's monumental inland ocean surrounded by lush jungle peaks, water fishing safaris, and swimming wild elephants across islets.",
    image: "/images/hero-bg.jpg",
    x: 35,
    y: 42,
    openHours: "Open Access Entry",
    roadInfo: "18 min via A25 Highway",
    zone: "15-25km",
  },
  {
    id: "gal-oya-national-park",
    name: "Gal Oya Elephant Corridor",
    category: "Wildlife",
    ringTag: "Wildlife • 18.2 km",
    distanceKm: 18.2,
    duration: "3-4h Safari",
    rating: 4.9,
    reviewsCount: 380,
    description:
      "Swimming elephant packs across tranquil lake channels, pristine rainforest canopy, and protected bird breeding grounds.",
    image: "/images/gal-oya-elephants.jpg",
    x: 62,
    y: 50,
    openHours: "06:00 AM - 06:00 PM",
    roadInfo: "22 min via B350 Road",
    zone: "15-25km",
  },
  {
    id: "deegawapi-stupa",
    name: "Deegawapi Stupa & Vihara",
    category: "Sacred",
    ringTag: "Sacred • 16.8 km",
    distanceKm: 16.8,
    duration: "1.5-2.0h Visit",
    rating: 4.8,
    reviewsCount: 420,
    description:
      "Solosmasthana ancient pilgrimage sanctuary with historic archaeological relic chambers and majestic white stupa restoration.",
    image: "/images/deegawapi-stupa.jpg",
    x: 72,
    y: 58,
    openHours: "05:30 AM - 07:00 PM",
    roadInfo: "19 min via A4 Corridor",
    zone: "15-25km",
  },
  {
    id: "buddhangala-monastery",
    name: "Buddhangala Hermitage",
    category: "Sacred",
    ringTag: "Sacred • 8.5 km Ring",
    distanceKm: 8.5,
    duration: "2.0h Visit",
    rating: 4.9,
    reviewsCount: 290,
    description:
      "Ancient rock monastery with secluded meditation caves, towering summit stupa, and free-roaming wild deer herds in the woods.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    x: 62,
    y: 33,
    openHours: "06:00 AM - 06:30 PM",
    roadInfo: "12 min North Road",
    zone: "5-15km",
  },
  {
    id: "panama-kudumbigala",
    name: "Kudumbigala Sanctuary",
    category: "Nature",
    ringTag: "Nature • 24.5 km Ring",
    distanceKm: 24.5,
    duration: "3.0h Hike",
    rating: 4.9,
    reviewsCount: 180,
    description:
      "Granite mountain wilderness with 2,000-year-old rock hermitages, cylindrical stupa, and panoramic vistas over Eastern forest canopy.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    x: 88,
    y: 42,
    openHours: "Sunrise to Sunset",
    roadInfo: "32 min coastal highway",
    zone: "15-25km",
  },
  {
    id: "ampara-peace-pagoda",
    name: "Ampara Peace Pagoda",
    category: "Sacred",
    ringTag: "Sacred • 2.8 km Core",
    distanceKm: 2.8,
    duration: "1.0h Visit",
    rating: 4.7,
    reviewsCount: 220,
    description:
      "Gleaming white dome built overlooking the serene Ampara lake promenade, radiant during golden hour sunsets.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    x: 48,
    y: 52,
    openHours: "06:00 AM - 08:00 PM",
    roadInfo: "5 min town center",
    zone: "0-5km",
  },
];

export default function MapPage() {
  const [activeTab, setActiveTab] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedZone, setSelectedZone] = useState<number>(25);
  const [mapLayer, setMapLayer] = useState<"terrain" | "satellite" | "topo">("terrain");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(mapDestinations[0]);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [visitPlan, setVisitPlan] = useState<Attraction[]>([
    amparaAttractions[0],
    amparaAttractions[3],
    amparaAttractions[2],
  ]);

  const handleTogglePlan = (place: MapPlace) => {
    const matched = amparaAttractions.find((a) => a.id === place.id) || amparaAttractions[0];
    if (visitPlan.some((p) => p.id === matched.id)) {
      setVisitPlan(visitPlan.filter((p) => p.id !== matched.id));
    } else {
      setVisitPlan([...visitPlan, matched]);
    }
  };

  // Filter list
  const filteredPlaces = mapDestinations.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Nature" && p.category === "Nature") ||
      (selectedCategory === "Wildlife" && p.category === "Wildlife") ||
      (selectedCategory === "Sacred" && (p.category === "Sacred" || p.category === "Historical"));

    const matchesZone = p.distanceKm <= selectedZone;

    return matchesSearch && matchesCategory && matchesZone;
  });

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
      
      {/* 1. Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPlan={() => setIsPlanDrawerOpen(true)}
        planCount={visitPlan.length}
      />

      {/* 2. Main Map Dashboard (Split Layout) */}
      <main className="max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6 pt-20 sm:pt-24 pb-4 flex-1 flex flex-col lg:flex-row gap-4 items-stretch">
        
        {/* LEFT PANEL: Explore Places Directory (approx 380px) */}
        <div className="w-full lg:w-[380px] shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between overflow-hidden">
          
          <div className="p-4 sm:p-5 space-y-4">
            
            {/* Panel Title & Count */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black text-slate-900 tracking-tight">
                    Explore Places
                  </h1>
                  <span className="bg-sky-100 text-[#0084d1] text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                    24 SITES
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  25 km radial radius in one view
                </p>
              </div>

              <button
                type="button"
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors cursor-pointer"
                title="Filter Options"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lake, stupa, ruins..."
                className="w-full bg-[#f8fafc] text-xs font-medium text-slate-800 placeholder-slate-400 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0084d1] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: "All", label: "All (24)" },
                { id: "Nature", label: "Nature (9)" },
                { id: "Wildlife", label: "Wildlife (6)" },
                { id: "Sacred", label: "Sacred (7)" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#0084d1] text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Radial Distance Controls */}
            <div className="pt-2 border-t border-slate-150 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold uppercase tracking-wider text-slate-400">
                  RADIAL ZONE DISTANCE
                </span>
                <span className="text-[#0084d1] font-bold">
                  Show 25 km Radar
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { km: 5, label: "Within 5 km" },
                  { km: 15, label: "Within 15 km" },
                  { km: 25, label: "Full 25 km" },
                ].map((z) => (
                  <button
                    key={z.km}
                    type="button"
                    onClick={() => setSelectedZone(z.km)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedZone === z.km
                        ? "bg-[#0084d1] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Scrollable Destinations List */}
          <div className="flex-1 overflow-y-auto max-h-[460px] p-3 sm:p-4 space-y-2.5 divide-y divide-slate-100">
            {filteredPlaces.map((place) => {
              const isSelected = selectedPlace?.id === place.id;
              const isAdded = visitPlan.some((p) => p.id === place.id);

              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex gap-3 items-start ${
                    isSelected
                      ? "bg-sky-50/80 border border-sky-200 shadow-2xs ring-1 ring-sky-300"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-extrabold uppercase text-[#0084d1] tracking-wider truncate">
                        {place.ringTag}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{place.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-black text-slate-900 truncate">
                      {place.name}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                      {place.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-medium">
                        {place.roadInfo}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlan(place);
                        }}
                        className={`font-bold hover:underline cursor-pointer ${
                          isAdded ? "text-emerald-600" : "text-[#0084d1]"
                        }`}
                      >
                        {isAdded ? "✓ Added" : "+ Add to Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Sticky Queue & Planner Link */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                PLANNER PRESET
              </div>
              <div className="text-xs font-black text-slate-900">
                {visitPlan.length} Destinations Queued
              </div>
            </div>

            <Link
              href="/plan"
              className="bg-[#006699] hover:bg-[#0084d1] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Open Planner</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* RIGHT MAIN: Interactive 25KM Radar Map Canvas */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col min-h-[580px] lg:min-h-[720px]">
          
          {/* Top Floating Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            
            {/* Center Benchmark Tag */}
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0084d1] animate-pulse" />
              <span>AMPARA CLOCK TOWER 0.0 KM</span>
              <span className="text-[10px] text-slate-400 font-semibold">• 0.0 km Benchmark Center</span>
            </div>

            {/* Map Layer Switcher */}
            <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-sm text-xs font-bold">
              <button
                type="button"
                onClick={() => setMapLayer("terrain")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mapLayer === "terrain" ? "bg-[#0084d1] text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🗺 Terrain
              </button>
              <button
                type="button"
                onClick={() => setMapLayer("satellite")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mapLayer === "satellite" ? "bg-[#0084d1] text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🛰 Satellite
              </button>
              <button
                type="button"
                onClick={() => setMapLayer("topo")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  mapLayer === "topo" ? "bg-[#0084d1] text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⛰ Topography
              </button>
            </div>

          </div>

          {/* Top Right Route Legend Overlay */}
          <div className="absolute top-16 right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 text-[10px] font-bold text-slate-700 hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-amber-500 rounded-full" />
              <span>A-Class Highway (A25/A4 - Inginiyagala)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-cyan-400 rounded-full" />
              <span>B-Roads &amp; Scenic Corridor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-blue-600 rounded-full" />
              <span>Gal Oya to Deegawapi Radial Loop</span>
            </div>
          </div>

          {/* SVG Map Canvas with Concentric Radar Rings */}
          <div className="flex-1 relative w-full h-full bg-[#eef7fa] overflow-hidden flex items-center justify-center">
            
            <svg
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
              viewBox="0 0 1000 800"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Background Geographic Soft Landmasses */}
              <path
                d="M 50 200 Q 200 100 450 160 T 850 220 Q 950 400 800 650 T 200 700 Q 50 500 50 200 Z"
                fill="#e2f3ea"
                opacity="0.7"
              />

              {/* Water Reservoir Basin (Senanayake Samudraya) */}
              <path
                d="M 220 280 Q 320 220 440 280 T 520 380 Q 420 460 300 420 T 220 280 Z"
                fill="#bfe9f7"
                stroke="#67e8f9"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Highway lines */}
              <path
                d="M 500 400 L 350 336"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 500 400 L 720 464"
                stroke="#0284c7"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                fill="none"
              />
              <path
                d="M 500 400 L 620 264"
                stroke="#38bdf8"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 350 336 Q 500 200 720 464"
                stroke="#0284c7"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.6"
              />

              {/* 5 Concentric Radar Rings (5km, 10km, 15km, 20km, 25km) */}
              {[
                { r: 70, label: "5 KM INNER" },
                { r: 140, label: "10 KM" },
                { r: 210, label: "15 KM INTERMEDIATE" },
                { r: 280, label: "20 KM" },
                { r: 350, label: "25 KM HORIZON" },
              ].map((ring, idx) => (
                <g key={idx}>
                  <circle
                    cx="500"
                    cy="400"
                    r={ring.r}
                    fill={idx === 4 ? "url(#radarGradient)" : "none"}
                    stroke="#0284c7"
                    strokeWidth="1.2"
                    strokeDasharray={idx === 4 ? "none" : "3 3"}
                    opacity={idx === 4 ? "0.9" : "0.4"}
                  />
                  <text
                    x="505"
                    y={400 - ring.r + 14}
                    fill="#0284c7"
                    fontSize="9"
                    fontWeight="bold"
                    opacity="0.75"
                  >
                    {ring.label}
                  </text>
                </g>
              ))}

              {/* Gradient definition for radar sweep */}
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.02" />
                  <stop offset="85%" stopColor="#0284c7" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.18" />
                </radialGradient>
              </defs>

              {/* Center Hub: Ampara City Center (0.0 KM) */}
              <g transform="translate(500, 400)">
                <circle cx="0" cy="0" r="16" fill="#0084d1" opacity="0.2" className="animate-ping" />
                <circle cx="0" cy="0" r="9" fill="#0084d1" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="900">
                  AMPARA CITY CENTER (0.0 KM)
                </text>
              </g>

              {/* Interactive Location Pins */}
              {filteredPlaces.map((place) => {
                // Map coordinates percentage to svg viewBox (1000 x 800)
                const px = (place.x / 100) * 1000;
                const py = (place.y / 100) * 800;
                const isSelected = selectedPlace?.id === place.id;

                return (
                  <g
                    key={place.id}
                    transform={`translate(${px}, ${py})`}
                    onClick={() => setSelectedPlace(place)}
                    className="cursor-pointer group"
                  >
                    {isSelected && (
                      <circle cx="0" cy="0" r="22" fill="#0084d1" opacity="0.3" className="animate-pulse" />
                    )}
                    
                    {/* Pin Marker Background */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "14" : "11"}
                      fill={
                        place.category === "Nature"
                          ? "#0284c7"
                          : place.category === "Wildlife"
                          ? "#059669"
                          : "#7c3aed"
                      }
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="transition-all duration-300 transform group-hover:scale-115"
                    />

                    {/* Pin Icon / Dot */}
                    <circle cx="0" cy="0" r="4" fill="#ffffff" />

                    {/* Pin Label */}
                    <text
                      x="0"
                      y={isSelected ? "26" : "22"}
                      textAnchor="middle"
                      fill="#1e293b"
                      fontSize="10"
                      fontWeight="bold"
                      className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                    >
                      {place.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* ACTIVE INTERACTIVE DESTINATION POPUP CARD */}
            {selectedPlace && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/90 animate-scaleUp">
                
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Top Image Banner */}
                <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                  <Image
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                    <span className="bg-sky-500/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      SANCTUARY &amp; WILDLIFE RING
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>{selectedPlace.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Card Title & Rating */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {selectedPlace.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-black shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{selectedPlace.rating}</span>
                      <span className="text-slate-400 font-normal text-[10px]">({selectedPlace.reviewsCount}+)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {selectedPlace.description}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <Check className="w-3 h-3" />
                      <span>{selectedPlace.openHours}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      <Car className="w-3 h-3 text-[#0084d1]" />
                      <span>{selectedPlace.roadInfo}</span>
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/attraction/${selectedPlace.id}`}
                      className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-center text-xs font-bold text-slate-800 transition-colors"
                    >
                      View Guide
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleTogglePlan(selectedPlace)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        visitPlan.some((p) => p.id === selectedPlace.id)
                          ? "bg-emerald-600 text-white"
                          : "bg-[#0084d1] hover:bg-[#0070b3] text-white"
                      }`}
                    >
                      {visitPlan.some((p) => p.id === selectedPlace.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Map Legend Bar */}
          <div className="bg-white/95 backdrop-blur-md px-4 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0084d1]" /> Main Landmark
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Conservation Water
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Monastic Hermitages
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Wildlife Corridors
              </span>
            </div>

            {/* Bottom Right Map Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setSelectedPlace(mapDestinations[0]);
                }}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Recenter Radar"
              >
                <LocateFixed className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* 3. Global Footer */}
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
                Guiding ancient stupas, untouched reservoir sanctuaries, and coastal peripheries nestled strictly within a 25 km radius of Ampara. Travel thoughtfully with genuine regional insight.
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
                    Radar Zone Map
                  </Link>
                </li>
                <li>
                  <Link href="/plan" className="hover:text-[#0084d1] transition-colors">
                    One-Day Visit Planner
                  </Link>
                </li>
                <li>
                  <Link href="/#explore" className="hover:text-[#0084d1] transition-colors">
                    Ancient Forest
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                HERITAGE &amp; WILDLIFE
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                A 2,500-year-old ecological conservation index showcasing Senanayake Samudraya, Dighavapi, and Buddhangala sacred monasteries.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © 2024 Ampara Explore • Sri Lanka Tourism Development Authority aligned.
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
        visitPlan={visitPlan}
        onRemove={(remId) => setVisitPlan(visitPlan.filter((p) => p.id !== remId))}
        onClear={() => setVisitPlan([])}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}
