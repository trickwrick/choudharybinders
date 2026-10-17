import dns from "node:dns";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminGuard } from "@/lib/api-utils";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  listAllTestimonials,
  updateTestimonial,
  seedTestimonialsIfEmpty,
} from "@/lib/db/testimonials";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const testimonial = await getTestimonialById(id);
      if (!testimonial) {
        return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
      }
      return NextResponse.json({
        testimonial: { ...testimonial, _id: testimonial._id?.toString() },
      });
    }

    const items = await listAllTestimonials();
    if (items.length === 0) {
      await seedTestimonialsIfEmpty();
      const seeded = await listAllTestimonials();
      return NextResponse.json({ testimonials: seeded });
    }

    return NextResponse.json({ testimonials: items });
  } catch {
    return NextResponse.json({ error: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const testimonial = await createTestimonial({
      name: body.name ?? "",
      role: body.role ?? "",
      organization: body.organization ?? "",
      text: body.text ?? "",
      image: body.image ?? "",
      order: Number(body.order ?? 0),
      active: body.active !== false,
    });
    revalidatePath("/");
    return NextResponse.json({ testimonial });
  } catch {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: "Missing testimonial id" }, { status: 400 });
    }
    await updateTestimonial(body._id, {
      name: body.name,
      role: body.role,
      organization: body.organization,
      text: body.text,
      image: body.image,
      order: Number(body.order),
      active: body.active,
    });
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing testimonial id" }, { status: 400 });
    }
    await deleteTestimonial(id);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
