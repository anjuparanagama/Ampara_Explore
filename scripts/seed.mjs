import nextEnv from "@next/env";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DB_URL) throw new Error("DB_URL is not configured.");
const cliArgs = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const argument = process.argv[index];
  const [key, value] = argument.split("=", 2);
  if (key.startsWith("--") && value) cliArgs.set(key.slice(2), value);
}

const email = (cliArgs.get("email") || process.env.SEED_USER_EMAIL || "")
  .trim()
  .toLowerCase();
const password = cliArgs.get("password") || process.env.SEED_USER_PASSWORD || "";

if (!email || !password) {
  throw new Error(
    "Provide seed credentials using SEED_USER_EMAIL/SEED_USER_PASSWORD in .env.local or --email=... --password=... arguments.",
  );
}

const name = cliArgs.get("name") || process.env.SEED_USER_NAME || "Ampara Explorer";
const role = cliArgs.get("role") || process.env.SEED_USER_ROLE || "user";
if (!["user", "admin"].includes(role)) {
  throw new Error("SEED_USER_ROLE must be either user or admin.");
}
const passwordHash = await bcrypt.hash(password, 12);
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
  await pool.execute(
    `INSERT INTO users (id, name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       password_hash = VALUES(password_hash),
       role = VALUES(role)`,
    [randomUUID(), name, email, passwordHash, role],
  );
  console.log(`${role} seed account is ready for ${email}.`);
} finally {
  await pool.end();
}
