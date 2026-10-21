import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { authenticateUser, AuthError } from "@/lib/auth/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await authenticateUser({
      email: typeof body.email === "string" ? body.email : "",
      password: typeof body.password === "string" ? body.password : "",
    });

    await createSession(user.id, body.rememberMe === true);
    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Login failed", error);
    return NextResponse.json(
      { message: "Unable to sign you in right now." },
      { status: 500 },
    );
  }
}
