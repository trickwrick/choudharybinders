import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { syncProductsFromStatic } from "@/lib/db/products";

export const runtime = "nodejs";

export async function POST() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    await syncProductsFromStatic();
    return NextResponse.json({ ok: true, message: "Products synced from catalog." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
