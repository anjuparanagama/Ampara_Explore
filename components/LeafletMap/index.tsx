"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
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

function markerColor(category: LeafletPlace["category"]) {
  if (category === "Wildlife") return "#059669";
  if (category === "Sacred" || category === "Historical") return "#7c3aed";
  return "#0284c7";
}

function createPlaceIcon(
  place: LeafletPlace,
  isSelected: boolean,
) {
  const color = markerColor(place.category);
  const selectedClass = isSelected ? " is-selected" : "";

  return L.divIcon({
    className: "ampara-place-marker",
    html: `<span class="ampara-place-marker__dot${selectedClass}" style="background-color:${color}"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export default function LeafletMap({
  places,
  selectedPlace,
  selectedZone,
  mapLayer,
  zoomLevel,
  onSelectPlace,
}: {
  places: LeafletPlace[];
  selectedPlace: LeafletPlace | null;
  selectedZone: number;
  mapLayer: keyof typeof tileLayers;
  zoomLevel: number;
  onSelectPlace: (place: LeafletPlace) => void;
}) {
  const layer = tileLayers[mapLayer];

  return (
    <MapContainer
      center={mapCenter}
      zoom={10}
      scrollWheelZoom
      className="absolute inset-0 z-0 h-full w-full"
    >
      <TileLayer url={layer.url} attribution={layer.attribution} />
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
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          eventHandlers={{ click: () => onSelectPlace(place) }}
          icon={createPlaceIcon(place, selectedPlace?.id === place.id)}
          title={place.name}
        />
      ))}
      <MapZoomController zoomLevel={zoomLevel} />
    </MapContainer>
  );
}
