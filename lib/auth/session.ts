import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export const SESSION_COOKIE = "ampara_session";
const SESSION_DAYS = 30;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, rememberMe = false) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + (rememberMe ? SESSION_DAYS : 1) * 24 * 60 * 60 * 1000,
  );

  await db.execute(
    "INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (UUID(), ?, ?, ?)",
    [userId, hashToken(token), expiresAt],
  );

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser(sessionToken?: string): Promise<AuthUser | null> {
  const token = sessionToken ?? (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [rows] = await db.execute(
    `SELECT u.id, u.name, u.email, u.role
     FROM sessions s
     INNER JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP
     LIMIT 1`,
    [hashToken(token)],
  );

  const user = (rows as AuthUser[])[0];
  return user ?? null;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.execute("DELETE FROM sessions WHERE token_hash = ?", [
      hashToken(token),
    ]);
  }

  cookieStore.delete(SESSION_COOKIE);
}
