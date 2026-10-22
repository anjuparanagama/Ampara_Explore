export interface PlanStopTransit {
  duration: string;
  distance: string;
  route: string;
  traffic: string;
}

export interface PlanStop {
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
  transitBefore?: PlanStopTransit;
}

export type PlanViewState = "active" | "empty";

export interface PlanBreadcrumbsProps {
  viewState: PlanViewState;
  setViewState: (state: PlanViewState) => void;
  stopsCount: number;
}

export interface PlanControlsProps {
  pace: string;
  setPace: (pace: string) => void;
  showPaceDropdown: boolean;
  setShowPaceDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onOptimizeRoute: () => void;
}

export interface PlanStopCardProps {
  stop: PlanStop;
  index: number;
  totalStops: number;
  onMoveStop: (index: number, direction: "up" | "down") => void;
  onDeleteStop: (id: string) => void;
}

export interface PlanTimelineProps {
  stops: PlanStop[];
  onMoveStop: (index: number, direction: "up" | "down") => void;
  onDeleteStop: (id: string) => void;
}

export interface TripOverviewProps {
  stops: PlanStop[];
}

export const initialPlanStops: PlanStop[] = [
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
];
