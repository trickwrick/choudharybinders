import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { removeCatalogSeededProducts } from "@/lib/db/products";

export const runtime = "nodejs";

export async function POST() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const removed = await removeCatalogSeededProducts();
    return NextResponse.json({
      ok: true,
      removed,
      message: `Removed ${removed} auto-imported catalog products.`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cleanup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
