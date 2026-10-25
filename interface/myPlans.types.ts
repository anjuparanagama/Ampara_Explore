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

export const initialPlans: SavedPlan[] = [];
