import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim() || "";
  const category = url.searchParams.get("category")?.trim() || "";
  const radius = Number(url.searchParams.get("radius") || 25);
  const conditions = ["a.distance_km <= ?"];
  const params: Array<string | number> = [Number.isFinite(radius) ? radius : 25];

  if (search) {
    conditions.push("(a.name LIKE ? OR a.description LIKE ? OR a.location LIKE ?)");
    const term = `%${search}%`;
    params.push(term, term, term);
  }
  if (category) {
    conditions.push("LOWER(c.name) = LOWER(?)");
    params.push(category);
  }

  try {
    const [rows] = await db.execute(
      `SELECT a.id, a.category_id, c.name AS category_name, a.name, a.slug,
        a.description, a.location, a.latitude, a.longitude, a.image, a.images, a.distance_km, a.duration,
        a.highlights, a.rating, a.reviews_count, a.radial_zone
       FROM attractions a
       INNER JOIN categories c ON c.id = a.category_id
       WHERE ${conditions.join(" AND ")}
       ORDER BY a.distance_km ASC, a.name ASC`,
      params,
    );
    return NextResponse.json({ attractions: rows });
  } catch (error) {
    console.error("Failed to load attractions", error);
    return NextResponse.json({ message: "Unable to load attractions." }, { status: 500 });
  }
}
