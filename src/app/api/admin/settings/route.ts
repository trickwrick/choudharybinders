import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { changeAdminPassword, getAdminUsername } from "@/lib/admin-auth";
import { getStoredAdminCredentials } from "@/lib/db/admin-settings";

export const runtime = "nodejs";

export async function GET() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    const [username, stored] = await Promise.all([
      getAdminUsername(),
      getStoredAdminCredentials(),
    ]);

    return NextResponse.json({
      settings: {
        username,
        passwordSource: stored ? "database" : "environment",
        updatedAt: stored?.updatedAt ?? null,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    const body = await request.json();
    const currentPassword = String(body.currentPassword ?? "");
    const newPassword = String(body.newPassword ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required." },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password do not match." },
        { status: 400 },
      );
    }

    if (newPassword === currentPassword) {
      return NextResponse.json(
        { error: "New password must be different from current password." },
        { status: 400 },
      );
    }

    await changeAdminPassword(currentPassword, newPassword);

    return NextResponse.json({
      ok: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update password.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
