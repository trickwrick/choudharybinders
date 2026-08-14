import dns from "node:dns";
import { NextResponse } from "next/server";
import {
  createAdminSession,
  clearAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const body = (await request.json()) as { username?: string; password?: string };
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    if (!username || !password || !(await verifyAdminCredentials(username, password))) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
