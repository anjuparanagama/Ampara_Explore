import type { Attraction } from "@/data/amparaData";

export interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
  selectedRadius: number;
  setSelectedRadius: (radius: number) => void;
  onExploreClick: () => void;
  onMapClick: () => void;
}

export interface CategoryItem {
  id: string;
  name: string;
  description?: string | null;
  attraction_count?: number;
}

export interface BrowseByInterestProps {
  attractions: Attraction[];
  categories?: CategoryItem[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export interface FeaturedAttractionsProps {
  attractions: Attraction[];
  searchQuery: string;
  selectedCategory: string | null;
  selectedRadius: number;
  visitPlan: Attraction[];
  onTogglePlan: (attraction: Attraction) => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onClearCategory?: () => void;
}

export interface RadialMapViewProps {
  attractions: Attraction[];
  onSelectAttraction: (attraction: Attraction) => void;
}

export interface AttractionModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  isAdded: boolean;
  onTogglePlan: (attraction: Attraction) => void;
}