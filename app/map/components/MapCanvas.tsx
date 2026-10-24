"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapCanvasProps } from "@/interface";
import MapControlBar from "./MapControlBar";
import MapRouteLegend from "./MapRouteLegend";
import MapPlacePopup from "./MapPlacePopup";
import MapLegendBar from "./MapLegendBar";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function MapCanvas({
  filteredPlaces,
  allPlaces,
  selectedPlace,
  onSelectPlace,
  selectedZone,
  mapLayer,
  setMapLayer,
  zoomLevel,
  setZoomLevel,
  onRecenter,
  visitPlan,
  onTogglePlan,
}: MapCanvasProps) {
  return (
    <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] relative overflow-hidden flex flex-col min-h-[620px] lg:min-h-[720px]">
      {/* Top Floating Control Bar */}
      <MapControlBar mapLayer={mapLayer} setMapLayer={setMapLayer} />

      {/* Top Right Route Legend Overlay */}
      <MapRouteLegend />

      {/* Map Canvas with Concentric Radar Rings & Leaflet */}
      <div className="flex-1 relative w-full h-full bg-[#eef7fa] overflow-hidden flex items-center justify-center">
        <LeafletMap
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          selectedZone={selectedZone}
          mapLayer={mapLayer}
          zoomLevel={zoomLevel}
          onSelectPlace={(place) => {
            const matchingPlace = allPlaces.find(
              (destination) => destination.id === place.id,
            );
            if (matchingPlace) onSelectPlace(matchingPlace);
          }}
        />

        {/* ACTIVE INTERACTIVE DESTINATION POPUP CARD */}
        {selectedPlace && (
          <MapPlacePopup
            place={selectedPlace}
            onClose={() => onSelectPlace(null)}
            isInPlan={visitPlan.some((p) => p.id === selectedPlace.id)}
            onTogglePlan={onTogglePlan}
          />
        )}
      </div>

      {/* Bottom Map Legend Bar */}
      <MapLegendBar
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        onRecenter={onRecenter}
      />
    </div>
  );
}
