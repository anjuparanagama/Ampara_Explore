import { unlink } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";

/**
 * Clean up local uploaded images that are no longer referenced by any attraction.
 */
export async function cleanupUnreferencedAttractionImages(imageUrls: (string | null | undefined)[]) {
  try {
    const uploadFiles = new Set<string>();

    for (const url of imageUrls) {
      if (typeof url === "string" && url.startsWith("/uploads/attractions/")) {
        const basename = path.basename(url.trim());
        if (basename && !basename.includes("..") && !basename.includes("/") && !basename.includes("\\")) {
          uploadFiles.add(basename);
        }
      }
    }

    if (uploadFiles.size === 0) return;

    for (const filename of uploadFiles) {
      const publicPath = `/uploads/attractions/${filename}`;
      const [rows] = await db.execute(
        "SELECT COUNT(*) as count FROM attractions WHERE image = ? OR images LIKE ?",
        [publicPath, `%${filename}%`]
      );
      const count = Number((rows as Array<{ count: number }>)[0]?.count ?? 0);
      if (count === 0) {
        const diskPath = path.join(process.cwd(), "public", "uploads", "attractions", filename);
        try {
          await unlink(diskPath);
        } catch {
          // File might already be gone, ignore
        }
      }
    }
  } catch (error) {
    console.error("Failed to clean up unreferenced images:", error);
  }
}
