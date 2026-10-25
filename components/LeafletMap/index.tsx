"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface LeafletPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category: "Nature" | "Wildlife" | "Sacred" | "Historical";
}

export interface RoutePoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
}

const mapCenter: [number, number] = [7.291, 81.672];

const tileLayers = {
  terrain: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics",
  },
  topo: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://opentopomap.org">OpenTopoMap</a>',
  },
};

function MapZoomController({ zoomLevel }: { zoomLevel: number }) {
  const map = useMap();

  useEffect(() => {
    map.setZoom(Math.round(10 + (zoomLevel - 1) * 3));
  }, [map, zoomLevel]);

  return null;
}

function MapFitBounds({ routePoints }: { routePoints: RoutePoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (routePoints.length >= 2) {
      const bounds = L.latLngBounds(
        routePoints.map((p) => [p.latitude, p.longitude] as [number, number]),
      );
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    }
  }, [map, routePoints]);

  return null;
}

function markerColor(category: LeafletPlace["category"]) {
  if (category === "Wildlife") return "#059669";
  if (category === "Sacred" || category === "Historical") return "#7c3aed";
  return "#0284c7";
}

function createPlaceIcon(place: LeafletPlace, isSelected: boolean) {
  const color = markerColor(place.category);
  const selectedClass = isSelected ? " is-selected" : "";

  return L.divIcon({
    className: "ampara-place-marker",
    html: `<span class="ampara-place-marker__dot${selectedClass}" style="background-color:${color}"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function createRouteStopIcon(order: number) {
  return L.divIcon({
    className: "ampara-route-stop-marker",
    html: `
      <div style="
        width:28px;height:28px;border-radius:50%;
        background:#f59e0b;border:2.5px solid #92400e;
        display:flex;align-items:center;justify-content:center;
        font-size:11px;font-weight:900;color:#fff;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        font-family:system-ui,sans-serif;
      ">${order}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function LeafletMap({
  places,
  selectedPlace,
  selectedZone,
  mapLayer,
  zoomLevel,
  onSelectPlace,
  routePoints = [],
}: {
  places: LeafletPlace[];
  selectedPlace: LeafletPlace | null;
  selectedZone: number;
  mapLayer: keyof typeof tileLayers;
  zoomLevel: number;
  onSelectPlace: (place: LeafletPlace) => void;
  routePoints?: RoutePoint[];
}) {
  const layer = tileLayers[mapLayer];
  const isRouteMode = routePoints.length > 0;

  const routeLatLngs: [number, number][] = routePoints.map((p) => [
    p.latitude,
    p.longitude,
  ]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={10}
      scrollWheelZoom
      className="absolute inset-0 z-0 h-full w-full"
    >
      <TileLayer url={layer.url} attribution={layer.attribution} />

      {/* Radar circle only in normal explore mode */}
      {!isRouteMode && (
        <Circle
          center={mapCenter}
          radius={selectedZone * 1000}
          pathOptions={{
            color: "#0284c7",
            fillColor: "#38bdf8",
            fillOpacity: 0.08,
            weight: 2,
            dashArray: "6 6",
          }}
        />
      )}

      <Marker
        position={mapCenter}
        icon={L.divIcon({
          className: "ampara-center-marker",
          html: '<span class="ampara-center-marker__dot"></span>',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        })}
        title="Ampara City Center"
      />

      {/* Route polyline with glow effect */}
      {isRouteMode && routeLatLngs.length >= 2 && (
        <>
          {/* Glow shadow */}
          <Polyline
            positions={routeLatLngs}
            pathOptions={{
              color: "#f59e0b",
              weight: 12,
              opacity: 0.15,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
          {/* Main animated dashed route */}
          <Polyline
            positions={routeLatLngs}
            pathOptions={{
              color: "#f59e0b",
              weight: 4,
              opacity: 0.95,
              dashArray: "10 8",
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </>
      )}

      {/* Numbered route stop markers */}
      {isRouteMode &&
        routePoints.map((rp) => (
          <Marker
            key={`route-${rp.id}`}
            position={[rp.latitude, rp.longitude]}
            icon={createRouteStopIcon(rp.order)}
            title={`Stop ${rp.order}: ${rp.name}`}
            eventHandlers={{
              click: () => {
                const found = places.find((p) => p.id === rp.id);
                if (found) onSelectPlace(found);
              },
            }}
          />
        ))}

      {/* Regular place markers (explore mode only) */}
      {!isRouteMode &&
        places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{ click: () => onSelectPlace(place) }}
            icon={createPlaceIcon(place, selectedPlace?.id === place.id)}
            title={place.name}
          />
        ))}

      {/* Auto-fit bounds to route when in route mode */}
      {isRouteMode && <MapFitBounds routePoints={routePoints} />}
      <MapZoomController zoomLevel={zoomLevel} />
    </MapContainer>
  );
}
