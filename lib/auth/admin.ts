import { getCurrentUser, type AuthUser } from "@/lib/auth/session";

export async function requireAdmin(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    throw new Error("ADMIN_REQUIRED");
  }

  return user;
}
