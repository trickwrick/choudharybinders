import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import {
  createCategory,
  deleteCategory,
  getCategoryDocById,
  getCategoryDocBySlug,
  listAllCategories,
  updateCategory,
} from "@/lib/db/categories";

export const runtime = "nodejs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await getCategoryDocById(id);
      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
      }
      return NextResponse.json({
        category: { ...category, _id: category._id?.toString() },
      });
    }

    const categories = await listAllCategories();
    return NextResponse.json({
      categories: categories.map((category) => ({
        ...category,
        _id: category._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    const slug = slugify(body.id || body.title || "");

    if (!slug) {
      return NextResponse.json({ error: "Category slug is required" }, { status: 400 });
    }

    const existing = await getCategoryDocBySlug(slug);
    if (existing) {
      return NextResponse.json({ error: "Category slug already exists" }, { status: 409 });
    }

    const category = await createCategory({
      id: slug,
      title: body.title,
      description: body.description ?? "",
      image: body.image,
      tag: body.tag ?? "",
      icon: body.icon ?? "Sparkles",
      order: Number(body.order ?? 0),
      active: body.active !== false,
    });

    return NextResponse.json({ category });
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: "Missing category id" }, { status: 400 });
    }

    await updateCategory(body._id, {
      title: body.title,
      description: body.description,
      image: body.image,
      tag: body.tag,
      icon: body.icon,
      order: Number(body.order),
      active: body.active,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing category id" }, { status: 400 });
    }
    await deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
