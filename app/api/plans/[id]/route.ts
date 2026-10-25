import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/user";
import {
  deleteUserPlan,
  getUserPlanById,
  saveUserPlan,
  togglePlanStopVisited,
  updatePlanStatus,
} from "@/lib/plans";
import { PlanStatus, SavedPlan } from "@/interface/myPlans.types";

type RouteContext = { params: Promise<{ id: string }> };

function getSessionToken(request: Request) {
  return request.headers.get("cookie")?.match(/(?:^|;\s*)ampara_session=([^;]+)/)?.[1];
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await requireUser(getSessionToken(request));
    const { id } = await context.params;
    const plan = await getUserPlanById(user.id, id);
    if (!plan) {
      return NextResponse.json({ message: "Plan not found." }, { status: 404 });
    }
    return NextResponse.json({ plan });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to fetch plan", error);
    return NextResponse.json({ message: "Unable to load plan." }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireUser(getSessionToken(request));
    const { id } = await context.params;
    const body = await request.json();

    // 1. Toggle stop visited: { stopId: string }
    if (typeof body.stopId === "string" && body.stopId) {
      const updated = await togglePlanStopVisited(user.id, id, body.stopId);
      if (!updated) {
        return NextResponse.json({ message: "Plan not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true, plan: updated });
    }

    // 2. Update status: { status: PlanStatus }
    if (typeof body.status === "string") {
      const validStatuses: PlanStatus[] = ["upcoming", "in-progress", "completed", "draft"];
      if (validStatuses.includes(body.status as PlanStatus)) {
        const updated = await updatePlanStatus(user.id, id, body.status as PlanStatus);
        if (!updated) {
          return NextResponse.json({ message: "Plan not found." }, { status: 404 });
        }
        return NextResponse.json({ success: true, plan: updated });
      }
    }

    // 3. Update bookmark: { isBookmarked: boolean }
    if (typeof body.isBookmarked === "boolean") {
      const current = await getUserPlanById(user.id, id);
      if (!current) {
        return NextResponse.json({ message: "Plan not found." }, { status: 404 });
      }
      const updated: SavedPlan = { ...current, isBookmarked: body.isBookmarked };
      await saveUserPlan(user.id, updated);
      return NextResponse.json({ success: true, plan: updated });
    }

    // 4. Update full plan: { plan: SavedPlan }
    if (body.plan) {
      const updated = await saveUserPlan(user.id, { ...body.plan, id });
      return NextResponse.json({ success: true, plan: updated });
    }

    return NextResponse.json({ message: "No valid update operation provided." }, { status: 400 });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to update plan", error);
    return NextResponse.json({ message: "Unable to update plan." }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await requireUser(getSessionToken(request));
    const { id } = await context.params;
    const deleted = await deleteUserPlan(user.id, id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to delete plan", error);
    return NextResponse.json({ message: "Unable to delete plan." }, { status: 500 });
  }
}
