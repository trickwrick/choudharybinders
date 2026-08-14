import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { syncCategoriesFromStatic } from "@/lib/db/categories";

export const runtime = "nodejs";

export async function POST() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    await syncCategoriesFromStatic();
    return NextResponse.json({ ok: true, message: "Categories synced from catalog." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
