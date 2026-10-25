import nextEnv from "@next/env";
import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DB_URL) throw new Error("DB_URL is not configured.");

const url = new URL(process.env.DB_URL);
const pool = mysql.createPool({
  host: url.hostname,
  port: Number(url.port || 4000),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, "") || undefined,
  ssl: { rejectUnauthorized: true },
});

try {
  const dir = path.join(process.cwd(), "public", "uploads", "attractions");
  const files = fs.readdirSync(dir);

  const [rows] = await pool.query("SELECT id, name, slug, image, images FROM attractions");
  const usedImages = new Set();
  for (const row of rows) {
    if (row.image && row.image.startsWith("/uploads/attractions/")) {
      usedImages.add(path.basename(row.image));
    }
    if (row.images) {
      try {
        const arr = typeof row.images === "string" ? JSON.parse(row.images) : row.images;
        if (Array.isArray(arr)) {
          arr.forEach((img) => {
            if (typeof img === "string" && img.startsWith("/uploads/attractions/")) {
              usedImages.add(path.basename(img));
            } else if (img && typeof img.url === "string" && img.url.startsWith("/uploads/attractions/")) {
              usedImages.add(path.basename(img.url));
            }
          });
        }
      } catch (e) {}
    }
  }

  console.log(`Found ${usedImages.size} files used by attractions in DB.`);

  let deletedCount = 0;
  for (const file of files) {
    if (!usedImages.has(file)) {
      const filePath = path.join(dir, file);
      fs.unlinkSync(filePath);
      deletedCount++;
      console.log(`Deleted orphaned/duplicate file: ${file}`);
    }
  }

  console.log(`Successfully cleaned up ${deletedCount} unused files.`);
  const remaining = fs.readdirSync(dir);
  console.log(`Remaining files in public/uploads/attractions: ${remaining.length}`);
} finally {
  await pool.end();
}
