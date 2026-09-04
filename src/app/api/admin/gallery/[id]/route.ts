import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import {
  deleteGalleryImage,
  getGalleryImageById,
  updateGalleryImage,
} from "@/lib/db/gallery";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { id } = await params;
    const image = await getGalleryImageById(id);
    
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      image: { ...image, _id: image._id?.toString() },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { id } = await params;
    const body = await request.json();
    
    await updateGalleryImage(id, {
      src: body.src,
      label: body.label,
      order: body.order !== undefined ? Number(body.order) : undefined,
      active: body.active,
      row: body.row,
    });
    
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { id } = await params;
    await deleteGalleryImage(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
