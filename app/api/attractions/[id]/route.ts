import { NextResponse } from "next/server";
import {
  getAttractionByIdOrSlug,
  getNearbyAttractions,
} from "@/lib/server/attractions";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: "Invalid attraction identifier." },
        { status: 400 },
      );
    }

    const attraction = await getAttractionByIdOrSlug(id);
    if (!attraction) {
      return NextResponse.json(
        { message: "Attraction not found." },
        { status: 404 },
      );
    }

    const nearby = await getNearbyAttractions(
      attraction.slug || attraction.id,
      3,
    );

    return NextResponse.json({ attraction, nearby });
  } catch (error) {
    console.error("Failed to load attraction details", error);
    return NextResponse.json(
      { message: "Unable to load attraction details." },
      { status: 500 },
    );
  }
}
