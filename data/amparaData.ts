export interface Attraction {
  id: string;
  name: string;
  category: 'Nature' | 'Historical' | 'Religious' | 'Beaches' | 'Waterfalls' | 'Wildlife' | 'Cultural' | 'Religious and Historical' | string;
  distanceKm: number;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  radialZone: '0-5km' | '5-15km' | '15-25km';
  location: string;
}

export interface InterestCategory {
  id: string;
  title: string;
  description?: string;
  count: number;
  iconName: string;
  color: string;
  bgLight: string;
}
