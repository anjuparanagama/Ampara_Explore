import type { Attraction } from "@/data/amparaData";

export function mapDatabaseAttraction(row: Record<string, unknown>): Attraction {
  let imageList: string[] = [];
  if (Array.isArray(row.images)) {
    imageList = row.images.filter((value): value is string => typeof value === "string");
  } else if (typeof row.images === "string") {
    try {
      const parsed: unknown = JSON.parse(row.images);
      if (Array.isArray(parsed)) {
        imageList = parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      imageList = [];
    }
  }

  let highlights: string[] = [];
  if (Array.isArray(row.highlights)) {
    highlights = row.highlights.filter((value): value is string => typeof value === "string");
  } else if (typeof row.highlights === "string") {
    try {
      const parsed: unknown = JSON.parse(row.highlights);
      if (Array.isArray(parsed)) {
        highlights = parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      highlights = [];
    }
  }

  return {
    id: String(row.id),
    name: String(row.name),
    category: String(row.category_name || "Nature") as Attraction["category"],
    distanceKm: Number(row.distance_km || 0),
    duration: String(row.duration || ""),
    rating: Number(row.rating || 0),
    reviewsCount: Number(row.reviews_count || 0),
    description: String(row.description || ""),
    highlights,
    image: String(
      imageList[0]
        ? imageList[0]
        : row.image || "/images/hero-bg.jpg",
    ),
    radialZone: String(row.radial_zone || "0-5km") as Attraction["radialZone"],
    location: String(row.location || ""),
  };
}
