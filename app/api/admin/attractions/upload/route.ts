import { createHash } from "node:crypto";
import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const files = formData.getAll("images");
    if (!files.length || files.length > MAX_FILES || files.some((file) => !(file instanceof File))) {
      return NextResponse.json({ message: "Upload between 1 and 5 image files." }, { status: 400 });
    }

    const directory = path.join(process.cwd(), "public", "uploads", "attractions");
    await mkdir(directory, { recursive: true });
    const urls: string[] = [];

    for (const entry of files) {
      const file = entry as File;
      const extension = allowedTypes.get(file.type);
      if (!extension || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ message: "Only JPG, PNG, WEBP, or GIF images up to 5 MB are allowed." }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const hash = createHash("sha256").update(buffer).digest("hex");
      const filename = `${hash}${extension}`;
      const filePath = path.join(directory, filename);

      try {
        await access(filePath, constants.F_OK);
      } catch {
        await writeFile(filePath, buffer);
      }
      urls.push(`/uploads/attractions/${filename}`);
    }

    return NextResponse.json({ urls }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_REQUIRED") {
      return NextResponse.json({ message: "Admin access is required." }, { status: 403 });
    }
    console.error("Failed to upload attraction images", error);
    return NextResponse.json({ message: "Unable to upload images." }, { status: 500 });
  }
}
