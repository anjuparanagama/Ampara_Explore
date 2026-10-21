import mysql, { type Pool } from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  pool?: Pool;
};

function createPool() {
  const connectionString = process.env.DB_URL;

  if (!connectionString) {
    throw new Error("DB_URL is not configured.");
  }

  const url = new URL(connectionString);
  return mysql.createPool({
    host: url.hostname,
    port: Number(url.port || 4000),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, "") || undefined,
    ssl: { rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

export const db = globalForDb.pool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = db;
}
