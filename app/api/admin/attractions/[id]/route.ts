import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";
import { cleanupUnreferencedAttractionImages } from "@/lib/storage";

type RouteContext = { params: Promise<{ id: string }> };
function isAdminError(error: unknown) {
  return error instanceof Error && error.message === "ADMIN_REQUIRED";
}

function parseParagraphs(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((p: unknown) => String(p).trim()).filter(Boolean);
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];
    if (/\r?\n\s*\r?\n/.test(trimmed)) {
      return trimmed
        .split(/\r?\n\s*\r?\n/)
        .map((p: string) => p.trim().replace(/\r?\n/g, " "))
        .filter(Boolean);
    }
    return trimmed
      .split(/\r?\n/)
      .map((p: string) => p.trim())
      .filter(Boolean);
  }
  return [];
}

function extractImages(image: unknown, images: unknown): string[] {
  const result: string[] = [];
  if (typeof image === "string" && image) result.push(image);
  if (Array.isArray(images)) {
    images.forEach((item) => {
      if (typeof item === "string") result.push(item);
      else if (item && typeof item === "object" && "url" in item && typeof (item as { url: unknown }).url === "string") {
        result.push((item as { url: string }).url);
      }
    });
  } else if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (typeof item === "string") result.push(item);
          else if (item && typeof item === "object" && "url" in item && typeof (item as { url: unknown }).url === "string") {
            result.push((item as { url: string }).url);
          }
        });
      }
    } catch {}
  }
  return result;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();
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
    const highlights = Array.isArray(body.highlights) ? body.highlights.filter((item: unknown): item is string => typeof item === "string").map((item: string) => item.trim()).filter(Boolean) : [];
    const subtitle = typeof body.subtitle === "string" && body.subtitle.trim()
      ? body.subtitle.trim()
      : description;
    const aboutTitle = typeof body.aboutTitle === "string" ? body.aboutTitle.trim() || null : null;
    const aboutParagraphs = parseParagraphs(body.aboutParagraphs);
    const quote = typeof body.quote === "string" ? body.quote.trim() || null : null;

    if (!name || !slug || !categoryId || !description || !location || aboutParagraphs.length === 0) {
      return NextResponse.json({ message: "Name, slug, category, location, overview description, and about description are required." }, { status: 400 });
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ message: "Slug must contain only lowercase letters, numbers, and hyphens without spaces (e.g. buddhangala-temple)." }, { status: 400 });
    }
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      return NextResponse.json({ message: "Latitude must be between -90 and 90, and longitude must be between -180 and 180." }, { status: 400 });
    }
    if (!Number.isFinite(distanceKm) || distanceKm < 0 || !Number.isFinite(rating) || rating < 0 || rating > 5 || !Number.isInteger(reviewsCount) || reviewsCount < 0) {
      return NextResponse.json({ message: "Distance, rating, and review count must be valid positive values." }, { status: 400 });
    }

    const [existingRows] = await db.execute("SELECT image, images FROM attractions WHERE id = ?", [id]);
    const existing = (existingRows as Array<{ image: string | null; images: unknown }>)[0];
    const oldImages = existing ? extractImages(existing.image, existing.images) : [];

    const newFormattedImages = Array.isArray(body.images)
      ? body.images.filter((item: unknown): item is string => typeof item === "string" && /^(https?:\/\/|\/uploads\/)/i.test(item)).map((item: string) => item.trim()).filter(Boolean).slice(0, 5)
      : [];

    const [result] = await db.execute(
      `UPDATE attractions SET category_id = ?, name = ?, slug = ?, description = ?, location = ?, latitude = ?, longitude = ?, image = ?, images = ?, distance_km = ?, duration = ?, highlights = ?, rating = ?, reviews_count = ?, radial_zone = ?, subtitle = ?, about_title = ?, about_paragraphs = ?, quote = ?
       WHERE id = ?`,
      [
        categoryId,
        name,
        slug,
        description,
        location,
        latitude,
        longitude,
        typeof body.image === "string" ? body.image.trim() || null : null,
        JSON.stringify(newFormattedImages),
        distanceKm,
        typeof body.duration === "string" ? body.duration.trim() || null : null,
        JSON.stringify(highlights),
        rating,
        reviewsCount,
        typeof body.radialZone === "string" ? body.radialZone.trim() || null : null,
        subtitle,
        aboutTitle,
        aboutParagraphs.length > 0 ? JSON.stringify(aboutParagraphs) : null,
        quote,
        id,
      ],
    );
    if ((result as { affectedRows: number }).affectedRows === 0) return NextResponse.json({ message: "Attraction not found." }, { status: 404 });

    const newImages = extractImages(body.image, newFormattedImages);
    const removedImages = oldImages.filter((img) => !newImages.includes(img));
    if (removedImages.length > 0) {
      await cleanupUnreferencedAttractionImages(removedImages);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminError(error)) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") return NextResponse.json({ message: "An attraction with this slug already exists." }, { status: 409 });
    console.error("Failed to update attraction", error);
    return NextResponse.json({ message: "Unable to update attraction." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await context.params;

    const [existingRows] = await db.execute("SELECT image, images FROM attractions WHERE id = ?", [id]);
    const existing = (existingRows as Array<{ image: string | null; images: unknown }>)[0];
    const oldImages = existing ? extractImages(existing.image, existing.images) : [];

    await db.execute("DELETE FROM attractions WHERE id = ?", [id]);

    if (oldImages.length > 0) {
      await cleanupUnreferencedAttractionImages(oldImages);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminError(error)) return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    console.error("Failed to delete attraction", error);
    return NextResponse.json({ message: "Unable to delete attraction." }, { status: 500 });
  }
}
