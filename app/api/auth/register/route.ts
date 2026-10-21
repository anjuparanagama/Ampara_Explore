import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth/session";
import { AuthError, registerUser } from "@/lib/auth/service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await registerUser({
      name: typeof body.name === "string" ? body.name : undefined,
      email: typeof body.email === "string" ? body.email : "",
      password: typeof body.password === "string" ? body.password : "",
    });

    await createSession(user.id, true);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error("Registration failed", error);
    return NextResponse.json(
      { message: "Unable to create your account right now." },
      { status: 500 },
    );
  }
}
