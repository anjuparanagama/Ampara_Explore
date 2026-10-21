import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import {
  normalizeEmail,
  type AuthInput,
  validateLogin,
  validateRegistration,
} from "@/lib/auth/validation";

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export async function registerUser(input: AuthInput) {
  const validationError = validateRegistration(input);
  if (validationError) throw new AuthError(validationError, 400);

  const email = normalizeEmail(input.email);
  const id = randomUUID();
  const passwordHash = await bcrypt.hash(input.password, 12);

  try {
    await db.execute(
      `INSERT INTO users (id, name, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [id, input.name!.trim(), email, passwordHash],
    );

    return { id, name: input.name!.trim(), email, role: "user" };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      throw new AuthError("An account with this email already exists.", 409);
    }
    throw error;
  }
}

export async function authenticateUser(input: AuthInput) {
  const validationError = validateLogin(input);
  if (validationError) throw new AuthError(validationError, 400);

  const email = normalizeEmail(input.email);
  const [rows] = await db.execute(
    "SELECT id, name, email, role, password_hash FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  const user = (rows as Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    password_hash: string;
  }>)[0];

  if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
    throw new AuthError("Invalid email or password.", 401);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
