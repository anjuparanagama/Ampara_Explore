"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Info,
  Sunrise,
  Trees,
  Sun,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import type { Attraction } from "@/data/amparaData";
import {
  type AttractionDetail,
  getCategoryBadgeColor,
} from "@/lib/attractions";

function AttractionDetailContent() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const [attraction, setAttraction] = useState<AttractionDetail | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [visitPlan, setVisitPlan] = useState<Attraction[]>([]);

  // Fetch attraction details from database
  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(`/api/attractions/${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Destination not found"
              : "Unable to load destination details",
          );
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAttraction(data.attraction);
          setNearbyPlaces(data.nearby || []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Unable to load destination.",
          );
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Load user's saved visit plan
  useEffect(() => {
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
      .catch(() => {});
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#0084d1] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-sm font-bold text-slate-700">
            Loading Destination Details...
          </div>
        </div>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {error || "Destination Not Found"}
          </h2>
          <p className="text-sm text-slate-500">
            The attraction you are looking for is unavailable or has been moved.
          </p>
          <Link
            href="/#explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0084d1] text-white text-xs font-bold hover:bg-[#0070b3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const googleMapsUrl =
    attraction.latitude && attraction.longitude
      ? `https://maps.google.com/?q=${attraction.latitude},${attraction.longitude}`
      : `https://maps.google.com/?q=${encodeURIComponent(attraction.name + " " + attraction.location)}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* Top Breadcrumb Bar */}
      <div className="w-full px-4 sm:px-8 py-3">
        <div className="max-w-[1370px] mx-auto flex items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="hover:text-[#0084d1]">
              Home
            </Link>
            <span>/</span>
            <Link href="/#explore" className="hover:text-[#0084d1]">
              Explore
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-none">
              {attraction.name}
            </span>
          </div>

          <Link
            href="/#explore"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0084d1] font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Explore Directory</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="!max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 space-y-6 flex-1">
        {/* Hero Visual Gallery Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:items-start">
          <div className="lg:col-span-7 space-y-4">
            {/* Main Large Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 border border-slate-200/80 shadow-md group">
              <Image
                src={attraction.image}
                alt={attraction.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/50" />

              {/* Top Bar Badges & Actions */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span className="uppercase">
                      {attraction.radialZone} RING
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{attraction.distanceKm} km from Ampara Town</span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
                      isFavorite
                        ? "bg-red-500/90 border-red-400 text-white"
                        : "bg-slate-900/50 border-white/20 text-white hover:bg-white hover:text-red-500"
                    }`}
                    title="Favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        typeof window !== "undefined" &&
                        navigator.clipboard
                      ) {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Destination link copied to clipboard!");
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
                    title="Share destination"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Title & Badges */}
              <div className="relative z-10 space-y-2 mt-auto pt-16">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 ${attraction.tagColor} text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs`}
                  >
                    {attraction.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>
                      {attraction.rating} ({attraction.reviewsCount}+ Reviews)
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{attraction.duration}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {attraction.name}
                </h1>

                <p className="text-slate-200 text-xs sm:text-sm font-medium">
                  {attraction.subtitle}
                </p>
              </div>
            </div>

            {/* Supporting Gallery Thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {attraction.galleryImages.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-28 sm:h-36 rounded-2xl overflow-hidden border border-slate-200/80 group bg-slate-100"
                >
                  <Image
                    src={img.url}
                    alt={img.caption || attraction.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white flex items-center gap-1 drop-shadow-sm">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* About section beside the image gallery */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-lg font-black text-slate-900">
              <Info className="w-5 h-5 text-[#0084d1]" />
              <h2>{attraction.aboutTitle}</h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              {attraction.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {attraction.quote && (
              <div className="bg-sky-50/70 border-l-4 border-[#0084d1] rounded-r-2xl p-4 text-xs italic text-slate-700 leading-relaxed font-medium">
                &ldquo;{attraction.quote}&rdquo;
              </div>
            )}

            {attraction.highlights.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Featured Highlights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {attraction.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs font-semibold text-slate-800 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#0084d1] shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Visitor Guide & Field Tips Section */}
        {attraction.tips.length > 0 && (
          <section className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">
                Visitor Guide &amp; Field Tips
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Updated Season 2024 / 2025
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {attraction.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between hover:shadow-sm transition-shadow"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center mb-3">
                      {tip.icon === "sunrise" ? (
                        <Sunrise className="w-4 h-4" />
                      ) : tip.icon === "trees" ? (
                        <Trees className="w-4 h-4" />
                      ) : (
                        <Sun className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-sm font-bold text-slate-900 leading-snug">
                      {tip.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {tip.desc}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-[#0084d1] pt-2">
                    Explorer Guideline →
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location & Access Navigation Section */}
        <section
          id="location-map"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                25 KM PHYSICAL RADIAL HORIZON
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Location &amp; Access Navigation
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Navigable Route</span>
            </span>
          </div>

          {/* Map Graphic Box */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#e5f3f0]">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Regional Terrain Water & Land */}
              <path
                d="M 120 160 Q 250 110 380 150 T 560 200 Q 660 250 730 210 L 790 330 Q 570 390 390 350 Q 210 390 100 290 Z"
                fill="#bbf0f7"
                stroke="#67e8f9"
                strokeWidth="3"
              />
              <circle cx="200" cy="220" r="140" fill="#dcfce7" opacity="0.6" />
              <circle cx="520" cy="250" r="160" fill="#dcfce7" opacity="0.6" />

              {/* Road lines */}
              <path
                d="M 80 80 Q 260 140 450 190 T 700 240"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
              />
              <path
                d="M 100 350 Q 280 280 460 210 T 720 120"
                stroke="#0284c7"
                strokeWidth="5"
                fill="none"
              />

              {/* Destination Pin */}
              <g transform="translate(460, 200)">
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#ef4444"
                  className="animate-ping"
                  opacity="0.75"
                />
                <circle cx="0" cy="0" r="8" fill="#ef4444" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text
                  x="14"
                  y="5"
                  fill="#0f172a"
                  fontSize="13"
                  fontWeight="900"
                >
                  {attraction.name}
                </text>
              </g>

              {/* Ampara Town Departure Pin */}
              <g transform="translate(100, 350)">
                <circle cx="0" cy="0" r="8" fill="#0284c7" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text
                  x="15"
                  y="5"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Ampara Clock Tower (0.0 km)
                </text>
              </g>
            </svg>

            {/* Bottom floating route badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/90 shadow-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0084d1]" />
                  <span>
                    {attraction.distanceKm} km from Ampara Clock Tower
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {attraction.routeDesc}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.open(googleMapsUrl, "_blank");
                }}
                className="bg-[#0084d1] hover:bg-[#0070b3] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer shrink-0"
              >
                Google Maps GPS
              </button>
            </div>
          </div>

          {/* 3 Waypoint Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Ampara Town Hub
                </div>
                <div className="text-[10px] text-slate-500">
                  0.0 km departure point
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {attraction.location}
                </div>
                <div className="text-[10px] text-slate-500">
                  {attraction.radialZone} sector
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {attraction.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {attraction.distanceKm} km destination
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Places to Explore Nearby Section */}
        {nearbyPlaces.length > 0 && (
          <section className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                  ⭐ 25KM RADIAL CIRCUIT
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  More Places to Explore Nearby
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Coordinate seamless, multi-stop itineraries reachable within a
                  20-30 minute drive.
                </p>
              </div>

              <Link
                href="/#explore"
                className="text-xs font-bold text-[#0084d1] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <span>Explore All 25km Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Nearby Attraction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {nearbyPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs ${getCategoryBadgeColor(place.category)} text-white`}
                      >
                        {place.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                      {place.distanceKm} km away
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({place.reviewsCount}+ reviews)
                        </span>
                      </div>

                      <Link
                        href={`/attraction/${place.id}`}
                        className="text-base font-black text-slate-900 group-hover:text-[#0084d1] transition-colors leading-snug block mb-1.5"
                      >
                        {place.name}
                      </Link>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {place.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/attraction/${place.id}`}
                        className="text-xs font-bold text-slate-700 group-hover:text-[#0084d1] transition-colors"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/attraction/${place.id}`}
                        className="w-7 h-7 rounded-full bg-sky-100 text-[#0084d1] group-hover:bg-[#0084d1] group-hover:text-white flex items-center justify-center transition-all"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regional Respect Banner */}
        <section className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-emerald-950">
                Visiting Sacred &amp; Ecological Sites in Ampara
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-800/90 mt-0.5">
                Observe modest dress code at temples, zero plastic littering,
                and 50m safe buffer distance from wildlife.
              </div>
            </div>
          </div>

          <Link
            href="/cultural-guidelines"
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shrink-0 text-center"
          >
            Read Cultural Guidelines
          </Link>
        </section>
      </main>

      {/* Slide-Over Plan Drawer */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={visitPlan}
        onRemove={(remId) =>
          setVisitPlan(visitPlan.filter((p) => p.id !== remId))
        }
        onClear={() => setVisitPlan([])}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function AttractionDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f6fa] flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#0084d1] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-sm font-bold text-slate-700">
              Loading Destination Details...
            </div>
          </div>
        </div>
      }
    >
      <AttractionDetailContent />
    </Suspense>
  );
}
