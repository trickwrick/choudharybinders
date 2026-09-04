import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import {
  createGalleryImage,
  listAllGalleryImages,
} from "@/lib/db/gallery";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const images = await listAllGalleryImages();
    return NextResponse.json({
      images: images.map((img) => ({
        ...img,
        _id: img._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load gallery images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const image = await createGalleryImage({
      src: body.src,
      label: body.label ?? "Gallery image",
      order: Number(body.order ?? 0),
      active: body.active !== false,
      row: body.row === "bottom" ? "bottom" : "top",
    });
    return NextResponse.json({ image });
  } catch {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
