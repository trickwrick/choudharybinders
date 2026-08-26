import dns from "node:dns";
import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/db/inquiries";
import type { OrderDetails } from "@/lib/types/cms";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      productId?: string;
      productTitle?: string;
      categoryId?: string;
      quantity?: number;
      unit?: string;
      orderDetails?: OrderDetails;
      source?: "contact" | "product" | "quote" | "order";
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    if (!body.message?.trim() && body.source !== "order") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const inquiry = await createInquiry({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      message: body.message?.trim() || "Card order submitted.",
      productId: body.productId,
      productTitle: body.productTitle,
      categoryId: body.categoryId,
      quantity: body.quantity,
      unit: body.unit,
      orderDetails: body.orderDetails,
      source: body.source ?? "contact",
    });

    return NextResponse.json({ ok: true, id: inquiry._id });
  } catch {
    return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 500 });
  }
}
