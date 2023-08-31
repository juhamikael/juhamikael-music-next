import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { useTheme } from "next-themes";
export function middleware(req: NextRequest, res: NextResponse) {
  const response = NextResponse.next();

  response.cookies.set("theme", "dark");

  return response;
}

export const config = {
  matcher: "/",
};
