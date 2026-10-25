import nextEnv from "@next/env";
import mysql from "mysql2/promise";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

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
  const schemaPath = resolve("database", "schema.sql");
  const sql = await readFile(schemaPath, "utf8");
  for (const statement of sql.split(";").map((part) => part.trim()).filter(Boolean)) {
    await pool.query(statement);
  }
  console.log("Database schema applied successfully from database/schema.sql.");
} finally {
  await pool.end();
}
