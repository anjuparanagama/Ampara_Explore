import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";

function isAdminError(error: unknown) {
  return error instanceof Error && error.message === "ADMIN_REQUIRED";
}

export async function GET() {
  try {
    await requireAdmin();
    const [rows] = await db.execute(
      "SELECT id, name, description, created_at, updated_at FROM categories ORDER BY name",
    );
    return NextResponse.json({ categories: rows });
  } catch (error) {
    if (isAdminError(error)) {
      return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    }
    console.error("Failed to load categories", error);
    return NextResponse.json({ message: "Unable to load categories." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : null;

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { message: "Category name must be between 2 and 80 characters." },
        { status: 400 },
      );
    }

    const id = randomUUID();
    await db.execute(
      "INSERT INTO categories (id, name, description) VALUES (?, ?, ?)",
      [id, name, description || null],
    );
    return NextResponse.json({ category: { id, name, description } }, { status: 201 });
  } catch (error) {
    if (isAdminError(error)) {
      return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "A category with this name already exists." }, { status: 409 });
    }
    console.error("Failed to create category", error);
    return NextResponse.json({ message: "Unable to create category." }, { status: 500 });
  }
}
