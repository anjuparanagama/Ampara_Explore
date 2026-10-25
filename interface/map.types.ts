import { Attraction } from "@/data/amparaData";
import { RoutePoint } from "@/components/LeafletMap";

export interface MapPlace {
  id: string;
  name: string;
  category: "Nature" | "Wildlife" | "Sacred" | "Historical";
  ringTag: string;
  distanceKm: number;
  duration: string;
  description: string;
  image: string;
  x: number; // Percentage coordinate on map canvas (0-100)
  y: number; // Percentage coordinate on map canvas (0-100)
  openHours: string;
  roadInfo: string;
  zone: "0-5km" | "5-15km" | "15-25km";
  latitude: number;
  longitude: number;
}

export type MapLayerType = "terrain" | "satellite" | "topo";

export interface MapPlaceCardProps {
  place: MapPlace;
  isSelected: boolean;
  isAdded?: boolean;
  onSelect: () => void;
  onTogglePlan?: (e: React.MouseEvent) => void;
}

export interface MapSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedZone: number;
  setSelectedZone: (zone: number) => void;
  filteredPlaces: MapPlace[];
  allPlaces?: MapPlace[];
  selectedPlace: MapPlace | null;
  onSelectPlace: (place: MapPlace) => void;
  visitPlan: Attraction[];
  onTogglePlan: (place: MapPlace) => void;
}

export interface MapControlBarProps {
  mapLayer: MapLayerType;
  setMapLayer: (layer: MapLayerType) => void;
}

export interface MapPlacePopupProps {
  place: MapPlace;
  onClose: () => void;
  isInPlan?: boolean;
  onTogglePlan?: (place: MapPlace) => void;
}

export interface MapLegendBarProps {
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  onRecenter: () => void;
}

export interface MapCanvasProps {
  filteredPlaces: MapPlace[];
  allPlaces: MapPlace[];
  selectedPlace: MapPlace | null;
  onSelectPlace: (place: MapPlace | null) => void;
  selectedZone: number;
  mapLayer: MapLayerType;
  setMapLayer: (layer: MapLayerType) => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  onRecenter: () => void;
  visitPlan: Attraction[];
  onTogglePlan: (place: MapPlace) => void;
  routePoints?: RoutePoint[];
}

export const initialMapDestinations: MapPlace[] = [
  {
    id: "senanayake-samudraya",
    name: "Senanayake Samudraya",
    category: "Nature",
    ringTag: "Nature • 18.2 km Ring",
    distanceKm: 18.2,
    duration: "2.5-3.5h Visit",
    description:
      "Sri Lanka's monumental inland ocean surrounded by lush jungle peaks, water fishing safaris, and swimming wild elephants across islets.",
    image: "/images/hero-bg.jpg",
    x: 35,
    y: 42,
    openHours: "Open Access Entry",
    roadInfo: "18 min via A25 Highway",
    zone: "15-25km",
    latitude: 7.274,
    longitude: 81.527,
  },
  {
    id: "gal-oya-national-park",
    name: "Gal Oya Elephant Corridor",
    category: "Wildlife",
    ringTag: "Wildlife • 18.2 km",
    distanceKm: 18.2,
    duration: "3-4h Safari",
    description:
      "Swimming elephant packs across tranquil lake channels, pristine rainforest canopy, and protected bird breeding grounds.",
    image: "/images/gal-oya-elephants.jpg",
    x: 62,
    y: 50,
    openHours: "06:00 AM - 06:00 PM",
    roadInfo: "22 min via B350 Road",
    zone: "15-25km",
    latitude: 7.098,
    longitude: 81.502,
  },
  {
    id: "deegawapi-stupa",
    name: "Deegawapi Stupa & Vihara",
    category: "Sacred",
    ringTag: "Sacred • 16.8 km",
    distanceKm: 16.8,
    duration: "1.5-2.0h Visit",
    description:
      "Solosmasthana ancient pilgrimage sanctuary with historic archaeological relic chambers and majestic white stupa restoration.",
    image: "/images/deegawapi-stupa.jpg",
    x: 72,
    y: 58,
    openHours: "05:30 AM - 07:00 PM",
    roadInfo: "19 min via A4 Corridor",
    zone: "15-25km",
    latitude: 7.239,
    longitude: 81.729,
  },
  {
    id: "buddhangala-monastery",
    name: "Buddhangala Hermitage",
    category: "Sacred",
    ringTag: "Sacred • 8.5 km Ring",
    distanceKm: 8.5,
    duration: "2.0h Visit",
    description:
      "Ancient rock monastery with secluded meditation caves, towering summit stupa, and free-roaming wild deer herds in the woods.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    x: 62,
    y: 33,
    openHours: "06:00 AM - 06:30 PM",
    roadInfo: "12 min North Road",
    zone: "5-15km",
    latitude: 7.234,
    longitude: 81.699,
  },
  {
    id: "ampara-peace-pagoda",
    name: "Ampara Peace Pagoda",
    category: "Sacred",
    ringTag: "Sacred • 2.8 km Core",
    distanceKm: 2.8,
    duration: "1.0h Visit",
    description:
      "Gleaming white dome built overlooking the serene Ampara lake promenade, radiant during golden hour sunsets.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    x: 48,
    y: 52,
    openHours: "06:00 AM - 08:00 PM",
    roadInfo: "5 min town center",
    zone: "0-5km",
    latitude: 7.292,
    longitude: 81.672,
  },
];
