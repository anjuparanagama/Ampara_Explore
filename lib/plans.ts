import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";

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
      s.duration_minutes, s.notes, a.name, a.image, a.distance_km,
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
