import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT c.id, c.name, c.description, COUNT(a.id) AS attraction_count
       FROM categories c
       LEFT JOIN attractions a ON a.category_id = c.id
       GROUP BY c.id, c.name, c.description
       ORDER BY c.name`,
    );
    return NextResponse.json({ categories: rows });
  } catch (error) {
    console.error("Failed to load public categories", error);
    return NextResponse.json({ message: "Unable to load categories." }, { status: 500 });
  }
}
