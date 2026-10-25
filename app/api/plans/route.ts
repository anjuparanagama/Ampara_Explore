import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/user";
import { getAllPlansForUser, getPlanForUser, saveUserPlan } from "@/lib/plans";

function isPrerenderBailout(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_PRERENDER_")
  );
}

function getSessionToken(request: Request) {
  return request.headers.get("cookie")?.match(/(?:^|;\s*)ampara_session=([^;]+)/)?.[1];
}

export async function GET(request: Request) {
  try {
    const user = await requireUser(getSessionToken(request));
    const [plan, plans] = await Promise.all([
      getPlanForUser(user.id),
      getAllPlansForUser(user.id),
    ]);
    return NextResponse.json({ plan, plans });
  } catch (error) {
    if (isPrerenderBailout(error)) {
      throw error;
    }
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to load visit plan", error);
    return NextResponse.json({ message: "Unable to load visit plan." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(getSessionToken(request));
    const body = await request.json();
    const plan = body?.plan;
    if (!plan || !plan.id) {
      return NextResponse.json({ message: "Valid plan data is required." }, { status: 400 });
    }

    const saved = await saveUserPlan(user.id, plan);
    return NextResponse.json({ success: true, plan: saved }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "AUTH_REQUIRED") {
      return NextResponse.json({ message: "Sign in to manage visit plans." }, { status: 401 });
    }
    console.error("Failed to save visit plan", error);
    return NextResponse.json({ message: "Unable to save visit plan." }, { status: 500 });
  }
}
