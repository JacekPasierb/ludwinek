import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {checkRateLimit} from "@/lib/rateLimit";

const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minut

const RATE_LIMIT_MSG =
  "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/auth/") && request.method === "POST") {
    const ip = getClientIp(request);
    const key = `auth:${ip}`;
    const result = checkRateLimit(key, LOGIN_LIMIT, LOGIN_WINDOW_MS);

    if (!result.allowed) {
      return NextResponse.json(
        {error: RATE_LIMIT_MSG},
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((result.resetAt - Date.now()) / 1000)
            ),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/:path*",
};
