import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { updateGalleryImage } from "@/lib/db/gallery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid payload: updates must be an array" },
        { status: 400 }
      );
    }

    await Promise.all(
      updates.map(async (update: { id: string; order: number }) => {
        if (!update.id || typeof update.order !== "number") return;
        return updateGalleryImage(update.id, { order: update.order });
      })
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to reorder gallery images" }, { status: 500 });
  }
}
