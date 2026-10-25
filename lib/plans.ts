import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import { PlanStatus, PlanStopItem, SavedPlan } from "@/interface/myPlans.types";

export async function getOrCreateDraftPlan(userId: string) {
  const [rows] = await db.execute(
    "SELECT id, title, visit_date, status, notes FROM visit_plans WHERE user_id = ? AND status = 'draft' ORDER BY updated_at DESC LIMIT 1",
    [userId],
  );
  const existing = (rows as Array<{ id: string; title: string; visit_date: string | null; status: string; notes: string | null }>)[0];
  if (existing) return existing;

  const id = randomUUID();
  await db.execute(
    "INSERT INTO visit_plans (id, user_id, title, status) VALUES (?, ?, ?, 'draft')",
    [id, userId, "My Ampara Visit Plan"],
  );
  return { id, title: "My Ampara Visit Plan", visit_date: null, status: "draft", notes: null };
}

export async function getPlanForUser(userId: string) {
  const plan = await getOrCreateDraftPlan(userId);
  const [rows] = await db.execute(
    `SELECT s.id, s.attraction_id, s.stop_order, s.scheduled_start,
      s.duration_minutes, s.notes, s.is_visited, a.name, a.image, a.distance_km,
      a.duration, a.location, c.name AS category_name
     FROM visit_plan_stops s
     INNER JOIN attractions a ON a.id = s.attraction_id
     INNER JOIN categories c ON c.id = a.category_id
     WHERE s.plan_id = ?
     ORDER BY s.stop_order`,
    [plan.id],
  );
  return { ...plan, stops: rows };
}

// Convert a database row to a SavedPlan
function rowToSavedPlan(row: any): SavedPlan {
  let stops: PlanStopItem[] = [];
  if (row.stops_data) {
    try {
      stops = typeof row.stops_data === "string" ? JSON.parse(row.stops_data) : row.stops_data;
    } catch {
      stops = [];
    }
  }

  return {
    id: String(row.id),
    status: (row.status || "upcoming") as PlanStatus,
    date: row.visit_date ? String(row.visit_date) : "Trip Date",
    title: String(row.title || "Ampara Expedition"),
    description: String(row.description || ""),
    stops: Array.isArray(stops) ? stops : [],
    totalDistance: String(row.total_distance || "0 km"),
    allocatedTime: String(row.allocated_time || "0 hrs"),
    coverImage: String(row.cover_image || "/images/hero-bg.jpg"),
    isBookmarked: Boolean(row.is_bookmarked),
  };
}

// Get all saved plans for a user
export async function getAllPlansForUser(userId: string): Promise<SavedPlan[]> {
  const [rows] = await db.execute(
    "SELECT * FROM visit_plans WHERE user_id = ? AND status != 'draft' ORDER BY updated_at DESC",
    [userId],
  );

  return (rows as any[]).map(rowToSavedPlan);
}

export async function getUserPlanById(userId: string, planId: string): Promise<SavedPlan | null> {
  const [rows] = await db.execute(
    "SELECT * FROM visit_plans WHERE user_id = ? AND id = ? LIMIT 1",
    [userId, planId],
  );
  const found = (rows as any[])[0];
  if (found) return rowToSavedPlan(found);

  return null;
}

// Save or update a full SavedPlan in database
export async function saveUserPlan(userId: string, plan: SavedPlan): Promise<SavedPlan> {
  const stopsJson = JSON.stringify(plan.stops || []);

  const [existing] = await db.execute(
    "SELECT id FROM visit_plans WHERE id = ? AND user_id = ? LIMIT 1",
    [plan.id, userId],
  );

  if ((existing as any[]).length > 0) {
    await db.execute(
      `UPDATE visit_plans
       SET title = ?, description = ?, status = ?, visit_date = ?,
           total_distance = ?, allocated_time = ?, cover_image = ?,
           is_bookmarked = ?, stops_data = ?
       WHERE id = ? AND user_id = ?`,
      [
        plan.title,
        plan.description,
        plan.status,
        plan.date,
        plan.totalDistance,
        plan.allocatedTime,
        plan.coverImage,
        plan.isBookmarked ? 1 : 0,
        stopsJson,
        plan.id,
        userId,
      ],
    );
  } else {
    await db.execute(
      `INSERT INTO visit_plans (
        id, user_id, title, description, status, visit_date,
        total_distance, allocated_time, cover_image, is_bookmarked, stops_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plan.id,
        userId,
        plan.title,
        plan.description,
        plan.status,
        plan.date,
        plan.totalDistance,
        plan.allocatedTime,
        plan.coverImage,
        plan.isBookmarked ? 1 : 0,
        stopsJson,
      ],
    );
  }

  return plan;
}

// Toggle a stop visited/unvisited status in a plan
export async function togglePlanStopVisited(
  userId: string,
  planId: string,
  stopId: string,
): Promise<SavedPlan | null> {
  let plan = await getUserPlanById(userId, planId);
  if (!plan) return null;

  const updatedStops = plan.stops.map((s) => {
    if (s.id === stopId) {
      return { ...s, visited: !s.visited };
    }
    return s;
  });

  const allVisited = updatedStops.length > 0 && updatedStops.every((s) => s.visited);
  const anyVisited = updatedStops.some((s) => s.visited);

  let nextStatus = plan.status;
  if (allVisited) {
    nextStatus = "completed";
  } else if (anyVisited && plan.status === "upcoming") {
    nextStatus = "in-progress";
  } else if (!anyVisited && plan.status === "completed") {
    nextStatus = "in-progress";
  }

  const updatedPlan: SavedPlan = {
    ...plan,
    stops: updatedStops,
    status: nextStatus,
  };

  await saveUserPlan(userId, updatedPlan);

  // Also sync to visit_plan_stops if present
  try {
    const targetStop = updatedStops.find((s) => s.id === stopId);
    if (targetStop) {
      await db.execute(
        "UPDATE visit_plan_stops SET is_visited = ? WHERE plan_id = ? AND (id = ? OR attraction_id = ?)",
        [targetStop.visited ? 1 : 0, planId, stopId, stopId],
      );
    }
  } catch {}

  return updatedPlan;
}

// Update the overall status of a plan (e.g. "upcoming" | "in-progress" | "completed" | "draft")
export async function updatePlanStatus(
  userId: string,
  planId: string,
  status: PlanStatus,
): Promise<SavedPlan | null> {
  let plan = await getUserPlanById(userId, planId);
  if (!plan) return null;

  let stops = [...plan.stops];
  let date = plan.date;

  if (status === "completed") {
    stops = stops.map((s) => ({ ...s, visited: true }));
    date = "Completed Today";
  } else if (status === "in-progress" && plan.status === "completed") {
    // Restarting trip
    stops = stops.map((s) => ({ ...s, visited: false }));
  }

  const updatedPlan: SavedPlan = {
    ...plan,
    status,
    date,
    stops,
  };

  await saveUserPlan(userId, updatedPlan);
  return updatedPlan;
}

// Delete a plan
export async function deleteUserPlan(userId: string, planId: string): Promise<boolean> {
  const [result] = await db.execute(
    "DELETE FROM visit_plans WHERE id = ? AND user_id = ?",
    [planId, userId],
  );
  return ((result as any)?.affectedRows || 0) > 0;
}
