"use client";

import React, { useEffect, useState } from "react";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";
import {
  MapPlace,
  MapLayerType,
  initialMapDestinations,
} from "@/interface";
import { MapSidebar, MapCanvas } from "./components";

export default function MapPage() {
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
          rating: Number(row.rating || 0),
          reviewsCount: Number(row.reviews_count || 0),
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
            distanceKm <= 5
              ? "0-5km"
              : distanceKm <= 15
                ? "5-15km"
                : "15-25km",
          latitude,
          longitude,
        };

        return [existingPlace ? { ...existingPlace, ...place } : place];
      });

      const databasePlaceIds = new Set(databasePlaces.map((place) => place.id));
      setMapDestinations([
        ...initialMapDestinations.filter(
          (place) => !databasePlaceIds.has(place.id),
        ),
        ...databasePlaces,
      ]);
    };

    void loadDatabasePlaces().catch((error) => {
      console.error("Failed to load database map destinations", error);
    });
  }, []);

  const [visitPlan, setVisitPlan] = useState<Attraction[]>([
    amparaAttractions[0],
    amparaAttractions[3],
    amparaAttractions[2],
  ]);

  const handleTogglePlan = (place: MapPlace) => {
    const matched =
      amparaAttractions.find((a) => a.id === place.id) || amparaAttractions[0];
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
      (selectedCategory === "Sacred" &&
        (p.category === "Sacred" || p.category === "Historical"));

    const matchesZone = p.distanceKm <= selectedZone;

    return matchesSearch && matchesCategory && matchesZone;
  });

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#0284c7] selection:text-white flex flex-col justify-between">
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
          filteredPlaces={filteredPlaces}
          selectedPlace={selectedPlace}
          onSelectPlace={setSelectedPlace}
          visitPlan={visitPlan}
          onTogglePlan={handleTogglePlan}
        />

        {/* RIGHT MAIN: Interactive 25KM Radar Map Canvas */}
        <MapCanvas
          filteredPlaces={filteredPlaces}
          allPlaces={mapDestinations}
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
