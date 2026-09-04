import dns from "node:dns";
import { NextResponse } from "next/server";
import { adminGuard } from "@/lib/api-utils";
import { countInquiries } from "@/lib/db/inquiries";
import { listAllCategories } from "@/lib/db/categories";
import { listAllHeroSlides } from "@/lib/db/hero-slides";
import { listAllProducts } from "@/lib/db/products";

export const runtime = "nodejs";

export async function GET() {
  const denied = await adminGuard();
  if (denied) return denied;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const [slides, categories, products, newInquiries, totalInquiries] = await Promise.all([
      listAllHeroSlides(),
      listAllCategories(),
      listAllProducts(),
      countInquiries("new"),
      countInquiries(),
    ]);

    return NextResponse.json({
      stats: {
        slides: slides.length,
        categories: categories.length,
        products: products.length,
        newInquiries,
        totalInquiries,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load dashboard stats" }, { status: 500 });
  }
}
