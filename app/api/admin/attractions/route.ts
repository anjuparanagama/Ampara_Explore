import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";

function isAdminError(error: unknown) {
  return error instanceof Error && error.message === "ADMIN_REQUIRED";
}

const selectAttractions = `
  SELECT a.id, a.category_id, c.name AS category_name, a.name, a.slug,
    a.description, a.location, a.latitude, a.longitude, a.image, a.images, a.distance_km, a.duration,
    a.highlights, a.rating, a.reviews_count, a.radial_zone,
    a.created_at, a.updated_at
  FROM attractions a
  INNER JOIN categories c ON c.id = a.category_id
`;

function parseAttraction(body: Record<string, unknown>) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const categoryId = typeof body.categoryId === "string" ? body.categoryId : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const distanceKm = Number(body.distanceKm);
  const rating = Number(body.rating ?? 0);
  const reviewsCount = Number(body.reviewsCount ?? 0);
  const highlights = Array.isArray(body.highlights)
    ? body.highlights.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];

  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !categoryId || !description || !location) {
    return { error: "Name, slug, category, description, and location are required." };
  }
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return { error: "Latitude must be between -90 and 90, and longitude must be between -180 and 180." };
  }
  if (!Number.isFinite(distanceKm) || distanceKm < 0 || !Number.isFinite(rating) || rating < 0 || rating > 5 || !Number.isInteger(reviewsCount) || reviewsCount < 0) {
    return { error: "Distance, rating, and review count must be valid positive values." };
  }
  return {
    value: {
      name, slug, categoryId, description, location, latitude, longitude,
      image: typeof body.image === "string" ? body.image.trim() || null : null,
      images: Array.isArray(body.images)
        ? body.images.filter((item): item is string => typeof item === "string" && /^(https?:\/\/|\/uploads\/)/i.test(item)).map((item) => item.trim()).filter(Boolean).slice(0, 5)
        : [],
      distanceKm, duration: typeof body.duration === "string" ? body.duration.trim() || null : null,
      highlights, rating, reviewsCount,
      radialZone: typeof body.radialZone === "string" ? body.radialZone.trim() || null : null,
    },
  };
}

export async function GET() {
  try {
    await requireAdmin();
    const [rows] = await db.execute(`${selectAttractions} ORDER BY a.name`);
    return NextResponse.json({ attractions: rows });
  } catch (error) {
    if (isAdminError(error)) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    console.error("Failed to load attractions", error);
    return NextResponse.json({ message: "Unable to load attractions." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const parsed = parseAttraction(await request.json());
    if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 });
    const { value } = parsed;
    const id = randomUUID();
    await db.execute(
      `INSERT INTO attractions
       (id, category_id, name, slug, description, location, latitude, longitude, image, images, distance_km, duration, highlights, rating, reviews_count, radial_zone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
      [id, value.categoryId, value.name, value.slug, value.description, value.location, value.latitude, value.longitude, value.image, JSON.stringify(value.images), value.distanceKm, value.duration, JSON.stringify(value.highlights), value.rating, value.reviewsCount, value.radialZone],
    );
    return NextResponse.json({ attraction: { id, ...value } }, { status: 201 });
  } catch (error) {
    if (isAdminError(error)) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "An attraction with this slug already exists." }, { status: 409 });
    }
    console.error("Failed to create attraction", error);
    return NextResponse.json({ message: "Unable to create attraction." }, { status: 500 });
  }
}
