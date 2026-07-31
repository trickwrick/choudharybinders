import dns from "node:dns";
import { NextResponse } from "next/server";
import type { CategoryId } from "@/lib/categories";
import { adminGuard } from "@/lib/api-utils";
import {
  createProduct,
  deleteProduct,
  getProductByMongoId,
  listAllProducts,
  updateProduct,
} from "@/lib/db/products";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const categoryId = searchParams.get("categoryId") as CategoryId | null;

    if (id) {
      const product = await getProductByMongoId(id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({
        product: { ...product, _id: product._id?.toString() },
      });
    }

    const products = await listAllProducts(categoryId ?? undefined);
    return NextResponse.json({
      products: products.map((product) => ({
        ...product,
        _id: product._id?.toString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();

    if (!body.id?.trim() || !body.title?.trim() || !body.categoryId || !body.image?.trim()) {
      return NextResponse.json(
        { error: "Product id, title, category, and image are required." },
        { status: 400 },
      );
    }

    const product = await createProduct({
      id: body.id.trim().toLowerCase().replace(/\s+/g, "-"),
      categoryId: body.categoryId,
      title: body.title.trim(),
      image: body.image.trim(),
      images: body.images?.length ? body.images : [body.image.trim()],
      minQty: body.minQty?.trim() || "1 Piece",
      price: body.price ? Number(body.price) : undefined,
      unit: body.unit?.trim() || undefined,
      specifications: body.specifications ?? [],
      description: body.description?.trim() || "",
      active: body.active !== false,
      order: Number(body.order ?? 0),
    });

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    await updateProduct(body._id, {
      id: body.id,
      categoryId: body.categoryId,
      title: body.title,
      image: body.image,
      images: body.images,
      minQty: body.minQty,
      price: body.price ? Number(body.price) : undefined,
      unit: body.unit,
      specifications: body.specifications,
      description: body.description,
      active: body.active,
      order: Number(body.order),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }
    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
