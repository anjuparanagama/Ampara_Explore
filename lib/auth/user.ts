import { getCurrentUser, type AuthUser } from "@/lib/auth/session";

export async function requireUser(sessionToken?: string): Promise<AuthUser> {
  const user = await getCurrentUser(sessionToken);
  if (!user) throw new Error("AUTH_REQUIRED");
  return user;
}
