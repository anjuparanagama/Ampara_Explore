export type PlanStatus = "upcoming" | "in-progress" | "draft" | "completed";

export type FilterTabType =
  | "all"
  | "in-progress"
  | "upcoming"
  | "draft"
  | "completed"
  | "bookmarked";

export interface PlanStopItem {
  id: string;
  name: string;
  location?: string;
  category?: string;
  distance?: string;
  duration?: string;
  image: string;
  visited: boolean;
  notes?: string;
}

export interface SavedPlan {
  id: string;
  status: PlanStatus;
  date: string;
  title: string;
  description: string;
  stops: PlanStopItem[];
  totalDistance: string;
  allocatedTime: string;
  coverImage: string;
  isBookmarked?: boolean;
}

export const initialPlans: SavedPlan[] = [
  {
    id: "plan-1",
    status: "upcoming",
    date: "Oct 26, 2025",
    title: "Senanayake Inland Sea & Elephant Trail",
    description:
      "Dawn reservoir cruise at sunrise, ancient wilderness corridor, and hermitage ridge walk.",
    totalDistance: "43.4 km",
    allocatedTime: "9.5 hrs",
    coverImage: "/images/gal-oya-elephants.jpg",
    isBookmarked: true,
    stops: [
      {
        id: "stop-1-1",
        name: "Senanayake Samudraya Reservoir Pier",
        location: "Inginiyagala",
        category: "Nature & Wildlife",
        distance: "12.4 km from town",
        duration: "2.5 hrs",
        image: "/images/hero-bg.jpg",
        visited: false,
        notes: "Morning motorized boat safari with elephant corridor sighting.",
      },
      {
        id: "stop-1-2",
        name: "Gal Oya Elephant Crossing Shore",
        location: "Gal Oya National Park",
        category: "Wildlife Reserve",
        distance: "19.8 km from town",
        duration: "2.0 hrs",
        image: "/images/gal-oya-elephants.jpg",
        visited: false,
        notes: "Wild swimming elephant herds near western islands.",
      },
      {
        id: "stop-1-3",
        name: "Buddhangala Forest Hermitage",
        location: "Buddhangala",
        category: "Sacred Hermitage",
        distance: "8.5 km from town",
        duration: "1.5 hrs",
        image: "/images/buddhangala.jpg",
        visited: false,
        notes: "Ancient monastery on massive granite rocks.",
      },
    ],
  },
  {
    id: "plan-2",
    status: "draft",
    date: "Edited Yesterday",
    title: "Sacred Hermitages & Monastic Trail",
    description:
      "Revered Dighavapi Maha Seya stupa, monastic stone pathways, and deep meditation forest rocks.",
    totalDistance: "39.2 km",
    allocatedTime: "7.0 hrs",
    coverImage: "/images/deegawapi-stupa.jpg",
    isBookmarked: false,
    stops: [
      {
        id: "stop-2-1",
        name: "Dighavapi Maha Seya",
        location: "Dighavapi",
        category: "Religious & Historical",
        distance: "18.2 km from town",
        duration: "2.0 hrs",
        image: "/images/deegawapi-stupa.jpg",
        visited: false,
        notes: "Solosmasthana holy stupa currently undergoing ancient restoration.",
      },
      {
        id: "stop-2-2",
        name: "Buddhangala Peak Sanctuary",
        location: "Buddhangala",
        category: "Heritage Monastery",
        distance: "8.5 km from town",
        duration: "1.5 hrs",
        image: "/images/buddhangala.jpg",
        visited: false,
        notes: "Ancient meditation paths and scenic forest panorama.",
      },
      {
        id: "stop-2-3",
        name: "Pannalgama Lake Reservoir",
        location: "Pannalgama",
        category: "Tranquil Waterway",
        distance: "14.0 km from town",
        duration: "1.5 hrs",
        image: "/images/login-bg.jpg",
        visited: false,
        notes: "Quiet shoreline ideal for peaceful evening bird watching.",
      },
    ],
  },
  {
    id: "plan-3",
    status: "upcoming",
    date: "Nov 04, 2025",
    title: "Untouched Reservoirs & Sunset Safari",
    description:
      "Gentle wetland paddling, endemic bird watching at twilight, and scenic dam crest viewpoint.",
    totalDistance: "29.6 km",
    allocatedTime: "5.5 hrs",
    coverImage: "/images/login-bg.jpg",
    isBookmarked: false,
    stops: [
      {
        id: "stop-3-1",
        name: "Pannalgama Boat Launch",
        location: "Pannalgama",
        category: "Water Reserve",
        distance: "14.0 km from town",
        duration: "2.0 hrs",
        image: "/images/login-bg.jpg",
        visited: false,
        notes: "Canoe embarkation point with scenic water lilies.",
      },
      {
        id: "stop-3-2",
        name: "Dam Crest Sunset Point",
        location: "Inginiyagala",
        category: "Scenic Viewpoint",
        distance: "12.0 km from town",
        duration: "1.5 hrs",
        image: "/images/hero-bg.jpg",
        visited: false,
        notes: "Best golden hour photography vantage point across the valley.",
      },
    ],
  },
  {
    id: "plan-4",
    status: "completed",
    date: "Completed Sep 18, 2025",
    title: "Inginiyagala Heritage & Highland Vistas",
    description:
      "Historical spillway, wild elephant viewpoint, and peaceful lakeside shrines.",
    totalDistance: "36.0 km",
    allocatedTime: "8.0 hrs",
    coverImage: "/images/hero-bg.jpg",
    isBookmarked: false,
    stops: [
      {
        id: "stop-4-1",
        name: "Historical Spillway & Dam",
        location: "Inginiyagala",
        category: "Engineering Heritage",
        distance: "12.4 km from town",
        duration: "2.0 hrs",
        image: "/images/hero-bg.jpg",
        visited: true,
        notes: "Magnificent 1950s engineering landmark surrounded by hills.",
      },
      {
        id: "stop-4-2",
        name: "Wild Elephant Viewpoint",
        location: "Inginiyagala",
        category: "Wildlife Vantage",
        distance: "14.2 km from town",
        duration: "2.0 hrs",
        image: "/images/gal-oya-elephants.jpg",
        visited: true,
        notes: "Observed grazing elephant herd along the shoreline corridor.",
      },
      {
        id: "stop-4-3",
        name: "Lakeside Shrines & Forest Walk",
        location: "Inginiyagala",
        category: "Heritage Path",
        distance: "13.0 km from town",
        duration: "1.5 hrs",
        image: "/images/buddhangala.jpg",
        visited: true,
        notes: "Serene lakeside walking path under canopy trees.",
      },
    ],
  },
];
