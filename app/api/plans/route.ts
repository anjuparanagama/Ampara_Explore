import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/user";
import { getPlanForUser } from "@/lib/plans";

function getSessionToken(request: Request) {
  return request.headers.get("cookie")?.match(/(?:^|;\s*)ampara_session=([^;]+)/)?.[1];
}

export async function GET(request: Request) {
  try {
    const user = await requireUser(getSessionToken(request));
    return NextResponse.json({ plan: await getPlanForUser(user.id) });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to load visit plan", error);
    return NextResponse.json({ message: "Unable to load visit plan." }, { status: 500 });
  }
}
