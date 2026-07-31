import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import {
  createHeroSlide,
  deleteHeroSlide,
  listAllHeroSlides,
  updateHeroSlide,
} from "@/lib/db/hero-slides";

export const runtime = "nodejs";

export async function GET() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const slides = await listAllHeroSlides();
    return NextResponse.json({
      slides: slides.map((slide) => ({
        ...slide,
        _id: slide._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const slide = await createHeroSlide({
      src: body.src,
      alt: body.alt ?? body.title ?? "Hero slide",
      title: body.title,
      subtitle: body.subtitle ?? "",
      order: Number(body.order ?? 0),
      active: body.active !== false,
    });
    return NextResponse.json({ slide });
  } catch {
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: "Missing slide id" }, { status: 400 });
    }
    await updateHeroSlide(body._id, {
      src: body.src,
      alt: body.alt,
      title: body.title,
      subtitle: body.subtitle,
      order: Number(body.order),
      active: body.active,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing slide id" }, { status: 400 });
    }
    await deleteHeroSlide(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete slide" }, { status: 500 });
  }
}
