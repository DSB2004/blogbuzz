import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getUser } from "./util/user.util";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const user = await getUser();
    if (user) {
      console.log("Current User", user.email);
    }
  }

  // Handle API routes for user or blog
  if (pathname.startsWith("/api/user") || pathname.startsWith("/api/blog")) {
    const user = await getUser();
    if (!user && request.method !== "GET") {
      return NextResponse.redirect(
        new URL("/auth/login?error=TOKEN_EXPIRED", request.url)
      );
    }
  }

  // Handle OTP routes
  if (pathname.startsWith("/auth/otp")) {
    const otp_session = cookies().get("otp-session-id");
    if (!otp_session) {
      return NextResponse.redirect(new URL("/unauthorised", request.url));
    }
  }

  // Handle sensitive auth routes
  if (
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/delete-account") ||
    pathname.startsWith("/auth/reset-password")
  ) {
    const auth_session = cookies().get("auth-session-id");
    if (!auth_session) {
      return NextResponse.redirect(new URL("/unauthorised", request.url));
    }
  }

  return NextResponse.next();
}
