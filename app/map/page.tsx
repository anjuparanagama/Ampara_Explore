"use client";

import React, { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { Attraction } from "@/data/amparaData";
import { MapPlace, MapLayerType, initialMapDestinations } from "@/interface";
import { RoutePoint } from "@/components/LeafletMap";
import { MapSidebar, MapCanvas } from "./components";
import { MapPin, Route, X } from "lucide-react";

function MapPageInner() {
  const searchParams = useSearchParams();
  const planStopsParam = searchParams.get("planStops");
  const planStopNamesParam = searchParams.get("planStopNames");
  const planTitleParam = searchParams.get("planTitle");

  // Parsed stop IDs and names from query params (order preserved)
  const planStopIds = useMemo<string[]>(() => {
    if (!planStopsParam) return [];
    return planStopsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [planStopsParam]);

  const planStopNames = useMemo<string[]>(() => {
    if (!planStopNamesParam) return [];
    return planStopNamesParam
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [planStopNamesParam]);

  const isRouteMode = planStopIds.length > 0 || planStopNames.length > 0;

  const [mapDestinations, setMapDestinations] = useState<MapPlace[]>(
    initialMapDestinations,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedZone, setSelectedZone] = useState<number>(25);
  const [mapLayer, setMapLayer] = useState<MapLayerType>("terrain");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(
    initialMapDestinations[0],
  );
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [routeBannerDismissed, setRouteBannerDismissed] = useState(false);

  useEffect(() => {
    const loadDatabasePlaces = async () => {
      const response = await fetch("/api/attractions?radius=25", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Unable to load map destinations.");

      const result = (await response.json()) as {
        attractions?: Array<Record<string, unknown>>;
      };
      const databasePlaces = (result.attractions || []).flatMap((row) => {
        const latitude = Number(row.latitude);
        const longitude = Number(row.longitude);
        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          latitude < -90 ||
          latitude > 90 ||
          longitude < -180 ||
          longitude > 180
        ) {
          return [];
        }

        const categoryName = String(row.category_name || "").toLowerCase();
        const category: MapPlace["category"] = categoryName.includes("wildlife")
          ? "Wildlife"
          : categoryName.includes("sacred") ||
              categoryName.includes("religious")
            ? "Sacred"
            : categoryName.includes("historical")
              ? "Historical"
              : "Nature";
        const distanceKm = Number(row.distance_km || 0);
        const slug = String(row.slug || row.id);
        const existingPlace = initialMapDestinations.find(
          (place) => place.id === slug,
        );

        const place: MapPlace = {
          id: slug,
          name: String(row.name || "Unnamed destination"),
          category,
          ringTag: `${category} • ${distanceKm} km`,
          distanceKm,
          duration: String(row.duration || "Visit details available"),
          description: String(row.description || ""),
          image:
            typeof row.image === "string" && row.image.startsWith("/")
              ? row.image
              : "/images/hero-bg.jpg",
          x: existingPlace?.x || 50,
          y: existingPlace?.y || 50,
          openHours: existingPlace?.openHours || "Open Access Entry",
          roadInfo: existingPlace?.roadInfo || "See location details",
          zone:
            distanceKm <= 5 ? "0-5km" : distanceKm <= 15 ? "5-15km" : "15-25km",
          latitude,
          longitude,
        };

        return [existingPlace ? { ...existingPlace, ...place } : place];
      });

      if (databasePlaces.length > 0) {
        setMapDestinations(databasePlaces);
        setSelectedPlace((current) => {
          if (!current) return databasePlaces[0];
          const found = databasePlaces.find((p) => p.id === current.id);
          return found || databasePlaces[0];
        });
      }
    };

    void loadDatabasePlaces().catch((error) => {
      console.error("Failed to load database map destinations", error);
    });

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

  const [visitPlan, setVisitPlan] = useState<Attraction[]>([]);

  // Build routePoints from the loaded attractions matched by planStopIds / planStopNames (order preserved)
  const routePoints = useMemo<RoutePoint[]>(() => {
    if (!isRouteMode || mapDestinations.length === 0) return [];
    const points: RoutePoint[] = [];
    const matchedPlaceIds = new Set<string>();

    const normalize = (str: string) =>
      str.toLowerCase().replace(/[^a-z0-9]/g, "");

    const count = Math.max(planStopIds.length, planStopNames.length);
    for (let index = 0; index < count; index++) {
      const stopId = planStopIds[index] || "";
      const stopName = planStopNames[index] || "";
      const normId = normalize(stopId);
      const normName = stopName ? normalize(stopName) : "";

      const place = mapDestinations.find((p) => {
        const pNormId = normalize(p.id);
        const pNormName = normalize(p.name);
        return (
          (stopId && (p.id === stopId || pNormId === normId)) ||
          (stopId &&
            (stopId.startsWith(`stop-${p.id}-`) ||
              stopId === `stop-${p.id}`)) ||
          (normName &&
            (pNormName === normName ||
              pNormName.includes(normName) ||
              normName.includes(pNormName))) ||
          (normId.length > 3 &&
            (normId.includes(pNormId) || pNormName.includes(normId)))
        );
      });

      if (place && !matchedPlaceIds.has(place.id)) {
        matchedPlaceIds.add(place.id);
        points.push({
          id: place.id,
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          order: points.length + 1,
        });
      }
    }
    return points;
  }, [isRouteMode, planStopIds, planStopNames, mapDestinations]);

  // In route mode, only show the route's stops in the map/sidebar
  const routeFilteredPlaces = useMemo(() => {
    if (!isRouteMode) return [];
    const matchedIds = new Set(routePoints.map((rp) => rp.id));
    return mapDestinations.filter((p) => matchedIds.has(p.id));
  }, [isRouteMode, routePoints, mapDestinations]);

  const handleTogglePlan = (place: MapPlace) => {
    const matched: Attraction = {
      id: place.id,
      name: place.name,
      category: place.category,
      distanceKm: place.distanceKm,
      duration: place.duration,
      description: place.description,
      highlights: [],
      image: place.image,
      radialZone: place.zone,
      location: place.roadInfo,
    };
    if (visitPlan.some((p) => p.id === matched.id)) {
      setVisitPlan(visitPlan.filter((p) => p.id !== matched.id));
    } else {
      setVisitPlan([...visitPlan, matched]);
    }
  };

  const handleRecenter = () => {
    setZoomLevel(1);
    setSelectedPlace(mapDestinations[0] || null);
  };

  // Filter list (only used in explore mode)
  const filteredPlaces = mapDestinations.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Nature" && p.category === "Nature") ||
      (selectedCategory === "Wildlife" && p.category === "Wildlife") ||
      (selectedCategory === "Sacred" &&
        (p.category === "Sacred" || p.category === "Historical"));

    const matchesZone = p.distanceKm <= selectedZone;

    return matchesSearch && matchesCategory && matchesZone;
  });

  const displayPlaces = isRouteMode ? routeFilteredPlaces : filteredPlaces;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">

      {/* Plan Route Mode Banner */}
      {isRouteMode && !routeBannerDismissed && (
        <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-8 pt-3">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-2xl text-sm shadow-sm">
            <Route className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="font-bold text-amber-800">Route Mode: </span>
              <span className="text-amber-700 font-medium">
                {planTitleParam
                  ? `Showing route for "${planTitleParam}"`
                  : "Showing your plan route"}
              </span>
              <span className="text-amber-600 ml-2 text-xs">
                — {routePoints.length} stop{routePoints.length !== 1 ? "s" : ""} mapped
                {routePoints.length <
                Math.max(planStopIds.length, planStopNames.length)
                  ? ` (${Math.max(planStopIds.length, planStopNames.length) - routePoints.length} stop(s) not found in map)`
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {routePoints.map((rp) => (
                <span
                  key={rp.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 border border-amber-300 rounded-full text-[10px] font-bold text-amber-800"
                >
                  <MapPin className="w-2.5 h-2.5" />
                  {rp.order}. {rp.name}
                </span>
              ))}
              <button
                type="button"
                onClick={() => setRouteBannerDismissed(true)}
                className="p-1 rounded-lg hover:bg-amber-100 text-amber-500 hover:text-amber-700 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Map Dashboard (Split Layout) */}
      <main className="max-w-[1600px] w-full mx-auto px-3 sm:px-5 lg:px-8 pt-4 sm:pt-5 pb-6 sm:pb-8 flex-1 flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch">
        {/* LEFT PANEL: Explore Places Directory */}
        <MapSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          filteredPlaces={displayPlaces}
          allPlaces={isRouteMode ? routeFilteredPlaces : mapDestinations}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
          visitPlan={visitPlan}
          onTogglePlan={handleTogglePlan}
        />

        {/* RIGHT MAIN: Interactive 25KM Radar Map Canvas */}
        <MapCanvas
          filteredPlaces={displayPlaces}
          allPlaces={isRouteMode ? routeFilteredPlaces : mapDestinations}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
          selectedZone={selectedZone}
          mapLayer={mapLayer}
          setMapLayer={setMapLayer}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          onRecenter={handleRecenter}
          visitPlan={visitPlan}
          onTogglePlan={handleTogglePlan}
          routePoints={routePoints}
        />
      </main>

      {/* Drawers & Modals */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={visitPlan}
        onRemove={(remId) =>
          setVisitPlan(visitPlan.filter((p) => p.id !== remId))
        }
        onClear={() => setVisitPlan([])}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MapPageInner />
    </Suspense>
  );
}
