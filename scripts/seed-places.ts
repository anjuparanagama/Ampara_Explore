import * as nextEnv from "@next/env";
import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";
import { amparaAttractions, interestCategories } from "../data/amparaData";

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

async function seedPlaces() {
  try {
    const categoryIds = new Map<string, string>();
    for (const category of interestCategories) {
      const categoryId = randomUUID();
      await pool.execute(
      `INSERT INTO categories (id, name, description)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE description = VALUES(description)`,
      [categoryId, category.title, `Explore ${category.title.toLowerCase()} destinations in Ampara.`],
      );
      const [rows] = await pool.execute("SELECT id FROM categories WHERE name = ?", [category.title]);
      categoryIds.set(category.title, (rows as Array<{ id: string }>)[0].id);
    }

    for (const attraction of amparaAttractions) {
      const categoryId = categoryIds.get(attraction.category);
      if (!categoryId) throw new Error(`Missing category for ${attraction.name}.`);
      await pool.execute(
      `INSERT INTO attractions
       (id, category_id, name, slug, description, location, image, images, distance_km,
        duration, highlights, rating, reviews_count, radial_zone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        category_id = VALUES(category_id), name = VALUES(name),
        description = VALUES(description), location = VALUES(location),
        image = VALUES(image), distance_km = VALUES(distance_km),
        images = VALUES(images),
        duration = VALUES(duration), highlights = VALUES(highlights),
        rating = VALUES(rating), reviews_count = VALUES(reviews_count),
        radial_zone = VALUES(radial_zone)`,
      [
        randomUUID(), categoryId, attraction.name, attraction.id, attraction.description,
        attraction.location, attraction.image, JSON.stringify([attraction.image]), attraction.distanceKm, attraction.duration,
        JSON.stringify(attraction.highlights), attraction.rating, attraction.reviewsCount,
        attraction.radialZone,
      ],
      );
    }

    console.log(`Seeded ${interestCategories.length} categories and ${amparaAttractions.length} attractions.`);
  } finally {
    await pool.end();
  }
}

seedPlaces().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
