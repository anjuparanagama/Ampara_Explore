import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { getOrCreateDraftPlan } from "@/lib/plans";

function getSessionToken(request: Request) {
  return request.headers.get("cookie")?.match(/(?:^|;\s*)ampara_session=([^;]+)/)?.[1];
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(getSessionToken(request));
    const body = await request.json();
    const attractionId = typeof body.attractionId === "string" ? body.attractionId : "";
    if (!attractionId) return NextResponse.json({ message: "Attraction is required." }, { status: 400 });

    const plan = await getOrCreateDraftPlan(user.id);
    const [existing] = await db.execute(
      "SELECT id FROM visit_plan_stops WHERE plan_id = ? AND attraction_id = ?",
      [plan.id, attractionId],
    );
    if ((existing as Array<{ id: string }>).length) {
      return NextResponse.json({ message: "This attraction is already in your plan." }, { status: 409 });
    }

    const [lastStop] = await db.execute(
      "SELECT COALESCE(MAX(stop_order), 0) AS last_order FROM visit_plan_stops WHERE plan_id = ?",
      [plan.id],
    );
    const order = Number((lastStop as Array<{ last_order: number }>)[0]?.last_order || 0) + 1;
    await db.execute(
      "INSERT INTO visit_plan_stops (id, plan_id, attraction_id, stop_order) VALUES (?, ?, ?, ?)",
      [randomUUID(), plan.id, attractionId, order],
    );
    return NextResponse.json({ plan: await getOrCreateDraftPlan(user.id) }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    console.error("Failed to add plan stop", error);
    return NextResponse.json({ message: "Unable to add attraction to plan." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireUser(getSessionToken(request));
    const plan = await getOrCreateDraftPlan(user.id);
    const attractionId = new URL(request.url).searchParams.get("attractionId");
    if (attractionId) {
      await db.execute("DELETE FROM visit_plan_stops WHERE plan_id = ? AND attraction_id = ?", [plan.id, attractionId]);
    } else {
      await db.execute("DELETE FROM visit_plan_stops WHERE plan_id = ?", [plan.id]);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    console.error("Failed to remove plan stop", error);
    return NextResponse.json({ message: "Unable to remove attraction from plan." }, { status: 500 });
  }
}
