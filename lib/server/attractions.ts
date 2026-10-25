import { db } from "@/lib/db";
import type { Attraction } from "@/data/amparaData";
import {
  mapDatabaseAttraction,
  mapDatabaseAttractionDetail,
  type AttractionDetail,
} from "@/lib/attractions";

export async function getAttractionByIdOrSlug(
  idOrSlug: string,
): Promise<AttractionDetail | null> {
  const [rows] = await db.execute(
    `SELECT a.id, a.category_id, c.name AS category_name, a.name, a.slug,
      a.description, a.location, a.latitude, a.longitude, a.image, a.images,
      a.distance_km, a.duration, a.highlights, a.radial_zone,
      a.subtitle, a.about_title, a.about_paragraphs, a.quote, a.tips, a.route_desc
     FROM attractions a
     INNER JOIN categories c ON c.id = a.category_id
     WHERE a.slug = ? OR a.id = ?
     LIMIT 1`,
    [idOrSlug, idOrSlug],
  );
  const list = rows as Record<string, unknown>[];
  if (!list.length) return null;
  return mapDatabaseAttractionDetail(list[0]);
}

export async function getNearbyAttractions(
  currentIdOrSlug: string,
  limit = 3,
): Promise<Attraction[]> {
  const safeLimit = Math.max(1, Math.min(limit, 10));
  const [rows] = await db.execute(
    `SELECT a.id, a.category_id, c.name AS category_name, a.name, a.slug,
      a.description, a.location, a.latitude, a.longitude, a.image, a.images,
      a.distance_km, a.duration, a.highlights, a.radial_zone
     FROM attractions a
     INNER JOIN categories c ON c.id = a.category_id
     WHERE a.id != ? AND a.slug != ?
     ORDER BY a.distance_km ASC, a.name ASC
     LIMIT ${safeLimit}`,
    [currentIdOrSlug, currentIdOrSlug],
  );
  return (rows as Record<string, unknown>[]).map(mapDatabaseAttraction);
}
