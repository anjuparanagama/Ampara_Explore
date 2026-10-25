import type { Attraction } from "@/data/amparaData";

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface AttractionTip {
  title: string;
  desc: string;
  icon: "sunrise" | "trees" | "sun";
}

export interface AttractionDetail extends Attraction {
  slug: string;
  subtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  quote: string;
  tips: AttractionTip[];
  routeDesc: string;
  galleryImages: GalleryImage[];
  tag: string;
  tagColor: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function getCategoryBadgeColor(category: string): string {
  const normalized = (category || "").toLowerCase();
  if (normalized.includes("wildlife")) return "bg-emerald-700";
  if (normalized.includes("nature")) return "bg-emerald-600";
  if (normalized.includes("religious") || normalized.includes("historical")) return "bg-amber-600";
  if (normalized.includes("beach")) return "bg-cyan-600";
  if (normalized.includes("waterfall")) return "bg-blue-600";
  if (normalized.includes("cultural")) return "bg-purple-600";
  return "bg-[#0084d1]";
}

function parseJsonArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed as T[];
    } catch {
      return [];
    }
  }
  return [];
}

export function mapDatabaseAttraction(row: Record<string, unknown>): Attraction {
  const imageList = parseJsonArray<unknown>(row.images)
    .map((img) => {
      if (typeof img === "string") return img;
      if (img && typeof img === "object" && "url" in img) {
        return String((img as { url: string }).url);
      }
      return "";
    })
    .filter(Boolean);

  const highlights = parseJsonArray<string>(row.highlights).filter(
    (h): h is string => typeof h === "string",
  );

  const primaryImage = String(
    row.image || imageList[0] || "/images/hero-bg.jpg",
  );

  return {
    id: String(row.slug || row.id),
    name: String(row.name || ""),
    category: String(row.category_name || "Nature") as Attraction["category"],
    distanceKm: Number(row.distance_km || 0),
    duration: String(row.duration || "1 - 2 Hours"),
    rating: Number(row.rating || 4.8),
    reviewsCount: Number(row.reviews_count || 120),
    description: String(row.description || ""),
    highlights,
    image: primaryImage,
    radialZone: String(row.radial_zone || "0-5km") as Attraction["radialZone"],
    location: String(row.location || "Ampara"),
  };
}

export function mapDatabaseAttractionDetail(row: Record<string, unknown>): AttractionDetail {
  const base = mapDatabaseAttraction(row);

  // Parse gallery images
  const rawImages = parseJsonArray<unknown>(row.images);
  const galleryImages: GalleryImage[] = rawImages
    .map((item) => {
      if (typeof item === "string") {
        return { url: item, caption: base.name };
      }
      if (item && typeof item === "object") {
        const obj = item as { url?: string; caption?: string };
        return {
          url: String(obj.url || base.image),
          caption: String(obj.caption || base.name),
        };
      }
      return null;
    })
    .filter((img): img is GalleryImage => img !== null && Boolean(img.url));

  if (galleryImages.length === 0) {
    galleryImages.push({ url: base.image, caption: `📍 ${base.name}` });
  }

  // Parse about paragraphs
  const rawParagraphs = parseJsonArray<string>(row.about_paragraphs);
  let aboutParagraphs = rawParagraphs.filter(
    (p): p is string => typeof p === "string" && Boolean(p.trim()),
  );
  if (aboutParagraphs.length === 0) {
    aboutParagraphs = base.description
      ? [
          base.description,
          `Located at ${base.location}, within ${base.distanceKm} km of Ampara town center.`,
        ]
      : [
          `Discover the unique landscape and peaceful atmosphere of ${base.name}.`,
        ];
  }

  // Parse tips
  const rawTips = parseJsonArray<unknown>(row.tips);
  const tips: AttractionTip[] = rawTips
    .map((tip) => {
      if (tip && typeof tip === "object") {
        const obj = tip as { title?: string; desc?: string; icon?: string };
        const icon =
          obj.icon === "trees" || obj.icon === "sun" ? obj.icon : "sunrise";
        return {
          title: String(obj.title || "Travel Tip"),
          desc: String(obj.desc || "Plan your trip early for the best experience."),
          icon,
        };
      }
      return null;
    })
    .filter((t): t is AttractionTip => t !== null);

  if (tips.length === 0) {
    tips.push(
      {
        title: "Optimal Visit Timing",
        desc: "Early morning or late afternoon provides the most comfortable temperatures and best natural light.",
        icon: "sunrise",
      },
      {
        title: "Eco-Friendly Guidelines",
        desc: "Follow 'Leave No Trace' eco guidelines by taking all waste and plastics back with you.",
        icon: "trees",
      },
      {
        title: "Recommended Duration",
        desc: `Allow approximately ${base.duration} to comfortably experience the destination and surroundings.`,
        icon: "sun",
      },
    );
  }

  const category = String(row.category_name || base.category || "Nature");
  const tagColor = getCategoryBadgeColor(category);

  return {
    ...base,
    slug: String(row.slug || row.id),
    subtitle: String(row.subtitle || base.description.slice(0, 100)),
    aboutTitle: String(row.about_title || `About ${base.name}`),
    aboutParagraphs,
    quote: String(
      row.quote ||
        `A captivating highlight of the Ampara discovery circuit showcasing ${base.name}.`,
    ),
    tips,
    routeDesc: String(
      row.route_desc ||
        `Est. ${Math.round(base.distanceKm * 1.2 + 5)} min drive from Ampara town center via ${base.location} • Paved route`,
    ),
    galleryImages,
    tag: `✓ ${category.toUpperCase()} LANDMARK`,
    tagColor,
    latitude: row.latitude ? Number(row.latitude) : null,
    longitude: row.longitude ? Number(row.longitude) : null,
  };
}
