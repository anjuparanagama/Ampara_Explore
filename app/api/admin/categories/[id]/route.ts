import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { db } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

function isAdminError(error: unknown) {
  return error instanceof Error && error.message === "ADMIN_REQUIRED";
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : null;

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ message: "Category name must be between 2 and 80 characters." }, { status: 400 });
    }

    const [result] = await db.execute(
      "UPDATE categories SET name = ?, description = ? WHERE id = ?",
      [name, description || null, id],
    );
    if ((result as { affectedRows: number }).affectedRows === 0) {
      return NextResponse.json({ message: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ category: { id, name, description } });
  } catch (error) {
    if (isAdminError(error)) {
      return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "A category with this name already exists." }, { status: 409 });
    }
    console.error("Failed to update category", error);
    return NextResponse.json({ message: "Unable to update category." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    await db.execute("DELETE FROM categories WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAdminError(error)) {
      return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ER_ROW_IS_REFERENCED_2") {
      return NextResponse.json({ message: "Delete or reassign attractions in this category first." }, { status: 409 });
    }
    console.error("Failed to delete category", error);
    return NextResponse.json({ message: "Unable to delete category." }, { status: 500 });
  }
}
